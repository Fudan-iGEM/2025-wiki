<template>
  <div v-if="showResistanceSim3D">
    <ResistanceSim3DStandalone @exit="showResistanceSim3D = false" />
  </div>
  <div v-else class="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3
          class="text-2xl md:text-3xl font-bold text-center"
          style="
            background: linear-gradient(135deg, #008794 0%, #0e9f99 50%, #5dcac6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          "
        >
          3D Yeast Growth Simulation
        </h3>
      </div>

      <!-- Control Panel - Full Width Top -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h4 class="text-lg font-semibold mb-4" style="color: #008794">
          Simulation Controls
        </h4>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <button
            @click="togglePause"
            class="flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 h-10 px-4"
            style="
              background: linear-gradient(135deg, #008794 0%, #0e9f99 100%);
              color: white;
              box-shadow: 0 4px 15px rgba(0, 135, 148, 0.3);
            "
          >
            {{ isPaused ? "Start" : "Pause" }}
          </button>
          <button
            @click="handleReset"
            class="flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 h-10 px-4"
            style="
              background: linear-gradient(135deg, #008794 0%, #0e9f99 100%);
              color: white;
              box-shadow: 0 4px 15px rgba(0, 135, 148, 0.3);
            "
          >
            Reset
          </button>
          <button
            @click="resetCamera"
            class="flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 h-10 px-4"
            style="
              background: linear-gradient(135deg, #008794 0%, #0e9f99 100%);
              color: white;
              box-shadow: 0 4px 15px rgba(0, 135, 148, 0.3);
            "
          >
            Reset View
          </button>
          <div class="relative">
            <select
              v-model="yeastType"
              class="w-full h-10 rounded-lg bg-white text-sm appearance-none cursor-pointer transition-all duration-300"
              style="
                border: 2px solid #5dcac6;
                color: #008794;
                font-weight: 600;
                box-shadow: 0 2px 10px rgba(0, 135, 148, 0.1);
                background: linear-gradient(135deg, #ffffff 0%, #f8fafb 100%);
                padding: 8px 36px 8px 12px;
                text-align: center;
                text-align-last: center;
              "
            >
              <option value="snowflake" style="color: #008794; background: white">
                Grape Yeast
              </option>
              <option value="normal" style="color: #008794; background: white">
                Normal Yeast
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            >
              <svg
                class="h-4 w-4 transition-transform duration-200"
                style="color: #5dcac6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          <div class="lg:col-span-2">
            <!-- Speed Control -->
            <div class="mb-2 text-sm font-medium" style="color: #008794">
              Speed: {{ speedMultiplier }}x
            </div>
            <input
              type="range"
              v-model.number="speedMultiplier"
              min="0.5"
              max="3"
              step="0.5"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style="
                background: linear-gradient(to right, #e6f8f7, #5dcac6);
                outline: none;
              "
            />
            <div class="flex justify-between text-xs mt-1" style="color: #008794">
              <span>0.5x</span>
              <span>3x</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left Panel - 3D Visualization -->
        <div class="lg:col-span-7">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h4 class="text-lg font-semibold mb-4" style="color: #008794">
              3D Cell Colony
            </h4>
            <div
              class="relative w-full rounded-lg overflow-hidden"
              style="
                aspect-ratio: 16/10;
                background: linear-gradient(135deg, #e6f8f7 0%, #f8fafb 100%);
                border: 1px solid #5dcac6;
              "
            >
              <canvas
                ref="canvasRef"
                class="w-full h-full cursor-grab active:cursor-grabbing"
                @click="handleMouseClick"
              />
              <!-- Yeast Type Indicator -->
              <div
                class="absolute top-3 right-3 text-white px-3 py-2 rounded-lg text-sm font-semibold"
                :style="
                  yeastType === 'snowflake'
                    ? 'background: linear-gradient(135deg, #5dcac6 0%, #0e9f99 100%); box-shadow: 0 4px 15px rgba(93, 202, 198, 0.3);'
                    : 'background: linear-gradient(135deg, #e97e35 0%, #ffb07b 100%); box-shadow: 0 4px 15px rgba(233, 126, 53, 0.3);'
                "
              >
                {{ yeastType === "snowflake" ? "Grape" : "Normal" }} Yeast
              </div>
              <!-- Selected Cell Info Display -->
              <div
                v-if="selectedCell"
                class="absolute text-white px-3 py-2 rounded-lg text-sm"
                style="background: rgba(0, 135, 148, 0.9); border: 1px solid #5dcac6"
                :style="{
                  left: `${
                    selectedCell.clickPosition ? selectedCell.clickPosition.x : '50%'
                  }px`,
                  top: `${
                    selectedCell.clickPosition ? selectedCell.clickPosition.y : '50%'
                  }px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }"
              >
                Generation {{ selectedCell.id }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel - Charts and Statistics -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Real-time Statistics -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h4 class="text-lg font-semibold mb-4" style="color: #008794">
              Live Statistics
            </h4>
            <div class="space-y-3">
              <div
                class="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <span class="text-sm text-gray-600">Yeast Type</span>
                <span
                  class="font-semibold"
                  :style="
                    yeastType === 'snowflake' ? 'color: #5dcac6;' : 'color: #e97e35;'
                  "
                >
                  {{ yeastType === "snowflake" ? "Grape" : "Normal" }}
                </span>
              </div>
              <div
                class="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <span class="text-sm text-gray-600">Total Cells</span>
                <span class="font-semibold" style="color: #008794">{{
                  stats.totalCells.toLocaleString()
                }}</span>
              </div>
              <div
                class="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <span class="text-sm text-gray-600">Visible Cells</span>
                <span class="font-semibold" style="color: #008794">{{
                  stats.visibleCells
                }}</span>
              </div>
              <div
                class="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <span class="text-sm text-gray-600">Growth Rate</span>
                <span class="font-semibold" style="color: #6fbe02"
                  >{{ stats.growthRate }}%</span
                >
              </div>
              <div
                class="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <span class="text-sm text-gray-600">Simulation Time</span>
                <span class="font-semibold" style="color: #008794"
                  >{{ minutes }}m {{ seconds }}s</span
                >
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-sm text-gray-600">Speed</span>
                <span class="font-semibold" style="color: #008794"
                  >{{ speedMultiplier }}x</span
                >
              </div>
            </div>
          </div>

          <!-- Growth Trends Chart -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h4 class="text-lg font-semibold mb-4" style="color: #008794">
              Growth Trends
            </h4>
            <div ref="growthChartRef" class="w-full h-48"></div>
          </div>

          <!-- Morphology Analysis -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h4 class="text-lg font-semibold mb-4" style="color: #008794">
              Cell Morphology
            </h4>
            <div ref="morphologyChartRef" class="w-full h-40"></div>
          </div>
          <!-- Environment Monitoring -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h4 class="text-lg font-semibold mb-4" style="color: #008794">Environment</h4>
            <div ref="environmentChartRef" class="w-full h-40"></div>
          </div>

          <!-- Division Pattern Analysis -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h4 class="text-lg font-semibold mb-4" style="color: #008794">
              Division Patterns
            </h4>
            <div ref="divisionChartRef" class="w-full h-40"></div>
          </div>
        </div>
      </div>

      <!-- Bottom Panel - Information and Controls -->
      <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
        <h4 class="text-lg font-semibold mb-4" style="color: #008794">
          Simulation Information
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 class="font-semibold mb-3" style="color: #e97e35">Model Description</h5>
            <p class="text-sm text-gray-600 leading-relaxed">
              This software simulates the
              <strong style="color: #008794"
                >three-dimensional growth process of yeast cells</strong
              >, providing a biomathematical modeling framework that describes the
              relationships between
              <strong style="color: #008794"
                >cell morphology, growth rate, division mechanisms</strong
              >
              and environmental conditions (such as oxygen concentration and temperature).
            </p>
            <p class="text-sm text-gray-600 mt-3 leading-relaxed">
              This framework can be further extended to simulate more complex cellular
              growth behaviors or introduce other environmental variables (such as
              nutrient concentration, competition, etc.).
            </p>
          </div>
          <div>
            <h5 class="font-semibold mb-3" style="color: #e97e35">Interaction Guide</h5>
            <div class="space-y-2 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full" style="background: #5dcac6"></div>
                <span><strong>Left-click drag:</strong> Rotate view</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full" style="background: #5dcac6"></div>
                <span><strong>Scroll wheel:</strong> Zoom in/out</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full" style="background: #5dcac6"></div>
                <span><strong>Right-click drag:</strong> Pan view</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full" style="background: #e97e35"></div>
                <span
                  ><strong>{{
                    yeastType === "snowflake" ? "Grape Yeast:" : "Normal Yeast:"
                  }}</strong>
                  {{
                    yeastType === "snowflake"
                      ? "Divides along fixed directions, forming grape-like clusters"
                      : "Multiple divisions, forming natural colony"
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex justify-center mt-6">
        <button
          @click="showResistanceSim3D = true"
          class="px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300"
          style="
            background: linear-gradient(135deg, #008794 0%, #0e9f99 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(0, 135, 148, 0.3);
          "
        >
          Switch to 3D Drug Resistance Gradient Model
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as echarts from "echarts";
import ResistanceSim3DStandalone from "./ResistanceSim3DStandalone.vue";

export default {
  name: "YeastSimulationStandalone",
  components: {
    ResistanceSim3DStandalone,
  },
  setup() {
    // 响应式状态
    const showResistanceSim3D = ref(false);
    const isPaused = ref(true);
    const timeStep = ref(0);
    const speedMultiplier = ref(1);
    const yeastType = ref("snowflake");
    const selectedCell = ref(null);

    const stats = reactive({
      totalCells: 1,
      visibleCells: 0,
      avgLength: 0,
      growthRate: 0,
    });

    // 图表数据
    const chartData = reactive({
      growthHistory: [],
      morphologyData: [],
      environmentData: { oxygen: 10, temperature: 30, ph: 7.2 },
      divisionPatterns: [],
    });

    // 固定环境条件
    const environment = {
      oxygen: 10,
      temperature: 30,
    };

    // 模板引用
    const canvasRef = ref(null);
    const growthChartRef = ref(null);
    const morphologyChartRef = ref(null);
    const environmentChartRef = ref(null);
    const divisionChartRef = ref(null);

    // ECharts实例
    let growthChart = null;
    let morphologyChart = null;
    let environmentChart = null;
    let divisionChart = null;

    // Three.js相关引用
    let scene = null;
    let renderer = null;
    let camera = null;
    let controls = null;
    let cells = [];
    let totalCellCount = 1;
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let cellIdCounter = 1;
    let animationFrameId = null;
    let simulationInterval = null;

    // 常量
    const MAX_VISIBLE_CELLS = 2300;
    const MAX_TOTAL_CELLS = 999999999;
    const MAX_LENGTH_RATIO = 1.8;

    // 计算属性
    const minutes = computed(() => Math.floor(timeStep.value / 10));
    const seconds = computed(() => ((timeStep.value % 10) * 6).toFixed(0));

    // 初始化ECharts图表
    const initCharts = () => {
      nextTick(() => {
        initGrowthChart();
        initMorphologyChart();
        initEnvironmentChart();
        initDivisionChart();
      });
    };

    // 初始化生长趋势图
    const initGrowthChart = () => {
      if (!growthChartRef.value) return;

      growthChart = echarts.init(growthChartRef.value);
      const option = {
        backgroundColor: "transparent",
        grid: {
          left: "10%",
          right: "10%",
          top: "15%",
          bottom: "15%",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          axisLine: { lineStyle: { color: "#008794" } },
          axisLabel: { color: "#64748b", fontSize: 10 },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#008794" } },
          axisLabel: { color: "#64748b", fontSize: 10 },
          splitLine: { lineStyle: { color: "#e6f8f7" } },
        },
        series: [
          {
            name: "Total Cells",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 4,
            lineStyle: {
              color: "#008794",
              width: 2,
            },
            itemStyle: {
              color: "#008794",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(0, 135, 148, 0.3)" },
                  { offset: 1, color: "rgba(0, 135, 148, 0.05)" },
                ],
              },
            },
            data: [],
          },
          {
            name: "Growth Rate",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 4,
            yAxisIndex: 1,
            lineStyle: {
              color: "#6fbe02",
              width: 2,
            },
            itemStyle: {
              color: "#6fbe02",
            },
            data: [],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Cell Count",
            axisLine: { lineStyle: { color: "#008794" } },
            axisLabel: { color: "#64748b", fontSize: 10 },
            splitLine: { lineStyle: { color: "#e6f8f7" } },
          },
          {
            type: "value",
            name: "Growth Rate (%)",
            axisLine: { lineStyle: { color: "#6fbe02" } },
            axisLabel: { color: "#64748b", fontSize: 10 },
            splitLine: { show: false },
          },
        ],
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#008794",
          textStyle: { color: "#333" },
        },
      };
      growthChart.setOption(option);
    };

    // 初始化形态分析图
    const initMorphologyChart = () => {
      if (!morphologyChartRef.value) return;

      morphologyChart = echarts.init(morphologyChartRef.value);
      const option = {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#008794",
          textStyle: { color: "#333" },
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          bottom: "5%",
          left: "center",
          textStyle: { color: "#64748b", fontSize: 10 },
        },
        series: [
          {
            name: "Cell Morphology",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["50%", "45%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: "bold",
                color: "#008794",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 60, name: "Normal Shape", itemStyle: { color: "#5dcac6" } },
              { value: 30, name: "Elongated", itemStyle: { color: "#e97e35" } },
              { value: 10, name: "Dividing", itemStyle: { color: "#ffb07b" } },
            ],
          },
        ],
      };
      morphologyChart.setOption(option);
    };

    // 初始化环境监控图
    const initEnvironmentChart = () => {
      if (!environmentChartRef.value) return;

      environmentChart = echarts.init(environmentChartRef.value);
      const option = {
        backgroundColor: "transparent",
        radar: {
          indicator: [
            { name: "Oxygen", min: 0, max: 20, color: "#64748b" },
            { name: "Temperature", min: 0, max: 40, color: "#64748b" },
            { name: "pH", min: 0, max: 12, color: "#64748b" },
            { name: "Growth Rate", min: 0, max: 100, color: "#64748b" },
          ],
          shape: "circle",
          splitNumber: 4,
          axisLine: { lineStyle: { color: "#e6f8f7" } },
          splitLine: { lineStyle: { color: "#e6f8f7" } },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(0, 135, 148, 0.05)", "rgba(0, 135, 148, 0.1)"],
            },
          },
          axisName: {
            color: "#64748b"
          },
          axisNameGap: 5,
        },
        series: [
          {
            name: "Environment",
            type: "radar",
            data: [
              {
                value: [10, 30, 7.2, 50],
                name: "Current",
                itemStyle: {
                  color: yeastType.value === "snowflake" ? "#5dcac6" : "#e97e35",
                },
                areaStyle: {
                  color:
                    yeastType.value === "snowflake"
                      ? "rgba(93, 202, 198, 0.2)"
                      : "rgba(233, 126, 53, 0.2)",
                },
              },
            ],
          },
        ],
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#008794",
          textStyle: { color: "#333" },
        },
      };
      environmentChart.setOption(option);
    };

    // 初始化分裂模式图
    const initDivisionChart = () => {
      if (!divisionChartRef.value) return;

      divisionChart = echarts.init(divisionChartRef.value);
      const option = {
        backgroundColor: "transparent",
        grid: {
          left: "15%",
          right: "10%",
          top: "15%",
          bottom: "15%",
        },
        xAxis: {
          type: "category",
          data: ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5+"],
          axisLine: { lineStyle: { color: "#008794" } },
          axisLabel: { color: "#64748b", fontSize: 10 },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#008794" } },
          axisLabel: { color: "#64748b", fontSize: 10 },
          splitLine: { lineStyle: { color: "#e6f8f7" } },
        },
        series: [
          {
            name: "Cell Count",
            type: "bar",
            data: [1, 2, 4, 8, 16],
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: yeastType.value === "snowflake" ? "#5dcac6" : "#e97e35",
                  },
                  { offset: 1, color: "#008794" },
                ],
              },
            },
            emphasis: {
              itemStyle: {
                color: "#0e9f99",
              },
            },
          },
        ],
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: "#008794",
          textStyle: { color: "#333" },
        },
      };
      divisionChart.setOption(option);
    };

    // 更新图表数据
    const updateCharts = () => {
      updateGrowthChart();
      updateMorphologyChart();
      updateEnvironmentChart();
      updateDivisionChart();
    };

    const updateGrowthChart = () => {
      if (!growthChart) return;

      const timeLabel = `${minutes.value}:${seconds.value.padStart(2, "0")}`;
      chartData.growthHistory.push({
        time: timeLabel,
        total: stats.totalCells,
        growthRate: parseFloat(stats.growthRate),
      });

      // 保持最近50个数据点
      if (chartData.growthHistory.length > 50) {
        chartData.growthHistory.shift();
      }

      const times = chartData.growthHistory.map((d) => d.time);
      const totalData = chartData.growthHistory.map((d) => d.total);
      const growthData = chartData.growthHistory.map((d) => d.growthRate);

      growthChart.setOption({
        xAxis: { data: times },
        series: [{ data: totalData }, { data: growthData }],
      });
    };

    const updateMorphologyChart = () => {
      if (!morphologyChart) return;

      const aliveCells = cells.filter(
        (cell) => !cell.userData.isDead && !cell.userData.dying
      );
      const normalCells = aliveCells.filter((cell) => cell.scale.x <= 1.2).length;
      const elongatedCells = aliveCells.filter((cell) => cell.scale.x > 1.2).length;
      const dividingCells = aliveCells.filter((cell) => cell.userData.dividing).length;

      morphologyChart.setOption({
        series: [
          {
            data: [
              {
                value: normalCells,
                name: "Normal Shape",
                itemStyle: { color: "#5dcac6" },
              },
              {
                value: elongatedCells,
                name: "Elongated",
                itemStyle: { color: "#e97e35" },
              },
              { value: dividingCells, name: "Dividing", itemStyle: { color: "#ffb07b" } },
            ],
          },
        ],
      });
    };

    const updateEnvironmentChart = () => {
      if (!environmentChart) return;

      const currentGrowthRate = parseFloat(stats.growthRate);

      environmentChart.setOption({
        series: [
          {
            data: [
              {
                value: [
                  environment.oxygen,
                  environment.temperature,
                  7.2,
                  currentGrowthRate,
                ],
                name: "Current",
                itemStyle: {
                  color: yeastType.value === "snowflake" ? "#5dcac6" : "#e97e35",
                },
                areaStyle: {
                  color:
                    yeastType.value === "snowflake"
                      ? "rgba(93, 202, 198, 0.2)"
                      : "rgba(233, 126, 53, 0.2)",
                },
              },
            ],
          },
        ],
      });
    };

    const updateDivisionChart = () => {
      if (!divisionChart) return;

      // 统计各代细胞数量
      const generationCounts = [0, 0, 0, 0, 0];
      cells.forEach((cell) => {
        if (!cell.userData.isDead && !cell.userData.dying) {
          const gen = Math.min(cell.userData.divisionCount, 4);
          generationCounts[gen]++;
        }
      });

      divisionChart.setOption({
        series: [
          {
            data: generationCounts,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: yeastType.value === "snowflake" ? "#5dcac6" : "#e97e35",
                  },
                  { offset: 1, color: "#008794" },
                ],
              },
            },
          },
        ],
      });
    };

    // 窗口大小调整处理
    const handleResize = () => {
      if (growthChart) growthChart.resize();
      if (morphologyChart) morphologyChart.resize();
      if (environmentChart) environmentChart.resize();
      if (divisionChart) divisionChart.resize();
    };

    // 监听酵母类型变化，更新图表颜色
    watch(yeastType, () => {
      updateCharts();
    });

    // 计算细胞长度
    const calculateCellLength = (oxygen) => {
      if (yeastType.value === "normal") {
        return 1.0;
      } else {
        if (oxygen >= 20) {
          return 1.0;
        } else {
          const lengthIncrease = ((20 - oxygen) / 20) * (MAX_LENGTH_RATIO - 1.0);
          return Math.min(1.0 + lengthIncrease, MAX_LENGTH_RATIO);
        }
      }
    };

    // 创建酵母细胞
    const createYeastCell = (position, oxygen, parentCellId = null) => {
      const length = calculateCellLength(oxygen);
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      geometry.scale(length, 1, 1);

      const cellColor =
        yeastType.value === "normal"
          ? new THREE.Color(0x90ee90)
          : new THREE.Color(0x00ffff);
      const cellGlowColor =
        yeastType.value === "normal"
          ? new THREE.Color(0x98fb98)
          : new THREE.Color(0x40e0d0);

      const customMaterial = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: cellColor },
          glowColor: { value: cellGlowColor },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform vec3 glowColor;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            float rim = pow(1.0 - abs(dot(vNormal, vec3(0, 0, 1.0))), 1.8);
            float edge = smoothstep(0.2, 1.0, abs(vPosition.x));
            float centerDim = smoothstep(0.0, 0.5, abs(vPosition.x));
            vec3 finalColor = mix(color, glowColor, rim + edge * 0.4);
            float alpha = 0.15 + rim * 0.2 + edge * 0.15 - centerDim * 0.05;
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      });

      const cell = new THREE.Mesh(geometry, customMaterial);
      cell.castShadow = true;
      cell.receiveShadow = true;

      // 创建细胞核
      const nucleusGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const nucleusColor = 0xffa500;
      const nucleusMaterial = new THREE.MeshPhongMaterial({
        color: nucleusColor,
        emissive: nucleusColor,
        emissiveIntensity: 0.3,
        specular: 0xffffff,
        shininess: 100,
      });
      const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
      nucleus.position.set(0, 0, 0);
      cell.add(nucleus);

      // 设置位置
      if (position) {
        cell.position.copy(position);
      } else {
        cell.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 10
        );
      }

      // 设置用户数据
      cell.userData = {
        growthStage: 0,
        dividing: false,
        createdAtOxygen: oxygen,
        divisionCount: 0,
        growthRateModifier: 0.6 + Math.random() * 0.8,
        divisionDelay: Math.random() * 0.3,
        canDivide: true,
        isInitialCell: false,
        isChildOfDividedCell: parentCellId ? true : false,
        cellId: parentCellId ? parentCellId + 1 : cellIdCounter,
      };

      return cell;
    };

    // 添加初始细胞
    const addInitialCell = () => {
      cellIdCounter = 1;
      const cell = createYeastCell(new THREE.Vector3(0, 0, 0), environment.oxygen);
      cell.userData.divisionCount = 0;
      cell.userData.isInitialCell = true;
      cell.userData.cellId = 1;

      if (yeastType.value === "snowflake") {
        cell.userData.divisionDelay = 0.1;
        cell.userData.directionDelays = [
          0.1,
          0.3,
          0.5,
          0.7,
          0.2,
          0.4,
          0.6,
          0.8,
          0.15,
          0.25,
        ];
      } else {
        cell.userData.divisionDelay = 0.05;
        cell.userData.directionDelays = [0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75];
      }

      scene.add(cell);
      cells = [cell];
      totalCellCount = 1;
      updateStats();
    };

    // 管理可见细胞数量
    const manageVisibleCells = () => {
      while (cells.length > MAX_VISIBLE_CELLS) {
        const cellsWithDistance = cells.map((cell, index) => {
          const distanceToCenter = cell.position.length();
          const isImportantCell = cell.userData.isInitialCell || distanceToCenter < 5;

          return {
            cell,
            index,
            distanceToCenter,
            isImportantCell,
          };
        });

        const nonImportantCells = cellsWithDistance
          .filter((item) => !item.isImportantCell)
          .sort((a, b) => b.distanceToCenter - a.distanceToCenter);

        if (nonImportantCells.length > 0) {
          const cellToRemove = nonImportantCells[0];
          scene.remove(cellToRemove.cell);
          cells.splice(cellToRemove.index, 1);
        } else {
          cellsWithDistance.sort((a, b) => b.distanceToCenter - a.distanceToCenter);
          const cellToRemove = cellsWithDistance[0];
          scene.remove(cellToRemove.cell);
          cells.splice(cellToRemove.index, 1);
        }
      }
    };

    // 完整的细胞分裂过程（恢复原版功能）
    const divideCellProcess = (parentCell) => {
      // 如果细胞正在分裂，则不继续
      if (parentCell.userData.dividing) return;

      // 判断是否为初始细胞（位于原点）
      const isInitialCell =
        parentCell.position.x === 0 &&
        parentCell.position.y === 0 &&
        parentCell.position.z === 0;

      // 根据酵母类型应用不同的分裂规则
      if (yeastType.value === "snowflake") {
        // 雪花酵母的分裂规则：
        // 如果是初始细胞且已经分裂了10次，则不再分裂（修改为10个方向：8个卦限+X轴正负方向）
        if (isInitialCell && parentCell.userData.divisionCount >= 10) return;

        // 如果不是初始细胞且已经分裂过，则不再分裂
        if (!isInitialCell && parentCell.userData.divisionCount >= 1) return;
      } else {
        // 普通酵母的分裂规则：
        // 如果是初始细胞且已经分裂了8次，则不再分裂（允许8个方向分裂）
        if (isInitialCell && parentCell.userData.divisionCount >= 8) return;

        // 如果不是初始细胞且已经分裂过，则不再分裂
        if (!isInitialCell && parentCell.userData.divisionCount >= 1) return;
      }

      parentCell.userData.dividing = true; // 设置为正在分裂
      parentCell.userData.divisionCount++; // 增加分裂次数

      // 根据酵母类型应用不同的子细胞产生逻辑
      let produceTwoCells;
      // 检查是否是已分裂细胞的子细胞
      const isChildOfDividedCell = parentCell.userData.isChildOfDividedCell;

      if (yeastType.value === "snowflake") {
        // 雪花酵母：初始细胞必定产生一个子细胞
        // 如果是已分裂细胞的子细胞，则分裂概率降低到30%（原来60%的50%）
        // 其他细胞有60%概率产生两个子细胞
        if (isChildOfDividedCell) {
          produceTwoCells = !isInitialCell && Math.random() < 0.3; // 降低到30%
        } else {
          produceTwoCells = !isInitialCell && Math.random() < 0.6;
        }
      } else {
        // 普通酵母：初始细胞必定产生一个子细胞
        // 如果是已分裂细胞的子细胞，则分裂概率降低到30%（原来60%的50%）
        // 其他细胞有60%概率产生两个子细胞
        if (isChildOfDividedCell) {
          produceTwoCells = !isInitialCell && Math.random() < 0.3; // 降低到30%
        } else {
          produceTwoCells = !isInitialCell && Math.random() < 0.6;
        }
      }

      // 创建第一个新细胞，传递父细胞的ID
      const newCell1 = createYeastCell(
        null,
        environment.oxygen,
        parentCell.userData.cellId
      );

      // 如果父细胞已经产生了两个子细胞，则标记这些子细胞
      if (produceTwoCells) {
        newCell1.userData.isChildOfDividedCell = true;
      }

      // 如果需要产生第二个子细胞，则创建
      let newCell2 = null;
      if (produceTwoCells) {
        newCell2 = createYeastCell(null, environment.oxygen, parentCell.userData.cellId);
        // 标记第二个子细胞
        newCell2.userData.isChildOfDividedCell = true;
      }

      // 添加新细胞到场景 - 确保所有新细胞都被添加到场景中
      scene.add(newCell1);
      cells.push(newCell1);

      if (produceTwoCells && newCell2) {
        scene.add(newCell2);
        cells.push(newCell2);
      }

      // 在添加新细胞后管理可见细胞数量
      if (cells.length > MAX_VISIBLE_CELLS) {
        manageVisibleCells();
      }

      // 更新总细胞数
      const cellsToAdd = produceTwoCells ? 2 : 1;
      totalCellCount = Math.min(totalCellCount + cellsToAdd, MAX_TOTAL_CELLS);

      // 计算父细胞的长轴方向（假设X轴是长轴）
      const parentLongAxis = new THREE.Vector3(1, 0, 0).applyQuaternion(
        parentCell.quaternion
      );

      // 计算从中心点到父细胞的方向向量
      const centerToParent = new THREE.Vector3();
      centerToParent.copy(parentCell.position);
      const distanceFromCenter = centerToParent.length();

      // 使用固定的分裂距离
      const cellLength = parentCell.scale.x;
      const separationDistance = cellLength * 2.3;
      let progress = 0;

      // 根据酵母类型应用不同的分裂方向逻辑
      let directionVector1, directionVector2;

      if (isInitialCell) {
        if (yeastType.value === "snowflake") {
          // 雪花酵母的初始细胞分裂方向逻辑 - 修改为八卦限方向（立方体8个顶点）
          // 生成随机角度偏移（5-15度之间）
          const randomAngleOffset = (5 + Math.random() * 10) * (Math.PI / 180);
          const randomAxisOffset = new THREE.Vector3(
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3
          ).normalize();

          // 定义10个方向向量：立方体8个顶点（八卦限方向）加上X轴正负方向
          const snowflakeDirections = [
            new THREE.Vector3(1, 1, 1), // 右上前
            new THREE.Vector3(1, 1, -1), // 右上后
            new THREE.Vector3(1, -1, 1), // 右下前
            new THREE.Vector3(1, -1, -1), // 右下后
            new THREE.Vector3(-1, 1, 1), // 左上前
            new THREE.Vector3(-1, 1, -1), // 左上后
            new THREE.Vector3(-1, -1, 1), // 左下前
            new THREE.Vector3(-1, -1, -1), // 左下后
            new THREE.Vector3(1, 0, 0), // X轴正方向
            new THREE.Vector3(-1, 0, 0), // X轴负方向
          ];

          // 确保所有方向向量都是单位向量
          snowflakeDirections.forEach((dir) => dir.normalize());

          // 根据已分裂的次数决定分裂方向，并添加随机偏移
          let baseDirection;
          const divisionIndex = parentCell.userData.divisionCount - 1; // 索引从0开始

          if (divisionIndex < snowflakeDirections.length) {
            baseDirection = snowflakeDirections[divisionIndex];
          } else {
            // 如果分裂次数超过10次，使用随机方向
            baseDirection = new THREE.Vector3(
              Math.random() - 0.5,
              Math.random() - 0.5,
              Math.random() - 0.5
            ).normalize();
          }

          // 使用初始细胞中设置的方向延迟时间
          if (
            parentCell.userData.directionDelays &&
            divisionIndex < parentCell.userData.directionDelays.length
          ) {
            newCell1.userData.divisionDelay =
              parentCell.userData.directionDelays[divisionIndex] + Math.random() * 0.1;
          } else {
            // 如果没有设置方向延迟时间，则使用默认值
            newCell1.userData.divisionDelay =
              0.1 + divisionIndex * 0.1 + Math.random() * 0.1;
          }

          // 创建一个四元数来表示随机旋转
          const rotationAxis = new THREE.Vector3()
            .crossVectors(baseDirection, randomAxisOffset)
            .normalize();
          const rotationQuaternion = new THREE.Quaternion().setFromAxisAngle(
            rotationAxis,
            randomAngleOffset
          );

          // 应用旋转到基础方向向量
          directionVector1 = baseDirection.clone().applyQuaternion(rotationQuaternion);

          // 根据分裂方向调整分离距离
          // 判断是否为八卦限方向（前8个方向）
          const isOctantDirection = divisionIndex < 8;
          // 判断是否为X轴方向（后2个方向）
          const isXAxisDirection = divisionIndex >= 8 && divisionIndex < 10;

          // 八卦限方向使用80%的分离距离，X轴方向使用正常分离距离
          if (isOctantDirection) {
            newCell1.userData.separationFactor = 0.8; // 八卦限方向使用80%的分离距离
          } else if (isXAxisDirection) {
            newCell1.userData.separationFactor = 1.0; // X轴方向使用正常分离距离
          } else {
            newCell1.userData.separationFactor = 0.9; // 其他方向使用90%的分离距离
          }
        } else {
          // 普通酵母的初始细胞分裂方向逻辑 - 八个卦限方向（立方体8个顶点）
          // 生成随机角度偏移（5-15度之间）
          const randomAngleOffset = (5 + Math.random() * 10) * (Math.PI / 180);
          const randomAxisOffset = new THREE.Vector3(
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.3
          ).normalize();

          // 定义8个方向向量：立方体8个顶点（八卦限方向）
          const normalDirections = [
            new THREE.Vector3(1, 1, 1), // 右上前
            new THREE.Vector3(1, 1, -1), // 右上后
            new THREE.Vector3(1, -1, 1), // 右下前
            new THREE.Vector3(1, -1, -1), // 右下后
            new THREE.Vector3(-1, 1, 1), // 左上前
            new THREE.Vector3(-1, 1, -1), // 左上后
            new THREE.Vector3(-1, -1, 1), // 左下前
            new THREE.Vector3(-1, -1, -1), // 左下后
          ];

          // 确保所有方向向量都是单位向量
          normalDirections.forEach((dir) => dir.normalize());

          // 根据已分裂的次数决定分裂方向，并添加随机偏移
          let baseDirection;
          const divisionIndex = parentCell.userData.divisionCount - 1; // 索引从0开始

          if (divisionIndex < normalDirections.length) {
            baseDirection = normalDirections[divisionIndex];
          } else {
            // 如果分裂次数超过8次，使用随机方向
            baseDirection = new THREE.Vector3(
              Math.random() - 0.5,
              Math.random() - 0.5,
              Math.random() - 0.5
            ).normalize();
          }

          // 使用初始细胞中设置的方向延迟时间
          if (
            parentCell.userData.directionDelays &&
            divisionIndex < parentCell.userData.directionDelays.length
          ) {
            newCell1.userData.divisionDelay =
              parentCell.userData.directionDelays[divisionIndex] + Math.random() * 0.05;
          } else {
            // 如果没有设置方向延迟时间，则使用默认值
            newCell1.userData.divisionDelay =
              0.05 + divisionIndex * 0.05 + Math.random() * 0.05;
          }

          // 创建一个四元数来表示随机旋转
          const rotationAxis = new THREE.Vector3()
            .crossVectors(baseDirection, randomAxisOffset)
            .normalize();
          const rotationQuaternion = new THREE.Quaternion().setFromAxisAngle(
            rotationAxis,
            randomAngleOffset
          );

          // 应用旋转到基础方向向量
          directionVector1 = baseDirection.clone().applyQuaternion(rotationQuaternion);

          // 为普通酵母设置更大的分离距离，避免细胞重叠
          newCell1.userData.separationFactor = 1.2; // 使用120%的分离距离
        }
      } else {
        // 非初始细胞的分裂方向逻辑
        // 为雪花酵母和普通酵母设置不同的分裂角度
        const maxAngle =
          yeastType.value === "snowflake" ? 15 * (Math.PI / 180) : 60 * (Math.PI / 180);
        const randomAngle = Math.acos(Math.pow(Math.random(), 1 / 3)) * maxAngle;
        const randomDirection = Math.random() * Math.PI * 2;

        const tempUp = new THREE.Vector3(0, 1, 0);
        if (Math.abs(parentLongAxis.dot(tempUp)) > 0.99) {
          tempUp.set(0, 0, 1);
        }

        const perpAxis1 = new THREE.Vector3()
          .crossVectors(parentLongAxis, tempUp)
          .normalize();
        const perpAxis2 = new THREE.Vector3()
          .crossVectors(parentLongAxis, perpAxis1)
          .normalize();

        directionVector1 = new THREE.Vector3().copy(parentLongAxis);
        directionVector1.addScaledVector(
          perpAxis1,
          Math.sin(randomAngle) * Math.cos(randomDirection)
        );
        directionVector1.addScaledVector(
          perpAxis2,
          Math.sin(randomAngle) * Math.sin(randomDirection)
        );
        directionVector1.normalize();

        if (produceTwoCells) {
          const randomAngle2 = Math.acos(Math.pow(Math.random(), 1 / 3)) * maxAngle;
          // 修改这里，增大两个子细胞之间的夹角，确保接近180度
          const randomDirection2 =
            randomDirection + Math.PI + (Math.random() - 0.5) * Math.PI * 0.2;

          directionVector2 = new THREE.Vector3().copy(parentLongAxis);
          directionVector2.addScaledVector(
            perpAxis1,
            Math.sin(randomAngle2) * Math.cos(randomDirection2)
          );
          directionVector2.addScaledVector(
            perpAxis2,
            Math.sin(randomAngle2) * Math.sin(randomDirection2)
          );
          directionVector2.normalize();
        }

        // 为普通酵母设置更大的分离距离，避免细胞重叠
        if (yeastType.value === "normal") {
          newCell1.userData.separationFactor = 1.2;
          if (produceTwoCells && newCell2) {
            newCell2.userData.separationFactor = 1.2;
          }
        }
      }

      // 为第一个子细胞设置旋转
      const rotationMatrix1 = new THREE.Matrix4();
      const up = new THREE.Vector3(0, 1, 0);
      const right1 = new THREE.Vector3().crossVectors(directionVector1, up).normalize();
      const adjustedUp1 = new THREE.Vector3()
        .crossVectors(right1, directionVector1)
        .normalize();

      rotationMatrix1.makeBasis(
        directionVector1, // 将x轴（最长轴）对齐到分裂方向
        adjustedUp1, // y轴
        right1 // z轴
      );

      const quaternion1 = new THREE.Quaternion();
      quaternion1.setFromRotationMatrix(rotationMatrix1);
      newCell1.setRotationFromQuaternion(quaternion1);

      // 如果有第二个子细胞，设置它的旋转
      if (produceTwoCells && newCell2) {
        const rotationMatrix2 = new THREE.Matrix4();
        const right2 = new THREE.Vector3().crossVectors(directionVector2, up).normalize();
        const adjustedUp2 = new THREE.Vector3()
          .crossVectors(right2, directionVector2)
          .normalize();

        rotationMatrix2.makeBasis(directionVector2, adjustedUp2, right2);

        const quaternion2 = new THREE.Quaternion();
        quaternion2.setFromRotationMatrix(rotationMatrix2);
        newCell2.setRotationFromQuaternion(quaternion2);
      }

      // 动画实现细胞分裂过程
      const animate = () => {
        if (progress >= 1) {
          parentCell.userData.dividing = false; // 分裂完成
          parentCell.userData.growthStage = 0; // 重置生长阶段
          updateStats(); // 更新统计数据
          return;
        }

        progress += 0.015; // 减慢分裂动画的速度

        // 更新第一个子细胞的位置，根据separationFactor调整分离距离
        const separationFactor = newCell1.userData.separationFactor || 1.0; // 默认为1.0
        const adjustedSeparationDistance = separationDistance * 1.18 * separationFactor; // 应用分离因子
        newCell1.position
          .copy(parentCell.position)
          .addScaledVector(directionVector1, adjustedSeparationDistance * progress);

        // 如果有第二个子细胞，更新它的位置
        if (produceTwoCells && newCell2) {
          const separationFactor2 = newCell2.userData.separationFactor || 1.0; // 默认为1.0
          const adjustedSeparationDistance2 =
            separationDistance * 1.18 * separationFactor2; // 应用分离因子
          newCell2.position
            .copy(parentCell.position)
            .addScaledVector(directionVector2, adjustedSeparationDistance2 * progress);
        }

        requestAnimationFrame(animate); // 递归调用动画
      };

      animate();
    };

    // 更新统计数据
    const updateStats = () => {
      const visibleCells = cells.length;
      const avgLength =
        visibleCells > 0
          ? cells.reduce((sum, cell) => sum + cell.scale.x, 0) / visibleCells
          : 0;

      stats.totalCells = totalCellCount;
      stats.visibleCells = visibleCells;
      stats.avgLength = avgLength.toFixed(2);
      stats.growthRate = calculateGrowthRate();
    };

    // 计算生长速率
    const calculateGrowthRate = () => {
      const baseRate = 0.15;
      const timeMultiplier = Math.min(timeStep.value / 200, 3);
      const oxygenEffect = 0.8;
      const temperatureEffect = 1.0;
      return (
        baseRate *
        (1 + timeMultiplier) *
        oxygenEffect *
        temperatureEffect *
        speedMultiplier.value *
        100
      ).toFixed(2);
    };

    // 处理鼠标点击
    const handleMouseClick = (event) => {
      const rect = canvasRef.value.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cells);

      if (intersects.length > 0) {
        const selectedCellObj = intersects[0].object;
        selectedCell.value = {
          id: selectedCellObj.userData.cellId,
          position: selectedCellObj.position.clone(),
          clickPosition: {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          },
        };
      } else {
        selectedCell.value = null;
      }
    };

    // 暂停/开始切换
    const togglePause = () => {
      isPaused.value = !isPaused.value;
    };

    // 重置模拟
    const handleReset = () => {
      cells.forEach((cell) => {
        scene.remove(cell);
      });
      cells = [];
      totalCellCount = 1;
      cellIdCounter = 1;
      selectedCell.value = null;
      addInitialCell();
      timeStep.value = 0;
      isPaused.value = true;

      // 重置图表数据
      chartData.growthHistory = [];
      updateCharts();
    };

    // 重置相机
    const resetCamera = () => {
      if (camera && controls) {
        camera.position.set(0, 0, 30);
        controls.target.set(0, 0, 0);
        controls.update();
      }
    };

    // 初始化Three.js场景
    const initThreeJS = async () => {
      await nextTick();

      if (!canvasRef.value || showResistanceSim3D.value) return;

      scene = new THREE.Scene();
      scene.background = null;

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 30);
      camera.lookAt(scene.position);

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const resizeRenderer = () => {
        const container = canvasRef.value?.parentElement;
        if (container && renderer && camera) {
          const width = container.clientWidth;
          const height = container.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      };

      resizeRenderer();
      window.addEventListener("resize", resizeRenderer);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 3;
      controls.maxDistance = 40;
      controls.enablePan = true;
      controls.panSpeed = 1.0;
      controls.screenSpacePanning = true;

      // 添加光源
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 3);
      pointLight.position.set(10, 10, 10);
      pointLight.castShadow = true;
      scene.add(pointLight);

      const spotLight = new THREE.SpotLight(0xffffff, 2);
      spotLight.position.set(15, 40, 35);
      spotLight.castShadow = true;
      scene.add(spotLight);

      addInitialCell();

      // 动画循环
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (!isPaused.value) {
          cells.forEach((cell) => {
            if (!cell.userData.dividing) {
              cell.userData.growthStage += calculateGrowthRate() / 2000;
              if (cell.userData.growthStage >= 1 + cell.userData.divisionDelay) {
                divideCellProcess(cell);
              }
            }
          });

          cells.forEach((cell) => {
            const targetLength = calculateCellLength(environment.oxygen);
            cell.scale.x += (targetLength - cell.scale.x) * 0.1;
          });

          updateStats();
        }

        if (controls) {
          controls.update();
        }
        
        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };

      animate();
    };

    // 清理Three.js资源
    const cleanupThreeJS = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
      }

      if (scene) {
        scene.clear();
        scene = null;
      }
      if (renderer) {
        renderer.dispose();
        renderer = null;
      }
      if (controls) {
        controls.dispose();
        controls = null;
      }
      camera = null;
      cells = [];
    };

    // 设置模拟定时器
    const setupSimulationTimer = () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }

      if (!isPaused.value) {
        const intervalTime = Math.max(10, Math.floor(50 / speedMultiplier.value));
        simulationInterval = setInterval(() => {
          timeStep.value += 1;

          cells.forEach((cell) => {
            if (!cell.userData.dividing) {
              const growthRate =
                (calculateGrowthRate() / 2000) * cell.userData.growthRateModifier;
              cell.userData.growthStage += growthRate;

              const targetLength = calculateCellLength(environment.oxygen);
              cell.scale.x += (targetLength - cell.scale.x) * 0.1;

              if (cell.userData.growthStage >= 1 + cell.userData.divisionDelay) {
                divideCellProcess(cell);
              }
            }
          });

          updateStats();

          // 每5步更新一次图表以提高性能
          if (timeStep.value % 5 === 0) {
            updateCharts();
          }
        }, intervalTime);
      }
    };

    // 监听变化
    watch([isPaused, speedMultiplier], setupSimulationTimer, { immediate: true });

    watch(
      showResistanceSim3D,
      (newVal) => {
        if (!newVal) {
          setTimeout(initThreeJS, 100);
        } else {
          cleanupThreeJS();
        }
      },
      { immediate: true }
    );

    // 生命周期
    onMounted(() => {
      if (!showResistanceSim3D.value) {
        initThreeJS();
      }
      initCharts();
      window.addEventListener("resize", handleResize);
    });

    onUnmounted(() => {
      cleanupThreeJS();
      window.removeEventListener("resize", handleResize);

      // 清理ECharts实例
      if (growthChart) growthChart.dispose();
      if (morphologyChart) morphologyChart.dispose();
      if (environmentChart) environmentChart.dispose();
      if (divisionChart) divisionChart.dispose();
    });

    return {
      // 响应式数据
      showResistanceSim3D,
      isPaused,
      timeStep,
      speedMultiplier,
      yeastType,
      selectedCell,
      stats,
      minutes,
      seconds,

      // 模板引用
      canvasRef,
      growthChartRef,
      morphologyChartRef,
      environmentChartRef,
      divisionChartRef,

      // 方法
      togglePause,
      handleReset,
      resetCamera,
      handleMouseClick,
    };
  },
};
</script>

<style scoped>
/* Enhanced responsive styles with project color scheme */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #008794, #5dcac6);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 135, 148, 0.3);
  transition: all 0.3s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 135, 148, 0.4);
}

input[type="range"]::-webkit-slider-track {
  height: 6px;
  background: linear-gradient(to right, #e6f8f7, #5dcac6);
  border-radius: 3px;
}

input[type="range"]::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #008794, #5dcac6);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 135, 148, 0.3);
  transition: all 0.3s ease;
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 135, 148, 0.4);
}

input[type="range"]::-moz-range-track {
  height: 6px;
  background: linear-gradient(to right, #e6f8f7, #5dcac6);
  border-radius: 3px;
  border: none;
}

/* Select dropdown styling */
select:focus {
  outline: none !important;
  border-color: #008794 !important;
  box-shadow: 0 0 0 3px rgba(0, 135, 148, 0.1) !important;
}

select:hover {
  border-color: #0e9f99 !important;
  box-shadow: 0 4px 15px rgba(0, 135, 148, 0.15) !important;
}

/* Dropdown arrow animation */
.relative:hover svg {
  transform: translateY(-1px);
  color: #008794 !important;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr !important;
  }

  .lg\:col-span-4,
  .lg\:col-span-5,
  .lg\:col-span-3 {
    grid-column: span 1 !important;
  }
}

@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: 1fr !important;
  }

  .text-2xl {
    font-size: 1.5rem !important;
  }

  .md\:text-3xl {
    font-size: 1.75rem !important;
  }
}
</style>
