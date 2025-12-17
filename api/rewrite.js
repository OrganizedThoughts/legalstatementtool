export default async function handler(req, res) {
// 🔑 CORS HEADERS (this fixes your error)
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

// Handle preflight request
if (req.method === "OPTIONS") {
return res.status(200).end();
}

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

const { text } = req.body;

// TEMP TEST RESPONSE (no AI yet)
return res.status(200).json({
polishedText:
"TEST SUCCESS ✅\n\nYour API is connected correctly.\n\nOriginal content:\n\n" +
text
});
}
