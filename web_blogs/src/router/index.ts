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
                isKeepAlive: true,
            },
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/views/home/index.vue'),
                }
            ]
        },
    ],
    history: createWebHistory(),
})


export default router
