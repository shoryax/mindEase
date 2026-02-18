import { CohereClientV2 } from "cohere-ai";

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { thought } = await req.json();

    if (!thought || !thought.trim()) {
      return Response.json({ error: "Thought is required" }, { status: 400 });
    }

    if (!process.env.COHERE_API_KEY) {
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "system",
          content:
            'You are a CBT therapist assistant. The user has shared a negative automatic thought. Identify up to 3 cognitive distortions present (e.g., catastrophizing, all-or-nothing thinking, mind reading, fortune telling, overgeneralization) and provide a balanced, realistic reframe. Format your response as JSON: { "distortions": string[], "reframe": string }. Keep reframes gentle and empowering. This is not a substitute for professional therapy.',
        },
        {
          role: "user",
          content: thought,
        },
      ],
    });

    const raw = response.message.content[0].text;

    // Parse JSON from response (handle markdown code blocks)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: "Invalid AI response format" }, { status: 500 });
    }
    const parsed = JSON.parse(jsonMatch[0]);

    return Response.json(parsed);
  } catch (error: any) {
    console.error("Reframe API error:", error);
    return Response.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
