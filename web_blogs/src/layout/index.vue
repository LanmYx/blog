<script lang="ts" setup>
import {reactive} from "vue";
import {type RouteRecordRaw, useRoute, useRouter} from "vue-router";

const router = useRouter()

const route = useRoute()

// 1. 定义菜单类型（关键！）
interface MenuItem {
  path: string;
  name?: string;
}

const state = reactive({
  linkPath: [] as MenuItem[],
  activePage: route.path
})

const initLinkPath = () => {
  // 获取路由
  const routes = router.getRoutes() as RouteRecordRaw[];

  // 过滤：没有子路由的页面（一级菜单）
  const linkRoutes = routes.filter(i => !i.children?.length);

  // 组装菜单
  state.linkPath = linkRoutes.map(i => ({
    path: i.path,
    name: i.meta?.name as string
  }));

}

const onChangeActivePage = (route: MenuItem) => {
  state.activePage = route.path
}

initLinkPath()
</script>

<template>
  <header
      class="w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b translate-y-0 bg-white/40 bg-slate-900/50 backdrop-blur-xl border-white/20 border-white/5 shadow-sm">
    <div class="w-[90%] max-w-6xl mx-auto h-16 flex items-center justify-between px-4 sm:px-[30px] box-border">
      <router-link
          class="text-xl font-black text-slate-800 tracking-tighter hover:text-indigo-600 transition-all duration-300"
          to="/">
        LanmSama
        <span class="text-indigo-500 mx-1">の</span>
        博客
      </router-link>
      <nav class="flex gap-8 text-sm font-bold">
        <router-link
            v-for="item in state.linkPath"
            :key="item.path"
            :class="state.activePage === item.path ? 'text-indigo-600' : 'hover:text-indigo-600 text-slate-700'"
            :to="item.path"
            class="relative py-1 transition-colors"
            @click="onChangeActivePage(item)">
          {{ item.name }}
          <span v-show="state.activePage === item.path"
                class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full animate-pulse"></span>
        </router-link>
      </nav>
    </div>
  </header>
  <section>
    <router-view></router-view>
  </section>
</template>

<style scoped>
</style>
