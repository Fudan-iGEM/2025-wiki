<script setup lang="ts">
import { motion } from 'motion-v';
import { computed, nextTick, onMounted, onUnmounted, ref, watch, useTemplateRef } from 'vue';

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

const props = withDefaults(defineProps<TrueFocusProps>(), {
  sentence: 'True Focus',
  manualMode: false,
  blurAmount: 5,
  borderColor: '#e97e35',
  glowColor: 'rgba(233, 126, 53, 0.6)',
  animationDuration: 0.3,
  pauseBetweenAnimations: 1
});

const words = computed(() => props.sentence.split(' ').filter(word => word.length > 0));
const animationDuration = computed(() => props.animationDuration);
const currentIndex = ref(0);
const lastActiveIndex = ref<number | null>(null);
const containerRef = useTemplateRef<HTMLDivElement>('containerRef');
const wordRefs = ref<(HTMLSpanElement | null)[]>([]);
const focusRect = ref({ x: 0, y: 0, width: 0, height: 0 });
const hasCompletedCycle = ref(false);
const scrollProgress = ref(0);
const isScrollTrackingActive = ref(false);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
const computeBackgroundColor = (progress: number) => {
  const clamped = clamp(progress, 0, 1);
  const r = Math.round(lerp(255, 58, clamped));
  const g = Math.round(lerp(255, 22, clamped));
  const b = Math.round(lerp(255, 103, clamped));
  return `rgb(${r}, ${g}, ${b})`;
};

const contentOpacity = computed(() => (hasCompletedCycle.value ? clamp(1 - scrollProgress.value, 0, 1) : 1));

const containerStyle = computed(() => {
  const progress = clamp(scrollProgress.value, 0, 1);

  return {
    '--tf-border-color': props.borderColor,
    '--tf-glow-color': props.glowColor,
    '--tf-blur-amount': `${props.blurAmount}px`,
    '--tf-transition-duration': `${props.animationDuration}s`,
    '--tf-background-color': hasCompletedCycle.value ? computeBackgroundColor(progress) : 'transparent',
    '--tf-content-opacity': `${contentOpacity.value}`
  };
});

type IntervalHandle = ReturnType<typeof globalThis.setInterval>;
let interval: IntervalHandle | null = null;
let resizeRaf: number | null = null;

const computeFocusRect = () => {
  if (currentIndex.value === null || currentIndex.value < 0) return;
  const container = containerRef.value;
  const active = wordRefs.value[currentIndex.value];
  if (!container || !active) return;

  const parentRect = container.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();

  focusRect.value = {
    x: activeRect.left - parentRect.left,
    y: activeRect.top - parentRect.top,
    width: activeRect.width,
    height: activeRect.height
  };
};

const handleResize = () => {
  if (resizeRaf !== null) {
    window.cancelAnimationFrame(resizeRaf);
  }
  resizeRaf = window.requestAnimationFrame(() => {
    resizeRaf = null;
    computeFocusRect();
  });
};

const updateScrollProgress = () => {
  if (typeof window === 'undefined') return;
  const container = containerRef.value;
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const rangeStart = viewportHeight;
  const rangeEnd = -rect.height;
  const denominator = rangeStart - rangeEnd;

  if (denominator === 0) {
    scrollProgress.value = 0;
    return;
  }

  const rawProgress = (rangeStart - rect.top) / denominator;
  scrollProgress.value = clamp(rawProgress, 0, 1);
};

const enableScrollTracking = () => {
  if (typeof window === 'undefined' || isScrollTrackingActive.value) return;

  isScrollTrackingActive.value = true;
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress, { passive: true });
  updateScrollProgress();
};

const disableScrollTracking = () => {
  if (typeof window === 'undefined' || !isScrollTrackingActive.value) return;

  window.removeEventListener('scroll', updateScrollProgress);
  window.removeEventListener('resize', updateScrollProgress);
  isScrollTrackingActive.value = false;
  scrollProgress.value = 0;
};

const stopAutoCycle = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};

const advanceWord = () => {
  if (words.value.length === 0) return;

  if (currentIndex.value >= words.value.length - 1) {
    hasCompletedCycle.value = true;
    stopAutoCycle();
    return;
  }

  currentIndex.value = currentIndex.value + 1;
};

watch(
  () => words.value.length,
  (length) => {
    if (length === 0) {
      currentIndex.value = -1;
      lastActiveIndex.value = null;
      hasCompletedCycle.value = false;
      return;
    }

    if (currentIndex.value < 0 || currentIndex.value >= length) {
      currentIndex.value = 0;
    }
  },
  { immediate: true }
);

watch(hasCompletedCycle, (completed) => {
  if (completed) {
    enableScrollTracking();
  } else {
    disableScrollTracking();
  }
});

watch(
  [currentIndex, () => words.value.length],
  async () => {
    if (currentIndex.value === null || currentIndex.value === -1) return;
    if (!wordRefs.value[currentIndex.value] || !containerRef.value) return;

    await nextTick();
    computeFocusRect();
  },
  { immediate: true }
);

const handleMouseEnter = (index: number) => {
  if (props.manualMode) {
    lastActiveIndex.value = index;
    currentIndex.value = index;
  }
};

const handleMouseLeave = () => {
  if (props.manualMode && words.value.length > 0) {
    currentIndex.value = lastActiveIndex.value ?? 0;
  }
};

const setWordRef = (el: HTMLSpanElement | null, index: number) => {
  wordRefs.value[index] = el;
};

onMounted(async () => {
  await nextTick();
  computeFocusRect();
  window.addEventListener('resize', handleResize, { passive: true });

  watch(
    [() => props.manualMode, () => props.animationDuration, () => props.pauseBetweenAnimations, () => words.value.length, () => props.sentence],
    () => {
      stopAutoCycle();

      if (props.manualMode || words.value.length === 0) {
        hasCompletedCycle.value = false;
        return;
      }

      hasCompletedCycle.value = false;
      currentIndex.value = 0;
      lastActiveIndex.value = null;
      const intervalDelay = Math.max((props.animationDuration + props.pauseBetweenAnimations) * 1000, 16);

      interval = setInterval(() => {
        advanceWord();
      }, intervalDelay);
    },
    { immediate: true }
  );
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);

  stopAutoCycle();
  disableScrollTracking();

  if (resizeRaf !== null) {
    window.cancelAnimationFrame(resizeRaf);
    resizeRaf = null;
  }
});
</script>

<template>
  <div class="true-focus" ref="containerRef" :style="containerStyle">
    <span
      v-for="(word, index) in words"
      :key="index"
      :ref="el => setWordRef(el as HTMLSpanElement, index)"
      class="true-focus__word"
      :class="{ 'true-focus__word--active': index === currentIndex }"
      @mouseenter="handleMouseEnter(index)"
      @mouseleave="handleMouseLeave"
    >
      {{ word }}
    </span>

    <motion.div
      class="true-focus__highlight"
      :animate="{
        x: focusRect.x,
        y: focusRect.y,
        width: focusRect.width,
        height: focusRect.height,
        opacity: currentIndex >= 0 ? contentOpacity : 0
      }"
      :transition="{
        duration: animationDuration
      }"
    >
      <span
        class="true-focus__corner true-focus__corner--tl"
      ></span>

      <span
        class="true-focus__corner true-focus__corner--tr"
      ></span>

      <span
        class="true-focus__corner true-focus__corner--bl"
      ></span>

      <span
        class="true-focus__corner true-focus__corner--br"
      ></span>
    </motion.div>
  </div>
</template>

<style scoped>
.true-focus {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 1.5rem);
  padding: 1.5rem;
  background-color: var(--tf-background-color, transparent);
  transition: background-color 0.6s ease;
}

.true-focus__word {
  position: relative;
  display: inline-flex;
  font-weight: 800;
  font-size: clamp(0.85rem, 2.3vw, 1.8rem);
  line-height: 1.1;
  color: rgba(17, 24, 39, 0.35);
  filter: blur(var(--tf-blur-amount));
  transition: filter var(--tf-transition-duration) ease, color var(--tf-transition-duration) ease, opacity 0.4s ease;
  cursor: pointer;
  opacity: var(--tf-content-opacity, 1);
}

.true-focus__word--active {
  filter: blur(0px);
  color: #111827;
}

.true-focus__highlight {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  box-sizing: border-box;
  border: 3px solid var(--tf-border-color, #e97e35);
  border-radius: 12px;
  filter: drop-shadow(0 0 14px var(--tf-glow-color, rgba(233, 126, 53, 0.48)));
  transition: opacity var(--tf-transition-duration) ease;
}

.true-focus__corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border: 3px solid var(--tf-border-color, #e97e35);
  filter: drop-shadow(0 0 6px var(--tf-glow-color, rgba(233, 126, 53, 0.6)));
  border-radius: 4px;
}

.true-focus__corner--tl {
  top: -12px;
  left: -12px;
  border-right: 0;
  border-bottom: 0;
}

.true-focus__corner--tr {
  top: -12px;
  right: -12px;
  border-left: 0;
  border-bottom: 0;
}

.true-focus__corner--bl {
  bottom: -12px;
  left: -12px;
  border-right: 0;
  border-top: 0;
}

.true-focus__corner--br {
  right: -12px;
  bottom: -12px;
  border-left: 0;
  border-top: 0;
}

@media (max-width: 640px) {
  .true-focus {
    gap: clamp(0.4rem, 4vw, 1rem);
    padding: 1rem;
  }

  .true-focus__word {
    font-size: clamp(0.8rem, 4vw, 1.5rem);
  }
}
</style>
