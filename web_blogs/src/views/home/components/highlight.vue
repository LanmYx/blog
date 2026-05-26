<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  query: {
    type: String,
    default: ''
  },
})
const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const safeQuery = escapeRegExp(props.query);
const regex = new RegExp(`(${safeQuery})`, 'gi');
const parts = String(props.text).split(regex);
</script>

<template>
  <span v-for="(part,index) in parts" :key="index">
    <mark v-if="part.toLowerCase() === query.toLowerCase()"
          class="bg-yellow-300 dark:bg-yellow-500/80 text-slate-900 dark:text-white px-1 mx-[1px] rounded-[4px] shadow-sm font-bold transition-all">
      {{ part }}
    </mark>
    <span v-else>{{ part }}</span>
  </span>
</template>

<style scoped>

</style>
