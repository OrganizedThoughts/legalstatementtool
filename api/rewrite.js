import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = await req.json(); // Vercel requires await req.json()
    const { text } = body;

    if (!text) return res.status(400).json({ error: "No text provided" });

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Rewrite the following legal statement clearly." },
        { role: "user", content: text }
      ]
    });

    res.status(200).json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error(error); // Check logs in Vercel
    res.status(500).json({ error: "AI failed", details: error.message });
  }
}

