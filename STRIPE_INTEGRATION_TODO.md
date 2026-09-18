# Stripe Integration TODO

Single source of truth for finishing the **$297 AUD Strategy Consult** checkout (embedded Checkout Form on `/book/`).

## Security

- **Never** put `sk_live_…` / `sk_test_…` in chat, git, or HTML.
- If a secret key was exposed: Stripe Dashboard → API keys → **Roll** it, then set the **new** key only in Netlify env vars.
- Secret key goes in Netlify as `STRIPE_SECRET_KEY` only (not in this repo).

## Values to Replace

The following values are placeholders and must be updated before going live.

**Files containing placeholders:**
- [netlify/functions/create-checkout-session.js](netlify/functions/create-checkout-session.js)

| Field | Current Value | What to Set |
|-------|--------------|-------------|
| `mode` | `payment` | Keep **`payment`** for this one-time consult. |
| `line_items[].price` | `price_1UE0cAC0E7c7eZEZy3vGcU0D` | Wired 2026-09-18. One-time $297 AUD Strategy Consult. |

## Configured Parameters

These parameters were configured from Checkout Studio Field Intents.

**Files containing these parameters:**
- [netlify/functions/create-checkout-session.js](netlify/functions/create-checkout-session.js)

| Parameter | Value |
|-----------|-------|
| `ui_mode` | `form` |
| `billing_address_collection` | `auto` |
| `phone_number_collection` | `{ enabled: false }` |
| `automatic_tax` | `{ enabled: false }` |
| `submit_type` | `auto` |
| `integration_identifier` | `custom_embedded_web_0001` |
| `return_url` | `{site}/thank-you.html?checkout=success` |

**Not included:** `payment_method_collection` — only used when `mode` is `subscription` (this flow is `payment`).

**SDK note:** `package.json` uses `stripe` ^17.7.0. If Netlify logs reject `ui_mode: "form"`, upgrade the dependency (`stripe@latest`) and redeploy. Older SDKs used `embedded` / `custom`. Netlify build runs `npm install`.

## Setup and next steps

### 1. Environment variables (Netlify)

**Site configuration → Environment variables:**

| Variable | Value |
|----------|--------|
| `STRIPE_SECRET_KEY` | `sk_test_…` or `sk_live_…` |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_…` or `pk_live_…` |

Keys: https://dashboard.stripe.com/apikeys  
Never commit secrets. Template: [.env.example](.env.example).

### 2. Create the $297 product

1. Stripe Dashboard → Products → Add product  
2. Name: **Strategy Consult — Sarka Espinosa**  
3. Price: **297.00 AUD**, one-time  
4. Price ID wired: `price_1UE0cAC0E7c7eZEZy3vGcU0D`  
5. Commit + push  

### 3. Deploy

```bash
cd ~/Sites/sarka-consulting
git add -A
git commit -m "Add Stripe embedded checkout for strategy consult"
git push
```

Confirm Netlify build succeeds (`npm install` + functions).

### 4. Flow overview

```text
Any “Book — $297” CTA
  → /book/
      → GET  /api/stripe-config              (publishable key)
      → POST /api/create-checkout-session    (client_secret)
      → Stripe Checkout Form (dahlia / embedded)
          → return_url /thank-you.html?checkout=success
              → Calendly to pick time (free Calendly event)
```

### 5. Project structure (new / updated)

| Path | Role |
|------|------|
| [book/index.html](book/index.html) | Client: Checkout Form SDK |
| [netlify/functions/create-checkout-session.js](netlify/functions/create-checkout-session.js) | Server: `checkout.sessions.create` |
| [netlify/functions/stripe-config.js](netlify/functions/stripe-config.js) | Publishable key only |
| [thank-you.html](thank-you.html) | Post-payment + schedule |
| [package.json](package.json) | `stripe` for functions |
| [netlify.toml](netlify.toml) | Functions + `/api/*` proxies |
| [js/main.js](js/main.js) | `openBookingModal()` → `/book/` |

### 6. Testing

- Use **test** keys first.  
- Card: `4242 4242 4242 4242` — https://docs.stripe.com/testing  
- Open `/book/` on the deploy URL (functions won’t work on plain `file://`).  

### 7. Checklist

- [ ] Set `STRIPE_SECRET_KEY` + `STRIPE_PUBLISHABLE_KEY` in Netlify  
- [x] Replace `price_...` with `price_1UE0cAC0E7c7eZEZy3vGcU0D`  
- [ ] Push / redeploy  (do after env keys exist)  
- [ ] Test payment → thank-you → Calendly  
- [ ] Switch to **live** keys when ready  
- [ ] Optional: webhook `checkout.session.completed` for email alerts  

### Resources

- https://support.stripe.com  
- https://docs.stripe.com/mcp  
- https://docs.stripe.com/payments/quickstart  

---

**If embedded form is too fragile:** create a Stripe **Payment Link** for $297 AUD and point Book buttons at it (success URL = `/thank-you.html?checkout=success`). Same outcome, less code.
