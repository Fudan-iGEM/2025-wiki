<template>
  <nav 
    class="ModernNavbar"
    :class="{ 
      'navbar-hidden': !isVisible,
      'navbar-visible': isVisible,
      'navbar-pinned': isPinned
    }"
    :style="{ transform: `translateY(${navTranslateY}px)` }"
    @mouseenter="handleNavbarHover"
    @mouseleave="handleNavbarLeave"
  >
    <div class="container">
      <a href="/fudan" class="title">
        <!-- Add Logo SVG or Image here if available -->
        <img src="https://static.igem.wiki/teams/5643/img/logo-top.svg" style="height: 43px" />
      </a>
      <!-- Desktop Navigation -->
      <div class="nav-links-desktop">
        <div
          v-for="(item, index) in navItems"
          :key="index"
          class="nav-item"
          @mouseenter="showDropdown(index)"
          @mouseleave="hideDropdown"
        >
          <a
            :href="item.link || '#'"
            :target="item.external ? '_blank' : '_self'"
            class="nav-link"
          >
            {{ item.text }}
            <span v-if="item.items && item.items.length" class="arrow"></span>
          </a>
          <div
            v-if="item.items && item.items.length"
            class="dropdown-menu"
            :class="{ 'is-active': activeDropdown === index }"
            @mouseenter="showDropdown(index)"
            @mouseleave="hideDropdown"
          >
            <div class="dropdown-grid">
              <a
                v-for="(subItem, subIndex) in item.items"
                :key="subIndex"
                :href="subItem.link"
                class="dropdown-item"
              >
                <div class="dropdown-item-icon">
                  <!-- Project icons -->
                  <svg
                    v-if="subItem.icon === 'contribution'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'description'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2h12a2 2 0 0 0 2-2V8z"
                    ></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'design'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                    <path d="M2 2l7.586 7.586"></path>
                    <circle cx="11" cy="11" r="2"></circle>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'engineering'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M14.31 8l5.74 9.94"></path>
                    <path d="M9.69 8h11.48"></path>
                    <path d="M7.38 12l5.74-9.94"></path>
                    <path d="M9.69 16L3.95 6.06"></path>
                    <path d="M14.31 16H2.83"></path>
                    <path d="M16.62 12l-5.74 9.94"></path>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'implementation'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'notebook'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'results'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                    <line x1="2" y1="20" x2="22" y2="20"></line>
                  </svg>

                  <!-- Technology icons -->
                  <svg
                    v-else-if="subItem.icon === 'experiments'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 3L9 21"></path>
                    <path d="M9 8L21 8"></path>
                    <path d="M15 14L21 14"></path>
                    <path d="M15 21L21 21"></path>
                    <path d="M21 3L3 3"></path>
                    <path
                      d="M6 11C4.34315 11 3 9.65685 3 8C3 6.34315 4.34315 5 6 5C7.65685 5 9 6.34315 9 8C9 9.65685 7.65685 11 6 11Z"
                    ></path>
                    <path
                      d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'measurement'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'improve'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <line x1="19" y1="8" x2="19" y2="14"></line>
                    <line x1="16" y1="11" x2="22" y2="11"></line>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'part-collection'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                    ></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'parts'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'safety'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'software'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'hardware'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="1" x2="9" y2="4"></line>
                    <line x1="15" y1="1" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="23"></line>
                    <line x1="15" y1="20" x2="15" y2="23"></line>
                    <line x1="20" y1="9" x2="23" y2="9"></line>
                    <line x1="20" y1="14" x2="23" y2="14"></line>
                    <line x1="1" y1="9" x2="4" y2="9"></line>
                    <line x1="1" y1="14" x2="4" y2="14"></line>
                  </svg>

                  <!-- Community icons -->
                  <svg
                    v-else-if="subItem.icon === 'education'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'entrepreneurship'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'inclusivity'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'human-practices'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'presentation'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'promotion-video'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'sustainable'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path
                      d="M21 12v10h-7v-8.5h-4V22H3v-8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1z"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'wiki'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"
                    ></path>
                  </svg>

                  <!-- Team icons -->
                  <svg
                    v-else-if="subItem.icon === 'attributions'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'collaborations'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                    ></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'heritage'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <svg
                    v-else-if="subItem.icon === 'team'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>

                  <!-- Default icon as fallback -->
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
                <div class="dropdown-item-content">
                  <div class="dropdown-item-title">{{ subItem.title }}</div>
                  <div class="dropdown-item-description">{{ subItem.description }}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Search Component -->
      <div class="search-container" :class="{ 'menu-open': isMobileMenuOpen }">
        <VPNavBarSearch />
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        class="mobile-menu-toggle"
        :class="{ 'is-active': isMobileMenuOpen }"
        @click="toggleMobileMenu"
      >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>

    <!-- Mobile Navigation Menu -->
    <div class="mobile-nav-links" :class="{ 'is-open': isMobileMenuOpen }">
      <div v-for="(item, index) in navItems" :key="index" class="mobile-nav-item">
        <a
          :href="item.link || '#'"
          :target="item.external ? '_blank' : '_self'"
          @click="
            item.items && item.items.length
              ? toggleMobileSubmenu(index, $event)
              : closeMobileMenu($event)
          "
        >
          {{ item.text }}
          <span
            v-if="item.items && item.items.length"
            class="arrow"
            :class="{ open: activeMobileSubmenu === index }"
          ></span>
        </a>
        <div
          v-if="item.items && item.items.length && activeMobileSubmenu === index"
          class="mobile-submenu"
        >
          <a
            v-for="(subItem, subIndex) in item.items"
            :key="subIndex"
            :href="subItem.link"
            @click="closeMobileMenu($event)"
          >
            {{ subItem.title }}
          </a>
        </div>
      </div>
    </div>
    <!-- Overlay for mobile menu -->
    <div
      v-if="isMobileMenuOpen"
      class="mobile-menu-overlay"
      :class="{ show: isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useScroll, useWindowScroll, useThrottleFn, useDebounce } from "@vueuse/core";
import { gsap } from "gsap";
import VPNavBarSearch from "vitepress/dist/client/theme-default/components/VPNavBarSearch.vue";
import "../theme/tw.css";

const navItems = ref([
  {
    text: "Project",
    items: [
      {
        icon: "contribution",
        title: "Contribution",
        description: "Team contributions to the project",
        link: "/fudan/contribution",
      },
      {
        icon: "description",
        title: "Description",
        description: "Overview of the project",
        link: "/fudan/description",
      },
      {
        icon: "design",
        title: "Design",
        description: "Project design process and methodology",
        link: "/fudan/design",
      },
      {
        icon: "engineering",
        title: "Engineering",
        description: "Engineering aspects of the project",
        link: "/fudan/engineering",
      },
      {
        icon: "implementation",
        title: "Implementation",
        description: "Implementation details and strategies",
        link: "/fudan/implementation",
      },
      {
        icon: "notebook",
        title: "Notebook",
        description: "Lab notebook and documentation",
        link: "/fudan/notebook",
      },
      {
        icon: "results",
        title: "Results",
        description: "Project outcomes and findings",
        link: "/fudan/results",
      },
    ],
  },
  {
    text: "Technology",
    items: [
      {
        icon: "experiments",
        title: "Experiments",
        description: "Experimental protocols and methods",
        link: "/fudan/experiments",
      },
      {
        icon: "measurement",
        title: "Measurement",
        description: "Measurement techniques and data analysis",
        link: "/fudan/measurement",
      },
      {
        icon: "improve",
        title: "Improved Parts",
        description: "Enhanced biological components",
        link: "/fudan/improve",
      },
      {
        icon: "part-collection",
        title: "Part Collection",
        description: "Catalog of biological parts",
        link: "/fudan/part-collection",
      },
      {
        icon: "parts",
        title: "Parts List",
        description: "Comprehensive parts inventory",
        link: "/fudan/parts",
      },
      {
        icon: "safety",
        title: "Safety",
        description: "Safety procedures and considerations",
        link: "/fudan/safety",
      },
      {
        icon: "software",
        title: "Software",
        description: "Software tools and applications",
        link: "/fudan/software",
      },
    ],
  },
  {
    text: "Community",
    items: [
      {
        icon: "education",
        title: "Education",
        description: "Educational outreach and materials",
        link: "/fudan/education",
      },
      {
        icon: "entrepreneurship",
        title: "Entrepreneurship",
        description: "Business and entrepreneurial aspects",
        link: "/fudan/entrepreneurship",
      },
      {
        icon: "inclusivity",
        title: "Inclusivity",
        description: "Inclusive practices and approaches",
        link: "/fudan/inclusivity",
      },
      {
        icon: "human-practices",
        title: "Integrated HP",
        description: "Human practices integration",
        link: "/fudan/human-practices",
      },
      {
        icon: "presentation",
        title: "Presentation",
        description: "Project presentation",
        link: "https://teams.igem.org/5643/project-presentation",
      },
      {
        icon: "promotion-video",
        title: "Promotion video",
        description: "Project promotional video",
        link: "https://video.igem.org/w/nri1zca7eHRFtGVEZWxfqe",
      },
      {
        icon: "sustainable",
        title: "Sustainable",
        description: "Sustainability aspects of the project",
        link: "/fudan/sustainable",
      },
      {
        icon: "wiki",
        title: "Wiki @gitlab",
        description: "Project wiki hosted on GitLab",
        link: "https://gitlab.igem.org/2025/fudan/",
      },
    ],
  },
  {
    text: "Team",
    items: [
      {
        icon: "attributions",
        title: "Attributions",
        description: "Recognition of contributions",
        link: "/fudan/attributions",
      },
      {
        icon: "collaborations",
        title: "Collaborations",
        description: "Collaborative partnerships",
        link: "/fudan/collaborations",
      },
      {
        icon: "heritage",
        title: "Heritage",
        description: "Team history and legacy",
        link: "/fudan/heritage",
      },
      {
        icon: "team",
        title: "Members",
        description: "Team member profiles",
        link: "/fudan/team",
      },
    ],
  },
]);

const socialLinks = ref([{ icon: "gitlab", link: "https://gitlab.igem.org/2025/fudan/" }]);

const activeDropdown = ref(null);
const isMobileMenuOpen = ref(false);
const activeMobileSubmenu = ref(null);
let hideTimeout = null;

// 智能隐藏导航栏相关变量
const isVisible = ref(true);
const isPinned = ref(false);
const navTranslateY = ref(0);
const lastScrollY = ref(0);
const scrollDirection = ref('up');
const scrollOffset = 5; // 滚动偏移量阈值
const navbarHeight = 70; // 导航栏高度

// 使用 @vueuse/core 的 useWindowScroll 来监听滚动
const { y: currentScrollY } = useWindowScroll();

// 使用节流函数优化性能
const handleScroll = useThrottleFn(() => {
  const scrollY = currentScrollY.value;
  const diff = scrollY - lastScrollY.value;
  
  // 在页面顶部时始终显示
  if (scrollY <= navbarHeight) {
    isVisible.value = true;
    animateNavbar(0, 0.25); // 快速显示
    isPinned.value = true;
    lastScrollY.value = scrollY;
    return;
  } else {
    isPinned.value = false;
  }
  
  // 判断滚动方向 - 降低阈值以提高响应性
  if (Math.abs(diff) < 2) {
    lastScrollY.value = scrollY;
    return;
  }
  
  // 向下滚动时隐藏
  if (diff > 0 && scrollY > navbarHeight) {
    scrollDirection.value = 'down';
    if (isVisible.value) {
      isVisible.value = false;
      animateNavbar(-navbarHeight + 3, 0.35); // 使用 GSAP 动画
    }
  } 
  // 向上滚动时显示 - 移除额外条件，提高响应性
  else if (diff < 0) {
    scrollDirection.value = 'up';
    if (!isVisible.value) {
      isVisible.value = true;
      animateNavbar(0, 0.25); // 更快的显示动画
    }
  }
  
  lastScrollY.value = scrollY;
}, 50); // 减少节流时间以提高响应性

// 使用 GSAP 进行动画
const animateNavbar = (targetY, duration = 0.3) => {
  gsap.to('.ModernNavbar', {
    y: targetY,
    duration: duration,
    ease: 'power2.inOut',
    onUpdate: () => {
      navTranslateY.value = gsap.getProperty('.ModernNavbar', 'y');
    }
  });
};

// 鼠标悬停在导航栏区域时显示
const handleNavbarHover = () => {
  if (!isVisible.value && currentScrollY.value > navbarHeight) {
    isVisible.value = true; // 立即设置为可见
    animateNavbar(0, 0.2); // 更快的悬停响应
  }
};

// 鼠标离开导航栏区域时恢复隐藏状态
const handleNavbarLeave = () => {
  if (currentScrollY.value > navbarHeight && scrollDirection.value === 'down') {
    setTimeout(() => {
      // 检查鼠标是否仍在导航栏外且向下滚动
      if (currentScrollY.value > navbarHeight && scrollDirection.value === 'down') {
        isVisible.value = false;
        animateNavbar(-navbarHeight + 3, 0.25);
      }
    }, 150); // 稍微增加延迟，避免鼠标快速移动时的闪烁
  }
};

// 监听滚动变化
watch(currentScrollY, () => {
  handleScroll();
});

// 用于测试按钮
function showAlert(msg) {
  window.alert(msg);
}

function showDropdown(index) {
  console.log("Showing dropdown", index);
  if (hideTimeout) clearTimeout(hideTimeout);
  activeDropdown.value = index;
}

function hideDropdown() {
  console.log("Hiding dropdown");
  // Delay hiding to allow moving cursor into the dropdown
  hideTimeout = setTimeout(() => {
    activeDropdown.value = null;
  }, 150);
}

function toggleMobileMenu(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  isMobileMenuOpen.value = !isMobileMenuOpen.value;

  // Close all submenus when toggle menu
  activeMobileSubmenu.value = null;

  // Prevent body scroll when menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
    // Add a smooth transition for menu items
    setTimeout(() => {
      const mobileItems = document.querySelectorAll(".mobile-nav-item");
      mobileItems.forEach((item, i) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, i * 50); // Stagger the animation
      });
    }, 100);
  } else {
    document.body.style.overflow = "";
    // Reset styles when closing
    const mobileItems = document.querySelectorAll(".mobile-nav-item");
    mobileItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(-10px)";
    });
  }
}

function closeMobileMenu(event) {
  if (event) {
    event.preventDefault();
  }
  isMobileMenuOpen.value = false;
  activeMobileSubmenu.value = null;
  document.body.style.overflow = "";
}

function toggleMobileSubmenu(index, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (activeMobileSubmenu.value === index) {
    // Add animation to close submenu
    const submenu = event.target.nextElementSibling;
    if (submenu) {
      submenu.style.maxHeight = "0px";
      setTimeout(() => {
        activeMobileSubmenu.value = null;
      }, 300); // Delay to match transition
    } else {
      activeMobileSubmenu.value = null;
    }
  } else {
    activeMobileSubmenu.value = index;
    // Allow time for the DOM to update, then animate opening
    setTimeout(() => {
      const submenu = document.querySelector(`.mobile-submenu`);
      if (submenu) {
        submenu.classList.add("active");
      }
    }, 10);
  }
}

const handleResize = () => {
  if (window.innerWidth > 768 && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

onMounted(() => {
  console.log("Navbar component mounted");
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }
});
</script>

<style scoped>
.ModernNavbar {
  background: rgba(255, 255, 255, 0.95);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 135, 148, 0.1);
  padding: 0.5rem 1.5rem;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  box-shadow: 0 2px 20px rgba(0, 135, 148, 0.08), 
              0 1px 0 rgba(255, 255, 255, 0.1) inset;
  pointer-events: auto;
  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1),
              opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1),
              box-shadow 0.3s ease;
  will-change: transform;
}

/* 智能隐藏相关样式 */
.navbar-hidden {
  opacity: 0.98;
  /* 不禁用pointer-events，以便能够检测鼠标悬停 */
}

.navbar-visible {
  opacity: 1;
  pointer-events: auto;
}

.navbar-pinned {
  box-shadow: 0 1px 10px rgba(0, 135, 148, 0.05);
}

/* 为隐藏时的顶部边缘添加悬停区域 */
.ModernNavbar::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  height: 20px;
  background: transparent;
  pointer-events: auto;
}

.ModernNavbar:hover {
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid rgba(0, 135, 148, 0.15);
  box-shadow: 0 4px 24px rgba(0, 135, 148, 0.12), 
              0 1px 0 rgba(255, 255, 255, 0.2) inset;
}

.container {
  max-width: 1280px; /* Adjust max-width as needed */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* 确保子元素定位正确 */
  height: 50px; /* Reduced from 60px to 50px */
  padding: 0 1.5rem; /* 确保所有屏幕尺寸都有适当的内边距 */
}

.title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a202c; /* Darker text */
  text-decoration: none;
  display: flex;
  align-items: center;
  flex: 0 0 180px; /* Fixed width without growing */
  position: absolute;
  left: 0; /* 相对于容器的左边距，由容器的padding控制 */
  z-index: 2;
}

.search-container {
  display: flex;
  align-items: center;
  position: absolute;
  right: 70px; /* 默认移动端位置，为移动菜单按钮留出空间 */
  z-index: 50; /* 降低z-index，确保移动菜单和遮罩能覆盖在上面 */
}

/* Ensure VitePress search modal appears correctly */
.search-container :deep(.DocSearch-Button) {
  background: transparent;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  margin: 0;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1; /* 确保搜索按钮在正常情况下可见，但低于移动菜单 */
}

.search-container :deep(.DocSearch-Button:hover) {
  background: rgba(0, 135, 148, 0.05);
  box-shadow: 0 2px 8px rgba(0, 135, 148, 0.08);
}

/* 当移动菜单打开时，降低搜索容器的可见性 */
.search-container.menu-open {
  pointer-events: none; /* 禁用搜索框的点击事件 */
  opacity: 0.3; /* 降低透明度表示不可用 */
  transition: opacity 0.3s ease;
}

/* 确保VitePress搜索模态框的z-index低于移动菜单 */
:deep(.DocSearch-Modal) {
  z-index: 80 !important; /* 低于移动菜单的100，但高于遮罩的90 */
}

/* 桌面端为搜索按钮添加微妙的样式 */
@media (min-width: 1000px) {
  .search-container :deep(.DocSearch-Button) {
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(0, 135, 148, 0.1);
  }

  .search-container :deep(.DocSearch-Button:hover) {
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(0, 135, 148, 0.2);
    box-shadow: 0 2px 12px rgba(0, 135, 148, 0.1);
  }
}

.nav-links-desktop {
  display: none; /* Hidden by default, shown on larger screens */
  align-items: center;
  justify-content: center; /* 居中显示导航项 */
  gap: 2.5rem; /* 增加间距，使布局更宽松 */
  pointer-events: auto; /* 确保能接收鼠标事件 */
  flex: 1; /* 占据剩余空间 */
  margin: 0 auto; /* 两边留白，实现居中效果 */
  padding: 0; /* 为导航区域添加内边距 */
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
}

.nav-item {
  position: relative; /* For dropdown positioning */
  cursor: pointer; /* 添加指针样式表明可交互 */
  text-align: center; /* 确保文本居中 */
}

.nav-link {
  color: #4a5568;
  text-decoration: none;
  font-size: 1.05rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  pointer-events: auto;
  font-weight: 600;
  position: relative;
  background: transparent;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 135, 148, 0.08), rgba(93, 202, 198, 0.05));
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-link:hover {
  color: #008794;
  transform: translateY(-1px);
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link .arrow {
  margin-left: 0.3rem;
  border: solid #4a5568;
  border-width: 0 1.5px 1.5px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  transition: transform 0.2s ease-in-out;
}
.nav-link:hover .arrow {
  border-color: #2d3748;
}

/* --- Dropdown Menu --- */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.95);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 135, 148, 0.12),
              0 2px 0 rgba(255, 255, 255, 0.1) inset;
  padding: 1rem;
  min-width: 435px;
  z-index: 101;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(93, 202, 198, 0.15);
  pointer-events: none;
  transform-origin: top center;
}

.dropdown-menu.is-active {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}

.dropdown-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  gap: 1rem;
}

.dropdown-item {
  display: flex;
  align-items: flex-start; /* Align icon top */
  padding: 0.75rem;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  color: inherit;
  cursor: pointer; /* 添加指针样式表明可交互 */
  position: relative;
  overflow: hidden;
}

.dropdown-item:hover {
  background-color: #f7fafc; /* Light background on hover */
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.dropdown-item:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #008794;
  transition: width 0.3s ease;
}

.dropdown-item:hover:after {
  width: 100%;
}

.dropdown-item-icon {
  margin-right: 0.75rem;
  flex-shrink: 0;
  color: #0e9f99; /* Example icon color */
  transition: transform 0.3s ease;
}

.dropdown-item:hover .dropdown-item-icon {
  transform: scale(1.1);
  color: #008794;
}

.dropdown-item-content {
  flex-grow: 1;
  text-align: left; /* Ensure content is left-aligned */
}

.dropdown-item-title {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
  text-align: left; /* Explicitly set left alignment for title */
}

.dropdown-item-description {
  font-size: 0.85rem;
  color: #718096; /* Lighter gray for description */
  line-height: 1.4;
  text-align: left; /* Explicitly set left alignment for description */
}

/* --- Mobile Menu --- */
.mobile-menu-toggle {
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: auto;
  z-index: 102;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: absolute;
  right: 0; /* 相对于容器的右边距，由容器的padding控制 */
  z-index: 2;
}

.mobile-menu-toggle:hover {
  background-color: #f1f5f9;
  transform: scale(1.05);
}

.mobile-menu-toggle .icon-bar {
  display: block;
  width: 22px;
  height: 2px;
  background-color: #2d3748;
  margin: 3px 0;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

/* Animate hamburger to X when open */
.mobile-menu-toggle.is-active {
  background-color: #f1f5f9;
}

.mobile-menu-toggle.is-active .icon-bar:nth-child(1) {
  transform: rotate(45deg) translate(4px, 4px);
  background-color: #008794;
}

.mobile-menu-toggle.is-active .icon-bar:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}

.mobile-menu-toggle.is-active .icon-bar:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -5px);
  background-color: #008794;
}

.mobile-nav-links {
  display: none;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 135, 148, 0.1);
  box-shadow: 0 8px 32px rgba(0, 135, 148, 0.12),
              0 1px 0 rgba(255, 255, 255, 0.1) inset;
  padding: 0;
  max-height: calc(100vh - 50px);
  overflow-y: auto;
  z-index: 100;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-nav-links.is-open {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animation for mobile menu items */
.mobile-nav-item {
  border-bottom: 1px solid #edf2f7;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.mobile-nav-links.is-open .mobile-nav-item {
  opacity: 1;
  transform: translateY(0);
}

.mobile-nav-links.is-open .mobile-nav-item:nth-child(1) {
  transition-delay: 0.1s;
}

.mobile-nav-links.is-open .mobile-nav-item:nth-child(2) {
  transition-delay: 0.15s;
}

.mobile-nav-links.is-open .mobile-nav-item:nth-child(3) {
  transition-delay: 0.2s;
}

.mobile-nav-links.is-open .mobile-nav-item:nth-child(4) {
  transition-delay: 0.25s;
}

.mobile-nav-item > a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  color: #2d3748;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.mobile-nav-item > a:hover,
.mobile-nav-item > a:active {
  background-color: #f7fafc;
}

.mobile-nav-item .arrow {
  margin-left: 0.5rem;
  border: solid #4a5568;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  transition: transform 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.mobile-nav-item .arrow.open {
  transform: rotate(-135deg);
  border-color: #008794;
}

.mobile-submenu {
  background-color: #f9fafb;
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-submenu.active {
  max-height: 500px;
}

.mobile-submenu a {
  display: block;
  padding: 0.75rem 2.5rem;
  color: #4a5568;
  text-decoration: none;
  font-size: 0.9rem;
  border-bottom: 1px solid #edf2f7;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.mobile-submenu a:last-child {
  border-bottom: none;
}

.mobile-submenu a:hover,
.mobile-submenu a:active {
  background-color: #edf2f7;
  color: #008794;
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 90;
  opacity: 0;
  backdrop-filter: blur(2px);
  transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
}

.mobile-menu-overlay.show {
  opacity: 1;
}

/* --- Responsive --- */
@media (min-width: 1000px) {
  /* Changed from 992px to 1000px */
  .nav-links-desktop {
    display: flex;
    pointer-events: auto;
  }

  .container {
    justify-content: center; /* 容器整体居中对齐 */
  }

  .search-container {
    position: absolute;
    right: 50px; /* 在桌面端移动菜单按钮隐藏时，搜索框可以更靠近右边 */
  }

  .mobile-menu-toggle {
    flex: 0 0 180px; /* 与左侧标题相同宽度，保持对称 */
    justify-content: flex-end;
    display: none;
  }
}

/* Fix for smaller screens */
@media (max-width: 999px) {
  /* Changed from 991px to 999px to match the new breakpoint */

  .title {
    font-size: 1.2rem;
    max-width: none;
  }

  .search-container {
    position: absolute;
    right: 70px; /* 在移动菜单按钮前留出足够空间 */
  }

  .nav-links-desktop {
    display: none !important;
  }

  .dropdown-menu {
    min-width: 90vw;
    left: 5vw;
    transform: none;
  }
}

/* Even smaller screens - adjust mobile menu styling */
@media (max-width: 480px) {
  .mobile-nav-links {
    padding: 0;
  }

  .mobile-nav-item > a {
    padding: 0.75rem 1.25rem; /* Slightly reduced padding */
  }

  .mobile-submenu a {
    font-size: 0.85rem;
    padding: 0.75rem 2rem;
  }

  .title {
    font-size: 1.1rem;
  }

  .search-container {
    right: 55px; /* 为小屏幕优化位置，确保不与移动菜单按钮重叠 */
  }

  .mobile-menu-toggle {
    width: 40px;
    height: 40px;
  }
}
</style>
