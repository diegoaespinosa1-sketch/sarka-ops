# Ship checklist — Sarka Ops site

## Push status: FIXED

Local `main` matches GitHub `origin/main` (`c32ed62`).  
`git push` returns **Everything up-to-date**.

You do **not** need to push again until you make new commits.

---

## What’s still broken

Live **https://sarka-ops.com** is an **old** deploy:

- Homepage still shows 6 services (“Operations Built to Sell”)
- `/book/` → 404
- `/resources/7-exit-killers/` → 404

**Cause:** Netlify build succeeds, then **Essential Next.js** plugin fails → new deploy never publishes.

---

## Steps (do in order)

### 1. Stripe security (if not done)

1. Stripe → Developers → API keys  
2. **Roll** any `sk_live_…` that was pasted in chat  
3. Do **not** paste the new secret in chat or git  

### 2. Fix Netlify (this unblocks the site)

1. Open https://app.netlify.com/projects/sarka-ops/configuration/deploys  
2. Under **Build & deploy**:
   - **Build plugins** → Essential Next.js → **Disable**, **or**
   - **Build settings** → **Runtime** → Next.js → **Remove**
3. **Deploys** → **Trigger deploy** → **Clear cache and deploy site**
4. Wait until status is **Published** (no `@netlify/plugin-nextjs` error)

### 3. Verify live

Open these (hard-refresh / Incognito):

| URL | Expect |
|-----|--------|
| https://sarka-ops.com/ | “Three engagements” / Real Feedback near top |
| https://sarka-ops.com/book/ | Not 404 (checkout or “payments activating”) |
| https://sarka-ops.com/resources/7-exit-killers/ | Checklist page |

### 4. Stripe payments (after site is live)

Netlify → Environment variables:

- `STRIPE_SECRET_KEY` = new secret (UI only)
- `STRIPE_PUBLISHABLE_KEY` = matching `pk_…`

Then create $297 AUD Price → send only the `price_…` ID to wire `/book/`.

---

## Correct folder (never zip home)

```text
/Users/diegoespinosa/Sites/sarka-consulting
```

---

## Why push failed earlier (for the record)

This chat agent often has **no GitHub login prompt**.  
That is fixed for now: latest commits are on GitHub.  
Remaining work is **Netlify publish**, not push.
