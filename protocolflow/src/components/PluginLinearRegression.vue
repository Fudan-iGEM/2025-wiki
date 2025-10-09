<template>
  <div class="plugin-linear-regression">
    <div class="lr-header">
      <h4>Linear Regression Fitter</h4>
      <div class="lr-tabs">
        <button @click="activeTab = 'input'" :class="{ active: activeTab === 'input' }">Data Input</button>
        <button @click="activeTab = 'chart'" :class="{ active: activeTab === 'chart' }">Chart Analysis</button>
        <button @click="activeTab = 'predict'" :class="{ active: activeTab === 'predict' }">Prediction</button>
      </div>
    </div>

    <!-- 数据输入标签页 -->
    <div v-if="activeTab === 'input'" class="lr-tab-content">
      <div class="input-methods">
        <div class="method-toggle">
          <label>
            <input type="radio" v-model="inputMethod" value="manual"> Manual Input
          </label>
          <label>
            <input type="radio" v-model="inputMethod" value="batch"> Batch Paste
          </label>
        </div>

        <div v-if="inputMethod === 'manual'" class="manual-input">
          <div class="point-input">
            <input type="number" v-model.number="newPoint.x" placeholder="X value" step="any">
            <input type="number" v-model.number="newPoint.y" placeholder="Y value" step="any">
            <button @click="addPoint" :disabled="!isValidPoint">Add Point</button>
          </div>
          
          <div class="points-list" v-if="dataPoints.length > 0">
            <div class="points-header">
              <span>Data Points ({{ dataPoints.length }} points)</span>
              <button @click="clearPoints" class="clear-btn">Clear</button>
            </div>
            <div class="points-grid">
              <div v-for="(point, index) in dataPoints" :key="index" class="point-item">
                <span>({{ point.x }}, {{ point.y }})</span>
                <button @click="removePoint(index)" class="remove-btn">×</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="inputMethod === 'batch'" class="batch-input">
          <textarea 
            v-model="batchData" 
            placeholder="Paste data, format: one point per line, separated by comma or tab&#10;Example:&#10;1,2&#10;2,4&#10;3,6"
            rows="6"
          ></textarea>
          <button @click="parseBatchData">Parse Data</button>
          <div v-if="parseError" class="error">{{ parseError }}</div>
        </div>
      </div>

      <div v-if="dataPoints.length >= 2" class="regression-results">
        <h5>Regression Results</h5>
        <div class="results-grid">
          <div class="result-item">
            <label>Equation:</label>
            <span class="equation">y = {{ slope.toFixed(4) }}x + {{ intercept.toFixed(4) }}</span>
          </div>
          <div class="result-item">
            <label>R² Coefficient:</label>
            <span :class="{ 'good-fit': rSquared > 0.9, 'fair-fit': rSquared > 0.7 }">{{ rSquared.toFixed(4) }}</span>
          </div>
          <div class="result-item">
            <label>Slope:</label>
            <span>{{ slope.toFixed(4) }} ± {{ slopeError.toFixed(4) }}</span>
          </div>
          <div class="result-item">
            <label>Intercept:</label>
            <span>{{ intercept.toFixed(4) }} ± {{ interceptError.toFixed(4) }}</span>
          </div>
          <div class="result-item">
            <label>Standard Error:</label>
            <span>{{ standardError.toFixed(4) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表分析标签页 -->
    <div v-if="activeTab === 'chart'" class="lr-tab-content">
      <div v-if="dataPoints.length >= 2" class="chart-container">
        <svg :width="chartWidth" :height="chartHeight" class="regression-chart">
          <!-- 坐标轴 -->
          <g class="axes">
            <!-- X轴 -->
            <line :x1="margin" :y1="chartHeight - margin" :x2="chartWidth - margin" :y2="chartHeight - margin" stroke="#333" stroke-width="1"/>
            <!-- Y轴 -->
            <line :x1="margin" :y1="margin" :x2="margin" :y2="chartHeight - margin" stroke="#333" stroke-width="1"/>
            
            <!-- X轴刻度 -->
            <g v-for="tick in xTicks" :key="'x-' + tick.value">
              <line :x1="tick.x" :y1="chartHeight - margin" :x2="tick.x" :y2="chartHeight - margin + 5" stroke="#333"/>
              <text :x="tick.x" :y="chartHeight - margin + 18" text-anchor="middle" font-size="10">{{ tick.label }}</text>
            </g>
            
            <!-- Y轴刻度 -->
            <g v-for="tick in yTicks" :key="'y-' + tick.value">
              <line :x1="margin - 5" :y1="tick.y" :x2="margin" :y2="tick.y" stroke="#333"/>
              <text :x="margin - 8" :y="tick.y + 3" text-anchor="end" font-size="10">{{ tick.label }}</text>
            </g>
          </g>

          <!-- 拟合直线 -->
          <line 
            :x1="margin" 
            :y1="getY(xMin)" 
            :x2="chartWidth - margin" 
            :y2="getY(xMax)" 
            stroke="#e74c3c" 
            stroke-width="2"
            class="regression-line"
          />

          <!-- 数据点 -->
          <g class="data-points">
            <circle 
              v-for="(point, index) in dataPoints" 
              :key="index"
              :cx="getChartX(point.x)" 
              :cy="getChartY(point.y)" 
              r="4" 
              fill="#3498db" 
              stroke="#2980b9" 
              stroke-width="1"
              class="data-point"
            />
          </g>

          <!-- Legend -->
          <g class="legend" transform="translate(60, 20)">
            <circle cx="0" cy="0" r="4" fill="#3498db" stroke="#2980b9"/>
            <text x="10" y="4" font-size="12">Data Points</text>
            <line x1="0" y1="15" x2="20" y2="15" stroke="#e74c3c" stroke-width="2"/>
            <text x="25" y="19" font-size="12">Regression Line</text>
          </g>
        </svg>

        <div class="chart-info">
          <p><strong>Fit Quality Assessment:</strong></p>
          <div class="quality-indicator">
            <div class="quality-bar">
              <div class="quality-fill" :style="{ width: (rSquared * 100) + '%' }"></div>
            </div>
            <span>{{ getFitQuality() }}</span>
          </div>
        </div>
      </div>
      <div v-else class="no-data">
        <p>At least 2 data points are required for linear regression analysis</p>
      </div>
    </div>

    <!-- 预测标签页 -->
    <div v-if="activeTab === 'predict'" class="lr-tab-content">
      <div v-if="dataPoints.length >= 2" class="prediction-section">
        <div class="predict-input">
          <label>Enter X value for prediction:</label>
          <input type="number" v-model.number="predictX" placeholder="X value" step="any">
          <button @click="predict" :disabled="predictX === null">Predict Y</button>
        </div>
        
        <div v-if="prediction !== null" class="prediction-result">
          <div class="prediction-card">
            <h5>Prediction Result</h5>
            <div class="prediction-details">
              <p><strong>Input X = {{ predictX }}</strong></p>
              <p><strong>Predicted Y = {{ prediction.toFixed(4) }}</strong></p>
              <p class="confidence">Confidence Interval: {{ (prediction - predictionError).toFixed(4) }} ~ {{ (prediction + predictionError).toFixed(4) }}</p>
            </div>
          </div>
        </div>

        <div class="batch-predict">
          <h5>Batch Prediction</h5>
          <textarea 
            v-model="batchPredictX" 
            placeholder="Enter multiple X values, one per line"
            rows="4"
          ></textarea>
          <button @click="batchPredict">Batch Predict</button>
          
          <div v-if="batchPredictions.length > 0" class="batch-results">
            <h6>Batch Prediction Results:</h6>
            <div class="predictions-table">
              <div class="table-header">
                <span>X Value</span>
                <span>Predicted Y</span>
              </div>
              <div v-for="pred in batchPredictions" :key="pred.x" class="table-row">
                <span>{{ pred.x }}</span>
                <span>{{ pred.y.toFixed(4) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-data">
        <p>At least 2 data points are required for prediction</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PluginLinearRegression',
  emits: ['update'],
  props: {
    title: { type: String, default: 'Linear Regression Analysis' },
    initialData: { type: String, default: '' }
  },
  data() {
    return {
      activeTab: 'input',
      inputMethod: 'manual',
      dataPoints: [],
      newPoint: { x: null, y: null },
      batchData: '',
      parseError: '',
      predictX: null,
      prediction: null,
      predictionError: 0,
      batchPredictX: '',
      batchPredictions: [],
      
      // 图表配置
      chartWidth: 400,
      chartHeight: 300,
      margin: 50
    }
  },
  computed: {
    isValidPoint() {
      return this.newPoint.x !== null && this.newPoint.y !== null && 
             !isNaN(this.newPoint.x) && !isNaN(this.newPoint.y)
    },
    
    // 线性回归计算
    slope() {
      if (this.dataPoints.length < 2) return 0
      const n = this.dataPoints.length
      const sumX = this.dataPoints.reduce((sum, p) => sum + p.x, 0)
      const sumY = this.dataPoints.reduce((sum, p) => sum + p.y, 0)
      const sumXY = this.dataPoints.reduce((sum, p) => sum + p.x * p.y, 0)
      const sumXX = this.dataPoints.reduce((sum, p) => sum + p.x * p.x, 0)
      
      return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    },
    
    intercept() {
      if (this.dataPoints.length < 2) return 0
      const n = this.dataPoints.length
      const sumX = this.dataPoints.reduce((sum, p) => sum + p.x, 0)
      const sumY = this.dataPoints.reduce((sum, p) => sum + p.y, 0)
      
      return (sumY - this.slope * sumX) / n
    },
    
    rSquared() {
      if (this.dataPoints.length < 2) return 0
      const meanY = this.dataPoints.reduce((sum, p) => sum + p.y, 0) / this.dataPoints.length
      const totalSumSquares = this.dataPoints.reduce((sum, p) => sum + Math.pow(p.y - meanY, 2), 0)
      const residualSumSquares = this.dataPoints.reduce((sum, p) => {
        const predicted = this.slope * p.x + this.intercept
        return sum + Math.pow(p.y - predicted, 2)
      }, 0)
      
      return totalSumSquares === 0 ? 1 : 1 - (residualSumSquares / totalSumSquares)
    },
    
    standardError() {
      if (this.dataPoints.length < 3) return 0
      const residualSumSquares = this.dataPoints.reduce((sum, p) => {
        const predicted = this.slope * p.x + this.intercept
        return sum + Math.pow(p.y - predicted, 2)
      }, 0)
      
      return Math.sqrt(residualSumSquares / (this.dataPoints.length - 2))
    },
    
    slopeError() {
      if (this.dataPoints.length < 3) return 0
      const n = this.dataPoints.length
      const sumXX = this.dataPoints.reduce((sum, p) => sum + p.x * p.x, 0)
      const sumX = this.dataPoints.reduce((sum, p) => sum + p.x, 0)
      
      return this.standardError * Math.sqrt(n / (n * sumXX - sumX * sumX))
    },
    
    interceptError() {
      if (this.dataPoints.length < 3) return 0
      const n = this.dataPoints.length
      const sumXX = this.dataPoints.reduce((sum, p) => sum + p.x * p.x, 0)
      const sumX = this.dataPoints.reduce((sum, p) => sum + p.x, 0)
      
      return this.standardError * Math.sqrt(sumXX / (n * sumXX - sumX * sumX))
    },
    
    // 图表范围
    xMin() {
      return Math.min(...this.dataPoints.map(p => p.x))
    },
    
    xMax() {
      return Math.max(...this.dataPoints.map(p => p.x))
    },
    
    yMin() {
      return Math.min(...this.dataPoints.map(p => p.y))
    },
    
    yMax() {
      return Math.max(...this.dataPoints.map(p => p.y))
    },
    
    xRange() {
      return this.xMax - this.xMin || 1
    },
    
    yRange() {
      return this.yMax - this.yMin || 1
    },
    
    // 坐标轴刻度
    xTicks() {
      const ticks = []
      const step = this.xRange / 5
      for (let i = 0; i <= 5; i++) {
        const value = this.xMin + i * step
        ticks.push({
          value,
          x: this.margin + (i / 5) * (this.chartWidth - 2 * this.margin),
          label: value.toFixed(1)
        })
      }
      return ticks
    },
    
    yTicks() {
      const ticks = []
      const step = this.yRange / 5
      for (let i = 0; i <= 5; i++) {
        const value = this.yMin + i * step
        ticks.push({
          value,
          y: this.chartHeight - this.margin - (i / 5) * (this.chartHeight - 2 * this.margin),
          label: value.toFixed(1)
        })
      }
      return ticks
    }
  },
  
  methods: {
    addPoint() {
      if (this.isValidPoint) {
        this.dataPoints.push({ x: this.newPoint.x, y: this.newPoint.y })
        this.newPoint = { x: null, y: null }
        this.emitUpdate()
      }
    },
    
    removePoint(index) {
      this.dataPoints.splice(index, 1)
      this.emitUpdate()
    },
    
    clearPoints() {
      this.dataPoints = []
      this.prediction = null
      this.batchPredictions = []
      this.emitUpdate()
    },
    
    parseBatchData() {
      this.parseError = ''
      try {
        const lines = this.batchData.trim().split('\n')
        const newPoints = []
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim()
          if (!line) continue
          
          const parts = line.split(/[,\t\s]+/)
          if (parts.length !== 2) {
            throw new Error(`Line ${i + 1} format error: "${line}"`)
          }
          
          const x = parseFloat(parts[0])
          const y = parseFloat(parts[1])
          
          if (isNaN(x) || isNaN(y)) {
            throw new Error(`Line ${i + 1} contains invalid numbers: "${line}"`)
          }
          
          newPoints.push({ x, y })
        }
        
        if (newPoints.length === 0) {
          throw new Error('No valid data points found')
        }
        
        this.dataPoints = newPoints
        this.batchData = ''
        this.emitUpdate()
        
      } catch (error) {
        this.parseError = error.message
      }
    },
    
    predict() {
      if (this.predictX !== null && this.dataPoints.length >= 2) {
        this.prediction = this.slope * this.predictX + this.intercept
        this.predictionError = this.standardError * Math.sqrt(1 + 1/this.dataPoints.length + 
          Math.pow(this.predictX - this.dataPoints.reduce((sum, p) => sum + p.x, 0) / this.dataPoints.length, 2) /
          this.dataPoints.reduce((sum, p) => sum + Math.pow(p.x - this.dataPoints.reduce((s, pt) => s + pt.x, 0) / this.dataPoints.length, 2), 0))
        
        this.emitUpdate('predict', { x: this.predictX, y: this.prediction })
      }
    },
    
    batchPredict() {
      const lines = this.batchPredictX.trim().split('\n')
      this.batchPredictions = []
      
      for (const line of lines) {
        const x = parseFloat(line.trim())
        if (!isNaN(x)) {
          const y = this.slope * x + this.intercept
          this.batchPredictions.push({ x, y })
        }
      }
      
      this.emitUpdate('batchPredict', this.batchPredictions)
    },
    
    // 图表坐标转换
    getChartX(x) {
      return this.margin + ((x - this.xMin) / this.xRange) * (this.chartWidth - 2 * this.margin)
    },
    
    getChartY(y) {
      return this.chartHeight - this.margin - ((y - this.yMin) / this.yRange) * (this.chartHeight - 2 * this.margin)
    },
    
    getY(x) {
      const y = this.slope * x + this.intercept
      return this.getChartY(y)
    },
    
    getFitQuality() {
      if (this.rSquared > 0.95) return 'Excellent Fit'
      if (this.rSquared > 0.9) return 'Good Fit'
      if (this.rSquared > 0.7) return 'Fair Fit'
      return 'Poor Fit'
    },
    
    emitUpdate(action = 'update', data = null) {
      this.$emit('update', {
        action,
        at: new Date().toISOString(),
        dataPoints: this.dataPoints.length,
        rSquared: this.rSquared,
        equation: `y = ${this.slope.toFixed(4)}x + ${this.intercept.toFixed(4)}`,
        data
      })
    }
  },
  
  created() {
    if (this.initialData) {
      this.batchData = this.initialData
      this.parseBatchData()
    }
  }
}
</script>

<style scoped>
.plugin-linear-regression {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  max-width: 600px;
  font-family: system-ui, -apple-system, sans-serif;
}

.lr-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.lr-header h4 {
  margin: 0;
  color: #333;
}

.lr-tabs {
  display: flex;
  gap: 4px;
}

.lr-tabs button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: #f8f9fa;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.lr-tabs button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.lr-tab-content {
  min-height: 200px;
}

.method-toggle {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.method-toggle label {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.point-input {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.point-input input {
  flex: 1;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.point-input button {
  padding: 6px 12px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.point-input button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.points-list {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 8px;
}

.points-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-weight: bold;
}

.clear-btn {
  padding: 4px 8px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
}

.point-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background: #f8f9fa;
  border-radius: 3px;
  font-size: 12px;
}

.remove-btn {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
}

.batch-input textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
  font-family: monospace;
}

.batch-input button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}

.regression-results {
  margin-top: 16px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
}

.regression-results h5 {
  margin: 0 0 12px 0;
  color: #333;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}

.result-item label {
  font-weight: bold;
  color: #666;
}

.equation {
  font-family: monospace;
  background: #fff;
  padding: 2px 4px;
  border-radius: 3px;
}

.good-fit {
  color: #28a745;
  font-weight: bold;
}

.fair-fit {
  color: #ffc107;
  font-weight: bold;
}

.chart-container {
  text-align: center;
}

.regression-chart {
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.chart-info {
  margin-top: 12px;
  text-align: left;
}

.quality-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quality-bar {
  width: 100px;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.quality-fill {
  height: 100%;
  background: linear-gradient(to right, #dc3545, #ffc107, #28a745);
  transition: width 0.3s ease;
}

.prediction-section {
  space-y: 16px;
}

.predict-input {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.predict-input input {
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 120px;
}

.predict-input button {
  padding: 6px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.prediction-card {
  background: #e7f3ff;
  border: 1px solid #b3d9ff;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 16px;
}

.prediction-card h5 {
  margin: 0 0 8px 0;
  color: #0066cc;
}

.confidence {
  font-size: 12px;
  color: #666;
}

.batch-predict h5 {
  margin: 16px 0 8px 0;
}

.batch-predict textarea {
  width: 100%;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
}

.predictions-table {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #f8f9fa;
  font-weight: bold;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 6px 8px;
  border-bottom: 1px solid #eee;
}

.table-row:last-child {
  border-bottom: none;
}

.no-data {
  text-align: center;
  color: #666;
  padding: 40px 20px;
}
</style>