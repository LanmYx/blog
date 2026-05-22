// 这里是路由配置
import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    routes: [
        {
            path: '/',
            name: '/',
            component: () => import('@/layout/index.vue'),
            redirect: '/home',
            meta: {
                name: "layout"
            },
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/views/home/index.vue'),
                    meta: {
                        name: '首页'
                    },
                },
                {
                    path: '/project',
                    name: 'project',
                    component: () => import('@/views/project/index.vue'),
                    meta: {
                        name: '项目'
                    },
                },
                {
                    path: '/timeline',
                    name: 'timeline',
                    component: () => import('@/views/timeline/index.vue'),
                    meta: {
                        name: '探索'
                    },
                },
                {
                    path: '/photo',
                    name: 'photo',
                    component: () => import('@/views/photo/index.vue'),
                    meta: {
                        name: '照片墙'
                    },
                },
                {
                    path: '/music',
                    name: 'music',
                    component: () => import('@/views/music/index.vue'),
                    meta: {
                        name: '音乐'
                    },
                },
                {
                    path: '/about',
                    name: 'about',
                    component: () => import('@/views/about/index.vue'),
                    meta: {
                        name: '关于'
                    },
                },
            ]
        },
    ],
    history: createWebHistory(),
})


export default router
