<script lang="ts">
    import {popupStore, updateActiveSuggestion, updateSuggestions} from "../stores/popup.store";
    function onWheel(e:WheelEvent){
        if(e.deltaY < 0){
            updateSuggestions($popupStore.activeSuggestion, "ArrowUp")
        } else 
            updateSuggestions($popupStore.activeSuggestion, "ArrowDown")
            
    }
</script>

<div class="classes-container">
    <ul on:mousewheel={e => onWheel(e)}>
        {#each $popupStore.suggestions as c}
            <li class:active={$popupStore.activeSuggestion == c} class="hover:bg-blue-50 cursor-pointer" 
                on:click="{e => updateActiveSuggestion(c)}" >{c}</li>
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
