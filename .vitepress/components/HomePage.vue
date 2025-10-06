<template>
  <div class="homepage-container">
    <Vue3Lottie 
      :animationLink="animationUrl"
      :height="'100%'"
      :width="'100%'"
      :loop="false"
      :autoplay="true"
    />
  </div>
  <div>DR. sTraTeGY</div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'

// Lottie 动画链接
const animationUrl = ref('https://static.igem.wiki/teams/5643/img/homepage/page1.json')
</script>

<style scoped>
.homepage-container {
  position: relative;
  top: 60px; /* 避开 Navbar */
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
}

.homepage-container :deep(.lottie-container) {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.homepage-container :deep(.lottie-container svg) {
  max-width: 100% !important;
  max-height: 100% !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  display: block !important;
  margin: 0 auto !important;
}
</style>
