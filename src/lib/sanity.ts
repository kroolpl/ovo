import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-03-21',
  token: import.meta.env.SANITY_WRITE_TOKEN, // We'll add this token for write access
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source)
} 