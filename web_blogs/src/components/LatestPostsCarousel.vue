<script lang="ts" setup>
import {AnimatePresence, motion} from "motion-v";
import {computed, nextTick, onMounted, ref, toRefs} from "vue";

const props = defineProps({
  posts: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['changeModule'])

const currentIndex = ref(0)


let timer = null

const startSlider = () => {
  if (props.posts.length <= 1) return;
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.posts.length;
  }, 5000); // 5秒切换一次
}

const currentPost = computed(() => {
  return props.posts[currentIndex.value]
})

const onGoDetail = () => {
  emit('changeModule', {
    type: 'detail',
    ...currentPost.value
  })
}

onMounted(() => {
  nextTick(() => {
    startSlider()
  })
})
</script>

<template>
  <div
      class="md:col-span-4 rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden relative group min-h-[420px] h-full flex flex-col"
      style="cursor: pointer"
      @click="onGoDetail">

    <!--    {/* 带有渐变交叉淡入淡出的图片背景 */}-->
    <AnimatePresence mode="wait">
      <motion.div
          :key="currentPost.slug"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :initial="{ opacity: 0 }"
          :transition="{ duration: 0.8 }"
          class="absolute inset-0 z-0"
      >
        <img :alt="currentPost.title"
             :src="currentPost.cover"
             class="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
      </motion.div>
    </AnimatePresence>

    <!--    {/* 文本内容区 */}-->
    <div class="relative z-10 flex flex-col justify-end p-6 w-full mt-auto h-full pointer-events-none">
      <div class="flex items-center gap-2 mb-3">
        <span
            class="px-3 py-1 bg-indigo-500/80 backdrop-blur-lg rounded-full text-[10px] text-white font-black uppercase tracking-widest shadow-lg">Latest Insight</span>
        <span v-if="currentPost.formattedDate "
              class="px-2 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-[10px] text-white/90 font-mono tracking-wider">
              <i class="ri-time-line mr-1"></i>{{ currentPost.formattedDate }}
            </span>
      </div>
      <h2 class="text-2xl font-bold text-white mb-2 group-hover:-translate-y-1 transition-transform drop-shadow-md">
        {{ currentPost.title }}</h2>
      <p class="text-sm text-gray-300 line-clamp-3 drop-shadow-sm mb-6">{{ currentPost.description }}</p>
    </div>

    <!--    {/* 底部导航小圆点 (放在可点击的 Link 层之上) */}-->
    <div class="absolute bottom-4 right-6 z-30 flex gap-2">
      <button
          v-for="(_,i) in posts"
          :key="i"
          :aria-label="`切换到第 ${i + 1} 篇文章`"
          :class="`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-6 bg-indigo-400' : 'w-2 bg-white/40 hover:bg-white/80'}`"
          @click="(e) => {
            e.stopPropagation(); // 阻止触发父级的外层跳转
            currentIndex = i
           }"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
