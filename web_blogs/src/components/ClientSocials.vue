<script lang="ts" setup>
import {siteConfig} from "@/common/siteConfig.ts";
import {copyToClipboard, useToast} from "@/utlis/tools.ts";
import HomeDetailSocialBtn from "@/components/HomeDetailSocialBtn.vue";

const {showToast} = useToast()

const onClickSocialBtn = (url) => {
  window.open(url, '_blank');
}

const onCopyText = async (text, label) => {
  const res = await copyToClipboard(text, label)
  if (res.code === 200) {
    showToast(`✨ ${res.label}已复制到剪贴板: ${res.text}`, 'success')
  }
}
</script>

<template>
  <div class="flex gap-2 flex-wrap justify-center mt-4" @click="(e) => e.stopPropagation()">
    <HomeDetailSocialBtn type="github"
                         @click="onClickSocialBtn(siteConfig.social?.github)"/>
    <HomeDetailSocialBtn type="gitee"
                         @click="onClickSocialBtn(siteConfig.social?.gitee)"/>
    <HomeDetailSocialBtn type="google"
                         @click="onClickSocialBtn(siteConfig.social?.google)"/>
    <HomeDetailSocialBtn type="email" @click="onCopyText(siteConfig.social?.email,'邮箱')"/>
    <HomeDetailSocialBtn type="qq" @click="onCopyText(siteConfig.social?.qq,'QQ')"/>
    <HomeDetailSocialBtn type="wechat" @click="onCopyText(siteConfig.social?.wechat,'微信')"/>
  </div>
</template>

<style scoped>

</style>
'
