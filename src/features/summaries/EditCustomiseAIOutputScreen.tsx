import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

interface SectionBlock {
  id: string;
  order: number;
  title: string;
  origin: 'ai' | 'dentist' | 'locked';
  originLabel: string;
  content: string;
  lastModified?: string;
  isLocked?: boolean;
  citationPills?: string[];
}

const initialSections: SectionBlock[] = [
  {
    id: 'section-1',
    order: 1,
    title: 'Patient Overview & Chief Complaint',
    origin: 'dentist',
    originLabel: 'Dentist Edited',
    content:
      '34-year-old female presents with mild transient cold sensitivity on upper right quadrant (< 5s duration). No spontaneous or nocturnal pain. Patient notes symptoms began approximately 10 days ago following chilled beverage consumption.',
    lastModified: '2m ago by Dr. James',
  },
  {
    id: 'section-2',
    order: 2,
    title: 'Odontogram & Investigation Synthesis',
    origin: 'ai',
    originLabel: 'AI-Generated',
    content:
      'Coronal radiolucency on Tooth #16 mesio-occlusal extending into middle 1/3 of dentin. Preserved 2.1mm protective dentin bridge verified on bitewing. Normal lamina dura without apical pathology. Antagonist #46 composite restoration sound.',
    lastModified: '10m ago by AI Engine',
    citationPills: ['Bitewing R-BW-2026-88', 'FDI #16 (UR6)', '2.1mm Bridge'],
  },
  {
    id: 'section-3',
    order: 3,
    title: 'Clinical Diagnostic Formulation',
    origin: 'ai',
    originLabel: 'AI-Generated',
    content:
      'ICD-10 K02.62 (Caries of Dentin) with associated Reversible Pulpitis. Favorable prognosis under direct biomimetic resin composite restoration. Recommend 6-month preventative recare and occlusal monitoring.',
    lastModified: '10m ago by AI Engine',
    citationPills: ['ICD-10: K02.62', 'Prognosis: Favorable (Grade A)'],
  },
  {
    id: 'section-4',
    order: 4,
    title: 'Statutory Safeguards & Allergies (Locked)',
    origin: 'locked',
    originLabel: 'Locked Safeguard',
    content:
      'CRITICAL: Severe Penicillin Allergy recorded. Beta-lactam antibiotics strictly contraindicated. Post-operative management restricted to Paracetamol/Ibuprofen or Clindamycin if surgical complications arise.',
    isLocked: true,
  },
];

export function EditCustomiseAIOutputScreen() {
  const navigate = useNavigate();
  const [docTitle, setDocTitle] = useState(
    'Comprehensive Oral-Health Clinical Summary - Tooth #16 Caries & Preventative Recare'
  );
  const [sections, setSections] = useState<SectionBlock[]>(initialSections);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleContentChange = (id: string, newText: string) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === id
          ? {
              ...sec,
              content: newText,
              origin: 'dentist',
              originLabel: 'Dentist Edited',
              lastModified: 'Just now by Dr. James',
            }
          : sec
      )
    );
  };

  const moveUp = (index: number) => {
    if (index <= 0) return;
    const target = sections[index];
    const prev = sections[index - 1];
    if (target.isLocked || prev.isLocked) return;

    const updated = [...sections];
    updated[index - 1] = target;
    updated[index] = prev;
    setSections(updated);
    showToast('Section order resequenced.');
  };

  const moveDown = (index: number) => {
    if (index >= sections.length - 1) return;
    const target = sections[index];
    const next = sections[index + 1];
    if (target.isLocked || next.isLocked) return;

    const updated = [...sections];
    updated[index + 1] = target;
    updated[index] = next;
    setSections(updated);
    showToast('Section order resequenced.');
  };

  const deleteSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    showToast('Section removed from clinical draft.');
  };

  const triggerRegen = (id: string) => {
    showToast('AI regenerating clinical formulation...');
    setTimeout(() => {
      setSections((prev) =>
        prev.map((sec) =>
          sec.id === id
            ? {
                ...sec,
                origin: 'ai',
                originLabel: 'AI-Generated',
                lastModified: 'Just regenerated with bitewing precision',
              }
            : sec
        )
      );
      showToast('Synthesis updated with enhanced precision.');
    }, 800);
  };

  const addCustomSection = () => {
    const newId = `section-custom-${Date.now()}`;
    const newSec: SectionBlock = {
      id: newId,
      order: sections.length,
      title: 'Custom Specialist Note',
      origin: 'dentist',
      originLabel: 'Manual Entry',
      content: 'Enter supplementary diagnostic notes, occlusion impressions, or referral remarks...',
      lastModified: 'Created just now',
    };

    // Insert before the locked safeguard
    const lockedIdx = sections.findIndex((s) => s.isLocked);
    if (lockedIdx !== -1) {
      const copy = [...sections];
      copy.splice(lockedIdx, 0, newSec);
      setSections(copy);
    } else {
      setSections((prev) => [...prev, newSec]);
    }
    showToast('Custom section appended.');
  };

  return (
    <SummaryShell
      pageTitle="Edit & Customise AI Output"
      badgeCode="12.12"
      badgeLabel="Transcription & Customisation"
      currentStep="Edit Output"
    >
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-white/10 animate-fade-in">
            <Icon name="check_circle" className="text-emerald-400 text-[18px]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Patient Context Ribbon */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#eaedff] text-[#006194] flex items-center justify-center font-bold text-sm shrink-0">
              AO
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-[#131b2e]">Amara Okafor</span>
                <span className="text-xs text-[#707881]">34y F • DHA-2026-00451</span>
              </div>
              <span className="text-xs text-[#006194] flex items-center gap-1 font-medium mt-0.5">
                <Icon name="verified_user" className="text-[13px]" />
                Dr. Daniel James (#DEN-48912)
              </span>
            </div>
          </div>
          <span className="bg-[#f2f3ff] text-[#707881] font-mono text-xs px-2.5 py-1 rounded-full self-start sm:self-auto">
            Draft v1.0
          </span>
        </section>

        {/* Document Meta & Title Input Card */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#006194]">
              Document Title
            </span>
            <span className="bg-[#eaedff] text-[#006194] text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Icon name="edit" className="text-[12px]" />
              Editable Draft
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              className="w-full bg-[#faf8ff] text-[#131b2e] font-bold text-sm sm:text-base px-4 py-3 rounded-xl border border-[#eaedff] outline-none focus:border-[#006194] focus:bg-white transition-all pr-10"
            />
            <Icon
              name="edit_note"
              className="text-[#707881] absolute right-3 top-1/2 -translate-y-1/2 text-[20px]"
            />
          </div>

          {/* Visual Origin Legend */}
          <div className="bg-[#faf8ff] rounded-xl p-3 flex flex-wrap gap-2 items-center justify-between text-xs">
            <span className="text-[#707881] font-medium">Provenance:</span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white text-[#006194] shadow-2xs border border-[#eaedff] px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#006194]" />
                AI-Generated
              </span>
              <span className="bg-white text-[#006a61] shadow-2xs border border-[#eaedff] px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#006a61]" />
                Dentist Edited
              </span>
              <span className="bg-[#eaedff] text-[#131b2e] px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#707881]" />
                Verified Safe
              </span>
            </div>
          </div>
        </section>

        {/* Reordering Section Cards Container */}
        <section className="space-y-4">
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className={`rounded-2xl border shadow-sm overflow-hidden transition-all duration-200 ${
                sec.isLocked
                  ? 'bg-[#fff8f7] border-[#ffdad6]'
                  : 'bg-white border-[#eaedff]'
              }`}
            >
              {/* Section Header */}
              <div
                className={`p-3.5 sm:p-4 flex items-center justify-between gap-2 border-b ${
                  sec.isLocked
                    ? 'bg-[#ffdad6]/40 border-[#ffdad6]'
                    : 'bg-[#faf8ff] border-[#eaedff]'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {!sec.isLocked ? (
                    <div className="text-[#707881] cursor-grab">
                      <Icon name="drag_indicator" className="text-[18px]" />
                    </div>
                  ) : (
                    <Icon name="lock" className="text-[#ba1a1a] text-[18px]" />
                  )}
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-full font-mono text-xs flex items-center justify-center shrink-0 font-bold ${
                        sec.isLocked
                          ? 'bg-[#ba1a1a] text-white'
                          : 'bg-[#eaedff] text-[#006194]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`text-sm font-bold truncate ${
                        sec.isLocked ? 'text-[#ba1a1a]' : 'text-[#131b2e]'
                      }`}
                    >
                      {sec.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      sec.isLocked
                        ? 'bg-[#ba1a1a] text-white'
                        : sec.origin === 'dentist'
                        ? 'bg-[#86f2e4] text-[#006a61]'
                        : 'bg-[#eaedff] text-[#006194]'
                    }`}
                  >
                    <Icon
                      name={
                        sec.isLocked
                          ? 'security'
                          : sec.origin === 'dentist'
                          ? 'history_edu'
                          : 'auto_awesome'
                      }
                      className="text-[12px]"
                    />
                    {sec.originLabel}
                  </span>

                  {!sec.isLocked && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-label="Move Up"
                        onClick={() => moveUp(idx)}
                        disabled={idx === 0}
                        className="w-7 h-7 rounded-md bg-white border border-[#eaedff] flex items-center justify-center text-[#707881] hover:bg-[#f2f3ff] disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Icon name="arrow_upward" className="text-[14px]" />
                      </button>
                      <button
                        type="button"
                        aria-label="Move Down"
                        onClick={() => moveDown(idx)}
                        disabled={idx >= sections.length - 2}
                        className="w-7 h-7 rounded-md bg-white border border-[#eaedff] flex items-center justify-center text-[#707881] hover:bg-[#f2f3ff] disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Icon name="arrow_downward" className="text-[14px]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Formatting Toolbar (for editable sections) */}
              {!sec.isLocked && (
                <div className="px-4 py-2 bg-white border-b border-[#eaedff] flex items-center justify-between gap-2 overflow-x-auto">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => showToast('Text formatted')}
                      className="w-7 h-7 rounded bg-[#faf8ff] hover:bg-[#eaedff] text-[#131b2e] flex items-center justify-center"
                      title="Bold"
                    >
                      <Icon name="format_bold" className="text-[15px]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast('Text formatted')}
                      className="w-7 h-7 rounded bg-[#faf8ff] hover:bg-[#eaedff] text-[#131b2e] flex items-center justify-center"
                      title="Italic"
                    >
                      <Icon name="format_italic" className="text-[15px]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast('Bullet point added')}
                      className="w-7 h-7 rounded bg-[#faf8ff] hover:bg-[#eaedff] text-[#131b2e] flex items-center justify-center"
                      title="Bullets"
                    >
                      <Icon name="format_list_bulleted" className="text-[15px]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast('Bitewing R-BW-2026-88 cited')}
                      className="px-2.5 h-7 rounded bg-[#eaedff] text-[#006194] text-[11px] font-bold flex items-center gap-1 hover:bg-[#006194] hover:text-white transition-colors"
                      title="Cite Bitewing"
                    >
                      <Icon name="bookmark_add" className="text-[13px]" />
                      Cite Bitewing
                    </button>
                  </div>
                  <span className="text-[11px] text-[#006a61] font-medium flex items-center gap-1 shrink-0">
                    <Icon name="check" className="text-[13px]" />
                    Saved
                  </span>
                </div>
              )}

              {/* Content Body */}
              <div className="p-4 space-y-3">
                {sec.isLocked ? (
                  <div className="bg-[#ffdad6]/30 rounded-xl p-3.5 text-xs sm:text-sm text-[#410002] leading-relaxed">
                    <strong className="font-bold text-[#ba1a1a]">
                      CRITICAL: Severe Penicillin Allergy recorded.
                    </strong>{' '}
                    Beta-lactam antibiotics strictly contraindicated. Post-operative management restricted to Paracetamol/Ibuprofen or Clindamycin if surgical complications arise.
                    <div className="flex items-center gap-1.5 text-[#707881] text-[11px] mt-2">
                      <Icon name="info" className="text-[13px]" />
                      <span>Clinical safety rule cannot be edited or rearranged. Verified against National Health Records.</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <textarea
                      rows={3}
                      value={sec.content}
                      onChange={(e) => handleContentChange(sec.id, e.target.value)}
                      className="w-full bg-[#faf8ff] rounded-xl p-3.5 text-xs sm:text-sm text-[#131b2e] border border-[#eaedff] focus:outline-none focus:border-[#006194] focus:bg-white leading-relaxed resize-y"
                    />

                    {/* Citation Pills */}
                    {sec.citationPills && sec.citationPills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {sec.citationPills.map((pill, pIdx) => (
                          <span
                            key={pIdx}
                            className="bg-[#faf8ff] text-[#131b2e] border border-[#eaedff] text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs"
                          >
                            <Icon name="verified" className="text-[12px] text-[#006194]" />
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Section Footer Controls */}
              {!sec.isLocked && (
                <div className="p-3 bg-[#faf8ff] border-t border-[#eaedff] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[#707881] text-[11px]">{sec.lastModified}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => triggerRegen(sec.id)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#eaedff] text-[#006194] text-[11px] font-bold flex items-center gap-1 hover:bg-[#eaedff]"
                    >
                      <Icon name="sync" className="text-[13px]" />
                      Regenerate
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteSection(sec.id)}
                      className="px-2.5 py-1 rounded-lg bg-[#ffdad6]/60 text-[#ba1a1a] text-[11px] font-bold flex items-center gap-1 hover:bg-[#ffdad6]"
                    >
                      <Icon name="delete_outline" className="text-[13px]" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Builder Action Toolbar */}
        <section className="space-y-3">
          <button
            type="button"
            onClick={addCustomSection}
            className="w-full h-12 bg-white text-[#006194] font-bold text-sm rounded-xl border border-[#eaedff] shadow-sm flex items-center justify-center gap-2 hover:bg-[#faf8ff] active:scale-[0.99] transition-all"
          >
            <Icon name="add_circle" className="text-[20px]" />
            Add Custom Section (e.g. Occlusal Analysis, Medical Consult)
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsDiffOpen(!isDiffOpen)}
              className={`h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                isDiffOpen
                  ? 'bg-[#006194] text-white'
                  : 'bg-white border border-[#eaedff] text-[#131b2e] hover:bg-[#faf8ff]'
              }`}
            >
              <Icon name="difference" className="text-[18px]" />
              Original AI Diff
            </button>
            <button
              type="button"
              onClick={() => showToast('Integrity Audit: Penicillin check valid • ICD-10 K02.62 compliant.')}
              className="h-11 bg-white border border-[#eaedff] text-[#131b2e] font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#faf8ff] active:scale-[0.99] transition-all"
            >
              <Icon name="fact_check" className="text-[18px] text-[#006a61]" />
              Audit Integrity
            </button>
          </div>
        </section>

        {/* Interactive Diff Panel */}
        {isDiffOpen && (
          <div className="bg-white rounded-2xl p-5 border border-[#006194]/30 shadow-md space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#131b2e] flex items-center gap-2">
                <Icon name="compare_arrows" className="text-[#006194] text-[18px]" />
                AI Synthesis vs. Current Modifications
              </span>
              <button
                type="button"
                onClick={() => setIsDiffOpen(false)}
                className="text-[#707881] hover:text-[#131b2e]"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>

            <div className="bg-[#faf8ff] p-3.5 rounded-xl space-y-2 text-xs">
              <p className="text-[#707881] line-through bg-[#ffdad6]/40 p-2 rounded-lg">
                - Original AI: &quot;34-year-old female presents with mild transient cold sensitivity on upper right quadrant.&quot;
              </p>
              <p className="text-[#006a61] bg-[#86f2e4]/30 p-2 rounded-lg font-medium">
                + Dentist Edited: &quot;34-year-old female presents with mild transient cold sensitivity on upper right quadrant (&lt; 5s duration). No spontaneous or nocturnal pain.&quot;
              </p>
            </div>
            <span className="text-[11px] text-[#707881] block">
              1 insertion, 0 deletions across 4 synthesis nodes.
            </span>
          </div>
        )}

        {/* Bottom Fixed Action Tray */}
        <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md p-4 -mx-4 sm:mx-0 rounded-t-2xl sm:rounded-2xl border-t sm:border border-[#eaedff] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#707881] w-full sm:w-auto">
            <Icon name="history" className="text-[#006194] text-[18px]" />
            <span>Last revision stored in DHA clinical vault</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => showToast('Draft v1.0 saved to clinical vault.')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#c2d1e0] text-[#131b2e] hover:bg-[#f2f3ff] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="save" className="text-[16px]" />
              <span>Save Draft</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/summaries/patient-editor')}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#006194] hover:bg-[#004e78] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#006194]/20 transition-all hover:scale-[1.02]"
            >
              <span>Patient Editor (12.13)</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </button>
          </div>
        </div>
      </div>
    </SummaryShell>
  );
}
