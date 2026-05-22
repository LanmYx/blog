<script lang="ts" setup>
import {reactive, ref} from "vue";
import bg1 from '@/assets/bg-1.PNG'
import bg2 from '@/assets/bg-2.JPG'
import bg3 from '@/assets/bg-3.PNG'
import bg4 from '@/assets/bg-4.JPG'

const bgList = reactive([
  bg1, bg2, bg3, bg4
])

const activeBg = ref(0)

let timer: any = null

timer = setInterval(() => {
  activeBg.value++
  if (activeBg.value > 3) activeBg.value = 0
}, 5000)

// 生成每个光点的位置、大小、动画延迟
const getSparkleStyle = (index) => {
  const left = Math.random() * 100;    // 水平位置 0-100%
  const top = Math.random() * 100;     // 垂直位置 0-100%
  const size = Math.random() * 4 + 1;  // 大小 1-4px
  const delay = Math.random() * 5;    // 动画延迟 0-5s
  const duration = Math.random() * 3 + 2; // 闪烁周期 2-5s

  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<template>
  <!--    背景-->
  <div class="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
    <div class="absolute inset-0 z-[-10] overflow-hidden">
      <div v-for="(item,index) in bgList"
           :key="index"
           :style="{
             backgroundImage: `url(${item})`,
             opacity: activeBg === index ? 1 : 0,
             visibility: activeBg === index ? 'visible' : 'hidden' }"
           class="img-bg absolute inset-0 transition-opacity duration-[2000ms] ease-in-out transform-gpu"></div>
    </div>
    <div
        class="absolute inset-0 z-[-9] bg-white/30 dark:bg-slate-900/40 backdrop-blur-md transition-colors duration-1000"></div>
    <div
        class="absolute inset-0 z-[-8] opacity-60 dark:opacity-20 mix-blend-color transition-opacity duration-1000 transform-gpu bg"></div>

    <div
        class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/40 dark:bg-indigo-900/20 blur-[100px] rounded-full z-[-7] md:mix-blend-overlay"></div>
    <div
        class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/30 dark:bg-purple-900/30 blur-[100px] rounded-full z-[-7] md:mix-blend-overlay"></div>
    <div class="hidden md:block absolute inset-0 w-full h-full">
      <div class="transition-opacity duration-1000 opacity-100">
        <div class="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden mix-blend-screen">
          <!-- 随机光点层 -->
          <div class="absolute inset-0 pointer-events-none">
            <span
                v-for="i in 30"
                :key="i"
                :style="getSparkleStyle(i)"
                class="sparkle absolute rounded-full bg-white"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="main">
    <router-view/>
  </div>
</template>
<style scoped>
@import "animation.css";

.bg {
  background: linear-gradient(-45deg, rgb(161, 140, 209), rgb(251, 194, 235), rgb(161, 196, 253), rgb(194, 233, 251)) 0% 0% / 400% 400%;
  animation: 15s ease 0s infinite normal none running gradientMove;
}

.img-bg {
  background-size: cover;
  background-position: center center;
}

.sparkle {
  opacity: 0;
  animation: fireflyBreathe ease-in-out infinite;
}
</style>