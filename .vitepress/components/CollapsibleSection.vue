<template>
  <div class="collapsible-section">
    <button 
      @click="toggleCollapse" 
      class="collapsible-button"
      :aria-expanded="isExpanded"
      :aria-controls="contentId"
    >
      <span class="button-text">{{ buttonText }}</span>
      <span class="arrow" :class="{ 'expanded': isExpanded }">▼</span>
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

.arrow {
  transition: transform 0.3s ease;
  font-size: 0.8rem;
  color: #6c757d;
}

.arrow.expanded {
  transform: rotate(180deg);
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
  
  .arrow {
    color: #a0a0a0;
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