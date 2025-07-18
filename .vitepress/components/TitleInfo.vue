<template>
  <div class="title-info">
    <!-- Add back the title that floats between image and content -->
    <div class="hero-title-container" ref="titleRef">
      <SplitText
        :text="pageTitle || 'Suspendisse'"
        :style="{
          fontSize: '4.2rem',
          fontWeight: '800',
          lineHeight: '1.1',
          letterSpacing: '-2px',
          display: 'block',
          color: '#062570'
        }"
        :delay="200"
        :duration="0.8"
        ease="power3.out"
        split-type="chars"
        :from="{ opacity: 0, y: 60, rotateX: 90 }"
        :to="{ opacity: 1, y: 0, rotateX: 0 }"
        :threshold="0.1"
        root-margin="-50px"
        text-align="left"
        @animation-complete="handleTitleAnimationComplete"
      />
    </div>

    <!-- Description and button content -->
    <div class="hero-bottom-content">
      <p class="hero-description" v-if="pageDescription">
        <span v-html="formattedDescription"></span>
      </p>
      <p class="hero-description" v-else>
        Vestibulum <span class="text-orange-400">faucibus eget</span> erat eget pretium.
        Donec commodo convallis ligula, eget suscipit orci.
      </p>

      <!-- Button styling to match image -->
      <a :href="authorUrl" class="hero-button" v-if="authorName">
        Author:{{ authorName }}
      </a>
      <button class="hero-button" v-else>Author:{{ author || "XXX" }}</button>
    </div>
  </div>
</template>

<script setup>
import { useData } from "vitepress";
import { computed, ref, onMounted, onUnmounted } from "vue";
import SplitText from "./SplitText.vue";

// 获取当前页面的数据
const { frontmatter } = useData();

// 计算属性：获取页面标题
const pageTitle = computed(() => frontmatter.value.title);

// 获取页面描述
const pageDescription = computed(() => frontmatter.value.description);

// Handle description formatting
const formattedDescription = computed(() => {
  if (!pageDescription.value) return "";
  // Match {{text}} for orange highlight
  return pageDescription.value.replace(
    /\{\{(.*?)\}\}/g,
    '<span class="text-orange-400">$1</span>'
  );
});

// Update author computed properties to handle object
const authorData = computed(() => frontmatter.value.author);

const authorName = computed(() => {
  if (typeof authorData.value === "object" && authorData.value?.name) {
    return authorData.value.name;
  }
  if (typeof authorData.value === "string") {
    return authorData.value; // Handle case where author is just a string
  }
  return null; // No valid author name found
});

const authorUrl = computed(() => {
  if (typeof authorData.value === "object" && authorData.value?.url) {
    // Ensure URL starts with '/' or 'http' for proper linking
    return authorData.value.url.startsWith("/") || authorData.value.url.startsWith("http")
      ? authorData.value.url
      : `/${authorData.value.url}`; // Prepend slash if it's a relative path without one
  }
  return null; // No URL provided
});

// Get hero image from frontmatter
const heroImage = computed(() => frontmatter.value.heroImage);

import "../theme/tw.css";

const titleRef = ref(null);

// 标题动画完成回调
const handleTitleAnimationComplete = () => {
  // 可以在这里添加标题动画完成后的逻辑
  console.log('Title animation completed');
};
</script>

<style>
.title-info {
  display: block;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

/* 标题容器样式 */
.hero-title-container {
  position: relative;
  z-index: 20;
  margin-bottom: 1.5rem;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  padding: 0 6rem;
}

/* 添加动态下划线效果 */
.hero-title-container::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 6rem;
  width: 0;
  height: 4px;
  background: linear-gradient(90deg, #008794, #5dcac6, #0e9f99);
  border-radius: 2px;
  animation: expand-line 2s ease-out 1s forwards;
  box-shadow: 0 0 10px rgba(0, 188, 212, 0.5);
}

@keyframes expand-line {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 120px;
    opacity: 1;
  }
}

/* Container for description and button - enhanced design */
.hero-bottom-content {
  padding: 0rem 6rem 3rem;
  background: linear-gradient(to bottom, #ffffff 0%, rgba(248, 250, 252, 0.8) 100%);
  position: relative;
  transition: all 0.3s ease;
  border-radius: 0;
  box-shadow: none;
  margin-top: -2rem;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 750px;
  line-height: 1.8;
  color: #475569;
  padding-left: 0;
  position: relative;
  font-weight: 400;
  letter-spacing: 0.2px;
}

.hero-description .text-orange-400 {
  color: #e97e35;
  font-weight: 600;
  position: relative;
  padding: 0 4px;
}

.hero-description .text-orange-400::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #e97e35;
  opacity: 0.3;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  background: linear-gradient(135deg, #008794 0%, #5dcac6 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
  position: relative;
  overflow: hidden;
}

.hero-button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.hero-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 188, 212, 0.4);
}

.hero-button:hover::before {
  width: 300px;
  height: 300px;
}

/* Improved responsive adjustments */
@media (max-width: 768px) {
  .hero-title-container {
    padding: 0 3rem;
  }

  .hero-title-container::after {
    left: 3rem;
  }

  .hero-bottom-content {
    padding: 2.5rem 3rem 2rem;
  }
}

@media (max-width: 480px) {
  .hero-title-container {
    padding: 0 1.5rem;
  }

  .hero-title-container::after {
    left: 1.5rem;
  }

  .hero-bottom-content {
    padding: 2rem 1.5rem 1.8rem;
  }
}

/* Export the hero image to be used by parent component */
:export {
  heroImage: v-bind(heroImage);
}
</style>
