<script lang="ts" setup>
import {onMounted, ref, onUnmounted, nextTick} from "vue";
import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';
import {siteConfig} from "@/common/siteConfig.ts";

const containerRef = ref<HTMLDivElement>(null)

const init = () => {
  if (!containerRef.value) return;
  // 清空之前的评论区（防止 Next.js 路由切换时重复渲染）
  containerRef.value.innerHTML = '';

  const gitalk = new Gitalk({
    clientID: siteConfig.gitalkConfig.clientID,
    clientSecret: siteConfig.gitalkConfig.clientSecret,
    repo: siteConfig.gitalkConfig.repo,
    owner: siteConfig.gitalkConfig.owner,
    admin: siteConfig.gitalkConfig.admin,

// 👇 指向我们自己的同源 API，彻底告别跨域和第三方拦截！
    proxy: '/api/github',

    id: location.pathname,
    distractionFreeMode: false,
  });

  gitalk.render(containerRef.value);

  // 👇 🌟 核心修复：擦除 URL 中的 OAuth 凭证，防止注销后二次登录失败
  const url = new URL(window.location.href);
  if (url.searchParams.has('code')) {
    url.searchParams.delete('code');
    // 使用 replaceState 无痕修改地址栏，页面不会刷新，也不会留下历史记录
    window.history.replaceState({}, document.title, url.toString());
  }
}
onMounted(() => {
  nextTick(() => {
    init()
  })
})

// 切换页面时销毁，防止报错
onUnmounted(() => {
  const el = document.getElementById('containerRef')
  if (el) el.innerHTML = ''
})
</script>

<template>
  <div class="w-full mt-16 relative">
    <div
        class="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl rounded-full pointer-events-none z-0"></div>

    <!--    🌟 Gitalk 容器：加入了优雅的顶部细边框，配合 custom-gitalk-glass 类名渲染毛玻璃-->
    <div ref="containerRef"
         class="relative z-10 custom-gitalk-glass pt-6 border-t border-slate-200/50 dark:border-slate-700/50"/>
  </div>
</template>

<style>
.gt-container .gt-meta {
  margin: 1.25em 0 !important;
  padding: 1em 0 !important;
  border-bottom: 1px solid color-mix(in oklab, var(--color-slate-200) 50%, transparent) !important;
  position: relative !important;
}

.gt-container .gt-popup {
  padding: 0.625em 0 !important;
  border: 1px solid #e9e9e9 !important;
}

.gt-container .gt-popup .gt-action {
  margin: 0.5em 0 !important;
  padding: 0 1.125em !important;
}

.gt-copyright {
  border-top: 1px solid #e9e9e9 !important;
  margin: 0 .9375em .5em !important;
  padding-top: .5em !important;
}

.gt-container .gt-header-comment {
  margin-left: 1.25em !important;
}

.gt-container .gt-header-textarea {
  padding: 0.75em !important;
}

.gt-container .gt-header-controls {
  margin: 0.75em 0 0 !important;
}

.custom-gitalk-glass .gt-container .gt-header-textarea {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 16px !important;
  color: inherit !important;
  transition: all 0.3s ease;
}

.custom-gitalk-glass .gt-container .gt-header-textarea:focus {
  background: rgba(255, 255, 255, 0.2) !important;
  border-color: #6366f1 !important; /* Indigo 500 */
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.3) !important;
}

.custom-gitalk-glass .gt-container .gt-header-preview {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(12px) !important;
  border-radius: 16px !important;
}

.custom-gitalk-glass .gt-container .gt-btn {
  background: #6366f1 !important;
  border: none !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4) !important;
  transition: transform 0.2s, box-shadow 0.2s;
  color: white !important;
  padding: 0.75em 1.25em !important;
  margin-left: 1.25em !important;
  font-size: 0.75em !important;
}

.custom-gitalk-glass .gt-container .gt-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6) !important;
}

.custom-gitalk-glass .gt-container .gt-comment-content {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(8px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px !important;
}

.custom-gitalk-glass .gt-container .gt-comment-admin .gt-comment-content {
  border-color: rgba(99, 102, 241, 0.3) !important;
}

.custom-gitalk-glass .gt-container .gt-avatar {
  border-radius: 50% !important;
  overflow: hidden;
}

.custom-gitalk-glass .gt-container .gt-comment-body {
  color: inherit !important;
}

.custom-gitalk-glass .gt-container a {
  color: #6366f1 !important;
}
</style>
