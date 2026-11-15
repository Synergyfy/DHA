import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

interface TicketHistory {
  id: string;
  title: string;
  status: 'resolved' | 'closed' | 'in_progress';
  date: string;
  summary: string;
}

const PAST_TICKETS: TicketHistory[] = [
  {
    id: '#DHA-SUP-9021',
    title: 'Licensure Renewal Certificate Sync',
    status: 'resolved',
    date: 'Resolved on 14 Oct 2026 • 11:24 GST',
    summary:
      'DHA Medical Board public key refreshed. Operatory workstations renewed with active credentials till Oct 2027.',
  },
  {
    id: '#DHA-SUP-8840',
    title: 'Add Operatory 03 to Schedule Roster',
    status: 'closed',
    date: 'Closed on 08 Oct 2026 • 17:40 GST',
    summary:
      'New dental hygienist bay calibrated with local radiograph server and digital sensor docking port.',
  },
];

export function ProfessionalHelpSupportScreen() {
  const navigate = useNavigate();

  // Ticket Form State
  const [issueCategory, setIssueCategory] = useState(
    'NABIDH Clinical Record Synchronization Issue'
  );
  const [severity, setSeverity] = useState<'Critical' | 'High' | 'Normal'>('High');
  const [subject, setSubject] = useState(
    'Bitewing BW-R-1048 DICOM link latency in Operatory 02'
  );
  const [description, setDescription] = useState(
    "During Amara Okafor's encounter (#ENC-2026-1048), Dexis high-resolution radiograph took 4 minutes to cache from the central PACS server. Operatory 02 workstation experienced intermittent websocket timeout."
  );
  const [attachedFiles, setAttachedFiles] = useState<string[]>([
    'Terminal_OP02_Log_18Oct.json (142 KB)',
  ]);

  // Toast / Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  const handleSelectQuickHub = (catName: string) => {
    setIssueCategory(catName);
    setToastMessage(`Issue category updated to "${catName}". Form updated below.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAttachScreenshot = () => {
    const filename = `Operatory02_Screenshot_${Date.now().toString().slice(-4)}.png (2.1 MB)`;
    setAttachedFiles([...attachedFiles, filename]);
    setToastMessage('Operatory screen snapshot captured and auto-attached.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `#DHA-SUP-${Math.floor(9100 + Math.random() * 800)}`;
      setSubmittedTicketId(ticketId);
      setToastMessage(`Priority Ticket ${ticketId} enqueued! Assigned to Level-3 Engineering (ETA: 12 mins).`);
      setTimeout(() => setToastMessage(null), 4500);
    }, 1000);
  };

  return (
    <ClinicalWorkspaceShell
      pageTitle="Professional Help & Support"
      badgeCode="14.24"
      badgeLabel="Clinician Concierge & Dispatch"
      activeNav="dashboard"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#131b2e] text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200">
            <span className="w-2 h-2 rounded-full bg-[#86f2e4] animate-pulse"></span>
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-[#707881] hover:text-white ml-2"
            >
              <Icon name="close" className="text-[16px]" />
            </button>
          </div>
        )}

        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#707881]">
            <button
              type="button"
              onClick={() => navigate('/dentist/dashboard')}
              className="hover:text-[#006194] transition-colors"
            >
              Clinical Workspace
            </button>
            <Icon name="chevron_right" className="text-[14px]" />
            <span className="font-semibold text-[#131b2e]">Clinician Support &amp; Concierge</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#86f2e4]/20 text-[#006f66] font-mono text-xs font-bold border border-[#86f2e4]/40">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              <span>Priority Helpdesk Online</span>
            </span>
          </div>
        </div>

        {/* Top Reassurance / Context Banner */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 lg:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#006194] text-xs font-bold uppercase tracking-wider">
            <Icon name="medical_services" className="text-[18px]" />
            <span>Clinician Concierge Dispatch</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#131b2e]">
            DHA Professional Support &amp; Engineering Concierge
          </h1>
          <p className="text-xs sm:text-sm text-[#707881] leading-relaxed max-w-3xl">
            Rapid technical dispatch, compliance resolution, and chairside operatory telemetry support for licensed dental practitioners and attending specialists across the UAE.
          </p>

          {/* SLA Pill Alert */}
          <div className="p-4 rounded-2xl bg-[#86f2e4]/20 border border-[#86f2e4]/40 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#006a61] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Icon name="bolt" className="text-[20px]" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-[#005049] flex items-center gap-2">
                <span>Clinician Priority Helpdesk Active</span>
                <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              </div>
              <p className="text-[#005049]/90 mt-0.5">
                Average Response Time: <strong>&lt; 15 mins</strong> during clinical operating hours (07:00 – 22:00 GST).
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Chairside Hotline Callout Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#ffdad6]/40 border border-[#ba1a1a]/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Icon name="emergency" className="text-[24px]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-[#93000a]">
                Need Immediate Assistance with an In-Chair Patient?
              </h3>
              <p className="text-xs text-[#93000a]/90 leading-relaxed max-w-xl">
                Bypass ticket triage for acute clinical software freezes, local anesthesia record blocks, or emergency vital telemetry drops.
              </p>
            </div>
          </div>

          <a
            href="tel:+97142198888"
            className="px-5 py-3 rounded-2xl bg-white hover:bg-[#faf8ff] text-[#131b2e] border border-[#eaedff] shadow-sm flex items-center gap-3 shrink-0 active:scale-[0.99] transition-transform"
          >
            <div className="w-9 h-9 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
              <Icon name="phone_in_talk" className="text-[18px]" />
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-[#707881]">
                Direct Chairside Operations Desk
              </div>
              <div className="font-mono font-bold text-sm text-[#ba1a1a]">+971 4 219 8888 (Option 1)</div>
            </div>
          </a>
        </div>

        {/* Quick Diagnostic & Resolution Hubs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Quick Diagnostic &amp; Resolution Hubs
            </h3>
            <span className="text-[11px] text-[#006194] font-semibold">Self-Service Shortcuts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'EHR & Odontogram Troubleshooting',
                category: 'EHR & Odontogram Troubleshooting',
                desc: 'Chart sync, 3D periodontal rendering lag, FDI/Universal tooth numbering conflicts.',
                icon: 'dentistry',
                color: 'bg-[#cce5ff]/50 text-[#006194]',
              },
              {
                title: 'NABIDH Sync & Licensure Support',
                category: 'NABIDH Clinical Record Synchronization Issue',
                desc: 'Credential attestation, DHA medical license renewal, token key resets, Malaffi sync.',
                icon: 'verified_user',
                color: 'bg-[#86f2e4]/30 text-[#006f66]',
              },
              {
                title: 'Appointment & Chairside Dispatch',
                category: 'Operatory Calendar Conflict',
                desc: 'Operatory schedule sync, sterile bay readiness logs, automated patient SMS gate check.',
                icon: 'airline_seat_recline_extra',
                color: 'bg-[#f2f3ff] text-[#006194]',
              },
              {
                title: 'Billing, Tariff & Insurance Pre-Auth',
                category: 'Billing, Tariff & Insurance Pre-Auth',
                desc: 'Unified Clinical Coding (UCC), Daman Thiqa pre-authorizations, and co-pay rejections.',
                icon: 'receipt_long',
                color: 'bg-[#faf8ff] text-[#131b2e]',
              },
            ].map((hub, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectQuickHub(hub.category)}
                className="p-4 rounded-2xl bg-white border border-[#eaedff] shadow-xs hover:border-[#006194]/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2 group"
              >
                <div className="space-y-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${hub.color}`}>
                    <Icon name={hub.icon} className="text-[20px]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#131b2e] leading-snug group-hover:text-[#006194]">
                    {hub.title}
                  </h4>
                  <p className="text-[11px] text-[#707881] leading-relaxed line-clamp-2">
                    {hub.desc}
                  </p>
                </div>

                <div className="pt-2 text-[11px] font-semibold text-[#006194] flex items-center gap-1">
                  <span>Autofill Form</span>
                  <Icon name="arrow_forward" className="text-[12px] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Support Ticket Submission Form */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 lg:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
            <div>
              <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
                <Icon name="support_agent" className="text-[20px] text-[#006194]" />
                <span>Priority Incident Dispatch</span>
              </h2>
              <p className="text-xs text-[#707881] mt-0.5">
                Submit immediate technical alerts directly to Level-3 Clinical Engineering.
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#cce5ff]/50 text-[#004b74] font-mono text-[10px] font-bold">
              Clinician Priority Queue
            </span>
          </div>

          <form onSubmit={handleSubmitTicket} className="space-y-4 text-xs">
            {/* Category */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">Issue Category</label>
              <select
                value={issueCategory}
                onChange={(e) => setIssueCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
              >
                <option>NABIDH Clinical Record Synchronization Issue</option>
                <option>Operatory Calendar Conflict</option>
                <option>Patient LifeCode Merge Inquiry</option>
                <option>Biometric Signature Terminal Error</option>
                <option>EHR &amp; Odontogram Troubleshooting</option>
                <option>Billing, Tariff &amp; Insurance Pre-Auth</option>
                <option>Other Clinical Systems Inquiry</option>
              </select>
            </div>

            {/* Severity Radio Matrix */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-2">Severity Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    level: 'Critical',
                    badge: '• Patient in chair',
                    desc: 'Immediate block to treatment in progress',
                    color: 'text-[#ba1a1a] border-[#ba1a1a]/30',
                  },
                  {
                    level: 'High',
                    badge: "• Today's schedule",
                    desc: 'Affects upcoming appointments or PACS',
                    color: 'text-[#006194] border-[#006194]/30',
                  },
                  {
                    level: 'Normal',
                    badge: '• General administrative',
                    desc: 'Licensing inquiries, non-urgent features',
                    color: 'text-[#131b2e] border-[#eaedff]',
                  },
                ].map((s) => {
                  const selected = severity === s.level;
                  return (
                    <label
                      key={s.level}
                      onClick={() => setSeverity(s.level as any)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        selected
                          ? 'bg-[#faf8ff] border-[#006194] ring-2 ring-[#006194]/20'
                          : 'bg-white border-[#eaedff]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-bold text-xs ${s.color}`}>{s.level}</span>
                        <span className="text-[10px] text-[#707881]">{s.badge}</span>
                      </div>
                      <p className="text-[11px] text-[#707881] mt-1 leading-snug">{s.desc}</p>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-[#131b2e]">Detailed Description</label>
                <span className="text-[10px] text-[#707881]">Clinical Encounter Trace</span>
              </div>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194] leading-relaxed resize-none"
              />
            </div>

            {/* Attached Diagnostics */}
            <div className="space-y-2">
              <span className="block font-bold text-[#131b2e]">Attached Diagnostics</span>
              <div className="space-y-1.5">
                {attachedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Icon name="memory" className="text-[16px] text-[#006a61]" />
                      <span className="font-mono text-[11px] text-[#131b2e] font-semibold">
                        {file}
                      </span>
                    </div>
                    <span className="text-[#006a61] text-[10px] font-bold flex items-center gap-1">
                      <Icon name="check" className="text-[12px]" />
                      <span>Auto-linked Telemetry</span>
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAttachScreenshot}
                className="w-full py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-[#eaedff]"
              >
                <Icon name="add_photo_alternate" className="text-[16px]" />
                <span>+ Attach Screenshot or Operatory Error Screen</span>
              </button>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubject('');
                  setDescription('');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#eaedff] bg-white text-xs font-bold text-[#3f4850] hover:bg-[#f2f3ff]"
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Icon name={isSubmitting ? 'sync' : 'send'} className={`text-[16px] ${isSubmitting ? 'animate-spin' : ''}`} />
                <span>{isSubmitting ? 'Enqueuing Dispatch...' : 'Submit Priority Support Ticket'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Recent Support Inquiries & Resolution History */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 lg:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
            <h3 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="history" className="text-[18px] text-[#006194]" />
              <span>Recent Inquiries &amp; Resolution History</span>
            </h3>
            <span className="text-xs text-[#006194] font-semibold">View All (12)</span>
          </div>

          <div className="space-y-3">
            {submittedTicketId && (
              <div className="p-4 rounded-2xl bg-[#cce5ff]/30 border border-[#006194]/30 space-y-1.5 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#006194]">
                    {submittedTicketId}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#004b74] text-[10px] font-bold">
                    In Progress • Level-3 Engineering
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#131b2e]">{subject}</h4>
                <p className="text-xs text-[#3f4850]">{description}</p>
                <div className="text-[10px] text-[#707881] pt-1">
                  Enqueued just now • Assigned Engineer: Tariq M.
                </div>
              </div>
            )}

            {PAST_TICKETS.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#707881]">{t.id}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-[10px] font-bold flex items-center gap-1">
                    <Icon name="check" className="text-[12px]" />
                    <span>Resolved</span>
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#131b2e]">{t.title}</h4>
                <p className="text-xs text-[#3f4850] leading-relaxed">{t.summary}</p>
                <div className="text-[10px] text-[#707881] pt-0.5">{t.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ClinicalWorkspaceShell>
  );
}
