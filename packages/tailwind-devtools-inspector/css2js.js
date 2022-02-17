import fs from "fs"
const css = fs.readFileSync("./dist/style.css", "utf8")
const cssScript = `
const css = \`${css}\`;
const style = document.createElement("style");
style.type = 'text/css';
style.appendChild(document.createTextNode(css));
const head = document.head || document.getElementsByTagName('head')[0]
head.appendChild(style);
`
fs.appendFile('./dist/index.js', cssScript, function (err) {
    if (err) throw err;
    console.log('Saved!');
});
