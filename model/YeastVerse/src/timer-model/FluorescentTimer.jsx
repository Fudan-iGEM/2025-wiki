import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Raycaster } from 'three';
const MODEL_PARAMS = {
  Tcc_min: 87.0,
  pulse_width_min: 15.0,
  pulse_amp: 1.0,
  pulse_start_offset: 57.0,
  k_dm: 0.14,
  tau_B_min: 4.0 * 60.0,
  tau_I_min: 8.0 * 60.0,
  tau_R_min: 18.0 * 60.0,
  t12_R_hours: 30.0,
  inherit_frac_C: 1.0,
  temperature_celsius: 30.0,
  medium_ph: 6.25
};
function FluorescentTimer() {
  const [isPaused, setIsPaused] = useState(true);
  const [timeStep, setTimeStep] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [selectedCell, setSelectedCell] = useState(null);
  const selectedCellRef = useRef(null);
  const modelParams = MODEL_PARAMS;
  const [stats, setStats] = useState({
    totalCells: 1,
    visibleCells: 0,
    avgMaturationStage: 0,
    avgRRatio: 0
  });
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const cellsRef = useRef([]);
  const controlsRef = useRef(null);
  const raycasterRef = useRef(new Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const cellIdCounterRef = useRef(1);
  const totalCellCountRef = useRef(1);
  const setCanvasRef = (el) => {
    if (!el) return;
    const isLg = window.innerWidth >= 1024;
    const variant = el.dataset?.variant;
    if ((isLg && variant === 'right') || (!isLg && variant === 'left')) {
      canvasRef.current = el;
    }
  };
  const selectActiveCanvas = () => {
    const isLg = window.innerWidth >= 1024;
    const leftCanvas = document.querySelector('[data-variant="left"]');
    const rightCanvas = document.querySelector('[data-variant="right"]');
    const el = isLg ? rightCanvas : leftCanvas;
    if (el) {
      canvasRef.current = el;
    }
  };
  const MAX_VISIBLE_CELLS = 1500;
  const MAX_TOTAL_CELLS = 999999999;
  const MAX_LENGTH_RATIO = 1.8;
  const environment = {
    oxygen: 10,
    temperature: 30
  };
  const isPausedRef = useRef(isPaused);
  const speedMultiplierRef = useRef(speedMultiplier);
  useEffect(() => {
    isPausedRef.current = isPaused;
    speedMultiplierRef.current = speedMultiplier;
  }, [isPaused, speedMultiplier]);
  const calculateCellLength = (oxygen) => {
    if (oxygen >= 20) {
      return 1.0;
    } else {
      const lengthIncrease = (20 - oxygen) / 20 * (MAX_LENGTH_RATIO - 1.0);
      return Math.min(1.0 + lengthIncrease, MAX_LENGTH_RATIO);
    }
  };
  const calculateGrowthRate = () => {
    const baseRate = 0.15;
    const timeMultiplier = Math.min(timeStep / 200, 3);
    const oxygenEffect = 0.8;
    const temperatureEffect = 1.0;
    return (baseRate * (1 + timeMultiplier) * oxygenEffect * temperatureEffect * speedMultiplierRef.current);
  };
  const getTranscriptionTranslationRates = (t) => {
    const t_in_cycle = t % modelParams.Tcc_min;
    if (t_in_cycle < 30.0) {
      return { k_tx: 0.2, k_tl: 0.2 };
    } else if (t_in_cycle < 40.0) {
      const fraction = (t_in_cycle - 30.0) / 10.0;
      return { 
        k_tx: 0.2 + fraction * (0.8 - 0.2),
        k_tl: 0.2 + fraction * (0.8 - 0.2)
      };
    } else if (t_in_cycle < 55.0) {
      const fraction = (t_in_cycle - 40.0) / 15.0;
      return {
        k_tx: 0.8 + fraction * (1.2 - 0.8),
        k_tl: 0.8 + fraction * (1.2 - 0.8)
      };
    } else if (t_in_cycle < 72.0) {
      return { k_tx: 1.2, k_tl: 1.2 };
    } else {
      return { k_tx: 0.1, k_tl: 0.1 };
    }
  };
  const getMaturationRates = () => {
    return {
      k_B: 1.0 / Math.max(modelParams.tau_B_min, 1e-9),
      k_I: 1.0 / Math.max(modelParams.tau_I_min, 1e-9),
      k_R: 1.0 / Math.max(modelParams.tau_R_min, 1e-9),
      k_DR: Math.log(2) / (modelParams.t12_R_hours * 60.0)
    };
  };
  const handleMouseClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(cellsRef.current);
    if (intersects.length > 0) {
      const selectedCellObj = intersects[0].object;
      selectedCellRef.current = selectedCellObj;
      setSelectedCell({
        id: selectedCellObj.userData.cellId,
        maturationData: { ...selectedCellObj.userData.maturationData },
      });
    }
  };
  const createFluorescentCell = (position, parentCell = null) => {
    const length = calculateCellLength(environment.oxygen);
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    geometry.scale(length, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.3,
      emissive: 0x222222,
      emissiveIntensity: 0.1
    });
    const cell = new THREE.Mesh(geometry, material);
    cell.castShadow = false;
    cell.receiveShadow = false;
    const nucleusGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const nucleusMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFA500,
      emissive: 0xFFA500,
      emissiveIntensity: 0.3
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    nucleus.position.set(0, 0, 0);
    cell.add(nucleus);
    if (position) {
      cell.position.copy(position);
    }
    cell.userData = {
      growthStage: 0,
      dividing: false,
      createdAtOxygen: environment.oxygen,
      divisionCount: 0,
      growthRateModifier: 0.6 + Math.random() * 0.8,
      divisionDelay: Math.random() * 0.3,
      canDivide: true,
      isInitialCell: parentCell === null,
      isChildOfDividedCell: parentCell !== null,
      cellId: cellIdCounterRef.current,
      separationFactor: 1.0,
      birthTime: timeStep,
      maturationData: {
        mRNA: parentCell ? 0.0 : 1.0,
        C: parentCell ? 0.0 : 2.0,
        B: 0.0,
        I: 0.0,
        R: 0.0,
        r_ratio: 0.0,
        cellCycleTime: 0.0,
        lastPulseTime: -1
      },
    };
    return cell;
  };
  const updateCellMaturation = (cell, dt) => {
    const data = cell.userData.maturationData;
    const rates = getMaturationRates();
    const currentTime = timeStep - cell.userData.birthTime;
    data.cellCycleTime += dt;
    const pulse_start = modelParams.pulse_start_offset;
    const pulse_end = pulse_start + modelParams.pulse_width_min;
    const in_pulse_window = data.cellCycleTime >= pulse_start && data.cellCycleTime < pulse_end;
    let dm_dt = -modelParams.k_dm * data.mRNA;
    if (in_pulse_window) {
      const { k_tx } = getTranscriptionTranslationRates(data.cellCycleTime);
      dm_dt += k_tx * modelParams.pulse_amp;
    }
    data.mRNA += dm_dt * dt;
    data.mRNA = Math.max(0, data.mRNA);
    const { k_tl } = getTranscriptionTranslationRates(data.cellCycleTime);
    const dC_dt = k_tl * data.mRNA - rates.k_B * data.C;
    const dB_dt = rates.k_B * data.C - rates.k_I * data.B;
    const dI_dt = rates.k_I * data.B - rates.k_R * data.I;
    const dR_dt = rates.k_R * data.I - rates.k_DR * data.R;
    data.C += dC_dt * dt;
    data.B += dB_dt * dt;
    data.I += dI_dt * dt;
    data.R += dR_dt * dt;
    data.C = Math.max(0, data.C);
    data.B = Math.max(0, data.B);
    data.I = Math.max(0, data.I);
    data.R = Math.max(0, data.R);
    data.r_ratio = data.R / (data.B + data.R + 1e-12);
    updateCellColor(cell);
  };
  const updateCellColor = (cell) => {
    const data = cell.userData.maturationData;
    const totalFluorescent = data.B + data.I + data.R;
    if (totalFluorescent < 0.01) {
      cell.material.color.setHex(0x888888);
      cell.material.opacity = 0.3;
      cell.material.emissive.setHex(0x222222);
      cell.material.emissiveIntensity = 0.1;
    } else {
      const progressRaw = (data.I * 0.5 + data.R) / (totalFluorescent + 1e-12);
      const COLOR_SLOWDOWN_GAMMA = 1.6;
      const progress = Math.pow(progressRaw, COLOR_SLOWDOWN_GAMMA);
      let r = Math.min(255, progress * 255);
      let g = 0;
      let b = Math.min(255, Math.pow(1 - progress, 1.5) * 255);
      const RED_BOOST_START = 0.88;
      if (progress >= RED_BOOST_START) {
        const t = Math.min(1, (progress - RED_BOOST_START) / (1 - RED_BOOST_START));
        r = Math.round(r * (1 - t) + 255 * t);
        g = Math.round(g * (1 - t) + 0 * t);
        b = Math.round(b * (1 - t) + 0 * t);
      }
      const color = (Math.floor(r) << 16) | (Math.floor(g) << 8) | Math.floor(b);
      cell.material.color.setHex(color);
      cell.material.opacity = 0.7 + totalFluorescent * 0.3;
      cell.material.emissive.setHex(color);
      cell.material.emissiveIntensity = 0.2 + totalFluorescent * 0.3;
    }
  };
  const updateStats = () => {
    const visibleCells = cellsRef.current.length;
    const totalProgress = cellsRef.current.reduce((sum, cell) => {
      const data = cell.userData.maturationData;
      const totalFluorescent = data.B + data.I + data.R;
      const progress = totalFluorescent > 0
        ? (data.I + data.R) / (totalFluorescent + 1e-12)
        : 0;
      return sum + progress;
    }, 0);
    const totalRRatio = cellsRef.current.reduce((sum, cell) => sum + cell.userData.maturationData.r_ratio, 0);
    const avgMaturationStage = visibleCells > 0 ? totalProgress / visibleCells : 0;
    const avgRRatio = visibleCells > 0 ? totalRRatio / visibleCells : 0;
    setStats({
      totalCells: totalCellCountRef.current,
      visibleCells,
      avgMaturationStage,
      avgRRatio
    });
  };
  const addInitialCell = () => {
    cellIdCounterRef.current = 1;
    const cell = createFluorescentCell(new THREE.Vector3(0, 0, 0), null);
    cell.userData.divisionCount = 0;
    cell.userData.isInitialCell = true;
    cell.userData.cellId = 1;
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
      0.25
    ];
    sceneRef.current.add(cell);
    cellsRef.current = [cell];
    totalCellCountRef.current = 1;
    updateStats();
  };
  const divideCellProcess = (parentCell) => {
    if (parentCell.userData.dividing) return;
    const isInitialCell = parentCell.userData.isInitialCell;
    if (isInitialCell && parentCell.userData.divisionCount >= 10)
      return;
    if (!isInitialCell && parentCell.userData.divisionCount >= 1)
      return;
    if (cellsRef.current.length >= MAX_VISIBLE_CELLS) {
      console.warn(`Cell count reached limit ${MAX_VISIBLE_CELLS}, stop creating new cells`);
      return;
    }
    parentCell.userData.dividing = true;
    parentCell.userData.divisionCount++;
    const isChildOfDividedCell = parentCell.userData.isChildOfDividedCell;
    const produceTwoCells = Math.random() < (isChildOfDividedCell ? 0.85 : 0.08);
    cellIdCounterRef.current++;
    const newCell1 = createFluorescentCell(parentCell.position, parentCell);
    newCell1.userData.cellId = cellIdCounterRef.current;
    if (produceTwoCells) {
      newCell1.userData.isChildOfDividedCell = true;
    }
    let newCell2 = null;
    if (produceTwoCells) {
      cellIdCounterRef.current++;
      newCell2 = createFluorescentCell(parentCell.position, parentCell);
      newCell2.userData.cellId = cellIdCounterRef.current;
      newCell2.userData.isChildOfDividedCell = true;
    }
    sceneRef.current.add(newCell1);
    cellsRef.current.push(newCell1);
    if (produceTwoCells && newCell2) {
      sceneRef.current.add(newCell2);
      cellsRef.current.push(newCell2);
    }
    if (cellsRef.current.length > MAX_VISIBLE_CELLS) {
      manageVisibleCells();
    }
    const cellsToAdd = produceTwoCells ? 2 : 1;
    totalCellCountRef.current = Math.min(
      totalCellCountRef.current + cellsToAdd,
      MAX_TOTAL_CELLS
    );
    const parentLongAxis = new THREE.Vector3(1, 0, 0).applyQuaternion(parentCell.quaternion);
    const separationDistance = (parentCell.scale.x + newCell1.scale.x) * 0.95;
    let directionVector1, directionVector2;
    if (isInitialCell) {
      const divisionIndex = parentCell.userData.divisionCount - 1;
      const randomAngleOffset = (5 + Math.random() * 10) * (Math.PI / 180);
      const randomAxisOffset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3
      ).normalize();
      const grapeDirections = [
        new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(1, -1, 1), new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 1, 1), new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(-1, -1, 1), new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1, 0, 0)
      ];
      grapeDirections.forEach(dir => dir.normalize());
      let baseDirection = (divisionIndex < grapeDirections.length)
        ? grapeDirections[divisionIndex]
        : new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      if (parentCell.userData.directionDelays && divisionIndex < parentCell.userData.directionDelays.length) {
        newCell1.userData.divisionDelay = parentCell.userData.directionDelays[divisionIndex] + Math.random() * 0.1;
      } else {
        newCell1.userData.divisionDelay = 0.1 + divisionIndex * 0.1 + Math.random() * 0.1;
      }
      const rotationAxis = new THREE.Vector3().crossVectors(baseDirection, randomAxisOffset).normalize();
      const rotationQuaternion = new THREE.Quaternion().setFromAxisAngle(rotationAxis, randomAngleOffset);
      directionVector1 = baseDirection.clone().applyQuaternion(rotationQuaternion);
      const isOctantDirection = divisionIndex < 8;
      const isXAxisDirection = divisionIndex >= 8 && divisionIndex < 10;
      if (isOctantDirection) newCell1.userData.separationFactor = 0.8;
      else if (isXAxisDirection) newCell1.userData.separationFactor = 1.0;
      else newCell1.userData.separationFactor = 0.9;
    } else {
      const maxAngle = 60 * (Math.PI / 180);
      const randomAngle = Math.acos(Math.pow(Math.random(), 1/3)) * maxAngle;
      const randomDirection = Math.random() * Math.PI * 2;
      const tempUp = new THREE.Vector3(0, 1, 0);
      if (Math.abs(parentLongAxis.dot(tempUp)) > 0.99) tempUp.set(0, 0, 1);
      const perpAxis1 = new THREE.Vector3().crossVectors(parentLongAxis, tempUp).normalize();
      const perpAxis2 = new THREE.Vector3().crossVectors(parentLongAxis, perpAxis1).normalize();
      directionVector1 = new THREE.Vector3().copy(parentLongAxis)
        .addScaledVector(perpAxis1, Math.sin(randomAngle) * Math.cos(randomDirection))
        .addScaledVector(perpAxis2, Math.sin(randomAngle) * Math.sin(randomDirection))
        .normalize();
      if (produceTwoCells) {
        const randomAngle2 = Math.acos(Math.pow(Math.random(), 1/3)) * maxAngle;
        const randomDirection2 = randomDirection + Math.PI + (Math.random() - 0.5) * Math.PI * 0.2;
        directionVector2 = new THREE.Vector3().copy(parentLongAxis)
          .addScaledVector(perpAxis1, Math.sin(randomAngle2) * Math.cos(randomDirection2))
          .addScaledVector(perpAxis2, Math.sin(randomAngle2) * Math.sin(randomDirection2))
          .normalize();
      }
    }
    const rotationMatrix1 = new THREE.Matrix4();
    const up = new THREE.Vector3(0, 1, 0);
    const right1 = new THREE.Vector3().crossVectors(directionVector1, up).normalize();
    const adjustedUp1 = new THREE.Vector3().crossVectors(right1, directionVector1).normalize();
    rotationMatrix1.makeBasis(directionVector1, adjustedUp1, right1);
    const quaternion1 = new THREE.Quaternion().setFromRotationMatrix(rotationMatrix1);
    newCell1.setRotationFromQuaternion(quaternion1);
    if (produceTwoCells && newCell2) {
      const rotationMatrix2 = new THREE.Matrix4();
      const right2 = new THREE.Vector3().crossVectors(directionVector2, up).normalize();
      const adjustedUp2 = new THREE.Vector3().crossVectors(right2, directionVector2).normalize();
      rotationMatrix2.makeBasis(directionVector2, adjustedUp2, right2);
      const quaternion2 = new THREE.Quaternion().setFromRotationMatrix(rotationMatrix2);
      newCell2.setRotationFromQuaternion(quaternion2);
    }
    const parentData = parentCell.userData.maturationData;
    const numDaughters = produceTwoCells ? 2 : 1;
    const divisionFactor = 1 / (numDaughters + 1);
    const inherited_mRNA = parentData.mRNA * divisionFactor;
    const inherited_C = parentData.C * divisionFactor;
    parentData.mRNA *= divisionFactor;
    parentData.C *= divisionFactor;
    newCell1.userData.maturationData.mRNA = inherited_mRNA;
    newCell1.userData.maturationData.C = inherited_C;
    if (newCell2) {
      newCell2.userData.maturationData.mRNA = inherited_mRNA;
      newCell2.userData.maturationData.C = inherited_C;
    }
    newCell1.userData.maturationData.B = 0;
    newCell1.userData.maturationData.I = 0;
    newCell1.userData.maturationData.R = 0;
    if (newCell2) {
      newCell2.userData.maturationData.B = 0;
      newCell2.userData.maturationData.I = 0;
      newCell2.userData.maturationData.R = 0;
    }
    let progress = 0;
    const animateDivision = () => {
      if (progress >= 1) {
        parentCell.userData.dividing = false;
        parentCell.userData.growthStage = 0;
        parentCell.scale.x = 1;
        updateStats();
        return;
      }
      progress += 0.015;
      const separationFactor1 = newCell1.userData.separationFactor || 1.0;
      const adjustedSeparationDistance1 = separationDistance * 1.10 * separationFactor1;
      newCell1.position.copy(parentCell.position).addScaledVector(directionVector1, adjustedSeparationDistance1 * progress);
      if (produceTwoCells && newCell2) {
        const separationFactor2 = newCell2.userData.separationFactor || 1.0;
        const adjustedSeparationDistance2 = separationDistance * 1.10 * separationFactor2;
        newCell2.position.copy(parentCell.position).addScaledVector(directionVector2, adjustedSeparationDistance2 * progress);
      }
      requestAnimationFrame(animateDivision);
    };
    animateDivision();
  };
  const manageVisibleCells = () => {
    const currentCellCount = cellsRef.current.length;
    if (currentCellCount > MAX_VISIBLE_CELLS) {
      console.warn(`Cell count exceeds limit: ${currentCellCount} / ${MAX_VISIBLE_CELLS}, no longer removing cells automatically`);
    }
  };
  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 0, 30);
    camera.lookAt(scene.position);
    if (!canvasRef.current) return;
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
    renderer.shadowMap.enabled = false;
    const canvasWidth = canvasRef.current.clientWidth;
    const canvasHeight = canvasRef.current.clientHeight;
    renderer.setSize(canvasWidth, canvasHeight);
    const handleResize = () => {
      const prevCanvas = rendererRef.current?.domElement;
      selectActiveCanvas();
      const currentCanvas = canvasRef.current;
      if (!currentCanvas)
        return;
      if (prevCanvas && currentCanvas !== prevCanvas) {
        try { prevCanvas.removeEventListener('click', handleMouseClick); } catch {}
        if (controlsRef.current) {
          controlsRef.current.dispose();
          controlsRef.current = null;
        }
        if (rendererRef.current) {
          rendererRef.current.dispose();
          rendererRef.current = null;
        }
        const newRenderer = new THREE.WebGLRenderer({ 
          canvas: currentCanvas,
          antialias: true,
          alpha: true
        });
        rendererRef.current = newRenderer;
        newRenderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
        newRenderer.shadowMap.enabled = false;
        const newControls = new OrbitControls(cameraRef.current, newRenderer.domElement);
        controlsRef.current = newControls;
        newControls.enableDamping = true;
        newControls.dampingFactor = 0.05;
        newControls.minDistance = 3;
        newControls.maxDistance = 40;
        newControls.target.set(0, 0, 0);
        newControls.update();
        currentCanvas.addEventListener('click', handleMouseClick);
      }
      const width = currentCanvas.clientWidth;
      const height = currentCanvas.clientHeight;
      cameraRef.current.aspect = Math.max(0.0001, width / Math.max(1, height));
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    canvasRef.current.addEventListener('click', handleMouseClick);
    handleResize();
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 40;
    controls.target.set(0, 0, 0);
    controls.update();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(10, 10, 10);
    pointLight.castShadow = false;
    scene.add(pointLight);
    const spotLight = new THREE.SpotLight(0xffffff, 1.5);
    spotLight.position.set(15, 40, 35);
    spotLight.castShadow = false;
    scene.add(spotLight);
    addInitialCell();
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      if (!isPausedRef.current) {
        const dt = speedMultiplierRef.current * 0.1;
        setTimeStep(prev => prev + dt);
        const baseGrowthRate = calculateGrowthRate();
        cellsRef.current.forEach(cell => {
          if (!cell.userData.dividing) {
            updateCellMaturation(cell, dt);
            const growthRate = (baseGrowthRate / 200) * cell.userData.growthRateModifier;
            cell.userData.growthStage += growthRate;
            const divisionThreshold = 0.5 + cell.userData.divisionDelay;
            const growthProgress = Math.min(cell.userData.growthStage / divisionThreshold, 1.0);
            const initialLength = calculateCellLength(cell.userData.createdAtOxygen);
            const targetScale = MAX_LENGTH_RATIO / initialLength;
            const scaleMultiplier = 1 + (targetScale - 1) * growthProgress;
            cell.scale.x = scaleMultiplier;
            if (cell.userData.growthStage >= divisionThreshold) {
              divideCellProcess(cell);
            }
          }
        });
        if (selectedCellRef.current) {
          const cell = selectedCellRef.current;
          if (cellsRef.current.includes(cell)) {
            setSelectedCell({
              id: cell.userData.cellId,
              maturationData: { ...cell.userData.maturationData },
            });
          } else {
            selectedCellRef.current = null;
            setSelectedCell(null);
          }
        }
        if (Math.random() < 0.1) {
            updateStats();
        }
      }
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', handleMouseClick);
      }
      if (scene) scene.clear();
      if (renderer) renderer.dispose();
      if (controlsRef.current) controlsRef.current.dispose();
      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
      controlsRef.current = null;
      cellsRef.current = [];
    };
  }, []);
  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <div className="bg-white shadow-sm border-b p-4">
        <h1 className="text-2xl font-bold text-gray-800">Fluorescent Timer Model Visualization</h1>
        <p className="text-sm text-gray-600 mt-1">Based on Fast-FT protein C→B→I→R maturation chain</p>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="w-full lg:w-80 bg-white shadow-lg p-4 overflow-y-auto">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">Simulation Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsPaused(!isPaused)}
                  className={isPaused ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
                >
                  {isPaused ? "Start" : "Pause"}
                </Button>
                <Button 
                  onClick={() => {
                    setIsPaused(true);
                    setTimeStep(0);
                    if (sceneRef.current) {
                      cellsRef.current.forEach(cell => sceneRef.current.remove(cell));
                      cellsRef.current = [];
                      addInitialCell();
                    }
                  }}
                  variant="outline"
                >
                  Reset
                </Button>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Speed Multiplier: {speedMultiplier}x</label>
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={speedMultiplier}
                  onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
          <div className="block lg:hidden">
            <div className="relative w-full min-h-[60vh] rounded-lg overflow-hidden">
              <canvas 
                ref={setCanvasRef}
                data-variant="left"
                className="w-full h-full"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              />
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
                <h3 className="font-medium text-sm mb-2">Fluorescence States</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded opacity-50"></div>
                    <span>State C (immature)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>State B (blue)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span>State I (purple)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>State R (red)</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded text-xs">
                <div>Left-drag: rotate view</div>
                <div>Scroll: zoom</div>
                <div>Right-drag: pan</div>
                <div>Click a cell: view details</div>
              </div>
            </div>
          </div>
          <Card className="mb-4">
            <CardHeader>
            <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Total Cells:</span> {stats.totalCells}
              </div>
              <div className="text-sm">
                <span className="font-medium">Visible Cells:</span> {stats.visibleCells}
              </div>
              <div className="text-sm">
                <span className="font-medium">Average Maturation:</span> {(stats.avgMaturationStage * 100).toFixed(1)}%
              </div>
              <div className="text-sm">
                <span className="font-medium">Simulation Time:</span> {(timeStep / 60).toFixed(1)} hours
              </div>
           </CardContent>
          </Card>
          {selectedCell && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cell #{selectedCell.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">mRNA:</span> {selectedCell.maturationData.mRNA.toFixed(3)}
                </div>
                <div className="text-sm">
                  <span className="font-medium">State C:</span> {selectedCell.maturationData.C.toFixed(3)}
                </div>
                <div className="text-sm">
                  <span className="font-medium">State B:</span> {selectedCell.maturationData.B.toFixed(3)}
                </div>
                <div className="text-sm">
                  <span className="font-medium">State I:</span> {selectedCell.maturationData.I.toFixed(3)}
                </div>
                <div className="text-sm">
                  <span className="font-medium">State R:</span> {selectedCell.maturationData.R.toFixed(3)}
                </div>
                <div className="text-sm">
                  <span className="font-medium">r ratio:</span> {selectedCell.maturationData.r_ratio.toFixed(3)}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="hidden lg:block flex-1 relative min-h-[60vh] mt-4 lg:mt-0 lg:ml-4 rounded-lg overflow-hidden">
          <canvas 
            ref={setCanvasRef}
            data-variant="right"
            className="w-full h-full"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          />
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
            <h3 className="font-medium text-sm mb-2">Fluorescence States</h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded opacity-50"></div>
                <span>State C (immature)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>State B (blue)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>State I (purple)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>State R (red)</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded text-xs">
            <div>Left-drag: rotate view</div>
            <div>Scroll: zoom</div>
            <div>Right-drag: pan</div>
            <div>Click a cell: view details</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FluorescentTimer;