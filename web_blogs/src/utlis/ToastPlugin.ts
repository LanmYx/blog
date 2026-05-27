import {createVNode, render} from 'vue'
import Toast from '../components/toast.vue'

let toastNode: null = null
let toastContainer: HTMLElement | null = null

export const showToast = (message: string, type = 'success') => {
    // 单例模式，只创建一次
    if (!toastNode) {
        toastContainer = document.createElement('div')
        document.body.appendChild(toastContainer)

        toastNode = createVNode(Toast)
        render(toastNode, toastContainer)
    }

    // 调用组件内部方法
    if (toastNode.component?.exposed?.showToast) {
        toastNode.component.exposed.showToast(message, type)
    }
}

// 全局注册插件
export default {
    install(app: any) {
        app.config.globalProperties.$showToast = showToast
    }
}
