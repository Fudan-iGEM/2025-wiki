<template>
  <div ref="scene6Ref" class="scene6-container">
    <div class="scroll-wrapper">
      <div v-for="item in items" :key="item.id" class="card">
        <div class="card-lottie-wrapper">
          <Vue3Lottie :animationLink="item.lottieUrl" :loop="true" :autoplay="true" />
        </div>
        <div class="card-text-content">
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
    <div class="scroll-hint">Swipe right to see more →</div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';

defineProps({
  items: Array,
});

const scene6Ref = ref(null);

defineExpose({
  scene6Ref,
});
</script>

<style scoped>
.scene6-container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  z-index: 4; /* Above scene 5 */
}

.scroll-wrapper {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  overflow-x: auto;
  width: 100%;
  pointer-events: auto;
  /* Custom scrollbar for better aesthetics */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.scroll-wrapper::-webkit-scrollbar {
  height: 8px;
}

.scroll-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  border: 3px solid transparent;
  background-clip: content-box;
}

.card {
  flex: 0 0 clamp(360px, 92vw, 560px);
  display: flex;
  align-items: center;
  gap: 1.75rem;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 26px;
  padding: 1.75rem;
  backdrop-filter: blur(10px) saturate(120%);
}

.card-lottie-wrapper {
  flex: 0 0 140px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.22);
}

.card-text-content {
  color: #f0f0f0;
  font-family: 'Outfit', sans-serif;
}

.card-text-content h4 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: 'Josefin Sans', sans-serif;
}

.card-text-content p {
  font-size: 1.1rem;
  opacity: 0.85;
  font-family: 'Outfit', sans-serif;
}

.scroll-hint {
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.4rem 0.75rem;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
  pointer-events: none; /* 不干扰其他元素交互 */
  animation: hint-nudge 2.2s ease-in-out infinite;
  font-family: 'Outfit', sans-serif;
}

@keyframes hint-nudge {
  0%, 100% { transform: translateX(-50%); opacity: 0.9; }
  50% { transform: translateX(calc(-50% + 6px)); opacity: 1; }
}
</style>
