<template>
  <div :class="cn('expandable-gallery', props.class)">
    <div
      v-for="image in images"
      :key="image"
      class="gallery-item"
      @click="handleImageClick"
      @touchstart="handleTouchStart"
    >
      <img
        class="gallery-image"
        :src="image"
        :alt="`Gallery image ${image}`"
        loading="lazy"
        @error="handleImageError"
      />
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "../lib/utils";

interface Props {
  images: string[];
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();

const handleImageClick = () => {
  // 处理图片点击事件
  console.log('Image clicked');
};

const handleTouchStart = (event: TouchEvent) => {
  // 处理移动端触摸事件
  event.preventDefault();
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.opacity = '0.5';
  console.warn('Failed to load image:', target.src);
};
</script>

<style scoped>
.expandable-gallery {
  display: flex;
  height: 24rem; /* h-96 equivalent */
  width: 100%;
  gap: 0.5rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.gallery-item {
  position: relative;
  display: flex;
  height: 100%;
  flex: 1;
  cursor: pointer;
  overflow: hidden;
  border-radius: 0.75rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(10px);
}

.gallery-item:hover {
  flex: 3;
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

.gallery-image {
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0.5rem;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

/* 平板响应式设计 */
@media (max-width: 1024px) {
  .expandable-gallery {
    height: 20rem;
    gap: 0.375rem;
    padding: 1rem;
  }
}

/* 移动端响应式设计 */
@media (max-width: 768px) {
  .expandable-gallery {
    height: 16rem;
    gap: 0.25rem;
    padding: 0.75rem;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .expandable-gallery::-webkit-scrollbar {
    display: none;
  }

  .gallery-item {
    min-width: 8rem;
    flex-shrink: 0;
  }

  .gallery-item:hover {
    flex: 2;
  }
}

/* 小屏手机优化 */
@media (max-width: 480px) {
  .expandable-gallery {
    height: 12rem;
    padding: 0.5rem;
    border-radius: 0.75rem;
  }

  .gallery-item {
    min-width: 6rem;
    border-radius: 0.5rem;
  }

  .gallery-item:hover {
    flex: 1.5;
    transform: translateY(-1px);
  }
}

/* 超小屏幕优化 */
@media (max-width: 320px) {
  .expandable-gallery {
    height: 10rem;
    padding: 0.375rem;
    gap: 0.125rem;
  }

  .gallery-item {
    min-width: 5rem;
  }

  .gallery-item:hover {
    flex: 1.2;
    transform: none;
  }
}

/* 大屏幕优化 */
@media (min-width: 1200px) {
  .expandable-gallery {
    height: 28rem;
    gap: 0.75rem;
    padding: 1.5rem;
  }
}

/* 超大屏幕优化 */
@media (min-width: 1600px) {
  .expandable-gallery {
    height: 32rem;
    gap: 1rem;
    padding: 2rem;
  }
}

/* 横屏手机优化 */
@media (max-width: 896px) and (orientation: landscape) {
  .expandable-gallery {
    height: 14rem;
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .gallery-item {
    transition: all 0.3s ease;
  }

  .gallery-item:active {
    flex: 2;
    transform: scale(0.98);
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .gallery-item {
    border: 2px solid #000;
  }

  .gallery-item:hover {
    border-color: #0066cc;
  }
}

/* 减少动画模式支持 */
@media (prefers-reduced-motion: reduce) {
  .gallery-item,
  .gallery-image {
    transition: none;
  }

  .gallery-item:hover {
    transform: none;
  }

  .gallery-item:hover .gallery-image {
    transform: none;
  }
}
</style>