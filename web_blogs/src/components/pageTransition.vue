<script lang="ts" setup>
import {motion} from 'motion-v'
</script>

<template>
  <motion.div
      :animate="{ y: 0, opacity: 1 }"
      :initial="{ y: 20, opacity: 0 }"
      :transition="{ ease: 'easeOut', duration: 0.8 }"
  >
    <slot></slot>
  </motion.div>
</template>

<style scoped>

</style>
