import { useState } from 'react';
import { Link } from 'react-router-dom';
import PortalShell from './PortalShell';

export default function BetterWayScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'records' | 'care' | 'learning'>('all');
  const [activeSyncing, setActiveSyncing] = useState(false);

  const handleSyncSimulate = () => {
    setActiveSyncing(true);
    setTimeout(() => setActiveSyncing(false), 2000);
  };

  return (
    <PortalShell
      title="A Better Way to Manage Your Oral Health"
      badgeText="Overview · 0.2"
      currentKey="better-way"
    >
      <div className="space-y-12">
        {/* Top Hero / Intro Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/20 text-primary-200 border border-primary-400/30 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              Nigeria Dental Health Authority Digital Standard
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight font-display">
              A Better Way to Manage Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-teal-200 to-sky-300">
                Oral Health
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Connected across all DHA clinics, private practices, and school screenings. 
              One unified digital health passport giving you continuous, paperless oversight over every diagnostic, treatment, and reminder.
            </p>

            {/* Quick Stats Banner */}
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Nigeria Health Information Exchange Interoperable</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-300">0 min</div>
                <div className="text-xs text-slate-400 mt-0.5">Paperwork transfer</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-primary-300">32+</div>
                <div className="text-xs text-slate-400 mt-0.5">Interactive teeth mapping</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">Instant</div>
                <div className="text-xs text-slate-400 mt-0.5">National Identification Number (NIN) verification Verification</div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Nigeria Health Information Exchange Interoperability Showcase */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
                Ecosystem Integration
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                Live Nigeria Health Information Exchange Synchronisation Network
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Records from public hospitals and licensed private dental clinics automatically sync to your passport.
              </p>
            </div>

            <button
              onClick={handleSyncSimulate}
              disabled={activeSyncing}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition shadow-sm active:scale-95 disabled:opacity-75 self-start md:self-auto"
            >
              <span className={`material-symbols-outlined text-lg ${activeSyncing ? 'animate-spin' : ''}`}>
                sync
              </span>
              <span>{activeSyncing ? 'Checking Sync Status...' : 'Simulate Live Sync'}</span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">domain</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Source Facility</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">Surulere Health Center</div>
                <div className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Verified DHA Facility
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Security & Audit</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">AES-256 GCM Encryption</div>
                <div className="text-xs text-slate-500 mt-1">Patient consent validated via National Identification Number (NIN) verification</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">cloud_done</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Central Record</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">NIN #12345-****-901</div>
                <div className="text-xs text-slate-500 mt-1">Synchronised 2 mins ago</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Core Pillars of Better Management */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Three Pillars of Unified Care
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Everything designed around simplifying access, eliminating lost charts, and empowering parents and individuals.
            </p>

            {/* Filter Chips */}
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl mt-6 border border-slate-200">
              {(['all', 'records', 'care', 'learning'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                    activeTab === tab
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab === 'all' ? 'All Pillars' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            {(activeTab === 'all' || activeTab === 'records') && (
              <div className="group rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 hover:border-primary-300 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-600 to-sky-500 text-white flex items-center justify-center shadow-md mb-6 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">folder_managed</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-700">01 · Records</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">Stay Organised</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Access your full clinical screening history, visual odontograms, X-ray attachments, and clinician notes without requesting physical files.
                  </p>

                  <ul className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-5">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                      <span>32-tooth interactive visual chart</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                      <span>Historical school & clinic screening reports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                      <span>High-resolution diagnostic imaging viewer</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/portal/journey"
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-800 transition"
                  >
                    <span>View Patient Records</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Pillar 2 */}
            {(activeTab === 'all' || activeTab === 'care') && (
              <div className="group rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 hover:border-teal-300 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-md mb-6 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">calendar_month</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700">02 · Connection</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">Stay Connected</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Book appointments with DHA-certified dental clinics, track referral tickets, and receive smart preventive recall notices right on your phone.
                  </p>

                  <ul className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-5">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-teal-600 text-base">check_circle</span>
                      <span>Direct booking with licensed specialists</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-teal-600 text-base">check_circle</span>
                      <span>Automated SMS & WhatsApp reminder alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-teal-600 text-base">check_circle</span>
                      <span>Seamless referrals across DHA hospital network</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/portal/find-care"
                    className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900 transition"
                  >
                    <span>Manage Appointments</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Pillar 3 */}
            {(activeTab === 'all' || activeTab === 'learning') && (
              <div className="group rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 hover:border-sky-300 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-500 text-white flex items-center justify-center shadow-md mb-6 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-2xl">school</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700">03 · Knowledge</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">Stay Informed</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Access certified dental health resources, video guides, dietary tips, and pediatric tooth development trackers curated by clinical leaders.
                  </p>

                  <ul className="mt-6 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-5">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sky-600 text-base">check_circle</span>
                      <span>Age-appropriate oral hygiene video guides</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sky-600 text-base">check_circle</span>
                      <span>DHA preventive tips & fluoride recommendations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sky-600 text-base">check_circle</span>
                      <span>Emergency oral trauma quick instructions</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/oral-health-guides"
                    className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:text-sky-900 transition"
                  >
                    <span>Browse Education Hub</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Unified Family Snapshot Feature Callout */}
        <section className="bg-gradient-to-r from-primary-50 via-teal-50 to-sky-50 rounded-3xl p-6 sm:p-10 border border-primary-100 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-xs font-bold mb-3">
              <span className="material-symbols-outlined text-sm">groups</span>
              Family Care Included
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Manage your entire household under a single login.
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Parents and legal guardians can switch profiles seamlessly to view children’s school screening results, schedule checkups, and sign treatment consents.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/portal/family-care"
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm shadow-md transition"
              >
                Explore Family Care Hub
              </Link>
              <Link
                to="/portal/getting-started"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-200 transition"
              >
                How It Works
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-white rounded-2xl p-4 shadow-lg border border-slate-200/80 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Household Members</div>
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm">
                  SM
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Sarah Mansoor</div>
                  <div className="text-xs text-slate-500">Self · Primary Account</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">Active</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
                  ZM
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Zayd Mansoor (8y)</div>
                  <div className="text-xs text-slate-500">Dependent · School Year 3</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">Recall Due</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                  LM
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Layla Mansoor (5y)</div>
                  <div className="text-xs text-slate-500">Dependent · Kindergarten</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">Up to Date</span>
            </div>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}

