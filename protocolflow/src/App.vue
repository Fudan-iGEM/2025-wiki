<template>
  <div class="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-brand">
          <span class="nav-brand-title">ProtocolFlow</span>
          <span class="nav-brand-tagline">Fudan iGEM 2025</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/create" class="nav-link">Create</router-link>
          <router-link to="/open" class="nav-link">Open</router-link>
          <router-link to="/mental-health" class="nav-link">Health</router-link>
          <router-link to="/docs" class="nav-link">Docs</router-link>
          <router-link to="/settings" class="nav-link">Settings</router-link>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- 悬浮球AI助手 -->
    <FloatingChat />
  </div>
</template>

<script>
import FloatingChat from './components/FloatingChat.vue'

export default { 
  name: 'App',
  components: {
    FloatingChat
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1f2937;
  background: #f9fafb;
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.nav-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  gap: 4px;
}

.nav-brand-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.025em;
  line-height: 1;
}

.nav-brand-tagline {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2563eb;
}

.nav-brand:hover .nav-brand-title {
  color: #3b82f6;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  padding: 8px 16px;
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: #3b82f6;
  background: #f3f4f6;
}

.nav-link.router-link-active {
  color: #3b82f6;
  background: #eff6ff;
}

.main-content {
  flex: 1;
  padding: 0;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 12px;
    height: 56px;
  }
  
  .nav-brand-title {
    font-size: 1.25rem;
  }
  
  .nav-brand-tagline {
    font-size: 0.7rem;
  }
  
  .nav-links {
    gap: 4px;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 13px;
  }
}

@media (max-width: 640px) {
  .nav-links {
    gap: 2px;
  }
  
  .nav-link {
    padding: 6px 8px;
    font-size: 12px;
  }
}
</style>
