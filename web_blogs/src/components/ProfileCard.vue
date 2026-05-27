<script lang="ts" setup>
import {siteConfig} from "@/common/siteConfig.ts";
import StatItem from "@/components/StatItem.vue";
import {copyToClipboard} from "@/utlis/tools.ts";
import SocialBtn from "@/components/SocialBtn.vue";

const props = defineProps({
  chatterCount: Number,
  photoCount: Number,
  postCount: Number,
})

const goAbout = () => {
  console.log('goAbout')
}

const onClickSocialBtn = (type) => {
  console.log(type)
}
</script>

<template>
  <div
      class="md:col-span-7 rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-5 sm:p-6 md:p-8 flex flex-col justify-between transition-all duration-700 hover:scale-[1.01] cursor-pointer group relative overflow-hidden h-full min-h-[220px] md:min-h-[280px]"
      @click="goAbout">
    <!--    个人信息：头像+简介-->
    <div class="flex items-start justify-between relative z-10">
      <div class="flex items-center gap-4 md:gap-6 w-full">
        <div
            class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-lg flex-shrink-0 transition-transform duration-500 group-hover:rotate-3">
          <img :src="siteConfig.avatarUrl" alt="avatar"
               class="w-full h-full rounded-lg md:rounded-xl object-cover bg-white"/>
        </div>
        <div class="flex-1 min-w-0">
          <!--          {/* 🌟 核心修复点：
                    1. 增加了 pb-1 (padding-bottom) 给字母降部留空间
                    2. 增加了 leading-snug 确保行高不至于太扁
                    */}-->
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 md:mb-2 pb-1 leading-snug tracking-wider transition-colors duration-700 truncate">
            {{ siteConfig.authorName }}
          </h1>
          <p class="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-md transition-colors duration-700 line-clamp-2 md:line-clamp-none">
            {{ siteConfig.bio }}
          </p>
        </div>
      </div>
    </div>

    <!--    底部-->
    <div
        class="flex flex-col md:flex-row items-center md:items-end justify-between mt-6 md:mt-8 gap-5 md:gap-6 relative z-10">
      <div class="flex gap-2 sm:gap-6 w-full md:w-auto justify-between sm:justify-around md:justify-start px-2 sm:px-0">
        <StatItem :count="props.postCount" color="text-indigo-600 dark:text-indigo-400" label="文章"/>
        <div class="w-px h-8 md:h-10 bg-slate-300/50 dark:bg-slate-700 hidden md:block"></div>
        <StatItem :count="props.chatterCount" color="text-purple-600 dark:text-purple-400" label="杂谈"/>
        <div class="w-px h-8 md:h-10 bg-slate-300/50 dark:bg-slate-700 hidden md:block"></div>
        <StatItem :count="props.photoCount" color="text-pink-600 dark:text-pink-400" label="照片"/>
      </div>

      <div class="flex gap-2 md:gap-3 flex-wrap justify-center md:justify-end w-full md:w-auto"
           @click="(e) => e.stopPropagation()">
        <SocialBtn type="github"
                   @click="onClickSocialBtn('github')"/>
        <SocialBtn type="gitee"
                   @click="onClickSocialBtn('gitee')"/>
        <SocialBtn type="google"
                   @click="onClickSocialBtn('google')"/>
        <SocialBtn type="email" @click="() => copyToClipboard(siteConfig.social?.email || '', '邮箱')"/>
        <SocialBtn type="qq" @click="() => copyToClipboard(siteConfig.social?.qq || '', 'QQ号')"/>
        <SocialBtn type="wechat" @click="() => copyToClipboard(siteConfig.social?.wechat || '', '微信号')"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
