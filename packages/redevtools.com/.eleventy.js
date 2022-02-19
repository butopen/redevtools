const sass = require("sass");
const postcss = require("postcss")
const fs = require("fs")
const path = require("path")
const fastglob = require(`fast-glob`); // 11ty uses `fast-glob` internally
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


async function blogEntries(){
    const entries = await fastglob([`src/blog/**/index.md`], { cwd: "." });
    return entries
}


const manageRelativeImages = async (changedFiles) => {
    for(const f of changedFiles){
        let fileFullPath = path.join(__dirname, f);
        const filePath = path.parse(fileFullPath)
        const content = fs.readFileSync(fileFullPath).toString()
        const matches = content.match(/permalink: (.*)/i)
        if(matches && matches.length > 0){
            const permalink = matches[1]
            const entries = await fastglob([`*.{jpg,jpeg,png,gif,webp,mp3,mp4,webm,ogg}`], { cwd: filePath.dir });
            for(let e of entries){
                const src = path.join(filePath.dir, e);
                const dst = path.join("dist", permalink, e);
                await fs.promises.copyFile(src, dst);
                console.log(`✓ ${e} ➞ ${dst}`)
            }
        }
    }
}
module.exports = function(eleventyConfig) {
    for(const dir of ["dist/assets/css"])
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.setWatchJavaScriptDependencies(false);
    eleventyConfig.addWatchTarget("./src/");
    eleventyConfig.on('beforeWatch', manageRelativeImages)
    eleventyConfig.on('afterBuild', async ()=>{
        const foundBlogEntries = await blogEntries()
        await manageRelativeImages(foundBlogEntries)
    })
    eleventyConfig.on("beforeBuild", () => {
        
        let result = sass.renderSync({
            file: "src/assets/css/styles.scss",
            sourceMap: false,
            outputStyle: "compressed",
        });
        console.log("SCSS compiled");

        let css = result.css.toString();
        
        postcss([
            require('postcss-import'),
            require('tailwindcss'),
            require('autoprefixer'),
            require('postcss-nested'),
            require('cssnano')
        ])
            .process( css, { from: "src/assets/css/styles.scss", to: "assets/css/styles.css"})
            .then((result) => {
                fs.writeFileSync("dist/assets/css/styles.css", result.css, (err) => {
                    if (err) throw err;
                    console.log("CSS optimized");
                });
            });
    });
    
    return {
        dir: {
            input: './src',
            output: './dist'
        }
    }
};
