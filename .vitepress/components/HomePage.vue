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

    <Scene5
      ref="scene5ComponentRef"
      :items="scene5Items"
    />

    <Scene6
      ref="scene6ComponentRef"
      :items="scene6Items"
    />

    <Scene7
      ref="scene7ComponentRef"
    />

    <Scene8
      ref="scene8ComponentRef"
      :cards="scene8Cards"
    />

    <button
      v-if="skipAvailable"
      type="button"
      class="skip-button"
      @click="skipToFinalScene"
    >
      Skip
    </button>

    <div
      ref="scrollPromptRef"
      class="scroll-prompt"
      :class="{ 'scroll-prompt--visible': scrollPromptVisible }"
    >
      <span class="scroll-prompt__text">Scroll Down</span>
      <span class="scroll-prompt__arrow"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, nextTick, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { Draggable } from 'gsap/Draggable'
import Scene1 from './home/Scene1.vue'
import Scene2 from './home/Scene2.vue'
import Scene4 from './home/Scene4.vue'
import Scene5 from './home/Scene5.vue'
import Scene6 from './home/Scene6.vue'
import Scene7 from './home/Scene7.vue'
import Scene8 from './home/Scene8.vue'
import { useScene3 } from './home/useScene3.js'

gsap.registerPlugin(ScrollTrigger, TextPlugin, Draggable)

// --- Scene Definitions ---
const scene1 = { animationUrl: 'https://static.igem.wiki/teams/5643/img/homepage/page1.json', titleSrc: 'https://static.igem.wiki/teams/5643/img/homepage/title.webp' }
const scene2Lotties = { crisis1: 'https://static.igem.wiki/teams/5643/img/homepage/crisis.json', crisis2: 'https://static.igem.wiki/teams/5643/img/homepage/crisis2.json' }
const scene4Lotties = { 
  dog1: 'https://static.igem.wiki/teams/5643/img/homepage/dog1n.json', 
  dog2: 'https://static.igem.wiki/teams/5643/img/homepage/dog2n.json', 
  dog3: 'https://static.igem.wiki/teams/5643/img/homepage/dog3n.json',
  dog4: 'https://static.igem.wiki/teams/5643/img/homepage/dog4n.json',
  dog5: 'https://static.igem.wiki/teams/5643/img/homepage/dog5n.json',
  dog6: 'https://static.igem.wiki/teams/5643/img/homepage/dog6n.json',
  dog7: 'https://static.igem.wiki/teams/5643/img/homepage/dog7n.json'
}
const scene5Lotties = { 
  item1: 'https://static.igem.wiki/teams/5643/img/homepage/5-1.json',
  item2: 'https://static.igem.wiki/teams/5643/img/homepage/5-2.json',
  item3: 'https://static.igem.wiki/teams/5643/img/homepage/5-3.json'
}
const scene6Lotties = {
  item1: 'https://static.igem.wiki/teams/5643/img/homepage/6-1.json',
  item2: 'https://static.igem.wiki/teams/5643/img/homepage/6-2.json',
  item3: 'https://static.igem.wiki/teams/5643/img/homepage/6-3.json',
  item4: 'https://static.igem.wiki/teams/5643/img/homepage/6-4.json'
}

const initialScene2Dialogs = [
  { id: 0, text: 'It’s the year of 2333, a formidable Crisis has swept over the world — antimicrobial resistance.', isInput: false },
  { id: 1, text: 'Invasive fungal infections affecting billions of people worldwide are getting fatal while effective drugs are severely shrinking. ', isInput: false },
  { id: 2, text: 'Why is all this happening? How could I help?', isInput: true }
]
const createInitialScene2Dialogs = () => initialScene2Dialogs.map(dialog => ({ ...dialog }))
const dialogs = ref(createInitialScene2Dialogs())

const scene5Items = ref([
  { id: 1, order: 'lottie-first', lottieUrl: scene5Lotties.item1, title: 'Fluoresence-based Detection', description: 'A novel platform for screening drug-resistant mutations' },
  { id: 2, order: 'text-first', lottieUrl: scene5Lotties.item2, title: 'Engineered Grape Yeast', description: 'Utilizing engineered grape yeast as a versatile and efficient chassis' },
  { id: 3, order: 'lottie-first', lottieUrl: scene5Lotties.item3, title: 'AI-Powered Analysis', description: 'An integrated model for predicting multicellular behaviors' }
])

const scene6Items = ref([
    { id: 1, lottieUrl: scene6Lotties.item1, title: 'Rapid and reduce-cost', description: 'DR.sTraTeGY provides a rapid, low-cost chassis to validate mutations and drug effects, offering great potential to accelerate new drug discovery and screening.' },
    { id: 2, lottieUrl: scene6Lotties.item2, title: 'Direct and demystify', description: 'Through programmable environments researchers can directly observe evolutionary divergences, deepening humanity’s understanding of the universal principles of life’s evolution.' },
    { id: 3, lottieUrl: scene6Lotties.item3, title: 'Strategic and safeguarding', description: 'The application of DR.sTraTeGY implies that humanity can fortify defenses ahead of a full-scale outbreak of drug resistance, establishing a societal safeguard against superfungi.' },
    { id: 4, lottieUrl: scene6Lotties.item4, title: 'Educational and enlightening', description: 'By making abstract genetic mutations and evolutionary processes “visual” through colors and different morphologies, it can advance public science education and foster social consensus.' },
]);

const scene8Cards = ref([
  { id: 1, svgUrl: 'https://static.igem.wiki/teams/5643/img/homepage/forpage1.webp', color: '#4ECDC4', link: '/fudan/design/', alt: 'Design', title: 'Design' },
  { id: 2, svgUrl: 'https://static.igem.wiki/teams/5643/img/homepage/forpage2.webp', color: '#1E3A8A', link: '/fudan/parts/', alt: 'Parts', title: 'Parts' },
  { id: 3, svgUrl: 'https://static.igem.wiki/teams/5643/img/homepage/forpage3.webp', color: '#FF6B35', link: '/fudan/model/', alt: 'Model', title: 'Model' },
  { id: 4, svgUrl: 'https://static.igem.wiki/teams/5643/img/homepage/forpage4.webp', color: '#000000', link: '/fudan/inclusivity/', alt: 'Inclusivity', title: 'Inclusivity' }
]);

// --- Component & Template Refs ---
const homepageRef = ref(null)
const glitchOverlayRef = ref(null)
const scene1ComponentRef = ref(null)
const scene2ComponentRef = ref(null)
const scene4ComponentRef = ref(null)
const scene5ComponentRef = ref(null)
const scene6ComponentRef = ref(null)
const scene7ComponentRef = ref(null)
const scene8ComponentRef = ref(null)
const scrollPromptRef = ref(null)

const dialogBoxRefs = reactive({})
const isSendEnabled = ref(false)
const isSendActive = ref(false)
const hasSendTriggered = ref(false)
const scene2ContentHidden = ref(false)
let scene2SequenceActive = false
const scene2CleanupCallbacks = []
let scene2DoctorRepliesCleanup = null

const scrollPromptVisible = ref(false)
const scrollPromptMode = ref('none')
const initialScrollPromptShown = ref(false)
const postDragScrollPromptShown = ref(false)
let scrollPromptHideProgress = null
const skipAvailable = ref(false)
const skipTriggered = ref(false)

const scene4AnimationUrl = ref('')
const scene4Loop = ref(false)
const scene4Autoplay = ref(false)
// 场景4：圆球是否已成功放置到目标上（用于滚动解锁）
const scene4BallPlaced = ref(false)

// 添加第三幕动画完成状态
const scene3AnimationComplete = ref(false)

const subtitleKey = ref(0)
const scene2AnimationUrl = ref('')
const scene2Loop = ref(false)
let mainTimeline = null
let scene2Timeline = null
let skipScrollTween = null

const resetPinSpacerStyles = () => {
  const wrapper = homepageRef.value?.parentElement
  if (!wrapper?.classList?.contains('pin-spacer')) return
  wrapper.style.removeProperty('padding')
  wrapper.style.removeProperty('height')
  wrapper.style.removeProperty('max-width')
  wrapper.style.removeProperty('margin')
  wrapper.style.removeProperty('min-width')
  wrapper.style.removeProperty('display')
}

// --- Composables ---
const { triggerDoctorReplies } = useScene3()

watch(scene4AnimationUrl, (url) => {
  if (url === scene4Lotties.dog3) {
    scene4BallPlaced.value = true
  }
})

const getSendButtonEl = () => scene2ComponentRef.value?.scene2Ref?.querySelector('.crisis-dialog__send')

const setScene4Animation = (url, { loop = true, autoplay = true, restart = true } = {}) => {
  scene4AnimationUrl.value = url
  scene4Loop.value = loop
  scene4Autoplay.value = autoplay

  if (!restart) return

  nextTick(() => {
    const lottieInstance = scene4ComponentRef.value?.lottie4Ref
    if (!lottieInstance) return

    lottieInstance.stop()
    if (autoplay) {
      lottieInstance.play()
    }
  })
}

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
  if (!scene2SequenceActive) return null

  const idsToRemove = dialogs.value
    .filter(dialog => dialog.id <= 2)
    .map(dialog => dialog.id)

  if (!idsToRemove.length) return null

  const elements = idsToRemove
    .map(id => dialogBoxRefs[id])
    .filter(Boolean)

  if (elements.length) {
    return gsap.to(elements, {
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
  }

  dialogs.value = dialogs.value.filter(dialog => !idsToRemove.includes(dialog.id))
  idsToRemove.forEach(id => delete dialogBoxRefs[id])
  return null
}

const handleSendClick = () => {
  if (!isSendEnabled.value || hasSendTriggered.value) return
  hasSendTriggered.value = true
  isSendActive.value = false
  isSendEnabled.value = false

  scene2SequenceActive = true
  clearScene2Cleanup()

  const sendButton = getSendButtonEl()
  if (sendButton) {
    const hideSendTween = gsap.to(sendButton, { autoAlpha: 0, scale: 0.5, duration: 0.3, ease: 'power2.in' })
    registerScene2Cleanup(() => hideSendTween.kill())
  }
  const promptEl = scene2ComponentRef.value?.scene2Ref?.querySelector('.crisis-dialog__send-prompt')
  if (promptEl) {
    const hidePromptTween = gsap.to(promptEl, { autoAlpha: 0, duration: 0.3 })
    registerScene2Cleanup(() => hidePromptTween.kill())
  }

  const userInputDialog = dialogs.value.find(d => d.isInput)
  if (userInputDialog) {
    userInputDialog.text = 'We need a new approach. What are our options?'
    userInputDialog.isInput = false
    const typingTween = gsap.to(dialogBoxRefs[userInputDialog.id], { duration: 1.5, text: userInputDialog.text, ease: 'none' })
    registerScene2Cleanup(() => typingTween.kill())
  }

  scene2AnimationUrl.value = scene2Lotties.crisis2
  scene2Loop.value = true
  nextTick(() => scene2ComponentRef.value?.lottie2Ref?.play())

  const fadeInitialDialogsDelay = gsap.delayedCall(1.2, () => {
    if (!scene2SequenceActive) return
    const fadeTween = fadeOutInitialDialogs()
    if (fadeTween) {
      registerScene2Cleanup(() => fadeTween.kill())
    }
  })
  registerScene2Cleanup(() => fadeInitialDialogsDelay.kill())

  // --- SCENE 3: Doctor Replies ---
  scene2DoctorRepliesCleanup = triggerDoctorReplies(dialogs, dialogBoxRefs, () => scene2SequenceActive)
  registerScene2Cleanup(() => {
    scene2DoctorRepliesCleanup?.()
    scene2DoctorRepliesCleanup = null
  })
  
  // 标记第三幕动画完成 - 在第二段回复完成后
  const scene3CompleteDelay = gsap.delayedCall(6.0, () => {
    if (!scene2SequenceActive) return
    scene3AnimationComplete.value = true
  })
  registerScene2Cleanup(() => scene3CompleteDelay.kill())

  // --- TRANSITION TO SCENE 4 ---
  const transitionDelay = gsap.delayedCall(7.5, () => {
    if (!scene2SequenceActive) return
    const dialogElements = Object.values(dialogBoxRefs)
    const fadeDialogsTween = gsap.to(dialogElements, {
      autoAlpha: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.1,
      onComplete: () => {
        if (!scene2SequenceActive) return
        dialogs.value = []
        const hideTween = setScene2ContentVisibility(false)
        if (hideTween) {
          hideTween.eventCallback('onComplete', () => {
            if (!scene2SequenceActive) return
            setupScene4()
            scene2SequenceActive = false
          })
          registerScene2Cleanup(() => hideTween.kill())
        } else {
          setupScene4()
          scene2SequenceActive = false
        }
      }
    })
    registerScene2Cleanup(() => fadeDialogsTween.kill())
  })
  registerScene2Cleanup(() => transitionDelay.kill())
}

const showScrollPrompt = (mode) => {
  if (scrollPromptMode.value === mode && scrollPromptVisible.value) return

  if (mode === 'initial') {
    if (initialScrollPromptShown.value) return
    initialScrollPromptShown.value = true
    scrollPromptHideProgress = 0.02
  } else if (mode === 'postDrag') {
    if (postDragScrollPromptShown.value) return
    postDragScrollPromptShown.value = true
    const currentProgress = mainTimeline?.scrollTrigger?.progress ?? 0
    const baseProgress = currentProgress + 0.04
    const clampedProgress = Math.min(0.98, baseProgress)
    scrollPromptHideProgress = clampedProgress <= currentProgress
      ? Math.min(0.999, currentProgress + 0.02)
      : clampedProgress
  }

  scrollPromptMode.value = mode
  scrollPromptVisible.value = true
}

const hideScrollPrompt = () => {
  if (!scrollPromptVisible.value) return
  scrollPromptVisible.value = false
  scrollPromptMode.value = 'none'
  scrollPromptHideProgress = null
}

watch(scene4BallPlaced, (placed) => {
  if (placed) {
    showScrollPrompt('postDrag')
  }
})

const registerScene2Cleanup = (cleanup) => {
  if (typeof cleanup === 'function') {
    scene2CleanupCallbacks.push(cleanup)
  }
}

const clearScene2Cleanup = () => {
  while (scene2CleanupCallbacks.length) {
    const cleanup = scene2CleanupCallbacks.pop()
    try {
      cleanup()
    } catch (error) {
      console.warn('Failed to clear Scene 2 cleanup callback.', error)
    }
  }
  scene2DoctorRepliesCleanup = null
}

const setScene2ContentVisibility = (shouldShow, { immediate = false } = {}) => {
  const contentEl = scene2ComponentRef.value?.scene2ContentRef
  if (!contentEl) return null

  if (shouldShow) {
    if (!scene2ContentHidden.value && !immediate) return null
    if (immediate) {
      gsap.set(contentEl, { display: '', autoAlpha: 1 })
    } else {
      gsap.set(contentEl, { display: '' })
      gsap.to(contentEl, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' })
    }
    scene2ContentHidden.value = false
    return null
  }

  if (scene2ContentHidden.value && !immediate) return null

  if (immediate) {
    gsap.set(contentEl, { autoAlpha: 0, display: 'none' })
    scene2ContentHidden.value = true
    return null
  }

  const tween = gsap.to(contentEl, {
    autoAlpha: 0,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      gsap.set(contentEl, { display: 'none' })
    }
  })
  scene2ContentHidden.value = true
  return tween
}

const resetScene2Dialogs = () => {
  dialogs.value = createInitialScene2Dialogs()
  Object.keys(dialogBoxRefs).forEach(key => {
    delete dialogBoxRefs[key]
  })
}

const resetScene2InteractionState = ({ resetProgressFlags = false } = {}) => {
  resetScene2Dialogs()
  isSendEnabled.value = false
  isSendActive.value = false
  hasSendTriggered.value = false
  const sendButton = getSendButtonEl()
  if (sendButton) {
    gsap.set(sendButton, { autoAlpha: 0, scale: 0.9 })
  }
  const promptText = scene2ComponentRef.value?.scene2Ref?.querySelector('.crisis-dialog__send-prompt')
  if (promptText) {
    gsap.set(promptText, { autoAlpha: 0, y: 10 })
  }
  scene2Loop.value = false
  scene2AnimationUrl.value = ''
  hasScene2Played = false
  scene2Timeline?.kill()
  scene2Timeline = null
  if (resetProgressFlags) {
    scene3AnimationComplete.value = false
    scene4BallPlaced.value = false
  }
}

const resetScene4State = () => {
  const scene4 = scene4ComponentRef.value
  if (!scene4) return

  Draggable.get(scene4.glowingBallRef)?.kill()

  const resetTargets = [
    scene4.scene4LeftBoxRef,
    scene4.dropTargetRef,
    scene4.glowingBallRef
  ].filter(Boolean)
  if (resetTargets.length) {
    gsap.set(resetTargets, { clearProps: 'all' })
  }

  if (scene4.scene4ContainerRef) {
    scene4.scene4ContainerRef.style.display = ''
    gsap.set(scene4.scene4ContainerRef, { autoAlpha: 0 })
  }

  scene4AnimationUrl.value = ''
}

const resetScene2ForRewind = () => {
  if (!scene2ContentHidden.value && !hasSendTriggered.value && !scene3AnimationComplete.value && !scene4BallPlaced.value) {
    return
  }

  skipScrollTween?.kill()
  skipScrollTween = null

  scene2SequenceActive = false
  clearScene2Cleanup()
  resetScene2InteractionState({ resetProgressFlags: true })
  setScene2ContentVisibility(true, { immediate: true })

  const scene2 = scene2ComponentRef.value
  if (scene2) {
    const avatar = scene2.scene2Ref?.querySelector('.crisis-dialog__avatar')
    if (avatar) {
      gsap.set(avatar, { autoAlpha: 0 })
    }
  }

  resetScene4State()
  skipTriggered.value = false
}

const skipToFinalScene = () => {
  if (!mainTimeline?.scrollTrigger || skipTriggered.value) return

  skipTriggered.value = true
  skipAvailable.value = false
  hideScrollPrompt()
  initialScrollPromptShown.value = true
  postDragScrollPromptShown.value = true

  skipScrollTween?.kill()
  skipScrollTween = null

  scene3AnimationComplete.value = true
  scene4BallPlaced.value = true
  hasSendTriggered.value = true
  isSendEnabled.value = false
  isSendActive.value = false

  scene2SequenceActive = false
  clearScene2Cleanup()
  scene2Timeline?.kill()
  scene2Timeline = null

  setScene2ContentVisibility(false, { immediate: true })
  const scene2 = scene2ComponentRef.value
  if (scene2?.scene2Ref) {
    gsap.set(scene2.scene2Ref, { autoAlpha: 0 })
  }
  dialogs.value = []
  Object.keys(dialogBoxRefs).forEach(key => delete dialogBoxRefs[key])

  const scrollTrigger = mainTimeline.scrollTrigger
  if (scrollTrigger) {
    const scrollTarget = scrollTrigger.scroller || (typeof window !== 'undefined' ? window : null)
    const setScroll = scrollTarget && scrollTarget !== window && scrollTarget !== window?.document?.documentElement && scrollTarget !== window?.document?.body
      ? (value) => { scrollTarget.scrollTop = value }
      : (value) => { window?.scrollTo({ top: value, behavior: 'auto' }) }

    setScroll?.(scrollTrigger.end)
    mainTimeline.progress(1, false)
    scrollTrigger.update()
  } else {
    mainTimeline.progress(1, false)
  }
}

const setupScene4 = () => {
  const scene4 = scene4ComponentRef.value
  if (!scene4) return

  gsap.to(scene4.scene4ContainerRef, { autoAlpha: 1, duration: 0.5 })

  const ball = scene4.glowingBallRef
  const target = scene4.dropTargetRef
  const originalBoxShadow = '0 0 30px 10px rgba(255, 154, 0, 0.55)'
  const brighterBoxShadow = '0 0 50px 20px rgba(255, 180, 0, 0.75)'

  if (ball) {
    Draggable.get(ball)?.kill()
  }

  if (scene4.scene4LeftBoxRef) {
    // 清空标题内容并隐藏副标题，准备打字与显现动画
    if (scene4.scene4TitleRef) {
      gsap.set(scene4.scene4TitleRef, { text: '' })
    }
    if (scene4.scene4SubtitleRef) {
      gsap.set(scene4.scene4SubtitleRef, { autoAlpha: 0, y: 8 })
    }
  }

  // 动态把球定位到卡片左下角，稍微被卡片遮住但露出一点
  const containerRect = scene4.scene4ContainerRef.getBoundingClientRect()
  const boxRect = scene4.scene4LeftBoxRef?.getBoundingClientRect()
  const ballRect = ball.getBoundingClientRect()
  if (boxRect) {
    const desiredLeft = boxRect.left - containerRect.left - ballRect.width * 0.35
    const desiredTop = boxRect.bottom - containerRect.top - ballRect.height * 0.65
    gsap.set(ball, { left: desiredLeft, top: desiredTop })
  }
  gsap.set(ball, { x: 0, y: 0, autoAlpha: 1, zIndex: 1, boxShadow: originalBoxShadow })
  gsap.set(scene4.scene4LeftBoxRef, { zIndex: 5 })

  gsap.from(scene4.scene4LeftBoxRef, { autoAlpha: 0, x: -50, duration: 1, ease: 'power2.out', delay: 0.2 })
  gsap.from(ball, { autoAlpha: 0, scale: 0.5, duration: 1, ease: 'power2.out', delay: 0.5 })
  gsap.from(target, { autoAlpha: 0, scale: 0.5, duration: 1, ease: 'back.out(1.7)', delay: 0.7 })
  gsap.from(scene4.scene4ContainerRef.querySelector('.drag-prompt'), { autoAlpha: 0, delay: 1.5 })

  setScene4Animation(scene4Lotties.dog1, { loop: false, autoplay: true, restart: false })

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
        
        setScene4Animation(scene4Lotties.dog3, { loop: true, autoplay: true })

        // 左侧卡片：标题打字动画 + 副标题显现
        gsap.to(scene4.scene4TitleRef, { duration: 2, text: 'And now we introduce --', ease: 'none', delay: 0.5 })
        gsap.to(scene4.scene4SubtitleRef, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 2.7 })
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
  if (scene4AnimationUrl.value === scene4Lotties.dog1) {
    setScene4Animation(scene4Lotties.dog2, { loop: true, autoplay: true })
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
  const scene5 = scene5ComponentRef.value
  const scene6 = scene6ComponentRef.value
  const scene7 = scene7ComponentRef.value
  const scene8 = scene8ComponentRef.value
  if (!scene1 || !scene2 || !scene5 || !scene6 || !scene7 || !scene8) return

  gsap.set(homepageRef.value, { backgroundColor: '#FFFFFF' })
  gsap.set([scene1.scene1Ref, scene2.scene2Ref, scene5.scene5Ref, scene6.scene6Ref, scene7.scene7Ref, scene8.scene8Ref], { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' })
  gsap.set(scene2.scene2Ref, { autoAlpha: 0 })
  gsap.set(scene5.scene5Ref, { autoAlpha: 0 })
  gsap.set(scene6.scene6Ref, { autoAlpha: 0 })
  gsap.set(scene8.scene8Ref, { autoAlpha: 0 })
  gsap.set(scene2.scene2ContentRef, { display: '' })
  gsap.set(scene1.titleImageRef, { x: '-120%', autoAlpha: 0 })
  gsap.set(scene1.subtitleWrapperRef, { y: 24, autoAlpha: 0 })
  gsap.set(Object.values(dialogBoxRefs), { autoAlpha: 0, y: 20 })
  gsap.set(scene2.scene2Ref.querySelector('.crisis-dialog__avatar'), { autoAlpha: 0 })
  scene2SequenceActive = false
  clearScene2Cleanup()
  resetScene2InteractionState({ resetProgressFlags: true })
  setScene2ContentVisibility(true, { immediate: true })
  scene2ContentHidden.value = false
  gsap.set(scene2.scene2Ref.querySelector('.crisis-dialog__send-prompt'), { autoAlpha: 0 })
  scrollPromptVisible.value = false
  scrollPromptMode.value = 'none'
  initialScrollPromptShown.value = false
  postDragScrollPromptShown.value = false
  scrollPromptHideProgress = null
  skipAvailable.value = false
  skipTriggered.value = false
  skipScrollTween?.kill()
  skipScrollTween = null
}

const handleLottieComplete = () => {
  subtitleKey.value++
  const scene1 = scene1ComponentRef.value
  if (!scene1) return

  const titleTimeline = gsap.timeline({
    onComplete: () => {
      // 移除触摸设备检测，确保所有设备都能启用滚动动画
      setupScrollAnimation()
      document.body.style.overflow = ''
      showScrollPrompt('initial')
      if (!skipTriggered.value) {
        skipAvailable.value = true
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
  const scene4 = scene4ComponentRef.value
  const scene5 = scene5ComponentRef.value
  const scene6 = scene6ComponentRef.value
  const scene7 = scene7ComponentRef.value
  const scene8 = scene8ComponentRef.value
  if (!scene1 || !scene2 || !scene4 || !scene5 || !scene6 || !scene7 || !scene8) return

  mainTimeline = gsap.timeline({ 
    scrollTrigger: { 
      trigger: homepageRef.value, 
      pin: true, 
      scrub: 1, 
      start: 'top top', 
      end: '+=15000',
       onUpdate: (self) => {
        if (mainTimeline && (!scene3AnimationComplete.value || !scene4BallPlaced.value)) {
          const labelTime = mainTimeline.labels?.scene5Start
          if (typeof labelTime === 'number' && mainTimeline.duration()) {
            const gatingProgress = labelTime / mainTimeline.duration()
            if (self.progress > gatingProgress) {
              const clampScroll = self.start + (self.end - self.start) * gatingProgress
              self.scroll(clampScroll)
            }
          }
        }
        // 回退到scene2之前时，为scene4-left-box与lottie容器添加左滑退场
        if (mainTimeline) {
          const scene2EndTime = mainTimeline.labels?.scene2End
          const total = mainTimeline.duration()
          if (typeof scene2EndTime === 'number' && total) {
            const scene2EndProgress = scene2EndTime / total
            if (self.direction === -1 && self.progress < scene2EndProgress) {
              const scene4 = scene4ComponentRef.value
              if (scene4) {
                gsap.to([
                  scene4.scene4LeftBoxRef,
                  scene4.dropTargetRef
                ], { x: '-120%', autoAlpha: 0, duration: 0.45, ease: 'power2.in', overwrite: 'auto' })
              }
              resetScene2ForRewind()
            }
          }
        }

        if (scrollPromptVisible.value && typeof scrollPromptHideProgress === 'number' && self.progress >= scrollPromptHideProgress) {
          hideScrollPrompt()
        }

        if (!skipTriggered.value && initialScrollPromptShown.value) {
          if (self.progress > 0.95) {
            if (skipAvailable.value) {
              skipAvailable.value = false
            }
          } else if (!skipAvailable.value) {
            skipAvailable.value = true
          }
        }
      }
    } 
  })
  
  mainTimeline
    .to({}, { duration: 1.0 }) // Pause after title is shown
    .set(glitchOverlayRef.value, { className: 'glitch-overlay active' })
    .to([scene1.titleWrapperRef, scene1.lottie1WrapperRef], { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut' })
    .to(homepageRef.value, { backgroundColor: '#291c3d', duration: 1.2, ease: 'power2.inOut' }, '<')
    .set(glitchOverlayRef.value, { className: 'glitch-overlay' }, '>-0.5')
    .to(scene2.scene2Ref, { autoAlpha: 1, duration: 0.1 }, '-=0.8')
    .addLabel('scene2End')
    .call(playScene2Sequence, [], '>')
    // 预留第三幕播放的滚动段，但真实锁定由 ScrollTrigger.onUpdate 钳制实现
    .to({}, { duration: 10 })
    .addLabel('scene5Start')
    .to([
      scene4.scene4LeftBoxRef,
      scene4.dropTargetRef,
      scene4.glowingBallRef,
      scene4.scene4ContainerRef.querySelector('.drag-prompt')
    ], { x: '-120%', autoAlpha: 0, duration: 0.6, ease: 'power2.in' })
    .call(() => {
      // 第四幕完结时，直接删除第四幕的DOM内容
      if (scene4.scene4ContainerRef) {
        scene4.scene4ContainerRef.style.display = 'none';
      }
    }, [], '>')
    .to(homepageRef.value, { backgroundColor: '#1a2a45', duration: 1 }, '<')
    .to(scene5.scene5Ref, { autoAlpha: 1, duration: 1 }, '>-0.5')
    .from(scene5.columnWrapperRef.children, { autoAlpha: 0, x: 100, stagger: 0.2, duration: 0.8 }, '>-0.5')
    .call(() => {
      setScene4Animation(scene4Lotties.dog4, { loop: true, autoplay: true })
    }, [], '>')
    .to({}, { duration: 5 }) // Duration for scene 5
    .addLabel('scene6Start')
    .to(scene5.scene5Ref, { x: '-100%', autoAlpha: 0, duration: 1 })
    // 重新显示第四幕的lottie容器用于后续场景
    .call(() => {
      if (scene4.scene4ContainerRef) {
        scene4.scene4ContainerRef.style.display = '';
      }
    }, [], '<')
    .to(scene4.dropTargetRef, { x: 0, autoAlpha: 1, left: '1rem', right: 'auto', duration: 1, ease: 'power2.out' }, '<')
    .call(() => {
      setScene4Animation(scene4Lotties.dog5, { loop: true, autoplay: true })
    }, [], '<')
    .to(scene6.scene6Ref, { autoAlpha: 1, duration: 1 }, '<')
    .to({}, { duration: 5 }) // Duration for scene 6
    .addLabel('scene7Start')
    .to(scene6.scene6Ref, { autoAlpha: 0, duration: 0.5 })
    .to(homepageRef.value, { backgroundColor: '#FFFFFF', duration: 1 }, '<')
    .call(() => { 
      setScene4Animation(scene4Lotties.dog6, { loop: true, autoplay: true })
    }, [], '<')
    .to(scene4.dropTargetRef, { 
      left: '50%', 
      top: '65%', 
      xPercent: -50, 
      yPercent: -50, 
      duration: 1.5, 
      ease: 'power2.inOut',
      onComplete: () => {
        setScene4Animation(scene4Lotties.dog7, { loop: true, autoplay: true })
      }
    }, '>')
    .to(scene7.textRef, { autoAlpha: 1, duration: 1 }, '>-0.5')
    .to(scene4.dropTargetRef, { 
      left: '2rem', 
      bottom: '2rem', 
      top: 'auto',
      right: 'auto',
      xPercent: 0, 
      yPercent: 0, 
      duration: 1.5, 
      ease: 'power2.inOut'
    }, '>-0.5')
    .to({}, { duration: 2 }) // Duration for scene 7 with lottie in final position
    .addLabel('scene8Start')
    .to(scene7.textRef, { autoAlpha: 0, duration: 0.5 })
    .to(scene8.scene8Ref, { autoAlpha: 1, duration: 1 }, '>-0.5')
    .from(scene8.cardsWrapperRef.children, { 
      autoAlpha: 0, 
      y: 100, 
      scale: 0.8,
      stagger: 0.2, 
      duration: 1, 
      ease: 'back.out(1.7)' 
    }, '>-0.5')
    .to({}, { duration: 5 }) // Final pause for scene 8
}

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  const trigger = mainTimeline?.scrollTrigger
  trigger?.kill(false)
  mainTimeline?.kill()
  scene2Timeline?.kill()
  scene2Timeline = null
  scene2SequenceActive = false
  clearScene2Cleanup()
  skipScrollTween?.kill()
  skipScrollTween = null
  const scene4 = scene4ComponentRef.value
  if (scene4 && scene4.glowingBallRef) {
      Draggable.get(scene4.glowingBallRef)?.kill()
  }
  ScrollTrigger.getAll().forEach(st => st.kill())
  resetPinSpacerStyles()
})
</script>

<style scoped>
.homepage {
  position: relative;
  width: 100%;
  height: 100vh;
}
.scroll-prompt {
  position: absolute;
  bottom: 4vh;
  left: 50%;
  transform: translate(-50%, 18px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1.5rem 1rem;
  border-radius: 1.5rem;
  background: rgba(12, 12, 12, 0.72);
  color: #fefefe;
  font-size: 0.82rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.45s ease, transform 0.45s ease;
  z-index: 50;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.3), 0 0 24px rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
}
.scroll-prompt--visible {
  opacity: 1;
  transform: translate(-50%, 0);
}
.scroll-prompt__text {
  font-weight: 700;
  text-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
}
.scroll-prompt__arrow {
  width: 14px;
  height: 14px;
  border-left: 2.5px solid currentColor;
  border-bottom: 2.5px solid currentColor;
  transform: rotate(-45deg);
  animation: scroll-prompt-bounce 1.8s ease-in-out infinite;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.45));
}
@keyframes scroll-prompt-bounce {
  0% {
    opacity: 0;
    transform: translateY(-4px) rotate(-45deg);
  }
  30% {
    opacity: 1;
    transform: translateY(-2px) rotate(-45deg);
  }
  70% {
    opacity: 1;
    transform: translateY(4px) rotate(-45deg);
  }
  100% {
    opacity: 0;
    transform: translateY(10px) rotate(-45deg);
  }
}
.skip-button {
  position: absolute;
  top: 4.8rem;
  right: 1.5rem;
  padding: 0.75rem 1.85rem;
  border-radius: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: linear-gradient(135deg, #ff7a4a 0%, #ffd166 100%);
  color: #0d1324;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  box-shadow: 0 16px 36px rgba(255, 107, 53, 0.55), 0 0 24px rgba(255, 209, 102, 0.35);
  z-index: 60;
}
.skip-button:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.9);
  outline-offset: 3px;
  box-shadow: 0 20px 44px rgba(255, 107, 53, 0.6), 0 0 28px rgba(255, 209, 102, 0.45);
}
.skip-button:hover,
.skip-button:focus-visible {
  transform: translateY(-3px);
  filter: brightness(1.08);
}
.skip-button:active {
  transform: translateY(0);
  filter: brightness(0.9);
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
