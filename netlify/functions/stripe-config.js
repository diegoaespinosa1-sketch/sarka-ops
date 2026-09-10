/**
 * Returns the Stripe publishable key for the embedded Checkout Form.
 * Secret key never leaves the create-checkout-session function.
 */
exports.handler = async () => {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || "";

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300",
    },
    body: JSON.stringify({
      publishableKey,
      configured: Boolean(publishableKey && !publishableKey.includes("...")),
    }),
  };
};
