/*
    //////////////    /////////////////////////////////            
    //////////////    ///////////////////////////////            
    //////////////    //////////////////////////////            
    //////////////    ////////////////////////////                
    //////////////               //////////////                   
    //////////////             /////////////                      
    //////////////           /////////////                        
    ///////////////         ////////////                           
    ///////////////       ////////////                             
    ///////////////     ///////////                                
    ///////////////    //////////                                  
    ///////////////    ///////                                     
    ////////////////    ////                                        
    ////////////////    //                                          
    ////////////////                                                
    ////////////////                                                
    //////////////                                                  
    /////////////                                                    
    //////////                                                       
    ///////                                                          
    /////                                                            
    ///
    
    More at https://redevtools.com
 */


(()=>{var O=Object.defineProperty;var R=(t,e,r)=>e in t?O(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var g=(t,e,r)=>(R(t,typeof e!="symbol"?e+"":e,r),r);var b=()=>{async function t(e){let r=new x().convert(e);console.log(r),P(r)&&console.log("Code is in your clipboard \u{1F609}")}return t.version="1.0",t.info={name:"json2ts",params:{json:"The JSON object to convert into TypeScript interfaces"},example:"re.json2ts({user: 'me', age: 36})",description:"A plugin to convert a JSON object to TypeScript interface. The result is automatically copied into the clipboard.",readme:"https://www.redevtools.com/blog/convert-json-to-typescript-interface-from-the-console/",preview:"https://raw.githubusercontent.com/redevtools/redevtools/main/plugins/json2ts/preview.gif"},t};function y(t){return Object.prototype.toString.call(t)==="[object Object]"&&t!==null}function S(t){return t instanceof Date}function m(t){return!isNaN(parseFloat(t))&&isFinite(t)}function w(t){return typeof t=="string"||t instanceof String}function v(t){return typeof t=="boolean"}var x=class{convert(e){return Array.isArray(e)?this.convertObjectToTsInterfaces(e[0]):this.convertObjectToTsInterfaces(e)}convertObjectToTsInterfaces(e,r="RootObject"){let i=[],s=[];for(let o in e){let n=e[o];if(y(n)&&!Array.isArray(n)){let l=this.toUpperFirstLetter(o);s.push(this.convertObjectToTsInterfaces(n,l)),e[o]=this.removeMajority(l)+";"}else if(Array.isArray(n)){let l=this.detectMultiArrayTypes(n);if(this.isMultiArray(l)){let p=this.getMultiArrayBrackets(n);this.isAllEqual(l)?e[o]=l[0].replace("[]",p):e[o]="any"+p+";"}else if(n.length>0&&y(n[0])){let p=this.toUpperFirstLetter(o);s.push(this.convertObjectToTsInterfaces(n[0],p)),e[o]=this.removeMajority(p)+"[];"}else e[o]=l[0]}else S(n)?e[o]="Date;":w(n)?e[o]="string;":v(n)?e[o]="boolean;":m(n)?e[o]="number;":(e[o]="any;",i.push(o))}let c=this.formatCharsToTypeScript(e,r,i);return s.push(c),s.join(`

`)}detectMultiArrayTypes(e,r=[]){if(Array.isArray(e))if(e.length===0)r.push("any[];");else if(Array.isArray(e[0]))for(let i=0,s=e.length;i<s;i++){let c=e[i],o=this.detectMultiArrayTypes(c,r);r.concat(o)}else this.isAllEqual(e.map(w))?r.push("string[];"):this.isAllEqual(e.map(m))?r.push("number[];"):this.isAllEqual(e.map(v))?r.push("boolean[];"):r.push("any[];");return r}isMultiArray(e){return e.length>1}isAllEqual(e){return[...new Set(e)].length==1}getMultiArrayBrackets(e){let r=JSON.stringify(e),i="";for(let s=0,c=r.length;s<c;s++)r[s]==="["?i=i+"[]":s=c;return i}formatCharsToTypeScript(e,r,i){let s=JSON.stringify(e,null,"	").replace(new RegExp('"',"g"),"").replace(new RegExp(",","g"),""),c=Object.keys(e);for(let o=0,n=c.length;o<n;o++){let l=c[o];i.indexOf(l)>=0?s=s.replace(new RegExp(l+":","g"),this.toLowerFirstLetter(l)+"?:"):s=s.replace(new RegExp(l+":","g"),this.toLowerFirstLetter(l)+":")}return r=this.removeMajority(r),"export interface "+r+" "+s}removeMajority(e){return e.toUpperCase().endsWith("IES")?e.substring(0,e.length-3)+"y":e.toUpperCase().endsWith("S")?e.substring(0,e.length-1):e}toUpperFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}toLowerFirstLetter(e){return e.charAt(0).toLowerCase()+e.slice(1)}isJson(e){try{JSON.parse(e)}catch(r){return!1}return!0}};function P(t){var e=document.createElement("textarea");e.value=t,e.style.top="0",e.style.left="0",e.style.width="0px",e.style.height="0px",e.style.position="fixed",document.body.appendChild(e),e.focus(),e.select();try{return document.execCommand("copy")}catch(r){return!1}finally{setTimeout(()=>{document.body.removeChild(e)},500)}}var T=()=>{let t=(r,i=1)=>console.log(JSON.parse(atob(r.split(".")[i]))),e=r=>t(r);return e.header=r=>t(r,0),e.version="1.0",e.info={name:"jwtDecode",params:{jwtToken:"A jwt token. Usually from the localStorage, but you can pass a string, of course "},example:"re.jwtDecode(localStorage.TOKEN)",description:"A plugin to decode a JWT token to a JSON object and explore it in the console",readme:"https://www.redevtools.com/blog/jwtdecode-how-to-decode-a-jwt-token-from-the-console/",preview:"https://raw.githubusercontent.com/redevtools/redevtools/main/plugins/jwtDecode/preview.gif"},e};var f=(t,e)=>console.log.bind(window.console,"%c%s",`color: ${t}; background: ${e}; font-size: 10px; border-radius: 2px; font-weight: bold; padding: 2px`),u=f("#284271","#a8e9ff"),A=f("#7c4400","#ffd06f"),F=f("#be0000","#ffcaca");async function D(t){if(!!t)return new Promise(e=>{let r=new Image;r.onload=function(){let i="font-size: 1px; padding: "+Math.floor(r.height/2)+"px "+Math.floor(r.width/2)+"px; ";console.log("%c+",i+"background: url("+t+"); background-size: "+r.width+"px "+r.height+"px; color: transparent;"),e()},r.onerror=i=>e(),r.src=t})}var d=class{constructor(){g(this,"json2ts");g(this,"jwtDecode");g(this,"info")}};var k=t=>{let e=[];for(let r in t.params)e.push(`${r}: ${t.params[r]}`);return`
        Function Name: ${t.name}
        Params: 
            ${e.join(`	
`)}
        Example: ${t.example} 
        
        ${t.description}
        Full description at ${t.readme}
        `};async function h(t){try{await D(t.preview),console.log(k(t))}catch(e){}}u("ReDevTools","ReDevTools loading");var a=new d;a.json2ts=b();a.jwtDecode=T();var j={json2ts:()=>h(a.json2ts.info),jwtDecode:()=>h(a.jwtDecode.info)};a.info=j;a.info=new Proxy(j,{get:function(t,e){h(a[e].info)}});u("ReDevtools","Type `re. ` to discover available plugins. Type `re.info. ` to read plugin infos. More info at https://redevtools.com");window.redevtools=a;window.re?(A("window.re not set","window re is already set. using window.r8s"),window.r8s||(window.r8s=a)):window.re=a;})();
