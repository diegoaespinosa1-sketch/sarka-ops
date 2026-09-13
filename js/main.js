// Sarka Espinosa Consulting - Main JS

// Tailwind script configuration
function initTailwind() {
    const style = document.createElement('style');
    style.innerHTML = `
        .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 80) {
            navbar.classList.add('nav-scrolled', 'shadow-sm');
        } else {
            navbar.classList.remove('nav-scrolled', 'shadow-sm');
        }
        
        lastScroll = currentScroll;
    });
}

// Mobile menu
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isHidden = menu.classList.contains('hidden');
        if (isHidden) {
            menu.classList.remove('hidden');
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
        } else {
            menu.classList.add('hidden');
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            `;
        }
    });

    // Close mobile menu when clicking nav links
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            `;
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                e.preventDefault();
                const offset = 80; // account for fixed nav
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - bodyRect - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fade-in on scroll animation
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    // Add fade-in class to key sections
    const sections = document.querySelectorAll('#services, #results, #about, #how, #insights, #contact');
    sections.forEach((section, i) => {
        section.classList.add('fade-in');
        section.style.transitionDelay = (i * 40) + 'ms';
        observer.observe(section);
    });
}

// Testimonials data & carousel/grid
const testimonials = [
    {
        quote: "Working with Sarka has been incredible. It hasn’t always been easy, but we can clearly see the results in how much we’ve improved our services.",
        name: "Mia Kenway",
        role: "General Manager",
        company: "Surf Hotel",
        photo: "assets/surf-hotel-note.jpg",
        photoCaption: "Handwritten thank you note from Surf Hotel after onboarding new product lines"
    },
    {
        quote: "When it comes to results, Sarka delivers. We’ve opened different markets together — a real pleasure to work with her.",
        name: "Paul",
        role: "Regional Account Manager, Victoria & Tasmania",
        company: "Huhtamaki",
        photo: "assets/huhtamaki-paul.jpg",
        photoCaption: "On site with Huhtamaki — warehouse operations, Victoria"
    },
    {
        quote: "Sarka structured our CX onboarding and built a complete end-to-end system that has allowed us to improve customer retention.",
        name: "M Kashmire",
        role: "Sales Manager",
        company: "National Media QLD"
    },
    {
        quote: "Sarka has been more than a delight to work with. When it comes to sales, there’s nothing like real results to prove that it works.",
        name: "Penni Useinov",
        role: "",
        company: "SABCO",
        photo: "assets/penni-sabco.jpg",
        photoCaption: "At SABCO warehouse introducing new product lines to distributors"
    },
    {
        quote: "In hospitality, our customers are the ultimate barometer. And when it comes to going out of her way to solve a problem, that’s where Sarka shines.",
        name: "Sam C",
        role: "",
        company: "Mantra"
    }
];

function initTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    container.innerHTML = testimonials.map((t, index) => `
        <div class="testimonial bg-slate-50 border border-slate-200/80 rounded-2xl p-7 md:p-8 flex flex-col hover:border-slate-300 hover:shadow-md transition-all duration-200" data-index="${index}">
            <div class="flex-1">
                <div class="text-teal-700/40 text-4xl font-serif leading-none mb-3">“</div>
                <p class="text-[15px] leading-relaxed text-slate-700">“${t.quote}”</p>
            </div>
            <div class="mt-8 pt-5 border-t border-slate-200 flex items-center gap-x-3">
                ${t.photo 
                    ? `<img src="${t.photo}" alt="${t.name}" class="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover object-center flex-shrink-0 ring-1 ring-slate-200" width="80" height="80">` 
                    : `<div class="w-11 h-11 rounded-full bg-slate-900 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold tracking-wide">${t.name.split(' ').map(n => n[0]).join('')}</div>`
                }
                <div>
                    <div class="font-semibold text-sm tracking-tight text-slate-900">${t.name}</div>
                    <div class="text-xs text-slate-500">${t.role}${t.role && t.company ? ', ' : ''}${t.company}</div>
                    ${t.photoCaption ? `<div class="text-[10px] text-teal-700 mt-0.5 leading-snug">${t.photoCaption}</div>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Service modal data — three offers only
const servicesData = [
    {
        iconBg: 'bg-amber-100 text-amber-800',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
        title: "Exit-Ready Audit + 90-Day Plan",
        longDesc: "I help ambitious service business owners identify and fix the hidden operational weaknesses that destroy 30–50% of business value at exit. You receive a clear, actionable 90-day plan to make your business scalable, transferable, and highly attractive to buyers — while improving performance today.",
        deliverables: [
            "Full operations audit with an exit-valuation lens",
            "Prioritised 90-day execution plan with owners and deadlines",
            "Owner-dependency score and reduction roadmap",
            "Gap analysis across systems, CX, leadership, and hygiene",
            "Clear recommendation: Build engagement, Fractional retainer, or both"
        ],
        audience: "Owners of established hospitality, facilities, and multi-site service businesses preparing for sale, succession, or reduced involvement within 3–7 years.",
        length: "Flagship engagement. Typical audit + plan cycle: focused weeks, then optional Build or Fractional. Deliverables guarantee applies to agreed scope."
    },
    {
        iconBg: 'bg-teal-100 text-teal-700',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2m0-2a2 2 0 012-2m0 2v2m0-2a2 2 0 01-2 2" /></svg>`,
        title: "Operations Build",
        longDesc: "Implementation engagement to execute the plan. We build the systems so the business runs without you — SOPs and process design, CX standardisation, CRM/sales operating rhythm, and leadership enablement — scoped to what the audit prioritised.",
        deliverables: [
            "Scoped SOP library and living process system",
            "CX playbooks and consistency standards where needed",
            "CRM / sales system build or repair (e.g. Zoho, Salesforce) as scoped",
            "Manager and frontline enablement tied to the new operating rhythm",
            "Handover pack your team can own"
        ],
        audience: "Owners who have clarity (often after the Audit + 90-Day Plan) and need execution — not another strategy deck.",
        length: "Fixed-scope engagement. Duration depends on priorities — typically weeks to a few months. Quoted after the strategy consult."
    },
    {
        iconBg: 'bg-rose-100 text-rose-700',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>`,
        title: "Fractional CX & Operations Leadership",
        longDesc: "Monthly retainer for embedded senior support. I work as an extension of your leadership team to drive commercial performance while building operations that stay exit-ready — until the systems hold without you.",
        deliverables: [
            "Monthly strategy and planning sessions",
            "Operational reviews and priority execution support",
            "Project leadership on key initiatives",
            "Direct access for decisions that can’t wait",
            "Quarterly reviews with owners / board as needed"
        ],
        audience: "Growing companies that have outgrown current systems but do not need (or are not ready for) a full-time CXO or Head of Operations.",
        length: "Monthly retainer. Minimum 3 months. Most clients stay 9–18 months."
    }
];

let currentServiceIndex = null;

function showServiceModal(index) {
    const modal = document.getElementById('service-modal');
    const data = servicesData[index];
    
    document.getElementById('service-modal-icon').className = `w-12 h-12 rounded-2xl flex items-center justify-center ${data.iconBg}`;
    document.getElementById('service-modal-icon').innerHTML = data.icon;
    
    document.getElementById('service-modal-title').textContent = data.title;
    document.getElementById('service-modal-desc').textContent = data.longDesc;
    
    const delivList = document.getElementById('service-modal-deliverables');
    const escapeHtml = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    delivList.innerHTML = data.deliverables.map(d => 
        `<li class="flex gap-x-2"><span class="text-teal-600 mt-0.5">•</span> <span>${escapeHtml(d)}</span></li>`
    ).join('');
    
    document.getElementById('service-modal-audience').innerHTML = escapeHtml(data.audience);
    document.getElementById('service-modal-length').innerHTML = escapeHtml(data.length);
    
    currentServiceIndex = index;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Enable swipe-to-close on mobile (idempotent via event listeners on sheet)
    enableSwipeToClose(modal, closeServiceModal);
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    const sheet = modal.querySelector('.modal');
    if (sheet) sheet.style.transform = '';
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Booking → Stripe Checkout page ($297 strategy consult)
function openBookingModal() {
    window.location.href = '/book/';
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    const sheet = modal.querySelector('.modal');
    if (sheet) sheet.style.transform = '';
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// ============================================
// CONTACT FORM (Formspree AJAX)
// ============================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
        }

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success - show nice message
                contactForm.innerHTML = `
                    <div class="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                        <div class="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7" />
                            </svg>
                        </div>
                        <div class="font-semibold text-emerald-800 text-lg">Thank you — message sent.</div>
                        <p class="text-emerald-700 mt-2 text-sm">I'll review your enquiry and get back to you within 24 hours.</p>
                    </div>
                `;
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Fallback: open email client
            alert("There was a problem sending the form. We'll open your email client instead.");
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const message = formData.get('message') || '';
            window.location.href = `mailto:${CONTACT_EMAIL}?subject=Consulting enquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
        }
    });
}

// Keyboard escape support for modals
function initKeyboardControls() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const booking = document.getElementById('booking-modal');
            const service = document.getElementById('service-modal');
            
            if (!booking.classList.contains('hidden')) {
                closeBookingModal();
            } else if (!service.classList.contains('hidden')) {
                closeServiceModal();
            }
        }
        
        // Quick "b" key opens booking (nice power-user touch)
        if (e.key.toLowerCase() === 'b' && document.activeElement.tagName === 'BODY') {
            const booking = document.getElementById('booking-modal');
            if (booking.classList.contains('hidden')) {
                openBookingModal();
            }
        }
    });
}

// Set current year in footer
function initFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// Main initialisation
function init() {
    initTailwind();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initTestimonials();
    initKeyboardControls();
    initFooterYear();

    // Optional: prefill a demo message hint in console for developers
    console.log('%c[Sarka Consulting] Website ready. Press "B" to open booking modal.', 'color:#64748b');
}

// Boot
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// SIMPLE MULTI-LANGUAGE SUPPORT (EN / ES / FR / CZ)
// Currently focused on In the Room section + key UI
// Expand as needed by adding more keys
// ============================================

const translations = {
    en: {
        // Navigation and UI
        "nav.services": "Services",
        "nav.results": "Results",
        "nav.feedback": "Feedback",
        "nav.in_the_room": "In the Room",
        "nav.about": "About",
        "nav.how_i_work": "How I Work",
        "nav.insights": "Insights",
        "nav.contact": "Contact",
        "nav.book_call": "Book Consult — $297",

        // Hero positioning - Exit-Ready & Commercial Growth
        "hero.location": "GEELONG, AUSTRALIA",
        "hero.title": "Exit-Ready Operations &amp; Commercial Growth",
        "hero.subtitle": "Your service business should scale and perform without depending on you every day — ready for growth or exit, with systems buyers can trust.",
        "hero.cta_book": "Book a Strategy Consult — $297",
        "hero.cta_rooms": "See the Rooms I’ve Been In",
        "hero.cta_checklist": "Owner checklist: 7 exit-killers",
        "hero.point1": "Operations that run without the owner",
        "hero.point2": "Systems buyers trust in due diligence",
        "hero.point3": "Hard truths, clear 90-day execution",
        "hero.proof1_label": "For you",
        "hero.proof1": "Less owner dependency — the business still performs",
        "hero.proof2_label": "At exit",
        "hero.proof2": "Fewer operational gaps that commonly wipe 30–50% of value",
        "hero.proof3_label": "In diligence",
        "hero.proof3": "Clearer systems and evidence buyers can trust",
        "hero.portrait_sub": "Exit-ready operations · Service businesses",
        "hero.strip_link": "Surf Hotel · Huhtamaki · SABCO · more",
        "hero.trust": "Geelong, Australia • Working with service business leaders across Australia",

        // In the Room
        "inroom.label": "IN THE ROOM",
        "inroom.title": "In the Room with Exceptional Operators",
        "inroom.desc": "I’ve had the privilege of working alongside and learning from some of the sharpest minds in business and performance. These experiences shape how I help service business owners become truly Exit-Ready.",

        // Services section — three offers
        "services.label": "HOW I HELP",
        "services.title": "Three engagements. One outcome: a business that runs without you.",
        "services.desc": "No capability menu. Clear next steps for owners who want exit-ready operations and commercial performance — not another workshop catalogue.",
        "services.entry": "Entry point: paid strategy consult — $297 AUD (credited if we proceed).",

        // Results
        "results.label": "CLIENT RESULTS",
        "results.title": "What Owners Achieve",
        "results.outcome1": "Clearer systems that dramatically reduce owner dependency",
        "results.outcome2": "Significantly higher buyer confidence and smoother due diligence",
        "results.outcome3": "Stronger commercial performance while preparing the business for exit",
        "results.outcome4": "Eliminate the operational issues that commonly destroy 30–50% of exit value",

        "service1.badge": "Flagship",
        "service1.meta": "Engagement · Audit + 90-day plan",
        "service1.title": "Exit-Ready Audit + 90-Day Plan",
        "service1.desc": "Find the operational gaps that destroy exit value. Walk away with a prioritised 90-day plan so the business can run — and sell — without you.",
        "service2.meta": "Engagement · Implementation",
        "service2.title": "Operations Build",
        "service2.desc": "Execute the plan: SOPs, CX systems, CRM/sales operating rhythm, and leadership enablement — scoped so the business runs without the owner.",
        "service3.meta": "Monthly retainer",
        "service3.title": "Fractional CX & Operations Leadership",
        "service3.desc": "Embedded senior support to drive performance now and keep building independence — until the systems hold without you.",
        "exitready.label": "FLAGSHIP PROGRAM",
        "exitready.title": "Exit-Ready Operations — full program detail",
        "exitready.flagship": "My flagship offering.",
        "exitready.desc": "Guarantee, pillars, and how the Audit + 90-Day Plan works. For owners serious about transferability and value.",
        "exitready.benefit1": "Eliminate the issues that destroy 30–50% of exit value",
        "exitready.benefit2": "Build systems that let the business run and sell without you",
        "exitready.benefit3": "Get a clear 90-day plan that materially improves buyer confidence and valuation",
        "exitready.cta": "View the program",
        "exit.title": "Audit + 90-Day Plan to Make Your Business Independent",
        "exit.subtitle": "I help ambitious owners of small-to-medium service businesses build operations that scale, perform at the highest level, and are fully prepared for exit or significant commercial growth.",
        "exit.strong": "Fix the operational problems that commonly destroy 30–50% of business value at exit.",
        "exit.program_label": "THE PROGRAM",
        "exit.program_title": "The Audit + 90-Day Plan to Make Your Business Independent",
        "exit.program_desc": "My flagship engagement. A focused, practical program that gives you clarity and momentum fast.",
        "exit.program.item1": "Full operations audit focused on exit and commercial value",
        "exit.program.item2": "Identification of the biggest valuation risks and opportunities",
        "exit.program.item3": "Custom 90-Day Execution Plan with clear priorities and accountability",
        "exit.program.item4": "Hands-on guidance to implement the highest-leverage fixes",
        "exit.how_label": "THE PROCESS",
        "exit.how_title": "How It Works",
        "exit.how.step1_title": "Discovery Call",
        "exit.how.step1_desc": "Understand your business and goals",
        "exit.how.step2_title": "Deep Operations Audit",
        "exit.how.step2_desc": "Review systems, processes, CX, team structure, and owner dependency",
        "exit.how.step3_title": "Exit-Ready Gap Analysis",
        "exit.how.step3_desc": "Clear report on risks and opportunities",
        "exit.how.step4_title": "90-Day Readiness Plan",
        "exit.how.step4_desc": "Prioritised, actionable roadmap",
        "exit.how.step5_title": "Implementation Support",
        "exit.how.step5_desc": "Regular check-ins and guidance (optional extension)",
        "exit.expect_label": "WHAT YOU CAN EXPECT",
        "exit.expect_title": "What You Can Expect",
        "exit.expect.item1": "A business that runs stronger today",
        "exit.expect.item2": "Significantly higher buyer confidence and valuation",
        "exit.expect.item3": "Reduced owner dependency",
        "exit.expect.item4": "Cleaner systems and data for due diligence",
        "exit.expect.item5": "Practical improvements you can implement immediately",
        "exit.for_you_label": "THIS IS FOR YOU IF",
        "exit.for_you_title": "This Is For You If",
        "exit.for_you.item1": "You own a service/facilities/cleaning/laundry/hospitality business",
        "exit.for_you.item2": "You are considering an exit in the next 6–36 months (or want the option)",
        "exit.for_you.item3": "You are willing to do the real work required",
        "exit.for_you.item4": "You value practical execution over theory",
        "exit.investment_label": "INVESTMENT",
        "exit.investment_title": "Investment",
        "exit.investment_desc1": "Project fees typically range from $8,000 – $25,000+ depending on business size and scope.",
        "exit.investment_desc2": "The best next step is a paid Strategy Consult ($297 AUD — credited if we proceed).",
        "exit.investment_cta": "Book Your Strategy Consult — $297 →",
        "exit.investment_note": "Limited capacity. Serious inquiries only.",
        "guarantee.label": "GUARANTEE",
        "guarantee.title": "100% Money-Back Guarantee",
        "guarantee.short_title": "100% Money-Back Guarantee",
        "guarantee.short": "If I don’t deliver the agreed work — and you do your part — you get a full refund. Full terms on the program page.",
        "guarantee.promise": "If I do not deliver what we agreed in your engagement scope, you get a full refund of the fees you paid for that engagement.",
        "guarantee.item1": "<strong class=\"text-white\">What this covers:</strong> the agreed deliverables — audit, plan, sessions, and documentation scoped in writing.",
        "guarantee.item2": "<strong class=\"text-white\">Your part:</strong> provide access, accurate information, timely decisions, and complete the agreed actions on your side.",
        "guarantee.item3": "<strong class=\"text-white\">What this does not cover:</strong> sale price, valuation multiples, revenue, buyer interest, or results that depend on market conditions or your team’s execution after handover.",
        "guarantee.item4": "<strong class=\"text-white\">How it works:</strong> if deliverables are not met and you fulfilled your responsibilities, request a refund in writing within 14 days of the engagement end date. Full refund of fees paid for that engagement.",
        "guarantee.footer": "Simple rule: I deliver what we said. You do what we said. If I miss, you get your money back.",
        "modal.deliverables": "TYPICAL DELIVERABLES",
        "modal.who_for": "WHO THIS IS FOR",
        "modal.engagement": "ENGAGEMENT LENGTH",
        "modal.discuss": "Discuss this engagement →",
        "modal.book_call": "Book consult — $297",
        "booking.title": "Book a Strategy Consult",
        "booking.subtitle": "30 minutes · $297 AUD · Credited if we proceed",
        "booking.note": "Serious inquiries only. The consult fee is credited in full toward your engagement if we move forward.",
        "service.learn_more": "Learn more",
        "cta.book": "Book a Strategy Consult — $297",
        "cta.message": "Send me a message",
        "cta.final.title": "Ready to Make Your Business Truly Independent?",
        "cta.final.subtitle": "Book a paid strategy consult. I’ll review your situation and show you the highest-leverage path to independence and protected value.",
        "cta.final.book": "Book Strategy Consult — $297",
        "cta.final.note": "Limited slots. $297 AUD — credited if we proceed. Serious inquiries only.",
        "about.label": "MY STORY",
        "about.title": "14 years operating at the level where excellence is non-negotiable.",
        "about.p1": "My career has taken me from high-volume hotels on the Gold Coast to multi-site facilities services in regional Victoria — leading sales, procurement, and operations teams that consistently delivered the best results in their businesses.",
        "about.p2": "Along the way, I’ve had the privilege of spending time with founders and operators who have built significant enterprises. These experiences have shaped how I think about scaling, leadership, and what it actually takes to build organisations that perform at a high level.",
        "about.p3": "Today I work with a small number of ambitious service business leaders who want practical, no-fluff help building the systems, teams, and customer experiences that match the level of their ambition — whether through full transformations, operational overhauls, or ongoing strategic guidance as a fractional partner.",
        "about.languages_label": "Languages",
        "about.languages": "Czech (native)<br>Spanish (fluent)<br>English (fluent)<br>French (conversational)",
        "about.education_label": "Education",
        "about.education": "Master’s in Accounts &amp; Business<br>Bachelor of Hospitality Management",
        "about.systems_label": "Systems",
        "about.systems": "Zoho CRM, Salesforce, HubSpot<br>Jiwa ERP, Xero, Microsoft 365 + Copilot<br>Asana, Power BI, Zapier, Lucidchart",
        "about.approach_label": "Approach",
        "about.approach": "Practical. Data-informed.<br>Human-centred.<br>Zero fluff.",
        "about.linkedin": "Connect on LinkedIn",
        "engagements.label": "ENGAGEMENTS",
        "engagements.title": "A clear, collaborative process from day one.",
        "engagements.desc": "No cookie-cutter frameworks. You get clarity first, then systems your team actually uses — so performance doesn’t depend on you being in every decision.",
        "engagements.step1_title": "Strategy Consult",
        "engagements.step1_desc": "Paid 30-minute consult ($297 AUD, credited if we proceed) to understand your challenges, goals, and constraints — and whether we are a fit.",
        "engagements.step2_title": "Diagnostic &amp; Roadmap",
        "engagements.step2_desc": "I conduct interviews, review data and processes, then deliver a prioritised roadmap with clear ROI projections.",
        "engagements.step3_title": "Implementation Partnership",
        "engagements.step3_desc": "We work together (or I lead) to build and embed the systems. Weekly check-ins, hands-on workshops, and team training included.",
        "engagements.step4_title": "Measure &amp; Sustain",
        "engagements.step4_desc": "90-day review, KPI dashboards, and a handover package so your team owns the improvements long-term. Optional monthly retainer available.",
        "feedback.label": "REAL FEEDBACK",
        "feedback.title": "What leaders say about working together",
        "feedback.desc": "Direct quotes from owners and operators after completing the work — not celebrity rooms.",
        "insights.label": "THOUGHT LEADERSHIP",
        "insights.title": "Latest insights",
        "insights.see_all": "See all insights →",
        "insights.cat.operations": "OPERATIONS",
        "insights.cat.cx": "CUSTOMER EXPERIENCE",
        "insights.cat.leadership": "LEADERSHIP",
        roomTitles: [
            "With JT Foxx — global entrepreneur & mastermind leader",
            "With JT Foxx and billionaire entrepreneur John Catsimatis in New York",
            "With Tim Gannon and JT Foxx",
            "With Reggie Batts — collaborating on consultancy & events",
            "With Joe Foster, Co-Founder of Reebok",
            "Alongside Tom Brady in Melbourne",
            "With Francie at high-level events coordinating billionaires, entrepreneurs & business owners"
        ],
        roomStories: [
            `<p>JT Foxx is one of the most recognised global entrepreneurs and mastermind leaders of our time — building platforms that connect serious business owners, raise capital, and scale companies to seven and eight figures.</p><p>We work in the same high-level rooms and continue to collaborate. His positioning, network, and execution set a standard for what serious entrepreneurship looks like — and that standard directly shapes how I support ambitious service business owners.</p><p>More joint work is ahead.</p>`,
            `<p>John Catsimatis is a self-made billionaire who has built and scaled multiple significant enterprises across industries, creating substantial wealth and long-term value through disciplined execution and strategic vision.</p><p>Alongside him stands his wife, who has been an integral part of that journey. Together they represent a powerful example of sustained business success at the highest level — in rooms that also include leaders like JT Foxx.</p><p>Being in this room provided direct proximity to the mindset and track record of individuals who have repeatedly delivered exceptional, result-driven outcomes over decades.</p>`,
            `<p>Tim Gannon is the co-founder of Outback Steakhouse, one of the most iconic and successful casual dining restaurant chains in the world. He helped scale the concept from a single restaurant into a global empire with hundreds of locations.</p><p>Being in the room with Tim Gannon alongside JT Foxx offered direct access to the mindset and strategies behind building enduring, scalable service businesses that deliver exceptional results year after year.</p>`,
            `<p>Reggie Batts is a high-level collaborator I work with as a peer on consultancy and events.</p><p>I support Reggie with consultancy and event work — and he has been openly grateful for that contribution. We operate as equals: building rooms, creating value, and delivering real outcomes for serious people in business.</p><p>That kind of peer collaboration is the standard I bring to every engagement.</p>`,
            `<p>Joe Foster co-founded Reebok and scaled it from a small British company into one of the world’s leading global athletic brands, competing directly with Nike and Adidas on an international stage.</p><p>The brand reached billions in revenue, became a cultural icon, and was eventually acquired in a multi-billion-dollar transaction.</p><p>Sitting with the man who helped build that level of global commercial success provides rare perspective on what it takes to create enduring, large-scale businesses.</p>`,
            `<p>Tom Brady is the most decorated quarterback in NFL history, with a record 7 Super Bowl championships — the highest achievement in American team sports.</p><p>Beyond athletics, he built a multi-hundred-million-dollar personal brand and business empire, including the TB12 wellness platform and strategic investments in major companies.</p><p>Proximity to someone who has consistently delivered world-class results across two decades at the absolute highest level offers powerful insight into sustained high performance and brand building at scale.</p>`,
            `<p>Francie is a key connector and strategist who curates high-caliber events bringing together billionaires, entrepreneurs, and ambitious business owners.</p><p>We collaborate on multiple events focused on lead generation, deal flow, and strategic marketing. My role involves coordinating the right rooms and ensuring participants walk away with meaningful opportunities and relationships.</p><p>These environments have given me direct insight into what it takes to create real value at the highest levels of business and entrepreneurship.</p>`
        ],
        readStory: "Read story →",
        moreMoments: "More moments from high-authority rooms available upon request.",
        "inroom.more": "More moments from high-authority rooms available upon request."
    },
    es: {
        // Colombian Spanish — tono empresarial profesional
        "nav.services": "Servicios",
        "nav.results": "Resultados",
        "nav.in_the_room": "En la Sala",
        "nav.about": "Sobre Mí",
        "nav.how_i_work": "Cómo Trabajo",
        "nav.insights": "Perspectivas",
        "nav.contact": "Contacto",
        "nav.book_call": "Consulta — $297",

        "hero.location": "GEELONG, AUSTRALIA",
        "hero.title": "Operaciones Preparadas para la Salida &amp; Crecimiento Comercial",
        "hero.subtitle": "Ayudo a propietarios ambiciosos de negocios de servicios a construir operaciones que escalan, operan al más alto nivel y están completamente preparadas para una salida o un crecimiento importante — sin depender de usted.",
        "hero.cta_book": "Consulta estratégica — $297",
        "hero.cta_rooms": "Conozca las salas en las que he estado",
        "hero.point1": "Operaciones que funcionan sin el propietario",
        "hero.point2": "Sistemas en los que confían los compradores en la due diligence",
        "hero.point3": "Verdades difíciles, ejecución clara en 90 días",
        "hero.portrait_sub": "Operaciones preparadas para la salida · Negocios de servicios",
        "hero.strip_link": "JT Foxx · Tim Gannon · Joe Foster · más",
        "hero.trust": "Geelong, Australia • Trabajando con líderes de negocios de servicios en toda Australia",

        "inroom.label": "EN LA SALA",
        "inroom.title": "En la Sala con Operadores Excepcionales",
        "inroom.desc": "He tenido el privilegio de trabajar junto a y aprender de algunas de las mentes más agudas en negocios y alto rendimiento. Estas experiencias moldean cómo ayudo a propietarios de negocios de servicios a volverse verdaderamente preparados para una salida.",

        "services.label": "CÓMO AYUDO",
        "services.title": "Tres engagements. Un resultado: un negocio que funciona sin usted.",
        "services.desc": "Sin menú de capacidades. Pasos claros para propietarios que quieren operaciones listas para la salida — no otro catálogo de talleres.",
        "services.entry": "Punto de entrada: consulta estratégica de pago — 297 $ AUD (acreditada si avanzamos).",

        "results.label": "RESULTADOS DE CLIENTES",
        "results.title": "Lo que logran los propietarios",
        "results.outcome1": "Sistemas mucho más claros que reducen drásticamente la dependencia del propietario",
        "results.outcome2": "Significativamente mayor confianza del comprador y due diligence más fluida",
        "results.outcome3": "Fuerte desempeño comercial mientras se prepara el negocio para la salida",
        "results.outcome4": "Eliminar los problemas operativos que comúnmente destruyen entre el 30% y el 50% del valor en la salida",

        "service1.badge": "Oferta principal",
        "service1.meta": "Engagement · Auditoría + plan 90 días",
        "service1.title": "Auditoría Exit-Ready + Plan 90 Días",
        "service1.desc": "Encuentre las brechas operativas que destruyen valor de salida. Salga con un plan priorizado de 90 días para que el negocio funcione — y se venda — sin usted.",
        "service2.meta": "Engagement · Implementación",
        "service2.title": "Operations Build",
        "service2.desc": "Ejecute el plan: POEs, sistemas de CX, ritmo comercial/CRM y habilitación de liderazgo — acotado para que el negocio opere sin el propietario.",
        "service3.meta": "Retainer mensual",
        "service3.title": "Liderazgo Fraccional en CX y Operaciones",
        "service3.desc": "Apoyo senior integrado para impulsar el desempeño y seguir construyendo independencia — hasta que los sistemas se sostengan sin usted.",

        "exitready.label": "OFERTA PRINCIPAL",
        "exitready.title": "Auditoría + Plan de 90 Días para hacer su negocio independiente",
        "exitready.flagship": "Mi oferta principal.",
        "exitready.desc": "Ayudo a propietarios a cerrar la brecha entre las operaciones diarias y un negocio que realmente se puede transferir y vender.",
        "exitready.benefit1": "Elimine los problemas que destruyen entre el 30% y el 50% del valor en la salida",
        "exitready.benefit2": "Construya sistemas que permitan que el negocio funcione y se venda sin usted",
        "exitready.benefit3": "Obtenga un plan claro de 90 días que mejora materialmente la confianza del comprador y la valoración",
        "exitready.cta": "Conozca más sobre el Programa de Operaciones Preparadas para la Salida",
        "modal.deliverables": "ENTREGABLES TÍPICOS",
        "modal.who_for": "PARA QUIÉN ES ESTO",
        "modal.engagement": "DURACIÓN DEL COMPROMISO",
        "modal.discuss": "Discutir este servicio →",
        "modal.book_call": "Agenda una llamada",
        "booking.title": "Agenda una Llamada Estratégica",
        "booking.subtitle": "30 minutos • Gratis • Sin obligación",
        "service.learn_more": "Conocer más",
        roomTitles: [
            "Con JT Foxx — emprendedor global y líder de masterminds",
            "Con JT Foxx y el empresario multimillonario John Catsimatis en Nueva York",
            "Con Tim Gannon y JT Foxx",
            "Con Reggie Batts — colaboración en consultoría y eventos",
            "Con Joe Foster, cofundador de Reebok",
            "Junto a Tom Brady en Melbourne",
            "Con Francie en eventos de alto nivel para multimillonarios, emprendedores y dueños de negocio"
        ],
        roomStories: [
            `<p>JT Foxx es uno de los emprendedores globales y líderes de masterminds más reconocidos — construye plataformas donde dueños serios se conectan, levantan capital y escalan a siete y ocho cifras.</p><p>Trabajamos en las mismas salas de alto nivel y seguimos colaborando. Su posicionamiento, red y ejecución marcan el estándar de lo que es el emprendimiento serio — y ese estándar moldea cómo apoyo a dueños de negocios de servicios ambiciosos.</p><p>Hay más trabajo conjunto por delante.</p>`,
            `<p>John Catsimatis es un multimillonario hecho a sí mismo que ha construido y escalado múltiples empresas significativas, creando riqueza y valor a largo plazo con ejecución disciplinada y visión estratégica.</p><p>Junto a él, su esposa ha sido parte integral de ese camino. Representan el éxito empresarial sostenido al más alto nivel — en salas que también incluyen a líderes como JT Foxx.</p><p>Estar en esa sala dio proximidad directa a la mentalidad de quienes entregan resultados excepcionales durante décadas.</p>`,
            `<p>Tim Gannon es cofundador de Outback Steakhouse, una de las cadenas de restaurantes casuales más icónicas del mundo. Escalaron el concepto de un restaurante a un imperio global.</p><p>Estar en la sala con Tim Gannon junto a JT Foxx ofreció acceso directo a la mentalidad y estrategias detrás de negocios de servicios escalables y durables.</p>`,
            `<p>Reggie Batts es un colaborador de alto nivel con quien trabajo como par en consultoría y eventos.</p><p>Apoyo a Reggie con consultoría y trabajo de eventos — y ha sido abiertamente agradecido por esa contribución. Operamos como iguales: creando salas, valor y resultados reales para personas serias en los negocios.</p><p>Ese tipo de colaboración entre pares es el estándar que llevo a cada engagement.</p>`,
            `<p>Joe Foster cofundó Reebok y la escaló desde una pequeña empresa británica hasta una de las marcas deportivas líderes a nivel mundial.</p><p>La marca alcanzó miles de millones en ingresos y fue adquirida en una transacción multimillonaria.</p><p>Sentarse con quien ayudó a construir ese éxito comercial global da una perspectiva rara sobre negocios de gran escala.</p>`,
            `<p>Tom Brady es el quarterback más condecorado en la historia de la NFL, con 7 Super Bowls.</p><p>Más allá del deporte, construyó un imperio de marca y negocios de cientos de millones de dólares.</p><p>La cercanía a alguien que entrega resultados de clase mundial durante décadas ofrece una visión poderosa del alto rendimiento sostenido.</p>`,
            `<p>Francie es una conectora y estratega clave que cura eventos de alto calibre con multimillonarios, emprendedores y dueños ambiciosos.</p><p>Colaboramos en múltiples eventos de lead generation, deal flow y marketing estratégico.</p><p>Estos entornos dan una visión directa de cómo crear valor real en los niveles más altos del negocio.</p>`
        ],
        readStory: "Leer historia →",
        moreMoments: "Más momentos de salas de alto nivel disponibles a solicitud.",
        "inroom.more": "Más momentos de salas de alto nivel disponibles a solicitud.",
        "cta.book": "Agenda tu llamada gratuita de 30 minutos",
        "cta.message": "Envíame un mensaje",
        "cta.final.title": "¿Listo para preparar su negocio para la salida?",
        "cta.final.subtitle": "Tengamos una breve llamada estratégica. Revisaré su situación actual y le mostraré las mayores oportunidades para aumentar el valor y reducir el riesgo de salida.",
        "cta.final.book": "Reserva tu Llamada Estratégica",
        "cta.final.note": "Cupos limitados. Solo consultas serias.",
        "about.label": "MI HISTORIA",
        "about.title": "14 años operando al nivel donde la excelencia es ineludible.",
        "about.p1": "Mi carrera me ha llevado de hoteles de alto volumen en la Costa de Oro a servicios de instalaciones multi-sitio en Victoria regional — liderando equipos de ventas, compras y operaciones que consistentemente entregaron los mejores resultados en sus negocios.",
        "about.p2": "En el camino, he tenido el privilegio de pasar tiempo con fundadores y operadores que han construido empresas significativas. Estas experiencias han moldeado cómo pienso sobre escalar, liderazgo y lo que realmente se necesita para construir organizaciones que funcionan a alto nivel.",
        "about.p3": "Hoy trabajo con un pequeño número de líderes ambiciosos de negocios de servicios que quieren ayuda práctica y directa para construir los sistemas, equipos y experiencias de cliente que coinciden con el nivel de su ambición — ya sea a través de transformaciones completas, revisiones operativas o orientación estratégica continua como socio fraccional.",
        "about.languages_label": "Idiomas",
        "about.languages": "Checo (nativo)<br>Español (fluido)<br>Inglés (fluido)<br>Francés (conversacional)",
        "about.education_label": "Educación",
        "about.education": "Maestría en Contabilidad y Negocios<br>Licenciatura en Gestión Hotelera",
        "about.systems_label": "Sistemas",
        "about.systems": "Zoho CRM, Salesforce, HubSpot<br>Jiwa ERP, Xero, Microsoft 365 + Copilot<br>Asana, Power BI, Zapier, Lucidchart",
        "about.approach_label": "Enfoque",
        "about.approach": "Práctico. Informado por datos.<br>Centrado en las personas.<br>Sin rodeos.",
        "about.linkedin": "Conectar en LinkedIn",
        "engagements.label": "COMPROMISOS",
        "engagements.title": "Un proceso claro y colaborativo desde el primer día.",
        "engagements.desc": "Sin marcos genéricos. Cada compromiso comienza con escucha profunda y termina con sistemas sostenibles que realmente usa.",
        "engagements.step1_title": "Llamada de Descubrimiento",
        "engagements.step1_desc": "Conversación gratuita de 30 minutos para entender sus mayores desafíos, metas y restricciones. Sin intentar venderle nada — solo claridad.",
        "engagements.step2_title": "Diagnóstico y Hoja de Ruta",
        "engagements.step2_desc": "Realizo entrevistas, reviso datos y procesos, luego entrego una hoja de ruta priorizada con proyecciones claras de retorno de inversión.",
        "engagements.step3_title": "Asociación de Implementación",
        "engagements.step3_desc": "Trabajamos juntos (o lidero) para construir e integrar los sistemas. Incluye reuniones semanales, talleres prácticos y entrenamiento del equipo.",
        "engagements.step4_title": "Medir y Mantener",
        "engagements.step4_desc": "Revisión a los 90 días, tableros de KPIs y paquete de traspaso para que su equipo sea dueño de las mejoras a largo plazo. Retainer opcional disponible.",
        "feedback.label": "OPINIONES REALES",
        "feedback.title": "Lo que dicen los líderes sobre trabajar juntos",
        "insights.label": "LIDERAZGO DE PENSAMIENTO",
        "insights.title": "Últimas perspectivas",
        "insights.see_all": "Ver todas las perspectivas →",
        "insights.cat.operations": "OPERACIONES",
        "insights.cat.cx": "EXPERIENCIA DEL CLIENTE",
        "insights.cat.leadership": "LIDERAZGO",
        "exit.premium": "OFERTA PRINCIPAL",
        "exit.title": "Auditoría de Operaciones Preparadas para la Salida + Plan de 90 Días",
        "exit.subtitle": "Ayudo a propietarios ambiciosos de pequeños y medianos negocios de servicios a construir operaciones que escalan, operan al más alto nivel y están completamente preparadas para una salida o un crecimiento comercial significativo.",
        "exit.strong": "Evite los errores operativos comunes que destruyen entre el 30% y el 50% del valor del negocio en la salida.",
        "exit.program_label": "EL PROGRAMA",
        "exit.program_title": "La Auditoría + Plan de 90 Días para hacer su negocio independiente",
        "exit.program_desc": "Mi compromiso principal. Un programa enfocado y práctico que le brinda claridad e impulso rápido.",
        "exit.program.item1": "Auditoría completa de operaciones enfocada en la salida y el valor comercial",
        "exit.program.item2": "Identificación de los mayores riesgos y oportunidades de valoración",
        "exit.program.item3": "Plan de Ejecución personalizado de 90 días con prioridades claras y responsabilidad",
        "exit.program.item4": "Orientación práctica para implementar las correcciones de mayor impacto",
        "exit.how_label": "EL PROCESO",
        "exit.how_title": "Cómo Funciona",
        "exit.how.step1_title": "Llamada de Descubrimiento",
        "exit.how.step1_desc": "Entender su negocio y objetivos",
        "exit.how.step2_title": "Auditoría Profunda de Operaciones",
        "exit.how.step2_desc": "Revisar sistemas, procesos, CX, estructura de equipo y dependencia del propietario",
        "exit.how.step3_title": "Análisis de Brechas para la Salida",
        "exit.how.step3_desc": "Informe claro sobre riesgos y oportunidades",
        "exit.how.step4_title": "Plan de Preparación de 90 Días",
        "exit.how.step4_desc": "Hoja de ruta priorizada y accionable",
        "exit.how.step5_title": "Soporte de Implementación",
        "exit.how.step5_desc": "Reuniones regulares y orientación (extensión opcional)",
        "exit.expect_label": "QUÉ PUEDE ESPERAR",
        "exit.expect_title": "Qué Puede Esperar",
        "exit.expect.item1": "Un negocio que funciona con más fuerza hoy",
        "exit.expect.item2": "Significativamente mayor confianza del comprador y valoración",
        "exit.expect.item3": "Reducción de la dependencia del propietario",
        "exit.expect.item4": "Sistemas y datos más limpios para la debida diligencia",
        "exit.expect.item5": "Mejoras prácticas que puede implementar de inmediato",
        "exit.for_you_label": "ESTO ES PARA USTED SI",
        "exit.for_you_title": "Esto Es Para Usted Si",
        "exit.for_you.item1": "Es dueño de un negocio de servicios, instalaciones, limpieza, lavandería u hospitalidad",
        "exit.for_you.item2": "Está considerando una salida en los próximos 6 a 36 meses (o quiere tener la opción)",
        "exit.for_you.item3": "Está dispuesto a hacer el trabajo real que se requiere",
        "exit.for_you.item4": "Valora la ejecución práctica por encima de la teoría",
        "exit.investment_label": "INVERSIÓN",
        "exit.investment_title": "Inversión",
        "exit.investment_desc1": "Las tarifas del proyecto suelen oscilar entre USD 8.000 y USD 25.000 o más, según el tamaño y alcance del negocio.",
        "exit.investment_desc2": "El mejor siguiente paso es una breve Llamada Estratégica (sin costo).",
        "exit.investment_cta": "Reserva su Llamada Estratégica Ahora →",
        "exit.investment_note": "Capacidad limitada. Solo consultas serias.",
        "guarantee.label": "GARANTÍA",
        "guarantee.title": "Garantía de devolución del 100%",
        "guarantee.short_title": "Garantía de devolución del 100%",
        "guarantee.short": "Si no entrego el trabajo acordado — y usted cumple su parte — recibe el reembolso completo. Condiciones completas en la página del programa.",
        "guarantee.promise": "Si no entrego lo acordado en el alcance de su engagement, recibe el reembolso completo de los honorarios pagados por ese engagement.",
        "guarantee.item1": "<strong class=\"text-white\">Qué cubre:</strong> los entregables acordados — auditoría, plan, sesiones y documentación definidos por escrito.",
        "guarantee.item2": "<strong class=\"text-white\">Su parte:</strong> brindar acceso, información precisa, decisiones a tiempo y completar las acciones acordadas de su lado.",
        "guarantee.item3": "<strong class=\"text-white\">Qué no cubre:</strong> precio de venta, múltiplos de valoración, ingresos, interés de compradores, o resultados que dependan del mercado o de la ejecución de su equipo después de la entrega.",
        "guarantee.item4": "<strong class=\"text-white\">Cómo funciona:</strong> si los entregables no se cumplen y usted cumplió sus responsabilidades, solicite el reembolso por escrito dentro de los 14 días posteriores al fin del engagement. Reembolso total de los honorarios de ese engagement.",
        "guarantee.footer": "Regla simple: yo entrego lo que dijimos. Usted hace lo que dijimos. Si yo no cumplo, usted recupera su dinero.",
        "exit.reality_label": "LA REALIDAD",
        "exit.reality_title": "La mayoría de los negocios de servicios no son vendibles — o solo se venden con descuento.",
        "exit.framework_label": "EL MARCO PREPARADO PARA LA SALIDA",
        "exit.framework_title": "Seis pilares que convierten las operaciones en un activo valioso.",
        "exit.pillar1.title": "1. Sistemas Transferibles",
        "exit.pillar1.desc": "Biblioteca completa y viva de procedimientos operativos estándar (POE) y gestión del conocimiento, para que el negocio no dependa del conocimiento informal ni de una sola persona.",
        "exit.pillar2.title": "2. Profundidad de Liderazgo",
        "exit.pillar2.desc": "Identificación de sucesores, planes de desarrollo y marcos de delegación para que el negocio funcione con el mismo estándar cuando usted no esté presente.",
        "exit.pillar3.title": "3. CX Consistente a Escala",
        "exit.pillar3.desc": "Experiencia del cliente estandarizada que entrega la misma calidad en cada sede, turno y miembro del equipo — la base del valor de marca.",
        "exit.pillar4.title": "4. Índice de Independencia del Propietario",
        "exit.pillar4.desc": "Medición clara de cuánto depende el negocio de usted personalmente, con una hoja de ruta para reducirlo drásticamente.",
        "exit.pillar5.title": "5. Higiene Financiera y Operativa",
        "exit.pillar5.desc": "Reportes limpios, procesos documentados y controles que generan confianza en compradores y sucesores respecto a los números y las operaciones.",
        "exit.pillar6.title": "6. Manual de Transición",
        "exit.pillar6.desc": "Un plan estructurado para la entrega real — ya sea una venta completa, sucesión familiar o retiro gradual a lo largo de varios años."
    },
    fr: {
        // French business language – ton professionnel et direct
        "nav.services": "Services",
        "nav.results": "Résultats",
        "nav.in_the_room": "Dans la Salle",
        "nav.about": "À Propos",
        "nav.how_i_work": "Comment Je Travaille",
        "nav.insights": "Perspectives",
        "nav.contact": "Contact",
        "nav.book_call": "Consultation — $297",

        "hero.location": "GEELONG, AUSTRALIE",
        "hero.title": "Opérations Prêtes pour la Sortie &amp; Croissance Commerciale",
        "hero.subtitle": "J'aide les propriétaires ambitieux d'entreprises de services à bâtir des opérations qui s'échelonnent, performent au plus haut niveau et sont pleinement préparées pour une sortie ou une croissance majeure — sans dépendre de vous.",
        "hero.cta_book": "Consultation stratégique — $297",
        "hero.cta_rooms": "Voir les salles où j'ai été",
        "hero.point1": "Des opérations qui tournent sans le propriétaire",
        "hero.point2": "Des systèmes que les acheteurs respectent en due diligence",
        "hero.point3": "Des vérités dures, une exécution claire en 90 jours",
        "hero.portrait_sub": "Opérations prêtes pour la sortie · Entreprises de services",
        "hero.strip_link": "JT Foxx · Tim Gannon · Joe Foster · plus",
        "hero.trust": "Geelong, Australie • Travail avec des dirigeants d'entreprises de services à travers l'Australie",

        "inroom.label": "DANS LA SALLE",
        "inroom.title": "Dans la Salle avec des Opérateurs Exceptionnels",
        "inroom.desc": "J’ai eu le privilège de travailler aux côtés et d’apprendre de certains des esprits les plus aiguisés en affaires et en performance. Ces expériences façonnent la façon dont j’aide les propriétaires d’entreprises de services à devenir véritablement prêts pour la sortie.",

        "services.label": "COMMENT J'AIDE",
        "services.title": "Trois engagements. Un résultat : une entreprise qui tourne sans vous.",
        "services.desc": "Pas de menu de capacités. Des prochaines étapes claires pour les propriétaires qui veulent des opérations prêtes pour la sortie.",
        "services.entry": "Point d'entrée : consultation stratégique payante — 297 $ AUD (créditée si nous avançons).",

        "results.label": "RÉSULTATS CLIENTS",
        "results.title": "Ce que les propriétaires obtiennent",
        "results.outcome1": "Des systèmes nettement plus clairs qui réduisent drastiquement la dépendance au propriétaire",
        "results.outcome2": "Confiance significativement accrue des acheteurs et due diligence plus fluide",
        "results.outcome3": "Performance commerciale renforcée tout en préparant l'entreprise à la sortie",
        "results.outcome4": "Éliminer les problèmes opérationnels qui détruisent couramment 30 à 50 % de la valeur à la sortie",

        "service1.badge": "Offre phare",
        "service1.meta": "Engagement · Audit + plan 90 jours",
        "service1.title": "Audit Exit-Ready + Plan 90 Jours",
        "service1.desc": "Identifiez les écarts opérationnels qui détruisent la valeur à la sortie. Obtenez un plan priorisé de 90 jours pour que l'entreprise tourne — et se vende — sans vous.",
        "service2.meta": "Engagement · Mise en œuvre",
        "service2.title": "Operations Build",
        "service2.desc": "Exécutez le plan : POS, systèmes CX, rythme commercial/CRM et habilitation du leadership — cadré pour que l'entreprise fonctionne sans le propriétaire.",
        "service3.meta": "Retainer mensuel",
        "service3.title": "Leadership Fractionnel CX & Opérations",
        "service3.desc": "Soutien senior intégré pour piloter la performance et renforcer l'indépendance — jusqu'à ce que les systèmes tiennent sans vous.",
        "exitready.label": "OFFRE PHARE",
        "exitready.title": "Audit + Plan sur 90 Jours pour rendre votre entreprise indépendante",
        "exitready.flagship": "Mon offre phare.",
        "exitready.desc": "J'aide les propriétaires à combler l'écart entre les opérations quotidiennes et une entreprise réellement transférable et vendable.",
        "exitready.benefit1": "Éliminez les problèmes qui détruisent 30 à 50 % de la valeur à la sortie",
        "exitready.benefit2": "Construisez des systèmes qui permettent à l'entreprise de fonctionner et d'être vendue sans vous",
        "exitready.benefit3": "Obtenez un plan clair sur 90 jours qui améliore matériellement la confiance des acheteurs et la valorisation",
        "exitready.cta": "En savoir plus sur le Programme Opérations Prêtes pour la Sortie",
        "modal.deliverables": "LIVRABLES TYPIQUES",
        "modal.who_for": "POUR QUI EST-CE",
        "modal.engagement": "DURÉE DE L'ENGAGEMENT",
        "modal.discuss": "Discuter de ce service →",
        "modal.book_call": "Réserver un appel",
        "booking.title": "Réserver un Appel Stratégique",
        "booking.subtitle": "30 minutes · 297 $ AUD · Crédité si nous avançons",
        "service.learn_more": "En savoir plus",
        roomTitles: [
            "Avec JT Foxx — entrepreneur mondial et leader de masterminds",
            "Avec JT Foxx et l'entrepreneur milliardaire John Catsimatis à New York",
            "Avec Tim Gannon et JT Foxx",
            "Avec Reggie Batts — collaboration conseil et événements",
            "Avec Joe Foster, cofondateur de Reebok",
            "Aux côtés de Tom Brady à Melbourne",
            "Avec Francie lors d'événements de haut niveau pour milliardaires, entrepreneurs et dirigeants"
        ],
        roomStories: [
            `<p>JT Foxx est l'un des entrepreneurs mondiaux et leaders de masterminds les plus reconnus — il construit des plateformes où des propriétaires sérieux se connectent, lèvent des capitaux et passent à sept et huit chiffres.</p><p>Nous travaillons dans les mêmes salles de haut niveau et continuons de collaborer. Son positionnement, son réseau et son exécution fixent le standard de l'entrepreneuriat sérieux — et ce standard façonne la façon dont j'accompagne les propriétaires de services ambitieux.</p><p>D'autres collaborations sont à venir.</p>`,
            `<p>John Catsimatis est un milliardaire autodidacte qui a construit et développé de multiples entreprises significatives, créant richesse et valeur à long terme par une exécution disciplinée et une vision stratégique.</p><p>À ses côtés, son épouse a fait partie intégrante de ce parcours. Ensemble, ils incarnent le succès durable au plus haut niveau — dans des salles où figurent aussi des leaders comme JT Foxx.</p><p>Être dans cette salle a donné une proximité directe avec la mentalité de ceux qui livrent des résultats exceptionnels sur des décennies.</p>`,
            `<p>Tim Gannon est le cofondateur d'Outback Steakhouse, l'une des chaînes casual les plus iconiques au monde. Il a aidé à passer d'un restaurant à un empire mondial.</p><p>Être dans la salle avec Tim Gannon aux côtés de JT Foxx a offert un accès direct aux stratégies derrière des entreprises de services scalables et durables.</p>`,
            `<p>Reggie Batts est un collaborateur de haut niveau avec qui je travaille en pair sur le conseil et les événements.</p><p>Je soutiens Reggie en conseil et sur les événements — et il a exprimé sa reconnaissance pour cette contribution. Nous opérons en égaux : créer des salles, de la valeur et des résultats concrets pour des acteurs sérieux.</p><p>Ce type de collaboration entre pairs est le standard que j'apporte à chaque engagement.</p>`,
            `<p>Joe Foster a cofondé Reebok et l'a développée d'une petite entreprise britannique en l'une des principales marques sportives mondiales.</p><p>La marque a atteint des milliards de revenus et a été acquise dans une transaction multimilliardaire.</p><p>S'asseoir avec l'homme qui a aidé à construire ce succès commercial mondial offre une perspective rare sur les entreprises à grande échelle.</p>`,
            `<p>Tom Brady est le quarterback le plus décoré de l'histoire de la NFL, avec 7 Super Bowls.</p><p>Au-delà du sport, il a bâti un empire de marque et d'affaires de plusieurs centaines de millions de dollars.</p><p>La proximité d'une performance de classe mondiale sur deux décennies offre un aperçu puissant de la haute performance durable.</p>`,
            `<p>Francie est une connectrice et stratège clé qui organise des événements de haut calibre pour milliardaires, entrepreneurs et dirigeants ambitieux.</p><p>Nous collaborons sur plusieurs événements de lead generation, deal flow et marketing stratégique.</p><p>Ces environnements donnent une vision directe de la création de valeur réelle au plus haut niveau.</p>`
        ],
        readStory: "Lire l'histoire →",
        moreMoments: "D'autres moments de salles à haute autorité disponibles sur demande.",
        "inroom.more": "D'autres moments de salles à haute autorité disponibles sur demande.",
        "cta.book": "Réserver votre appel gratuit de 30 minutes",
        "cta.message": "Envoyez-moi un message",
        "cta.final.title": "Prêt à rendre votre entreprise prête pour la sortie ?",
        "cta.final.subtitle": "Faisons un court appel stratégique. Je passerai en revue votre situation actuelle et vous montrerai les plus grandes opportunités pour augmenter la valeur et réduire les risques de sortie.",
        "cta.final.book": "Réservez votre Appel Stratégique",
        "cta.final.note": "Places limitées. Uniquement pour les demandes sérieuses.",
        "about.label": "MON HISTOIRE",
        "about.title": "14 ans à opérer au niveau où l'excellence est non négociable.",
        "about.p1": "Ma carrière m'a amené des hôtels à haut volume sur la Gold Coast aux services d'installations multi-sites en Victoria régionale — dirigeant des équipes de ventes, d'achats et d'opérations qui ont constamment livré les meilleurs résultats dans leurs entreprises.",
        "about.p2": "En chemin, j'ai eu le privilège de passer du temps avec des fondateurs et opérateurs qui ont construit des entreprises significatives. Ces expériences ont façonné ma façon de penser l'échelle, le leadership et ce qu'il faut réellement pour construire des organisations qui performent à haut niveau.",
        "about.p3": "Aujourd'hui je travaille avec un petit nombre de leaders ambitieux d'entreprises de services qui veulent une aide pratique et sans fioritures pour construire les systèmes, équipes et expériences client qui correspondent au niveau de leur ambition — que ce soit à travers des transformations complètes, des refontes opérationnelles ou un accompagnement stratégique continu en tant que partenaire fractionnel.",
        "about.languages_label": "Langues",
        "about.languages": "Tchèque (natif)<br>Espagnol (courant)<br>Anglais (courant)<br>Français (conversationnel)",
        "about.education_label": "Formation",
        "about.education": "Master en Comptabilité et Affaires<br>Licence en Gestion Hôtelière",
        "about.systems_label": "Systèmes",
        "about.systems": "Zoho CRM, Salesforce, HubSpot<br>Jiwa ERP, Xero, Microsoft 365 + Copilot<br>Asana, Power BI, Zapier, Lucidchart",
        "about.approach_label": "Approche",
        "about.approach": "Pratique. Basé sur les données.<br>Centré sur l'humain.<br>Sans fioritures.",
        "about.linkedin": "Se connecter sur LinkedIn",
        "engagements.label": "ENGAGEMENTS",
        "engagements.title": "Un processus clair et collaboratif dès le premier jour.",
        "engagements.desc": "Pas de cadres passe-partout. Chaque engagement commence par une écoute profonde et se termine par des systèmes durables que vous utilisez réellement.",
        "engagements.step1_title": "Appel de Découverte",
        "engagements.step1_desc": "Conversation gratuite de 30 minutes pour comprendre vos plus grands défis, objectifs et contraintes. Sans discours commercial — juste de la clarté.",
        "engagements.step2_title": "Diagnostic & Feuille de Route",
        "engagements.step2_desc": "Je mène des entretiens, examine les données et processus, puis livre une feuille de route priorisée avec des projections claires de ROI.",
        "engagements.step3_title": "Partenariat d'Implémentation",
        "engagements.step3_desc": "Nous travaillons ensemble (ou je dirige) pour construire et intégrer les systèmes. Inclus : réunions hebdomadaires, ateliers pratiques et formation d'équipe.",
        "engagements.step4_title": "Mesurer & Pérenniser",
        "engagements.step4_desc": "Revue à 90 jours, tableaux de bord KPI et package de transfert pour que votre équipe possède les améliorations à long terme. Retainer optionnel disponible.",
        "feedback.label": "AVIS RÉELS",
        "feedback.title": "Ce que disent les leaders sur le travail ensemble",
        "insights.label": "LEADERSHIP DE PENSÉE",
        "insights.title": "Dernières perspectives",
        "insights.see_all": "Voir toutes les perspectives →",
        "insights.cat.operations": "OPÉRATIONS",
        "insights.cat.cx": "EXPÉRIENCE CLIENT",
        "insights.cat.leadership": "LEADERSHIP",
        "exit.premium": "OFFRE PHARE",
        "exit.title": "Audit Opérations Prêtes pour la Sortie + Plan sur 90 Jours",
        "exit.subtitle": "J'aide les propriétaires ambitieux de petites et moyennes entreprises de services à construire des opérations qui s'échelonnent, performent au plus haut niveau et sont pleinement préparées pour une sortie ou une croissance commerciale significative.",
        "exit.strong": "Évitez les erreurs opérationnelles courantes qui détruisent 30 à 50 % de la valeur de l'entreprise à la sortie.",
        "exit.program_label": "LE PROGRAMME",
        "exit.program_title": "L'Audit + Plan sur 90 Jours pour rendre votre entreprise indépendante",
        "exit.program_desc": "Mon engagement phare. Un programme ciblé et pratique qui vous apporte clarté et élan rapidement.",
        "exit.program.item1": "Audit complet des opérations axé sur la sortie et la valeur commerciale",
        "exit.program.item2": "Identification des plus grands risques et opportunités de valorisation",
        "exit.program.item3": "Plan d'exécution personnalisé sur 90 jours avec priorités claires et responsabilité",
        "exit.program.item4": "Accompagnement pratique pour mettre en œuvre les corrections à plus fort impact",
        "exit.how_label": "LE PROCESSUS",
        "exit.how_title": "Comment Ça Marche",
        "exit.how.step1_title": "Appel de Découverte",
        "exit.how.step1_desc": "Comprendre votre entreprise et vos objectifs",
        "exit.how.step2_title": "Audit Approfondi des Opérations",
        "exit.how.step2_desc": "Examiner les systèmes, processus, CX, structure d'équipe et dépendance au propriétaire",
        "exit.how.step3_title": "Analyse des Écarts pour la Sortie",
        "exit.how.step3_desc": "Rapport clair sur les risques et opportunités",
        "exit.how.step4_title": "Plan de Préparation sur 90 Jours",
        "exit.how.step4_desc": "Feuille de route priorisée et actionnable",
        "exit.how.step5_title": "Support d'Implémentation",
        "exit.how.step5_desc": "Réunions régulières et accompagnement (extension optionnelle)",
        "exit.expect_label": "CE QUE VOUS POUVEZ ATTENDRE",
        "exit.expect_title": "Ce Que Vous Pouvez Attendre",
        "exit.expect.item1": "Une entreprise qui fonctionne plus fortement aujourd'hui",
        "exit.expect.item2": "Une confiance et une valorisation significativement plus élevées des acheteurs",
        "exit.expect.item3": "Une dépendance réduite au propriétaire",
        "exit.expect.item4": "Des systèmes et des données plus propres pour la due diligence",
        "exit.expect.item5": "Des améliorations pratiques que vous pouvez mettre en œuvre immédiatement",
        "exit.for_you_label": "C'EST POUR VOUS SI",
        "exit.for_you_title": "C'est Pour Vous Si",
        "exit.for_you.item1": "Vous possédez une entreprise de services, d'installations, de nettoyage, de blanchisserie ou d'hospitalité",
        "exit.for_you.item2": "Vous envisagez une sortie dans les 6 à 36 prochains mois (ou vous voulez l'option)",
        "exit.for_you.item3": "Vous êtes prêt à faire le vrai travail nécessaire",
        "exit.for_you.item4": "Vous valorisez l'exécution pratique plutôt que la théorie",
        "exit.investment_label": "INVESTISSEMENT",
        "exit.investment_title": "Investissement",
        "exit.investment_desc1": "Les frais de projet varient généralement entre 8 000 $ et 25 000 $+ selon la taille et la portée de l'entreprise.",
        "exit.investment_desc2": "La meilleure prochaine étape est un court Appel Stratégique (sans frais).",
        "exit.investment_cta": "Réservez votre Appel Stratégique Maintenant →",
        "exit.investment_note": "Capacité limitée. Uniquement les demandes sérieuses.",
        "guarantee.label": "GARANTIE",
        "guarantee.title": "Garantie de remboursement à 100 %",
        "guarantee.short_title": "Garantie de remboursement à 100 %",
        "guarantee.short": "Si je ne livre pas le travail convenu — et que vous tenez votre part — vous êtes remboursé intégralement. Conditions complètes sur la page du programme.",
        "guarantee.promise": "Si je ne livre pas ce qui a été convenu dans le périmètre de votre engagement, vous obtenez le remboursement intégral des honoraires payés pour cet engagement.",
        "guarantee.item1": "<strong class=\"text-white\">Ce que cela couvre :</strong> les livrables convenus — audit, plan, sessions et documentation définis par écrit.",
        "guarantee.item2": "<strong class=\"text-white\">Votre part :</strong> fournir l'accès, des informations exactes, des décisions à temps, et accomplir les actions convenues de votre côté.",
        "guarantee.item3": "<strong class=\"text-white\">Ce que cela ne couvre pas :</strong> prix de vente, multiples de valorisation, revenus, intérêt des acheteurs, ou résultats dépendant du marché ou de l'exécution de votre équipe après la remise.",
        "guarantee.item4": "<strong class=\"text-white\">Comment ça marche :</strong> si les livrables ne sont pas tenus et que vous avez rempli vos responsabilités, demandez un remboursement par écrit dans les 14 jours suivant la fin de l'engagement. Remboursement intégral des honoraires de cet engagement.",
        "guarantee.footer": "Règle simple : je livre ce que nous avons dit. Vous faites ce que nous avons dit. Si je rate, vous récupérez votre argent.",
        "exit.reality_label": "LA RÉALITÉ",
        "exit.reality_title": "La majorité des entreprises de services ne sont pas vendables — ou ne se vendent qu'avec une décote.",
        "exit.framework_label": "LE CADRE PRÊT POUR LA SORTIE",
        "exit.framework_title": "Six piliers qui transforment les opérations en un actif de valeur.",
        "exit.pillar1.title": "1. Systèmes Transférables",
        "exit.pillar1.desc": "Bibliothèque complète et vivante de procédures opérationnelles standard (POS) et gestion des connaissances afin que l'entreprise ne repose pas sur un savoir informel ou une seule personne.",
        "exit.pillar2.title": "2. Profondeur de Leadership",
        "exit.pillar2.desc": "Identification des successeurs, plans de développement et cadres de délégation pour que l'entreprise fonctionne au même niveau lorsque vous n'êtes pas présent.",
        "exit.pillar3.title": "3. Expérience Client Consistante à Grande Échelle",
        "exit.pillar3.desc": "Expérience client standardisée qui délivre la même qualité sur chaque site, chaque quart et chaque membre de l'équipe — le fondement de la valeur de marque.",
        "exit.pillar4.title": "4. Score d'Indépendance du Propriétaire",
        "exit.pillar4.desc": "Mesure claire du degré de dépendance de l'entreprise à votre personne, avec une feuille de route pour la réduire drastiquement.",
        "exit.pillar5.title": "5. Hygiène Financière et Opérationnelle",
        "exit.pillar5.desc": "Rapports clairs, processus documentés et contrôles qui inspirent confiance aux acheteurs et successeurs sur les chiffres et les opérations.",
        "exit.pillar6.title": "6. Manuel de Transition",
        "exit.pillar6.desc": "Un plan structuré pour la passation effective — qu'il s'agisse d'une vente complète, d'une succession familiale ou d'un retrait progressif sur plusieurs années."
    },
    cz: {
        // Czech business language – profesionální a přímý tón
        "nav.services": "Služby",
        "nav.results": "Výsledky",
        "nav.in_the_room": "V místnosti",
        "nav.about": "O mně",
        "nav.how_i_work": "Jak pracuji",
        "nav.insights": "Poznatky",
        "nav.contact": "Kontakt",
        "nav.book_call": "Konzultace — $297",

        "hero.location": "GEELONG, AUSTRÁLIE",
        "hero.title": "Operace připravené k odchodu &amp; Komerční růst",
        "hero.subtitle": "Pomáhám ambiciózním vlastníkům servisních podniků budovat operace, které se škálují, dosahují nejvyšší úrovně a jsou plně připravené k odchodu nebo významnému komerčnímu růstu — bez závislosti na vás.",
        "hero.cta_book": "Strategická konzultace — $297",
        "hero.cta_rooms": "Podívejte se na místnosti, ve kterých jsem byl",
        "hero.point1": "Operace, které běží bez majitele",
        "hero.point2": "Systémy, kterým důvěřují kupující při due diligence",
        "hero.point3": "Tvrdé pravdy, jasná 90denní realizace",
        "hero.portrait_sub": "Operace připravené k odchodu · Servisní podniky",
        "hero.strip_link": "JT Foxx · Tim Gannon · Joe Foster · více",
        "hero.trust": "Geelong, Austrálie • Spolupráce s lídry servisních podniků po celé Austrálii",

        "inroom.label": "V MÍSTNOSTI",
        "inroom.title": "V místnosti s výjimečnými operátory",
        "inroom.desc": "Měl jsem tu čest pracovat po boku a učit se od některých z nejostřejších myslí v byznysu a výkonu. Tyto zkušenosti formují to, jak pomáhám majitelům servisních podniků stát se skutečně připravenými k odchodu.",

        "services.label": "JAK POMÁHÁM",
        "services.title": "Strategická podpora pro ambiciózní servisní podniky",
        "services.desc": "Přímá podpora bez zbytečností pro lídry, kteří chtějí budovat organizace, které skutečně škálují a dosahují vysoké výkonnosti.",

        "results.label": "VÝSLEDKY KLIENTŮ",
        "results.title": "Co dosahují majitelé",
        "results.outcome1": "Jasné systémy, které dramaticky snižují závislost na majiteli",
        "results.outcome2": "Výrazně vyšší důvěra kupujících a hladší due diligence",
        "results.outcome3": "Silnější komerční výkon při přípravě podniku k odchodu",
        "results.outcome4": "Odstranit provozní problémy, které běžně ničí 30–50 % hodnoty při odchodu",

        "service1.badge": "Hlavní nabídka",
        "service1.meta": "Engagement · Audit + 90denní plán",
        "service1.title": "Exit-Ready audit + 90denní plán",
        "service1.desc": "Najděte provozní mezery, které ničí hodnotu při odchodu. Odnesete si prioritizovaný 90denní plán, aby byznys běžel — a prodal se — bez vás.",
        "service2.meta": "Engagement · Implementace",
        "service2.title": "Operations Build",
        "service2.desc": "Proveďte plán: SOP, CX systémy, CRM/prodejní rytmus a rozvoj leadershipu — tak, aby byznys běžel bez majitele.",
        "service3.meta": "Měsíční retainer",
        "service3.title": "Frakční CX a operační leadership",
        "service3.desc": "Zabudovaná seniorská podpora pro výkon teď a budování nezávislosti — dokud systémy neudrží provoz bez vás.",
        "exitready.label": "PREMIÉROVÁ NABÍDKA",
        "exitready.title": "Audit + 90denní plán pro nezávislý podnik",
        "exitready.flagship": "Moje vlajková nabídka.",
        "exitready.desc": "Pomáhám majitelům uzavřít propast mezi každodenními operacemi a podnikem, který se skutečně dá převést a prodat.",
        "exitready.benefit1": "Odstraňte problémy, které ničí 30–50 % hodnoty při odchodu",
        "exitready.benefit2": "Vybudujte systémy, díky kterým bude podnik fungovat a prodávat se bez vás",
        "exitready.benefit3": "Získejte jasný 90denní plán, který materiálně zvyšuje důvěru kupujících a valuaci",
        "exitready.cta": "Zjistěte více o programu operací připravených k odchodu",
        "exit.premium": "PREMIÉROVÁ NABÍDKA",
        "exit.title": "Audit Operací Připravených k Odchodu + 90denní Plán",
        "exit.subtitle": "Pomáhám ambiciózním vlastníkům malých a středních servisních podniků budovat operace, které se škálují, dosahují nejvyšší úrovně a jsou plně připravené k odchodu nebo významnému komerčnímu růstu.",
        "exit.strong": "Vyhněte se běžným operačním chybám, které ničí 30–50 % hodnoty podniku při odchodu.",
        "exit.program_label": "PROGRAM",
        "exit.program_title": "Audit + 90denní plán pro nezávislý podnik",
        "exit.program_desc": "Můj vlajkový závazek. Cílený a praktický program, který vám rychle přinese jasnost a hybnou sílu.",
        "exit.program.item1": "Kompletní audit operací zaměřený na odchod a komerční hodnotu",
        "exit.program.item2": "Identifikace největších rizik a příležitostí pro valuaci",
        "exit.program.item3": "Vlastní 90denní realizační plán s jasnými prioritami a odpovědností",
        "exit.program.item4": "Praktické vedení k implementaci nejdůležitějších oprav",
        "exit.how_label": "PROCES",
        "exit.how_title": "Jak To Funguje",
        "exit.how.step1_title": "Objevovací Hovor",
        "exit.how.step1_desc": "Porozumět vašemu podnikání a cílům",
        "exit.how.step2_title": "Hluboký Audit Operací",
        "exit.how.step2_desc": "Zkontrolovat systémy, procesy, CX, strukturu týmu a závislost na majiteli",
        "exit.how.step3_title": "Analýza mezer připravenosti k odchodu",
        "exit.how.step3_desc": "Jasná zpráva o rizicích a příležitostech",
        "exit.how.step4_title": "90denní Plán Připravenosti",
        "exit.how.step4_desc": "Prioritizovaná, akční roadmapa",
        "exit.how.step5_title": "Podpora Implementace",
        "exit.how.step5_desc": "Pravidelné check-iny a vedení (volitelné prodloužení)",
        "exit.expect_label": "CO MŮŽETE OČEKÁVAT",
        "exit.expect_title": "Co Můžete Očekávat",
        "exit.expect.item1": "Podnik, který funguje silněji dnes",
        "exit.expect.item2": "Výrazně vyšší důvěra kupujících a ocenění",
        "exit.expect.item3": "Snížená závislost na majiteli",
        "exit.expect.item4": "Čistší systémy a data pro due diligence",
        "exit.expect.item5": "Praktická vylepšení, která můžete implementovat okamžitě",
        "exit.for_you_label": "TO JE PRO VÁS, POKUD",
        "exit.for_you_title": "To Je Pro Vás, Pokud",
        "exit.for_you.item1": "Vlastníte servisní/facility/úklid/prádelnu/pohostinství podnik",
        "exit.for_you.item2": "Zvažujete odchod v příštích 6–36 měsících (nebo chcete mít možnost)",
        "exit.for_you.item3": "Jste ochotni udělat skutečnou práci, která je potřeba",
        "exit.for_you.item4": "Oceňujete praktickou realizaci před teorií",
        "exit.investment_label": "INVESTICE",
        "exit.investment_title": "Investice",
        "exit.investment_desc1": "Poplatky za projekt se obvykle pohybují od 8 000 $ do 25 000 $+ v závislosti na velikosti a rozsahu podnikání.",
        "exit.investment_desc2": "Nejlepší další krok je krátký Strategický hovor (bez poplatku).",
        "exit.investment_cta": "Rezervujte si svůj Strategický hovor nyní →",
        "exit.investment_note": "Omezená kapacita. Pouze seriózní dotazy.",
        "guarantee.label": "ZÁRUKA",
        "guarantee.title": "100% peníze zpět",
        "guarantee.short_title": "100% peníze zpět",
        "guarantee.short": "Pokud nedodám dohodnutou práci — a vy splníte svou část — dostanete plnou refundaci. Kompletní podmínky na stránce programu.",
        "guarantee.promise": "Pokud nedodám to, co jsme dohodli v rozsahu spolupráce, dostanete plnou refundaci poplatků zaplacených za danou spolupráci.",
        "guarantee.item1": "<strong class=\"text-white\">Co to pokrývá:</strong> dohodnuté výstupy — audit, plán, sezení a dokumentaci stanovenou písemně.",
        "guarantee.item2": "<strong class=\"text-white\">Vaše část:</strong> poskytnout přístup, přesné informace, včasná rozhodnutí a splnit dohodnuté kroky na vaší straně.",
        "guarantee.item3": "<strong class=\"text-white\">Co to nepokrývá:</strong> prodejní cenu, valuaci, tržby, zájem kupujících ani výsledky závislé na trhu nebo na provedení vašeho týmu po předání.",
        "guarantee.item4": "<strong class=\"text-white\">Jak to funguje:</strong> pokud výstupy nejsou splněny a vy jste plnili své povinnosti, požádejte o refundaci písemně do 14 dnů od konce spolupráce. Plná refundace poplatků za danou spolupráci.",
        "guarantee.footer": "Jednoduché pravidlo: já dodám, co jsme řekli. Vy uděláte, co jsme řekli. Pokud selžu já, dostanete peníze zpět.",
        "modal.deliverables": "TYPICKÉ DODÁVKY",
        "modal.who_for": "PRO KOHO JE TO",
        "modal.engagement": "DÉLKA ZÁVAZKU",
        "modal.discuss": "Diskutovat o této službě →",
        "modal.book_call": "Rezervovat hovor",
        "booking.title": "Rezervovat Strategický Hovor",
        "booking.subtitle": "30 minut • Zdarma • Bez závazku",
        "service.learn_more": "Zjistit více",
        "cta.book": "Rezervovat váš bezplatný 30minutový hovor",
        "cta.message": "Pošlete mi zprávu",
        "cta.final.title": "Připraveni učinit váš podnik připravený k odchodu?",
        "cta.final.subtitle": "Domluvme si krátký strategický hovor. Proberu vaši aktuální situaci a ukážu vám největší příležitosti ke zvýšení hodnoty a snížení rizika odchodu.",
        "cta.final.book": "Rezervujte si svůj Strategický Hovor",
        "cta.final.note": "Omezený počet míst. Pouze vážné zájemce.",
        "about.label": "MŮJ PŘÍBĚH",
        "about.title": "14 let působení na úrovni, kde excelence není vyjednávatelná.",
        "about.p1": "Moje kariéra mě přivedla z hotelů s vysokým objemem na Gold Coast do multi-site facility services v regionální Victorii — vedoucí týmy prodeje, nákupu a operací, které konzistentně dodávaly nejlepší výsledky ve svých podnicích.",
        "about.p2": "Po cestě jsem měl privilegium strávit čas se zakladateli a operátory, kteří vybudovali významné podniky. Tyto zkušenosti formovaly můj pohled na škálování, vedení a to, co skutečně znamená budovat organizace, které fungují na vysoké úrovni.",
        "about.p3": "Dnes pracuji s malým počtem ambiciózních lídrů servisních podniků, kteří chtějí praktickou, bez zbytečností pomoc při budování systémů, týmů a zákaznických zkušeností, které odpovídají úrovni jejich ambicí — ať už prostřednictvím úplných transformací, operačních přepracování nebo průběžného strategického poradenství jako frakční partner.",
        "about.languages_label": "Jazyky",
        "about.languages": "Čeština (mateřský)<br>Španělština (plynně)<br>Angličtina (plynně)<br>Francouzština (konverzačně)",
        "about.education_label": "Vzdělání",
        "about.education": "Magistr v účetnictví a podnikání<br>Bakalář v hotelovém managementu",
        "about.systems_label": "Systémy",
        "about.systems": "Zoho CRM, Salesforce, HubSpot<br>Jiwa ERP, Xero, Microsoft 365 + Copilot<br>Asana, Power BI, Zapier, Lucidchart",
        "about.approach_label": "Přístup",
        "about.approach": "Praktický. Informovaný daty.<br>Zaměřený na lidi.<br>Bez zbytečností.",
        "about.linkedin": "Připojit se na LinkedIn",
        "engagements.label": "ZÁVAZKY",
        "engagements.title": "Jasný, kolaborativní proces od prvního dne.",
        "engagements.desc": "Žádné univerzální rámce. Každý závazek začíná hlubokým nasloucháním a končí udržitelnými systémy, které skutečně používáte.",
        "engagements.step1_title": "Objevný hovor",
        "engagements.step1_desc": "Bezplatný 30minutový rozhovor k pochopení vašich největších výzev, cílů a omezení. Bez prodejního projevu — jen jasnost.",
        "engagements.step2_title": "Diagnostika a Plán",
        "engagements.step2_desc": "Provádím rozhovory, kontroluji data a procesy, pak dodávám prioritizovaný plán s jasnými projekcemi ROI.",
        "engagements.step3_title": "Partnerství v Implementaci",
        "engagements.step3_desc": "Spolupracujeme (nebo vedu) na budování a začlenění systémů. Zahrnuje týdenní check-iny, praktické workshopy a školení týmu.",
        "engagements.step4_title": "Měřit a Udržet",
        "engagements.step4_desc": "90denní přehled, KPI dashboardy a předávací balíček, aby váš tým vlastnil zlepšení dlouhodobě. Volitelný retainer k dispozici.",
        "feedback.label": "REÁLNÁ ZPĚTNÁ VAZBA",
        "feedback.title": "Co říkají lídři o spolupráci",
        "insights.label": "MYŠLENKOVÉ VEDENÍ",
        "insights.title": "Nejnovější poznatky",
        "insights.see_all": "Zobrazit všechny poznatky →",
        "insights.cat.operations": "OPERACE",
        "insights.cat.cx": "ZÁKAZNICKÁ ZKUŠENOST",
        "insights.cat.leadership": "VEDENÍ",
        "nav.services": "Služby",
        "nav.results": "Výsledky",
        "nav.in_the_room": "V místnosti",
        "nav.about": "O mně",
        "nav.how_i_work": "Jak pracuji",
        "nav.insights": "Poznatky",
        "nav.contact": "Kontakt",
        "nav.book_call": "Konzultace — $297",
        "hero.location": "GEELONG, AUSTRÁLIE",
        "hero.title": "Operace Připravené k Odchodu &amp; Komerční Růst",
        "hero.subtitle": "Pomáhám ambiciózním vlastníkům servisních podniků budovat operace, které se škálují, dosahují nejvyšší úrovně a jsou plně připravené k odchodu nebo významnému růstu — bez závislosti na vás.",
        "hero.cta_book": "Strategická konzultace — $297",
        "hero.cta_rooms": "Podívejte se na místnosti, ve kterých jsem byl",
        "hero.point1": "Operace, které běží bez majitele",
        "hero.point2": "Systémy, kterým důvěřují kupující při due diligence",
        "hero.point3": "Tvrdé pravdy, jasná 90denní realizace",
        "hero.portrait_sub": "Operace připravené k odchodu · Servisní podniky",
        "hero.strip_link": "JT Foxx · Tim Gannon · Joe Foster · více",
        "hero.trust": "Geelong, Austrálie • Spolupráce s lídry servisních podniků po celé Austrálii",
        "inroom.label": "V MÍSTNOSTI",
        "inroom.title": "V místnosti s výjimečnými operátory",
        "inroom.desc": "Měl jsem tu čest pracovat po boku a učit se od některých z nejostřejších myslí v byznysu a výkonu. Tyto zkušenosti formují to, jak pomáhám majitelům servisních podniků stát se skutečně připravenými k odchodu.",
        "services.label": "JAK POMÁHÁM",
        "services.title": "Strategická podpora pro ambiciózní servisní podniky",
        "services.desc": "Vysokoleverážní podpora pro lídry, kteří chtějí budovat organizace, které konzistentně dodávají na vysoké úrovni.",
        "results.label": "VÝSLEDKY PŘIPRAVENÉ K ODCHODU",
        "results.title": "Typické výsledky pro klienty s operacemi připravenými k odchodu",
        "results.outcome1": "Jasné systémy, které snižují závislost na majiteli",
        "results.outcome2": "Vyšší důvěra kupujících během due diligence",
        "results.outcome3": "Silnější komerční výkon při přípravě na exit",
        "results.outcome4": "Vyhnutí se faktorům, které běžně snižují hodnotu podniku",
        "service1.badge": "Hlavní nabídka",
        "service1.meta": "Engagement · Audit + 90denní plán",
        "service1.title": "Exit-Ready audit + 90denní plán",
        "service1.desc": "Najděte provozní mezery, které ničí hodnotu při odchodu. Odnesete si prioritizovaný 90denní plán, aby byznys běžel — a prodal se — bez vás.",
        "service2.meta": "Engagement · Implementace",
        "service2.title": "Operations Build",
        "service2.desc": "Proveďte plán: SOP, CX systémy, CRM/prodejní rytmus a rozvoj leadershipu — tak, aby byznys běžel bez majitele.",
        "service3.meta": "Měsíční retainer",
        "service3.title": "Frakční CX a operační leadership",
        "service3.desc": "Zabudovaná seniorská podpora pro výkon teď a budování nezávislosti — dokud systémy neudrží provoz bez vás.",
        roomTitles: [
            "S JT Foxxem — globální podnikatel a leader mastermindů",
            "S JT Foxxem a miliardářem Johnem Catsimatisem v New Yorku",
            "S Timem Gannonem a JT Foxxem",
            "S Reggie Battsem — spolupráce na konzultacích a eventech",
            "S Joe Fosterem, spoluzakladatelem Reeboku",
            "Po boku Toma Bradyho v Melbourne",
            "S Francií na high-level eventech pro miliardáře, podnikatele a majitele firem"
        ],
        roomStories: [
            `<p>JT Foxx je jedním z nejuznávanějších globálních podnikatelů a leaderů mastermindů — buduje platformy, kde se seriózní majitelé firem propojují, získávají kapitál a škálují na sedm a osm číslic.</p><p>Pracujeme ve stejných high-level místnostech a pokračujeme ve spolupráci. Jeho pozice, síť a exekuce nastavují standard seriózního podnikání — a ten standard formuje, jak podporuji ambiciózní majitele servisních firem.</p><p>Další společná práce je před námi.</p>`,
            `<p>John Catsimatis je self-made miliardář, který vybudoval a rozšířil několik významných podniků a vytváří dlouhodobou hodnotu disciplinovanou exekucí a strategickou vizí.</p><p>Po jeho boku je manželka, integrální součást této cesty. Společně představují udržitelný úspěch na nejvyšší úrovni — v místnostech, kde jsou i lídři jako JT Foxx.</p><p>Být v této místnosti dalo přímou blízkost k myšlení lidí, kteří desetiletí dodávají výjimečné výsledky.</p>`,
            `<p>Tim Gannon je spoluzakladatelem Outback Steakhouse, jedné z nejikoničtějších casual dining sítí na světě. Pomohl rozšířit koncept z jedné restaurace na globální impérium.</p><p>Být v místnosti s Timem Gannonem po boku JT Foxxe nabídlo přímý přístup ke strategiím škálovatelných servisních podniků.</p>`,
            `<p>Reggie Batts je high-level spolupracovník, se kterým pracuji jako peer na konzultacích a eventech.</p><p>Podporuji Reggieho konzultacemi a eventovou prací — a on za to otevřeně vyjádřil vděčnost. Fungujeme jako rovní: tvoříme místnosti, hodnotu a reálné výsledky pro seriózní lidi v byznysu.</p><p>Tento typ peer spolupráce je standard, který přináším do každé spolupráce.</p>`,
            `<p>Joe Foster spoluzaložil Reebok a rozšířil ji z malé britské firmy na jednu z předních globálních atletických značek.</p><p>Značka dosáhla miliard v příjmech a byla získána v multi-miliardové transakci.</p><p>Sedět s mužem, který pomohl vybudovat takový globální komerční úspěch, dává vzácnou perspektivu na velké byznysy.</p>`,
            `<p>Tom Brady je nejoceňovanější quarterback v historii NFL se 7 Super Bowly.</p><p>Mimo sport vybudoval brand a byznys impérium v hodnotě stovek milionů dolarů.</p><p>Blízkost k někomu, kdo dvě desetiletí dodává výsledky světové třídy, dává silný vhled do udržitelného high performance.</p>`,
            `<p>Francie je klíčová connectorka a stratégyně, která vytváří high-caliber eventy pro miliardáře, podnikatele a ambiciózní majitele.</p><p>Spolupracujeme na více eventech zaměřených na lead generation, deal flow a strategický marketing.</p><p>Tato prostředí dávají přímý vhled do toho, jak tvořit reálnou hodnotu na nejvyšších úrovních byznysu.</p>`
        ],
        readStory: "Přečíst příběh →",
        moreMoments: "Další momenty z místností s vysokou autoritou k dispozici na vyžádání.",
        "exit.reality_label": "REALITA",
        "exit.reality_title": "Většina servisních podniků není prodejná — nebo se prodávají jen se slevou.",
        "exit.framework_label": "RÁMEC PŘIPRAVENÝ K ODCHODU",
        "exit.framework_title": "Šest pilířů, které promění operace ve cenné aktivum.",
        "exit.pillar1.title": "1. Přenositelné systémy",
        "exit.pillar1.desc": "Kompletní a živá knihovna standardních operačních postupů (SOP) a správa znalostí, aby podnik nezávisel na neformálních znalostech nebo jediné osobě.",
        "exit.pillar2.title": "2. Hloubka vedení",
        "exit.pillar2.desc": "Identifikace nástupců, plány rozvoje a rámce delegování, aby podnik fungoval na stejné úrovni i bez vaší přítomnosti.",
        "exit.pillar3.title": "3. Konzistentní zákaznická zkušenost v měřítku",
        "exit.pillar3.desc": "Standardizovaná zákaznická zkušenost, která poskytuje stejnou kvalitu na každém pracovišti, směně a u každého člena týmu — základ hodnoty značky.",
        "exit.pillar4.title": "4. Skóre nezávislosti majitele",
        "exit.pillar4.desc": "Jasné měření toho, jak moc podnik závisí na vás osobně, s plánem na dramatické snížení této závislosti.",
        "exit.pillar5.title": "5. Finanční a operační hygiena",
        "exit.pillar5.desc": "Čisté reporty, zdokumentované procesy a kontroly, které dávají kupujícím a nástupcům důvěru v čísla a operace.",
        "exit.pillar6.title": "6. Příručka přechodu",
        "exit.pillar6.desc": "Strukturovaný plán skutečného předání — ať už jde o úplný prodej, rodinnou sukcesi nebo postupné stažení během několika let."
    }
};

function switchLanguage(lang) {
    // Persist choice
    localStorage.setItem('preferredLang', lang);

    // Update all select elements
    document.querySelectorAll('#lang-select, #lang-select-mobile').forEach(sel => {
        sel.value = lang;
    });

    // === Existing In the Room specific updates (for backward compat) ===
    const titles = (translations[lang] && translations[lang].roomTitles) || [];
    const readText = (translations[lang] && translations[lang].readStory) || 'Read story →';
    const moreTextContent = (translations[lang] && translations[lang].moreMoments) || 'More moments from high-authority rooms available upon request.';

    // Only update explicit title nodes so order/images never desync from wrong p tags
    const cards = document.querySelectorAll('#in-the-room .group');
    cards.forEach((card, i) => {
        const p = card.querySelector('.room-card-title');
        if (p && titles[i]) p.textContent = titles[i];
        const span = card.querySelector('.room-card-read');
        if (span) span.textContent = readText;
    });

    const moreText = document.querySelector('#in-the-room .mt-6.text-center');
    if (moreText) moreText.textContent = moreTextContent;

    // === NEW: Full site translation using data-i18n ===
    const t = translations[lang] || translations.en;
    const defaultT = translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        let text = t[key];
        if (text === undefined) text = defaultT[key];
        if (text !== undefined) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.innerHTML = text;
            }
        }
    });

    // If modal is open, refresh the current story with new language
    const modal = document.getElementById('room-story-modal');
    if (modal && !modal.classList.contains('hidden') && typeof showRoomStory === 'function') {
        const currentIndex = window.currentRoomStoryIndex || 0;
        showRoomStory(currentIndex);
    }
}

// Initialize language on load
function initLanguage() {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    const selects = document.querySelectorAll('#lang-select, #lang-select-mobile');
    selects.forEach(sel => sel.value = savedLang);

    // Run immediately for instant response
    switchLanguage(savedLang);
}


// Re-init on DOM ready for lang
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
});

// Contact (real working address; kept functional while display name updated per user request)
const CONTACT_EMAIL = 'sarka@sarka-ops.com';

function openContactEmail(subject = '') {
    const href = subject 
        ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
        : `mailto:${CONTACT_EMAIL}`;
    window.location.href = href;
}

// ============================================
// IN THE ROOM STORIES (High-level reflections)
// ============================================

const roomStories = [
    {
        title: "With JT Foxx — global entrepreneur & mastermind leader",
        image: "assets/in-the-room-jt-foxx.jpg",
        story: `
            <p>JT Foxx is one of the most recognised global entrepreneurs and mastermind leaders of our time — building platforms that connect serious business owners, raise capital, and scale companies to seven and eight figures.</p>
            <p>We work in the same high-level rooms and continue to collaborate. His positioning, network, and execution set a standard for what serious entrepreneurship looks like — and that standard directly shapes how I support ambitious service business owners.</p>
            <p>More joint work is ahead.</p>
        `
    },
    {
        title: "With JT Foxx and billionaire entrepreneur John Catsimatis in New York",
        image: "assets/in-the-room-ny.jpg",
        story: `
            <p>John Catsimatis is a self-made billionaire who has built and scaled multiple significant enterprises across industries, creating substantial wealth and long-term value through disciplined execution and strategic vision.</p>
            <p>Alongside him stands his wife, who has been an integral part of that journey. Together they represent a powerful example of sustained business success at the highest level — in rooms that also include leaders like JT Foxx.</p>
            <p>Being in this room provided direct proximity to the mindset and track record of individuals who have repeatedly delivered exceptional, result-driven outcomes over decades.</p>
        `
    },
    {
        title: "With Tim Gannon and JT Foxx",
        image: "assets/in-the-room-tim-gannon.jpg",
        story: `
            <p>Tim Gannon is the co-founder of Outback Steakhouse, one of the most iconic and successful casual dining restaurant chains in the world. He helped scale the concept from a single restaurant into a global empire with hundreds of locations.</p>
            <p>Being in the room with Tim Gannon alongside JT Foxx offered direct access to the mindset and strategies behind building enduring, scalable service businesses that deliver exceptional results year after year.</p>
        `
    },
    {
        title: "With Reggie Batts — collaborating on consultancy & events",
        image: "assets/reggie-batts-v2.jpg",
        story: `
            <p>Reggie Batts is a high-level collaborator I work with as a peer on consultancy and events.</p>
            <p>I support Reggie with consultancy and event work — and he has been openly grateful for that contribution. We operate as equals: building rooms, creating value, and delivering real outcomes for serious people in business.</p>
            <p>That kind of peer collaboration is the standard I bring to every engagement.</p>
        `
    },
    {
        title: "With Joe Foster, Co-Founder of Reebok",
        image: "assets/in-the-room-joe-foster.jpg",
        story: `
            <p>Joe Foster co-founded Reebok and scaled it from a small British company into one of the world’s leading global athletic brands, competing directly with Nike and Adidas on an international stage.</p>
            <p>The brand reached billions in revenue, became a cultural icon, and was eventually acquired in a multi-billion-dollar transaction.</p>
            <p>Sitting with the man who helped build that level of global commercial success provides rare perspective on what it takes to create enduring, large-scale businesses.</p>
        `
    },
    {
        title: "Alongside Tom Brady in Melbourne",
        image: "assets/tom-brady.jpg",
        story: `
            <p>Tom Brady is the most decorated quarterback in NFL history, with a record 7 Super Bowl championships — the highest achievement in American team sports.</p>
            <p>Beyond athletics, he built a multi-hundred-million-dollar personal brand and business empire, including the TB12 wellness platform and strategic investments in major companies.</p>
            <p>Proximity to someone who has consistently delivered world-class results across two decades at the absolute highest level offers powerful insight into sustained high performance and brand building at scale.</p>
        `
    },
    {
        title: "With Francie at high-level events coordinating billionaires, entrepreneurs & business owners",
        image: "assets/francie-events-v2.jpg",
        story: `
            <p>Francie is a key connector and strategist who curates high-caliber events bringing together billionaires, entrepreneurs, and ambitious business owners.</p>
            <p>We collaborate on multiple events focused on lead generation, deal flow, and strategic marketing. My role involves coordinating the right rooms and ensuring participants walk away with meaningful opportunities and relationships.</p>
            <p>These environments have given me direct insight into what it takes to create real value at the highest levels of business and entrepreneurship.</p>
        `
    }
];

function showRoomStory(index) {
    const story = roomStories[index];
    if (!story) return;

    document.getElementById('room-story-image').src = story.image;
    document.getElementById('room-story-title').textContent = story.title;
    document.getElementById('room-story-text').innerHTML = story.story;

    const modal = document.getElementById('room-story-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    enableSwipeToClose(modal, closeRoomStoryModal);
}

function closeRoomStoryModal() {
    const modal = document.getElementById('room-story-modal');
    const sheet = modal.querySelector('.modal');
    if (sheet) sheet.style.transform = '';
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// ============================================
// SWIPE-TO-CLOSE FOR MOBILE BOTTOM SHEETS
// ============================================

function enableSwipeToClose(modal, closeFn) {
    const sheet = modal.querySelector('.modal');
    if (!sheet) return;

    // Prevent stacking duplicate listeners on repeated opens
    if (sheet.dataset.swipeEnabled === 'true') return;
    sheet.dataset.swipeEnabled = 'true';

    let startY = 0;
    let startTime = 0;
    let currentY = 0;
    let isDragging = false;

    const DRAG_THRESHOLD = 85;   // px to trigger close
    const VELOCITY_THRESHOLD = 0.45; // px/ms

    function onTouchStart(e) {
        // Only start drag if we're near the top of the scrollable content (or on the handle area)
        const scrollContainer = sheet.querySelector('.overflow-y-auto') || sheet;
        if (scrollContainer.scrollTop > 8) {
            // Allow normal scrolling inside content
            return;
        }
        startY = e.touches[0].clientY;
        startTime = Date.now();
        currentY = startY;
        isDragging = true;
        sheet.style.transition = 'none';
    }

    function onTouchMove(e) {
        if (!isDragging) return;
        currentY = e.touches[0].clientY;
        const delta = currentY - startY;
        if (delta > 0) {
            // Downward drag only — apply subtle resistance
            const resisted = delta * 0.55;
            sheet.style.transform = `translateY(${resisted}px)`;
            // Prevent background scroll while actively dragging the sheet
            e.preventDefault();
        }
    }

    function onTouchEnd() {
        if (!isDragging) return;
        isDragging = false;

        const delta = currentY - startY;
        const duration = Math.max(1, Date.now() - startTime);
        const velocity = delta / duration; // px per ms

        sheet.style.transition = 'transform 0.22s cubic-bezier(0.32, 0.72, 0, 1)';

        const shouldClose = delta > DRAG_THRESHOLD || (delta > 55 && velocity > VELOCITY_THRESHOLD);

        if (shouldClose) {
            // Animate offscreen then close
            sheet.style.transform = `translateY(${Math.max(delta, 120)}px)`;
            setTimeout(() => {
                sheet.style.transform = '';
                closeFn();
            }, 160);
        } else {
            // Snap back
            sheet.style.transform = 'translateY(0)';
            setTimeout(() => {
                sheet.style.transform = '';
            }, 220);
        }
    }

    // Attach to the sheet (the visible card)
    sheet.addEventListener('touchstart', onTouchStart, { passive: false });
    sheet.addEventListener('touchmove', onTouchMove, { passive: false });
    sheet.addEventListener('touchend', onTouchEnd, { passive: true });
    sheet.addEventListener('touchcancel', onTouchEnd, { passive: true });
}

// ============================================================
// FIX: Language support (placed at the END so it runs after
// all original functions are defined)
// ============================================================

// Re-apply the language-aware showRoomStory override now that
// the original function exists.
(function() {
    const originalShow = window.showRoomStory;

    window.showRoomStory = function(index) {
        window.currentRoomStoryIndex = index;
        const lang = localStorage.getItem('preferredLang') || 'en';
        const storyData = roomStories[index];
        if (!storyData) return;

        const titleEl = document.getElementById('room-story-title');
        const imgEl = document.getElementById('room-story-image');
        const textEl = document.getElementById('room-story-text');

        if (titleEl) {
            const titles = translations[lang] && translations[lang].roomTitles;
            if (lang !== 'en' && titles && titles[index]) {
                titleEl.textContent = titles[index];
            } else {
                titleEl.textContent = storyData.title;
            }
        }

        if (imgEl) imgEl.src = storyData.image;

        if (textEl) {
            const stories = translations[lang] && translations[lang].roomStories;
            if (lang !== 'en' && stories && stories[index]) {
                textEl.innerHTML = stories[index];
            } else {
                textEl.innerHTML = storyData.story;
            }
        }

        const modal = document.getElementById('room-story-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';

        enableSwipeToClose(modal, closeRoomStoryModal);
    };
})();

// Initialize language immediately (script is loaded at end of body)
if (typeof initLanguage === 'function') {
    initLanguage();
}

// Safety for if script moves
document.addEventListener('DOMContentLoaded', function() {
    if (typeof initLanguage === 'function') {
        initLanguage();
    }
});

// Attach change listeners properly (run immediately since script is at end of body)
function attachLanguageListeners() {
    const desktop = document.getElementById('lang-select');
    const mobile = document.getElementById('lang-select-mobile');

    if (desktop && !desktop.dataset.listenerAttached) {
        desktop.dataset.listenerAttached = 'true';
        desktop.addEventListener('change', function() {
            switchLanguage(this.value);
        });
    }
    if (mobile && !mobile.dataset.listenerAttached) {
        mobile.dataset.listenerAttached = 'true';
        mobile.addEventListener('change', function() {
            switchLanguage(this.value);
        });
    }
}

attachLanguageListeners();

