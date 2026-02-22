<script lang="ts">
    import LiftButton from './LiftButton.svelte'

    let { current, length, liftTo } = $props()

    const liftFloors = $derived(Array.from({ length }, (_x, i) => i).reverse())
</script>

<div class="grid grid-cols-2 gap-2 justify-center p-3 md:p-10">
    {#each liftFloors as floorNo (floorNo)}
        <LiftButton {current} {liftTo} no={floorNo} />
    {/each}
</div>