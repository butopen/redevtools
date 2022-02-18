<script lang="ts">

    import {debounce} from "../shared/throttle.util";
    import {onDestroy, onMount} from "svelte";
    import {inspectStore, updateHighlighted, updateInspectedTarget} from "../stores/inspect.store";
    import {findLastTarget} from "../shared/target.util";

    let lastTarget: Element
    let tw: HTMLDivElement;

    const onMousemove = debounce((e: MouseEvent) => {
        if(!$inspectStore.inspectedTarget){
            const inside = tw.contains(e.target as any) || tw == e.target
            if (!inside && !$inspectStore.previewTarget) {
                lastTarget = findLastTarget(e) ?? lastTarget
                if(lastTarget && lastTarget != tw && !tw.contains(lastTarget)){
                    const box = lastTarget?.getBoundingClientRect()
                    if (box && tw) {
                        tw.style.top = (box.top - 4) + 'px'
                        tw.style.left = (box.left + box.width - 4) + 'px'
                    }
                }
            }
        }
    }, 50)

    onMount(() => {
        document.addEventListener("mousemove", onMousemove)
    })
    onDestroy(() => {
        document.removeEventListener("mousemove", onMousemove)
    })

</script>

<div class="redevtool rdt-tw-icon" bind:this={tw}
     on:mouseenter={e => updateHighlighted(lastTarget)}
     on:mouseleave={e => updateHighlighted(null)}
     on:click={e => updateInspectedTarget(lastTarget)}
>
    <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
        <path
                d="m 11.901966,4.8952091 c -3.1287063,0 -5.084148,1.5643534 -5.8663247,4.6930601 1.173265,-1.5643534 2.5420742,-2.1509859 4.1064277,-1.7598976 0.89255,0.2229204 1.530459,0.8708234 2.236591,1.5873842 1.150234,1.1676162 2.481672,2.5190432 5.389632,2.5190432 3.128706,0 5.084148,-1.564353 5.866325,-4.6930599 C 22.461352,8.8060925 21.092542,9.392725 19.528189,9.0016367 18.635639,8.7787163 17.99773,8.1308133 17.291598,7.4142526 16.141364,6.2466366 14.809925,4.8952091 11.901966,4.8952091 Z M 6.0356413,11.934799 c -3.1287067,0 -5.0841484,1.564354 -5.86632508,4.69306 1.17326498,-1.564353 2.54207418,-2.150986 4.10642758,-1.759897 0.8925505,0.223355 1.530459,0.870823 2.2365908,1.587384 1.1502342,1.167616 2.4816727,2.519043 5.3896314,2.519043 3.128707,0 5.084149,-1.564353 5.866326,-4.69306 -1.173266,1.564354 -2.542075,2.150986 -4.106428,1.759898 -0.892551,-0.222921 -1.530459,-0.870824 -2.236591,-1.587384 -1.150234,-1.167616 -2.4816726,-2.519044 -5.3896317,-2.519044 z"/>
    </svg>
</div>

<style lang="scss">

  .rdt-tw-icon {
    @apply rounded-full w-3 h-3 opacity-30 flex items-center justify-center fixed cursor-pointer;
    &:hover {
      @apply opacity-100
    }
    background: #06b6d4;
    z-index: 10001;

    svg {
      @apply w-2 h-2 pointer-events-none
    }

    path {
      fill: white;
    }
  }
</style>
