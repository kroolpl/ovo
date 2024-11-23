import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing PUBLIC_SANITY_PROJECT_ID in environment variables');
}

if (!import.meta.env.PUBLIC_SANITY_DATASET) {
  throw new Error('Missing PUBLIC_SANITY_DATASET in environment variables');
}

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-02-26',
  token: import.meta.env.SANITY_WRITE_TOKEN
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
} 