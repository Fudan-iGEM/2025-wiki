<template>
  <component
    :is="is"
    :class="buttonClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface RainbowButtonProps {
  class?: string;
  is?: string;
  speed?: number;
}

const props = withDefaults(defineProps<RainbowButtonProps>(), {
  speed: 2,
  is: "button",
});

const speedInSeconds = computed(() => `${props.speed}s`);

// 内部实现类名合并功能
const buttonClasses = computed(() => {
  const baseClasses = [
    'rainbow-button',
    'group',
    'relative',
    'inline-flex',
    'h-11',
    'cursor-pointer',
    'items-center',
    'justify-center',
    'rounded-xl',
    'border-0',
    'px-8',
    'py-2',
    'font-medium',
    'text-white',
    'transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-1',
    'disabled:pointer-events-none',
    'disabled:opacity-50'
  ];
  
  if (props.class) {
    baseClasses.push(props.class);
  }
  
  return baseClasses.join(' ');
});
</script>

<style scoped>
.rainbow-button {
  --color-1: hsl(0 100% 63%);
  --color-2: hsl(270 100% 63%);
  --color-3: hsl(210 100% 63%);
  --color-4: hsl(195 100% 63%);
  --color-5: hsl(90 100% 63%);
  --speed: v-bind(speedInSeconds);
  
  /* 基础样式 */
  position: relative;
  display: inline-flex;
  height: 2.75rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  border: 0;
  padding: 0.5rem 2rem;
  font-weight: 500;
  color: white;
  transition: all 0.3s ease;
  
  /* 彩虹背景 */
  background: 
    linear-gradient(#121213, #121213),
    linear-gradient(#121213 50%, rgba(18,18,19,0.6) 80%, rgba(18,18,19,0)),
    linear-gradient(90deg, var(--color-1), var(--color-5), var(--color-3), var(--color-4), var(--color-2));
  background-size: 200%;
  background-clip: padding-box, border-box, border-box;
  background-origin: border-box;
  border: calc(0.08 * 1rem) solid transparent;
  
  animation: rainbow var(--speed) infinite linear;
}

.rainbow-button:before {
  content: '';
  position: absolute;
  bottom: -20%;
  left: 50%;
  z-index: 0;
  height: 20%;
  width: 60%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, var(--color-1), var(--color-5), var(--color-3), var(--color-4), var(--color-2));
  background-size: 200%;
  filter: blur(calc(0.8 * 1rem));
  animation: rainbow var(--speed) infinite linear;
}

.rainbow-button:focus-visible {
  outline: none;
  ring: 1px;
}

.rainbow-button:disabled {
  pointer-events: none;
  opacity: 0.5;
}

/* 暗色模式支持 */
@media (prefers-color-scheme: dark) {
  .rainbow-button {
    background: 
      linear-gradient(#fff, #fff),
      linear-gradient(#fff 50%, rgba(255,255,255,0.6) 80%, rgba(0,0,0,0)),
      linear-gradient(90deg, var(--color-1), var(--color-5), var(--color-3), var(--color-4), var(--color-2));
    color: #000;
  }
}

@keyframes rainbow {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 200%;
  }
}
</style>