<script lang="ts" setup>
import {ref, computed, provide} from 'vue'

import {AnimatePresence, motion} from "motion-v";
// 类型定义
type ToastType = 'success' | 'warning' | 'error' | 'info'

// 状态
const visible = ref(false)
const message = ref('')
const type = ref<ToastType>('success')
let timer: number | null = null

// 样式类
const toastClass = computed(() => {
  const classes: Record<ToastType, string> = {
    success: 'bg-green-500/90 border-green-400 text-white',
    warning: 'bg-amber-500/90 border-amber-400 text-white',
    error: 'bg-red-500/90 border-red-400 text-white',
    info: 'bg-indigo-500/90 border-indigo-400 text-white',
  }
  return classes[type.value]
})

// 显示 toast
const showToast = (text: string, toastType: ToastType = 'success') => {
  // 清除上一个定时器
  if (timer) clearTimeout(timer)

  visible.value = true
  message.value = text
  type.value = toastType

  // 3秒后自动关闭
  timer = window.setTimeout(() => {
    visible.value = false
  }, 3000)
}

// 关闭后清空内容
const clearToast = () => {
  if (!visible.value) {
    message.value = ''
    type.value = 'success'
  }
}

// 提供给子组件使用
provide('toast', {showToast})
</script>
<!-- components/Toast.vue -->
<template>
  <!-- 注入全局状态 -->
  <div>
    <Teleport to="body">
      <!-- 动画容器 -->
      <AnimatePresence>
        <motion.div
            v-if="visible"
            :animate="{ opacity: 1, y: 0, scale: 1 }"
            :class="toastClass"
            :exit="{ opacity: 0, y: -50, scale: 0.9 }"
            :initial="{ opacity: 0, y: -50, scale: 0.9 }"
            class="toast-item fixed top-20 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border"
        >
          <span class="font-bold text-sm">{{ message }}</span>
        </motion.div>
      </AnimatePresence>

    </Teleport>

    <slot></slot>
  </div>
</template>

<style scoped>
</style>
