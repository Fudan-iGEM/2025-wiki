<script setup lang="ts">
import { useRoute } from "vitepress";
import { computed, ref, onMounted } from "vue";
import { useData } from "vitepress/dist/client/theme-default/composables/data.js";
import VPDocFooter from "vitepress/dist/client/theme-default/components/VPDocFooter.vue";
import "../theme/tw.css";
import TitleInfo from "./TitleInfo.vue";
import CustomTOC from "./CustomTOC.vue";

const { theme, frontmatter } = useData();

const route = useRoute();
// 假设我们总是需要侧边栏，根据你的实际逻辑调整
const hasAside = computed(() => true);
// 布局图中侧边栏在左侧
const leftAside = computed(() => true); // 保持左侧边栏

const pageName = computed(() => route.path.replace(/[./]+/g, "_").replace(/_html$/, ""));
const heroImage = computed(() => frontmatter.value.heroImage || "/default-hero.jpg");
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
            <!-- Enhanced Solution Cards -->
            <div class="solution-cards">
              <div class="solution-card">
                <div class="card-icon">💼</div>
                <h3 class="card-title">Business Solution</h3>
                <p class="card-description">Interdum et malesuada ac ante...</p>
                <div class="card-action">Learn more →</div>
              </div>
              <div class="solution-card">
                <div class="card-icon">💡</div>
                <h3 class="card-title">Free project quote</h3>
                <p class="card-description">Interdum et malesuada ac ante...</p>
                <div class="card-action">Get quote →</div>
              </div>
              <div class="solution-card">
                <div class="card-icon">🚀</div>
                <h3 class="card-title">Nulla lobortis nunc</h3>
                <p class="card-description">Interdum et malesuada ac ante...</p>
                <div class="card-action">Explore →</div>
              </div>
            </div>

            <!-- Content Sections container -->
            <div class="content-sections">
              <!-- Content will be rendered from markdown files -->
            </div>

            <Content
              class="vp-doc"
              :class="[pageName, theme.externalLinkIcon && 'external-link-icon-enabled']"
            />
          </main>
          <slot name="doc-after" />
        </div>
      </div>
    </div>

    <!-- Enhanced Footer -->
    <VPDocFooter class="doc-footer">
      <template #doc-footer-before><slot name="doc-footer-before" /></template>
    </VPDocFooter>

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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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

/* Hero section structure */
.hero-container {
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: white;
  overflow: hidden;
  z-index: 1;
}

/* Image section */
.hero-image-section {
  height: 320px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
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

/* Content section positioned to connect with image */
.hero-content-section {
  position: relative;
  z-index: 10;
  margin-top: 0;
  background-color: white;
}

/* Set up positioning context for TitleInfo */
.hero-container > :deep(.title-info) {
  position: relative;
  margin-top: -50px; /* Pull up to overlap with image */
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

/* Enhanced TOC Bar / Sidebar with modern tech style */
.aside {
  flex-shrink: 0;
  width: 280px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafb 100%);
  height: calc(100vh - 60px - 320px);
  overflow-y: auto;
  position: sticky;
  top: 160px;
  align-self: flex-start;
  border: 1px solid rgba(0, 152, 161, 0.1);
  border-radius: 16px;
  margin-right: 2.5rem;
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
  background: linear-gradient(90deg, #00bcd4, #4dd0e1, #55c2bb);
  border-radius: 16px 16px 0 0;
}

.toc-title {
  font-weight: 700;
  padding: 1.5rem 1.25rem;
  text-align: left;
  border-bottom: 1px solid rgba(0, 152, 161, 0.1);
  color: #0098a1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(135deg, rgba(0, 188, 212, 0.05) 0%, transparent 100%);
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

.toc-icon {
  margin-right: 0.75rem;
  font-size: 1.4rem;
  background: linear-gradient(135deg, #00bcd4, #55c2bb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.aside-content {
  padding: 1.25rem;
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
  background: linear-gradient(90deg, transparent, #00bcd4, transparent);
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
  background: linear-gradient(45deg, #00bcd4, #55c2bb, #0098a1, #4dd0e1);
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
  background: linear-gradient(90deg, #00bcd4, transparent);
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
  color: #00bcd4;
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
  background: linear-gradient(135deg, #0a1628 0%, #1e3955 100%);
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
  background: linear-gradient(90deg, transparent, #00bcd4 20%, #55c2bb 50%, #00bcd4 80%, transparent);
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
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 0;
  }

  .aside {
    width: 100%;
    position: static;
    height: auto;
    max-height: 300px;
    border-right: none;
    border-bottom: 1px solid #eaecef;
    margin-right: 0;
    margin-bottom: 1rem;
    border-radius: 0;
  }

  .content {
    border-radius: 0;
  }

  .solution-cards {
    flex-direction: column;
  }

  .hero-image-section {
    height: 220px;
  }

  .hero-content-section {
    padding-top: 2.5rem;
  }

  .hero-container > :deep(.title-info) {
    margin-top: -40px;
  }
}

@media (max-width: 480px) {
  .content-container {
    padding: 1rem;
  }

  .card-icon {
    font-size: 1.5rem;
  }

  .hero-image-section {
    height: 200px;
  }

  .hero-content-section {
    padding-top: 2rem;
  }

  .hero-container > :deep(.title-info) {
    margin-top: -35px;
  }
}
</style>
