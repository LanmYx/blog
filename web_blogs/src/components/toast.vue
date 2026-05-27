<template>
  <div
      v-show="visible"
      :class="`toast-${type}`"
      class="toast-glass"
  >
    {{ message }}
  </div>
</template>

<script setup>
import {ref} from 'vue'

const visible = ref(false)
const message = ref('')
const type = ref('success')
let timer = null

const showToast = (msg, t = 'success') => {
  visible.value = true
  message.value = msg
  type.value = t

  clearTimeout(timer)
  timer = setTimeout(() => {
    visible.value = false
  }, 2200)
}

defineExpose({showToast})
</script>

<style scoped>
.toast-glass {
  position: fixed;
  top: 24px;
  left: 50%;
  z-index: 99999;
  transform: translateX(-50%);
  padding: 12px 20px !important;
  border-radius: 16px !important;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.toast-success {
  background: rgba(45, 212, 191, 0.25);
}

.toast-error {
  background: rgba(255, 99, 132, 0.25);
}

.toast-warning {
  background: rgba(255, 193, 7, 0.25);
}
</style>
