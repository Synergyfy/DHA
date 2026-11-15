import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

export function DentalXRayViewerScreen() {
  const [zoomLevel, setZoomLevel] = useState<number>(140);
  const [isInverted, setIsInverted] = useState<boolean>(false);
  const [isContrastBoosted, setIsContrastBoosted] = useState<boolean>(false);
  const [activeTool, setActiveTool] = useState<'pan' | 'caliper' | 'annotate'>('pan');
  const [activeSeries, setActiveSeries] = useState<'bw' | 'pa'>('bw');
  const [metadataModalOpen, setMetadataModalOpen] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleZoomIn = () => {
    if (zoomLevel < 300) setZoomLevel((prev) => prev + 20);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 80) setZoomLevel((prev) => prev - 20);
  };

  const handleReset = () => {
    setZoomLevel(140);
    setIsInverted(false);
    setIsContrastBoosted(false);
    setActiveTool('pan');
  };

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  return (
    <InvestigationShell
      pageTitle="Dental X-Ray Viewer"
      badgeCode="11.15"
      badgeLabel="DICOM Workstation"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="INV-2025-0914-BWPA"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 select-none">
        {/* Toast Feedback */}
        {actionFeedback && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Top Surgical Dark Workstation Strip */}
        <section className="bg-inverse-surface text-inverse-on-surface rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest/20 flex items-center justify-center text-inverse-on-surface shrink-0">
              <Icon name="radiology" className="text-xl" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-surface-bright text-base truncate">Chinedu Okafor</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-xs font-semibold">
                  34y M
                </span>
                <span className="text-xs text-surface-dim font-mono">DHA-10482</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-surface-dim mt-0.5 flex-wrap">
                <span className="text-secondary-fixed">●</span>
                <span className="font-medium text-surface-bright">
                  {activeSeries === 'bw' ? 'Tooth #16 Bitewing (BW-R)' : 'Periapical #16 Apex (PA-16)'}
                </span>
                <span className="text-outline-variant">•</span>
                <span>DICOM Lossless 16-bit</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
            <div className="text-right hidden sm:block">
              <div className="font-mono text-xs text-secondary-fixed">2400 × 3000 px</div>
              <div className="text-[11px] text-surface-dim/70">W: 4096 L: 2048</div>
            </div>
            <button
              type="button"
              onClick={() => setMetadataModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-surface-container-highest/20 hover:bg-surface-container-highest/40 text-inverse-on-surface text-xs font-semibold transition-colors flex items-center gap-1.5 border border-outline-variant/30"
            >
              <Icon name="info" className="text-base" />
              <span>DICOM Info</span>
            </button>
          </div>
        </section>

        {/* Main Workstation Layout: Canvas on left/center, findings on right on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Viewer Stage & Controls (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Viewport Canvas Frame */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#070b12] rounded-2xl overflow-hidden shadow-xl border border-slate-800 flex items-center justify-center cursor-grab active:cursor-grabbing">
              {/* Radiograph Graphic Emulation Layer */}
              <div
                className="w-full h-full flex items-center justify-center transition-all duration-200"
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  filter: `${isInverted ? 'invert(1) ' : ''}${isContrastBoosted ? 'contrast(1.6) brightness(1.1)' : ''}`.trim() || 'none',
                }}
              >
                {activeSeries === 'bw' ? (
                  /* Synthetic Bitewing Radiograph SVG */
                  <svg
                    className="w-full h-full max-w-[640px] max-h-[480px] p-2"
                    viewBox="0 0 800 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <radialGradient id="xrayGlow" cx="50%" cy="50%" r="65%">
                        <stop offset="0%" stopColor="#1b2432" stopOpacity="0.95" />
                        <stop offset="70%" stopColor="#0a0f18" stopOpacity="0.98" />
                        <stop offset="100%" stopColor="#05080e" stopOpacity="1" />
                      </radialGradient>
                      <linearGradient id="enamelDensity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="65%" stopColor="#cbd5e1" />
                        <stop offset="100%" stopColor="#64748b" />
                      </linearGradient>
                      <linearGradient id="dentinDensity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#94a3b8" />
                        <stop offset="100%" stopColor="#475569" />
                      </linearGradient>
                      <pattern id="trabecularBone" width="16" height="16" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="3" r="1.2" fill="#334155" opacity="0.45" />
                        <circle cx="9" cy="7" r="1.6" fill="#1e293b" opacity="0.75" />
                        <circle cx="14" cy="2" r="1.1" fill="#475569" opacity="0.35" />
                        <circle cx="5" cy="13" r="1.4" fill="#334155" opacity="0.5" />
                        <circle cx="12" cy="14" r="1.2" fill="#1e293b" opacity="0.6" />
                      </pattern>
                    </defs>
                    {/* Background */}
                    <rect width="800" height="600" fill="url(#xrayGlow)" />
                    <rect width="800" height="600" fill="url(#trabecularBone)" />

                    {/* Faint DICOM calibration grid */}
                    <path
                      d="M 50 150 L 750 150 M 50 300 L 750 300 M 50 450 L 750 450"
                      stroke="#334155"
                      strokeWidth="0.5"
                      strokeDasharray="4 6"
                      opacity="0.35"
                    />
                    <path
                      d="M 200 50 L 200 550 M 400 50 L 400 550 M 600 50 L 600 550"
                      stroke="#334155"
                      strokeWidth="0.5"
                      strokeDasharray="4 6"
                      opacity="0.35"
                    />

                    {/* UPPER TEETH (Maxillary Right) */}
                    <g id="maxillary-teeth">
                      {/* Premolar #15 */}
                      <g transform="translate(180, 80)">
                        <path d="M 55 120 C 50 70, 52 30, 55 10 C 58 30, 60 70, 57 120 Z" fill="#0b0f17" />
                        <path
                          d="M 20 140 C 25 80, 45 30, 55 0 C 65 30, 85 80, 90 140 C 95 180, 90 200, 75 210 C 60 215, 50 215, 35 210 C 20 200, 15 180, 20 140 Z"
                          fill="url(#dentinDensity)"
                        />
                        <path
                          d="M 46 150 C 44 130, 46 120, 55 110 C 64 120, 66 130, 64 150 C 64 165, 55 170, 46 150 Z"
                          fill="#070a0f"
                        />
                        <path
                          d="M 20 170 C 18 195, 28 218, 42 220 C 55 222, 60 220, 68 220 C 82 218, 92 195, 90 170 C 88 155, 92 145, 92 145 C 80 148, 30 148, 18 145 C 18 145, 22 155, 20 170 Z"
                          fill="url(#enamelDensity)"
                          opacity="0.95"
                        />
                      </g>

                      {/* 1st Molar #16 (PRIMARY CARIES TARGET) */}
                      <g transform="translate(320, 65)">
                        <path d="M 50 140 C 40 70, 25 35, 20 10 C 35 25, 50 80, 65 140 Z" fill="#0b0f17" />
                        <path d="M 115 140 C 120 70, 135 30, 145 10 C 135 35, 125 85, 115 140 Z" fill="#0b0f17" />
                        <path
                          d="M 20 140 C 20 90, 50 30, 80 20 C 110 30, 140 90, 140 140 C 145 180, 145 220, 125 235 C 105 245, 60 245, 35 235 C 15 220, 15 180, 20 140 Z"
                          fill="url(#dentinDensity)"
                        />
                        <path
                          d="M 55 155 C 50 135, 45 125, 45 120 C 52 125, 75 140, 80 140 C 85 140, 105 125, 115 120 C 115 125, 110 135, 105 155 C 100 180, 60 180, 55 155 Z"
                          fill="#070a0f"
                        />
                        <path
                          d="M 18 175 C 16 205, 25 235, 50 240 C 65 242, 80 236, 95 242 C 120 238, 144 205, 142 175 C 138 155, 144 145, 144 145 C 120 150, 40 150, 16 145 C 16 145, 20 155, 18 175 Z"
                          fill="url(#enamelDensity)"
                          opacity="0.95"
                        />
                        {/* Mesio-Occlusal Caries Radiolucency */}
                        <path
                          d="M 24 195 C 22 210, 36 218, 48 214 C 54 205, 52 190, 44 184 C 34 180, 25 185, 24 195 Z"
                          fill="#090d15"
                          opacity="0.96"
                        />
                        <path
                          d="M 22 193 C 20 212, 38 222, 52 217 C 58 206, 56 188, 46 181 C 33 176, 23 182, 22 193 Z"
                          fill="none"
                          stroke="#334155"
                          strokeWidth="2.5"
                          opacity="0.6"
                        />
                        <path
                          d="M -20 145 Q 20 155 80 150 T 170 148"
                          stroke="#cbd5e1"
                          strokeWidth="2"
                          strokeDasharray="3 2"
                          opacity="0.65"
                        />
                      </g>

                      {/* 2nd Molar #17 */}
                      <g transform="translate(480, 70)">
                        <path
                          d="M 25 140 C 25 90, 55 35, 80 25 C 105 35, 135 90, 135 140 C 140 180, 135 220, 120 235 C 100 245, 55 245, 35 235 C 20 220, 20 180, 25 140 Z"
                          fill="url(#dentinDensity)"
                        />
                        <path
                          d="M 23 175 C 20 205, 30 235, 55 240 C 70 242, 85 236, 100 242 C 120 238, 136 205, 134 175 C 130 155, 136 145, 136 145 C 115 150, 45 150, 21 145 C 21 145, 25 155, 23 175 Z"
                          fill="url(#enamelDensity)"
                          opacity="0.95"
                        />
                        <path
                          d="M 55 155 C 50 135, 50 120, 78 120 C 105 120, 105 135, 100 155 C 95 175, 60 175, 55 155 Z"
                          fill="#070a0f"
                        />
                      </g>
                    </g>

                    {/* Occlusal Plane Air Gap */}
                    <rect x="50" y="308" width="700" height="12" fill="#04060a" opacity="0.95" />

                    {/* LOWER TEETH (Mandibular Right) */}
                    <g id="mandibular-teeth" transform="translate(0, 50)">
                      {/* Lower Premolar #45 */}
                      <g transform="translate(200, 280)">
                        <path
                          d="M 18 60 C 25 90, 45 180, 52 230 C 58 180, 80 90, 85 60 C 88 40, 82 15, 68 8 C 55 5, 45 5, 35 8 C 22 15, 15 40, 18 60 Z"
                          fill="url(#dentinDensity)"
                        />
                        <path
                          d="M 16 55 C 14 30, 26 5, 40 4 C 52 3, 60 4, 70 4 C 84 5, 92 30, 90 55 C 88 65, 82 72, 82 72 C 60 70, 35 70, 18 72 C 18 72, 14 65, 16 55 Z"
                          fill="url(#enamelDensity)"
                          opacity="0.9"
                        />
                      </g>

                      {/* Lower 1st Molar #46 */}
                      <g transform="translate(340, 275)">
                        <path
                          d="M 20 60 C 22 100, 30 180, 40 230 C 55 170, 65 110, 75 80 C 85 110, 95 170, 110 230 C 120 180, 128 100, 130 60 C 135 30, 125 10, 105 5 C 85 3, 65 3, 45 5 C 25 10, 18 30, 20 60 Z"
                          fill="url(#dentinDensity)"
                        />
                        <path
                          d="M 18 62 C 16 35, 25 8, 48 6 C 65 5, 75 10, 88 5 C 112 8, 134 35, 132 62 C 128 75, 122 80, 122 80 C 100 78, 40 78, 18 80 C 18 80, 16 75, 18 62 Z"
                          fill="url(#enamelDensity)"
                          opacity="0.95"
                        />
                        <path
                          d="M 48 85 C 44 100, 42 120, 50 135 C 60 145, 90 145, 100 135 C 108 120, 106 100, 102 85 C 95 72, 55 72, 48 85 Z"
                          fill="#070a0f"
                        />
                      </g>
                    </g>
                  </svg>
                ) : (
                  /* Synthetic Periapical Radiograph SVG */
                  <svg
                    className="w-full h-full max-w-[640px] max-h-[480px] p-2"
                    viewBox="0 0 800 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="800" height="600" fill="#0c121e" />
                    {/* Maxillary Sinus Curve */}
                    <path
                      d="M 100 120 Q 400 80 700 130"
                      stroke="#475569"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    {/* Tooth 16 Periapical View with Apex and Bone */}
                    <g transform="translate(280, 100)">
                      <path
                        d="M 120 400 C 100 320, 80 200, 90 90 C 100 60, 130 50, 140 70 C 150 90, 140 180, 150 250 C 160 180, 180 80, 190 60 C 200 40, 220 50, 225 80 C 230 140, 210 260, 220 400 Z"
                        fill="#cbd5e1"
                        opacity="0.75"
                        stroke="#94a3b8"
                        strokeWidth="2"
                      />
                      <circle cx="140" cy="70" r="14" fill="#00B4D8" fillOpacity="0.2" stroke="#00B4D8" strokeWidth="2" />
                      <circle cx="190" cy="60" r="14" fill="#00B4D8" fillOpacity="0.2" stroke="#00B4D8" strokeWidth="2" />
                      <text x="60" y="40" fill="#93ccff" fontSize="13" fontFamily="monospace">
                        #16 Buccal & Palatal Roots
                      </text>
                      <text x="80" y="440" fill="#cbd5e1" fontSize="14" fontWeight="bold">
                        Intact Alveolar Lamina Dura (No RL)
                      </text>
                    </g>
                  </svg>
                )}
              </div>

              {/* On-Canvas HUD Overlays */}
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                {/* Top Canvas Metadata */}
                <div className="flex items-start justify-between w-full">
                  <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md shadow-md text-white text-xs border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
                    <span className="font-medium">
                      {activeSeries === 'bw' ? 'Series 1 of 2: Right Posterior BW' : 'Series 2 of 2: Periapical PA-16'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveSeries(activeSeries === 'bw' ? 'pa' : 'bw')}
                      className="ml-1 text-secondary-fixed hover:text-white transition-colors"
                      title="Next series"
                    >
                      <Icon name="swap_horiz" className="text-base" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-xs border border-white/10">
                    <Icon name="tune" className="text-secondary-fixed text-sm" />
                    <span className="font-mono">{zoomLevel}% • 1:1 Pixel Calibrated</span>
                  </div>
                </div>

                {/* Caliper Annotation Marker Overlay (at #16 when in BW mode) */}
                {activeSeries === 'bw' && (
                  <div className="absolute top-[35%] left-[44%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-8 h-8 rounded-full bg-red-500/25 animate-ping" />
                      <div className="w-6 h-6 rounded-full bg-red-500/30 flex items-center justify-center border border-red-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" />
                      </div>
                    </div>

                    <div className="mt-1.5 px-2.5 py-1 rounded-md bg-black/85 text-white font-mono text-[11px] shadow-lg flex items-center gap-1.5 backdrop-blur-xs border border-white/10 whitespace-nowrap">
                      <span className="text-red-400 font-bold">FDI #16</span>
                      <span className="text-slate-300">MO Caries (Dentin)</span>
                    </div>

                    {/* Caliper Distance beam */}
                    <div className="relative w-28 h-8 mt-1 pointer-events-none">
                      <svg className="w-full h-full" viewBox="0 0 110 32" fill="none">
                        <path d="M 10 4 L 10 28 M 90 4 L 90 28" stroke="#00B4D8" strokeWidth="1.5" />
                        <path d="M 10 16 L 90 16" stroke="#00B4D8" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx="50" cy="16" r="3" fill="#00B4D8" />
                      </svg>
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-secondary text-on-secondary font-mono text-[10px] whitespace-nowrap font-semibold shadow-xs">
                        2.1 mm to pulp horn
                      </span>
                    </div>
                  </div>
                )}

                {/* Bottom Canvas Status Line */}
                <div className="flex items-center justify-between w-full text-slate-400 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span>kVp: 70 • Exposure: 0.12s</span>
                    <span className="hidden sm:inline">• Sensor: Size 2 High-Res CMOS</span>
                  </div>
                  <div className="flex items-center gap-1 text-secondary-fixed">
                    <Icon name="verified" className="text-sm" />
                    <span>Diagnostic Grade A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Clinical Workstation Toolbar */}
            <div className="w-full bg-inverse-surface/95 backdrop-blur-xl rounded-2xl p-2.5 shadow-xl border border-outline-variant/30 flex items-center justify-between gap-1 overflow-x-auto text-inverse-on-surface">
              {/* Zoom Out / In */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-surface-container-highest/25 transition-all active:scale-95 text-inverse-on-surface"
                  title="Zoom Out"
                >
                  <Icon name="zoom_out" className="text-lg" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-surface-container-highest/25 transition-all active:scale-95 text-inverse-on-surface"
                  title="Zoom In"
                >
                  <Icon name="zoom_in" className="text-lg" />
                </button>
              </div>

              <div className="h-6 w-px bg-outline/30 shrink-0" />

              {/* Hand Pan Tool */}
              <button
                type="button"
                onClick={() => setActiveTool('pan')}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                  activeTool === 'pan'
                    ? 'bg-primary-container text-on-primary-container shadow-xs'
                    : 'hover:bg-surface-container-highest/25 text-inverse-on-surface'
                }`}
                title="Pan Image"
              >
                <Icon name="pan_tool" className="text-lg" />
              </button>

              {/* Invert Grayscale Toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsInverted(!isInverted);
                  triggerFeedback(isInverted ? 'Standard radiographic mode' : 'Inverted negative radiograph');
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                  isInverted
                    ? 'bg-secondary-fixed text-on-secondary-fixed font-bold shadow-xs'
                    : 'hover:bg-surface-container-highest/25 text-inverse-on-surface'
                }`}
                title="Invert Grayscale (Negative/Positive)"
              >
                <Icon name="invert_colors" className="text-lg" />
              </button>

              {/* Contrast Booster Toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsContrastBoosted(!isContrastBoosted);
                  triggerFeedback(isContrastBoosted ? 'Standard bone window' : 'Contrast boosted windowing');
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                  isContrastBoosted
                    ? 'bg-secondary-fixed text-on-secondary-fixed font-bold shadow-xs'
                    : 'hover:bg-surface-container-highest/25 text-inverse-on-surface'
                }`}
                title="Contrast Boost / Windowing"
              >
                <Icon name="contrast" className="text-lg" />
              </button>

              {/* Caliper Tool */}
              <button
                type="button"
                onClick={() => {
                  setActiveTool('caliper');
                  triggerFeedback('Caliper active: Measure distance from enamel margin to pulp');
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                  activeTool === 'caliper'
                    ? 'bg-secondary-fixed/20 text-secondary-fixed ring-2 ring-secondary-fixed'
                    : 'hover:bg-surface-container-highest/25 text-inverse-on-surface'
                }`}
                title="Caliper Ruler"
              >
                <Icon name="straighten" className="text-lg" />
              </button>

              {/* Annotation Tool */}
              <button
                type="button"
                onClick={() => {
                  setActiveTool('annotate');
                  triggerFeedback('Annotation tool active: Click tooth to drop diagnostic note');
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                  activeTool === 'annotate'
                    ? 'bg-secondary-fixed/20 text-secondary-fixed ring-2 ring-secondary-fixed'
                    : 'hover:bg-surface-container-highest/25 text-inverse-on-surface'
                }`}
                title="Annotation Marker"
              >
                <Icon name="edit_note" className="text-lg" />
              </button>

              <div className="h-6 w-px bg-outline/30 shrink-0" />

              {/* Reset Tool */}
              <button
                type="button"
                onClick={handleReset}
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-surface-container-highest/25 transition-all text-inverse-on-surface shrink-0"
                title="Reset View"
              >
                <Icon name="fit_screen" className="text-lg" />
              </button>
            </div>

            {/* Quick Projection Toggle Bar */}
            <div className="bg-surface-container border border-outline-variant/30 p-1.5 rounded-2xl flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveSeries('bw')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeSeries === 'bw'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Icon name="crop_free" className="text-base" />
                <span>Right Bitewing (BW-R)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSeries('pa')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeSeries === 'pa'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Icon name="visibility" className="text-base" />
                <span>Periapical PA-16 (Apex)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Diagnostic Observations & Clinical Workflow (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Radiographic Observations Card */}
            <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Icon name="radiology" className="text-lg" />
                  </div>
                  <div>
                    <h2 className="font-bold text-on-surface text-sm sm:text-base leading-tight">
                      Radiographic Observations
                    </h2>
                    <p className="text-xs text-on-surface-variant">Intraoral Right Bitewing (11.15)</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold flex items-center gap-1">
                  <Icon name="verified" className="text-xs" />
                  Verified
                </span>
              </div>

              {/* Findings List */}
              <div className="flex flex-col gap-3">
                {/* Finding 1: Pathological (Caries) */}
                <div className="p-3.5 rounded-xl bg-error-container/40 border border-error/20 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="warning" className="text-sm" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className="font-semibold text-on-error-container text-xs sm:text-sm">
                        Tooth #16 — Mesio-Occlusal Caries
                      </span>
                      <span className="font-mono text-[10px] text-error bg-surface-container-lowest px-1.5 py-0.5 rounded font-bold">
                        ICDAS 3/4
                      </span>
                    </div>
                    <p className="text-xs text-on-surface mt-1 leading-relaxed">
                      Coronal radiolucency extending through the enamel junction into outer-to-middle third of dentin.
                      Preserved 2.1mm dentin bridge above pulp horn.
                    </p>
                  </div>
                </div>

                {/* Finding 2: Bone Level Normal */}
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="check" className="text-sm" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 flex-wrap">
                      <span className="font-semibold text-on-surface text-xs sm:text-sm">
                        Alveolar Bone Crest & PDL Space
                      </span>
                      <span className="font-mono text-[10px] text-secondary bg-surface-container-lowest px-1.5 py-0.5 rounded font-bold">
                        Normal (1.4mm)
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Intact lamina dura and uniform periodontal ligament space along mesial and distal roots.
                      Bone crest 1.4mm apical to CEJ without horizontal deficit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Practitioner Sign-off Muted Footer */}
              <div className="pt-3 border-t border-outline-variant/20 flex flex-col gap-1 text-xs text-on-surface-variant">
                <div className="flex items-center gap-1.5">
                  <Icon name="clinical_notes" className="text-primary text-sm" />
                  <span>
                    Reviewing Dentist: <strong className="text-on-surface">Dr. Daniel James</strong> (#DEN-48912)
                  </span>
                </div>
                <div className="font-mono text-[11px] text-outline">Today, 09:42 AM • Signed Digitally</div>
              </div>
            </section>

            {/* Workflow Action Buttons */}
            <div className="flex flex-col gap-2.5">
              <NavLink
                to="/investigations/record-details"
                className="w-full h-12 rounded-xl bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:bg-primary/95 transition-all"
              >
                <span>Attach Annotation to Review (11.20)</span>
                <Icon name="arrow_forward" className="text-base" />
              </NavLink>

              <button
                type="button"
                onClick={() => {
                  setActiveSeries(activeSeries === 'bw' ? 'pa' : 'bw');
                  triggerFeedback(`Switched to ${activeSeries === 'bw' ? 'PA-16 View' : 'Right Bitewing View'}`);
                }}
                className="w-full h-11 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-secondary hover:bg-secondary-container/20 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Icon name="vertical_align_bottom" className="text-base" />
                <span>
                  {activeSeries === 'bw' ? 'Switch to PA View (#16 Root Apex)' : 'Switch to Right Bitewing (BW-R)'}
                </span>
              </button>

              <NavLink
                to="/investigations/library"
                className="w-full h-11 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Icon name="folder_managed" className="text-outline text-base" />
                <span>Back to Investigation Library</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* DICOM Info Modal */}
        {metadataModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl border border-outline-variant/30 p-6 shadow-2xl flex flex-col gap-4 animate-scaleIn">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <Icon name="info" className="text-primary text-xl" />
                  <h3 className="font-bold text-on-surface text-base">DICOM Tag Header Manifest</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMetadataModalOpen(false)}
                  className="p-1 rounded-full text-outline hover:text-on-surface"
                >
                  <Icon name="close" className="text-lg" />
                </button>
              </div>

              <div className="text-xs font-mono space-y-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 overflow-y-auto max-h-72">
                <div>(0008,0060) Modality: IO</div>
                <div>(0008,0070) Manufacturer: DEXIS LLC</div>
                <div>(0008,1090) ManufacturerModelName: Titanium Size 2</div>
                <div>(0010,0010) PatientName: Okafor^Chinedu</div>
                <div>(0010,0020) PatientID: DHA-10482</div>
                <div>(0018,0015) BodyPartExamined: JAW</div>
                <div>(0018,1150) ExposureTime: 120 ms</div>
                <div>(0018,6000) XRayTubeCurrent: 7 mA</div>
                <div>(0018,0060) KVP: 65 kV</div>
                <div>(0028,0010) Rows: 3000</div>
                <div>(0028,0011) Columns: 2400</div>
                <div>(0028,0100) BitsAllocated: 16</div>
                <div>(0028,0101) BitsStored: 14</div>
                <div>(0028,1050) WindowCenter: 2048</div>
                <div>(0028,1051) WindowWidth: 4096</div>
                <div>(0020,000D) StudyInstanceUID: 2.16.840.1.113883.3.942.2025.10482</div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setMetadataModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </InvestigationShell>
  );
}
