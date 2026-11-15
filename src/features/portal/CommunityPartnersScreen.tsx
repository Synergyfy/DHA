import { useState } from 'react';
import { Link } from 'react-router-dom';
import PortalShell from './PortalShell';

export default function CommunityPartnersScreen() {
  const [partnerType, setPartnerType] = useState<'all' | 'doctors' | 'clinics' | 'schools'>('all');

  return (
    <PortalShell
      title="Part of the Dental Healthcare Community?"
      badgeText="Healthcare Partners · 0.6"
      currentKey="partners"
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-primary-950 to-teal-950 text-white p-6 sm:p-12 lg:p-16 border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              NABIDH Ecosystem Live v4.2
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-display">
              Part of the Dental Healthcare{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-primary-300 to-white">
                Community?
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Connect your practice, clinic, or school health department into Dubai’s unified dental health network. 
              Submit screening findings, manage electronic referrals, and comply seamlessly with DHA standards.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#portals"
                className="px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm transition shadow-md"
              >
                Explore Partner Portals
              </a>
              <Link
                to="/portal/privacy"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition"
              >
                Compliance & Security Standards
              </Link>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <div id="portals" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Dedicated Practitioner Portals</h2>
            <p className="text-xs sm:text-sm text-slate-500">Choose your organization type to discover custom integration options</p>
          </div>

          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto">
            {(['all', 'doctors', 'clinics', 'schools'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setPartnerType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                  partnerType === type ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type === 'all' ? 'All Roles' : type}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Dedicated Partner Portals */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Doctors */}
          {(partnerType === 'all' || partnerType === 'doctors') && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-primary-400 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">medical_services</span>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-primary-700">For Clinicians</div>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">Dentists & Specialists</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Fast diagnosis recording, standardized odontogram markup, digital prescription issuing, and direct NABIDH clinical submission.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                    <span>1-Click Tooth-by-Tooth Charting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                    <span>Direct Secondary Specialist Referrals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                    <span>DHA Professional License Synchronization</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  to="/doctor-dashboard"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                >
                  <span>Clinician Portal Login</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}

          {/* Clinics */}
          {(partnerType === 'all' || partnerType === 'clinics') && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-teal-400 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">local_hospital</span>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-teal-700">For Dental Centers</div>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">Dental Clinics & Centers</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Manage facility scheduling, chair capacity, insurance pre-authorizations, and aggregate NABIDH quality compliance metrics.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-teal-600 text-base">check_circle</span>
                    <span>Multi-Provider Chair Scheduling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-teal-600 text-base">check_circle</span>
                    <span>Automated DHA Statistical Quality Audits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-teal-600 text-base">check_circle</span>
                    <span>Insurance Pre-Authorization Gateway</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  to="/clinic-dashboard"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                >
                  <span>Clinic Portal Login</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}

          {/* Schools */}
          {(partnerType === 'all' || partnerType === 'schools') && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">school</span>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">Educational Programs</div>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">Schools & Public Health</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Equip school nurses and visiting dentists with rapid student oral screening tools, sending real-time alerts to parents.
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-600 text-base">check_circle</span>
                    <span>Bulk Student Roster Screening Mode</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-600 text-base">check_circle</span>
                    <span>Instant Guardian SMS/App Notification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-600 text-base">check_circle</span>
                    <span>Preventive Dental Index Tracking</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  to="/school-dashboard"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                >
                  <span>School Portal Login</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Integration Architecture Banner */}
        <section className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Architecture & Standards</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              HL7 FHIR & NABIDH Compliant Interoperability
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              DHA Oral Health platform adheres to UAE National Health Data Law and international HL7 FHIR standards for dental findings, ensuring seamless synchronization between your Electronic Health Record (EHR) and the central gateway.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold text-slate-400">DATA FORMAT</div>
              <div className="font-extrabold text-slate-900 mt-1 text-base">HL7 FHIR v4</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold text-slate-400">AUTHENTICATION</div>
              <div className="font-extrabold text-slate-900 mt-1 text-base">OAuth 2.0 / UAE PASS</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold text-slate-400">DATA STORAGE</div>
              <div className="font-extrabold text-slate-900 mt-1 text-base">In-Country UAE Cloud</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold text-slate-400">AUDIT PROTOCOL</div>
              <div className="font-extrabold text-slate-900 mt-1 text-base">Immutable Ledger</div>
            </div>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}

