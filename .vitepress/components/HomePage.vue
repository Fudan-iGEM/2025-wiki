<template>
  <div ref="homepageRef" class="homepage">
    <!-- Scene 1: Title and Subtitle -->
    <div ref="scene1Ref" class="scene scene-1">
      <div class="lottie-wrapper" ref="lottie1WrapperRef">
        <Vue3Lottie
          ref="lottie1Ref"
          :animationLink="scene1.animationUrl"
          :height="'100%'"
          :width="'100%'"
          :loop="false"
          :autoplay="true"
          @onComplete="handleLottieComplete"
        />
      </div>
      <div class="title-wrapper" ref="titleWrapperRef">
        <img
          ref="titleImageRef"
          class="title-image"
          :src="scene1.titleSrc"
          alt="DR. sTraTeGY title"
        />
        <div ref="subtitleWrapperRef" class="subtitle">
          <TrueFocus
            :key="subtitleKey" 
            sentence="a Drug Resistance Mutation Tracking Technology based on Grape Yeast"
            :blurAmount="1"
            :animationDuration="0.8"
            :pauseBetweenAnimations="1.2"
          />
        </div>
      </div>
    </div>

    <!-- Scene 2: New Content -->
    <div ref="scene2Ref" class="scene scene-2">
      <div class="lottie-wrapper" ref="lottie2WrapperRef">
        <Vue3Lottie
          :animationLink="scene2.animationUrl"
          :height="'100%'"
          :width="'100%'"
          :loop="true"
          :autoplay="true"
        />
      </div>
      <div class="content-wrapper" ref="content2WrapperRef">
        <h2>A New Chapter</h2>
        <p>This is the content for the second scene, which appears on scroll.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TrueFocus from './TrueFocus.vue'

gsap.registerPlugin(ScrollTrigger)

// --- Scene Definitions ---
const scene1 = {
  animationUrl: 'https://static.igem.wiki/teams/5643/img/homepage/page1.json',
  titleSrc: 'https://static.igem.wiki/teams/5643/img/homepage/title.webp'
}
// TODO: Replace with your second scene's animation
const scene2 = {
  animationUrl: 'https://static.igem.wiki/teams/5643/img/homepage/page2.json' // Placeholder
}

// --- Template Refs ---
const homepageRef = ref(null)
const scene1Ref = ref(null)
const titleWrapperRef = ref(null)
const titleImageRef = ref(null)
const subtitleWrapperRef = ref(null)
const lottie1WrapperRef = ref(null)

const scene2Ref = ref(null)
const content2WrapperRef = ref(null)
const lottie2WrapperRef = ref(null)

const subtitleKey = ref(0)
let mainTimeline = null

// --- Animation Logic ---

onMounted(() => {
  // Immediately set initial states for all elements
  setupInitialStates()

  // Prevent scrolling until the initial animation is complete
  document.body.style.overflow = 'hidden'
  
  if (ScrollTrigger.isTouch) {
    // On touch devices, we'll just play the first scene animation and not enable scroll.
  }
})

const setupInitialStates = () => {
  gsap.set(homepageRef.value, { backgroundColor: '#FFFFFF' })
  gsap.set([scene1Ref.value, scene2Ref.value], { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' })
  gsap.set(scene2Ref.value, { autoAlpha: 0 })
  gsap.set(titleImageRef.value, { x: '-120%', autoAlpha: 0 })
  gsap.set(subtitleWrapperRef.value, { y: 24, autoAlpha: 0 })
  gsap.set(content2WrapperRef.value, { autoAlpha: 0, y: 50 })
  gsap.set(lottie2WrapperRef.value, { autoAlpha: 0 })
}

const handleLottieComplete = () => {
  // Force re-mount of TrueFocus component to restart its animation
  subtitleKey.value++

  const titleTimeline = gsap.timeline({
    onComplete: () => {
      if (!ScrollTrigger.isTouch) {
        setupScrollAnimation()
        document.body.style.overflow = '' // Re-enable scrolling
      }
    }
  })

  titleTimeline.to(titleImageRef.value, {
    x: 0,
    autoAlpha: 1,
    duration: 1.2,
    ease: 'bounce.out'
  })
  .to(subtitleWrapperRef.value, {
    y: 0,
    autoAlpha: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.4')
}

const setupScrollAnimation = () => {
  const elements = {
    homepage: homepageRef.value,
    scene1Elements: [titleWrapperRef.value, lottie1WrapperRef.value],
    scene2: scene2Ref.value,
    content2: content2WrapperRef.value,
    lottie2: lottie2WrapperRef.value,
  }

  mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: elements.homepage,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: '+=3000', // Adjust for scroll length
    }
  })

  mainTimeline
    .to({}, { duration: 0.2 })
    .to(elements.scene1Elements, {
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    })
    .to(elements.homepage, {
      backgroundColor: '#291c3d', // New background color for Scene 2
      duration: 1.2, // A bit longer for a smoother transition
      ease: 'power2.inOut'
    }, '<')
    .to(elements.scene2, { autoAlpha: 1, duration: 0.1 }, '-=0.8')
    .to(elements.lottie2, { autoAlpha: 1, duration: 0.8 })
    .to(elements.content2, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    .to({}, { duration: 1 })
}

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  if (mainTimeline) {
    mainTimeline.kill()
    mainTimeline = null
  }
  gsap.globalTimeline.clear()
  ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>

<style scoped>
.homepage {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.scene {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lottie-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lottie-wrapper :deep(.lottie-container) {
  width: 100% !important;
  height: 100% !important;
}

.lottie-wrapper :deep(.lottie-container svg) {
  max-width: 100% !important;
  max-height: 100% !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  margin: 0 auto !important;
}

.title-wrapper, .content-wrapper {
  position: relative;
  z-index: 2;
  pointer-events: none;
  text-align: center;
  color: #333;
}

.title-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.title-image {
  width: min(90vw, 720px);
  max-width: 100%;
  display: block;
}

.subtitle {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  pointer-events: auto;
}

/* Force transparent background on subtitle and its children */
.subtitle, .subtitle :deep(*) {
  background-color: transparent !important;
}

.content-wrapper h2 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.content-wrapper p {
  font-size: 1.5rem;
}

/* Set text color for Scene 2 to be visible on dark background */
.scene-2 .content-wrapper {
  color: #f0f0f0;
}

</style>
