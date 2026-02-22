<script lang="ts">
  export let no: number
  export let current: number
  export let liftTo: (floor: number) => void
</script>

<button
  class={`${ no === current ? 'bg-yellow-50 dark:bg-slate-800' : 'bg-white dark:bg-slate-600' } box-border border-slate-400 p-3 rounded-none`}
  onclick={ () => liftTo(no) }
>
  { no }
</button>