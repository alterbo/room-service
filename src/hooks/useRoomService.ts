import { get, writable, type Writable } from 'svelte/store'

type RoomServiceReturn = {
    duration: Writable<number>
    current: Writable<number>
    isMoving: Writable<boolean>
    handleLiftTo: (value: number) => void
    liftTo: (value: number) => void
    setCurrent: (value: number) => void
    destroy: () => void
}

export const useRoomService = (): RoomServiceReturn => {
    const duration = writable<number>(1)
    const current = writable<number>(0)
    const isMoving = writable<boolean>(false)

    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const clearTimeoutSafe = () => {
        if (timeoutId !== null) clearTimeout(timeoutId)
        timeoutId = null
    }

    const setCurrent = (value: number) => {
        current.set(value)
    }

    const handleLiftTo = (value: number) => {
        current.set(value)
    }

    const liftTo = (value: number) => {
        clearTimeoutSafe()

        const from = get(current)
        const d = Math.abs(value - from)

        isMoving.set(true)
        duration.set(d)
        current.set(value)

        timeoutId = setTimeout(() => {
            isMoving.set(false)
            timeoutId = null
        }, d * 1000 + 1000)
    }

    const destroy = () => {
        clearTimeoutSafe()
        isMoving.set(false)
    }

    return {
        duration,
        current,
        isMoving,
        handleLiftTo,
        liftTo,
        setCurrent,
        destroy
    }
}