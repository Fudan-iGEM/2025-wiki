<template>
  <div class="open">
    <div class="header">
      <h2>Open Protocol</h2>
      <p class="subtitle">Load an existing protocol file to continue your work</p>
    </div>

    <div class="upload-section" v-if="!content">
      <div class="upload-card">
        <div class="upload-area" :class="{ 'drag-over': isDragOver }" 
             @dragover.prevent="isDragOver = true"
             @dragleave.prevent="isDragOver = false"
             @drop.prevent="onDrop">
          <input 
            type="file" 
            accept=".md,.markdown,text/markdown" 
            @change="onPick"
            class="file-input"
            id="protocol-file"
          >
          <label for="protocol-file" class="upload-label">
            <div class="upload-icon">📄</div>
            <h3>Choose Protocol File</h3>
            <p>Select a Markdown file (.md) or drag & drop here</p>
            <div class="supported-formats">
              <span class="format-tag">.md</span>
              <span class="format-tag">.markdown</span>
            </div>
          </label>
        </div>
      </div>
    </div>

    <div v-if="error" class="error-message">
      <span class="error-icon">⚠️</span>
      {{ error }}
      <button @click="resetFile" class="retry-btn">Try Again</button>
    </div>

    <div v-if="content" class="protocol-view">
      <div class="protocol-header">
        <h3>Protocol Loaded</h3>
        <button @click="resetFile" class="change-file-btn">
          <span class="change-icon">🔄</span>
          Load Different File
        </button>
      </div>
      <MarkdownStepper :content="content" />
    </div>
  </div>
</template>

<script>
import MarkdownStepper from '../components/MarkdownStepper.vue'

export default {
  name: 'OpenView',
  components: { MarkdownStepper },
  data() {
    return {
      content: '',
      error: '',
      isDragOver: false
    }
  },
  methods: {
    onPick(e) {
      const file = e.target.files && e.target.files[0]
      if (file) {
        this.processFile(file)
      }
    },
    
    onDrop(e) {
      this.isDragOver = false
      const files = e.dataTransfer.files
      if (files.length > 0) {
        this.processFile(files[0])
      }
    },
    
    processFile(file) {
      this.error = ''
      
      if (!/\.(md|markdown)$/i.test(file.name)) {
        this.error = 'Please select a Markdown file (.md or .markdown)'
        return
      }
      
      const reader = new FileReader()
      reader.onload = () => { 
        const content = String(reader.result || '')
        this.content = content
        
        // 保存文档信息到localStorage供AI助手使用
        this.saveDocumentInfo(file, content)
      }
      reader.onerror = () => { 
        this.error = 'Failed to read file. Please try again.' 
      }
      reader.readAsText(file)
    },

    saveDocumentInfo(file, content) {
      try {
        const docInfo = {
          name: file.name,
          size: file.size,
          lastModified: file.lastModified,
          content: content.substring(0, 5000), // 保存前5000字符
          uploadTime: new Date().toISOString()
        }
        
        // 获取现有文档列表
        let uploadedDocs = []
        const existing = localStorage.getItem('uploadedDocuments')
        if (existing) {
          uploadedDocs = JSON.parse(existing)
        }
        
        // 添加新文档（保持最近5个）
        uploadedDocs.unshift(docInfo)
        uploadedDocs = uploadedDocs.slice(0, 5)
        
        localStorage.setItem('uploadedDocuments', JSON.stringify(uploadedDocs))
      } catch (error) {
        console.warn('Could not save document info:', error)
      }
    },
    
    resetFile() {
      this.content = ''
      this.error = ''
      this.isDragOver = false
      // Reset file input
      const fileInput = document.getElementById('protocol-file')
      if (fileInput) {
        fileInput.value = ''
      }
    }
  }
}
</script>

<style scoped>
.open {
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

.upload-section {
  margin-bottom: 32px;
}

.upload-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.upload-area {
  position: relative;
  transition: all 0.2s ease;
}

.upload-area.drag-over {
  transform: scale(1.02);
}

.file-input {
  display: none;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f9fafb;
  text-align: center;
}

.upload-label:hover {
  border-color: #3b82f6;
  background: #f0f9ff;
}

.upload-area.drag-over .upload-label {
  border-color: #10b981;
  background: #f0fdf4;
  border-style: solid;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.upload-label h3 {
  margin: 0 0 8px 0;
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
}

.upload-label p {
  margin: 0 0 16px 0;
  color: #6b7280;
  font-size: 14px;
}

.supported-formats {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.format-tag {
  background: #e5e7eb;
  color: #374151;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  color: #dc2626;
}

.error-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.retry-btn {
  margin-left: auto;
  padding: 6px 12px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.retry-btn:hover {
  background: #b91c1c;
}

.protocol-view {
  margin-top: 32px;
}

.protocol-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
}

.protocol-header h3 {
  margin: 0;
  color: #065f46;
  font-size: 1.125rem;
  font-weight: 600;
}

.change-file-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: white;
  color: #059669;
  border: 1px solid #10b981;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.change-file-btn:hover {
  background: #f0fdf4;
  transform: translateY(-1px);
}

.change-icon {
  font-size: 14px;
}

@media (max-width: 768px) {
  .open {
    padding: 20px 16px;
  }
  
  .header h2 {
    font-size: 1.75rem;
  }
  
  .upload-label {
    padding: 32px 20px;
  }
  
  .upload-icon {
    font-size: 40px;
  }
  
  .protocol-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .change-file-btn {
    justify-content: center;
  }
}
</style>
