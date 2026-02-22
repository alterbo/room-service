import { writable, type Writable } from 'svelte/store'

type HasStartedReturn = {
    hasStarted: Writable<boolean>
    setHasStarted: (value: boolean) => void
}

export function useHasStarted(initial = false): HasStartedReturn {
    const hasStarted = writable<boolean>(initial)

    const setHasStarted = (value: boolean) => {
        hasStarted.set(value)
    }

    return { hasStarted, setHasStarted }
}