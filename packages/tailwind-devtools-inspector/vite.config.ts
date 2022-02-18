import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from "svelte-preprocess";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
        const isProduction = mode === 'production'
        console.log("isProduction: ", isProduction)
        return {
            plugins: [
                svelte({emitCss: true, preprocess: sveltePreprocess()})
            ],
            build: {
                sourcemap: true,
                lib: {
                    entry: 'src/main.ts',
                    formats: ['iife'],
                    name: 'r8stwi',
                    fileName: (format) => `tailwind.js`
                }

            },

        }
    }
)
