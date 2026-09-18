# Ship checklist — Sarka Ops site

**Website folder (do not rename):** `/Users/diegoespinosa/Sites/sarka-consulting`  
**GitHub remote name (not a local folder):** `diegoaespinosa1-sketch/sarka-ops`  
**HQ folder (do not touch this packet):** `/Users/diegoespinosa/sarka-ops`

Verified live 2026-09-18 after GitHub link + clear-cache deploy. SHA `7f530aa`. Folders not renamed.

---

## Status

| Layer | State |
|-------|--------|
| Local / GitHub | `7f530aa` — static HTML, not Next.js |
| Folders | Unchanged |
| https://sarka-ops.com/ | **Live.** “Three engagements.” Not the old six-service page |
| https://sarka-ops.com/book/ | **Live.** “Book a Strategy Consult” — checkout not proven (Stripe env) |
| https://sarka-ops.com/resources/7-exit-killers/ | **Live.** “7 operational issues…” checklist |

Do **not** zip-upload the home folder.

---

## 1. Local + GitHub (done)

`netlify.toml` build command is `true`. Pushed `7f530aa`. Netlify linked to `diegoaespinosa1-sketch/sarka-ops`.

---

## 2. Netlify UI (after push) — one click at a time

Open the project whose domain is **sarka-ops.com** (UI name may be `sarka-ops` or `sarkaops`).

1. Project configuration → **Build & deploy**
2. **Runtime** → if Next.js → **Remove**
3. **Build plugins** → Essential Next.js → **Disable**
4. Build settings: publish `.` · command empty or `true` · not Next
5. Deploys → **Trigger deploy** → **Clear cache and deploy site**
6. Wait for **Published** with no `@netlify/plugin-nextjs` error

---

## 3. Verify live (incognito)

| URL | Expect |
|-----|--------|
| https://sarka-ops.com/ | “Three engagements” / Real Feedback near top |
| https://sarka-ops.com/book/ | Not 404 |
| https://sarka-ops.com/resources/7-exit-killers/ | Checklist page |

---

## 4. Stripe (after pages exist)

Roll any `sk_live_…` pasted in the old chat. Set keys in Netlify UI only. Then `$297 AUD` Price ID.

---

## Fallback

Same GitHub repo, **new** Netlify project, framework None. Preview must show three engagements before you move the domain. Do not rebuild HTML. Do not rename local folders.
