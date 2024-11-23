import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  vite: {
    ssr: {
      noExternal: ['@sanity/image-url']
    }
  }
});
