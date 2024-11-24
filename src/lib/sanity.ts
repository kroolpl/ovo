import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing PUBLIC_SANITY_PROJECT_ID in environment variables');
}

if (!import.meta.env.PUBLIC_SANITY_DATASET) {
  throw new Error('Missing PUBLIC_SANITY_DATASET in environment variables');
}

// Create a configured client
export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-02-26',
  token: import.meta.env.SANITY_WRITE_TOKEN
});

// Create a configured url builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs with proper typing
export function urlFor(source: SanityImageSource) {
  if (!source) {
    return {
      url: () => '',
      width: () => ({
        height: () => ({
          url: () => ''
        })
      })
    };
  }

  const imageBuilder = builder.image(source);
  
  return {
    url: () => imageBuilder.url(),
    width: (w: number) => ({
      height: (h: number) => ({
        url: () => imageBuilder.width(w).height(h).url()
      })
    })
  };
} 