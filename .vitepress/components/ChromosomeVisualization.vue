<template>
  <div class="chromosome-visualization bg-white p-6 rounded-lg border border-gray-200">
    <!-- Simple Header -->
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-1">Saccharomyces cerevisiae Genome</h3>
      <p class="text-sm text-gray-600">Hover over markers to view distance from centromere</p>
    </div>
    
    <!-- Chromosomes Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div 
        v-for="chromosome in chromosomes" 
        :key="chromosome.number"
        class="chromosome-container relative p-3 border border-gray-100 rounded"
      >
        <!-- Simple Chromosome Header -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-700">Chr {{ chromosome.roman }}</span>
            <span class="text-xs text-gray-500" v-if="chromosome.intLocus">
              (Int. locus {{ chromosome.intLocus }})
            </span>
            <span class="text-xs text-orange-600" v-else-if="chromosome.number === 12">
              (ACE2)
            </span>
          </div>
          <span class="text-xs text-gray-500">{{ formatLength(chromosome.totalLength) }}</span>
        </div>
        
        <!-- Chromosome Visualization -->
        <div class="relative">
          <svg 
            :width="chromosomeWidth" 
            :height="chromosomeHeight"
            class="chromosome-svg w-full"
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
                class="cursor-pointer transition-all duration-300 hover:fill-teal-600"
                filter="url(#glow-insertion)"
                @mouseenter="showTooltip($event, chromosome, 'insertion')"
                @mouseleave="hideTooltip"
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
                class="cursor-pointer transition-all duration-300 hover:fill-orange-600"
                filter="url(#glow-ace2)"
                @mouseenter="showTooltip($event, chromosome, 'ace2')"
                @mouseleave="hideTooltip"
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
    <div class="mt-6 pt-4 border-t border-gray-200">
      <div class="flex flex-wrap gap-4 justify-center text-xs">
        <div class="flex items-center gap-1">
          <div class="w-4 h-3 bg-gradient-to-r from-blue-100 to-teal-100 rounded border border-teal-300"></div>
          <span class="text-gray-600">Chromosome</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-4 h-4 rounded" style="background-color: #062570"></div>
          <span class="text-gray-600">Centromere</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-4 h-4 rounded-full" style="background-color: #008794"></div>
          <span class="text-gray-600">Insertion Site</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-4 h-4" style="background-color: #e97e35; clip-path: polygon(50% 0%, 0% 100%, 100% 100%)"></div>
          <span class="text-gray-600">ACE2 Gene</span>
        </div>
      </div>
    </div>
    
    <!-- Enhanced Tooltip -->
    <div
      v-if="tooltip.visible"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      class="absolute z-20 bg-white border-2 border-teal-200 rounded-xl shadow-2xl p-4 pointer-events-none transform -translate-x-1/2 -translate-y-full"
    >
      <div class="text-sm font-bold text-teal-800 mb-2 flex items-center gap-2">
        <div class="w-3 h-3 rounded-full" :class="tooltip.type === 'insertion' ? 'bg-teal-500' : 'bg-orange-500'"></div>
        {{ tooltip.title }}
      </div>
      <div class="text-xs text-gray-600 space-y-1">
        <div class="flex justify-between gap-4">
          <span class="text-gray-500">Position:</span>
          <span class="font-semibold text-teal-700">{{ tooltip.position.toLocaleString() }} bp</span>
        </div>
        <div class="flex justify-between gap-4">
          <span class="text-gray-500">Distance:</span>
          <span class="font-semibold text-teal-700">{{ tooltip.distance.toLocaleString() }} bp</span>
        </div>
        <div class="flex justify-between gap-4">
          <span class="text-gray-500">Percentage:</span>
          <span class="font-semibold text-orange-600">{{ tooltip.percentage }}%</span>
        </div>
        <div v-if="tooltip.type === 'insertion'" class="pt-1 border-t border-gray-200">
          <span class="text-xs text-gray-500">Chromosome {{ tooltip.chromosome }}</span>
        </div>
      </div>
      <!-- Tooltip arrow -->
      <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-teal-200"></div>
    </div>
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
  const containerRect = event.target.closest('.chromosome-visualization').getBoundingClientRect()
  
  tooltip.x = rect.left - containerRect.left + rect.width / 2
  tooltip.y = rect.top - containerRect.top - 10
  
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
.chromosome-svg {
  overflow: visible;
}

.chromosome-container {
  min-height: 80px;
}

.scale-markers text {
  font-family: 'Outfit', sans-serif;
}
</style>
