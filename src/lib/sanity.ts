import { createClient } from '@sanity/client'

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

export const urlFor = (source: any) => {
  if (!source?.asset?._ref) {
    return '';
  }
  
  const [_file, id, dimension, format] = source.asset._ref.split('-');
  const [width, height] = dimension.split('x');

  return `https://cdn.sanity.io/images/${import.meta.env.PUBLIC_SANITY_PROJECT_ID}/${import.meta.env.PUBLIC_SANITY_DATASET}/${id}-${dimension}.${format}`;
}

// Helper functions to chain image transformations
export const imageBuilder = (url: string) => {
  if (!url) return {
    width: () => imageBuilder(''),
    height: () => imageBuilder(''),
    url: () => ''
  };

  return {
    width: (w: number) => imageBuilder(`${url}?w=${w}`),
    height: (h: number) => imageBuilder(`${url}?h=${h}`),
    url: () => url
  };
}; 