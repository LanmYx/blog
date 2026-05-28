<script lang="ts" setup>
import {siteConfig} from "@/common/siteConfig.ts";
// 生成每个光点的位置、大小、动画延迟
import {defineAsyncComponent} from "vue";

const MusicProvider = defineAsyncComponent(() => import('@/components/MusicProvider.vue'))
const BackgroundSlider = defineAsyncComponent(() => import('@/components/backgroundSlider.vue'))
const BackgroundEffects = defineAsyncComponent(() => import('@/components/backgroundEffects.vue'))
</script>

<template>
  <MusicProvider>
    <!--    背景-->
    <div class="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      <!--    背景轮播图-->
      <background-slider/>
      <div
          class="absolute inset-0 z-[-9] bg-white/30 dark:bg-slate-900/40 backdrop-blur-md transition-colors duration-1000"></div>
      <!--    🌟 全端保留渐变流动-->
      <div
          :style="{
     background: `linear-gradient(-45deg, ${siteConfig.themeColors.join(', ')})`,
     backgroundSize: '400% 400%',
     animation: 'gradientMove 15s ease infinite' // 🌟 全端保留渐变流动
    }"
          class="absolute inset-0 z-[-8] opacity-60 dark:opacity-20 mix-blend-color transition-opacity duration-1000 transform-gpu"
      ></div>

      <!--    模糊光晕-->
      <div
          class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/40 dark:bg-indigo-900/20 blur-[100px] rounded-full z-[-7] md:mix-blend-overlay"></div>
      <div
          class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/30 dark:bg-purple-900/30 blur-[100px] rounded-full z-[-7] md:mix-blend-overlay"></div>

      <!--    粒子特效-->
      <div class="hidden md:block absolute inset-0 w-full h-full">
        <BackgroundEffects/>
      </div>
    </div>

    <div class="main">
      <router-view/>
    </div>
  </MusicProvider>
</template>
<style scoped>
.sparkle {
  opacity: 0;
  animation: fireflyBreathe ease-in-out infinite;
}
</style>
