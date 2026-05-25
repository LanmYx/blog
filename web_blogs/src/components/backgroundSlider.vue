<script lang="ts" setup>
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import bg1 from '@/assets/bg-1.PNG'
import bg2 from '@/assets/bg-2.JPG'
import bg3 from '@/assets/bg-3.PNG'
import bg4 from '@/assets/bg-4.JPG'

const bgList = reactive([
  bg1, bg2, bg3, bg4
])

const activeBg = ref(0)

let timer = null

// 启动轮播
function startSlide() {
  // 单张图片不轮播
  if (bgList.length <= 1) return

  // 每10秒切换
  timer = setInterval(() => {
    activeBg.value = (activeBg.value + 1) % bgList.length
  }, 10000)
}

onMounted(() => {
  startSlide()
})

// 卸载时清理定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

// 监听图片数组变化（对应 React 依赖项效果）
watch(
    () => bgList.length,
    () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      startSlide()
    }
)
</script>

<template>
  <div class="absolute inset-0 z-[-10] overflow-hidden">
    <div v-for="(item,i) in bgList"
         :key="i"
         :style="{
             backgroundImage: `url(${item})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             opacity: activeBg === i ? 1 : 0,
             visibility: Math.abs(i - activeBg) <= 1 || (i === bgList.length - 1 && activeBg === 0) ? 'visible' : 'hidden' }"
         class="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out transform-gpu"></div>
  </div>
</template>

<style scoped>

</style>
