<template>
  <div class="chromosome-visualization">
    <!-- Simple Header -->
    <div class="header">
      <h3 class="title">Saccharomyces cerevisiae Genome</h3>
      <p class="subtitle">Hover over markers to view distance from centromere</p>
    </div>
    
    <!-- Chromosomes Grid -->
    <div class="chromosomes-grid">
      <div 
        v-for="chromosome in chromosomes" 
        :key="chromosome.number"
        class="chromosome-container"
      >
        <!-- Simple Chromosome Header -->
        <div class="chromosome-header">
          <div class="chromosome-info">
            <span class="chromosome-name">Chr {{ chromosome.roman }}</span>
            <span class="locus-info" v-if="chromosome.intLocus">
              (Int. locus {{ chromosome.intLocus }})
            </span>
            <span class="ace2-info" v-else-if="chromosome.number === 12">
              (ACE2)
            </span>
          </div>
          <span class="length-info">{{ formatLength(chromosome.totalLength) }}</span>
        </div>
        
        <!-- Chromosome Visualization -->
        <div class="svg-container">
          <svg 
            :width="chromosomeWidth" 
            :height="chromosomeHeight"
            class="chromosome-svg"
            :viewBox="`0 0 ${chromosomeWidth} ${chromosomeHeight}`"
          >
            <!-- Chromosome background with gradient -->
            <defs>
              <linearGradient :id="`gradient-${chromosome.number}`" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#e6f2fe" />
                <stop offset="50%" stop-color="#b2eeeb" />
                <stop offset="100%" stop-color="#e6f2fe" />
              </linearGradient>
              <filter :id="`shadow-${chromosome.number}`">
                <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.1"/>
              </filter>
            </defs>
            
            <rect
              x="30"
              y="15"
              :width="getChromosomeLength(chromosome.totalLength)"
              :height="25"
              rx="12"
              ry="12"
              :fill="`url(#gradient-${chromosome.number})`"
              stroke="#5dcac6"
              stroke-width="2"
              :filter="`url(#shadow-${chromosome.number})`"
            />
            
            <!-- Centromere with enhanced styling -->
            <rect
              :x="30 + getCentromerePosition(chromosome) - 2"
              y="10"
              width="6"
              height="35"
              rx="3"
              ry="3"
              fill="#062570"
              stroke="#ffffff"
              stroke-width="1"
              filter="url(#shadow-centromere)"
            />
            
            <!-- Insertion site with glow effect -->
            <g v-if="chromosome.insertionLocus">
              <rect
                :x="30 + getInsertionPosition(chromosome) - 8"
                y="19.5"
                width="16"
                height="16"
                fill="transparent"
                class="interactive-marker"
                @mouseenter="showTooltip($event, chromosome, 'insertion')"
                @mouseleave="hideTooltip"
              />
              <defs>
                <filter id="glow-insertion">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              <circle
                :cx="30 + getInsertionPosition(chromosome)"
                cy="27.5"
                r="8"
                fill="#008794"
                stroke="#ffffff"
                stroke-width="2"
                class="insertion-shape"
                filter="url(#glow-insertion)"
              />
              <circle
                :cx="30 + getInsertionPosition(chromosome)"
                cy="27.5"
                r="4"
                fill="#5dcac6"
                class="pointer-events-none"
              />
            </g>
            
            <!-- ACE2 position with special styling -->
            <g v-if="chromosome.number === 12">
              <rect
                :x="30 + getACE2Position() - 8"
                y="15"
                width="16"
                height="20"
                fill="transparent"
                class="interactive-marker"
                @mouseenter="showTooltip($event, chromosome, 'ace2')"
                @mouseleave="hideTooltip"
              />
              <defs>
                <filter id="glow-ace2">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              <polygon
                :points="`${30 + getACE2Position() - 8},35 ${30 + getACE2Position()},15 ${30 + getACE2Position() + 8},35`"
                fill="#e97e35"
                stroke="#ffffff"
                stroke-width="2"
                class="ace2-shape"
                filter="url(#glow-ace2)"
              />
              <circle
                :cx="30 + getACE2Position()"
                cy="25"
                r="3"
                fill="#faccaf"
                class="pointer-events-none"
              />
            </g>
            
            <!-- Enhanced scale markers -->
            <g class="scale-markers">
              <line x1="30" y1="45" x2="30" y2="52" stroke="#5dcac6" stroke-width="2"/>
              <text x="30" y="62" font-size="11" fill="#008794" text-anchor="middle" font-weight="600">0</text>
              
              <line :x1="30 + getChromosomeLength(chromosome.totalLength)" y1="45" 
                    :x2="30 + getChromosomeLength(chromosome.totalLength)" y2="52" 
                    stroke="#5dcac6" stroke-width="2"/>
              <text :x="30 + getChromosomeLength(chromosome.totalLength)" y="62" 
                    font-size="11" fill="#008794" text-anchor="middle" font-weight="600">
                {{ formatLength(chromosome.totalLength) }}
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Simple Legend -->
    <div class="legend">
      <div class="legend-items">
        <div class="legend-item">
          <div class="legend-color chromosome-color"></div>
          <span class="legend-text">Chromosome</span>
        </div>
        <div class="legend-item">
          <div class="legend-color centromere-color"></div>
          <span class="legend-text">Centromere</span>
        </div>
        <div class="legend-item">
          <div class="legend-color insertion-color"></div>
          <span class="legend-text">Insertion Site</span>
        </div>
        <div class="legend-item">
          <div class="legend-color ace2-color"></div>
          <span class="legend-text">ACE2 Gene</span>
        </div>
      </div>
    </div>
    
    <!-- Enhanced Tooltip -->
    <Teleport to="body">
      <div
        v-if="tooltip.visible"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
        class="tooltip"
      >
        <div class="tooltip-header">
          <div class="tooltip-indicator" :class="tooltip.type === 'insertion' ? 'insertion-indicator' : 'ace2-indicator'"></div>
          {{ tooltip.title }}
        </div>
        <div class="tooltip-content">
          <div class="tooltip-row">
            <span class="tooltip-label">Position:</span>
            <span class="tooltip-value">{{ tooltip.position.toLocaleString() }} bp</span>
          </div>
          <div class="tooltip-row">
            <span class="tooltip-label">Distance:</span>
            <span class="tooltip-value">{{ tooltip.distance.toLocaleString() }} bp</span>
          </div>
          <div class="tooltip-row">
            <span class="tooltip-label">Percentage:</span>
            <span class="tooltip-percentage">{{ tooltip.percentage }}%</span>
          </div>
          <div v-if="tooltip.type === 'insertion'" class="tooltip-chromosome">
            <span class="tooltip-chromosome-text">Chromosome {{ tooltip.chromosome }}</span>
          </div>
        </div>
        <!-- Tooltip arrow -->
        <div class="tooltip-arrow"></div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const chromosomeWidth = 480
const chromosomeHeight = 80
// Use a more balanced scaling approach - minimum width ensures visibility
const minChromosomeWidth = 200  // Increased minimum width for better visual balance
const maxChromosomeWidth = 420
const maxChromosomeLength = 1531933 // Chromosome IV length for scaling

// Chromosome data - EXACT match with provided table
const chromosomes = ref([
  {
    number: 1,
    roman: 'I',
    intLocus: 1,
    homologyStart: 169422,
    homologyEnd: 169940,
    insertionLocus: 169941,
    totalLength: 230382,  // Corrected from table
    centromereStart: 143468,
    centromereEnd: 143585,
    centromereCenter: 143526.5
  },
  {
    number: 4,
    roman: 'IV',
    intLocus: 2,
    homologyStart: 359888,
    homologyEnd: 360355,
    insertionLocus: 360355.5,
    totalLength: 1479067,
    centromereStart: 450378,
    centromereEnd: 450455,
    centromereCenter: 450416.5
  },
  {
    number: 6,  // Corrected: this is chromosome VI, not V
    roman: 'VI',
    intLocus: 3,
    homologyStart: 10278,
    homologyEnd: 10913,
    insertionLocus: 10913.5,  // Corrected insertion locus
    totalLength: 270130,  // Corrected total length
    centromereStart: 151188,
    centromereEnd: 151305,
    centromereCenter: 151246.5
  },
  {
    number: 7,
    roman: 'VII',
    intLocus: 4,
    homologyStart: 12472,
    homologyEnd: 12982,
    insertionLocus: 12982.5,
    totalLength: 1051019,  // Corrected
    centromereStart: 496347,
    centromereEnd: 496447,
    centromereCenter: 496397
  },
  {
    number: 8,
    roman: 'VIII',
    intLocus: 5,
    homologyStart: 191015,
    homologyEnd: 191539,
    insertionLocus: 191539.5,
    totalLength: 544025,  // Corrected
    centromereStart: 95093,
    centromereEnd: 95210,
    centromereCenter: 95151.5
  },
  {
    number: 9,
    roman: 'IX',
    intLocus: 6,
    homologyStart: 340431,
    homologyEnd: 340933,
    insertionLocus: 340934,
    totalLength: 454735,
    centromereStart: 355819,
    centromereEnd: 355935,
    centromereCenter: 355877
  },
  {
    number: 11,
    roman: 'XI',
    intLocus: 7,
    homologyStart: 24931,
    homologyEnd: 25451,
    insertionLocus: 25451.5,
    totalLength: 682226,  // Corrected from table
    centromereStart: 453080,
    centromereEnd: 453770,
    centromereCenter: 453425
  },
  {
    number: 13,
    roman: 'XIII',
    intLocus: 8,
    homologyStart: 408123,
    homologyEnd: 408657,
    insertionLocus: 408657.5,
    totalLength: 916765,
    centromereStart: 254283,
    centromereEnd: 254383,
    centromereCenter: 254333
  },
  {
    number: 15,
    roman: 'XV',
    intLocus: 9,
    homologyStart: 686950,
    homologyEnd: 687450,
    insertionLocus: 687450.5,
    totalLength: 1056263,
    centromereStart: 317448,
    centromereEnd: 317566,
    centromereCenter: 317507
  },
  {
    number: 16,
    roman: 'XVI',
    intLocus: 10,
    homologyStart: 569995,
    homologyEnd: 570541,
    insertionLocus: 570541.5,
    totalLength: 916013,
    centromereStart: 537133,
    centromereEnd: 537249,
    centromereCenter: 537191
  },
  // ACE2 chromosome
  {
    number: 12,
    roman: 'XII',
    intLocus: null,
    homologyStart: 91523,  // ACE2 homology start
    homologyEnd: 96004,    // ACE2 homology end
    insertionLocus: null,
    totalLength: 1018864,  // Corrected from table
    centromereStart: 141525,
    centromereEnd: 141644,
    centromereCenter: 141584.5
  }
])

// ACE2 position (chromosome XII) - EXACT from table
const ace2Position = 93763.5

const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  title: '',
  position: 0,
  distance: 0,
  percentage: 0,
  chromosome: '',
  type: ''
})

function getChromosomeLength(totalLength) {
  // Use logarithmic scaling for better visual balance
  const minLength = 200000  // Minimum chromosome length in dataset
  const maxLength = maxChromosomeLength
  
  // Logarithmic scaling formula
  const logMin = Math.log(minLength)
  const logMax = Math.log(maxLength)
  const logCurrent = Math.log(totalLength)
  
  // Map to visual range with better distribution
  const normalizedLog = (logCurrent - logMin) / (logMax - logMin)
  const scaledWidth = minChromosomeWidth + (normalizedLog * (maxChromosomeWidth - minChromosomeWidth))
  
  return Math.max(scaledWidth, minChromosomeWidth)
}

function getCentromerePosition(chromosome) {
  return (chromosome.centromereCenter / chromosome.totalLength) * getChromosomeLength(chromosome.totalLength)
}

function getInsertionPosition(chromosome) {
  if (!chromosome.insertionLocus) return 0
  return (chromosome.insertionLocus / chromosome.totalLength) * getChromosomeLength(chromosome.totalLength)
}

function getACE2Position() {
  const chromosome12 = chromosomes.value.find(c => c.number === 12)
  return (ace2Position / chromosome12.totalLength) * getChromosomeLength(chromosome12.totalLength)
}

function calculateDistanceFromCentromere(position, centromereCenter) {
  return Math.abs(position - centromereCenter)
}

function calculatePercentage(distance, totalLength) {
  return Math.round((distance / totalLength) * 100)
}

function formatLength(length) {
  if (length >= 1000000) {
    return (length / 1000000).toFixed(1) + 'M'
  } else if (length >= 1000) {
    return (length / 1000).toFixed(0) + 'k'
  }
  return length.toString()
}

function showTooltip(event, chromosome, type) {
  const rect = event.target.getBoundingClientRect()
  
  // 使用固定定位，直接使用viewport坐标
  tooltip.x = rect.left + rect.width / 2
  tooltip.y = rect.top - 10
  
  if (type === 'insertion') {
    const distance = calculateDistanceFromCentromere(chromosome.insertionLocus, chromosome.centromereCenter)
    const percentage = calculatePercentage(distance, chromosome.totalLength)
    
    tooltip.title = `Insertion Site ${chromosome.intLocus}`
    tooltip.position = Math.round(chromosome.insertionLocus)
    tooltip.distance = Math.round(distance)
    tooltip.percentage = percentage
    tooltip.chromosome = chromosome.roman
    tooltip.type = 'insertion'
  } else if (type === 'ace2') {
    const distance = calculateDistanceFromCentromere(ace2Position, chromosome.centromereCenter)
    const percentage = calculatePercentage(distance, chromosome.totalLength)
    
    tooltip.title = 'ACE2 Gene'
    tooltip.position = Math.round(ace2Position)
    tooltip.distance = Math.round(distance)
    tooltip.percentage = percentage
    tooltip.chromosome = chromosome.roman
    tooltip.type = 'ace2'
  }
  
  tooltip.visible = true
}

function hideTooltip() {
  tooltip.visible = false
}
</script>

<style scoped>
/* 主容器样式 */
.chromosome-visualization {
  position: relative;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

/* 头部样式 */
.header {
  margin-bottom: 1.5rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #008794;
  margin-bottom: 0.25rem;
}

.subtitle {
  font-size: 0.875rem;
  color: #6b7280;
}

/* 染色体网格样式 */
.chromosomes-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .chromosomes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 染色体容器样式 */
.chromosome-container {
  position: relative;
  padding: 0.75rem;
  border: 1px solid #f3f4f6;
  border-radius: 0.25rem;
  min-height: 80px;
}

/* 染色体头部样式 */
.chromosome-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.chromosome-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chromosome-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.locus-info {
  font-size: 0.75rem;
  color: #6b7280;
}

.ace2-info {
  font-size: 0.75rem;
  color: #ea580c;
}

.length-info {
  font-size: 0.75rem;
  color: #6b7280;
}

/* SVG容器样式 */
.svg-container {
  position: relative;
}

.chromosome-svg {
  overflow: visible;
  pointer-events: auto;
  width: 100%;
}

/* 图例样式 */
.legend {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  font-size: 0.75rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.legend-color {
  width: 1rem;
  height: 0.75rem;
}

.chromosome-color {
  background: linear-gradient(to right, #dbeafe, #b2f5ea);
  border-radius: 0.125rem;
  border: 1px solid #5eead4;
}

.centromere-color {
  background-color: #062570;
  border-radius: 0.25rem;
  width: 1rem;
  height: 1rem;
}

.insertion-color {
  background-color: #008794;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
}

.ace2-color {
  background-color: #e97e35;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  width: 1rem;
  height: 1rem;
}

.legend-text {
  color: #6b7280;
}

/* Tooltip样式 */
.tooltip {
  position: fixed;
  z-index: 50;
  background-color: white;
  border: 2px solid #5eead4;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  pointer-events: none;
  transform: translateX(-50%) translateY(-100%);
}

.tooltip-header {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f766e;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tooltip-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}

.insertion-indicator {
  background-color: #14b8a6;
}

.ace2-indicator {
  background-color: #f97316;
}

.tooltip-content {
  font-size: 0.75rem;
  color: #6b7280;
}

.tooltip-content > * + * {
  margin-top: 0.25rem;
}

.tooltip-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.tooltip-label {
  color: #6b7280;
}

.tooltip-value {
  font-weight: 600;
  color: #0f766e;
}

.tooltip-percentage {
  font-weight: 600;
  color: #ea580c;
}

.tooltip-chromosome {
  padding-top: 0.25rem;
  border-top: 1px solid #e5e7eb;
}

.tooltip-chromosome-text {
  font-size: 0.75rem;
  color: #6b7280;
}

.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #5eead4;
}

.scale-markers text {
  font-family: 'Inter', sans-serif;
}

/* 确保可交互元素能够接收鼠标事件 */
.chromosome-svg circle,
.chromosome-svg polygon {
  pointer-events: auto;
}

.interactive-marker {
  cursor: pointer;
}

.interactive-marker:hover ~ .insertion-shape {
  fill: #0f766e; /* hover:fill-teal-600 */
}

.interactive-marker:hover ~ .ace2-shape {
  fill: #c2410c; /* hover:fill-orange-600 */
}
</style>
