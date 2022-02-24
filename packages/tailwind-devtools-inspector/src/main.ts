import App from './App.svelte'
import {updateShowTailwindIcon} from "./stores/inspect.store";
import {loadTailwind} from "./services/sandobx-iframe.service";

const div = document.createElement("div")
document.body.appendChild(div)
div.id = "r8s-tailwind";



window.r8sTailwindInspector = {
    enableTwIcon: () => updateShowTailwindIcon(true),
    disableTwIcon: () => updateShowTailwindIcon(false),
    loadTailwind
}

loadTailwind()



const app = new App({
    target: document.getElementById('r8s-tailwind')
})

export default app


declare global {
    interface Window {
        r8sTailwindInspector: { enableTwIcon: () => void, disableTwIcon: () => void, loadTailwind: () => void }
    }
}
