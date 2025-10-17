<template>
  <div class="chromosome-visualization" data-skip-content-processing>
    <!-- Simple Header -->
    <div class="header">
      <h3 class="title"><i>Saccharomyces cerevisiae</i> (strain S288C)</h3>
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
            <span class="locus-info" v-if="chromosome.markerSummary">
              ({{ chromosome.markerSummary }})
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
              <filter :id="`shadow-centromere-${chromosome.number}`">
                <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-opacity="0.12" />
              </filter>
              <filter :id="`glow-insertion-${chromosome.number}`">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter :id="`glow-ace2-${chromosome.number}`">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
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
              :filter="`url(#shadow-centromere-${chromosome.number})`"
            />
            
            <!-- Insertion markers -->
            <g 
              v-for="marker in chromosome.markers"
              :key="marker.id"
            >
              <rect
                :x="30 + getMarkerPosition(chromosome, marker) - 8"
                y="19.5"
                width="16"
                height="20"
                fill="transparent"
                class="interactive-marker"
                @mouseenter="showTooltip($event, chromosome, marker)"
                @mouseleave="hideTooltip"
              />
              <template v-if="marker.type === 'insertion'">
                <circle
                  :cx="30 + getMarkerPosition(chromosome, marker)"
                  cy="27.5"
                  r="8"
                  fill="#008794"
                  stroke="#ffffff"
                  stroke-width="2"
                  class="insertion-shape"
                  :filter="`url(#glow-insertion-${chromosome.number})`"
                />
                <circle
                  :cx="30 + getMarkerPosition(chromosome, marker)"
                  cy="27.5"
                  r="4"
                  fill="#5dcac6"
                  class="pointer-events-none"
                />
              </template>
              <template v-else-if="marker.type === 'ace2'">
                <polygon
                  :points="`${30 + getMarkerPosition(chromosome, marker) - 8},35 ${30 + getMarkerPosition(chromosome, marker)},15 ${30 + getMarkerPosition(chromosome, marker) + 8},35`"
                  fill="#e97e35"
                  stroke="#ffffff"
                  stroke-width="2"
                  class="ace2-shape"
                  :filter="`url(#glow-ace2-${chromosome.number})`"
                />
                <circle
                  :cx="30 + getMarkerPosition(chromosome, marker)"
                  cy="25"
                  r="3"
                  fill="#faccaf"
                  class="pointer-events-none"
                />
              </template>
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
            <span class="tooltip-label">Chromosome:</span>
            <span class="tooltip-value">{{ tooltip.chromosome }}</span>
          </div>
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
          <div class="tooltip-row" v-if="tooltip.arm">
            <span class="tooltip-label">Arm:</span>
            <span class="tooltip-value">{{ tooltip.arm }}</span>
          </div>
          <div class="tooltip-row" v-if="tooltip.homologyLeft && tooltip.homologyRight">
            <span class="tooltip-label">Homology:</span>
            <span class="tooltip-value">{{ tooltip.homologyLeft }} / {{ tooltip.homologyRight }} bp</span>
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
import rawChromosomeData from './chromosome-markers.json'

const chromosomeWidth = 480
const chromosomeHeight = 80
const minChromosomeWidth = 200
const maxChromosomeWidth = 420

const romanNumerals = [
  '',
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
  'XIII',
  'XIV',
  'XV',
  'XVI'
]

function toRoman(number) {
  return romanNumerals[number] || String(number)
}

function formatMarkerLabel(identifier) {
  if (identifier === null || identifier === undefined) {
    return 'Unknown marker'
  }
  if (typeof identifier === 'number') {
    return `Int. locus ${identifier}`
  }
  const trimmed = String(identifier).trim()
  return trimmed.length ? trimmed : 'Unknown marker'
}

function formatArm(orientation) {
  if (orientation === 1) return 'Right arm'
  if (orientation === -1) return 'Left arm'
  if (orientation === 0) return 'Centromeric'
  return null
}

const structuredChromosomes = rawChromosomeData
  .map((chromosome) => {
    const markers = chromosome.markers.map((marker, index) => {
      const label = formatMarkerLabel(marker.identifier)
      const sanitized = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      return {
        ...marker,
        label,
        id: `${chromosome.chromosome}-${sanitized || index}`,
        armLabel: formatArm(marker.orientation)
      }
    }).sort((a, b) => a.insertionLocus - b.insertionLocus)

    return {
      number: chromosome.chromosome,
      roman: toRoman(chromosome.chromosome),
      totalLength: chromosome.totalLength,
      centromereStart: chromosome.centromereStart,
      centromereEnd: chromosome.centromereEnd,
      centromereCenter: chromosome.centromereCenter,
      markers,
      markerSummary: markers.map((marker) => marker.label).join(', ')
    }
  })
  .sort((a, b) => a.number - b.number)

const chromosomes = ref(structuredChromosomes)
const totalLengths = structuredChromosomes.map((chromosome) => chromosome.totalLength)
const minDatasetLength = Math.min(...totalLengths)
const maxChromosomeLength = Math.max(...totalLengths)

const tooltip = reactive({
  visible: false,
  x: 0,
  y: 0,
  title: '',
  chromosome: '',
  type: '',
  position: 0,
  distance: 0,
  percentage: '',
  arm: null,
  homologyLeft: '',
  homologyRight: ''
})

function getChromosomeLength(totalLength) {
  const minLength = Math.max(minDatasetLength, 1)
  const maxLength = maxChromosomeLength

  const logMin = Math.log(minLength)
  const logMax = Math.log(maxLength)
  const logCurrent = Math.log(totalLength)

  const normalizedLog = (logCurrent - logMin) / (logMax - logMin || 1)
  const scaledWidth = minChromosomeWidth + normalizedLog * (maxChromosomeWidth - minChromosomeWidth)

  return Math.max(scaledWidth, minChromosomeWidth)
}

function getCentromerePosition(chromosome) {
  return (chromosome.centromereCenter / chromosome.totalLength) * getChromosomeLength(chromosome.totalLength)
}

function getMarkerPosition(chromosome, marker) {
  if (!marker?.insertionLocus) return 0
  return (marker.insertionLocus / chromosome.totalLength) * getChromosomeLength(chromosome.totalLength)
}

function calculateDistanceFromCentromere(position, centromereCenter) {
  return Math.abs(position - centromereCenter)
}

function calculatePercentage(distance, totalLength) {
  return ((distance / totalLength) * 100).toFixed(1)
}

function formatLength(length) {
  if (length >= 1000000) {
    return (length / 1000000).toFixed(1) + 'M'
  }
  if (length >= 1000) {
    return (length / 1000).toFixed(0) + 'k'
  }
  return length.toString()
}

function formatRange(range) {
  if (!Array.isArray(range) || range.length !== 2) {
    return null
  }
  const [start, end] = range
  return `${Math.round(start).toLocaleString()}-${Math.round(end).toLocaleString()}`
}

function showTooltip(event, chromosome, marker) {
  const target = event.currentTarget || event.target
  if (!target || !marker) return

  const rect = target.getBoundingClientRect()
  tooltip.x = rect.left + rect.width / 2
  tooltip.y = rect.top - 10

  const distance = calculateDistanceFromCentromere(marker.insertionLocus, chromosome.centromereCenter)
  tooltip.title = marker.label
  tooltip.chromosome = chromosome.roman
  tooltip.type = marker.type
  tooltip.position = Math.round(marker.insertionLocus)
  tooltip.distance = Math.round(distance)
  tooltip.percentage = calculatePercentage(distance, chromosome.totalLength)
  tooltip.arm = marker.armLabel
  tooltip.homologyLeft = formatRange(marker.homologyArmLeft) || ''
  tooltip.homologyRight = formatRange(marker.homologyArmRight) || ''

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

/* Ensure decorative shapes do not block the transparent interactive markers */
.chromosome-svg .insertion-shape,
.chromosome-svg .ace2-shape,
.chromosome-svg .pointer-events-none {
  pointer-events: none;
}

.chromosome-svg .insertion-shape,
.chromosome-svg .ace2-shape {
  transition: fill 0.2s ease;
}

.interactive-marker {
  cursor: pointer;
}

.interactive-marker:hover ~ .insertion-shape {
  fill: #0a8d94;
}

.interactive-marker:hover ~ .ace2-shape {
  fill: #d16821;
}
</style>
