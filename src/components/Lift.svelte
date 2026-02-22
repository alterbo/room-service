<script lang="ts">
export let position: number
export let duration: number
const style = { 'height': 'calc(100% / 8)' }
</script>

<div
  class="absolute flex w-full md:px-2"
  style="bottom: 0; height: {style.height}; transform: translateY(-{position}px); transition-delay: 1s; transition-duration: {duration + 1}s; transition-property: transform;">
  <div class="bg-white dark:bg-slate-800 border border-slate-400 h-2/3 px-2 pt-3 self-end w-full">
  </div>
</div>