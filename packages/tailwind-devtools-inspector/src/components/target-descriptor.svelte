<script lang="ts">
    import {inspectStore} from "../stores/inspect.store";

    let targetTag;
    let targetClasses;

    inspectStore.subscribe(() => {
        targetTag = $inspectStore.previewTarget?.tagName.toLowerCase()
        targetClasses = $inspectStore.previewTarget?.className.split(" ").map(c => "." + c).join("")
    })

</script>


<div class={$$props.class}>
    <span class="target-tag">{targetTag}</span>
    <span class="target-classes">{targetClasses}</span>
</div>

<style lang="scss">
  .target-tag {
    @apply text-pink-500 font-bold text-sm
  }

  .target-classes {
    @apply text-violet-500 font-bold  text-sm
  }

  .sm {
    .target-tag, .target-classes {
      @apply text-xs
    }
  }

  .xs {
    .target-tag, .target-classes {
      font-size: 9px;
    }
  }

</style>
