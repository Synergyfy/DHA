import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type PracticeModel = 'solo' | 'multi_site';

export function OrganisationStructureScreen() {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState<PracticeModel>('multi_site');
  const [activeBranchModal, setActiveBranchModal] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-8 py-3.5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/clinic-onboarding/dashboard')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Return to Dashboard"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                DHA Healthcare Entity Architecture
              </span>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Organisation Structure &amp; Branch Hierarchy
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/clinic-onboarding/branch-details')}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Icon name="add_business" className="text-sm" />
              <span>+ Add Satellite Branch</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 lg:px-8 pt-6 space-y-6">
        {/* Practice Architecture Model Selector */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Corporate Licensing Framework
              </h2>
              <p className="text-xs text-slate-500">
                Choose the organizational operational model approved under your CAC Articles of Association.
              </p>
            </div>
            <span className="text-xs font-semibold text-teal-800 bg-teal-100 px-2.5 py-1 rounded-full w-fit">
              Current: Multi-Site Corporate Practice
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Model A */}
            <div
              onClick={() => setSelectedModel('solo')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedModel === 'solo'
                  ? 'border-teal-600 bg-teal-50/40 ring-1 ring-teal-500'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Icon name="domain" className="text-teal-600 text-base" />
                  Model A: Solo Practice / Single Facility
                </span>
                {selectedModel === 'solo' && (
                  <Icon name="check_circle" className="text-teal-600 text-lg" />
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Single physical clinical premise with centralized licensing. Best for independent solo practitioners and single-site dental or outpatient clinics.
              </p>
            </div>

            {/* Model B */}
            <div
              onClick={() => setSelectedModel('multi_site')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedModel === 'multi_site'
                  ? 'border-teal-600 bg-teal-50/40 ring-1 ring-teal-500'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Icon name="account_tree" className="text-teal-600 text-base" />
                  Model B: Multi-Site Corporate Network (Selected)
                </span>
                {selectedModel === 'multi_site' && (
                  <Icon name="check_circle" className="text-teal-600 text-lg" />
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Corporate holding or parent organization with multiple operational facility hubs. Each satellite facility maintains independent clinical lead supervision and radiation certificates.
              </p>
            </div>
          </div>
        </section>

        {/* Visual Corporate Hierarchy Tree */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Icon name="hub" className="text-teal-600 text-lg" />
              Corporate Governance Hierarchy Map
            </h3>
            <span className="text-xs text-slate-500 font-medium">1 Parent Entity • 2 Active Branches</span>
          </div>

          {/* Visual Diagram */}
          <div className="flex flex-col items-center space-y-8 pt-4">
            {/* PARENT NODE */}
            <div className="w-full max-w-xl bg-gradient-to-r from-teal-800 to-slate-900 text-white rounded-2xl p-5 shadow-lg border border-teal-700/50 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-teal-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                  Parent Holding Entity
                </span>
                <span className="text-xs font-mono text-teal-200">CAC RC-1489201</span>
              </div>

              <h4 className="text-lg font-extrabold tracking-tight">
                Greenfield Dental Clinic Limited
              </h4>
              <p className="text-xs text-teal-100/80 mt-1">
                Centralized Governance, Credentialing, Compliance &amp; Billing
              </p>

              <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="text-[10px] text-teal-300 uppercase">CMD &amp; Trustee</div>
                  <div className="font-bold mt-0.5">Dr. Amina Bello</div>
                </div>
                <div>
                  <div className="text-[10px] text-teal-300 uppercase">Branches</div>
                  <div className="font-bold mt-0.5">2 Facilities</div>
                </div>
                <div>
                  <div className="text-[10px] text-teal-300 uppercase">Workforce</div>
                  <div className="font-bold mt-0.5">6 Clinicians</div>
                </div>
              </div>
            </div>

            {/* Connecting Vertical Line & Splitter */}
            <div className="relative w-full max-w-2xl flex flex-col items-center">
              <div className="w-0.5 h-8 bg-teal-600" />
              <div className="w-3/4 h-0.5 bg-teal-600 relative">
                {/* Left Branch Drop */}
                <div className="absolute left-0 top-0 w-0.5 h-8 bg-teal-600" />
                {/* Right Branch Drop */}
                <div className="absolute right-0 top-0 w-0.5 h-8 bg-teal-600" />
              </div>
            </div>

            {/* SATELLITE NODES GRID */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Branch 1: Wuse 2 HQ */}
              <div className="bg-white rounded-2xl border-2 border-teal-500 p-5 shadow-sm space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                    Headquarters • Site #001
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Icon name="check_circle" className="text-xs" /> Verified
                  </span>
                </div>

                <div>
                  <h5 className="text-base font-bold text-slate-900">Wuse 2 Main Clinic (HQ)</h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Plot 104 Aminu Kano Crescent, Wuse 2, Abuja
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Clinical Lead:</span>
                    <strong className="text-slate-800">Dr. Amina Bello (#DEN-78421)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Operatories:</span>
                    <strong className="text-slate-800">4 Suites (Class B Vacuum Autoclave)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Scope:</span>
                    <span className="text-teal-700 font-semibold">General, Ortho, CBCT Imaging</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Phone: +234 9 461 8801</span>
                  <button
                    onClick={() => setActiveBranchModal('hq')}
                    className="text-teal-700 font-bold hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Branch 2: Garki Satellite */}
              <div className="bg-white rounded-2xl border border-slate-300 p-5 shadow-sm space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
                    Satellite • Site #002
                  </span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Icon name="schedule" className="text-xs" /> Audit 24 Oct
                  </span>
                </div>

                <div>
                  <h5 className="text-base font-bold text-slate-900">Garki Satellite Branch</h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Suite B4, Area 11 Shopping Plaza, Garki 2, Abuja
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Clinical Lead:</span>
                    <strong className="text-slate-800">Dr. Tunde Fashola (#DEN-88219)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Operatories:</span>
                    <strong className="text-slate-800">2 Suites (Digital Panoramic X-Ray)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Scope:</span>
                    <span className="text-teal-700 font-semibold">Restorative, Preventive, Emergency</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Phone: +234 802 331 9904</span>
                  <button
                    onClick={() => setActiveBranchModal('garki')}
                    className="text-teal-700 font-bold hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statutory Separation Guardrail Card */}
        <section className="bg-teal-900 text-white rounded-2xl p-6 shadow-sm space-y-3">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-800 text-teal-300 flex items-center justify-center shrink-0 border border-teal-700">
              <Icon name="security" className="text-2xl" />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Statutory Regulatory Separation Principle
              </h4>
              <p className="text-teal-100/90 leading-relaxed">
                Under DHA Facility Regulations (2026), operational approval granted to the Parent Entity (Greenfield Dental Clinic Ltd) does <strong>not</strong> grant blanket immunity or automatic licensing to satellite branches. Each branch premise must independently satisfy:
              </p>
              <ul className="list-disc pl-5 pt-1 space-y-1 text-teal-200">
                <li>Dedicated Physical Premise Safety Audit &amp; Emergency Exits.</li>
                <li>Separate Nigerian Nuclear Regulatory Authority (NNRA) Radiation Scatter Certificate.</li>
                <li>Named Resident Clinical Lead holding active unencumbered MDCN licensure.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Icon name="verified" className="text-teal-600 text-base" />
            <span>Multi-Site Corporate Structure validated by DHA Licensing Desk</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => navigate('/clinic-onboarding/branch-management')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Manage Branches (15.14)
            </button>
            <button
              onClick={() => navigate('/clinic-onboarding/dashboard')}
              className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-md shadow-teal-700/20"
            >
              Back to Dashboard (15.22)
            </button>
          </div>
        </section>
      </main>

      {/* Branch Detail Modal */}
      {activeBranchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {activeBranchModal === 'hq'
                  ? 'Wuse 2 Main Clinic (HQ #001)'
                  : 'Garki Satellite Branch (#002)'}
              </h3>
              <button
                onClick={() => setActiveBranchModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <Icon name="close" className="text-base" />
              </button>
            </div>

            <div className="text-xs space-y-2 text-slate-600">
              <p>
                <strong>Premises:</strong>{' '}
                {activeBranchModal === 'hq'
                  ? 'Plot 104 Aminu Kano Crescent, Wuse 2, Abuja'
                  : 'Suite B4, Area 11 Shopping Plaza, Garki 2, Abuja'}
              </p>
              <p>
                <strong>License:</strong>{' '}
                {activeBranchModal === 'hq'
                  ? 'FCT-HEFAMAA-DENT-0842 (Verified)'
                  : 'FCT-HEFAMAA-DENT-0842-B (Audit Scheduled 24 Oct)'}
              </p>
              <p>
                <strong>Supervising Practitioner:</strong>{' '}
                {activeBranchModal === 'hq' ? 'Dr. Amina Bello (CMD)' : 'Dr. Tunde Fashola (Lead Associate)'}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveBranchModal(null)}
                className="px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
