<script setup lang="ts">
import { useRoute } from "vitepress";
import { computed, watch, onMounted, nextTick } from "vue";
import { useData } from "vitepress/dist/client/theme-default/composables/data.js";
import "../theme/tw.css";
import TitleInfo from "./TitleInfo.vue";
import CustomTOC from "./CustomTOC.vue";

const { theme, frontmatter } = useData();

const route = useRoute();
const hasAside = computed(() => {
  // 在team页面隐藏侧边栏
  return !route.path.includes('/team');
});
const leftAside = computed(() => true); 

const pageName = computed(() => route.path.replace(/[./]+/g, "_").replace(/_html$/, ""));
const heroImage = computed(() => frontmatter.value.heroImage || "/default-hero.jpg");

// 内容处理函数
const processContent = () => {
  nextTick(() => {
    const contentElement = document.querySelector('.vp-doc');
    if (!contentElement || contentElement.hasAttribute('data-processed')) return;
    
    // 标记为已处理，避免重复处理
    contentElement.setAttribute('data-processed', 'true');

    try {
      // 直接处理innerHTML，更安全高效
      let html = contentElement.innerHTML;
      let hasChanges = false;

      // 1. BBa_25开头的文本 -> 自动链接
      const bbaRegex = /(?<!<[^>]*?)BBa_25[A-Za-z0-9]+(?![^<]*?>)/g;
      if (bbaRegex.test(html)) {
        hasChanges = true;
        html = html.replace(bbaRegex, (match) => {
          const lowercaseMatch = match.toLowerCase().replace('_', '-');
          return `<a href="https://registry.igem.org/parts/${lowercaseMatch}" target="_blank" rel="noopener noreferrer">${match}</a>`;
        });
      }

      // 2. DOI格式 -> 自动链接
      const doiRegex = /(?<!<[^>]*?)(?:doi:|DOI:)?\s*(10\.\d+\/[^\s<]+)(?![^<]*?>)/g;
      if (doiRegex.test(html)) {
        hasChanges = true;
        html = html.replace(doiRegex, (match, doi) => {
          return `<a href="https://doi.org/${doi}" target="_blank" rel="noopener noreferrer">DOI: ${doi}</a>`;
        });
      }

      // 3. PMID格式 -> 自动链接
      const pmidRegex = /(?<!<[^>]*?)PMID:\s*(\d+)(?![^<]*?>)/g;
      if (pmidRegex.test(html)) {
        hasChanges = true;
        html = html.replace(pmidRegex, (match, pmid) => {
          return `<a href="https://pubmed.ncbi.nlm.nih.gov/${pmid}/" target="_blank" rel="noopener noreferrer">PMID: ${pmid}</a>`;
        });
      }

      // 4. 学名斜体
      const scientificNameRegex = /(?<!<[^>]*?)(?<!<em>)\b([A-Z][a-z]+ [a-z]+)\b(?![^<]*?>)(?!<\/em>)/g;
      const commonLatinPatterns = /^(Escherichia coli|Bacillus subtilis|Saccharomyces cerevisiae|Arabidopsis thaliana|Drosophila melanogaster|Caenorhabditis elegans|Mus musculus|Homo sapiens|Rattus norvegicus|Danio rerio|Xenopus laevis|Gallus gallus|Bos taurus|Sus scrofa|Ovis aries|Capra hircus|Equus caballus|Canis familiaris|Felis catus|Macaca mulatta|Pan troglodytes|Gorilla gorilla|Pongo pygmaeus|Chlorella vulgaris|Spirulina platensis|Pseudomonas aeruginosa|Staphylococcus aureus|Streptococcus pyogenes|Mycobacterium tuberculosis|Salmonella enterica|Vibrio cholerae|Clostridium botulinum|Listeria monocytogenes|Campylobacter jejuni|Helicobacter pylori|Neisseria gonorrhoeae|Treponema pallidum|Borrelia burgdorferi|Plasmodium falciparum|Trypanosoma brucei|Leishmania major|Toxoplasma gondii|Candida albicans|Aspergillus niger|Penicillium chrysogenum|Neurospora crassa|Schizosaccharomyces pombe|Pichia pastoris|Kluyveromyces lactis|Yarrowia lipolytica|Trichoderma reesei|Fusarium graminearum|Magnaporthe oryzae|Ustilago maydis|Cryptococcus neoformans|Pneumocystis jirovecii)$/i;
      
      html = html.replace(scientificNameRegex, (match, name) => {
        if (commonLatinPatterns.test(name)) {
          hasChanges = true;
          return `<em>${name}</em>`;
        }
        return match;
      });

      // 如果有变化，更新内容
      if (hasChanges) {
        contentElement.innerHTML = html;
      }
    } catch (error) {
      console.warn('Content processing error:', error);
    }
  });
};

// 监听路由变化和内容更新
onMounted(() => {
  // 延迟执行，确保内容已完全渲染
  setTimeout(() => {
    processContent();
  }, 100);
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
          <div class="shape shape-circle"></div>
          <div class="shape shape-dots"></div>
          <div class="shape shape-rect"></div>
        </div>
      </div>

      <!-- Content section with TitleInfo component that will handle the title -->
      <div class="hero-content-section">
        <TitleInfo />
      </div>
    </div>

    <div class="container">
      <!-- TOC Bar (left sidebar) with improved styling -->
      <div v-if="hasAside" class="aside" :class="{ 'left-aside': leftAside }">
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
  </div>
</template>

<style scoped>
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

/* Hero shapes styling - Enhanced tech style */
.hero-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}

.shape {
  position: absolute;
  transition: all 0.5s ease;
}

.shape-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(0, 188, 212, 0.2) 0deg,
    rgba(85, 194, 187, 0.4) 90deg,
    rgba(0, 152, 161, 0.2) 180deg,
    rgba(255, 255, 255, 0.1) 270deg,
    rgba(0, 188, 212, 0.2) 360deg
  );
  top: 20px;
  right: 8%;
  animation: rotate-slow 20s linear infinite;
  filter: blur(1px);
}

.shape-circle::after {
  content: "";
  position: absolute;
  inset: 20px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    transparent 70%
  );
}

.shape-dots {
  width: 120px;
  height: 120px;
  background-image: 
    radial-gradient(circle, rgba(0, 188, 212, 0.6) 2px, transparent 2px),
    radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1px);
  background-size: 20px 20px, 10px 10px;
  background-position: 0 0, 5px 5px;
  left: 10%;
  top: 40px;
  transform: rotate(30deg);
  animation: pulse-opacity 4s ease-in-out infinite;
}

.shape-rect {
  width: 220px;
  height: 120px;
  background: linear-gradient(
    135deg,
    rgba(0, 188, 212, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 50%,
    rgba(85, 194, 187, 0.1) 75%,
    rgba(255, 255, 255, 0.1) 100%
  );
  right: 12%;
  bottom: -30px;
  transform: skew(-20deg, -5deg);
  animation: slide-fade 12s ease-in-out infinite;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

/* Enhanced animations for tech feel */
@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse-opacity {
  0%, 100% {
    opacity: 0.3;
    transform: rotate(30deg) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: rotate(30deg) scale(1.1);
  }
}

@keyframes slide-fade {
  0%, 100% {
    transform: skew(-20deg, -5deg) translateX(0);
    opacity: 0.5;
  }
  25% {
    transform: skew(-20deg, -5deg) translateX(20px);
    opacity: 0.8;
  }
  75% {
    transform: skew(-20deg, -5deg) translateX(-20px);
    opacity: 0.3;
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
  padding: 1rem 0.75rem; /* 减少内边距 */
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
    height: 80vh; /* 移动端减少高度 */
    min-height: 500px;
  }

  .hero-image-section {
    height: 40vh; /* 移动端减少图片高度 */
    min-height: 280px;
  }

  .hero-content-section {
    padding-top: 2.5rem;
  }

  .hero-container > :deep(.title-info) {
    margin-top: -60px;
  }

  .toc-title {
    padding: 0.8rem 0.6rem;
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
    height: 70vh; /* 小屏幕进一步减少 */
    min-height: 450px;
  }

  .hero-image-section {
    height: 35vh;
    min-height: 200px;
  }

  .hero-content-section {
    padding-top: 1.5rem;
  }

  .hero-container > :deep(.title-info) {
    margin-top: -40px;
  }

  .aside {
    max-height: 240px;
    border-radius: 8px 8px 0 0;
  }

  .content {
    border-radius: 0 0 8px 8px;
  }

  .toc-title {
    padding: 1rem 0.75rem;
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

  .hero-container {
    height: 65vh; /* 最小屏幕 */
    min-height: 420px;
  }

  .hero-image-section {
    height: 30vh;
    min-height: 180px;
  }

  .hero-container > :deep(.title-info) {
    margin-top: -30px;
  }
}

/* 横屏模式优化 */
@media (max-width: 896px) and (orientation: landscape) {
  .hero-container {
    height: 100vh;
    min-height: 400px;
  }

  .hero-image-section {
    height: 50vh;
    min-height: 200px;
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
