import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

interface PalpationSite {
  site: string;
  tenderness: number; // 0 to 3
  status: 'normal' | 'mild' | 'moderate' | 'severe';
}

export function OcclusionAssessmentScreen() {
  const navigate = useNavigate();
  const [rightMolarClass, setRightMolarClass] = useState<'I' | 'II' | 'III'>('I');
  const [leftMolarClass, setLeftMolarClass] = useState<'I' | 'II' | 'III'>('I');
  const [overjet, setOverjet] = useState<number>(2.5);
  const [overbite, setOverbite] = useState<number>(25);
  const [canineGuidance, setCanineGuidance] = useState<'bilateral' | 'group' | 'interference'>('bilateral');
  const [crossbite, setCrossbite] = useState<'none' | 'anterior' | 'posterior'>('none');
  const [maxOpening, setMaxOpening] = useState<number>(46);
  const [rightTmjClick, setRightTmjClick] = useState<boolean>(false);
  const [leftTmjClick, setLeftTmjClick] = useState<boolean>(false);
  const [midlineDeviation, setMidlineDeviation] = useState<'straight' | 'right' | 'left'>('straight');
  const [chewingPattern, setChewingPattern] = useState<'bilateral' | 'unilateral_right' | 'unilateral_left'>('bilateral');
  const [impressionNotes, setImpressionNotes] = useState<string>(
    'Occlusion within normal Class I parameters bilaterally. No pathologic wear, no TMD signs, adequate maximum incisal opening of 46mm. Stable bilateral canine guidance with clean disclusion of posterior segments in protrusive. No occlusal adjustments indicated.'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [palpationSites, setPalpationSites] = useState<PalpationSite[]>([
    { site: 'Masseter (Bilateral)', tenderness: 0, status: 'normal' },
    { site: 'Temporalis Anterior', tenderness: 0, status: 'normal' },
    { site: 'Medial Pterygoid', tenderness: 0, status: 'normal' },
    { site: 'Lateral Pterygoid', tenderness: 0, status: 'normal' },
    { site: 'Sternocleidomastoid', tenderness: 0, status: 'normal' },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTendernessCycle = (index: number) => {
    const updated = [...palpationSites];
    const nextVal = (updated[index].tenderness + 1) % 4;
    updated[index].tenderness = nextVal;
    updated[index].status = nextVal === 0 ? 'normal' : nextVal === 1 ? 'mild' : nextVal === 2 ? 'moderate' : 'severe';
    setPalpationSites(updated);
    showToast(`Updated ${updated[index].site}: ${nextVal}/3`);
  };

  return (
    <ExaminationShell
      pageTitle="Occlusion & Functional Assessment"
      badgeCode="10.9"
      badgeLabel="Module 5 of 8"
      currentStep="Module 5: Occlusion, TMJ & Masticatory Function"
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
            <span className="font-bold text-primary uppercase tracking-wider">Module 5 of 8 • DHA Section 10</span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-surface-container-high px-2 py-0.5 rounded-full font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span>Static & Dynamic Analysis</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-sm sm:text-base text-on-surface">Occlusion, TMJ & Kinematics</span>
            <span className="text-outline">Attending: Dr. Daniel James</span>
          </div>
        </section>

        {/* Clinical Readiness Gauge Banner */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-high"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-secondary"
                  strokeDasharray="94, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-sm font-bold text-on-surface">94%</span>
                <span className="text-[9px] text-on-surface-variant font-mono">HEALTH</span>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-on-surface">Occlusal Stability Profile</h2>
              <p className="text-xs text-on-surface-variant">Class I stable relation with physiological dynamic disclusion</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">
              WNL • Normal Limits
            </span>
          </div>
        </div>

        {/* Panel 1: Bite & Static Occlusion */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Static Inter-arch Occlusion</h3>
                <p className="text-[11px] text-on-surface-variant">Angle's classification and sagittal / vertical relationships</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-mono text-primary font-bold">
              ANGLE CLASS I
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Right Molar Classification */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <span className="text-xs font-semibold text-on-surface-variant">Right Molar Relationship</span>
              <div className="grid grid-cols-3 gap-2">
                {(['I', 'II', 'III'] as const).map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      setRightMolarClass(cls);
                      showToast(`Right Molar set to Class ${cls}`);
                    }}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      rightMolarClass === cls
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                    }`}
                  >
                    Class {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Left Molar Classification */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <span className="text-xs font-semibold text-on-surface-variant">Left Molar Relationship</span>
              <div className="grid grid-cols-3 gap-2">
                {(['I', 'II', 'III'] as const).map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      setLeftMolarClass(cls);
                      showToast(`Left Molar set to Class ${cls}`);
                    }}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      leftMolarClass === cls
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                    }`}
                  >
                    Class {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Overjet Slider/Picker */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-on-surface-variant">Overjet (Horizontal)</span>
                <span className="font-mono font-bold text-primary">{overjet.toFixed(1)} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="0.5"
                value={overjet}
                onChange={(e) => setOverjet(parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-outline font-mono">
                <span>0 mm</span>
                <span className="text-secondary font-bold">2.5 mm (Normal)</span>
                <span>8 mm</span>
              </div>
            </div>

            {/* Overbite Slider/Picker */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-on-surface-variant">Overbite (Vertical Overlap)</span>
                <span className="font-mono font-bold text-primary">{overbite}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={overbite}
                onChange={(e) => setOverbite(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-outline font-mono">
                <span>0% (Edge)</span>
                <span className="text-secondary font-bold">25% (Ideal)</span>
                <span>100% (Deep)</span>
              </div>
            </div>

            {/* Canine Guidance */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <span className="text-xs font-semibold text-on-surface-variant">Canine Disclusion Pattern</span>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setCanineGuidance('bilateral')}
                  className={`py-1.5 px-2 rounded-lg font-bold text-[11px] truncate ${
                    canineGuidance === 'bilateral'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface'
                  }`}
                >
                  Bilateral
                </button>
                <button
                  type="button"
                  onClick={() => setCanineGuidance('group')}
                  className={`py-1.5 px-2 rounded-lg font-bold text-[11px] truncate ${
                    canineGuidance === 'group'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface'
                  }`}
                >
                  Group Function
                </button>
                <button
                  type="button"
                  onClick={() => setCanineGuidance('interference')}
                  className={`py-1.5 px-2 rounded-lg font-bold text-[11px] truncate ${
                    canineGuidance === 'interference'
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface'
                  }`}
                >
                  Interference
                </button>
              </div>
            </div>

            {/* Crossbite Assessment */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <span className="text-xs font-semibold text-on-surface-variant">Crossbite Status</span>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {(['none', 'anterior', 'posterior'] as const).map((cb) => (
                  <button
                    key={cb}
                    type="button"
                    onClick={() => setCrossbite(cb)}
                    className={`py-1.5 px-2 rounded-lg font-bold text-[11px] capitalize truncate ${
                      crossbite === cb
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    {cb}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Panel 2: Dynamic Occlusal Guidance & Wear Facets */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Dynamic Kinematics & Contact Patterns</h3>
                <p className="text-[11px] text-on-surface-variant">Protrusive & lateral excursions with facet documentation</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-secondary-container text-[11px] font-mono text-on-secondary-container font-bold">
              CANINE PROTECTED
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-on-surface">Protrusive Kinematics</span>
                <p className="text-[11px] text-on-surface-variant">Incisal edge guidance with posterior disclusion</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                <Icon name="check_circle" className="text-sm text-secondary" />
                <span>Normal Incisal Edge</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                <span className="text-xs font-bold text-on-surface">Right Lateral Working Contact</span>
                <p className="text-[11px] text-on-surface-variant">Cusp tip #13 to #43 — clean disclusion</p>
                <div className="pt-1 flex items-center gap-1.5 text-xs text-secondary font-semibold">
                  <Icon name="check" className="text-sm" />
                  <span>No Non-working Contacts</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                <span className="text-xs font-bold text-on-surface">Left Lateral Working Contact</span>
                <p className="text-[11px] text-on-surface-variant">Cusp tip #23 to #33 — clean disclusion</p>
                <div className="pt-1 flex items-center gap-1.5 text-xs text-secondary font-semibold">
                  <Icon name="check" className="text-sm" />
                  <span>No Non-working Contacts</span>
                </div>
              </div>
            </div>

            {/* Occlusal Wear Facet Notification Banner */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
              <Icon name="warning" className="text-amber-600 text-lg shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-200">Physiological Enamel Wear Identified</span>
                <p className="text-amber-800 dark:text-amber-300 text-[11px]">
                  Localized grade 1 wear facets on tooth #46 distal cusp and tooth #36 buccal incline. No dentin exposure; within normal limits for age 34.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Panel 3: TMJ Kinematics & Palpation */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Temporomandibular Joint (TMJ) Analysis</h3>
                <p className="text-[11px] text-on-surface-variant">Joint sounds, range of motion & opening deviations</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-secondary-container text-[11px] font-mono text-on-secondary-container font-bold">
              MIO: 46 MM
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Opening Measurement */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <span className="text-xs font-semibold text-on-surface-variant">Max Incisal Opening</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono text-primary">{maxOpening}</span>
                <span className="text-xs text-on-surface-variant font-mono">mm</span>
              </div>
              <input
                type="range"
                min="30"
                max="65"
                value={maxOpening}
                onChange={(e) => setMaxOpening(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <span className="inline-block px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                {maxOpening >= 40 ? 'Normal (≥40mm)' : 'Restricted (<40mm)'}
              </span>
            </div>

            {/* Right TMJ */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <span className="text-xs font-semibold text-on-surface-variant">Right Condyle / TMJ</span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface">Joint Click</span>
                <button
                  type="button"
                  onClick={() => setRightTmjClick(!rightTmjClick)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    rightTmjClick
                      ? 'bg-amber-500 text-white'
                      : 'bg-surface-container text-on-surface'
                  }`}
                >
                  {rightTmjClick ? 'Present' : 'None'}
                </button>
              </div>
              <p className="text-[10px] text-outline">Lateral pole palpation: Non-tender (0/3)</p>
            </div>

            {/* Left TMJ */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <span className="text-xs font-semibold text-on-surface-variant">Left Condyle / TMJ</span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface">Joint Click</span>
                <button
                  type="button"
                  onClick={() => setLeftTmjClick(!leftTmjClick)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    leftTmjClick
                      ? 'bg-amber-500 text-white'
                      : 'bg-surface-container text-on-surface'
                  }`}
                >
                  {leftTmjClick ? 'Present' : 'None'}
                </button>
              </div>
              <p className="text-[10px] text-outline">Lateral pole palpation: Non-tender (0/3)</p>
            </div>
          </div>

          {/* Pathway of Opening */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
            <span className="text-xs font-semibold text-on-surface-variant">Mandibular Kinematic Pathway</span>
            <div className="grid grid-cols-3 gap-2">
              {(['straight', 'right', 'left'] as const).map((path) => (
                <button
                  key={path}
                  type="button"
                  onClick={() => setMidlineDeviation(path)}
                  className={`py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                    midlineDeviation === path
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  {path === 'straight' ? 'Straight (No Dev)' : `Deviation ${path}`}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Panel 4: Masticatory Muscle Palpation */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Masticatory Muscle Palpation Grid</h3>
                <p className="text-[11px] text-on-surface-variant">Bilateral digital pressure (1.0–1.5 kg) tenderness scale (0–3)</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-secondary-container text-[11px] font-mono text-on-secondary-container font-bold">
              ALL WNL (0/3)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {palpationSites.map((site, idx) => (
              <div
                key={site.site}
                onClick={() => handleTendernessCycle(idx)}
                className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/20 cursor-pointer transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface truncate">{site.site}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      site.tenderness === 0
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {site.tenderness}/3
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span>Status:</span>
                  <span className="font-semibold capitalize text-on-surface">{site.status}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-outline text-center">
            Tap any muscle site to toggle palpation tenderness grade (0 = None, 1 = Mild, 2 = Moderate, 3 = Severe)
          </p>
        </section>

        {/* Panel 5: Functional Habitus & Parafunctional Behaviors */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Functional Habitus & Oral Behaviors</h3>
                <p className="text-[11px] text-on-surface-variant">Chewing, breathing and parafunctional screening</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-mono text-primary font-bold">
              NEGATIVE HABITUS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <span className="text-xs font-semibold text-on-surface-variant">Chewing Efficiency / Pattern</span>
              <div className="grid grid-cols-3 gap-1.5">
                {(['bilateral', 'unilateral_right', 'unilateral_left'] as const).map((pat) => (
                  <button
                    key={pat}
                    type="button"
                    onClick={() => setChewingPattern(pat)}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-bold capitalize truncate ${
                      chewingPattern === pat
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    {pat.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <span className="text-xs font-semibold text-on-surface-variant">Respiratory Pathway</span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface">Predominant Mode</span>
                <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                  Nasal Breathing ✓
                </span>
              </div>
              <p className="text-[10px] text-outline">No signs of mouth breathing or adenoid facies</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
            <div className="p-2 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant text-[10px] block">Tongue Thrust</span>
              <span className="font-bold text-secondary text-xs">Absent</span>
            </div>
            <div className="p-2 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant text-[10px] block">Nocturnal Bruxism</span>
              <span className="font-bold text-secondary text-xs">Negative</span>
            </div>
            <div className="p-2 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant text-[10px] block">Nail Biting</span>
              <span className="font-bold text-secondary text-xs">Negative</span>
            </div>
            <div className="p-2 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant text-[10px] block">Lip Incompetence</span>
              <span className="font-bold text-secondary text-xs">Competent</span>
            </div>
          </div>
        </section>

        {/* Clinician Occlusal Impression Narrative */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="edit_note" className="text-primary text-xl" />
              <h3 className="text-sm font-bold text-on-surface">Clinician Occlusal Impression</h3>
            </div>
            <span className="text-[11px] text-on-surface-variant">Certified by Dr. Daniel James</span>
          </div>
          <textarea
            value={impressionNotes}
            onChange={(e) => setImpressionNotes(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:border-primary resize-none leading-relaxed"
          />
          <div className="flex justify-between items-center text-[11px] text-on-surface-variant">
            <span>DHA Rule DHA-SEC10-REG09 Compliant</span>
            <span>{impressionNotes.length} chars</span>
          </div>
        </section>

        {/* Footer Navigation Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/examination/periodontal')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Icon name="arrow_back" className="text-sm" />
            <span>Module 4: Periodontal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              showToast('Occlusion Assessment Saved Successfully');
              navigate('/examination/odontogram-integration');
            }}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <span>Module 6: Odontogram</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </div>
    </ExaminationShell>
  );
}

export default OcclusionAssessmentScreen;

