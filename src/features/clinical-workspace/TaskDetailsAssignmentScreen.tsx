import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';
import { Icon } from '../../design/Primitives';

interface ClinicalNoteEntry {
  id: string;
  author: string;
  timestamp: string;
  text: string;
  isNew?: boolean;
}

export function TaskDetailsAssignmentScreen() {
  const navigate = useNavigate();

  // Delegation selector state
  const [selectedAssignee, setSelectedAssignee] = useState<string>('james');
  const [internalNoteInput, setInternalNoteInput] = useState('');
  const [notesThread, setNotesThread] = useState<ClinicalNoteEntry[]>([
    {
      id: 'n-1',
      author: 'Dr. Daniel James (DDS)',
      timestamp: '14 Oct 2026, 11:20 GST',
      text: 'Drafted following Dexis bitewing review. Patient requested morning appointments for Phase 2 due to school pickup schedules.',
    },
    {
      id: 'n-2',
      author: 'Clinical Coordinator System',
      timestamp: '14 Oct 2026, 09:15 GST',
      text: 'Safety checks 6/6 satisfied automatically via EHR integration (Sensitivities verified against Master Index).',
    },
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const isScopeRestricted = selectedAssignee === 'tariq' || selectedAssignee === 'noor';

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalNoteInput.trim()) return;

    const newNote: ClinicalNoteEntry = {
      id: `n-${Date.now()}`,
      author: 'Dr. Daniel James (Current Session)',
      timestamp: 'Just now',
      text: internalNoteInput.trim(),
      isNew: true,
    };

    setNotesThread([newNote, ...notesThread]);
    setInternalNoteInput('');
    showToast('Internal note appended to clinical log.');
  };

  return (
    <ClinicalWorkspaceShell activeTab="appointments">
      <div className="max-w-4xl mx-auto space-y-5 pb-32 md:pb-12">
        {/* Top Breadcrumb & Task Ref Tracker */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Icon name="arrow_back" className="text-base" />
            <span>Back to Queue</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
              Sec 14.10 • Task Inspection
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-xs font-medium">
              Ref: #TSK-2026-0482
            </span>
          </div>
        </div>

        {/* Primary Task Metadata Card */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-bold uppercase tracking-wider animate-pulse">
                <Icon name="priority_high" filled className="text-xs" />
                Urgent (&lt; 24h)
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-xs font-semibold uppercase">
                <Icon name="pending_actions" className="text-xs" />
                In Review
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Icon name="folder_open" className="text-sm text-teal-600 dark:text-teal-400" />
              <span>Sec 13 • Treatment Plans</span>
            </div>
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              Approve Treatment Plan #TP-2026-089 &amp; Clinical Scope
            </h1>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
              <Icon name="schedule" className="text-sm text-slate-400" />
              <span>
                Due: <strong className="text-slate-900 dark:text-white font-semibold">18 Oct 2026, 17:00 GST</strong>
              </span>
              <span>•</span>
              <span>Created 14 Oct</span>
            </div>
          </div>

          {/* Statutory Checklist Snapshot */}
          <div className="flex items-center justify-between bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 rounded-xl p-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center">
                <Icon name="verified" filled className="text-xs" />
              </div>
              <span className="font-bold text-teal-900 dark:text-teal-200">6/6 Statutory Safeguards Cleared</span>
            </div>
            <span className="inline-flex items-center gap-1 text-teal-700 dark:text-teal-300 font-semibold">
              Biometric Consent OK
              <Icon name="fingerprint" className="text-sm" />
            </span>
          </div>
        </section>

        {/* Linked Patient Identity Card with Anaphylaxis Alert */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                alt="Amara Okafor"
                className="w-13 h-13 rounded-xl object-cover ring-2 ring-teal-500/30 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-base text-slate-900 dark:text-white truncate">Amara Okafor</span>
                  <span className="text-xs text-slate-500">34y Female</span>
                </div>
                <p className="font-mono text-xs text-slate-500 mt-0.5">
                  MRN: <span className="font-semibold text-slate-900 dark:text-white">DHA-2026-00451</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/dentist/patient-overview')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-teal-700 dark:text-teal-300 font-semibold text-xs transition-colors shrink-0"
            >
              <span>Overview (14.8)</span>
              <Icon name="arrow_forward" className="text-xs" />
            </button>
          </div>

          {/* Critical Allergy Callout */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200 text-xs">
            <Icon name="warning" filled className="text-lg text-red-600 dark:text-red-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-bold uppercase tracking-wider text-[10px] block text-red-700 dark:text-red-300">
                Active Alert
              </span>
              <span className="truncate block font-medium">
                Penicillin Anaphylaxis • Strict Non-Beta-Lactam Protocol Required
              </span>
            </div>
          </div>

          {/* Encounter Coordinates */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-1.5 truncate">
              <Icon name="chair" className="text-sm text-teal-600" />
              <span>
                Today&apos;s Visit: <strong className="text-slate-900 dark:text-white">#ENC-2026-1048</strong>
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
              Operatory 02
            </span>
          </div>
        </section>

        {/* Clinical Directive & Context Specifications */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="clinical_notes" className="text-lg text-teal-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Clinical Directive &amp; Scope</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 font-mono text-xs text-slate-600 dark:text-slate-300">
              CDT D2392
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Statutory clinician review and digital signature required for amended Plan{' '}
            <strong className="text-teal-700 dark:text-teal-300 font-semibold">#TP-2026-089</strong>. Scope includes{' '}
            <strong>Tooth #16</strong> Direct Biomimetic Resin Composite (CDT D2392) and Phase 2 Topical Fluoride
            Remineralization (#15) with Periodontal Recare.
          </div>

          {/* Odontogram Mini Nodes */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 text-xs">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-500/30 shrink-0">
              <span className="w-6 h-6 rounded-md bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                #16
              </span>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Biomimetic Resin</span>
                <span className="text-[11px] text-slate-500">Direct Composite • Occlusal</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-500/30 shrink-0">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                #15
              </span>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Fluoride Varnish</span>
                <span className="text-[11px] text-slate-500">Phase 2 Recare</span>
              </div>
            </div>
          </div>

          {/* Originator Stamp */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-1.5">
              <Icon name="draw" className="text-sm text-teal-600" />
              <span>
                Created by: <strong className="text-slate-900 dark:text-white">Dr. Daniel James</strong> (DDS)
              </span>
            </div>
            <span className="font-mono text-slate-400">Lic #DEN-48912</span>
          </div>
        </section>

        {/* Professional Assignment & Delegation Safeguards Panel */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="badge" className="text-lg text-teal-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Assignment &amp; Delegation</h3>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-xs font-semibold">
              <Icon name="domain" className="text-xs" />
              Harmony Wuse 2
            </span>
          </div>

          {/* Current Assignee Card */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold shrink-0">
                DJ
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Dr. Daniel James</span>
                  <span className="px-1.5 py-0.2 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-[10px] font-bold">
                    Attending
                  </span>
                </div>
                <p className="text-slate-500 mt-0.5">Lead Restorative Clinician • #DEN-48912</p>
              </div>
            </div>
            <Icon name="check_circle" filled className="text-teal-600 text-lg" />
          </div>

          {/* Reassignment Selector */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Delegate / Reassign To</span>
              <span className="text-teal-600 dark:text-teal-400 font-normal">Active On-Duty Staff</span>
            </label>
            <div className="relative">
              <select
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className="w-full h-11 pl-3 pr-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
              >
                <option value="james">Dr. Daniel James — Lead Restorative (Attending DDS)</option>
                <option value="mansoor">Dr. K. Al-Mansoor — Orthodontist &amp; Implantologist (#DEN-38291)</option>
                <option value="tariq">Nurse Zainab Tariq — Chairside RN (#RN-9428) [Scope Restricted]</option>
                <option value="noor">Fatima Noor — Dental Hygienist &amp; Recare (#DH-5102) [Scope Restricted]</option>
              </select>
              <Icon
                name="unfold_more"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base"
              />
            </div>
          </div>

          {/* Statutory Role Guardrail Banner */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 text-xs text-slate-600 dark:text-slate-300">
            <Icon name="policy" className="text-base text-teal-600 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <strong className="text-slate-900 dark:text-white block font-semibold">
                Statutory Scope Guardrail (DHA-REG-14)
              </strong>
              Delegation strictly complies with jurisdictional licensing. Final treatment plan authorizations &amp;
              surgical consents remain exclusive to licensed Dental Surgeons (<strong>#DEN</strong>).
            </div>
          </div>

          {/* Dynamic Scope Warning */}
          {isScopeRestricted && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-900 dark:text-red-200">
              <Icon name="gavel" filled className="text-base text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Ineligible for Digital Sign-off</strong>
                This clinical task requires an active CDT plan sign-off credential. Selected staff may only receive
                observation or assisting handoff tasks.
              </div>
            </div>
          )}
        </section>

        {/* Clinical Notes & Audit Activity Log */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="forum" className="text-lg text-teal-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Handoff Notes &amp; Audit Log</h3>
            </div>
            <span className="text-xs text-slate-400">{notesThread.length} Entries</span>
          </div>

          {/* Thread */}
          <div className="space-y-2.5">
            {notesThread.map((entry) => (
              <div
                key={entry.id}
                className={`p-3 rounded-xl text-xs space-y-1 transition-all ${
                  entry.isNew
                    ? 'bg-teal-50 dark:bg-teal-950/40 border border-teal-500/30'
                    : 'bg-slate-50 dark:bg-slate-700/40'
                }`}
              >
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-white">{entry.author}</span>
                  <span>{entry.timestamp}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{entry.text}</p>
              </div>
            ))}
          </div>

          {/* Add Note Input Box */}
          <form onSubmit={handlePostNote} className="space-y-2 pt-1">
            <textarea
              rows={2}
              value={internalNoteInput}
              onChange={(e) => setInternalNoteInput(e.target.value)}
              placeholder="Add an internal clinical note or handoff instruction..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
              >
                <Icon name="send" className="text-xs" />
                <span>Post Note</span>
              </button>
            </div>
          </form>
        </section>

        {/* Execution Action Controls */}
        <section className="space-y-3 pt-2">
          {/* Primary CTA */}
          <button
            onClick={() => navigate('/treatment-plans/dentist-approval')}
            className="w-full h-12 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Icon name="approval" className="text-lg" />
            <span>Review &amp; Approve Plan (Sec 13.10)</span>
          </button>

          {/* Secondary CTA */}
          <button
            disabled={isScopeRestricted}
            onClick={() => showToast('Reassignment dispatched to staff roster')}
            className={`w-full h-11 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
              isScopeRestricted
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-sm'
            }`}
          >
            <Icon name="transfer_within_a_station" className="text-base" />
            <span>Confirm Reassignment &amp; Transfer</span>
          </button>

          {/* Split Tertiary Controls */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              onClick={() => showToast('Task marked complete in audit ledger.')}
              className="h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Icon name="check_circle" className="text-base text-teal-600" />
              <span>Mark Complete</span>
            </button>

            <button
              onClick={() => showToast('Task deferred for 24 hours.')}
              className="h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Icon name="snooze" className="text-base text-slate-400" />
              <span>Defer Task</span>
            </button>
          </div>
        </section>

        {/* Global Toast */}
        {toastMessage && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2">
            <Icon name="check_circle" filled className="text-teal-400 text-sm" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
