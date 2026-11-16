import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

interface PhaseData {
  id: string;
  number: string;
  title: string;
  priorityLabel: string;
  isUrgent: boolean;
  subtitle: string;
  objective: string;
  schedule: string;
  duration: string;
  assignedItems: string;
  dependency: string;
  statusLabel: string;
  clinician: string;
  sequence: string;
  durationMins: number;
}

export function TreatmentPhaseManagementScreen() {
  const navigate = useNavigate();

  const [phases, setPhases] = useState<PhaseData[]>([
    {
      id: 'phase-1',
      number: '01',
      title: 'Acute Restorative Intervention',
      priorityLabel: 'Priority',
      isUrgent: true,
      subtitle: 'Locked First Priority • Critical Cavitation',
      objective: 'Eliminate active bacterial biofilm and seal cavitated enamel-dentin lesion on #16.',
      schedule: '18 Oct – 20 Oct 2026',
      duration: '1 Visit (~45 mins)',
      assignedItems: 'Direct Composite #16',
      dependency: 'None (Immediate)',
      statusLabel: 'Scheduled for Sign-off',
      clinician: 'Dr. Daniel James',
      sequence: 'Visit 1 of 2',
      durationMins: 45,
    },
    {
      id: 'phase-2',
      number: '02',
      title: 'Preventive Care & Remineralization',
      priorityLabel: 'Secondary',
      isUrgent: false,
      subtitle: 'Enamel Conditioning • Non-Invasive',
      objective: 'Arrest non-cavitated white spot demineralization on Tooth #15 and evaluate post-op occlusion.',
      schedule: '02 Nov – 05 Nov 2026',
      duration: '1 Visit (~30 mins)',
      assignedItems: '#15 Fluoride, Perio Prophy',
      dependency: 'Requires Phase 1 Done',
      statusLabel: 'Planned Sequential',
      clinician: 'Dr. Daniel James',
      sequence: 'Visit 2 of 2',
      durationMins: 30,
    },
  ]);

  const [activeEditingId, setActiveEditingId] = useState<string>('phase-1');
  const [editorForm, setEditorForm] = useState({
    title: 'Phase 1: Acute Restorative Intervention',
    objective: 'Biomimetic resin composite placement with rubber dam isolation on tooth #16.',
    clinician: 'Dr. Daniel James',
    sequence: 'Visit 1 of 2',
    duration: 45,
    isUrgent: true,
  });

  const [editorFeedback, setEditorFeedback] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleEditClick = (phase: PhaseData) => {
    setActiveEditingId(phase.id);
    setEditorForm({
      title: `${phase.number === '01' ? 'Phase 1: ' : 'Phase 2: '}${phase.title}`,
      objective: phase.objective,
      clinician: phase.clinician,
      sequence: phase.sequence,
      duration: phase.durationMins,
      isUrgent: phase.isUrgent,
    });
    setEditorFeedback(`Loaded details for Phase ${phase.number}`);
  };

  const handleSaveEditor = (e: React.FormEvent) => {
    e.preventDefault();
    setPhases(
      phases.map((p) => {
        if (p.id === activeEditingId) {
          return {
            ...p,
            title: editorForm.title.replace(/^Phase \d+:\s*/, ''),
            objective: editorForm.objective,
            clinician: editorForm.clinician,
            sequence: editorForm.sequence,
            durationMins: editorForm.duration,
            isUrgent: editorForm.isUrgent,
          };
        }
        return p;
      })
    );
    setEditorFeedback('Configuration synchronized with clinical draft');
    showToast('Phase configuration updated');
    setTimeout(() => setEditorFeedback(null), 3000);
  };

  const movePhase = (index: number, direction: 'up' | 'down') => {
    const newPhases = [...phases];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newPhases.length) {
      const temp = newPhases[index];
      newPhases[index] = newPhases[targetIndex];
      newPhases[targetIndex] = temp;
      setPhases(newPhases);
      showToast('Sequence reordered');
    }
  };

  const handleCreateNewPhase = () => {
    const newPhase: PhaseData = {
      id: `phase-${Date.now()}`,
      number: `0${phases.length + 1}`,
      title: 'Maintenance & Periodontal Surveillance',
      priorityLabel: 'Recall',
      isUrgent: false,
      subtitle: 'Post-op Probing & Hygiene Recall',
      objective: 'Comprehensive periodontal probing re-evaluation, plaque score check, and contact integrity test.',
      schedule: '05 May 2027',
      duration: '1 Visit (~30 mins)',
      assignedItems: 'Perio Probing, Bitewing Audit',
      dependency: 'Requires Phase 2 Done',
      statusLabel: 'Scheduled Maintenance',
      clinician: 'Dr. Ngozi Eze',
      sequence: `Visit ${phases.length + 1} of ${phases.length + 1}`,
      durationMins: 30,
    };
    setPhases([...phases, newPhase]);
    showToast('Added Phase 3 to clinical sequence');
  };

  return (
    <TreatmentPlanShell
      pageTitle="Phase Sequencing & Management"
      badgeCode="13.6"
      badgeLabel="Phase Orchestration"
      currentStep="Phase Sequencing"
    >
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Header Clinical Context Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#cce5ff] text-[#001d31] font-bold text-xs flex items-center justify-center">
                AO
              </span>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#131b2e]">
                  Phase Sequencing &amp; Management
                </h1>
                <p className="text-xs text-[#707881]">
                  Configure sequential clinical execution, procedure dependencies, and target dates.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-[#f2f3ff] text-[#006194] self-start sm:self-auto">
              #TP-2026-089
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <Icon name="badge" className="text-[18px] text-[#006194]" />
              <span className="font-bold text-[#131b2e]">Amara Okafor</span>
              <span className="text-[#707881]">• 34y F (DHA-2026-00451)</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#006a61] font-semibold">
              <Icon name="verified" className="text-[16px]" />
              <span>Verified Plan</span>
            </div>
          </div>
        </div>

        {/* Timeline Visualizer Bento Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="timeline" className="text-[20px] text-[#006194]" />
              <h2 className="text-base font-bold text-[#131b2e]">Sequential Timeline</h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31]">
              Est. 4 Weeks Active Care
            </span>
          </div>

          {/* Progress Nodes */}
          <div className="relative py-3">
            <div className="absolute top-7 left-6 right-6 h-1 bg-[#eaedff] rounded-full z-0 hidden sm:block"></div>
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Node 1 */}
              <div
                onClick={() => handleEditClick(phases[0])}
                className="flex items-center sm:flex-col sm:items-start gap-3 sm:gap-2 p-3 sm:p-0 rounded-xl bg-[#f2f3ff] sm:bg-transparent cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform shrink-0">
                  01
                </div>
                <div>
                  <span className="text-xs font-bold text-[#006194] block">Phase 1 (Week 1)</span>
                  <span className="text-[11px] text-[#707881]">18 – 20 Oct 2026</span>
                </div>
              </div>

              {/* Node 2 */}
              <div
                onClick={() => phases[1] && handleEditClick(phases[1])}
                className="flex items-center sm:flex-col sm:items-center gap-3 sm:gap-2 p-3 sm:p-0 rounded-xl bg-[#f2f3ff] sm:bg-transparent cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-full bg-[#eaedff] text-[#131b2e] flex items-center justify-center font-bold text-xs shadow-xs group-hover:bg-[#cce5ff] transition-colors shrink-0">
                  02
                </div>
                <div className="sm:text-center">
                  <span className="text-xs font-bold text-[#131b2e] block">Phase 2 (Week 3)</span>
                  <span className="text-[11px] text-[#707881]">02 – 05 Nov 2026</span>
                </div>
              </div>

              {/* Node 3 */}
              <div className="flex items-center sm:flex-col sm:items-end gap-3 sm:gap-2 p-3 sm:p-0 rounded-xl bg-[#f2f3ff] sm:bg-transparent">
                <div className="w-9 h-9 rounded-full bg-[#89f5e7]/50 text-[#006a61] flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  <Icon name="event_repeat" className="text-[18px]" />
                </div>
                <div className="sm:text-right">
                  <span className="text-xs font-bold text-[#006a61] block">Recall Check</span>
                  <span className="text-[11px] text-[#707881]">6 Months (May 2027)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Execution Sequence Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#131b2e]">Execution Sequence</h3>
              <span className="w-5 h-5 rounded-full bg-[#eaedff] text-[#006194] text-xs font-bold flex items-center justify-center">
                {phases.length}
              </span>
            </div>
            <span className="text-xs text-[#707881] flex items-center gap-1">
              <Icon name="touch_app" className="text-[14px]" /> Reorder sequence via controls
            </span>
          </div>

          {phases.map((phase, idx) => (
            <div
              key={phase.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                activeEditingId === phase.id
                  ? 'border-[#006194] shadow-md'
                  : 'border-[#eaedff] shadow-sm hover:shadow-md'
              }`}
            >
              {/* Header */}
              <div className="p-4 sm:p-5 bg-[#f2f3ff] border-b border-[#eaedff]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
                        phase.isUrgent
                          ? 'bg-[#006194] text-white'
                          : 'bg-[#eaedff] text-[#131b2e]'
                      }`}
                    >
                      {phase.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-[#131b2e]">{phase.title}</h4>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            phase.isUrgent
                              ? 'bg-[#ffdad6] text-[#ba1a1a]'
                              : 'bg-[#89f5e7]/40 text-[#006a61]'
                          }`}
                        >
                          {phase.priorityLabel}
                        </span>
                      </div>
                      <p className="text-xs text-[#707881]">{phase.subtitle}</p>
                    </div>
                  </div>

                  {/* Move Up / Down Buttons */}
                  <div className="flex items-center gap-1 self-end sm:self-auto bg-white p-1 rounded-xl border border-[#eaedff]">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => movePhase(idx, 'up')}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                        idx === 0
                          ? 'text-[#bfc7d2] cursor-not-allowed'
                          : 'text-[#3f4850] hover:bg-[#eaedff]'
                      }`}
                      aria-label="Move Phase Up"
                    >
                      <Icon name="arrow_upward" className="text-[18px]" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === phases.length - 1}
                      onClick={() => movePhase(idx, 'down')}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                        idx === phases.length - 1
                          ? 'text-[#bfc7d2] cursor-not-allowed'
                          : 'text-[#3f4850] hover:bg-[#eaedff]'
                      }`}
                      aria-label="Move Phase Down"
                    >
                      <Icon name="arrow_downward" className="text-[18px]" />
                    </button>
                  </div>
                </div>

                {/* Objective */}
                <div className="mt-3 p-3 bg-white rounded-xl border border-[#eaedff] text-xs text-[#131b2e]">
                  <strong className="text-[#006194]">Clinical Objective: </strong>
                  {phase.objective}
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-3">
                  <div className="p-2.5 rounded-lg bg-white border border-[#eaedff]">
                    <span className="text-[10px] uppercase font-bold text-[#707881] block">Schedule</span>
                    <span className="text-xs font-bold text-[#131b2e] truncate block">{phase.schedule}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-[#eaedff]">
                    <span className="text-[10px] uppercase font-bold text-[#707881] block">Duration</span>
                    <span className="text-xs font-bold text-[#131b2e] truncate block">{phase.duration}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-[#eaedff]">
                    <span className="text-[10px] uppercase font-bold text-[#707881] block">Items</span>
                    <span className="text-xs font-bold text-[#006a61] truncate block">{phase.assignedItems}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-[#eaedff]">
                    <span className="text-[10px] uppercase font-bold text-[#707881] block">Dependency</span>
                    <span className="text-xs font-bold text-[#006194] truncate block">{phase.dependency}</span>
                  </div>
                </div>
              </div>

              {/* Lower Bar */}
              <div className="px-4 sm:px-5 py-3 bg-white flex items-center justify-between text-xs">
                <span className="text-[#006a61] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                  {phase.statusLabel}
                </span>

                <button
                  type="button"
                  onClick={() => handleEditClick(phase)}
                  className="px-3 py-1.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] font-semibold flex items-center gap-1 transition-colors"
                >
                  <Icon name="edit" className="text-[14px]" />
                  <span>Configure Phase</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Phase Configuration Drawer / Form */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
            <div className="flex items-center gap-2.5">
              <Icon name="tune" className="text-[22px] text-[#006194]" />
              <div>
                <h3 className="text-base font-bold text-[#131b2e]">Phase Detail Configuration</h3>
                <p className="text-xs text-[#707881]">Update clinical mandate, duration, and practitioner assignment</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleEditClick(phases[0])}
              className="text-xs font-semibold text-[#707881] hover:text-[#131b2e]"
            >
              Reset
            </button>
          </div>

          <form onSubmit={handleSaveEditor} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#3f4850]">Phase Title</label>
              <input
                type="text"
                value={editorForm.title}
                onChange={(e) => setEditorForm({ ...editorForm, title: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-[#f2f3ff] text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#3f4850]">Clinical Treatment Objective</label>
              <textarea
                rows={2}
                value={editorForm.objective}
                onChange={(e) => setEditorForm({ ...editorForm, objective: e.target.value })}
                className="w-full p-3 rounded-xl bg-[#f2f3ff] text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#3f4850]">Attending Clinician</label>
                <select
                  value={editorForm.clinician}
                  onChange={(e) => setEditorForm({ ...editorForm, clinician: e.target.value })}
                  className="w-full h-11 px-3 rounded-xl bg-[#f2f3ff] text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                >
                  <option value="Dr. Daniel James">Dr. Daniel James (Restorative Lead)</option>
                  <option value="Dr. Ngozi Eze">Dr. Ngozi Eze (Periodontist)</option>
                  <option value="Dr. Tariq Vance">Dr. Tariq Vance (Endodontics)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#3f4850]">Planned Sequence</label>
                <input
                  type="text"
                  value={editorForm.sequence}
                  onChange={(e) => setEditorForm({ ...editorForm, sequence: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-[#f2f3ff] text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#3f4850]">Expected Duration (mins)</label>
                <input
                  type="number"
                  value={editorForm.duration}
                  onChange={(e) => setEditorForm({ ...editorForm, duration: Number(e.target.value) })}
                  className="w-full h-11 px-4 rounded-xl bg-[#f2f3ff] text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                />
              </div>

              <div className="pt-5">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editorForm.isUrgent}
                    onChange={(e) => setEditorForm({ ...editorForm, isUrgent: e.target.checked })}
                    className="w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
                  />
                  <span className="text-xs font-bold text-[#131b2e]">Priority Intervention Tier</span>
                </label>
              </div>
            </div>

            {editorFeedback && (
              <div className="p-2.5 rounded-lg bg-[#cce5ff]/50 text-[#001d31] text-xs font-medium flex items-center gap-2">
                <Icon name="check_circle" className="text-[16px] text-[#006194]" />
                <span>{editorFeedback}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-bold text-xs shadow-xs transition-colors"
              >
                Apply Changes to Active Phase
              </button>
            </div>
          </form>
        </div>

        {/* Clinical Tip Widget */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 sm:p-5 border border-[#eaedff] flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#89f5e7]/40 text-[#006a61] flex items-center justify-center shrink-0">
            <Icon name="lightbulb" className="text-[20px]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#131b2e]">Dynamic Sequence Protection</h4>
            <p className="text-xs text-[#3f4850] mt-0.5 leading-relaxed">
              Phase 1 incorporates direct composite restorations requiring light-cure polymerization. Subsequent
              prophylaxis and fluoride sessions in Phase 2 are spaced 14 days apart to ensure margin maturation.
            </p>
          </div>
        </div>

        {/* Action Trays */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => {
              showToast('Phase sequence saved! Routing to plan items...');
              setTimeout(() => navigate('/treatment-plans/builder'), 600);
            }}
            className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>Save Phase Sequence &amp; Return to Builder (13.5)</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>

          <button
            type="button"
            onClick={handleCreateNewPhase}
            className="w-full h-11 rounded-xl bg-white border border-[#eaedff] text-[#006194] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#f2f3ff] transition-colors"
          >
            <Icon name="add_circle" className="text-[18px]" />
            <span>+ Create New Phase</span>
          </button>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/patient-overview')}
              className="text-xs text-[#707881] hover:text-[#ba1a1a] transition-colors"
            >
              Discard Changes &amp; Return to Patient Overview
            </button>
          </div>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[18px] text-[#89f5e7]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </TreatmentPlanShell>
  );
}
