<template>
  <div ref="scene8Ref" class="scene8-container">
    <div ref="cardsWrapperRef" class="cards-wrapper">
      <a v-for="card in cards" :key="card.id" :href="card.link" class="card" :style="{ backgroundColor: card.color }">
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
  justify-content: center;
  align-items: center;
  z-index: 6; /* Above other scenes */
  pointer-events: none;
  opacity: 0;
}

.cards-wrapper {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  pointer-events: auto;
}

.card {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 2 / 3;
  border-radius: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
}

.card img {
  width: 60%;
  height: auto;
}
</style>