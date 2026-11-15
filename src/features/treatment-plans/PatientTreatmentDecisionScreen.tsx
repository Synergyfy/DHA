import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

type Decision = 'accept' | 'clarify' | 'decline';

interface ProcedureItem {
  id: number;
  title: string;
  tooth: string;
  surface: string;
  code: string;
  badge: string;
  badgeColor: string;
  patientCost: number;
  insuranceCost: number;
  totalCost: number;
  description: string;
  urgency: string;
}

export function PatientTreatmentDecisionScreen() {
  const navigate = useNavigate();

  const [decisions, setDecisions] = useState<Record<number, Decision>>({
    1: 'accept',
    2: 'accept',
    3: 'accept',
  });

  const [notes, setNotes] = useState<string>('');
  const [showDeclineModal, setShowDeclineModal] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error'; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  });

  const procedures: ProcedureItem[] = [
    {
      id: 1,
      title: 'Direct Tooth-Coloured Composite Restoration',
      tooth: 'Tooth #16',
      surface: 'Upper Right 1st Molar (MO Surface)',
      code: 'DHA-RES-DC-001 · CDT D2391',
      badge: 'Urgent',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      patientCost: 170,
      insuranceCost: 680,
      totalCost: 850,
      description: 'Gentle restoration to seal early dentin caries and stop progression toward the pulp chamber.',
      urgency: 'Scheduled within 14 days to prevent deeper decay.',
    },
    {
      id: 2,
      title: 'Fluoride Remineralisation Varnish',
      tooth: 'Tooth #15',
      surface: 'Upper Right 2nd Premolar (Mesial)',
      code: 'DHA-PRV-FV-001 · CDT D1208',
      badge: 'Preventive',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      patientCost: 50,
      insuranceCost: 200,
      totalCost: 250,
      description: 'Painless 60-second remineralisation lacquer to re-harden incipient white spot enamel.',
      urgency: 'Same session as procedure 1.',
    },
    {
      id: 3,
      title: 'Full Mouth Ultrasonic Scaling & Polish',
      tooth: 'Full Mouth',
      surface: 'All 4 Quadrants (Supragingival)',
      code: 'DHA-PRV-SC-001 · CDT D1110',
      badge: 'Hygiene',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      patientCost: 70,
      insuranceCost: 280,
      totalCost: 350,
      description: 'Comprehensive plaque and calculus removal with air-flow polish to protect gum attachment.',
      urgency: 'Recommended routine 6-month hygiene interval.',
    },
  ];

  const handleDecisionChange = (id: number, decision: Decision) => {
    setDecisions((prev) => ({ ...prev, [id]: decision }));
  };

  const showToastNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  const handleDeclineAll = () => {
    setDecisions({ 1: 'decline', 2: 'decline', 3: 'decline' });
    setShowDeclineModal(false);
    showToastNotification('All procedures marked as declined. Dr. Daniel Mensah has been alerted.', 'info');
  };

  const handleSubmit = () => {
    showToastNotification('Your treatment decisions have been recorded and sent to the clinic!', 'success');
  };

  // Calculations
  const acceptedCount = Object.values(decisions).filter((d) => d === 'accept').length;
  const clarifyCount = Object.values(decisions).filter((d) => d === 'clarify').length;
  const declinedCount = Object.values(decisions).filter((d) => d === 'decline').length;

  const totalAcceptedPatientCost = procedures.reduce((sum, proc) => {
    return decisions[proc.id] === 'accept' ? sum + proc.patientCost : sum;
  }, 0);

  const totalAcceptedInsuranceCover = procedures.reduce((sum, proc) => {
    return decisions[proc.id] === 'accept' ? sum + proc.insuranceCost : sum;
  }, 0);

  return (
    <TreatmentPlanShell
      pageTitle="Patient Treatment Decision"
      badgeCode="13.12"
      badgeLabel="Patient Consent & Decisions"
      currentStep="13.12"
    >
      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-bounce transition-all">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold border ${
              toast.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : toast.type === 'error'
                ? 'bg-red-600 text-white border-red-500'
                : 'bg-slate-900 text-white border-slate-800'
            }`}
          >
            <Icon
              name={toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
              className="text-lg"
            />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Decline All Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Icon name="warning" className="text-2xl" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Decline Entire Treatment Plan?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                You are about to decline all 3 proposed treatments. Tooth #16 has active caries which may worsen or require root-canal therapy if left untreated.
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
              <Icon name="info" className="text-sm mt-0.5 shrink-0" />
              <span>You can always update your preference or book a free clarifying consult with Dr. Daniel.</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeclineModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleDeclineAll}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-sm"
              >
                Confirm & Decline All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Header & LifeCode Bar */}
        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#cce5ff] text-[#001d31]">
                Interactive Decision Engine
              </span>
              <span className="text-xs text-slate-500 font-mono">Plan #TP-2026-089</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Review & Make Your Treatment Decisions</h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Select <strong>Accept</strong>, <strong>Clarify</strong>, or <strong>Decline</strong> for each procedure below. Your preferences will sync directly with the clinic.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-right">
              <span className="text-[10px] block font-semibold text-slate-400 uppercase">Patient</span>
              <span className="font-bold text-xs text-slate-900">Amara Okafor</span>
              <span className="text-[10px] font-mono block text-[#006194]">AE-990-281-DXB</span>
            </div>
          </div>
        </div>

        {/* Dynamic Plan Summary Indicator */}
        <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-teal-50/70 rounded-2xl border border-blue-200/60 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              {acceptedCount}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">
                  {acceptedCount === 3
                    ? 'Full Plan Accepted (3 of 3)'
                    : acceptedCount > 0
                    ? `Partial Plan Accepted (${acceptedCount} of 3)`
                    : 'All Treatments Declined (0 of 3)'}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    acceptedCount === 3
                      ? 'bg-emerald-100 text-emerald-800'
                      : acceptedCount > 0
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {acceptedCount === 3 ? 'Optimal Outcome' : acceptedCount > 0 ? 'Customized' : 'Action Required'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {clarifyCount > 0 && `${clarifyCount} question(s) marked for Dr. Daniel. `}
                {declinedCount > 0 && `${declinedCount} item(s) opted out.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-center">
            <div className="text-right">
              <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Your Recalculated Co-Pay</div>
              <div className="text-xl font-extrabold text-[#006194]">AED {totalAcceptedPatientCost}</div>
            </div>
            <div className="text-right border-l border-slate-200 pl-4">
              <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Covered by DHA</div>
              <div className="text-sm font-bold text-emerald-700">AED {totalAcceptedInsuranceCover}</div>
            </div>
          </div>
        </div>

        {/* Procedures Decision Cards */}
        <div className="space-y-4">
          {procedures.map((proc) => {
            const currentDecision = decisions[proc.id];
            return (
              <div
                key={proc.id}
                className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden ${
                  currentDecision === 'accept'
                    ? 'border-emerald-300 ring-1 ring-emerald-300/40'
                    : currentDecision === 'clarify'
                    ? 'border-amber-300 ring-1 ring-amber-300/40'
                    : 'border-red-200 bg-red-50/20'
                }`}
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          currentDecision === 'accept'
                            ? 'bg-emerald-600 text-white'
                            : currentDecision === 'clarify'
                            ? 'bg-amber-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {proc.id}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${proc.badgeColor}`}>
                            {proc.badge}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{proc.code}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-1">{proc.title}</h3>
                        <p className="text-xs font-medium text-slate-600 mt-0.5">
                          {proc.tooth} · {proc.surface}
                        </p>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{proc.description}</p>
                        <div className="text-[11px] text-slate-400 mt-1 italic">{proc.urgency}</div>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <span className="text-[10px] block font-semibold text-slate-400 uppercase">Your Share</span>
                      <span className={`text-xl font-extrabold ${currentDecision === 'decline' ? 'line-through text-slate-400' : 'text-[#006194]'}`}>
                        AED {proc.patientCost}
                      </span>
                      <span className="text-[10px] text-slate-500 block">Total tariff: AED {proc.totalCost}</span>
                    </div>
                  </div>

                  {/* 3-Pill Interactive Decision Buttons */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-slate-500">Your Choice for this Procedure:</span>

                    <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs font-bold gap-1 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleDecisionChange(proc.id, 'accept')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                          currentDecision === 'accept'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Icon name="check_circle" className="text-sm" />
                        <span>Accept Procedure</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDecisionChange(proc.id, 'clarify')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                          currentDecision === 'clarify'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Icon name="help_outline" className="text-sm" />
                        <span>Ask / Clarify</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDecisionChange(proc.id, 'decline')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                          currentDecision === 'decline'
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Icon name="cancel" className="text-sm" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Patient Notes & Scheduling Request */}
        <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Icon name="edit_note" className="text-[#006194]" />
              Questions, Preferences & Scheduling Availability
            </h3>
            <span className="text-[11px] text-slate-400">{notes.length}/500 characters</span>
          </div>
          <p className="text-xs text-slate-500">
            Tell Dr. Daniel about preferred appointment days (e.g. Saturday mornings), needle apprehension, or specific questions regarding materials.
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value.slice(0, 500))}
            placeholder="e.g. I prefer appointments on weekday afternoons after 4 PM. Also, please explain whether sedation or numbing gel will be used prior to the local anaesthetic injection..."
            rows={3}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-[#006194] focus:ring-1 focus:ring-[#006194] outline-none text-slate-800"
          />
        </div>

        {/* Legal & Regulatory Advisory */}
        <div className="bg-[#faf8ff] rounded-2xl border border-[#eaedff] p-4 flex items-start gap-3">
          <Icon name="gavel" className="text-[#006194] text-xl mt-0.5 shrink-0" />
          <div className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900">DHA Clinical Governance Standard 4.2.B Advisory:</strong> Your decisions represent informed consent / informed refusal in accordance with Dubai Health Authority dental directives. You retain full statutory rights to modify these decisions or request second clinical opinions at any time prior to operative treatment commencement.
          </div>
        </div>

        {/* Action Controls & Navigation Footer */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowDeclineModal(true)}
              className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline p-2"
            >
              Decline Entire Care Plan
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate('/treatment-plans/patient-preview')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Back to Preview
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold bg-[#006194] text-white hover:bg-[#004b73] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Icon name="send" className="text-base" />
                <span>Submit Treatment Decision</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
