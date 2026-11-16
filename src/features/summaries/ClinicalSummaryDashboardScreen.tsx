import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

interface PrioritySummary {
  id: string;
  name: string;
  initials: string;
  ageGender: string;
  dhaCode: string;
  status: 'PENDING_REVIEW' | 'CHANGES_REQUIRED';
  title: string;
  meta: string;
  warningNote?: string;
}

const mockPriorityQueue: PrioritySummary[] = [
  {
    id: 'sum-01',
    name: 'Amara Okafor',
    initials: 'AO',
    ageGender: '34y F',
    dhaCode: 'DHA-2026-00451',
    status: 'PENDING_REVIEW',
    title: 'Comprehensive Oral-Health Summary',
    meta: 'v1.0 AI Draft • Generated Today, 10:15 WAT • Dr. Daniel James',
  },
  {
    id: 'sum-02',
    name: 'Chinedu Okafor',
    initials: 'CO',
    ageGender: '34y M',
    dhaCode: 'DHA-10482',
    status: 'CHANGES_REQUIRED',
    title: 'Investigation Synthesis (Bitewing & PA #16)',
    meta: 'v1.2 Revised Draft • Awaiting dentist re-validation',
    warningNote: 'Note: Dentist flagged mismatch between pulp cold test and radiographic widening.',
  },
];

const mockRecentSummaries = [
  {
    id: 'rec-01',
    patient: 'Rashid Eze',
    title: 'Post-Endo Final Synthesis • Sec 9, 10',
    status: 'APPROVED',
    doctor: 'Dr. Daniel James (DHA-D-491)',
    time: '2h ago',
  },
  {
    id: 'rec-02',
    patient: 'Sarah Bello',
    title: 'Periodontal Re-evaluation • Sec 11',
    status: 'APPROVED',
    doctor: 'Dr. Daniel James (DHA-D-491)',
    time: '4h ago',
  },
  {
    id: 'rec-03',
    patient: 'Tariq Mansoor',
    title: 'Prosthodontic Plan Synthesis • Sec 10',
    status: 'DRAFT',
    doctor: 'Unassigned • Auto-generated 1h ago',
    time: '1h ago',
  },
];

export function ClinicalSummaryDashboardScreen() {
  const navigate = useNavigate();
  const [selectedKpi, setSelectedKpi] = useState<string>('all');
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);

  const toggleDismissAlert = (index: number) => {
    setDismissedAlerts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <SummaryShell
      pageTitle="Clinical Summary & AI Dashboard"
      badgeCode="12.1"
      badgeLabel="Summary Hub"
      currentStep="Dashboard"
    >
      <div className="space-y-6">
        {/* Banner: Supervised Clinical Intelligence & Top Actions */}
        <div className="bg-gradient-to-r from-white via-[#f2f3ff] to-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#006194]">
                <Icon name="auto_awesome" className="text-[15px]" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Supervised Clinical Intelligence
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e] leading-snug">
                AI-assisted clinical documentation, synthesis & dentist-supervised sign-off
              </h2>
              <p className="text-sm text-[#3f4850] max-w-3xl">
                Synthesize patient chart entries, odontograms, radiographic imaging, and laboratory diagnostics into
                structured clinical briefs with full provenance auditing.
              </p>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigate('/summaries/patient-selection')}
                className="flex items-center justify-center gap-2 bg-[#006194] hover:bg-[#007bb9] text-white py-3 px-5 rounded-xl font-semibold text-sm shadow-sm active:scale-95 transition-all"
              >
                <Icon name="add_circle" className="text-[20px]" />
                <span>New Summary</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/summaries/workspace')}
                className="flex items-center justify-center gap-2 bg-white hover:bg-[#f2f3ff] text-[#131b2e] border border-[#eaedff] py-3 px-4 rounded-xl font-semibold text-sm shadow-sm active:scale-95 transition-all"
              >
                <Icon name="history" className="text-[20px] text-[#3f4850]" />
                <span className="hidden sm:inline">Summary History</span>
                <span className="sm:hidden">History</span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Metric Overview (Responsive Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Total Generated */}
          <button
            type="button"
            onClick={() => setSelectedKpi('all')}
            className={`text-left bg-white p-4 sm:p-5 rounded-2xl border transition-all ${
              selectedKpi === 'all'
                ? 'border-[#006194] ring-2 ring-[#006194]/20 shadow-sm'
                : 'border-[#eaedff] hover:border-[#bfc7d2]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#3f4850]">Total Generated</span>
              <div className="w-8 h-8 rounded-lg bg-[#e2e7ff] text-[#006194] flex items-center justify-center">
                <Icon name="clinical_notes" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">142</span>
              <span className="text-xs text-[#707881] block mt-0.5">Cumulative DHA records</span>
            </div>
          </button>

          {/* Pending Review */}
          <button
            type="button"
            onClick={() => setSelectedKpi('pending')}
            className={`text-left bg-white p-4 sm:p-5 rounded-2xl border transition-all relative overflow-hidden ${
              selectedKpi === 'pending'
                ? 'border-[#006a61] ring-2 ring-[#006a61]/20 shadow-sm'
                : 'border-[#eaedff] hover:border-[#bfc7d2]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#3f4850]">Pending Review</span>
              <span className="px-2 py-0.5 bg-[#86f2e4] text-[#006f66] rounded-full text-[11px] font-bold">
                8 Queue
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#006a61]">8</span>
                <span className="text-xs font-semibold text-[#006a61]">Dentist Action</span>
              </div>
              <span className="text-xs text-[#707881] block mt-0.5">Avg ~12 min wait</span>
            </div>
          </button>

          {/* Approved */}
          <button
            type="button"
            onClick={() => setSelectedKpi('approved')}
            className={`text-left bg-white p-4 sm:p-5 rounded-2xl border transition-all ${
              selectedKpi === 'approved'
                ? 'border-[#006a61] ring-2 ring-[#006a61]/20 shadow-sm'
                : 'border-[#eaedff] hover:border-[#bfc7d2]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#3f4850]">Approved</span>
              <div className="w-8 h-8 rounded-lg bg-[#86f2e4]/40 text-[#006a61] flex items-center justify-center">
                <Icon name="verified" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#006a61]">126</span>
              <span className="text-xs text-[#707881] block mt-0.5">Ready &amp; Nigeria Health Information Exchange Synced</span>
            </div>
          </button>

          {/* Safeguards & Drafts */}
          <button
            type="button"
            onClick={() => setSelectedKpi('safeguards')}
            className={`text-left bg-white p-4 sm:p-5 rounded-2xl border transition-all ${
              selectedKpi === 'safeguards'
                ? 'border-[#ba1a1a] ring-2 ring-[#ba1a1a]/20 shadow-sm'
                : 'border-[#eaedff] hover:border-[#bfc7d2]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#3f4850]">Safeguards</span>
              <div className="w-8 h-8 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                <Icon name="flag" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-[#ba1a1a]">3</span>
                <span className="text-xs text-[#ba1a1a] font-medium block">Changes</span>
              </div>
              <div className="w-px h-7 bg-[#eaedff]"></div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-[#131b2e]">5</span>
                <span className="text-xs text-[#707881] font-medium block">Drafts</span>
              </div>
            </div>
          </button>
        </div>

        {/* SECTION A: AI Synthesis Modules Fast Launcher */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#131b2e]">AI Synthesis Modules</h3>
              <p className="text-xs text-[#707881]">Tailored clinical intelligence models for specific dental domains</p>
            </div>
            <span className="text-xs font-bold text-[#006194] bg-[#e2e7ff] px-2.5 py-1 rounded-full">
              5 Workflows
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* 1. Clinical Summary */}
            <button
              type="button"
              onClick={() => navigate('/summaries/generate?model=comprehensive')}
              className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-xs flex flex-col items-center text-center space-y-2 hover:border-[#006194] hover:shadow-sm active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#cce5ff] text-[#006194] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="auto_awesome_motion" className="text-[24px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#131b2e] leading-snug">Clinical Summary</span>
                <span className="text-xs text-[#707881] mt-0.5">SOAP + Charts</span>
              </div>
            </button>

            {/* 2. Patient Guide */}
            <button
              type="button"
              onClick={() => navigate('/summaries/generate?model=plain_language')}
              className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-xs flex flex-col items-center text-center space-y-2 hover:border-[#006a61] hover:shadow-sm active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#86f2e4] text-[#006a61] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="chat_bubble_outline" className="text-[24px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#131b2e] leading-snug">Patient Guide</span>
                <span className="text-xs text-[#707881] mt-0.5">Plain English</span>
              </div>
            </button>

            {/* 3. Visual Mapping */}
            <button
              type="button"
              onClick={() => navigate('/summaries/generate?model=odontogram')}
              className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-xs flex flex-col items-center text-center space-y-2 hover:border-[#006194] hover:shadow-sm active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#e2e7ff] text-[#006194] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="dentistry" className="text-[24px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#131b2e] leading-snug">Visual Mapping</span>
                <span className="text-xs text-[#707881] mt-0.5">Odontogram</span>
              </div>
            </button>

            {/* 4. AI Insights */}
            <button
              type="button"
              onClick={() => navigate('/summaries/generate?model=investigation')}
              className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-xs flex flex-col items-center text-center space-y-2 hover:border-[#006194] hover:shadow-sm active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#cde5ff] text-[#006195] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="lightbulb" className="text-[24px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#131b2e] leading-snug">AI Insights</span>
                <span className="text-xs text-[#707881] mt-0.5">Rule Checks</span>
              </div>
            </button>

            {/* 5. Rx / Follow-Up */}
            <button
              type="button"
              onClick={() => navigate('/summaries/generate?model=treatment')}
              className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-xs flex flex-col items-center text-center space-y-2 hover:border-[#006194] hover:shadow-sm active:scale-95 transition-all group col-span-2 sm:col-span-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#eaedff] text-[#3f4850] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="prescriptions" className="text-[24px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#131b2e] leading-snug">Rx / Follow-Up</span>
                <span className="text-xs text-[#707881] mt-0.5">Care Trajectory</span>
              </div>
            </button>
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT FOR DESKTOP: Priority Queue + Safeguards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 Cols): Pending Dentist Approvals */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#131b2e]">Dentist Review Queue</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold">
                  2 Urgent
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/summaries/workspace')}
                className="text-xs font-semibold text-[#006194] hover:underline"
              >
                View All (8)
              </button>
            </div>

            <div className="space-y-3">
              {mockPriorityQueue.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-xs space-y-3 hover:border-[#bfc7d2] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#e2e7ff] text-[#006194] font-bold text-sm flex items-center justify-center">
                        {item.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-[#131b2e]">{item.name}</h4>
                          <span className="text-xs text-[#707881]">• {item.ageGender}</span>
                        </div>
                        <span className="text-xs font-mono text-[#006194]">{item.dhaCode}</span>
                      </div>
                    </div>

                    {item.status === 'PENDING_REVIEW' ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#006a61] animate-ping"></span>
                        PENDING REVIEW
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold flex items-center gap-1">
                        <Icon name="edit_note" className="text-[14px]" />
                        CHANGES REQ.
                      </span>
                    )}
                  </div>

                  {/* Summary Details */}
                  <div className="bg-[#f2f3ff] p-3 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-[#006194] font-semibold text-sm">
                      <Icon name="summarize" className="text-[16px]" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-[#3f4850]">{item.meta}</p>
                    {item.warningNote && (
                      <p className="text-[#ba1a1a] font-medium pt-1 border-t border-[#eaedff]">
                        {item.warningNote}
                      </p>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => navigate('/summaries/workspace')}
                      className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-xs active:scale-95 transition-all ${
                        item.status === 'PENDING_REVIEW'
                          ? 'bg-[#006194] text-white hover:bg-[#007bb9]'
                          : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                      }`}
                    >
                      <Icon
                        name={item.status === 'PENDING_REVIEW' ? 'draw' : 'edit'}
                        className="text-[18px]"
                      />
                      <span>{item.status === 'PENDING_REVIEW' ? 'Review & Sign' : 'Edit Draft'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/summaries/sources')}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f2f3ff] text-[#3f4850] hover:text-[#006194] hover:bg-[#e2e7ff] transition-colors"
                      title="Inspect Source Data"
                    >
                      <Icon name="visibility" className="text-[18px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (1 Col): Clinical Safeguards Box */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#ba1a1a]">
                <Icon name="attribution" className="text-[20px]" />
                <h3 className="text-base font-bold text-[#131b2e]">Clinical Safeguards</h3>
              </div>
              <span className="text-xs font-bold text-[#ba1a1a] bg-[#ffdad6] px-2 py-0.5 rounded-full">
                {3 - dismissedAlerts.length} Unresolved
              </span>
            </div>

            <div className="bg-[#ffdad6]/40 border border-[#ffdad6] p-4 rounded-2xl space-y-3">
              {/* Alert 1 */}
              {!dismissedAlerts.includes(0) && (
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] shrink-0 mt-0.5">
                    <Icon name="compare_arrows" className="text-[16px]" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#131b2e]">Conflicting Diagnostic Record</span>
                      <button
                        type="button"
                        onClick={() => toggleDismissAlert(0)}
                        className="text-[#707881] hover:text-[#ba1a1a]"
                        aria-label="Dismiss alert"
                      >
                        <Icon name="close" className="text-[14px]" />
                      </button>
                    </div>
                    <p className="text-[#3f4850] mt-0.5 leading-relaxed">
                      Pulp vitality test recorded <strong className="text-[#131b2e]">Normal</strong> while PA shows periapical widening on <strong className="text-[#006194]">#16</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* Alert 2 */}
              {!dismissedAlerts.includes(1) && (
                <div className="flex items-start gap-3 pt-2 border-t border-[#eaedff]">
                  <div className="w-7 h-7 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] shrink-0 mt-0.5">
                    <Icon name="pending_actions" className="text-[16px]" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#131b2e]">Missing Laboratory Clearance</span>
                      <button
                        type="button"
                        onClick={() => toggleDismissAlert(1)}
                        className="text-[#707881] hover:text-[#ba1a1a]"
                        aria-label="Dismiss alert"
                      >
                        <Icon name="close" className="text-[14px]" />
                      </button>
                    </div>
                    <p className="text-[#3f4850] mt-0.5 leading-relaxed">
                      Pre-op <strong className="text-[#131b2e]">HbA1c panel</strong> outstanding for patient Amina Yusuf before periodontal plan release.
                    </p>
                  </div>
                </div>
              )}

              {/* Alert 3 */}
              {!dismissedAlerts.includes(2) && (
                <div className="flex items-start gap-3 pt-2 border-t border-[#eaedff]">
                  <div className="w-7 h-7 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] shrink-0 mt-0.5">
                    <Icon name="photo_camera" className="text-[16px]" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#131b2e]">Unreviewed Attachment</span>
                      <button
                        type="button"
                        onClick={() => toggleDismissAlert(2)}
                        className="text-[#707881] hover:text-[#ba1a1a]"
                        aria-label="Dismiss alert"
                      >
                        <Icon name="close" className="text-[14px]" />
                      </button>
                    </div>
                    <p className="text-[#3f4850] mt-0.5 leading-relaxed">
                      1 intraoral photograph (Quadrant 2 occlusal) requires supervising dentist sign-off.
                    </p>
                  </div>
                </div>
              )}

              {dismissedAlerts.length === 3 && (
                <div className="text-center py-4 text-xs text-[#006a61] font-semibold">
                  All clinical safeguard alerts addressed for active shift.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION D: Recent Clinical Summaries Activity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-[#131b2e]">Recent Clinical Summaries</h3>
            <button
              type="button"
              onClick={() => navigate('/summaries/workspace')}
              className="text-xs font-semibold text-[#006194] hover:underline"
            >
              Full Archive
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {mockRecentSummaries.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-xs space-y-2.5 flex flex-col justify-between hover:border-[#bfc7d2] transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#131b2e]">{item.patient}</h4>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'APPROVED'
                          ? 'bg-[#86f2e4] text-[#006f66]'
                          : 'bg-[#eaedff] text-[#3f4850]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#707881] mt-1">{item.title}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#eaedff] text-xs">
                  <div className="flex items-center gap-1 text-[#707881]">
                    <Icon name="verified_user" className="text-[15px] text-[#006a61]" />
                    <span className="truncate max-w-[150px]">{item.doctor}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/summaries/workspace')}
                    className="font-bold text-[#006194] flex items-center gap-0.5 hover:underline"
                  >
                    <span>View</span>
                    <Icon name="arrow_forward" className="text-[14px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION E: Core Principle Notice */}
        <div className="bg-[#eaedff] p-4 sm:p-5 rounded-2xl flex items-start gap-4 border border-[#dae2fd]">
          <div className="w-10 h-10 rounded-xl bg-white text-[#006194] flex items-center justify-center shrink-0 shadow-xs">
            <Icon name="security" className="text-[22px]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#131b2e]">Clinical Governance Principle</h4>
            <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
              <strong>AI Prepares. The Dentist Reviews. The Dentist Approves.</strong> AI-generated content never
              automatically confirms diagnoses, prescribes medication, or publishes to the patient portal without
              licensed clinician authorization.
            </p>
          </div>
        </div>
      </div>
    </SummaryShell>
  );
}
