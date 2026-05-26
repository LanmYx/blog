<script lang="ts" setup>
import tsconfigJson from "@/common/tsconfig.json";

import searchBar from './components/searchBar.vue'

let allPosts: any[] = [];

try {
  allPosts = tsconfigJson.posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateB !== dateA) return dateB - dateA;
    return b.slug.localeCompare(a.slug);
  });
} catch (e) {

}
</script>

<template>
  <div class="home-page w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10">
    <searchBar :posts="allPosts"/>
  </div>
</template>

<style scoped>
</style>
