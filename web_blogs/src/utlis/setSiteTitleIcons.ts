// 动态设置网站标题
import {siteConfig} from "../common/siteConfig.ts";

function setTitle() {
    document.title = siteConfig.title || '默认标题'
}

// 动态设置网站 favicon 图标
function setFavicon() {
    let favicon = document.querySelector('link[rel="icon"]')

    // 如果没有图标标签，就创建一个
    if (!favicon) {
        favicon = document.createElement('link')
        favicon.rel = 'icon'
        document.head.appendChild(favicon)
    }

    favicon.href = siteConfig.faviconUrl || '/favicon.ico'
}

setTitle()
setFavicon()
