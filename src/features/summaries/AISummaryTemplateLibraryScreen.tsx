import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

type ScopeFilter = 'all' | 'dha' | 'custom';
type CategoryFilter = 'all' | 'restorative' | 'odontogram' | 'imaging' | 'patient' | 'referrals';

interface TemplateCard {
  id: string;
  scope: 'dha' | 'custom';
  category: CategoryFilter;
  title: string;
  badge: string;
  version: string;
  highUtilization?: boolean;
  description: string;
  modulesCount: string;
  specialtyTag: string;
  casesMonth?: string;
  authorNote?: string;
  modulesPipeline?: string[];
  sampleTranslation?: {
    original: string;
    translated: string;
  };
}

const templatesData: TemplateCard[] = [
  {
    id: 'tpl-1',
    scope: 'dha',
    category: 'restorative',
    title: 'DHA Standard Comprehensive Oral-Health Summary',
    badge: 'DHA STANDARD',
    version: 'v2.4 Active',
    highUtilization: true,
    description:
      'Master multi-modal synthesis integrating odontogram, periodontal probe matrix, digital bitewings, systemic medical safeguards, and ICD-10 diagnostics.',
    modulesCount: '8 Clinical Modules',
    specialtyTag: 'General Practice & Prostho',
    casesMonth: '284 cases this month',
    modulesPipeline: [
      'Odontogram & ICDAS',
      'Perio Probe Matrix',
      'Radiographic AI',
      'Patient Explainer',
    ],
  },
  {
    id: 'tpl-2',
    scope: 'dha',
    category: 'odontogram',
    title: 'Tooth-by-Tooth Odontogram Summary',
    badge: 'DHA STANDARD',
    version: 'v1.8 Active',
    description:
      'Granular structural breakdown of arch quadrants, restorative margins, active caries (ICDAS), and missing teeth with FDI/Universal conversion.',
    modulesCount: '4 Clinical Sections',
    specialtyTag: 'Operative Dentistry',
    casesMonth: 'FDI / Universal Sync',
  },
  {
    id: 'tpl-3',
    scope: 'dha',
    category: 'patient',
    title: 'Patient-Friendly Oral-Health Report & Visual Guide',
    badge: 'DHA STANDARD',
    version: 'v3.1 Active',
    description:
      'Automated 6th-grade plain-language translation of complex dental jargon with 3D tooth cross-section diagram presets and home care roadmaps.',
    modulesCount: '5 Patient Sections',
    specialtyTag: 'Patient Portal & Guardian App',
    sampleTranslation: {
      original: 'Instead of "Class II Mesial Caries"...',
      translated: 'Outputs: "Small early cavity between upper molars"',
    },
  },
  {
    id: 'tpl-4',
    scope: 'custom',
    category: 'restorative',
    title: 'Harmony Dental Central — Fast-Track Restorative Brief',
    badge: 'CLINIC CUSTOM',
    version: 'Harmony Wuse 2 • v1.2',
    description:
      'Streamlined 3-section protocol tailored for acute restorative visits with immediate composite preparation directives and local anesthesia logging.',
    modulesCount: '3 Fast Sections',
    specialtyTag: 'Created by Dr. Daniel James',
    authorNote: 'Updated: 04 Oct 2026',
  },
  {
    id: 'tpl-5',
    scope: 'dha',
    category: 'referrals',
    title: 'Specialist Referral Package (Endo / Perio / OMFS)',
    badge: 'DHA STANDARD',
    version: 'v2.0 Active',
    description:
      'Formal Section 20 handover dossier with DICOM bitewing attachment links, vitality testing values, and insurance prior-auth justification.',
    modulesCount: 'DICOM + Vitality Matrix',
    specialtyTag: 'Inter-Clinic Transfer',
  },
];

export function AISummaryTemplateLibraryScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScope, setSelectedScope] = useState<ScopeFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateCard | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const filteredTemplates = templatesData.filter((tpl) => {
    if (selectedScope !== 'all' && tpl.scope !== selectedScope) return false;
    if (selectedCategory !== 'all' && tpl.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !tpl.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <SummaryShell
      pageTitle="AI Summary Template Library"
      badgeCode="12.19"
      badgeLabel="Synthesis Schemas"
      currentStep="Template Library"
    >
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-white/10 animate-fade-in">
            <Icon name="check_circle" className="text-emerald-400 text-[18px]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Screen Context Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e]">AI Summary Templates</h2>
            <p className="text-xs sm:text-sm text-[#707881] mt-0.5">
              Standardized clinical schemas &amp; AI synthesis blueprints.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/summaries/templates/create')}
            className="inline-flex items-center gap-2 bg-[#006194] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:bg-[#004e78] transition-all self-start sm:self-auto"
          >
            <Icon name="add_circle" className="text-[18px]" />
            <span>+ Create Template</span>
          </button>
        </div>

        {/* Governance Lock Notice */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006194] flex items-center justify-center shrink-0">
            <Icon name="verified_user" className="text-[20px]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#006194] uppercase tracking-wider">
                Governance Protocol
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" />
              <span className="text-xs text-[#707881]">DHA Board v4.2</span>
            </div>
            <p className="text-xs text-[#707881] mt-0.5 leading-relaxed">
              DHA Standard baselines are statutory and read-only. Clinic clinicians may duplicate schemas into custom clinic workflows.
            </p>
          </div>
        </section>

        {/* Search & Filter Controls */}
        <section className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-[20px]"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates by name, specialty, ICD-10..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#faf8ff] text-[#131b2e] placeholder:text-[#707881] text-xs sm:text-sm border border-[#eaedff] focus:outline-none focus:border-[#006194] focus:bg-white transition-all"
            />
          </div>

          {/* Scope Filter Segmented Pills */}
          <div className="flex items-center p-1 bg-[#eaedff] rounded-xl gap-1">
            <button
              type="button"
              onClick={() => setSelectedScope('all')}
              className={`flex-1 py-2 rounded-lg text-center text-xs font-bold transition-all ${
                selectedScope === 'all'
                  ? 'bg-white text-[#006194] shadow-xs'
                  : 'text-[#707881] hover:text-[#131b2e]'
              }`}
            >
              All (14)
            </button>
            <button
              type="button"
              onClick={() => setSelectedScope('dha')}
              className={`flex-1 py-2 rounded-lg text-center text-xs font-bold transition-all ${
                selectedScope === 'dha'
                  ? 'bg-white text-[#006194] shadow-xs'
                  : 'text-[#707881] hover:text-[#131b2e]'
              }`}
            >
              DHA Baseline (9)
            </button>
            <button
              type="button"
              onClick={() => setSelectedScope('custom')}
              className={`flex-1 py-2 rounded-lg text-center text-xs font-bold transition-all ${
                selectedScope === 'custom'
                  ? 'bg-white text-[#006194] shadow-xs'
                  : 'text-[#707881] hover:text-[#131b2e]'
              }`}
            >
              Clinic Custom (5)
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 text-xs">
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'restorative', label: 'Restorative & Exam' },
              { id: 'odontogram', label: 'Odontogram' },
              { id: 'imaging', label: 'Imaging & Labs' },
              { id: 'patient', label: 'Patient-Facing' },
              { id: 'referrals', label: 'Referrals' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                className={`shrink-0 px-3 py-1.5 rounded-full font-bold transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#006194] text-white shadow-xs'
                    : 'bg-[#faf8ff] text-[#707881] hover:bg-[#eaedff] border border-[#eaedff]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Template Cards List */}
        <section className="space-y-4">
          {filteredTemplates.map((tpl) => (
            <article
              key={tpl.id}
              className="bg-white rounded-2xl border border-[#eaedff] shadow-sm p-5 sm:p-6 space-y-4 hover:border-[#c2d1e0] transition-all"
            >
              {/* Header Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 text-xs">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        tpl.scope === 'dha'
                          ? 'bg-[#86f2e4] text-[#006a61]'
                          : 'bg-[#eaedff] text-[#006194]'
                      }`}
                    >
                      <Icon name="verified" className="text-[13px]" />
                      {tpl.badge}
                    </span>
                    <span className="text-[#707881]">{tpl.version}</span>
                    {tpl.highUtilization && (
                      <span className="inline-flex items-center gap-1 text-[#006a61] font-semibold">
                        <Icon name="bolt" className="text-[14px]" /> High Utilization
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-[#131b2e] leading-snug">
                    {tpl.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => showToast(`Template bookmarked: ${tpl.title}`)}
                  className="w-9 h-9 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-[#707881] hover:text-[#006194] flex items-center justify-center shrink-0 transition-colors"
                  title="Bookmark Template"
                >
                  <Icon name="bookmark_add" className="text-[18px]" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#42474e] leading-relaxed">{tpl.description}</p>

              {/* Visual Pill Badge Group */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-[#faf8ff] border border-[#eaedff] text-[#131b2e] font-mono font-medium">
                  {tpl.modulesCount}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#faf8ff] border border-[#eaedff] text-[#707881]">
                  {tpl.specialtyTag}
                </span>
                {tpl.casesMonth && (
                  <span className="px-2.5 py-1 rounded-lg bg-[#faf8ff] border border-[#eaedff] text-[#707881] flex items-center gap-1">
                    <Icon name="monitoring" className="text-[14px] text-[#006194]" />
                    {tpl.casesMonth}
                  </span>
                )}
                {tpl.authorNote && (
                  <span className="px-2.5 py-1 rounded-lg bg-[#faf8ff] border border-[#eaedff] text-[#707881]">
                    {tpl.authorNote}
                  </span>
                )}
              </div>

              {/* Modules Pipeline Preview (if present) */}
              {tpl.modulesPipeline && (
                <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-2">
                  <span className="font-mono text-[11px] font-bold text-[#707881] uppercase tracking-wider block">
                    Module Pipeline
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#131b2e]">
                    {tpl.modulesPipeline.map((mod, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-1.5 truncate">
                        <span className="w-2 h-2 rounded-full bg-[#006194] shrink-0" />
                        <span className="truncate">{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sample Translation (if present) */}
              {tpl.sampleTranslation && (
                <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-[#86f2e4] text-[#006a61] flex items-center justify-center shrink-0">
                    <Icon name="translate" className="text-[18px]" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-[#131b2e] block truncate">
                      {tpl.sampleTranslation.original}
                    </span>
                    <span className="text-[#006a61] font-semibold block truncate">
                      {tpl.sampleTranslation.translated}
                    </span>
                  </div>
                </div>
              )}

              {/* Bottom Card Action Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-[#eaedff] gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(tpl)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-[#131b2e] font-bold text-xs hover:bg-[#eaedff] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="visibility" className="text-[16px]" />
                  <span>Preview Schema</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/summaries/generate')}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#006194] text-white font-bold text-xs hover:bg-[#004e78] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Icon name="play_arrow" className="text-[16px]" />
                  <span>Use in Synthesis</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast(`Schema duplicated: ${tpl.title} (Copy)`)}
                  className="w-9 h-9 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-[#707881] hover:text-[#006194] flex items-center justify-center shrink-0 transition-colors"
                  title="Duplicate Schema"
                >
                  <Icon name="content_copy" className="text-[16px]" />
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* Interactive Slide-Up Preview Drawer Modal */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center p-0 sm:p-4">
            <div className="w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-scale-up">
              <div className="w-12 h-1.5 bg-[#eaedff] rounded-full mx-auto sm:hidden" />

              <div className="flex items-start justify-between pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006a61] text-xs font-bold uppercase">
                      Schema Blueprint
                    </span>
                    <span className="text-xs text-[#707881]">JSON Schema v2.4</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#131b2e] mt-1">
                    {previewTemplate.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="w-8 h-8 rounded-full bg-[#faf8ff] flex items-center justify-center text-[#707881] hover:text-[#131b2e]"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-1">
                  <span className="font-bold text-[#006194] uppercase tracking-wider text-xs block">
                    Mandatory Guardrails &amp; Logic
                  </span>
                  <p className="text-[#42474e] leading-relaxed">
                    All AI outputs must cross-validate tooth indices against recorded panoramic radiographic findings and alert clinician when periodontal pockets exceed 5mm without deep scaling billing code.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-[#131b2e] block">Data Ingestion Channels</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-[#131b2e] text-xs flex items-center gap-1.5">
                      <Icon name="grid_4x4" className="text-[14px] text-[#006194]" /> 32-Tooth Odontogram
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-[#131b2e] text-xs flex items-center gap-1.5">
                      <Icon name="image" className="text-[14px] text-[#006194]" /> Bitewing DICOM AI
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-[#131b2e] text-xs flex items-center gap-1.5">
                      <Icon name="history" className="text-[14px] text-[#006194]" /> 2-Year Perio History
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-[#131b2e] text-xs flex items-center gap-1.5">
                      <Icon name="medical_information" className="text-[14px] text-[#ba1a1a]" /> DHA Medical Safeguard
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#131b2e] text-white font-mono text-xs space-y-2 overflow-x-auto">
                  <span className="text-emerald-400">// Synthesis Output Structure</span>
                  <pre className="text-[11px] leading-relaxed">
{`{
  "summary_type": "DHA_COMPREHENSIVE_V2",
  "statutory_compliance": "DHA-DENT-SEC12",
  "quadrant_matrix": true,
  "icd10_coding_auto": true,
  "plain_language_explainer": true
}`}
                  </pre>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    showToast('Schema duplicated into Clinic Custom templates');
                    setPreviewTemplate(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-[#131b2e] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#eaedff] transition-colors"
                >
                  <Icon name="content_copy" className="text-[18px]" />
                  <span>Duplicate Schema</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewTemplate(null);
                    navigate('/summaries/generate');
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#006194] text-white font-bold text-xs shadow-md hover:bg-[#004e78] flex items-center justify-center gap-2 transition-colors"
                >
                  <Icon name="play_arrow" className="text-[18px]" />
                  <span>Load Template</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/summaries/audit')}
            className="px-4 py-2.5 rounded-xl border border-[#c2d1e0] text-[#131b2e] font-bold text-xs hover:bg-[#faf8ff] flex items-center gap-1.5 transition-colors"
          >
            <Icon name="arrow_back" className="text-[16px]" />
            <span>AI Activity &amp; Audit (12.18)</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/summaries/templates/create')}
            className="px-5 py-2.5 rounded-xl bg-[#006194] text-white font-bold text-xs hover:bg-[#004e78] flex items-center gap-1.5 shadow-md shadow-[#006194]/20 transition-all hover:scale-[1.02]"
          >
            <span>Create/Edit Template (12.20)</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </button>
        </div>
      </div>
    </SummaryShell>
  );
}
