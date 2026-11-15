import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

interface TemplateBlueprint {
  id: string;
  type: 'dha' | 'custom';
  typeLabel: string;
  category: 'restorative' | 'perio' | 'prostho' | 'surgical';
  categoryLabel: string;
  badge?: string;
  title: string;
  discipline: string;
  structure: string;
  timeline: string;
  proceduresSummary: string;
  indications: string;
  recare: string;
  author?: string;
  authorRole?: string;
  phase1Ratio?: number;
  phase2Ratio?: number;
  phase1Label?: string;
  phase2Label?: string;
}

export function TreatmentTemplateLibraryScreen() {
  const navigate = useNavigate();

  // State
  const [currentTab, setCurrentTab] = useState<'all' | 'dha' | 'custom'>('all');
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPreview, setSelectedPreview] = useState<TemplateBlueprint | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('Mesio-Occlusal Direct Biomimetic Pathway');
  const [newTemplateSpecialty, setNewTemplateSpecialty] = useState('Operative & Restorative');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const templates: TemplateBlueprint[] = [
    {
      id: 'tpl-1',
      type: 'dha',
      typeLabel: 'DHA STANDARD',
      category: 'restorative',
      categoryLabel: 'Restorative & Recare',
      badge: 'Top Selected',
      title: 'Comprehensive Caries Arrest & Biomimetic Restorative Protocol',
      discipline: 'Operative Dentistry & Prevention',
      structure: '2 Phased Visits',
      timeline: '~75 min (2 Appts)',
      proceduresSummary:
        'Acute Biofilm Removal, Adhesive Bulk-Fill Hybrid Resin, Fluoride Varnish Recare.',
      indications:
        'Cavitated dentin caries (ICDAS 3–4), reversible cold response, high remineralization capacity.',
      recare: '14-day post-op sensitivity audit + 6-month preventive surveillance.',
      phase1Ratio: 60,
      phase2Ratio: 40,
      phase1Label: 'Phase 1: Excavation & Resin',
      phase2Label: 'Phase 2: Remineralization',
    },
    {
      id: 'tpl-2',
      type: 'custom',
      typeLabel: 'CLINIC CUSTOM • HARMONY DENTAL',
      category: 'prostho',
      categoryLabel: 'CAD/CAM & Onlay',
      title: 'Single-Visit High-Strength Ceramic Onlay Protocol',
      discipline: 'CAD/CAM Prosthodontics',
      structure: '1 Integrated Phase',
      timeline: '~90 min Single Block',
      proceduresSummary:
        'Conservative Biomechanical Prep & Scan, Sintered Lithium Disilicate Chairside Bonding.',
      indications: 'Structural cusp replacement with supra-gingival margin preservation.',
      recare: '30-day occlusion & contact margin audit.',
      author: 'Dr. Daniel James, DDS',
      authorRole: 'v1.4 Custom Blueprint • Verified Sep 2026',
    },
    {
      id: 'tpl-3',
      type: 'dha',
      typeLabel: 'DHA STANDARD',
      category: 'perio',
      categoryLabel: 'Perio Recare',
      title: 'Non-Surgical Periodontal Therapy (Scaling & Root Planing)',
      discipline: 'Periodontology & Tissue Preservation',
      structure: '2 Care Phases',
      timeline: '5 Total Procedures',
      proceduresSummary:
        'Full Quadrants Q1–Q4 Ultrasonic Subgingival Debridement + 6-Week Periodontal Charting.',
      indications: 'Generalized Stage II/III Periodontitis with 4–6mm pocketing.',
      recare: '3-Month Periodontal Recare Maintenance interval with bleeding index assessment.',
    },
  ];

  const categoryChips = [
    { id: 'all', label: 'All Pathways', icon: 'auto_awesome' },
    { id: 'restorative', label: 'Restorative & Recare' },
    { id: 'perio', label: 'Perio Recare' },
    { id: 'prostho', label: 'CAD/CAM & Onlay' },
    { id: 'surgical', label: 'Surgical Implant' },
  ];

  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) => {
      const matchesTab = currentTab === 'all' || tpl.type === currentTab;
      const matchesCategory = currentCategory === 'all' || tpl.category === currentCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        tpl.title.toLowerCase().includes(query) ||
        tpl.discipline.toLowerCase().includes(query) ||
        tpl.proceduresSummary.toLowerCase().includes(query);

      return matchesTab && matchesCategory && matchesQuery;
    });
  }, [templates, currentTab, currentCategory, searchQuery]);

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Template Library & Editor"
      badgeCode="13.29"
      badgeLabel="Protocol Scaffolding"
      currentStep="Step 29 of 30"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[20px] text-[#6bd8cb]" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Advisory Notice */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#006194] shrink-0 mt-0.5 shadow-xs">
              <Icon name="verified_user" className="text-[20px]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-sm font-bold text-[#131b2e]">
                  Clinical Protocol Blueprints (DHA Guidelines)
                </span>
                <span className="bg-[#86f2e4]/30 text-[#006f66] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#86f2e4]/50">
                  Regulatory Scaffolding
                </span>
              </div>
              <p className="text-xs text-[#3f4850] leading-relaxed">
                Templates provide standardized organizational scaffolding for multi-phase dental care. Templates never automatically establish clinical diagnosis, approve treatment plans, or bypass dentist individual patient assessment.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Area */}
        <div className="space-y-3">
          {/* Search Input */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#707881]">
              <Icon name="search" className="text-[20px]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blueprints by protocol title, clinical specialty, or procedure keyword..."
              className="w-full h-12 pl-10 pr-10 bg-white text-[#131b2e] rounded-xl text-sm shadow-sm border border-[#eaedff] placeholder:text-[#707881] focus:outline-none focus:ring-2 focus:ring-[#006194]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#707881] hover:text-[#131b2e]"
              >
                <Icon name="cancel" className="text-[18px]" />
              </button>
            )}
          </div>

          {/* Segmented Main Tabs & Chips Carousel */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="grid grid-cols-3 gap-1 bg-[#f2f3ff] p-1 rounded-xl border border-[#eaedff] max-w-md">
              <button
                type="button"
                onClick={() => setCurrentTab('all')}
                className={`py-2 px-3 rounded-lg text-center text-xs font-bold transition-all ${
                  currentTab === 'all'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#707881] hover:text-[#131b2e]'
                }`}
              >
                All (18)
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('dha')}
                className={`py-2 px-3 rounded-lg text-center text-xs font-bold transition-all ${
                  currentTab === 'dha'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#707881] hover:text-[#131b2e]'
                }`}
              >
                DHA Standard (11)
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('custom')}
                className={`py-2 px-3 rounded-lg text-center text-xs font-bold transition-all ${
                  currentTab === 'custom'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#707881] hover:text-[#131b2e]'
                }`}
              >
                Clinic Custom (7)
              </button>
            </div>

            <div className="text-xs text-[#707881] flex items-center gap-1.5 self-end md:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              <span>Showing {filteredTemplates.length} clinical pathways</span>
            </div>
          </div>

          {/* Category Chips Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {categoryChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setCurrentCategory(chip.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                  currentCategory === chip.id
                    ? 'bg-[#006194] text-white border-[#006194] shadow-xs'
                    : 'bg-white text-[#3f4850] border-[#eaedff] hover:bg-[#f2f3ff]'
                }`}
              >
                {chip.icon && <Icon name={chip.icon} className="text-[14px]" />}
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Template Cards Grid (Responsive: 1 col on mobile, 2 or 3 cols on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl shadow-sm border border-[#eaedff] p-5 flex flex-col justify-between hover:border-[#bfc7d2] transition-all space-y-4"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          tpl.type === 'dha'
                            ? 'bg-[#86f2e4]/30 text-[#006f66]'
                            : 'bg-[#cce5ff]/50 text-[#006194]'
                        }`}
                      >
                        <Icon
                          name={tpl.type === 'dha' ? 'shield' : 'star'}
                          className="text-[12px]"
                        />
                        {tpl.typeLabel}
                      </span>
                      {tpl.badge && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#707881] text-[10px] font-semibold">
                          <Icon name="trending_up" className="text-[12px]" />
                          {tpl.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#131b2e] leading-snug mt-1">
                      {tpl.title}
                    </h3>
                    <p className="text-xs text-[#006194] font-semibold">{tpl.discipline}</p>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006194] shrink-0">
                    <Icon name="dentistry" className="text-[22px]" />
                  </div>
                </div>

                {/* Creator Clinical Badge if custom */}
                {tpl.author && (
                  <div className="flex items-center gap-2 bg-[#f2f3ff] p-2.5 rounded-xl border border-[#eaedff]">
                    <div className="w-6 h-6 rounded-full bg-[#006194] text-white flex items-center justify-center text-[10px] font-bold">
                      DJ
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#131b2e] truncate">{tpl.author}</p>
                      <p className="text-[10px] text-[#707881] truncate">{tpl.authorRole}</p>
                    </div>
                  </div>
                )}

                {/* Phasing & Metric Envelopes */}
                <div className="grid grid-cols-2 gap-2 bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#006194] shrink-0 shadow-xs">
                      <Icon name="account_tree" className="text-[15px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-[#707881] truncate">Structure</p>
                      <p className="text-xs font-bold text-[#131b2e] truncate">{tpl.structure}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#006194] shrink-0 shadow-xs">
                      <Icon name="schedule" className="text-[15px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-[#707881] truncate">Timeline</p>
                      <p className="text-xs font-bold text-[#131b2e] truncate">{tpl.timeline}</p>
                    </div>
                  </div>
                </div>

                {/* Clinical Breakdown */}
                <div className="space-y-1.5 text-xs text-[#3f4850]">
                  <p className="flex items-start gap-1.5">
                    <Icon name="assignment" className="text-[15px] text-[#006194] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#131b2e]">Procedures:</strong> {tpl.proceduresSummary}
                    </span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <Icon name="clinical_notes" className="text-[15px] text-[#006a61] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#131b2e]">Indications:</strong> {tpl.indications}
                    </span>
                  </p>
                </div>

                {/* Phasing Timeline Mini-Bar if applicable */}
                {tpl.phase1Ratio && (
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-center text-[10px] text-[#707881]">
                      <span>{tpl.phase1Label}</span>
                      <span>{tpl.phase2Label}</span>
                    </div>
                    <div className="h-2 w-full bg-[#eaedff] rounded-full overflow-hidden flex">
                      <div
                        className="bg-[#006194] h-full"
                        style={{ width: `${tpl.phase1Ratio}%` }}
                      ></div>
                      <div
                        className="bg-[#006a61] h-full"
                        style={{ width: `${tpl.phase2Ratio}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Template "${tpl.title}" imported into Plan Builder.`);
                    navigate('/treatment-plans/builder');
                  }}
                  className="flex-1 h-10 bg-[#006194] hover:bg-[#004b73] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Icon name="add_circle" className="text-[16px]" />
                  Use Blueprint
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPreview(tpl)}
                  className="h-10 px-3 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-[#eaedff]"
                >
                  <Icon name="visibility" className="text-[16px]" />
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Inline Quick Editor Trigger Banner */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#cce5ff]/50 flex items-center justify-center text-[#006194] shadow-xs shrink-0">
              <Icon name="auto_fix_high" className="text-[24px]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">
                Create Custom Clinic Template
              </h3>
              <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                Convert active treatment plan{' '}
                <span className="font-mono bg-[#f2f3ff] px-1.5 py-0.5 rounded text-[#006194] font-semibold">
                  #TP-2026-089
                </span>{' '}
                into a standardized multi-phase clinical protocol blueprint for practice-wide deployment.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="h-12 px-6 bg-[#006a61] hover:bg-[#005049] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <Icon name="add" className="text-[18px]" />
            Create New Treatment Template
          </button>
        </div>

        {/* Operational Utility Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => showToast('Selected protocol blueprint duplicated to draft state.')}
            className="h-11 bg-white hover:bg-[#f2f3ff] text-[#131b2e] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-[#eaedff] transition-colors"
          >
            <Icon name="content_copy" className="text-[17px] text-[#707881]" />
            Duplicate Selected Template
          </button>
          <button
            type="button"
            onClick={() => showToast('Template library index generated as PDF catalog.')}
            className="h-11 bg-white hover:bg-[#f2f3ff] text-[#131b2e] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-[#eaedff] transition-colors"
          >
            <Icon name="picture_as_pdf" className="text-[17px] text-[#707881]" />
            Export Template Library Index (PDF)
          </button>
        </div>

        {/* Blueprint Preview Modal */}
        {selectedPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#eaedff] space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center">
                    <Icon name="visibility" className="text-[18px]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#131b2e]">Blueprint Deep Preview</h3>
                    <p className="text-xs text-[#707881]">{selectedPreview.typeLabel}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPreview(null)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f2f3ff] text-[#707881] flex items-center justify-center"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#3f4850]">
                <h4 className="font-bold text-sm text-[#131b2e]">{selectedPreview.title}</h4>
                <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#eaedff] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#707881]">Clinical Discipline:</span>
                    <span className="font-semibold text-[#131b2e]">{selectedPreview.discipline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#707881]">Phasing Structure:</span>
                    <span className="font-semibold text-[#131b2e]">{selectedPreview.structure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#707881]">Target Timeline:</span>
                    <span className="font-semibold text-[#131b2e]">{selectedPreview.timeline}</span>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-[#131b2e] block mb-1">Standard Procedures:</span>
                  <p className="bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff] leading-relaxed">
                    {selectedPreview.proceduresSummary}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#131b2e] block mb-1">Clinical Indications:</span>
                  <p className="bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff] leading-relaxed">
                    {selectedPreview.indications}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#131b2e] block mb-1">Recare & Follow-up Mandate:</span>
                  <p className="bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff] leading-relaxed">
                    {selectedPreview.recare}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPreview(null);
                    navigate('/treatment-plans/builder');
                  }}
                  className="flex-1 h-11 bg-[#006194] hover:bg-[#004b73] text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Apply Blueprint to Plan (13.5)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPreview(null)}
                  className="px-4 h-11 bg-[#f2f3ff] text-[#3f4850] font-semibold rounded-xl text-xs hover:bg-[#eaedff] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Template Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center">
                    <Icon name="add" className="text-[18px]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#131b2e]">New Protocol Template</h3>
                    <p className="text-xs text-[#707881]">Publish Practice Blueprint</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f2f3ff] text-[#707881] flex items-center justify-center"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">
                    Template Official Name
                  </label>
                  <input
                    type="text"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#bfc7d2] bg-[#faf8ff] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">
                    Clinical Specialty Area
                  </label>
                  <select
                    value={newTemplateSpecialty}
                    onChange={(e) => setNewTemplateSpecialty(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#bfc7d2] bg-[#faf8ff] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  >
                    <option>Operative & Restorative</option>
                    <option>CAD/CAM Prosthodontics</option>
                    <option>Periodontics & Hygiene</option>
                    <option>Endodontic Therapy</option>
                    <option>Surgical Implantology</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-xs text-[#3f4850] leading-relaxed">
                  Procedures and sequencing from Plan <strong>#TP-2026-089</strong> will be duplicated as baseline phases.
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    showToast(`Template "${newTemplateName}" created successfully.`);
                  }}
                  className="flex-1 h-11 bg-[#006a61] hover:bg-[#005049] text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Publish Template
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 h-11 bg-[#f2f3ff] text-[#3f4850] font-semibold rounded-xl text-xs hover:bg-[#eaedff] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TreatmentPlanShell>
  );
}
