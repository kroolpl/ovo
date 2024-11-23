import type { APIRoute } from 'astro';
import { client } from '../../lib/sanity';

export const POST: APIRoute = async ({ request }) => {
  const { articleId } = await request.json();

  try {
    await client.patch(articleId)
      .set({ status: 'approved' })
      .commit();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to approve article' }), {
      status: 500,
    });
  }
}; 