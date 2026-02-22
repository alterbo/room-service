<script lang="ts">
    export let light: string = 'white'
</script>

<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <circle class="fill-white dark:fill-black stroke-slate-400" cx="5" cy="5" r="3" stroke-width={ 0.25 }/>
  <circle cx="5" cy="5" r="2" fill={ light } />
</svg>
