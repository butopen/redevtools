import {updateClasses} from "./popup.store";
import {createStore} from "../shared/store.util";

export interface InspectStore {
    inspectedTarget?: Element
    previewTarget?: Element
    showInspectorOnMouseMove: boolean
    showTwIcon: boolean
}

const {writable, update} = createStore<InspectStore>({showInspectorOnMouseMove: false, showTwIcon: true});
export const inspectStore = writable

export function updateShowInspectorOnMouseMove(visible: boolean) {
    update(inspectStore, {showInspectorOnMouseMove: visible})
}

export function updateShowTailwindIcon(visible: boolean) {
    update(inspectStore, {showTwIcon: visible})
}

export function updatePreviewTarget(target: Element) {
    update(inspectStore, (s) => ({previewTarget: s.showInspectorOnMouseMove ? target : null}))
}

export function updateInspectedTarget(target: Element) {
    update(inspectStore, {
        showInspectorOnMouseMove: false,
        previewTarget: null,
        inspectedTarget: target
    })
    if (target)
        updateClasses(target.className.split(" "))
}

export function updateHighlighted(target: Element) {
    update(inspectStore, {previewTarget: target})
}
