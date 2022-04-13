import { defineConfig, PluginOption } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const middleware: () => PluginOption = () => {
  return {
    name: 'middleware',
    apply: 'serve',
    configureServer(viteDevServer) {
      return () => {
        viteDevServer.middlewares.use(async (req, res, next) => {
          console.log('originalUrl: ', req.originalUrl);
          if (req.originalUrl.includes('/t/')) {
            req.url = `/index.html`;
          }

          next();
        });
      };
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), middleware()]
});
