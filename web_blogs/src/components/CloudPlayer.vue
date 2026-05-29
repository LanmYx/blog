<script lang="ts" setup xmlns:animationPlayState="http://www.w3.org/1999/xhtml">
import {useMusic, formatTime} from "@/utlis/tools.ts";
import {useRouter} from "vue-router";
import {onUnmounted, ref, watch} from "vue";

const router = useRouter()
const {
  playlist, isPlaying, progress, currentTime, duration, currentLyric, isLoading,
  currentSong,
  togglePlay,
  nextSong,
  prevSong,
  handleSeek
} = useMusic();


const displayedLyric = ref('')

// 🌟 拦截事件防冒泡的专属函数
const safeTogglePlay = (e) => {
  e.preventDefault();
  e.stopPropagation();
  togglePlay();
};

const safePrevSong = (e) => {
  e.preventDefault();
  e.stopPropagation();
  prevSong();
};

const safeNextSong = (e) => {
  e.preventDefault();
  e.stopPropagation();
  nextSong();
};

const safeHandleSeek = (e) => {
  e.stopPropagation();
  handleSeek(e);
};

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


onUnmounted(() => {
  if (typingInterval) {
    clearInterval(typingInterval)
    typingInterval = null
  }
})
</script>

<template>
  <div v-if="isLoading"
       class="h-full w-full rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 flex flex-col items-center justify-center transition-colors duration-700">
    <div class="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
    <span class="text-slate-800 dark:text-white font-bold tracking-widest animate-pulse text-sm">CONNECTING...</span>
  </div>
  <div v-else-if="playlist.length === 0 || !currentSong"
       class="h-full w-full rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 flex flex-col items-center justify-center transition-all duration-700">
    <div
        class="w-16 h-16 mb-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shadow-inner opacity-50">
      <svg class="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
    </div>
    <span
        class="text-slate-500 dark:text-slate-400 font-bold tracking-widest text-xs uppercase">No Music Available</span>
    <span class="text-[10px] text-slate-400 mt-1">请检查播放列表或网络连接</span>
  </div>
  <div
      v-else
      class="h-full w-full rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 flex flex-col justify-between transition-all duration-700 hover:scale-[1.02] relative group overflow-hidden cursor-pointer"
      @click="() => router.push('/music')"
  >
    <div
        :class="`absolute -top-20 -right-20 w-48 h-48 bg-indigo-500/20 blur-[50px] rounded-full transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-30'}`"></div>

    <div class="flex items-center gap-5 relative z-10 mb-6 mt-2">
      <div
          :style="{
        animationPlayState: isPlaying ? 'running' : 'paused',
    willChange: 'transform'
    }"
          class="w-20 h-20 rounded-full border-2 border-white/50 shadow-lg flex-shrink-0 overflow-hidden relative animate-[spin_6s_linear_infinite]"
      >
        <img :src="currentSong.cover" alt="cover" class="w-full h-full object-cover" referrerPolicy="no-referrer"/>
        <div class="absolute inset-0 bg-black/10"></div>
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-300 shadow-inner"></div>
      </div>

      <div class="flex-col overflow-hidden w-full">
        <div class="flex items-center justify-between mb-1">
          <span
              class="text-[10px] font-black text-indigo-500 dark:text-indigo-400 tracking-widest uppercase bg-white/50 dark:bg-slate-900/50 px-2 py-0.5 rounded-sm shadow-sm transition-colors duration-700">Cloud Music</span>
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white truncate drop-shadow-sm transition-colors duration-700">
          {{ currentSong.title }}</h3>
        <p class="text-sm text-slate-700 dark:text-slate-300 font-medium truncate drop-shadow-sm transition-colors duration-700">
          {{ currentSong.artist }}</p>
      </div>
    </div>

    <div class="relative z-10 mb-2 h-6 overflow-hidden">
      <p class="text-xs font-bold text-indigo-600 dark:text-indigo-400 truncate">{{ displayedLyric }}</p>
    </div>

    <div class="relative z-10 mt-auto">
      <!--    {/* 🌟 核心拦截：把进度条的点击也拦住 */}-->
      <div
          class="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-bold mb-3 transition-colors duration-700"
          @click="(e) => { e.preventDefault(); e.stopPropagation() }"
          @pointerdown="(e) => { e.stopPropagation(); }"
      >
        <span class="w-10 text-right">{{ formatTime(currentTime) }}</span>
        <input
            :style="{ background: `linear-gradient(to right, #818cf8 ${progress}%, rgba(148,163,184,0.4) ${progress}%)` }"
            :value="progress"
            class="flex-1 h-1.5 bg-white/40 dark:bg-slate-700/50 rounded-full appearance-none outline-none cursor-pointer shadow-inner"
            max="100"
            min="0"
            type="range"
            @change="safeHandleSeek"
        />
        <span class="w-10">{{ formatTime(duration) }}</span>
      </div>

      <!--  {/* 🌟 核心拦截：使用我们上面写的 safe 函数，阻止事件冒泡 */}-->
      <div class="flex items-center justify-center gap-6">
        <button
            class="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors drop-shadow-sm relative z-20"
            @click="safePrevSong">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        <button
            class="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-600 hover:scale-110 transition-all border-2 border-white/50 dark:border-slate-600 relative z-20"
            @click="safeTogglePlay">
          <svg v-if="isPlaying" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
          <svg v-else class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>

        <button
            class="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors drop-shadow-sm relative z-20"
            @click="safeNextSong">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
