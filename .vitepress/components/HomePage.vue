<template>
  <div class="home-page">
    <h1>Welcome to Our Wiki</h1>
    <!-- Add your home page content here -->
    <ShinyText 
    text="Just some shiny text!" 
    :disabled="false" 
    :speed="8" 
    class-name="your-custom-class"
  />
  </div>
</template>

<script setup>
import ShinyText from './ShinyText.vue';
</script>

<style scoped>
/* Component styles go here */
.home-page {
  padding: 2rem;
}
</style>
