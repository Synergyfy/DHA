import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface Announcement {
  id: string;
  category: 'rota' | 'governance' | 'facility' | 'general';
  categoryLabel: string;
  priorityLabel?: string;
  isHighPriority?: boolean;
  date: string;
  title: string;
  authorName: string;
  authorRole: string;
  authorInitials: string;
  scopeLabel: string;
  scopeIcon: string;
  excerpt: string;
  signedCount?: number;
  totalSigners?: number;
  isFullySigned?: boolean;
  downloadLabel?: string;
  branchTag: 'wuse2' | 'hq' | 'clinical' | 'all';
  isUnread?: boolean;
}

export const InternalAnnouncementsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'hq' | 'wuse2' | 'clinical'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const announcements: Announcement[] = [
    {
      id: 'ann-1',
      category: 'rota',
      categoryLabel: 'Rota Handover',
      priorityLabel: 'High Priority',
      isHighPriority: true,
      date: 'Today, 08:30',
      title: 'Midday Specialist Rotation Handover: Dr. Sarah Bello to Maitama',
      authorName: 'David Musa',
      authorRole: 'Clinic Manager',
      authorInitials: 'DM',
      scopeLabel: 'Scope: All Wuse 2 & Maitama Staff • Operatory 02',
      scopeIcon: 'domain',
      excerpt: 'Please note that Dr. Bello will conclude morning aligner appointments at Wuse 2 at 14:00 and transition to Maitama Outpost for 3 surgical root canal cases. Nurse Fatima Noor is designated triage standby.',
      signedCount: 18,
      totalSigners: 24,
      branchTag: 'wuse2',
      isUnread: true,
    },
    {
      id: 'ann-2',
      category: 'governance',
      categoryLabel: 'Bio-Safety Standard',
      priorityLabel: 'Governance Directive',
      isHighPriority: false,
      date: '20 Oct 2026',
      title: 'Updated Infection Prevention & Autoclave Protocol (ISO 13485)',
      authorName: 'Dr. Daniel Okoro',
      authorRole: 'Medical Director',
      authorInitials: 'DO',
      scopeLabel: 'Audience: All Clinical Personnel & Chairside Nurses',
      scopeIcon: 'medical_services',
      excerpt: 'All Class B sterilizer runs must include dual chemical indicators placed in the geometric center of each handpiece pouch. Weekly biological spore assays remain mandatory every Monday before early clinical admission.',
      isFullySigned: true,
      downloadLabel: 'Download Clinical Standard PDF (2.4 MB)',
      branchTag: 'clinical',
      isUnread: true,
    },
    {
      id: 'ann-3',
      category: 'facility',
      categoryLabel: 'Facility Maintenance',
      date: '19 Oct 2026',
      title: 'NNRA Radiographic Physicist Calibration Audit - 24 Oct',
      authorName: 'David Musa',
      authorRole: 'Clinic Manager',
      authorInitials: 'DM',
      scopeLabel: 'Audience: Radiology & Operatory 03 Team',
      scopeIcon: 'radiology',
      excerpt: 'Lead Shield MedTech certified medical physicists will be conducting annual scatter leakage surveys on our Planmeca ProMax 3D CBCT on Saturday at 10:00 AM. Operatory 03 will be blocked from patient scheduling.',
      signedCount: 22,
      totalSigners: 22,
      branchTag: 'wuse2',
      isUnread: false,
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredAnnouncements = announcements.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return item.isUnread;
    if (activeFilter === 'hq') return item.branchTag === 'hq' || item.branchTag === 'all';
    if (activeFilter === 'wuse2') return item.branchTag === 'wuse2';
    if (activeFilter === 'clinical') return item.branchTag === 'clinical' || item.category === 'governance';
    return true;
  });

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] text-[#faf8ff] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-[#86f2e4] text-lg" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <Icon name="close" className="text-sm" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/40 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full text-[#131b2e] hover:bg-[#e2e7ff] active:bg-[#dae2fd] transition-colors"
              aria-label="Back"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0">
                <Icon name="campaign" className="text-[22px]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Internal Communications</span>
                </div>
                <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                  Internal Announcements
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/clinic-operations/create-announcement')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006194] text-xs font-bold text-white hover:bg-[#007bb9] shadow-sm transition-all active:scale-95"
            >
              <Icon name="add" className="text-[18px]" />
              <span>Create Announcement</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex-1 w-full space-y-6">
        {/* Group Scope & Top Action Bar */}
        <div className="bg-[#f2f3ff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
              <span className="text-xs font-bold text-[#006a61] uppercase tracking-wider">
                BrightSmile Dental Group
              </span>
              <span className="bg-[#e2e7ff] text-[#3f4850] text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
                Staff Internal Only
              </span>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl md:text-2xl font-extrabold text-[#131b2e]">
              Staff Bulletin Board
            </h2>
            <p className="text-xs text-[#3f4850] mt-0.5 font-medium">
              Clinical rotas, protocol mandates & facility notices across Abuja network
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/clinic-operations/notifications-centre')}
              className="bg-[#ffffff] hover:bg-[#eaedff] text-[#006194] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-[#dae2fd]/50 shadow-sm transition-colors"
            >
              <Icon name="notifications" className="text-[16px]" />
              <span>Central Alerts Feed</span>
            </button>
          </div>
        </div>

        {/* Filter Pills / Horizontal Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
              activeFilter === 'all'
                ? 'bg-[#006194] text-white'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#e2e7ff]'
            }`}
          >
            All (14)
          </button>
          <button
            onClick={() => setActiveFilter('unread')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === 'unread'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#e2e7ff]'
            }`}
          >
            <span>Unread</span>
            <span className="w-4 h-4 rounded-full bg-[#ba1a1a] text-white font-mono text-[10px] flex items-center justify-center">
              3
            </span>
          </button>
          <button
            onClick={() => setActiveFilter('hq')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === 'hq'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#e2e7ff]'
            }`}
          >
            HQ & Group
          </button>
          <button
            onClick={() => setActiveFilter('wuse2')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === 'wuse2'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#e2e7ff]'
            }`}
          >
            Wuse 2 Branch
          </button>
          <button
            onClick={() => setActiveFilter('clinical')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === 'clinical'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#e2e7ff]'
            }`}
          >
            Clinical Staff Only
          </button>
        </div>

        {/* Announcement Stream Cards (scales to 2-col or single list) */}
        <div className="space-y-4">
          {filteredAnnouncements.map(ann => (
            <article
              key={ann.id}
              className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-4 hover:shadow-md transition-all"
            >
              {/* Badges & Timestamp */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  {ann.isHighPriority && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-extrabold uppercase">
                      <Icon name="push_pin" className="text-[14px]" />
                      <span>High Priority</span>
                    </span>
                  )}
                  {ann.category === 'governance' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#00201d] text-xs font-bold uppercase">
                      <Icon name="verified" className="text-[14px]" />
                      <span>Governance Directive</span>
                    </span>
                  )}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850] text-xs font-semibold">
                    {ann.categoryLabel}
                  </span>
                </div>
                <span className="text-xs text-[#707881] font-medium">{ann.date}</span>
              </div>

              {/* Title & Author */}
              <div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                  {ann.title}
                </h3>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-[#3f4850]">
                  <div className="w-6 h-6 rounded-full bg-[#cce5ff] text-[#006194] font-bold text-[10px] flex items-center justify-center">
                    {ann.authorInitials}
                  </div>
                  <span className="font-semibold text-[#131b2e]">{ann.authorName}</span>
                  <span className="text-[#707881]">({ann.authorRole})</span>
                </div>
              </div>

              {/* Scope Box */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#f2f3ff] text-xs font-semibold text-[#3f4850] border border-[#dae2fd]/30">
                <Icon name={ann.scopeIcon} className="text-[#006194] text-[18px]" />
                <span>{ann.scopeLabel}</span>
              </div>

              {/* Excerpt Body */}
              <p className="text-xs md:text-sm text-[#3f4850] leading-relaxed">
                {ann.excerpt}
              </p>

              {/* Acknowledgement Status or Progress */}
              {ann.signedCount !== undefined && ann.totalSigners !== undefined && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#707881] font-medium">Acknowledgement Progress</span>
                    <span className="text-[#006194] font-bold">
                      {ann.signedCount} of {ann.totalSigners} signed
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                    <div
                      className="h-full bg-[#006194] rounded-full transition-all"
                      style={{ width: `${(ann.signedCount / ann.totalSigners) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {ann.isFullySigned && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#86f2e4]/30 border border-[#86f2e4]/50 text-xs">
                  <div className="flex items-center gap-2 text-[#006a61] font-bold">
                    <Icon name="check_circle" className="text-[18px]" />
                    <span>100% Fully Signed by Clinical Team</span>
                  </div>
                  <span className="bg-[#ffffff] px-2.5 py-0.5 rounded-full text-[#006a61] font-extrabold shadow-sm">
                    Compliant
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                {ann.downloadLabel ? (
                  <button
                    onClick={() => showToast('Downloading Clinical Standard PDF...')}
                    className="flex-1 h-11 rounded-xl bg-[#eaedff] text-[#006194] hover:bg-[#e2e7ff] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Icon name="description" className="text-[18px]" />
                    <span>{ann.downloadLabel}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedAnnouncement(ann);
                      showToast(`Viewing acknowledgement roster for: ${ann.title}`);
                    }}
                    className="flex-1 h-11 rounded-xl bg-[#cce5ff] text-[#001d31] hover:bg-[#93ccff] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Icon name="mark_email_read" className="text-[18px] text-[#006194]" />
                    <span>View Memo & Acknowledgements</span>
                  </button>
                )}

                <button
                  onClick={() => showToast(`Pinned notice details opened for ${ann.title}`)}
                  className="h-11 px-4 rounded-xl border border-[#dae2fd] text-xs font-bold text-[#3f4850] hover:bg-[#f2f3ff] transition-colors flex items-center justify-center gap-1"
                >
                  <span>Details</span>
                  <Icon name="chevron_right" className="text-[16px]" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Interactive Broadcast Callout */}
        <section className="bg-gradient-to-r from-[#cce5ff] via-[#e2e7ff] to-[#faf8ff] border border-[#dae2fd] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0 shadow-md">
              <Icon name="campaign" className="text-[24px]" />
            </div>
            <div>
              <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                Need to broadcast an urgent message?
              </h4>
              <p className="text-xs text-[#3f4850] mt-1 max-w-xl leading-relaxed">
                Create a priority announcement to instantly alert active on-duty staff, chairside assistants, and duty managers across all facility terminals.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/clinic-operations/create-announcement')}
            className="w-full md:w-auto h-11 px-6 bg-[#006194] hover:bg-[#007bb9] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all shrink-0 active:scale-95"
          >
            <Icon name="edit_note" className="text-[20px]" />
            <span>Draft Announcement</span>
          </button>
        </section>

        {/* Modal for viewing announcement acknowledgements */}
        {selectedAnnouncement && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-[#ffffff] rounded-2xl p-6 max-w-lg w-full border border-[#dae2fd] shadow-2xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-full">
                    Acknowledgement Audit
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e] mt-2">
                    {selectedAnnouncement.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#707881] hover:bg-[#eaedff]"
                >
                  <Icon name="close" className="text-[18px]" />
                </button>
              </div>

              <div className="bg-[#f2f3ff] p-3 rounded-xl text-xs space-y-1">
                <div className="flex justify-between text-[#3f4850]">
                  <span>Broadcast by:</span>
                  <span className="font-bold text-[#131b2e]">{selectedAnnouncement.authorName}</span>
                </div>
                <div className="flex justify-between text-[#3f4850]">
                  <span>Signatures Registered:</span>
                  <span className="font-bold text-[#006a61]">18 of 24 team members</span>
                </div>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#ffffff] border border-[#dae2fd]/40">
                  <span className="font-medium text-[#131b2e]">Dr. Sarah Bello (Endodontist)</span>
                  <span className="text-[#006a61] font-bold">Acknowledged 08:34</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#ffffff] border border-[#dae2fd]/40">
                  <span className="font-medium text-[#131b2e]">Nurse Fatima Noor (Triage Lead)</span>
                  <span className="text-[#006a61] font-bold">Acknowledged 08:36</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#ffffff] border border-[#dae2fd]/40">
                  <span className="font-medium text-[#131b2e]">Grace Eze (Front Desk Reception)</span>
                  <span className="text-[#006a61] font-bold">Acknowledged 08:41</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#ffffff] border border-[#dae2fd]/40">
                  <span className="font-medium text-[#131b2e]">Tariq Danjuma (Dental Therapist)</span>
                  <span className="text-[#ba1a1a] font-medium">Pending Opening</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedAnnouncement(null);
                  showToast('Reminder notification pushed to 6 pending staff members');
                }}
                className="w-full h-11 bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Icon name="send" className="text-[16px]" />
                <span>Nudge Pending Staff (6 remaining)</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
