<script lang="ts" setup>
import {ref, onMounted, nextTick, reactive} from 'vue'
import fm from 'front-matter';
import {formatUpdateTime} from "@/utlis/tools.ts";

import pageTransition from '@/components/pageTransition.vue'
import searchBar from './components/searchBar.vue'
import detailPost from './components/detail.vue'
import ProfileCard from "@/components/ProfileCard.vue";
import {albums} from "@/data/albums.ts";
import CloudPlayer from "@/components/CloudPlayer.vue";
import LyricBar from "@/components/LyricBar.vue";

const showModule = ref('searchBar')
const detailPostValue = ref(null)

let allPosts: any[] = reactive([]);
let allChatters: any[] = reactive([]);
const realPhotoCount = albums.reduce((total, album) => total + album.photos.length, 0);


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
const _fetchChatters = async () => {
  // 1. 批量获取 /src/posts/ 下所有 .md 文件
  const mdFiles = import.meta.glob('/src/chatters/*.md', {as: 'raw'})

  // 2. 遍历所有文件
  for (const path in mdFiles) {
    // 读取文件原始内容
    const rawContent = await mdFiles[path]()

    // 3.拆分 元信息 + 正文
    let {attributes: data, body: content} = fm(rawContent)
    const rawDate = data.date || '1970-01-01';
    const cover = data.cover || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop';

    allChatters.push({
      slug: data.slug,
      ...data,
      title: data.title || '碎片记录',
      description: data.description || content.substring(0, 60),
      cover: cover,
      date: rawDate,
      formattedDate: formatUpdateTime(rawDate)
    });
  }
}

_fetchPosts()
_fetchChatters()
</script>

<template>
  <pageTransition>
    <div v-if="showModule === 'searchBar'"
         class="home-page w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10">
      <searchBar :posts="allPosts" @changeModule="onChangeShowModule"/>
      <main class="flex flex-col gap-6 w-full mt-6">
        <!--          {/* 第一行：个人信息 + 播放器 */}-->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          <!--            {/* 手机上占满1列，电脑上占7列 */}-->
          <div class="col-span-1 lg:col-span-7 flex flex-col">
            <ProfileCard :chatterCount="allChatters.length" :photoCount="realPhotoCount"
                         :postCount="allPosts.length"/>
          </div>
          <!--            {/* 手机上占满1列，电脑上占5列 */}-->
          <div class="col-span-1 lg:col-span-5 flex flex-col">
            <!--              <CloudPlayer/>-->
          </div>
        </div>

        <!--          {/* 歌词栏 */}-->
        <div class="w-full mt-[-10px]">
          <LyricBar/>
        </div>
      </main>
    </div>
    <detailPost v-else :post-data="detailPostValue" @changeModule="onChangeShowModule"/>
  </pageTransition>
</template>

<style scoped>
</style>
