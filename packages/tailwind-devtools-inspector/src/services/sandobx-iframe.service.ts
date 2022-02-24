const iframeId = 'r8s- tailwind-iframe';

interface TailwindAction {
    action: "add" | "remove"
    className: string
}

class TailwindSandbox {

    iframe: HTMLIFrameElement

    content = ""

    constructor() {
        const style = document.createElement('style');
        style.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(style);

        
        window.onmessage = (e) => {
            try {
                const r = JSON.parse(e.data)
                if (r.action == "rule") {
                    if (this.content.indexOf(r.content) < 0) {
                        this.content += `
                        ${r.content}
                        `
                        style.innerHTML = this.content;
                    }
                }
            } catch (e) {
                //ignore
            }
        };
    }

    add(className: string) {
        this.iframe?.contentWindow.postMessage(JSON.stringify({
            action: "add",
            className
        }), '*');
    }
}

export const tailwindSandbox = new TailwindSandbox()

export function loadTailwind() {
    // to avoid conflict with existing tailwind environments, we create a sandbox iframe
    const alreadyPresent = document.querySelector("#" + iframeId)
    if (!alreadyPresent) {
        const iframe = document.createElement('iframe');
        iframe.id = iframeId
        iframe.style.cssText = `
        position: fixed;
        top: calc(100% - 1px);
        width: 1px;
        height: 1px;
        opacity: 0;
        border: 0;`
        tailwindSandbox.iframe = iframe
        const html = `
<head>
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = {important: true}
</script>
<script>

function getStyleRules(selector) {
    const sheets = document.styleSheets;
    for (let i = 0, l = sheets.length; i < l; i++) {
        const sheet = sheets[i];
        if( !sheet.cssRules ) { continue; }
        for (let j = 0, k = sheet.cssRules.length; j < k; j++) {
            const rule = sheet.cssRules[j];
            const matchingSelector = (rule.selectorText || "").split(",").find(s => s.trim() == selector) 
            if (matchingSelector) {
                return rule.cssText
            }
        }
    }
    return "";
}

window.onmessage = function(e) {
    
    
    try{
        
        const request = JSON.parse(e.data)
        if(request.className){
            if(request.action == "add"){
                const selector = "."+request.className
                const found = document.querySelector(selector)
                if(!found){
                    const div = document.createElement("div")
                    div.className = request.className
                    document.body.appendChild(div)
                    setTimeout( function(){
                        window.top.postMessage(JSON.stringify({action: "rule", content: getStyleRules(selector)}), '*')
                    },5)
                }
                
            }
            else if(request.action == "remove"){
                const found = document.querySelector("."+request.className)
                if(found){
                    document.body.removeChild(found)
                }
            }
            
        }
    } catch {
        //ignore
    }
};

</script>
</head>
<body></body>`;
        document.body.appendChild(iframe);
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(html);
        iframe.contentWindow.document.close();
        // we want all tailwind classes to be available
        const script = document.createElement("script")
        document.head.appendChild(script)
        script.src = "";
    }

}
