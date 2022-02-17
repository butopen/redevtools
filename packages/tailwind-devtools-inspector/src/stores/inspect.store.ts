import {writable} from 'svelte/store';
import {updateClasses} from "./popup.store";

export interface InspectStore {
    inspectedTarget?: Element
    previewTarget?: Element
    showInspectorOnMouseMove: boolean
    showTwIcon: boolean
}

let store: InspectStore = {showInspectorOnMouseMove: false, showTwIcon: true}
export const inspectStore = writable<InspectStore>(store);
inspectStore.subscribe(s => store = s)

export function updateShowInspectorOnMouseMove(visible: boolean) {
    inspectStore.set({...store, showInspectorOnMouseMove: visible})
}

export function updateShowTailwindIcon(visible: boolean) {
    inspectStore.set({...store, showTwIcon: visible})
}

export function updatePreviewTarget(target: Element) {
    inspectStore.set({
        ...store,
        previewTarget: store.showInspectorOnMouseMove ? target : null
    })
}

export function updateInspectedTarget(target: Element) {
    inspectStore.set({
        ...store,
        showInspectorOnMouseMove: false,
        previewTarget: null,
        inspectedTarget: target
    })
    if (target)
        updateClasses(target.className.split(" "))
}

export function updateHighlighted(target: Element) {
    inspectStore.set({
        ...store,
        previewTarget: target
    })
}
