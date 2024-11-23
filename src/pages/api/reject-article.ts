import type { APIRoute } from 'astro';
import { client } from '../../lib/sanity';

export const POST: APIRoute = async ({ request }) => {
  const { articleId, reason } = await request.json();

  try {
    await client.patch(articleId)
      .set({ 
        status: 'rejected',
        rejectionReason: reason
      })
      .commit();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to reject article' }), {
      status: 500,
    });
  }
}; 