<template>
  <div class="crisis-dialog">
    <img
      class="crisis-dialog__avatar"
      :src="avatarSrc"
      alt="Crisis conversation avatar"
    />
    <div class="crisis-dialog__messages">
      <template v-for="dialog in dialogs" :key="dialog.id">
        <div
          v-if="!dialog.isInput"
          class="crisis-dialog__bubble crisis-dialog__bubble--message"
          :ref="el => setDialogRef(dialog.id, el)"
        ></div>
        <div v-else class="crisis-dialog__input-area">
          <div
            class="crisis-dialog__bubble crisis-dialog__bubble--input"
            :ref="el => setDialogRef(dialog.id, el)"
          ></div>
          <div class="crisis-dialog__send-container">
            <button
              type="button"
              class="crisis-dialog__send"
              :class="{ 'is-active': sendActive, 'is-disabled': !sendEnabled }"
              :disabled="!sendEnabled"
              @click="handleSendClick"
              aria-label="Send response"
            >
              <img
                class="crisis-dialog__send-icon"
                :src="sendIconSrc"
                alt=""
              />
              <span class="visually-hidden">Send response to continue</span>
            </button>
            <span class="crisis-dialog__send-prompt">Click to Respond</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  dialogs: {
    type: Array,
    required: true
  },
  dialogBoxRefs: {
    type: Object,
    required: true
  },
  avatarSrc: {
    type: String,
    default: 'https://static.igem.wiki/teams/5643/img/homepage/crisis-avatar.svg'
  },
  sendIconSrc: {
    type: String,
    default: 'https://static.igem.wiki/teams/5643/img/homepage/crisis-send.svg'
  },
  sendEnabled: {
    type: Boolean,
    default: false
  },
  sendActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send-click'])

const setDialogRef = (id, el) => {
  if (el) {
    props.dialogBoxRefs[id] = el
  } else {
    delete props.dialogBoxRefs[id]
  }
}

const handleSendClick = () => {
  if (!props.sendEnabled) return
  emit('send-click')
}
</script>

<style scoped>
.crisis-dialog {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;
  flex: 1;
}

.crisis-dialog__avatar {
  width: 96px;
  height: 96px;
  flex-shrink: 0;
}

.crisis-dialog__messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.crisis-dialog__bubble {
  min-height: 48px;
  background-color: #2f3033;
  border-radius: 18px;
  padding: 1rem 1.5rem;
  color: #f0f0f0;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  opacity: 0;
  transform: translateY(20px);
  display: flex;
  align-items: center;
}

.crisis-dialog__input-area {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.crisis-dialog__bubble--input {
  flex: 1;
  background-color: #d9d9d9;
  color: #2f3033;
}

.crisis-dialog__send-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.crisis-dialog__send-prompt {
  color: #f0f0f0;
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0;
  transform: translateY(10px);
}

.crisis-dialog__send {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border: none;
  border-radius: 50%;
  background: #f0f0f0;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  opacity: 0;
  transform: scale(0.5);
}

.crisis-dialog__send:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.6);
  outline-offset: 4px;
}

.crisis-dialog__send:not(.is-disabled):hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
}

.crisis-dialog__send.is-active {
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}

.crisis-dialog__send.is-disabled {
  cursor: default;
  opacity: 0.4 !important;
  filter: grayscale(50%);
}

.crisis-dialog__send-icon {
  width: 36px;
  height: 36px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 768px) {
  .crisis-dialog {
    flex-direction: column;
    align-items: stretch;
  }

  .crisis-dialog__avatar {
    width: 72px;
    height: 72px;
  }

  .crisis-dialog__input-area {
    align-self: stretch;
  }

  .crisis-dialog__send {
    width: 64px;
    height: 64px;
  }

  .crisis-dialog__send-icon {
    width: 32px;
    height: 32px;
  }
}
</style>
