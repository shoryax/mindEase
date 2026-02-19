export async function POST(req: Request) {
  try {
    const { image } = await req.json();
    if (!image) return Response.json({ error: "Image required" }, { status: 400 });

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this medicine/medication image carefully. Return ONLY a valid JSON object in this exact format:
{
  "name": "medicine brand/generic name",
  "type": "tablet | capsule | liquid | cream | injection | other",
  "commonUses": ["use 1", "use 2", "use 3"],
  "dosageInfo": "general dosage guidance from label if visible",
  "sideEffects": ["side effect 1", "side effect 2", "side effect 3"],
  "warnings": ["warning 1", "warning 2"],
  "activeIngredients": ["ingredient 1", "ingredient 2"],
  "storageInfo": "storage instructions if visible",
  "disclaimer": "Always consult a licensed healthcare professional before taking any medication."
}
If no medicine is clearly visible in the image, return: {"error": "No medicine detected. Please capture a clear image of the medicine packaging or label."}`,
              },
              {
                type: "image_url",
                image_url: { url: `data:image/jpeg;base64,${image}`, detail: "high" },
              },
            ],
          },
        ],
        max_tokens: 1200,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return Response.json({ error: data.error?.message || "OpenAI error" }, { status: 500 });
    }

    const text = data.choices?.[0]?.message?.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return Response.json({ error: "Could not analyze image" }, { status: 500 });

    return Response.json(JSON.parse(jsonMatch[0]));
  } catch (error: any) {
    console.error("AI Doctor API error:", error);
    return Response.json({ error: error.message || "Failed to analyze" }, { status: 500 });
  }
}
