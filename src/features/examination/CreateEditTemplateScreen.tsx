import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

interface WorkflowModule {
  id: number;
  title: string;
  order: number;
  description: string;
  isMandatory?: boolean;
  enabled: boolean;
  syncTag?: string;
  prompt?: string;
}

export function CreateEditTemplateScreen() {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState<string>(
    'Central Branch Geriatric & Removable Prosthodontics'
  );
  const [templateDesc, setTemplateDesc] = useState<string>(
    'Tailored examination workflow for elderly patients assessing denture stability, mucosal sores, dry mouth, and root caries.'
  );
  const [scope, setScope] = useState<'comprehensive' | 'focused'>('comprehensive');
  const [specialty, setSpecialty] = useState<string>('Prosthodontics & Gerodontology');
  const [enforcePreValidation, setEnforcePreValidation] = useState<boolean>(true);
  const [requireBiometric, setRequireBiometric] = useState<boolean>(true);
  const [isAddPromptModalOpen, setIsAddPromptModalOpen] = useState<boolean>(false);
  const [selectedModuleForPrompt, setSelectedModuleForPrompt] = useState<number>(3);
  const [newPromptText, setNewPromptText] = useState<string>('');
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [modules, setModules] = useState<WorkflowModule[]>([
    {
      id: 1,
      title: 'Patient History & Medical Alert Intake',
      order: 1,
      description: 'DHA-MOHAP systemic disease, anticoagulant, & allergy checks',
      isMandatory: true,
      enabled: true,
    },
    {
      id: 2,
      title: 'Extraoral & Lymph Node Assessment',
      order: 2,
      description: 'TMJ palpation, facial symmetry, and cervical chain lymphatic review',
      enabled: true,
    },
    {
      id: 3,
      title: 'Intraoral Soft Tissue & Mucosal Screening',
      order: 3,
      description: 'Tongue, sulcus, palate, and oral cancer screening',
      enabled: true,
      prompt: 'Check for denture stomatitis & angular cheilitis',
    },
    {
      id: 4,
      title: 'Periodontal Screening & Recession Index',
      order: 4,
      description: 'BPE / PSR codes, furcation involvement, and attached gingiva deficit',
      enabled: true,
    },
    {
      id: 5,
      title: 'Occlusion, Free-way Space & Vertical Dimension',
      order: 5,
      description: 'Centric relation vs centric occlusion and physiological rest position',
      enabled: true,
      prompt: 'Assess OVD and freeway space (2-4mm)',
    },
    {
      id: 6,
      title: 'Dental Odontogram',
      order: 6,
      description: 'Interactive teeth matrix mapping caries, crowns, bridges, and pontics',
      enabled: true,
      syncTag: 'Sec-9 Sync',
    },
    {
      id: 7,
      title: 'Diagnostic Radiographs & OPG',
      order: 7,
      description: 'Panoramic bone loss evaluation and bitewing proximal surveillance',
      enabled: true,
      syncTag: 'Sec-11',
    },
    {
      id: 8,
      title: 'Clinical Assessment & Sign-off',
      order: 8,
      description: 'Definitive problem list, prognosis, clinician digital signature',
      isMandatory: true,
      enabled: true,
    },
  ]);

  const toggleModule = (id: number) => {
    setModules(
      modules.map((m) => {
        if (m.id === id) {
          if (m.isMandatory) {
            showToast('Mandatory regulatory modules cannot be disabled under DHA rules');
            return m;
          }
          return { ...m, enabled: !m.enabled };
        }
        return m;
      })
    );
  };

  const handleAddPrompt = () => {
    if (!newPromptText.trim()) {
      showToast('Please type a prompt guideline');
      return;
    }
    setModules(
      modules.map((m) => {
        if (m.id === selectedModuleForPrompt) {
          return { ...m, prompt: newPromptText };
        }
        return m;
      })
    );
    setNewPromptText('');
    setIsAddPromptModalOpen(false);
    showToast('Custom prompt appended to module');
  };

  const handleSavePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      showToast(`Template "${templateName}" saved and published successfully!`);
      navigate('/examination/templates/preview');
    }, 1000);
  };

  return (
    <ExaminationShell
      pageTitle="Create / Edit Template"
      badgeCode="10.22"
      badgeLabel="Template Authoring"
      currentStep="Template Authoring Wizard (Step 2 of 3)"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Top Progress & Context Banner */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-mono text-xs font-bold uppercase">
                Draft v1.0
              </span>
              <span className="text-xs text-on-surface-variant">Dr. Daniel James (#DEN-48912)</span>
            </div>
            <div className="flex items-center gap-1.5 text-secondary text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Autosaved to Central Branch Vault</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="font-bold text-on-surface">Template Authoring Wizard</span>
            <span className="font-mono text-primary font-bold">Step 2 of 3</span>
          </div>

          {/* Stepper Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className="h-1.5 rounded-full bg-primary" />
            <div className="h-1.5 rounded-full bg-primary" />
            <div className="h-1.5 rounded-full bg-surface-container-high" />
          </div>

          <div className="flex justify-between text-[11px] text-on-surface-variant">
            <span className="text-primary font-bold">1. Metadata</span>
            <span className="text-primary font-bold">2. Modular Sections</span>
            <span className="opacity-60">3. Safeguards & Prompts</span>
          </div>
        </section>

        {/* Section A: Template Metadata */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Icon name="assignment" className="text-lg" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-on-surface">Section A: Template Metadata</h2>
                <p className="text-[11px] text-on-surface-variant">Define scope, specialty, and clinical context</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-mono text-[10px] font-bold">
              DHA-SPEC
            </span>
          </div>

          {/* Template Name */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-on-surface block" htmlFor="tmpl-name">Template Name</label>
            <input
              id="tmpl-name"
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary shadow-sm"
            />
            <span className="text-[11px] text-on-surface-variant">Visible across DHA Surulere and Central Branch registries</span>
          </div>

          {/* Clinical Intent & Protocol Summary */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-on-surface block" htmlFor="tmpl-desc">Clinical Intent & Protocol Summary</label>
            <textarea
              id="tmpl-desc"
              rows={3}
              value={templateDesc}
              onChange={(e) => setTemplateDesc(e.target.value)}
              className="w-full p-3 rounded-xl bg-surface-container-low text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary shadow-sm resize-none leading-relaxed"
            />
          </div>

          {/* Scope Selector */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-on-surface block">Examination Scope</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                  scope === 'comprehensive'
                    ? 'bg-primary/10 border-primary font-bold'
                    : 'bg-surface-container-low border-outline-variant/20 hover:bg-surface-container'
                }`}
              >
                <input
                  type="radio"
                  name="exam_scope"
                  value="comprehensive"
                  checked={scope === 'comprehensive'}
                  onChange={() => setScope('comprehensive')}
                  className="accent-primary w-4 h-4"
                />
                <div>
                  <span className="block text-xs text-on-surface">Comprehensive</span>
                  <span className="block text-[11px] text-on-surface-variant font-normal">Full systemic audit (8 Modules)</span>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                  scope === 'focused'
                    ? 'bg-primary/10 border-primary font-bold'
                    : 'bg-surface-container-low border-outline-variant/20 hover:bg-surface-container'
                }`}
              >
                <input
                  type="radio"
                  name="exam_scope"
                  value="focused"
                  checked={scope === 'focused'}
                  onChange={() => setScope('focused')}
                  className="accent-primary w-4 h-4"
                />
                <div>
                  <span className="block text-xs text-on-surface">Focused Exam</span>
                  <span className="block text-[11px] text-on-surface-variant font-normal">Single problem / triage matrix</span>
                </div>
              </label>
            </div>
          </div>

          {/* Specialty Dropdown */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-on-surface block" htmlFor="tmpl-specialty">Clinical Specialty Allocation</label>
            <select
              id="tmpl-specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary shadow-sm"
            >
              <option>Prosthodontics & Gerodontology</option>
              <option>General Restorative & Preventive</option>
              <option>Periodontics & Implant Surgery</option>
              <option>Pediatric & Interceptive Orthodontics</option>
            </select>
          </div>
        </section>

        {/* Section B: Modular Workflow Builder */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                <Icon name="reorder" className="text-lg" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-on-surface">Section B: Modular Workflow Builder</h2>
                <p className="text-[11px] text-on-surface-variant">
                  Active modules ({modules.filter((m) => m.enabled).length} of {modules.length} enabled)
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  mod.enabled
                    ? 'bg-surface-container-low border-outline-variant/30'
                    : 'bg-surface-container-lowest opacity-60 border-dashed border-outline-variant/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="pt-0.5 text-on-surface-variant cursor-grab">
                    <Icon name="drag_indicator" className="text-lg" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-on-surface">{mod.order}. {mod.title}</span>
                        {mod.syncTag && (
                          <span className="px-2 py-0.2 rounded bg-surface-container text-primary font-mono text-[10px] font-bold">
                            {mod.syncTag}
                          </span>
                        )}
                      </div>
                      {mod.isMandatory ? (
                        <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container text-[10px] font-bold">
                          Mandatory
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-outline">Order #{mod.order}</span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{mod.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={mod.enabled}
                    disabled={mod.isMandatory}
                    onChange={() => toggleModule(mod.id)}
                    className="w-5 h-5 accent-primary rounded mt-0.5"
                  />
                </div>

                {mod.prompt && (
                  <div className="ml-8 mt-2 p-2.5 rounded-xl bg-surface-container flex items-start gap-2 border border-outline-variant/20">
                    <Icon name="lightbulb" className="text-primary text-base shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1 text-xs">
                      <span className="font-bold text-primary block text-[10px] uppercase tracking-wider">Active Branch Prompt</span>
                      <span className="text-on-surface italic">&ldquo;{mod.prompt}&rdquo;</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedModuleForPrompt(mod.id);
                        setNewPromptText(mod.prompt || '');
                        setIsAddPromptModalOpen(true);
                      }}
                      className="text-primary hover:text-primary/80 p-1"
                    >
                      <Icon name="edit" className="text-sm" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Prompt Button */}
          <button
            type="button"
            onClick={() => setIsAddPromptModalOpen(true)}
            className="w-full h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Icon name="add_circle" className="text-base" />
            <span>Add Custom Clinic Prompt</span>
          </button>
        </section>

        {/* Section C: Clinical Safeguards & Governance Locks */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-outline-variant/20 pb-3">
            <div className="w-9 h-9 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center font-bold">
              <Icon name="verified_user" className="text-lg" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-on-surface">Section C: Clinical Safeguards & Governance</h2>
              <p className="text-[11px] text-on-surface-variant">Immutable legal and regulatory rules</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low flex items-start gap-3 border border-outline-variant/20">
            <Icon name="policy" className="text-primary text-xl shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs">
              <span className="font-bold text-primary block">Non-Bypassable Safeguards</span>
              <p className="text-on-surface leading-relaxed">
                Regulatory protocols forbid removing Patient Consent, Clinician Identity Attribution, or silent auto-filling of unassessed fields under Nigeria Federal Health Directives.
              </p>
            </div>
          </div>

          {/* Governance Toggle 1 */}
          <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
            <div className="min-w-0 text-xs">
              <span className="font-bold text-on-surface block">Enforce Pre-Validation Gate</span>
              <span className="text-on-surface-variant">Prevents submission if mandatory fields or periodontal indices are incomplete</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={enforcePreValidation}
                onChange={(e) => setEnforcePreValidation(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          {/* Governance Toggle 2 */}
          <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
            <div className="min-w-0 text-xs">
              <span className="font-bold text-on-surface block">Require Biometric / National Identification Number (NIN) verification Re-auth</span>
              <span className="text-on-surface-variant">Cryptographic key re-authentication before template lock and release</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={requireBiometric}
                onChange={(e) => setRequireBiometric(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </section>

        {/* Action Trays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/examination/templates/preview')}
            className="h-12 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Icon name="visibility" className="text-base" />
            <span>Preview Schema (10.23)</span>
          </button>

          <button
            type="button"
            disabled={isPublishing}
            onClick={handleSavePublish}
            className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all"
          >
            {isPublishing ? (
              <>
                <Icon name="progress_activity" className="text-base animate-spin" />
                <span>Publishing to Central Vault...</span>
              </>
            ) : (
              <>
                <Icon name="publish" className="text-base" />
                <span>Save & Publish Template</span>
              </>
            )}
          </button>
        </div>

        {/* Modal: Add Custom Prompt */}
        {isAddPromptModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl p-6 border border-outline-variant/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <h3 className="text-sm sm:text-base font-bold text-on-surface">Add Custom Clinic Prompt</h3>
                <button
                  type="button"
                  onClick={() => setIsAddPromptModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
                >
                  <Icon name="close" className="text-sm" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-on-surface block">Target Module</label>
                  <select
                    value={selectedModuleForPrompt}
                    onChange={(e) => setSelectedModuleForPrompt(parseInt(e.target.value))}
                    className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary"
                  >
                    {modules.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.order}. {m.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-on-surface block">Guideline / Clinical Prompt Text</label>
                  <textarea
                    rows={3}
                    value={newPromptText}
                    onChange={(e) => setNewPromptText(e.target.value)}
                    placeholder="e.g. Verify occlusal vertical dimension (OVD) freeway space..."
                    className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary resize-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPromptModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddPrompt}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold"
                >
                  Attach Prompt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ExaminationShell>
  );
}

export default CreateEditTemplateScreen;

