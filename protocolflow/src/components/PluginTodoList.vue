<template>
  <div class="plugin-todo">
    <div v-if="title" class="title">{{ title }}</div>
    <ul class="list">
      <li v-for="(item, idx) in itemsState" :key="idx">
        <label>
          <input type="checkbox" v-model="item.done" @change="emitProgress">
          <span :class="{ done: item.done }">{{ item.text }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PluginTodoList',
  emits: ['progress'],
  props: {
    title: { type: String, default: '' },
    items: { type: Array, default: () => [] },
    repeat: { type: Number, default: 0 },
    label: { type: String, default: 'Tube #' }
  },
  data() {
    return { itemsState: [] }
  },
  created() {
    if (this.items && this.items.length > 0) {
      this.itemsState = this.items.map(t => ({ text: String(t), done: false }))
    } else if (this.repeat > 0) {
      this.itemsState = Array.from({ length: this.repeat }, (_, i) => ({ text: `${this.label}${i + 1}`, done: false }))
    }
    this.emitProgress()
  },
  methods: {
    emitProgress() {
      const total = this.itemsState.length
      const done = this.itemsState.filter(i => i.done).length
      this.$emit('progress', { done, total, items: this.itemsState.map(i => ({ text: i.text, done: i.done })), at: new Date().toISOString() })
    }
  }
}
</script>

<style scoped>
.plugin-todo { display: inline-block; min-width: 260px; }
.title { font-weight: bold; margin-bottom: 6px; }
.list { list-style: none; padding: 0; margin: 0; }
li { margin: 4px 0; }
.done { text-decoration: line-through; color: #888; }
</style>
