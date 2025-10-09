<template>
  <div class="plugin-calculator">
    <div class="row">
      <input type="number" v-model.number="a" placeholder="a">
      <select v-model="op">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input type="number" v-model.number="b" placeholder="b">
      <button @click="compute">Compute</button>
    </div>
    <div class="result">Result: {{ resultText }}</div>
  </div>
</template>

<script>
export default {
  name: 'PluginCalculator',
  emits: ['update'],
  data() {
    return {
      a: 0,
      b: 0,
      op: '+',
      result: null,
      error: ''
    }
  },
  computed: {
    resultText() {
      if (this.error) return this.error
      if (this.result === null) return '-'
      return String(this.result)
    }
  },
  methods: {
    compute() {
      this.error = ''
      try {
        switch (this.op) {
          case '+': this.result = this.a + this.b; break
          case '-': this.result = this.a - this.b; break
          case '*': this.result = this.a * this.b; break
          case '/':
            if (this.b === 0) throw new Error('Divisor cannot be 0')
            this.result = this.a / this.b
            break
          default:
            throw new Error('Unsupported operator')
        }
        this.$emit('update', { a: this.a, b: this.b, op: this.op, result: this.result, at: new Date().toISOString() })
      } catch (e) {
        this.result = null
        this.error = e.message || 'Compute error'
        this.$emit('update', { a: this.a, b: this.b, op: this.op, error: this.error, at: new Date().toISOString() })
      }
    }
  }
}
</script>

<style scoped>
.plugin-calculator {
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
.row {
  display: flex;
  gap: 8px;
  align-items: center;
}
.result {
  font-weight: bold;
}
</style>
