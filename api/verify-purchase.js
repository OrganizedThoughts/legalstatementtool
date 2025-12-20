// api/verify-purchase.js
export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { license_key, product_permalink } = req.body;

    if (!license_key || !product_permalink) {
      return res.status(400).json({ 
        verified: false, 
        error: "Missing license key or product permalink" 
      });
    }

    // Verify with Gumroad API
    const gumroadResponse = await fetch("https://api.gumroad.com/v2/licenses/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        product_permalink: product_permalink,
        license_key: license_key,
      })
    });

    const data = await gumroadResponse.json();

    if (data.success && data.purchase) {
      // Valid purchase!
      return res.status(200).json({
        verified: true,
        purchase_email: data.purchase.email,
        sale_timestamp: data.purchase.sale_timestamp
      });
    } else {
      return res.status(200).json({
        verified: false,
        error: "Invalid license key"
      });
    }

  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ 
      verified: false, 
      error: "Verification failed" 
    });
  }
}
