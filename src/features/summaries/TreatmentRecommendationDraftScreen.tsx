import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

interface RecommendationItem {
  id: string;
  priorityLevel: 'urgent' | 'attention' | 'routine';
  priorityLabel: string;
  priorityBadgeColor: string;
  toothTarget: string;
  toothNumber: string;
  procedureCode: string;
  title: string;
  clinicalJustification: string;
  proposedProtocol: string;
  approved: boolean;
}

const initialRecommendations: RecommendationItem[] = [
  {
    id: 'rec-1',
    priorityLevel: 'urgent',
    priorityLabel: 'Urgent Review (< 7 Days)',
    priorityBadgeColor: 'bg-[#ffdad6] text-[#ba1a1a]',
    toothTarget: 'Maxillary Right 1st Molar',
    toothNumber: 'Tooth #16',
    procedureCode: 'DHA-RES-2S (MO)',
    title: 'Direct Biomimetic Resin Composite (2-Surface Mesio-Occlusal)',
    clinicalJustification:
      'Active ICDAS 3/4 dentin caries. Bitewing confirms 2.1mm remaining dentin bridge over mesial pulp horn. Vitality positive without lingering pain. Immediate intervention indicated to prevent mechanical pulp exposure.',
    proposedProtocol:
      'Selective enamel etch, self-etch dentin bonding under strict Rubber Dam isolation. Incremental layering with bulk-fill biomimetic base.',
    approved: true,
  },
  {
    id: 'rec-2',
    priorityLevel: 'attention',
    priorityLabel: 'Attention Required (14–30 Days)',
    priorityBadgeColor: 'bg-[#eaedff] text-[#006194]',
    toothTarget: 'Maxillary Right 2nd Premolar',
    toothNumber: 'Tooth #15',
    procedureCode: 'DHA-PREV-FLUOR',
    title: 'Non-Invasive Remineralization & Topical Fluoride Varnish',
    clinicalJustification:
      'Initial chalky white-spot lesion detected on distal contact surface (ICDAS 1), intact marginal ridge without structural cavitation. Radiograph demonstrates enamel-confined demineralization.',
    proposedProtocol:
      'Prophylaxis of interproximal quadrant, targeted 5% NaF varnish application, prescription of 5,000ppm fluoride dentifrice, and 6-month bitewing reassessment.',
    approved: false,
  },
  {
    id: 'rec-3',
    priorityLevel: 'routine',
    priorityLabel: 'Routine Recare (6 Months)',
    priorityBadgeColor: 'bg-[#f2f3ff] text-[#707881]',
    toothTarget: 'Preventive Periodontal Maintenance',
    toothNumber: 'Full Dentition',
    procedureCode: 'DHA-PERIO-REC',
    title: 'Comprehensive Periodontal Maintenance & Bitewing Surveillance',
    clinicalJustification:
      'Generalized healthy periodontium with isolated 4mm mesiobuccal pocket on #16. Stable existing amalgam restoration on #46 requiring standard margin monitoring. Low generalized plaque index.',
    proposedProtocol:
      'Full-mouth supragingival and subgingival ultrasonic debridement, selective polishing, tailored oral hygiene instructions, and recall bitewing series at 12 months.',
    approved: false,
  },
];

export function TreatmentRecommendationDraftScreen() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(initialRecommendations);
  const [clinicalDirectives, setClinicalDirectives] = useState(
    'Check lateral excursive contacts on #46 during preparation of #16. Ensure non-working interference is eliminated prior to composite final curing.'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTooth, setNewTooth] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<'urgent' | 'attention' | 'routine'>('attention');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleApproval = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const next = !r.approved;
          showToast(next ? `Approved: ${r.toothNumber}` : `Pending approval: ${r.toothNumber}`);
          return { ...r, approved: next };
        }
        return r;
      })
    );
  };

  const removeCard = (id: string) => {
    setRecommendations((prev) => prev.filter((r) => r.id !== id));
    showToast('Recommendation item removed from draft.');
  };

  const handleStartEdit = (rec: RecommendationItem) => {
    setEditingCardId(rec.id);
    setEditTitle(rec.title);
  };

  const handleSaveEdit = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, title: editTitle } : r))
    );
    setEditingCardId(null);
    showToast('Recommendation protocol updated.');
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: RecommendationItem = {
      id: `rec-custom-${Date.now()}`,
      priorityLevel: newPriority,
      priorityLabel:
        newPriority === 'urgent'
          ? 'Urgent Review (< 7 Days)'
          : newPriority === 'attention'
          ? 'Attention Required (14–30 Days)'
          : 'Routine Recare (6 Months)',
      priorityBadgeColor:
        newPriority === 'urgent'
          ? 'bg-[#ffdad6] text-[#ba1a1a]'
          : newPriority === 'attention'
          ? 'bg-[#eaedff] text-[#006194]'
          : 'bg-[#f2f3ff] text-[#707881]',
      toothTarget: 'Custom Clinical Target',
      toothNumber: newTooth.trim() ? `Tooth #${newTooth}` : 'Specialist Action',
      procedureCode: 'DHA-CUSTOM-RX',
      title: newTitle.trim(),
      clinicalJustification: 'Added manually by attending clinician Dr. Daniel James.',
      proposedProtocol: 'Follow institutional standard operative procedures.',
      approved: true,
    };

    setRecommendations((prev) => [newItem, ...prev]);
    setIsAddModalOpen(false);
    setNewTooth('');
    setNewTitle('');
    showToast('Custom recommendation added.');
  };

  return (
    <SummaryShell
      pageTitle="Treatment Recommendation Draft"
      badgeCode="12.11"
      badgeLabel="Treatment Planning Draft"
      currentStep="Treatment Recommendations"
    >
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-white/10 animate-fade-in">
            <Icon name="check_circle" className="text-emerald-400 text-[18px]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Safeguard Banners & Clinical Legal Constraints */}
        <section className="space-y-3">
          {/* Mandatory Governance Protocol Badge */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006194] flex items-center justify-center shrink-0">
              <Icon name="policy" className="text-[22px]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#006194] uppercase tracking-wider">
                  Governance Protocol
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#006194]" />
                <span className="text-xs text-[#707881]">Statutory Compliance</span>
              </div>
              <p className="text-sm font-semibold text-[#131b2e] mt-0.5 leading-snug">
                <strong className="text-[#006194]">AI PREPARES • DENTIST REVIEWS • DENTIST APPROVES.</strong> AI cannot independently prescribe or confirm procedures. Organisational priority tags require clinician approval.
              </p>
            </div>
          </div>

          {/* Critical Allergy Safeguard Alert */}
          <div className="bg-[#ffdad6]/60 border border-[#ffdad6] rounded-2xl p-4 sm:p-5 shadow-xs flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
              <Icon name="warning" className="text-[22px]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#ba1a1a] uppercase tracking-wider">
                  Critical Allergy Countermeasure
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold uppercase">
                  Active
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#ba1a1a] mt-0.5">
                Severe Penicillin Allergy (Anaphylaxis Risk)
              </h4>
              <p className="text-xs text-[#410002] mt-0.5 leading-relaxed">
                All antibiotic prophylaxis contraindicated for Penicillin/Beta-lactams. Recommended substitute: <span className="font-bold underline">Clindamycin 600mg</span> or <span className="font-bold underline">Azithromycin 500mg</span> if indicated.
              </p>
            </div>
          </div>
        </section>

        {/* Patient & Encounter Summary Card */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-[#006194] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                AO
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-bold text-[#131b2e] truncate">Amara Okafor</h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-xs font-medium text-[#707881]">
                    34y Female
                  </span>
                </div>
                <p className="font-mono text-xs text-[#006194] mt-0.5">ID: DHA-2026-00451</p>
              </div>
            </div>

            <div className="flex sm:flex-col sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-[#eaedff] text-xs">
              <span className="text-[#707881]">Attending Clinician</span>
              <span className="font-bold text-[#131b2e]">Dr. Daniel James</span>
              <span className="font-mono text-[#006a61] font-semibold">#DEN-48912</span>
            </div>
          </div>

          {/* Diagnostic Metadata Strip */}
          <div className="bg-[#faf8ff] rounded-xl p-3.5 border border-[#eaedff] space-y-2">
            <div className="flex flex-wrap items-center justify-between text-xs text-[#707881]">
              <span className="font-mono font-medium">ENCOUNTER #EXAM-2026-1048</span>
              <span>Captured: 12 Oct 2026</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="bg-white text-[#131b2e] px-2.5 py-1 rounded-lg text-xs font-medium border border-[#eaedff] flex items-center gap-1.5 shadow-2xs">
                <Icon name="dentistry" className="text-[14px] text-[#006194]" />
                Tooth #16 Caries (ICDAS 3/4)
              </span>
              <span className="bg-white text-[#131b2e] px-2.5 py-1 rounded-lg text-xs font-medium border border-[#eaedff] flex items-center gap-1.5 shadow-2xs">
                <Icon name="straighten" className="text-[14px] text-[#006a61]" />
                2.1mm Coronal Bitewing Clearance
              </span>
              <span className="bg-white text-[#131b2e] px-2.5 py-1 rounded-lg text-xs font-medium border border-[#eaedff] flex items-center gap-1.5 shadow-2xs">
                <Icon name="vital_signs" className="text-[14px] text-[#006a61]" />
                Pulp Vitality (+ve Reversible)
              </span>
            </div>
          </div>
        </section>

        {/* Section Header & Count */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Icon name="auto_awesome" className="text-[#006194] text-[20px]" />
            <h3 className="text-base sm:text-lg font-bold text-[#131b2e]">AI Draft Directives</h3>
            <span className="bg-[#006194] text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
              {recommendations.length} Prescriptions
            </span>
          </div>
          <span className="text-xs text-[#707881]">Priority Ranked</span>
        </div>

        {/* AI Recommendation Cards Stack */}
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <article
              key={rec.id}
              className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden transition-all duration-200"
            >
              {/* Priority Micro-Bar */}
              <div
                className={`px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-[#eaedff] ${
                  rec.priorityLevel === 'urgent'
                    ? 'bg-[#fff8f7]'
                    : rec.priorityLevel === 'attention'
                    ? 'bg-[#f0f9ff]'
                    : 'bg-[#faf8ff]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      rec.priorityLevel === 'urgent'
                        ? 'bg-[#ba1a1a] animate-pulse'
                        : rec.priorityLevel === 'attention'
                        ? 'bg-[#006194]'
                        : 'bg-[#707881]'
                    }`}
                  />
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-wider ${
                      rec.priorityLevel === 'urgent'
                        ? 'text-[#ba1a1a]'
                        : rec.priorityLevel === 'attention'
                        ? 'text-[#006194]'
                        : 'text-[#707881]'
                    }`}
                  >
                    {rec.priorityLabel}
                  </span>
                </div>
                <span className="bg-white font-mono text-xs font-bold px-2.5 py-1 rounded-md shadow-2xs border border-[#eaedff] text-[#131b2e]">
                  {rec.toothNumber}
                </span>
              </div>

              <div className="p-4 sm:p-6 space-y-3.5">
                {/* Title & Anatomical Target */}
                <div>
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                    <span className="text-xs text-[#707881] font-medium">{rec.toothTarget}</span>
                    <span className="bg-[#eaedff] text-[#006194] font-mono text-xs px-2 py-0.5 rounded font-semibold">
                      {rec.procedureCode}
                    </span>
                  </div>

                  {editingCardId === rec.id ? (
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-[#006194] rounded-lg text-sm font-bold text-[#131b2e] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(rec.id)}
                        className="px-3 py-1.5 bg-[#006194] text-white text-xs font-bold rounded-lg"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCardId(null)}
                        className="px-3 py-1.5 bg-[#f2f3ff] text-[#707881] text-xs font-bold rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <h4 className="text-base sm:text-lg font-bold text-[#131b2e]">{rec.title}</h4>
                  )}
                </div>

                {/* Clinical Justification & Evidence */}
                <div className="bg-[#faf8ff] rounded-xl p-3.5 border border-[#eaedff] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#006194]">
                    <Icon name="clinical_notes" className="text-[16px]" />
                    <span className="text-xs font-bold uppercase tracking-wider">Clinical Justification</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#42474e] leading-relaxed">
                    {rec.clinicalJustification}
                  </p>
                </div>

                {/* Proposed Protocol */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
                    Proposed Protocol
                  </span>
                  <p className="text-xs sm:text-sm text-[#131b2e] leading-relaxed">
                    {rec.proposedProtocol}
                  </p>
                </div>

                {/* Interactive Clinician Action Chips */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#eaedff]">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(rec)}
                      className="px-3 py-1.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <Icon name="edit" className="text-[15px]" />
                      Edit
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleApproval(rec.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                        rec.approved
                          ? 'bg-[#006a61] text-white hover:bg-[#00524b]'
                          : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#006a61] hover:text-white'
                      }`}
                    >
                      <Icon name={rec.approved ? 'verified' : 'check_circle'} className="text-[16px]" />
                      {rec.approved ? 'Dentist Approved' : 'Approve'}
                    </button>

                    <button
                      type="button"
                      onClick={() => removeCard(rec.id)}
                      className="w-8 h-8 rounded-lg bg-[#ffdad6]/60 hover:bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center transition-colors"
                      title="Remove recommendation"
                    >
                      <Icon name="delete" className="text-[16px]" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Clinician Directives & Additional Recommendations */}
        <section className="space-y-4">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="w-full h-12 rounded-xl bg-white hover:bg-[#f2f3ff] text-[#006194] border-2 border-dashed border-[#006194]/30 hover:border-[#006194] font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
          >
            <Icon name="add_circle" className="text-[20px]" />
            + Add Custom Clinician Recommendation
          </button>

          {/* Modal for adding custom recommendation */}
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4 animate-scale-up">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-[#131b2e]">Add Custom Recommendation</h4>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-[#f2f3ff] flex items-center justify-center text-[#707881]"
                  >
                    <Icon name="close" className="text-[18px]" />
                  </button>
                </div>

                <form onSubmit={handleAddCustom} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#707881] block mb-1">
                      Tooth Number / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 16, 15, Full Arch"
                      value={newTooth}
                      onChange={(e) => setNewTooth(e.target.value)}
                      className="w-full px-3 py-2 border border-[#eaedff] rounded-xl text-sm focus:outline-none focus:border-[#006194]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#707881] block mb-1">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as any)}
                      className="w-full px-3 py-2 border border-[#eaedff] rounded-xl text-sm focus:outline-none focus:border-[#006194]"
                    >
                      <option value="urgent">Urgent (&lt; 7 Days)</option>
                      <option value="attention">Attention (14–30 Days)</option>
                      <option value="routine">Routine Recare (6 Months)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#707881] block mb-1">
                      Procedure Title / Directive
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Occlusal adjustment & crown build-up"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-[#eaedff] rounded-xl text-sm focus:outline-none focus:border-[#006194]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-[#707881] hover:bg-[#f2f3ff]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#006194] text-white shadow-sm"
                    >
                      Add Directive
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Dentist Clinical Directives Form Area */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="clinical-directives"
                className="text-sm font-bold text-[#131b2e] flex items-center gap-1.5"
              >
                <Icon name="signature" className="text-[18px] text-[#006194]" />
                Dentist Clinical Directives &amp; Adjustments
              </label>
              <span className="text-xs text-[#707881]">Dr. Daniel James</span>
            </div>
            <p className="text-xs text-[#707881]">
              Add specific clinical instructions or prosthetic notes that will flow forward into Treatment Planning (Section 13).
            </p>
            <textarea
              id="clinical-directives"
              rows={3}
              value={clinicalDirectives}
              onChange={(e) => setClinicalDirectives(e.target.value)}
              className="w-full bg-[#faf8ff] rounded-xl p-3.5 text-xs sm:text-sm text-[#131b2e] border border-[#eaedff] focus:outline-none focus:border-[#006194] focus:bg-white transition-colors resize-none leading-relaxed"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="font-mono text-[11px] text-[#707881]">
                Audit: Auto-logged with Practitioner Key #DEN-48912
              </span>
              <button
                type="button"
                onClick={() =>
                  setClinicalDirectives(
                    'Check lateral excursive contacts on #46 during preparation of #16. Ensure non-working interference is eliminated prior to composite final curing.'
                  )
                }
                className="text-xs text-[#006194] font-semibold hover:underline"
              >
                Reset Directive
              </button>
            </div>
          </div>
        </section>

        {/* Sticky Bottom Hand-Off Bar */}
        <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md p-4 -mx-4 sm:mx-0 rounded-t-2xl sm:rounded-2xl border-t sm:border border-[#eaedff] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#707881] w-full sm:w-auto">
            <Icon name="sync_alt" className="text-[#006a61] text-[18px]" />
            <span>Simulated Handoff to Section 13 upon authorization</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => showToast('Draft recommendations saved locally to Encounter #EXAM-2026-1048.')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#c2d1e0] text-[#131b2e] hover:bg-[#f2f3ff] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="save" className="text-[16px]" />
              <span>Save Draft</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/summaries/edit-output')}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#006194] hover:bg-[#004e78] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#006194]/20 transition-all hover:scale-[1.02]"
            >
              <span>Proceed to Edit (12.12)</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </button>
          </div>
        </div>
      </div>
    </SummaryShell>
  );
}
