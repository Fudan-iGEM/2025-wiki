<template>
  <div class="markdown-stepper" ref="stepperRef">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div class="header">
        <div class="title">{{ title }}</div>
        <div class="progress">Step {{ currentStepIndex + 1 }} / {{ steps.length }}</div>
      </div>

      <div class="timeline" v-if="steps.length > 1">
        <div
          v-for="(s, i) in steps"
          :key="i"
          class="tl-item"
          :class="{ done: i < currentStepIndex, current: i === currentStepIndex }"
        >
          <div class="dot"></div>
          <div class="label">{{ i + 1 }}</div>
        </div>
      </div>

      <div v-if="!finished" class="step-content" ref="contentRef">
        <div v-if="currentStep.criticals && currentStep.criticals.length" class="critical-note">
          <div class="cn-title">Critical checklist</div>
          <ul>
            <li v-for="(c, idx) in currentStep.criticals" :key="idx">{{ c }}</li>
          </ul>
        </div>

        <div v-html="currentStepHtml"></div>

        <!-- Annotations Section -->
        <div class="annotations-section">
          <div class="annotations-header">
            <h4>📝 Notes & Annotations</h4>
            <button @click="toggleAnnotationInput" class="add-annotation-btn">
              {{ showAnnotationInput ? 'Cancel' : 'Add Note' }}
            </button>
          </div>

          <!-- Add new annotation -->
          <div v-if="showAnnotationInput" class="annotation-input">
            <textarea
              v-model="newAnnotationText"
              placeholder="Add your notes, observations, or modifications for this step..."
              rows="3"
              class="annotation-textarea"
            ></textarea>
            <div class="annotation-actions">
              <button @click="saveAnnotation" :disabled="!newAnnotationText.trim()" class="save-annotation-btn">
                Save Note
              </button>
              <button @click="cancelAnnotation" class="cancel-annotation-btn">
                Cancel
              </button>
            </div>
          </div>

          <!-- Display existing annotations -->
          <div v-if="currentStepAnnotations.length > 0" class="annotations-list">
            <div 
              v-for="(annotation, index) in currentStepAnnotations" 
              :key="annotation.id"
              class="annotation-item"
            >
              <div class="annotation-header">
                <span class="annotation-time">{{ formatAnnotationTime(annotation.timestamp) }}</span>
                <button @click="deleteAnnotation(index)" class="delete-annotation-btn" title="Delete note">
                  ✕
                </button>
              </div>
              <div class="annotation-text">{{ annotation.text }}</div>
            </div>
          </div>

          <div v-else-if="!showAnnotationInput" class="no-annotations">
            No notes for this step yet. Click "Add Note" to add your observations.
          </div>
        </div>
      </div>

      <div v-else class="finish-overlay">
        <div class="finish-card" ref="finishRef">
          <div class="celebrate">🎉 Completed!</div>
          <p>You have finished all steps of this protocol.</p>
          
          <!-- Feeling Check -->
          <div v-if="!feelingRecorded" class="feeling-check">
            <h4>How's your feeling today?</h4>
            <p class="feeling-subtitle">Help us understand your lab experience</p>
            <div class="feeling-options">
              <button 
                v-for="feeling in feelingTypes" 
                :key="feeling.id"
                @click="selectFeeling(feeling)"
                class="feeling-btn"
                :style="{ borderColor: feeling.color }"
              >
                <span class="feeling-emoji">{{ feeling.emoji }}</span>
                <span class="feeling-label">{{ feeling.label }}</span>
              </button>
            </div>
            <div v-if="selectedFeeling" class="feeling-note">
              <textarea 
                v-model="feelingNote" 
                placeholder="Any additional thoughts about today's experiment? (optional)"
                rows="3"
              ></textarea>
              <div class="feeling-actions">
                <button @click="saveFeelingRecord" class="save-feeling-btn">Save & Continue</button>
                <button @click="skipFeeling" class="skip-feeling-btn">Skip</button>
              </div>
            </div>
          </div>

          <div v-if="feelingRecorded" class="feeling-recorded">
            <div class="feeling-thanks">
              <span class="feeling-emoji-large">{{ selectedFeeling?.emoji }}</span>
              <p>Thank you for sharing! Your feeling has been recorded.</p>
            </div>
          </div>
          
          <div class="finish-actions" :class="{ 'with-feeling': feelingRecorded }">
            <button @click="generatePdf">Generate PDF Report</button>
            <button @click="restart">Restart</button>
          </div>
        </div>
      </div>

      <div v-if="!finished" class="footer">
        <button @click="prevStep" :disabled="currentStepIndex === 0">Previous</button>
        <button @click="nextStep" :disabled="loading || steps.length === 0">{{ nextLabel }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createApp, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'
import PluginTimer from './PluginTimer.vue'
import PluginCalculator from './PluginCalculator.vue'
import PluginTodoList from './PluginTodoList.vue'
import PluginLinearRegression from './PluginLinearRegression.vue'
import PluginStatistics from './PluginStatistics.vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { FEELING_TYPES, saveFeelingRecord } from '../utils/feelingTracker'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

function parseDurationToMs(raw) {
  if (!raw) return 0
  const trimmed = String(raw).trim().toLowerCase()
  const match = trimmed.match(/^(\d+(?:\.\d+)?)(ms|s|sec|seconds|m|min|minutes|h|hr|hours)?$/)
  if (!match) return 0
  const value = parseFloat(match[1])
  const unit = match[2] || 's'
  switch (unit) {
    case 'ms': return value
    case 's':
    case 'sec':
    case 'seconds': return value * 1000
    case 'm':
    case 'min':
    case 'minutes': return value * 60 * 1000
    case 'h':
    case 'hr':
    case 'hours': return value * 60 * 60 * 1000
    default: return value * 1000
  }
}

function parseTodoArg(argRaw) {
  const result = { items: [], repeat: 0, label: 'Tube #' }
  const raw = (argRaw || '').trim()
  if (!raw) return result
  const repeatMatch = raw.match(/repeat\s*=\s*(\d+)/i)
  if (repeatMatch) {
    result.repeat = parseInt(repeatMatch[1], 10)
    const labelMatch = raw.match(/label\s*=\s*"([^"]+)"/i)
    if (labelMatch) result.label = labelMatch[1]
    return result
  }
  const itemsMatch = raw.match(/items\s*=\s*(.+)$/i)
  if (itemsMatch) {
    result.items = itemsMatch[1].split(',').map(s => s.trim()).filter(Boolean)
    return result
  }
  result.items = raw.split(',').map(s => s.trim()).filter(Boolean)
  return result
}

export default {
  name: 'MarkdownStepper',
  props: {
    src: { type: String, default: '/example.md' },
    content: { type: String, default: '' }
  },
  data() {
    return {
      loading: true,
      title: '',
      steps: [],
      currentStepIndex: 0,
      mountedPluginApps: [],
      finished: false,
      activityLogs: [],
      // Feeling tracking
      feelingRecorded: false,
      selectedFeeling: null,
      feelingNote: '',
      feelingTypes: Object.values(FEELING_TYPES),
      experimentStartTime: null,
      // Annotations
      annotations: {}, // stepIndex -> array of annotations
      showAnnotationInput: false,
      newAnnotationText: ''
    }
  },
  computed: {
    currentStep() { return this.steps[this.currentStepIndex] || { html: '', plugins: [], criticals: [] } },
    currentStepHtml() { return this.currentStep.html },
    nextLabel() { return this.currentStepIndex >= this.steps.length - 1 ? 'Done!' : 'Next' },
    currentStepAnnotations() { 
      return this.annotations[this.currentStepIndex] || [] 
    }
  },
  methods: {
    async fetchMarkdown() {
      if (this.content && this.content.trim()) return this.content
      const res = await fetch(this.src)
      return await res.text()
    },
    splitIntoSteps(markdownText) {
      const steps = []
      let current = { htmlParts: [], plugins: [], criticals: [] }
      let title = ''
      const lines = markdownText.split(/\n/)
      const pluginRegex = /\{\{\s*([a-zA-Z0-9_-]+)(?::([^}]+))?\s*\}\}/g
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        const h1Match = line.match(/^#\s+(.+)/)
        const h2Match = line.match(/^##\s+(.+)/)
        if (h1Match) { title = h1Match[1].trim(); continue }
        if (h2Match) {
          if (current.htmlParts.length > 0 || current.plugins.length > 0 || current.criticals.length > 0) {
            steps.push({ html: DOMPurify.sanitize(md.render(current.htmlParts.join('\n')), { ADD_ATTR: ['data-plugin-idx'] }), plugins: current.plugins, criticals: current.criticals })
          }
          current = { htmlParts: [line], plugins: [], criticals: [] }
          continue
        }
        line = line.replace(pluginRegex, (_match, name, arg) => {
          const lower = String(name).toLowerCase()
          if (lower === 'timer') { const idx = current.plugins.length; current.plugins.push({ component: PluginTimer, props: { durationMs: parseDurationToMs(arg) } }); return `<span class="plugin-slot" data-plugin-idx="${idx}"></span>` }
          if (lower === 'calculator') { const idx = current.plugins.length; current.plugins.push({ component: PluginCalculator, props: {} }); return `<span class="plugin-slot" data-plugin-idx="${idx}"></span>` }
          if (lower === 'todo') { const spec = parseTodoArg(arg); const idx = current.plugins.length; current.plugins.push({ component: PluginTodoList, props: { items: spec.items, repeat: spec.repeat, label: spec.label } }); return `<span class="plugin-slot" data-plugin-idx="${idx}"></span>` }
          if (lower === 'regression' || lower === 'linearregression') { const idx = current.plugins.length; current.plugins.push({ component: PluginLinearRegression, props: { initialData: (arg || '').trim() } }); return `<span class="plugin-slot" data-plugin-idx="${idx}"></span>` }
          if (lower === 'statistics' || lower === 'stats') { const idx = current.plugins.length; current.plugins.push({ component: PluginStatistics, props: { initialData: (arg || '').trim() } }); return `<span class="plugin-slot" data-plugin-idx="${idx}"></span>` }
          if (lower === 'critical') { const text = (arg || '').trim(); if (text) current.criticals.push(text); return '' }
          return '`Unknown plugin: ' + lower + '`'
        })
        current.htmlParts.push(line)
      }
      if (current.htmlParts.length > 0 || current.plugins.length > 0 || current.criticals.length > 0) {
        steps.push({ html: DOMPurify.sanitize(md.render(current.htmlParts.join('\n')), { ADD_ATTR: ['data-plugin-idx'] }), plugins: current.plugins, criticals: current.criticals })
      }
      return { title, steps }
    },
    nextStep() {
      // Record experiment start time on first step
      if (this.currentStepIndex === 0 && !this.experimentStartTime) {
        this.experimentStartTime = new Date()
      }
      
      const currentStep = this.currentStep
      if (currentStep.criticals && currentStep.criticals.length > 0) {
        const criticalItems = currentStep.criticals.join('\n• ')
        const confirmed = confirm(`Please confirm you have completed the following critical checklist items:\n\n• ${criticalItems}\n\nClick OK to proceed to the next step.`)
        if (!confirmed) return
      }
      if (this.currentStepIndex < this.steps.length - 1) this.currentStepIndex += 1
      else this.finished = true
    },
    prevStep() { if (this.currentStepIndex > 0) this.currentStepIndex -= 1 },
    restart() { 
      this.finished = false
      this.currentStepIndex = 0
      this.feelingRecorded = false
      this.selectedFeeling = null
      this.feelingNote = ''
      this.experimentStartTime = null
      this.annotations = {}
      this.showAnnotationInput = false
      this.newAnnotationText = ''
    },
    unmountPlugins() { this.mountedPluginApps.forEach(app => { try { app.unmount() } catch (err) { console.warn('Unmount error', err) } }); this.mountedPluginApps = [] },
    async mountPluginsForCurrentStep() {
      await nextTick(); this.unmountPlugins()
      const container = this.$refs.contentRef; if (!container) return
      const slots = container.querySelectorAll('.plugin-slot[data-plugin-idx]')
      const plugins = this.currentStep.plugins || []
      slots.forEach((el) => {
        const idx = Number(el.getAttribute('data-plugin-idx'))
        const spec = plugins[idx]; if (!spec) return
        const props = { ...(spec.props || {}) }
        if (spec.component.name === 'PluginTimer') props.onUpdate = (e) => { this.activityLogs.push({ stepIndex: this.currentStepIndex, type: 'timer', payload: e, at: e.at }) }
        if (spec.component.name === 'PluginCalculator') props.onUpdate = (e) => { this.activityLogs.push({ stepIndex: this.currentStepIndex, type: 'calculator', payload: e, at: e.at }) }
        if (spec.component.name === 'PluginTodoList') props.onProgress = (e) => { this.activityLogs.push({ stepIndex: this.currentStepIndex, type: 'todo', payload: e, at: e.at }) }
        if (spec.component.name === 'PluginLinearRegression') props.onUpdate = (e) => { this.activityLogs.push({ stepIndex: this.currentStepIndex, type: 'regression', payload: e, at: e.at }) }
        if (spec.component.name === 'PluginStatistics') props.onUpdate = (e) => { this.activityLogs.push({ stepIndex: this.currentStepIndex, type: 'statistics', payload: e, at: e.at }) }
        const finalApp = createApp(spec.component, props)
        finalApp.mount(el)
        this.mountedPluginApps.push(finalApp)
      })
    },
    buildStructuredReport() {
      const lines = []
      lines.push(`<h1>${this.title}</h1>`)
      this.steps.forEach((s, i) => {
        lines.push(`<h2>Step ${i + 1}</h2>`)
        if (s.criticals && s.criticals.length) {
          lines.push('<h3>Critical Checklist</h3>')
          lines.push('<ul>')
          s.criticals.forEach(c => lines.push(`<li style="color: #d63384;">${c}</li>`))
          lines.push('</ul>')
        }
        const plain = s.html.replace(/<[^>]+>/g, '').replace(/\n\n+/g, '\n').trim()
        if (plain) lines.push(`<div style="margin: 12px 0;">${plain.replace(/\n/g, '<br>')}</div>`)
        
        // Add annotations for this step
        const stepAnnotations = this.annotations[i] || []
        if (stepAnnotations.length > 0) {
          lines.push('<h3>📝 Notes & Annotations</h3>')
          lines.push('<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin: 8px 0;">')
          stepAnnotations.forEach(annotation => {
            const time = new Date(annotation.timestamp).toLocaleString()
            lines.push(`<div style="margin-bottom: 8px; padding: 8px; background: white; border-radius: 4px; border-left: 3px solid #3b82f6;">`)
            lines.push(`<div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">${time}</div>`)
            lines.push(`<div style="color: #374151;">${annotation.text.replace(/\n/g, '<br>')}</div>`)
            lines.push('</div>')
          })
          lines.push('</div>')
        }
        
        const events = this.activityLogs.filter(e => e.stepIndex === i)
        if (events.length) {
          lines.push('<h3>Activity Log</h3>')
          lines.push('<ul>')
          events.forEach(e => {
            if (e.type === 'timer') { const time = new Date(e.at).toLocaleTimeString(); lines.push(`<li><strong>[Timer]</strong> ${e.payload.action} at ${time}, remaining=${e.payload.remainingMs ?? '-'}ms, duration=${e.payload.durationMs}ms</li>`) }
            else if (e.type === 'calculator') { const time = new Date(e.at).toLocaleTimeString(); const res = e.payload.result != null ? `= ${e.payload.result}` : `error: ${e.payload.error}`; lines.push(`<li><strong>[Calculator]</strong> ${e.payload.a} ${e.payload.op} ${e.payload.b} ${res} (${time})</li>`) }
            else if (e.type === 'todo') { const time = new Date(e.at).toLocaleTimeString(); lines.push(`<li><strong>[Todo]</strong> ${e.payload.done}/${e.payload.total} completed (${time})</li>`) }
            else if (e.type === 'regression') { const time = new Date(e.at).toLocaleTimeString(); lines.push(`<li><strong>[Linear Regression]</strong> ${e.payload.action}: ${e.payload.equation || ''} (R²=${e.payload.rSquared?.toFixed(4) || 'N/A'}, ${e.payload.dataPoints || 0} points) at ${time}</li>`) }
            else if (e.type === 'statistics') { const time = new Date(e.at).toLocaleTimeString(); lines.push(`<li><strong>[Statistics]</strong> ${e.payload.action}: Mean=${e.payload.mean?.toFixed(4) || 'N/A'}, SD=${e.payload.standardDeviation?.toFixed(4) || 'N/A'} (n=${e.payload.sampleSize || 0}) at ${time}</li>`) }
          })
          lines.push('</ul>')
        }
      })
      return lines.join('\n')
    },
    async generatePdf() {
      try {
        const htmlContent = this.buildStructuredReport()
        const wrapper = document.createElement('div')
        wrapper.style.position = 'fixed'
        wrapper.style.left = '-10000px'
        wrapper.style.top = '0'
        wrapper.style.width = '800px'
        wrapper.style.background = '#ffffff'
        wrapper.style.padding = '24px'
        wrapper.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
        wrapper.style.lineHeight = '1.6'
        wrapper.style.color = '#333'
        const style = document.createElement('style')
        style.textContent = `
          .pdf-report h1 { color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 12px; }
          .pdf-report h2 { color: #374151; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin: 14px 0 6px; }
          .pdf-report h3 { color: #6b7280; margin: 10px 0 4px; }
          .pdf-report ul { margin: 6px 0; padding-left: 18px; }
          .pdf-report li { margin: 3px 0; }
          .pdf-report p { margin: 6px 0; }
          .pdf-report strong { color: #2563eb; }
        `
        wrapper.appendChild(style)
        wrapper.className = 'pdf-report'
        wrapper.innerHTML = htmlContent
        document.body.appendChild(wrapper)
        const canvas = await html2canvas(wrapper, { scale: 2, backgroundColor: '#ffffff', useCORS: true, allowTaint: true })
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' })
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = pageWidth - 40
        const imgHeight = canvas.height * (imgWidth / canvas.width)
        if (imgHeight <= pageHeight - 40) pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight)
        else {
          let remaining = imgHeight; let srcY = 0
          while (remaining > 0) {
            const sliceHeight = Math.min(remaining, pageHeight - 40)
            const canvasSlice = document.createElement('canvas'); const ctx = canvasSlice.getContext('2d')
            canvasSlice.width = canvas.width
            canvasSlice.height = sliceHeight * (canvas.width / imgWidth)
            ctx.drawImage(canvas, 0, srcY * (canvas.width / imgWidth), canvas.width, canvasSlice.height, 0, 0, canvas.width, canvasSlice.height)
            const sliceData = canvasSlice.toDataURL('image/png')
            pdf.addImage(sliceData, 'PNG', 20, 20, imgWidth, sliceHeight)
            remaining -= sliceHeight; srcY += sliceHeight
            if (remaining > 0) pdf.addPage()
          }
        }
        pdf.save(`${this.title}_report_${new Date().toISOString().split('T')[0]}.pdf`)
        document.body.removeChild(wrapper)
      } catch (e) {
        console.error('PDF export failed', e)
        alert('Failed to generate PDF: ' + e.message)
      }
    },
    
    // Feeling tracking methods
    selectFeeling(feeling) {
      this.selectedFeeling = feeling
    },
    
    async saveFeelingRecord() {
      if (!this.selectedFeeling) return
      
      const duration = this.experimentStartTime 
        ? Math.round((new Date() - this.experimentStartTime) / 60000) // minutes
        : 0
      
      const feelingData = {
        id: this.selectedFeeling.id,
        protocolTitle: this.title || 'Unknown Protocol',
        note: this.feelingNote.trim(),
        duration,
        stepsCompleted: this.steps.length
      }
      
      try {
        await saveFeelingRecord(feelingData)
        this.feelingRecorded = true
        
        // Emit event for parent components
        this.$emit('feeling-recorded', {
          feeling: this.selectedFeeling,
          note: this.feelingNote,
          duration,
          timestamp: new Date().toISOString()
        })
      } catch (error) {
        console.error('Failed to save feeling:', error)
        alert('Failed to save your feeling. Please try again.')
      }
    },
    
    skipFeeling() {
      this.feelingRecorded = true
      this.selectedFeeling = { emoji: '⏭️', label: 'Skipped' }
    },

    // Annotation methods
    toggleAnnotationInput() {
      this.showAnnotationInput = !this.showAnnotationInput
      if (!this.showAnnotationInput) {
        this.newAnnotationText = ''
      }
    },

    saveAnnotation() {
      if (!this.newAnnotationText.trim()) return

      const annotation = {
        id: Date.now(),
        text: this.newAnnotationText.trim(),
        timestamp: new Date().toISOString(),
        stepIndex: this.currentStepIndex
      }

      // 确保响应式更新
      const newAnnotations = { ...this.annotations }
      if (!newAnnotations[this.currentStepIndex]) {
        newAnnotations[this.currentStepIndex] = []
      }
      newAnnotations[this.currentStepIndex].push(annotation)
      this.annotations = newAnnotations
      
      // Reset input
      this.newAnnotationText = ''
      this.showAnnotationInput = false
    },

    cancelAnnotation() {
      this.newAnnotationText = ''
      this.showAnnotationInput = false
    },

    deleteAnnotation(index) {
      if (this.annotations[this.currentStepIndex]) {
        const newAnnotations = { ...this.annotations }
        newAnnotations[this.currentStepIndex].splice(index, 1)
        this.annotations = newAnnotations
      }
    },

    formatAnnotationTime(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  watch: {
    currentStepIndex() { if (!this.finished) this.mountPluginsForCurrentStep() },
    content() { this.loading = true; this.currentStepIndex = 0; this.mountedPluginApps = []; Promise.resolve(this.fetchMarkdown()).then((raw) => { const { title, steps } = this.splitIntoSteps(raw); this.title = title; this.steps = steps; this.loading = false; this.$nextTick(this.mountPluginsForCurrentStep) }) }
  },
  async mounted() { try { const raw = await this.fetchMarkdown(); const { title, steps } = this.splitIntoSteps(raw); this.title = title; this.steps = steps } finally { this.loading = false; this.mountPluginsForCurrentStep() } },
  beforeUnmount() { this.unmountPlugins() }
}
</script>

<style scoped>
.markdown-stepper {
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
  padding: 16px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.title { font-size: 18px; font-weight: 600; color: #1f2937; }
.progress { color: #6b7280; font-size: 13px; }

.timeline { display: flex; gap: 12px; align-items: center; margin: 8px 0 16px; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.tl-item { display: flex; flex-direction: column; align-items: center; color: #bdbdbd; min-width: 20px; }
.tl-item .dot { width: 8px; height: 8px; border-radius: 50%; background: #bdbdbd; }
.tl-item.done .dot { background: #10b981; }
.tl-item.current .dot { background: #111827; }
.tl-item .label { font-size: 11px; margin-top: 2px; }

.step-content { border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px; min-height: 200px; }

.critical-note { border: 1px solid #f59e0b; background: #fff7ed; padding: 10px; border-radius: 6px; margin-bottom: 12px; }
.cn-title { font-weight: 600; margin-bottom: 6px; color: #92400e; font-size: 13px; }

.footer { margin-top: 16px; display: flex; justify-content: space-between; gap: 8px; }
.footer button { padding: 8px 12px; border-radius: 6px; border: 1px solid #d1d5db; background: #fff; color: #111827; cursor: pointer; }
.footer button:hover:not(:disabled) { background: #f9fafb; }
.footer button:disabled { opacity: 0.5; cursor: not-allowed; }

.finish-overlay { display: flex; justify-content: center; align-items: center; padding: 20px; }
.finish-card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; text-align: center; max-width: 480px; }
.celebrate { font-size: 24px; margin-bottom: 8px; }
.finish-actions { display: flex; gap: 8px; justify-content: center; }
.finish-actions.with-feeling { margin-top: 16px; }
.finish-actions button { padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; background: #fff; cursor: pointer; }
.finish-actions button:hover { background: #f9fafb; }

/* Feeling tracking styles */
.feeling-check { margin: 20px 0; padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
.feeling-check h4 { margin: 0 0 8px 0; color: #1e293b; font-size: 18px; }
.feeling-subtitle { margin: 0 0 16px 0; color: #64748b; font-size: 14px; }

.feeling-options { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-bottom: 16px; }
.feeling-btn { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  padding: 12px 8px; 
  border: 2px solid #e2e8f0; 
  border-radius: 8px; 
  background: #fff; 
  cursor: pointer; 
  transition: all 0.2s ease;
}
.feeling-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.feeling-btn.selected { border-color: currentColor; background: #f0f9ff; }

.feeling-emoji { font-size: 24px; margin-bottom: 4px; }
.feeling-label { font-size: 12px; font-weight: 500; color: #374151; }

.feeling-note { margin-top: 16px; }
.feeling-note textarea { 
  width: 100%; 
  padding: 8px 12px; 
  border: 1px solid #d1d5db; 
  border-radius: 6px; 
  resize: vertical; 
  font-family: inherit;
  margin-bottom: 12px;
}
.feeling-note textarea:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }

.feeling-actions { display: flex; gap: 8px; justify-content: flex-end; }
.save-feeling-btn { 
  padding: 8px 16px; 
  background: #3b82f6; 
  color: white; 
  border: none; 
  border-radius: 6px; 
  cursor: pointer; 
  font-weight: 500;
}
.save-feeling-btn:hover { background: #2563eb; }
.skip-feeling-btn { 
  padding: 8px 16px; 
  background: #f3f4f6; 
  color: #374151; 
  border: 1px solid #d1d5db; 
  border-radius: 6px; 
  cursor: pointer;
}
.skip-feeling-btn:hover { background: #e5e7eb; }

.feeling-recorded { margin: 20px 0; }
.feeling-thanks { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  padding: 20px; 
  background: #f0fdf4; 
  border: 1px solid #bbf7d0; 
  border-radius: 8px;
}
.feeling-emoji-large { font-size: 32px; margin-bottom: 8px; }
.feeling-thanks p { margin: 0; color: #166534; font-weight: 500; }

.loading { text-align: center; padding: 24px; color: #6b7280; font-size: 14px; }

/* Annotations styles */
.annotations-section {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.annotations-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.annotations-header h4 {
  margin: 0;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
}

.annotations-section .add-annotation-btn {
  padding: 6px 12px;
  background: #3b82f6 !important;
  color: white !important;
  border: none !important;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.annotations-section .add-annotation-btn:hover {
  background: #2563eb !important;
}

.annotation-input {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.annotation-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  margin-bottom: 12px;
}

.annotation-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.annotation-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.save-annotation-btn {
  padding: 8px 16px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.save-annotation-btn:hover:not(:disabled) {
  background: #059669;
}

.save-annotation-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.cancel-annotation-btn {
  padding: 8px 16px;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cancel-annotation-btn:hover {
  background: #e5e7eb;
}

.annotations-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.annotation-item {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  border-left: 3px solid #3b82f6;
}

.annotation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.annotation-time {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.delete-annotation-btn {
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.delete-annotation-btn:hover {
  background: #fef2f2;
}

.annotation-text {
  color: #374151;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.no-annotations {
  color: #9ca3af;
  font-style: italic;
  text-align: center;
  padding: 16px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px dashed #d1d5db;
}

@media (max-width: 640px) {
  .markdown-stepper { padding: 12px; }
  .header { flex-direction: column; align-items: flex-start; gap: 4px; }
  .title { font-size: 16px; }
  .progress { font-size: 12px; }
  .footer { gap: 6px; }
  .footer button { flex: 1; min-width: 0; }
}
</style>
