import { derived, writable, type Readable, type Unsubscriber, type Writable } from 'svelte/store'

export interface UseLightsArgs {
    current: Readable<number | null>
    duration: Readable<number>
    floorsLength: number
    hasStarted: Readable<boolean>
    onActiveFloorMatch: (activeFloor: number) => void
}

type UseLightsReturn = {
    lightColors: Writable<string[]>
    setLightColors: (value: string[] | ((prev: string[]) => string[])) => void
    reset: () => void
    destroy: () => void
}

export function useLights({
    current,
    duration,
    floorsLength,
    hasStarted,
    onActiveFloorMatch
}: UseLightsArgs): UseLightsReturn {
    const lightColors = writable<string[]>(new Array(floorsLength).fill('white'))

    let unsubscribeState: Unsubscriber | null = null

    let lastRandomFloor: number | null = null

    let intervalId: ReturnType<typeof setInterval> | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    let latestCurrent: number | null = null
    let latestDuration = 1
    let latestHasStarted = false

    let prevHasStarted: boolean | undefined
    let prevCurrent: number | null | undefined
    let prevDuration: number | undefined

    const setLightColors = (value: string[] | ((prev: string[]) => string[])) => {
        if (typeof value === 'function') lightColors.update(value as (prev: string[]) => string[])
        else lightColors.set(value)
    }

    const clearIntervalSafe = () => {
        if (intervalId) clearInterval(intervalId)
        intervalId = null
    }

    const clearTimeoutSafe = () => {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = null
    }

    const reset = () => {
        clearIntervalSafe()
        clearTimeoutSafe()
        lastRandomFloor = null
        lightColors.set(new Array(floorsLength).fill('white'))
    }

    const ensureLength = (nextFloorsLength: number) => {
        lightColors.update((prev) => {
            if (prev.length === nextFloorsLength) return prev
            return new Array(nextFloorsLength).fill('white')
        })
    }

    const pickRandomFloor = () => {
        if (!latestHasStarted) return null
        if (floorsLength <= 1) return null

        const candidates: number[] = []
        for (let i = 0; i < floorsLength; i++) {
            if (latestCurrent !== null && i === latestCurrent) continue
            if (lastRandomFloor !== null && i === lastRandomFloor) continue
            candidates.push(i)
        }

        if (candidates.length === 0) {
            for (let i = 0; i < floorsLength; i++) {
                if (latestCurrent !== null && i === latestCurrent) continue
                candidates.push(i)
            }
        }

        if (candidates.length === 0) return null
        return candidates[Math.floor(Math.random() * candidates.length)]
    }

    const updateLightColorsTick = () => {
        const randomFloor = pickRandomFloor()
        if (randomFloor === null) return

        lastRandomFloor = randomFloor

        lightColors.update((prev) => {
            if (prev[randomFloor] === 'yellow') return prev
            const next = prev.slice()
            next[randomFloor] = 'yellow'
            return next
        })
    }

    const scheduleCurrentTimeout = () => {
        clearTimeoutSafe()

        if (!latestHasStarted) return
        if (latestCurrent === null) return

        const currentFloor = latestCurrent
        const durationSeconds = latestDuration

        timeoutId = setTimeout(() => {
            lightColors.update((prev) => {
                const currentColor = prev[currentFloor]
                if (currentColor === undefined) return prev

                if (currentColor === 'yellow') onActiveFloorMatch(currentFloor)
                if (currentColor === 'white') return prev

                const next = prev.slice()
                next[currentFloor] = 'white'
                return next
            })
        }, (durationSeconds + 3.5) * 1000)
    }

    const handleStateChange = () => {
        ensureLength(floorsLength)

        if (!latestHasStarted) {
            if (prevHasStarted !== false) reset()
            prevHasStarted = latestHasStarted
            prevCurrent = latestCurrent
            prevDuration = latestDuration
            return
        }

        if (!intervalId) intervalId = setInterval(updateLightColorsTick, 5000)

        const currentChanged = prevCurrent !== undefined && prevCurrent !== latestCurrent
        const durationChanged = prevDuration !== undefined && prevDuration !== latestDuration
        const startedChanged = prevHasStarted !== undefined && prevHasStarted !== latestHasStarted

        if (startedChanged || currentChanged || durationChanged || prevCurrent === undefined) {
            scheduleCurrentTimeout()
        }

        prevHasStarted = latestHasStarted
        prevCurrent = latestCurrent
        prevDuration = latestDuration
    }

    const destroy = () => {
        clearIntervalSafe()
        clearTimeoutSafe()
        unsubscribeState?.()
        unsubscribeState = null
    }

    const state = derived([current, duration, hasStarted], ([$current, $duration, $hasStarted]) => ({
        current: $current,
        duration: $duration,
        hasStarted: $hasStarted
    }))

    unsubscribeState = state.subscribe(({ current, duration, hasStarted }) => {
        latestCurrent = current
        latestDuration = duration
        latestHasStarted = hasStarted
        handleStateChange()
    })

    return { lightColors, setLightColors, reset, destroy }
}