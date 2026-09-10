/**
 * Creates a Stripe Checkout Session (ui_mode: form) for the $297 strategy consult.
 * Returns { client_secret } for the embedded Checkout Form SDK.
 */
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Required for Checkout Form (dahlia) preview per Stripe Checkout Studio
  apiVersion: "2026-03-25.dahlia; custom_checkout_payment_form_preview=v1",
});

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders(),
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders(),
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: "STRIPE_SECRET_KEY is not configured" }),
    };
  }

  const domain = process.env.URL || process.env.DEPLOY_PRIME_URL || "https://sarka-ops.com";

  try {
    // mode + line_items are sample_only — replace price ID in STRIPE_INTEGRATION_TODO.md
    const mode = "payment";

    const sessionParams = {
      ui_mode: "form",
      mode,
      billing_address_collection: "auto",
      phone_number_collection: { enabled: false },
      automatic_tax: { enabled: false },
      submit_type: "auto",
      integration_identifier: "custom_embedded_web_0001",
      // TODO: replace price_... with your real Stripe Price ID (AUD $297 Strategy Consult)
      line_items: [{ price: "price_...", quantity: 1 }],
      return_url: `${domain}/thank-you.html?checkout=success`,
    };

    // payment_method_collection only applies to subscription mode (Stripe rule)

    const session = await stripe.checkout.sessions.create(sessionParams);

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ client_secret: session.client_secret }),
    };
  } catch (err) {
    console.error("Checkout session error:", err.message);
    return {
      statusCode: 500,
      headers: {
        ...corsHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: err.message }),
    };
  }
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}
