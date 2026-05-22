import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const viteConfig = defineConfig(({mode, command}) => {
    const env = loadEnv(mode, process.cwd())
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        }
    }
})
export default viteConfig
