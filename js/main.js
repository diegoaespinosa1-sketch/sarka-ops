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
        quote: "Sarka completely transformed how we handle client communications and follow-ups. The SOPs she built are now used by the entire sales team and we saw a 27% increase in repeat orders in 5 months.",
        name: "Michael Torres",
        role: "General Manager",
        company: "RapidClean Geelong"
    },
    {
        quote: "Working with Sarka on our Zoho CRM rollout was night and day compared to previous attempts. She didn’t just configure software — she redesigned our entire sales process. Best investment we’ve made in operations.",
        name: "Rebecca Lang",
        role: "Director of Operations",
        company: "DiMattina Group"
    },
    {
        quote: "Sarka’s ability to document complex processes into simple, usable SOPs is exceptional. Our new client onboarding time dropped from 9 days to under 3. She’s practical, sharp, and genuinely cares about outcomes.",
        name: "David Chen",
        role: "Head of Client Services",
        company: "Geelong Surfcoast Laundry"
    },
    {
        quote: "As a growing hospitality group we needed someone who understood both the front-of-house experience and back-end efficiency. Sarka delivered both. Her CX audit gave us a clear 18-month roadmap we still follow today.",
        name: "Sarah Patel",
        role: "Regional Operations Manager",
        company: "Mantra Hotels"
    }
];

function initTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    container.innerHTML = testimonials.map((t, index) => `
        <div class="testimonial bg-white border border-slate-200 rounded-3xl p-8 flex flex-col shadow-sm" data-index="${index}">
            <div class="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-teal-600/70 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p class="text-[15px] leading-relaxed text-slate-700">“${t.quote}”</p>
            </div>
            <div class="mt-8 pt-5 border-t flex items-center gap-x-3">
                <div class="w-9 h-9 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-500">${t.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                    <div class="font-semibold text-sm tracking-tight">${t.name}</div>
                    <div class="text-xs text-slate-500">${t.role}, ${t.company}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Service modal data
const servicesData = [
    {
        iconBg: 'bg-teal-100 text-teal-700',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 01-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2z" /></svg>`,
        title: "Customer Experience Strategy",
        longDesc: "Build CX systems that increase customer retention, reduce churn, and directly strengthen business valuation for exit or growth. We map the moments that matter and turn them into repeatable experiences that improve loyalty and commercial outcomes.",
        deliverables: [
            "Complete customer journey mapping",
            "Voice-of-customer program design",
            "Retention & loyalty strategy",
            "Service recovery playbooks",
            "CX KPI framework & dashboards"
        ],
        audience: "Hospitality groups, facilities services, professional services firms, and any customer-facing operation wanting measurable improvement in retention and NPS.",
        length: "4–10 weeks depending on scope. Ongoing advisory available."
    },
    {
        iconBg: 'bg-amber-100 text-amber-700',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2m0-2a2 2 0 012-2m0 2v2m0-2a2 2 0 01-2 2" /></svg>`,
        title: "SOP Development & Process Design",
        longDesc: "Turn tribal knowledge into clear, documented, scalable systems that make your business less owner-dependent and buyer-ready. We document what works, eliminate waste, and create playbooks your team can follow without you.",
        deliverables: [
            "Process audit & gap analysis",
            "End-to-end SOP library (10–60+ documents)",
            "Role-specific playbooks & checklists",
            "Training & rollout support",
            "Living document system (Notion / Google Drive)"
        ],
        audience: "Multi-site operators, growing SMEs, and businesses preparing for new locations or leadership transitions.",
        length: "3–8 weeks. Can be delivered as a one-off project or phased rollout."
    },
    {
        iconBg: 'bg-sky-100 text-sky-700',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 01-2 2v10m-6 0a2 2 0 01-2-2m0 0a2 2 0 012-2m0 2a2 2 0 002 2" /></svg>`,
        title: "Sales Systems & CRM Implementation",
        longDesc: "Implement proven revenue operating systems (Zoho CRM & Salesforce) that deliver predictable growth and clean, due-diligence-ready financials. We build the full sales process, pipelines, reporting, and team adoption so your numbers are credible to buyers.",
        deliverables: [
            "Current state sales process mapping",
            "Zoho CRM or Salesforce build & automation",
            "Custom dashboards & reporting",
            "Sales scripts & qualification frameworks",
            "Team training + 90-day adoption support"
        ],
        audience: "B2B service businesses, trade companies, and organisations currently using spreadsheets or outdated CRMs.",
        length: "5–12 weeks. Includes post-implementation optimisation."
    },
    {
        iconBg: 'bg-violet-100 text-violet-700',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2" /></svg>`,
        title: "Leadership & Team Development",
        longDesc: "Develop your managers and frontline teams so the business can perform at a high level even without your daily involvement — essential for any exit. We build leadership capability, customer-first habits, and team accountability.",
        deliverables: [
            "Half or full-day interactive workshops",
            "Manager coaching (1:1 or small group)",
            "Customer service excellence programs",
            "Internal communication frameworks",
            "Post-program reinforcement materials"
        ],
        audience: "Teams of 8–60 people. Ideal for organisations going through growth, cultural change, or preparing for busy seasons.",
        length: "1–5 day programs + optional 3-month reinforcement."
    },

    {
        iconBg: 'bg-rose-100 text-rose-700',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>`,
        title: "Fractional CX & Operations Leadership",
        longDesc: "Get embedded senior-level support to drive commercial performance while simultaneously building robust, Exit-Ready operations. I work as an extension of your leadership team to improve results today and prepare the business for tomorrow.",
        deliverables: [
            "Monthly strategy & planning sessions",
            "Weekly operational reviews (as needed)",
            "Project leadership on key initiatives",
            "Direct access via Slack / phone",
            "Quarterly business reviews with board or owners"
        ],
        audience: "Growing companies that have outgrown their current systems but aren’t ready (or don’t need) a full-time CXO or Head of Operations.",
        length: "Minimum 3-month engagement. Most clients stay 9–18 months."
    },
    {
        iconBg: 'bg-amber-200 text-amber-800',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
        title: "Exit-Ready Operations",
        longDesc: "I help ambitious service business owners identify and fix the hidden operational weaknesses that destroy 30–50% of business value at exit. You receive a clear, actionable 90-day plan to make your business scalable, transferable, and highly attractive to buyers — while improving performance today.",
        deliverables: [
            "Full operations audit with exit-valuation lens",
            "Complete SOP library and knowledge transfer systems",
            "Leadership development and successor readiness roadmap",
            "Customer experience standardization for consistency and premium valuation",
            "Owner-dependency reduction plan and delegation frameworks",
            "Ongoing advisory through the transition period"
        ],
        audience: "Owners of established hospitality groups, facilities providers, and multi-site service businesses preparing for sale, succession, or reduced involvement within 3–7 years.",
        length: "6–18 month engagements. Designed for serious owners who want measurable progress toward an exit-ready business."
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

// Booking modal
function openBookingModal() {
    const modal = document.getElementById('booking-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    enableSwipeToClose(modal, closeBookingModal);
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
        "nav.in_the_room": "In the Room",
        "nav.about": "About",
        "nav.how_i_work": "How I Work",
        "nav.insights": "Insights",
        "nav.contact": "Contact",
        "nav.book_call": "Book Strategy Call",

        // Hero positioning - Exit-Ready & Commercial Growth
        "hero.location": "GEELONG, AUSTRALIA",
        "hero.title": "Exit-Ready Operations &amp; Commercial Growth",
        "hero.subtitle": "I help ambitious owners of service businesses build operations that scale, perform at the highest level, and are fully prepared for exit or major growth — without depending on you.",
        "hero.cta_book": "Book a Strategy Call",
        "hero.cta_rooms": "See the Rooms I’ve Been In",
        "hero.trust": "Geelong, Australia • Working with service business leaders across Australia",

        // In the Room
        "inroom.label": "IN THE ROOM",
        "inroom.title": "In the Room with Exceptional Operators",
        "inroom.desc": "I’ve had the privilege of working alongside and learning from some of the sharpest minds in business and performance. These experiences shape how I help service business owners become truly Exit-Ready.",

        // Services section
        "services.label": "HOW I HELP",
        "services.title": "Strategic support for ambitious service businesses",
        "services.desc": "The no-nonsense support for leaders ready to face the hard truths and build organizations that actually scale and perform.",

        // Results
        "results.label": "EXIT-READY OUTCOMES",
        "results.title": "Typical Outcomes for Exit-Ready Clients",
        "results.outcome1": "Clearer systems that reduce owner dependency",
        "results.outcome2": "Higher buyer confidence during due diligence",
        "results.outcome3": "Stronger commercial performance while preparing for exit",
        "results.outcome4": "Avoidance of common valuation killers",
        "results.note": "Real results coming as we deliver projects.",

        // Service example
        "service1.title": "Customer Experience Strategy",
        "service1.desc": "Build CX systems that increase customer retention, reduce churn, and directly strengthen business valuation for exit or growth.",
        "service2.title": "SOP Development & Process Design",
        "service2.desc": "Turn tribal knowledge into clear, documented, scalable systems that make your business less owner-dependent and buyer-ready.",
        "service3.title": "Sales Systems & CRM Implementation",
        "service3.desc": "Implement proven revenue operating systems (Zoho CRM & Salesforce) that deliver predictable growth and clean, due-diligence-ready financials.",
        "service4.title": "Leadership & Team Development",
        "service4.desc": "Develop your managers and frontline teams so the business can perform at a high level even without your daily involvement — essential for any exit.",
        "service5.title": "Fractional CX & Operations Leadership",
        "service5.desc": "Get embedded senior-level support to drive commercial performance while simultaneously building robust, Exit-Ready operations.",
        "service6.title": "Exit-Ready Operations",
        "service6.desc": "Full Exit-Ready Operations Audit + 90-Day Readiness Plan. Identify and fix the hidden weaknesses that destroy 30–50% of business value at exit.",
        "service6.badge": "Flagship",
        "exitready.label": "FLAGSHIP OFFERING",
        "exitready.title": "Exit-Ready Operations Audit + 90-Day Plan",
        "exitready.flagship": "My flagship offering.",
        "exitready.desc": "I help small-to-medium service business owners close the gap between day-to-day operations and long-term commercial value.",
        "exitready.benefit1": "Avoid the common mistakes that destroy 30–50% of exit value",
        "exitready.benefit2": "Build systems that make your business run and sell without you",
        "exitready.benefit3": "Get a clear, actionable 90-day plan that increases buyer confidence and valuation",
        "exitready.cta": "Learn more about the Exit-Ready Program",
        "exit.title": "Exit-Ready Operations Audit + 90-Day Plan",
        "exit.subtitle": "I help ambitious owners of small-to-medium service businesses build operations that scale, perform at the highest level, and are fully prepared for exit or significant commercial growth.",
        "exit.strong": "Avoid the common operational mistakes that destroy 30–50% of business value at exit.",
        "exit.program_label": "THE PROGRAM",
        "exit.program_title": "The Exit-Ready Operations Audit + 90-Day Plan",
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
        "exit.investment_desc2": "The best next step is a short Strategy Call (no cost).",
        "exit.investment_cta": "Book Your Strategy Call Now →",
        "exit.investment_note": "Limited capacity. Serious inquiries only.",
        "modal.deliverables": "TYPICAL DELIVERABLES",
        "modal.who_for": "WHO THIS IS FOR",
        "modal.engagement": "ENGAGEMENT LENGTH",
        "modal.discuss": "Discuss this service →",
        "modal.book_call": "Book a call",
        "booking.title": "Book a Strategy Call",
        "booking.subtitle": "30 minutes • Free • No obligation",
        "service.learn_more": "Learn more",
        "cta.book": "Book your free 30-minute call",
        "cta.message": "Send me a message",
        "cta.final.title": "Ready to Make Your Business Exit-Ready?",
        "cta.final.subtitle": "Let’s have a short strategy call. I’ll review your current situation and show you the biggest opportunities to increase value and reduce exit risk.",
        "cta.final.book": "Book Your Strategy Call",
        "cta.final.note": "Limited slots available. Serious inquiries only.",
        "about.label": "MY STORY",
        "about.title": "14 years operating at the level where excellence is non-negotiable.",
        "about.p1": "My career has taken me from high-volume hotels on the Gold Coast to multi-site facilities services in regional Victoria — leading sales, procurement, and operations teams that consistently delivered the best results in their businesses.",
        "about.p2": "Along the way, I’ve had the privilege of spending time with founders and operators who have built significant enterprises. These experiences have shaped how I think about scaling, leadership, and what it actually takes to build organizations that perform at a high level.",
        "about.p3": "Today I work with a small number of ambitious service business leaders who want practical, no-fluff help building the systems, teams, and customer experiences that match the level of their ambition — whether through full transformations, operational overhauls, or ongoing strategic guidance as a fractional partner.",
        "about.languages_label": "Languages",
        "about.languages": "Czech (native)<br>Spanish (fluent)<br>English (fluent)<br>French (conversational)",
        "about.education_label": "Education",
        "about.education": "Master’s in Accounts &amp; Business<br>Bachelor of Hospitality Management",
        "about.systems_label": "Systems",
        "about.systems": "Zoho CRM, Salesforce, HubSpot<br>Jiwa ERP, Xero, Microsoft 365 + Copilot<br>Asana, Power BI, Zapier, Lucidchart",
        "about.approach_label": "Approach",
        "about.approach": "Practical. Data-informed.<br>Human-centred.<br>Zero fluff.",
        "engagements.label": "ENGAGEMENTS",
        "engagements.title": "A clear, collaborative process from day one.",
        "engagements.desc": "No cookie-cutter frameworks. Every engagement starts with deep listening and ends with sustainable systems you actually use.",
        "engagements.step1_title": "Discovery Call",
        "engagements.step1_desc": "Free 30-minute conversation to understand your biggest challenges, goals, and constraints. No pitch — just clarity.",
        "engagements.step2_title": "Diagnostic &amp; Roadmap",
        "engagements.step2_desc": "I conduct interviews, review data and processes, then deliver a prioritised roadmap with clear ROI projections.",
        "engagements.step3_title": "Implementation Partnership",
        "engagements.step3_desc": "We work together (or I lead) to build and embed the systems. Weekly check-ins, hands-on workshops, and team training included.",
        "engagements.step4_title": "Measure &amp; Sustain",
        "engagements.step4_desc": "90-day review, KPI dashboards, and a handover package so your team owns the improvements long-term. Optional retainer available.",
        "feedback.label": "REAL FEEDBACK",
        "feedback.title": "What leaders say about working together",
        "insights.label": "THOUGHT LEADERSHIP",
        "insights.title": "Latest insights",
        "insights.see_all": "See all insights →",
        roomTitles: [
            "With billionaire entrepreneur John Catsimatis and his wife in New York",
            "With JT Foxx",
            "With Joe Foster, Co-Founder of Reebok",
            "Alongside Tom Brady in Melbourne",
            "With Tim Gannon, Co-Founder of Outback Steakhouse, and JT Foxx"
        ],
        roomStories: [
            `<p>John Catsimatis is a self-made billionaire who has built and scaled multiple significant enterprises across industries, creating substantial wealth and long-term value through disciplined execution and strategic vision.</p><p>Alongside him stands his wife, who has been an integral part of that journey. Together they represent a powerful example of sustained business success at the highest level.</p><p>Being in this room provided direct proximity to the mindset and track record of individuals who have repeatedly delivered exceptional, result-driven outcomes over decades.</p>`,
            `<p>JT Foxx has built some of the largest entrepreneur events and high-level mastermind platforms in the world, creating environments where serious business owners connect, raise capital, and scale to seven and eight figures.</p><p>Through his platforms, he has helped thousands of entrepreneurs build significant companies and create real wealth through strategic relationships and proven growth frameworks.</p><p>Proximity to this level of network and execution provides direct insight into what it takes to operate and scale at the highest levels of entrepreneurship.</p>`,
            `<p>Joe Foster co-founded Reebok and scaled it from a small British company into one of the world’s leading global athletic brands, competing directly with Nike and Adidas on an international stage.</p><p>The brand reached billions in revenue, became a cultural icon, and was eventually acquired in a multi-billion-dollar transaction.</p><p>Sitting with the man who helped build that level of global commercial success provides rare perspective on what it takes to create enduring, large-scale businesses.</p>`,
            `<p>Tom Brady is the most decorated quarterback in NFL history, with a record 7 Super Bowl championships — the highest achievement in American team sports.</p><p>Beyond athletics, he built a multi-hundred-million-dollar personal brand and business empire, including the TB12 wellness platform and strategic investments in major companies.</p><p>Proximity to someone who has consistently delivered world-class results across two decades at the absolute highest level offers powerful insight into sustained high performance and brand building at scale.</p>`,
            `<p>Tim Gannon is the co-founder of Outback Steakhouse, one of the most iconic and successful casual dining restaurant chains in the world. He helped scale the concept from a single restaurant into a global empire with hundreds of locations, delivering consistent quality and a powerful brand experience at massive scale.</p><p>His deep expertise in hospitality operations, team culture, and repeatable systems turned a bold idea into a multi-billion-dollar success story that has influenced the entire service industry.</p><p>Being in the room with Tim Gannon alongside JT Foxx offered direct access to the mindset and strategies behind building enduring, scalable service businesses that deliver exceptional results year after year.</p>`
        ],
        readStory: "Read story →",
        moreMoments: "More moments from high-authority rooms available upon request.",
        "inroom.more": "More moments from high-authority rooms available upon request."
    },
    es: {
        // Colombian Spanish
        "nav.services": "Servicios",
        "nav.results": "Resultados",
        "nav.in_the_room": "En la Sala",
        "nav.about": "Sobre Mí",
        "nav.how_i_work": "Cómo Trabajo",
        "nav.insights": "Insights",
        "nav.contact": "Contacto",
        "nav.book_call": "Agenda una Llamada Estratégica",

        "hero.location": "GEELONG, AUSTRALIA",
        "hero.title": "Operaciones Listas para la Salida &amp; Crecimiento Comercial",
        "hero.subtitle": "Ayudo a propietarios ambiciosos de negocios de servicios a construir operaciones que escalan, operan al más alto nivel y están completamente preparadas para una salida o un crecimiento importante — sin depender de ti.",
        "hero.cta_book": "Agenda una Llamada Estratégica",
        "hero.cta_rooms": "Mira las salas en las que he estado",
        "hero.trust": "Geelong, Australia • Trabajando con líderes de negocios de servicios en toda Australia",

        "inroom.label": "EN LA SALA",
        "inroom.title": "En la Sala con Operadores Excepcionales",
        "inroom.desc": "He tenido el privilegio de trabajar junto a y aprender de algunas de las mentes más agudas en negocios y rendimiento. Estas experiencias moldean cómo ayudo a propietarios de negocios de servicios a volverse verdaderamente Exit-Ready.",

        "services.label": "CÓMO AYUDO",
        "services.title": "Apoyo estratégico para negocios de servicios ambiciosos",
        "services.desc": "El apoyo sin rodeos para líderes listos para enfrentar las verdades duras y construir organizaciones que realmente escalen y rindan.",

        "results.label": "RESULTADOS EXIT-READY",
        "results.title": "Resultados típicos para clientes Exit-Ready",
        "results.outcome1": "Sistemas más claros que reducen la dependencia del propietario",
        "results.outcome2": "Mayor confianza del comprador durante la due diligence",
        "results.outcome3": "Fuerte desempeño comercial mientras se prepara la salida",
        "results.outcome4": "Evitación de los asesinos comunes de valoración",
        "results.note": "Resultados reales a medida que entregamos proyectos.",

        "service1.title": "Estrategia de Experiencia del Cliente",
        "service1.desc": "Construya sistemas de CX que aumenten la retención de clientes, reduzcan la rotación y fortalezcan directamente la valoración del negocio para la salida o el crecimiento.",
        "service2.title": "Desarrollo de SOP y Diseño de Procesos",
        "service2.desc": "Convierta el conocimiento tribal en sistemas claros, documentados y escalables que hagan su negocio menos dependiente del propietario y listo para compradores.",
        "service3.title": "Sistemas de Ventas e Implementación de CRM",
        "service3.desc": "Implemente sistemas operativos de ingresos probados (Zoho CRM y Salesforce) que entreguen crecimiento predecible y finanzas limpias listas para due diligence.",
        "service4.title": "Liderazgo y Desarrollo de Equipos",
        "service4.desc": "Desarrolle a sus gerentes y equipos de primera línea para que el negocio pueda rendir a alto nivel incluso sin su participación diaria — esencial para cualquier salida.",
        "service5.title": "Liderazgo Fraccional de CX y Operaciones",
        "service5.desc": "Obtenga apoyo de nivel senior integrado para impulsar el desempeño comercial mientras construye simultáneamente operaciones robustas y Exit-Ready.",
        "service6.title": "Operaciones Listas para la Salida",
        "service6.desc": "Auditoría completa de Operaciones Exit-Ready + Plan de 90 Días. Identifique y solucione las debilidades ocultas que destruyen entre el 30 y el 50% del valor del negocio en la salida.",
        "service6.badge": "Insignia",
        "exitready.label": "OFERTA INSIGNIA",
        "exitready.title": "Auditoría de Operaciones Listas para la Salida + Plan de 90 Días",
        "exitready.flagship": "Mi oferta insignia.",
        "exitready.desc": "Ayudo a propietarios de pequeños y medianos negocios de servicios a cerrar la brecha entre las operaciones diarias y el valor comercial a largo plazo.",
        "exitready.benefit1": "Evite los errores comunes que destruyen entre el 30 y el 50% del valor de salida",
        "exitready.benefit2": "Construya sistemas que hagan que su negocio funcione y se venda sin usted",
        "exitready.benefit3": "Obtenga un plan claro y accionable de 90 días que aumenta la confianza del comprador y la valoración",
        "exitready.cta": "Conozca más sobre el Programa Exit-Ready",
        "modal.deliverables": "ENTREGABLES TÍPICOS",
        "modal.who_for": "PARA QUIÉN ES ESTO",
        "modal.engagement": "DURACIÓN DEL COMPROMISO",
        "modal.discuss": "Discutir este servicio →",
        "modal.book_call": "Agenda una llamada",
        "booking.title": "Agenda una Llamada Estratégica",
        "booking.subtitle": "30 minutos • Gratis • Sin obligación",
        "service.learn_more": "Aprender más",
        roomTitles: [
            "Con el empresario multimillonario John Catsimatis y su esposa en Nueva York",
            "Con JT Foxx",
            "Con Joe Foster, cofundador de Reebok",
            "Junto a Tom Brady en Melbourne",
            "Con Tim Gannon, cofundador de Outback Steakhouse, y JT Foxx"
        ],
        roomStories: [
            `<p>John Catsimatis es un multimillonario hecho a sí mismo que ha construido y escalado múltiples empresas significativas en diversas industrias, creando una riqueza sustancial y valor a largo plazo a través de una ejecución disciplinada y visión estratégica.</p><p>A su lado está su esposa, quien ha sido parte integral de ese viaje. Juntos representan un poderoso ejemplo de éxito empresarial sostenido al más alto nivel.</p><p>Estar en esta sala proporcionó proximidad directa a la mentalidad y trayectoria de individuos que han entregado repetidamente resultados excepcionales y orientados a resultados durante décadas.</p>`,
            `<p>JT Foxx ha construido algunos de los eventos empresariales más grandes y plataformas de mastermind de alto nivel del mundo, creando entornos donde propietarios serios de negocios se conectan, recaudan capital y escalan a siete y ocho cifras.</p><p>A través de sus plataformas, ha ayudado a miles de emprendedores a construir empresas significativas y crear riqueza real a través de relaciones estratégicas y marcos de crecimiento probados.</p><p>La proximidad a este nivel de red y ejecución proporciona una visión directa de lo que se necesita para operar y escalar en los niveles más altos del emprendimiento.</p>`,
            `<p>Joe Foster cofundó Reebok y la escaló desde una pequeña empresa británica hasta una de las marcas deportivas globales líderes del mundo, compitiendo directamente con Nike y Adidas en el escenario internacional.</p><p>La marca alcanzó miles de millones en ingresos, se convirtió en un ícono cultural y fue adquirida en una transacción multimillonaria.</p><p>Sentarse con el hombre que ayudó a construir ese nivel de éxito comercial global proporciona una perspectiva rara sobre lo que se necesita para crear negocios duraderos y de gran escala.</p>`,
            `<p>Tom Brady es el quarterback más condecorado en la historia de la NFL, con un récord de 7 campeonatos de Super Bowl — el logro más alto en los deportes de equipo estadounidenses.</p><p>Más allá del atletismo, construyó un imperio de marca personal y negocios de cientos de millones de dólares, incluyendo la plataforma de bienestar TB12 e inversiones estratégicas en grandes empresas.</p><p>La proximidad a alguien que ha entregado consistentemente resultados de clase mundial durante dos décadas en el nivel más alto ofrece una visión poderosa sobre el rendimiento sostenido de alto nivel y la construcción de marcas a escala.</p>`,
            `<p>Tim Gannon es el cofundador de Outback Steakhouse, una de las cadenas de restaurantes casuales más icónicas y exitosas del mundo. Ayudó a escalar el concepto desde un solo restaurante hasta un imperio global con cientos de ubicaciones, entregando calidad consistente y una poderosa experiencia de marca a escala masiva.</p><p>Su profunda experiencia en operaciones de hospitalidad, cultura de equipo y sistemas repetibles convirtió una idea audaz en una historia de éxito multimillonaria que ha influido en toda la industria de servicios.</p><p>Estar en la sala con Tim Gannon junto a JT Foxx ofreció acceso directo a la mentalidad y estrategias detrás de construir negocios de servicios escalables y duraderos que entregan resultados excepcionales año tras año.</p>`
        ],
        readStory: "Leer historia →",
        moreMoments: "Más momentos de salas de alta autoridad disponibles bajo solicitud.",
        "inroom.more": "Más momentos de salas de alta autoridad disponibles bajo solicitud.",
        "cta.book": "Agenda tu llamada gratuita de 30 minutos",
        "cta.message": "Envíame un mensaje",
        "cta.final.title": "¿Listo para hacer tu negocio Exit-Ready?",
        "cta.final.subtitle": "Tengamos una breve llamada estratégica. Revisaré tu situación actual y te mostraré las mayores oportunidades para aumentar el valor y reducir el riesgo de salida.",
        "cta.final.book": "Reserva tu Llamada Estratégica",
        "cta.final.note": "Cupos limitados. Solo consultas serias.",
        "about.label": "MI HISTORIA",
        "about.title": "14 años operando al nivel donde la excelencia es ineludible.",
        "about.p1": "Mi carrera me ha llevado de hoteles de alto volumen en la Costa de Oro a servicios de instalaciones multi-sitio en Victoria regional — liderando equipos de ventas, compras y operaciones que consistentemente entregaron los mejores resultados en sus negocios.",
        "about.p2": "En el camino, he tenido el privilegio de pasar tiempo con fundadores y operadores que han construido empresas significativas. Estas experiencias han moldeado cómo pienso sobre escalar, liderazgo y lo que realmente se necesita para construir organizaciones que funcionan a alto nivel.",
        "about.p3": "Hoy trabajo con un pequeño número de líderes ambiciosos de negocios de servicios que quieren ayuda práctica, sin rodeos, para construir los sistemas, equipos y experiencias de cliente que coinciden con el nivel de su ambición — ya sea a través de transformaciones completas, revisiones operativas o orientación estratégica continua como socio fraccional.",
        "about.languages_label": "Idiomas",
        "about.languages": "Checo (nativo)<br>Español (fluido)<br>Inglés (fluido)<br>Francés (conversacional)",
        "about.education_label": "Educación",
        "about.education": "Maestría en Contabilidad y Negocios<br>Licenciatura en Gestión Hotelera",
        "about.systems_label": "Sistemas",
        "about.systems": "Zoho CRM, Salesforce, HubSpot<br>Jiwa ERP, Xero, Microsoft 365 + Copilot<br>Asana, Power BI, Zapier, Lucidchart",
        "about.approach_label": "Enfoque",
        "about.approach": "Práctico. Informado por datos.<br>Centrado en las personas.<br>Sin rodeos.",
        "engagements.label": "COMPROMISOS",
        "engagements.title": "Un proceso claro y colaborativo desde el primer día.",
        "engagements.desc": "Sin marcos genéricos. Cada compromiso comienza con escucha profunda y termina con sistemas sostenibles que realmente usas.",
        "engagements.step1_title": "Llamada de Descubrimiento",
        "engagements.step1_desc": "Conversación gratuita de 30 minutos para entender tus mayores desafíos, metas y restricciones. Sin pitch — solo claridad.",
        "engagements.step2_title": "Diagnóstico y Hoja de Ruta",
        "engagements.step2_desc": "Realizo entrevistas, reviso datos y procesos, luego entrego una hoja de ruta priorizada con proyecciones claras de ROI.",
        "engagements.step3_title": "Asociación de Implementación",
        "engagements.step3_desc": "Trabajamos juntos (o lidero) para construir e integrar los sistemas. Incluye check-ins semanales, talleres prácticos y entrenamiento de equipo.",
        "engagements.step4_title": "Medir y Mantener",
        "engagements.step4_desc": "Revisión de 90 días, dashboards de KPI y paquete de traspaso para que tu equipo sea dueño de las mejoras a largo plazo. Retainer opcional disponible.",
        "feedback.label": "REAL FEEDBACK",
        "feedback.title": "Lo que dicen los líderes sobre trabajar juntos",
        "insights.label": "LIDERAZGO DE PENSAMIENTO",
        "insights.title": "Últimos insights",
        "insights.see_all": "Ver todos los insights →",
        "exit.premium": "OFERTA PREMIUM",
        "exit.title": "Auditoría de Operaciones Exit-Ready + Plan de 90 Días",
        "exit.subtitle": "Ayudo a propietarios ambiciosos de pequeños y medianos negocios de servicios a construir operaciones que escalan, operan al más alto nivel y están completamente preparadas para una salida o un crecimiento comercial significativo.",
        "exit.strong": "Evite los errores operativos comunes que destruyen entre el 30 y el 50% del valor del negocio en la salida.",
        "exit.program_label": "EL PROGRAMA",
        "exit.program_title": "La Auditoría de Operaciones Exit-Ready + Plan de 90 Días",
        "exit.program_desc": "Mi compromiso insignia. Un programa enfocado y práctico que te da claridad y momentum rápido.",
        "exit.program.item1": "Auditoría completa de operaciones enfocada en la salida y el valor comercial",
        "exit.program.item2": "Identificación de los mayores riesgos y oportunidades de valoración",
        "exit.program.item3": "Plan de Ejecución personalizado de 90 días con prioridades claras y responsabilidad",
        "exit.program.item4": "Orientación práctica para implementar las correcciones de mayor impacto",
        "exit.how_label": "EL PROCESO",
        "exit.how_title": "Cómo Funciona",
        "exit.how.step1_title": "Llamada de Descubrimiento",
        "exit.how.step1_desc": "Entender tu negocio y objetivos",
        "exit.how.step2_title": "Auditoría Profunda de Operaciones",
        "exit.how.step2_desc": "Revisar sistemas, procesos, CX, estructura de equipo y dependencia del propietario",
        "exit.how.step3_title": "Análisis de Brechas Exit-Ready",
        "exit.how.step3_desc": "Informe claro sobre riesgos y oportunidades",
        "exit.how.step4_title": "Plan de Preparación de 90 Días",
        "exit.how.step4_desc": "Hoja de ruta priorizada y accionable",
        "exit.how.step5_title": "Soporte de Implementación",
        "exit.how.step5_desc": "Check-ins regulares y orientación (extensión opcional)",
        "exit.expect_label": "QUÉ PUEDES ESPERAR",
        "exit.expect_title": "Qué Puedes Esperar",
        "exit.expect.item1": "Un negocio que funciona más fuerte hoy",
        "exit.expect.item2": "Significativamente mayor confianza del comprador y valoración",
        "exit.expect.item3": "Reducción de la dependencia del propietario",
        "exit.expect.item4": "Sistemas y datos más limpios para due diligence",
        "exit.expect.item5": "Mejoras prácticas que puedes implementar inmediatamente",
        "exit.for_you_label": "ESTO ES PARA TI SI",
        "exit.for_you_title": "Esto Es Para Ti Si",
        "exit.for_you.item1": "Eres dueño de un negocio de servicios/instalaciones/limpieza/lavandería/hospitalidad",
        "exit.for_you.item2": "Estás considerando una salida en los próximos 6–36 meses (o quieres la opción)",
        "exit.for_you.item3": "Estás dispuesto a hacer el trabajo real necesario",
        "exit.for_you.item4": "Valoras la ejecución práctica sobre la teoría",
        "exit.investment_label": "INVERSIÓN",
        "exit.investment_title": "Inversión",
        "exit.investment_desc1": "Las tarifas del proyecto suelen oscilar entre $8,000 y $25,000+ dependiendo del tamaño y alcance del negocio.",
        "exit.investment_desc2": "El mejor siguiente paso es una breve Llamada de Estrategia (sin costo).",
        "exit.investment_cta": "Reserva tu Llamada de Estrategia Ahora →",
        "exit.investment_note": "Capacidad limitada. Solo consultas serias.",
        "exit.reality_label": "LA REALIDAD",
        "exit.reality_title": "La mayoría de los negocios de servicios no son vendibles — o solo se venden con descuento.",
        "exit.framework_label": "EL MARCO EXIT-READY",
        "exit.framework_title": "Seis pilares que convierten las operaciones en un activo valioso."
    },
    fr: {
    },
    fr: {
        "service1.title": "Stratégie d'Expérience Client",
        "service1.desc": "Construisez des systèmes CX qui augmentent la rétention client, réduisent le churn et renforcent directement la valorisation de l'entreprise pour la sortie ou la croissance.",
        "service2.title": "Développement de SOP et Design de Processus",
        "service2.desc": "Transformez les connaissances tribales en systèmes clairs, documentés et évolutifs qui rendent votre entreprise moins dépendante du propriétaire et prête pour les acheteurs.",
        "service3.title": "Systèmes de Vente et Implémentation CRM",
        "service3.desc": "Mettez en œuvre des systèmes opérationnels de revenus éprouvés (Zoho CRM et Salesforce) qui offrent une croissance prévisible et des finances propres prêtes pour la due diligence.",
        "service4.title": "Leadership et Développement d'Équipes",
        "service4.desc": "Développez vos managers et vos équipes de terrain afin que l'entreprise puisse fonctionner à un haut niveau même sans votre implication quotidienne — essentiel pour toute sortie.",
        "service5.title": "Leadership Fractional CX & Opérations",
        "service5.desc": "Obtenez un soutien de niveau senior intégré pour piloter la performance commerciale tout en construisant simultanément des opérations robustes et Exit-Ready.",
        "service6.title": "Opérations Prêtes pour la Sortie",
        "service6.desc": "Audit complet des Opérations Exit-Ready + Plan de Préparation sur 90 Jours. Identifiez et corrigez les faiblesses opérationnelles cachées qui détruisent 30 à 50 % de la valeur de l'entreprise à la sortie.",
        "service6.badge": "Offre Phare",
        "service6.desc": "Audit complet des Opérations Exit-Ready + Plan de Préparation sur 90 Jours. Identifiez et corrigez les faiblesses opérationnelles cachées qui détruisent 30 à 50 % de la valeur de l'entreprise à la sortie.",
        "exitready.label": "OFFRE PHARE",
        "exitready.title": "Audit Opérations Prêtes pour la Sortie + Plan sur 90 Jours",
        "exitready.flagship": "Mon offre phare.",
        "exitready.desc": "J'aide les propriétaires de petites et moyennes entreprises de services à combler l'écart entre les opérations quotidiennes et la valeur commerciale à long terme.",
        "exitready.benefit1": "Évitez les erreurs courantes qui détruisent 30 à 50 % de la valeur de sortie",
        "exitready.benefit2": "Construisez des systèmes qui permettent à votre entreprise de fonctionner et d'être vendue sans vous",
        "exitready.benefit3": "Obtenez un plan clair et actionable sur 90 jours qui augmente la confiance des acheteurs et la valorisation",
        "exitready.cta": "En savoir plus sur le Programme Exit-Ready",
        "exit.premium": "OFFRE PREMIUM",
        "exit.title": "Audit Opérations Prêtes pour la Sortie + Plan sur 90 Jours",
        "exit.subtitle": "J'aide les propriétaires ambitieux de petites et moyennes entreprises de services à construire des opérations qui s'échelonnent, performent au plus haut niveau et sont pleinement préparées pour une sortie ou une croissance commerciale significative.",
        "exit.strong": "Évitez les erreurs opérationnelles courantes qui détruisent 30 à 50 % de la valeur de l'entreprise à la sortie.",
        "exit.program_label": "LE PROGRAMME",
        "exit.program_title": "L'Audit Opérations Prêtes pour la Sortie + Plan sur 90 Jours",
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
        "exit.how.step3_title": "Analyse des Écarts Exit-Ready",
        "exit.how.step3_desc": "Rapport clair sur les risques et opportunités",
        "exit.how.step4_title": "Plan de Préparation sur 90 Jours",
        "exit.how.step4_desc": "Feuille de route priorisée et actionable",
        "exit.how.step5_title": "Support d'Implémentation",
        "exit.how.step5_desc": "Check-ins réguliers et accompagnement (extension optionnelle)",
        "exit.expect_label": "CE QUE VOUS POUVEZ ATTENDRE",
        "exit.expect_title": "Ce Que Vous Pouvez Attendre",
        "exit.expect.item1": "Une entreprise qui fonctionne plus fortement aujourd'hui",
        "exit.expect.item2": "Une confiance et une valorisation significativement plus élevées des acheteurs",
        "exit.expect.item3": "Une dépendance réduite au propriétaire",
        "exit.expect.item4": "Des systèmes et des données plus propres pour la due diligence",
        "exit.expect.item5": "Des améliorations pratiques que vous pouvez mettre en œuvre immédiatement",
        "exit.for_you_label": "C'EST POUR VOUS SI",
        "exit.for_you_title": "C'est Pour Vous Si",
        "exit.for_you.item1": "Vous possédez une entreprise de services/installations/nettoyage/blanchisserie/hospitalité",
        "exit.for_you.item2": "Vous envisagez une sortie dans les 6 à 36 prochains mois (ou vous voulez l'option)",
        "exit.for_you.item3": "Vous êtes prêt à faire le vrai travail nécessaire",
        "exit.for_you.item4": "Vous valorisez l'exécution pratique plutôt que la théorie",
        "exit.investment_label": "INVESTISSEMENT",
        "exit.investment_title": "Investissement",
        "exit.investment_desc1": "Les frais de projet varient généralement entre 8 000 $ et 25 000 $+ selon la taille et la portée de l'entreprise.",
        "exit.investment_desc2": "La meilleure prochaine étape est un court Appel Stratégique (sans frais).",
        "exit.investment_cta": "Réservez votre Appel Stratégique Maintenant →",
        "exit.investment_note": "Capacité limitée. Uniquement les demandes sérieuses.",
        "modal.deliverables": "LIVRABLES TYPIQUES",
        "modal.who_for": "POUR QUI EST-CE",
        "modal.engagement": "DURÉE DE L'ENGAGEMENT",
        "modal.discuss": "Discuter de ce service →",
        "modal.book_call": "Réserver un appel",
        "booking.title": "Réserver un Appel Stratégique",
        "booking.subtitle": "30 minutes • Gratuit • Sans obligation",
        "service.learn_more": "En savoir plus",
        "cta.book": "Réserver votre appel gratuit de 30 minutes",
        "cta.message": "Envoyez-moi un message",
        "cta.final.title": "Prêt à rendre votre entreprise Exit-Ready ?",
        "cta.final.subtitle": "Faisons un court appel stratégique. Je passerai en revue votre situation actuelle et vous montrerai les plus grandes opportunités pour augmenter la valeur et réduire les risques de sortie.",
        "cta.final.book": "Réservez votre Appel Stratégique",
        "cta.final.note": "Places limitées. Uniquement pour les demandes sérieuses.",
        "about.label": "MON HISTOIRE",
        "about.title": "14 ans à opérer au niveau où l'excellence est non négociable.",
        "about.p1": "Ma carrière m'a amené des hôtels à haut volume sur la Gold Coast aux services d'installations multi-sites en Victoria régionale — dirigeant des équipes de ventes, d'achats et d'opérations qui ont constamment livré les meilleurs résultats dans leurs entreprises.",
        "about.p2": "En chemin, j'ai eu le privilège de passer du temps avec des fondateurs et opérateurs qui ont construit des entreprises significatives. Ces expériences ont façonné ma façon de penser l'échelle, le leadership et ce qu'il faut réellement pour construire des organisations qui performent à haut niveau.",
        "about.p3": "Aujourd'hui je travaille avec un petit nombre de leaders ambitieux d'entreprises de services qui veulent une aide pratique, sans fioritures, pour construire les systèmes, équipes et expériences client qui correspondent au niveau de leur ambition — que ce soit à travers des transformations complètes, des refontes opérationnelles ou un accompagnement stratégique continu en tant que partenaire fractionnel.",
        "about.languages_label": "Langues",
        "about.languages": "Tchèque (natif)<br>Espagnol (courant)<br>Anglais (courant)<br>Français (conversationnel)",
        "about.education_label": "Formation",
        "about.education": "Master en Comptabilité et Affaires<br>Licence en Gestion Hôtelière",
        "about.systems_label": "Systèmes",
        "about.systems": "Zoho CRM, Salesforce, HubSpot<br>Jiwa ERP, Xero, Microsoft 365 + Copilot<br>Asana, Power BI, Zapier, Lucidchart",
        "about.approach_label": "Approche",
        "about.approach": "Pratique. Basé sur les données.<br>Centré sur l'humain.<br>Sans fioritures.",
        "engagements.label": "ENGAGEMENTS",
        "engagements.title": "Un processus clair et collaboratif dès le premier jour.",
        "engagements.desc": "Pas de cadres passe-partout. Chaque engagement commence par une écoute profonde et se termine par des systèmes durables que vous utilisez réellement.",
        "engagements.step1_title": "Appel de Découverte",
        "engagements.step1_desc": "Conversation gratuite de 30 minutes pour comprendre vos plus grands défis, objectifs et contraintes. Pas de pitch — juste de la clarté.",
        "engagements.step2_title": "Diagnostic & Feuille de Route",
        "engagements.step2_desc": "Je mène des entretiens, examine les données et processus, puis livre une feuille de route priorisée avec des projections claires de ROI.",
        "engagements.step3_title": "Partenariat d'Implémentation",
        "engagements.step3_desc": "Nous travaillons ensemble (ou je dirige) pour construire et intégrer les systèmes. Inclus : check-ins hebdomadaires, ateliers pratiques et formation d'équipe.",
        "engagements.step4_title": "Mesurer & Pérenniser",
        "engagements.step4_desc": "Revue à 90 jours, tableaux de bord KPI et package de transfert pour que votre équipe possède les améliorations à long terme. Retainer optionnel disponible.",
        "feedback.label": "AVIS RÉELS",
        "feedback.title": "Ce que disent les leaders sur le travail ensemble",
        "insights.label": "LEADERSHIP DE PENSÉE",
        "insights.title": "Derniers insights",
        "insights.see_all": "Voir tous les insights →",
        "nav.services": "Services",
        "nav.results": "Résultats",
        "nav.in_the_room": "Dans la Salle",
        "nav.about": "À Propos",
        "nav.how_i_work": "Comment Je Travaille",
        "nav.insights": "Insights",
        "nav.contact": "Contact",
        "nav.book_call": "Réserver un Appel Stratégique",
        "hero.location": "GEELONG, AUSTRALIE",
        "hero.title": "Opérations Prêtes pour la Sortie &amp; Croissance Commerciale",
        "hero.subtitle": "J'aide les propriétaires ambitieux d'entreprises de services à bâtir des opérations qui s'échelonnent, performent au plus haut niveau et sont pleinement préparées pour une sortie ou une croissance majeure — sans dépendre de vous.",
        "hero.cta_book": "Réserver un Appel Stratégique",
        "hero.cta_rooms": "Voir les salles où j'ai été",
        "hero.trust": "Geelong, Australie • Travail avec des dirigeants d'entreprises de services à travers l'Australie",
        "inroom.label": "DANS LA SALLE",
        "inroom.title": "Dans la Salle avec des Opérateurs Exceptionnels",
        "inroom.desc": "J’ai eu le privilège de travailler aux côtés et d’apprendre de certains des esprits les plus aiguisés en affaires et en performance. Ces expériences façonnent la façon dont j’aide les propriétaires d’entreprises de services à devenir véritablement Exit-Ready.",
        "services.label": "COMMENT J'AIDE",
        "services.title": "Soutien stratégique pour les entreprises de services ambitieuses",
        "services.desc": "Soutien à fort impact pour les leaders qui veulent construire des organisations qui livrent constamment à un haut niveau.",
        "results.label": "RÉSULTATS EXIT-READY",
        "results.title": "Résultats typiques pour les clients Exit-Ready",
        "results.outcome1": "Des systèmes plus clairs qui réduisent la dépendance du propriétaire",
        "results.outcome2": "Confiance accrue des acheteurs lors de la due diligence",
        "results.outcome3": "Performance commerciale renforcée pendant la préparation à la sortie",
        "results.outcome4": "Évitement des facteurs courants qui tuent la valorisation",
        "results.note": "Vrais résultats à mesure que nous livrons les projets.",
        "service1.title": "Stratégie d'Expérience Client",
        "service1.desc": "Construisez des systèmes CX qui augmentent la rétention client, réduisent le churn et renforcent directement la valorisation de l'entreprise pour la sortie ou la croissance.",
        "service2.title": "Développement de SOP et Design de Processus",
        "service2.desc": "Transformez les connaissances tribales en systèmes clairs, documentés et évolutifs qui rendent votre entreprise moins dépendante du propriétaire et prête pour les acheteurs.",
        "service3.title": "Systèmes de Vente et Implémentation CRM",
        "service3.desc": "Mettez en œuvre des systèmes opérationnels de revenus éprouvés (Zoho CRM et Salesforce) qui offrent une croissance prévisible et des finances propres prêtes pour la due diligence.",
        "service4.title": "Leadership et Développement d'Équipes",
        "service4.desc": "Développez vos managers et vos équipes de terrain afin que l'entreprise puisse fonctionner à un haut niveau même sans votre implication quotidienne — essentiel pour toute sortie.",
        "service5.title": "Leadership Fractional CX & Opérations",
        "service5.desc": "Obtenez un soutien de niveau senior intégré pour piloter la performance commerciale tout en construisant simultanément des opérations robustes et Exit-Ready.",
        "service6.title": "Opérations Prêtes pour la Sortie",
        "service6.desc": "Audit complet des Opérations Exit-Ready + Plan de Préparation sur 90 Jours. Identifiez et corrigez les faiblesses opérationnelles cachées qui détruisent 30 à 50 % de la valeur de l'entreprise à la sortie.",
        "service6.badge": "Offre Phare",
        "service6.desc": "Partenariat stratégique continu. Conseil mensuel ou leadership intérimaire sans le coût d'un exécutif full-time.",
        "service7.title": "Opérations Prêtes pour la Sortie",
        "service7.desc": "Construisez une entreprise qui prospère sans vous. Systémy, leadership et CX conçus pour la valorisation, la succession ou la vente en 3-7 ans.",
        roomTitles: [
            "Avec l'entrepreneur milliardaire John Catsimatis et son épouse à New York",
            "Avec JT Foxx",
            "Avec Joe Foster, cofondateur de Reebok",
            "Aux côtés de Tom Brady à Melbourne",
            "Avec Tim Gannon, cofondateur d'Outback Steakhouse, et JT Foxx"
        ],
        roomStories: [
            `<p>John Catsimatis est un milliardaire autodidacte qui a construit et développé de multiples entreprises significatives dans divers secteurs, créant une richesse substantielle et une valeur à long terme grâce à une exécution disciplinée et une vision stratégique.</p><p>À ses côtés se trouve son épouse, qui a fait partie intégrante de ce parcours. Ensemble, ils représentent un puissant exemple de succès commercial durable au plus haut niveau.</p><p>Être dans cette salle a permis une proximité directe avec la mentalité et le parcours d'individus qui ont livré à plusieurs reprises des résultats exceptionnels et axés sur les résultats au cours de décennies.</p>`,
            `<p>JT Foxx a créé certains des plus grands événements entrepreneuriaux et plateformes de mastermind de haut niveau au monde, créant des environnements où des propriétaires d'entreprises sérieux se connectent, lèvent des capitaux et passent à sept et huit chiffres.</p><p>À travers ses plateformes, il a aidé des milliers d'entrepreneurs à construire des entreprises significatives et à créer de la richesse réelle grâce à des relations stratégiques et des cadres de croissance éprouvés.</p><p>La proximité avec ce niveau de réseau et d'exécution fournit un aperçu direct de ce qu'il faut pour opérer et se développer aux plus hauts niveaux de l'entrepreneuriat.</p>`,
            `<p>Joe Foster a cofondé Reebok et l'a développée d'une petite entreprise britannique en l'une des principales marques sportives mondiales, en concurrence directe avec Nike et Adidas sur la scène internationale.</p><p>La marque a atteint des milliards de revenus, est devenue une icône culturelle et a été acquise dans une transaction de plusieurs milliards de dollars.</p><p>Être assis avec l'homme qui a aidé à construire ce niveau de succès commercial mondial offre une perspective rare sur ce qu'il faut pour créer des entreprises durables et à grande échelle.</p>`,
            `<p>Tom Brady est le quarterback le plus décoré de l'histoire de la NFL, avec un record de 7 championnats du Super Bowl — le plus haut accomplissement dans les sports d'équipe américains.</p><p>Au-delà de l'athlétisme, il a bâti un empire de marque personnelle et d'affaires de plusieurs centaines de millions de dollars, incluant la plateforme de bien-être TB12 et des investissements stratégiques dans de grandes entreprises.</p><p>La proximité avec quelqu'un qui a constamment livré des résultats de classe mondiale sur deux décennies au niveau le plus élevé offre un aperçu puissant sur la performance soutenue de haut niveau et la construction de marques à grande échelle.</p>`,
            `<p>Tim Gannon est le cofondateur d'Outback Steakhouse, l'une des chaînes de restaurants casual les plus emblématiques et réussies au monde. Il a aidé à développer le concept d'un seul restaurant en un empire mondial avec des centaines de sites, offrant une qualité constante et une puissante expérience de marque à grande échelle.</p><p>Son expertise approfondie dans les opérations de l'hospitalité, la culture d'équipe et les systèmes reproductibles a transformé une idée audacieuse en une histoire de succès multimilliardaire qui a influencé toute l'industrie des services.</p><p>Être dans la salle avec Tim Gannon aux côtés de JT Foxx a offert un accès direct à la mentalité et aux stratégies derrière la construction d'entreprises de services durables et évolutives qui livrent des résultats exceptionnels année après année.</p>`
        ],
        readStory: "Lire l'histoire →",
        moreMoments: "D'autres moments de salles à haute autorité disponibles sur demande."
    },
    cz: {
        "service1.title": "Strategie Zákaznické Zkušenosti",
        "service1.desc": "Budujte CX systémy, které zvyšují retenci zákazníků, snižují churn a přímo posilují hodnotu podniku pro exit nebo růst.",
        "service2.title": "Vývoj SOP a Návrh Procesů",
        "service2.desc": "Převeďte kmenové znalosti do jasných, zdokumentovaných a škálovatelných systémů, které učiní váš podnik méně závislým na majiteli a připraveným pro kupce.",
        "service3.title": "Systémy Prodeje a Implementace CRM",
        "service3.desc": "Implementujte prověřené systémy provozu příjmů (Zoho CRM a Salesforce), které zajistí předvídatelný růst a čisté finance připravené pro due diligence.",
        "service4.title": "Vedení a Rozvoj Týmů",
        "service4.desc": "Rozviňte své manažery a front-line týmy, aby podnik mohl fungovat na vysoké úrovni i bez vaší každodenní účasti — nezbytné pro jakýkoliv exit.",
        "service5.title": "Frakční CX & Provozní Vedení",
        "service5.desc": "Získejte vestavěnou podporu na seniorské úrovni pro řízení komerčního výkonu a současně budujte robustní Exit-Ready operace.",
        "service6.title": "Operace Připravené k Odchodu",
        "service6.desc": "Kompletní Audit Exit-Ready Operací + 90denní Plán Připravenosti. Identifikujte a opravte skryté slabiny, které ničí 30–50 % hodnoty podniku při odchodu.",
        "service6.badge": "Vlajková",
        "exitready.label": "PREMIÉROVÁ NABÍDKA",
        "exitready.title": "Audit Operací Připravených k Odchodu + 90denní Plán",
        "exitready.flagship": "Moje vlajková nabídka.",
        "exitready.desc": "Pomáhám majitelům malých a středních servisních podniků překlenout propast mezi každodenními operacemi a dlouhodobou komerční hodnotou.",
        "exitready.benefit1": "Vyhněte se běžným chybám, které ničí 30–50 % hodnoty při odchodu",
        "exitready.benefit2": "Vybudujte systémy, díky kterým bude váš podnik fungovat a prodávat se bez vás",
        "exitready.benefit3": "Získejte jasný a akční 90denní plán, který zvyšuje důvěru kupujících a valuaci",
        "exitready.cta": "Zjistěte více o programu Exit-Ready",
        "exit.premium": "PREMIÉROVÁ NABÍDKA",
        "exit.title": "Audit Operací Připravených k Odchodu + 90denní Plán",
        "exit.subtitle": "Pomáhám ambiciózním vlastníkům malých a středních servisních podniků budovat operace, které se škálují, dosahují nejvyšší úrovně a jsou plně připravené k odchodu nebo významnému komerčnímu růstu.",
        "exit.strong": "Vyhněte se běžným operačním chybám, které ničí 30–50 % hodnoty podniku při odchodu.",
        "exit.program_label": "PROGRAM",
        "exit.program_title": "Audit Operací Připravených k Odchodu + 90denní Plán",
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
        "exit.how.step3_title": "Analýza Mezer Exit-Ready",
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
        "cta.final.title": "Připraveni učinit váš podnik Exit-Ready?",
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
        "engagements.label": "ZÁVAZKY",
        "engagements.title": "Jasný, kolaborativní proces od prvního dne.",
        "engagements.desc": "Žádné univerzální rámce. Každý závazek začíná hlubokým nasloucháním a končí udržitelnými systémy, které skutečně používáte.",
        "engagements.step1_title": "Objevný hovor",
        "engagements.step1_desc": "Bezplatný 30minutový rozhovor k pochopení vašich největších výzev, cílů a omezení. Žádný pitch — jen jasnost.",
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
        "nav.services": "Služby",
        "nav.results": "Výsledky",
        "nav.in_the_room": "V Místnosti",
        "nav.about": "O mně",
        "nav.how_i_work": "Jak Pracuji",
        "nav.insights": "Insights",
        "nav.contact": "Kontakt",
        "nav.book_call": "Rezervovat Strategický Hovor",
        "hero.location": "GEELONG, AUSTRÁLIE",
        "hero.title": "Operace Připravené k Odchodu &amp; Komerční Růst",
        "hero.subtitle": "Pomáhám ambiciózním vlastníkům servisních podniků budovat operace, které se škálují, dosahují nejvyšší úrovně a jsou plně připravené k odchodu nebo významnému růstu — bez závislosti na vás.",
        "hero.cta_book": "Rezervovat Strategický Hovor",
        "hero.cta_rooms": "Podívejte se na místnosti, ve kterých jsem byl",
        "hero.trust": "Geelong, Austrálie • Spolupráce s lídry servisních podniků po celé Austrálii",
        "inroom.label": "V MÍSTNOSTI",
        "inroom.title": "V místnosti s výjimečnými operátory",
        "inroom.desc": "Měl jsem tu čest pracovat po boku a učit se od některých z nejostřejších myslí v byznysu a výkonu. Tyto zkušenosti formují to, jak pomáhám majitelům servisních podniků stát se skutečně Exit-Ready.",
        "services.label": "JAK POMÁHÁM",
        "services.title": "Strategická podpora pro ambiciózní servisní podniky",
        "services.desc": "Vysokoleverážní podpora pro lídry, kteří chtějí budovat organizace, které konzistentně dodávají na vysoké úrovni.",
        "results.label": "VÝSLEDKY EXIT-READY",
        "results.title": "Typické výsledky pro klienty Exit-Ready",
        "results.outcome1": "Jasné systémy, které snižují závislost na majiteli",
        "results.outcome2": "Vyšší důvěra kupujících během due diligence",
        "results.outcome3": "Silnější komerční výkon při přípravě na exit",
        "results.outcome4": "Vyhnutí se běžným zabijákům valuace",
        "results.note": "Skutečné výsledky přicházejí s realizací projektů.",
        "service1.title": "Strategie Zákaznické Zkušenosti",
        "service1.desc": "Budujte CX systémy, které zvyšují retenci zákazníků, snižují churn a přímo posilují hodnotu podniku pro exit nebo růst.",
        "service2.title": "Vývoj SOP a Návrh Procesů",
        "service2.desc": "Převeďte kmenové znalosti do jasných, zdokumentovaných a škálovatelných systémů, které učiní váš podnik méně závislým na majiteli a připraveným pro kupce.",
        "service3.title": "Systémy Prodeje a Implementace CRM",
        "service3.desc": "Implementujte prověřené systémy provozu příjmů (Zoho CRM a Salesforce), které zajistí předvídatelný růst a čisté finance připravené pro due diligence.",
        "service4.title": "Vedení a Rozvoj Týmů",
        "service4.desc": "Rozviňte své manažery a front-line týmy, aby podnik mohl fungovat na vysoké úrovni i bez vaší každodenní účasti — nezbytné pro jakýkoliv exit.",
        "service5.title": "Frakční CX & Provozní Vedení",
        "service5.desc": "Získejte vestavěnou podporu na seniorské úrovni pro řízení komerčního výkonu a současně budujte robustní Exit-Ready operace.",
        "service6.title": "Operace Připravené k Odchodu",
        "service6.desc": "Kompletní Audit Exit-Ready Operací + 90denní Plán Připravenosti. Identifikujte a opravte skryté slabiny, které ničí 30–50 % hodnoty podniku při odchodu.",
        "service6.badge": "Vlajková",
        roomTitles: [
            "S miliardářským podnikatelem Johnem Catsimatisem a jeho manželkou v New Yorku",
            "S JT Foxxem",
            "S Joe Fosterem, spoluzakladatelem Reeboku",
            "Po boku Toma Bradyho v Melbourne",
            "S Timem Gannonem, spoluzakladatelem Outback Steakhouse, a JT Foxxem"
        ],
        roomStories: [
            `<p>John Catsimatis je samozřejmý miliardář, který vybudoval a rozšířil několik významných podniků v různých odvětvích a vytvořil podstatné bohatství a dlouhodobou hodnotu díky disciplinovanému provádění a strategické vizi.</p><p>Po jeho boku stojí jeho manželka, která byla nedílnou součástí této cesty. Společně představují silný příklad udržitelného obchodního úspěchu na nejvyšší úrovni.</p><p>Být v této místnosti poskytlo přímou blízkost k myšlení a stopě jednotlivců, kteří opakovaně přinášeli výjimečné výsledky zaměřené na výsledky po desetiletí.</p>`,
            `<p>JT Foxx vybudoval některé z největších podnikatelských akcí a high-level mastermind platforem na světě, vytvářející prostředí, kde seriózní vlastníci podniků spojují, získávají kapitál a škálují na sedm a osm číslic.</p><p>Prostřednictvím svých platforem pomohl tisícům podnikatelů vybudovat významné společnosti a vytvořit skutečné bohatství prostřednictvím strategických vztahů a osvědčených rámců růstu.</p><p>Blízkost k této úrovni sítě a provádění poskytuje přímý vhled do toho, co je potřeba k provozu a škálování na nejvyšších úrovních podnikání.</p>`,
            `<p>Joe Foster spoluzaložil Reebok a rozšířil ji z malé britské společnosti na jednu z předních globálních atletických značek na světě, přímo soutěžící s Nike a Adidas na mezinárodní scéně.</p><p>Značka dosáhla miliard v příjmech, stala se kulturní ikonou a byla nakonec získána v transakci v hodnotě několika miliard dolarů.</p><p>Sedět s mužem, který pomohl vybudovat takovou úroveň globálního komerčního úspěchu, poskytuje vzácnou perspektivu na to, co je potřeba k vytvoření trvalých, velkorozměrných podniků.</p>`,
            `<p>Tom Brady je nejoceňovanějším quarterbackem v historii NFL, s rekordními 7 tituly Super Bowl — nejvyšším úspěchem v amerických týmových sportech.</p><p>Mimo atletiku vybudoval osobní značku a obchodní impérium v hodnotě stovek milionů dolarů, včetně platformy pro wellness TB12 a strategických investic do velkých společností.</p><p>Blízkost k někomu, kdo konzistentně přinášel výsledky světové třídy po dvě desetiletí na absolutně nejvyšší úrovni, nabízí silný vhled do udržitelného vysokého výkonu a budování značky ve velkém měřítku.</p>`,
            `<p>Tim Gannon je spoluzakladatelem Outback Steakhouse, jedné z nejikoničtějších a nejúspěšnějších řetězců neformálních restaurací na světě. Pomohl rozšířit koncept z jediné restaurace na globální impérium se stovkami lokalit, poskytující konzistentní kvalitu a silnou značkovou zkušenost v masovém měřítku.</p><p>Jeho hluboká expertíza v pohostinských operacích, týmové kultuře a opakovatelných systémech proměnila odvážnou myšlenku v multimiliardový příběh úspěchu, který ovlivnil celý servisní průmysl.</p><p>Být v místnosti s Timem Gannonem po boku JT Foxxe nabídlo přímý přístup k myšlení a strategiím za budováním trvalých, škálovatelných servisních podniků, které rok co rok přinášejí výjimečné výsledky.</p>`
        ],
        readStory: "Přečíst příběh →",
        moreMoments: "Další momenty z místností s vysokou autoritou k dispozici na vyžádání."
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

    const cards = document.querySelectorAll('#in-the-room .group');
    cards.forEach((card, i) => {
        const p = card.querySelector('.p-5 p');
        if (p && titles[i]) p.textContent = titles[i];
        const span = card.querySelector('.p-5 span');
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
        title: "With billionaire entrepreneur John Catsimatis and his wife in New York",
        image: "assets/in-the-room-ny.jpg",
        story: `
            <p>John Catsimatis is a self-made billionaire who has built and scaled multiple significant enterprises across industries, creating substantial wealth and long-term value through disciplined execution and strategic vision.</p>
            <p>Alongside him stands his wife, who has been an integral part of that journey. Together they represent a powerful example of sustained business success at the highest level.</p>
            <p>Being in this room provided direct proximity to the mindset and track record of individuals who have repeatedly delivered exceptional, result-driven outcomes over decades.</p>
        `
    },
    {
        title: "With JT Foxx",
        image: "assets/in-the-room-jt-foxx.jpg",
        story: `
            <p>JT Foxx has built some of the largest entrepreneur events and high-level mastermind platforms in the world, creating environments where serious business owners connect, raise capital, and scale to seven and eight figures.</p>
            <p>Through his platforms, he has helped thousands of entrepreneurs build significant companies and create real wealth through strategic relationships and proven growth frameworks.</p>
            <p>Proximity to this level of network and execution provides direct insight into what it takes to operate and scale at the highest levels of entrepreneurship.</p>
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
        title: "With Tim Gannon, Co-Founder of Outback Steakhouse, and JT Foxx",
        image: "assets/in-the-room-tim-gannon.jpg",
        story: `
            <p>Tim Gannon is the co-founder of Outback Steakhouse, one of the most iconic and successful casual dining restaurant chains in the world. He helped scale the concept from a single restaurant into a global empire with hundreds of locations, delivering consistent quality and a powerful brand experience at massive scale.</p>
            <p>His deep expertise in hospitality operations, team culture, and repeatable systems turned a bold idea into a multi-billion-dollar success story that has influenced the entire service industry.</p>
            <p>Being in the room with Tim Gannon alongside JT Foxx offered direct access to the mindset and strategies behind building enduring, scalable service businesses that deliver exceptional results year after year.</p>
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

