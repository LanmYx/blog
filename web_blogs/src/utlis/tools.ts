import {showToast} from './ToastPlugin.ts'

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


export const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`✨ ${label}已复制到剪贴板: ${text}`, 'success');
};
