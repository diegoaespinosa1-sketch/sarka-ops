/**
 * Creates a Stripe Checkout Session (hosted) for the $297 strategy consult.
 * Returns { url } — client redirects to Stripe Checkout.
 */
const Stripe = require("stripe");

const STRATEGY_CONSULT_PRICE_ID = "price_1UE0cAC0E7c7eZEZy3vGcU0D";

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

  const domain =
    process.env.URL || process.env.DEPLOY_PRIME_URL || "https://sarka-ops.com";

  try {
    // Price is fixed server-side — do not trust a client-supplied priceId.
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: STRATEGY_CONSULT_PRICE_ID, quantity: 1 }],
      success_url: `${domain}/thank-you.html?checkout=success`,
      cancel_url: `${domain}/book/`,
    });

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error("Checkout session error:", error.message);
    return {
      statusCode: 500,
      headers: {
        ...corsHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: error.message }),
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
