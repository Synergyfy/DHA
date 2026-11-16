import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

interface ToothPeriodontalData {
  fdi: string;
  name: string;
  depths: {
    db: number;
    b: number;
    mb: number;
    dp: number;
    p: number;
    mp: number;
  };
  bop: {
    db: boolean;
    b: boolean;
    mb: boolean;
    dp: boolean;
    p: boolean;
    mp: boolean;
  };
  recession: {
    mb: number;
  };
}

const teethQ1: ToothPeriodontalData[] = [
  { fdi: '18', name: 'UR 3rd Molar', depths: { db: 3, b: 2, mb: 3, dp: 3, p: 2, mp: 3 }, bop: { db: false, b: false, mb: false, dp: false, p: false, mp: false }, recession: { mb: 0 } },
  { fdi: '17', name: 'UR 2nd Molar', depths: { db: 3, b: 2, mb: 3, dp: 3, p: 2, mp: 3 }, bop: { db: false, b: false, mb: false, dp: false, p: false, mp: false }, recession: { mb: 0 } },
  { fdi: '16', name: 'UR 1st Molar', depths: { db: 3, b: 2, mb: 4, dp: 3, p: 2, mp: 3 }, bop: { db: true, b: false, mb: true, dp: false, p: false, mp: true }, recession: { mb: 1 } },
  { fdi: '15', name: 'UR 2nd Premolar', depths: { db: 2, b: 2, mb: 2, dp: 2, p: 2, mp: 2 }, bop: { db: false, b: false, mb: false, dp: false, p: false, mp: false }, recession: { mb: 0 } },
  { fdi: '14', name: 'UR 1st Premolar', depths: { db: 3, b: 2, mb: 2, dp: 2, p: 2, mp: 2 }, bop: { db: false, b: false, mb: false, dp: false, p: false, mp: false }, recession: { mb: 0 } },
  { fdi: '13', name: 'UR Canine', depths: { db: 2, b: 2, mb: 2, dp: 2, p: 2, mp: 2 }, bop: { db: false, b: false, mb: false, dp: false, p: false, mp: false }, recession: { mb: 0 } },
  { fdi: '12', name: 'UR Lateral', depths: { db: 2, b: 2, mb: 2, dp: 2, p: 2, mp: 2 }, bop: { db: false, b: false, mb: false, dp: false, p: false, mp: false }, recession: { mb: 0 } },
  { fdi: '11', name: 'UR Central', depths: { db: 2, b: 2, mb: 2, dp: 2, p: 2, mp: 2 }, bop: { db: false, b: false, mb: false, dp: false, p: false, mp: false }, recession: { mb: 0 } },
];

export function PeriodontalExaminationScreen() {
  const navigate = useNavigate();
  const [tabMode, setTabMode] = useState<'bpe' | 'detailed'>('detailed');
  const [selectedToothFdi, setSelectedToothFdi] = useState<string>('16');
  const [selectedSite, setSelectedSite] = useState<'mb' | 'b' | 'db' | 'mp' | 'p' | 'dp'>('mb');
  const [bopActive, setBopActive] = useState<boolean>(true);
  const [suppurationActive, setSuppurationActive] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedTooth = teethQ1.find((t) => t.fdi === selectedToothFdi) || teethQ1[2];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <ExaminationShell
      pageTitle="Periodontal Examination"
      badgeCode="10.8"
      badgeLabel="Module 4 of 8"
      currentStep="Module 4: 6-Point Periodontal & BPE Probing"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Top Context Subheader */}
        <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm border border-outline-variant/30 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-primary uppercase tracking-wider">Module 4 of 8 • DHA Section 10</span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-surface-container-high px-2 py-0.5 rounded-full font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span>Full Periodontal Charting</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-sm sm:text-base text-on-surface">Periodontal Assessment & Probing</span>
            <span className="text-outline">Attending: Dr. Daniel James</span>
          </div>
        </section>

        {/* Mode Segmented Tab Selector */}
        <div className="bg-surface-container p-1 rounded-2xl flex items-center">
          <button
            type="button"
            onClick={() => setTabMode('bpe')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tabMode === 'bpe'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            BPE / PSR Triage Matrix
          </button>
          <button
            type="button"
            onClick={() => setTabMode('detailed')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tabMode === 'detailed'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Detailed 6-Point Site Chart
          </button>
        </div>

        {/* Section A: Clinical Periodontal Overview */}
        <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 shadow-sm border border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Icon name="clinical_notes" className="text-primary text-base" />
              <span className="font-bold text-on-surface text-sm">Clinical Periodontal Overview</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant">
              Baseline Verified
            </span>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            Localized marginal gingivitis observed. Moderate supragingival and subgingival calculus deposits isolated in mandibular lingual region.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-surface-container-lowest/80 flex items-center justify-between">
              <span className="text-outline text-[11px]">Furcation Status:</span>
              <span className="font-bold text-on-surface">Grade 0 <span className="font-normal text-outline text-[10px]">(None)</span></span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-lowest/80 flex items-center justify-between">
              <span className="text-outline text-[11px]">Mobility Grade:</span>
              <span className="font-bold text-on-surface">Grade 0 <span className="font-normal text-outline text-[10px]">(All Quads)</span></span>
            </div>
          </div>
        </div>

        {tabMode === 'detailed' ? (
          <>
            {/* Tooth Selector (Q1) */}
            <section className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-on-surface">
                  <Icon name="dentistry" className="text-secondary text-base" />
                  <span>Tooth Navigator (Maxillary Right — Quadrant 1)</span>
                </div>
                <span className="font-mono text-primary font-bold">FDI Notation</span>
              </div>

              {/* Scrollable Tooth Matrix Carousel */}
              <div className="overflow-x-auto pb-1 flex gap-2">
                {teethQ1.map((t) => {
                  const isSelected = t.fdi === selectedToothFdi;
                  const hasWarning = t.fdi === '16';
                  return (
                    <button
                      key={t.fdi}
                      type="button"
                      onClick={() => setSelectedToothFdi(t.fdi)}
                      className={`shrink-0 w-14 h-16 rounded-2xl flex flex-col items-center justify-center p-1.5 transition-all ${
                        isSelected
                          ? 'bg-primary text-on-primary shadow-md scale-105 ring-2 ring-primary/40'
                          : 'bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 text-on-surface'
                      }`}
                    >
                      <span className="font-mono text-xs font-bold">#{t.fdi}</span>
                      <span className={`text-[11px] font-semibold mt-0.5 ${isSelected ? 'text-white' : 'text-outline'}`}>
                        {hasWarning ? '4mm*' : `${t.depths.mb}mm`}
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        {hasWarning && <span className="w-1.5 h-1.5 rounded-full bg-error" />}
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Active Tooth Workspace (#16) */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-mono font-bold text-base">
                    {selectedTooth.fdi}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-on-surface">{selectedTooth.name}</h3>
                    <span className="text-xs text-outline">Upper Right Quadrant • Multi-rooted Molar</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-error bg-error-container px-2.5 py-1 rounded-full font-bold">
                  <Icon name="warning" className="text-xs" />
                  <span>MB 4mm Pockets</span>
                </span>
              </div>

              {/* 6-Site Grid: Facial / Buccal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-primary text-[11px]">Facial / Buccal Sites</span>
                  <span className="font-mono text-outline text-[10px]">Depth • Bleed • Recess • CAL</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  {/* Disto-Buccal */}
                  <div
                    onClick={() => setSelectedSite('db')}
                    className={`p-3 rounded-xl flex flex-col items-center text-center cursor-pointer border transition-all ${
                      selectedSite === 'db' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'bg-surface-container-low border-transparent'
                    }`}
                  >
                    <span className="text-outline font-semibold text-[11px]">Disto-Buccal</span>
                    <div className="flex items-center gap-1.5 my-1">
                      <span className="font-bold text-base text-on-surface">3<span className="text-xs font-normal text-outline">mm</span></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-error" title="Bleeding on Probing (+)" />
                    </div>
                    <div className="flex items-center justify-between w-full font-mono text-[10px] text-outline mt-1 pt-1 border-t border-outline-variant/20">
                      <span>Rec: 0</span>
                      <span className="font-bold text-on-surface">CAL: 3</span>
                    </div>
                  </div>

                  {/* Mid-Buccal */}
                  <div
                    onClick={() => setSelectedSite('b')}
                    className={`p-3 rounded-xl flex flex-col items-center text-center cursor-pointer border transition-all ${
                      selectedSite === 'b' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'bg-surface-container-low border-transparent'
                    }`}
                  >
                    <span className="text-outline font-semibold text-[11px]">Mid-Buccal</span>
                    <div className="flex items-center gap-1.5 my-1">
                      <span className="font-bold text-base text-on-surface">2<span className="text-xs font-normal text-outline">mm</span></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest" title="No Bleeding" />
                    </div>
                    <div className="flex items-center justify-between w-full font-mono text-[10px] text-outline mt-1 pt-1 border-t border-outline-variant/20">
                      <span>Rec: 0</span>
                      <span className="font-bold text-on-surface">CAL: 2</span>
                    </div>
                  </div>

                  {/* Mesio-Buccal (Flagged) */}
                  <div
                    onClick={() => setSelectedSite('mb')}
                    className={`p-3 rounded-xl flex flex-col items-center text-center cursor-pointer border transition-all ${
                      selectedSite === 'mb' ? 'border-error bg-error-container/40 ring-1 ring-error' : 'bg-error-container/20 border-error/30'
                    }`}
                  >
                    <span className="text-error font-bold text-[11px]">Mesio-Buccal</span>
                    <div className="flex items-center gap-1.5 my-1">
                      <span className="font-bold text-base text-error">4<span className="text-xs font-normal">mm</span></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-error" title="Bleeding on Probing (+)" />
                    </div>
                    <div className="flex items-center justify-between w-full font-mono text-[10px] text-error mt-1 pt-1 border-t border-error/30 font-bold">
                      <span>Rec: 1</span>
                      <span>CAL: 5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6-Site Grid: Lingual / Palatal */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-secondary text-[11px]">Lingual / Palatal Sites</span>
                  <span className="font-mono text-outline text-[10px]">Depth • Bleed • Recess • CAL</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  {/* Disto-Palatal */}
                  <div
                    onClick={() => setSelectedSite('dp')}
                    className={`p-3 rounded-xl flex flex-col items-center text-center cursor-pointer border transition-all ${
                      selectedSite === 'dp' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'bg-surface-container-low border-transparent'
                    }`}
                  >
                    <span className="text-outline font-semibold text-[11px]">Disto-Palatal</span>
                    <div className="flex items-center gap-1.5 my-1">
                      <span className="font-bold text-base text-on-surface">3<span className="text-xs font-normal text-outline">mm</span></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest" />
                    </div>
                    <div className="flex items-center justify-between w-full font-mono text-[10px] text-outline mt-1 pt-1 border-t border-outline-variant/20">
                      <span>Rec: 0</span>
                      <span className="font-bold text-on-surface">CAL: 3</span>
                    </div>
                  </div>

                  {/* Mid-Palatal */}
                  <div
                    onClick={() => setSelectedSite('p')}
                    className={`p-3 rounded-xl flex flex-col items-center text-center cursor-pointer border transition-all ${
                      selectedSite === 'p' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'bg-surface-container-low border-transparent'
                    }`}
                  >
                    <span className="text-outline font-semibold text-[11px]">Mid-Palatal</span>
                    <div className="flex items-center gap-1.5 my-1">
                      <span className="font-bold text-base text-on-surface">2<span className="text-xs font-normal text-outline">mm</span></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest" />
                    </div>
                    <div className="flex items-center justify-between w-full font-mono text-[10px] text-outline mt-1 pt-1 border-t border-outline-variant/20">
                      <span>Rec: 0</span>
                      <span className="font-bold text-on-surface">CAL: 2</span>
                    </div>
                  </div>

                  {/* Mesio-Palatal */}
                  <div
                    onClick={() => setSelectedSite('mp')}
                    className={`p-3 rounded-xl flex flex-col items-center text-center cursor-pointer border transition-all ${
                      selectedSite === 'mp' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'bg-surface-container-low border-transparent'
                    }`}
                  >
                    <span className="text-outline font-semibold text-[11px]">Mesio-Palatal</span>
                    <div className="flex items-center gap-1.5 my-1">
                      <span className="font-bold text-base text-on-surface">3<span className="text-xs font-normal text-outline">mm</span></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-error" />
                    </div>
                    <div className="flex items-center justify-between w-full font-mono text-[10px] text-outline mt-1 pt-1 border-t border-outline-variant/20">
                      <span>Rec: 0</span>
                      <span className="font-bold text-on-surface">CAL: 3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Probing Measurement Keypad (1 to 9+ mm) */}
              <div className="p-3.5 bg-surface-container-low rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-on-surface">Quick Probing Measurement Pad</span>
                  <span className="font-mono text-primary font-bold uppercase text-[11px]">Target: {selectedSite.toUpperCase()}</span>
                </div>

                <div className="grid grid-cols-9 gap-1 text-xs font-bold">
                  {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => showToast(`Set ${selectedSite.toUpperCase()} depth to ${num}mm`)}
                      className={`h-9 rounded-lg transition-colors flex items-center justify-center ${
                        num === 4
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container-lowest text-on-surface hover:bg-primary-fixed'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                {/* Clinical Feature Toggles */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setBopActive(!bopActive)}
                    className={`flex items-center justify-between p-2 rounded-xl border transition-colors ${
                      bopActive
                        ? 'bg-error-container text-on-error-container border-error/30'
                        : 'bg-surface-container-lowest text-outline border-outline-variant/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${bopActive ? 'bg-error' : 'bg-surface-container-highest'}`} />
                      <span className="font-bold">BOP (Bleeding)</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold">{bopActive ? 'ACTIVE' : 'NONE'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSuppurationActive(!suppurationActive)}
                    className={`flex items-center justify-between p-2 rounded-xl border transition-colors ${
                      suppurationActive
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-surface-container-lowest text-outline border-outline-variant/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${suppurationActive ? 'bg-amber-600' : 'bg-surface-container-highest'}`} />
                      <span className="font-semibold">Suppuration (PUS)</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold">{suppurationActive ? 'ACTIVE' : 'NONE'}</span>
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* BPE / PSR Triage Matrix */
          <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base text-on-surface">Basic Periodontal Examination (BPE) Sextant Matrix</h3>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                WHO Probe Standard
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-error-container/30 border border-error/30">
                <span className="text-[10px] uppercase font-bold text-error block">Sextant 1 (UR 17-14)</span>
                <span className="text-2xl font-black text-error font-mono mt-1 block">3*</span>
                <span className="text-[11px] text-on-surface-variant font-medium">Pocket 4mm + Furcation flag</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Sextant 2 (Anterior 13-23)</span>
                <span className="text-2xl font-black text-secondary font-mono mt-1 block">2</span>
                <span className="text-[11px] text-on-surface-variant font-medium">Calculus present, no pockets &gt;3.5mm</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Sextant 3 (UL 24-27)</span>
                <span className="text-2xl font-black text-secondary font-mono mt-1 block">2</span>
                <span className="text-[11px] text-on-surface-variant font-medium">Calculus present</span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Sextant 6 (LR 47-44)</span>
                <span className="text-2xl font-black text-secondary font-mono mt-1 block">2</span>
                <span className="text-[11px] text-on-surface-variant font-medium">Subgingival calculus</span>
              </div>
              <div className="p-4 rounded-2xl bg-error-container/30 border border-error/30">
                <span className="text-[10px] uppercase font-bold text-error block">Sextant 5 (Anterior 43-33)</span>
                <span className="text-2xl font-black text-error font-mono mt-1 block">3</span>
                <span className="text-[11px] text-on-surface-variant font-medium">Pockets 4mm, bleeding</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Sextant 4 (LL 34-37)</span>
                <span className="text-2xl font-black text-secondary font-mono mt-1 block">2</span>
                <span className="text-[11px] text-on-surface-variant font-medium">No deep pockets</span>
              </div>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant leading-relaxed">
              <strong>BPE Code 3 Clinical Protocol:</strong> Requires detailed 6-point pocket charting in affected sextants (Sextants 1 & 5) and focused oral hygiene scaling and root surface debridement.
            </div>
          </section>
        )}

        {/* Overall Periodontal Index Metrics Card */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-sm text-on-surface">Overall Periodontal Diagnostic Indices</span>
            <span className="text-secondary font-semibold">Nigeria Health Information Exchange Standardized</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-surface-container-low">
              <span className="text-outline text-[11px] uppercase font-semibold">Mean Depth</span>
              <div className="text-lg font-extrabold text-on-surface mt-0.5">2.4 mm</div>
              <span className="text-[10px] text-secondary font-medium">Normal ≤ 3mm</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low">
              <span className="text-outline text-[11px] uppercase font-semibold">BOP Score</span>
              <div className="text-lg font-extrabold text-error mt-0.5">18%</div>
              <span className="text-[10px] text-error font-medium">Gingival Bleed</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low">
              <span className="text-outline text-[11px] uppercase font-semibold">Plaque Index</span>
              <div className="text-lg font-extrabold text-amber-600 mt-0.5">22%</div>
              <span className="text-[10px] text-amber-600 font-medium">Fair Control</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low">
              <span className="text-outline text-[11px] uppercase font-semibold">Triage Grade</span>
              <div className="text-lg font-extrabold text-primary mt-0.5">Stage II</div>
              <span className="text-[10px] text-primary font-medium">Localized Grade A</span>
            </div>
          </div>
        </section>

        {/* Action CTAs */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => navigate('/odontogram/overview')}
            className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            <span>Proceed to Section 9: Dental Odontogram</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => showToast('Periodontal charting locked and draft saved.')}
              className="h-10 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="save" className="text-sm text-primary" />
              <span>Save Progress</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/examination/workspace')}
              className="h-10 bg-surface-container-low hover:bg-surface-container text-on-surface-variant rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="arrow_back" className="text-sm" />
              <span>Workspace</span>
            </button>
          </div>
        </div>
      </div>
    </ExaminationShell>
  );
}
export default PeriodontalExaminationScreen;

