<template>
  <div class="collapsible-section">
    <button 
      @click="toggleCollapse" 
      class="collapsible-button"
      :aria-expanded="isExpanded"
      :aria-controls="contentId"
    >
      <span class="button-text">{{ buttonText }}</span>
      <span
        class="collapse-icon"
        :class="{ expanded: isExpanded }"
        aria-hidden="true"
      >
        <svg
          class="collapse-icon-svg"
          viewBox="0 0 117 117"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <circle cx="58.5" cy="58.5" r="58.5" fill="#484f75" />
          <path
            d="m47.75,69.87l39.16-39.15m-38.05,40.91l8.88,17.76c2.15,4.29,3.22,6.44,4.57,7.01,1.17.5,2.51.41,3.61-.24,1.26-.75,2.04-3.02,3.59-7.56l16.78-49.14c1.35-3.96,2.03-5.94,1.56-7.24-.4-1.14-1.3-2.03-2.44-2.44-1.31-.46-3.29.21-7.24,1.56l-49.14,16.78c-4.54,1.55-6.81,2.33-7.56,3.59-.65,1.1-.74,2.44-.24,3.61.58,1.35,2.72,2.43,7.01,4.57l17.76,8.88c.71.35,1.06.53,1.37.77.27.21.52.45.73.73.24.31.41.66.77,1.37Z"
            fill="none"
            stroke="#b3b3b3"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="5"
          />
        </svg>
      </span>
    </button>
    
    <div 
      :id="contentId"
      class="collapsible-content"
      :class="{ 'expanded': isExpanded }"
      :style="{ maxHeight: isExpanded ? contentHeight + 'px' : '0px' }"
      ref="contentRef"
    >
      <div class="content-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'

interface Props {
  buttonText?: string
  defaultExpanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: '点击展开/收起',
  defaultExpanded: false
})

const isExpanded = ref(props.defaultExpanded)
const contentRef = ref<HTMLElement>()
const contentHeight = ref(0)

const contentId = computed(() => `collapsible-${Math.random().toString(36).substr(2, 9)}`)

const updateContentHeight = async () => {
  if (contentRef.value) {
    await nextTick()
    const inner = contentRef.value.querySelector('.content-inner') as HTMLElement
    if (inner) {
      contentHeight.value = inner.scrollHeight
    }
  }
}

const toggleCollapse = async () => {
  if (!isExpanded.value) {
    await updateContentHeight()
  }
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  if (props.defaultExpanded) {
    updateContentHeight()
  }
})
</script>

<style scoped>
.collapsible-section {
  margin: 1rem 0;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
}

.collapsible-button {
  width: 100%;
  padding: 1rem;
  background: #f8f9fa;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
  transition: background-color 0.2s ease;
}

.collapsible-button:hover {
  background: #e9ecef;
}

.collapsible-button:focus {
  outline: 2px solid #007acc;
  outline-offset: -2px;
}

.button-text {
  text-align: left;
  flex: 1;
}

.collapse-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.75rem;
  height: 1.75rem;
  margin-left: 0.75rem;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.collapse-icon.expanded {
  transform: rotate(180deg);
}

.collapse-icon-svg {
  width: 100%;
  height: 100%;
}

.collapsible-content {
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: white;
}

.content-inner {
  padding: 1rem;
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .collapsible-section {
    border-color: #404040;
  }
  
  .collapsible-button {
    background: #2d2d2d;
    color: #e1e1e1;
  }
  
  .collapsible-button:hover {
    background: #3d3d3d;
  }
  
  .collapsible-content {
    background: #1a1a1a;
  }
  
  .collapse-icon-svg circle {
    fill: #2f4b59;
  }

  .collapse-icon-svg path {
    stroke: #d0d0d0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .collapsible-button {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  
  .content-inner {
    padding: 0.75rem;
  }
}
</style>