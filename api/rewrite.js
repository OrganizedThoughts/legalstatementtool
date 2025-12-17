import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  // ✅ CORS headers ALWAYS first
  res.setHeader("Access-Control-Allow-Origin", "https://organizedthoughts.github.io");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Allow GET for sanity check
  if (req.method === "GET") {
    return res.status(200).json({ status: "API is alive" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ✅ Body safety
    if (!req.body) {
      return res.status(400).json({ error: "Missing request body" });
    }

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a legal writing assistant. Rewrite the user's content into a clear, neutral, well-organized legal statement suitable for court or attorney communication. Do not give legal advice."
        },
        {
          role: "user",
          content: text
        }
      ]
    });

    return res.status(200).json({
      polishedText: completion.choices[0].message.content
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
