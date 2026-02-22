import { derived, writable, type Readable, type Unsubscriber } from 'svelte/store'

export interface UseCounterArgs {
    activeFloor: Readable<number | null>
    current: Readable<number>
    hasStarted: Readable<boolean>
}

type CounterReturn = {
    count: Readable<number>
    reset: () => void
    destroy: () => void
}

export function useCounter({ activeFloor, current, hasStarted }: UseCounterArgs): CounterReturn {
    const count = writable<number>(0)

    const reset = () => count.set(0)

    let prevHasStarted: boolean | undefined
    let prevActiveFloor: number | null | undefined
    let prevCurrent: number | undefined

    const state = derived([activeFloor, current, hasStarted], ([$activeFloor, $current, $hasStarted]) => ({
        activeFloor: $activeFloor,
        current: $current,
        hasStarted: $hasStarted
    }))

    const unsubscribeState: Unsubscriber = state.subscribe(({ activeFloor, current, hasStarted }) => {
        if (!hasStarted) {
            reset()
            prevHasStarted = hasStarted
            prevActiveFloor = activeFloor
            prevCurrent = current
            return
        }

        const startedChanged = prevHasStarted !== undefined && prevHasStarted !== hasStarted
        const activeChanged = prevActiveFloor !== undefined && prevActiveFloor !== activeFloor
        const currentChanged = prevCurrent !== undefined && prevCurrent !== current

        if (!startedChanged && (activeChanged || currentChanged) && activeFloor !== null && activeFloor === current) {
            count.update((n) => n + 1)
        }

        prevHasStarted = hasStarted
        prevActiveFloor = activeFloor
        prevCurrent = current
    })

    const destroy = () => {
        unsubscribeState()
    }

    return { count, reset, destroy }
}