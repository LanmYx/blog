<script lang="ts" setup>

const props = defineProps({
  count: {type: Number},
  color: {type: String},
  label: {type: String},
})
</script>

<template>
  <div class="text-center group/stat px-2">
    <div :class="`text-xl md:text-2xl font-black transition-transform group-hover/stat:scale-110 ${color}`">{{
        count
      }}
    </div>
    <div
        class="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>

</style>
