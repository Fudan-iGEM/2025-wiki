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
  dog1: 'https://static.igem.wiki/teams/5643/img/homepage/dog1.json', 
  dog2: 'https://static.igem.wiki/teams/5643/img/homepage/dog2.json', 
  dog3: 'https://static.igem.wiki/teams/5643/img/homepage/dog3.json',
  dog4: 'https://static.igem.wiki/teams/5643/img/homepage/dog4.json',
  dog5: 'https://static.igem.wiki/teams/5643/img/homepage/dog5.json',
  dog6: 'https://static.igem.wiki/teams/5643/img/homepage/dog6.json',
  dog7: 'https://static.igem.wiki/teams/5643/img/homepage/dog7.json'
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

const dialogs = ref([
  { id: 0, text: 'It’s the year of 2333, a formidable Crisis has swept over the world—antimicrobial resistance.', isInput: false },
  { id: 1, text: 'Invasive fungal infections affecting billions of people worldwide are getting fatal while effective drugs are severely shrinking. ', isInput: false },
  { id: 2, text: 'Why is all this happening? How could I help?', isInput: true }
])

const scene5Items = ref([
  { id: 1, order: 'lottie-first', lottieUrl: scene5Lotties.item1, title: 'High-throughput Platform', description: 'A high-throughput platform for screening drug-resistant gene mutations.' },
  { id: 2, order: 'text-first', lottieUrl: scene5Lotties.item2, title: 'Engineered Grape Yeast', description: 'Utilizing engineered grape yeast as a versatile and efficient chassis.' },
  { id: 3, order: 'lottie-first', lottieUrl: scene5Lotties.item3, title: 'AI-Powered Analysis', description: 'An integrated AI model for analyzing mutation data and predicting resistance.' }
])

const scene6Items = ref([
    { id: 1, lottieUrl: scene6Lotties.item1, title: 'Description', description: 'Our project aims to address the growing threat of antimicrobial resistance.' },
    { id: 2, lottieUrl: scene6Lotties.item2, title: 'Design', description: 'We designed a novel genetic circuit in grape yeast for high-throughput screening.' },
    { id: 3, lottieUrl: scene6Lotties.item3, title: 'Engineering', description: 'Successful engineering cycles led to a robust and reliable biosensor.' },
    { id: 4, lottieUrl: scene6Lotties.item4, title: 'Results', description: 'Our platform demonstrates high sensitivity and specificity in detecting mutations.' },
]);

const scene8Cards = ref([
  { id: 1, svgUrl: 'https://static.igem.wiki/teams/5643/img/homepage/forpage1.svg', color: '#000000', link: '/pages/description', alt: 'Description' },
  { id: 2, svgUrl: 'https://static.igem.wiki/teams/5643/img/homepage/forpage2.svg', color: '#4ECDC4', link: '/pages/design', alt: 'Design' },
  { id: 3, svgUrl: 'https://static.igem.wiki/teams/5643/img/homepage/forpage3.svg', color: '#FF6B35', link: '/pages/engineering', alt: 'Engineering' },
  { id: 4, svgUrl: 'https://static.igem.wiki/teams/5643/img/homepage/forpage4.svg', color: '#1E3A8A', link: '/pages/results', alt: 'Results' }
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

const dialogBoxRefs = reactive({})
const isSendEnabled = ref(false)
const isSendActive = ref(false)
const hasSendTriggered = ref(false)

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

// --- Composables ---
const { triggerDoctorReplies } = useScene3()

// 监听场景4的动画URL，当切换为dog3（球已放置）即解锁滚动
watch(scene4AnimationUrl, (url) => {
  if (url === scene4Lotties.dog3) {
    scene4BallPlaced.value = true
  }
})

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
  
  // 标记第三幕动画完成 - 在第二段回复完成后
  gsap.delayedCall(6.0, () => {
    scene3AnimationComplete.value = true
  })

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
  isSendEnabled.value = false
  isSendActive.value = false
  hasSendTriggered.value = false
  scene2Loop.value = false
  scene4BallPlaced.value = false
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
       // 在第三幕未完成或圆球未放置前，强制将滚动位置钳制在“scene5Start”标签之前
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
            }
          }
        }
      }
    } 
  })
  
  mainTimeline
    .to({}, { duration: 1.0 }) // Pause after title is shown
    .set(glitchOverlayRef.value, { className: 'glitch-overlay active' })
    .to([scene1.titleWrapperRef, scene1.lottie1WrapperRef], { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut' })
    .to(homepageRef.value, { backgroundColor: '#3a1667', duration: 1.2, ease: 'power2.inOut' }, '<')
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
    .to(homepageRef.value, { backgroundColor: '#1a2a45', duration: 1 }, '<')
    .to(scene5.scene5Ref, { autoAlpha: 1, duration: 1 }, '>-0.5')
    .from(scene5.columnWrapperRef.children, { autoAlpha: 0, x: 100, stagger: 0.2, duration: 0.8 }, '>-0.5')
    .call(() => {
      scene4AnimationUrl.value = scene4Lotties.dog4;
      scene4Loop.value = true;
      scene4Autoplay.value = true;
    }, [], '>')
    .to({}, { duration: 5 }) // Duration for scene 5
    .addLabel('scene6Start')
    .to(scene5.scene5Ref, { x: '-100%', autoAlpha: 0, duration: 1 })
    // 复位并显现 lottie 容器，避免之前的left-slide的 transform 残留导致不可见
    .to(scene4.dropTargetRef, { x: 0, autoAlpha: 1, left: '1rem', right: 'auto', duration: 1, ease: 'power2.out' }, '<')
    .call(() => {
      scene4AnimationUrl.value = scene4Lotties.dog5;
      scene4Loop.value = true;
    }, [], '<')
    .to(scene6.scene6Ref, { autoAlpha: 1, duration: 1 }, '<')
    .to({}, { duration: 5 }) // Duration for scene 6
    .addLabel('scene7Start')
    .to(scene6.scene6Ref, { autoAlpha: 0, duration: 0.5 })
    .to(homepageRef.value, { backgroundColor: '#FFFFFF', duration: 1 }, '<')
    .call(() => { 
      scene4AnimationUrl.value = scene4Lotties.dog6;
      scene4Loop.value = true;
    }, [], '<')
    .to(scene4.dropTargetRef, { 
      left: '50%', 
      top: '65%', 
      xPercent: -50, 
      yPercent: -50, 
      duration: 1.5, 
      ease: 'power2.inOut',
      onComplete: () => {
        scene4AnimationUrl.value = scene4Lotties.dog7;
        scene4Loop.value = true;
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
