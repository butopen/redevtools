<script lang="ts">
    import {inspectStore, updateShowInspectorOnMouseMove} from "./stores/inspect.store";
    import Inspector from "./components/inspector.svelte"
    import Popup from "./components/popup.svelte"
    import TwIcon from "./components/tw-icon.svelte"
    import {onDestroy, onMount} from "svelte";

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.altKey && e.key == "t") {
            updateShowInspectorOnMouseMove(!$inspectStore.showInspectorOnMouseMove)
        }
    }
    onMount(async () => {
        document.addEventListener("keydown", onKeyDown)
    })

    onDestroy(async () => {
        document.removeEventListener("keydown", onKeyDown)
    })
</script>

{#if $inspectStore.showTwIcon}
    <TwIcon></TwIcon>
{/if}
<Inspector></Inspector>
{#if $inspectStore.inspectedTarget}
    <Popup></Popup>
{/if}

<style global lang="scss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  #r8s- tailwind-iframe {
    position: fixed;
    top: calc(100% - 1px);
    width: 1px;
    height: 1px;
    opacity: 0;
    border: 0;
  }
</style>
