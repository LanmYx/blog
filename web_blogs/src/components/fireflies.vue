<script lang="ts" setup>
// 更新萤火虫的数据结构，增加独立的移动动画属性
import {onMounted, ref} from "vue";

interface Firefly {
  id: number;
  top: string;
  left: string;
  size: number;
  breatheDuration: number; // 呼吸闪烁的周期
  breatheDelay: number;
  floatDuration: number;   // 缓慢飞行的周期
  floatDelay: number;
  floatPath: string;       // 随机分配飞行轨迹
}

const files = ref<Firefly[]>([])

onMounted(() => {
  files.value = Array.from({length: 50}).map((_, i) => ({
    id: i,
    // 初始出生点
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 3 + Math.random() * 4,

    // 呼吸闪烁：较快，3 到 8 秒一个来回
    breatheDuration: 3 + Math.random() * 5,
    breatheDelay: Math.random() * -10,

    // 飞行移动：极其缓慢，15 到 35 秒一个来回，营造漫游感
    floatDuration: 15 + Math.random() * 20,
    floatDelay: Math.random() * -20,

    // 随机分配 4 种不同的飞行轨迹，避免大家往同一个方向飞
    floatPath: `float${Math.floor(Math.random() * 4) + 1}`,
  }))
})
</script>

<template>
  <div class="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden mix-blend-screen">
    <!--    【外层容器】：负责在屏幕上极其缓慢地游荡飞行-->
    <div v-for="item in files" :key="item.id" :style="{
            top: item.top,
            left: item.left,
            animation: `${item.floatPath} ${item.floatDuration}s ease-in-out infinite`,
            animationDelay: `${item.floatDelay}s`,
          }" class="absolute">
      <!--      【内层元素】：负责自身发光、变大和透明度呼吸-->
      <div
          :style="{
          width: `${item.size}px`,
          height: `${item.size}px`,
          backgroundColor: 'rgba(200, 255, 200, 0.9)',
          animation: `fireflyBreathe ${item.breatheDuration}s ease-in-out infinite`,
          animationDelay: `${item.breatheDelay}s`,
          }"
          class="rounded-full"
      ></div>
    </div>
  </div>
</template>

<style scoped>
</style>
