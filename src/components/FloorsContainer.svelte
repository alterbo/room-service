<script lang="ts">
    import Floor from './Floor.svelte'
    import type { Floor as FloorType } from '../interfaces/floor'

    const { className, current, duration, floors, hasStarted, lightColors } = $props()

    const reversedFloors = $derived(
        floors
            .map((floor: FloorType, index: number) => ({ floor, index }))
            .reverse()
    )
</script>

<div class={className}>
    <div class="border-l border-slate-400 border-t flex-grow grid max-x-auto max-w min-h-full">
        {#each reversedFloors as item (item.floor.id)}
            <Floor
                active={current === Number(item.floor.id)}
                {duration}
                {hasStarted}
                label={item.floor.label}
                light={lightColors[item.index]}
            />
        {/each}
    </div>
</div>