import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import auth from 'auth-astro';

export default defineConfig({
  integrations: [
    tailwind(),
    auth()
  ],
  output: 'server',
  adapter: netlify(),
  vite: {
    ssr: {
      noExternal: ['@sanity/image-url', '@sanity/client']
    },
    build: {
      commonjsOptions: {
        include: [/@sanity\/image-url/, /@sanity\/client/, /node_modules/],
        transformMixedEsModules: true
      }
    },
    optimizeDeps: {
      include: ['@sanity/image-url', '@sanity/client']
    }
  }
});
