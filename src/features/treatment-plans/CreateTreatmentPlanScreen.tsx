import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function CreateTreatmentPlanScreen() {
  const navigate = useNavigate();

  const [planTitle, setPlanTitle] = useState('Tooth #16 Restorative Protocol & Caries Arrest');
  const [indication, setIndication] = useState(
    'Acute cold sensitivity localized to upper right quadrant with cavitated mesio-occlusal dentin caries on Tooth #16 and early demineralization on Tooth #15.'
  );

  const [sources, setSources] = useState({
    sec12Ai: true,
    sec9Odontogram: true,
    sec11Radiograph: true,
    adhocClinician: false,
  });

  const [priority, setPriority] = useState<'emergency' | 'urgent' | 'high' | 'routine' | 'preventive'>('urgent');
  const [startDate, setStartDate] = useState('2026-10-18');
  const [completionDate, setCompletionDate] = useState('2026-10-25');
  const [isContinuing, setIsContinuing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleContinue = () => {
    setIsContinuing(true);
    setTimeout(() => {
      navigate('/treatment-plans/builder');
    }, 600);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <TreatmentPlanShell
      pageTitle="Plan Editor • Clinical Foundation"
      badgeCode="13.4"
      badgeLabel="Step 1 of 3"
      currentStep="Plan Foundation"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Step Progress Header */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-[#006194]">
              Wizard Sequence
            </span>
            <span className="font-mono text-xs text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-full font-semibold">
              Step 1 of 3
            </span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#131b2e]">
              Clinical Foundation &amp; Plan Objectives
            </h1>
            <p className="text-xs text-[#707881] mt-0.5">
              Establish primary indications, evidence linkage, priority scheduling tier, and clinical ownership.
            </p>
          </div>

          {/* Micro Multi-step Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className="h-2 rounded-full bg-[#006194]"></div>
            <div className="h-2 rounded-full bg-[#eaedff]"></div>
            <div className="h-2 rounded-full bg-[#eaedff]"></div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#707881]">
            <span className="font-bold text-[#006194] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006194] inline-block"></span>
              1. Foundation &amp; Metadata
            </span>
            <span>2. Phases &amp; Items</span>
            <span>3. Clinician Sign-off</span>
          </div>
        </div>

        {/* Patient Context Strip */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center font-bold text-sm shrink-0">
              <Icon name="badge" className="text-[20px]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#131b2e]">Amara Okafor</span>
                <span className="font-mono text-xs bg-[#f2f3ff] text-[#006194] px-2 py-0.5 rounded font-medium">
                  DHA-2026-00451
                </span>
              </div>
              <p className="text-xs text-[#707881]">Attending: Dr. Daniel James (#DEN-48912)</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#89f5e7]/40 text-[#006a61] self-start sm:self-auto">
            Active Verified File
          </span>
        </div>

        {/* Safety & AI Provenance Alert */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 sm:p-5 border border-[#eaedff] flex items-start gap-3.5">
          <Icon name="verified_user" className="text-[#006a61] text-[24px] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-[#131b2e]">Dentist-Approved Source Ingestion</h2>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              Source recommendation <span className="font-mono text-[#006194] font-semibold">#DHA-CS-9842</span> was
              formally reviewed and co-signed by Dr. Daniel James. Unapproved AI outputs are strictly locked from official plan generation.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="space-y-5">
          {/* 1. Plan Title */}
          <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="plan-title" className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
                <Icon name="edit_note" className="text-[18px] text-[#006194]" />
                <span>Plan Title</span>
              </label>
              <span className="text-xs font-semibold text-[#006a61]">Pre-filled from Diagnostic</span>
            </div>
            <p className="text-xs text-[#707881]">Official diagnosis-linked identifier for charts &amp; insurance claims.</p>
            <input
              id="plan-title"
              type="text"
              value={planTitle}
              onChange={(e) => setPlanTitle(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all font-medium"
            />
          </div>

          {/* 2. Clinical Concern / Primary Indication */}
          <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-2">
            <label htmlFor="clinical-indication" className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="clinical_notes" className="text-[18px] text-[#006194]" />
              <span>Clinical Concern / Primary Indication</span>
            </label>
            <p className="text-xs text-[#707881]">Subjective complaints, quadrant presentation, and objective decay staging.</p>
            <textarea
              id="clinical-indication"
              rows={3}
              value={indication}
              onChange={(e) => setIndication(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all resize-none leading-relaxed"
            />
          </div>

          {/* 3. Source Linkage (Multi-Select Matrix) */}
          <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
                <Icon name="hub" className="text-[18px] text-[#006194]" />
                <span>Treatment Plan Origin &amp; Source Linkage</span>
              </label>
              <span className="text-xs text-[#707881]">
                {Object.values(sources).filter(Boolean).length} Linked
              </span>
            </div>
            <p className="text-xs text-[#707881]">Select diagnostic foundations that validate and bind this operative pathway.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
              {/* Source 1 */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] cursor-pointer transition-colors border border-transparent">
                <input
                  type="checkbox"
                  checked={sources.sec12Ai}
                  onChange={(e) => setSources({ ...sources, sec12Ai: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-bold text-[#131b2e]">Approved AI Recommendation</span>
                    <span className="font-mono text-[10px] bg-[#89f5e7]/50 text-[#006a61] px-1.5 py-0.5 rounded font-semibold">
                      #DHA-CS-9842
                    </span>
                  </div>
                  <p className="text-[11px] text-[#707881]">Co-signed by Dr. Daniel James • 12 Oct 2026</p>
                </div>
              </label>

              {/* Source 2 */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] cursor-pointer transition-colors border border-transparent">
                <input
                  type="checkbox"
                  checked={sources.sec9Odontogram}
                  onChange={(e) => setSources({ ...sources, sec9Odontogram: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-bold text-[#131b2e]">Odontogram Findings</span>
                    <span className="font-mono text-[10px] bg-[#eaedff] text-[#3f4850] px-1.5 py-0.5 rounded font-semibold">
                      ICDAS 3/4
                    </span>
                  </div>
                  <p className="text-[11px] text-[#707881]">Active cavitated dentin lesion on tooth #16</p>
                </div>
              </label>

              {/* Source 3 */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] cursor-pointer transition-colors border border-transparent">
                <input
                  type="checkbox"
                  checked={sources.sec11Radiograph}
                  onChange={(e) => setSources({ ...sources, sec11Radiograph: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-bold text-[#131b2e]">Digital Radiograph Record</span>
                    <span className="font-mono text-[10px] bg-[#eaedff] text-[#3f4850] px-1.5 py-0.5 rounded font-semibold">
                      BW-R-1048
                    </span>
                  </div>
                  <p className="text-[11px] text-[#707881]">Dexis Bitewing series verifying pulpal clearance</p>
                </div>
              </label>

              {/* Source 4 */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] cursor-pointer transition-colors border border-transparent opacity-75 hover:opacity-100">
                <input
                  type="checkbox"
                  checked={sources.adhocClinician}
                  onChange={(e) => setSources({ ...sources, adhocClinician: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-bold text-[#131b2e]">Direct Clinician Initiated</span>
                    <span className="font-mono text-[10px] bg-[#f2f3ff] text-[#707881] px-1.5 py-0.5 rounded font-semibold">
                      Ad-hoc
                    </span>
                  </div>
                  <p className="text-[11px] text-[#707881]">Bypass automated diagnostic chart correlation</p>
                </div>
              </label>
            </div>
          </div>

          {/* 4. Priority Level */}
          <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
            <label className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="flag" className="text-[18px] text-[#006194]" />
              <span>Recommended Priority Level</span>
            </label>
            <p className="text-xs text-[#707881]">Operational scheduling tier determined by pain profile and pulp risk.</p>

            <div className="space-y-2">
              {/* Emergency */}
              <label
                onClick={() => setPriority('emergency')}
                className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                  priority === 'emergency'
                    ? 'bg-[#ffdad6]/40 border-[#ba1a1a]'
                    : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === 'emergency'}
                    onChange={() => setPriority('emergency')}
                    className="w-4 h-4 text-[#ba1a1a] focus:ring-[#ba1a1a]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#131b2e]">Emergency</span>
                    <span className="text-[11px] text-[#707881] block">&lt; 24 Hours (Acute trauma, swelling)</span>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
              </label>

              {/* Urgent (Recommended) */}
              <label
                onClick={() => setPriority('urgent')}
                className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                  priority === 'urgent'
                    ? 'bg-[#89f5e7]/25 border-[#006a61]'
                    : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === 'urgent'}
                    onChange={() => setPriority('urgent')}
                    className="w-4 h-4 text-[#006a61] focus:ring-[#006a61]"
                  />
                  <div>
                    <span className="text-xs font-extrabold text-[#131b2e]">Urgent (Recommended)</span>
                    <span className="text-[11px] text-[#707881] block">&lt; 7 Days (Cold sensitivity, cavitated)</span>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
              </label>

              {/* High Priority */}
              <label
                onClick={() => setPriority('high')}
                className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                  priority === 'high'
                    ? 'bg-[#cce5ff]/50 border-[#006194]'
                    : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === 'high'}
                    onChange={() => setPriority('high')}
                    className="w-4 h-4 text-[#006194] focus:ring-[#006194]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#131b2e]">High Priority</span>
                    <span className="text-[11px] text-[#707881] block">14 – 30 Days (Progression prevention)</span>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#007bb9]"></span>
              </label>

              {/* Compact Routine & Preventive */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <label
                  onClick={() => setPriority('routine')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer border ${
                    priority === 'routine'
                      ? 'bg-[#cce5ff]/40 border-[#006194]'
                      : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
                  }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === 'routine'}
                    onChange={() => setPriority('routine')}
                    className="w-4 h-4 text-[#006194] focus:ring-[#006194]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#131b2e] block">Routine</span>
                    <span className="text-[10px] text-[#707881]">6 Months</span>
                  </div>
                </label>

                <label
                  onClick={() => setPriority('preventive')}
                  className={`flex items-center gap-2.5 p-3 rounded-xl cursor-pointer border ${
                    priority === 'preventive'
                      ? 'bg-[#cce5ff]/40 border-[#006194]'
                      : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
                  }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    checked={priority === 'preventive'}
                    onChange={() => setPriority('preventive')}
                    className="w-4 h-4 text-[#006194] focus:ring-[#006194]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#131b2e] block">Preventive</span>
                    <span className="text-[10px] text-[#707881]">Maintenance</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* 5. Target Timeline */}
          <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
            <label className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="calendar_month" className="text-[18px] text-[#006194]" />
              <span>Target Clinical Timeline</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-[#f2f3ff] rounded-xl space-y-1">
                <span className="text-[11px] font-bold uppercase text-[#707881] block">
                  Recommended Start
                </span>
                <div className="flex items-center gap-2">
                  <Icon name="play_circle" className="text-[18px] text-[#006194]" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-transparent text-sm font-bold text-[#131b2e] focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-[#f2f3ff] rounded-xl space-y-1">
                <span className="text-[11px] font-bold uppercase text-[#707881] block">
                  Completion Review
                </span>
                <div className="flex items-center gap-2">
                  <Icon name="event_available" className="text-[18px] text-[#006a61]" />
                  <input
                    type="date"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    className="bg-transparent text-sm font-bold text-[#131b2e] focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-[#707881]">
              Estimated treatment cycle: 7 calendar days between preparation and final seal.
            </p>
          </div>

          {/* 6. Responsible Clinician & Facility */}
          <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
            <label className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="local_hospital" className="text-[18px] text-[#006194]" />
              <span>Responsible Clinician &amp; Facility</span>
            </label>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3.5 bg-[#f2f3ff] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#cce5ff] text-[#001d31] flex items-center justify-center font-bold text-xs">
                    DJ
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#131b2e]">Dr. Daniel James</p>
                    <p className="text-xs text-[#006a61] font-semibold flex items-center gap-1">
                      <Icon name="verified" className="text-[14px]" /> Verified Dental Surgeon
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#006194] font-semibold">#DEN-48912</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#f2f3ff] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#eaedff] text-[#131b2e] flex items-center justify-center">
                    <Icon name="location_on" className="text-[20px]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#131b2e]">Harmony Dental Clinic</p>
                    <p className="text-xs text-[#707881]">Wuse 2 Branch • Operatory 03</p>
                  </div>
                </div>
                <Icon name="lock" className="text-[18px] text-[#707881]" />
              </div>
            </div>
          </div>

          {/* Micro Diagnostic Odontogram Pill */}
          <div className="p-4 rounded-xl bg-[#eaedff] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-[#006194] flex items-center justify-center font-extrabold text-sm shadow-xs">
                #16
              </div>
              <div>
                <span className="text-xs font-bold text-[#131b2e] block">Target Tooth Mapped</span>
                <span className="text-xs text-[#707881]">Maxillary Right First Molar</span>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white text-[#006194] shadow-xs">
              MO Cavitated Caries
            </span>
          </div>
        </div>

        {/* Wizard Bottom Action Bar */}
        <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#eaedff] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => showToast('Treatment Plan Draft #TP-2026-089 Saved')}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] font-semibold text-xs transition-colors"
          >
            Save Draft
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/dashboard')}
              className="w-full sm:w-auto h-12 px-4 rounded-xl text-[#707881] hover:text-[#ba1a1a] text-xs font-medium transition-colors"
            >
              Discard
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={isContinuing}
              className="flex-1 sm:flex-none h-12 px-6 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {isContinuing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Preparing 13.5 Builder...</span>
                </>
              ) : (
                <>
                  <span>Continue to Plan Builder</span>
                  <Icon name="arrow_forward" className="text-[18px]" />
                </>
              )}
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
