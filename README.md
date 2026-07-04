# Sarka Espinosa Consulting — Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/7a7a2b21-0eea-489f-97d3-5fa058cc4908/deploy-status)](https://app.netlify.com/projects/sarkaops/deploys)

A modern, elegant single-page website for Sarka Espinosa, Customer Experience & Operations Consultant based in Geelong, Victoria, Australia.

## ✨ Highlights

- **Premium, trustworthy design** — Clean typography, thoughtful spacing, professional teal/amber palette
- **Fully responsive** — Beautiful on desktop, tablet, and mobile
- **Zero build step** — Works immediately with Tailwind via CDN + vanilla JS
- **Interactive** — Service modals, booking modal, working contact form (mailto), keyboard shortcuts
- **Accessible** — Proper focus states, reduced-motion support, semantic markup
- **Ready to deploy** — One-command deployment to Vercel, Netlify, or GitHub Pages

---

## 📁 Project Structure

```
sarka-consulting/
├── index.html          # Main site (complete, self-contained)
├── css/
│   └── style.css       # Custom refinements
├── js/
│   └── main.js         # All interactivity (modals, forms, animations)
├── assets/
│   ├── hero-bg.jpg     # Custom hero background image
│   └── about-illustration.jpg
└── README.md
```

---

## 🚀 Quick Start

1. Open `index.html` directly in any browser (no server needed during development).
2. Or serve locally:

```bash
# Python 3
python3 -m http.server 8080

# Then visit http://localhost:8080
```

---

## ✏️ Customization Checklist

Before going live, update these placeholders:

| Item                        | Location                          | Notes |
|----------------------------|-----------------------------------|-------|
| **Calendly embed**         | Booking modal in `index.html`     | Replace the dashed placeholder box with your actual Calendly widget |
| **Email address**          | sarka@sarka-ops.com (public)      | Functional "Email Sarka directly" buttons + visible in contact section use mailto to the new address |
| **Phone number**           | Navbar + Contact + Footer         | `0478 794 176` |
| **LinkedIn URL**           | Footer                            | Update the `https://www.linkedin.com` link |
| **Testimonials**           | `js/main.js` → `testimonials` array | Replace with real client quotes when available |
| **Insights articles**      | `#insights` section               | Either link to a real blog or Medium/Substack |
| **Images**                 | `assets/`                         | Replace generated images with real photography |
| **Availability note**      | About section                     | Update "Available for select engagements 2026" |

---

## 🌐 Deployment

### Vercel (Recommended — fastest)

1. Install Vercel CLI: `npm i -g vercel`
2. From the project folder run:
   ```bash
   vercel
   ```
3. Follow prompts. Done.

Or connect the repo directly in the Vercel dashboard.

### Netlify (Drag & drop)

1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `sarka-consulting` folder onto the page.
3. Your site is live instantly.

### GitHub Pages

1. Push this folder to a GitHub repo (e.g. `sarka-consulting`)
2. Go to **Settings → Pages**
3. Set source to `main` branch / root
4. Site will be available at `https://<username>.github.io/sarka-consulting`

---

## 🔧 Advanced (Optional)

### Adding a real contact form (no email client)

Replace the current `handleContactForm` function with a service like:

- **Formspree** (free tier available)
- **Web3Forms** (no backend required — just an access key)
- **Tally.so** (beautiful forms, embeddable)

### Legal Pages

- `privacy.html` — Professional Privacy Policy (Australia-focused)
- `terms.html` — Terms & Conditions

These are linked from the footer. Review and customise the content with your legal advisor if needed.

### Contact Form

The contact form is connected to Formspree using this endpoint:
`https://formspree.io/f/mojbbgvp`

It submits via AJAX and shows a success message directly on the page (no full redirect). The form is ready to use.

### Analytics

Add Plausible, Fathom, or Google Analytics in the `<head>` before launch.

### Domain

Point `sarka.consulting` or a similar professional domain to your hosting provider.

---

## 📋 Content Notes

The site positions Sarka as a high-end **Customer Experience & Operations Consultant** for service businesses (hospitality, facilities, cleaning, professional services). 

Key value propositions highlighted:
- 14+ years hands-on leadership experience
- Practical, no-fluff approach
- Deep expertise in SOPs, Zoho CRM, Salesforce, procurement, and team development
- Bilingual / multicultural advantage (Czech, Spanish, English, French)

Adjust positioning in the hero/about sections if the focus shifts toward executive coaching or entrepreneur advisory in the future.

---

## 🛠 Tech Stack

- Tailwind CSS (via CDN for zero-build)
- Vanilla JavaScript (no frameworks)
- Semantic HTML5 + ARIA-friendly modals
- Mobile-first responsive design

---

## 📞 Contact

For updates to the website or content:

**Sarka Espinosa** 
Geelong, Victoria, Australia  
📧 Available via "Email Sarka directly" buttons on the site (address not publicly listed) 
📱 0478 794 176

---

## 🚀 Deployment (Netlify)

This is a static site, so deployment is very simple.

### Recommended: Netlify (Free Tier)

1. Go to [netlify.com](https://app.netlify.com) and log in (or sign up with GitHub).
2. Click **"Add new site" → "Deploy manually"**.
3. Drag and drop the entire `sarka-consulting` folder into the upload area.
4. Netlify will deploy it and give you a temporary URL (e.g. `random-name.netlify.app`).

### Connect Custom Domain (sarka-ops.com)

Current status: Domain has been added in Netlify and DNS verification is in progress.

**To finish connecting the domain:**

1. In your Netlify site dashboard, go to **Domain settings**.
2. Under "Custom domains", you should see `sarka-ops.com` listed.
3. Click on it and follow the DNS setup instructions.
4. Go to your domain registrar (where you bought `sarka-ops.com`) and add the DNS records that Netlify provides.

Common options Netlify will give you:
- **Recommended**: Change your nameservers to Netlify's (easiest long-term).
- Or add specific records (CNAME for `www` and A/ALIAS for the apex domain).

Once DNS propagates (usually 5–60 minutes, sometimes longer), your site will be live at `https://sarka-ops.com`.

Netlify will automatically provision HTTPS (SSL certificate).

### Important Pre-Deployment Notes

- Replace the Formspree form ID in `index.html` if you haven't already (currently using `mojbbgvp`).
- Replace the Calendly placeholder in the booking modal with your real Calendly link when ready. (Current: https://calendly.com/sarka-sarka-ops/30min)
- The site uses Formspree for the contact form — make sure your Formspree account is active and set to forward notifications to sarka@sarka-ops.com.

---

Built with care for a sharp operator who knows how to turn complexity into calm, repeatable systems.

*Last updated: 2026*
