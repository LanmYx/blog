<script lang="ts" setup>
import Fireflies from "@/components/fireflies.vue";
import Sakura from "@/components/sakura.vue";
import WindyGrass from "@/components/windyGrass.vue";
import {siteConfig} from "@/common/siteConfig.ts";
</script>

<template>
  <div v-if="siteConfig.Fireflies" class="transition-opacity duration-1000 opacity-100">
    <Fireflies/>
  </div>
  <div v-if="siteConfig.Sakura" class="transition-opacity duration-1000 opacity-100">
    <Sakura/>
  </div>
  <WindyGrass v-if="siteConfig.WindyGrass"/>
</template>

<style scoped>

</style>
