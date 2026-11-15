import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

export function OpgViewerScreen() {
  const [ianTracingVisible, setIanTracingVisible] = useState<boolean>(true);
  const [selectedQuadrant, setSelectedQuadrant] = useState<string>('Q4');
  const [activeTool, setActiveTool] = useState<string>('ian');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  return (
    <InvestigationShell
      pageTitle="OPG Viewer"
      badgeCode="11.16"
      badgeLabel="Panoramic Panorex"
      patientName="Marcus Vance"
      dhaId="DHA-00412"
      orderRef="OPG-2025-00412"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 select-none">
        {/* Toast Feedback */}
        {actionFeedback && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Metadata Subheader & Clinical Context (Dark Clinical Theme Module) */}
        <section className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-4 sm:p-5 shadow-md flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
                <Icon name="radiology" className="text-sm" />
                OPG WORKSPACE
              </span>
              <span className="font-mono text-xs text-surface-dim">DHA-00412</span>
            </div>
            <span className="font-mono text-xs text-secondary-fixed">
              75 kVp • 12.0s • 8.2 mGy·cm² • Exposure Index OK
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-t border-outline/30 pt-3">
            <div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-inverse-on-surface">Marcus Vance</h2>
                <span className="text-xs text-surface-dim">42y M • Emergency Radiology</span>
              </div>
              <div className="text-xs text-surface-dim mt-0.5">
                Instrumentarium OP300 • High-Res Panorex Dental Tomograph
              </div>
            </div>
            <span className="font-mono text-xs text-primary-fixed-dim self-start sm:self-auto bg-primary/20 px-2.5 py-1 rounded-lg">
              FOV 15×9 cm • Orthogonal Reconstruction
            </span>
          </div>
        </section>

        {/* Radiographic Diagnostic Canvas Area (Deep Diagnostic Darkroom) */}
        <div className="relative w-full bg-[#070b12] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
          {/* Viewport Status bar overlay */}
          <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 bg-inverse-surface/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-white/10">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping" />
              <span className="font-mono text-xs text-inverse-on-surface uppercase tracking-wider font-semibold">
                {ianTracingVisible ? 'IAN Canal Traced (Active)' : 'IAN Canal Hidden'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-inverse-surface/90 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono text-surface-dim border border-white/10">
                Scale 1.00x
              </span>
              <span className="bg-error text-on-error font-mono text-xs px-2.5 py-1 rounded font-bold shadow-xs">
                2 CLINICAL ALERTS
              </span>
            </div>
          </div>

          {/* Panoramic SVG Medical Odontogram / OPG Radiograph */}
          <div className="relative w-full aspect-[16/9] max-h-[500px] flex items-center justify-center p-2 sm:p-4">
            <svg
              className="w-full h-full object-contain filter contrast-125 brightness-95"
              viewBox="0 0 1000 580"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="panGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1b2436" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#0e1420" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#070b12" stopOpacity="1" />
                </radialGradient>
                <linearGradient id="boneDense" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#abb9d6" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#64748b" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="nerveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#4facfe" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.9" />
                </linearGradient>
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background */}
              <rect width="1000" height="580" fill="url(#panGlow)" />

              {/* Maxillary Sinuses & Hard Palate */}
              <path
                d="M 230 190 Q 320 160 410 200 Q 340 260 230 190 Z"
                fill="#0f192b"
                stroke="#707881"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                opacity="0.6"
              />
              <path
                d="M 770 190 Q 680 160 590 200 Q 660 260 770 190 Z"
                fill="#0f192b"
                stroke="#707881"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                opacity="0.6"
              />
              <text x="270" y="215" fill="#93ccff" fontSize="12" opacity="0.75" fontFamily="monospace">
                R. MAX SINUS (CLEAR)
              </text>
              <text x="610" y="215" fill="#93ccff" fontSize="12" opacity="0.75" fontFamily="monospace">
                L. MAX SINUS (CLEAR)
              </text>

              {/* Condyles (TMJ Bilateral) */}
              <g id="condyleRight">
                <path
                  d="M 70 130 C 85 110, 110 115, 115 140 C 118 160, 110 210, 105 250"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <path d="M 50 145 Q 85 130 125 140" stroke="#707881" strokeWidth="2" strokeDasharray="3 3" />
                <text x="50" y="105" fill="#cbd5e1" fontSize="11" fontFamily="monospace">
                  R. CONDYLE (SYMMETRIC)
                </text>
              </g>

              <g id="condyleLeft">
                <path
                  d="M 930 130 C 915 110, 890 115, 885 140 C 882 160, 890 210, 895 250"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <path d="M 950 145 Q 915 130 875 140" stroke="#707881" strokeWidth="2" strokeDasharray="3 3" />
                <text x="770" y="105" fill="#cbd5e1" fontSize="11" fontFamily="monospace">
                  L. CONDYLE (SYMMETRIC)
                </text>
              </g>

              {/* Mandibular Ramus & Cortical Border Bone Arch */}
              <path
                d="M 105 250 Q 120 440 240 480 Q 500 520 760 480 Q 880 440 895 250 Q 820 400 500 420 Q 180 400 105 250 Z"
                fill="url(#boneDense)"
                opacity="0.35"
              />
              <path
                d="M 105 250 C 115 450, 240 500, 500 515 C 760 500, 885 450, 895 250"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3"
                opacity="0.6"
              />

              {/* Inferior Alveolar Nerve (IAN) Canals - Cyan Tracing */}
              {ianTracingVisible && (
                <>
                  <g id="ianRight" filter="url(#softGlow)">
                    <path
                      d="M 120 280 C 130 350, 160 410, 225 435 C 290 460, 360 450, 395 440"
                      fill="none"
                      stroke="url(#nerveGlow)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle cx="395" cy="440" r="4" fill="#00f2fe" />
                    <text x="210" y="470" fill="#89f5e7" fontSize="11" fontWeight="600" fontFamily="monospace">
                      R. IAN CANAL
                    </text>
                  </g>

                  <g id="ianLeft" filter="url(#softGlow)">
                    <path
                      d="M 880 280 C 870 350, 840 410, 775 435 C 710 460, 640 450, 605 440"
                      fill="none"
                      stroke="url(#nerveGlow)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle cx="605" cy="440" r="4" fill="#00f2fe" />
                    <text x="690" y="470" fill="#89f5e7" fontSize="11" fontWeight="600" fontFamily="monospace">
                      L. IAN CANAL
                    </text>
                  </g>
                </>
              )}

              {/* Maxillary Teeth Contours */}
              <g id="maxillaryTeeth" fill="#d2d9f4" fillOpacity="0.35" stroke="#ffffff" strokeWidth="1.8">
                <path d="M 230 240 Q 235 220 242 245 Z" />
                <path d="M 252 245 Q 260 215 270 245 Z" />
                <path d="M 280 246 Q 290 210 300 248 Z" />
                <path d="M 312 248 Q 320 215 330 250 Z" />
                <path d="M 342 250 Q 350 218 360 252 Z" />
                <path d="M 372 253 Q 382 205 394 254 Z" />
                <path d="M 406 254 Q 418 200 430 255 Z" />
                <path d="M 442 255 Q 454 195 466 256 Z" />
                <path d="M 534 256 Q 546 195 558 255 Z" />
                <path d="M 570 255 Q 582 200 594 254 Z" />
                <path d="M 606 254 Q 618 205 628 253 Z" />
                <path d="M 640 252 Q 650 218 658 250 Z" />
                <path d="M 670 250 Q 680 215 688 248 Z" />
                <path d="M 700 248 Q 710 210 720 246 Z" />
                <path d="M 730 245 Q 740 215 748 245 Z" />
                <path d="M 758 245 Q 765 220 770 240 Z" />
              </g>

              {/* Mandibular Teeth Contours */}
              <g id="mandibularTeeth" fill="#d2d9f4" fillOpacity="0.4" stroke="#ffffff" strokeWidth="1.8">
                <path d="M 268 365 Q 262 420 252 368 Z" />
                <path d="M 298 362 Q 292 422 284 365 Z" />
                <path d="M 328 360 Q 324 418 316 363 Z" />
                <path d="M 358 358 Q 354 415 348 360 Z" />
                <path d="M 386 357 Q 384 410 376 358 Z" />
                <path d="M 414 356 Q 412 405 406 357 Z" />
                <path d="M 444 355 Q 442 402 436 356 Z" />
                <path d="M 564 356 Q 558 402 556 355 Z" />
                <path d="M 594 357 Q 588 405 586 356 Z" />
                <path d="M 624 358 Q 616 410 614 357 Z" />
                <path d="M 652 360 Q 646 415 642 358 Z" />
                <path d="M 684 363 Q 676 418 672 360 Z" />
                <path d="M 716 365 Q 708 422 702 362 Z" />
                <path d="M 748 368 Q 738 420 732 365 Z" />
              </g>

              {/* ABNORMALITY 1: Tooth #48 (Horizontal Impaction abutting nerve) */}
              <g id="tooth48Impaction">
                <path
                  d="M 215 378 C 242 375, 252 390, 245 405 C 235 422, 195 425, 205 385 Z"
                  fill="#ffd179"
                  fillOpacity="0.75"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />
                <line x1="222" y1="418" x2="225" y2="435" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="2 2" />
                <circle cx="224" cy="426" r="3" fill="#f59e0b" />
              </g>

              {/* ABNORMALITY 2: Tooth #38 (Mesioangular Impaction) */}
              <g id="tooth38Impaction">
                <path
                  d="M 780 375 C 758 360, 746 380, 755 402 C 772 422, 802 418, 792 388 Z"
                  fill="#ffb4ab"
                  fillOpacity="0.75"
                  stroke="#ba1a1a"
                  strokeWidth="2.5"
                />
              </g>

              {/* Callout Overlay: Tooth #48 */}
              <g id="callout48">
                <rect x="155" y="325" width="105" height="110" rx="8" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                <circle cx="160" cy="330" r="7" fill="#f59e0b" />
                <text x="157" y="334" fill="#000" fontSize="10" fontWeight="bold">!</text>
                <g transform="translate(110, 445)">
                  <rect width="185" height="44" rx="6" fill="#131b2e" stroke="#f59e0b" strokeWidth="1.2" />
                  <text x="8" y="17" fill="#ffd179" fontSize="11" fontWeight="700" fontFamily="monospace">
                    #48 HORIZONTAL IMPACTION
                  </text>
                  <text x="8" y="33" fill="#faf8ff" fontSize="9.5" fontFamily="monospace">
                    Pell Cl. III • IAN Dist: &lt; 0.8mm ⚠️
                  </text>
                </g>
              </g>

              {/* Callout Overlay: Tooth #38 */}
              <g id="callout38">
                <rect x="740" y="325" width="75" height="105" rx="8" fill="none" stroke="#ba1a1a" strokeWidth="2" />
                <circle cx="810" cy="330" r="7" fill="#ba1a1a" />
                <text x="807" y="334" fill="#fff" fontSize="10" fontWeight="bold">!</text>
                <g transform="translate(710, 445)">
                  <rect width="185" height="44" rx="6" fill="#131b2e" stroke="#ba1a1a" strokeWidth="1.2" />
                  <text x="8" y="17" fill="#ffb4ab" fontSize="11" fontWeight="700" fontFamily="monospace">
                    #38 MESIOANGULAR
                  </text>
                  <text x="8" y="33" fill="#faf8ff" fontSize="9.5" fontFamily="monospace">
                    Pell Cl. II Pos B • Resorption Risk
                  </text>
                </g>
              </g>

              {/* Center Sinus Clear Banner */}
              <g transform="translate(370, 75)">
                <rect width="260" height="26" rx="13" fill="#131b2e" fillOpacity="0.9" stroke="#006194" strokeWidth="1" />
                <circle cx="15" cy="13" r="4" fill="#6bd8cb" />
                <text x="27" y="17" fill="#faf8ff" fontSize="10.5" fontWeight="600" fontFamily="monospace">
                  Bilateral Maxillary Sinuses Clear
                </text>
              </g>
            </svg>

            {/* Watermark Notice */}
            <div className="absolute bottom-3 right-4 pointer-events-none opacity-40 font-mono text-[11px] text-slate-400">
              OPG DENTAL-CAD v4.2 • INSTRUMENTARIUM OP300
            </div>
          </div>

          {/* Diagnostic Control Palette (Dark Workstation Toolbar) */}
          <div className="px-4 py-3 bg-inverse-surface border-t border-slate-800 flex items-center justify-between gap-2 overflow-x-auto text-inverse-on-surface">
            <button
              type="button"
              onClick={() => {
                setActiveTool('pan');
                triggerFeedback('Pan tool enabled: Click & drag to inspect arch');
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[56px] text-xs font-medium transition-colors ${
                activeTool === 'pan'
                  ? 'bg-surface-container-highest/30 text-inverse-primary'
                  : 'bg-surface-container-highest/10 hover:bg-surface-container-highest/20'
              }`}
            >
              <Icon name="pan_tool" className="text-lg" />
              <span className="text-[11px] mt-0.5">Pan</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTool('equalize');
                triggerFeedback('Adaptive density equalization applied');
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[56px] text-xs font-medium transition-colors ${
                activeTool === 'equalize'
                  ? 'bg-surface-container-highest/30 text-inverse-primary'
                  : 'bg-surface-container-highest/10 hover:bg-surface-container-highest/20'
              }`}
            >
              <Icon name="tune" className="text-lg" />
              <span className="text-[11px] mt-0.5">Equalize</span>
            </button>

            {/* IAN Tracing Toggle Button */}
            <button
              type="button"
              onClick={() => {
                setIanTracingVisible(!ianTracingVisible);
                setActiveTool('ian');
                triggerFeedback(ianTracingVisible ? 'Mandibular nerve tracing hidden' : 'Mandibular nerve tracing shown in cyan');
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[68px] text-xs transition-all shadow-xs ${
                ianTracingVisible
                  ? 'bg-secondary-fixed/20 text-secondary-fixed font-bold ring-1 ring-secondary-fixed/40'
                  : 'bg-surface-container-highest/10 text-surface-dim hover:text-inverse-on-surface'
              }`}
            >
              <Icon name="timeline" className="text-lg" />
              <span className="text-[11px] mt-0.5">
                {ianTracingVisible ? 'IAN Active' : 'IAN Off'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTool('measure');
                triggerFeedback('Distance caliper: Click two points to measure nerve margin');
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[56px] text-xs font-medium transition-colors ${
                activeTool === 'measure'
                  ? 'bg-surface-container-highest/30 text-inverse-primary'
                  : 'bg-surface-container-highest/10 hover:bg-surface-container-highest/20'
              }`}
            >
              <Icon name="square_foot" className="text-lg" />
              <span className="text-[11px] mt-0.5">Measure</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTool('tmj');
                triggerFeedback('Bilateral TMJ split reconstruction mode');
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[56px] text-xs font-medium transition-colors ${
                activeTool === 'tmj'
                  ? 'bg-surface-container-highest/30 text-inverse-primary'
                  : 'bg-surface-container-highest/10 hover:bg-surface-container-highest/20'
              }`}
            >
              <Icon name="vertical_split" className="text-lg" />
              <span className="text-[11px] mt-0.5">TMJ Split</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIanTracingVisible(true);
                setActiveTool('ian');
                setSelectedQuadrant('Q4');
                triggerFeedback('Workstation view reset');
              }}
              className="flex flex-col items-center justify-center p-2 rounded-xl min-w-[54px] text-xs font-medium bg-surface-container-highest/10 text-surface-dim hover:text-inverse-on-surface transition-colors"
            >
              <Icon name="restart_alt" className="text-lg" />
              <span className="text-[11px] mt-0.5">Reset</span>
            </button>
          </div>
        </div>

        {/* Arch Tooth Navigator (Mini Quadrant Selector) */}
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-on-surface-variant">
              Quadrant Inspection Focus
            </span>
            <span className="font-mono text-xs text-secondary font-semibold">ISO Two-Digit (FDI)</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'Q1', label: 'Q1 Max Right', count: 'Sound' },
              { id: 'Q2', label: 'Q2 Max Left', count: 'Sound' },
              { id: 'Q3', label: 'Q3 Mand Left (#38)', count: 'Alert', isAlert: true },
              { id: 'Q4', label: 'Q4 Mand Right (#48)', count: 'Critical', isCrit: true },
              { id: 'TMJ', label: 'Bilateral TMJ', count: 'Symmetric' },
            ].map((q) => {
              const isSelected = selectedQuadrant === q.id;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setSelectedQuadrant(q.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs flex items-center gap-1.5 shrink-0 transition-all ${
                    isSelected
                      ? q.isCrit
                        ? 'bg-primary text-on-primary ring-2 ring-primary/40'
                        : q.isAlert
                        ? 'bg-error text-on-error ring-2 ring-error/40'
                        : 'bg-primary text-on-primary ring-2 ring-primary/40'
                      : q.isCrit
                      ? 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'
                      : q.isAlert
                      ? 'bg-error-container text-on-error-container hover:bg-error-container/80'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {q.isCrit && <span className="w-2 h-2 rounded-full bg-primary" />}
                  {q.isAlert && <span className="w-2 h-2 rounded-full bg-error" />}
                  <span>{q.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Clinical Findings & Diagnostics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Diagnostic Bento (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Urgent Alert Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-error-container/60 border border-error/30 text-on-error-container flex items-start gap-3 shadow-xs">
              <Icon name="warning" className="text-2xl text-error shrink-0 mt-0.5" />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-bold text-sm sm:text-base text-on-error-container">
                  Surgical Extraction Indicated (Urgent Pre-operative Assessment)
                </span>
                <p className="text-xs sm:text-sm text-on-error-container mt-1 leading-relaxed">
                  Tooth #48 root apices are intimately superimposed with the superior cortical border of the right
                  Mandibular Canal (<strong>separation distance &lt; 0.8 mm</strong>). Significant risk of inferior
                  alveolar nerve paresthesia without prior volumetric 3D cone-beam mapping.
                </p>
              </div>
            </div>

            {/* Diagnostic Breakdown Bento: Tooth 48 vs Tooth 38 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tooth 48 Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-error uppercase tracking-wider">
                      #48 Lower Right Third Molar
                    </span>
                    <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-mono text-xs font-bold">
                      Impaction
                    </span>
                  </div>
                  <h3 className="font-bold text-on-surface text-base">Horizontal Pell Cl. III</h3>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    Direct crown contact with distal root of #47; root apices encroaching inferior alveolar nerve canal lumen.
                  </p>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 px-4 sm:px-5 py-2.5 rounded-b-2xl border-t border-outline-variant/20 flex items-center justify-between text-xs">
                  <span className="font-mono text-error font-bold">IAN Proximity: Critical (&lt; 0.8mm)</span>
                  <Icon name="priority_high" className="text-error text-base" />
                </div>
              </div>

              {/* Tooth 38 Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      #38 Lower Left Third Molar
                    </span>
                    <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-mono text-xs font-bold">
                      Mesioangular
                    </span>
                  </div>
                  <h3 className="font-bold text-on-surface text-base">Pell & Gregory II-B</h3>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                    Occlusal crown locked below cervical margin of adjacent molar #37 with early distal bone loss.
                  </p>
                </div>
                <div className="mt-4 pt-3 bg-surface-container-low -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 px-4 sm:px-5 py-2.5 rounded-b-2xl border-t border-outline-variant/20 flex items-center justify-between text-xs">
                  <span className="font-mono text-secondary font-bold">IAN Safe Margin: ~2.4mm</span>
                  <Icon name="check_circle" className="text-secondary text-base" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reviewer Stamp & Workstation Actions (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Reviewer Stamp Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <span className="text-xs font-semibold text-outline uppercase tracking-wider">
                  Oral Radiology Review
                </span>
                <span className="inline-flex items-center gap-1 bg-secondary-container px-2.5 py-1 rounded-full text-on-secondary-container text-xs font-bold">
                  <Icon name="verified" className="text-sm" />
                  Verified
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  DJ
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-on-surface text-sm truncate">Dr. Daniel James</span>
                  <span className="text-xs text-on-surface-variant truncate">
                    Oral & Maxillofacial Surgeon • #DEN-48912
                  </span>
                  <span className="text-[11px] text-outline mt-0.5">DHA Central Dental Clinic</span>
                </div>
              </div>
            </div>

            {/* Workstation Actions Tray */}
            <div className="flex flex-col gap-2.5">
              <NavLink
                to="/investigations/create"
                className="w-full h-12 rounded-xl bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:bg-primary/95 transition-all"
              >
                <Icon name="view_in_ar" className="text-lg" />
                <span>Request 3D CBCT for Nerve Mapping (11.3)</span>
              </NavLink>

              <NavLink
                to="/examination/workspace"
                className="w-full h-11 rounded-xl bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Icon name="add_circle" className="text-lg" />
                <span>Add Finding to Section 10 Exam</span>
              </NavLink>

              <NavLink
                to="/investigations/library"
                className="w-full h-11 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Icon name="folder_managed" className="text-outline text-base" />
                <span>Return to Investigation Library</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </InvestigationShell>
  );
}
