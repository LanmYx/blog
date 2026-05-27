<script lang="ts" setup>
import {computed, ref} from "vue";
import {AnimatePresence, motion} from "motion-v";
import Highlight from "@/views/home/components/highlight.vue";

interface Post {
  slug: string;
  title?: string;
  description?: string;
  tags?: string[];
  date?: string;

  [key: string]: any;
}

const props = defineProps({
  posts: {
    type: Array,
    default: () => [] as Post[]
  }
})
const emit = defineEmits(['changeModule'])

const containerRef = ref<HTMLDivElement>(null);

const searchQuery = ref('')
const isOpen = ref(false)

const onSetIsOpen = (value: boolean) => {
  isOpen.value = value
  console.log(searchQuery.value)
}

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []

  const query = searchQuery.value.toLowerCase();

  return props.posts.filter(post => {
    const titleMatch = (post.title || '').toLowerCase().includes(query);
    const descMatch = (post.description || '').toLowerCase().includes(query);
    const tagMatch = (post.tags || []).some(tag => tag.toLowerCase().includes(query));

    return titleMatch || descMatch || tagMatch;
  });
})

const onSelectSearch = (post) => {
  onSetIsOpen(false)
  console.log(post)
  emit('changeModule', {
    ...post,
    type: 'detailPost'
  })
}
</script>

<template>
  <div ref="containerRef" class="relative w-full max-w-2xl mx-auto mb-10 z-[100]">
    <form class="relative group" @onSubmit="(e) => e.preventDefault()">
      <!--      先渲染 Input-->
      <input
          v-model="searchQuery"
          autoComplete="off"
          class="w-full pl-14 pr-6 py-4 bg-white/50 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-slate-200 transition-all placeholder-slate-500 font-medium text-lg relative z-0"
          placeholder="搜寻标题、描述或标签..."
          spellCheck="false"
          type="text"
          @change="onSetIsOpen(true)"
          @focus="() => onSetIsOpen(true)"
      />

      <!--     🌟 核心修复：把放大镜放在 input 之后，并且加上 z-10 强制置顶！-->
      <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none select-none z-10">
        <svg
            class="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors drop-shadow-sm"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
        </svg>
      </div>
    </form>
    <AnimatePresence>
      <motion.div
          v-if="isOpen && searchQuery.trim() !== ''"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :exit="{ opacity: 0, y: -10, scale: 0.98 }"
          :initial="{ opacity: 0, y: -10, scale: 0.98 }"
          :transition="{ duration: 0.2 }"
          class="absolute top-full left-0 right-0 mt-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl border border-white/50 dark:border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden max-h-[450px] overflow-y-auto z-20"
      >
        <div v-if="searchResults.length" class="flex flex-col py-3">
          <div
              v-for="post in searchResults"
              :key="post.slug"
              class="px-6 py-5 hover:bg-indigo-50/80 transition-colors group border-b border-slate-100/50 last:border-0 flex flex-col gap-2"
              style="cursor: pointer"
              @click="onSelectSearch(post)">
            <div class="flex items-start justify-between gap-4">
              <h4 class="text-lg font-bold text-slate-800 dark:text-slate-200 transition-colors line-clamp-1">
                <Highlight :query="searchQuery" :text="post.title"/>
              </h4>
              <span
                  v-if="post.date"
                  class="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-1 rounded-md shrink-0 mt-1">
              {{ post.date.split(' ')[0] }}
            </span>
            </div>

            <p v-if="post.description" class="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              <Highlight :query="searchQuery" :text="post.description"/>
            </p>

            <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mt-2">
            <span v-for="tag in post.tags" :key="tag"
                  class="flex items-center text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 dark:text-slate-400 rounded-md">
                            <svg class="mr-0.5 opacity-60" fill="none" height="10" stroke="currentColor"
                                 stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                                 width="10" xmlns="http://www.w3.org/2000/svg">
                              <line x1="4" x2="20" y1="9" y2="9"></line><line x1="4" x2="20" y1="15" y2="15"></line><line
                                x1="10" x2="8" y1="3" y2="21"></line><line x1="16" x2="14" y1="3" y2="21"></line>
                            </svg>
                            <Highlight :query="searchQuery" :text="tag"/>
                          </span>
            </div>
          </div>
        </div>
        <div v-else class="px-6 py-12 text-center flex flex-col items-center gap-3">
          <div class="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" stroke-linecap="round"
                 stroke-linejoin="round"
                 stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
            </svg>
          </div>
          <p class="text-slate-500 dark:text-slate-400 font-medium">
            数据海中未发现关于 "<span class="text-indigo-500 font-bold">{{ searchQuery }}</span>" 的踪迹
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<style scoped>

</style>
