<script lang="ts">
    import CoffeeCup from './CoffeeCup.svelte'
    import OrderIndicator from './OrderIndicator.svelte'

    const {
        active = false,
        duration,
        hasStarted,
        label,
        light
    } = $props()

    const coffeeStyle = $derived.by(() => {
        const delaySeconds = duration + 2
        return `
            animation-delay: ${delaySeconds}s;
            animation-duration: 5s;
            animation-name: coffeeOut;
            animation-fill-mode: both;
            bottom: 0;
            left: 0;
        `.trim();
    })
</script>

<div class="dark:bg-black border-b border-slate-400 flex h-full relative w-full">
    <div class="absolute flex flex-col h-full left-0 z-10">
        <h2 class="left-0 mb-1 mx-3 mt-3 text-sm">{label}</h2>

        <div class="mx-1 w-10">
            <OrderIndicator {light} />
        </div>
    </div>

    <div class="h-2/3 relative self-end w-full">
        <div class="absolute flex justify-end h-full left-2/4 outline-1 outline outline-slate-400 w-2/12">
            <div class="bg-white dark:bg-black w-full"></div>
        </div>

        {#if hasStarted && active}
            <CoffeeCup className="absolute max-w-35 md:max-w-47" style={coffeeStyle} />
        {/if}

        <div class="absolute bg-white border-r border-slate-400 dark:bg-black h-full left-0 mr-1 right-2/4 w-6/12 z-2"></div>
    </div>
</div>
