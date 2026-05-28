import {inject} from 'vue'

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay = 300
): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
    let timer: any = null

    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            func.apply(this, args)
            timer = null
        }, delay)
    }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    delay = 200
): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
    let lastTime = 0

    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
        const now = Date.now()
        if (now - lastTime >= delay) {
            lastTime = now
            func.apply(this, args)
        }
    }
}

export const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "00:00";
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

export function formatUpdateTime(dateString: string) {
    if (!dateString || dateString === '2001-04-03') return '刚刚更新';
    try {
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return dateString;
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const mins = String(d.getMinutes()).padStart(2, '0');
        if (hours === '00' && mins === '00') return `${year}.${month}.${day}`;
        return `${year}.${month}.${day} ${hours}:${mins}`;
    } catch {
        return dateString;
    }
}

export function useToast() {
    const toast = inject<{ showToast: (...args: any[]) => void }>('toast')

    if (!toast) {
        throw new Error('useToast 必须在 Toast 组件的子组件中使用')
    }

    return toast
}

export function useMusic() {
    const MusicContext = inject<{ MusicContext: object }>('MusicContext')

    if (!MusicContext) {
        throw new Error('useMusic 必须在 MusicProvider 组件的子组件中使用')
    }

    return MusicContext
}

export const copyToClipboard = (text: string, label: string) => {
    return new Promise((resolve, reject) => {
        try {
            navigator.clipboard.writeText(text);
            resolve({
                text,
                label,
                code: 200
            });
        } catch (error) {
            reject(error);
        }
    })

};
