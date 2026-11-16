import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

interface ResourceItem {
  id: string;
  category: 'circulars' | 'guidelines' | 'cme' | 'templates';
  title: string;
  refCode?: string;
  issuer: string;
  date: string;
  isMandatory?: boolean;
  cmeCredits?: number;
  summary: string;
  tags: string[];
  pdfSize?: string;
  isBookmarked?: boolean;
}

const RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    category: 'circulars',
    title: 'Updated SOP for Biomimetic Composite & C-Factor Stress Relief',
    refCode: 'DHA Circular #2026/R-14',
    issuer: 'Nigeria Dental Health Authority • Dental Regulation Sector',
    date: '12 October 2026',
    isMandatory: true,
    summary:
      'New clinical standards mandated for all Class II direct restorations approaching within 2.0mm of pulp ceiling. Incremental oblique layering and rubber dam isolation are mandatory audit criteria for Nigeria Health Information Exchange clinical submission.',
    tags: ['Restorative', 'Nigeria Health Information Exchange Compliance', 'Mandatory'],
    pdfSize: '1.8 MB',
    isBookmarked: true,
  },
  {
    id: 'res-2',
    category: 'guidelines',
    title: 'Minimally Invasive Caries Removal & Selective Excavation Protocol',
    refCode: 'Guideline v3.2',
    issuer: 'DHA Clinical Standards Committee',
    date: '28 September 2026',
    cmeCredits: 15,
    summary:
      'Stepwise indirect pulp therapy threshold: >1.5mm dentin bridge. Outlines selective carious tissue removal protocols to preserve dental pulp vitality in deep dentinal lesions.',
    tags: ['Endodontics', 'Pulp Vitality', '15 CME Credits'],
    pdfSize: '3.4 MB',
    isBookmarked: false,
  },
  {
    id: 'res-3',
    category: 'guidelines',
    title: 'Antibiotic Stewardship in Dental Practice: Penicillin Cross-Reactivity Matrix',
    refCode: 'Safety Alert #2026-08',
    issuer: 'Nigeria Medical Liability Committee',
    date: '15 August 2026',
    isMandatory: true,
    summary:
      'Mandatory allergy cross-matching documentation standards under Nigeria National Health Act 2014. Focuses on safe alternatives for severe beta-lactam and penicillin anaphylaxis cases.',
    tags: ['Pharmacology', 'Allergy Safety', 'Legal Compliance'],
    pdfSize: '2.1 MB',
    isBookmarked: false,
  },
  {
    id: 'res-4',
    category: 'guidelines',
    title: 'Digital Workflow Guide: Intraoral 3D Scanning to CAD/CAM Milling Integration',
    refCode: 'Tech Protocol 2026',
    issuer: 'Digital Dentistry Advisory Board',
    date: '04 July 2026',
    summary:
      'Full validation parameters for Cerec Primemill, 3Shape Trios, and Medit i700 STL/PLY cloud interchange. Details marginal seal thresholds (<40 microns).',
    tags: ['CAD/CAM', '3D Scanning', 'Prosthodontics'],
    pdfSize: '5.2 MB',
    isBookmarked: false,
  },
  {
    id: 'res-5',
    category: 'templates',
    title: 'Adult Comprehensive Examination Form (Sec 10 Sync)',
    refCode: 'Form DHA-DEN-10.4',
    issuer: 'Health Information Exchange',
    date: 'Updated Oct 2026',
    summary:
      'Nigeria Health Information Exchange formatted standard template including Periodontal Screening & Recording (PSR), ICDAS caries index, and soft-tissue cancer screening logs.',
    tags: ['Nigeria Health Information Exchange Standard', 'Clinical Audit'],
    pdfSize: '840 KB',
  },
  {
    id: 'res-6',
    category: 'templates',
    title: 'Biometric Informed Surgical Consent Form (Bilingual)',
    refCode: 'Consent #DHA-CS-02',
    issuer: 'DHA Legal Counsel',
    date: 'Updated Sep 2026',
    summary:
      'Official bilingual (Hausa / English) clinical consent document approved for surgical implantology, sinus augmentation, and surgical extractions.',
    tags: ['Bilingual', 'Legal Approved'],
    pdfSize: '1.1 MB',
  },
];

export function ProfessionalResourcesAnnouncementsScreen() {
  const navigate = useNavigate();
  const [resources, setResources] = useState<ResourceItem[]>(RESOURCES);
  const [activeTab, setActiveTab] = useState<'all' | 'circulars' | 'guidelines' | 'cme' | 'templates'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [webinarRegistered, setWebinarRegistered] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleBookmark = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isBookmarked: !r.isBookmarked } : r))
    );
  };

  const handleRegisterWebinar = () => {
    setWebinarRegistered(!webinarRegistered);
    setToastMessage(
      !webinarRegistered
        ? 'Chairside Webinar Seat Reserved! Calendar invite sent.'
        : 'Webinar registration cancelled.'
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      if (activeTab !== 'all' && item.category !== activeTab) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mTitle = item.title.toLowerCase().includes(q);
        const mSummary = item.summary.toLowerCase().includes(q);
        const mIssuer = item.issuer.toLowerCase().includes(q);
        const mTags = item.tags.some((t) => t.toLowerCase().includes(q));
        return mTitle || mSummary || mIssuer || mTags;
      }
      return true;
    });
  }, [resources, activeTab, searchQuery]);

  return (
    <ClinicalWorkspaceShell
      pageTitle="Professional Resources & Announcements"
      badgeCode="14.23"
      badgeLabel="DHA Knowledge Hub"
      activeNav="dashboard"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast Alert */}
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
            <span className="font-semibold text-[#131b2e]">DHA Regulatory Circulars &amp; Guidelines</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/dentist/verification')}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#eaedff] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Icon name="verified" className="text-[16px]" />
            <span>Check CME Accreditations</span>
          </button>
        </div>

        {/* Search & Category Pills */}
        <div className="space-y-3">
          <div className="relative">
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#707881]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search DHA circulars, clinical guidelines, SOPs, templates..."
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

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: `All Resources (${resources.length})` },
              { id: 'circulars', label: 'Official DHA Circulars (6)' },
              { id: 'guidelines', label: 'Clinical Guidelines (12)' },
              { id: 'cme', label: 'CME Modules (5)' },
              { id: 'templates', label: 'Standard Templates (5)' },
            ].map((cat) => {
              const active = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 border ${
                    active
                      ? 'bg-[#006194] text-white border-[#006194] shadow-sm'
                      : 'bg-white text-[#3f4850] border-[#eaedff] hover:bg-[#f2f3ff]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Highlight: Official DHA Circular Banner */}
        <div className="bg-gradient-to-br from-[#006194] via-[#00507a] to-[#003b5c] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#86f2e4]/20 text-[#86f2e4] text-xs font-mono font-bold border border-[#86f2e4]/30 flex items-center gap-1.5">
                <Icon name="verified_user" className="text-[14px]" />
                <span>DHA Circular #2026/R-14</span>
              </span>

              <span className="px-2.5 py-0.5 rounded-full bg-[#ba1a1a] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                Mandatory Statutory SOP
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold leading-snug">
                Updated SOP for Biomimetic Composite &amp; C-Factor Stress Relief
              </h2>
              <div className="flex items-center gap-3 text-white/80 text-xs mt-1.5 flex-wrap">
                <span className="flex items-center gap-1">
                  <Icon name="calendar_today" className="text-[14px] text-[#86f2e4]" />
                  <span>12 October 2026</span>
                </span>
                <span>•</span>
                <span className="text-[#86f2e4] font-semibold">Valid for All Nigeria Dental Facilities</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-3xl bg-white/10 p-4 rounded-2xl border border-white/15">
              New clinical standards mandated for all Class II direct restorations approaching within{' '}
              <strong className="text-[#86f2e4]">2.0mm of pulp ceiling</strong>. Incremental oblique layering
              and rubber dam isolation are mandatory audit criteria for{' '}
              <strong className="text-white">Nigeria Health Information Exchange clinical submission</strong>.
            </p>

            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setToastMessage('Downloading DHA Circular #2026/R-14 PDF...');
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#86f2e4] text-[#003b5c] text-xs font-bold hover:bg-[#86f2e4]/90 transition-colors flex items-center gap-2 shadow-md"
              >
                <Icon name="picture_as_pdf" className="text-[16px]" />
                <span>Read Directive (PDF • 1.8 MB)</span>
              </button>

              <button
                type="button"
                onClick={() => toggleBookmark('res-1')}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 border border-white/20"
              >
                <Icon name="bookmark" className="text-[16px]" />
                <span>Bookmark Directive</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live DHA Webinar & CME Interactive Card */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#f2f3ff] text-[#006194] flex flex-col items-center justify-center shrink-0 border border-[#eaedff]">
              <span className="text-[9px] uppercase font-bold text-[#707881]">OCT</span>
              <span className="text-xl font-bold text-[#006194] leading-tight">28</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-[11px] font-bold text-[#006a61] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#006a61] animate-ping"></span>
                  Live Clinical Webinar
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#cce5ff]/50 text-[#004b74] font-mono text-[10px] font-bold">
                  2 Category 1 CME Hours
                </span>
              </div>
              <h3 className="text-base font-bold text-[#131b2e]">
                Biomimetic Restoration of the Severely Broken Down Molar
              </h3>
              <p className="text-xs text-[#707881] flex items-center gap-1">
                <Icon name="schedule" className="text-[14px] text-[#006194]" />
                <span>28 Oct 2026 • 19:30 WAT (Chairside Broadcast)</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegisterWebinar}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              webinarRegistered
                ? 'bg-[#86f2e4]/30 text-[#006f66] border border-[#86f2e4]'
                : 'bg-[#006194] text-white hover:bg-[#004e77] shadow-sm'
            }`}
          >
            <Icon
              name={webinarRegistered ? 'check_circle' : 'how_to_reg'}
              className="text-[16px]"
            />
            <span>{webinarRegistered ? 'Seat Reserved' : 'Register Chairside'}</span>
          </button>
        </div>

        {/* Clinical Practice Guidelines & Toolkits Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#707881] flex items-center gap-2">
              <Icon name="menu_book" className="text-[18px] text-[#006194]" />
              <span>Clinical Practice Guidelines &amp; Practice Toolkits</span>
            </h3>
            <span className="text-xs text-[#006194] font-semibold">Nigeria Health Information Exchange Synced</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex flex-col justify-between space-y-3 hover:border-[#006194]/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#f2f3ff] text-[#006194] border border-[#eaedff]">
                          {res.refCode}
                        </span>
                        {res.isMandatory && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a]">
                            Mandatory
                          </span>
                        )}
                        {res.cmeCredits && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#86f2e4]/30 text-[#006f66]">
                            {res.cmeCredits} CME Credits
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-[#131b2e] leading-snug">{res.title}</h4>
                      <p className="text-[11px] text-[#707881] mt-0.5">{res.issuer} • {res.date}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleBookmark(res.id)}
                      className="p-1 text-[#707881] hover:text-[#006194]"
                      title="Bookmark"
                    >
                      <Icon
                        name={res.isBookmarked ? 'bookmark' : 'bookmark_border'}
                        className={`text-[20px] ${res.isBookmarked ? 'text-[#006194]' : ''}`}
                      />
                    </button>
                  </div>

                  <p className="text-xs text-[#3f4850] leading-relaxed line-clamp-3">
                    {res.summary}
                  </p>

                  {/* Odontogram micro-indicator diagram representation for guideline 2 */}
                  {res.id === 'res-2' && (
                    <div className="p-2.5 bg-[#f2f3ff] rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 font-mono font-bold text-[10px]">
                        <span className="px-1.5 py-0.5 rounded bg-white text-[#006a61]">E1 Enamel</span>
                        <span className="px-1.5 py-0.5 rounded bg-white text-[#006a61]">D1 Outer</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#006194] text-white">D2 Deep</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a]">Pulp</span>
                      </div>
                      <span className="text-[10px] text-[#707881] font-semibold">&gt;1.5mm Threshold</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {res.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#faf8ff] text-[#707881] border border-[#eaedff]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#eaedff] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#707881]">{res.pdfSize}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage(`Downloading "${res.title}"...`);
                      setTimeout(() => setToastMessage(null), 3000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#f2f3ff] text-[#006194] text-xs font-semibold hover:bg-[#eaedff] flex items-center gap-1 transition-colors"
                  >
                    <Icon name="download" className="text-[14px]" />
                    <span>Download Resource</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Audit Compliance Portal Card */}
        <div className="p-5 rounded-2xl bg-[#faf8ff] border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#006a61] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Icon name="policy" className="text-[24px]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#131b2e]">
                Clinical Audit Compliance Portal
              </h4>
              <p className="text-xs text-[#707881] mt-0.5">
                Automated electronic upload bridge for Nigeria Dental Health Authority 2026 practice quality assessments.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/dentist/activity-reports')}
            className="px-4 py-2 rounded-xl bg-white border border-[#eaedff] text-xs font-bold text-[#006194] hover:bg-[#f2f3ff] transition-colors self-start sm:self-auto shrink-0 shadow-xs"
          >
            Launch Audit Engine
          </button>
        </div>
      </div>
    </ClinicalWorkspaceShell>
  );
}
