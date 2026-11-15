import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

interface SectionArchitectureItem {
  id: string;
  orderNum: string;
  title: string;
  badgeLabel?: string;
  badgeColor?: string;
  isLocked?: boolean;
  description: string;
  tags: string[];
  promptDirective?: string;
  autoCalibrated?: boolean;
}

const initialArchitecture: SectionArchitectureItem[] = [
  {
    id: 'sec-1',
    orderNum: '01',
    title: 'Patient Overview & Chief Complaint',
    badgeLabel: 'Mandatory Base',
    badgeColor: 'bg-[#eaedff] text-[#707881]',
    isLocked: true,
    description:
      'Synthesizes presenting symptomatic timeline, pain intensity scale, emergency status, and core medical history flags.',
    tags: ['#Pain-Scale', '#Onset-Timing', '#Chief-Complaint'],
  },
  {
    id: 'sec-2',
    orderNum: '02',
    title: 'Odontogram & Lesion Localization',
    badgeLabel: 'Verified Clinical Module',
    badgeColor: 'text-[#006a61]',
    description: 'Extracts findings from 2D Odontogram vectors and surfaces.',
    tags: ['#ICDAS-Caries', '#Surface-Involvement', '#Antagonist-Harmony'],
  },
  {
    id: 'sec-3',
    orderNum: '03',
    title: 'Radiographic Caliper & Pulp Clearance',
    badgeLabel: 'Diagnostic Metric Node',
    badgeColor: 'text-[#006194]',
    description: 'AI metric calculation for dentin clearance.',
    promptDirective:
      'Direct synthesis engine to extract residual dentin buffer thickness from bitewing/periapical radiographs and flag any proximity under 1.5mm.',
    tags: ['#Residual-Dentin', '#Periapical-PDL', '#ALARA-Dose'],
    autoCalibrated: true,
  },
  {
    id: 'sec-4',
    orderNum: '04',
    title: 'Critical Medical Countermeasures & Allergies',
    badgeLabel: 'Non-Bypassable Statutory Safety Gate',
    badgeColor: 'text-[#ba1a1a]',
    isLocked: true,
    description:
      'Automatically injects mandatory penicillin hypersensitivity cross-checks, latex sensitivity, and acute asthma intervention protocols into generated drafts.',
    tags: ['#Anaphylaxis-Check', '#Contraindications'],
  },
  {
    id: 'sec-5',
    orderNum: '05',
    title: 'Proposed Restorative Protocol & Material Selection',
    badgeLabel: 'Biomimetic Custom Logic',
    badgeColor: 'text-[#707881]',
    description:
      'Pre-configures biomimetic resin composite matrix, selective enamel etch protocol, and dental dam dry-field isolation verification steps.',
    tags: ['#Biomimetic-Resin', '#Selective-Etch', '#Rubber-Dam-Protocol'],
  },
];

export function CreateEditAISummaryTemplateScreen() {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState(
    'Harmony Restorative & Biomimetic Brief'
  );
  const [targetScope, setTargetScope] = useState<'emr' | 'patient'>('emr');
  const [sections, setSections] = useState<SectionArchitectureItem[]>(initialArchitecture);
  const [narrativeTone, setNarrativeTone] = useState<'concise' | 'descriptive' | 'plain'>(
    'concise'
  );
  const [confidenceGate, setConfidenceGate] = useState(90);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const moveUp = (index: number) => {
    if (index <= 0) return;
    const current = sections[index];
    const prev = sections[index - 1];
    if (current.isLocked || prev.isLocked) return;

    const copy = [...sections];
    copy[index - 1] = current;
    copy[index] = prev;
    setSections(copy);
    showToast('Section moved up');
  };

  const moveDown = (index: number) => {
    if (index >= sections.length - 1) return;
    const current = sections[index];
    const next = sections[index + 1];
    if (current.isLocked || next.isLocked) return;

    const copy = [...sections];
    copy[index + 1] = current;
    copy[index] = next;
    setSections(copy);
    showToast('Section moved down');
  };

  const deleteSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    showToast('Section removed from template schema');
  };

  const addCustomModule = (title: string, desc: string, tags: string[]) => {
    const newSec: SectionArchitectureItem = {
      id: `sec-${Date.now()}`,
      orderNum: `0${sections.length + 1}`,
      title,
      badgeLabel: 'Custom Module',
      badgeColor: 'text-[#006194]',
      description: desc,
      tags,
    };

    // Insert before the locked safety gate if present
    const lockedIdx = sections.findIndex((s) => s.id === 'sec-4');
    if (lockedIdx !== -1) {
      const copy = [...sections];
      copy.splice(lockedIdx, 0, newSec);
      setSections(copy);
    } else {
      setSections((prev) => [...prev, newSec]);
    }
    setIsAddSectionModalOpen(false);
    showToast(`Added section: ${title}`);
  };

  return (
    <SummaryShell
      pageTitle="Create/Edit AI Summary Template"
      badgeCode="12.20"
      badgeLabel="Template Architect"
      currentStep="Template Builder"
    >
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-white/10 animate-fade-in">
            <Icon name="check_circle" className="text-emerald-400 text-[18px]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Meta Banner & Draft ID */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006a61] text-xs font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" />
            Draft v1.0 • Autosaved
          </span>
          <span className="font-mono text-xs text-[#707881] font-semibold tracking-wide">
            TPL-CLINIC-042
          </span>
        </div>

        {/* Wizard Step Indicator */}
        <section className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#006194]">
              Workflow Stage
            </span>
            <span className="text-xs font-bold text-[#707881]">Step 2 of 3</span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-[#131b2e]">
            Section Builder &amp; Clinical Prompts
          </h2>

          {/* Progress Segments */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="h-2 rounded-full bg-[#006194]" />
            <div className="h-2 rounded-full bg-[#006194] relative overflow-hidden">
              <div className="absolute inset-0 bg-[#007bb9] animate-pulse" />
            </div>
            <div className="h-2 rounded-full bg-[#eaedff]" />
          </div>

          <div className="flex justify-between items-center text-xs text-[#707881] pt-1">
            <span className="text-[#006194] font-medium">1. General Metadata</span>
            <span className="text-[#006194] font-bold">2. Section Builder</span>
            <span>3. Governance &amp; Perms</span>
          </div>
        </section>

        {/* General Information Card */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold uppercase text-[#707881] block mb-1">
                Active Template Name
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full font-bold text-base sm:text-lg text-[#131b2e] bg-[#faf8ff] px-3 py-2 rounded-xl border border-[#eaedff] focus:outline-none focus:border-[#006194] focus:bg-white transition-all"
                />
              </div>
            </div>
            <Icon
              name="dentistry"
              className="text-[#006194] text-[24px] shrink-0 mt-2"
            />
          </div>

          {/* Badges & Scope */}
          <div className="space-y-3 pt-1">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-[#131b2e]">
                <Icon name="category" className="text-[15px] text-[#006194]" />
                <span>Restorative Dentistry &amp; AI Diagnostics</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-[#707881]">
                <Icon name="location_on" className="text-[15px]" />
                <span>Harmony Dental Clinic (Wuse 2)</span>
              </div>
            </div>

            {/* Target Scope Switcher */}
            <div>
              <span className="text-xs font-bold text-[#707881] block mb-1.5">
                Clinical Target Scope
              </span>
              <div className="bg-[#eaedff] p-1 rounded-xl flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setTargetScope('emr')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold text-center shadow-xs flex items-center justify-center gap-1.5 transition-all ${
                    targetScope === 'emr'
                      ? 'bg-white text-[#006194]'
                      : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon name="clinical_notes" className="text-[16px]" />
                  <span>Professional Record (EMR)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTargetScope('patient')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all ${
                    targetScope === 'patient'
                      ? 'bg-white text-[#006194] shadow-xs'
                      : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon name="patient_list" className="text-[16px]" />
                  <span>Patient-Facing Summary</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section Builder Studio */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-[#131b2e]">
                Synthesis Section Architecture
              </h3>
              <p className="text-xs text-[#707881]">
                Reorder, configure semantic tags, or modify prompt logic.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#eaedff] text-[#006194] font-mono text-xs font-bold">
              {sections.length} Sections
            </span>
          </div>

          {/* Section Stack */}
          <div className="space-y-3">
            {sections.map((sec, idx) => (
              <div
                key={sec.id}
                className={`rounded-2xl p-4 sm:p-5 border shadow-sm relative overflow-hidden transition-all ${
                  sec.id === 'sec-4'
                    ? 'bg-[#fff8f7] border-[#ffdad6]'
                    : 'bg-white border-[#eaedff]'
                }`}
              >
                {/* Left accent border */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    sec.id === 'sec-4'
                      ? 'bg-[#ba1a1a]'
                      : sec.isLocked
                      ? 'bg-[#707881]'
                      : 'bg-[#006194]'
                  }`}
                />

                <div className="flex items-start justify-between gap-2 mb-2 pl-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                        sec.id === 'sec-4'
                          ? 'bg-[#ba1a1a] text-white'
                          : 'bg-[#eaedff] text-[#006194]'
                      }`}
                    >
                      {sec.orderNum}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm sm:text-base text-[#131b2e] truncate">
                        {sec.title}
                      </h4>
                      {sec.badgeLabel && (
                        <span className={`text-[11px] font-semibold block ${sec.badgeColor}`}>
                          {sec.badgeLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {sec.isLocked ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#faf8ff] text-[#707881] text-xs font-bold border border-[#eaedff]">
                        <Icon name="lock" className="text-[13px]" />
                        Mandatory
                      </span>
                    ) : (
                      <div className="flex items-center gap-1 bg-[#faf8ff] rounded-lg p-0.5 border border-[#eaedff]">
                        <button
                          type="button"
                          aria-label="Move up"
                          onClick={() => moveUp(idx)}
                          disabled={idx === 0 || sections[idx - 1]?.isLocked}
                          className="w-7 h-7 flex items-center justify-center rounded text-[#707881] hover:text-[#006194] disabled:opacity-30"
                        >
                          <Icon name="arrow_upward" className="text-[16px]" />
                        </button>
                        <button
                          type="button"
                          aria-label="Move down"
                          onClick={() => moveDown(idx)}
                          disabled={idx >= sections.length - 1 || sections[idx + 1]?.isLocked}
                          className="w-7 h-7 flex items-center justify-center rounded text-[#707881] hover:text-[#006194] disabled:opacity-30"
                        >
                          <Icon name="arrow_downward" className="text-[16px]" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pl-9 space-y-2.5">
                  <p className="text-xs text-[#707881] leading-relaxed">{sec.description}</p>

                  {/* AI Prompt Directives Box (if present) */}
                  {sec.promptDirective && (
                    <div className="bg-[#faf8ff] rounded-xl p-3 border border-[#eaedff] space-y-1">
                      <div className="flex items-center gap-1.5 text-[#006194]">
                        <Icon name="psychology" className="text-[15px]" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          AI Prompt Directive
                        </span>
                      </div>
                      <p className="text-xs text-[#131b2e] italic leading-relaxed">
                        &ldquo;{sec.promptDirective}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {sec.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-[#faf8ff] border border-[#eaedff] text-[#707881] font-mono text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {!sec.isLocked && (
                    <div className="flex items-center justify-between pt-2 border-t border-[#eaedff] text-xs">
                      <span className="font-mono text-[#006a61] flex items-center gap-1 text-[11px]">
                        <Icon name="tune" className="text-[14px]" />
                        {sec.autoCalibrated ? 'Auto-calibrated' : 'Standard Logic'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => showToast(`Editing schema for: ${sec.title}`)}
                          className="px-2.5 py-1 rounded-lg bg-[#faf8ff] hover:bg-[#eaedff] text-[#006194] text-xs font-bold border border-[#eaedff] transition-colors"
                        >
                          Edit Schema
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteSection(sec.id)}
                          className="w-7 h-7 rounded-lg text-[#707881] hover:text-[#ba1a1a] flex items-center justify-center transition-colors"
                          title="Remove section"
                        >
                          <Icon name="delete" className="text-[16px]" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Custom Section Trigger */}
          <button
            type="button"
            onClick={() => setIsAddSectionModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-[#faf8ff] border-2 border-dashed border-[#006194]/30 hover:border-[#006194] text-[#006194] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-2xs"
          >
            <Icon name="add_circle" className="text-[20px]" />
            <span>Add Custom Clinical Section</span>
          </button>
        </section>

        {/* AI Synthesis Directives & Tone Calibration */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#eaedff] text-[#006194] flex items-center justify-center">
                <Icon name="tune" className="text-[18px]" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#131b2e]">
                  Synthesis Calibration
                </h4>
                <span className="text-xs text-[#707881]">Engine Parameter Tuning</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#86f2e4]/30 text-[#006a61] font-mono text-xs font-bold">
              v2.4 Clinical Grade
            </span>
          </div>

          {/* Output Tone Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#131b2e] block">
              Clinical Narrative Tone
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#eaedff]">
              <button
                type="button"
                onClick={() => setNarrativeTone('concise')}
                className={`py-2 px-1 rounded-lg text-xs font-bold text-center transition-all ${
                  narrativeTone === 'concise'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#707881] hover:text-[#131b2e]'
                }`}
              >
                Concise Academic
              </button>
              <button
                type="button"
                onClick={() => setNarrativeTone('descriptive')}
                className={`py-2 px-1 rounded-lg text-xs font-bold text-center transition-all ${
                  narrativeTone === 'descriptive'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#707881] hover:text-[#131b2e]'
                }`}
              >
                Descriptive Detail
              </button>
              <button
                type="button"
                onClick={() => setNarrativeTone('plain')}
                className={`py-2 px-1 rounded-lg text-xs font-bold text-center transition-all ${
                  narrativeTone === 'plain'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#707881] hover:text-[#131b2e]'
                }`}
              >
                Plain-Language
              </button>
            </div>
          </div>

          {/* Minimum Confidence Score Gate */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#131b2e]">Diagnostic Confidence Threshold</span>
              <span className="font-mono font-bold text-[#006194]">{confidenceGate}% Minimal</span>
            </div>
            <input
              type="range"
              min="70"
              max="98"
              value={confidenceGate}
              onChange={(e) => setConfidenceGate(Number(e.target.value))}
              className="w-full accent-[#006194] h-2 bg-[#eaedff] rounded-lg cursor-pointer"
            />
            <div className="flex items-center justify-between text-[#707881] text-[11px]">
              <span>70% Standard</span>
              <span>85% Elevated</span>
              <span className="text-[#006194] font-bold">90% Strict Gate</span>
            </div>
            <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-start gap-2 text-xs">
              <Icon name="verified_user" className="text-[#006a61] text-[16px] shrink-0 mt-0.5" />
              <p className="text-[#707881] leading-relaxed">
                Requires {confidenceGate}%+ diagnostic alignment before recommending invasive restorative procedures.
              </p>
            </div>
          </div>
        </section>

        {/* Statutory Safeguard Warning Card */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm flex items-start gap-3">
          <Icon name="policy" className="text-[#006194] text-[20px] shrink-0 mt-0.5" />
          <p className="text-xs text-[#707881] leading-relaxed">
            <strong className="text-[#131b2e]">Statutory Governance:</strong> Clinic-created templates require secondary electronic verification and signature by the designated Clinic Dental Director before active production rotation.
          </p>
        </section>

        {/* Primary Action Footer Area */}
        <section className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => showToast('Template validated successfully against DHA Schema 2026!')}
            className="w-full h-12 rounded-xl bg-[#006194] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#004e78] transition-colors"
          >
            <span>Preview &amp; Validate Template</span>
            <Icon name="chevron_right" className="text-[20px]" />
          </button>
          <button
            type="button"
            onClick={() => showToast('Template draft saved locally')}
            className="w-full h-11 rounded-xl bg-white border border-[#eaedff] text-[#006194] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#faf8ff] transition-colors shadow-2xs"
          >
            <Icon name="bookmark_border" className="text-[18px]" />
            <span>Save as Draft</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/summaries/templates')}
            className="w-full py-2.5 text-center text-[#707881] font-bold text-xs hover:text-[#131b2e] transition-colors"
          >
            Cancel &amp; Return to Template Library
          </button>
        </section>

        {/* Add Section Modal Dialog */}
        {isAddSectionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-scale-up">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h3 className="font-bold text-base text-[#131b2e]">Add Clinical Section</h3>
                  <p className="text-xs text-[#707881]">Select verified clinical module template</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddSectionModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#faf8ff] flex items-center justify-center text-[#707881]"
                >
                  <Icon name="close" className="text-[18px]" />
                </button>
              </div>

              <div className="space-y-2.5">
                {/* Option 1 */}
                <div
                  onClick={() =>
                    addCustomModule(
                      'Occlusal Analysis & Force Vector Matrix',
                      'Synthesizes canine guidance, group function, and bruxism attrition indices.',
                      ['#Canine-Guidance', '#Bruxism', '#Occlusal-Force']
                    )
                  }
                  className="p-3.5 rounded-xl bg-[#faf8ff] hover:bg-[#eaedff] border border-[#eaedff] transition-colors cursor-pointer flex items-start gap-3"
                >
                  <Icon name="troubleshoot" className="text-[#006194] text-[24px] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-[#131b2e]">
                      Occlusal Analysis &amp; Force Vector Matrix
                    </h4>
                    <p className="text-xs text-[#707881] mt-0.5">
                      Synthesizes canine guidance, group function, and bruxism attrition indices.
                    </p>
                  </div>
                  <Icon name="add" className="text-[#006194] text-[18px] shrink-0 mt-1" />
                </div>

                {/* Option 2 */}
                <div
                  onClick={() =>
                    addCustomModule(
                      'Laboratory Bio-Panel & Salivary pH',
                      'Includes Streptococcus mutans load and buffer capacity metrics.',
                      ['#Salivary-pH', '#Bacterial-Load', '#Buffer-Capacity']
                    )
                  }
                  className="p-3.5 rounded-xl bg-[#faf8ff] hover:bg-[#eaedff] border border-[#eaedff] transition-colors cursor-pointer flex items-start gap-3"
                >
                  <Icon name="biotech" className="text-[#006194] text-[24px] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-[#131b2e]">
                      Laboratory Bio-Panel &amp; Salivary pH
                    </h4>
                    <p className="text-xs text-[#707881] mt-0.5">
                      Includes Streptococcus mutans load and buffer capacity metrics.
                    </p>
                  </div>
                  <Icon name="add" className="text-[#006194] text-[18px] shrink-0 mt-1" />
                </div>

                {/* Option 3 */}
                <div
                  onClick={() =>
                    addCustomModule(
                      'Pediatric Behavioral Index (Frankl Scale)',
                      'Monitors anxiety markers, nitrous compliance, and patient demeanor tags.',
                      ['#Frankl-Scale', '#Anxiety-Marker', '#Nitrous-Compliance']
                    )
                  }
                  className="p-3.5 rounded-xl bg-[#faf8ff] hover:bg-[#eaedff] border border-[#eaedff] transition-colors cursor-pointer flex items-start gap-3"
                >
                  <Icon name="mood" className="text-[#006194] text-[24px] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-[#131b2e]">
                      Pediatric Behavioral Index (Frankl Scale)
                    </h4>
                    <p className="text-xs text-[#707881] mt-0.5">
                      Monitors anxiety markers, nitrous compliance, and patient demeanor tags.
                    </p>
                  </div>
                  <Icon name="add" className="text-[#006194] text-[18px] shrink-0 mt-1" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SummaryShell>
  );
}
