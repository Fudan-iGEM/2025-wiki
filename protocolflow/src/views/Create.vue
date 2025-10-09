<template>
  <div class="create">
    <div class="header">
      <h2>Create Protocol by LLM</h2>
      <p class="subtitle">Convert your notes or audio into structured lab protocols by Configured LLM</p>
    </div>

    <div class="input-methods">
      <div class="method-card">
        <div class="method-header">
          <span class="method-icon">📝</span>
          <h3>Text Input</h3>
        </div>
        <textarea 
          v-model="content" 
          placeholder="Paste your experimental notes here..."
          class="text-input"
        />
        <button 
          @click="convertText" 
          :disabled="!content.trim() || loading"
          class="convert-btn"
          :class="{ loading: loading && !pickedFile }"
        >
          <span v-if="loading && !pickedFile">Converting...</span>
          <span v-else>Convert Text</span>
        </button>
      </div>

      <div class="method-card">
        <div class="method-header">
          <span class="method-icon">🎵</span>
          <h3>File Upload</h3>
        </div>
        <div class="file-upload-area" :class="{ 'has-file': pickedFile }">
          <input 
            type="file" 
            accept=".txt,.md,.markdown,.wav,.mp3,.m4a,.aac,.flac,.ogg" 
            @change="onPick"
            class="file-input"
            id="file-input"
          >
          <label for="file-input" class="file-label">
            <span class="upload-icon">📁</span>
            <span v-if="!pickedFile">Choose file (text/audio)</span>
            <span v-else class="file-name">{{ pickedFile.name }}</span>
          </label>
        </div>
        <button 
          @click="convertFile" 
          :disabled="!pickedFile || loading"
          class="convert-btn"
          :class="{ loading: loading && pickedFile }"
        >
          <span v-if="loading && pickedFile">Converting...</span>
          <span v-else>Convert File</span>
        </button>
      </div>
    </div>

    <div v-if="error" class="error-message">
      <span class="error-icon">⚠️</span>
      {{ error }}
    </div>

    <div v-if="result" class="result-card">
      <div class="result-header">
        <span class="success-icon">✅</span>
        <h3>Protocol Ready</h3>
      </div>
      <p>Your protocol has been generated successfully!</p>
      <button @click="downloadResult" class="download-btn">
        <span class="download-icon">⬇️</span>
        Download Protocol
      </button>
    </div>
  </div>
</template>

<script>
import { convertTextFrontEnd, convertFileFrontEnd } from '../api/llmClient'

export default {
  name: 'CreateView',
  data() {
    return {
      content: '',
      pickedFile: null,
      loading: false,
      error: '',
      result: ''
    }
  },
  methods: {
    onPick(e) { this.pickedFile = (e.target.files && e.target.files[0]) || null },
    async convertText() {
      this.loading = true; this.error = ''; this.result = ''
      try {
        this.result = await convertTextFrontEnd(this.content)
      } catch (e) {
        this.error = e.message || 'Convert failed'
      } finally {
        this.loading = false
      }
    },
    async convertFile() {
      if (!this.pickedFile) return
      this.loading = true; this.error = ''; this.result = ''
      try {
        this.result = await convertFileFrontEnd(this.pickedFile)
      } catch (e) {
        this.error = e.message || 'Convert failed'
      } finally {
        this.loading = false
      }
    },
    downloadResult() {
      const blob = new Blob([this.result], { type: 'text/markdown;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'protocol.md'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    }
  }
}
</script>

<style scoped>
.create {
  max-width: 800px;
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

.input-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.method-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.method-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.method-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.method-icon {
  font-size: 24px;
}

.method-header h3 {
  margin: 0;
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
}

.text-input {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  margin-bottom: 16px;
  transition: border-color 0.2s ease;
}

.text-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.file-upload-area {
  margin-bottom: 16px;
}

.file-input {
  display: none;
}

.file-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px 16px;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f9fafb;
}

.file-label:hover {
  border-color: #3b82f6;
  background: #f0f9ff;
}

.file-upload-area.has-file .file-label {
  border-color: #10b981;
  background: #f0fdf4;
  border-style: solid;
}

.upload-icon {
  font-size: 20px;
}

.file-name {
  font-weight: 500;
  color: #059669;
}

.convert-btn {
  width: 100%;
  padding: 12px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.convert-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.convert-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.convert-btn.loading {
  background: #f59e0b;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  color: #dc2626;
}

.error-icon {
  font-size: 18px;
}

.result-card {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.success-icon {
  font-size: 24px;
}

.result-header h3 {
  margin: 0;
  color: #065f46;
  font-size: 1.25rem;
}

.result-card p {
  color: #047857;
  margin: 0 0 20px 0;
}

.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 auto;
}

.download-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}

.download-icon {
  font-size: 16px;
}

@media (max-width: 768px) {
  .create {
    padding: 20px 16px;
  }
  
  .header h2 {
    font-size: 1.75rem;
  }
  
  .input-methods {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .method-card {
    padding: 20px;
  }
  
  .file-label {
    padding: 24px 16px;
  }
}
</style>
