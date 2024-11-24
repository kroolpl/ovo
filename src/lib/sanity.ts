import { createClient } from '@sanity/client'

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
})

// Helper function to generate image URLs with proper typing
export async function urlFor(source: any) {
  const imageUrlBuilder = (await import('@sanity/image-url')).default;
  const builder = imageUrlBuilder({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  });
  return builder.image(source);
} 