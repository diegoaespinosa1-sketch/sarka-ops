# Ship checklist — Sarka Ops site

**Website folder (do not rename):** `/Users/diegoespinosa/Sites/sarka-consulting`  
**GitHub remote name (not a local folder):** `diegoaespinosa1-sketch/sarka-ops`  
**HQ folder (do not touch this packet):** `/Users/diegoespinosa/sarka-ops`

Checked 2026-09-18: live https://sarka-ops.com still shows six services. `/book/` and `/resources/7-exit-killers/` 404. GitHub already has the three-engagement homepage.

---

## Status

| Layer | State |
|-------|--------|
| Local files | Three engagements in `index.html` |
| Folders | Unchanged. No rename / merge / delete. |
| GitHub `origin/main` | Was `012436a`. New local commit waits for your **push yes**. |
| Live sarka-ops.com | **Old.** Next.js runtime/plugin still blocking publish. |

Do **not** zip-upload the home folder.

---

## 1. Local (this session)

`netlify.toml` no longer runs `npm install`. Build command is `true` (no-op) so a UI Next.js command cannot win. Plugin skip env vars kept.

**Waiting on you:** yes to **git push** of this commit only. Agent will not push without that.

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
