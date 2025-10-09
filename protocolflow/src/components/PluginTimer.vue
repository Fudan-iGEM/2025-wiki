<template>
  <div class="plugin-timer">
    <div class="time-display">{{ formattedRemaining }}</div>
    <div class="controls">
      <button @click="start" :disabled="isRunning">Start</button>
      <button @click="pause" :disabled="!isRunning">Pause</button>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PluginTimer',
  emits: ['update'],
  props: {
    durationMs: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      remainingMs: this.durationMs,
      intervalId: null,
      isRunning: false
    }
  },
  computed: {
    formattedRemaining() {
      const total = Math.max(0, Math.floor(this.remainingMs / 1000))
      const hours = Math.floor(total / 3600)
      const minutes = Math.floor((total % 3600) / 60)
      const seconds = total % 60
      const pad = (n) => String(n).padStart(2, '0')
      if (hours > 0) return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
      return `${pad(minutes)}:${pad(seconds)}`
    }
  },
  methods: {
    tick() {
      if (!this.isRunning) return
      const next = this.remainingMs - 100
      this.remainingMs = next > 0 ? next : 0
      if (this.remainingMs === 0) {
        this.pause()
        this.$emit('update', { action: 'finish', at: new Date().toISOString(), durationMs: this.durationMs })
      }
    },
    start() {
      if (this.isRunning) return
      this.isRunning = true
      if (this.intervalId) clearInterval(this.intervalId)
      this.intervalId = setInterval(this.tick, 100)
      this.$emit('update', { action: 'start', at: new Date().toISOString(), remainingMs: this.remainingMs, durationMs: this.durationMs })
    },
    pause() {
      this.isRunning = false
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
      this.$emit('update', { action: 'pause', at: new Date().toISOString(), remainingMs: this.remainingMs, durationMs: this.durationMs })
    },
    reset() {
      this.pause()
      this.remainingMs = this.durationMs
      this.$emit('update', { action: 'reset', at: new Date().toISOString(), remainingMs: this.remainingMs, durationMs: this.durationMs })
    }
  },
  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId)
  }
}
</script>

<style scoped>
.plugin-timer {
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
.time-display {
  font-size: 20px;
  font-weight: bold;
}
.controls button {
  margin-right: 6px;
}
</style>
