export default async function handler(req, res) {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
return res.status(200).end();
}

try {
// 🔍 Check if key exists
const keyExists = !!process.env.OPENAI_API_KEY;

return res.status(200).json({
success: true,
message: "API reached successfully",
openaiKeyPresent: keyExists,
keyStartsWithSk: keyExists
? process.env.OPENAI_API_KEY.startsWith("sk-")
: false
});

} catch (err) {
return res.status(500).json({
error: "Server crashed",
details: err.message
});
}
}
