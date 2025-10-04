<template>
  <section class="prize-page">
    <div class="pill-row">
      <article
        v-for="item in palette"
        :key="item.name"
        class="pill-card"
        :style="{ color: item.textColor }"
      >
        <div class="pill" :style="{ backgroundColor: item.color }">
          <header class="pill-title">{{ item.name }}</header>
          <footer class="pill-meta">
            <span class="pill-meta_line">{{ item.pantone }}</span>
            <span class="pill-meta_line">{{ item.hex }}</span>
            <span class="pill-meta_line">{{ item.cmyk }}</span>
          </footer>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
const palette = [
  {
    name: 'White',
    color: '#f4f0f0',
    textColor: '#111111',
    pantone: 'PANTONE 489 C',
    hex: 'HEX F4F0F0',
    cmyk: 'CMYK 05 06 08 00',
  },
  {
    name: 'Black',
    color: '#080808',
    textColor: '#f7f7f7',
    pantone: 'PANTONE 419 C',
    hex: 'HEX 080808',
    cmyk: 'CMYK 75 68 67 90',
  },
  {
    name: 'Poppy',
    color: '#cc2f3b',
    textColor: '#f7f7f7',
    pantone: 'PANTONE 1855 C',
    hex: 'HEX CC2F3B',
    cmyk: 'CMYK 00 92 81 05',
  },
  {
    name: 'Sand',
    color: '#b9aba0',
    textColor: '#141414',
    pantone: 'PANTONE 7520 C',
    hex: 'HEX B9ABA0',
    cmyk: 'CMYK 20 24 32 00',
  },
];
</script>

<style scoped>
.prize-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
}

.pill-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  gap: clamp(1rem, 3vw, 2.5rem);
  width: min(1100px, 100%);
  justify-items: center;
}

.pill-card {
  width: 100%;
  display: flex;
  justify-content: center;
}

.pill {
  width: clamp(220px, 19vw, 240px);
  min-height: clamp(360px, 60vh, 520px);
  padding: clamp(2.5rem, 5vw, 4.5rem) clamp(2rem, 4vw, 3rem) clamp(2rem, 4vw, 3rem);
  border-radius: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-shadow: 0 30px 60px rgba(15, 13, 13, 0.15);
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.pill::after {
  content: '';
  position: absolute;
  top: 12%;
  right: 18%;
  width: 50%;
  height: 22%;
  background: rgba(255, 255, 255, 0.22);
  filter: blur(28px);
  transform: rotate(-18deg);
}

.pill:hover {
  transform: translateY(-12px);
  box-shadow: 0 40px 70px rgba(15, 13, 13, 0.2);
}

.pill-title {
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.pill-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.85;
  align-self: flex-start;
}

.pill-meta_line {
  display: block;
}

@media (max-width: 1100px) {
  .pill-row {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
}

@media (max-width: 720px) {
  .prize-page {
    padding: 4rem 1.5rem;
  }

  .pill {
    min-height: 380px;
  }
}

@media (max-width: 520px) {
  .pill-row {
    grid-template-columns: minmax(220px, 1fr);
  }

  .pill {
    width: min(240px, 100%);
    min-height: 360px;
  }
}
</style>
