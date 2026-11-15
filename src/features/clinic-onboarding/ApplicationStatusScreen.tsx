import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function ApplicationStatusScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'checklist' | 'timeline'>('overview');

  const lifecycleSteps = [
    {
      step: 1,
      title: 'Draft Preparation',
      date: '16 Oct 2026',
      status: 'completed',
      detail: 'All 10 modules completed and validated internally by CMD Dr. Amina Bello.',
    },
    {
      step: 2,
      title: 'Formal Dossier Submission',
      date: '18 Oct 2026, 15:42 WAT',
      status: 'completed',
      detail: 'Submitted to DHA Registry; SHA-256 seal 9e8a...31bf generated.',
    },
    {
      step: 3,
      title: 'Registry Desk Review & Triage',
      date: 'In Progress (Started 19 Oct)',
      status: 'current',
      detail: 'Senior Review Officer #04 assigned. Corporate CAC & HEFAMAA validated.',
    },
    {
      step: 4,
      title: 'Clarification / More Info Request',
      date: 'Pending / Actionable',
      status: 'pending',
      detail: 'Inspectorate query on Operatory 04 NNRA radiation survey pending response.',
    },
    {
      step: 5,
      title: 'Board Approval & Digital Licence',
      date: 'Awaiting Prior Stages',
      status: 'pending',
      detail: 'Final sign-off, DHA Public Registry listing, and issuance of Official Facility License.',
    },
  ];

  const checklistItems = [
    { title: 'CAC Incorporation Certificate (RC-1489201)', status: 'verified', note: 'Verified via CAC Electronic Registry' },
    { title: 'FCT Health Facility Operating Licence', status: 'verified', note: 'FCT-HEFAMAA-DENT-0842 Active' },
    { title: 'Premises Lease Agreement (Wuse 2 HQ)', status: 'verified', note: 'Commercial Tenancy valid to 2029' },
    { title: 'NNRA Radiation Safety Scatter Survey', status: 'attention', note: 'Clarification query issued on Operatory 04' },
    { title: 'CMD Medical & Dental Council Standing', status: 'verified', note: 'MDCN DEN-78421 in Good Standing' },
    { title: 'Garki Satellite Premise Inspection', status: 'scheduled', note: 'On-site audit confirmed for 24 Oct 2026' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-8 py-3.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/clinic-onboarding/dashboard')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Return to Dashboard"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  Docket: #DHA-APP-2026-8819
                </span>
                <span className="text-xs font-medium text-slate-400">Queue Pos: #2</span>
              </div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Application Review Status
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/clinic-onboarding/more-information')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors flex items-center gap-1 shadow-sm"
            >
              <Icon name="assignment_late" className="text-sm" />
              <span>Respond to Query (15.20)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 lg:px-8 pt-6 space-y-6">
        {/* Status Hero Card */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <Icon name="hourglass_top" className="text-2xl animate-spin text-teal-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                    Under Desk Review
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Phase 3 of 5</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  Greenfield Dental Clinic Limited
                </h2>
              </div>
            </div>

            <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl">
              <div className="text-xs text-slate-500">Assigned Review Officer</div>
              <div className="text-sm font-bold text-slate-800 flex sm:justify-end items-center gap-1">
                <Icon name="badge" className="text-base text-teal-600" />
                Officer #04 (Licensing Directorate)
              </div>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="mt-4 p-4 rounded-xl bg-teal-50/70 border border-teal-200 flex items-start gap-3">
            <Icon name="support_agent" className="text-teal-700 text-xl shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                Officer Reviewer Memo • 19 Oct 2026, 11:15 WAT
              </h3>
              <p className="text-xs text-teal-800 leading-relaxed">
                "CAC entity standing and FCT Health Facility license verified. MDCN records for Dr. Bello and Dr. Fashola match statutory registrations. Note: Clarification requested regarding secondary radiation scatter attestation in Operatory 04 before final board approval."
              </p>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="timeline" className="text-base" />
            Application Progress Timeline
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="checklist" className="text-base" />
            Requirement Checklist (5/6)
          </button>
        </div>

        {/* Tab 1: Progress Timeline */}
        {activeTab === 'overview' && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              5-Step Statutory Evaluation Lifecycle
            </h3>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {lifecycleSteps.map((s) => (
                <div key={s.step} className="relative group">
                  {/* Step Dot */}
                  <div
                    className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white ${
                      s.status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : s.status === 'current'
                        ? 'bg-teal-600 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {s.status === 'completed' ? (
                      <Icon name="check" className="text-xs" />
                    ) : (
                      s.step
                    )}
                  </div>

                  <div className="pl-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        className={`text-sm font-bold ${
                          s.status === 'current'
                            ? 'text-teal-900'
                            : s.status === 'completed'
                            ? 'text-slate-900'
                            : 'text-slate-500'
                        }`}
                      >
                        {s.title}
                      </h4>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          s.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : s.status === 'current'
                            ? 'bg-teal-100 text-teal-800 font-bold'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {s.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 2: Requirements Checklist */}
        {activeTab === 'checklist' && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                Statutory Items Audit Status
              </h3>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                5 of 6 Satisfied
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {checklistItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${
                    item.status === 'verified'
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : item.status === 'attention'
                      ? 'border-amber-300 bg-amber-50/50'
                      : 'border-blue-200 bg-blue-50/30'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-500">{item.note}</p>
                  </div>
                  <div>
                    {item.status === 'verified' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        <Icon name="check_circle" className="text-sm" /> Verified
                      </span>
                    )}
                    {item.status === 'attention' && (
                      <button
                        onClick={() => navigate('/clinic-onboarding/more-information')}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-200 hover:bg-amber-300 px-2 py-1 rounded transition-colors"
                      >
                        <Icon name="error" className="text-sm" /> Respond
                      </button>
                    )}
                    {item.status === 'scheduled' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                        <Icon name="calendar_today" className="text-sm" /> 24 Oct
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Action Bar */}
        <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Icon name="notifications_active" className="text-base text-teal-600" />
            <span>SMS and email alerts enabled for all status transitions</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => navigate('/clinic-onboarding/rejection-details')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Simulate Rejection (15.21)
            </button>
            <button
              onClick={() => navigate('/clinic-onboarding/more-information')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Icon name="edit_note" className="text-base" />
              Provide Requested Info (15.20)
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
    </div>
  );
}
