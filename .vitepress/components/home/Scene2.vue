<template>
  <div ref="scene2Ref" class="scene scene-2">
    <div ref="scene2ContentRef" class="scene2-content">
      <CrisisDialog
        :dialogs="dialogs"
        :dialog-box-refs="dialogBoxRefs"
        :send-enabled="isSendEnabled"
        :send-active="isSendActive"
        @send-click="$emit('send-click')"
      />
      <div class="scene2-animation">
        <component
          v-if="lottieComponent && scene2AnimationUrl"
          :is="lottieComponent"
          ref="lottie2Ref"
          :animationLink="scene2AnimationUrl"
          :height="'100%'"
          :width="'100%'"
          :loop="scene2Loop"
          :autoplay="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, onMounted, defineProps, defineEmits, defineExpose } from 'vue';
import CrisisDialog from '../CrisisDialog.vue';

defineProps({
  dialogs: Array,
  dialogBoxRefs: Object,
  isSendEnabled: Boolean,
  isSendActive: Boolean,
  scene2AnimationUrl: String,
  scene2Loop: Boolean,
});

defineEmits(['send-click']);

const scene2Ref = ref(null);
const scene2ContentRef = ref(null);
const lottie2Ref = ref(null);
const lottieComponent = shallowRef(null);

onMounted(async () => {
  const { Vue3Lottie } = await import('vue3-lottie');
  lottieComponent.value = Vue3Lottie;
});

defineExpose({
  scene2Ref,
  scene2ContentRef,
  lottie2Ref,
});
</script>

<style scoped>
.scene-2 {
  color: #f0f0f0;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scene2-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  gap: 2rem;
  position: relative;
  z-index: 1;
}
.scene2-animation {
  flex: 1;
  height: 400px;
}

@media (max-width: 768px) {
  .scene2-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
