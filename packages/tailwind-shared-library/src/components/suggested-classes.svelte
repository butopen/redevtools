<script lang="ts">
  import { classesStore, updateActiveSuggestion, updateSuggestions } from './classes.store';

  function onWheel(e: WheelEvent) {
    if (e.deltaY < 0) {
      updateSuggestions($classesStore.activeSuggestion, 'ArrowUp');
    } else updateSuggestions($classesStore.activeSuggestion, 'ArrowDown');
  }
</script>

<div class="classes-container">
  <ul on:mousewheel={(e) => onWheel(e)}>
    {#each $classesStore.suggestions as c}
      <li
        class:active={$classesStore.activeSuggestion == c}
        class="cursor-pointer hover:bg-blue-50"
        on:click={(e) => updateActiveSuggestion(c)}>
        {c}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .classes-container {
    ul {
      @apply list-none;
    }

    li {
      @apply rounded-sm p-1 text-xs text-blue-400;
      &.active {
        @apply bg-blue-200 font-bold;
      }
    }
  }
</style>
