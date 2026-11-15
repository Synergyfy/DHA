import { useState } from 'react';
import { Link } from 'react-router-dom';
import PortalShell from './PortalShell';

export default function TrustPrivacyScreen() {
  const [allowSchoolScreenings, setAllowSchoolScreenings] = useState(true);
  const [allowSpecialistReferrals, setAllowSpecialistReferrals] = useState(true);
  const [allowClinicalResearch, setAllowClinicalResearch] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <PortalShell
      title="Your Records. Your Permission."
      badgeText="Trust & Privacy · 0.9"
      currentKey="privacy"
    >
      <div className="space-y-12">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
            <span className="material-symbols-outlined text-teal-400 text-base">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-primary-950 to-slate-950 text-white p-6 sm:p-12 lg:p-16 border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              UAE Federal Health Data Law Compliant
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-display">
              Your Records.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-primary-300 to-white">
                Your Permission.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Dubai Health Authority puts patient data autonomy first. Every screening, X-ray, and clinical chart requires your active consent to be accessed by authorized healthcare providers.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#consent-simulator"
                className="px-6 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm transition shadow-md"
              >
                Try Consent Simulator
              </a>
              <Link
                to="/patient-dashboard"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* 4 Pillars of Data Protection */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              Security Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 font-display">
              Built on Zero-Trust Health Governance
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              How DHA safeguards your personal medical information at every digital touchpoint.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">fingerprint</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Patient-Controlled Sharing</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Clinicians can only view your dental history when you grant access or present your dynamic Patient Pass.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-teal-700">
                Encrypted with AES-256
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">tune</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Granular Consent</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Choose exactly which categories to share: whole charts, emergency contacts, or only specific X-ray scans.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-primary-700">
                Category-based rules
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">visibility</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Audit Visibility</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Real-time activity logs show every hospital, dentist, or specialist who requested or viewed your records.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-sky-700">
                Permanent audit trail
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">cancel</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Instant Revocation</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Revoke provider access at any time with a single tap. Once revoked, clinic sessions expire immediately.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-rose-700">
                1-tap immediate killswitch
              </div>
            </div>
          </div>
        </section>

        {/* Live Consent Simulator */}
        <section id="consent-simulator" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
              Interactive Permission Sandbox
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 font-display">
              Manage Your Active Consent Profiles
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Toggle live sharing permissions below to experience how DHA gives you real-time authority over your dental data.
            </p>
          </div>

          <div className="space-y-4">
            {/* Permission Row 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-xl">school</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Annual School Dental Screening Program</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Allows licensed school dental teams to record screening results and notify parents of caries risk.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className={`text-xs font-bold ${allowSchoolScreenings ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {allowSchoolScreenings ? 'Permitted' : 'Blocked'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const next = !allowSchoolScreenings;
                    setAllowSchoolScreenings(next);
                    showToast(next ? 'School screening access granted.' : 'School screening access revoked.');
                  }}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    allowSchoolScreenings ? 'bg-teal-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      allowSchoolScreenings ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Permission Row 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-xl">sync_alt</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Specialist & Inter-Clinic Referrals</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Permits transferring full 3D CBCT scans and odontograms to referred orthodontists and surgeons.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className={`text-xs font-bold ${allowSpecialistReferrals ? 'text-primary-700' : 'text-slate-400'}`}>
                  {allowSpecialistReferrals ? 'Permitted' : 'Blocked'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const next = !allowSpecialistReferrals;
                    setAllowSpecialistReferrals(next);
                    showToast(next ? 'Specialist referral sharing enabled.' : 'Specialist referral sharing disabled.');
                  }}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    allowSpecialistReferrals ? 'bg-primary-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      allowSpecialistReferrals ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Permission Row 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-xl">analytics</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Anonymized Public Health Studies</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Contributes de-identified caries index statistics to DHA academic oral health research.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className={`text-xs font-bold ${allowClinicalResearch ? 'text-indigo-700' : 'text-slate-400'}`}>
                  {allowClinicalResearch ? 'Permitted' : 'Opted Out'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const next = !allowClinicalResearch;
                    setAllowClinicalResearch(next);
                    showToast(next ? 'Research opt-in activated.' : 'Research contribution opted out.');
                  }}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    allowClinicalResearch ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      allowClinicalResearch ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory Banner */}
        <section className="bg-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2">
          <div className="font-bold text-slate-900 text-sm">Regulatory Notice & Sovereign Compliance</div>
          <p>
            All health records within the DHA Oral Health platform are stored inside sovereign United Arab Emirates data centers in accordance with UAE Federal Law No. 2 of 2019 regarding the use of Information and Communication Technology in Healthcare (Health Data Law) and DHA Administrative Regulations.
          </p>
          <p>
            No patient records are transferred or mirrored outside the United Arab Emirates without express prior ministerial authorization.
          </p>
        </section>
      </div>
    </PortalShell>
  );
}

