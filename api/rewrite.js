import OpenAI from "openai";

export default async function handler(req, res) {
if (req.method !== "POST") return res.status(405).send("Only POST allowed");

try {
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const { text } = req.body;

const completion = await client.chat.completions.create({
model: "gpt-4o-mini",
messages: [
{ role: "system", content: "Polish and reorganize legal statements professionally, keeping tone formal and clear." },
{ role: "user", content: text }
],
temperature: 0.3
});

res.status(200).json({ polishedText: completion.choices[0].message.content });
} catch (error) {
console.error(error);
res.status(500).json({ error: "Something went wrong" });
}
}
