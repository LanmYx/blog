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