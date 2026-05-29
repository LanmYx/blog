<script lang="ts" setup>
import {useMusic} from "@/utlis/tools.ts";
import {ref, watch} from "vue";

const {isPlaying, currentLyric, currentSong} = useMusic();

const displayedLyric = ref('')
// 这里的波浪数据，方便循环渲染，减少代码冗余
const waves = [
  {color: 'bg-indigo-400', delay: '0ms'},
  {color: 'bg-purple-400', delay: '200ms'},
  {color: 'bg-indigo-500', delay: '400ms'},
  {color: 'bg-purple-500', delay: '100ms'},
  {color: 'bg-indigo-300', delay: '300ms'},
];

// 歌词展示模拟器
let typingInterval = null
watch(() => currentLyric.value, () => {
  if (typingInterval) {
    clearInterval(typingInterval)
  }
  let i = 0;
  displayedLyric.value = ''
  const target = currentLyric.value || "";
  if (!target) return;

  typingInterval = setInterval(() => {
    if (i <= target.length) {
      displayedLyric.value = target.slice(0, i)
      i++;
    } else {
      clearInterval(typingInterval);
      typingInterval = null
    }
  }, 50);

}, {immediate: true, deep: true})
</script>

<template>
  <div v-if="!currentSong"></div>
  <div
      v-else
      class="w-full rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl p-5 flex items-center justify-between transition-all duration-700 hover:shadow-indigo-500/20 group h-20">
    <!--    {/* 1. 音频波形动态部分：改用统一渲染逻辑实现过渡 */}-->
    <div class="flex items-end justify-center gap-[4px] h-8 w-16">
      <div
          v-for="(wave,index) in waves"
          :key="index"
          :class="`w-1.5 rounded-t-sm transition-all duration-500 ease-out
          ${isPlaying? `${wave.color} safe-wave-active`: 'h-1 bg-slate-600 shadow-none'}`"
          :style="{
            animationDelay: wave.delay,
            // 当暂停时，强制回到 4px 高度
            height: isPlaying ? undefined : '4px'
          }"
      ></div>
    </div>

    <!--    {/* 2. 歌词显示区 */}-->
    <div class="flex-1 px-8 flex justify-center items-center overflow-hidden">
      <p class="text-white text-lg font-bold tracking-widest truncate drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
        {{ displayedLyric }}
        <span
            class="inline-block w-[3px] h-5 bg-indigo-400 align-middle ml-1 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-cursor"></span>
      </p>
    </div>

    <!--    {/* 3. 右侧音乐图标 */}-->
    <div class="w-16 flex justify-end">
      <svg
          :class="`w-6 h-6 text-purple-600 transition-all duration-500 ${isPlaying ? 'animate-bounce' : 'opacity-30'}`"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            stroke-linecap="round" stroke-linejoin="round"
            stroke-width="{2}"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
@keyframes cursorBlink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.animate-cursor {
  animation: cursorBlink 0.8s step-end infinite;
}

/* 核心修改：让动画高度从 4px 到 28px */
@keyframes safeWave {
  0%, 100% {
    height: 8px;
  }
  50% {
    height: 28px;
  }
}

.safe-wave-active {
  animation: safeWave 1s ease-in-out infinite;
}
</style>
