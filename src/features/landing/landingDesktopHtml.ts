/**
 * Desktop landing page markup (viewport widths >= 768px).
 *
 * Body markup extracted from the standalone desktop landing design and
 * localized for Nigeria (Dental Health Authority of Nigeria). Rendered by
 * LandingPage.tsx — do not edit the raw HTML files (they no longer exist).
 */
export const landingDesktopHtml = `
<header class="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-20 max-w-[1280px] mx-auto px-margin-desktop flex items-center justify-between gap-space-md"><div class="flex items-center gap-space-xs"><div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm"><span class="material-symbols-outlined text-[24px]">dentistry</span></div><div class="flex flex-col"><span class="font-headline-sm text-headline-sm text-on-surface leading-tight tracking-tight">DHA</span><span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Dental Health</span></div></div><nav class="hidden xl:flex items-center gap-space-xs" data-active-classes="bg-primary-container text-on-primary-container font-title-sm text-title-sm rounded-lg"><a aria-current="page" class="px-space-sm py-space-xs transition-colors bg-primary-container text-on-primary-container font-title-sm text-title-sm rounded-lg" data-path="home" href="#">Home</a><a class="px-space-sm py-space-xs rounded-lg font-title-sm text-title-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" data-path="about-dha" href="#">About DHA</a><a class="px-space-sm py-space-xs rounded-lg font-title-sm text-title-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" data-path="for-professionals" href="#">For Professionals</a><a class="px-space-sm py-space-xs rounded-lg font-title-sm text-title-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" data-path="oral-health-guides" href="#">Oral Health Guides</a></nav><div class="flex items-center gap-space-md" data-auth-actions><div class="flex items-center gap-space-md" data-auth-signed-out><a class="font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors px-space-xs py-space-xs" data-path="login" href="#">Log In</a><a class="hidden sm:inline-flex items-center justify-center h-12 px-space-lg rounded-xl bg-primary text-on-primary font-title-sm text-title-sm hover:bg-primary-container transition-colors shadow-sm" data-path="get-started" href="#">Get Started</a></div><div class="relative flex items-center" data-auth-signed-in style="display:none"><button type="button" aria-label="Open account menu" aria-expanded="false" data-avatar-toggle class="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-title-sm text-title-sm font-bold shadow-sm hover:bg-primary-container transition-colors"><span data-avatar-initials>AO</span></button><div data-avatar-menu class="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-surface border border-outline-variant/40 shadow-[0_16px_32px_rgba(0,0,0,0.14)] p-2 z-50 flex flex-col" style="display:none"><div class="px-3 py-2"><div data-avatar-name class="font-title-sm text-title-sm text-on-surface font-semibold truncate">Amara Okafor</div><div data-avatar-role class="font-label-sm text-label-sm text-on-surface-variant">Patient account</div></div><div class="border-t border-outline-variant/40 my-1"></div><a data-path="patient-portal" href="#" class="flex items-center gap-2 rounded-xl px-3 py-2.5 font-title-sm text-title-sm text-on-surface hover:bg-surface-container transition-colors"><span class="material-symbols-outlined text-[18px]">dashboard</span>My Dashboard</a><button type="button" data-sign-out class="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 font-title-sm text-title-sm text-error hover:bg-error-container/40 transition-colors"><span class="material-symbols-outlined text-[18px]">logout</span>Sign Out</button></div></div><button aria-label="Open Menu" aria-expanded="false" data-menu-toggle class="xl:hidden w-11 h-11 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors" type="button"><span class="material-symbols-outlined text-[24px]">menu</span></button></div></div><div data-landing-menu class="flex flex-col border-t border-outline-variant/30 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_12px_24px_rgba(0,0,0,0.06)]" style="display:none"><div class="max-w-[1280px] mx-auto w-full px-margin-desktop py-space-md flex flex-col gap-1"><a data-path="home" href="#" class="px-space-sm py-3 rounded-lg font-title-sm text-title-sm text-on-surface hover:bg-surface-container transition-colors">Home</a><a data-path="about-dha" href="#" class="px-space-sm py-3 rounded-lg font-title-sm text-title-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">About DHA</a><a data-path="for-professionals" href="#" class="px-space-sm py-3 rounded-lg font-title-sm text-title-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">For Professionals</a><a data-path="oral-health-guides" href="#" class="px-space-sm py-3 rounded-lg font-title-sm text-title-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">Oral Health Guides</a><div class="flex items-center gap-space-md pt-3 mt-1 border-t border-outline-variant/30" data-auth-signed-out><a data-path="login" href="#" class="font-title-sm text-title-sm text-on-surface-variant hover:text-primary transition-colors px-space-xs py-space-xs">Log In</a><a data-path="get-started" href="#" class="inline-flex items-center justify-center h-11 px-space-lg rounded-xl bg-primary text-on-primary font-title-sm text-title-sm hover:bg-primary-container transition-colors shadow-sm">Get Started</a></div><div class="flex items-center gap-space-md pt-3 mt-1 border-t border-outline-variant/30" data-auth-signed-in style="display:none"><a data-path="patient-portal" href="#" class="inline-flex items-center gap-2 h-11 px-space-lg rounded-xl border border-outline-variant/60 font-title-sm text-title-sm text-on-surface hover:bg-surface-container transition-colors"><span class="material-symbols-outlined text-[18px]">dashboard</span>My Dashboard</a><button type="button" data-sign-out class="inline-flex items-center gap-2 h-11 px-space-lg rounded-xl bg-error-container text-error font-title-sm text-title-sm hover:bg-error-container/70 transition-colors"><span class="material-symbols-outlined text-[18px]">logout</span>Sign Out</button></div></div></div></header><main class="w-full pt-20 bg-transparent flex-1"><div class="flex flex-col w-full">
<!-- SECTION 2: HERO SECTION -->
<section class="w-full max-w-[1440px] mx-auto px-margin-desktop py-space-xl">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
<!-- Hero Left Column -->
<div class="lg:col-span-6 flex flex-col gap-space-lg">
<div class="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container">
<span class="material-symbols-outlined text-[16px]">verified</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Caring for healthy smiles together</span>
</div>
<div class="flex flex-col gap-space-xs">
<h1 class="font-display-lg text-display-lg text-on-surface leading-tight tracking-tight text-balance">
            Your Oral Health, <span class="text-primary">All in One Place.</span>
</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-xl">
            Take control of your oral health journey. Keep your dental records organised, discover accredited dental care, stay on top of important family reminders, and access trusted clinical information tailored for you.
          </p>
</div>
<!-- Action CTAs -->
<div class="flex flex-wrap items-center gap-space-md pt-space-xs">
<a class="inline-flex items-center justify-center h-12 px-space-xl rounded-xl bg-primary text-on-primary font-title-sm text-title-sm hover:bg-primary-container shadow-md transition-all duration-200 hover:-translate-y-0.5" data-path="get-started" href="#">
            Get Started
            <span class="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
</a>
<a class="inline-flex items-center justify-center h-12 px-space-lg rounded-xl bg-surface-container-low text-on-surface font-title-sm text-title-sm hover:bg-surface-container shadow-sm transition-all duration-200" href="#how-it-works">
            Explore DHA
            <span class="material-symbols-outlined ml-1.5 text-[18px] text-on-surface-variant">expand_more</span>
</a>
</div>
<!-- Hero Stats Row -->
<div class="pt-space-md grid grid-cols-3 gap-space-md">
<div class="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low/70">
<div class="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
<span class="material-symbols-outlined text-[18px]">lock</span>
</div>
<div class="flex flex-col">
<span class="font-title-sm text-title-sm text-on-surface font-bold">100%</span>
<span class="font-body-sm text-body-sm text-on-surface-variant leading-tight">Privacy Control</span>
</div>
</div>
<div class="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low/70">
<div class="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm shrink-0">
<span class="material-symbols-outlined text-[18px]">family_restroom</span>
</div>
<div class="flex flex-col">
<span class="font-title-sm text-title-sm text-on-surface font-bold">Unified</span>
<span class="font-body-sm text-body-sm text-on-surface-variant leading-tight">Family Records</span>
</div>
</div>
<div class="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low/70">
<div class="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-tertiary shadow-sm shrink-0">
<span class="material-symbols-outlined text-[18px]">local_hospital</span>
</div>
<div class="flex flex-col">
<span class="font-title-sm text-title-sm text-on-surface font-bold">Accredited</span>
<span class="font-body-sm text-body-sm text-on-surface-variant leading-tight">Nigerian Clinics</span>
</div>
</div>
</div>
</div>
<!-- Hero Right Column: High-Fidelity Interactive Visual Showcase -->
<div class="lg:col-span-6 relative">
<div class="relative w-full h-[480px] rounded-3xl overflow-hidden shadow-xl bg-surface-container-low">
<!-- Background Scene Photograph -->
<img class="w-full h-full object-cover" data-alt="A warm, bright Nigerian family dental visit: a father and his young daughter reviewing a dental X-ray with a dentist at a modern clinic in Lagos, natural sunlight and calm clinical interior" src="https://images.pexels.com/photos/6502163/pexels-photo-6502163.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200">
<!-- Subtle Gradient Scrim -->
<div class="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent"></div>
<!-- Top Floating Preventive Pill -->
<div class="absolute top-5 left-5 right-5 flex justify-between items-center pointer-events-none">
<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-md">
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span class="font-label-sm text-label-sm font-semibold text-on-surface">Restorative &amp; Preventive</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">• Safe Dental Monitoring</span>
</div>
<div class="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-primary shadow-md">
<span class="material-symbols-outlined text-[20px]">shield</span>
</div>
</div>
<!-- Bottom Floating Checkup Card -->
<div class="absolute bottom-5 left-5 right-5 p-space-md rounded-2xl bg-surface-container-lowest/95 backdrop-blur-xl shadow-lg flex items-center justify-between">
<div class="flex items-center gap-3.5">
<div class="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
<span class="material-symbols-outlined text-[24px]">calendar_month</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-title-sm text-title-sm text-on-surface font-semibold">Next Family Check-up</span>
<span class="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">In 2 weeks</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Amara &amp; Tunde • Dr. Nnamdi Obi (Ikoyi Clinic)</span>
</div>
</div>
<a data-path="family-reminders" class="hidden sm:inline-flex items-center justify-center h-9 px-3 rounded-lg bg-surface-container text-primary font-title-sm text-title-sm hover:bg-surface-container-high transition-colors" href="#">
              Manage
            </a>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 3: INTRODUCTION SECTION (3-Column Feature Grid) -->
<section class="w-full bg-surface-container-low/50 py-space-2xl">
<div class="max-w-[1440px] mx-auto px-margin-desktop flex flex-col gap-space-xl">
<div class="flex flex-col items-center text-center gap-space-xs max-w-2xl mx-auto">
<span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-surface-container-high">
          Connected Healthcare Ecosystem
        </span>
<h2 class="font-headline-lg text-headline-lg text-on-surface">
          A Better Way to Manage Your Oral Health
        </h2>
<p class="font-body-md text-body-md text-on-surface-variant">
          DHA establishes a unified bridge between residents, certified clinicians, and health data intelligence.
        </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
<!-- Card 1 -->
<div class="flex flex-col gap-space-md p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[26px]">folder_managed</span>
</div>
<div class="flex flex-col gap-1.5">
<h3 class="font-headline-sm text-headline-sm text-on-surface">Stay organised</h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Keep your oral health records, screening summaries, digital scans, and complete care history together securely with unified synchronization.
            </p>
</div>
<div class="mt-auto pt-space-xs flex items-center gap-1.5 text-primary font-title-sm text-title-sm">
<span>NHIA Records Sync</span>
<span class="material-symbols-outlined text-[16px]">check_circle</span>
</div>
</div>
<!-- Card 2 -->
<div class="flex flex-col gap-space-md p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[26px]">hub</span>
</div>
<div class="flex flex-col gap-1.5">
<h3 class="font-headline-sm text-headline-sm text-on-surface">Stay connected</h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Discover accredited dentists and verified clinics available on DHA. Request appointments, share diagnostics, and consult seamlessly.
            </p>
</div>
<div class="mt-auto pt-space-xs flex items-center gap-1.5 text-secondary font-title-sm text-title-sm">
<span>Verified Practitioner Network</span>
<span class="material-symbols-outlined text-[16px]">verified</span>
</div>
</div>
<!-- Card 3 -->
<div class="flex flex-col gap-space-md p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div class="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined text-[26px]">auto_stories</span>
</div>
<div class="flex flex-col gap-1.5">
<h3 class="font-headline-sm text-headline-sm text-on-surface">Stay informed</h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Access useful oral health guidance, timely preventative check-up reminders, and dentist-reviewed recommendations for the entire household.
            </p>
</div>
<div class="mt-auto pt-space-xs flex items-center gap-1.5 text-tertiary font-title-sm text-title-sm">
<span>Clinical Preventive Protocols</span>
<span class="material-symbols-outlined text-[16px]">menu_book</span>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 4: COMPREHENSIVE FEATURES (4-Column Bento Interactive Cards) -->
<section class="w-full max-w-[1440px] mx-auto px-margin-desktop py-space-2xl">
<div class="flex flex-col gap-space-xl">
<div class="flex flex-col max-w-2xl gap-2">
<h2 class="font-headline-lg text-headline-lg text-on-surface">
          Everything You Need for Your Dental Health Journey
        </h2>
<p class="font-body-md text-body-md text-on-surface-variant">
          Empowering tools built to make dental visits clearer, less stressful, and completely transparent for your loved ones.
        </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
<!-- Feature 1: Your Dental Records -->
<div class="group flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300">
<div class="flex flex-col gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
<span class="material-symbols-outlined text-[22px]">dentistry</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Your Dental Records</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
              Keep screening results, dental examinations, approved clinical summaries, investigations, and treatment history organized in one interactive timeline.
            </p>
</div>
<div class="pt-space-md">
<a class="inline-flex items-center text-primary font-title-sm text-title-sm group-hover:translate-x-1 transition-transform" data-path="dental-care" href="#">
              Explore Odontogram <span class="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
</a>
</div>
</div>
<!-- Feature 2: Find Dentists & Clinics -->
<div class="group flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300">
<div class="flex flex-col gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
<span class="material-symbols-outlined text-[22px]">domain</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Find Dentists &amp; Clinics</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
              Discover accredited DHA providers across Nigeria, explore specialized clinical services, inspect practitioner credentials, and request bookings.
            </p>
</div>
<div class="pt-space-md">
<a class="inline-flex items-center text-secondary font-title-sm text-title-sm group-hover:translate-x-1 transition-transform" data-path="find-care" href="#">
              Browse Clinics <span class="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
</a>
</div>
</div>
<!-- Feature 3: Reminders & Follow-ups -->
<div class="group flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300">
<div class="flex flex-col gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
<span class="material-symbols-outlined text-[22px]">notifications_active</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Reminders &amp; Follow-ups</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
              Stay informed about oral care habits, routine scaling check-ups, post-operative care routines, and dentist-recommended intervals.
            </p>
</div>
<div class="pt-space-md">
<a class="inline-flex items-center text-tertiary font-title-sm text-title-sm group-hover:translate-x-1 transition-transform" data-path="care-timeline" href="#">
              Care Timelines <span class="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
</a>
</div>
</div>
<!-- Feature 4: Learn About Oral Health -->
<div class="group flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300">
<div class="flex flex-col gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
<span class="material-symbols-outlined text-[22px]">menu_book</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Learn About Oral Health</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
              Explore helpful articles, clinician videos, interactive tooth anatomy guides, and age-appropriate educational tips for children and adults.
            </p>
</div>
<div class="pt-space-md">
<a class="inline-flex items-center text-primary font-title-sm text-title-sm group-hover:translate-x-1 transition-transform" data-path="oral-health-guides" href="#">
              View Library <span class="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 5: PATIENTS & FAMILIES SECTION (2-Column Layout) -->
<section class="w-full bg-surface-container-low/60 py-space-2xl">
<div class="max-w-[1440px] mx-auto px-margin-desktop">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
<!-- Left Column: Copy & Actions -->
<div class="lg:col-span-6 flex flex-col gap-space-lg">
<div class="flex flex-col gap-space-xs">
<span class="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-widest">
              Unified Household Ecosystem
            </span>
<h2 class="font-headline-lg text-headline-lg text-on-surface">
              Your Family's Oral Health Matters
            </h2>
<p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Managing oral health shouldn't require separate portals for everyone in your home. DHA enables unified guardian accounts that maintain clinical confidentiality while making childhood screening schedules effortless.
            </p>
</div>
<div class="flex flex-col gap-space-sm">
<div class="flex items-start gap-3">
<div class="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">
<span class="material-symbols-outlined text-[16px]">check</span>
</div>
<div class="flex flex-col">
<span class="font-title-sm text-title-sm text-on-surface font-semibold">Manage your own patient profile</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Instant access to verified adult diagnostics, restorative histories, and digital X-ray records.</span>
</div>
</div>
<div class="flex items-start gap-3">
<div class="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">
<span class="material-symbols-outlined text-[16px]">check</span>
</div>
<div class="flex flex-col">
<span class="font-title-sm text-title-sm text-on-surface font-semibold">Create and manage profiles for children</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Seamless school screening sync, pediatric dental tracking, and orthodontic monitoring.</span>
</div>
</div>
<div class="flex items-start gap-3">
<div class="w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">
<span class="material-symbols-outlined text-[16px]">check</span>
</div>
<div class="flex flex-col">
<span class="font-title-sm text-title-sm text-on-surface font-semibold">Distinct histories for everyone</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Protected, encrypted profiles with independent diagnostic trails under a single family hub.</span>
</div>
</div>
</div>
<div class="pt-space-xs">
<a class="inline-flex items-center justify-center h-12 px-space-lg rounded-xl bg-primary text-on-primary font-title-sm text-title-sm hover:bg-primary-container shadow-md transition-all" data-path="register" href="#">
              Create Your Patient Account
              <span class="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
</a>
</div>
</div>
<!-- Right Column: Interactive 'Household Oral Hub' Card Preview -->
<div class="lg:col-span-6">
<div class="p-space-lg rounded-3xl bg-surface-container-lowest shadow-xl flex flex-col gap-space-md">
<div class="flex items-center justify-between pb-space-xs">
<div class="flex items-center gap-space-xs">
<div class="w-10 h-10 rounded-xl bg-secondary-container/60 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[22px]">family_restroom</span>
</div>
<div>
<h4 class="font-title-md text-title-md text-on-surface font-bold">Household Oral Hub</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Adeyemi Family • 3 Linked Members</p>
</div>
</div>
<div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[14px] text-secondary">lock</span>
<span>Protected</span>
</div>
</div>
<!-- Member 1: Amara (Primary Adult) -->
<div class="p-space-md rounded-2xl bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors">
<div class="flex items-center gap-3">
<div class="w-11 h-11 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-title-md">
                  AA
                </div>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-title-sm text-title-sm text-on-surface font-semibold">Amara Adeyemi</span>
<span class="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">Primary Adult</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">Last cleaning: 3 months ago • Scaling Up to Date</span>
</div>
</div>
<div class="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">verified</span>
<span>Synced</span>
</div>
</div>
<!-- Member 2: Tunde (Child) -->
<div class="p-space-md rounded-2xl bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors">
<div class="flex items-center gap-3">
<div class="w-11 h-11 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-title-md">
                  TA
                </div>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-title-sm text-title-sm text-on-surface font-semibold">Tunde Adeyemi</span>
<span class="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">Age 9</span>
</div>
<span class="font-body-sm text-body-sm text-secondary font-medium">Lagos School Screening Complete • Grade 4</span>
</div>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
</div>
<!-- Member 3: Kemi (Toddler) -->
<div class="p-space-md rounded-2xl bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors">
<div class="flex items-center gap-3">
<div class="w-11 h-11 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-title-md">
                  KA
                </div>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-title-sm text-title-sm text-on-surface font-semibold">Kemi Adeyemi</span>
<span class="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">Age 4</span>
</div>
<span class="font-body-sm text-body-sm text-error font-medium">First Pediatric Checkup Due Soon</span>
</div>
</div>
<a data-path="book-slot" class="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-sm hover:bg-primary hover:text-on-primary transition-all" href="#">
                Book Slot
              </a>
</div>
<!-- Bottom summary pill -->
<div class="p-3 rounded-xl bg-surface-container flex items-center justify-between">
<span class="font-body-sm text-body-sm text-on-surface-variant">Automated NHIA family immunization &amp; oral sync</span>
<span class="font-label-code text-label-code text-secondary font-semibold">SYNC ACTIVE</span>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 6: DENTAL PROVIDER DISCOVERY -->
<section class="w-full max-w-[1440px] mx-auto px-margin-desktop py-space-2xl">
<div class="flex flex-col gap-space-xl">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div class="flex flex-col gap-2 max-w-xl">
<span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest">
            Verified Network
          </span>
<h2 class="font-headline-lg text-headline-lg text-on-surface">
            Find Dental Care on DHA
          </h2>
<p class="font-body-md text-body-md text-on-surface-variant">
            Discover dentists and dental clinics across Nigeria. Explore their services, specialties, verified credentials, and appointment options.
          </p>
</div>
<!-- Filter Pill Tags -->
<div class="flex flex-wrap gap-2">
<span class="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1.5">
<span class="material-symbols-outlined text-[14px]">tune</span> Search by service &amp; speciality
          </span>
<span class="px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1.5">
<span class="material-symbols-outlined text-[14px] text-secondary">verified</span> Verified Licenses
          </span>
<span class="px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1.5">
<span class="material-symbols-outlined text-[14px]">reviews</span> Patient ratings
          </span>
</div>
</div>
<!-- 3-Column Doctor / Clinic Showcase Cards -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
<!-- Card 1: Dr. Nnamdi Obi -->
<div class="flex flex-col rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
<div class="relative h-48 bg-surface-container-high">
<img class="w-full h-full object-cover" data-alt="A portrait of Dr. Nnamdi Obi, an experienced male Nigerian pediatric dental specialist in clean clinical scrubs, warm reassuring expression in a modern dental clinic with gentle lighting" src="https://images.pexels.com/photos/5355862/pexels-photo-5355862.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200">
<div class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1 text-on-surface font-label-sm text-label-sm shadow-sm">
<span class="material-symbols-outlined text-[14px] text-amber-500 fill-1">star</span>
<span class="font-bold">4.9</span>
<span class="text-on-surface-variant">(142)</span>
</div>
</div>
<div class="p-space-lg flex flex-col gap-space-sm flex-1 justify-between">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[16px]">verified</span>
                MDCN LICENSED CLINICIAN
              </div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Dr. Nnamdi Obi</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Pediatric Dental Specialist • Ikoyi Dental Care, Lagos</p>
<div class="flex items-center gap-1.5 pt-2 text-secondary font-label-sm text-label-sm">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span>Next Slot: Tomorrow at 10:30 AM</span>
</div>
</div>
<div class="pt-space-sm">
<a data-path="dentist-profile" data-param="nnamdi-obi" class="w-full inline-flex items-center justify-center h-11 rounded-xl bg-surface-container-high text-primary font-title-sm text-title-sm hover:bg-primary hover:text-on-primary transition-all" href="#">
                View Profile
              </a>
</div>
</div>
</div>
<!-- Card 2: Dr. Amina Bello -->
<div class="flex flex-col rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
<div class="relative h-48 bg-surface-container-high">
<img class="w-full h-full object-cover" data-alt="A portrait of Dr. Amina Bello, a Nigerian female orthodontic specialist in a medical coat, smiling warmly in a bright modern orthodontics studio" src="https://images.pexels.com/photos/5234472/pexels-photo-5234472.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200">
<div class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1 text-on-surface font-label-sm text-label-sm shadow-sm">
<span class="material-symbols-outlined text-[14px] text-amber-500 fill-1">star</span>
<span class="font-bold">5.0</span>
<span class="text-on-surface-variant">(98)</span>
</div>
</div>
<div class="p-space-lg flex flex-col gap-space-sm flex-1 justify-between">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[16px]">verified</span>
                MDCN CONSULTANT ORTHODONTIST
              </div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Dr. Amina Bello</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Orthodontist &amp; Clear Aligners • Maitama, Abuja</p>
<div class="flex items-center gap-1.5 pt-2 text-secondary font-label-sm text-label-sm">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span>Next Slot: Available Today at 4:00 PM</span>
</div>
</div>
<div class="pt-space-sm">
<a data-path="dentist-profile" data-param="amina-bello" class="w-full inline-flex items-center justify-center h-11 rounded-xl bg-surface-container-high text-primary font-title-sm text-title-sm hover:bg-primary hover:text-on-primary transition-all" href="#">
                View Profile
              </a>
</div>
</div>
</div>
<!-- Card 3: Lagos Smile Centre -->
<div class="flex flex-col rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
<div class="relative h-48 bg-surface-container-high">
<img class="w-full h-full object-cover" data-alt="A modern dental clinic reception in Lagos with sleek minimalist white counters, warm ambient lighting, comfortable waiting lounge, and clean dental examination suites in the background" src="https://images.pexels.com/photos/6809645/pexels-photo-6809645.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200">
<div class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1 text-on-surface font-label-sm text-label-sm shadow-sm">
<span class="material-symbols-outlined text-[14px] text-amber-500 fill-1">star</span>
<span class="font-bold">4.8</span>
<span class="text-on-surface-variant">(310)</span>
</div>
</div>
<div class="p-space-lg flex flex-col gap-space-sm flex-1 justify-between">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[16px]">domain_verification</span>
                ACCREDITED POLYCLINIC
              </div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Lagos Smile Centre</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Comprehensive Multi-Speciality Clinic • Victoria Island, Lagos</p>
<div class="flex items-center gap-1.5 pt-2 text-on-surface-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[14px]">schedule</span>
<span>Open 7 Days • Emergency Dental Available</span>
</div>
</div>
<div class="pt-space-sm">
<a data-path="clinic-profile" data-param="lagos-smile-centre" class="w-full inline-flex items-center justify-center h-11 rounded-xl bg-surface-container-high text-primary font-title-sm text-title-sm hover:bg-primary hover:text-on-primary transition-all" href="#">
                View Centre
              </a>
</div>
</div>
</div>
</div>
<!-- Full-Width CTA Discovery Bar -->
<div class="w-full p-space-lg rounded-2xl bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md shadow-sm">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-[22px]">near_me</span>
</div>
<div class="flex flex-col">
<span class="font-title-sm text-title-sm text-on-surface font-semibold">Looking for clinic facilities near your district?</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Filter by NHIA coverage, weekend availability, or pediatric specialists.</span>
</div>
</div>
<a data-path="nearby-care" class="inline-flex items-center justify-center h-11 px-space-lg rounded-xl bg-primary text-on-primary font-title-sm text-title-sm hover:bg-primary-container transition-all shrink-0" href="#">
          Find Dental Care Near You
        </a>
</div>
</div>
</section>
<!-- SECTION 7: PROFESSIONAL & HEALTHCARE GOVERNANCE -->
<section class="w-full bg-surface-container-low/70 py-space-2xl">
<div class="max-w-[1440px] mx-auto px-margin-desktop flex flex-col gap-space-xl">
<div class="flex flex-col max-w-2xl gap-2">
<span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest">
          Healthcare Governance &amp; Ecosystem
        </span>
<h2 class="font-headline-lg text-headline-lg text-on-surface">
          Part of the Dental Healthcare Community?
        </h2>
<p class="font-body-md text-body-md text-on-surface-variant">
          DHA connects certified clinicians, private healthcare facilities, and educational bodies to standardize oral hygiene and clinical tracking across Nigeria.
        </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
<!-- 1: Dentists & Dental Professionals -->
<div class="flex flex-col justify-between p-space-lg rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div class="flex flex-col gap-space-sm">
<div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
<span class="material-symbols-outlined text-[26px]">medical_services</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Dentists &amp; Dental Professionals</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
              Access professional tools for clinical screening, comprehensive odontogram charting, diagnosis recording, and collaborative care management synced to NHIA.
            </p>
</div>
<div class="pt-space-lg">
<a class="inline-flex items-center text-primary font-title-sm text-title-sm hover:underline" data-path="community-dentists" href="#">
              Professional Access <span class="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
</a>
</div>
</div>
<!-- 2: Dental Clinics -->
<div class="flex flex-col justify-between p-space-lg rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div class="flex flex-col gap-space-sm">
<div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
<span class="material-symbols-outlined text-[26px]">corporate_fare</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Dental Clinics</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
              Register your clinic facility, manage practitioner privileges, oversee appointment schedules, and track clinical quality compliance supported by DHA.
            </p>
</div>
<div class="pt-space-lg">
<a data-path="community-clinics" class="inline-flex items-center text-secondary font-title-sm text-title-sm hover:underline" href="#">
              Clinic Access <span class="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
</a>
</div>
</div>
<!-- 3: Schools & Organisations -->
<div class="flex flex-col justify-between p-space-lg rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div class="flex flex-col gap-space-sm">
<div class="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
<span class="material-symbols-outlined text-[26px]">school</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Schools &amp; Organisations</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
              Organise preventive dental screening programmes for students and communities, connecting screening findings directly with appropriate follow-up care.
            </p>
</div>
<div class="pt-space-lg">
<a data-path="community-schools" class="inline-flex items-center text-tertiary font-title-sm text-title-sm hover:underline" href="#">
              Organisation Access <span class="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 8: HOW DHA WORKS (4-Step Process Bar) -->
<section class="w-full max-w-[1440px] mx-auto px-margin-desktop py-space-2xl" id="how-it-works">
<div class="flex flex-col gap-space-xl">
<div class="flex flex-col items-center text-center gap-space-xs max-w-xl mx-auto">
<span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-surface-container-high">
          Simple Onboarding
        </span>
<h2 class="font-headline-lg text-headline-lg text-on-surface">
          Getting Started Is Simple
        </h2>
<p class="font-body-md text-body-md text-on-surface-variant">
          Connect your NIN or verify your clinic registration in a few straightforward steps.
        </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop relative">
<!-- Step 1 -->
<div class="flex flex-col gap-space-sm p-space-md rounded-2xl bg-surface-container-low relative">
<div class="flex items-center justify-between">
<div class="w-9 h-9 rounded-xl bg-primary text-on-primary font-bold flex items-center justify-center font-headline-sm">
              1
            </div>
<span class="font-label-code text-label-code text-on-surface-variant">STEP 01</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface pt-2">Choose Your Account</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Tell DHA whether registering as patient, family guardian, dental professional, private clinic, or school organization.
          </p>
</div>
<!-- Step 2 -->
<div class="flex flex-col gap-space-sm p-space-md rounded-2xl bg-surface-container-low relative">
<div class="flex items-center justify-between">
<div class="w-9 h-9 rounded-xl bg-primary text-on-primary font-bold flex items-center justify-center font-headline-sm">
              2
            </div>
<span class="font-label-code text-label-code text-on-surface-variant">STEP 02</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface pt-2">Create Your Profile</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Complete relevant verification and registration details seamlessly with your NIN or official National Identity Number (NIN).
          </p>
</div>
<!-- Step 3 -->
<div class="flex flex-col gap-space-sm p-space-md rounded-2xl bg-surface-container-low relative">
<div class="flex items-center justify-between">
<div class="w-9 h-9 rounded-xl bg-primary text-on-primary font-bold flex items-center justify-center font-headline-sm">
              3
            </div>
<span class="font-label-code text-label-code text-on-surface-variant">STEP 03</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface pt-2">Access DHA Experience</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Explore features tailored to your account type: interactive odontograms, facility records, booking, or clinical charting.
          </p>
</div>
<!-- Step 4 -->
<div class="flex flex-col gap-space-sm p-space-md rounded-2xl bg-surface-container-low relative">
<div class="flex items-center justify-between">
<div class="w-9 h-9 rounded-xl bg-secondary text-on-secondary font-bold flex items-center justify-center font-headline-sm">
              4
            </div>
<span class="font-label-code text-label-code text-secondary font-semibold">ACTIVE</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface pt-2">Stay Connected</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Keep track of routine check-up timelines, clinical summaries, preventive reminders, and automated health exchange alerts.
          </p>
</div>
</div>
</div>
</section>
<!-- SECTION 9: ORAL HEALTH EDUCATION GUIDES -->
<section class="w-full bg-surface-container-low/50 py-space-2xl">
<div class="max-w-[1440px] mx-auto px-margin-desktop flex flex-col gap-space-xl">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div class="flex flex-col gap-2 max-w-xl">
<span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest">
            Clinical Health Library
          </span>
<h2 class="font-headline-lg text-headline-lg text-on-surface">
            Learn More About Your Oral Health
          </h2>
<p class="font-body-md text-body-md text-on-surface-variant">
            Verified, evidence-backed dental hygiene techniques written and vetted by Nigerian dental health authorities.
          </p>
</div>
<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px] text-secondary">lock_open</span>
          No Registration Required to Read
        </div>
</div>
<!-- 3-Column Card Grid with Rich Photography -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
<!-- Guide 1 -->
<div class="flex flex-col rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
<div class="h-52 overflow-hidden bg-surface-container">
<img class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" data-alt="A Nigerian father guiding his young son through brushing teeth at the bathroom sink, cheerful morning routine and positive parenting oral hygiene education" src="https://images.pexels.com/photos/6623859/pexels-photo-6623859.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200">
</div>
<div class="p-space-lg flex flex-col gap-space-sm flex-1 justify-between">
<div class="flex flex-col gap-2">
<span class="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Preventive Daily Care</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface">How to Brush Your Teeth Properly</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
                Master the Bass technique, optimal 45-degree bristle angles, and gentle care to prevent gum recession and enamel wear.
              </p>
</div>
<div class="pt-space-sm">
<a class="inline-flex items-center text-primary font-title-sm text-title-sm hover:underline" data-path="guide-brushing" href="#">
                Read Guide <span class="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
</a>
</div>
</div>
</div>
<!-- Guide 2 -->
<div class="flex flex-col rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
<div class="h-52 overflow-hidden bg-surface-container">
<img class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" data-alt="A cheerful Nigerian father and his young daughter brushing teeth together in front of a bright bathroom mirror, matching pyjamas, healthy morning routine" src="https://images.pexels.com/photos/10566135/pexels-photo-10566135.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200">
</div>
<div class="p-space-lg flex flex-col gap-space-sm flex-1 justify-between">
<div class="flex flex-col gap-2">
<span class="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Pediatric Oral Health</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Helping Children Build Healthy Oral Habits</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
                Fun interactive strategies, positive reinforcement schedules, and age-specific fluoride guidelines for toddlers and school students.
              </p>
</div>
<div class="pt-space-sm">
<a class="inline-flex items-center text-secondary font-title-sm text-title-sm hover:underline" data-path="guide-children" href="#">
                Read Guide <span class="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
</a>
</div>
</div>
</div>
<!-- Guide 3 -->
<div class="flex flex-col rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
<div class="h-52 overflow-hidden bg-surface-container">
<img class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" data-alt="A dental X-ray examination in a modern Nigerian clinical room, a gloved clinician positioning the digital sensor for a patient" src="https://images.pexels.com/photos/6501924/pexels-photo-6501924.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200">
</div>
<div class="p-space-lg flex flex-col gap-space-sm flex-1 justify-between">
<div class="flex flex-col gap-2">
<span class="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider">Clinical Insights</span>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Why Regular Dental Check-ups Matter</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
                Early detection of micro-cavities, periodontal screenings, and how bi-annual routine cleanings prevent invasive surgical treatments.
              </p>
</div>
<div class="pt-space-sm">
<a class="inline-flex items-center text-tertiary font-title-sm text-title-sm hover:underline" data-path="guide-checkups" href="#">
                Read Guide <span class="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 10: TRUST, PRIVACY & DATA PROTECTION -->
<section class="w-full max-w-[1440px] mx-auto px-margin-desktop py-space-2xl">
<div class="flex flex-col gap-space-xl">
<div class="flex flex-col max-w-2xl gap-2">
<span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest">
          Nigeria Health Data Governance
        </span>
<h2 class="font-headline-lg text-headline-lg text-on-surface">
          Your Records. Your Permission.
        </h2>
<p class="font-body-md text-body-md text-on-surface-variant">
          Complete sovereign control over clinical sharing. Dental records and diagnostic imaging are encrypted with patient consent safeguards.
        </p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
<!-- Trust 1 -->
<div class="p-space-lg rounded-2xl bg-surface-container-low flex flex-col gap-space-sm">
<div class="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
<span class="material-symbols-outlined text-[22px]">admin_panel_settings</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-bold">Patient-Controlled Sharing</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            You choose exactly when and which dental practice or certified specialist can view your oral records or 3D dental models.
          </p>
</div>
<!-- Trust 2 -->
<div class="p-space-lg rounded-2xl bg-surface-container-low flex flex-col gap-space-sm">
<div class="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span class="material-symbols-outlined text-[22px]">checklist</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-bold">Granular Categories</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Select specific diagnostic reports to disclose without needing to expose your entire historical medical chart.
          </p>
</div>
<!-- Trust 3 -->
<div class="p-space-lg rounded-2xl bg-surface-container-low flex flex-col gap-space-sm">
<div class="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-tertiary shadow-sm">
<span class="material-symbols-outlined text-[22px]">visibility</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-bold">Audit Visibility</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Review who accesses your charts, access timestamps, and approved clinic locations with transparent immutable activity logs.
          </p>
</div>
<!-- Trust 4 -->
<div class="p-space-lg rounded-2xl bg-surface-container-low flex flex-col gap-space-sm">
<div class="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-error shadow-sm">
<span class="material-symbols-outlined text-[22px]">do_not_disturb_on</span>
</div>
<h3 class="font-title-md text-title-md text-on-surface font-bold">Revoke Access Instantly</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Terminate active sharing permissions whenever a treatment plan or second opinion consult concludes with a single click.
          </p>
</div>
</div>
</div>
</section>
<!-- SECTION 11: FINAL HIGH-IMPACT CALL TO ACTION BANNER -->
<section class="w-full max-w-[1440px] mx-auto px-margin-desktop py-space-xl mb-space-2xl">
<div class="relative w-full rounded-3xl bg-inverse-surface text-inverse-on-surface p-space-2xl overflow-hidden shadow-2xl">
<!-- Ambient Glow Decorators -->
<div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"></div>
<div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none"></div>
<div class="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto gap-space-md">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest/20 text-tertiary-fixed font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">verified</span>
          Official Federal Government of Nigeria Digital Oral Health Initiative
        </div>
<h2 class="font-display-lg text-display-lg font-bold tracking-tight text-balance">
          Take the First Step Towards Better Oral Health.
        </h2>
<p class="font-body-lg text-body-lg text-inverse-on-surface/80 max-w-2xl leading-relaxed">
          Join DHA and make it easier to organise your oral health journey, sync clinical records, and stay connected with world-class dental care across Nigeria.
        </p>
<div class="flex flex-wrap items-center justify-center gap-space-md pt-space-xs">
<a class="inline-flex items-center justify-center h-12 px-space-xl rounded-xl bg-primary text-on-primary font-title-sm text-title-sm hover:bg-primary-container shadow-lg transition-all duration-200 hover:-translate-y-0.5" data-path="get-started" href="#">
            Get Started
            <span class="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
</a>
<a class="inline-flex items-center justify-center h-12 px-space-lg rounded-xl bg-surface-container-highest/20 text-inverse-on-surface font-title-sm text-title-sm hover:bg-surface-container-highest/30 transition-all duration-200" data-path="explore-portal" href="#">
            Explore DHA
          </a>
</div>
</div>
</div>
</section>
</div></main><footer class="w-full bg-surface-container-low shadow-[0_-1px_8px_rgba(0,0,0,0.02)] mt-auto"><div class="max-w-[1280px] mx-auto px-margin-desktop py-space-2xl"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter-desktop mb-space-2xl"><div class="lg:col-span-4 flex flex-col gap-space-md"><div class="flex items-center gap-space-xs"><div class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary"><span class="material-symbols-outlined text-[20px]">dentistry</span></div><span class="font-headline-sm text-headline-sm text-on-surface">DHA Dental Health</span></div><p class="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-sm">Unified public dental care portal and clinical authority ecosystem. Bridging validated clinician diagnostics, patient records, and health data intelligence across Nigeria.</p><div class="flex items-center gap-space-xs"><span class="inline-flex items-center gap-space-2xs px-space-xs py-1 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm border border-outline-variant/30"><span class="material-symbols-outlined text-[14px]">verified</span>NHIA Connected</span><span class="inline-flex items-center gap-space-2xs px-space-xs py-1 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm border border-outline-variant/30"><span class="material-symbols-outlined text-[14px]">lock</span>NDPR Compliant</span></div></div><div class="lg:col-span-2 flex flex-col gap-space-sm"><h3 class="font-title-sm text-title-sm text-on-surface uppercase tracking-wider">Platform</h3><nav class="flex flex-col gap-space-xs"><a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="patient-portal" href="#">Patient Portal</a><a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="dental-care" href="#">Odontogram Viewer</a><a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="oral-health-guides" href="#">Health Guides</a><a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="appointments" href="#">Book Consultation</a><a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="verified-records" href="#">Diagnostic Records</a></nav></div><div class="lg:col-span-3 flex flex-col gap-space-sm"><h3 class="font-title-sm text-title-sm text-on-surface uppercase tracking-wider">Clinicians &amp; Authority</h3><nav class="flex flex-col gap-space-xs"><a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="for-professionals" href="#">Provider Network</a><a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="about-dha" href="#">Clinical Standards</a><a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="Nigeria Health Information Exchange-integration" href="#">NHIA Health Exchange</a><a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="licensing-verification" href="#">Practitioner Registry</a><a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" data-path="clinical-research" href="#">Epidemiology &amp; Research</a></nav></div><div class="lg:col-span-3 flex flex-col gap-space-sm"><h3 class="font-title-sm text-title-sm text-on-surface uppercase tracking-wider">Governance &amp; Security</h3><p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Compliant with the Nigeria Data Protection Regulation (NDPR) and Nigeria Data Protection Act (NDPA), and international ISO 27001 standards. Encrypted clinical charting and telemetry sync.</p><div class="flex flex-col gap-space-2xs pt-space-xs"><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" data-path="privacy-policy" href="#">Data Governance &amp; Privacy Notice</a><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" data-path="terms-of-service" href="#">Terms of Medical Portal Use</a><a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" data-path="accessibility" href="#">Accessibility Standards</a></div></div></div><div class="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container-low"><p class="font-body-sm text-body-sm text-on-surface-variant">© 2025 DHA. All rights reserved. Dental Health Authority of Nigeria.</p><div class="flex items-center gap-space-lg"><span class="font-label-code text-label-code text-on-surface-variant">v4.2.0 • NHIA PRODUCTION</span><div class="flex items-center gap-1 text-secondary font-label-sm text-label-sm"><span class="w-2 h-2 rounded-full bg-secondary"></span>Systems Normal</div></div></div></div></footer>
`;
