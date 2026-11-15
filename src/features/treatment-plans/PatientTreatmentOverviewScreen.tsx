import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function PatientTreatmentOverviewScreen() {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'plans' | 'items' | 'appts' | 'followups' | 'history' | 'financials'>('overview');
  const [selectedTooth, setSelectedTooth] = useState<string>('16');

  return (
    <TreatmentPlanShell
      pageTitle="Patient Treatment Overview"
      badgeCode="13.3"
      badgeLabel="Patient Dossier"
      patientName="Amara Okafor"
      dhaId="DHA-2026-00451"
      planId="#TP-2026-089"
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Patient Clinical Profile Header Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256"
                  alt="Portrait of Amara Okafor"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#cce5ff] shadow-xs"
                />
                <div
                  className="absolute -bottom-1 -right-1 bg-[#006a61] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]"
                  title="Active Patient"
                >
                  <Icon name="verified" className="text-[13px]" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#131b2e]">Amara Okafor</h1>
                  <span className="bg-[#f2f3ff] text-[#006194] font-mono text-xs px-2.5 py-0.5 rounded-full font-semibold">
                    DHA-2026-00451
                  </span>
                </div>
                <p className="text-xs text-[#707881] mt-0.5">34y Female • Harmony Dental (Wuse 2 Clinic)</p>
                <p className="text-xs font-semibold text-[#006194] mt-1 flex items-center gap-1">
                  <Icon name="medical_services" className="text-[15px]" />
                  Attending: Dr. Daniel James (#DEN-48912)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => navigate('/treatment-plans/create')}
                className="px-4 py-2 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Icon name="add_circle" className="text-[16px]" />
                <span>+ New Plan</span>
              </button>
            </div>
          </div>

          {/* Critical Medical Flags Ribbon */}
          <div className="space-y-2 pt-1 border-t border-[#eaedff]">
            <div className="flex items-center gap-2.5 bg-[#ffdad6]/60 text-[#93000a] px-3.5 py-2 rounded-xl border border-[#ba1a1a]/20">
              <Icon name="warning" className="text-[18px] text-[#ba1a1a] shrink-0" />
              <span className="text-xs leading-snug">
                <strong>Penicillin Allergy (Severe)</strong> • Anaphylaxis Risk • Verified in Unified NABIDH
              </span>
            </div>
            <div className="flex items-center gap-2.5 bg-[#f2f3ff] text-[#3f4850] px-3.5 py-2 rounded-xl">
              <Icon name="dentistry" className="text-[18px] text-[#006a61] shrink-0" />
              <span className="text-xs">
                Active Diagnostic: <strong>Reversible Pulpitis #16</strong> (Cold sensitivity positive, 2.1mm dentin buffer)
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Sub-Navigation Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border border-[#eaedff] shadow-sm overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 min-w-max">
            {[
              { id: 'overview', label: 'Overview', icon: 'dashboard' },
              { id: 'plans', label: 'Plans', icon: 'checklist' },
              { id: 'items', label: 'Items', icon: 'format_list_bulleted' },
              { id: 'appts', label: 'Appointments', icon: 'calendar_month' },
              { id: 'followups', label: 'Follow-ups', icon: 'event_repeat' },
              { id: 'history', label: 'History', icon: 'history' },
              { id: 'financials', label: 'Financials', icon: 'account_balance_wallet' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeSubTab === tab.id
                    ? 'bg-[#006194] text-white shadow-xs'
                    : 'text-[#3f4850] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                }`}
              >
                <Icon name={tab.icon} className="text-[16px]" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Summary KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#707881] font-medium">Active Plans</span>
              <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                <Icon name="assignment" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">1</span>
              <span className="text-xs text-[#006194] font-medium">In progress</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#707881] font-medium">Pending Items</span>
              <div className="w-8 h-8 rounded-lg bg-[#eaedff] text-[#131b2e] flex items-center justify-center">
                <Icon name="pending_actions" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">3</span>
              <span className="text-xs text-[#707881] font-medium">Across 2 phases</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#707881] font-medium">Completed Past</span>
              <div className="w-8 h-8 rounded-lg bg-[#89f5e7]/40 text-[#006a61] flex items-center justify-center">
                <Icon name="task_alt" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">1</span>
              <span className="text-xs text-[#006a61] font-medium">Prophylaxis #11</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#707881] font-medium">Patient Co-Pay</span>
              <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                <Icon name="receipt_long" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#006194]">AED 290</span>
              <span className="text-xs text-[#707881] font-medium">Estimated</span>
            </div>
          </div>
        </div>

        {/* Follow-up Due Banner */}
        <div
          onClick={() => navigate('/treatment-plans/phases')}
          className="bg-gradient-to-r from-[#89f5e7]/30 to-[#cce5ff]/30 p-4 rounded-2xl border border-[#006a61]/20 flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#006a61] text-white flex items-center justify-center shadow-xs">
              <Icon name="schedule" className="text-[20px]" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#131b2e] block leading-tight">
                Follow-up Due: 28 Oct 2026
              </span>
              <span className="text-xs text-[#006a61] font-medium">
                Vitality re-assessment &amp; pulp response test (#16)
              </span>
            </div>
          </div>
          <Icon name="chevron_right" className="text-[#006a61] text-[24px]" />
        </div>

        {/* Current Active Treatment Plan Card */}
        <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span> Urgent (&lt; 7 Days)
                </span>
                <span className="bg-[#f2f3ff] text-[#3f4850] font-mono text-xs px-2.5 py-0.5 rounded-full">
                  #TP-2026-089
                </span>
              </div>
              <span className="bg-[#cce5ff] text-[#001d31] text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto">
                Awaiting Dentist Approval
              </span>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#131b2e] leading-snug">
                Mesio-Occlusal Direct Restorative &amp; Remineralization Protocol
              </h2>
              <p className="text-xs text-[#707881] mt-1">
                Authored: 14 Oct 2026 by Dr. Daniel James • 2 Phases • 3 Items
              </p>
            </div>

            {/* Financial Breakdown Progress */}
            <div className="bg-[#f2f3ff] rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between text-[#131b2e]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                  Estimated Gross Total
                </span>
                <span className="text-lg font-extrabold text-[#006194]">AED 1,450</span>
              </div>

              <div className="w-full bg-[#eaedff] rounded-full h-3 flex overflow-hidden">
                <div
                  className="bg-[#006a61] h-full transition-all"
                  style={{ width: '80%' }}
                  title="Insurance Pre-auth Approved: AED 1,160"
                />
                <div
                  className="bg-[#006194] h-full transition-all"
                  style={{ width: '20%' }}
                  title="Patient Share: AED 290"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs pt-1">
                <div className="flex items-center gap-1.5 text-[#006a61] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#006a61]"></span>
                  <span>Pre-auth Approved: <strong>AED 1,160</strong> (80%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#006194] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#006194]"></span>
                  <span>Patient Co-pay Due: <strong>AED 290</strong> (20%)</span>
                </div>
              </div>
            </div>

            {/* Clinician Decision Status */}
            <div className="flex items-center justify-between bg-[#eaedff]/60 px-4 py-2.5 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <Icon name="hourglass_top" className="text-[18px] text-[#006194]" />
                <span className="font-semibold text-[#131b2e]">Patient Decision:</span>
              </div>
              <span className="font-medium text-[#3f4850] bg-white px-2.5 py-0.5 rounded shadow-xs">
                Pending Clinician Release
              </span>
            </div>
          </div>

          {/* Treatment Phases Roadmap Preview */}
          <div className="px-5 sm:px-6 pb-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Treatment Phases Roadmap
            </h3>

            <div className="space-y-3">
              {/* Phase 1 */}
              <div className="bg-[#f2f3ff] p-4 rounded-xl flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#cce5ff] text-[#006194] shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">
                  P1
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#131b2e]">Acute Restorative Intervention</span>
                    <span className="bg-[#89f5e7]/40 text-[#006a61] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Ready to Schedule
                    </span>
                  </div>
                  <p className="text-xs text-[#3f4850] mt-1 leading-snug">
                    Tooth #16: Direct Biomimetic Resin Composite (MO) • Layered C-Factor control
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#707881]">
                    <span className="flex items-center gap-1 text-[#006194] font-medium">
                      <Icon name="timer" className="text-[14px]" /> 45 mins
                    </span>
                    <span>Est: AED 1,050</span>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-[#f2f3ff] p-4 rounded-xl flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#eaedff] text-[#707881] shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">
                  P2
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#131b2e]">Preventive &amp; Recare</span>
                    <span className="bg-[#eaedff] text-[#3f4850] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Planned Sequential
                    </span>
                  </div>
                  <p className="text-xs text-[#3f4850] mt-1 leading-snug">
                    Tooth #15: High-fluoride varnish desensitization • 6-Mo Pulp Surveillance
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#707881]">
                    <span className="flex items-center gap-1 text-[#006a61] font-medium">
                      <Icon name="calendar_today" className="text-[14px]" /> Post-Phase 1
                    </span>
                    <span>Est: AED 400</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Linked Baseline Evidence Strip */}
          <div className="px-5 sm:px-6 py-4 bg-[#f2f3ff]/60 border-t border-[#eaedff] space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Linked Clinical Baseline Evidence
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#eaedff] text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon name="grid_view" className="text-[18px] text-[#006194] shrink-0" />
                  <span className="truncate">Sec 9 Odontogram: FDI #16 MO</span>
                </div>
                <span className="font-semibold text-[#006194]">Verified</span>
              </div>

              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#eaedff] text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon name="radiology" className="text-[18px] text-[#006a61] shrink-0" />
                  <span className="truncate">Sec 11 Bitewing: 2.1mm Buffer</span>
                </div>
                <span className="font-semibold text-[#006a61]">Clear</span>
              </div>

              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#eaedff] text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon name="auto_awesome" className="text-[18px] text-[#006194] shrink-0" />
                  <span className="truncate">Sec 12 AI Summary #9842</span>
                </div>
                <span className="font-semibold text-[#006194]">Signed</span>
              </div>
            </div>
          </div>

          {/* Quick Action Ribbon */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#eaedff] flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/builder')}
              className="flex-1 py-3 px-4 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl font-bold text-xs flex items-center justify-between shadow-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon name="edit_note" className="text-[18px]" />
                <span>Open Treatment Plan Builder (13.5)</span>
              </div>
              <Icon name="arrow_forward" className="text-[18px]" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/treatment-plans/phases')}
              className="py-3 px-4 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="timeline" className="text-[16px] text-[#006194]" />
              <span>Phase Management (13.6)</span>
            </button>
          </div>
        </div>

        {/* Interactive Odontogram Snapshot Widget */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">Tooth Map Focus</h3>
              <p className="text-xs text-[#707881]">Quadrant 1 (Upper Right FDI 14–17)</p>
            </div>
            <span className="bg-[#89f5e7]/40 text-[#006a61] text-xs font-semibold px-2.5 py-0.5 rounded-full">
              FDI 14-17 Quadrant
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { id: '14', status: 'Intact', label: 'Sound', color: 'gray' },
              { id: '15', status: 'Surveillance', label: 'Recare', color: 'teal' },
              { id: '16', status: 'Active Plan', label: 'Direct MO', color: 'primary' },
              { id: '17', status: 'Intact', label: 'Sound', color: 'gray' },
            ].map((tooth) => {
              const isSelected = selectedTooth === tooth.id;
              return (
                <div
                  key={tooth.id}
                  onClick={() => setSelectedTooth(tooth.id)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#cce5ff] border-[#006194] shadow-xs'
                      : tooth.color === 'primary'
                      ? 'bg-[#f2f3ff] border-[#eaedff]'
                      : 'bg-white border-[#eaedff] hover:bg-[#f2f3ff]'
                  }`}
                >
                  <span
                    className={`text-xs font-extrabold ${
                      tooth.color === 'primary'
                        ? 'text-[#006194]'
                        : tooth.color === 'teal'
                        ? 'text-[#006a61]'
                        : 'text-[#131b2e]'
                    }`}
                  >
                    #{tooth.id}
                  </span>
                  <Icon
                    name="dentistry"
                    className={`text-[28px] my-1 ${
                      tooth.color === 'primary'
                        ? 'text-[#006194]'
                        : tooth.color === 'teal'
                        ? 'text-[#006a61]'
                        : 'text-[#707881]'
                    }`}
                  />
                  <span
                    className={`text-[11px] font-semibold ${
                      tooth.color === 'primary'
                        ? 'text-[#006194]'
                        : tooth.color === 'teal'
                        ? 'text-[#006a61]'
                        : 'text-[#707881]'
                    }`}
                  >
                    {tooth.label}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-[#707881] text-center">
            Tap a tooth node to cross-reference tooth status in Section 9 Clinical Odontogram.
          </p>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
