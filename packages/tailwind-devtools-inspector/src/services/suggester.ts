const baseClasses = ['text', "bg", "border", 'w', 'h', 'p', 'm', 'font', 'cursor',"ml", "mr", "mt", "mb", "pr", "pl", "pb", "pt", "mx", "my", "px", "py"]
 
const borderCorners = ["r", "t", "l", "b"]
const lcr = ["left", "center", "right"]
const marginSizes = ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96", "auto", "px", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "1/5", "2/5", "3/5", "4/5", "1/6", "2/6", "3/6", "4/6", "5/6", "1/12", "2/12", "3/12", "4/12", "5/12", "6/12", "7/12", "8/12", "9/12", "10/12", "11/12"]
const colorSizes = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
const opacitySizes = ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]
const sizes = ["xs", "sm", "base", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"]
const colors = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"]
const starting = (a: string[], q: string) => a.filter(s => s.startsWith(q))

export class Suggester {


    suggest(text = "") {
        const prefix = this.prefix(text);
        const className = this.removePrefix(text, prefix)
        let suggested = []
        if ( className == '') {
            suggested = baseClasses
        } else {
            suggested = this.classesFor(className)
        }
        return suggested.map(c => (prefix? prefix + ":" : "") + c)
    }

    protected removePrefix(c: string, prefix: string) {
        return prefix.length > 0 ? c.replace(prefix + ":", '') : c;
    }


    private classesFor(className: string) {
        const tokens = className.split("-")
        const t0 = tokens[0]
        const t1 = tokens[1]
        const t2 = tokens[2]

        const t0Class = s => `${t0}-${s}`
        const t0ClassWithDash = s => `${t0}-${s}-`
        const t0t1Class = s => `${t0}-${t1}-${s}`

        let suggestedClasses = []
        if (t0 == "text") {
            if (!t1) {
                suggestedClasses = [...colors.map(t0ClassWithDash), ...sizes.map(t0Class), ...lcr.map(t0Class)]
            } else if (colors.includes(t1))
                suggestedClasses = colorSizes.map(t0t1Class)
            else if (sizes.includes(t1))
                suggestedClasses = sizes.map(t0t1Class)
            else if (!t2) {
                suggestedClasses = [...starting(colors, t1).map(t0ClassWithDash), ...starting(sizes, t1).map(t0Class)]
            }
        } else if (t0 == "bg") {
            if (!t1) {
                suggestedClasses = [...colors.map(t0ClassWithDash)]
            } else if (colors.includes(t1))
                suggestedClasses = colorSizes.map(t0t1Class)
            else {
                suggestedClasses = starting(colors, t1).map(t0ClassWithDash)
            }
        } else if (t0 == "border") {
            if (!t1) {
                suggestedClasses = [...colors.map(t0ClassWithDash)]
            } else if (colors.includes(t1))
                suggestedClasses = colorSizes.map(t0t1Class)
            else if (borderCorners.includes(t1))
                suggestedClasses = colorSizes.map(t0t1Class)
            else if (!t2) {
                suggestedClasses = starting(colors, t1).map(t0ClassWithDash)
            }
        } else if (["w", "h", "p", "m"].includes(t0)) {
            suggestedClasses = marginSizes.map(t0Class)
        } else if (t0 == "rounded") {
            if (!t1) {
                suggestedClasses = [...sizes.map(t0Class)]
            }
        } else if (t0 == "opacity") {
            if (!t1) {
                suggestedClasses = [...opacitySizes.map(t0Class)]
            }
        }

        return suggestedClasses

    }


    protected prefix(className: string) {
        let prefix = ''
        if (className.indexOf(":") >= 0) {
            prefix = className.split(":")[0]
        }
        return prefix
    }


}





