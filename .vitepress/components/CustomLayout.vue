<script setup lang="ts">
import { useRoute } from "vitepress";
import { computed, watch, onMounted, nextTick, ref, onUnmounted } from "vue";
import { useData } from "vitepress/dist/client/theme-default/composables/data.js";

import TitleInfo from "./TitleInfo.vue";
import CustomTOC from "./CustomTOC.vue";

const { theme, frontmatter } = useData();

const route = useRoute();
const hasAside = computed(() => {
  return !route.path.includes('/team') &&
         !route.path.includes('/attributions') &&
         !route.path.includes('/heritage') &&
         !route.path.includes('/communication') &&
         !route.path.includes('/hardware') &&
         !route.path.includes('/parts') &&
         !route.path.includes('/plant') &&
         !route.path.includes('/presentation-video') &&
         !route.path.includes('/proof-of-concept') ;
});
const leftAside = computed(() => true); 

const isMobile = ref(false);
let resizeTimer: number | null = null;

const showDesktopTOC = computed(() => hasAside.value && !isMobile.value);
const showMobileTOC = computed(() => hasAside.value && isMobile.value);

const pageName = computed(() => route.path.replace(/[./]+/g, "_").replace(/_html$/, ""));
const heroImage = computed(() => frontmatter.value.heroImage || "/default-hero.jpg");

// 需要排除动态组件的选择器
const skipProcessingSelector = '[data-skip-content-processing]';
const commonLatinPatterns = /^(Escherichia coli|Bacillus subtilis|Saccharomyces cerevisiae|Arabidopsis thaliana|Drosophila melanogaster|Caenorhabditis elegans|Mus musculus|Homo sapiens|Rattus norvegicus|Danio rerio|Xenopus laevis|Gallus gallus|Bos taurus|Sus scrofa|Ovis aries|Capra hircus|Equus caballus|Canis familiaris|Felis catus|Macaca mulatta|Pan troglodytes|Gorilla gorilla|Pongo pygmaeus|Chlorella vulgaris|Spirulina platensis|Pseudomonas aeruginosa|Staphylococcus aureus|Streptococcus pyogenes|Mycobacterium tuberculosis|Salmonella enterica|Vibrio cholerae|Clostridium botulinum|Listeria monocytogenes|Campylobacter jejuni|Helicobacter pylori|Neisseria gonorrhoeae|Treponema pallidum|Borrelia burgdorferi|Plasmodium falciparum|Trypanosoma brucei|Leishmania major|Toxoplasma gondii|Candida albicans|Aspergillus niger|Penicillium chrysogenum|Neurospora crassa|Schizosaccharomyces pombe|Pichia pastoris|Kluyveromyces lactis|Yarrowia lipolytica|Trichoderma reesei|Fusarium graminearum|Magnaporthe oryzae|Ustilago maydis|Cryptococcus neoformans|Pneumocystis jirovecii)$/i;

type PatternHandler = (match: string, ...groups: string[]) => string;

// 内容处理函数
const processContent = () => {
  nextTick(() => {
    const contentElement = document.querySelector('.vp-doc');
    if (!contentElement || contentElement.hasAttribute('data-processed')) return;

    const skipTags = new Set(['A', 'CODE', 'PRE', 'SCRIPT', 'STYLE']);

    const patterns: { regex: RegExp; handler: PatternHandler }[] = [
      {
        regex: /BBa_25[A-Za-z0-9]+/g,
        handler: (match: string) => {
          const lowercaseMatch = match.toLowerCase().replace('_', '-');
          return `<a href="https://registry.igem.org/parts/${lowercaseMatch}" target="_blank" rel="noopener noreferrer">${match}</a>`;
        }
      },
      {
        regex: /BBa_K[0-9]+/g,
        handler: (match: string) => {
          return `<a href="https://parts.igem.org/Part:${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
        }
      },
      {
        regex: /(?:doi:|DOI:)?\s*(10\.\d+\/[^\s<]+)/g,
        handler: (_match: string, doi: string) => {
          return `<a href="https://doi.org/${doi}" target="_blank" rel="noopener noreferrer">DOI: ${doi}</a>`;
        }
      },
      {
        regex: /PMID:\s*(\d+)/g,
        handler: (_match: string, pmid: string) => {
          return `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" target="_blank" rel="noopener noreferrer">PMID: ${pmid}</a>`;
        }
      },
      {
        regex: /\b([A-Z][a-z]+ [a-z]+)\b/g,
        handler: (match: string, name: string) => {
          if (commonLatinPatterns.test(name)) {
            return `<em>${match}</em>`;
          }
          return match;
        }
      }
    ];

    try {
      const walker = document.createTreeWalker(
        contentElement,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            if (!node?.textContent || !node.textContent.trim()) {
              return NodeFilter.FILTER_REJECT;
            }

            const parentElement = node.parentElement;
            if (!parentElement) {
              return NodeFilter.FILTER_REJECT;
            }

            if (parentElement.closest(skipProcessingSelector)) {
              return NodeFilter.FILTER_REJECT;
            }

            let ancestor: HTMLElement | null = parentElement;
            while (ancestor && ancestor !== contentElement) {
              if (skipTags.has(ancestor.tagName) || ancestor.classList.contains('vp-code')) {
                return NodeFilter.FILTER_REJECT;
              }
              ancestor = ancestor.parentElement;
            }

            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      const textNodes: Text[] = [];
      while (walker.nextNode()) {
        const current = walker.currentNode;
        if (current && current.nodeType === Node.TEXT_NODE) {
          textNodes.push(current as Text);
        }
      }

      textNodes.forEach((textNode) => {
        const originalText = textNode.nodeValue;
        if (!originalText) return;

        let transformedText = originalText;
        let hasChanged = false;

        patterns.forEach(({ regex, handler }) => {
          transformedText = transformedText.replace(regex, (...args) => {
            const match = args[0] as string;
            const lastArg = args[args.length - 1];
            const hasGroupsObject = typeof lastArg === 'object' && lastArg !== null;
            const captures = hasGroupsObject
              ? (args.slice(1, -3) as string[])
              : (args.slice(1, -2) as string[]);
            const result = handler(match, ...captures);
            if (result !== match) {
              hasChanged = true;
            }
            return result;
          });
        });

        if (hasChanged && textNode.parentNode) {
          const temp = document.createElement('span');
          temp.innerHTML = transformedText;
          const fragment = document.createDocumentFragment();
          while (temp.firstChild) {
            fragment.appendChild(temp.firstChild);
          }
          textNode.parentNode.replaceChild(fragment, textNode);
        }
      });
    } catch (error) {
      console.warn('Content processing error:', error);
    }

    contentElement.setAttribute('data-processed', 'true');
  });
};

// 监听路由变化和内容更新
onMounted(() => {
  updateViewportState();
  window.addEventListener('resize', handleResize);

  // 延迟执行，确保内容已完全渲染
  setTimeout(() => {
    processContent();
  }, 100);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (resizeTimer) {
    window.clearTimeout(resizeTimer);
    resizeTimer = null;
  }
});

// 路由切换后强制重新处理内容
watch(
  () => route.path,
  () => {
    // 移除旧的处理标记，避免阻止新页面处理
    const contentElement = document.querySelector('.vp-doc');
    if (contentElement) {
      contentElement.removeAttribute('data-processed');
    }
    // 等待新内容挂载后再处理
    setTimeout(() => {
      processContent();
    }, 100);
  }
);

function updateViewportState() {
  isMobile.value = window.matchMedia('(max-width: 900px)').matches;
}

function handleResize() {
  if (resizeTimer) {
    window.clearTimeout(resizeTimer);
  }
  resizeTimer = window.setTimeout(() => {
    updateViewportState();
  }, 200);
}
</script>

<template>
  <div class="VPDoc" :class="{ 'has-aside': hasAside }">
    <slot name="doc-top" />

    <!-- Hero Section with floating title effect -->
    <div class="hero-container">
      <!-- Image section with overlay and shapes -->
      <div class="hero-image-section" :style="{ backgroundImage: `url(${heroImage})` }">
        <div class="hero-overlay"></div>
        <div class="hero-shapes">
          <svg class="hero-svg-mask" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 517.35 460">
            <ellipse class="svg-shape" cx="363.88" cy="286.44" rx="44.9" ry="40.44"/>
            <ellipse class="svg-shape" cx="300.29" cy="190.5" rx="34.5" ry="40.5" transform="translate(38.91 431.63) rotate(-75.08)"/>
            <ellipse class="svg-shape" cx="233.29" cy="149.5" rx="29.5" ry="39.5" transform="translate(-42.45 176.73) rotate(-38.29)"/>
            <ellipse class="svg-shape" cx="172.15" cy="98.3" rx="30" ry="41.93" transform="translate(-2.08 192.85) rotate(-58.21)"/>
            <ellipse class="svg-shape" cx="291.29" cy="128" rx="26.5" ry="35"/>
            <circle class="svg-shape" cx="241.29" cy="207.5" r="29.5"/>
            <ellipse class="svg-shape" cx="306.79" cy="248" rx="31" ry="26" transform="translate(-79.7 168.95) rotate(-27.39)"/>
            <ellipse class="svg-shape" cx="261.29" cy="266" rx="19.5" ry="16" transform="translate(-97.99 166.28) rotate(-30)"/>
            <ellipse class="svg-shape" cx="437.52" cy="272.58" rx="32.5" ry="28" transform="translate(-76.39 312.88) rotate(-36.41)"/>
            <ellipse class="svg-shape" cx="355.61" cy="361.72" rx="43.98" ry="30.61" transform="translate(-94.3 595.98) rotate(-72.99)"/>
            <ellipse class="svg-shape" cx="330.8" cy="426.31" rx="34.67" ry="31.53" transform="translate(-208.07 454.42) rotate(-55.18)"/>
            <ellipse class="svg-shape" cx="378.66" cy="416.76" rx="22.78" ry="25" transform="translate(-169.87 289.52) rotate(-34.68)"/>
            <ellipse class="svg-shape" cx="171.79" cy="156" rx="31" ry="27" transform="translate(-54.98 106.79) rotate(-30)"/>
            <ellipse class="svg-shape" cx="225.29" cy="84.5" rx="35.5" ry="21.5" transform="translate(92.88 285.41) rotate(-77.17)"/>
            <ellipse class="svg-shape" cx="232.79" cy="26.5" rx="24" ry="26.5"/>
            <ellipse class="svg-shape" cx="290.79" cy="67" rx="25" ry="28"/>
            <ellipse class="svg-shape" cx="142.57" cy="41.29" rx="24.11" ry="34" transform="translate(-5.83 44.26) rotate(-17.3)"/>
            <ellipse class="svg-shape" cx="30.38" cy="142.39" rx="39" ry="25.5" transform="translate(-104.61 87.85) rotate(-55.96)"/>
            <ellipse class="svg-shape" cx="81.14" cy="111.39" rx="24" ry="22" transform="translate(-51.8 75.09) rotate(-38.66)"/>
            <ellipse class="svg-shape" cx="44.99" cy="94.21" rx="21.5" ry="20" transform="translate(-48.99 48.74) rotate(-38.66)"/>
            <ellipse class="svg-shape" cx="114.79" cy="79.5" rx="30" ry="20.5"/>
            <ellipse class="svg-shape" cx="331.79" cy="149" rx="22" ry="20" transform="translate(-31.35 169.35) rotate(-27.39)"/>
            <ellipse class="svg-shape" cx="345.79" cy="121.5" rx="19.5" ry="14" transform="translate(60.37 351.43) rotate(-58.21)"/>
            <ellipse class="svg-shape" cx="356.79" cy="193" rx="31" ry="23" transform="translate(-36.65 94.22) rotate(-14.32)"/>
            <circle class="svg-shape" cx="398.46" cy="168.83" r="19"/>
            <ellipse class="svg-shape" cx="411.61" cy="138.31" rx="18.5" ry="31.5" transform="translate(-7.51 24.78) rotate(-3.42)"/>
            <ellipse class="svg-shape" cx="480.73" cy="258.18" rx="31" ry="20.5" transform="translate(-57.07 165.84) rotate(-18.5)"/>
            <ellipse class="svg-shape" cx="503.26" cy="224.41" rx="14.05" ry="14.16" transform="translate(-44.78 281.7) rotate(-30)"/>
            <ellipse class="svg-shape" cx="423.13" cy="182.15" rx="15" ry="11.5" transform="translate(-10.11 25.55) rotate(-3.42)"/>
          </svg>
        </div>
      </div>

      <!-- Content section with TitleInfo component that will handle the title -->
      <div class="hero-content-section">
        <TitleInfo />
      </div>
    </div>

    <div class="container">
      <!-- TOC Bar (left sidebar) with improved styling -->
      <div v-if="showDesktopTOC" class="aside" :class="{ 'left-aside': leftAside }">
        <div class="aside-curtain" />
        <div class="aside-container">
          <div class="aside-content">
            <div class="toc-title">
              <span class="toc-icon">📑</span>
              <span>Contents</span>
            </div>
            <CustomTOC />
          </div>
        </div>
      </div>

      <!-- Main Content with improved styling -->
      <div class="content">
        <div class="content-container">
          <slot name="doc-before" />
          <main class="main">
            <!-- Content Sections container -->
            <div class="content-sections">
              <!-- Content will be rendered from markdown files -->
            </div>

            <Content
              class="vp-doc"
              :key="route.path"
              :class="[pageName, theme.externalLinkIcon && 'external-link-icon-enabled']"
            />
          </main>
          <slot name="doc-after" />
        </div>
      </div>
    </div>

    <!-- Bottom spacing for better page ending -->
    <div class="page-bottom-spacing"></div>

    <slot name="doc-bottom" />
    <CustomTOC v-if="showMobileTOC" />
  </div>
</template>

<style scoped>
/* Hide the built-in doc header so the hero handles title/description rendering */
:deep(.doc-header),
:deep(.vp-doc > .doc > header:first-child) {
  display: none;
}

/* --- Flexbox Layout --- */
.VPDoc {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
  font-family: 'Outfit', sans-serif;
  position: relative;
}

/* Add subtle background pattern */
.VPDoc::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(0, 152, 161, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(0, 188, 212, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(85, 194, 187, 0.03) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* Bottom spacing for better page ending */
.page-bottom-spacing {
  height: 3rem;
  background: linear-gradient(to bottom, transparent 0%, rgba(223, 246, 246, 0.3) 100%);
  margin-top: 2rem;
}

/* Hero section structure - 全屏高度 */
.hero-container {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: white;
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

/* Image section - 占更大比例 */
.hero-image-section {
  height: 55vh;
  min-height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

/* Overlay for the image */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 152, 161, 0.2) 0%,
    rgba(0, 188, 212, 0.6) 50%,
    rgba(85, 194, 187, 0.8) 100%
  );
  z-index: 1;
  backdrop-filter: blur(2px);
}

/* Hero shapes styling - SVG mask overlay */
.hero-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}

.hero-svg-mask {
  position: absolute;
  bottom: 0;
  right: -10%;
  width: 60%;
  height: 60%;
  opacity: 0.6;
  animation: gentle-float 8s ease-in-out infinite;
  filter: blur(0.5px);
  transition: all 0.3s ease;
}

.hero-svg-mask:hover {
  opacity: 0.8;
  filter: blur(0px);
}

.svg-shape {
  fill: rgba(255, 255, 255, 0.3);
}

/* Enhanced animations for SVG mask */
@keyframes gentle-float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) scale(1.02);
    opacity: 0.8;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-15px) rotate(2deg);
  }
}

/* Content section positioned to connect with image - 填满剩余空间 */
.hero-content-section {
  position: relative;
  z-index: 10;
  margin-top: 0;
  background-color: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Set up positioning context for TitleInfo */
.hero-container > :deep(.title-info) {
  position: relative;
  margin-top: -80px; /* Pull up to overlap with image more */
  width: 100%;
}

.container {
  display: flex;
  flex-grow: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  padding: 0 1rem;
}

/* Enhanced TOC Bar / Sidebar with modern tech style - 更窄更高 */
.aside {
  flex-shrink: 0;
  width: 220px; /* 从280px缩小到220px */
  background: linear-gradient(135deg, #ffffff 0%, #f8fafb 100%);
  height: calc(100vh - 120px); /* 增加高度 */
  max-height: 800px; /* 设置最大高度 */
  overflow-y: auto;
  position: sticky;
  top: 90px; /* 调整顶部距离 */
  align-self: flex-start;
  border: 1px solid rgba(0, 152, 161, 0.1);
  border-radius: 16px;
  margin-right: 2rem; /* 从2.5rem减少到2rem */
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 188, 212, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95);
}

.aside:hover {
  box-shadow: 
    0 8px 30px rgba(0, 152, 161, 0.15),
    0 0 0 1px rgba(0, 188, 212, 0.1);
  transform: translateY(-2px);
}

.aside::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #008794, #0e9f99, #5dcac6);
  border-radius: 16px 16px 0 0;
}

.toc-title {
  font-weight: 700;
  padding: 1rem 1rem 1rem 1.25rem; 
  margin: -0.75rem -0.75rem 0 -0.75rem;
  text-align: left;
  border-bottom: 1px solid rgba(0, 152, 161, 0.1);
  color: #0098a1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(135deg, rgba(0, 188, 212, 0.05) 0%, transparent 100%);
  font-size: 1rem; /* 稍微减小字体 */
  letter-spacing: 0.3px;
}

.toc-icon {
  margin-right: 0.5rem; /* 减少间距 */
  font-size: 1.2rem; /* 减小图标 */
  background: linear-gradient(135deg, #00bcd4, #55c2bb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.aside-content {
  padding: 0.75rem; /* 减少内边距以适配更窄的宽度 */
}

/* Enhance Main Content with modern design */
.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
  background: linear-gradient(to bottom, #ffffff 0%, #fafbfc 100%);
  overflow-y: auto;
  border-radius: 20px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(0, 152, 161, 0.05);
  position: relative;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.98);
}

.content::before {
  content: "";
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #008794, transparent);
  border-radius: 2px;
}

.content-container {
  padding: 3rem 2.5rem;
  position: relative;
}

/* Enhanced Solution cards with futuristic design */
.solution-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 0 0 4rem 0;
}

.solution-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafb 100%);
  border: 1px solid rgba(0, 188, 212, 0.1);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.06),
    inset 0 0 20px rgba(0, 188, 212, 0.02);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.solution-card::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #008794, #5dcac6, #0e9f99, #b2eeeb);
  border-radius: 20px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.4s ease;
}

.solution-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 20% 50%,
    rgba(0, 188, 212, 0.1) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.solution-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 152, 161, 0.15),
    inset 0 0 30px rgba(0, 188, 212, 0.05);
  border-color: rgba(0, 188, 212, 0.3);
}

.solution-card:hover::before {
  opacity: 0.1;
}

.solution-card:hover::after {
  opacity: 1;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #00bcd4, #55c2bb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgba(0, 188, 212, 0.2));
}

.card-title {
  color: #1e3955;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  position: relative;
  letter-spacing: -0.5px;
}

.card-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #008794, transparent);
  border-radius: 2px;
  transition: width 0.4s ease;
}

.solution-card:hover .card-title::after {
  width: 100px;
}

.card-description {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.card-action {
  font-size: 0.95rem;
  font-weight: 600;
  color: #0098a1;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.card-action:hover {
  transform: translateX(6px);
  color: #008794;
}

.card-action::after {
  content: "→";
  transition: transform 0.3s ease;
}

.card-action:hover::after {
  transform: translateX(4px);
}

/* Content section styling */
.content-section {
  margin-bottom: 2.5rem;
  position: relative;
  padding-top: 0.5rem;
}

.section-marker {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 4px;
  background: linear-gradient(90deg, #ff9800, #ff5722);
  margin-bottom: 0.5rem;
}

.content-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 1.2rem 0 0.8rem;
}

.content-section p {
  color: #4b5563;
  line-height: 1.6;
}

/* Enhanced Footer with modern tech design */
.doc-footer {
  flex-shrink: 0;
  padding: 2rem 3rem;
  background: linear-gradient(135deg, #062570 0%, #041944 100%);
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
  border-top: 1px solid rgba(0, 188, 212, 0.2);
  margin-top: 3rem;
  position: relative;
  overflow: hidden;
}

.doc-footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #008794 20%, #5dcac6 50%, #008794 80%, transparent);
  animation: slide-line 8s linear infinite;
}

@keyframes slide-line {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.doc-footer::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 100px;
  background: radial-gradient(ellipse at center bottom, rgba(0, 188, 212, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

/* Improved Responsive design */
@media (max-width: 1024px) {
  .container {
    padding: 0 0.5rem;
  }

  .aside {
    width: 200px; /* 保持较窄 */
    margin-right: 1.5rem;
  }

  .content-container {
    padding: 2.5rem 2rem;
  }

  .hero-container {
    height: 90vh; /* 平板端稍微减少高度 */
  }

  .hero-image-section {
    height: 50vh; /* 平板端稍微减少图片高度 */
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 0;
  }

  .aside {
    width: 100%;
    position: static;
    height: auto;
    max-height: 280px;
    border-right: none;
    border-bottom: 1px solid #eaecef;
    margin-right: 0;
    margin-bottom: 1rem;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .content {
    border-radius: 0 0 12px 12px;
  }

  .content-container {
    padding: 2rem 1.5rem;
  }

  .solution-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .hero-container {
    height: auto;
    min-height: unset;
    margin-bottom: 1.5rem;
    overflow: visible;
  }

  .hero-image-section {
    height: auto;
    min-height: 300px;
  }

  .hero-content-section {
    padding: 2rem 1.5rem 2.5rem;
  }

  .hero-container > :deep(.title-info) {
    margin-top: 0;
  }

  .toc-title {
    padding: 0.8rem 0.8rem 0.8rem 1rem; /* 增加左边距 */
    margin: -0.6rem -0.6rem 0 -0.6rem; /* 负margin来充满容器宽度 */
    font-size: 0.95rem;
  }

  .aside-content {
    padding: 0.6rem;
  }
}

@media (max-width: 640px) {
  .content-container {
    padding: 1.5rem 1rem;
  }

  .solution-card {
    padding: 2rem 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0;
  }

  .content-container {
    padding: 1rem;
  }

  .card-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .solution-card {
    padding: 1.5rem 1rem;
    border-radius: 12px;
  }

  .card-title {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }

  .card-description {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .hero-container {
    margin-bottom: 1.25rem;
  }

  .hero-image-section {
    min-height: 260px;
  }

  .hero-content-section {
    padding: 1.5rem 1rem 2rem;
  }

  .aside {
    max-height: 240px;
    border-radius: 8px 8px 0 0;
  }

  .content {
    border-radius: 0 0 8px 8px;
  }

  .toc-title {
    padding: 1rem 1rem 1rem 1.25rem; /* 增加左边距 */
    margin: -0.75rem -0.75rem 0 -0.75rem; /* 负margin来充满容器宽度 */
    font-size: 0.95rem;
  }

  .aside-content {
    padding: 0.75rem;
  }
}

@media (max-width: 360px) {
  .content-container {
    padding: 0.75rem;
  }

  .solution-card {
    padding: 1.25rem 0.75rem;
  }

  .card-title {
    font-size: 1.1rem;
  }

  .card-description {
    font-size: 0.85rem;
  }

  .hero-image-section {
    min-height: 240px;
  }

  .hero-container > :deep(.title-info) {
    margin-top: 0;
  }
}

/* 横屏模式优化 */
@media (max-width: 896px) and (orientation: landscape) {
  .hero-container {
    height: auto;
    min-height: unset;
  }

  .hero-image-section {
    height: auto;
    min-height: 240px;
  }

  .aside {
    max-height: 200px;
  }

  .content-container {
    padding: 1.5rem 1rem;
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .solution-card:hover {
    transform: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }

  .solution-card:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }

  .aside:hover {
    transform: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
}
</style>
