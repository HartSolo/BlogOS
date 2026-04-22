import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    if (!data.event_type || !data.path) {
      return new Response(JSON.stringify({ error: "Invalid event data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: "Event recorded",
      recorded_event: {
        timestamp: new Date().toISOString(),
        ...data
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error processing event" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ message: "Analytics endpoint is active. Use POST to submit events." }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
