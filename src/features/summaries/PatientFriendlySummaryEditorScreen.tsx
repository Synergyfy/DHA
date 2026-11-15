import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

interface EditorSection {
  id: string;
  num: number;
  title: string;
  text: string;
  sourceBadge: string;
  tagBadge: string;
  jargonBadge?: string;
  isEditing?: boolean;
}

const defaultSections: EditorSection[] = [
  {
    id: 'sec-1',
    num: 1,
    title: 'Your Oral Health Overview',
    text: 'Welcome Amara! Overall, your teeth and gums are in good health, with one specific upper right molar needing attention before it causes pain.',
    sourceBadge: 'CLINICAL SOURCE: Routine Examination #EX-9021',
    tagBadge: 'Patient Verified',
  },
  {
    id: 'sec-2',
    num: 2,
    title: 'What the Dentist Found (Tooth #16)',
    text: 'During your examination and X-ray checkup, Dr. Daniel James found a cavity on the chewing surface of your upper right back tooth (molar #16). The good news is that the cavity has not reached the living nerve inside your tooth, leaving 2.1mm of healthy tooth structure protecting it.',
    sourceBadge: 'IO SENSOR: Bitewing BW-04 (R4)',
    tagBadge: 'Clear of Jargon',
    jargonBadge: 'Translated from: ICD-10 K02.62 Caries of Dentin',
  },
  {
    id: 'sec-3',
    num: 3,
    title: 'What This Means For You',
    text: 'This explains the brief cold sensitivity you felt when having cold drinks. Because we caught this early, you do not need a root canal.',
    sourceBadge: 'SYMPTOM LINK: Thermal sensitivity history',
    tagBadge: 'Reassurance High',
  },
  {
    id: 'sec-4',
    num: 4,
    title: 'Recommended Treatment',
    text: 'A gentle, tooth-colored filling (composite resin) will clean out the decay and seal the tooth tightly. The procedure is comfortable and usually completed in one visit.',
    sourceBadge: 'ESTIMATED TIME: 45 Mins',
    tagBadge: 'Single Appointment',
    jargonBadge: 'CDT Code #D2391 Translated',
  },
  {
    id: 'sec-5',
    num: 5,
    title: 'Your Next Steps & Care Plan',
    text: '1. Schedule your 45-minute filling appointment.\n2. Continue using fluoride toothpaste for your premolar tooth.\n3. Return in 6 months for your routine dental cleaning.',
    sourceBadge: 'AUTO-CALENDAR HOOK: Ready',
    tagBadge: '3 Actions',
  },
];

export function PatientFriendlySummaryEditorScreen() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  const [sections, setSections] = useState<EditorSection[]>(defaultSections);
  const [guardianShare, setGuardianShare] = useState(false);
  const [allowPdf, setAllowPdf] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleEditSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isEditing: !s.isEditing } : s))
    );
  };

  const updateSectionText = (id: string, newText: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, text: newText } : s))
    );
  };

  const regenerateSection = (_id: string) => {
    showToast('AI polishing readability for 6th-grade clarity...');
    setTimeout(() => {
      showToast('Section readability updated successfully.');
    }, 800);
  };

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <SummaryShell
      pageTitle="Patient-Friendly Summary Editor"
      badgeCode="12.13"
      badgeLabel="Patient Translation & Empathy"
      currentStep="Patient Editor"
    >
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-white/10 animate-fade-in">
            <Icon name="check_circle" className="text-emerald-400 text-[18px]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Patient Context Strip */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-[#eaedff] text-[#006194] flex items-center justify-center font-bold text-base">
                AO
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#86f2e4] text-[#006a61] flex items-center justify-center">
                <Icon name="check" className="text-[10px]" />
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm sm:text-base text-[#131b2e] truncate">
                  Amara Okafor
                </h3>
                <span className="text-xs bg-[#f2f3ff] text-[#707881] px-2 py-0.5 rounded-full font-medium">
                  34y Female
                </span>
              </div>
              <span className="text-xs font-mono text-[#707881] truncate block mt-0.5">
                DHA-2026-00451 • Dr. D. James (#DEN-48912)
              </span>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 bg-[#f2f3ff] px-2.5 py-1 rounded-lg">
            <Icon name="verified_user" className="text-[16px] text-[#006a61]" />
            <span className="text-xs font-bold text-[#006a61] uppercase">UK/UAE Standard</span>
          </div>
        </section>

        {/* Mode Switcher Tabs */}
        <div className="bg-[#eaedff] p-1 rounded-2xl flex gap-1 items-center">
          <button
            type="button"
            onClick={() => setViewMode('editor')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              viewMode === 'editor'
                ? 'bg-white text-[#006194] shadow-sm'
                : 'text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="edit_note" className="text-[18px]" />
            <span>Editor Mode</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              viewMode === 'preview'
                ? 'bg-white text-[#006194] shadow-sm'
                : 'text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="visibility" className="text-[18px]" />
            <span>Preview as Amara</span>
          </button>
        </div>

        {/* Readability Score & Empathy Meter */}
        <section className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center">
                <Icon name="sentiment_satisfied" className="text-[20px]" />
              </div>
              <div>
                <span className="font-bold text-sm text-[#131b2e] block leading-tight">
                  Patient Readability Score
                </span>
                <span className="text-xs text-[#707881]">
                  Flesch-Kincaid: 82.4/100 (6th Grade Level)
                </span>
              </div>
            </div>
            <span className="bg-[#86f2e4] text-[#006a61] text-xs font-bold uppercase px-3 py-1 rounded-full">
              Optimal
            </span>
          </div>

          <div className="w-full bg-[#eaedff] rounded-full h-2.5 overflow-hidden">
            <div className="bg-[#006a61] h-full rounded-full transition-all duration-500 w-[82.4%]" />
          </div>

          <div className="flex justify-between items-center text-[11px] text-[#707881] font-medium pt-0.5">
            <span>Dense Medical Jargon</span>
            <span className="text-[#006a61] font-bold">Reassuring &amp; Plain English</span>
            <span>Oversimplified</span>
          </div>
        </section>

        {/* Privacy Shield & Guardrail Banner */}
        <section className="bg-[#faf8ff] rounded-2xl p-4 border border-[#eaedff] flex items-start gap-3">
          <Icon name="shield_lock" className="text-[#006194] text-[22px] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="font-bold text-xs sm:text-sm text-[#131b2e]">
              HIPAA &amp; DHA Clinical Guardrail Active
            </h4>
            <p className="text-xs text-[#707881] leading-relaxed">
              Internal clinical diagnostics, raw DICOM tooth slices, and ICD billing codings are automatically sanitized and hidden from the patient portal view.
            </p>
          </div>
        </section>

        {/* Tooth Visual Snapshot Card */}
        <section className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="dentistry" className="text-[#006194] text-[20px]" />
              <h4 className="font-bold text-sm text-[#131b2e]">Target Area: Tooth #16</h4>
            </div>
            <span className="text-xs bg-[#eaedff] text-[#006194] font-medium px-2.5 py-0.5 rounded-full">
              Upper Right Back Molar
            </span>
          </div>

          {/* Odontogram SVG Graphic */}
          <div className="relative w-full h-32 bg-[#faf8ff] rounded-xl border border-[#eaedff] flex items-center justify-center overflow-hidden p-2">
            <svg className="w-24 h-24 drop-shadow-xs" fill="none" viewBox="0 0 100 100">
              {/* Tooth Root & Crown Outline */}
              <path
                d="M28 20 C24 35, 20 60, 32 88 C36 78, 42 62, 50 62 C58 62, 64 78, 68 88 C80 60, 76 35, 72 20 C64 16, 56 22, 50 18 C44 22, 36 16, 28 20 Z"
                fill="#ffffff"
                stroke="#707881"
                strokeWidth="2"
              />
              {/* Dentin Chamber */}
              <path
                d="M36 30 C34 42, 32 55, 38 72 C41 65, 45 54, 50 54 C55 54, 59 65, 62 72 C68 55, 66 42, 64 30 C58 27, 54 30, 50 28 C46 30, 42 27, 36 30 Z"
                fill="#dae2fd"
                opacity="0.6"
              />
              {/* Healthy Protective Margin (2.1mm) */}
              <circle cx="50" cy="40" fill="#86f2e4" opacity="0.4" r="14" />
              {/* Mild Caries Spot */}
              <circle cx="48" cy="36" fill="#007bb9" opacity="0.8" r="6" />
              {/* Crosshair pointer */}
              <circle
                cx="48"
                cy="36"
                fill="none"
                r="8"
                stroke="#006194"
                strokeDasharray="2 2"
                strokeWidth="1.5"
              />
            </svg>

            {/* Annotations */}
            <div className="absolute right-3 top-2.5 flex flex-col items-end gap-1.5">
              <span className="bg-white text-[#006194] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs border border-[#eaedff]">
                2.1mm Safe Dentin Buffer
              </span>
              <span className="bg-white text-[#006a61] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs border border-[#eaedff]">
                Nerve Intact &amp; Protected
              </span>
            </div>
          </div>
        </section>

        {/* EDITOR MODE CONTAINER */}
        {viewMode === 'editor' && (
          <div className="space-y-4">
            {sections.map((sec) => (
              <div
                key={sec.id}
                className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden"
              >
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#eaedff] text-[#006194] text-xs font-bold flex items-center justify-center">
                        {sec.num}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-[#131b2e]">{sec.title}</h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => regenerateSection(sec.id)}
                        className="w-8 h-8 rounded-lg text-[#707881] hover:bg-[#faf8ff] flex items-center justify-center"
                        title="Regenerate with AI"
                      >
                        <Icon name="auto_awesome" className="text-[18px]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleEditSection(sec.id)}
                        className="w-8 h-8 rounded-lg text-[#006194] hover:bg-[#eaedff] flex items-center justify-center"
                        title="Edit text"
                      >
                        <Icon name="edit" className="text-[18px]" />
                      </button>
                    </div>
                  </div>

                  {sec.jargonBadge && (
                    <div className="bg-[#86f2e4]/30 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs text-[#006a61]">
                      <Icon name="translate" className="text-[15px]" />
                      <span className="font-medium">{sec.jargonBadge}</span>
                    </div>
                  )}

                  {sec.isEditing ? (
                    <textarea
                      rows={3}
                      value={sec.text}
                      onChange={(e) => updateSectionText(sec.id, e.target.value)}
                      className="w-full bg-[#faf8ff] rounded-xl p-3 text-xs sm:text-sm text-[#131b2e] border border-[#006194] focus:outline-none focus:bg-white leading-relaxed resize-y"
                    />
                  ) : (
                    <div className="bg-[#faf8ff] rounded-xl p-3.5 border border-[#eaedff]">
                      <p className="text-xs sm:text-sm text-[#131b2e] leading-relaxed whitespace-pre-line">
                        {sec.text}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-[#707881] pt-1">
                    <span className="flex items-center gap-1 text-[#006a61] font-medium">
                      <Icon name="check_circle" className="text-[14px]" />
                      Tone: Friendly &amp; Reassuring
                    </span>
                    <span>{countWords(sec.text)} words</span>
                  </div>
                </div>

                <div className="bg-[#faf8ff] px-4 py-2 border-t border-[#eaedff] flex items-center justify-between text-xs">
                  <span className="font-mono text-[#707881]">{sec.sourceBadge}</span>
                  <span className="font-semibold text-[#006194]">{sec.tagBadge}</span>
                </div>
              </div>
            ))}

            {/* Permissions & Sharing Toggles */}
            <section className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
              <h4 className="font-bold text-sm text-[#131b2e]">Patient Portal Access &amp; Delivery</h4>

              <div className="flex items-center justify-between py-1">
                <div className="pr-3">
                  <span className="font-medium text-xs sm:text-sm text-[#131b2e] block">
                    Share with Authorized Guardian / Family
                  </span>
                  <span className="text-xs text-[#707881]">Disabled (Autonomous adult patient)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setGuardianShare(!guardianShare)}
                  className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${
                    guardianShare ? 'bg-[#006194]' : 'bg-[#eaedff]'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-xs transition-transform duration-200 ${
                      guardianShare ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-1 border-t border-[#eaedff] pt-2">
                <div className="pr-3">
                  <span className="font-medium text-xs sm:text-sm text-[#131b2e] block">
                    Allow Download as Patient PDF
                  </span>
                  <span className="text-xs text-[#707881]">
                    Generates patient-friendly 1-page printable summary
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAllowPdf(!allowPdf)}
                  className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${
                    allowPdf ? 'bg-[#006194]' : 'bg-[#eaedff]'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-xs transition-transform duration-200 ${
                      allowPdf ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* PREVIEW AS AMARA CONTAINER */}
        {viewMode === 'preview' && (
          <div className="bg-white rounded-2xl p-6 border border-[#eaedff] shadow-sm space-y-5 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#faf8ff] p-4 rounded-xl border border-[#eaedff]">
              <div className="w-12 h-12 rounded-full bg-[#006194] text-white flex items-center justify-center shrink-0">
                <Icon name="dentistry" className="text-[24px]" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#131b2e]">Hello, Amara!</h3>
                <p className="text-xs text-[#707881]">
                  Here is your care summary from your visit with Dr. James
                </p>
              </div>
            </div>

            {/* Sections */}
            {sections.map((sec, idx) => (
              <div key={sec.id} className="space-y-1.5">
                <h4 className="font-bold text-sm sm:text-base text-[#006194]">{sec.title}</h4>
                <p className="text-xs sm:text-sm text-[#131b2e] leading-relaxed whitespace-pre-line">
                  {sec.text}
                </p>
                {idx < sections.length - 1 && <hr className="border-[#eaedff] my-3" />}
              </div>
            ))}
          </div>
        )}

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md p-4 -mx-4 sm:mx-0 rounded-t-2xl sm:rounded-2xl border-t sm:border border-[#eaedff] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#707881] w-full sm:w-auto">
            <Icon name="verified" className="text-[#006a61] text-[18px]" />
            <span>Flesch Score: 82.4 • Plain language verified</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => showToast('Draft safely stored in DHA EHR')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#c2d1e0] text-[#131b2e] hover:bg-[#f2f3ff] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="save" className="text-[16px]" />
              <span>Save Draft</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/summaries/visual-summary')}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#006194] hover:bg-[#004e78] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#006194]/20 transition-all hover:scale-[1.02]"
            >
              <span>Visual Summary (12.14)</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </button>
          </div>
        </div>
      </div>
    </SummaryShell>
  );
}
