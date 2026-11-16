import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

type FilterScope = 'all' | 'approved' | 'pending' | 'changes' | 'amended';

export function SummaryHistoryVersionScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterScope>('all');
  const [summaryScope, setSummaryScope] = useState('All Types (142)');
  const [isDiffViewerOpen, setIsDiffViewerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const archiveRecords = [
    {
      id: 'rec-1',
      initials: 'CO',
      name: 'Chinedu Okafor',
      ageGender: '34y • Male',
      dhaId: 'DHA-10482 • Bitewing & PA #16',
      status: 'changes',
      statusLabel: 'Changes Required',
      statusBadge: 'bg-[#ffdad6] text-[#ba1a1a]',
      title: 'Investigation Synthesis (Bitewing & PA #16)',
      subtitle: 'Generated Today 09:45 WAT • Assigned: Dr. Daniel James',
      flag: 'Confirm vitality pulp cold latency before approving composite.',
      versionInfo: 'Status: v0.9 Draft Held',
      ctaText: 'Resume Review',
      actionTo: '/summaries/investigations',
    },
    {
      id: 'rec-2',
      initials: 'RA',
      name: 'Rashid Eze',
      ageGender: '52y • Male',
      dhaId: 'DHA-00892 • Endodontics',
      status: 'approved',
      statusLabel: 'Approved',
      statusBadge: 'bg-[#86f2e4] text-[#006a61]',
      title: 'Post-Endo Final Clinical Synthesis',
      subtitle: 'Version: v1.2 (Amended: Added crown margin check) • 08 Oct 2026',
      reviewer: 'Reviewer: Dr. Daniel James',
      versionInfo: 'Sealed Record',
      ctaText: 'View History',
      actionTo: '/summaries/workspace',
    },
    {
      id: 'rec-3',
      initials: 'FA',
      name: 'Fatima Bello',
      ageGender: '28y • Female',
      dhaId: 'DHA-08921 • Implantology / Perio',
      status: 'approved',
      statusLabel: 'Approved',
      statusBadge: 'bg-[#86f2e4] text-[#006a61]',
      title: 'Comprehensive Pre-Implant CBCT & Perio Digest',
      subtitle: 'Version: v1.0 • Approved 02 Oct 2026',
      reviewer: 'Reviewer: Dr. K. Okoye',
      versionInfo: 'No pending revisions',
      ctaText: 'Open',
      actionTo: '/summaries/workspace',
    },
  ];

  const filteredRecords = archiveRecords.filter((rec) => {
    const matchesQuery =
      rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.dhaId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.title.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'approved') return rec.status === 'approved';
    if (activeFilter === 'changes') return rec.status === 'changes';
    return true;
  });

  return (
    <SummaryShell
      pageTitle="Summary History & Version Control"
      badgeCode="12.17"
      badgeLabel="Clinical WORM Archive"
      currentStep="History & Versions"
    >
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-white/10 animate-fade-in">
            <Icon name="check_circle" className="text-emerald-400 text-[18px]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Notice Banner: Governance & WORM Ledger */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006194] flex items-center justify-center shrink-0">
            <Icon name="gavel" className="text-[20px]" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-[#131b2e]">Federal Health Law Notice</h4>
            <p className="text-xs text-[#707881] mt-0.5 leading-relaxed">
              Approved summaries are immutable WORM records. Any clinical alteration creates a chained revision retaining the original doctor sign-off.
            </p>
          </div>
        </section>

        {/* Screen Context Framing */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e]">
            Clinical Summary Archive &amp; Versions
          </h2>
          <p className="text-xs sm:text-sm text-[#707881] mt-0.5">
            Searchable repository of AI-synthesized dossiers, dentist amendments, and sealed records.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <section className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Icon
                name="search"
                className="text-[#707881] absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px]"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient, Lifecode, ICD-10, or dossier ID..."
                className="w-full bg-[#faf8ff] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-[#eaedff] text-[#131b2e] focus:outline-none focus:border-[#006194] focus:bg-white"
              />
            </div>

            {/* Scope Dropdown */}
            <div className="relative inline-flex items-center sm:w-60">
              <select
                value={summaryScope}
                onChange={(e) => setSummaryScope(e.target.value)}
                className="w-full appearance-none bg-[#faf8ff] text-xs font-semibold text-[#006194] py-2.5 pl-3.5 pr-8 rounded-xl border border-[#eaedff] focus:outline-none focus:border-[#006194] cursor-pointer"
              >
                <option>All Types (142)</option>
                <option>Comprehensive Dossier</option>
                <option>Odontogram &amp; Restorative</option>
                <option>Investigation Synthesis</option>
                <option>Treatment Plan</option>
                <option>Patient Guide</option>
              </select>
              <Icon
                name="expand_more"
                className="text-[#006194] text-[20px] absolute right-2.5 pointer-events-none"
              />
            </div>
          </div>

          {/* Filter Chips Scroll Area */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'all'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#faf8ff] text-[#707881] hover:text-[#131b2e] border border-[#eaedff]'
              }`}
            >
              <span>All Summaries</span>
              <span className="bg-white/20 px-1.5 py-0.2 rounded-full text-[10px]">142</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('approved')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'approved'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#faf8ff] text-[#707881] hover:text-[#131b2e] border border-[#eaedff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#006a61]" />
              <span>Approved</span>
              <span className="text-[10px]">(126)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('pending')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'pending'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#faf8ff] text-[#707881] hover:text-[#131b2e] border border-[#eaedff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#007bb9]" />
              <span>Pending Review</span>
              <span className="text-[10px]">(8)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('changes')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'changes'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#faf8ff] text-[#707881] hover:text-[#131b2e] border border-[#eaedff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
              <span>Changes Required</span>
              <span className="text-[10px]">(3)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('amended')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'amended'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#faf8ff] text-[#707881] hover:text-[#131b2e] border border-[#eaedff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#707881]" />
              <span>Amended / Superseded</span>
              <span className="text-[10px]">(5)</span>
            </button>
          </div>
        </section>

        {/* Highlight Section Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Icon name="star" className="text-[#006a61] text-[20px]" />
            <h3 className="font-bold text-base sm:text-lg text-[#131b2e]">Active Patient Dossier</h3>
          </div>
          <span className="font-mono text-xs text-[#006194] bg-[#eaedff] px-2.5 py-0.5 rounded-md font-bold">
            DHA-CS-9842
          </span>
        </div>

        {/* Primary Featured Dossier Card (Amara Okafor) */}
        <section className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#006194] font-bold text-base shadow-xs shrink-0">
                  AO
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-base text-[#131b2e] truncate">Amara Okafor</h4>
                    <span className="text-xs text-[#707881] bg-[#faf8ff] px-2 py-0.5 rounded-md border border-[#eaedff]">
                      29y • Female
                    </span>
                  </div>
                  <span className="text-xs text-[#707881] block mt-0.5 truncate">
                    Lifecode: NG-990-281-LAG • Restorative Caries Dossier
                  </span>
                </div>
              </div>
              <span className="bg-[#86f2e4] text-[#006a61] px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 shrink-0">
                <Icon name="verified" className="text-[16px]" />
                Approved
              </span>
            </div>

            {/* Quick Spec Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="bg-[#faf8ff] text-[#006194] font-mono px-2.5 py-1 rounded-lg border border-[#eaedff] flex items-center gap-1 font-semibold">
                <Icon name="local_hospital" className="text-[14px]" />
                ICD-10 K02.62
              </span>
              <span className="bg-[#faf8ff] text-[#131b2e] font-mono px-2.5 py-1 rounded-lg border border-[#eaedff] flex items-center gap-1">
                <Icon name="dentistry" className="text-[14px]" />
                Tooth #16 Maxillary
              </span>
              <span className="bg-[#faf8ff] text-[#006a61] font-mono px-2.5 py-1 rounded-lg border border-[#eaedff] flex items-center gap-1 font-semibold">
                <Icon name="straighten" className="text-[14px]" />
                2.1mm Buffer Intact
              </span>
            </div>
          </div>

          {/* Version Control Ledger Accordion */}
          <div className="bg-[#faf8ff] p-5 border-t border-[#eaedff] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="account_tree" className="text-[#006194] text-[20px]" />
                <h4 className="font-bold text-sm text-[#131b2e]">Immutable Version Lineage</h4>
              </div>
              <span className="text-xs font-mono text-[#006194] bg-[#eaedff] px-2.5 py-0.5 rounded-md font-semibold">
                2 Revisions Chain
              </span>
            </div>

            {/* Version 1.0 (Current Active & Sealed) */}
            <div className="bg-white rounded-xl p-4 border border-[#eaedff] shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#006a61] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    1.0
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#131b2e] block">
                      v1.0 Approved &amp; Sealed Record
                    </span>
                    <span className="text-xs text-[#707881]">
                      12 Oct 2026, 11:28 WAT • Signer: Dr. Daniel James
                    </span>
                  </div>
                </div>
                <span className="bg-[#86f2e4] text-[#006a61] px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                  Active
                </span>
              </div>

              <p className="text-xs text-[#42474e] pl-9 leading-relaxed">
                Synthesized restorative plan approved after pulp vitality testing confirmed positive response. Added 2.1mm dentin buffer verification and bite articulating check.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pl-9">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/summaries/workspace')}
                    className="px-3 py-1.5 rounded-lg bg-[#006194] hover:bg-[#004e78] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Icon name="visibility" className="text-[16px]" />
                    Open Summary
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDiffViewerOpen(!isDiffViewerOpen)}
                    className="px-3 py-1.5 rounded-lg bg-[#eaedff] text-[#006194] hover:bg-[#006194] hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Icon name="difference" className="text-[16px]" />
                    Compare Versions
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Opening amendment workspace for v1.1')}
                  className="px-2.5 py-1.5 rounded-lg bg-[#faf8ff] hover:bg-[#eaedff] text-[#707881] hover:text-[#131b2e] text-xs font-medium border border-[#eaedff] flex items-center gap-1 transition-colors"
                >
                  <Icon name="edit_note" className="text-[16px]" />
                  Amend (v1.1)
                </button>
              </div>
            </div>

            {/* Version 0.9 (Pre-Approval AI Draft) */}
            <div className="bg-white/80 rounded-xl p-4 border border-[#eaedff] space-y-2 opacity-90">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881] text-xs font-bold shrink-0">
                    0.9
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#131b2e] block">
                      v0.9 AI Draft Baseline Synthesis
                    </span>
                    <span className="text-xs text-[#707881]">
                      12 Oct 2026, 10:15 WAT • Autonomous DHA Claude Engine
                    </span>
                  </div>
                </div>
                <span className="bg-[#f2f3ff] text-[#707881] px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                  SUPERSEDED
                </span>
              </div>

              <div className="pl-9 flex items-center justify-between flex-wrap gap-2 pt-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#006194] font-semibold flex items-center gap-1">
                    <Icon name="psychology" className="text-[15px]" />
                    Confidence: 96.8%
                  </span>
                  <span className="text-[#707881]">• Raw Clinical Extraction</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDiffViewerOpen(true)}
                  className="text-[#006194] font-bold hover:underline flex items-center gap-0.5"
                >
                  <span>View Baseline Diff</span>
                  <Icon name="chevron_right" className="text-[16px]" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive "Compare Versions" Visual Drawer / Side-by-Side Diff Section */}
        {isDiffViewerOpen && (
          <section className="bg-white rounded-2xl border border-[#006194]/30 shadow-md p-5 sm:p-6 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#cde5ff] text-[#006194] flex items-center justify-center">
                  <Icon name="compare" className="text-[20px]" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#131b2e]">
                    Version Diff: v0.9 (AI) vs v1.0 (Dr. James)
                  </h4>
                  <span className="text-xs text-[#707881]">
                    Highlighted clinician amendments prior to legal WORM seal
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDiffViewerOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#faf8ff] flex items-center justify-center text-[#707881]"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>

            {/* Visual Metric Comparison Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff]">
              <div className="bg-white rounded-lg p-3 border border-[#eaedff]">
                <div className="flex items-center justify-between text-xs text-[#707881] mb-1">
                  <span className="uppercase font-bold">Left: v0.9 Raw AI</span>
                  <span className="font-mono">10:15 WAT</span>
                </div>
                <span className="text-sm font-bold text-[#131b2e]">Algorithmic Output</span>
              </div>
              <div className="bg-[#86f2e4]/30 rounded-lg p-3 border border-[#86f2e4]/50">
                <div className="flex items-center justify-between text-xs text-[#006a61] mb-1">
                  <span className="uppercase font-bold">Right: v1.0 Doctor Verified</span>
                  <span className="font-mono">11:28 WAT</span>
                </div>
                <span className="text-sm font-bold text-[#006a61]">
                  Clinical Additions (+24 words)
                </span>
              </div>
            </div>

            {/* Diff Preview Panels */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-1">
                <span className="text-[11px] font-bold uppercase text-[#707881] block">
                  Diagnostic Finding: Cavity Depth &amp; Substrate
                </span>
                <p className="text-[#42474e] leading-relaxed">
                  Radiographic radiolucency observed along distal-occlusal boundary of Tooth #16.{' '}
                  <span className="bg-[#86f2e4] text-[#006a61] px-1.5 py-0.5 rounded font-semibold inline-flex items-center gap-0.5">
                    <Icon name="add" className="text-[13px]" />
                    Clinician confirmed remaining dentin bridge buffer at 2.1mm.
                  </span>{' '}
                  No pulpal horn involvement evident.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-1">
                <span className="text-[11px] font-bold uppercase text-[#707881] block">
                  Actionable Treatment Directive
                </span>
                <p className="text-[#42474e] leading-relaxed">
                  Proceed with conservative class II micro-hybrid composite preparation under rubber dam isolation.{' '}
                  <span className="bg-[#86f2e4] text-[#006a61] px-1.5 py-0.5 rounded font-semibold inline-flex items-center gap-0.5">
                    <Icon name="add" className="text-[13px]" />
                    Check static and dynamic occlusal contacts post-cure using 40µm articulating tape.
                  </span>
                </p>
              </div>
            </div>

            {/* Diff Footer Meta */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#eaedff] text-xs">
              <span className="font-mono text-[#707881]">SHA-256 Seal: 8f9b2d...c340e1</span>
              <button
                type="button"
                onClick={() => showToast('Exporting legal audit trail PDF...')}
                className="text-[#006194] font-bold hover:underline flex items-center gap-1"
              >
                <Icon name="file_download" className="text-[16px]" />
                Export Full Legal Audit Trail
              </button>
            </div>
          </section>
        )}

        {/* Summary Registry Stream Header */}
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-base sm:text-lg text-[#131b2e]">Archive Registry</h3>
          <span className="text-xs text-[#707881]">Sorted by recent activity</span>
        </div>

        {/* Archive Records List */}
        <div className="space-y-3">
          {filteredRecords.map((record) => (
            <article
              key={record.id}
              className="bg-white rounded-2xl border border-[#eaedff] shadow-sm p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194] font-bold text-sm shrink-0">
                    {record.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm sm:text-base text-[#131b2e] truncate">
                        {record.name}
                      </h4>
                      <span className="text-xs text-[#707881]">{record.ageGender}</span>
                    </div>
                    <span className="font-mono text-xs text-[#707881] truncate block mt-0.5">
                      {record.dhaId}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 shrink-0 ${record.statusBadge}`}
                >
                  <Icon
                    name={record.status === 'changes' ? 'error' : 'check_circle'}
                    className="text-[14px]"
                  />
                  {record.statusLabel}
                </span>
              </div>

              <div>
                <h5 className="font-bold text-sm text-[#131b2e]">{record.title}</h5>
                <p className="text-xs text-[#707881] mt-0.5">{record.subtitle}</p>
                {record.reviewer && (
                  <span className="text-xs text-[#707881] block mt-0.5">{record.reviewer}</span>
                )}
              </div>

              {record.flag && (
                <div className="bg-[#ffdad6]/40 rounded-xl p-3 flex items-start gap-2.5 border border-[#ffdad6]">
                  <Icon name="feedback" className="text-[#ba1a1a] text-[18px] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-[#ba1a1a] uppercase block">Clinician Flag</span>
                    <span className="text-[#410002] italic mt-0.5 block">&quot;{record.flag}&quot;</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-[#eaedff] text-xs">
                <span className="font-mono text-[#707881] flex items-center gap-1">
                  {record.status === 'approved' && <Icon name="lock" className="text-[14px]" />}
                  {record.versionInfo}
                </span>

                <button
                  type="button"
                  onClick={() => navigate(record.actionTo)}
                  className="px-3 py-1.5 rounded-lg bg-[#006194] hover:bg-[#004e78] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Icon
                    name={record.status === 'changes' ? 'rate_review' : 'folder_open'}
                    className="text-[16px]"
                  />
                  {record.ctaText}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/summaries/approval-confirmation')}
            className="px-4 py-2.5 rounded-xl border border-[#c2d1e0] text-[#131b2e] font-bold text-xs hover:bg-[#faf8ff] flex items-center gap-1.5 transition-colors"
          >
            <Icon name="arrow_back" className="text-[16px]" />
            <span>Approval Confirmation (12.16)</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/summaries/audit')}
            className="px-5 py-2.5 rounded-xl bg-[#006194] text-white font-bold text-xs hover:bg-[#004e78] flex items-center gap-1.5 shadow-md shadow-[#006194]/20 transition-all hover:scale-[1.02]"
          >
            <span>Activity &amp; Audit Trail (12.18)</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </button>
        </div>
      </div>
    </SummaryShell>
  );
}
