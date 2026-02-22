<script lang="ts">
  export let building
</script>

<div class="grid grid-cols-12 grid-flow-row-dense h-full px-1 md:px-10 overflow-hidden w-full">
  {@render building()}
</div>