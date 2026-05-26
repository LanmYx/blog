<script lang="ts" setup>
import {ref} from "vue";
import tsconfigJson from "@/common/tsconfig.json";

import pageTransition from '@/components/pageTransition.vue'
import searchBar from './components/searchBar.vue'
import detailPost from './components/detail.vue'


const showModule = ref('searchBar')
const detailPostValue = ref(null)

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

const onChangeShowModule = (val) => {
  showModule.value = val.type
  detailPostValue.value = JSON.parse(JSON.stringify(val))
}
</script>

<template>
  <pageTransition>
    <div class="home-page w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10">
      <searchBar v-if="showModule === 'searchBar'" :posts="allPosts" @changeModule="onChangeShowModule"/>
      <detailPost v-else @changeModule="onChangeShowModule"/>
    </div>
  </pageTransition>
</template>

<style scoped>
</style>
