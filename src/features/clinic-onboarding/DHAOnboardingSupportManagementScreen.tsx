import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type TriageCategory = 'priority' | 'radiation' | 'staff' | 'legal' | 'resolved';
type ResponseType = 'public' | 'internal';

interface SupportTicket {
  id: string;
  category: TriageCategory;
  priority: 'high' | 'medium' | 'normal';
  clinicName: string;
  location: string;
  timeAgo: string;
  repName: string;
  repRole: string;
  subject: string;
  body: string;
  attachmentName?: string;
  attachmentSize?: string;
  slaRemaining: string;
}

const TICKETS: SupportTicket[] = [
  {
    id: '#SUP-ONB-7821',
    category: 'priority',
    priority: 'high',
    clinicName: 'Greenfield Dental Clinic Ltd',
    location: 'Wuse 2, Abuja • Zone 4',
    timeAgo: '14m ago',
    repName: 'Dr. Amina Bello',
    repRole: 'Medical Director',
    subject: 'Clarification on NNRA Physicist Radiation Scatter Survey for Operatory 04',
    body: '“We have uploaded the certified scatter survey from Lead Shield Consults Ltd. Can you confirm if physical reinspection is needed before 24 Oct? Operatory 04 patient load depends on this final authorization.”',
    attachmentName: 'NNRA_Scatter_Survey_Room04.pdf',
    attachmentSize: '3.8 MB',
    slaRemaining: '18m remaining',
  },
  {
    id: '#SUP-ONB-7819',
    category: 'staff',
    priority: 'medium',
    clinicName: 'Apex Maxillofacial Hospital',
    location: 'Area 11, Garki, Abuja',
    timeAgo: '1h ago',
    repName: 'Prof. K. Alabi',
    repRole: 'Chief of Oral Surgery',
    subject: 'Visiting Odontologist foreign credential translation assistance',
    body: '“Our visiting surgeon graduated from Karolinska Institute. We submitted MDCN temporary reciprocity registration. Is additional notarization required for Section 15 clearance?”',
    attachmentName: 'MDCN_Temporary_Folio_Reciprocity.pdf',
    attachmentSize: '1.2 MB',
    slaRemaining: '1h 12m remaining',
  },
  {
    id: '#SUP-ONB-7815',
    category: 'legal',
    priority: 'normal',
    clinicName: 'SmileCare Community Practice',
    location: 'Wuse Zone 4, Abuja',
    timeAgo: '2h ago',
    repName: 'Dr. F. Alabi',
    repRole: 'Incoming Director',
    subject: 'HEFAMAA address mismatch rectification',
    body: '“The municipal boundary name discrepancy between our CAC Form 1.1 and HEFAMAA permit has been resolved with AMAC land authority letter. Please acknowledge receipt.”',
    attachmentName: 'AMAC_Cadastral_Confirmation.pdf',
    attachmentSize: '890 KB',
    slaRemaining: '2h 45m remaining',
  },
];

export function DHAOnboardingSupportManagementScreen() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<TriageCategory>('priority');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket>(TICKETS[0]);
  const [responseType, setResponseType] = useState<ResponseType>('public');
  const [replyText, setReplyText] = useState('');
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 2400);
  };

  const handleMacroSelect = (macro: string) => {
    setReplyText((prev) => (prev ? `${prev}\n\n${macro}` : macro));
  };

  const handleDispatch = () => {
    if (!replyText.trim()) {
      triggerToast('Please type a response message or select a macro');
      return;
    }
    triggerToast(`Response dispatched for ${selectedTicket.id}`);
    setReplyText('');
  };

  const filteredTickets = useMemo(() => {
    if (selectedCategory === 'priority') return TICKETS;
    return TICKETS.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-['Inter',sans-serif]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#283044] text-[#eef0ff] px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <Icon name="check_circle" className="text-[16px] text-[#00a392]" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shadow-sm">
              <Icon name="support_agent" className="text-[22px]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#006194] uppercase tracking-wider block">
                DHA RegOps
              </span>
              <h1 className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight">
                DHA Onboarding Support Management
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerToast('Concierge SLA pulse: 100% operational')}
              className="w-10 h-10 flex items-center justify-center text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] rounded-xl transition-colors"
            >
              <Icon name="notifications" className="text-[20px]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shadow-sm text-white">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-28 space-y-6">
        {/* Executive Performance Strip & Clinical SLA Pulse */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#006a61] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">
                Live Concierge SLA Pulse
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-[#f2f3ff] px-3 py-1 text-[#006194] border border-[#dae2fd]">
              <Icon name="speed" className="text-[16px]" />
              <span className="text-xs font-bold">1.8h Avg Turnaround</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-[#ffdad6]/40 border border-[#ffdad6] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#ba1a1a]">
                <span className="text-[10px] font-bold uppercase">DHA Action Req.</span>
                <Icon name="priority_high" className="text-[18px]" />
              </div>
              <span className="text-2xl font-black text-[#93000a] mt-2 font-mono">07</span>
              <span className="text-[11px] text-[#ba1a1a] font-medium">Critical Triage</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#006a61]">
                <span className="text-[10px] font-bold uppercase">Clinic Follow-up</span>
                <Icon name="outgoing_mail" className="text-[18px]" />
              </div>
              <span className="text-2xl font-black text-[#006a61] mt-2 font-mono">08</span>
              <span className="text-[11px] text-[#3f4850]">19 Total Open</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#006194]">
                <span className="text-[10px] font-bold uppercase">Resolved Today</span>
                <Icon name="check_circle" className="text-[18px]" />
              </div>
              <span className="text-2xl font-black text-[#006194] mt-2 font-mono">14</span>
              <span className="text-[11px] text-[#3f4850]">Closed Tickets</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#86f2e4]/30 border border-[#86f2e4] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#006f66]">
                <span className="text-[10px] font-bold uppercase">Target Met</span>
                <Icon name="verified_user" className="text-[18px]" />
              </div>
              <span className="text-2xl font-black text-[#006f66] mt-2 font-mono">92%</span>
              <span className="text-[11px] text-[#006f66] font-medium">&lt; 3.0h benchmark</span>
            </div>
          </div>
        </div>

        {/* Triage Category Filter Tabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Active Triages (Desk Zone #04 • FCT Central)
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'priority', label: 'Priority Queue', icon: 'emergency_home', count: 7 },
              { id: 'radiation', label: 'Radiation & Physics', icon: 'leak_add', count: 5 },
              { id: 'staff', label: 'Staff Verification', icon: 'badge', count: 4 },
              { id: 'legal', label: 'Legal & CAC', icon: 'gavel', count: 3 },
              { id: 'resolved', label: 'Resolved', icon: 'task_alt', count: 124 },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id as TriageCategory)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-white hover:bg-[#f2f3ff] text-[#3f4850] border border-[#dae2fd]'
                }`}
              >
                <Icon name={tab.icon} className="text-[15px]" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[#eaedff] text-[#707881]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Responsive Layout: Tickets & Dispatch Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Tickets List */}
          <div className="lg:col-span-6 space-y-4">
            {filteredTickets.map((ticket) => (
              <article
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`bg-white rounded-3xl overflow-hidden border transition-all cursor-pointer shadow-sm ${
                  selectedTicket.id === ticket.id
                    ? 'border-[#006194] ring-2 ring-[#006194]/20 shadow-md'
                    : 'border-[#dae2fd]/80 hover:border-[#006194]'
                }`}
              >
                {/* Status Bar */}
                <div
                  className={`flex items-center justify-between px-5 py-2 text-xs font-bold ${
                    ticket.priority === 'high'
                      ? 'bg-[#ffdad6]/50 text-[#93000a]'
                      : 'bg-[#eaedff] text-[#006195]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon
                      name={ticket.priority === 'high' ? 'warning' : 'info'}
                      className="text-[16px]"
                    />
                    <span className="font-mono">{ticket.id}</span>
                  </div>
                  <span className="uppercase text-[10px] tracking-wider font-extrabold">
                    {ticket.priority === 'high' ? 'Critical Triage' : 'Routine'}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                        {ticket.clinicName}
                      </h3>
                      <p className="text-xs text-[#707881] flex items-center gap-1 mt-0.5">
                        <Icon name="location_on" className="text-[13px]" />
                        <span>{ticket.location}</span>
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-[#707881] bg-[#f2f3ff] px-2 py-0.5 rounded">
                      {ticket.timeAgo}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-1.5 rounded-xl text-xs">
                    <div className="w-5 h-5 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-[9px]">
                      {ticket.repName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <span className="font-bold text-[#131b2e]">{ticket.repName}</span>
                    <span className="text-[#707881]">• {ticket.repRole}</span>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">
                      {ticket.subject}
                    </h4>
                    <p className="text-xs text-[#3f4850] mt-1 leading-relaxed line-clamp-2">
                      {ticket.body}
                    </p>
                  </div>

                  {ticket.attachmentName && (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#f2f3ff] text-xs border border-[#dae2fd]/60">
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon name="picture_as_pdf" className="text-[#ba1a1a] text-[18px] shrink-0" />
                        <span className="font-mono text-[11px] truncate">{ticket.attachmentName}</span>
                      </div>
                      <span className="text-[10px] text-[#707881] shrink-0">{ticket.attachmentSize}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between text-xs">
                    <span className="text-[#ba1a1a] font-bold flex items-center gap-1 text-[11px]">
                      <Icon name="timer" className="text-[14px]" />
                      <span>{ticket.slaRemaining}</span>
                    </span>
                    <span className="text-[#006194] font-semibold flex items-center gap-1">
                      <span>Respond</span>
                      <Icon name="arrow_forward" className="text-[14px]" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right Column: Concierge Dispatch Workbench */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider block">
                    Concierge Workbench
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#131b2e]">
                    Dispatch Response: {selectedTicket.id}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#006194] bg-[#cce5ff] px-2.5 py-1 rounded-full">
                  Desk #04
                </span>
              </div>

              {/* Response Mode Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#eaedff] rounded-2xl border border-[#dae2fd]">
                <button
                  type="button"
                  onClick={() => setResponseType('public')}
                  className={`h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    responseType === 'public'
                      ? 'bg-white text-[#006194] shadow-sm'
                      : 'text-[#3f4850] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon name="send" className="text-[14px]" />
                  <span>Public Clinic Reply</span>
                </button>
                <button
                  type="button"
                  onClick={() => setResponseType('internal')}
                  className={`h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    responseType === 'internal'
                      ? 'bg-white text-[#93000a] shadow-sm'
                      : 'text-[#3f4850] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon name="lock" className="text-[14px]" />
                  <span>Internal Note</span>
                </button>
              </div>

              {/* Quick Macros */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider block">
                  Quick Regulatory Macros
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleMacroSelect(
                        'Radiation Safety Desk has acknowledged the Lead Shield Consults scatter survey. A desk clearance note has been appended to Schedule 7.'
                      )
                    }
                    className="px-3 py-1 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] text-xs font-semibold border border-[#dae2fd] transition-colors"
                  >
                    ⚡ Radiation Clearance Acknowledged
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleMacroSelect(
                        'Please upload a certified board resolution sealed by CAC notary public before determination can be gazetted.'
                      )
                    }
                    className="px-3 py-1 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006195] text-xs font-semibold border border-[#dae2fd] transition-colors"
                  >
                    📋 Request Notarized Board Deed
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleMacroSelect(
                        'Physical inspection date of 24 Oct 2026 confirmed. Inspector Adeleke assigned.'
                      )
                    }
                    className="px-3 py-1 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006a61] text-xs font-semibold border border-[#dae2fd] transition-colors"
                  >
                    🗓 Inspection Date Confirmed
                  </button>
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-1.5">
                <textarea
                  rows={6}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={
                    responseType === 'public'
                      ? 'Type official regulatory response to clinic administration...'
                      : 'Add confidential internal review note visible only to DHA inspectors...'
                  }
                  className="w-full p-3.5 rounded-2xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] placeholder:text-[#707881] border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194] focus:bg-white transition-all"
                />
              </div>

              {/* Attachment Drag & Drop Area */}
              <div
                onClick={() => triggerToast('Regulatory attachment uploaded: Section15_Dispatch_Notice.pdf')}
                className="p-3.5 rounded-2xl border-2 border-dashed border-[#dae2fd] bg-[#f2f3ff]/50 hover:bg-[#f2f3ff] text-center cursor-pointer transition-colors"
              >
                <Icon name="upload_file" className="text-[#006194] text-[22px] mx-auto mb-1" />
                <p className="text-xs font-bold text-[#131b2e]">
                  Attach Regulatory Schedule or Formal Notice
                </p>
                <p className="text-[10px] text-[#707881]">PDF, DOCX, or PNG up to 10 MB</p>
              </div>

              {/* Dispatch Action */}
              <button
                type="button"
                onClick={handleDispatch}
                className="w-full h-12 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <Icon name="send" className="text-[18px]" />
                <span>
                  {responseType === 'public'
                    ? 'Dispatch Statutory Response to Clinic'
                    : 'Save Encrypted Internal Note'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* RegOps Bottom Navigation Dock */}
      <footer className="fixed bottom-0 w-full z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-t border-[#dae2fd] shadow-lg">
        <div className="max-w-md sm:max-w-xl mx-auto h-16 px-4 flex items-center justify-around text-xs">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/organisation-management')}
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="domain" className="text-[20px]" />
            <span className="text-[10px]">Orgs</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/review-workspace')}
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="fact_check" className="text-[20px]" />
            <span className="text-[10px]">Applications</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/verification-history')}
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="history_edu" className="text-[20px]" />
            <span className="text-[10px]">Verification</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/support-management')}
            className="flex flex-col items-center gap-1 text-[#006194] font-bold"
          >
            <Icon name="support_agent" className="text-[20px]" />
            <span className="text-[10px]">Support</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/change-requests')}
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="edit_document" className="text-[20px]" />
            <span className="text-[10px]">Changes</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
export default DHAOnboardingSupportManagementScreen;
