<template>
  <div ref="scene1Ref" class="scene scene-1">
    <div class="lottie-wrapper" ref="lottie1WrapperRef">
      <component
        v-if="lottieComponent"
        :is="lottieComponent"
        ref="lottie1Ref"
        :animationLink="animationUrl"
        :height="'100%'"
        :width="'100%'"
        :loop="false"
        :autoplay="true"
        @onComplete="$emit('lottie-complete')"
      />
    </div>
    <div class="title-wrapper" ref="titleWrapperRef">
      <img
        ref="titleImageRef"
        class="title-image"
        :src="titleSrc"
        alt="DR. sTraTeGY title"
      />
      <div ref="subtitleWrapperRef" class="subtitle">
        <TrueFocus
          :key="subtitleKey"
          sentence="a Drug Resistance mutation Tracking Technology based on Grape Yeast"
          :blurAmount="0"
          :animationDuration="0.8"
          :pauseBetweenAnimations="1.2"
          :skipWords="['a', 'mutation', 'based', 'on']"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, onMounted, defineProps, defineEmits, defineExpose } from 'vue';
import TrueFocus from '../TrueFocus.vue';

defineProps({
  animationUrl: String,
  titleSrc: String,
  subtitleKey: Number,
});

defineEmits(['lottie-complete']);

const scene1Ref = ref(null);
const lottie1WrapperRef = ref(null);
const lottie1Ref = ref(null);
const titleWrapperRef = ref(null);
const titleImageRef = ref(null);
const subtitleWrapperRef = ref(null);
const lottieComponent = shallowRef(null);

onMounted(async () => {
  const { Vue3Lottie } = await import('vue3-lottie');
  lottieComponent.value = Vue3Lottie;
});

defineExpose({
  scene1Ref,
  lottie1WrapperRef,
  lottie1Ref,
  titleWrapperRef,
  titleImageRef,
  subtitleWrapperRef,
});
</script>

<style scoped>
.scene {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.lottie-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.title-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  pointer-events: none;
  text-align: center;
  color: #333;
}
.title-image {
  width: min(90vw, 720px);
  max-width: 100%;
}
.subtitle {
  margin-top: 1.5rem;
  pointer-events: auto;
  font-family: 'Outfit', sans-serif;
}
.subtitle,
.subtitle :deep(*) {
  background-color: transparent !important;
}
@media (max-width: 768px) {
  .title-image {
    width: 98vw;
  }
}
</style>
