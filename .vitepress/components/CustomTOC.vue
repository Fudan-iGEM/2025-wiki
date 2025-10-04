<template>
  <div
    class="custom-toc"
    :class="{ 'is-mobile': isMobile, open: isPanelOpen && headings.length }"
  >
    <button
      v-if="isMobile && headings.length"
      type="button"
      class="toc-toggle"
      :aria-expanded="isPanelOpen"
      :aria-controls="panelId"
      @click="togglePanel"
    >
      <span class="sr-only">{{ isPanelOpen ? 'Hide table of contents' : 'Show table of contents' }}</span>
      <span class="toggle-icon" aria-hidden="true">
        <span v-if="isPanelOpen">×</span>
        <span v-else>TOC</span>
      </span>
    </button>

    <transition name="toc-panel">
      <div
        v-if="(!isMobile || isPanelOpen) && headings.length"
        :id="panelId"
        class="toc-panel"
      >
        <ul class="toc-list">
          <li
            v-for="(heading, index) in headings"
            :key="index"
            class="toc-item"
            :class="{ 'h3-item': heading.level === 3 }"
          >
            <a
              :href="`#${heading.id}`"
              class="toc-link"
              :class="{ active: heading.isActive }"
              @click.prevent="scrollToHeading(heading.id)"
            >
              <span v-if="heading.level === 2" class="h2-marker"></span>
              <span v-else class="h3-marker"></span>
              {{ heading.text }}
            </a>
          </li>
        </ul>
      </div>
    </transition>

    <div
      v-if="(!isMobile || isPanelOpen) && !headings.length"
      class="toc-panel no-headings"
    >
      No headers found on this page
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute } from "vitepress";

const headings = ref([]);
const observer = ref(null);
const route = useRoute();
const isMobile = ref(false);
const isPanelOpen = ref(false);
const panelId = "custom-toc-panel";
let resizeTimer = null;

onMounted(() => {
  updateViewportState();
  isPanelOpen.value = isMobile.value ? false : true;

  // Give the page content time to render fully
  setTimeout(() => {
    updateHeadings();
    initIntersectionObserver();
  }, 300);

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
  if (resizeTimer) {
    clearTimeout(resizeTimer);
    resizeTimer = null;
  }
  window.removeEventListener("resize", handleResize);
});

// 监听路由变化，页面切换时重新获取标题
watch(
  () => route.path,
  () => {
    // 给新页面内容一些时间来渲染
    setTimeout(() => {
      updateHeadings();
      initIntersectionObserver();
      if (isMobile.value) {
        isPanelOpen.value = false;
      }
    }, 500);
  }
);

watch(isMobile, (mobile) => {
  isPanelOpen.value = mobile ? false : true;
});

function togglePanel() {
  isPanelOpen.value = !isPanelOpen.value;
}

function handleResize() {
  // Debounce the resize handling
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
  resizeTimer = setTimeout(() => {
    updateViewportState();
    updateHeadings();
  }, 200);
}

function updateViewportState() {
  const mobile = window.matchMedia("(max-width: 900px)").matches;
  isMobile.value = mobile;
}

function updateHeadings() {
  // 先断开之前的observer
  if (observer.value) {
    observer.value.disconnect();
    observer.value = null;
  }

  // Get all h2 and h3 elements from the main content area
  const elements = Array.from(document.querySelectorAll(".vp-doc h2, .vp-doc h3"));

  headings.value = elements.map((el) => {
    // Ensure element has an ID
    if (!el.id) {
      el.id = el.textContent
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]/g, "");
    }

    return {
      id: el.id,
      text: el.textContent.trim(),
      level: parseInt(el.tagName.substring(1)),
      isActive: false,
    };
  });

  // Reinitialize the intersection observer
  nextTick(() => {
    initIntersectionObserver();
  });
}

function initIntersectionObserver() {
  const headingElements = headings.value
    .map((h) => document.getElementById(h.id))
    .filter(Boolean);

  // 如果没有标题元素，就不创建observer
  if (headingElements.length === 0) {
    return;
  }

  observer.value = new IntersectionObserver(
    (entries) => {
      // Find all currently visible headings
      const visibleHeadings = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target.id);

      if (visibleHeadings.length > 0) {
        // Mark all headings as inactive
        headings.value.forEach((h) => (h.isActive = false));

        // Find the first visible heading in our list
        const activeHeadingId = visibleHeadings[0];
        const activeHeading = headings.value.find((h) => h.id === activeHeadingId);
        if (activeHeading) {
          activeHeading.isActive = true;
        }
      }
    },
    {
      rootMargin: "-80px 0px -80% 0px",
      threshold: 0.1,
    }
  );

  // Start observing each heading
  headingElements.forEach((el) => {
    if (el) observer.value.observe(el);
  });
}

function scrollToHeading(id) {
  const element = document.getElementById(id);
  if (element) {
    // Deactivate all headings
    headings.value.forEach((h) => (h.isActive = false));

    // Activate the clicked heading
    const heading = headings.value.find((h) => h.id === id);
    if (heading) heading.isActive = true;

    // Scroll to the element with offset for fixed headers
    const yOffset = -100;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });

    if (isMobile.value) {
      isPanelOpen.value = false;
    }
  }
}
</script>

<style scoped>
.custom-toc {
  width: 100%;
  position: relative;
  /* 简化结构，直接展示内容 */
}

.custom-toc.is-mobile {
  position: fixed;
  bottom: 1.25rem;
  left: 1.25rem;
  width: auto;
  max-width: min(80vw, 320px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  z-index: 990;
}

.toc-panel {
  width: 100%;
  border-radius: 16px;
  background: transparent;
  padding: 0;
}

.custom-toc.is-mobile .toc-panel {
  order: -1;
  position: relative;
  width: 100%;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  padding: 1.1rem 1.1rem 1.3rem;
  border-radius: 20px;
  box-shadow: 0 18px 34px rgba(0, 135, 148, 0.12);
  border: 1px solid rgba(0, 135, 148, 0.18);
  max-height: min(70vh, 420px);
  overflow-y: auto;
}

.custom-toc:not(.is-mobile) .toc-panel {
  background: transparent;
  padding: 0;
  box-shadow: none;
  border: none;
}

.toc-toggle {
  width: 60px;
  height: 60px;
  border-radius: 999px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffffff 0%, #d7f5f6 100%);
  color: #008794;
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(0, 135, 148, 0.2);
  position: relative;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.toc-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 36px rgba(0, 135, 148, 0.28);
}

.toc-toggle:active {
  transform: scale(0.96);
}

.custom-toc.open .toc-toggle {
  background: linear-gradient(135deg, #bff1f3 0%, #7edcd9 100%);
  box-shadow: 0 16px 30px rgba(0, 135, 148, 0.28);
  color: #036d74;
}

.toggle-icon {
  font-size: 0.82rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-icon span {
  display: inline-block;
  font-weight: 700;
}

.custom-toc.open .toggle-icon span {
  font-size: 1.1rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.toc-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px; /* 减少间距 */
}

.toc-item {
  margin: 2px 0; /* 减少上下间距 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left center;
}

.toc-item:hover {
  transform: translateX(3px); /* 减少移动距离 */
}

.h3-item {
  padding-left: 16px; /* 减少缩进 */
  font-size: 0.88em;
  margin: 2px 0; /* 减少间距 */
  opacity: 0.85;
}

.toc-link {
  display: flex;
  align-items: center;
  padding: 6px 10px; /* 减少内边距 */
  border-radius: 8px; /* 减小圆角 */
  color: #64748b;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  font-size: 0.9rem; /* 稍微减小字体 */
  line-height: 1.4;
  position: relative;
  overflow: hidden;
}

.toc-link::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: linear-gradient(90deg, rgba(0, 188, 212, 0.1), transparent);
  transition: width 0.3s ease;
}

.toc-link:hover::before {
  width: 100%;
}

.h2-marker,
.h3-marker {
  display: inline-block;
  margin-right: 8px; /* 减少右边距 */
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.h2-marker {
  width: 7px; /* 减小尺寸 */
  height: 7px;
  background: linear-gradient(135deg, rgba(0, 188, 212, 0.4), rgba(85, 194, 187, 0.4));
  border-radius: 50%;
  position: relative;
}

.h2-marker::after {
  content: "";
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background: white;
  transition: opacity 0.3s ease;
}

.h3-marker {
  width: 5px; /* 减小尺寸 */
  height: 5px;
  border: 1.5px solid rgba(0, 188, 212, 0.4);
  border-radius: 50%;
  background: transparent;
}

.toc-link:hover {
  color: #0098a1;
  background-color: rgba(0, 188, 212, 0.08);
  padding-left: 14px; /* 减少hover时的padding变化 */
}

.toc-link:hover .h2-marker,
.toc-link:hover .h3-marker {
  transform: scale(1.15); /* 稍微减少放大效果 */
}

.toc-link.active {
  color: #0098a1;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(85, 194, 187, 0.05) 100%);
  box-shadow: 0 2px 8px rgba(0, 188, 212, 0.15);
}

.toc-link.active .h2-marker {
  background: linear-gradient(135deg, #008794, #5dcac6);
  box-shadow: 0 0 12px rgba(0, 135, 148, 0.4);
}

.toc-link.active .h2-marker::after {
  opacity: 0;
}

.toc-link.active .h3-marker {
  border-color: #008794;
  background: rgba(0, 135, 148, 0.3);
  box-shadow: 0 0 8px rgba(0, 135, 148, 0.3);
}

.no-headings {
  padding: 2rem;
  color: #94a3b8;
  font-style: italic;
  font-size: 0.95rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(0, 188, 212, 0.05) 0%, transparent 100%);
  border-radius: 12px;
  border: 1px dashed rgba(0, 188, 212, 0.2);
}

@media (max-width: 768px) {
  .toc-item {
    margin: 4px 0;
  }

  .toc-link {
    padding: 5px 8px;
    font-size: 0.9rem;
  }
}

:deep(.toc-panel-enter-active),
:deep(.toc-panel-leave-active) {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

:deep(.toc-panel-enter-from),
:deep(.toc-panel-leave-to) {
  opacity: 0;
  transform: translateY(14px) scale(0.96);
}
</style>
