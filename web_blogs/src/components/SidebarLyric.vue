<script lang="ts" setup>
import {useMusic} from "@/utlis/tools.ts";
import {ref, watch} from "vue";

const {currentSong, currentLyric, isPlaying} = useMusic();
const displayedLyric = ref('')

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

}, {immediate: false, deep: true})
</script>

<template>
  <div
      class="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-xl transition-colors duration-700">
    <h3 class="font-black text-slate-900 dark:text-white mb-4 border-l-4 border-indigo-500 pl-2 text-sm">NOW
      PLAYING</h3>

    <div class="flex items-center gap-4 mb-4">
      <!--      {/* 旋转封面 */}-->
      <div
          :style="{ animationPlayState: isPlaying ? 'running' : 'paused' }"
          class="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-md animate-[spin_6s_linear_infinite]"
      >
        <img :src="currentSong.cover" alt="cover" class="w-full h-full object-cover"/>
      </div>

      <div class="flex-1 overflow-hidden">
        <h4 class="text-sm font-bold text-slate-900 dark:text-white truncate">{{ currentSong.title }}</h4>
        <p class="text-xs text-slate-500 truncate">{{ currentSong.artist }}</p>
      </div>
    </div>

    <!--    {/* 歌词打字机 */}-->
    <div
        class="bg-slate-100/50 dark:bg-slate-900/50 p-3 rounded-xl min-h-[60px] flex items-center justify-center text-center shadow-inner">
      <p class="text-xs font-bold text-indigo-600 dark:text-indigo-400">
        {{ displayedLyric }}
        <span class="inline-block w-[3px] h-3 ml-1 bg-indigo-500 animate-cursor align-middle"></span>
      </p>
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
</style>
