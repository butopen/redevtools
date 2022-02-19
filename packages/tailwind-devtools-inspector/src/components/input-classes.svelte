<script lang="ts">


    import SuggestedClasses from "./suggested-classes.svelte"
    import {copyToClipboard} from "../shared/clipboard.util";
    import {
        popupStore,
        updateAddClass,
        updateFocusedClass,
        updateFocusedIndex,
        updateRemoveClass,
        updateSuggestions
    } from "../stores/popup.store";
    import {inspectStore} from "../stores/inspect.store";

    let inputsContainer: HTMLDivElement;
    let prevSelectionStart = -1
    let prevSelectionEnd = -1

    function updateAllInputSizes() {
        setTimeout(() => {
            inputsContainer?.querySelectorAll("input").forEach((input: HTMLInputElement, index: number) => {
                input.style.width = Math.max(2,input.value.length + 1) + 'ch'
                if (index == $popupStore.focusedIndex) {
                    input.focus()
                }
            })
        }, 200)
    }

    function moveToInput(delta: -1 | 1) {
        const allInputs = inputsContainer?.querySelectorAll("input")
        const newInputIndex = Math.max(0, Math.min($popupStore.focusedIndex + delta, allInputs.length - 1))
        const newInput = allInputs.item(newInputIndex)
        updateFocusedIndex(newInputIndex)
        updateFocusedClass(newInput.value)
    }

    function onKeyUp(e: KeyboardEvent) {
        const input = e.target as HTMLInputElement
        if (input.selectionEnd == input.value.length && e.key == " ") {
            updateAddClass()
        } else if (input.value == "" && prevSelectionStart == 0 && e.key == "Backspace") {
            updateRemoveClass()
        } else if (input.selectionStart == 0
            && prevSelectionStart == 0
            && e.key == "ArrowLeft") {
            moveToInput(-1)
        } else if (input.selectionEnd == input.value.length
            && prevSelectionEnd == input.value.length
            && e.key == "ArrowRight") {
            moveToInput(1)
        }
        updateSuggestions(input.value, e.key);
        prevSelectionStart = input.selectionStart
        prevSelectionEnd = input.selectionEnd

    }

    function onFocus(e: FocusEvent, index: number) {
        const input = e.target as HTMLInputElement
        updateFocusedIndex(index)
        updateFocusedClass(input.value)
        updateSuggestions(input.value, "")
        prevSelectionStart = -1
        prevSelectionEnd = -1
    }

    function copy() {
        copyToClipboard($popupStore.classes.join(" "))
    }

    popupStore.subscribe(() => {
        updateAllInputSizes()
        const inspected = $inspectStore.inspectedTarget
        if (inspected) {
            inspected.setAttribute("class", $popupStore.classes.join(" "))
        }
    })


</script>

<div class="inputs-container" bind:this={inputsContainer}>
    {#each $popupStore.classes as c, i}
        <input class="input-class focus:font-bold hover:font-bold focus:bg-white" bind:value={c}
               on:keyup={e => onKeyUp(e)}
               on:focus={e => onFocus(e, i)}
        />
    {/each}
    <svg on:click={copy} class="cursor-pointer w-6 h-6 text-blue-400 hover:text-blue-600"
         width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z"
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9"
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

</div>
<SuggestedClasses></SuggestedClasses>

<style lang="scss">

  .input-class {
    @apply text-violet-500 text-xs border-0 rounded-sm h-3 text-center
    inline-block leading-3 outline-0 font-mono bg-transparent;
  }

  .inputs-container {
    @apply flex items-center
  }


</style>
