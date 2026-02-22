<script lang="ts">
    let { hasStarted } = $props()
    let time = $state(0)
    const formattedTime = $derived((time / 1000).toFixed(1))

    $effect(() => {
        let interval: ReturnType<typeof setInterval> | undefined

        if (hasStarted) {
            const startTime = Date.now()

            interval = setInterval(() => {
                const currentTime = Date.now() - startTime
                time = currentTime

                if (currentTime >= 600_000) {
                    clearInterval(interval)
                }
            }, 100)
        } else {
            time = 0
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    })
</script>

<div>
    <span class="text-xs whitespace-nowrap">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 490 490"><path d="M245 0C109.5 0 0 109.5 0 245s109.5 245 245 245 245-109.5 245-245S380.5 0 245 0zm0 449.3c-112.6 0-204.3-91.7-204.3-204.3S132.4 40.7 245 40.7 449.3 132.4 449.3 245 357.6 449.3 245 449.3z"/><path d="M290.9 224.1h-25v-95.9c0-11.5-9.4-20.9-20.9-20.9s-20.9 9.4-20.9 20.9V245c0 11.5 9.4 20.9 20.9 20.9h45.9c11.5 0 20.9-9.4 20.9-20.9s-9.5-20.9-20.9-20.9z"/></svg>  
        {formattedTime}
    </span>
</div>
