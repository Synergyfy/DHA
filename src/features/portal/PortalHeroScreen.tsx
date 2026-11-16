import { Link } from 'react-router-dom';
import PortalShell from './PortalShell';

export default function PortalHeroScreen() {
  return (
    <PortalShell
      title="Your Oral Health, All in One Place."
      badgeText="Official Portal · 0.1"
      currentKey="hero"
    >
      <div className="space-y-12">
        {/* Main Hero Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-900 via-primary-800 to-teal-900 text-white p-6 sm:p-12 lg:p-16 shadow-2xl border border-white/10">
          {/* Subtle Ambient glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse"></span>
              Official Nigeria Dental Health Authority Gateway
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight font-display">
              Your Oral Health,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-primary-200 to-white">
                All in One Place.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-primary-100 leading-relaxed max-w-2xl font-light">
              Access clinical records, school dental screenings, interactive odontograms, and certified DHA clinics directly from your smartphone or desktop.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/patient-dashboard"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-primary-950 font-bold text-base transition shadow-lg hover:shadow-xl active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">login</span>
                <span>Access Patient Dashboard</span>
              </Link>

              <Link
                to="/portal/getting-started"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/25 transition backdrop-blur-md active:scale-95"
              >
                <span>How to Get Started</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>

            {/* Quick Trust Badges */}
            <div className="mt-10 pt-8 border-t border-white/15 flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-primary-200 font-medium">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-300 text-lg">verified_user</span>
                <span>National Identification Number (NIN) verification Authenticated</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-300 text-lg">sync_saved_locally</span>
                <span>Nigeria Health Information Exchange Ecosystem Live</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-300 text-lg">lock</span>
                <span>Federal Data Law Compliant</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid: What DHA Dental Offers */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
              Modern Oral Care Suite
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 font-display">
              Designed for Convenience and Clinical Precision
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Whether you are an individual tracking a root canal or a parent reviewing a school dental checkup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 hover:border-primary-300 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-700 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">dentistry</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Interactive Odontogram</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Visualise all 32 teeth with clear condition codes for restorations, fillings, caries, and healthy surfaces.
              </p>
              <Link
                to="/portal/journey"
                className="text-xs font-bold text-primary-600 hover:text-primary-800 inline-flex items-center gap-1"
              >
                <span>View Odontogram demo</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 hover:border-teal-300 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">family_restroom</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Multi-Dependent Hub</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Switch seamlessly between family profiles. Review school screening slips and authorize preventive dental treatments.
              </p>
              <Link
                to="/portal/family-care"
                className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
              >
                <span>Explore Family Portal</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 hover:border-sky-300 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Verified Clinic Finder</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Locate nearby DHA-accredited clinics, verify specialist licensing, and book digital appointments with ease.
              </p>
              <Link
                to="/portal/find-care"
                className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1"
              >
                <span>Find Dental Clinics</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Live Portal Navigation Showcase */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Browse Public Portal Modules
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Explore the Complete DHA Oral Experience
              </h2>
            </div>
            <Link
              to="/portal/getting-started"
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition"
            >
              Get Started Now
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <Link
              to="/portal/better-way"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition group"
            >
              <div className="text-xs text-primary-400 font-semibold mb-1">0.2 Module</div>
              <div className="font-bold text-white text-base group-hover:text-teal-300 transition">Better Way</div>
              <p className="text-xs text-slate-400 mt-1">Modern ecosystem overview & sync</p>
            </Link>

            <Link
              to="/portal/journey"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition group"
            >
              <div className="text-xs text-teal-400 font-semibold mb-1">0.3 Module</div>
              <div className="font-bold text-white text-base group-hover:text-teal-300 transition">Your Journey</div>
              <p className="text-xs text-slate-400 mt-1">Records, discovery & reminders</p>
            </Link>

            <Link
              to="/portal/family-care"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition group"
            >
              <div className="text-xs text-sky-400 font-semibold mb-1">0.4 Module</div>
              <div className="font-bold text-white text-base group-hover:text-teal-300 transition">Family Care</div>
              <p className="text-xs text-slate-400 mt-1">Dependents, children & approvals</p>
            </Link>

            <Link
              to="/portal/find-care"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition group"
            >
              <div className="text-xs text-emerald-400 font-semibold mb-1">0.5 Module</div>
              <div className="font-bold text-white text-base group-hover:text-teal-300 transition">Find Care</div>
              <p className="text-xs text-slate-400 mt-1">Clinics, providers & booking</p>
            </Link>

            <Link
              to="/portal/partners"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition group"
            >
              <div className="text-xs text-indigo-400 font-semibold mb-1">0.6 Module</div>
              <div className="font-bold text-white text-base group-hover:text-teal-300 transition">Partners</div>
              <p className="text-xs text-slate-400 mt-1">Doctors, clinics & schools</p>
            </Link>

            <Link
              to="/portal/getting-started"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition group"
            >
              <div className="text-xs text-amber-400 font-semibold mb-1">0.7 Module</div>
              <div className="font-bold text-white text-base group-hover:text-teal-300 transition">Get Started</div>
              <p className="text-xs text-slate-400 mt-1">National Identification Number (NIN) verification & registration steps</p>
            </Link>

            <Link
              to="/portal/guides"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition group"
            >
              <div className="text-xs text-rose-400 font-semibold mb-1">0.8 Module</div>
              <div className="font-bold text-white text-base group-hover:text-teal-300 transition">Guides</div>
              <p className="text-xs text-slate-400 mt-1">Oral hygiene videos & articles</p>
            </Link>

            <Link
              to="/portal/privacy"
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition group"
            >
              <div className="text-xs text-teal-400 font-semibold mb-1">0.9 Module</div>
              <div className="font-bold text-white text-base group-hover:text-teal-300 transition">Trust & Privacy</div>
              <p className="text-xs text-slate-400 mt-1">Permissions, audit & safeguards</p>
            </Link>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}

