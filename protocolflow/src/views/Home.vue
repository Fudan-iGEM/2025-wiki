<template>
  <div class="home">
    <div class="hero">
      <h1>ProtocolFlow</h1>
      <p class="subtitle">Fudan iGEM 2025 lab workflow assistant</p>
    </div>

    <div class="actions">
      <button @click="$router.push('/create')" class="action-btn primary">
        <span class="btn-icon">✨</span>
        Create Protocol
      </button>
      <button @click="$router.push('/open')" class="action-btn">
        <span class="btn-icon">📂</span>
        Open File
      </button>
      <button @click="$router.push('/mental-health')" class="action-btn">
        <span class="btn-icon">🧠</span>
        Stress Check
      </button>
    </div>

    <FeelingCalendar />

    <div class="footer">
      <router-link to="/docs" class="docs-link">Documentation</router-link>
    </div>
  </div>
</template>

<script>
import FeelingCalendar from '../components/FeelingCalendar.vue'

export default {
  name: 'HomeView',
  components: {
    FeelingCalendar
  }
}
</script>

<style scoped>
.home {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 16px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  letter-spacing: -0.025em;
}

.subtitle {
  color: #6b7280;
  font-size: 1.125rem;
  margin: 0;
  font-weight: 400;
}

.actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: white;
  color: #374151;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #d1d5db;
}

.action-btn.primary {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.action-btn.primary:hover {
  background: #2563eb;
  border-color: #2563eb;
}

.btn-icon {
  font-size: 16px;
}

.footer {
  margin-top: auto;
  text-align: center;
  padding-top: 32px;
}

.docs-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.docs-link:hover {
  color: #3b82f6;
  background: #f3f4f6;
}

@media (max-width: 768px) {
  .home {
    padding: 20px 16px;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .actions {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 32px;
  }
  
  .action-btn {
    padding: 14px 16px;
  }
}
</style>
