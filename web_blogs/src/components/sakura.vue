<script lang="ts" setup>
import {ref} from "vue";

interface Petal {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

const petals = ref()
</script>

<template>
  <div class="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">

  </div>
</template>

<style scoped>

</style>
