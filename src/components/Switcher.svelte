<script lang="ts">
    import './switcher.css'

    type Props = {
        onToggle?: (isChecked: boolean) => void
    };

    let { onToggle }: Props = $props()

    let isChecked = $state(false)

    function toggleSwitch() {
        const next = !isChecked
        isChecked = next
        onToggle?.(next)
    }

    function keyUpHandler(event: KeyboardEvent) {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault()
            toggleSwitch()
        }
    }
</script>

<label class="block border border-slate-400 p-3 switcher" for="switcher" style="cursor: pointer">
    <div
        role="switch"
        tabindex="0"
        aria-checked={isChecked}
        class="h-10 relative w-full z-0"
        onclick={toggleSwitch}
        onkeyup={keyUpHandler}
    >
        <span class="absolute bg-slate-200 h-px left-3 right-3 top-1/2 -z-0"></span>

        <div
            class={`${
                isChecked
                    ? 'bg-yellow-50 dark:bg-slate-800 translate-x-[300%]'
                    : 'bg-slate-200 dark:bg-slate-600 translate-x-0'
            } flex justify-center items-center h-full left-0 p-3 switcher-indicator w-1/4`}
        >
            {isChecked ? 'On' : 'Off'}
        </div>
    </div>
</label>