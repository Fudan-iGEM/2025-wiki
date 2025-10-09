<template>
  <div class="settings">
    <div class="header">
      <h2>Settings</h2>
      <p class="subtitle">Configure your API settings and preferences</p>
    </div>

    <div class="settings-form">
      <div class="provider-section">
        <label class="provider-label">AI Provider</label>
        <select v-model="form.provider" class="provider-select">
          <option value="openai">OpenAI</option>
          <option value="gemini">Google Gemini</option>
        </select>
      </div>

      <div class="config-section">
        <div v-if="form.provider === 'openai'" class="config-fields">
          <div class="field-group">
            <label>Base URL</label>
            <input 
              v-model="form.oaiBase" 
              placeholder="https://api.openai.com/v1"
              class="config-input"
            >
          </div>
          <div class="field-group">
            <label>Model</label>
            <input 
              v-model="form.oaiModel" 
              placeholder="gpt-4o-mini"
              class="config-input"
            >
          </div>
          <div class="field-group">
            <label>API Key</label>
            <input 
              v-model="form.oaiApiKey" 
              placeholder="sk-..."
              type="password"
              class="config-input"
            >
          </div>
        </div>

        <div v-else class="config-fields">
          <div class="field-group">
            <label>Model</label>
            <input 
              v-model="form.geminiModel" 
              placeholder="gemini-1.5-pro-latest"
              class="config-input"
            >
          </div>
          <div class="field-group">
            <label>API Key</label>
            <input 
              v-model="form.geminiApiKey" 
              placeholder="AIza..."
              type="password"
              class="config-input"
            >
          </div>
        </div>
      </div>

      <button @click="save" class="save-btn" :class="{ saved: saved }">
        <span v-if="saved">✅ Saved!</span>
        <span v-else>💾 Save</span>
      </button>
    </div>
  </div>
</template>

<script>
import { getLlmConfig, saveLlmConfig } from '../config/llm'

export default {
  name: 'SettingsView',
  data() {
    return { form: getLlmConfig(), saved: false }
  },
  methods: {
    save() {
      saveLlmConfig(this.form)
      this.saved = true
      setTimeout(() => { this.saved = false }, 1500)
    }
  }
}
</script>

<style scoped>
.settings {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px 16px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

.settings-form {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

.provider-section {
  margin-bottom: 24px;
}

.provider-label {
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-weight: 600;
  font-size: 16px;
}

.provider-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.provider-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.config-section {
  margin-bottom: 32px;
}

.config-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-group label {
  display: block;
  margin-bottom: 6px;
  color: #374151;
  font-weight: 500;
  font-size: 14px;
}

.config-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: white;
}

.config-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.save-btn {
  width: 100%;
  padding: 12px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.save-btn.saved {
  background: #10b981;
}

@media (max-width: 768px) {
  .settings {
    padding: 20px 16px;
  }
  
  .header h2 {
    font-size: 1.75rem;
  }
  
  .settings-form {
    padding: 24px;
    margin: 0 16px;
  }
}
</style>
