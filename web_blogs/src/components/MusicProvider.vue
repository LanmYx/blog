<script lang="ts" setup>

// 【增强版 LRC 歌词解析】
import {computed, onMounted, onUnmounted, provide, reactive, ref, toRefs, watch} from "vue";
import {siteConfig} from "@/common/siteConfig.ts";

function parseLrc(lrcText: string) {
  if (!lrcText || lrcText.length > 30000) return [];

  const lines = lrcText.split(/\r?\n/);
  const result = [];

  for (let line of lines) {
    const matches = [...line.matchAll(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?\]/g)];
    if (matches.length > 0) {
      let text = line.replace(/\[\d{2,}:\d{2}(?:\.\d{2,3})?\]/g, '').trim();

      // 剔除控制字符
      const cleanText = text.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, "");

      if (cleanText) {
        for (const match of matches) {
          const min = parseInt(match[1]);
          const sec = parseInt(match[2]);
          const ms = match[3] ? parseInt(match[3]) : 0;
          const divisor = match[3] && match[3].length === 3 ? 1000 : 100;
          const time = min * 60 + sec + ms / divisor;
          result.push({time, text: cleanText});
        }
      }
    }
  }
  return result.sort((a, b) => a.time - b.time);
}

// 🌟 1. 扩充 Context 类型，加入 MusicPage 需要的所有属性
type PlayMode = 'loop' | 'single' | 'random';

interface MusicContextType {
  playlist: any[];
  currentIndex: number;
  currentSong: any; // 扩展了 lyrics 属性
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  currentLyric: string;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  playMode: PlayMode;

  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  handleSeek: () => void;
  playSong: (index: number) => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
  togglePlayMode: () => void;
}

const currentSong = computed(() => state.playlist[state.currentIndex] || null)

const state = reactive({
  playlist: [] as any,
  currentIndex: 0,
  isPlaying: false as boolean,
  progress: 0,
  currentTime: 0,
  duration: 0,
  lyrics: [] as { time: number; text: string }[],
  currentLyric: "正在连接高可用神经云端...",
  isLoading: true as boolean,

  // 🌟 2. 新增音量和播放模式状态
  volume: 1,
  isMuted: false as boolean,
  playMode: 'loop' as PlayMode,

})


const audioRef = ref<HTMLAudioElement>(null);

let isMounted = true;

const fetchMusicData = async () => {
  try {
    const fetchPromises = siteConfig.cloudMusicIds.map(id =>
        fetch(`https://api.injahow.cn/meting/?server=netease&type=song&id=${id}`)
            .then(res => res.json())
            .catch(() => null)
    );
    const results = await Promise.all(fetchPromises);

    const mergedPlaylist = results
        .filter(res => res && res.length > 0)
        .map(res => ({
          id: res[0].id || Math.random().toString(),
          title: res[0].name || res[0].title || '未知歌曲',
          artist: res[0].author || res[0].artist || '未知歌手',
          cover: res[0].pic || res[0].cover || 'https://bu.dusays.com/2026/03/24/69c24230a5ff8.jpg',
          src: res[0].url,
          lrcUrl: res[0].lrc,
          lyrics: [] // 🌟 初始化时预留一个空数组
        }))
        .filter(song => song.src);

    if (isMounted) {
      if (mergedPlaylist.length > 0) state.playlist = [...mergedPlaylist];
      else state.currentLyric = '云端链路受阻';
      state.isLoading = false
    }
  } catch (error) {
    if (isMounted) {
      state.currentLyric = "网络初始化失败";
      state.isLoading = false;
    }
  }
};

const togglePlay = () => {
  if (audioRef.value) {
    if (state.isPlaying) audioRef.value.pause();
    else audioRef.value.play().catch(() => state.isPlaying = false);
    state.isPlaying = !state.isPlaying;
  }
};

// 🌟 5. 重写 nextSong，加入对随机模式的处理
const nextSong = () => {
  if (state.playMode === 'random') {
    state.currentIndex = Math.floor(Math.random() * state.playlist.length)
  } else {
    state.currentIndex = (state.currentIndex + 1) % state.playlist.length;
  }
};

const prevSong = () => {
  if (state.playMode === 'random') {
    state.currentIndex = Math.floor(Math.random() * playlist.length)
  } else {
    state.currentIndex = (state.currentIndex - 1 + state.playlist.length) % state.playlist.length;
  }
};

// 🌟 6. 暴露直接播放指定歌曲的方法
const playSong = (index: number) => {
  state.currentIndex = index;
  if (!state.isPlaying) state.isPlaying = true; // 保证切歌后自动播放
};

const handleTimeUpdate = () => {
  if (audioRef.value) {
    const {currentTime, duration} = audioRef.value;
    state.currentTime = currentTime
    state.duration = duration || 0
    state.progress = (currentTime / (duration || 1)) * 100

    if (state.lyrics.length > 0) {
      const activeLyric = state.lyrics.slice().reverse().find(l => currentTime >= l.time);
      if (activeLyric && activeLyric.text !== state.currentLyric) {
        state.currentLyric = activeLyric.text
      }
    }
  }
};

// 🌟 7. 处理歌曲结束
const handleEnded = () => {
  if (state.playMode === 'single' && audioRef.value) {
    audioRef.value.currentTime = 0;
    audioRef.value.play();
  } else {
    nextSong();
  }
};

const handleSeek = (e) => {
  const newProgress = Number(e.target.value);
  state.progress = newProgress;
  if (audioRef.value && audioRef.value.duration) {
    audioRef.value.currentTime = (newProgress / 100) * audioRef.value.duration;
  }
};

const setVolume = (val: number) => {
  state.volume = val
  if (state.isMuted && val > 0) state.isMuted = false;
};

const toggleMute = () => state.isMuted = !state.isMuted;

const togglePlayMode = () => {
  if (state.playMode === 'loop') {
    state.playMode = 'single';
  } else if (state.playMode === 'single') {
    state.playMode = 'random';
  } else {
    state.playMode = 'loop';
  }
};

watch(() => [state.currentIndex, state.playlist.length], () => {
  if (!state.playlist.length) return
  isMounted = true
  // currentSong.value = state.playlist[state.currentIndex];
  state.lyrics = []
  state.currentLyric = '♪ 正在缓冲 ♪'
  if (currentSong.value.lrcUrl) {
    fetch(currentSong.value.lrcUrl)
        .then(res => res.text())
        .then(text => {
          if (isMounted) {
            const parsed = parseLrc(text);
            state.lyrics = parsed
            // 🌟 3. 将解析好的歌词反向写入到 playlist 的 currentSong 中，供 MusicPage 读取！
            state.playlist = state.playlist.map((item, idx) =>
                idx === currentIndex.value
                    ? {...item, lyrics: parsed}
                    : item
            );
          }
        })
        .catch(() => {
          if (isMounted) state.currentLyric = '♪ 纯享音乐 ♪';
        });
  }
  if (state.isPlaying && audioRef.value) {
    const playPromise = audioRef.value.play();
    if (playPromise !== undefined) {
      playPromise.then(() => state.isPlaying = false);
    }
  }
}, {immediate: false})

watch(() => [state.volume, state.isMuted], () => {
  if (audioRef.value) {
    audioRef.value.volume = state.isMuted ? 0 : state.volume;
  }
}, {immediate: false})

provide('MusicContext', {
  ...toRefs(state), // 暴露新状态
  currentSong,
  togglePlay, nextSong, prevSong, handleSeek,
  playSong, setVolume, toggleMute, togglePlayMode // 暴露新方法
} as MusicContextType)

onMounted(async () => {
  isMounted = true
  if (siteConfig.cloudMusicIds?.length > 0) await fetchMusicData();
  else state.isLoading = false
})

onUnmounted(() => {
  isMounted = false
})
</script>

<template>
  <!-- 注入全局状态 -->
  <div>
    <Teleport to="body">
      <audio
          v-if="currentSong"
          ref="audioRef"
          :src="currentSong.src"
          @ended="handleEnded"
          @loadedmetadata="handleTimeUpdate"
          @timeupdate="handleTimeUpdate"
      />
    </Teleport>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>
