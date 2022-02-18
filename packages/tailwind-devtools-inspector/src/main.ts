import App from './App.svelte'
import {updateShowTailwindIcon} from "./stores/inspect.store";

const div = document.createElement("div")
document.body.appendChild(div)
div.id = "r8s-tailwind";

function loadTailwindScript () {
    const alreadyPresent = document.querySelector('script[src="https://cdn.tailwindcss.com"]')
    if(!alreadyPresent){
    // we want all tailwind classes to be available
    const script = document.createElement("script")
    document.head.appendChild(script)
    script.src = "https://cdn.tailwindcss.com";
}
}

window.r8sTailwindInspector = {
    enableTwIcon: () => updateShowTailwindIcon(true),
    disableTwIcon: () => updateShowTailwindIcon(false),
    loadTailwindScript
}

loadTailwindScript()


const app = new App({
    target: document.getElementById('r8s-tailwind')
})

export default app


declare global {
    interface Window {
        r8sTailwindInspector: { enableTwIcon: () => void, disableTwIcon: () => void, loadTailwindScript: () => void }
    }
}
