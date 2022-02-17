<script lang="ts">
    import {popupStore} from "../stores/popup.store";
</script>

<div class="classes-container">
    <ul>
        {#each $popupStore.suggestions as c}
            <li class:active={$popupStore.activeSuggestion == c}>{c}</li>
        {/each}
    </ul>
</div>

<style lang="scss">
  .classes-container {
    ul {
      @apply list-none;
    }

    li {
      @apply text-xs text-blue-400 p-1 rounded-sm;
      &.active {
        @apply bg-blue-200 font-bold
      }
    }
  }
</style>
