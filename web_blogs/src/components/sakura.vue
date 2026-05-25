<script lang="ts" setup>
import {onMounted, ref} from "vue";

interface Petal {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

const petals = ref<Petal[]>([])

onMounted(() => {
  petals.value = Array.from({length: 40}).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 8 + Math.random() * 12, // 8px 到 20px 大小的花瓣
    duration: 6 + Math.random() * 8, // 飘落时间 6-14 秒
    delay: Math.random() * -15, // 随机错开下落时间
  }))
})
</script>

<template>
  <div class="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
    <div
        v-for="p in petals"
        :key="p.id"
        :style="{
        left: p.left,
        width: `${p.size}px`,
        height: `${p.size * 1.2}px`,
         // 樱花特有的圆角形状
        borderRadius: '100% 0 100% 0',
        animation: `sakuraFall ${p.duration}s linear infinite`,
        animationDelay: `${p.delay}s`,
    }"
        class="absolute top-0 bg-pink-300/70 shadow-[0_0_5px_rgba(255,182,193,0.6)]"
    ></div>
  </div>
</template>

<style scoped>

</style>
