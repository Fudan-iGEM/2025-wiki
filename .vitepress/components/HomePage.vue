<template>
  <div ref="homepageRef" class="homepage">
    <div ref="glitchOverlayRef" class="glitch-overlay"></div>

    <Scene1
      ref="scene1ComponentRef"
      :animation-url="scene1.animationUrl"
      :title-src="scene1.titleSrc"
      :subtitle-key="subtitleKey"
      @lottie-complete="handleLottieComplete"
    />

    <Scene2
      ref="scene2ComponentRef"
      :dialogs="dialogs"
      :dialog-box-refs="dialogBoxRefs"
      :is-send-enabled="isSendEnabled"
      :is-send-active="isSendActive"
      :scene2-animation-url="scene2AnimationUrl"
      :scene2-loop="scene2Loop"
      @send-click="handleSendClick"
    />

    <Scene4
      ref="scene4ComponentRef"
      :scene4-animation-url="scene4AnimationUrl"
      :scene4-loop="scene4Loop"
      :scene4-autoplay="scene4Autoplay"
      @dog1-complete="handleDog1Complete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { Draggable } from 'gsap/Draggable'
import Scene1 from './home/Scene1.vue'
import Scene2 from './home/Scene2.vue'
import Scene4 from './home/Scene4.vue'
import { useScene3 } from './home/useScene3.js'

gsap.registerPlugin(ScrollTrigger, TextPlugin, Draggable)

// --- Scene Definitions ---
const scene1 = { animationUrl: 'https://static.igem.wiki/teams/5643/img/homepage/page1.json', titleSrc: 'https://static.igem.wiki/teams/5643/img/homepage/title.webp' }
const scene2Lotties = { crisis1: 'https://static.igem.wiki/teams/5643/img/homepage/crisis.json', crisis2: 'https://static.igem.wiki/teams/5643/img/homepage/crisis2.json' }
const scene4Lotties = { dog1: 'https://static.igem.wiki/teams/5643/img/homepage/dog1.json', dog2: 'https://static.igem.wiki/teams/5643/img/homepage/dog2.json', dog3: 'https://static.igem.wiki/teams/5643/img/homepage/dog3.json' }

const dialogs = ref([
  { id: 0, text: 'It’s the year of 2333, a formidable crisis has swept over the world—antimicrobial resistance.', isInput: false },
  { id: 1, text: 'Invasive fungal infections affecting billions of people worldwide are getting fatal while effective drugs are severely shrinking. ', isInput: false },
  { id: 2, text: 'Why is all this happening? How could I help?', isInput: true }
])

// --- Component & Template Refs ---
const homepageRef = ref(null)
const glitchOverlayRef = ref(null)
const scene1ComponentRef = ref(null)
const scene2ComponentRef = ref(null)
const scene4ComponentRef = ref(null)

const dialogBoxRefs = reactive({})
const isSendEnabled = ref(false)
const isSendActive = ref(false)
const hasSendTriggered = ref(false)

const scene4AnimationUrl = ref('')
const scene4Loop = ref(false)
const scene4Autoplay = ref(false)

const subtitleKey = ref(0)
const scene2AnimationUrl = ref('')
const scene2Loop = ref(false)
let mainTimeline = null
let scene2Timeline = null

// --- Composables ---
const { triggerDoctorReplies } = useScene3()

const getSendButtonEl = () => scene2ComponentRef.value?.scene2Ref?.querySelector('.crisis-dialog__send')

const activateSendPrompt = () => {
  if (hasSendTriggered.value) return
  if (!isSendEnabled.value) {
    isSendEnabled.value = true
    const sendButton = getSendButtonEl()
    if (sendButton) {
      gsap.to(sendButton, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(1.6)' })
      const promptText = scene2ComponentRef.value?.scene2Ref?.querySelector('.crisis-dialog__send-prompt')
      if (promptText) {
        gsap.to(promptText, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.3 })
      }
    }
  }
  isSendActive.value = true
}

const fadeOutInitialDialogs = () => {
  const idsToRemove = dialogs.value
    .filter(dialog => dialog.id <= 2)
    .map(dialog => dialog.id)

  if (!idsToRemove.length) return

  const elements = idsToRemove
    .map(id => dialogBoxRefs[id])
    .filter(Boolean)

  if (elements.length) {
    gsap.to(elements, {
      autoAlpha: 0,
      y: -12,
      duration: 0.35,
      stagger: 0.08,
      ease: 'power2.in',
      onComplete: () => {
        dialogs.value = dialogs.value.filter(dialog => !idsToRemove.includes(dialog.id))
        idsToRemove.forEach(id => delete dialogBoxRefs[id])
      }
    })
  } else {
    dialogs.value = dialogs.value.filter(dialog => !idsToRemove.includes(dialog.id))
    idsToRemove.forEach(id => delete dialogBoxRefs[id])
  }
}

const handleSendClick = () => {
  if (!isSendEnabled.value || hasSendTriggered.value) return
  hasSendTriggered.value = true
  isSendActive.value = false
  isSendEnabled.value = false

  gsap.to(getSendButtonEl(), { autoAlpha: 0, scale: 0.5, duration: 0.3, ease: 'power2.in' })
  gsap.to(scene2ComponentRef.value?.scene2Ref?.querySelector('.crisis-dialog__send-prompt'), { autoAlpha: 0, duration: 0.3 })

  const userInputDialog = dialogs.value.find(d => d.isInput)
  if (userInputDialog) {
    userInputDialog.text = 'We need a new approach. What are our options?'
    userInputDialog.isInput = false
    gsap.to(dialogBoxRefs[userInputDialog.id], { duration: 1.5, text: userInputDialog.text, ease: 'none' })
  }

  scene2AnimationUrl.value = scene2Lotties.crisis2
  scene2Loop.value = true
  nextTick(() => scene2ComponentRef.value?.lottie2Ref?.play())

  gsap.delayedCall(1.2, fadeOutInitialDialogs)

  // --- SCENE 3: Doctor Replies ---
  triggerDoctorReplies(dialogs, dialogBoxRefs)

  // --- TRANSITION TO SCENE 4 ---
  gsap.delayedCall(7.5, () => {
    gsap.to(Object.values(dialogBoxRefs), {
      autoAlpha: 0, y: -20, duration: 0.4, stagger: 0.1,
      onComplete: () => {
        dialogs.value = []
        gsap.to(scene2ComponentRef.value?.scene2ContentRef, {
          autoAlpha: 0,
          duration: 0.5,
          onComplete: () => {
            gsap.set(scene2ComponentRef.value?.scene2ContentRef, { display: 'none' })
            setupScene4()
          }
        })
      }
    })
  })
}

const setupScene4 = () => {
  const scene4 = scene4ComponentRef.value
  if (!scene4) return

  gsap.to(scene4.scene4ContainerRef, { autoAlpha: 1, duration: 0.5 })

  const ball = scene4.glowingBallRef
  const target = scene4.dropTargetRef
  const originalBoxShadow = '0 0 30px 10px rgba(255, 154, 0, 0.55)'
  const brighterBoxShadow = '0 0 50px 20px rgba(255, 180, 0, 0.75)'

  if (scene4.scene4LeftBoxRef) {
    gsap.set(scene4.scene4LeftBoxRef, { text: '' })
  }

  gsap.set(ball, { x: 0, y: 0, autoAlpha: 1, boxShadow: originalBoxShadow })

  gsap.from(scene4.scene4LeftBoxRef, { autoAlpha: 0, x: -50, duration: 1, ease: 'power2.out', delay: 0.2 })
  gsap.from(ball, { autoAlpha: 0, scale: 0.5, duration: 1, ease: 'power2.out', delay: 0.5 })
  gsap.from(target, { autoAlpha: 0, scale: 0.5, duration: 1, ease: 'back.out(1.7)', delay: 0.7 })
  gsap.from(scene4.scene4ContainerRef.querySelector('.drag-prompt'), { autoAlpha: 0, delay: 1.5 })

  scene4AnimationUrl.value = scene4Lotties.dog1
  scene4Loop.value = false
  scene4Autoplay.value = true

  Draggable.create(ball, {
    bounds: scene4.scene4ContainerRef,
    onPress: function() {
      gsap.to(this.target, { 
        boxShadow: brighterBoxShadow,
        duration: 0.3 
      });
      gsap.set(this.target, { zIndex: 10 });
    },
    onDragEnd: function() {
      if (this.hitTest(target, '50%')) {
        this.disable()
        gsap.to(this.target, { boxShadow: originalBoxShadow, duration: 0.3 });
        const ballRect = this.target.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()
        const deltaX = targetRect.left + targetRect.width / 2 - (ballRect.left + ballRect.width / 2)
        const deltaY = targetRect.top + targetRect.height / 2 - (ballRect.top + ballRect.height / 2)
        gsap.to(this.target, { x: this.x + deltaX, y: this.y + deltaY, duration: 0.3, ease: 'power2.inOut' })
        gsap.to(this.target, { autoAlpha: 0, delay: 0.3 })
        gsap.to(scene4.scene4ContainerRef.querySelector('.drag-prompt'), { autoAlpha: 0 })
        
        scene4AnimationUrl.value = scene4Lotties.dog3
        scene4Loop.value = true
        scene4Autoplay.value = true

        gsap.to(scene4.scene4LeftBoxRef, { duration: 2, text: 'Protocol initiated. Dr. sTraTeGY is now active.', ease: 'none', delay: 0.5 })
      } else {
        gsap.to(this.target, {
          x: 0,
          y: 0,
          boxShadow: originalBoxShadow,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => gsap.set(this.target, { zIndex: 1 })
        })
      }
    }
  })
}

const handleDog1Complete = () => {
  // This logic might need adjustment if dog1->dog2 loop is no longer desired.
  // For now, we keep it as a potential feature.
  if (scene4AnimationUrl.value === scene4Lotties.dog1) {
    scene4AnimationUrl.value = scene4Lotties.dog2
    scene4Loop.value = true
    scene4Autoplay.value = true
    nextTick(() => {
        const lottie4 = scene4ComponentRef.value?.lottie4Ref
        if (lottie4) {
          lottie4.stop()
          lottie4.play()
        }
    })
  }
}

// --- Animation Logic ---

onMounted(() => {
  nextTick(() => {
    setupInitialStates()
    document.body.style.overflow = 'hidden'
  })
})

const setupInitialStates = () => {
  const scene1 = scene1ComponentRef.value
  const scene2 = scene2ComponentRef.value
  if (!scene1 || !scene2) return

  gsap.set(homepageRef.value, { backgroundColor: '#FFFFFF' })
  gsap.set([scene1.scene1Ref, scene2.scene2Ref], { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' })
  gsap.set(scene2.scene2Ref, { autoAlpha: 0 })
  gsap.set(scene2.scene2ContentRef, { display: '' })
  gsap.set(scene1.titleImageRef, { x: '-120%', autoAlpha: 0 })
  gsap.set(scene1.subtitleWrapperRef, { y: 24, autoAlpha: 0 })
  gsap.set(Object.values(dialogBoxRefs), { autoAlpha: 0, y: 20 })
  gsap.set(scene2.scene2Ref.querySelector('.crisis-dialog__avatar'), { autoAlpha: 0 })
  isSendEnabled.value = false
  isSendActive.value = false
  hasSendTriggered.value = false
  scene2Loop.value = false
  gsap.set(getSendButtonEl(), { autoAlpha: 0, scale: 0.9 })
  gsap.set(scene2.scene2Ref.querySelector('.crisis-dialog__send-prompt'), { autoAlpha: 0 });
}

const handleLottieComplete = () => {
  subtitleKey.value++
  const scene1 = scene1ComponentRef.value
  if (!scene1) return

  const titleTimeline = gsap.timeline({
    onComplete: () => {
      if (!ScrollTrigger.isTouch) {
        setupScrollAnimation()
        document.body.style.overflow = ''
      }
    }
  })
  titleTimeline
    .to(scene1.titleImageRef, { x: 0, autoAlpha: 1, duration: 1.2, ease: 'bounce.out' })
    .to(scene1.subtitleWrapperRef, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
}

let hasScene2Played = false
const playScene2Sequence = () => {
  if (hasScene2Played) return
  hasScene2Played = true

  const scene2 = scene2ComponentRef.value
  if (!scene2) return

  scene2Loop.value = false
  scene2AnimationUrl.value = scene2Lotties.crisis1
  nextTick(() => scene2.lottie2Ref?.play())

  nextTick(() => {
    scene2Timeline = gsap.timeline()
    scene2Timeline.to(scene2.scene2Ref.querySelector('.crisis-dialog__avatar'), { autoAlpha: 1, duration: 0.5 })

    dialogs.value.forEach((dialog) => {
      const el = dialogBoxRefs[dialog.id]
      if (el) {
        scene2Timeline.to(el, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '>')
        .to(el, { duration: 1.5, text: dialog.text, ease: 'none' }, '<')
      } else {
        console.warn(`Dialog element with id ${dialog.id} not found.`)
      }
    })

    scene2Timeline.call(activateSendPrompt, [], '+=1.0')
  })
}

const setupScrollAnimation = () => {
  const scene1 = scene1ComponentRef.value
  const scene2 = scene2ComponentRef.value
  if (!scene1 || !scene2) return

  mainTimeline = gsap.timeline({ scrollTrigger: { trigger: homepageRef.value, pin: true, scrub: 1, start: 'top top', end: '+=4000' } })
  mainTimeline
    .to({}, { duration: 1.0 }) // Pause after title is shown
    .set(glitchOverlayRef.value, { className: 'glitch-overlay active' })
    .to([scene1.titleWrapperRef, scene1.lottie1WrapperRef], { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut' })
    .to(homepageRef.value, { backgroundColor: '#3a1667', duration: 1.2, ease: 'power2.inOut' }, '<')
    .set(glitchOverlayRef.value, { className: 'glitch-overlay' }, '>-0.5')
    .to(scene2.scene2Ref, { autoAlpha: 1, duration: 0.1 }, '-=0.8')
    .addLabel('scene2Start')
    .to({}, { duration: 0.5 })
    .call(playScene2Sequence, [], '>')
    .to({}, { duration: 5 })
}

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  mainTimeline?.kill()
  scene2Timeline?.kill()
  const scene4 = scene4ComponentRef.value
  if (scene4 && scene4.glowingBallRef) {
      Draggable.get(scene4.glowingBallRef)?.kill()
  }
  ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>

<style scoped>
.homepage {
  position: relative;
  width: 100%;
  height: 100vh;
}
.glitch-overlay {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;
}
.glitch-overlay.active {
  display: block;
  animation: glitch-lines 0.5s steps(1) infinite;
}
@keyframes glitch-lines {
  0% { background: transparent; }
  10% { background: rgba(255, 0, 0, 0.05); transform: translateY(calc(var(--glitch-p1) * 1%)); }
  20% { background: transparent; }
  30% { background: rgba(0, 255, 0, 0.05); transform: translateY(calc(var(--glitch-p2) * 1%)); }
  40% { background: transparent; }
  50% { background: rgba(0, 0, 255, 0.05); transform: translateY(calc(var(--glitch-p3) * 1%)); }
  60% { background: transparent; }
  70% { background: rgba(255, 0, 255, 0.05); transform: translateY(calc(var(--glitch-p1) * -1%)); }
  80% { background: transparent; }
  90% { background: rgba(0, 255, 255, 0.05); transform: translateY(calc(var(--glitch-p2) * -1%)); }
  100% { background: transparent; --glitch-p1: calc(random() * 100); --glitch-p2: calc(random() * 100); --glitch-p3: calc(random() * 100); }
}
</style>
