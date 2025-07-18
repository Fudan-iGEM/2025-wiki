<script setup lang="ts">
import { computed, ref, watchEffect, onUnmounted } from 'vue';
import { Motion } from 'motion-v';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
  colorTheme?: 'primary' | 'secondary' | 'accent';
}

const props = withDefaults(defineProps<CircularTextProps>(), {
  text: '',
  spinDuration: 20,
  onHover: 'speedUp',
  className: '',
  colorTheme: 'primary'
});

const letters = computed(() => Array.from(props.text));
const isHovered = ref(false);

const currentRotation = ref(0);
const animationId = ref<number | null>(null);
const lastTime = ref<number>(Date.now());
const rotationSpeed = ref<number>(0);

// 颜色配置
const colorConfigs = {
  primary: {
    default: '#008794',
    hover: '#5dcac6',
    background: 'rgba(0, 135, 148, 0.1)'
  },
  secondary: {
    default: '#e97e35',
    hover: '#ffb07b',
    background: 'rgba(233, 126, 53, 0.1)'
  },
  accent: {
    default: '#062570',
    hover: '#fff771',
    background: 'rgba(6, 37, 112, 0.1)'
  }
};

const getCurrentColors = computed(() => {
  const config = colorConfigs[props.colorTheme];
  return {
    textColor: isHovered.value ? config.hover : config.default,
    backgroundColor: config.background
  };
});

const getCurrentSpeed = () => {
  if (isHovered.value && props.onHover === 'pause') return 0;

  const baseDuration = props.spinDuration;
  const baseSpeed = 360 / baseDuration;

  if (!isHovered.value) return baseSpeed;

  switch (props.onHover) {
    case 'slowDown':
      return baseSpeed / 2;
    case 'speedUp':
      return baseSpeed * 4;
    case 'goBonkers':
      return baseSpeed * 20;
    default:
      return baseSpeed;
  }
};

const getCurrentScale = () => {
  return isHovered.value && props.onHover === 'goBonkers' ? 0.8 : 1;
};

const animate = () => {
  const now = Date.now();
  const deltaTime = (now - lastTime.value) / 1000;
  lastTime.value = now;

  const targetSpeed = getCurrentSpeed();

  const speedDiff = targetSpeed - rotationSpeed.value;
  const smoothingFactor = Math.min(1, deltaTime * 5);
  rotationSpeed.value += speedDiff * smoothingFactor;

  currentRotation.value = (currentRotation.value + rotationSpeed.value * deltaTime) % 360;

  animationId.value = requestAnimationFrame(animate);
};

const startAnimation = () => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
  }
  lastTime.value = Date.now();
  rotationSpeed.value = getCurrentSpeed();
  animate();
};

watchEffect(() => {
  startAnimation();
});

startAnimation();

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
  }
});

const handleHoverStart = () => {
  isHovered.value = true;
};

const handleHoverEnd = () => {
  isHovered.value = false;
};

const getLetterTransform = (index: number) => {
  const rotationDeg = (360 / letters.value.length) * index;
  const factor = Math.PI / letters.value.length;
  const x = factor * index;
  const y = factor * index;
  return `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;
};
</script>

<template>
  <Motion
    :animate="{
      rotate: currentRotation,
      scale: getCurrentScale()
    }"
    :transition="{
      rotate: {
        duration: 0
      },
      scale: {
        type: 'spring',
        damping: 20,
        stiffness: 300
      }
    }"
    :class="`m-0 mx-auto rounded-full w-[200px] h-[200px] relative font-black text-center cursor-pointer origin-center ${props.className}`"
    :style="{
      backgroundColor: getCurrentColors.backgroundColor,
      borderRadius: '50%',
      transition: 'background-color 0.3s ease'
    }"
    @mouseenter="handleHoverStart"
    @mouseleave="handleHoverEnd"
  >
    <span
      v-for="(letter, i) in letters"
      :key="i"
      class="absolute inline-block inset-0 text-2xl font-bold transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
              :style="{
          transform: getLetterTransform(i),
          WebkitTransform: getLetterTransform(i),
          color: getCurrentColors.textColor,
          textShadow: isHovered ? '0 0 10px rgba(255, 255, 255, 0.3)' : 'none'
        }"
    >
      {{ letter }}
    </span>
  </Motion>
</template>
