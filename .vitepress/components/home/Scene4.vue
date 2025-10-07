<template>
  <div ref="scene4ContainerRef" class="scene4-container">
    <!-- Text box positioned on the left -->
    <div class="scene4-left-box-wrapper">
      <div ref="scene4LeftBoxRef" class="scene4-left-box"></div>
    </div>

    <!-- Glowing ball starts at the top left, near the box -->
    <div ref="glowingBallRef" class="glowing-ball"></div>

    <!-- Lottie animation (the dog) is the drop target in the bottom right -->
    <div ref="dropTargetRef" class="lottie-drop-target">
      <component
        v-if="lottieComponent && scene4AnimationUrl"
        :is="lottieComponent"
        ref="lottie4Ref"
        :animationLink="scene4AnimationUrl"
        :height="'100%'"
        :width="'100%'"
        :loop="scene4Loop"
        :autoplay="scene4Autoplay"
        @onComplete="$emit('lottie-complete')"
      />
    </div>

    <div class="drag-prompt">Drag the orb to the dog</div>
  </div>
</template>

<script setup>
import { ref, shallowRef, onMounted, defineProps, defineEmits, defineExpose } from 'vue';

defineProps({
  scene4AnimationUrl: String,
  scene4Loop: Boolean,
  scene4Autoplay: Boolean,
});

defineEmits(['lottie-complete']);

const scene4ContainerRef = ref(null);
const scene4LeftBoxRef = ref(null); // Still named this way to avoid breaking parent logic
const glowingBallRef = ref(null);
const dropTargetRef = ref(null);
const lottie4Ref = ref(null);
const lottieComponent = shallowRef(null);

onMounted(async () => {
  const { Vue3Lottie } = await import('vue3-lottie');
  lottieComponent.value = Vue3Lottie;
});

defineExpose({
  scene4ContainerRef,
  scene4LeftBoxRef,
  glowingBallRef,
  dropTargetRef,
  lottie4Ref,
});
</script>

<style scoped>
.scene4-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  z-index: 2;
  overflow: hidden;
}

.scene4-left-box-wrapper {
  position: absolute;
  top: 50%;
  left: clamp(2rem, 6vw, 5rem);
  transform: translateY(-50%);
  pointer-events: auto;
  z-index: 5; /* ensure card sits above the orb initially */
}

.scene4-left-box {
  width: clamp(320px, 35vw, 520px);
  min-height: clamp(320px, 50vh, 450px);
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  padding: clamp(1.75rem, 3.5vw, 2.75rem);
  color: #f8f8f8;
  font-size: clamp(1.1rem, 1.4vw, 1.45rem);
  line-height: 1.5;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);
}

.glowing-ball {
  position: absolute;
  /* default fallback: peek from card's bottom-left vicinity; JS will refine */
  bottom: clamp(2rem, 8vh, 3rem);
  left: clamp(1rem, 4vw, 2rem);
  width: clamp(42px, 5.5vw, 62px);
  height: clamp(42px, 5.5vw, 62px);
  background: radial-gradient(circle at 35% 35%, #ffe37a 0%, #ff9a00 70%);
  border-radius: 50%;
  box-shadow: 0 0 30px 10px rgba(255, 154, 0, 0.55);
  pointer-events: auto;
  cursor: grab;
  z-index: 1; /* behind the card, but still partially visible */
  transition: box-shadow 0.3s ease;
}

.glowing-ball:active {
  cursor: grabbing;
}

.lottie-drop-target {
  position: fixed;
  bottom: -2rem;
  right: -2rem;
  width: clamp(280px, 30vw, 420px);
  height: clamp(280px, 30vw, 420px);
  pointer-events: auto;
  background: transparent;
  border: none;
  overflow: hidden;
  z-index: 5;
}



.drag-prompt {
  position: absolute;
  top: clamp(6rem, 18vh, 10rem);
  left: clamp(4rem, 12vw, 10rem);
  color: rgba(255, 255, 255, 0.75);
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  letter-spacing: 0.04em;
}

@media (max-width: 768px) {
  .scene4-left-box-wrapper {
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
    right: auto;
  }
  .scene4-left-box {
    width: min(92vw, 420px);
    min-height: auto;
    padding: 1.5rem;
  }
  .glowing-ball {
    bottom: 4rem;
    right: 2rem;
    top: auto;
    left: auto;
  }
  .lottie-drop-target {
    right: -1rem;
    bottom: 5rem;
    width: min(80vw, 300px);
    height: min(80vw, 300px);
  }
  .drag-prompt {
    bottom: 8rem;
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
}
</style>