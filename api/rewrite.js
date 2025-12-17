import OpenAI from "openai";

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
// ✅ REQUIRED CORS HEADERS
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
return res.status(200).end();
}

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {
const { text } = req.body;

const completion = await openai.chat.completions.create({
model: "gpt-4.1-mini",
messages: [
{
role: "system",
content:
"You are a legal writing assistant. Rewrite the user's content into a clear, respectful, well-organized legal statement suitable for family court or attorney communication. Do not give legal advice. Use neutral professional language."
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

} catch (error) {
console.error(error);
return res.status(500).json({ error: "AI processing failed" });
}
}
