<template>
  <div ref="scene8Ref" class="scene8-container">
    <div ref="cardsWrapperRef" class="cards-wrapper">
      <a v-for="card in cards" :key="card.id" :href="card.link" class="card" :style="{ backgroundColor: card.color }">
        <div class="card-title">{{ card.title }}</div>
        <img :src="card.svgUrl" :alt="card.alt" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue';

defineProps({
  cards: Array,
});

const scene8Ref = ref(null);
const cardsWrapperRef = ref(null);

defineExpose({
  scene8Ref,
  cardsWrapperRef,
});
</script>

<style scoped>
.scene8-container {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 5% 5% 20% 20%;
  z-index: 6; /* Above other scenes */
  pointer-events: none;
  opacity: 0;
}

.cards-wrapper {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1100px; /* 扩大容器以允许更高更大的卡片 */
  pointer-events: auto;
}

.card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 图标贴近底部 */
  align-items: center;
  aspect-ratio: 2 / 3;
  border-radius: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 280px; /* 增大卡片宽度以配合更高的高度 */
  min-height: clamp(340px, 55vh, 520px); /* 提升整体高度 */
  padding: 0.75rem; /* 底部留一点内边距防止贴边过紧 */
  position: relative; /* 为标题定位提供参考 */
}

.card-title {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 1;
  font-family: 'Josefin Sans', sans-serif;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
}

.card img {
  width: 70%;
  height: auto;
  margin-bottom: 0.25rem; /* 视觉上更贴近底部 */
}

@media (max-width: 1200px) {
  .scene8-container {
    padding: 4rem 3rem;
    align-items: center;
  }

  .cards-wrapper {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.25rem;
  }

  .card {
    flex: 1 1 calc(50% - 1.25rem);
    max-width: 260px;
    min-height: clamp(320px, 50vh, 460px);
  }

  .card-title {
    font-size: 2.1rem;
    left: 1.25rem;
    top: 1.25rem;
  }
}

@media (max-width: 768px) {
  .scene8-container {
    position: relative;
    padding: 2rem 1rem 3rem;
    justify-content: center;
  }

  .cards-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;
    width: min(100%, 360px);
    margin: 0 auto;
  }

  .card {
    flex: none;
    width: 100%;
    max-width: none;
    min-height: 160px;
    aspect-ratio: auto;
    padding: 0.75rem 0.9rem;
    border-radius: 18px;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    flex-direction: row;
  }

  .card-title {
    position: static;
    font-size: clamp(1.15rem, 4.5vw, 1.45rem);
    text-shadow: none;
    max-width: 60%;
    text-align: left;
  }

  .card img {
    width: clamp(72px, 30%, 110px);
    margin: 0;
    align-self: center;
    flex-shrink: 0;
  }
}

@media (max-width: 480px) {
  .scene8-container {
    padding: 1.6rem 0.75rem 2.1rem;
  }

  .cards-wrapper {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.6rem;
    width: 100%;
  }

  .card {
    min-height: 150px;
    padding: 0.65rem 0.8rem;
    border-radius: 16px;
  }

  .card-title {
    font-size: clamp(1.05rem, 5.5vw, 1.35rem);
    text-align: left;
  }

  .card img {
    width: clamp(64px, 28%, 96px);
    flex-shrink: 0;
  }
}

@media (max-width: 360px) {
  .scene8-container {
    padding: 1.4rem 0.6rem 1.8rem;
  }

  .cards-wrapper {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .card {
    min-height: 140px;
    padding: 0.55rem 0.75rem;
    gap: 0.6rem;
  }

  .card-title {
    font-size: clamp(1rem, 6vw, 1.25rem);
    max-width: 65%;
    text-align: left;
  }

  .card img {
    width: clamp(58px, 26%, 88px);
    flex-shrink: 0;
  }
}
</style>
