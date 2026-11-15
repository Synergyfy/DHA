import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

type CategoryFilter = 'all' | 'declined' | 'deferred' | 'postponed' | 'noshow';

interface CaseCardItem {
  id: string;
  category: 'declined' | 'deferred' | 'postponed' | 'noshow';
  categoryLabel: string;
  categoryBadgeColor: string;
  patientName: string;
  ageGender: string;
  dhaId: string;
  avatar: string;
  avatarBg: string;
  procedureTitle: string;
  optionOrStage: string;
  docDateOrWindow: string;
  narrativeTitle: string;
  narrativeBody: string;
  clinician: string;
  clinicianId: string;
  riskStatus?: string;
  riskText?: string;
  riskIsAlert?: boolean;
  actionPrimaryText: string;
  actionPrimaryIcon: string;
  actionSecondaryText: string;
  actionSecondaryIcon: string;
}

export function DeferredIncompleteCareScreen() {
  const navigate = useNavigate();

  const [currentFilter, setCurrentFilter] = useState<CategoryFilter>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const cases: CaseCardItem[] = [
    {
      id: 'CASE-001',
      category: 'declined',
      categoryLabel: 'Declined by Patient',
      categoryBadgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
      patientName: 'Amara Okafor',
      ageGender: '34y F',
      dhaId: 'DHA-2026-00451',
      avatar: 'AO',
      avatarBg: 'bg-[#006a61] text-white',
      procedureTitle: 'Tooth #16: Indirect Ceramic Inlay',
      optionOrStage: 'Option B',
      docDateOrWindow: 'Documented on 14 Oct 2026',
      narrativeTitle: 'Documented Decision Note',
      narrativeBody:
        'Patient elected conservative direct biomimetic resin restoration (Option A) due to personal budget parameters and single-visit scheduling preference.',
      clinician: 'Dr. Daniel James',
      clinicianId: '#DEN-48912',
      riskStatus: 'Nil (Alternative)',
      riskText: 'Safe Conservative Pathway Active',
      actionPrimaryText: 'View Decision File',
      actionPrimaryIcon: 'visibility',
      actionSecondaryText: 'Reopen Option',
      actionSecondaryIcon: 'replay',
    },
    {
      id: 'CASE-002',
      category: 'deferred',
      categoryLabel: 'Deferred by Clinician',
      categoryBadgeColor: 'bg-[#cce5ff] text-[#001d31] border-blue-200',
      patientName: 'Fatima Al-Zahra',
      ageGender: '28y F',
      dhaId: 'DHA-08921',
      avatar: 'FA',
      avatarBg: 'bg-[#006194] text-white',
      procedureTitle: 'Tooth #14: Implant Fixture Placement',
      optionOrStage: 'Stage 2',
      docDateOrWindow: 'Deferred Window: 4-Week Bone Maturation',
      narrativeTitle: 'Clinical Deferred Rationale',
      narrativeBody:
        'Autogenous bone graft site demonstrates positive healing but requires additional 4-week consolidation index prior to titanium osteotomy stress.',
      clinician: 'Dr. K. Al-Mansoor',
      clinicianId: '#DEN-39011',
      riskStatus: 'Planned Re-eval',
      riskText: 'Volumetric CBCT Scan (15 Nov 2026)',
      actionPrimaryText: 'Schedule CBCT',
      actionPrimaryIcon: 'event_available',
      actionSecondaryText: 'Adjust Window',
      actionSecondaryIcon: 'edit_calendar',
    },
    {
      id: 'CASE-003',
      category: 'noshow',
      categoryLabel: 'Incomplete / No-Show',
      categoryBadgeColor: 'bg-red-100 text-red-800 border-red-200',
      patientName: 'Chinedu Okafor',
      ageGender: '41y M',
      dhaId: 'DHA-10482',
      avatar: 'CO',
      avatarBg: 'bg-red-600 text-white',
      procedureTitle: 'Tooth #16: Endodontic Obturation',
      optionOrStage: 'URGENT',
      docDateOrWindow: 'Missed Appointment: 12 Oct 2026 (72h elapsed)',
      narrativeTitle: 'High Bio-Leakage Hazard Callout',
      narrativeBody:
        'Cavit temporary seal integrity decays rapidly after 14 days, risking coronal microleakage and re-infection of cleared root canal system.',
      clinician: 'Dr. Daniel James',
      clinicianId: '#DEN-48912',
      riskStatus: 'Critical Hazard',
      riskText: 'Day 8 / 14 Temporary Seal Life',
      riskIsAlert: true,
      actionPrimaryText: 'Emergency Outreach',
      actionPrimaryIcon: 'priority_high',
      actionSecondaryText: 'Log Contact Attempt',
      actionSecondaryIcon: 'note_add',
    },
    {
      id: 'CASE-004',
      category: 'postponed',
      categoryLabel: 'Postponed (Patient Request)',
      categoryBadgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
      patientName: 'Marcus Vance',
      ageGender: '28y M',
      dhaId: 'DHA-00412',
      avatar: 'MV',
      avatarBg: 'bg-slate-700 text-white',
      procedureTitle: 'Custom Occlusal Splint / Night Guard',
      optionOrStage: 'Preventative',
      docDateOrWindow: 'Requested window: Reschedule in Q1 2027',
      narrativeTitle: 'Patient Stated Reason',
      narrativeBody:
        'Extended overseas business travel abroad through year-end. Patient instructed to monitor bruxism symptoms and report acute morning masseter soreness immediately.',
      clinician: 'Dr. Daniel James',
      clinicianId: '#DEN-48912',
      riskStatus: 'Low Risk',
      riskText: 'Recall Set: Jan 10, 2027',
      actionPrimaryText: 'Contact Patient',
      actionPrimaryIcon: 'contact_phone',
      actionSecondaryText: 'Snooze Alert',
      actionSecondaryIcon: 'notifications_active',
    },
    {
      id: 'CASE-005',
      category: 'deferred',
      categoryLabel: 'Clinically Deferred',
      categoryBadgeColor: 'bg-[#cce5ff] text-[#001d31] border-blue-200',
      patientName: 'Tariq Latif',
      ageGender: '52y M',
      dhaId: 'DHA-19034',
      avatar: 'TL',
      avatarBg: 'bg-[#006194] text-white',
      procedureTitle: 'Tooth #47: Crown Lengthening Surgery',
      optionOrStage: 'Perio Flap',
      docDateOrWindow: 'Deferred Window: Anticoagulant Protocol Clearance',
      narrativeTitle: 'Clinical Deferred Rationale',
      narrativeBody:
        'Awaiting cardiological clearance and INR coagulation calibration window from primary cardiologist before initiating periodontal surgical flap.',
      clinician: 'Dr. K. Al-Mansoor',
      clinicianId: '#DEN-39011',
      riskStatus: 'Cardio Clearance',
      riskText: 'Medical Consult Pending',
      actionPrimaryText: 'Follow-up Cardio',
      actionPrimaryIcon: 'outgoing_mail',
      actionSecondaryText: 'View Consult Note',
      actionSecondaryIcon: 'description',
    },
  ];

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      if (currentFilter === 'all') return true;
      return c.category === currentFilter;
    });
  }, [currentFilter, cases]);

  return (
    <TreatmentPlanShell
      pageTitle="Deferred &amp; Incomplete Care"
      badgeCode="13.24"
      badgeLabel="Caseload Safety Retention"
      currentStep="13.24"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Overview Stat Banner */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006a61]">
                Active Caseload Registry
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">5 Cases</span>
              <span className="text-xs text-slate-500 font-medium">Pending Safety Follow-up</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#006194] flex items-center justify-center shrink-0">
            <Icon name="clinical_notes" className="text-2xl" />
          </div>
        </div>

        {/* Governance & Legal Safeguard Notice */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 border border-[#eaedff] flex items-start gap-3.5 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#006194] flex items-center justify-center shrink-0 mt-0.5">
            <Icon name="policy" className="text-lg" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-bold text-slate-900">Statutory Care Retention Mandate</span>
              <span className="font-mono text-[10px] font-bold text-[#006194] bg-white px-2 py-0.5 rounded border border-blue-200">
                DHA-MOH-2026
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Declined or deferred dental interventions remain permanently documented in the patient’s oral health record to safeguard clinical continuity and medicolegal clarity. Records are strictly immutable and never purged.
            </p>
          </div>
        </div>

        {/* Segment Filter Carousel */}
        <div className="bg-white p-3 rounded-2xl border border-[#eaedff] shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold">
          {(
            [
              { id: 'all', label: 'All Cases (5)' },
              { id: 'declined', label: 'Patient Declined (1)' },
              { id: 'deferred', label: 'Clinically Deferred (2)' },
              { id: 'postponed', label: 'Postponed (1)' },
              { id: 'noshow', label: 'Incomplete / No-Show (1)', isAlert: true },
            ] as { id: CategoryFilter; label: string; isAlert?: boolean }[]
          ).map((item) => {
            const active = currentFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentFilter(item.id)}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  active
                    ? item.isAlert
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-[#006194] text-white shadow-xs'
                    : item.isAlert
                    ? 'bg-red-50 text-red-700 hover:bg-red-100'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Case Cards List */}
        <div className="space-y-4">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden space-y-3 ${
                c.category === 'noshow' ? 'border-red-300 ring-1 ring-red-200' : 'border-[#eaedff]'
              }`}
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center text-sm ${c.avatarBg}`}>
                      {c.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{c.patientName}</span>
                        <span className="text-xs text-slate-500">{c.ageGender}</span>
                      </div>
                      <span className="font-mono text-xs text-slate-400">{c.dhaId}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${c.categoryBadgeColor}`}>
                    {c.categoryLabel}
                  </span>
                </div>

                {/* Procedure Context */}
                <div className={`p-3.5 rounded-xl border space-y-1 text-xs ${
                  c.category === 'noshow' ? 'bg-red-50/60 border-red-200' : 'bg-[#faf8ff] border-[#eaedff]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <Icon name="dentistry" className={c.category === 'noshow' ? 'text-red-600' : 'text-[#006194]'} />
                      <span>{c.procedureTitle}</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200">
                      {c.optionOrStage}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">{c.docDateOrWindow}</p>
                </div>

                {/* Narrative */}
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                    {c.narrativeTitle}
                  </span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {c.narrativeBody}
                  </p>
                </div>

                {/* Metadata & Risk */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Attending Clinician</span>
                    <span className="font-bold text-slate-900 truncate block mt-0.5">{c.clinician}</span>
                    <span className="font-mono text-[10px] text-slate-400">{c.clinicianId}</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border ${
                    c.riskIsAlert ? 'bg-red-50 border-red-200' : 'bg-teal-50 border-teal-200'
                  }`}>
                    <span className="text-[10px] font-bold uppercase block text-slate-400">Medicolegal Safety</span>
                    <span className={`font-bold block mt-0.5 ${c.riskIsAlert ? 'text-red-800' : 'text-[#006a61]'}`}>
                      {c.riskStatus}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">{c.riskText}</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => showToast(`Executing action: ${c.actionPrimaryText} for ${c.patientName}`)}
                  className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all ${
                    c.category === 'noshow'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-[#006194] hover:bg-[#004b73] text-white'
                  }`}
                >
                  <Icon name={c.actionPrimaryIcon} className="text-sm" />
                  <span>{c.actionPrimaryText}</span>
                </button>

                <button
                  type="button"
                  onClick={() => showToast(`Action triggered: ${c.actionSecondaryText}`)}
                  className="py-2 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 flex items-center gap-1.5 shadow-xs"
                >
                  <Icon name={c.actionSecondaryIcon} className="text-sm text-slate-500" />
                  <span>{c.actionSecondaryText}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Care Continuity Controls */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <div className="flex items-center gap-2">
            <Icon name="admin_panel_settings" className="text-[#006194] text-lg" />
            <h3 className="font-bold text-sm text-slate-900">Care Continuity Controls &amp; Facility Filtering</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => showToast('Compiling comprehensive Incomplete Care Audit Summary (PDF)...')}
              className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon name="assignment_turned_in" className="text-[#006194] text-base" />
                <span>Generate Incomplete Care Audit Summary</span>
              </div>
              <Icon name="chevron_right" className="text-slate-400 text-sm" />
            </button>

            <button
              type="button"
              onClick={() => showToast('Filtering by Clinic Branch: All Dubai Facilities (Active)')}
              className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon name="domain" className="text-[#006a61] text-base" />
                <span>Filter by Clinic Branch: All Dubai Facilities</span>
              </div>
              <Icon name="tune" className="text-slate-400 text-sm" />
            </button>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/version-comparison')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            ← Back to Plan Version Comparison
          </button>
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/dashboard')}
            className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
          >
            <span>Return to Treatment Plans Dashboard (13.1)</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
