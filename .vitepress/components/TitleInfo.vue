<template>
  <div class="title-info">
    <!-- Add back the title that floats between image and content -->
    <div class="hero-title-container">
      <SplitText
        :text="pageTitle || 'Suspendisse'"
        :style="titleStyles"
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
      <div
        class="hero-description"
        v-if="pageDescription"
        v-html="formattedDescription"
      ></div>
      <p class="hero-description" v-else>
        Vestibulum <span class="text-orange-400">faucibus eget</span> erat eget pretium.
        Donec commodo convallis ligula, eget suscipit orci.
      </p>

      <!-- Button styling to match image -->
      <div class="authors-container">
        <div class="author-button-wrapper" v-for="(author, index) in authors" :key="index">
          <a :href="author.url" class="hero-button" v-if="author.url">
            Author: {{ author.name }}
          </a>
          <button class="hero-button" v-else>Author: {{ author.name }}</button>
          
          <!-- Author avatar tooltip -->
          <div class="author-avatar-tooltip" v-if="author.avatar">
            <img :src="author.avatar" :alt="author.name" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useData } from "vitepress";
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import SplitText from "./SplitText.vue";

// 获取当前页面的数据
const { frontmatter } = useData();

// 获取窗口尺寸
const { width: windowWidth } = useWindowSize();

// 计算属性：获取页面标题
const pageTitle = computed(() => frontmatter.value.title);

// 获取页面描述
const pageDescription = computed(() => frontmatter.value.description);

// 响应式标题样式
const titleStyles = computed(() => {
  let fontSize = '5rem'; // 默认大屏幕
  let letterSpacing = '-2px';
  let lineHeight = '1.1';
  
  // 根据屏幕宽度动态调整
  if (windowWidth.value <= 360) {
    fontSize = '2rem';
    letterSpacing = '-0.5px';
    lineHeight = '1.2';
  } else if (windowWidth.value <= 480) {
    fontSize = '2.5rem';
    letterSpacing = '-0.8px';
    lineHeight = '1.15';
  } else if (windowWidth.value <= 640) {
    fontSize = '3rem';
    letterSpacing = '-1px';
    lineHeight = '1.15';
  } else if (windowWidth.value <= 768) {
    fontSize = '3.5rem';
    letterSpacing = '-1.5px';
    lineHeight = '1.1';
  } else if (windowWidth.value <= 1024) {
    fontSize = '4rem';
    letterSpacing = '-1.8px';
    lineHeight = '1.1';
  }
  
  return {
    fontSize,
    fontWeight: '800',
    lineHeight,
    letterSpacing,
    display: 'block',
    color: '#062570',
    wordBreak: 'break-word', // 处理长词换行
    overflowWrap: 'break-word', // 兼容性
    hyphens: 'auto' // 添加连字符
  };
});

// Preserve author-supplied HTML while highlighting {{token}} sections
const formattedDescription = computed(() => {
  const rawDescription = pageDescription.value;
  if (!rawDescription) {
    return "";
  }

  return applyHighlightSpans(rawDescription);
});

// Handle authors - support both single author and multiple authors (max 3)
const authors = computed(() => {
  const authorData = frontmatter.value.authors || frontmatter.value.author;
  
  // If no author data
  if (!authorData) {
    return [{ name: "XXX", url: null, avatar: null }];
  }
  
  // If it's an array of authors
  if (Array.isArray(authorData)) {
    // Limit to 3 authors maximum
    return authorData.slice(0, 3).map(author => {
      if (typeof author === "string") {
        return { name: author, url: null, avatar: null };
      }
      if (typeof author === "object") {
        return {
          name: author.name || "Unknown",
          url: author.url ? formatUrl(author.url) : null,
          avatar: author.avatar || null
        };
      }
      return { name: "Unknown", url: null, avatar: null };
    });
  }
  
  // If it's a single author (backward compatibility)
  if (typeof authorData === "string") {
    return [{ name: authorData, url: null, avatar: null }];
  }
  
  if (typeof authorData === "object") {
    return [{
      name: authorData.name || "Unknown",
      url: authorData.url ? formatUrl(authorData.url) : null,
      avatar: authorData.avatar || null
    }];
  }
  
  return [{ name: "XXX", url: null, avatar: null }];
});

// Escape text while keeping valid HTML entities intact
function escapeHtmlText(text) {
  return text
    .replace(/&(?!(?:[a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function processTextBuffer(buffer) {
  if (!buffer) {
    return "";
  }

  const parts = [];
  const highlightRegex = /\{\{(.*?)\}\}/g;
  let lastIndex = 0;
  let match;

  while ((match = highlightRegex.exec(buffer)) !== null) {
    if (match.index > lastIndex) {
      parts.push(escapeHtmlText(buffer.slice(lastIndex, match.index)));
    }

    parts.push(`<span class="text-orange-400">${escapeHtmlText(match[1])}</span>`);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < buffer.length) {
    parts.push(escapeHtmlText(buffer.slice(lastIndex)));
  }

  return parts.join("");
}

function applyHighlightSpans(html) {
  let result = "";
  let buffer = "";
  let insideTag = false;

  for (let i = 0; i < html.length; i += 1) {
    const char = html[i];

    if (char === "<") {
      result += processTextBuffer(buffer);
      buffer = "";
      insideTag = true;
      result += char;
      continue;
    }

    if (char === ">") {
      insideTag = false;
      result += char;
      continue;
    }

    if (insideTag) {
      result += char;
    } else {
      buffer += char;
    }
  }

  result += processTextBuffer(buffer);
  return result;
}

// Helper function to format URLs
function formatUrl(url) {
  if (!url) return null;
  // Ensure URL starts with '/' or 'http' for proper linking
  return url.startsWith("/") || url.startsWith("http") ? url : `/${url}`;
}

// Get hero image from frontmatter
const heroImage = computed(() => frontmatter.value.heroImage);



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

/* 标题容器样式 - 适配全屏 */
.hero-title-container {
  position: relative;
  z-index: 20;
  margin-bottom: 2rem;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  padding: 0 8rem; /* 增加左右边距 */
  max-width: 1200px;
  width: 100%;
  word-wrap: break-word; /* 确保长词换行 */
  overflow-wrap: break-word;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

/* 添加动态下划线效果 */
.hero-title-container::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 8rem; /* 匹配新的padding */
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
  padding: 0rem 8rem 3rem; /* 增加左右边距匹配标题 */
  background: transparent;
  position: relative;
  transition: all 0.3s ease;
  border-radius: 0;
  box-shadow: none;
  margin-top: -1rem;
  max-width: 1200px;
  width: 100%;
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

/* Authors container for multiple authors */
.authors-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

/* Author button wrapper for avatar tooltip */
.author-button-wrapper {
  display: inline-block;
  position: relative;
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
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
  position: relative;
}

.hero-button:hover {
  transform: translateY(-2px);
}

/* Author avatar tooltip */
.author-avatar-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) scale(0);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background: #fff;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.author-avatar-tooltip img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Show avatar on hover */
.author-button-wrapper:hover .author-avatar-tooltip {
  transform: translateX(-50%) scale(1);
  opacity: 1;
}

/* Add arrow pointing down */
.author-avatar-tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 8px 0 8px;
  border-color: #fff transparent transparent transparent;
}

/* Improved responsive adjustments */
@media (max-width: 1024px) {
  .hero-title-container {
    padding: 0 4rem;
  }

  .hero-title-container::after {
    left: 4rem;
  }

  .hero-bottom-content {
    padding: 0rem 4rem 2.5rem;
  }
}

@media (max-width: 768px) {
  .hero-title-container {
    padding: 0 1.5rem;
    transform: translateY(-30%); /* 减少向上偏移 */
  }

  .hero-title-container::after {
    left: 1.5rem;
  }

  .hero-bottom-content {
    padding: 0rem 1.5rem 2rem;
  }

  .hero-description {
    font-size: 1rem;
    line-height: 1.6;
  }
}

@media (max-width: 480px) {
  .hero-title-container {
    padding: 0 1rem;
    transform: translateY(-20%); /* 进一步减少偏移 */
    margin-bottom: 1rem;
  }

  .hero-title-container::after {
    left: 1rem;
    width: 60px;
    height: 3px;
  }

  .hero-bottom-content {
    padding: 0rem 1rem 1.5rem;
    margin-top: -0.5rem;
  }

  .hero-description {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .hero-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .authors-container {
    gap: 0.75rem;
  }
}

@media (max-width: 360px) {
  .hero-title-container {
    padding: 0 0.75rem;
    transform: translateY(-15%); /* 最小屏幕最少偏移 */
  }

  .hero-title-container::after {
    left: 0.75rem;
    width: 50px;
  }

  .hero-bottom-content {
    padding: 0rem 0.75rem 1.25rem;
  }

  .hero-description {
    font-size: 0.9rem;
  }

  .hero-button {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}

/* Export the hero image to be used by parent component */
:export {
  heroImage: v-bind(heroImage);
}
</style>
