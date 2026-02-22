<script lang="ts">
    import { onDestroy } from "svelte"
    import { writable } from "svelte/store"
    import Building from "./components/Building.svelte"
    import Clock from "./components/Clock.svelte"
    import Counter from "./components/Counter.svelte"
    import FloorsContainer from "./components/FloorsContainer.svelte"
    import Header from "./components/Header.svelte"
    import Lift from "./components/Lift.svelte"
    import LiftContainer from "./components/LiftContainer.svelte"
    import LiftControls from "./components/LiftControls.svelte"
    import LiftHeader from "./components/LiftHeader.svelte"
    import Switcher from "./components/Switcher.svelte"
    import { FLOORS } from "./data/floors"
    import { setCurrentPosition } from "./helpers/set-current-position"
    import { useElementHeight } from "./hooks/useBuildingHeight"
    import { useCounter } from "./hooks/useCounter"
    import { useHasStarted } from "./hooks/useHasStarted"
    import { useLights } from "./hooks/useLights"
    import { useRoomService } from "./hooks/useRoomService"
    import type { Floor } from "./interfaces/floor"

    const floors: Floor[] = FLOORS
    const { hasStarted, setHasStarted } = useHasStarted()
    const { elementRef, height } = useElementHeight<HTMLDivElement>()
    const { duration, current, liftTo, destroy: destroyRoomService } = useRoomService()
    const activeFloor = writable<number | null>(null)

    const handleActiveFloor = (floorNumber: number) => {
        activeFloor.set(floorNumber)
    }

    const { lightColors, destroy: destroyLights } = useLights({
        current,
        duration,
        floorsLength: floors.length,
        hasStarted,
        onActiveFloorMatch: handleActiveFloor,
    })

    const { count, destroy: destroyCounter } = useCounter({
        activeFloor,
        current,
        hasStarted,
    })

    const hasStartedHandler = (isChecked: boolean) => {
        setHasStarted(isChecked)
        activeFloor.set(null)
    }

    onDestroy(() => {
        destroyLights()
        destroyCounter()
        destroyRoomService()
    })

    $: liftPosition = setCurrentPosition($current, floors.length, $height)
</script>

<main class="gap-3 grid grid-cols-2 grid-rows-layout h-screen px-3 w-full">
    <div class="col-span-2 py-7">
        <Header />
    </div>
    <div use:elementRef class="mb-10 ml-auto justify-self-stretch">
        <Building>
            {#snippet building()}
                <FloorsContainer
                    className='col-span-9'
                    current={ $current }
                    duration={ $duration }
                    { floors }
                    hasStarted={ $hasStarted }
                    lightColors={ $lightColors }
                />
                <LiftContainer className="col-start-10 col-span-2">
                    {#snippet liftContainer()}
                        <Lift
                            duration={ $duration }
                            position={ liftPosition }
                        />
                    {/snippet}
                </LiftContainer>
            {/snippet}
        </Building>
    </div>
    <div class="flex flex-col h-full justify-self-start max-w-[360px] w-full">
        <Switcher onToggle={ hasStartedHandler }/>
        <div class="mb-auto mt-10">
            <LiftHeader />
            <div class="border border-slate-200 mt-3">
                <div class="items-center bg-slate-100 dark:bg-slate-600 flex flex-wrap justify-between p-3 w-full">
                    <Clock hasStarted={ $hasStarted }/>
                    <Counter count={ $count }/>
                </div>
                <LiftControls
                    current={ $current }
                    length={ floors.length }
                    { liftTo }
                />
            </div>
        </div>
    </div>
</main>
