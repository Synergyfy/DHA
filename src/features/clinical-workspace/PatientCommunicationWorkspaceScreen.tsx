import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

interface ConversationThread {
  id: string;
  patientName: string;
  initials: string;
  ageGender: string;
  lifeCode: string;
  toothNumber: string;
  procedureTag: string;
  postOpTimeline: string;
  latestMessage: string;
  timestamp: string;
  isUnread: boolean;
  priority: 'high' | 'normal';
  category: 'post-op' | 'inquiry' | 'general';
  doctorReplySnippet?: string;
  hasAttachment?: boolean;
  attachmentName?: string;
}

const CONVERSATIONS: ConversationThread[] = [
  {
    id: 'conv-1',
    patientName: 'Amara Okafor',
    initials: 'AO',
    ageGender: '34y F',
    lifeCode: 'NG-990-281-LAG',
    toothNumber: '#16 Direct',
    procedureTag: 'Tooth #16 Biomimetic Restoration',
    postOpTimeline: 'Post-Op Day 1',
    latestMessage:
      '“Good afternoon Dr. Daniel, the numbness has completely worn off now. I feel a slight cold sensitivity when drinking iced water. Should I start the desensitizing gel today?”',
    timestamp: '18m ago',
    isUnread: true,
    priority: 'high',
    category: 'post-op',
  },
  {
    id: 'conv-2',
    patientName: 'Chinedu Okafor',
    initials: 'CO',
    ageGender: '41y M',
    lifeCode: 'NG-990-515-LAG',
    toothNumber: 'Tooth #46',
    procedureTag: 'Endo Prophylaxis Protocol',
    postOpTimeline: 'Pre-Op Preparation',
    latestMessage:
      '“Confirmed with Reception that I will take the prescribed amoxicillin prophylaxis 1 hour before tomorrow’s appointment.”',
    timestamp: 'Today 09:15',
    isUnread: false,
    priority: 'normal',
    category: 'inquiry',
  },
  {
    id: 'conv-3',
    patientName: 'Fatima Bello',
    initials: 'FA',
    ageGender: '28y F',
    lifeCode: 'NG-990-414-LAG',
    toothNumber: 'Quad 2 GBR',
    procedureTag: 'Bone Regeneration Recare',
    postOpTimeline: 'Recare Week 3',
    latestMessage:
      '“Dr. Daniel: Please continue with the Chlorhexidine 0.12% rinse twice daily through Monday. Our nurse will call to confirm your seating time.”',
    timestamp: 'Yesterday',
    isUnread: false,
    priority: 'normal',
    category: 'post-op',
  },
  {
    id: 'conv-4',
    patientName: 'Tariq Latif',
    initials: 'TL',
    ageGender: '52y M',
    lifeCode: 'NG-990-678-LAG',
    toothNumber: 'Crown Prep',
    procedureTag: 'Cardiology Clearance Review',
    postOpTimeline: 'Surgical Clearance',
    latestMessage:
      '“My cardiologist Dr. Farouk signed the clearance letter for my crown lengthening. Uploading to my documents tab now.”',
    timestamp: '2 days ago',
    isUnread: false,
    priority: 'normal',
    category: 'inquiry',
    hasAttachment: true,
    attachmentName: 'Cardio_Clearance_DrFarouk.pdf',
  },
];

export function PatientCommunicationWorkspaceScreen() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<ConversationThread[]>(CONVERSATIONS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'post-op' | 'inquiries'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Thread Reply Drawer
  const [selectedThread, setSelectedThread] = useState<ConversationThread>(CONVERSATIONS[0]);
  const [replyText, setReplyText] = useState(
    'Good afternoon Amara, mild cold sensitivity is completely normal for 48–72h as the biomimetic bond matures. Yes, please apply a pea-sized dab of Fluoride gel before bed.'
  );
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleInsertText = (snippet: string) => {
    if (replyText.trim().length > 0) {
      setReplyText(replyText + ' ' + snippet);
    } else {
      setReplyText(snippet);
    }
  };

  const handleSendAdvice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      // Mark as read in conversations
      setConversations((prev) =>
        prev.map((c) => (c.id === selectedThread.id ? { ...c, isUnread: false } : c))
      );
      setTimeout(() => {
        setSentSuccess(false);
        setReplyText('');
      }, 2500);
    }, 1200);
  };

  const filteredConversations = conversations.filter((c) => {
    if (activeFilter === 'unread' && !c.isUnread) return false;
    if (activeFilter === 'post-op' && c.category !== 'post-op') return false;
    if (activeFilter === 'inquiries' && c.category !== 'inquiry') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.patientName.toLowerCase().includes(q);
      const matchTooth = c.toothNumber.toLowerCase().includes(q);
      const matchCode = c.lifeCode.toLowerCase().includes(q);
      const matchMsg = c.latestMessage.toLowerCase().includes(q);
      return matchName || matchTooth || matchCode || matchMsg;
    }
    return true;
  });

  return (
    <ClinicalWorkspaceShell
      pageTitle="Patient Communication Workspace"
      badgeCode="14.22"
      badgeLabel="SafeLink Clinical Messaging"
      activeNav="dashboard"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Breadcrumb */}
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
            <span className="font-semibold text-[#131b2e]">Patient Communication &amp; Triage</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/dentist/patients')}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#eaedff] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Icon name="groups" className="text-[16px]" />
            <span>Open Patient Dossiers</span>
          </button>
        </div>

        {/* Statutory Teleconsultation & Comms Directive Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#cce5ff]/30 border border-[#93ccff]/50 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#006a61] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Icon name="verified_user" className="text-[20px]" />
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-[#004b74] text-sm">
                DHA Directives &amp; Clinical Safeguard (DHA-REG-14.22)
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-[#006a61]/15 text-[#006a61] text-[10px] font-bold">
                Auth Enforced
              </span>
            </div>
            <p className="text-[#004b74]/90 mt-1 leading-relaxed">
              Direct patient messaging is designated for post-operative clarifications, pre-appointment instructions, and recare triage. Formal clinical diagnoses, prescription modifications, and major treatment plan alterations mandate authenticated encounters under Nigeria Telehealth Standards.
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Icon
                name="search"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#707881]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient by name, tooth #, or LifeCode..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#eaedff] rounded-xl text-sm text-[#131b2e] placeholder-[#707881] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707881] hover:text-[#131b2e]"
                >
                  <Icon name="close" className="text-[18px]" />
                </button>
              )}
            </div>

            <button
              type="button"
              className="px-4 py-2.5 bg-white border border-[#eaedff] rounded-xl text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <Icon name="qr_code_scanner" className="text-[16px]" />
              <span>Scan Patient LifeCode</span>
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All Conversations', count: conversations.length },
              { id: 'unread', label: 'Unread', count: conversations.filter((c) => c.isUnread).length, isUrgent: true },
              { id: 'post-op', label: 'Post-Op Checks', count: conversations.filter((c) => c.category === 'post-op').length },
              { id: 'inquiries', label: 'Pre-Op & Inquiries', count: conversations.filter((c) => c.category === 'inquiry').length },
            ].map((f) => {
              const active = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 border ${
                    active
                      ? 'bg-[#006194] text-white border-[#006194] shadow-sm'
                      : 'bg-white text-[#3f4850] border-[#eaedff] hover:bg-[#f2f3ff]'
                  }`}
                >
                  {f.isUrgent && <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>}
                  <span>{f.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      active
                        ? 'bg-white/20 text-white'
                        : f.isUrgent
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : 'bg-[#eaedff] text-[#131b2e]'
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace Grid: Conversation Threads (Left) & Reply Drawer (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (6 cols on desktop): Conversation List */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                Active Conversations ({filteredConversations.length})
              </span>
              <span className="text-[11px] font-mono text-[#006a61] flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                Live DHA Hub Synchronized
              </span>
            </div>

            {filteredConversations.map((thread) => {
              const isSelected = selectedThread.id === thread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer shadow-xs ${
                    isSelected
                      ? 'border-[#006194] ring-2 ring-[#006194]/20 bg-[#faf8ff]'
                      : 'border-[#eaedff] hover:border-[#006194]/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-2xl bg-[#006194] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                          {thread.initials}
                        </div>
                        {thread.isUnread && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#ba1a1a] ring-2 ring-white"></span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-[#131b2e]">
                            {thread.patientName}
                          </h4>
                          <span className="px-1.5 py-0.2 rounded-md bg-[#86f2e4]/30 text-[#006f66] font-mono text-[10px] font-bold">
                            {thread.toothNumber}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#707881]">
                          {thread.ageGender} • {thread.lifeCode}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-[11px] text-[#006194] font-semibold">
                        {thread.timestamp}
                      </span>
                      {thread.priority === 'high' && (
                        <div className="text-[10px] font-bold text-[#ba1a1a] uppercase mt-0.5">
                          High Priority
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#006194] text-[10px] font-bold border border-[#eaedff]">
                      {thread.procedureTag}
                    </span>
                    <span className="text-[10px] text-[#707881] font-semibold">
                      {thread.postOpTimeline}
                    </span>
                  </div>

                  <div className="mt-2.5 p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-xs text-[#3f4850] leading-relaxed line-clamp-2">
                    {thread.latestMessage}
                  </div>

                  {thread.hasAttachment && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#006194] font-semibold">
                      <Icon name="attach_file" className="text-[14px]" />
                      <span>{thread.attachmentName}</span>
                    </div>
                  )}

                  <div className="mt-3 pt-2.5 border-t border-[#eaedff] flex items-center justify-between text-xs">
                    {thread.isUnread ? (
                      <span className="text-[#ba1a1a] font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                        Direct Clinician Reply Required
                      </span>
                    ) : (
                      <span className="text-[#707881] flex items-center gap-1">
                        <Icon name="done_all" className="text-[14px] text-[#006a61]" />
                        Delivered &amp; Read
                      </span>
                    )}

                    <span className="text-xs font-bold text-[#006194] flex items-center gap-0.5">
                      <span>Open Thread</span>
                      <Icon name="chevron_right" className="text-[14px]" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (6 cols): Quick Reply Drawer */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-[#eaedff] p-5 sm:p-6 shadow-sm space-y-4">
              {/* Drawer Header */}
              <div className="flex items-start justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0">
                    <Icon name="quickreply" className="text-[20px]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#131b2e]">
                        Replying to {selectedThread.patientName}
                      </h3>
                      <span className="px-1.5 py-0.2 rounded bg-[#86f2e4]/30 text-[#006f66] font-mono text-[10px] font-bold">
                        {selectedThread.toothNumber}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#707881]">
                      {selectedThread.procedureTag} • {selectedThread.postOpTimeline}
                    </div>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-[10px] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                  <span>DHA SafeLink</span>
                </span>
              </div>

              {/* Patient's Latest Inquiry Bubble */}
              <div className="p-3.5 bg-[#f2f3ff] rounded-2xl border border-[#eaedff] text-xs text-[#131b2e] leading-relaxed">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#707881] mb-1">
                  Patient Inquiry
                </div>
                <p className="italic">{selectedThread.latestMessage}</p>
              </div>

              {/* Suggested Clinical Smart-Responses */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#707881] uppercase tracking-wider text-[10px]">
                    Clinical Smart-Responses (Tap to Insert)
                  </span>
                  <span className="text-[#006194] font-semibold text-[11px] flex items-center gap-1">
                    <Icon name="auto_awesome" className="text-[12px]" />
                    <span>DHA AI Verified</span>
                  </span>
                </div>

                <div className="space-y-1.5">
                  {[
                    {
                      text: 'Mild cold sensitivity is completely normal for 48–72h as the biomimetic bond matures.',
                      icon: 'add_circle',
                      color: 'text-[#006194]',
                    },
                    {
                      text: 'Yes, please apply a pea-sized dab of Fluoride gel before bed.',
                      icon: 'add_circle',
                      color: 'text-[#006194]',
                    },
                    {
                      text: 'Please visit the clinic immediately if spontaneous throbbing pain occurs.',
                      icon: 'report',
                      color: 'text-[#ba1a1a]',
                    },
                  ].map((smart, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleInsertText(smart.text)}
                      className="w-full text-left p-2.5 rounded-xl bg-[#faf8ff] hover:bg-[#f2f3ff] border border-[#eaedff] text-xs font-medium text-[#131b2e] transition-colors flex items-center gap-2 group"
                    >
                      <Icon
                        name={smart.icon}
                        className={`text-[16px] shrink-0 ${smart.color} group-hover:scale-110 transition-transform`}
                      />
                      <span className="line-clamp-1 leading-snug">{smart.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Input Area */}
              <form onSubmit={handleSendAdvice} className="space-y-3 pt-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-[#131b2e]">
                      Clinical Directive &amp; Advice
                    </label>
                    <span className="font-mono text-[10px] text-[#707881]">
                      {replyText.length} chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type verified clinical advice or select smart response above..."
                    className="w-full p-3 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194] leading-relaxed resize-none"
                  />
                </div>

                {/* Message Tools Toolbar */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      className="p-2 rounded-lg bg-[#f2f3ff] text-[#707881] hover:text-[#006194] transition-colors"
                      title="Attach Radiograph or Clinical Photo"
                    >
                      <Icon name="add_a_photo" className="text-[16px]" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-lg bg-[#f2f3ff] text-[#707881] hover:text-[#006194] transition-colors"
                      title="Attach Patient Rx Document"
                    >
                      <Icon name="clinical_notes" className="text-[16px]" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-lg bg-[#f2f3ff] text-[#707881] hover:text-[#006194] transition-colors"
                      title="Attach Post-Op Care Guide"
                    >
                      <Icon name="description" className="text-[16px]" />
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-[#006a61]">
                    Encrypted • Patient Logged
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full py-3 rounded-xl text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                    sentSuccess
                      ? 'bg-[#006a61]'
                      : 'bg-[#006194] hover:bg-[#004e77] active:scale-[0.99]'
                  }`}
                >
                  <Icon
                    name={isSending ? 'sync' : sentSuccess ? 'check' : 'send'}
                    className={`text-[16px] ${isSending ? 'animate-spin' : ''}`}
                  />
                  <span>
                    {isSending
                      ? 'Transmitting via DHA SafeLink...'
                      : sentSuccess
                      ? 'Transmitted & Authenticated!'
                      : 'Send Clinical Advice'}
                  </span>
                </button>

                <p className="text-[10px] text-center text-[#707881]">
                  Message will be digitally stamped under Dr. Daniel James (DHA-DEN-48912)
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ClinicalWorkspaceShell>
  );
}
