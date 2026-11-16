import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface Milestone {
  id: number;
  title: string;
  time: string;
  status: 'completed' | 'active' | 'pending';
  desc: string;
  badge?: string;
}

interface ToothArch {
  num: number;
  status: 'Sound' | 'In Treatment' | 'Caries' | 'Restored';
  isTarget?: boolean;
}

export const ClinicalActivityDetailsScreen: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isDelayModalOpen, setIsDelayModalOpen] = useState(false);
  const [delayMinutes, setDelayMinutes] = useState('15');
  const [delayReason, setDelayReason] = useState('Anatomical complexity requiring careful layer curing');
  const [activityStatus, setActivityStatus] = useState<'Active' | 'Completed' | 'Delayed'>('Active');
  const [elapsedPercent, setElapsedPercent] = useState(85);
  const [selectedTooth, setSelectedTooth] = useState<number>(16);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const teethData: ToothArch[] = [
    { num: 14, status: 'Sound' },
    { num: 15, status: 'Sound' },
    { num: 16, status: 'In Treatment', isTarget: true },
    { num: 17, status: 'Sound' },
    { num: 18, status: 'Sound' },
  ];

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      title: 'Check-in & Triage',
      time: '08:48 AM',
      status: 'completed',
      desc: 'Cleared by Front Desk • Vitals normal (BP 118/76, SpO2 99%)',
      badge: 'Cleared by Front Desk',
    },
    {
      id: 2,
      title: 'Local Infiltration Anesthesia',
      time: '09:05 AM',
      status: 'completed',
      desc: 'Septocaine 4% w/ 1:100k Epi (1.7ml) • Verified aspirating technique',
    },
    {
      id: 3,
      title: 'Cavity Prep & Etch/Bond',
      time: '09:20 AM',
      status: 'completed',
      desc: 'Complete • Total-etch protocol, dentin sealed w/ 7th gen bonding agent',
    },
    {
      id: 4,
      title: 'Composite Placement & UV Cure',
      time: '09:42 AM',
      status: 'active',
      desc: 'Incremental curing (20s/layer) • Filtek Supreme Ultra VITA A2',
      badge: 'Active In Chair',
    },
    {
      id: 5,
      title: 'Occlusal Polishing & Post-op Check',
      time: 'Est 09:55 AM',
      status: 'pending',
      desc: 'Pending • Articulating paper bite confirmation and high-shine disk',
    },
  ]);

  const handleCompleteProcedure = () => {
    setMilestones((prev) =>
      prev.map((m) => ({ ...m, status: 'completed' }))
    );
    setActivityStatus('Completed');
    setElapsedPercent(100);
    setIsCompleteModalOpen(false);
    showToast('Encounter marked completed! Patient discharged to reception desk.');
  };

  const handleReportDelay = (e: React.FormEvent) => {
    e.preventDefault();
    setActivityStatus('Delayed');
    setIsDelayModalOpen(false);
    showToast(`Operational delay logged (+${delayMinutes}m). Dispatch & waiting queue notified.`);
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] text-[#faf8ff] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-[#86f2e4] text-lg" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <Icon name="close" className="text-sm" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#dae2fd]/40">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full text-[#131b2e] hover:bg-[#e2e7ff] active:bg-[#dae2fd] transition-colors"
              aria-label="Back"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#006194]">Encounter Detail</span>
                <span className="text-xs text-[#707881]">•</span>
                <span className="font-mono text-xs text-[#3f4850]">#ACT-2026-9914</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Clinical Activity Details
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Activity log exported to PDF')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="print" className="text-[16px]" />
              <span>Print Sheet</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Banner Section */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f2f3ff] text-[#006194] font-semibold text-xs uppercase tracking-wider">
                <Icon name="medical_information" className="text-[15px] fill-current" />
                <span>Encounter #ACT-2026-9914</span>
              </div>
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                  activityStatus === 'Completed'
                    ? 'bg-[#89f5e7]/30 text-[#006a61]'
                    : activityStatus === 'Delayed'
                    ? 'bg-[#ffdad6] text-[#ba1a1a]'
                    : 'bg-[#86f2e4]/30 text-[#006f66]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    activityStatus === 'Completed'
                      ? 'bg-[#006a61]'
                      : activityStatus === 'Delayed'
                      ? 'bg-[#ba1a1a]'
                      : 'bg-[#006a61] animate-pulse'
                  }`}
                />
                <span>{activityStatus === 'Completed' ? 'Procedure Completed' : activityStatus === 'Delayed' ? 'Delayed (+15m)' : 'Active Procedure'}</span>
              </div>
            </div>
            <p className="text-xs uppercase font-semibold text-[#707881] tracking-wider">Restorative Dentistry Encounter</p>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl md:text-2xl font-bold text-[#131b2e] mt-0.5 leading-snug">
              Mesio-Occlusal Direct Composite Restoration
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDelayModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#dae2fd]/50 hover:bg-[#dae2fd] text-[#131b2e] text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Icon name="notification_important" className="text-[18px] text-[#ba1a1a]" />
              <span>Report Delay</span>
            </button>
            <button
              onClick={() => setIsCompleteModalOpen(true)}
              disabled={activityStatus === 'Completed'}
              className={`px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors ${
                activityStatus === 'Completed' ? 'bg-[#707881] cursor-not-allowed' : 'bg-[#006194] hover:bg-[#007bb9]'
              }`}
            >
              <Icon name="check_circle" className="text-[18px]" />
              <span>{activityStatus === 'Completed' ? 'Completed' : 'Finish & Discharge'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Metadata Bento, Micro-chart, Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Activity Metadata Bento Card */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-5">
              {/* Patient Snippet */}
              <div className="flex items-center justify-between gap-3 bg-[#f2f3ff] p-3.5 rounded-xl border border-[#eaedff]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-[#cce5ff] flex items-center justify-center shrink-0 text-[#006194] font-bold text-lg">
                    AO
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e] truncate">
                        Amara Okafor
                      </span>
                      <span className="px-2 py-0.5 bg-white text-[#3f4850] text-xs font-medium rounded-full border border-[#dae2fd]">
                        34y • Female
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-[#707881]">
                      <span className="font-mono">LifeCode: NG-990-281-LAG</span>
                      <button
                        onClick={() => showToast('Patient LifeCode copied!')}
                        className="text-[#006194] hover:underline flex items-center gap-0.5"
                      >
                        <Icon name="content_copy" className="text-[12px]" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61] shrink-0">
                  <Icon name="verified_user" className="text-[20px]" />
                </div>
              </div>

              {/* Practitioner Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex flex-col justify-between border border-[#eaedff]">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#006194] font-semibold text-xs uppercase tracking-wider">
                      <Icon name="stethoscope" className="text-[16px]" />
                      <span>Lead Clinician</span>
                    </div>
                    <p className="font-semibold text-sm text-[#131b2e] mt-1">Dr. Daniel Okoro, DDS</p>
                  </div>
                  <span className="font-mono text-xs text-[#707881] mt-2">Lic #DEN-78421</span>
                </div>

                <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex flex-col justify-between border border-[#eaedff]">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#006a61] font-semibold text-xs uppercase tracking-wider">
                      <Icon name="health_and_safety" className="text-[16px]" />
                      <span>Chairside Nurse</span>
                    </div>
                    <p className="font-semibold text-sm text-[#131b2e] mt-1 truncate">Zainab Tariq, RN</p>
                  </div>
                  <span className="font-mono text-xs text-[#707881] mt-2">IPC Lead Nurse</span>
                </div>
              </div>

              {/* Facility & Timing Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 text-[#3f4850] bg-white p-3 rounded-xl border border-[#dae2fd]/60">
                  <Icon name="location_on" className="text-[20px] text-[#006194] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs uppercase font-semibold text-[#707881] block">Care Setting</span>
                    <span className="text-sm font-medium text-[#131b2e]">Wuse 2 Main Branch</span>
                    <span className="text-xs text-[#707881] block">Suite 01 (Surgical Restorative)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-[#3f4850] bg-white p-3 rounded-xl border border-[#dae2fd]/60">
                  <Icon name="schedule" className="text-[20px] text-[#006194] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs uppercase font-semibold text-[#707881] block">Encounter Timing</span>
                    <span className="text-sm font-medium text-[#131b2e]">Today • 09:00 – 10:00 AM</span>
                    <span className="text-xs text-[#707881] block">Standard 60-min slot</span>
                  </div>
                </div>
              </div>

              {/* Real-Time Chairside Progress Status */}
              <div className="bg-[#eaedff]/60 p-4 rounded-xl flex flex-col gap-2.5 border border-[#dae2fd]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="chair" className="text-[18px] text-[#006194]" />
                    <span className="font-semibold text-sm text-[#131b2e]">
                      {activityStatus === 'Completed' ? 'Procedure Finished' : 'In Chair • Final Stage'}
                    </span>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#006194]">
                    {elapsedPercent}% Elapsed
                  </span>
                </div>
                <div className="w-full bg-[#dae2fd] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#006194] h-full rounded-full transition-all duration-700"
                    style={{ width: `${elapsedPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-[#3f4850]">
                  <span>{activityStatus === 'Completed' ? 'Procedure recorded' : 'Approx. 9 min remaining'}</span>
                  <span className="font-semibold text-[#006a61] uppercase tracking-wider">
                    {activityStatus === 'Completed' ? 'Cleaned & Sterilised' : 'T-minus Polishing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Dental Micro-Chart Preview */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#707881] tracking-wider block">Target Arch Notation</span>
                  <span className="text-sm font-bold text-[#131b2e]">FDI Notation System • Quadrant 1</span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#cce5ff] text-[#001d31] font-mono text-xs font-bold">
                  Tooth #16 Maxillary Right
                </span>
              </div>

              {/* Tooth Visual Schema */}
              <div className="flex items-center justify-center py-3 gap-3 overflow-x-auto">
                {teethData.map((t) => {
                  const isSelected = selectedTooth === t.num;
                  return (
                    <button
                      key={t.num}
                      type="button"
                      onClick={() => {
                        setSelectedTooth(t.num);
                        showToast(`Tooth #${t.num} selected: ${t.status}`);
                      }}
                      className={`relative flex flex-col items-center justify-between p-2 rounded-xl transition-all ${
                        t.isTarget
                          ? 'w-18 h-20 bg-[#cce5ff] border-2 border-[#006194] shadow-md scale-105'
                          : isSelected
                          ? 'w-14 h-16 bg-[#f2f3ff] border border-[#006194] opacity-100'
                          : 'w-14 h-16 bg-[#f2f3ff] border border-[#dae2fd] opacity-65 hover:opacity-100'
                      }`}
                    >
                      <span className={`text-xs font-bold ${t.isTarget ? 'text-[#001d31]' : 'text-[#3f4850]'}`}>
                        #{t.num}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          t.isTarget ? 'bg-[#006194] text-white' : 'bg-[#bfc7d2] text-[#131b2e]'
                        }`}
                      >
                        <Icon name={t.isTarget ? 'dentistry' : 'circle'} className="text-[14px]" />
                      </div>
                      <span
                        className={`font-mono text-[10px] uppercase font-semibold ${
                          t.isTarget ? 'text-[#006194]' : 'text-[#707881]'
                        }`}
                      >
                        {t.isTarget ? 'MO Comp' : t.status}
                      </span>
                      {t.isTarget && (
                        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#006a61] ring-2 ring-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between text-xs text-[#3f4850]">
                <span>
                  <strong>Shade Selection:</strong> VITA A2 • Nanohybrid Matrix Direct Adhesive
                </span>
                <span className="font-mono text-[#006194] font-semibold">Cavity Class II (MO)</span>
              </div>
            </div>

            {/* Statutory Healthcare Confidentiality Notice */}
            <div className="p-4 rounded-xl bg-[#eaedff]/60 border border-[#dae2fd] flex items-start gap-3">
              <Icon name="lock" className="text-[20px] text-[#707881] shrink-0 mt-0.5" />
              <div className="flex-1 text-xs text-[#3f4850] space-y-1">
                <span className="font-semibold text-[#131b2e] uppercase block tracking-wider">
                  Statutory Healthcare Privacy Guardrail
                </span>
                <p className="leading-relaxed">
                  Detailed tooth charting notations, intraoral photography, and anesthetic dosing logs are encrypted in
                  Section 9 & 10. Operational coordinators monitor logistics and timing telemetry only.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Workflow Milestone Stepper & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Workflow Milestone Stepper */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e]">
                    Chairside Milestones
                  </h3>
                  <p className="text-xs text-[#707881]">Protocol compliance tracking</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-semibold uppercase">
                  {activityStatus === 'Completed' ? '5 of 5 Complete' : 'Phase 4 of 5'}
                </span>
              </div>

              {/* Stepper Timeline */}
              <div className="relative flex flex-col gap-5 pl-1">
                {/* Timeline vertical bar */}
                <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-[#eaedff] -z-0" />

                {milestones.map((m) => {
                  const isDone = m.status === 'completed';
                  const isActive = m.status === 'active';

                  return (
                    <div key={m.id} className="flex items-start gap-3.5 relative z-10">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-colors ${
                          isDone
                            ? 'bg-[#86f2e4] text-[#006f66]'
                            : isActive
                            ? 'bg-[#006194] text-white ring-4 ring-[#cce5ff] animate-pulse'
                            : 'bg-[#eaedff] text-[#707881]'
                        }`}
                      >
                        <Icon
                          name={isDone ? 'check' : isActive ? 'dentistry' : 'hourglass_empty'}
                          className="text-[18px]"
                        />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center justify-between gap-1 flex-wrap">
                          <span
                            className={`font-semibold text-sm ${
                              isActive ? 'text-[#006194] font-bold' : isDone ? 'text-[#131b2e]' : 'text-[#707881]'
                            }`}
                          >
                            {m.title}
                          </span>
                          <span className="font-mono text-xs text-[#707881]">{m.time}</span>
                        </div>
                        <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">{m.desc}</p>
                        {m.badge && (
                          <div className="mt-1.5">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#f2f3ff] text-[11px] font-semibold text-[#006194]">
                              <Icon name="verified" className="text-[12px] text-[#006a61]" />
                              {m.badge}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Operational Handover */}
            <div className="bg-[#eaedff] rounded-2xl p-5 border border-[#dae2fd] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[#006194]">
                <Icon name="assignment_turned_in" className="text-[22px]" />
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">
                  Next Operational Handover
                </span>
              </div>
              <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Discharge Clearance & Recare Scheduling
              </h4>
              <p className="text-xs text-[#3f4850] leading-relaxed">
                When chairside is flagged complete, front desk schedules 6-month recall, prints post-op care sheet, and
                settles insurance co-pay ($35.00).
              </p>
              <div className="pt-2 border-t border-[#bfc7d2]/40 flex items-center justify-between text-xs text-[#3f4850]">
                <span className="flex items-center gap-1 font-medium">
                  <Icon name="account_balance_wallet" className="text-[15px] text-[#006a61]" />
                  <span>Co-pay: MetLife DHA</span>
                </span>
                <span className="font-mono text-[#006194] font-bold">Desk Queue #3</span>
              </div>
            </div>

            {/* Connected Clinical Module Links */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-3">
              <span className="text-xs uppercase font-semibold text-[#707881] tracking-wider block">
                Originating DHA Modules
              </span>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast('Navigating to Section 9 Odontogram Record...');
                    navigate('/clinical-workspace');
                  }}
                  className="w-full text-left bg-[#f2f3ff] hover:bg-[#eaedff] p-3 rounded-xl flex items-center justify-between transition-colors border border-[#dae2fd]/50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#006194] shrink-0 shadow-xs">
                      <Icon name="view_timeline" className="text-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-semibold text-xs text-[#131b2e] block truncate">
                        Section 9 Odontogram Record
                      </span>
                      <span className="text-[11px] text-[#707881] block truncate">
                        Tooth #16 Full History & Pocket Depth
                      </span>
                    </div>
                  </div>
                  <Icon name="chevron_right" className="text-[18px] text-[#707881] shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    showToast('Viewing Treatment Plan #TP-2026-089...');
                  }}
                  className="w-full text-left bg-[#f2f3ff] hover:bg-[#eaedff] p-3 rounded-xl flex items-center justify-between transition-colors border border-[#dae2fd]/50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#006194] shrink-0 shadow-xs">
                      <Icon name="fact_check" className="text-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-semibold text-xs text-[#131b2e] block truncate">
                        Treatment Plan #TP-2026-089
                      </span>
                      <span className="text-[11px] text-[#707881] block truncate">
                        Pre-authorized under Section 13 DHA Registry
                      </span>
                    </div>
                  </div>
                  <Icon name="chevron_right" className="text-[18px] text-[#707881] shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    showToast('Opening Section 10 Clinical Summary...');
                    navigate('/clinical-workspace');
                  }}
                  className="w-full text-left bg-[#f2f3ff] hover:bg-[#eaedff] p-3 rounded-xl flex items-center justify-between transition-colors border border-[#dae2fd]/50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#006194] shrink-0 shadow-xs">
                      <Icon name="clinical_notes" className="text-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-semibold text-xs text-[#131b2e] block truncate">
                        Section 10 Clinical Summary
                      </span>
                      <span className="text-[11px] text-[#707881] block truncate">
                        Diagnostic Radiographs & Pre-op Photos
                      </span>
                    </div>
                  </div>
                  <Icon name="chevron_right" className="text-[18px] text-[#707881] shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Complete Modal */}
      {isCompleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61]">
              <Icon name="check_circle" className="text-[28px]" />
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-[#131b2e]">
                Confirm Procedure Completion?
              </h3>
              <p className="text-xs text-[#3f4850] mt-1">
                This will record final curing for Tooth #16, update the patient encounter, and trigger notification to the
                reception desk queue for checkout.
              </p>
            </div>
            <div className="bg-[#f2f3ff] p-3 rounded-xl text-xs space-y-1 font-mono text-[#3f4850]">
              <div>Patient: Amara Okafor (NG-990-281-LAG)</div>
              <div>Clinician: Dr. Daniel Okoro, DDS</div>
              <div>Procedure: MO Direct Composite #16</div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCompleteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCompleteProcedure}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#006194] hover:bg-[#007bb9] shadow-sm flex items-center gap-1.5"
              >
                <Icon name="done_all" className="text-[16px]" />
                <span>Mark Complete & Route</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delay Modal */}
      {isDelayModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <Icon name="notification_important" className="text-[28px]" />
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-[#131b2e]">
                Report Operational Delay
              </h3>
              <p className="text-xs text-[#3f4850] mt-1">
                Inform waiting room management and adjust scheduled chair turnover time.
              </p>
            </div>
            <form onSubmit={handleReportDelay} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Estimated Additional Time</label>
                <div className="grid grid-cols-4 gap-2">
                  {['10', '15', '20', '30'].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDelayMinutes(mins)}
                      className={`py-2 rounded-lg text-xs font-semibold border ${
                        delayMinutes === mins
                          ? 'bg-[#006194] text-white border-[#006194]'
                          : 'bg-[#f2f3ff] text-[#131b2e] border-[#dae2fd]'
                      }`}
                    >
                      +{mins} min
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Reason for Delay</label>
                <textarea
                  value={delayReason}
                  onChange={(e) => setDelayReason(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  placeholder="Enter detail for front desk coordinators..."
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDelayModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#ba1a1a] hover:bg-[#93000a] shadow-sm flex items-center gap-1.5"
                >
                  <Icon name="send" className="text-[16px]" />
                  <span>Notify Operations</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
