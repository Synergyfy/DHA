/**
 * Mobile landing page markup (viewport widths < 768px).
 *
 * Body markup extracted from the standalone mobile landing design and
 * localized for Nigeria (Dental Health Authority of Nigeria). Rendered by
 * LandingPage.tsx — do not edit the raw HTML files (they no longer exist).
 */
export const landingMobileHtml = `
<header class="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-16 px-margin flex items-center justify-between"><div class="flex items-center gap-space-xs"><div class="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_2px_4px_rgba(0,97,148,0.15)]"><span class="material-symbols-outlined text-[20px]">dentistry</span></div><div class="flex flex-col"><div class="flex items-center gap-1"><span class="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">DHA</span><span class="font-label-sm text-label-sm uppercase px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">Health</span></div></div></div><div class="flex items-center gap-space-xs" data-auth-actions><div class="flex items-center gap-space-xs" data-auth-signed-out><a class="inline-flex items-center justify-center h-11 px-2 rounded-lg font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors" data-path="login" href="#">Log In</a><a class="hidden sm:inline-flex items-center justify-center h-11 px-space-md rounded-lg bg-primary text-on-primary font-title-sm text-title-sm shadow-sm hover:bg-primary-container transition-colors" data-path="get-started" href="#">Get Started</a></div><div class="relative flex items-center" data-auth-signed-in style="display:none"><button type="button" aria-label="Open account menu" aria-expanded="false" data-avatar-toggle class="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-sm hover:bg-primary-container transition-colors"><span data-avatar-initials>AO</span></button><div data-avatar-menu class="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-surface border border-outline-variant/40 shadow-[0_16px_32px_rgba(0,0,0,0.14)] p-2 z-50 flex flex-col" style="display:none"><div class="px-3 py-2"><div data-avatar-name class="font-title-sm text-title-sm text-on-surface font-semibold truncate">Amara Okafor</div><div data-avatar-role class="font-label-sm text-label-sm text-on-surface-variant">Patient account</div></div><div class="border-t border-outline-variant/40 my-1"></div><a data-path="patient-portal" href="#" class="flex items-center gap-2 rounded-xl px-3 py-2.5 font-title-sm text-title-sm text-on-surface hover:bg-surface-container transition-colors"><span class="material-symbols-outlined text-[18px]">dashboard</span>My Dashboard</a><button type="button" data-sign-out class="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 font-title-sm text-title-sm text-error hover:bg-error-container/40 transition-colors"><span class="material-symbols-outlined text-[18px]">logout</span>Sign Out</button></div></div><button aria-label="Open Menu" aria-expanded="false" data-menu-toggle class="w-11 h-11 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors" type="button"><span class="material-symbols-outlined text-[24px]">menu</span></button></div></div><div data-landing-menu class="flex flex-col gap-1 border-t border-outline-variant/40 bg-surface px-margin pt-3 pb-5 shadow-[0_12px_24px_rgba(0,0,0,0.08)]" style="display:none"><a data-path="home" href="#" class="flex items-center justify-between rounded-lg px-3 py-3 font-title-sm text-title-sm text-on-surface hover:bg-surface-container transition-colors">Home<span class="material-symbols-outlined text-[18px] text-outline">chevron_right</span></a><a data-path="about-dha" href="#" class="flex items-center justify-between rounded-lg px-3 py-3 font-title-sm text-title-sm text-on-surface hover:bg-surface-container transition-colors">About DHA<span class="material-symbols-outlined text-[18px] text-outline">chevron_right</span></a><a data-path="for-professionals" href="#" class="flex items-center justify-between rounded-lg px-3 py-3 font-title-sm text-title-sm text-on-surface hover:bg-surface-container transition-colors">For Professionals<span class="material-symbols-outlined text-[18px] text-outline">chevron_right</span></a><a data-path="oral-health-guides" href="#" class="flex items-center justify-between rounded-lg px-3 py-3 font-title-sm text-title-sm text-on-surface hover:bg-surface-container transition-colors">Oral Health Guides<span class="material-symbols-outlined text-[18px] text-outline">chevron_right</span></a><div data-auth-signed-out class="mt-3 flex gap-2"><a data-path="login" href="#" class="h-11 flex-1 rounded-xl border border-outline-variant/60 flex items-center justify-center font-title-sm text-title-sm text-on-surface hover:bg-surface-container transition-colors">Log In</a><a data-path="get-started" href="#" class="h-11 flex-1 rounded-xl bg-primary text-on-primary flex items-center justify-center font-title-sm text-title-sm shadow-sm hover:bg-primary-container transition-colors">Get Started</a></div><div data-auth-signed-in class="mt-3 flex gap-2" style="display:none"><a data-path="patient-portal" href="#" class="h-11 flex-1 rounded-xl border border-outline-variant/60 flex items-center justify-center gap-2 font-title-sm text-title-sm text-on-surface hover:bg-surface-container transition-colors"><span class="material-symbols-outlined text-[18px]">dashboard</span>My Dashboard</a><button type="button" data-sign-out class="h-11 flex-1 rounded-xl bg-error-container text-error flex items-center justify-center gap-2 font-title-sm text-title-sm hover:bg-error-container/70 transition-colors"><span class="material-symbols-outlined text-[18px]">logout</span>Sign Out</button></div></div></header><main class="flex-1 flex flex-col relative w-full pt-16 pb-safe bg-surface"><div class="sr-only">Public Landing Page</div><div class="flex flex-col w-full text-on-surface">
<!-- 1. HERO SECTION -->
<section class="flex flex-col px-margin pt-space-md pb-space-xl">
<!-- Main Headline -->
<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight">
      Your Oral Health, <span class="text-primary">All in One Place.</span>
</h1>
<!-- Supporting Copy -->
<p class="font-body-md text-body-md text-on-surface-variant mt-space-xs leading-relaxed">
      Take control of your oral health journey. Keep your dental records organised, discover accredited dental care, stay on top of important family reminders, and access trusted clinical information tailored for you.
    </p>
<!-- CTAs -->
<div class="flex flex-col sm:flex-row gap-space-xs mt-space-lg">
<a data-path="get-started" class="h-12 px-space-lg rounded-xl bg-primary text-on-primary font-title-sm text-title-sm flex items-center justify-center gap-2 shadow-sm active:bg-primary-container transition-colors" href="#">
<span>Get Started</span>
<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
<a class="h-12 px-space-lg rounded-xl bg-surface-container text-primary font-title-sm text-title-sm flex items-center justify-center gap-2 active:bg-surface-container-highest transition-colors" href="#manage-section">
<span>Explore DHA</span>
<span class="material-symbols-outlined text-[18px]">expand_more</span>
</a>
</div>
<!-- Key Trust Stats Grid -->
<div class="grid grid-cols-3 gap-2 mt-space-lg p-space-sm rounded-xl bg-surface-container-low text-center">
<div class="flex flex-col items-center">
<span class="material-symbols-outlined text-secondary text-[22px]">verified_user</span>
<span class="font-label-sm text-label-sm text-on-surface font-semibold mt-1">100% Privacy</span>
<span class="font-body-sm text-body-sm text-on-surface-variant scale-90">Full Control</span>
</div>
<div class="flex flex-col items-center border-x-0">
<span class="material-symbols-outlined text-primary text-[22px]">diversity_3</span>
<span class="font-label-sm text-label-sm text-on-surface font-semibold mt-1">Unified Family</span>
<span class="font-body-sm text-body-sm text-on-surface-variant scale-90">All In One</span>
</div>
<div class="flex flex-col items-center">
<span class="material-symbols-outlined text-secondary text-[22px]">domain_verification</span>
<span class="font-label-sm text-label-sm text-on-surface font-semibold mt-1">Accredited</span>
<span class="font-body-sm text-body-sm text-on-surface-variant scale-90">Nigerian Clinics</span>
</div>
</div>
<!-- Hero Visual Card with Clinical Overlay Badge -->
<div class="relative w-full rounded-2xl overflow-hidden mt-space-lg shadow-sm bg-surface-container">
<img class="w-full h-64 object-cover" data-alt="A cheerful Nigerian family portrait: a mother and aunt smiling with their young daughter, bright healthy white teeth and healthy gums" src="https://images.pexels.com/photos/7358409/pexels-photo-7358409.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200"/>
<!-- Clinical Floating Overlay Badge -->
<div class="absolute bottom-3 left-3 right-3 p-space-sm rounded-xl bg-surface/95 backdrop-blur-md shadow-md flex items-center gap-space-xs">
<div class="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[20px]">calendar_month</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-1">
<span class="font-label-sm text-label-sm uppercase font-semibold text-secondary">Next Family Check-up</span>
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm text-on-surface-variant">In 2 weeks</span>
</div>
<p class="font-title-sm text-title-sm text-on-surface truncate">Amara &amp; Tunde • Dr. Nnamdi Obi</p>
</div>
</div>
</div>
</section>
<!-- 2. SECTION: A BETTER WAY TO MANAGE (SLIDING CAROUSEL) -->
<section class="flex flex-col py-space-xl bg-surface-container-low" id="manage-section">
<div class="px-margin flex flex-col">
<div class="inline-flex items-center gap-1 self-start px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
<span>Connected Healthcare Ecosystem</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface mt-2 font-bold">
        A Better Way to Manage Your Oral Health
      </h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">
        DHA brings patients, families and dental professionals together in one connected platform.
      </p>
</div>
<!-- Carousel Container -->
<div class="flex gap-space-md overflow-x-auto snap-x snap-mandatory px-margin mt-space-md pb-space-xs [scrollbar-width:none] [-ms-overflow-style:none]">
<!-- Card 1 -->
<div class="snap-center shrink-0 w-[84vw] max-w-[320px] p-space-lg rounded-2xl bg-surface shadow-sm flex flex-col justify-between">
<div>
<div class="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center mb-space-sm">
<span class="material-symbols-outlined text-[26px]">folder_shared</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Stay organised</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-2">
            Keep your oral health records, screening summaries, digital scans, and complete care history together securely with unified synchronization.
          </p>
</div>
<div class="mt-space-md pt-space-xs flex items-center justify-between">
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-semibold">
<span class="material-symbols-outlined text-[14px]">sync</span>
            NHIA Records Sync
          </span>
<span class="material-symbols-outlined text-outline-variant text-[20px]">arrow_forward</span>
</div>
</div>
<!-- Card 2 -->
<div class="snap-center shrink-0 w-[84vw] max-w-[320px] p-space-lg rounded-2xl bg-surface shadow-sm flex flex-col justify-between">
<div>
<div class="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-space-sm">
<span class="material-symbols-outlined text-[26px]">verified</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Stay connected</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-2">
            Discover accredited dentists and verified clinics available on DHA. Request appointments, share diagnostics, and consult seamlessly.
          </p>
</div>
<div class="mt-space-md pt-space-xs flex items-center justify-between">
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
<span class="material-symbols-outlined text-[14px]">shield</span>
            Verified Practitioner Network
          </span>
<span class="material-symbols-outlined text-outline-variant text-[20px]">arrow_forward</span>
</div>
</div>
<!-- Card 3 -->
<div class="snap-center shrink-0 w-[84vw] max-w-[320px] p-space-lg rounded-2xl bg-surface shadow-sm flex flex-col justify-between">
<div>
<div class="w-12 h-12 rounded-xl bg-surface-container-highest text-tertiary flex items-center justify-center mb-space-sm">
<span class="material-symbols-outlined text-[26px]">notifications_active</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Stay informed</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-2">
            Access useful oral health guidance, timely preventative check-up reminders, and dentist-recommended protocols for the entire household.
          </p>
</div>
<div class="mt-space-md pt-space-xs flex items-center justify-between">
<span class="inline-flex items-center gap-1 font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-high text-tertiary font-semibold">
<span class="material-symbols-outlined text-[14px]">fact_check</span>
            Clinical Preventive Protocols
          </span>
<span class="material-symbols-outlined text-outline-variant text-[20px]">arrow_forward</span>
</div>
</div>
</div>
<!-- Pagination Dots -->
<div class="flex justify-center items-center gap-1.5 mt-space-sm">
<span class="w-6 h-1.5 rounded-full bg-primary"></span>
<span class="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
<span class="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
</div>
</section>
<!-- 3. SECTION: EVERYTHING YOU NEED (4-SLIDE CAROUSEL) -->
<section class="flex flex-col py-space-xl">
<div class="px-margin flex flex-col">
<span class="font-label-sm text-label-sm uppercase font-semibold text-primary">Empowering Tools</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">
        Everything You Need for Your Dental Health Journey
      </h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">
        Empowering tools built to make dental visits clearer, less stressful, and completely transparent.
      </p>
</div>
<!-- 4 Feature Carousel -->
<div class="flex gap-space-md overflow-x-auto snap-x snap-mandatory px-margin mt-space-md pb-space-xs [scrollbar-width:none] [-ms-overflow-style:none]">
<!-- Slide 1 -->
<div class="snap-center shrink-0 w-[82vw] max-w-[300px] p-space-lg rounded-2xl bg-surface-container shadow-sm flex flex-col justify-between">
<div>
<div class="w-11 h-11 rounded-xl bg-surface text-primary flex items-center justify-center mb-space-sm shadow-sm">
<span class="material-symbols-outlined text-[24px]">assignment</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Your Dental Records</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-2">
            Keep screening results, dental examinations, approved clinical summaries, investigations, and treatment history organized in one interactive timeline.
          </p>
</div>
<a data-path="dental-care" class="inline-flex items-center gap-1 font-title-sm text-title-sm text-primary font-semibold mt-space-md" href="#">
<span>Explore Odontogram</span>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
</a>
</div>
<!-- Slide 2 -->
<div class="snap-center shrink-0 w-[82vw] max-w-[300px] p-space-lg rounded-2xl bg-surface-container shadow-sm flex flex-col justify-between">
<div>
<div class="w-11 h-11 rounded-xl bg-surface text-secondary flex items-center justify-center mb-space-sm shadow-sm">
<span class="material-symbols-outlined text-[24px]">local_hospital</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Find Dentists &amp; Clinics</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-2">
            Discover accredited DHA providers across Nigeria, explore specialized clinical services, inspect practitioner credentials, and request bookings.
          </p>
</div>
<a data-path="find-care" class="inline-flex items-center gap-1 font-title-sm text-title-sm text-secondary font-semibold mt-space-md" href="#">
<span>Browse Clinics</span>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
</a>
</div>
<!-- Slide 3 -->
<div class="snap-center shrink-0 w-[82vw] max-w-[300px] p-space-lg rounded-2xl bg-surface-container shadow-sm flex flex-col justify-between">
<div>
<div class="w-11 h-11 rounded-xl bg-surface text-tertiary flex items-center justify-center mb-space-sm shadow-sm">
<span class="material-symbols-outlined text-[24px]">alarm_on</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Reminders &amp; Follow-ups</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-2">
            Stay informed about oral care habits, routine scaling check-ups, post-operative care routines, and dentist-recommended intervals.
          </p>
</div>
<a data-path="care-timeline" class="inline-flex items-center gap-1 font-title-sm text-title-sm text-tertiary font-semibold mt-space-md" href="#">
<span>Care Timelines</span>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
</a>
</div>
<!-- Slide 4 -->
<div class="snap-center shrink-0 w-[82vw] max-w-[300px] p-space-lg rounded-2xl bg-surface-container shadow-sm flex flex-col justify-between">
<div>
<div class="w-11 h-11 rounded-xl bg-surface text-primary flex items-center justify-center mb-space-sm shadow-sm">
<span class="material-symbols-outlined text-[24px]">menu_book</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Learn About Oral Health</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-2">
            Explore helpful articles, clinician videos, interactive tooth anatomy guides, and age-appropriate educational tips for children and adults.
          </p>
</div>
<a data-path="oral-health-guides" class="inline-flex items-center gap-1 font-title-sm text-title-sm text-primary font-semibold mt-space-md" href="#">
<span>View Library</span>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
</a>
</div>
</div>
<!-- 4 Dots -->
<div class="flex justify-center items-center gap-1.5 mt-space-sm">
<span class="w-5 h-1.5 rounded-full bg-primary"></span>
<span class="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
<span class="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
<span class="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
</div>
</section>
<!-- 4. SECTION: YOUR FAMILY'S ORAL HEALTH MATTERS -->
<section class="flex flex-col px-margin py-space-xl bg-surface-container-low rounded-3xl mx-margin">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm font-semibold uppercase text-secondary">Household Continuity</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
      Your Family’s Oral Health Matters
    </h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
      Manage care for all family members under a single secure Nigerian Health identity.
    </p>
<!-- Bullet Highlights -->
<div class="flex flex-col gap-space-xs mt-space-md">
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[16px]">check</span>
</div>
<span class="font-title-sm text-title-sm text-on-surface">Manage your own patient profile</span>
</div>
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[16px]">check</span>
</div>
<span class="font-title-sm text-title-sm text-on-surface">Create and manage profiles for children</span>
</div>
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[16px]">check</span>
</div>
<span class="font-title-sm text-title-sm text-on-surface">Distinct histories for everyone</span>
</div>
</div>
<!-- Interactive Household Oral Hub Card Preview -->
<div class="p-space-md rounded-2xl bg-surface shadow-sm mt-space-lg flex flex-col gap-space-xs">
<div class="flex items-center justify-between pb-space-xs">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[20px]">groups</span>
<span class="font-title-sm text-title-sm font-semibold text-on-surface">Family Hub</span>
</div>
<span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-semibold">3 Active Profiles</span>
</div>
<!-- Member 1 -->
<div class="flex items-center justify-between p-space-xs rounded-xl bg-surface-container-low">
<div class="flex items-center gap-2">
<div class="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-label-sm">AA</div>
<div>
<p class="font-title-sm text-title-sm text-on-surface">Amara Adeyemi</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Primary Account • Routine Care OK</p>
</div>
</div>
<span class="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
</div>
<!-- Member 2 -->
<div class="flex items-center justify-between p-space-xs rounded-xl bg-surface-container-low">
<div class="flex items-center gap-2">
<div class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm">TA</div>
<div>
<p class="font-title-sm text-title-sm text-on-surface">Tunde Adeyemi</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Age 9 • Sealant Checkup Due</p>
</div>
</div>
<span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-semibold">Reminder</span>
</div>
<!-- Member 3 -->
<div class="flex items-center justify-between p-space-xs rounded-xl bg-surface-container-low">
<div class="flex items-center gap-2">
<div class="w-8 h-8 rounded-full bg-surface-container-highest text-tertiary flex items-center justify-center font-bold text-label-sm">KA</div>
<div>
<p class="font-title-sm text-title-sm text-on-surface">Kemi Adeyemi</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Age 4 • First Pediatric Screening</p>
</div>
</div>
<span class="material-symbols-outlined text-secondary text-[20px]">schedule</span>
</div>
</div>
<!-- CTA Button -->
<a data-path="register" class="h-12 w-full mt-space-md rounded-xl bg-primary text-on-primary font-title-sm text-title-sm flex items-center justify-center gap-2 active:bg-primary-container transition-colors shadow-sm" href="#">
<span>Create Your Patient Account</span>
<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
</section>
<!-- 5. SECTION: FIND DENTAL CARE ON DHA (SLIDING DOCTORS CAROUSEL) -->
<section class="flex flex-col py-space-xl">
<div class="px-margin flex flex-col">
<span class="font-label-sm text-label-sm uppercase font-semibold text-secondary">Verified Network</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">
        Find Dental Care on DHA
      </h2>
<!-- Filter Chips Row -->
<div class="flex gap-2 overflow-x-auto mt-space-sm [scrollbar-width:none] [-ms-overflow-style:none]">
<button data-path="services" class="shrink-0 px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]">tune</span>
          All Services
        </button>
<button data-path="search-results" class="shrink-0 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]">verified</span>
          Verified Licenses
        </button>
<button data-path="search-results" class="shrink-0 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]">star</span>
          Top Ratings
        </button>
</div>
</div>
<!-- Doctors & Clinics Carousel -->
<div class="flex gap-space-md overflow-x-auto snap-x snap-mandatory px-margin mt-space-md pb-space-xs [scrollbar-width:none] [-ms-overflow-style:none]">
<!-- Doctor Card 1 -->
<div class="snap-center shrink-0 w-[84vw] max-w-[320px] rounded-2xl bg-surface shadow-sm overflow-hidden flex flex-col">
<div class="relative h-44 w-full bg-surface-container">
<img class="w-full h-full object-cover" data-alt="Portrait of a friendly smiling Nigerian male dentist in a white clinical coat standing in a modern bright dental clinic with a dental chair in the background" src="https://images.pexels.com/photos/5355867/pexels-photo-5355867.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200"/>
<span class="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm">
<span class="material-symbols-outlined text-[14px]">verified</span>
            MDCN Licensed
          </span>
<span class="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-surface/90 text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm">
<span class="material-symbols-outlined text-amber-500 text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
            4.9 (142)
          </span>
</div>
<div class="p-space-md flex flex-col flex-1 justify-between">
<div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Dr. Nnamdi Obi</h3>
<p class="font-body-sm text-body-sm text-primary font-medium mt-0.5">Pediatric Dental Specialist</p>
<p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
<span class="material-symbols-outlined text-[14px]">location_on</span>
              Ikoyi Dental Care, Lagos
            </p>
<div class="mt-2 p-2 rounded-lg bg-surface-container-low flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-secondary text-[16px]">schedule</span>
<span class="font-label-sm text-label-sm">Next Slot: <strong class="text-on-surface">Tomorrow, 10:30 AM</strong></span>
</div>
</div>
<div class="flex items-center gap-2 mt-space-md">
<a data-path="dentist-profile" data-param="nnamdi-obi" class="h-10 flex-1 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm flex items-center justify-center" href="#">Book</a>
<a data-path="dentist-profile" data-param="nnamdi-obi" class="h-10 px-3 rounded-xl bg-surface-container text-primary font-title-sm text-title-sm flex items-center justify-center" href="#">Profile</a>
</div>
</div>
</div>
<!-- Doctor Card 2 -->
<div class="snap-center shrink-0 w-[84vw] max-w-[320px] rounded-2xl bg-surface shadow-sm overflow-hidden flex flex-col">
<div class="relative h-44 w-full bg-surface-container">
<img class="w-full h-full object-cover" data-alt="Close up professional portrait of a cheerful Nigerian female dentist in a white medical coat smiling warmly inside a modern dental clinic" src="https://images.pexels.com/photos/5234473/pexels-photo-5234473.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200"/>
<span class="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm">
<span class="material-symbols-outlined text-[14px]">verified</span>
            MDCN Consultant
          </span>
<span class="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-surface/90 text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm">
<span class="material-symbols-outlined text-amber-500 text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
            5.0 (98)
          </span>
</div>
<div class="p-space-md flex flex-col flex-1 justify-between">
<div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Dr. Amina Bello</h3>
<p class="font-body-sm text-body-sm text-primary font-medium mt-0.5">Orthodontist &amp; Clear Aligners</p>
<p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
<span class="material-symbols-outlined text-[14px]">location_on</span>
              Maitama Healthcare, Abuja
            </p>
<div class="mt-2 p-2 rounded-lg bg-surface-container-low flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-secondary text-[16px]">bolt</span>
<span class="font-label-sm text-label-sm">Next Slot: <strong class="text-on-surface">Today at 4:00 PM</strong></span>
</div>
</div>
<div class="flex items-center gap-2 mt-space-md">
<a data-path="dentist-profile" data-param="amina-bello" class="h-10 flex-1 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm flex items-center justify-center" href="#">Book</a>
<a data-path="dentist-profile" data-param="amina-bello" class="h-10 px-3 rounded-xl bg-surface-container text-primary font-title-sm text-title-sm flex items-center justify-center" href="#">Profile</a>
</div>
</div>
</div>
<!-- Clinic Card 3 -->
<div class="snap-center shrink-0 w-[84vw] max-w-[320px] rounded-2xl bg-surface shadow-sm overflow-hidden flex flex-col">
<div class="relative h-44 w-full bg-surface-container flex items-center justify-center">
<div class="w-16 h-16 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[36px]">domain</span>
</div>
<span class="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm">
<span class="material-symbols-outlined text-[14px]">verified</span>
            Accredited Polyclinic
          </span>
<span class="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-surface/90 text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm">
<span class="material-symbols-outlined text-amber-500 text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
            4.8 (310)
          </span>
</div>
<div class="p-space-md flex flex-col flex-1 justify-between">
<div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Lagos Smile Centre</h3>
<p class="font-body-sm text-body-sm text-primary font-medium mt-0.5">Comprehensive Multi-Speciality Clinic</p>
<p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
<span class="material-symbols-outlined text-[14px]">location_on</span>
              Victoria Island, Lagos
            </p>
<div class="mt-2 p-2 rounded-lg bg-surface-container-low flex items-center gap-1 text-on-surface-variant">
<span class="material-symbols-outlined text-secondary text-[16px]">schedule</span>
<span class="font-label-sm text-label-sm">Open 7 Days • Emergency Dental</span>
</div>
</div>
<div class="flex items-center gap-2 mt-space-md">
<a data-path="clinic-profile" data-param="lagos-smile-centre" class="h-10 flex-1 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm flex items-center justify-center" href="#">View Centre</a>
</div>
</div>
</div>
</div>
<!-- Banner Below Carousel -->
<div class="px-margin mt-space-md">
<a data-path="nearby-care" class="w-full p-space-md rounded-2xl bg-surface-container-high flex items-center justify-between text-primary active:bg-surface-container-highest transition-colors" href="#">
<div class="flex items-center gap-2 min-w-0">
<span class="material-symbols-outlined text-[20px]">near_me</span>
<span class="font-title-sm text-title-sm truncate font-semibold">Find Dental Care Near You</span>
</div>
<span class="material-symbols-outlined text-[20px] shrink-0">arrow_forward</span>
</a>
</div>
</section>
<!-- 6. SECTION: PART OF THE DENTAL HEALTHCARE COMMUNITY (SLIDING) -->
<section class="flex flex-col py-space-xl bg-surface-container-low">
<div class="px-margin flex flex-col">
<h2 class="font-headline-sm text-headline-sm text-on-surface font-bold">
        Part of the Dental Healthcare Community?
      </h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">
        DHA connects certified clinicians, private healthcare facilities, and educational bodies.
      </p>
</div>
<!-- Sliding Secondary Portals -->
<div class="flex gap-space-md overflow-x-auto snap-x snap-mandatory px-margin mt-space-md pb-space-xs [scrollbar-width:none] [-ms-overflow-style:none]">
<!-- Portal 1 -->
<div class="snap-center shrink-0 w-[80vw] max-w-[280px] p-space-md rounded-2xl bg-surface shadow-sm flex flex-col justify-between">
<div>
<div class="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center mb-2">
<span class="material-symbols-outlined text-[22px]">stethoscope</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Dentists &amp; Clinicians</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Access licensing updates, diagnostic standards, and unified digital records workflows.
          </p>
</div>
<a data-path="community-dentists" class="mt-space-md inline-flex items-center gap-1 font-title-sm text-title-sm text-primary font-semibold" href="#">
<span>Professional Access</span>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
</a>
</div>
<!-- Portal 2 -->
<div class="snap-center shrink-0 w-[80vw] max-w-[280px] p-space-md rounded-2xl bg-surface shadow-sm flex flex-col justify-between">
<div>
<div class="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-2">
<span class="material-symbols-outlined text-[22px]">apartment</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Dental Clinics</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Register your clinical facility, streamline patient referrals, and integrate with NHIA.
          </p>
</div>
<a data-path="community-clinics" class="mt-space-md inline-flex items-center gap-1 font-title-sm text-title-sm text-secondary font-semibold" href="#">
<span>Clinic Access</span>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
</a>
</div>
<!-- Portal 3 -->
<div class="snap-center shrink-0 w-[80vw] max-w-[280px] p-space-md rounded-2xl bg-surface shadow-sm flex flex-col justify-between">
<div>
<div class="w-10 h-10 rounded-xl bg-surface-container-highest text-tertiary flex items-center justify-center mb-2">
<span class="material-symbols-outlined text-[22px]">school</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-semibold">Schools &amp; Organisations</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Coordinate public health dental screenings and track child oral preventive milestones.
          </p>
</div>
<a data-path="community-schools" class="mt-space-md inline-flex items-center gap-1 font-title-sm text-title-sm text-tertiary font-semibold" href="#">
<span>Organisation Access</span>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
</a>
</div>
</div>
</section>
<!-- 7. SECTION: GETTING STARTED IS SIMPLE -->
<section class="flex flex-col px-margin py-space-xl">
<div class="flex items-center gap-2">
<span class="w-2 h-2 rounded-full bg-primary"></span>
<span class="font-label-sm text-label-sm font-semibold uppercase text-primary">Onboarding Guide</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
      Getting Started Is Simple
    </h2>
<!-- 4-Step Vertical Stepper -->
<div class="flex flex-col gap-space-md mt-space-lg relative">
<!-- Step 1 -->
<div class="flex items-start gap-space-md">
<div class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-sm shrink-0 shadow-sm">1</div>
<div class="flex flex-col">
<h3 class="font-title-sm text-title-sm text-on-surface font-semibold">Choose Your Account</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Select whether you are accessing for your personal family care or professional medical duty.</p>
</div>
</div>
<!-- Step 2 -->
<div class="flex items-start gap-space-md">
<div class="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-label-sm shrink-0">2</div>
<div class="flex flex-col">
<h3 class="font-title-sm text-title-sm text-on-surface font-semibold">Create Your Profile</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Authenticate securely using your NIN to instantly link verified national health credentials.</p>
</div>
</div>
<!-- Step 3 -->
<div class="flex items-start gap-space-md">
<div class="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-label-sm shrink-0">3</div>
<div class="flex flex-col">
<h3 class="font-title-sm text-title-sm text-on-surface font-semibold">Access DHA Experience</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Review current odontograms, diagnostic reports, treatment schedules, and dental history.</p>
</div>
</div>
<!-- Step 4 -->
<div class="flex items-start gap-space-md">
<div class="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-label-sm shrink-0">4</div>
<div class="flex flex-col">
<h3 class="font-title-sm text-title-sm text-on-surface font-semibold">Stay Connected</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Receive personalized recall alerts, preventive advice, and direct consultation summaries.</p>
</div>
</div>
</div>
</section>
<!-- 8. SECTION: LEARN MORE ABOUT YOUR ORAL HEALTH (SLIDING CAROUSEL) -->
<section class="flex flex-col py-space-xl bg-surface-container-low">
<div class="px-margin flex flex-col">
<span class="font-label-sm text-label-sm uppercase font-semibold text-primary">Patient Education</span>
<h2 class="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">
        Learn More About Your Oral Health
      </h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">
        Evidence-based guidance written and vetted by certified dental practitioners.
      </p>
</div>
<!-- Educational Carousel -->
<div class="flex gap-space-md overflow-x-auto snap-x snap-mandatory px-margin mt-space-md pb-space-xs [scrollbar-width:none] [-ms-overflow-style:none]">
<!-- Guide 1 -->
<div class="snap-center shrink-0 w-[82vw] max-w-[300px] rounded-2xl bg-surface shadow-sm overflow-hidden flex flex-col">
<div class="h-40 w-full bg-surface-container">
<img class="w-full h-full object-cover" data-alt="A Nigerian father in a bright bathroom smiling warmly teaching his young daughter proper tooth brushing technique in the mirror" src="https://images.pexels.com/photos/10566139/pexels-photo-10566139.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200"/>
</div>
<div class="p-space-md flex flex-col justify-between flex-1">
<div>
<span class="font-label-sm text-label-sm text-secondary font-semibold uppercase">Daily Hygiene</span>
<h3 class="font-title-md text-title-md text-on-surface font-semibold mt-1">How to Brush Your Teeth Properly</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Master the modified Bass technique to clean along the gumline without enamel erosion.
            </p>
</div>
<a data-path="guide-brushing" class="mt-space-md inline-flex items-center gap-1 font-title-sm text-title-sm text-primary font-semibold" href="#">
<span>Read Guide</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
<!-- Guide 2 -->
<div class="snap-center shrink-0 w-[82vw] max-w-[300px] rounded-2xl bg-surface shadow-sm overflow-hidden flex flex-col">
<div class="h-40 w-full bg-surface-container">
<img class="w-full h-full object-cover" data-alt="A happy Nigerian father and his young daughter brushing teeth together at the bathroom sink, clean healthy white teeth" src="https://images.pexels.com/photos/12788222/pexels-photo-12788222.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200"/>
</div>
<div class="p-space-md flex flex-col justify-between flex-1">
<div>
<span class="font-label-sm text-label-sm text-tertiary font-semibold uppercase">Pediatric Care</span>
<h3 class="font-title-md text-title-md text-on-surface font-semibold mt-1">Helping Children Build Healthy Oral Habits</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Engaging activities and nutritional choices that protect developing primary teeth.
            </p>
</div>
<a data-path="guide-children" class="mt-space-md inline-flex items-center gap-1 font-title-sm text-title-sm text-tertiary font-semibold" href="#">
<span>Read Guide</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
<!-- Guide 3 -->
<div class="snap-center shrink-0 w-[82vw] max-w-[300px] rounded-2xl bg-surface shadow-sm overflow-hidden flex flex-col">
<div class="h-40 w-full bg-surface-container">
<img alt="Clinical diagnostic checkup at a modern Nigerian clinic" class="w-full h-full object-cover" src="https://images.pexels.com/photos/5622248/pexels-photo-5622248.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200"/>
</div>
<div class="p-space-md flex flex-col justify-between flex-1">
<div>
<span class="font-label-sm text-label-sm text-primary font-semibold uppercase">Preventive Routine</span>
<h3 class="font-title-md text-title-md text-on-surface font-semibold mt-1">Why Regular Dental Check-ups Matter</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Early detection prevents periodontal complications before symptoms develop.
            </p>
</div>
<a data-path="guide-checkups" class="mt-space-md inline-flex items-center gap-1 font-title-sm text-title-sm text-primary font-semibold" href="#">
<span>Read Guide</span>
<span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>
</div>
</div>
</section>
<!-- 9. SECTION: YOUR RECORDS. YOUR PERMISSION. -->
<section class="flex flex-col px-margin py-space-xl">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-[22px]">lock</span>
<span class="font-label-sm text-label-sm font-semibold uppercase text-secondary">Data Sovereignty &amp; Privacy</span>
</div>
<h2 class="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
      Your Records. Your Permission.
    </h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
      You are always in total control. No healthcare clinic or practitioner can view your dental history or images without explicit consent.
    </p>
<!-- Governance Grid -->
<div class="grid grid-cols-2 gap-space-xs mt-space-md">
<div class="p-space-md rounded-2xl bg-surface-container-low flex flex-col">
<span class="material-symbols-outlined text-primary text-[24px]">key</span>
<h3 class="font-title-sm text-title-sm text-on-surface font-semibold mt-2">Patient-Controlled</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Approve or deny record access requests in real-time.</p>
</div>
<div class="p-space-md rounded-2xl bg-surface-container-low flex flex-col">
<span class="material-symbols-outlined text-secondary text-[24px]">checklist</span>
<h3 class="font-title-sm text-title-sm text-on-surface font-semibold mt-2">Granular Sharing</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Share individual tooth charts, X-rays, or full records.</p>
</div>
<div class="p-space-md rounded-2xl bg-surface-container-low flex flex-col">
<span class="material-symbols-outlined text-tertiary text-[24px]">visibility</span>
<h3 class="font-title-sm text-title-sm text-on-surface font-semibold mt-2">Audit Visibility</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Inspect exact timestamps of clinical reads and downloads.</p>
</div>
<div class="p-space-md rounded-2xl bg-surface-container-low flex flex-col">
<span class="material-symbols-outlined text-error text-[24px]">block</span>
<h3 class="font-title-sm text-title-sm text-on-surface font-semibold mt-2">Revoke Instantly</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Terminate practitioner access with one tap at any time.</p>
</div>
</div>
</section>
<!-- 10. FINAL CTA BANNER & MOBILE FOOTER -->
<section class="flex flex-col px-margin py-space-xl">
<!-- High-Contrast Navy Action Card -->
<div class="p-space-lg rounded-3xl bg-inverse-surface text-inverse-on-surface shadow-xl flex flex-col relative overflow-hidden">
<div class="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-primary/20 blur-2xl pointer-events-none"></div>
<span class="font-label-sm text-label-sm uppercase font-semibold text-primary-fixed-dim">Dental Health Authority of Nigeria</span>
<h2 class="font-headline-lg-mobile text-headline-lg-mobile font-bold mt-1 text-on-primary-container">
        Take the First Step Towards Better Oral Health
      </h2>
<p class="font-body-md text-body-md text-surface-container-highest mt-2">
        Join thousands of Nigerian residents managing their oral wellness through a unified clinical network.
      </p>
<div class="flex flex-col gap-space-xs mt-space-lg">
<a data-path="get-started" class="h-12 w-full rounded-xl bg-primary text-on-primary font-title-sm text-title-sm flex items-center justify-center gap-2 shadow-sm" href="#">
<span>Get Started</span>
<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
<a data-path="explore-portal" class="h-12 w-full rounded-xl bg-inverse-surface text-inverse-on-surface font-title-sm text-title-sm flex items-center justify-center" href="#">
          Explore DHA Portal
        </a>
</div>
</div>
</section>
<!-- Mobile Footer -->
<footer class="flex flex-col px-margin pt-space-lg pb-space-2xl bg-surface-container text-on-surface-variant">
<div class="flex items-center gap-2 mb-space-md">
<div class="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[18px]">dentistry</span>
</div>
<span class="font-headline-sm text-headline-sm font-bold text-primary">DHA Oral Health</span>
</div>
<!-- Quick Links Grid -->
<div class="grid grid-cols-2 gap-space-md mb-space-lg">
<div class="flex flex-col gap-2">
<span class="font-label-md text-label-md font-semibold text-on-surface uppercase">For Patients</span>
<a data-path="find-care" class="font-body-sm text-body-sm hover:text-primary" href="#">Find a Dentist</a>
<a data-path="family-profiles" class="font-body-sm text-body-sm hover:text-primary" href="#">Family Profiles</a>
<a data-path="dental-records" class="font-body-sm text-body-sm hover:text-primary" href="#">Dental Records</a>
<a data-path="oral-health-guides" class="font-body-sm text-body-sm hover:text-primary" href="#">Oral Health Library</a>
</div>
<div class="flex flex-col gap-2">
<span class="font-label-md text-label-md font-semibold text-on-surface uppercase">Healthcare Network</span>
<a data-path="clinician-login" class="font-body-sm text-body-sm hover:text-primary" href="#">Clinician Login</a>
<a data-path="clinic-registration" class="font-body-sm text-body-sm hover:text-primary" href="#">Clinic Registration</a>
<a data-path="Nigeria Health Information Exchange-integration" class="font-body-sm text-body-sm hover:text-primary" href="#">NHIA Guidelines</a>
<a data-path="school-programs" class="font-body-sm text-body-sm hover:text-primary" href="#">School Programs</a>
</div>
</div>
<!-- Compliance & Trust Strip -->
<div class="p-space-sm rounded-xl bg-surface text-on-surface-variant flex flex-col gap-1 mb-space-md">
<div class="flex items-center gap-1.5 text-secondary font-semibold font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">verified_user</span>
        NHIA Connected &amp; NDPR/NDPA Compliant
      </div>
<p class="font-body-sm text-body-sm text-outline">
        All diagnostic data is encrypted under Dental Health Authority of Nigeria data governance directives and the Nigeria Data Protection Act (NDPA).
      </p>
</div>
<!-- Copyright -->
<div class="flex flex-col items-center justify-between gap-2 pt-space-xs text-center">
<p class="font-body-sm text-body-sm text-outline">
        © 2025 Dental Health Authority of Nigeria (DHA). All rights reserved.
      </p>
</div>
</footer>
</div></main>
`;
