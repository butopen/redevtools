<script lang='ts'>
  import './index.scss';
  import InputClasses from './components/input-classes.svelte';
  import { classesStore, updateClasses } from './components/classes.store';

  updateClasses(['text-red-500', 'bg-blue-500']);
</script>

<div class='mx-auto mt-24 w-full w-64 text-center'>
  <InputClasses />
</div>

<style lang='scss'>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  }

  .hello {
    @apply font-bold text-gray-600;
  }
</style>
