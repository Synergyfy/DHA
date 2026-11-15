import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

interface SynthesisModelOption {
  id: string;
  title: string;
  desc: string;
  badge?: string;
}

const synthesisModels: SynthesisModelOption[] = [
  {
    id: 'comprehensive',
    title: 'Comprehensive Oral-Health Summary',
    desc: 'Synthesizes exam findings, odontogram #16, radiographs, and systemic risk profile into a single diagnostic brief.',
    badge: 'Recommended',
  },
  {
    id: 'general',
    title: 'General Dental Examination Summary',
    desc: 'Focused Section 10 recap highlighting soft tissue, hygiene index, and periodontal pocket baselines.',
  },
  {
    id: 'odontogram',
    title: 'Odontogram Tooth-by-Tooth Summary',
    desc: 'Granular anatomical breakdown of existing restorations, occlusal wear, and current lesions (Section 9).',
  },
  {
    id: 'investigation',
    title: 'Investigation Synthesis',
    desc: 'Correlates periapical radiograph #16 depth markers, bite-wing surveys, and pulp vitality readings.',
  },
  {
    id: 'treatment',
    title: 'Treatment Recommendation Draft',
    desc: 'Clinical justifications, prognosis mapping, and insurance-ready procedure code proposals.',
  },
  {
    id: 'plain_language',
    title: 'Patient-Friendly Plain-Language Explanation',
    desc: 'Translates technical dental terms into a reassuring 6th-grade reading level recap for take-home review.',
  },
  {
    id: 'referral',
    title: 'Referral Summary',
    desc: 'External specialist transfer package formatted for Endodontic or Maxillofacial handover (Section 20).',
  },
];

export function SummaryGenerationConfigScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialModel = searchParams.get('model') || 'comprehensive';

  const [selectedModel, setSelectedModel] = useState<string>(initialModel);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('dha_v2_4');
  const [clinicalNotes, setClinicalNotes] = useState<string>(
    'Focus on Tooth #16 coronal radiolucency depth, evaluate pulp vitality correlation, and highlight penicillin allergy safeguard.'
  );
  const [dateScope, setDateScope] = useState<'current' | '6m' | 'all'>('current');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [pipelineStep, setPipelineStep] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleInsertTag = (tagText: string) => {
    if (!clinicalNotes.includes(tagText)) {
      setClinicalNotes((prev) => (prev ? `${prev}; ${tagText}` : tagText));
    }
  };

  const startGeneration = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationProgress(25);
    setPipelineStep(1);

    setTimeout(() => {
      setGenerationProgress(65);
      setPipelineStep(2);
    }, 1000);

    setTimeout(() => {
      setGenerationProgress(100);
      setPipelineStep(3);
      showToast('Draft successfully generated for Dr. Daniel James.');
      setTimeout(() => {
        setIsGenerating(false);
        navigate('/summaries/workspace');
      }, 1200);
    }, 2200);
  };

  return (
    <SummaryShell
      pageTitle="AI Summary Generator & Config"
      badgeCode="12.4"
      badgeLabel="Step 2 of 3"
      currentStep="Step 2 of 3 · Config"
    >
      <div className="space-y-6">
        {/* Stepper & Context Banner */}
        <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-white border border-[#eaedff]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs">
              2
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                Clinical Synthesis Pipeline
              </span>
              <span className="text-xs font-bold text-[#131b2e]">
                Step 2 of 3 · Configuration &amp; Focus Directives
              </span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#e2e7ff] text-[#006194] text-xs font-mono font-semibold">
            v2.4 Engine
          </span>
        </div>

        {/* Patient Context Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl overflow-hidden bg-[#e2e7ff] shrink-0 ring-2 ring-[#006194]/20 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Amara Okafor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#131b2e]">Amara Okafor</h3>
                  <Icon name="verified" className="text-[#006a61] text-[18px]" />
                </div>
                <div className="text-xs text-[#707881] font-mono mt-0.5">
                  DHA-2026-00451 · Female, 34y
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold">
                Active Encounter
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs bg-[#faf8ff] px-3.5 py-2 rounded-xl border border-[#eaedff]">
            <span className="flex items-center gap-1.5 text-[#3f4850]">
              <Icon name="clinical_notes" className="text-[#006194] text-[16px]" />
              <strong>6 Records</strong> Ingested (Sec 9, 10, 11)
            </span>
            <span className="flex items-center gap-1.5 text-[#ba1a1a] font-bold">
              <Icon name="warning" className="text-[#ba1a1a] text-[16px]" />
              Penicillin Allergy (Severe) Alert Active
            </span>
          </div>
        </div>

        {/* Configuration Form */}
        <form onSubmit={startGeneration} className="space-y-6">
          {/* 1. Model Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
                <Icon name="auto_read_play" className="text-[#006194] text-[18px]" />
                <span>1. Select Synthesis Model</span>
              </label>
              <span className="text-xs text-[#707881]">Required</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {synthesisModels.map((model) => {
                const isChecked = selectedModel === model.id;
                return (
                  <label
                    key={model.id}
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-white border-[#006194] ring-2 ring-[#006194] shadow-xs'
                        : 'bg-[#faf8ff] border-[#eaedff] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="summary_type"
                      value={model.id}
                      checked={isChecked}
                      onChange={() => setSelectedModel(model.id)}
                      className="mt-1 w-4 h-4 accent-[#006194]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={`text-sm font-bold truncate ${
                            isChecked ? 'text-[#006194]' : 'text-[#131b2e]'
                          }`}
                        >
                          {model.title}
                        </span>
                        {model.badge && (
                          <span className="px-2 py-0.5 rounded bg-[#cce5ff] text-[#006194] text-[10px] font-bold">
                            {model.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#707881] leading-relaxed">{model.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 2. Formatting Template */}
          <div className="space-y-2">
            <label
              htmlFor="templateSelect"
              className="text-sm font-bold text-[#131b2e] flex items-center gap-2"
            >
              <Icon name="dataset" className="text-[#006194] text-[18px]" />
              <span>2. Formatting Template</span>
            </label>
            <div className="relative">
              <select
                id="templateSelect"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full h-12 bg-white text-[#131b2e] text-sm font-medium rounded-xl px-4 pr-10 border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-[#006194] appearance-none"
              >
                <option value="dha_v2_4">DHA Standard Comprehensive v2.4 (Default)</option>
                <option value="clinic_restorative">Clinic Custom Restorative Template</option>
                <option value="periodontal_risk">Periodontal Focus &amp; Maintenance Protocol</option>
              </select>
              <Icon
                name="expand_more"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707881] pointer-events-none text-[20px]"
              />
            </div>
          </div>

          {/* 3. Clinical Instructions & Focus */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="clinicalInstructions"
                className="text-sm font-bold text-[#131b2e] flex items-center gap-2"
              >
                <Icon name="edit_note" className="text-[#006194] text-[18px]" />
                <span>3. Clinical Instructions &amp; Focus</span>
              </label>
              <span className="text-xs text-[#006a61] font-semibold flex items-center gap-1">
                <Icon name="bolt" className="text-[14px]" />
                Smart Directives Active
              </span>
            </div>

            {/* Quick-tag pills */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleInsertTag('#16 Coronal Depth Focus')}
                className="px-3 py-1 rounded-full bg-[#f2f3ff] hover:bg-[#cce5ff] text-[#006194] text-xs font-medium transition-colors flex items-center gap-1"
              >
                <Icon name="add" className="text-[14px]" />
                <span>Tooth #16 Focus</span>
              </button>
              <button
                type="button"
                onClick={() => handleInsertTag('Periodontal Status (BPE Grade 2)')}
                className="px-3 py-1 rounded-full bg-[#f2f3ff] hover:bg-[#cce5ff] text-[#006194] text-xs font-medium transition-colors flex items-center gap-1"
              >
                <Icon name="add" className="text-[14px]" />
                <span>Periodontal Status</span>
              </button>
              <button
                type="button"
                onClick={() => handleInsertTag('Highlight severe Penicillin Precaution')}
                className="px-3 py-1 rounded-full bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#ba1a1a] text-xs font-bold transition-colors flex items-center gap-1"
              >
                <Icon name="priority_high" className="text-[14px]" />
                <span>Penicillin Precaution</span>
              </button>
              <button
                type="button"
                onClick={() => handleInsertTag('Next 6-Month Recare Cadence')}
                className="px-3 py-1 rounded-full bg-[#f2f3ff] hover:bg-[#cce5ff] text-[#006194] text-xs font-medium transition-colors flex items-center gap-1"
              >
                <Icon name="add" className="text-[14px]" />
                <span>Next 6-Month Recare</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                id="clinicalInstructions"
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                rows={3}
                placeholder="Provide extra guidance for the AI synthesis..."
                className="w-full bg-white text-[#131b2e] text-sm rounded-xl p-3.5 border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
              />
              <span className="absolute bottom-2.5 right-3 text-[11px] font-mono text-[#707881]">
                {clinicalNotes.length} chars
              </span>
            </div>
          </div>

          {/* 4. Generation Date Scope */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="calendar_month" className="text-[#006194] text-[18px]" />
              <span>4. Clinical Ingestion Window</span>
            </label>
            <div className="grid grid-cols-3 gap-2 bg-[#f2f3ff] p-1.5 rounded-xl border border-[#eaedff]">
              <button
                type="button"
                onClick={() => setDateScope('current')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  dateScope === 'current'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                Current Episode
              </button>
              <button
                type="button"
                onClick={() => setDateScope('6m')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  dateScope === '6m'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                Last 6 Months
              </button>
              <button
                type="button"
                onClick={() => setDateScope('all')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  dateScope === 'all'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                All Historical
              </button>
            </div>
          </div>

          {/* 5. Trigger & Interactive Pipeline */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={isGenerating}
              className={`w-full h-13 rounded-2xl text-white font-bold text-sm sm:text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2.5 ${
                isGenerating
                  ? 'bg-[#007bb9] opacity-80 cursor-wait'
                  : 'bg-[#006194] hover:bg-[#007bb9]'
              }`}
            >
              <Icon
                name={isGenerating ? 'progress_activity' : 'auto_awesome'}
                className={`text-[22px] ${isGenerating ? 'animate-spin' : ''}`}
              />
              <span>{isGenerating ? 'Synthesizing Encounter Data...' : 'Generate AI Summary Draft'}</span>
            </button>

            {/* Simulated Pipeline Banner */}
            {isGenerating && (
              <div className="p-4 bg-[#e2e7ff]/70 border border-[#cce5ff] rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#006194] font-bold">
                    <Icon name="progress_activity" className="text-[16px] animate-spin" />
                    <span>Executing Clinical Co-Pilot Pipeline</span>
                  </div>
                  <span className="font-mono text-[#006194]">{generationProgress}% Complete</span>
                </div>

                <div className="w-full bg-white rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="bg-[#006194] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${generationProgress}%` }}
                  ></div>
                </div>

                <ul className="space-y-1.5 text-xs text-[#3f4850]">
                  <li className="flex items-center gap-2">
                    <Icon
                      name={pipelineStep >= 1 ? 'check_circle' : 'radio_button_unchecked'}
                      className={`text-[16px] ${
                        pipelineStep >= 1 ? 'text-[#006a61]' : 'text-[#707881]'
                      }`}
                    />
                    <span>Synthesizing 6 selected records from Sec 9, 10 &amp; 11...</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      name={pipelineStep >= 2 ? 'check_circle' : 'radio_button_unchecked'}
                      className={`text-[16px] ${
                        pipelineStep >= 2 ? 'text-[#006a61]' : 'text-[#707881]'
                      }`}
                    />
                    <span>Correlating radiographic depth with ICDAS 3/4 score...</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      name={pipelineStep >= 3 ? 'check_circle' : 'radio_button_unchecked'}
                      className={`text-[16px] ${
                        pipelineStep >= 3 ? 'text-[#006a61]' : 'text-[#707881]'
                      }`}
                    />
                    <span>Preparing draft for Dr. Daniel James review...</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Guardrail Notice */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff]">
              <Icon name="verified_user" className="text-[#006a61] text-[20px] shrink-0 mt-0.5" />
              <div className="text-xs text-[#3f4850] space-y-0.5">
                <span className="font-bold text-[#131b2e] block">Clinical Co-Pilot Guardrail</span>
                <p className="leading-relaxed">
                  <strong>AI Prepares · Dentist Reviews · Dentist Approves.</strong> Output is strictly a non-final
                  draft until signed and stamped by the attending practitioner.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/summaries/sources')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#eaedff] hover:bg-[#f2f3ff] text-[#3f4850] text-sm font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => showToast('AI synthesis configuration saved as working draft.')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#eaedff] text-[#006194] hover:bg-[#f2f3ff] text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Icon name="bookmark" className="text-[18px]" />
              <span>Save Config Draft</span>
            </button>
          </div>
        </form>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-4 right-4 max-w-sm mx-auto p-4 bg-[#283044] text-[#eef0ff] rounded-2xl shadow-xl flex items-center justify-between z-50 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-2.5">
              <Icon name="auto_awesome" className="text-[#86f2e4] text-[20px]" />
              <span className="text-xs font-medium">{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-[#bfc7d2] hover:text-white"
            >
              <Icon name="close" className="text-[16px]" />
            </button>
          </div>
        )}
      </div>
    </SummaryShell>
  );
}
