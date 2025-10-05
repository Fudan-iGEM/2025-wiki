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
        ref="tocPanelRef"
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
const tocPanelRef = ref(null);
const panelId = "custom-toc-panel";
let resizeTimer = null;
let scrollUpdateRaf = null;
let gsapInstance = null;
let gsapImportPromise = null;
let activeLinkTween = null;
let componentUnmounted = false;

const scrollTweens = new WeakMap();
const activeScrollTweens = new Set();

function primeGsap() {
  if (gsapInstance) {
    return Promise.resolve(gsapInstance);
  }
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }
  if (!gsapImportPromise) {
    gsapImportPromise = import("gsap")
      .then((module) => {
        const gsap = module?.gsap || module?.default || module;
        gsapInstance = gsap || null;
        return gsapInstance;
      })
      .catch((error) => {
        console.warn("Failed to load GSAP:", error);
        gsapInstance = null;
        return null;
      });
  }
  return gsapImportPromise;
}

function isReducedMotionPreferred() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function smoothScrollTo(element, top) {
  if (!element) {
    return;
  }

  const existingTween = scrollTweens.get(element);
  if (existingTween) {
    existingTween.kill();
    activeScrollTweens.delete(existingTween);
    scrollTweens.delete(element);
  }

  const gsap = gsapInstance;
  if (!gsap || isReducedMotionPreferred()) {
    primeGsap();
    element.scrollTop = top;
    return;
  }

  const current = element.scrollTop;
  if (Math.abs(current - top) < 1) {
    element.scrollTop = top;
    return;
  }

  const tween = gsap.to(element, {
    scrollTop: top,
    duration: 0.45,
    ease: "power2.out",
    onComplete: () => {
      activeScrollTweens.delete(tween);
      if (scrollTweens.get(element) === tween) {
        scrollTweens.delete(element);
      }
    },
    onInterrupt: () => {
      activeScrollTweens.delete(tween);
      if (scrollTweens.get(element) === tween) {
        scrollTweens.delete(element);
      }
    },
  });

  scrollTweens.set(element, tween);
  activeScrollTweens.add(tween);
}

onMounted(async () => {
  await primeGsap();
  updateViewportState();
  isPanelOpen.value = isMobile.value ? false : true;

  // Give the page content time to render fully
  setTimeout(() => {
    updateHeadings();
    initIntersectionObserver();
    updateActiveHeadingFromScroll();
  }, 300);

  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScrollSpy, { passive: true });
});

onUnmounted(() => {
  componentUnmounted = true;
  if (observer.value) {
    observer.value.disconnect();
  }
  if (resizeTimer) {
    clearTimeout(resizeTimer);
    resizeTimer = null;
  }
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", handleScrollSpy);
  if (scrollUpdateRaf !== null) {
    cancelAnimationFrame(scrollUpdateRaf);
    scrollUpdateRaf = null;
  }
  if (activeLinkTween) {
    activeLinkTween.kill();
    activeLinkTween = null;
  }
  activeScrollTweens.forEach((tween) => tween.kill());
  activeScrollTweens.clear();
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
      updateActiveHeadingFromScroll();
    }, 500);
  }
);

watch(isMobile, (mobile) => {
  isPanelOpen.value = mobile ? false : true;
  if (!mobile && headings.value.length) {
    primeGsap();
    nextTick(() => {
      scrollActiveHeadingIntoView();
      animateActiveHeading();
    });
  }
});

function togglePanel() {
  isPanelOpen.value = !isPanelOpen.value;
  if (isPanelOpen.value) {
    primeGsap();
    nextTick(() => {
      scrollActiveHeadingIntoView();
      animateActiveHeading();
    });
  }
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
    updateActiveHeadingFromScroll();
  });
}

function initIntersectionObserver() {
  if (observer.value) {
    observer.value.disconnect();
  }

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
        // Pick the first visible heading in document order
        const activeHeadingId = headings.value.find((h) => visibleHeadings.includes(h.id))?.id;
        if (activeHeadingId) {
          setActiveHeading(activeHeadingId);
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
    setActiveHeading(id);

    // Scroll to the element with offset for fixed headers
    const yOffset = -100;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });

    if (isMobile.value) {
      isPanelOpen.value = false;
    }
  }
}

function setActiveHeading(targetId) {
  if (!headings.value.length) {
    return;
  }

  const currentActiveId = headings.value.find((h) => h.isActive)?.id;

  if (!targetId) {
    if (!currentActiveId) {
      return;
    }
    headings.value.forEach((h) => (h.isActive = false));
    return;
  }

  if (currentActiveId === targetId) {
    return;
  }

  headings.value.forEach((h) => {
    h.isActive = h.id === targetId;
  });

  primeGsap();
  nextTick(() => {
    scrollActiveHeadingIntoView();
    animateActiveHeading();
  });
}

function scrollActiveHeadingIntoView() {
  requestAnimationFrame(() => {
    const panel = tocPanelRef.value || document.querySelector(".custom-toc .toc-panel");
    const activeLink = panel?.querySelector(".toc-link.active");
    if (!activeLink) {
      return;
    }

    const scrollableAncestors = [];
    let ancestor = activeLink.parentElement;
    while (ancestor && ancestor !== document.body) {
      const style = window.getComputedStyle(ancestor);
      const canScrollY = /(auto|scroll)/.test(style.overflowY);
      if (canScrollY && ancestor.scrollHeight > ancestor.clientHeight) {
        scrollableAncestors.push(ancestor);
      }
      ancestor = ancestor.parentElement;
    }

    if (scrollableAncestors.length === 0) {
      activeLink.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      return;
    }

    const padding = 24;
    const linkRect = activeLink.getBoundingClientRect();
    const tocItem = activeLink.closest(".toc-item");
    const isFirstLink = tocItem ? !tocItem.previousElementSibling : false;
    const isLastLink = tocItem ? !tocItem.nextElementSibling : false;

    scrollableAncestors.forEach((container) => {
      if (isFirstLink && container.scrollTop > 0) {
        smoothScrollTo(container, 0);
        return;
      }

      if (isLastLink) {
        const maxScrollTop = container.scrollHeight - container.clientHeight;
        if (maxScrollTop > 0 && container.scrollTop < maxScrollTop) {
          smoothScrollTo(container, maxScrollTop);
          return;
        }
      }

      const containerRect = container.getBoundingClientRect();
      const isAbove = linkRect.top < containerRect.top + padding;
      const isBelow = linkRect.bottom > containerRect.bottom - padding;

      if (isAbove) {
        const rawTarget = container.scrollTop + (linkRect.top - containerRect.top) - padding;
        const maxScrollTop = container.scrollHeight - container.clientHeight;
        const target = Math.min(Math.max(rawTarget, 0), maxScrollTop);
        smoothScrollTo(container, target);
      } else if (isBelow) {
        const rawTarget = container.scrollTop + (linkRect.bottom - containerRect.bottom) + padding;
        const maxScrollTop = container.scrollHeight - container.clientHeight;
        const target = Math.min(Math.max(rawTarget, 0), maxScrollTop);
        smoothScrollTo(container, target);
      }
    });
  });
}

function animateActiveHeading() {
  if (componentUnmounted || isReducedMotionPreferred()) {
    return;
  }

  const panel = tocPanelRef.value || document.querySelector(".custom-toc .toc-panel");
  const activeLink = panel?.querySelector(".toc-link.active");
  if (!activeLink) {
    return;
  }

  const gsap = gsapInstance;
  if (!gsap) {
    primeGsap().then((loaded) => {
      if (!loaded || componentUnmounted) {
        return;
      }
      requestAnimationFrame(() => animateActiveHeading());
    });
    return;
  }

  if (activeLinkTween) {
    activeLinkTween.kill();
    activeLinkTween = null;
  }

  const marker = activeLink.querySelector(".h2-marker, .h3-marker");
  activeLinkTween = gsap.timeline({ defaults: { ease: "power2.out" } });

  activeLinkTween.fromTo(
    activeLink,
    { x: -14, opacity: 0.85 },
    { x: 0, opacity: 1, duration: 0.32 }
  );

  if (marker) {
    activeLinkTween.fromTo(
      marker,
      { scale: 0.85 },
      { scale: 1.12, duration: 0.38, ease: "back.out(2.1)" },
      "<"
    );
    activeLinkTween.to(marker, { scale: 1, duration: 0.2, ease: "power1.out" }, "-=0.18");
  }

  activeLinkTween.eventCallback("onComplete", () => {
    if (activeLinkTween) {
      activeLinkTween.kill();
      activeLinkTween = null;
    }
  });

  activeLinkTween.eventCallback("onInterrupt", () => {
    if (activeLinkTween) {
      activeLinkTween.kill();
      activeLinkTween = null;
    }
  });
}

function handleScrollSpy() {
  if (scrollUpdateRaf !== null) {
    return;
  }

  scrollUpdateRaf = requestAnimationFrame(() => {
    scrollUpdateRaf = null;
    updateActiveHeadingFromScroll();
  });
}

function updateActiveHeadingFromScroll() {
  if (!headings.value.length) {
    return;
  }

  const scrollY = window.scrollY || window.pageYOffset;
  if (scrollY < 120) {
    setActiveHeading(headings.value[0]?.id);
    return;
  }

  const offset = 140;
  let candidate = headings.value[0];

  for (const heading of headings.value) {
    const element = document.getElementById(heading.id);
    if (!element) {
      continue;
    }

    const rect = element.getBoundingClientRect();
    if (rect.top <= offset) {
      candidate = heading;
    } else if (!candidate) {
      candidate = heading;
    } else {
      break;
    }
  }

  if (candidate) {
    setActiveHeading(candidate.id);
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
