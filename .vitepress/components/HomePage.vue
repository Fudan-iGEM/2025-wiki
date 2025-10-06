<template>
  <div class="home-page">
    <div class="animations-grid">
      <div 
        v-for="animation in animations" 
        :key="animation.name"
        class="animation-container"
      >
        <h3 class="animation-title">{{ animation.name }}</h3>
        <div class="lottie-wrapper">
          <Vue3Lottie 
            :animationData="animation.data"
            :height="300"
            :width="300"
            :loop="true"
            :autoPlay="true"
            class="lottie-animation"
          />
        </div>
        <div class="animation-content">
          <!-- 这里可以添加其他内容 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'

const animations = ref([
  { name: '5-1.json', url: 'https://static.igem.wiki/teams/5643/img/homepage/5-1.json', data: null },
  { name: '5-2.json', url: 'https://static.igem.wiki/teams/5643/img/homepage/5-2.json', data: null },
  { name: '5-3.json', url: 'https://static.igem.wiki/teams/5643/img/homepage/5-3.json', data: null },
  { name: '6-1.json', url: 'https://static.igem.wiki/teams/5643/img/homepage/6-1.json', data: null },
  { name: '6-3.json', url: 'https://static.igem.wiki/teams/5643/img/homepage/6-3.json', data: null },
  { name: '6-4.json', url: 'https://static.igem.wiki/teams/5643/img/homepage/6-4.json', data: null },
  { name: 'crisis.json', url: 'https://static.igem.wiki/teams/5643/img/homepage/crisis.json', data: null },
])

onMounted(async () => {
  for (let animation of animations.value) {
    try {
      const response = await fetch(animation.url)
      animation.data = await response.json()
    } catch (error) {
      console.error(`Failed to load animation ${animation.name}:`, error)
    }
  }
})
</script>

<style scoped>
.home-page {
  padding: 2rem;
  padding-top: 120px; /* 为导航栏留出空间 */
  min-height: 100vh;
}

.animations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.animation-container {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.animation-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.animation-title {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  text-align: center;
}

.lottie-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.lottie-animation {
  border-radius: 6px;
}

.animation-content {
  min-height: 50px;
  padding: 0.5rem;
  border-top: 1px solid #f0f0f0;
  margin-top: 1rem;
  /* 这里可以添加其他内容的样式 */
}

@media (max-width: 768px) {
  .home-page {
    padding: 1rem;
  }
  
  .animations-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .animation-container {
    padding: 1rem;
  }
  
  .lottie-wrapper {
    padding: 0.5rem;
  }
}
</style>
