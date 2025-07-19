<template>
  <div class="w-full max-w-5xl mx-auto bg-white rounded-lg border shadow-sm">
    <!-- Header -->
    <div class="flex flex-col space-y-1.5 p-6">
      <h3
        class="text-2xl font-semibold leading-none tracking-tight"
        style="
          background: linear-gradient(135deg, #008794 0%, #0e9f99 50%, #5dcac6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        "
      >
        3D Drug Resistance Gradient Model
      </h3>
    </div>

    <!-- Content Area -->
    <div class="p-6 pt-0">
      <div class="flex flex-col gap-4" style="width: 800px; margin: 0 auto">
        <!-- Control Buttons -->
        <div class="flex gap-4 mb-4">
          <button
            @click="togglePause"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 w-24"
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
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 w-24"
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
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 w-32"
            style="
              background: linear-gradient(135deg, #008794 0%, #0e9f99 100%);
              color: white;
              box-shadow: 0 4px 15px rgba(0, 135, 148, 0.3);
            "
          >
            Reset View
          </button>
          <button
            @click="startOpioidSecretion"
            :disabled="opioidSecreting"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 w-40"
            :style="
              opioidSecreting
                ? 'background: #e6f8f7; color: #008794; border: 1px solid #5dcac6;'
                : 'background: linear-gradient(135deg, #e97e35 0%, #ffb07b 100%); color: white; box-shadow: 0 4px 15px rgba(233, 126, 53, 0.3);'
            "
          >
            {{ opioidSecreting ? "Opioid Secreted" : "Secrete Opioid" }}
          </button>
          <button
            @click="() => addAntibiotic('low')"
            :disabled="antibioticConcentration === 'high'"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 w-40"
            :style="
              antibioticConcentration === 'none'
                ? 'background: linear-gradient(135deg, #e97e35 0%, #ffb07b 100%); color: white; box-shadow: 0 4px 15px rgba(233, 126, 53, 0.3);'
                : 'background: #faccaf; color: #e97e35; border: 1px solid #ffb07b;'
            "
          >
            {{
              antibioticConcentration === "none" ? "Low Antibiotic" : "Low Conc. Added"
            }}
          </button>
          <button
            @click="() => addAntibiotic('high')"
            :disabled="antibioticConcentration === 'high'"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 w-40"
            :style="
              antibioticConcentration === 'high'
                ? 'background: #faccaf; color: #e97e35; border: 1px solid #ffb07b;'
                : 'background: linear-gradient(135deg, #e97e35 0%, #ffb07b 100%); color: white; box-shadow: 0 4px 15px rgba(233, 126, 53, 0.3);'
            "
          >
            {{
              antibioticConcentration === "high" ? "High Conc. Added" : "High Antibiotic"
            }}
          </button>
        </div>

        <!-- Speed Control -->
        <div class="mb-4">
          <div class="mb-2" style="color: #008794; font-weight: 600">
            Simulation Speed: {{ speedMultiplier }}x
          </div>
          <input
            type="range"
            v-model.number="speedMultiplier"
            min="0.5"
            max="3"
            step="0.5"
            class="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style="background: linear-gradient(to right, #e6f8f7, #5dcac6); outline: none"
          />
          <div class="flex justify-between text-xs" style="color: #008794">
            <span>0.5x</span>
            <span>1x</span>
            <span>1.5x</span>
            <span>2x</span>
            <span>2.5x</span>
            <span>3x</span>
          </div>
        </div>

        <!-- 3D Canvas Container -->
        <div
          class="flex justify-center items-center rounded-lg mb-4"
          style="
            width: 800px;
            height: 500px;
            position: relative;
            background: linear-gradient(135deg, #e6f8f7 0%, #f8fafb 100%);
            border: 1px solid #5dcac6;
          "
        >
          <canvas
            ref="canvasRef"
            class="rounded-lg cursor-grab active:cursor-grabbing"
            style="width: 800px; height: 500px"
            @click="handleMouseClick"
          />
          <!-- Antibiotic Concentration Display -->
          <div
            class="absolute text-white px-3 py-2 rounded-md text-sm font-semibold"
            style="
              top: 10px;
              right: 10px;
              z-index: 15;
              background: linear-gradient(135deg, #008794 0%, #0e9f99 100%);
              box-shadow: 0 4px 15px rgba(0, 135, 148, 0.3);
            "
          >
            Antibiotic:
            {{
              antibioticConcentration === "none"
                ? "None"
                : antibioticConcentration === "low"
                ? "Low"
                : "High"
            }}
          </div>
          <!-- Selected Cell Info Display -->
          <div
            v-if="selectedCell"
            class="absolute text-white px-2 py-1 rounded-md text-sm"
            style="background: rgba(0, 135, 148, 0.9); border: 1px solid #5dcac6"
            :style="{
              left: `${
                selectedCell.clickPosition ? selectedCell.clickPosition.x : 400
              }px`,
              top: `${selectedCell.clickPosition ? selectedCell.clickPosition.y : 250}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }"
          >
            <div>Generation {{ selectedCell.id }}</div>
            <div>
              Opioid Conc.: {{ (selectedCell.opioidConcentration * 100).toFixed(1) }}%
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div
          class="p-4 rounded-lg shadow border"
          style="
            width: 800px;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafb 100%);
            border: 1px solid #5dcac6;
          "
        >
          <div class="grid grid-cols-2 gap-4">
            <div class="text-sm space-y-2">
              <div class="font-bold mb-2" style="color: #008794">
                Real-time Statistics
              </div>
              <div style="color: #475569">
                Total Cells: {{ stats.totalCells.toLocaleString() }}
              </div>
              <div style="color: #475569">Visible Cells: {{ stats.visibleCells }}</div>
              <div style="color: #475569">Avg Cell Length: {{ stats.avgLength }}</div>
              <div style="color: #475569">Growth Rate: {{ stats.growthRate }}%</div>
              <div style="color: #475569">
                Simulation Time: {{ minutes }}min {{ seconds }}sec
              </div>
            </div>
            <div class="text-sm space-y-2">
              <div class="font-bold mb-2" style="color: #008794">Resistance Status</div>
              <div style="color: #475569">
                Opioid Secretion: {{ opioidSecreting ? "Yes" : "No" }}
              </div>
              <div style="color: #475569">
                Antibiotic Conc.:
                {{
                  antibioticConcentration === "none"
                    ? "None"
                    : antibioticConcentration === "low"
                    ? "Low"
                    : "High"
                }}
              </div>
              <div style="color: #475569">Oxygen: {{ environment.oxygen }}%</div>
              <div style="color: #475569">
                Temperature: {{ environment.temperature }}°C
              </div>
              <div style="color: #475569">Yeast Type: Snowflake Yeast</div>
            </div>
          </div>
        </div>

        <!-- Simulation Description -->
        <div
          class="p-4 rounded-lg shadow border"
          style="
            width: 800px;
            background: linear-gradient(135deg, #e6f8f7 0%, #f8fafb 100%);
            border: 1px solid #5dcac6;
          "
        >
          <div class="font-bold mb-2" style="color: #008794">Simulation Guide</div>
          <div class="text-sm space-y-2" style="color: #475569">
            <div>
              <strong style="color: #e97e35">1. Initial State:</strong> Ancestor cell
              (white) with resistance plasmid at center
            </div>
            <div>
              <strong style="color: #e97e35">2. Opioid Secretion:</strong> Click "Secrete
              Opioid" - ancestor cell starts secreting opioids (blue diffusion field)
            </div>
            <div>
              <strong style="color: #e97e35">3. Gene Activation:</strong> Cells receiving
              opioids activate resistance gene expression (green indicates expression
              strength)
            </div>
            <div>
              <strong style="color: #e97e35">4. Antibiotic Pressure:</strong> Click "Add
              Antibiotic" to apply selection pressure on all cells
            </div>
            <div>
              <strong style="color: #e97e35">5. Cell Death:</strong> Non-resistant cells
              die (turn gray, then disappear)
            </div>
            <div>
              <strong style="color: #e97e35">6. Mutation Evolution:</strong> Surviving
              cells may mutate (red), gaining stronger resistance (deeper red = higher
              resistance)
            </div>
            <div>
              <strong style="color: #e97e35">7. Cluster Formation:</strong> Eventually
              forms clusters of highly resistant cells
            </div>
          </div>
        </div>

        <button
          @click="$emit('exit')"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
          style="
            background: linear-gradient(135deg, #008794 0%, #0e9f99 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(0, 135, 148, 0.3);
          "
        >
          Return to Yeast Growth Simulation
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "ResistanceSim3DStandalone",
  emits: ["exit"],
  setup(props, { emit }) {
    // 响应式状态
    const isPaused = ref(true);
    const timeStep = ref(0);
    const speedMultiplier = ref(1);
    const selectedCell = ref(null);
    const opioidSecreting = ref(false);
    const antibioticConcentration = ref("none");
    const opioidStartTime = ref(0);
    const antibioticStartTime = ref(0);

    const stats = reactive({
      totalCells: 1,
      visibleCells: 0,
      avgLength: 0,
      growthRate: 0,
    });

    // 固定环境条件
    const environment = {
      oxygen: 10,
      temperature: 30,
    };

    // 模板引用
    const canvasRef = ref(null);

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
    let opioidInterval = null;
    let opioidField = null;
    let opioidTime = 0;

    // 常量
    const MAX_VISIBLE_CELLS = 2100;
    const MAX_TOTAL_CELLS = 999999999;
    const MAX_LENGTH_RATIO = 1.8;

    // 计算属性
    const minutes = computed(() => Math.floor(timeStep.value / 10));
    const seconds = computed(() => ((timeStep.value % 10) * 6).toFixed(0));

    // 计算细胞长度（雪花酵母根据氧气浓度调整形状）
    const calculateCellLength = (oxygen) => {
      if (oxygen >= 20) {
        return 1.0; // 需氧条件：完全圆形
      } else {
        const lengthIncrease = ((20 - oxygen) / 20) * (MAX_LENGTH_RATIO - 1.0);
        return Math.min(1.0 + lengthIncrease, MAX_LENGTH_RATIO);
      }
    };

    // 计算指定位置的阿片肽浓度
    const calculateOpioidConcentration = (position) => {
      if (!opioidSecreting.value) {
        return 0;
      }

      const currentOpioidTime = opioidTime;
      const timeSinceStart = currentOpioidTime;
      if (timeSinceStart < 0) {
        return 0;
      }

      // 计算距离中心的距离
      const distance = Math.sqrt(position.x * position.x + position.y * position.y);

      // 特殊处理：如果是中心位置（祖细胞），立即达到最高浓度
      if (distance < 0.1) {
        // 中心区域半径0.1
        return 1.0; // 100%浓度
      }

      // 使用与shader相同的计算逻辑
      const effectiveTime = Math.max(0.1, timeSinceStart);
      const diffusionRate = 0.8;
      const diffusionRadius = diffusionRate * effectiveTime * 2.0;

      // 如果距离超过当前扩散半径，浓度为0
      if (distance > diffusionRadius) {
        return 0;
      }

      // 扩散边缘的软化效果
      const edgeSoftness = 2.0;
      const edgeFade =
        1.0 -
        Math.max(
          0,
          Math.min(1, (distance - (diffusionRadius - edgeSoftness)) / edgeSoftness)
        );

      // 径向亮度梯度：中心最亮，向外指数衰减
      const radialGradient = Math.exp(-distance * 0.15);

      // 时间因子：控制整体强度随时间增长
      const timeFactor = Math.min(1.0, effectiveTime / 15.0);

      // 综合浓度计算
      const concentration = radialGradient * timeFactor * edgeFade;

      return Math.max(0, Math.min(1, concentration));
    };

    const createYeastCell = (position, oxygen, parentCellId = null) => {
      const length = calculateCellLength(oxygen);
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      geometry.scale(length, 1, 1);

      const customMaterial = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0xffffff) },
          glowColor: { value: new THREE.Color(0xcccccc) },
          opioidConcentration: { value: 0.0 },
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
          uniform float opioidConcentration;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            float rim = pow(1.0 - abs(dot(vNormal, vec3(0, 0, 1.0))), 1.8);
            float edge = smoothstep(0.2, 1.0, abs(vPosition.x));
            vec3 greenColor = vec3(0.2, 1.0, 0.3);
            vec3 baseColor = mix(color, greenColor, opioidConcentration);
            vec3 finalColor = mix(baseColor, glowColor, rim + edge * 0.4);
            float alpha = 0.15 + rim * 0.2 + edge * 0.15 + opioidConcentration * 0.1;
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      });

      const cell = new THREE.Mesh(geometry, customMaterial);

      // 添加细胞核
      const nucleus = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshPhongMaterial({
          color: 0x888888,
          emissive: 0x888888,
          emissiveIntensity: 0.3,
        })
      );
      cell.add(nucleus);

      if (position) {
        cell.position.copy(position);
      } else {
        cell.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 10
        );
      }

      const initialOpioidConcentration = calculateOpioidConcentration(
        position || new THREE.Vector3(0, 0, 0)
      );

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
        // 抗药性相关属性
        hasResistancePlasmid: false,
        opioidConcentration: initialOpioidConcentration,
        resistanceGeneExpression: 0,
        antibioticConcentration: 0,
        survivalProbability: 1.0,
        isDead: false,
        dying: false,
        deathProgress: 0,
        mutationLevel: 0,
      };

      if (customMaterial.uniforms?.opioidConcentration) {
        customMaterial.uniforms.opioidConcentration.value = initialOpioidConcentration;
      }

      return cell;
    };

    const addInitialCell = () => {
      cellIdCounter = 1;
      const cell = createYeastCell(new THREE.Vector3(0, 0, 0), environment.oxygen);
      cell.userData.divisionCount = 0;
      cell.userData.isInitialCell = true;
      cell.userData.cellId = 1;
      cell.userData.hasResistancePlasmid = true;

      // 设置雪花酵母的初始属性
      cell.userData.divisionDelay = 0.1;
      // 为雪花酵母设置十个方向的分裂延迟时间，对应立方体的八个顶点加上X轴正负方向
      cell.userData.directionDelays = [
        0.1, // 右上前方向延迟
        0.3, // 右上后方向延迟
        0.5, // 右下前方向延迟
        0.7, // 右下后方向延迟
        0.2, // 左上前方向延迟
        0.4, // 左上后方向延迟
        0.6, // 左下前方向延迟
        0.8, // 左下后方向延迟
        0.15, // X轴正方向延迟
        0.25, // X轴负方向延迟
      ];

      scene.add(cell);
      cells = [cell];
      totalCellCount = 1;
      updateStats();
    };

    // 检查细胞是否应该死亡
    const checkCellSurvival = (cell) => {
      // 如果抗生素浓度为无，没有细胞死亡
      if (antibioticConcentration.value === "none") {
        return true;
      }

      const opioidConc = cell.userData.opioidConcentration || 0;
      const mutationLevel = cell.userData.mutationLevel || 0;

      if (antibioticConcentration.value === "low") {
        // 低浓度：阿片肽浓度>=20%或mutationLevel>=1的细胞存活
        return opioidConc >= 0.2 || mutationLevel >= 1;
      } else if (antibioticConcentration.value === "high") {
        // 高浓度：阿片肽浓度>=30%或mutationLevel=2的细胞存活
        return opioidConc >= 0.3 || mutationLevel === 2;
      }

      return true;
    };

    // 处理细胞死亡动画
    const processCellDeath = (cell) => {
      if (!cell.userData.dying) {
        cell.userData.dying = true;
        cell.userData.deathProgress = 0;
        // 记录初始颜色
        if (cell.material && cell.material.uniforms && cell.material.uniforms.color) {
          cell.userData.originalColor = cell.material.uniforms.color.value.clone();
        }
      }

      // 逐渐降低亮度
      cell.userData.deathProgress += 0.02; // 死亡进度
      const brightness = Math.max(0, 1 - cell.userData.deathProgress);

      // 更新材质亮度
      if (
        cell.material &&
        cell.material.uniforms &&
        cell.material.uniforms.color &&
        cell.userData.originalColor
      ) {
        const originalColor = cell.userData.originalColor;
        cell.material.uniforms.color.value.setRGB(
          originalColor.r * brightness,
          originalColor.g * brightness,
          originalColor.b * brightness
        );
      }

      // 当完全变暗时，标记为死亡
      if (cell.userData.deathProgress >= 1) {
        cell.userData.isDead = true;
        return true; // 返回true表示细胞已完全死亡
      }

      return false;
    };

    const updateStats = () => {
      const aliveCells = cells.filter(
        (cell) => !cell.userData.isDead && !cell.userData.dying
      );
      const visibleCells = aliveCells.length;
      const avgLength =
        visibleCells > 0
          ? aliveCells.reduce((sum, cell) => sum + cell.scale.x, 0) / visibleCells
          : 0;

      stats.totalCells = totalCellCount;
      stats.visibleCells = visibleCells;
      stats.avgLength = avgLength.toFixed(2);
      stats.growthRate = calculateGrowthRate();
    };

    const calculateGrowthRate = () => {
      const baseRate = 0.15;
      const timeMultiplier = Math.min(timeStep.value / 200, 3);
      return (
        baseRate *
        (1 + timeMultiplier) *
        0.8 *
        1.0 *
        speedMultiplier.value *
        100
      ).toFixed(2);
    };

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
          opioidConcentration: selectedCellObj.userData.opioidConcentration || 0,
          clickPosition: {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          },
        };
      } else {
        selectedCell.value = null;
      }
    };

    // 创建阿片肽扩散可视化（3D球形扩散）
    const createOpioidVisualization = () => {
      if (opioidField) {
        scene.remove(opioidField);
      }

      // 创建一个平面来显示阿片肽扩散场，始终面向相机
      const geometry = new THREE.PlaneGeometry(60, 60, 64, 64);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }, // 初始时间为0
          diffusionRate: { value: 0.8 }, // 增加扩散速率
          maxConcentration: { value: 1.0 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vPosition;
          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float diffusionRate;
          uniform float maxConcentration;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            if (time <= 0.0) {
              discard;
            }
            
            float effectiveTime = max(0.1, time);
            
            // 计算从中心(0.5, 0.5)的距离
            vec2 center = vec2(0.5, 0.5);
            float distance = length(vUv - center) * 30.0; // 缩放到实际尺寸
            
            // 扩散前沿：随时间向外扩展的边界
            float diffusionRadius = diffusionRate * effectiveTime * 2.0;
            
            // 如果距离超过当前扩散半径，则不显示
            if (distance > diffusionRadius) {
              discard;
            }
            
            // 扩散边缘的软化效果
            float edgeSoftness = 2.0;
            float edgeFade = 1.0 - smoothstep(diffusionRadius - edgeSoftness, diffusionRadius, distance);
            
            // 径向亮度梯度：中心最亮，向外指数衰减
            float radialGradient = exp(-distance * 0.15);
            
            // 时间因子：控制整体强度随时间增长
            float timeFactor = min(1.0, effectiveTime / 15.0);
            
            // 综合浓度计算：结合径向梯度、时间因子和边缘淡化
            float concentration = radialGradient * timeFactor * edgeFade;
            
            // 颜色梯度：中心亮白蓝色，边缘深蓝色
            float colorIntensity = concentration;
            vec3 centerColor = vec3(0.9, 0.95, 1.0); // 中心更亮的白蓝色
            vec3 edgeColor = vec3(0.2, 0.4, 0.9);    // 边缘蓝色
            vec3 color = mix(edgeColor, centerColor, colorIntensity * colorIntensity); // 使用平方增强中心亮度
            
            // 透明度：基于浓度和径向梯度
            float alpha = concentration * (0.5 + 0.4 * radialGradient);
            alpha = max(alpha, 0.05); // 最小可见度
            alpha = min(alpha, 0.8); // 限制最大透明度
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide, // 双面渲染
        depthWrite: false,
        depthTest: false, // 禁用深度测试以确保可见性
        blending: THREE.AdditiveBlending, // 恢复加法混合模式
        opacity: 1.0,
      });

      opioidField = new THREE.Mesh(geometry, material);
      opioidField.position.set(0, 0, 0);
      scene.add(opioidField);
    };

    // 更新阿片肽可视化（平面扩散）
    const updateOpioidVisualization = () => {
      if (opioidField && opioidSecreting.value) {
        const timeSinceStart = opioidTime;
        opioidField.material.uniforms.time.value = timeSinceStart;

        // 根据扩散时间调整平面的可见性和大小
        const diffusionProgress = Math.min(1.0, timeSinceStart / 30.0);
        opioidField.material.uniforms.maxConcentration.value = diffusionProgress;
      }
    };

    const startOpioidSecretion = () => {
      if (!opioidSecreting.value) {
        opioidSecreting.value = true;
        opioidTime = 0;
        createOpioidVisualization();

        // 立即更新所有细胞的阿片肽浓度
        cells.forEach((cell) => {
          if (!cell.userData.isDead && !cell.userData.dying) {
            const newOpioidConcentration = calculateOpioidConcentration(cell.position);
            cell.userData.opioidConcentration = newOpioidConcentration;
            if (
              cell.material &&
              cell.material.uniforms &&
              cell.material.uniforms.opioidConcentration
            ) {
              cell.material.uniforms.opioidConcentration.value = newOpioidConcentration;
            }
          }
        });
      }
    };

    const addAntibiotic = (concentration) => {
      if (concentration === "low" && antibioticConcentration.value === "none") {
        antibioticConcentration.value = "low";
      } else if (
        concentration === "high" &&
        (antibioticConcentration.value === "none" ||
          antibioticConcentration.value === "low")
      ) {
        antibioticConcentration.value = "high";
      }
    };

    const togglePause = () => {
      isPaused.value = !isPaused.value;
    };

    const handleReset = () => {
      cells.forEach((cell) => scene.remove(cell));
      cells = [];
      totalCellCount = 1;
      cellIdCounter = 1;
      selectedCell.value = null;
      opioidSecreting.value = false;
      antibioticConcentration.value = "none";
      opioidTime = 0;

      // 清理阿片肽可视化
      if (opioidField) {
        scene.remove(opioidField);
        opioidField = null;
      }

      addInitialCell();
      timeStep.value = 0;
      isPaused.value = true;
    };

    const resetCamera = () => {
      if (camera && controls) {
        camera.position.set(0, 0, 30);
        controls.target.set(0, 0, 0);
        controls.update();
      }
    };

    const initThreeJS = async () => {
      await nextTick();
      if (!canvasRef.value) return;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 30);

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        antialias: true,
      });
      renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      // 添加光源
      scene.add(new THREE.AmbientLight(0xffffff, 0.2));
      const pointLight = new THREE.PointLight(0xffffff, 3);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      addInitialCell();

      // 动画循环
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        // 更新阿片肽可视化（独立于细胞生长）
        updateOpioidVisualization();

        // 确保扩散平面始终面向相机
        if (opioidField && camera) {
          opioidField.lookAt(camera.position);
        }

        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    };

    const cleanupThreeJS = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (simulationInterval) clearInterval(simulationInterval);
      if (opioidInterval) clearInterval(opioidInterval);
      if (scene) scene.clear();
      if (renderer) renderer.dispose();
      if (controls) controls.dispose();
    };

    // 完整的细胞分裂过程
    const divideCellProcess = (parentCell) => {
      // 如果细胞正在分裂、死亡或已死亡，则不继续
      if (
        parentCell.userData.dividing ||
        parentCell.userData.dying ||
        parentCell.userData.isDead
      )
        return;

      // 如果可见细胞数已达到上限，停止分裂（冻结状态）
      if (cells.length >= MAX_VISIBLE_CELLS) return;

      // 判断是否为初始细胞（位于原点）
      const isInitialCell =
        parentCell.position.x === 0 &&
        parentCell.position.y === 0 &&
        parentCell.position.z === 0;

      // 雪花酵母的分裂规则：
      // 如果是初始细胞且已经分裂了10次，则不再分裂（修改为10个方向：8个卦限+X轴正负方向）
      if (isInitialCell && parentCell.userData.divisionCount >= 10) return;

      // 如果不是初始细胞且已经分裂过，则不再分裂
      if (!isInitialCell && parentCell.userData.divisionCount >= 1) return;

      parentCell.userData.dividing = true; // 设置为正在分裂
      parentCell.userData.divisionCount++; // 增加分裂次数

      // 雪花酵母的子细胞产生逻辑
      // 检查是否是已分裂细胞的子细胞
      const isChildOfDividedCell = parentCell.userData.isChildOfDividedCell;

      // 初始细胞必定产生一个子细胞
      // 如果是已分裂细胞的子细胞，则分裂概率降低到30%
      // 其他细胞有60%概率产生两个子细胞
      let produceTwoCells;
      if (isChildOfDividedCell) {
        produceTwoCells = !isInitialCell && Math.random() < 0.3; // 降低到30%
      } else {
        produceTwoCells = !isInitialCell && Math.random() < 0.6;
      }

      // 创建第一个新细胞，传递父细胞的ID
      const newCell1 = createYeastCell(
        null,
        environment.oxygen,
        parentCell.userData.cellId
      );

      // 继承抗药质粒
      newCell1.userData.hasResistancePlasmid = parentCell.userData.hasResistancePlasmid;

      // 突变机制：继承父细胞的突变状态，并有小概率进一步突变
      newCell1.userData.mutationLevel = parentCell.userData.mutationLevel; // 首先继承父细胞的突变等级

      if (Math.random() < 0.005) {
        // 0.5%概率发生进一步突变
        newCell1.userData.mutationLevel = Math.min(
          2,
          newCell1.userData.mutationLevel + 1
        );
      }

      // 设置突变颜色
      setMutationColor(newCell1, newCell1.userData.mutationLevel);

      // 更新新细胞的阿片肽浓度
      if (opioidSecreting.value) {
        const opioidConc = calculateOpioidConcentration(newCell1.position);
        newCell1.userData.opioidConcentration = opioidConc;
        if (
          newCell1.material &&
          newCell1.material.uniforms &&
          newCell1.material.uniforms.opioidConcentration
        ) {
          newCell1.material.uniforms.opioidConcentration.value = opioidConc;
        }
      }

      // 如果父细胞已经产生了两个子细胞，则标记这些子细胞
      if (produceTwoCells) {
        newCell1.userData.isChildOfDividedCell = true;
      }

      // 如果需要产生第二个子细胞，则创建
      let newCell2 = null;
      if (produceTwoCells) {
        newCell2 = createYeastCell(null, environment.oxygen, parentCell.userData.cellId);

        // 继承抗药质粒
        newCell2.userData.hasResistancePlasmid = parentCell.userData.hasResistancePlasmid;

        // 突变机制：继承父细胞的突变状态，并有小概率进一步突变
        newCell2.userData.mutationLevel = parentCell.userData.mutationLevel; // 首先继承父细胞的突变等级

        if (Math.random() < 0.005) {
          // 0.5%概率发生进一步突变
          newCell2.userData.mutationLevel = Math.min(
            2,
            newCell2.userData.mutationLevel + 1
          );
        }

        // 设置突变颜色
        setMutationColor(newCell2, newCell2.userData.mutationLevel);

        // 更新第二个新细胞的阿片肽浓度
        if (opioidSecreting.value) {
          const opioidConc2 = calculateOpioidConcentration(newCell2.position);
          newCell2.userData.opioidConcentration = opioidConc2;
          if (
            newCell2.material &&
            newCell2.material.uniforms &&
            newCell2.material.uniforms.opioidConcentration
          ) {
            newCell2.material.uniforms.opioidConcentration.value = opioidConc2;
          }
        }

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

      // 雪花酵母的分裂方向逻辑
      let directionVector1, directionVector2;

      if (isInitialCell) {
        // 初始细胞分裂方向逻辑 - 八卦限方向（立方体8个顶点）
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
        // 非初始细胞的分裂方向逻辑 - 雪花酵母
        // 为雪花酵母的非初始细胞设置分裂方向
        const maxAngle = 15 * (Math.PI / 180);
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

    // 设置细胞突变颜色
    const setMutationColor = (cell, mutationLevel) => {
      if (cell.material && cell.material.uniforms && cell.material.uniforms.color) {
        if (mutationLevel === 0) {
          // 正常细胞保持白色
          cell.material.uniforms.color.value.setRGB(1, 1, 1);
        } else if (mutationLevel === 1) {
          // 一级突变：浅红色
          cell.material.uniforms.color.value.setRGB(1, 0.6, 0.6);
        } else if (mutationLevel === 2) {
          // 二级突变：深红色
          cell.material.uniforms.color.value.setRGB(1, 0.2, 0.2);
        }
      }
    };

    // 监听和生命周期
    watch(
      [isPaused, speedMultiplier],
      () => {
        if (simulationInterval) clearInterval(simulationInterval);

        if (!isPaused.value) {
          const intervalTime = Math.max(10, Math.floor(50 / speedMultiplier.value));
          simulationInterval = setInterval(() => {
            timeStep.value += 1;

            // 更新阿片肽时间
            if (opioidSecreting.value) {
              opioidTime += 0.1;
            }

            // 检查细胞存活状态并处理死亡
            const cellsToRemove = [];
            cells.forEach((cell, index) => {
              if (!cell.userData.isDead && !cell.userData.dying) {
                // 检查细胞是否应该死亡
                if (!checkCellSurvival(cell)) {
                  // 开始死亡过程
                  processCellDeath(cell);
                }
              } else if (cell.userData.dying) {
                // 继续死亡过程
                const fullyDead = processCellDeath(cell);
                if (fullyDead) {
                  cellsToRemove.push(index);
                }
              }
            });

            // 移除完全死亡的细胞
            cellsToRemove.reverse().forEach((index) => {
              const cell = cells[index];
              scene.remove(cell);
              cells.splice(index, 1);
            });

            // 更新所有细胞状态（仅细胞生长和分裂相关）
            cells.forEach((cell) => {
              if (
                !cell.userData.isDead &&
                !cell.userData.dying &&
                !cell.userData.dividing
              ) {
                const growthRate =
                  (calculateGrowthRate() / 2000) * cell.userData.growthRateModifier;
                cell.userData.growthStage += growthRate;

                if (cell.userData.growthStage >= 1 + cell.userData.divisionDelay) {
                  divideCellProcess(cell);
                }
              }
            });

            // 更新细胞形状（根据氧气浓度调整）
            cells.forEach((cell) => {
              if (!cell.userData.isDead && !cell.userData.dying) {
                const targetLength = calculateCellLength(environment.oxygen);
                cell.scale.x += (targetLength - cell.scale.x) * 0.1;
              }
            });

            updateStats();
          }, intervalTime);
        }
      },
      { immediate: true }
    );

    // 独立的阿片肽浓度更新定时器（不受isPaused影响）
    watch(
      opioidSecreting,
      () => {
        if (opioidInterval) {
          clearInterval(opioidInterval);
          opioidInterval = null;
        }

        if (opioidSecreting.value) {
          opioidInterval = setInterval(() => {
            // 更新独立的阿片肽时间
            opioidTime += 0.1; // 每50ms增加0.1时间单位

            // 更新所有细胞的阿片肽浓度
            cells.forEach((cell) => {
              const newOpioidConcentration = calculateOpioidConcentration(cell.position);
              cell.userData.opioidConcentration = newOpioidConcentration;

              // 更新shader中的阿片肽浓度uniform
              if (
                cell.material &&
                cell.material.uniforms &&
                cell.material.uniforms.opioidConcentration
              ) {
                cell.material.uniforms.opioidConcentration.value = newOpioidConcentration;
              }
            });
          }, 50); // 固定50ms间隔更新阿片肽浓度
        }
      },
      { immediate: true }
    );

    onMounted(initThreeJS);
    onUnmounted(cleanupThreeJS);

    return {
      isPaused,
      timeStep,
      speedMultiplier,
      selectedCell,
      opioidSecreting,
      antibioticConcentration,
      stats,
      environment,
      minutes,
      seconds,
      canvasRef,
      togglePause,
      handleReset,
      resetCamera,
      handleMouseClick,
      startOpioidSecretion,
      addAntibiotic,
    };
  },
};
</script>

<style scoped>
/* Enhanced styles with project color scheme */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 20px;
  width: 20px;
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
  height: 8px;
  background: linear-gradient(to right, #e6f8f7, #5dcac6);
  border-radius: 4px;
}

input[type="range"]::-moz-range-thumb {
  height: 20px;
  width: 20px;
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
  height: 8px;
  background: linear-gradient(to right, #e6f8f7, #5dcac6);
  border-radius: 4px;
  border: none;
}
</style>
