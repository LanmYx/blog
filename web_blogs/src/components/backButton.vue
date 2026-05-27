<script lang="ts" setup>

const emit = defineEmits(['back'])

const onBack = () => {
  emit('back');
}
</script>

<template>
  <button
      class="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-all duration-300 group mb-8 bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full w-max shadow-sm cursor-pointer outline-none"
      @click="onBack"
  >
    <svg class="w-4 h-4 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor"
         viewBox="0 0 24 24">
      <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linecap="round" stroke-linejoin="round" stroke-width="{2}"/>
    </svg>
    返回上一级
  </button>
</template>

<style scoped>

</style>
