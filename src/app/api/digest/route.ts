import { CohereClientV2 } from "cohere-ai";

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { weekStats } = await req.json();

    if (!weekStats) {
      return Response.json({ error: "Week stats are required" }, { status: 400 });
    }

    if (!process.env.COHERE_API_KEY) {
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }

    const statsText = JSON.stringify(weekStats, null, 2);

    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "system",
          content:
            "You are a compassionate mental wellness coach. The user will share their weekly activity statistics. Provide a warm, encouraging weekly digest with: 1) A brief summary of their week (2-3 sentences), 2) Their top strength (what they did well), 3) One gentle suggestion for next week, 4) A closing encouragement. Keep the tone warm, non-judgmental, and empowering. Respond in plain text with clear sections labeled: Summary, Strength, Suggestion, Encouragement.",
        },
        {
          role: "user",
          content: `Here are my wellness stats for the past 7 days:\n${statsText}`,
        },
      ],
    });

    const content = response.message.content?.[0];
    const summary = content && "text" in content ? content.text : "";
    return Response.json({ summary });
  } catch (error: any) {
    console.error("Digest API error:", error);
    return Response.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
