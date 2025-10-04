<template>
  <div class="testimonial-slider">
    <div class="slider-figure">
      <div class="slider-glow">
        <div class="slider-image-mask">
          <transition-group name="testimonial-image">
            <div
              v-for="(testimonial, index) in testimonials"
              v-show="active === index"
              :key="`image-${index}`"
              class="slider-image-wrapper"
            >
              <img
                v-if="testimonial.img"
                class="slider-image"
                :src="testimonial.img"
                :alt="testimonial.name"
                width="60"
                height="60"
                loading="lazy"
              />
              <div v-else class="slider-image slider-image--fallback" aria-hidden="true">
                {{ getInitials(testimonial.name) }}
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>

    <div class="slider-quote">
      <div ref="testimonialsRef" class="slider-quote-inner">
        <transition-group name="testimonial-text">
          <div
            v-for="(testimonial, index) in testimonials"
            v-show="active === index"
            :key="`text-${index}`"
            class="slider-quote-card"
          >
            <div class="slider-quote-text">
              {{ testimonial.quote }}
            </div>
          </div>
        </transition-group>
      </div>
    </div>

    <div class="slider-controls">
      <button
        class="control-button control-button--prev"
        type="button"
        aria-label="Previous testimonial"
        @click="handlePrev"
      >
        <svg class="control-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="slider-author">
        <span class="slider-author__name">{{ testimonials.at(active)?.name }}</span>
        <span class="slider-author__role">{{ testimonials.at(active)?.role }}</span>
      </div>

      <button
        class="control-button control-button--next"
        type="button"
        aria-label="Next testimonial"
        @click="handleNext"
      >
        <svg class="control-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

interface Testimonial {
  img: string;
  quote: string;
  name: string;
  role: string;
}

const props = withDefaults(
  defineProps<{
    testimonials?: Testimonial[];
    autoRotate?: boolean;
    duration?: number;
  }>(),
  {
    autoRotate: true,
    duration: 5,
    testimonials: () => [],
  },
);

const active = ref<number>(0);
const autorotate = ref(props.autoRotate);
const testimonialsRef = ref<HTMLElement | null>(null);
let intervalId: number | null = null;

function getInitials(name = ''): string {
  if (!name) {
    return '—';
  }
  const letters = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('');
  return letters.slice(0, 2).toUpperCase();
}

function heightFix() {
  if (testimonialsRef.value && testimonialsRef.value.parentElement) {
    testimonialsRef.value.parentElement.style.height = `${testimonialsRef.value.clientHeight}px`;
  }
}

function setActiveIndex(index: number) {
  active.value = index;
  autorotate.value = false;
  resetAutorotate();
}

function startAutorotate() {
  intervalId = window.setInterval(() => {
    active.value = active.value + 1 === props.testimonials.length ? 0 : active.value + 1;
    heightFix();
  }, props.duration * 1000);
}

function resetAutorotate() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (autorotate.value) {
    startAutorotate();
  }
}

function handleNext() {
  setActiveIndex((active.value + 1) % props.testimonials.length);
}

function handlePrev() {
  setActiveIndex((active.value - 1 + props.testimonials.length) % props.testimonials.length);
}

onMounted(() => {
  heightFix();
  if (autorotate.value) {
    startAutorotate();
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style>
.testimonial-slider {
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.5rem;
}

.slider-figure {
  position: relative;
  width: 100%;
  height: 8rem;
  margin-bottom: 2rem;
}

.slider-glow {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: clamp(280px, 60vw, 480px);
  height: clamp(280px, 60vw, 480px);
  pointer-events: none;
}

.slider-glow::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(99, 113, 126, 0.25) 0%, rgba(99, 113, 126, 0.05) 50%, rgba(99, 113, 126, 0) 80%);
  z-index: -1;
}

.slider-image-mask {
  height: 8rem;
  position: relative;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(0deg, transparent, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1));
  mask-image: linear-gradient(0deg, transparent, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1));
}

.slider-image-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-image {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.22);
}

.slider-image--fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #008794, #55c2bb);
  color: #f8fafc;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.slider-quote {
  width: 100%;
  margin-bottom: 2rem;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 300ms;
}

.slider-quote-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slider-quote-card {
  width: 100%;
}

.slider-quote-text {
  font-size: clamp(1.4rem, 1.6vw + 1rem, 1.75rem);
  font-weight: 600;
  color: #151e29;
  line-height: 1.55;
  position: relative;
  display: inline-block;
  padding: 0 0.5rem;
}

.slider-quote-text::before,
.slider-quote-text::after {
  position: relative;
  font-family: inherit;
  color: #0090a0;
}

.slider-quote-text::before {
  content: "\201C";
  margin-right: 0.25em;
}

.slider-quote-text::after {
  content: "\201D";
  margin-left: 0.25em;
}

.slider-controls {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 3rem;
}

.control-button {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: #eef2f6;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #111827;
  transition: transform 0.3s ease, background 0.3s ease;
}

.control-button:hover {
  transform: translateY(-2px);
  background: #d9e7ea;
}

.control-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.control-button--prev:hover .control-icon {
  transform: rotate(12deg);
}

.control-button--next:hover .control-icon {
  transform: rotate(-12deg);
}

.slider-author {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.slider-author__name {
  font-size: 0.95rem;
  font-style: italic;
  color: #0f2432;
  font-weight: 600;
}

.slider-author__role {
  font-size: 0.8125rem;
  font-style: italic;
  color: #536473;
}

@media (max-width: 768px) {
  .slider-controls {
    padding-top: 2rem;
  }

  .testimonial-slider {
    padding: 0 1rem;
  }

  .slider-quote-text {
    font-size: clamp(1.25rem, 4vw, 1.5rem);
  }
}

/* Testimonial image transitions */
.testimonial-image-enter-active {
  transition: all 700ms cubic-bezier(0.68, -0.3, 0.32, 1);
}
.testimonial-image-leave-active {
  transition: all 700ms cubic-bezier(0.68, -0.3, 0.32, 1);
}
.testimonial-image-enter-from {
  opacity: 0;
  transform: rotate(-60deg);
}
.testimonial-image-enter-to {
  opacity: 1;
  transform: rotate(0deg);
}
.testimonial-image-leave-from {
  opacity: 1;
  transform: rotate(0deg);
}
.testimonial-image-leave-to {
  opacity: 0;
  transform: rotate(60deg);
}

/* Testimonial text transitions */
.testimonial-text-enter-active {
  transition: all 500ms ease-in-out 200ms;
}
.testimonial-text-leave-active {
  transition: all 300ms ease-out 300ms;
  position: absolute;
}
.testimonial-text-enter-from {
  opacity: 0;
  transform: translateX(-1rem);
}
.testimonial-text-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.testimonial-text-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.testimonial-text-leave-to {
  opacity: 0;
  transform: translateX(1rem);
}
</style>
