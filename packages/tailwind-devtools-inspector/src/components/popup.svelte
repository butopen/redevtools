<script lang="ts">

    import Breadcrumb from "./breadcrumb.svelte";
    import InputClasses from "./input-classes.svelte"
    import {clickOutside} from "../shared/click-outside.util";
    import {inspectStore, updateInspectedTarget} from "../stores/inspect.store";
    import {delayed} from "../shared/delayed.util";


    let popup: HTMLDivElement


    function updatePosition() {
        delayed(()=>{
            const box = $inspectStore.inspectedTarget?.getBoundingClientRect()
            if (box && popup) {
                popup.style.top = (box.height + box.top) + 'px'
                popup.style.left = `50%`
            }
        })
    }

    inspectStore.subscribe(() => {
        updatePosition()
    })

</script>

<div class="rdt-popup redevtools" bind:this={popup}>
    <div class="arrow-tooltip"></div>
    <div class="target-descriptor" use:clickOutside on:clickOutside={_ => updateInspectedTarget(null)}>
        <Breadcrumb on:targetEnter on:targetLeave></Breadcrumb>
        <InputClasses></InputClasses>
    </div>
</div>

<style lang="scss">

  .rdt-popup {
    @apply fixed flex bg-gray-50 px-1 rounded;
    box-shadow: 0 0 6px #b5b5b5f5;
    z-index: 10002;
  }

  .arrow-tooltip {
    @apply absolute w-0 h-0 border-b-4 border-gray-50 -top-1 left-1/2;
    content: "";
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
  }

</style>


