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
      'The leather chairs in the hospital are always so dirty and hard, and they get really uncomfortable after a while. I have a small wish—could the patient rooms be on a different floor from the shopping areas? Whenever I go out to buy a snack by myself, I run into big crowds. It is so noisy, and people always stare... I just prefer things to be quieter.',
    name: 'Hun Dun',
    role: '15 years old patient with Epidermolysis bullosa',
    img: '',
  },
  {
    quote:
      "Placing nursing manuals and some green plants in the waiting areas, along with adding fear-reducing facilities in the children's section, would directly improve the patient waiting experience. And this dialogue activity genuinely helped me step outside my role as medical staff and better understand the patients' perspectives.",
    name: 'Ally',
    role: '30 years old Head nurse of the Emergency department',
    img: '',
  },
  {
    quote:
      "At school, I never dared to mention my fungal infection to classmates; I always felt so embarrassed. But here, discussing with people who have similar experiences made me feel understood. It finally gave me the courage to talk about my own condition.",
    name: 'Xiao Zhao',
    role: '19 years old scientific researcher, patient with fungal infection',
    img: '',
  },
  {
    quote:
      "I used to never ask questions when I saw how busy the doctors were — didn't want to bother them. But after talking this time, I get it now. I trust doctors more, and I feel better about science too.",
    name: 'Yan Guo',
    role: '19 years old photographer, patient with fungal infection',
    img: '',
  },
];
</script>

<style scoped>
.interview-section {
  padding: clamp(2.5rem, 4vw, 4rem) 0;
}
</style>
