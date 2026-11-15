import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

interface TemplateOption {
  id: string;
  title: string;
  version: string;
  badge: string;
  badgeType: 'standard' | 'specialized' | 'urgent' | 'custom';
  description: string;
  modulesIncluded: string[];
  lastValidated?: string;
  category: 'dha' | 'clinic';
}

const templates: TemplateOption[] = [
  {
    id: 'tpl-standard',
    title: 'Standard Comprehensive Dental Examination',
    version: 'v1.0 • Default',
    badge: 'DHA Approved Standard',
    badgeType: 'standard',
    description: 'Complete multi-phase charting baseline compliant with Dubai Health Authority regulatory mandate.',
    modulesIncluded: ['Full Periodontal Probing', 'Soft Tissue Screening', 'Section 9 Odontogram Link', 'Radiographic Assessment'],
    lastValidated: 'Oct 2024',
    category: 'dha',
  },
  {
    id: 'tpl-perio',
    title: 'Periodontal Comprehensive & Risk Evaluation',
    version: 'v2.1',
    badge: 'Specialized Protocol',
    badgeType: 'specialized',
    description: 'Deep longitudinal focus on pocket depth charting, gingival recession index, furcation involvement, and CAL.',
    modulesIncluded: ['Full 6-Site Perio', 'Plaque & Bleeding Score', 'Mobility & Furcation', 'Risk Assessment Matrix'],
    category: 'dha',
  },
  {
    id: 'tpl-emergency',
    title: 'Focused Emergency / Odontalgia Protocol',
    version: 'v1.2',
    badge: 'Urgent Triage',
    badgeType: 'urgent',
    description: 'Fast-track presenting complaint logging, single periapical radiograph integration, cold sensitivity, and percussion mapping.',
    modulesIncluded: ['Emergency Symptom Mapping', 'Targeted Tooth Diagnostic', 'Vitality & Percussion', 'Immediate Prescription'],
    category: 'dha',
  },
  {
    id: 'tpl-prostho',
    title: 'Central Branch Prosthodontic Baseline',
    version: 'v1.1',
    badge: 'Central Branch Custom',
    badgeType: 'custom',
    description: 'Implant site assessment, occlusal vertical dimension (OVD) metrics, tooth wear index, and crown/bridge status logs.',
    modulesIncluded: ['Implant Site Charting', 'OVD & Free-Way Space', 'Tooth Wear & Attrition', 'Shade Selection Log'],
    category: 'clinic',
  },
];

export function ExaminationTypeTemplateScreen() {
  const navigate = useNavigate();
  const [examScope, setExamScope] = useState<'comprehensive' | 'focused'>('comprehensive');
  const [activeTab, setActiveTab] = useState<'dha' | 'clinic'>('dha');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('tpl-standard');
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];
  const filteredTemplates = templates.filter((t) => t.category === activeTab);

  const handleConfirmAndOpen = () => {
    setIsInitializing(true);
    setTimeout(() => {
      navigate('/examination/workspace');
    }, 500);
  };

  return (
    <ExaminationShell
      pageTitle="Examination Type & Template Selection"
      badgeCode="10.3"
      badgeLabel="Step 2: Protocol Matrix"
      currentStep="Step 2 of 4: Select Examination Protocol"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Workflow Progress Tracker */}
        <section className="bg-surface-container-low rounded-2xl p-5 shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Workflow Initiation</span>
            <span className="font-mono text-xs font-semibold text-on-surface-variant">Step 2 of 4</span>
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            <div className="h-1.5 flex-1 rounded-full bg-secondary" />
            <div className="h-1.5 flex-1 rounded-full bg-primary" />
            <div className="h-1.5 flex-1 rounded-full bg-surface-container-highest" />
            <div className="h-1.5 flex-1 rounded-full bg-surface-container-highest" />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-on-surface text-sm">Select Examination Protocol</span>
            <span className="text-primary font-semibold flex items-center gap-1">
              <Icon name="lock_reset" className="text-sm" />
              <span>Bound to Session</span>
            </span>
          </div>
        </section>

        {/* Patient Mini-Context Header Card */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-outline-variant/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center shrink-0 text-primary">
              <Icon name="medical_information" className="text-2xl" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm sm:text-base text-on-surface truncate">Chinedu Okafor</h3>
                <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-mono text-xs font-bold">
                  DHA-10482
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5 flex-wrap">
                <span>34y Male</span>
                <span>•</span>
                <span className="text-secondary font-medium">Adult Protocol</span>
                <span>•</span>
                <span className="truncate">Central Branch</span>
              </div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase shrink-0">
            Intake Ready
          </span>
        </section>

        {/* 1. Examination Scope Selection */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-on-surface">1. Select Examination Scope</h2>
            <span className="text-[11px] font-bold uppercase text-on-surface-variant">Mandatory Field</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Comprehensive Option */}
            <div
              onClick={() => setExamScope('comprehensive')}
              className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                examScope === 'comprehensive'
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md'
                  : 'border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant/60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    examScope === 'comprehensive' ? 'bg-primary text-white' : 'border-2 border-outline'
                  }`}
                >
                  {examScope === 'comprehensive' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-on-surface">Comprehensive Examination</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold uppercase">
                      Standard
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    Full clinical evaluation covering all 8 clinical sections: Medical History, Extraoral, Intraoral Soft Tissue, Periodontal 6-point, Occlusion, Section 9 Odontogram integration, Investigations, and Clinical Assessment.
                  </p>
                  <div className="mt-2 text-primary text-xs font-semibold flex items-center gap-1">
                    <Icon name="verified" className="text-sm" />
                    <span>Recommended for primary intakes & annual recares</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Focused Option */}
            <div
              onClick={() => setExamScope('focused')}
              className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                examScope === 'focused'
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md'
                  : 'border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant/60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    examScope === 'focused' ? 'bg-primary text-white' : 'border-2 border-outline'
                  }`}
                >
                  {examScope === 'focused' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-on-surface">Focused Examination</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-bold uppercase">
                      Targeted
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    Targeted assessment for specific acute symptoms, emergency triage, single quadrant or post-op check. Select only applicable clinical sections.
                  </p>
                  <div className="mt-2 text-on-surface-variant text-xs flex items-center gap-1">
                    <Icon name="emergency" className="text-sm text-error" />
                    <span>Optimized for triage and single-tooth pain tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Clinical Template Matrix */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-on-surface">2. Clinical Template Matrix</h2>
              <p className="text-xs text-on-surface-variant">Sets mandatory diagnostic modules and charting schema</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
              <Icon name="rule_folder" className="text-lg" />
            </div>
          </div>

          {/* Segmented Filter Tabs */}
          <div className="bg-surface-container p-1 rounded-xl flex items-center gap-1 max-w-md">
            <button
              type="button"
              onClick={() => setActiveTab('dha')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'dha'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>DHA Standard Templates</span>
              <span className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('clinic')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'clinic'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>Clinic-Specific</span>
              <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] flex items-center justify-center font-bold">
                1
              </span>
            </button>
          </div>

          {/* Template Option Cards */}
          <div className="grid grid-cols-1 gap-3.5">
            {filteredTemplates.map((tpl) => {
              const isSelected = selectedTemplateId === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer border transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md'
                      : 'border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant/60 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase flex items-center gap-1 ${
                          tpl.badgeType === 'standard'
                            ? 'bg-secondary-container text-on-secondary-container'
                            : tpl.badgeType === 'urgent'
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        <Icon name="verified_user" className="text-xs" />
                        <span>{tpl.badge}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono text-[11px] font-bold">
                        {tpl.version}
                      </span>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-primary text-white shadow' : 'border border-outline-variant'
                      }`}
                    >
                      {isSelected && <Icon name="check" className="text-sm" />}
                    </div>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-sm sm:text-base font-bold text-on-surface">{tpl.title}</h3>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{tpl.description}</p>
                  </div>

                  {/* Module Badges */}
                  <div className="mt-3 bg-surface-container-low rounded-xl p-3 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                      Modules Included:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tpl.modulesIncluded.map((mod, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-surface-container-lowest text-xs text-on-surface">
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplateId(tpl.id);
                        setPreviewModalOpen(true);
                      }}
                      className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <Icon name="visibility" className="text-sm" />
                      <span>Preview Template Structure</span>
                    </button>
                    {tpl.lastValidated && (
                      <span className="text-secondary font-medium flex items-center gap-1 text-[11px]">
                        <Icon name="history" className="text-xs" />
                        <span>Last validated: {tpl.lastValidated}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Safeguard Notice */}
        <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm border border-outline-variant/30 flex items-start gap-3 text-xs">
          <div className="w-8 h-8 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 text-primary">
            <Icon name="encrypted" className="text-lg" />
          </div>
          <div>
            <h4 className="font-bold text-on-surface">Template Versioning Lock</h4>
            <p className="text-on-surface-variant mt-0.5 leading-relaxed">
              Selected template <strong className="text-primary font-mono">{selectedTemplate.version}</strong> will be permanently bound to this examination encounter. Schema changes cannot be made mid-encounter to preserve DHA audit integrity.
            </p>
          </div>
        </section>

        {/* Active Modules Matrix Preview */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs sm:text-sm text-on-surface">Active Modules in Current Session</span>
            <span className="font-mono text-xs text-secondary font-bold">8 / 8 Active</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              { num: '1', title: 'Medical History', icon: 'history_edu' },
              { num: '2', title: 'Extraoral Exam', icon: 'face' },
              { num: '3', title: 'Soft Tissue', icon: 'dentistry' },
              { num: '4', title: 'Perio 6-Point', icon: 'straighten' },
              { num: '5', title: 'Odontogram', icon: 'grid_view' },
              { num: '6', title: 'Occlusion', icon: 'compare' },
              { num: '7', title: 'Investigations', icon: 'radiology' },
              { num: '8', title: 'Clinical Assess', icon: 'fact_check' },
            ].map((mod) => (
              <div key={mod.num} className="p-2.5 rounded-xl bg-surface-container-low flex items-center gap-2">
                <Icon name={mod.icon} className="text-secondary text-base shrink-0" />
                <span className="text-on-surface font-medium truncate">{mod.num}. {mod.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Action Footer */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            disabled={isInitializing}
            onClick={handleConfirmAndOpen}
            className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            {isInitializing ? (
              <>
                <Icon name="sync" className="animate-spin text-base" />
                <span>Initializing Dental Charting Session...</span>
              </>
            ) : (
              <>
                <span>Confirm Template & Open Workspace</span>
                <Icon name="arrow_forward" className="text-base" />
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => navigate('/examination/confirmation')}
              className="h-10 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="arrow_back" className="text-sm" />
              <span>Back to Patient</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewModalOpen(true)}
              className="h-10 bg-secondary-container hover:opacity-90 text-on-secondary-container rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-opacity"
            >
              <Icon name="frame_inspect" className="text-sm" />
              <span>Structure Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* Structure Preview Modal */}
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full shadow-2xl border border-outline-variant/30 overflow-hidden">
            <div className="p-4 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <Icon name="assignment" className="text-primary text-xl" />
                <h3 className="font-bold text-sm sm:text-base text-on-surface">Template Specification</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-dim transition-colors"
              >
                <Icon name="close" className="text-base" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div>
                <span className="font-bold uppercase tracking-wider text-secondary text-[10px]">Template Name</span>
                <h4 className="font-bold text-sm sm:text-base text-on-surface mt-0.5">{selectedTemplate.title} ({selectedTemplate.version})</h4>
                <p className="text-on-surface-variant mt-1 leading-relaxed">
                  DHA Baseline Mandate Section 10 Clinical Electronic Health Records standard for general and restorative dentistry.
                </p>
              </div>

              <div className="bg-surface-container-low rounded-2xl p-4 space-y-2">
                <span className="font-bold text-on-surface block mb-1">Section Layout Breakdown:</span>
                <ul className="space-y-2 text-on-surface-variant">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span><strong>Section 10.1:</strong> Medical Risk Screening & ASA Classification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span><strong>Section 10.2:</strong> Extraoral & TMJ Palpation Matrix</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span><strong>Section 10.3:</strong> Intraoral Soft Tissue & Cancer Screen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span><strong>Section 10.4:</strong> 6-Site Periodontal Depth & Bleeding Index</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span><strong>Section 10.5:</strong> Section 9 Direct Interactive Odontogram Integration</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-surface-container font-mono text-[11px] text-on-surface">
                Authority Hash: DHA-CLIN-SEC10-STD-V1-2024-AE
              </div>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant/20 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs shadow transition-all"
              >
                Apply & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </ExaminationShell>
  );
}
export default ExaminationTypeTemplateScreen;

