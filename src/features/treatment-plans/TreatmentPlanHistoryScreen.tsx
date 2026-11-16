import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

type PlanFilter = 'all' | 'active' | 'completed' | 'superseded' | 'deferred';

export function TreatmentPlanHistoryScreen() {
  const navigate = useNavigate();

  const [currentFilter, setCurrentFilter] = useState<PlanFilter>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const plans = [
    {
      id: 'TP-2026-089',
      status: 'active',
      badge: 'Urgent (< 7 Days)',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      consentStatus: 'Fully Accepted',
      title: 'Mesio-Occlusal Direct Restorative & Remineralization Protocol',
      doctor: 'Dr. Daniel James',
      date: '14 Oct 2026',
      progressText: '1 of 3 Procedures (33%)',
      progressPercent: 33,
      grossTotal: 'NGN 1,450',
      patientCopay: 'NGN 290',
      settled: 'NGN 170',
      pending: 'NGN 120',
      isActive: true,
    },
    {
      id: 'TP-2025-042',
      status: 'completed',
      badge: 'Completed & Archived',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      title: 'Routine Preventative Care & Occlusal Prophylaxis',
      doctor: 'Dr. Daniel James',
      date: '18 Nov 2025 – 20 Nov 2025',
      scope: '2 Procedures (Full mouth scaling + ultrasonic polishing)',
      outcome: 'Healthy periodontium, PSR Score 1',
      financial: 'NGN 650 (100% Settled, NHIA Direct)',
    },
    {
      id: 'TP-2024-019',
      status: 'superseded',
      badge: 'Superseded v1.0',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
      title: 'Initial Diagnostic Caries Stabilization Assessment',
      doctor: 'Dr. K. Okoye',
      date: '10 Sep 2024',
      supersededReason: 'Replaced by Comprehensive AI-Assisted Protocol (Section 12 handoff).',
    },
  ];

  const filteredPlans = useMemo(() => {
    return plans.filter((p) => {
      if (currentFilter === 'all') return true;
      return p.status === currentFilter;
    });
  }, [currentFilter, plans]);

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Plan History"
      badgeCode="13.22"
      badgeLabel="Longitudinal Plan Ledger"
      currentStep="13.22"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Patient Longitudinal Profile Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#006194] to-[#004b73] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                AO
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900 truncate">Amara Okafor</h2>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">34y Female</span>
                  <span className="text-[11px] bg-blue-100 text-[#006194] px-2 py-0.5 rounded-full font-bold">Nigeria Resident</span>
                </div>
                <p className="font-mono text-xs text-slate-500 mt-0.5">
                  DHA-2026-00451 • LifeCode: <strong className="text-[#006194]">NG-990-281-LAG</strong>
                </p>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600">
                  <Icon name="history_edu" className="text-[#006a61] text-sm" />
                  <span>Lifelong Oral Health Ledger • <strong>3 Total Care Plans</strong> recorded</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => navigate('/treatment-plans/version-comparison')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#006194] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Icon name="compare_arrows" className="text-base" />
                <span>Compare Plan Versions (13.23)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white p-3 rounded-2xl border border-[#eaedff] shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold">
          {(
            [
              { id: 'all', label: 'All Plans (3)' },
              { id: 'active', label: 'Active (1)' },
              { id: 'completed', label: 'Completed (1)' },
              { id: 'superseded', label: 'Superseded (1)' },
              { id: 'deferred', label: 'Deferred (0)' },
            ] as { id: PlanFilter; label: string }[]
          ).map((tab) => {
            const active = currentFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCurrentFilter(tab.id)}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  active
                    ? 'bg-[#006194] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Plans Stack */}
        <div className="space-y-4">
          {filteredPlans.map((plan) => {
            if (plan.isActive) {
              return (
                <div
                  key={plan.id}
                  className="bg-white rounded-2xl border-2 border-[#006194] shadow-sm overflow-hidden p-5 space-y-4"
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-full">
                        #{plan.id}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
                        {plan.badge}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006a61] bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                      <Icon name="check_circle" className="text-sm" />
                      {plan.consentStatus}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900">{plan.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <Icon name="stethoscope" className="text-[#006194] text-sm" />
                      <span>{plan.doctor} • {plan.date} (Phase 1 Complete / Phase 2 Pending)</span>
                    </p>
                  </div>

                  {/* Progress Meter */}
                  <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">Clinical Progress</span>
                      <span className="font-mono font-bold text-[#006194]">{plan.progressText}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-[#006194] rounded-full" style={{ width: `${plan.progressPercent}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Tooth #16 Direct Resin (Done)</span>
                      <span>Tooth #15 Fluoride Varnish (Scheduled)</span>
                    </div>
                  </div>

                  {/* Financials */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Gross Total</span>
                      <span className="font-bold text-slate-900">{plan.grossTotal}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Patient Share (20%)</span>
                      <span className="font-bold text-[#006194]">{plan.patientCopay}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200">
                      <span className="text-[10px] text-[#006a61] font-bold uppercase block">Settled</span>
                      <span className="font-bold text-[#006a61]">{plan.settled}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                      <span className="text-[10px] text-amber-800 font-bold uppercase block">Pending Phase 2</span>
                      <span className="font-bold text-amber-900">{plan.pending}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => navigate('/treatment-plans/dashboard')}
                      className="h-11 rounded-xl bg-[#006194] hover:bg-[#004b73] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <span>Open Active Plan Workspace</span>
                      <Icon name="arrow_forward" className="text-base" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/treatment-plans/version-comparison')}
                      className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                    >
                      <Icon name="history" className="text-base text-slate-500" />
                      <span>View Version History (v2.1)</span>
                    </button>
                  </div>
                </div>
              );
            }

            if (plan.status === 'completed') {
              return (
                <div
                  key={plan.id}
                  className="bg-white rounded-2xl border border-[#eaedff] shadow-sm p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        #{plan.id}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#006a61] border border-teal-200">
                        {plan.badge}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Nov 2025</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900">{plan.title}</h3>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>{plan.doctor} • {plan.date}</p>
                    <p><strong>Scope:</strong> {plan.scope}</p>
                    <p><strong>Outcome:</strong> <span className="text-[#006a61] font-semibold">{plan.outcome}</span></p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Icon name="verified" className="text-[#006a61] text-base" />
                      <span>{plan.financial}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast('Displaying archived treatment plan record & RVGs for #TP-2025-042')}
                    className="w-full h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Icon name="folder_open" className="text-base text-slate-500" />
                    <span>View Archived Plan &amp; Radiographs</span>
                  </button>
                </div>
              );
            }

            return (
              <div
                key={plan.id}
                className="bg-white/80 rounded-2xl border border-dashed border-slate-300 p-5 space-y-3 opacity-90"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      #{plan.id}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {plan.badge}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Sep 2024</span>
                </div>

                <h3 className="font-semibold text-sm text-slate-800">{plan.title}</h3>
                <div className="text-xs text-slate-500 space-y-1">
                  <p>Created by: {plan.doctor} on {plan.date}</p>
                  <p className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                    <strong>Reason Superseded:</strong> {plan.supersededReason}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Loading superseded lineage tree for #TP-2024-019')}
                  className="w-full h-9 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Icon name="account_tree" className="text-sm" />
                  <span>View Superseded Lineage</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Immutable Record Notice */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 border border-[#eaedff] flex items-start gap-3 text-xs">
          <Icon name="policy" className="text-[#006194] text-lg mt-0.5 shrink-0" />
          <div className="text-slate-600 leading-relaxed">
            <strong className="text-slate-900 font-bold">Nigeria Nigeria Health Information Exchange Immutable Record Notice:</strong> Historical treatment plans are permanently preserved under DHA health informatics governance. No historical plan or executed procedure can be purged or overwritten.
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/follow-up-details')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            ← Back to Follow-up Details
          </button>
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/version-comparison')}
            className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
          >
            <span>Proceed to Plan Version Comparison (13.23)</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
