<script lang="ts">
    export let className
    export let liftContainer

</script>

<div class={ className }>
    <div class='bg-white border border-slate-400 dark:bg-black h-full w-10 md:w-20 relative'>
    <div class='absolute border-l-2 border-slate-400 h-full left-2/4 top-0 z-0'></div>
    <div class='flex flex-col h-full'>
        <div class='basis'></div>
        {@render liftContainer()}
    </div>
    </div>
</div>