import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

import postcssPresetEnv from 'postcss-preset-env';

const viteConfig = defineConfig(({mode, command}) => {
    const env = loadEnv(mode, process.cwd())
    return {
        plugins: [
            vue(),
            tailwindcss(),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        server: {
            host: '0.0.0.0',
            port: env.VITE_PORT as unknown as number,
            open: JSON.parse(env.VITE_OPEN),
            hmr: true,
            proxy: {
                // '/gitee': {
                //     target: 'https://gitee.com',
                //     ws: true,
                //     changeOrigin: true,
                //     rewrite: (path) => path.replace(/^\/gitee/, ''),
                // },
            },
        },
        css: {
            postcss: { // 处理css在不同浏览器的兼容性问题
                plugins: [postcssPresetEnv()]
            }
        }
    }
})
export default viteConfig
