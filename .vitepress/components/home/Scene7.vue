<template>
  <div ref="scene7Ref" class="scene7-container">
    <div ref="textRef" class="end-text">
      <h2>Let’s join DR. sTraTeGY</h2>
      <p>in finding new strategies to wage the war against antimicrobial resistance.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const scene7Ref = ref(null);
const textRef = ref(null);

defineExpose({
  scene7Ref,
  textRef,
});
</script>

<style scoped>
.scene7-container {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5; /* Above other scenes */
  pointer-events: none;
}

.end-text {
  opacity: 0;
  color: #333;
  text-align: center;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
}

.end-text h2 {
  font-size: 2.5rem;
  font-weight: 600;
}

.end-text p {
  font-size: 1.2rem;
  opacity: 0.8;
  margin-top: 1rem;
}
</style>
