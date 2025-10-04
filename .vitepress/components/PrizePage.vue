<template>
  <section class="prize-page">
    <div class="pill-row">
      <article
        v-for="(item, index) in palette"
        :key="item.name"
        class="pill-card"
        :style="{ color: item.textColor }"
        :ref="(el) => setCardRef(el, index)"
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
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue';

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

const cardRefs = ref([]);
let entranceTimeline = null;
let animatedCards = [];
let animatedShells = [];
let animatedMetaLines = [];

const setCardRef = (el, index) => {
  if (el) {
    cardRefs.value[index] = el;
  } else {
    cardRefs.value[index] = null;
  }
};

const cleanupInlineStyles = () => {
  animatedCards.forEach((card) => {
    card?.style.removeProperty('transform');
    card?.style.removeProperty('filter');
    card?.style.removeProperty('opacity');
  });

  animatedShells.forEach((shell) => {
    shell?.style.removeProperty('clip-path');
  });

  animatedMetaLines.forEach((line) => {
    line?.style.removeProperty('transform');
    line?.style.removeProperty('opacity');
  });
};

onMounted(async () => {
  await nextTick();
  const cards = cardRefs.value.filter(Boolean);
  if (!cards.length) {
    return;
  }

  const gsapModule = await import('gsap');
  const gsap = gsapModule.gsap || gsapModule.default;
  if (!gsap) {
    return;
  }

  entranceTimeline?.kill();

  const shellElements = cards
    .map((card) => card.querySelector('.pill'))
    .filter(Boolean);

  const metaLines = cards.reduce((acc, card) => {
    const lines = card.querySelectorAll('.pill-meta_line');
    if (lines.length) {
      acc.push(...Array.from(lines));
    }
    return acc;
  }, []);

  animatedCards = cards.slice();
  animatedShells = shellElements.slice();
  animatedMetaLines = metaLines.slice();

  gsap.set(animatedCards, {
    transformOrigin: 'center top',
    opacity: 0,
    y: 96,
    scale: 0.84,
    rotateX: 12,
    filter: 'blur(16px)',
  });

  if (animatedShells.length) {
    gsap.set(animatedShells, {
      clipPath: 'inset(28% 0 28% 0 round 999px)',
    });
  }

  if (animatedMetaLines.length) {
    gsap.set(animatedMetaLines, { opacity: 0, y: 16 });
  }

  entranceTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

  entranceTimeline.to(animatedCards, {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    duration: 1.05,
    stagger: { each: 0.18 },
  });

  if (animatedShells.length) {
    entranceTimeline.to(
      animatedShells,
      {
        clipPath: 'inset(0% 0 0% 0 round 999px)',
        duration: 1,
        stagger: { each: 0.18 },
      },
      '<'
    );
  }

  if (animatedMetaLines.length) {
    entranceTimeline.to(
      animatedMetaLines,
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: { each: 0.04 },
        ease: 'power2.out',
      },
      '-=0.55'
    );
  }

  entranceTimeline.eventCallback('onComplete', () => {
    cleanupInlineStyles();
  });
});

onBeforeUnmount(() => {
  entranceTimeline?.kill();
  cleanupInlineStyles();
  entranceTimeline = null;
  animatedCards = [];
  animatedShells = [];
  animatedMetaLines = [];
});
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
  perspective: 1400px;
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
  border-radius: 999px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 22px 40px rgba(17, 17, 17, 0.18);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
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
