/**
 * Returns Stripe config for the book page.
 * Secret never leaves the create-checkout function.
 * Accepts STRIPE_SECRET_KEY or APIKEY as the secret name in Netlify.
 */
exports.handler = async () => {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || "";
  const secretKey = process.env.STRIPE_SECRET_KEY || process.env.APIKEY || "";
  const configured = Boolean(
    secretKey &&
      !secretKey.includes("...") &&
      !secretKey.startsWith("mk_")
  );

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=60",
    },
    body: JSON.stringify({
      publishableKey,
      configured,
    }),
  };
};
