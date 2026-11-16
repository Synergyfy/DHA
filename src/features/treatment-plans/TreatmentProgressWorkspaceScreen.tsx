import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

type RefTab = 'rad' | 'chart' | 'sec12';

export function TreatmentProgressWorkspaceScreen() {
  const navigate = useNavigate();

  // Chairside Timer
  const [seconds, setSeconds] = useState(1458); // 24:18
  const [activeTab, setActiveTab] = useState<RefTab>('rad');
  const [voiceLogActive, setVoiceLogActive] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [notesList, setNotesList] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showComplicationModal, setShowComplicationModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    setNotesList((prev) => [...prev, noteInput.trim()]);
    setNoteInput('');
    showToast('Chairside intra-op note added to encounter record');
  };

  const handleComplicationConfirm = () => {
    setShowComplicationModal(false);
    showToast('Complication logged: Indirect Pulp Cap Protocol activated for Tooth #16');
  };

  return (
    <TreatmentPlanShell
      pageTitle="Clinical Treatment Delivery"
      badgeCode="13.17"
      badgeLabel="Operatory Chairside Workspace"
      currentStep="13.17"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Complication Modal */}
      {showComplicationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Icon name="report_problem" className="text-2xl" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">Initiate Pulp Complication Protocol?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                This triggers an intra-operative procedure conversion for Tooth #16: shifts restorative pathway to <strong>Indirect Pulp Cap / Biodentine Liner</strong> and creates a supplemental consent note.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowComplicationModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleComplicationConfirm}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 shadow-sm"
              >
                Confirm Conversion
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Active Telemetry Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 truncate">
              Chairside Active Mode
            </span>
            <span className="text-xs font-mono text-slate-400">• Operatory 02</span>
          </div>

          <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-1.5 rounded-xl border border-[#eaedff]">
            <Icon name="timer" className="text-[#006194] text-base" />
            <span className="font-mono text-sm font-bold text-[#006194]">
              {formatTimer(seconds)}
            </span>
          </div>
        </div>

        {/* Patient Identity & Critical Safety Callout */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#006194] text-white flex items-center justify-center font-bold text-base shrink-0">
                AO
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-base text-slate-900">Amara Okafor</h2>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">34y Female</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Operatory 02 · Live Encounter <span className="font-mono font-bold text-[#006194]">#ENC-2026-1048</span>
                </p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#006194] flex items-center justify-center shrink-0">
              <Icon name="medical_services" className="text-xl" />
            </div>
          </div>

          {/* Anaphylaxis Allergy Banner */}
          <div className="bg-red-50 border border-red-200 text-red-950 rounded-xl p-3 flex items-center gap-2.5 text-xs font-medium">
            <Icon name="warning" className="text-red-600 text-lg shrink-0" />
            <span>
              <strong>Critical Allergy Alert:</strong> Penicillin Anaphylaxis Confirmed · Non-Beta-Lactam Operatory Regimen Active
            </span>
          </div>
        </div>

        {/* Procedure Milestones & Stage Tracker */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="checklist" className="text-[#006194] text-lg" />
              <span className="font-bold text-sm text-slate-900">Procedure Milestones</span>
            </div>
            <span className="text-xs font-bold font-mono text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-full">
              Stage 3 of 5
            </span>
          </div>

          {/* Stage Step Visualizer */}
          <div className="relative flex items-center justify-between w-full pt-2 pb-2">
            <div className="absolute left-4 right-4 top-5 -translate-y-1/2 h-1 bg-slate-100 rounded-full z-0">
              <div className="h-full bg-[#006194] rounded-full transition-all duration-300" style={{ width: '55%' }} />
            </div>

            {/* Steps */}
            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center shadow-xs">
                <Icon name="check" className="text-sm" />
              </div>
              <span className="text-[11px] font-semibold text-slate-600">Consent</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center shadow-xs">
                <Icon name="check" className="text-sm" />
              </div>
              <span className="text-[11px] font-semibold text-slate-600">Isolate</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-[#007bb9] text-white flex items-center justify-center shadow-md ring-4 ring-blue-100 animate-pulse">
                <Icon name="dentistry" className="text-sm" />
              </div>
              <span className="text-[11px] font-bold text-[#006194]">Debride</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                <Icon name="layers" className="text-sm" />
              </div>
              <span className="text-[11px] text-slate-400">Layer</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                <Icon name="verified" className="text-sm" />
              </div>
              <span className="text-[11px] text-slate-400">Seal</span>
            </div>
          </div>

          {/* Active Stage Highlight */}
          <div className="bg-[#faf8ff] rounded-xl p-3.5 flex items-start justify-between gap-3 border border-[#eaedff]">
            <div className="flex items-center gap-3">
              <Icon name="sync" className="text-[#006194] text-xl animate-spin" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Active: Caries Debridement &amp; Cavity Prep
                </span>
                <span className="text-[11px] text-slate-500">
                  Step 3 • Caries dye testing &amp; floor verification in progress
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 uppercase shrink-0">
              Live
            </span>
          </div>
        </div>

        {/* Active Procedure Dossier Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#cce5ff] text-[#001d31] flex items-center justify-center font-bold text-sm">
                #16
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 block">Maxillary Right 1st Molar</span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider">Surface: Mesio-Occlusal (MO)</span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-[#006194] bg-blue-50 px-2 py-1 rounded">
              DHA-RES-2S · D2392
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#faf8ff] rounded-xl p-3 border border-[#eaedff]">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Planned Intervention</span>
              <span className="font-bold text-slate-900 mt-1 block">Biomimetic Direct Composite</span>
              <span className="text-[11px] text-slate-500 font-mono">CDT D2392</span>
            </div>

            <div className="bg-teal-50/70 rounded-xl p-3 border border-teal-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#006a61] font-bold uppercase tracking-wider">Pulp Buffer Clearance</span>
                <span className="text-[11px] text-[#006a61] font-semibold flex items-center gap-1">
                  <Icon name="check_circle" className="text-xs" />
                  BW-R-1048
                </span>
              </div>
              <span className="text-lg font-extrabold text-[#006a61] mt-0.5 block">2.1 mm</span>
              <span className="text-[10px] text-slate-600">Safe margin above pulp horn</span>
            </div>
          </div>
        </div>

        {/* Quick Diagnostic Reference Switcher */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900">Quick Diagnostic Reference</span>
            <span className="text-xs text-[#006194] font-semibold">Auto-synced</span>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('rad')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all ${
                activeTab === 'rad' ? 'bg-white text-[#006194] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Radiograph
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('chart')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all ${
                activeTab === 'chart' ? 'bg-white text-[#006194] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Odontogram
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sec12')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all ${
                activeTab === 'sec12' ? 'bg-white text-[#006194] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AI Synopsis
            </button>
          </div>

          {/* Tab 1: Radiograph */}
          {activeTab === 'rad' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Icon name="radiology" className="text-[#006194] text-base" />
                  <span>BW-R-1048 Bitewing View</span>
                </div>
                <span className="font-mono text-slate-400">Acquired: Today 09:12 AM</span>
              </div>

              <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <div className="text-center text-slate-400 p-4">
                  <Icon name="radiology" className="text-4xl text-slate-500 mb-1" />
                  <div className="text-xs font-mono">Digital X-Ray Film #BW-R-1048</div>
                  <div className="text-[11px] text-teal-400 mt-1 font-semibold">
                    Caliper Measure: 2.1mm clear buffer above coronal pulp horn
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded text-white text-[11px] font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Pulp roof clearance: 2.1 mm (Clear)</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Odontogram */}
          {activeTab === 'chart' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Maxillary Arch Overview</span>
                <span className="font-mono text-[#006194] font-semibold">Target: Upper Right Q1</span>
              </div>

              <div className="grid grid-cols-4 gap-2.5 py-3 bg-slate-50 rounded-xl text-center text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="font-mono text-slate-400 block text-[11px]">#14</span>
                  <Icon name="dentistry" className="text-slate-400 text-xl my-1" />
                  <span className="text-[11px] text-slate-500 font-medium block">Intact</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="font-mono text-slate-400 block text-[11px]">#15</span>
                  <Icon name="dentistry" className="text-teal-600 text-xl my-1" />
                  <span className="text-[11px] text-[#006a61] font-medium block">Varnish</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#cce5ff] border-2 border-[#006194] shadow-xs">
                  <span className="font-mono text-[#006194] font-bold block text-[11px]">#16</span>
                  <Icon name="dentistry" className="text-[#006194] text-xl my-1" />
                  <span className="text-[11px] text-[#006194] font-bold block">MO Prep</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="font-mono text-slate-400 block text-[11px]">#17</span>
                  <Icon name="dentistry" className="text-slate-400 text-xl my-1" />
                  <span className="text-[11px] text-slate-500 font-medium block">Sound</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: AI Diagnostic Summary */}
          {activeTab === 'sec12' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">AI Diagnostic Synopsis</span>
              <div className="bg-[#faf8ff] rounded-xl p-3 border border-[#eaedff] space-y-1">
                <p className="text-slate-800 leading-relaxed">
                  <strong>Initial Diagnostic:</strong> Reversible pulpitis secondary to class II mesial caries on #16. EPT responsive within normal limits (22/80). Cold sensitivity lingering &lt; 3 seconds.
                </p>
                <p className="text-slate-500 text-[11px]">Clinician: Dr. Daniel James • Sign-off: 09:30 AM</p>
              </div>
            </div>
          )}
        </div>

        {/* Chairside Safety & Step Verification Telemetry */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="fact_check" className="text-[#006a61] text-lg" />
              <h3 className="font-bold text-sm text-slate-900">Chairside Safety &amp; Step Verification</h3>
            </div>
            <span className="text-[11px] font-bold text-[#006a61] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
              All Clear
            </span>
          </div>

          <div className="space-y-2">
            <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-3 border border-slate-200/80">
              <div className="w-6 h-6 rounded-full bg-[#006a61] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="check" className="text-xs" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Local Anesthesia Verified</span>
                  <span className="font-mono text-slate-400 text-[11px]">09:38 AM</span>
                </div>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  Mepivacaine 3% plain (Non-beta-lactam). Aspiration negative. No adverse reaction observed after 15m.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-3 border border-slate-200/80">
              <div className="w-6 h-6 rounded-full bg-[#006a61] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="check" className="text-xs" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Rubber Dam Isolation Sealed</span>
                  <span className="font-mono text-slate-400 text-[11px]">09:44 AM</span>
                </div>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  Non-latex Heavy Rubber Dam clamped on #16 with winged #W8A clamp. Complete moisture control achieved.
                </p>
              </div>
            </div>

            <div className="bg-blue-50/60 rounded-xl p-3 flex items-start gap-3 border border-blue-200">
              <div className="w-6 h-6 rounded-full bg-[#006194] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="colorize" className="text-xs" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Caries Dye &amp; Excavation</span>
                  <span className="font-mono text-[#006194] text-[11px] font-bold">Active</span>
                </div>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  Caries Detector Dye applied. Outer infected dentin excised via slow-speed carbide round bur #4. Intact firm dentinal floor confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Intra-Op Observations & Notes */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="clinical_notes" className="text-[#006194] text-lg" />
              <h3 className="font-bold text-sm text-slate-900">Intra-Op Clinical Observations</h3>
            </div>
            <button
              type="button"
              onClick={() => setVoiceLogActive(!voiceLogActive)}
              className="flex items-center gap-1 font-bold text-[11px] text-[#006194] bg-[#cce5ff] hover:bg-blue-200 px-3 py-1 rounded-full transition-colors"
            >
              <Icon name="mic" className="text-sm" />
              <span>Voice Log</span>
            </button>
          </div>

          {voiceLogActive && (
            <div className="bg-teal-50 border border-teal-200 text-[#006a61] p-3 rounded-xl flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#006a61] animate-ping"></span>
                <span>Listening chairside for Dr. James dictation...</span>
              </div>
              <span className="font-mono text-[11px]">00:08</span>
            </div>
          )}

          <div className="bg-[#faf8ff] rounded-xl p-3.5 border border-[#eaedff] space-y-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Verified Diagnostic Log</span>
              <span className="font-mono text-[#006a61] text-[11px] font-semibold">Dr. D. James (#DEN-48912)</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Cavity base firm, 2.0mm residual buffer intact. Pulp vitality safely preserved without exposure. Selective enamel etch (37% phosphoric acid, 15s applied), self-etch primer active on axial dentinal floor.
            </p>
          </div>

          {notesList.map((note, index) => (
            <div key={index} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 flex items-start gap-2">
              <Icon name="chat" className="text-slate-400 text-sm mt-0.5 shrink-0" />
              <span>{note}</span>
            </div>
          ))}

          {/* Quick Add Note Input */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
              placeholder="Add rapid clinical observation note..."
              className="flex-1 h-10 px-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-[#006194] focus:ring-1 focus:ring-[#006194] outline-none"
            />
            <button
              type="button"
              onClick={handleAddNote}
              className="h-10 px-4 bg-[#006194] text-white rounded-xl text-xs font-bold hover:bg-[#004b73] transition-colors flex items-center justify-center gap-1"
            >
              <Icon name="send" className="text-sm" />
              <span>Log</span>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/record-completion')}
            className="w-full h-12 bg-[#006194] hover:bg-[#004b73] active:scale-[0.99] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <span>Record Treatment Completion (13.18)</span>
            <Icon name="arrow_forward" className="text-lg" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => showToast('Chairside progress draft saved. Operatory session paused.')}
              className="h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="pause_circle" className="text-slate-500 text-base" />
              <span>Pause / Save Progress Draft</span>
            </button>

            <button
              type="button"
              onClick={() => setShowComplicationModal(true)}
              className="h-11 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="report_problem" className="text-amber-600 text-base" />
              <span>Intra-Op Complication / Convert to Cap</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/appointment-details')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              ← Back to Appointment Details
            </button>
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/record-completion')}
              className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
            >
              <span>Proceed to Record Completion (13.18)</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
