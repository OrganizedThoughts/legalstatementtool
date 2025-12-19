import OpenAI from "openai";

export default async function handler(req, res) {
  // ✅ CORS HEADERS (THIS FIXES YOUR ERROR)
  res.setHeader("Access-Control-Allow-Origin", "https://organizedthoughts.github.io");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { text } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Rewrite the following legal statement clearly." },
        { role: "user", content: text }
      ],
    });

    res.status(200).json({
      result: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI failed" });
  }
}
