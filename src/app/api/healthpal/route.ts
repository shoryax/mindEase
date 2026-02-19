import { CohereClientV2 } from "cohere-ai";

const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) return Response.json({ error: "Message required" }, { status: 400 });

    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "system",
          content: `You are MyHealthPal, a compassionate AI therapist trained in CBT, mindfulness, and emotional support. Analyze the user's message for sentiment and emotional content, then respond therapeutically. Return ONLY a valid JSON object in this exact format:
{
  "sentiment": "positive" | "negative" | "neutral",
  "emotions": ["emotion1", "emotion2"],
  "intensity": "low" | "medium" | "high",
  "response": "Your warm, empathetic therapist response (2-4 sentences)",
  "suggestion": "One brief, actionable coping suggestion"
}
Be warm, non-judgmental, and clinically informed. Never diagnose. Always suggest professional help for serious concerns.`,
        },
        { role: "user", content: message },
      ],
    });

    const content = response.message.content?.[0];
    const text = content && "text" in content ? content.text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return Response.json({ error: "Invalid AI response" }, { status: 500 });

    return Response.json(JSON.parse(jsonMatch[0]));
  } catch (error: any) {
    console.error("HealthPal API error:", error);
    return Response.json({ error: error.message || "Failed to process" }, { status: 500 });
  }
}
