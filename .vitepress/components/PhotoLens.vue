<template>
  <div class="photo-lens-container">
    <Lens :zoom-factor="1.7" :lens-size="100">
      <div 
        ref="containerRef"
        class="relative"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <img 
          ref="photoRef"
          :src="photoUrl" 
          alt="Team Photo"
          class="w-full h-auto block"
          style="display: block; margin: 0; padding: 0;"
          @load="onImageLoad"
        />
        
                 <!-- Debug circles (可选，用于调试位置) -->
         <div 
           v-for="person in teamMembers" 
           :key="person.name"
           v-show="true"
           class="absolute border-2 border-red-500 rounded-full pointer-events-none"
           :style="{
             left: `${person.x * 100}%`,
             top: `${person.y * 100}%`,
             width: `${person.radius * 2}px`,
             height: `${person.radius * 2}px`,
             transform: 'translate(-50%, -50%)'
           }"
         >
           <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs bg-red-500 text-white px-1 rounded">
             {{ person.name }}
           </div>
         </div>
        
        
                 <!-- 跟随放大镜的tooltip -->
          <div 
            v-if="hoveredPerson"
            class="absolute pointer-events-none z-50"
            :style="{
              left: (mousePosition.x - (mousePosition.x * 0.25)) + 'px',
              top: (mousePosition.y - 70) + 'px',
              transform: 'translate(-50%, -100%)'
            }"
          >
          <div 
            class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl border-2"
            style="background: linear-gradient(135deg, #008794, #0e9f99); color: white; border-color: #5dcac6;"
          >
            <div class="flex items-center gap-2">
              <div 
                class="w-2 h-2 rounded-full animate-pulse"
                style="background-color: #fff771;"
              ></div>
              {{ hoveredPerson.name }}
            </div>
          </div>
                   <!-- 箭头 -->
           <div 
             class="absolute left-1/2 top-full transform -translate-x-1/2 w-0 h-0"
             style="border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #008794;"
           ></div>
          </div>
          
          <!-- 调试信息 -->
          <div 
            class="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs"
          >
            Mouse: {{ Math.round(mousePosition.x) }}, {{ Math.round(mousePosition.y) }}<br>
            <span v-if="photoRef">
              Photo: {{ Math.round(photoRef.getBoundingClientRect().width) }}x{{ Math.round(photoRef.getBoundingClientRect().height) }}<br>
              Photo Left: {{ Math.round(photoRef.getBoundingClientRect().left) }}<br>
            </span>
            <span v-if="hoveredPerson">
              Person: {{ hoveredPerson.name }}<br>
              Expected: {{ Math.round(hoveredPerson.x * 100) }}%, {{ Math.round(hoveredPerson.y * 100) }}%
            </span>
          </div>
      </div>
    </Lens>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Lens from './Lens/Lens.vue'

interface Person {
  name: string
  x: number // 相对位置X坐标 (0-1)
  y: number // 相对位置Y坐标 (0-1)
  radius: number // 检测半径 (像素)
}

const photoUrl = 'https://static.igem.wiki/teams/5643/img/igem-team-small.webp'
const containerRef = ref<HTMLElement>()
const photoRef = ref<HTMLImageElement>()
const mousePosition = ref({ x: 0, y: 0 })
const imageLoaded = ref(false)

// 团队成员数据 (示例数据)
const teamMembers: Person[] = [
  { name: 'Zhiqin Wang', x: 0.5, y: 0.5, radius: 50 },
  { name: 'Alex Chen', x: 0.4, y: 0.25, radius: 50 },
  { name: 'Sarah Johnson', x: 0.6, y: 0.35, radius: 50 },
  { name: 'Michael Davis', x: 0.8, y: 0.4, radius: 50 },
  { name: 'Emma Wilson', x: 0.3, y: 0.6, radius: 50 },
  { name: 'James Lee', x: 0.7, y: 0.65, radius: 50 },
]

const hoveredPerson = ref<Person | null>(null)



function onImageLoad() {
  imageLoaded.value = true
}

function handleMouseMove(event: MouseEvent) {
  if (!photoRef.value || !imageLoaded.value || !containerRef.value) return
  
  const containerRect = containerRef.value.getBoundingClientRect()
  const photoRect = photoRef.value.getBoundingClientRect()
  
  // 计算鼠标相对于图片的位置
  const x = event.clientX - photoRect.left
  const y = event.clientY - photoRect.top
  
  mousePosition.value = { x, y }
  
  // 检测鼠标是否悬停在团队成员上
  hoveredPerson.value = null
  
  for (const person of teamMembers) {
    // 使用图片的实际显示尺寸计算位置
    const personX = person.x * photoRect.width
    const personY = person.y * photoRect.height
    const distance = Math.sqrt(
      Math.pow(x - personX, 2) + Math.pow(y - personY, 2)
    )
    
    if (distance <= person.radius) {
      hoveredPerson.value = person
      break
    }
  }
}

function handleMouseLeave() {
  hoveredPerson.value = null
}

</script>

<style scoped>
.photo-lens-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>