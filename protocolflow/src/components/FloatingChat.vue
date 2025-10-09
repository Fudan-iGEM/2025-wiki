<template>
  <div class="floating-chat">
    <!-- 悬浮球按钮 -->
    <div 
      class="chat-bubble" 
      :class="{ active: isOpen }"
      @click="toggleChat"
    >
      <span v-if="!isOpen" class="bubble-icon">💬</span>
      <span v-else class="bubble-icon">✕</span>
    </div>

    <!-- 对话窗口 -->
    <div class="chat-window" v-if="isOpen">
      <div class="chat-header">
        <h3>AI Assistant</h3>
        <div class="chat-controls">
          <button @click="clearChat" class="clear-btn" title="Clear chat">🗑️</button>
          <button @click="toggleChat" class="close-btn" title="Close">✕</button>
        </div>
      </div>

      <div class="chat-messages" ref="messagesContainer">
        <div v-if="messages.length === 0" class="welcome-message">
          <div class="welcome-icon">💬</div>
          <p>Hi! I'm your chat assistant. Ask me anything!</p>
          <p class="welcome-hint">I can see your current page and help answer questions.</p>
        </div>
        
        <div 
          v-for="message in messages" 
          :key="message.id"
          class="message"
          :class="{ 'user-message': message.isUser, 'ai-message': !message.isUser }"
        >
          <div class="message-content">
            <div class="message-text">{{ message.text }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>

        <div v-if="isLoading" class="message ai-message">
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <div class="input-container">
          <textarea
            v-model="inputText"
            @keydown.enter.exact.prevent="sendMessage"
            @keydown.shift.enter.prevent="inputText += '\n'"
            placeholder="Chat with me about anything..."
            class="message-input"
            rows="1"
            ref="messageInput"
          ></textarea>
          <button 
            @click="sendMessage" 
            :disabled="!inputText.trim() || isLoading"
            class="send-btn"
          >
            <span class="send-icon">📤</span>
          </button>
        </div>
        <div class="input-hint">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLlmConfig } from '../config/llm'

export default {
  name: 'FloatingChat',
  data() {
    return {
      isOpen: false,
      messages: [],
      inputText: '',
      isLoading: false,
      messageIdCounter: 1
    }
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$nextTick(() => {
          this.$refs.messageInput?.focus()
        })
      }
    },

    clearChat() {
      this.messages = []
    },

    async sendMessage() {
      if (!this.inputText.trim() || this.isLoading) return

      const userMessage = {
        id: this.messageIdCounter++,
        text: this.inputText.trim(),
        isUser: true,
        timestamp: new Date()
      }

      this.messages.push(userMessage)
      const userInput = this.inputText.trim()
      this.inputText = ''
      this.isLoading = true

      try {
        // 获取当前页面上下文
        const context = this.getCurrentPageContext()
        
        // 构建完整的提示
        const prompt = this.buildPrompt(userInput, context)
        
        // 调用LLM
        const response = await this.callLLMForChat(prompt)
        
        const aiMessage = {
          id: this.messageIdCounter++,
          text: response || 'Sorry, I could not generate a response.',
          isUser: false,
          timestamp: new Date()
        }
        
        this.messages.push(aiMessage)
      } catch (error) {
        const errorMessage = {
          id: this.messageIdCounter++,
          text: 'Sorry, there was an error processing your request. Please check your API settings.',
          isUser: false,
          timestamp: new Date()
        }
        this.messages.push(errorMessage)
      } finally {
        this.isLoading = false
        this.scrollToBottom()
      }
    },

    getCurrentPageContext() {
      const route = this.$route
      const context = {
        currentPage: route.name || route.path,
        pageContent: '',
        protocolContent: '',
        uploadedDocuments: []
      }

      // 获取页面内容
      try {
        const mainContent = document.querySelector('.main-content')
        if (mainContent) {
          // 移除脚本和样式标签，只获取文本内容
          const clone = mainContent.cloneNode(true)
          const scripts = clone.querySelectorAll('script, style, .floating-chat')
          scripts.forEach(el => el.remove())
          context.pageContent = clone.textContent?.trim() || ''
        }

        // 如果在协议执行页面，尝试获取协议内容
        const protocolSteps = document.querySelectorAll('.step-content')
        if (protocolSteps.length > 0) {
          const protocolText = Array.from(protocolSteps).map(step => step.textContent?.trim()).join('\n\n')
          context.protocolContent = protocolText
        }

        // 获取localStorage中的上传文档信息
        const uploadedDocs = localStorage.getItem('uploadedDocuments')
        if (uploadedDocs) {
          try {
            context.uploadedDocuments = JSON.parse(uploadedDocs)
          } catch (e) {
            console.warn('Could not parse uploaded documents:', e)
          }
        }

      } catch (error) {
        console.warn('Could not extract page content:', error)
      }

      return context
    },

    async callLLMForChat(prompt) {
      const cfg = getLlmConfig()
      
      if (cfg.provider === 'gemini') {
        if (!cfg.geminiApiKey) throw new Error('Gemini API key is required')
        return await this.geminiChatCompletion(cfg, prompt)
      } else {
        if (!cfg.oaiApiKey) throw new Error('OpenAI API key is required')
        return await this.openaiChatCompletion(cfg, prompt)
      }
    },

    async openaiChatCompletion(cfg, prompt) {
      const url = `${cfg.oaiBase.replace(/\/$/, '')}/chat/completions`
      const headers = { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${cfg.oaiApiKey}` 
      }
      const body = {
        model: cfg.oaiModel,
        messages: [
          { 
            role: 'system', 
            content: 'You are a casual chat assistant. Never generate structured protocols, markdown formats, or step-by-step procedures. Only have normal conversations and answer questions in a friendly way.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }
      
      const resp = await fetch(url, { 
        method: 'POST', 
        headers, 
        body: JSON.stringify(body) 
      })
      
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error?.message || 'OpenAI API call failed')
      
      const text = data?.choices?.[0]?.message?.content?.trim()
      if (!text) throw new Error('Empty response from OpenAI')
      return text
    },

    async geminiChatCompletion(cfg, prompt) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(cfg.geminiModel)}:generateContent?key=${encodeURIComponent(cfg.geminiApiKey)}`
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { 
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      }
      
      const resp = await fetch(url, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      })
      
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error?.message || 'Gemini API call failed')
      
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      if (!text) throw new Error('Empty response from Gemini')
      return text
    },

    buildPrompt(userInput, context) {
      let prompt = `You are a friendly AI chat assistant. You are NOT a protocol generator. You should NEVER generate structured protocols, markdown formats, or step-by-step procedures. You are here for casual conversation and answering questions.

IMPORTANT: Do NOT generate any structured protocols, markdown headings (##), or formatted procedures. Just have a normal conversation.

Current context:
- Page: ${context.currentPage}
- Page content: ${context.pageContent ? context.pageContent.substring(0, 1200) + (context.pageContent.length > 1200 ? '...' : '') : 'No content available'}`

      // 添加协议内容
      if (context.protocolContent) {
        prompt += `
- Current protocol steps: ${context.protocolContent.substring(0, 800) + (context.protocolContent.length > 800 ? '...' : '')}`
      }

      // 添加上传文档的实际内容
      if (context.uploadedDocuments && context.uploadedDocuments.length > 0) {
        prompt += `
- Recently uploaded documents:`
        context.uploadedDocuments.slice(0, 2).forEach((doc, index) => {
          prompt += `
  ${index + 1}. ${doc.name} (uploaded ${new Date(doc.uploadTime).toLocaleDateString()}):
  ${doc.content ? doc.content.substring(0, 1000) + (doc.content.length > 1000 ? '...' : '') : 'No content available'}`
        })
      }

      prompt += `

User question: ${userInput}

Respond in a conversational way. Answer questions, provide explanations, give advice, but do NOT create structured protocols or formatted procedures. Keep it casual and helpful like a friendly colleague would.`

      return prompt
    },

    formatTime(timestamp) {
      return timestamp.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    }
  },

  watch: {
    messages: {
      handler() {
        this.scrollToBottom()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.floating-chat {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.chat-bubble {
  width: 56px;
  height: 56px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  position: relative;
}

.chat-bubble:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.chat-bubble.active {
  background: #dc2626;
}

.bubble-icon {
  font-size: 24px;
  color: white;
}

.chat-window {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.chat-header {
  background: #f8fafc;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
}

.chat-controls {
  display: flex;
  gap: 8px;
}

.clear-btn,
.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  font-size: 14px;
}

.clear-btn:hover,
.close-btn:hover {
  background: #e5e7eb;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.welcome-message {
  text-align: center;
  padding: 20px;
  color: #6b7280;
}

.welcome-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.welcome-message p {
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.welcome-hint {
  font-size: 12px;
  color: #9ca3af;
}

.message {
  display: flex;
  margin-bottom: 8px;
}

.user-message {
  justify-content: flex-end;
}

.ai-message {
  justify-content: flex-start;
}

.message-content {
  max-width: 80%;
  padding: 10px 12px;
  border-radius: 12px;
  position: relative;
}

.user-message .message-content {
  background: #3b82f6;
  color: white;
  border-bottom-right-radius: 4px;
}

.ai-message .message-content {
  background: #f3f4f6;
  color: #374151;
  border-bottom-left-radius: 4px;
}

.message-text {
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.message-time {
  font-size: 10px;
  opacity: 0.7;
  margin-top: 4px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: #9ca3af;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

.chat-input {
  border-top: 1px solid #e5e7eb;
  padding: 12px;
  background: white;
}

.input-container {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  resize: none;
  max-height: 80px;
  min-height: 36px;
  font-family: inherit;
  transition: border-color 0.2s ease;
}

.message-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.send-btn {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:hover:not(:disabled) {
  background: #2563eb;
}

.send-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.send-icon {
  font-size: 14px;
}

.input-hint {
  font-size: 10px;
  color: #9ca3af;
  margin-top: 4px;
  text-align: center;
}

@media (max-width: 768px) {
  .floating-chat {
    bottom: 16px;
    right: 16px;
  }
  
  .chat-bubble {
    width: 48px;
    height: 48px;
  }
  
  .bubble-icon {
    font-size: 20px;
  }
  
  .chat-window {
    width: calc(100vw - 32px);
    height: 400px;
    bottom: 60px;
    right: -16px;
  }
}
</style>