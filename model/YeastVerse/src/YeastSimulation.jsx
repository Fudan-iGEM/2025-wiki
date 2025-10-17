import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Raycaster } from 'three';
import HelpButton from './components/help/HelpButton';
function YeastSimulation() {
  const [isPaused, setIsPaused] = useState(true);
  const [timeStep, setTimeStep] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [yeastType, setYeastType] = useState('grape_n1');
  const [selectedCell, setSelectedCell] = useState(null);
  const helpContent = (
    <div>
      <p>1. Start the simulation and observe how the yeast cluster grows from a single cell to a multicellular structure.</p>
      <p>2. Note the branching patterns and cell arrangements in "Grape" vs. "normal" yeast, which can inform the design of the multicellular chassis for drug resistance evolution studies.</p>
      <p>3. Key growth parameters are user-adjustable, allowing for the customization of simulations to explore morphological outcomes under different hypothetical conditions. (Note: Some parameters need to be modified in the source code)</p>
    </div>
  );
  const environment = {
    oxygen: 10,
    temperature: 30
  };
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const cellsRef = useRef([]);
  const totalCellCountRef = useRef(1);
  const raycasterRef = useRef(new Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const cellIdCounterRef = useRef(1);
  const MAX_VISIBLE_CELLS = 1600;
  const MAX_TOTAL_CELLS = 2000;
  const MAX_LENGTH_RATIO = 1.8;
  const calculateCellLength = (oxygen) => {
    if (yeastType === 'grape_n1') {
      return 1.0;
    } else {
      if (oxygen >= 20) {
        return 1.0;
      } else {
        const lengthIncrease = (20 - oxygen) / 20 * (MAX_LENGTH_RATIO - 1.0);
        return Math.min(1.0 + lengthIncrease, MAX_LENGTH_RATIO);
      }
    }
  };
  const getRadiusAlongDirection = (cell, direction) => {
    const u = direction.clone().normalize();
    const invQ = cell.quaternion.clone().invert();
    const localDir = u.clone().applyQuaternion(invQ);
    const a = cell.scale.x;
    const b = cell.scale.y;
    const c = cell.scale.z;
    const denom = Math.sqrt(
      (localDir.x * localDir.x) / (a * a) +
      (localDir.y * localDir.y) / (b * b) +
      (localDir.z * localDir.z) / (c * c)
    );
    return 1 / denom;
  };
  const handleMouseClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(cellsRef.current);
    if (intersects.length > 0) {
      const selectedCell = intersects[0].object;
      setSelectedCell({
        id: selectedCell.userData.cellId,
        position: selectedCell.position.clone(),
        clickPosition: {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        }
      });
    } else {
      setSelectedCell(null);
    }
  };
  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 0, 30);
    camera.lookAt(scene.position);
    if (!canvasRef.current) {
      console.error('Canvas element not found');
      return;
    }
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true ,
      alpha: true
    });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
    renderer.shadowMap.enabled = false;
    const canvasWidth = canvasRef.current.clientWidth;
    const canvasHeight = canvasRef.current.clientHeight;
    renderer.setSize(canvasWidth, canvasHeight);
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
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
    controls.enablePan = true;
    controls.panSpeed = 1.0;
    controls.screenSpacePanning = true;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const handleContextMenu = (event) => {
      event.preventDefault();
    };
    const handleMouseDown = (event) => {
      if (event.button === 2) { isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
      }
    };
    const handleMouseMove = (event) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        const distance = camera.position.distanceTo(controls.target);
        const movementSpeed = distance / 500;
        const right = new THREE.Vector3();
        const up = new THREE.Vector3();
        camera.getWorldDirection(up).cross(camera.up).normalize().multiplyScalar(-deltaX * movementSpeed);
        camera.up.clone().normalize().multiplyScalar(-deltaY * movementSpeed).add(up, right);
        controls.target.add(right);
        previousMousePosition = { x: event.clientX, y: event.clientY };
      }
    };
    const handleMouseUp = (event) => {
      if (event.button === 2) {
        isDragging = false;
      }
    };
    const handleMouseLeave = () => {
      isDragging = false;
    };
    renderer.domElement.addEventListener('contextmenu', handleContextMenu);
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('mouseleave', handleMouseLeave);
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
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isPaused) {
        cellsRef.current.forEach(cell => {
          if (!cell.userData.dividing) {
            cell.userData.growthStage += calculateGrowthRate() / 2000;
            if (cell.userData.growthStage >= (1 + cell.userData.divisionDelay)) {
              divideCellProcess(cell);
            }
          }
        });
        cellsRef.current.forEach(cell => {
          const targetLength = calculateCellLength(environment.oxygen);
          const newScaleX = cell.scale.x + (targetLength - cell.scale.x) * 0.1;
          if (yeastType === 'grape_n1') {
            cell.scale.set(newScaleX, newScaleX, newScaleX);
          } else {
            cell.scale.set(newScaleX, 1, 1);
          }
        });
      }
      if (controlsRef.current) {
        controlsRef.current.update();
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
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('contextmenu', handleContextMenu);
        renderer.domElement.removeEventListener('mousedown', handleMouseDown);
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        renderer.domElement.removeEventListener('mouseup', handleMouseUp);
        renderer.domElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (scene)
        scene.clear();
      if (renderer) renderer.dispose();
      if (controlsRef.current)
        controlsRef.current.dispose();
      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
      controlsRef.current = null;
      cellsRef.current = [];
    };
  }, []);
  const createYeastCell = (position, oxygen, parentCellId = null) => {
    const length = calculateCellLength(oxygen);
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    const cellColor = yeastType === 'grape_n1' ? new THREE.Color(0x00FFFF) : new THREE.Color(0x90EE90);
    const cellGlowColor = yeastType === 'grape_n1' ? new THREE.Color(0x40E0D0) : new THREE.Color(0x98FB98);
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: cellColor },
        glowColor: { value: cellGlowColor }
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
      side: THREE.DoubleSide
    });
    var cell = new THREE.Mesh(geometry, customMaterial);
    if (yeastType === 'grape_n1') {
      cell.scale.set(length, length, length);
    } else {
      cell.scale.set(length, 1, 1);
    }
    cell.castShadow = true;
    cell.receiveShadow = true;
    const nucleusGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const nucleusColor = 0xFFA500;
    const nucleusMaterial = new THREE.MeshPhongMaterial({
      color: nucleusColor,
      emissive: nucleusColor,
      emissiveIntensity: 0.3,
      specular: 0xFFFFFF,
      shininess: 100
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    nucleus.position.set(0, 0, 0);
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
      cellId: parentCellId ? parentCellId + 1 : cellIdCounterRef.current
  };
    return cell;
  };
  const addInitialCell = () => {
    cellIdCounterRef.current = 1;
    const cell = createYeastCell(new THREE.Vector3(0, 0, 0), environment.oxygen);
    cell.userData.divisionCount = 0;
    cell.userData.isInitialCell = true;
    cell.userData.cellId = 1;
    cell.userData.generation = 0;
    if (yeastType === 'grape') {
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
    } else {
      cell.userData.divisionDelay = 0.05;
      cell.userData.directionDelays = [
        0.05,
        0.15,
        0.25,
        0.35,
        0.45,
        0.55,
        0.65,
        0.75
      ];
    }
    sceneRef.current.add(cell);
    cellsRef.current = [cell];
    totalCellCountRef.current = 1;
  };
  const manageVisibleCells = () => {
    const scene = sceneRef.current;
    while (cellsRef.current.length > MAX_VISIBLE_CELLS) {
      const cellsWithDistance = cellsRef.current.map((cell, index) => {
        const distanceToCenter = cell.position.length();
        const isImportantCell = cell.userData.isInitialCell || distanceToCenter < 5;
        return {
          cell,
          index,
          distanceToCenter,
          isImportantCell
        };
      });
      const nonImportantCells = cellsWithDistance
        .filter(item => !item.isImportantCell)
        .sort((a, b) => b.distanceToCenter - a.distanceToCenter);
      if (nonImportantCells.length > 0) {
        const cellToRemove = nonImportantCells[0];
        scene.remove(cellToRemove.cell);
        cellsRef.current.splice(cellToRemove.index, 1);
      } else {
        cellsWithDistance.sort((a, b) => b.distanceToCenter - a.distanceToCenter);
        const cellToRemove = cellsWithDistance[0];
        scene.remove(cellToRemove.cell);
        cellsRef.current.splice(cellToRemove.index, 1);
      }
    }
  };
  const divideCellProcess = (parentCell) => {
    if (parentCell.userData.dividing)
      return; 
    const isInitialCell = parentCell.position.x === 0 && 
                         parentCell.position.y === 0 && 
                         parentCell.position.z === 0;
    if (yeastType === 'grape') {
      if (isInitialCell && parentCell.userData.divisionCount >= 10)
        return;
      if (!isInitialCell && parentCell.userData.divisionCount >= 1)
        return;
    } else {
      if (isInitialCell && parentCell.userData.divisionCount >= 8)
        return;
      if (!isInitialCell && parentCell.userData.divisionCount >= 1)
        return;
    }
    parentCell.userData.dividing = true;
    parentCell.userData.divisionCount++;
    let produceTwoCells;
    const isChildOfDividedCell = parentCell.userData.isChildOfDividedCell;
    const parentGeneration = typeof parentCell.userData.generation === 'number'
      ? parentCell.userData.generation
      : (isInitialCell ? 0 : 1);
    const childGeneration = parentGeneration + 1;
    if (yeastType === 'snowflake') {
      if (isChildOfDividedCell) {
        let prob = 0.3;
        if (childGeneration === 1)
          prob = 0.40;
        else if (childGeneration === 2) prob = 0.38;
        else if (childGeneration === 3) prob = 0.36;
        else if (childGeneration === 4) prob = 0.34;
        else if (childGeneration === 5) prob = 0.33;
        else if (childGeneration === 6) prob = 0.32;
        produceTwoCells = !isInitialCell && Math.random() < prob;
      } else {
        produceTwoCells = !isInitialCell && Math.random() < 0.6;
      }
    } else {
      if (isChildOfDividedCell) {
        let prob = 0.3;
        if (childGeneration === 1)
          prob = 0.40;
        else if (childGeneration === 2) prob = 0.38;
        else if (childGeneration === 3) prob = 0.36;
        else if (childGeneration === 4) prob = 0.34;
        else if (childGeneration === 5) prob = 0.33;
        else if (childGeneration === 6) prob = 0.32;
        produceTwoCells = !isInitialCell && Math.random() < prob;
      } else {
        produceTwoCells = !isInitialCell && Math.random() < 0.6;
      }
    }
    const newCell1 = createYeastCell(parentCell.position.clone(), environment.oxygen, parentCell.userData.cellId);
    newCell1.userData.generation = childGeneration;
    if (produceTwoCells) {
      newCell1.userData.isChildOfDividedCell = true;
    }
    let newCell2 = null;
    if (produceTwoCells) {
      newCell2 = createYeastCell(parentCell.position.clone(), environment.oxygen, parentCell.userData.cellId);
      newCell2.userData.generation = childGeneration;
      newCell2.userData.isChildOfDividedCell = true;
      newCell2.visible = false;
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
    const growthIncrement = calculateGrowthRate() / 100;
    const cellsToAdd = produceTwoCells ? 2 : 1;
    totalCellCountRef.current = Math.min(
      totalCellCountRef.current + cellsToAdd,
      MAX_TOTAL_CELLS
    );
    const parentLongAxis = new THREE.Vector3(1, 0, 0).applyQuaternion(parentCell.quaternion);
    const centerToParent = new THREE.Vector3();
    centerToParent.copy(parentCell.position);
    const distanceFromCenter = centerToParent.length();
    let separationDistance1 = 0;
    let separationDistance2 = 0;
    let progress = 0;
    const secondBudDelay = (produceTwoCells && newCell2) ? (1.10 + Math.random() * 0.15) : 0;
    const sampleSeparationAngleDeg = () => {
      const mean = 40;
      const std = 8;
      let angleDeg = mean;
      for (let i = 0; i < 5; i++) {
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        angleDeg = mean + std * z;
        if (angleDeg >= 30 && angleDeg <= 60) break;
      }
      return Math.max(30, Math.min(60, angleDeg));
    };
    let directionVector1, directionVector2;
    if (isInitialCell) {
      if (yeastType === 'grape') {
        const randomAngleOffset = (5 + Math.random() * 10) * (Math.PI / 180);
        const randomAxisOffset = new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3
        ).normalize();
        const grapeDirections = [
          new THREE.Vector3(1, 1, 1),
          new THREE.Vector3(1, 1, -1),
          new THREE.Vector3(1, -1, 1),
          new THREE.Vector3(1, -1, -1),
          new THREE.Vector3(-1, 1, 1),
          new THREE.Vector3(-1, 1, -1),
          new THREE.Vector3(-1, -1, 1),
          new THREE.Vector3(-1, -1, -1),
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(-1, 0, 0)
        ];
        grapeDirections.forEach(dir => dir.normalize());
        let baseDirection;
        const divisionIndex = parentCell.userData.divisionCount - 1;
        if (divisionIndex < grapeDirections.length) {
          baseDirection = grapeDirections[divisionIndex];
        } else {
          baseDirection = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
          ).normalize();
        }
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
        if (isOctantDirection) {
          newCell1.userData.separationFactor = 0.8;
        } else if (isXAxisDirection) {
          newCell1.userData.separationFactor = 1.0;
        } else {
          newCell1.userData.separationFactor = 0.9;
        }
      } else {
        const divisionIndex = parentCell.userData.divisionCount - 1;
        const cubeDirections = [
          new THREE.Vector3(1, 1, 1),
          new THREE.Vector3(1, 1, -1),
          new THREE.Vector3(1, -1, 1),
          new THREE.Vector3(1, -1, -1),
          new THREE.Vector3(-1, 1, 1),
          new THREE.Vector3(-1, 1, -1),
          new THREE.Vector3(-1, -1, 1),
          new THREE.Vector3(-1, -1, -1)
        ];
        cubeDirections.forEach(dir => dir.normalize());
        let baseDirection;
        if (divisionIndex < cubeDirections.length) {
          baseDirection = cubeDirections[divisionIndex];
        } else {
          baseDirection = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
          ).normalize();
        }
        const randomAngleOffset = (15 + Math.random() * 15) * (Math.PI / 180);
        const randomAxisOffset = new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        ).normalize();
        const rotationAxis = new THREE.Vector3().crossVectors(baseDirection, randomAxisOffset).normalize();
        const rotationQuaternion = new THREE.Quaternion().setFromAxisAngle(rotationAxis, randomAngleOffset);
        directionVector1 = baseDirection.clone().applyQuaternion(rotationQuaternion);
        newCell1.userData.separationFactor = 1.2;
        newCell1.userData.divisionDelay = 0.05 + divisionIndex * 0.05 + Math.random() * 0.05;
      }
    } else {
      if (yeastType === 'grape') {
        const maxAngle = 20 * (Math.PI / 180);
        const randomAngle = Math.acos(Math.pow(Math.random(), 1/3)) * maxAngle;
        const randomDirection = Math.random() * Math.PI * 2;
        const tempUp = new THREE.Vector3(0, 1, 0);
        if (Math.abs(parentLongAxis.dot(tempUp)) > 0.99) {
          tempUp.set(0, 0, 1);
        }
        const perpAxis1 = new THREE.Vector3().crossVectors(parentLongAxis, tempUp).normalize();
        const perpAxis2 = new THREE.Vector3().crossVectors(parentLongAxis, perpAxis1).normalize();
        if (produceTwoCells) {
          const tiltAngle = (70 + Math.random() * 10) * (Math.PI / 180);
          const separationAngle = (sampleSeparationAngleDeg()) * (Math.PI / 180);
          const randomDirection2 = randomDirection + separationAngle;
          directionVector1 = new THREE.Vector3().copy(parentLongAxis);
          directionVector1.addScaledVector(perpAxis1, Math.sin(tiltAngle) * Math.cos(randomDirection));
          directionVector1.addScaledVector(perpAxis2, Math.sin(tiltAngle) * Math.sin(randomDirection));
          directionVector1.normalize();
          directionVector2 = new THREE.Vector3().copy(parentLongAxis);
          directionVector2.addScaledVector(perpAxis1, Math.sin(tiltAngle) * Math.cos(randomDirection2));
          directionVector2.addScaledVector(perpAxis2, Math.sin(tiltAngle) * Math.sin(randomDirection2));
          directionVector2.normalize();
        } else {
          directionVector1 = new THREE.Vector3().copy(parentLongAxis);
          directionVector1.addScaledVector(perpAxis1, Math.sin(randomAngle) * Math.cos(randomDirection));
          directionVector1.addScaledVector(perpAxis2, Math.sin(randomAngle) * Math.sin(randomDirection));
          directionVector1.normalize();
        }
      } else {
        const maxAngle = 60 * (Math.PI / 180);
        const randomAngle = Math.acos(Math.pow(Math.random(), 1/3)) * maxAngle;
        const randomDirection = Math.random() * Math.PI * 2;
        const tempUp = new THREE.Vector3(0, 1, 0);
        if (Math.abs(parentLongAxis.dot(tempUp)) > 0.99) {
          tempUp.set(0, 0, 1);
        }
        const perpAxis1 = new THREE.Vector3().crossVectors(parentLongAxis, tempUp).normalize();
        const perpAxis2 = new THREE.Vector3().crossVectors(parentLongAxis, perpAxis1).normalize();
        if (produceTwoCells) {
          const tiltAngle = (70 + Math.random() * 10) * (Math.PI / 180);
          const separationAngle = (sampleSeparationAngleDeg()) * (Math.PI / 180);
          const randomDirection2 = randomDirection + separationAngle;
          directionVector1 = new THREE.Vector3().copy(parentLongAxis);
          directionVector1.addScaledVector(perpAxis1, Math.sin(tiltAngle) * Math.cos(randomDirection));
          directionVector1.addScaledVector(perpAxis2, Math.sin(tiltAngle) * Math.sin(randomDirection));
          directionVector1.normalize();
          directionVector2 = new THREE.Vector3().copy(parentLongAxis);
          directionVector2.addScaledVector(perpAxis1, Math.sin(tiltAngle) * Math.cos(randomDirection2));
          directionVector2.addScaledVector(perpAxis2, Math.sin(tiltAngle) * Math.sin(randomDirection2));
          directionVector2.normalize();
        } else {
          directionVector1 = new THREE.Vector3().copy(parentLongAxis);
          directionVector1.addScaledVector(perpAxis1, Math.sin(randomAngle) * Math.cos(randomDirection));
          directionVector1.addScaledVector(perpAxis2, Math.sin(randomAngle) * Math.sin(randomDirection));
          directionVector1.normalize();
        }
        newCell1.userData.separationFactor = produceTwoCells ? 0.9 : 1.2;
        if (produceTwoCells && newCell2) {
          newCell2.userData.separationFactor = 0.9;
        }
      }
    }
    const rotationMatrix1 = new THREE.Matrix4();
    const up = new THREE.Vector3(0, 1, 0);
    const right1 = new THREE.Vector3().crossVectors(directionVector1, up).normalize();
    const adjustedUp1 = new THREE.Vector3().crossVectors(right1, directionVector1).normalize();
    rotationMatrix1.makeBasis(
      directionVector1,  adjustedUp1,      right1
    );
    const quaternion1 = new THREE.Quaternion();
    quaternion1.setFromRotationMatrix(rotationMatrix1);
    newCell1.setRotationFromQuaternion(quaternion1);
    if (produceTwoCells && newCell2) {
      const rotationMatrix2 = new THREE.Matrix4();
      const right2 = new THREE.Vector3().crossVectors(directionVector2, up).normalize();
      const adjustedUp2 = new THREE.Vector3().crossVectors(right2, directionVector2).normalize();
      rotationMatrix2.makeBasis(
        directionVector2,
        adjustedUp2,
        right2
      );
      const quaternion2 = new THREE.Quaternion();
      quaternion2.setFromRotationMatrix(rotationMatrix2);
      newCell2.setRotationFromQuaternion(quaternion2);
    }
    separationDistance1 = getRadiusAlongDirection(parentCell, directionVector1) + getRadiusAlongDirection(newCell1, directionVector1);
    if (produceTwoCells && newCell2) {
      separationDistance2 = getRadiusAlongDirection(parentCell, directionVector2) + getRadiusAlongDirection(newCell2, directionVector2);
    }
    if (totalCellCountRef.current >= MAX_TOTAL_CELLS ||
    cellsRef.current.length >= MAX_VISIBLE_CELLS) {
      setIsPaused(true);
    }
    const animate = () => {
      const finalProgressNeeded = (produceTwoCells && newCell2) ? (1 + secondBudDelay) : 1;
      if (progress >= finalProgressNeeded) {
        parentCell.userData.dividing = false;
        parentCell.userData.growthStage = 0;
        updateStats();
        return;
      }
      progress += 0.015;
      const adjustedSeparationDistance = separationDistance1;
      const progress1 = Math.min(progress, 1);
      newCell1.position.copy(parentCell.position).addScaledVector(directionVector1, adjustedSeparationDistance * progress1);
      if (produceTwoCells && newCell2) {
        const adjustedSeparationDistance2 = separationDistance2;
        const progress2 = Math.max(Math.min(progress - secondBudDelay, 1), 0);
        if (progress2 > 0 && !newCell2.visible)
          newCell2.visible = true;
        newCell2.position.copy(parentCell.position).addScaledVector(directionVector2, adjustedSeparationDistance2 * progress2);
      }
      requestAnimationFrame(animate);
    };
    animate();
    manageVisibleCells();
  };
  const calculateGrowthRate = () => {
    const baseRate = 0.15;
    const timeMultiplier = Math.min(timeStep / 200, 3);
    const oxygenEffect = 0.8;
    const temperatureEffect = 1.0;
    return ((baseRate * (1 + timeMultiplier) * oxygenEffect * temperatureEffect * speedMultiplier) * 100).toFixed(2);
  };
  useEffect(() => {
    let interval;
    if (!isPaused) {
      const intervalTime = Math.max(10, Math.floor(50 / speedMultiplier));
      interval = setInterval(() => {
        setTimeStep(prev => prev + 1);
        cellsRef.current.forEach(cell => {
          if (!cell.userData.dividing) {
            const growthRate = (calculateGrowthRate() / 2000) * cell.userData.growthRateModifier;
            cell.userData.growthStage += growthRate;
            const targetLength = calculateCellLength(environment.oxygen);
            const newScaleX = cell.scale.x + (targetLength - cell.scale.x) * 0.1;
            if (yeastType === 'grape_n1') {
              cell.scale.set(newScaleX, newScaleX, newScaleX);
            } else {
              cell.scale.set(newScaleX, 1, 1);
            }
            if (cell.userData.growthStage >= (1 + cell.userData.divisionDelay)) {
              divideCellProcess(cell);
            }
          }
        });
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [isPaused, speedMultiplier]);
  const handleReset = () => {
    cellsRef.current.forEach(cell => {
      sceneRef.current.remove(cell);
    });
    cellsRef.current = [];
    totalCellCountRef.current = 1;
    cellIdCounterRef.current = 1;
    setSelectedCell(null);
    addInitialCell();
    setTimeStep(0);
    setIsPaused(true);
  };
  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 0, 30);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };
  const totalMinutes = (timeStep * 0.087);
  const minutes = Math.floor(totalMinutes);
  const seconds = Math.floor((totalMinutes - minutes) * 60);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <HelpButton title="Yeast Simulation Help" content={helpContent} />
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>3D Yeast Growth Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 w-full mx-auto">
            <div className="flex gap-4 mb-4">
              <Button 
                onClick={() => setIsPaused(!isPaused)} 
                className="w-24"
              >
                {isPaused ? 'Start' : 'Pause'}
              </Button>
              <Button 
                onClick={handleReset} 
                className="w-24"
              >
                Reset
              </Button>
              <Button 
                onClick={resetCamera} 
                className="w-24"
              >
                Reset View
              </Button>
              <select
                className="min-w-[220px] w-56 h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={yeastType}
                onChange={(e) => setYeastType(e.target.value)}
              >
                <option value="grape_n1">Grape Yeast N1</option>
                <option value="grape">Grape Yeast</option>
              </select>
            </div>
            <div className="mb-4">
              <div className="mb-2">Simulation Speed: {speedMultiplier}x</div>
              <input
                type="range"
                value={speedMultiplier}
                onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                min={0.5}
                max={3}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0.5x</span>
                <span>1x</span>
                <span>1.5x</span>
                <span>2x</span>
                <span>2.5x</span>
                <span>3x</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex justify-center items-center bg-gray-100 rounded-lg flex-1" style={{ width: '100%', height: '75vh', position: 'relative' }}>
               <canvas 
                 ref={canvasRef} 
                className="rounded-lg w-full h-full"
                style={{ width: '100%', height: '100%' }}
               />
              {selectedCell && (
                <div 
                  className="absolute bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-sm"
                  style={{
                    left: `${selectedCell.clickPosition ? selectedCell.clickPosition.x : 400}px`,
                    top: `${selectedCell.clickPosition ? selectedCell.clickPosition.y : 250}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10
                  }}
                >
                  Generation {selectedCell.id}
                </div>
              )}
              </div>
              <div className="p-4 bg-white rounded-lg shadow lg:w-64 w-full">
                <div className="text-gray-600 text-sm text-left space-y-2">
                  <p>
                    This model simulates the 3D growth of our multicellular Grape Yeast using a bio-mathematical modeling framework.
                  </p>
                  <p>
                    The framework can be extended to simulate more complex behaviors or introduce other variables (e.g., nutrients, competition).
                  </p>
                  <p className="mt-1 text-green-600">
                    Left-drag rotates, mouse wheel zooms, right-click pans the view.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default YeastSimulation;