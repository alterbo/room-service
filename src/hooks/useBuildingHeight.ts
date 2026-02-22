import { writable, type Readable } from 'svelte/store'

type ElementHeightReturn<T extends HTMLElement> = {
    elementRef: (node: T) => { destroy(): void }
    height: Readable<number>
}

export function useElementHeight<T extends HTMLElement>(): ElementHeightReturn<T> {
    const height = writable(0)

    const elementRef = (node: T) => {
        let lastHeight = -1
        let rafId: number | null = null

        const measureAndSet = () => {
            rafId = null
            const nextHeight = node.offsetHeight
            if (nextHeight === lastHeight) return
            lastHeight = nextHeight
            height.set(nextHeight)
        }

        const scheduleUpdate = () => {
            if (rafId !== null) return
            rafId = window.requestAnimationFrame(measureAndSet)
        }

        scheduleUpdate()

        const resizeObserver =
            typeof ResizeObserver !== 'undefined'
                ? new ResizeObserver(() => scheduleUpdate())
                : null

        resizeObserver?.observe(node)

        if (!resizeObserver) {
            window.addEventListener('resize', scheduleUpdate)
        }

        return {
            destroy() {
                if (rafId !== null) window.cancelAnimationFrame(rafId)
                if (!resizeObserver) window.removeEventListener('resize', scheduleUpdate)
                resizeObserver?.disconnect()
            }
        }
    }

    return { elementRef, height }
}