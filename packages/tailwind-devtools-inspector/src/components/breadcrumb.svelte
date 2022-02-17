<script lang="ts">
    import {inspectStore, updateHighlighted, updateInspectedTarget} from "../stores/inspect.store";

    let breadcrumb: { element: Element; child: boolean }[] = []

    inspectStore.subscribe(() => {
        breadcrumb = []
        const current = $inspectStore.inspectedTarget
        if(current){
            let parent
            if (current.tagName != "BODY")
                parent = current.parentElement
            let parentParent
            if (parent && parent.tagName != "BODY")
                parentParent = parent.parentElement
            breadcrumb = [parentParent, parent, current].filter(c => c).map(c => ({element: c, child: false}))
            for (let i = 0; i < current.children.length; i++)
                breadcrumb.push({element: current.children.item(i), child: true})
        }
    })
</script>

<div class="redevtool rdt-breadcrumb flex">
    {#each breadcrumb as c, index}
        <div class="inline-flex text-xs">
            <div class=" cursor-pointer text-blue-300 hover:text-blue-500"
                 on:click={_ => updateInspectedTarget(c.element)}
                 on:mouseenter={_ => updateHighlighted(c.element)}
                 on:mouseleave={_ => updateHighlighted(null)}
                 title={c.element.className || ''}
                 class:text-pink-500={c.element == $inspectStore.inspectedTarget}>
                {c.element.tagName.toLowerCase()}
            </div>
            {#if (!c.child && index < breadcrumb.length - 1) }
                <span class="inline mx-1">&rarr;</span>
            {:else if (index < breadcrumb.length - 1)}
                <span class="inline">,</span>
            {/if}
        </div>
    {/each}
</div>

