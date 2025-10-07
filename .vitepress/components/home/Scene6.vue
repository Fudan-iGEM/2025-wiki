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
  flex: 0 0 clamp(320px, 90vw, 480px);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.card-lottie-wrapper {
  flex: 0 0 120px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
}

.card-text-content {
  color: #f0f0f0;
}

.card-text-content h4 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card-text-content p {
  font-size: 0.95rem;
  opacity: 0.8;
}
</style>
