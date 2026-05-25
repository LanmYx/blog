<script lang="ts" setup>
import {onMounted, ref} from "vue";

interface WildBlade {
  id: number;
  height: number;
  width: number;
  delay: number;
  duration: number;
  opacity: number;
  left: string;
  isLeftCurve: boolean;
}

const blades = ref<WildBlade[]>([])

onMounted(() => {
  blades.value = Array.from({length: 150}).map((_, i) => ({
    id: i, height: 30 + Math.random() * 50, width: 1 + Math.random() * 2,
    delay: Math.random() * -10, duration: 3 + Math.random() * 4,
    opacity: 0.2 + Math.random() * 0.4,
    left: `${(i / 150) * 100 + (Math.random() - 0.5) * 0.5}%`,
    isLeftCurve: Math.random() > 0.5
  }))
})
</script>

<template>
  <div
      class="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-10 overflow-hidden transition-colors duration-1000">
    <div v-for="blade in blades" :key="blade.id" :style="{ left: blade.left, height: `${blade.height}px`, width: `${blade.width * 4}px`, opacity: blade.opacity,
         animation: `swayWildGrass ${blade.duration}s ease-in-out infinite alternate`, animationDelay: `${blade.delay}s` }"
         class="absolute bottom-0 origin-bottom flex items-end">
      <div :style="{ width: `${blade.width}px`, borderRadius: blade.isLeftCurve ? '100% 0 0 100%' : '0 100% 100% 0', transform: blade.isLeftCurve ? 'translateX(50%)' : 'translateX(-50%)' }"
           class="w-full h-full transition-all duration-1000 bg-gradient-to-t from-emerald-500/80 to-transparent"
      ></div>
    </div>
  </div>
</template>

<style scoped>

</style>
