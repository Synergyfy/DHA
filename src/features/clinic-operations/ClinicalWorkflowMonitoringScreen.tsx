import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface PipelineStage {
  code: string;
  count: number;
  title: string;
  subtitle: string;
  stageKey: string;
  isActiveAlert?: boolean;
  isSecondary?: boolean;
}

interface PatientEncounter {
  id: string;
  patientName: string;
  demographics: string;
  lifeCode: string;
  avatarUrl: string;
  statusBadge: string;
  statusBadgeStyle: string;
  statusDotColor?: string;
  stageNumber: number;
  stageLabel: string;
  timeElapsed: string;
  clinicianLabel: string;
  clinicianName: string;
  nextActionTitle: string;
  nextActionDesc: string;
  operatoryText: string;
  actionButtonLabel: string;
  actionButtonIcon: string;
  isAmberStripe?: boolean;
  imagePreview?: {
    time: string;
    title: string;
    icon: string;
  };
}

const PIPELINE_STAGES: PipelineStage[] = [
  { code: '01', count: 14, title: 'Intake', subtitle: '& Check-in', stageKey: 'intake' },
  { code: '02', count: 4, title: 'Examination', subtitle: 'Oral Diagnostics', stageKey: 'exam' },
  { code: '03', count: 3, title: 'Investigations', subtitle: 'Digital X-Ray/3D', stageKey: 'investigations', isActiveAlert: true },
  { code: '04', count: 4, title: 'Treatment Plan', subtitle: 'Consents & Prep', stageKey: 'plan' },
  { code: '05', count: 3, title: 'Chairside Care', subtitle: 'Active Operatory', stageKey: 'chairside', isSecondary: true },
  { code: '06', count: 8, title: 'Follow-up', subtitle: 'Recare & Discharge', stageKey: 'followup' },
];

const ENCOUNTERS_DATA: PatientEncounter[] = [
  {
    id: 'enc-01',
    patientName: 'Amara Okafor',
    demographics: '34y F',
    lifeCode: 'NG-990-281-LAG',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'In Progress',
    statusBadgeStyle: 'bg-[#89f5e7] text-[#00201d]',
    statusDotColor: 'bg-[#006a61]',
    stageNumber: 5,
    stageLabel: 'Stage 5: Chairside Treatment (Suite 01)',
    timeElapsed: '38 mins elapsed',
    clinicianLabel: 'Lead',
    clinicianName: 'Dr. Daniel Okoro, DDS',
    nextActionTitle: 'Next Required Action',
    nextActionDesc: 'Post-operative recovery check & discharge sign-off',
    operatoryText: 'Operatory 01 • Restorative',
    actionButtonLabel: 'View Activity Details',
    actionButtonIcon: 'chevron_right',
  },
  {
    id: 'enc-02',
    patientName: 'Fatima Garba',
    demographics: '29y F',
    lifeCode: 'NG-ABJ-771-402',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'Urgent Review',
    statusBadgeStyle: 'bg-[#89f5e7] text-[#00201d]',
    isAmberStripe: true,
    stageNumber: 3,
    stageLabel: 'Stage 3: Emergency Investigation',
    timeElapsed: '14 mins elapsed',
    clinicianLabel: 'Assigned',
    clinicianName: 'Dr. Daniel Okoro',
    imagePreview: {
      time: 'Acquired 6 mins ago',
      title: 'Periapical Radiograph (Tooth #19)',
      icon: 'perm_media',
    },
    nextActionTitle: 'Required Clinician Action',
    nextActionDesc: 'Doctor review of digital periapical radiograph',
    operatoryText: 'Imaging Suite B • Stat Call',
    actionButtonLabel: 'View Investigation',
    actionButtonIcon: 'visibility',
  },
  {
    id: 'enc-03',
    patientName: 'Ibrahim Waziri',
    demographics: '42y M',
    lifeCode: 'NG-ABJ-882-104',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'Active',
    statusBadgeStyle: 'bg-[#e2e7ff] text-[#131b2e]',
    statusDotColor: 'bg-[#006194]',
    stageNumber: 5,
    stageLabel: 'Stage 5: Chairside Orthodontics (Suite 02)',
    timeElapsed: '22 mins elapsed',
    clinicianLabel: 'Orthodontist',
    clinicianName: 'Dr. Sarah Bello',
    nextActionTitle: 'Next Required Action',
    nextActionDesc: 'Aligner tracking verification & next tray dispensing',
    operatoryText: 'Clear Aligner Series 08/18',
    actionButtonLabel: 'Clinical Details',
    actionButtonIcon: 'chevron_right',
  },
  {
    id: 'enc-04',
    patientName: 'Yusuf Abubakar',
    demographics: '38y M',
    lifeCode: 'NG-ABJ-112-909',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'Ready for Call',
    statusBadgeStyle: 'bg-[#cce5ff] text-[#001d31]',
    stageNumber: 1,
    stageLabel: 'Stage 1: Checked In / Waiting Lounge',
    timeElapsed: '8 mins elapsed',
    clinicianLabel: 'Prosthodontist',
    clinicianName: 'Dr. Michael James',
    nextActionTitle: 'Next Required Action',
    nextActionDesc: 'Call patient to Operatory Suite 03 for crown cementation',
    operatoryText: 'Waiting Lounge • Chair Turn Ready',
    actionButtonLabel: 'Call to Operatory',
    actionButtonIcon: 'notifications_active',
  },
];

export const ClinicalWorkflowMonitoringScreen: React.FC = () => {
  const navigate = useNavigate();

  const [activeStageFilter, setActiveStageFilter] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleEncounterAction = (enc: PatientEncounter) => {
    if (enc.actionButtonLabel === 'View Investigation') {
      navigate('/investigations');
    } else if (enc.actionButtonLabel === 'Call to Operatory') {
      showToast(`Chime dispatched: calling ${enc.patientName} to Operatory Suite 03.`);
    } else {
      showToast(`Opening clinical encounter record for ${enc.patientName}.`);
    }
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in border border-white/20">
          <Icon name="check_circle" className="text-emerald-300 text-[20px]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={() => navigate('/clinic-operations')}
              className="flex items-center gap-2 py-1 px-2 -ml-2 rounded-lg text-left hover:bg-[#eaedff] transition-colors"
            >
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider truncate">
                  Clinic Hub
                </span>
                <span className="font-semibold text-sm md:text-base text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                  Clinical Workflow Monitoring
                </span>
              </div>
              <Icon name="expand_more" className="text-[#707881] text-[20px] shrink-0" />
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              aria-label="Notifications"
              onClick={() => showToast('Auto-sync refreshed (15s heartbeat active)')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors relative"
            >
              <Icon name="notifications" className="text-[22px]" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shrink-0 text-white font-semibold text-xs shadow-sm">
              <Icon name="person" className="text-white text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 max-w-7xl mx-auto w-full px-4 md:px-8 flex-1">
        <div className="flex flex-col w-full space-y-6">
          {/* Top Context & Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse shrink-0"></span>
              <span className="text-xs font-semibold text-[#006a61] uppercase tracking-wider">
                Patient Care Pathway • Real-Time Pipeline Tracker
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
              Clinical Workflow Monitoring
            </h1>
            <p className="text-sm text-[#3f4850]">
              End-to-end patient encounter progression across diagnostic, surgical, restorative and treatment stages.
            </p>
          </div>

          {/* Live Pulse Metric Pill */}
          <div className="flex items-center justify-between bg-[#f2f3ff] p-4 rounded-2xl border border-[#dae2fd]/70 shadow-sm flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center shrink-0">
                <Icon name="timelapse" className="text-[20px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Pipeline Throughput</span>
                <span className="font-bold text-base md:text-lg text-[#131b2e]">36 Active Encounters</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#131b2e] border border-[#dae2fd] text-xs font-semibold">
              <Icon name="sync" className="text-[16px] text-[#006a61]" />
              <span className="text-[#3f4850]">Auto-sync 15s</span>
            </div>
          </div>

          {/* Care Pipeline Stage Stepper */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#707881] uppercase tracking-wider">
                Care Pipeline Stages
              </span>
              <span className="text-xs text-[#707881]">Click stage to filter</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {PIPELINE_STAGES.map((stg) => {
                const isSelected = activeStageFilter === stg.stageKey;
                return (
                  <button
                    key={stg.code}
                    onClick={() => setActiveStageFilter(isSelected ? null : stg.stageKey)}
                    className={`flex flex-col p-3.5 rounded-2xl shadow-sm text-left transition-all active:scale-[0.98] border ${
                      isSelected
                        ? 'border-[#006194] bg-[#cce5ff] ring-2 ring-[#006194]/20'
                        : stg.isActiveAlert
                        ? 'border-[#dae2fd] bg-[#cce5ff]/60 hover:bg-[#cce5ff]'
                        : stg.isSecondary
                        ? 'border-[#dae2fd] bg-[#89f5e7]/30 hover:bg-[#89f5e7]/50'
                        : 'border-[#dae2fd]/70 bg-white hover:bg-[#f2f3ff]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <span className="font-mono text-xs font-bold text-[#707881]">{stg.code}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          stg.isActiveAlert
                            ? 'bg-[#006194] text-white'
                            : stg.isSecondary
                            ? 'bg-[#006a61] text-white'
                            : 'bg-[#eaedff] text-[#3f4850]'
                        }`}
                      >
                        {stg.count}
                      </span>
                    </div>
                    <span className="font-semibold text-sm text-[#131b2e] truncate">{stg.title}</span>
                    <span className="text-xs text-[#3f4850] truncate">{stg.subtitle}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 pt-1 text-xs text-[#707881]">
              <Icon name="info" className="text-[16px] text-[#006194]" />
              <span>Care pathways adapt per encounter: Not all patients require every stage.</span>
            </div>
          </div>

          {/* Active Patient Encounters Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base md:text-lg text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                  Active Patient Encounters
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e2e7ff] text-[#006194]">
                  {ENCOUNTERS_DATA.length} Prioritized
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  aria-label="Filter"
                  onClick={() => showToast('Encounter filters applied')}
                  className="w-9 h-9 rounded-xl bg-white border border-[#dae2fd] flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff]"
                >
                  <Icon name="tune" className="text-[18px]" />
                </button>
                <button
                  aria-label="Sort"
                  onClick={() => showToast('Sorted by longest chair elapsed time')}
                  className="w-9 h-9 rounded-xl bg-white border border-[#dae2fd] flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff]"
                >
                  <Icon name="sort" className="text-[18px]" />
                </button>
              </div>
            </div>

            {/* Encounter Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {ENCOUNTERS_DATA.map((enc) => (
                <div
                  key={enc.id}
                  className="bg-white rounded-2xl shadow-sm border border-[#dae2fd]/70 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
                >
                  {enc.isAmberStripe && <div className="h-1.5 w-full bg-[#006a61]"></div>}

                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-[#eaedff]"
                          src={enc.avatarUrl}
                          alt={enc.patientName}
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-base text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                            {enc.patientName}
                          </span>
                          <span className="text-xs text-[#3f4850]">
                            {enc.demographics} • <span className="font-mono text-[#707881]">{enc.lifeCode}</span>
                          </span>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 ${enc.statusBadgeStyle}`}
                      >
                        {enc.statusDotColor && (
                          <span className={`w-1.5 h-1.5 rounded-full ${enc.statusDotColor}`}></span>
                        )}
                        {enc.statusBadge}
                      </span>
                    </div>

                    {/* Stage & Timing Tag */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs font-medium">
                        <Icon name="chair" className="text-[16px] text-[#006194]" />
                        <span>{enc.stageLabel}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#eaedff] text-[#3f4850] text-xs font-medium">
                        <Icon name="schedule" className="text-[16px] text-[#707881]" />
                        <span>{enc.timeElapsed}</span>
                      </div>
                    </div>

                    {/* Radiograph mini visual preview card if any */}
                    {enc.imagePreview && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/60">
                        <div className="w-12 h-12 rounded-xl bg-[#283044] flex items-center justify-center shrink-0 text-white">
                          <Icon name={enc.imagePreview.icon} className="text-[24px]" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                            {enc.imagePreview.time}
                          </span>
                          <span className="font-semibold text-xs md:text-sm text-[#131b2e] truncate">
                            {enc.imagePreview.title}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action & Clinician Meta */}
                    <div className="p-3.5 rounded-xl bg-[#f2f3ff] flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs text-[#3f4850]">
                        <Icon name="stethoscope" className="text-[16px] text-[#006a61]" />
                        <span>
                          {enc.clinicianLabel}:{' '}
                          <strong className="text-[#131b2e] font-semibold">{enc.clinicianName}</strong>
                        </span>
                      </div>
                      <div className="flex items-start gap-2 pt-1 border-t border-[#dae2fd]/60">
                        <Icon name="assignment_late" className="text-[18px] text-[#006194] shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                            {enc.nextActionTitle}
                          </span>
                          <span className="text-xs md:text-sm text-[#131b2e] font-medium leading-snug">
                            {enc.nextActionDesc}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="bg-[#f2f3ff]/60 px-5 py-3 border-t border-[#dae2fd]/60 flex items-center justify-between gap-3">
                    <span className="text-xs text-[#707881] truncate">{enc.operatoryText}</span>
                    <button
                      onClick={() => handleEncounterAction(enc)}
                      className="px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#004b73] active:scale-95 transition-all shadow-sm shrink-0"
                    >
                      <span>{enc.actionButtonLabel}</span>
                      <Icon name={enc.actionButtonIcon} className="text-[16px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
