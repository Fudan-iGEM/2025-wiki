<template>
  <div ref="scene5Ref" class="scene5-container">
    <div class="scene5-column-wrapper" ref="columnWrapperRef">
      <div v-for="item in items" :key="item.id" class="scene5-column" :class="`column-${item.id}`">
        <div v-if="item.order === 'text-first'" class="text-content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
        <div class="lottie-box">
          <Vue3Lottie :animationLink="item.lottieUrl" :loop="true" :autoplay="true" />
        </div>
        <div v-if="item.order === 'lottie-first'" class="text-content">
          <h3>{{ item.title }}</h3>
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

const scene5Ref = ref(null);
const columnWrapperRef = ref(null);

defineExpose({
  scene5Ref,
  columnWrapperRef,
});
</script>

<style scoped>
.scene5-container {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  opacity: 0;
  z-index: 3; /* Above scene 4 */
  overflow: hidden;
}

.scene5-column-wrapper {
  display: flex;
  gap: 2rem;
  width: 90%;
  max-width: 1400px;
  pointer-events: auto;
}

.scene5-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.lottie-box {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  aspect-ratio: 1 / 1;
  transition: all 0.3s ease;
  max-width: 300px;
  margin: 0 auto;
}

.lottie-box:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 30px 5px rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
}

.text-content {
  color: #f0f0f0;
  text-align: center;
}

.text-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.text-content p {
  font-size: 1rem;
  opacity: 0.8;
}
</style>