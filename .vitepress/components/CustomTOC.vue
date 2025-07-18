<template>
  <div class="custom-toc">
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
    <div v-if="headings.length === 0" class="no-headings">
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

onMounted(() => {
  // Give the page content time to render fully
  setTimeout(() => {
    updateHeadings();
    initIntersectionObserver();
    window.addEventListener("resize", handleResize);
  }, 300);
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
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
    }, 500);
  }
);

function handleResize() {
  // Debounce the resize handling
  clearTimeout(window.resizeTimer);
  window.resizeTimer = setTimeout(() => {
    updateHeadings();
  }, 200);
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
  }
}
</script>

<style scoped>
.custom-toc {
  width: 100%;
  position: relative;
  /* Removed max-height and overflow properties to prevent nested scrollbars */
}

.toc-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin: 10px 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left center;
}

.toc-item:hover {
  transform: translateX(4px);
}

.h3-item {
  padding-left: 20px;
  font-size: 0.9em;
  margin: 8px 0;
  opacity: 0.9;
}

.toc-link {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 12px;
  color: #64748b;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.5;
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
  margin-right: 10px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.h2-marker {
  width: 10px;
  height: 10px;
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
  width: 8px;
  height: 8px;
  border: 2px solid rgba(0, 188, 212, 0.4);
  border-radius: 50%;
  background: transparent;
}

.toc-link:hover {
  color: #0098a1;
  background-color: rgba(0, 188, 212, 0.08);
  padding-left: 18px;
}

.toc-link:hover .h2-marker,
.toc-link:hover .h3-marker {
  transform: scale(1.2);
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
</style>
