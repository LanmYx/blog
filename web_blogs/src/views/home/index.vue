<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import fm from 'front-matter';
import {formatUpdateTime} from "@/utlis/tools.ts";

import pageTransition from '@/components/pageTransition.vue'
import searchBar from './components/searchBar.vue'
import detailPost from './components/detail.vue'


const showModule = ref('searchBar')
const detailPostValue = ref(null)

let allPosts: any[] = [];

const onChangeShowModule = (val) => {
  showModule.value = val.type
  detailPostValue.value = JSON.parse(JSON.stringify(val))
}

const _fetchPosts = async () => {
  // 1. 批量获取 /src/posts/ 下所有 .md 文件
  const mdFiles = import.meta.glob('/src/posts/*.md', {as: 'raw'})

  // 2. 遍历所有文件
  for (const path in mdFiles) {
    // 读取文件原始内容
    const rawContent = await mdFiles[path]()

    // 3.拆分 元信息 + 正文
    let {attributes: data, body: content} = fm(rawContent)
    const rawDate = data.date || '1970-01-01';

    allPosts.push({
      slug: data.slug,
      ...data,
      title: data.title || '',
      description: data.description || '',
      content: content || '',
      date: rawDate,
      formattedDate: formatUpdateTime(rawDate)
    });
  }

  allPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateB !== dateA) return dateB - dateA;
    return b.slug.localeCompare(a.slug);
  })
}

_fetchPosts()
</script>

<template>
  <pageTransition>
    <div class="home-page w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10">
      <searchBar v-if="showModule === 'searchBar'" :posts="allPosts" @changeModule="onChangeShowModule"/>
      <detailPost v-else :post-data="detailPostValue" @changeModule="onChangeShowModule"/>
    </div>
  </pageTransition>
</template>

<style scoped>
</style>
