<template>
  <section class="interview-section">
    <TestimonialSlider :testimonials="testimonials" :duration="8" />
  </section>
</template>

<script setup lang="ts">
import TestimonialSlider from './TestimonialSlider.vue';

const testimonials = [
  {
    quote:
      'The lighting in the entire hospital was so bright—not just bright, but really harsh. And there was just nothing you could do. I remember thinking: how are the patients in these beds supposed to sleep peacefully in an environment so noisy and glaring?',
    name: 'Xiao Hui',
    role: '28 years old',
    img: '',
  },
  {
    quote:
      "Kids have a very weak sense of time. So any waiting period feels incredibly long and drawn-out to them. They just keep asking, 'Are we done yet? Now? How about now?' non-stop.",
    name: 'Miss Ni',
    role: '31 years old',
    img: '',
  },
  {
    quote:
      "After waiting in line for what felt like ages, we got to the appointment kiosk only to find out that first-time patients can't even use it to check in! So then we had to scurry over to the service counter across the way and line up all over again for another endless wait.",
    name: 'Lao Xiao',
    role: '65 years old',
    img: '',
  },
];
</script>

<style scoped>
.interview-section {
  padding: clamp(2.5rem, 4vw, 4rem) 0;
}
</style>
