import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

export function InvestigationComparisonScreen() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'split' | 'overlay'>('split');
  const [overlayOpacity, setOverlayOpacity] = useState<number>(50);
  const [zoomLevel, setZoomLevel] = useState<number>(120);
  const [isSyncPan, setIsSyncPan] = useState<boolean>(true);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(200, Math.max(80, prev + delta)));
  };

  return (
    <InvestigationShell
      pageTitle="Investigation Comparison"
      badgeCode="11.21"
      badgeLabel="Longitudinal Radiographic Delta"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="COMP-2025-0914"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 select-none">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Longitudinal Control Strip */}
        <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Icon name="compare" className="text-2xl" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-on-surface">Tooth #16 Distal Radiographic Progression</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  Δ Depth: +1.50 mm (125 Days)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
                  Rapid Active Demineralization
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Baseline: <span className="font-semibold text-on-surface">14 Oct 2024</span> (OPG Crop) vs Current:{' '}
                <span className="font-semibold text-on-surface">16 Feb 2025</span> (Bitewing BW-R)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-surface-container-low rounded-xl p-1 border border-outline-variant/30 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'split' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Icon name="vertical_split" className="text-sm" />
                <span>Side-by-Side</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('overlay')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'overlay' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Icon name="layers" className="text-sm" />
                <span>Wipe / Overlay</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => showToast('Longitudinal comparison report saved to Encounter #EXAM-0982.')}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/40 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="save" className="text-sm text-outline" />
              <span>Save to Encounter</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/investigations/reports')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="picture_as_pdf" className="text-sm" />
              <span>Generate Comparison PDF</span>
            </button>
          </div>
        </section>

        {/* Radiograph Comparison Canvas */}
        <section className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
          {/* Top HUD Controls */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-200">Synchronized Viewport:</span>
              <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                <button
                  type="button"
                  onClick={() => handleZoom(-20)}
                  disabled={zoomLevel <= 80}
                  className="p-1 rounded hover:bg-slate-700 text-slate-300 disabled:opacity-40"
                  title="Zoom Out"
                >
                  <Icon name="remove" className="text-sm" />
                </button>
                <span className="px-2 font-mono font-bold text-white min-w-[48px] text-center">{zoomLevel}%</span>
                <button
                  type="button"
                  onClick={() => handleZoom(20)}
                  disabled={zoomLevel >= 200}
                  className="p-1 rounded hover:bg-slate-700 text-slate-300 disabled:opacity-40"
                  title="Zoom In"
                >
                  <Icon name="add" className="text-sm" />
                </button>
              </div>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={isSyncPan}
                  onChange={(e) => setIsSyncPan(e.target.checked)}
                  className="rounded border-slate-700 text-primary focus:ring-0"
                />
                <span>Sync Pan & Zoom</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={showHeatmap}
                  onChange={(e) => setShowHeatmap(e.target.checked)}
                  className="rounded border-slate-700 text-primary focus:ring-0"
                />
                <span>Delta Heatmap Overlay</span>
              </label>
            </div>

            {viewMode === 'overlay' && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono text-[11px]">T0 Blend:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                  className="w-32 accent-primary cursor-pointer"
                />
                <span className="text-white font-mono min-w-[32px]">{overlayOpacity}%</span>
              </div>
            )}
          </div>

          {/* Canvas Display Body */}
          <div className="relative min-h-[440px] flex items-center justify-center p-6 bg-slate-950 overflow-hidden">
            {viewMode === 'split' ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Baseline T0 */}
                <div className="relative bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
                  <div className="w-full flex items-center justify-between text-xs text-slate-400 pb-2 mb-2 border-b border-slate-800">
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <Icon name="history" className="text-sm" />
                      T0: Baseline (14 Oct 2024)
                    </span>
                    <span className="font-mono text-[11px]">Depth: 0.60 mm (Enamel only)</span>
                  </div>

                  {/* SVG Radiograph Graphic T0 */}
                  <div
                    className="relative transition-transform duration-200"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  >
                    <svg width="280" height="240" viewBox="0 0 280 240" className="rounded-xl shadow-lg bg-black">
                      <rect width="280" height="240" fill="#0b0f19" />
                      {/* Alveolar Bone Background */}
                      <path d="M 0 160 Q 140 150 280 160 L 280 240 L 0 240 Z" fill="#1e293b" opacity="0.8" />
                      {/* Bone Trabeculae Texture */}
                      <circle cx="60" cy="190" r="12" fill="#334155" opacity="0.4" />
                      <circle cx="160" cy="200" r="18" fill="#334155" opacity="0.4" />
                      <circle cx="220" cy="180" r="14" fill="#334155" opacity="0.4" />

                      {/* Tooth #16 Molar Body */}
                      <path
                        d="M 60 40 C 90 20, 200 20, 220 40 C 235 60, 240 140, 220 180 C 200 210, 180 220, 160 210 C 140 170, 120 170, 100 210 C 70 210, 50 160, 55 120 C 50 80, 50 55, 60 40 Z"
                        fill="#cbd5e1"
                      />
                      {/* Pulp Chamber (Radiolucent) */}
                      <path
                        d="M 120 90 C 130 75, 160 75, 170 90 C 175 110, 170 140, 160 170 C 150 160, 135 160, 125 170 C 120 140, 115 110, 120 90 Z"
                        fill="#0f172a"
                      />

                      {/* T0 Lesion: Shallow Enamel Notch on Distal Aspect */}
                      <path d="M 215 50 Q 208 58 214 66 Z" fill="#475569" stroke="#38bdf8" strokeWidth="1" />
                      <line x1="215" y1="58" x2="245" y2="58" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 1" />
                      <text x="250" y="62" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                        0.6mm
                      </text>
                    </svg>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-3">Sensor: Planmeca ProMax • 63 kVp</span>
                </div>

                {/* Right: Current T1 */}
                <div className="relative bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
                  <div className="w-full flex items-center justify-between text-xs text-slate-400 pb-2 mb-2 border-b border-slate-800">
                    <span className="font-bold text-rose-400 flex items-center gap-1">
                      <Icon name="schedule" className="text-sm" />
                      T1: Current (16 Feb 2025)
                    </span>
                    <span className="font-mono text-[11px] text-rose-300 font-bold">Depth: 2.10 mm (In Dentin)</span>
                  </div>

                  {/* SVG Radiograph Graphic T1 */}
                  <div
                    className="relative transition-transform duration-200"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                  >
                    <svg width="280" height="240" viewBox="0 0 280 240" className="rounded-xl shadow-lg bg-black">
                      <rect width="280" height="240" fill="#0b0f19" />
                      {/* Alveolar Bone Background */}
                      <path d="M 0 160 Q 140 150 280 160 L 280 240 L 0 240 Z" fill="#1e293b" opacity="0.8" />
                      <circle cx="60" cy="190" r="12" fill="#334155" opacity="0.4" />
                      <circle cx="160" cy="200" r="18" fill="#334155" opacity="0.4" />
                      <circle cx="220" cy="180" r="14" fill="#334155" opacity="0.4" />

                      {/* Tooth #16 Molar Body */}
                      <path
                        d="M 60 40 C 90 20, 200 20, 220 40 C 235 60, 240 140, 220 180 C 200 210, 180 220, 160 210 C 140 170, 120 170, 100 210 C 70 210, 50 160, 55 120 C 50 80, 50 55, 60 40 Z"
                        fill="#cbd5e1"
                      />
                      {/* Pulp Chamber */}
                      <path
                        d="M 120 90 C 130 75, 160 75, 170 90 C 175 110, 170 140, 160 170 C 150 160, 135 160, 125 170 C 120 140, 115 110, 120 90 Z"
                        fill="#0f172a"
                      />

                      {/* T1 Lesion: Deep Radiolucency Breaching EDJ into Dentin */}
                      <path
                        d="M 218 45 C 190 55, 192 75, 216 80 Z"
                        fill="#1e293b"
                        stroke="#f43f5e"
                        strokeWidth="2"
                      />

                      {/* Delta Heatmap Glow Overlay */}
                      {showHeatmap && (
                        <ellipse cx="205" cy="62" rx="14" ry="12" fill="#ef4444" opacity="0.55" className="animate-pulse" />
                      )}

                      <line x1="218" y1="62" x2="192" y2="62" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 1" />
                      <line x1="192" y1="58" x2="192" y2="66" stroke="#f43f5e" strokeWidth="2" />
                      <line x1="218" y1="58" x2="218" y2="66" stroke="#f43f5e" strokeWidth="2" />
                      <text x="140" y="65" fill="#f43f5e" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        2.1mm
                      </text>
                    </svg>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-3">Sensor: Carestream RVG 6200 • 60 kVp</span>
                </div>
              </div>
            ) : (
              /* Overlay / Wipe Blend Mode */
              <div className="relative flex items-center justify-center">
                <div
                  className="relative transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                >
                  {/* Current T1 Base */}
                  <svg width="340" height="280" viewBox="0 0 280 240" className="rounded-xl shadow-lg bg-black">
                    <rect width="280" height="240" fill="#0b0f19" />
                    <path d="M 0 160 Q 140 150 280 160 L 280 240 L 0 240 Z" fill="#1e293b" opacity="0.8" />
                    <path
                      d="M 60 40 C 90 20, 200 20, 220 40 C 235 60, 240 140, 220 180 C 200 210, 180 220, 160 210 C 140 170, 120 170, 100 210 C 70 210, 50 160, 55 120 C 50 80, 50 55, 60 40 Z"
                      fill="#cbd5e1"
                    />
                    <path
                      d="M 120 90 C 130 75, 160 75, 170 90 C 175 110, 170 140, 160 170 C 150 160, 135 160, 125 170 C 120 140, 115 110, 120 90 Z"
                      fill="#0f172a"
                    />
                    <path d="M 218 45 C 190 55, 192 75, 216 80 Z" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                    {showHeatmap && (
                      <ellipse cx="205" cy="62" rx="14" ry="12" fill="#ef4444" opacity="0.6" />
                    )}
                  </svg>

                  {/* Baseline T0 Overlay with Variable Opacity */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                    style={{ opacity: overlayOpacity / 100 }}
                  >
                    <svg width="340" height="280" viewBox="0 0 280 240" className="rounded-xl">
                      <path
                        d="M 60 40 C 90 20, 200 20, 220 40 C 235 60, 240 140, 220 180 C 200 210, 180 220, 160 210 C 140 170, 120 170, 100 210 C 70 210, 50 160, 55 120 C 50 80, 50 55, 60 40 Z"
                        fill="#38bdf8"
                        opacity="0.3"
                      />
                      <path d="M 215 50 Q 208 58 214 66 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Quantitative Landmark Metrics & Progression Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Quantitative Metrics Table (7 Cols) */}
          <section className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                <Icon name="analytics" className="text-sm text-primary" />
                <span>Quantitative Landmark Metrics Table</span>
              </h3>
              <span className="text-[11px] font-mono text-outline">Calibration: 24.2 px/mm</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-on-surface-variant font-semibold">
                    <th className="py-2.5 px-3">Anatomic Landmark</th>
                    <th className="py-2.5 px-3">Baseline T0</th>
                    <th className="py-2.5 px-3">Current T1</th>
                    <th className="py-2.5 px-3">Delta (Δ)</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  <tr className="hover:bg-surface-container-low/50">
                    <td className="py-2.5 px-3 font-semibold text-on-surface">Lesion Penetration Depth</td>
                    <td className="py-2.5 px-3 font-mono">0.60 mm</td>
                    <td className="py-2.5 px-3 font-mono text-rose-600 font-bold">2.10 mm</td>
                    <td className="py-2.5 px-3 font-mono text-rose-700 font-bold bg-rose-50 rounded">
                      +1.50 mm
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                        Active Progression
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/50">
                    <td className="py-2.5 px-3 font-semibold text-on-surface">Enamel-Dentin Junction (EDJ)</td>
                    <td className="py-2.5 px-3">Intact Boundary</td>
                    <td className="py-2.5 px-3 text-rose-600 font-semibold">Breached</td>
                    <td className="py-2.5 px-3 font-mono text-outline">Compromised</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                        Intervention Req.
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/50">
                    <td className="py-2.5 px-3 font-semibold text-on-surface">Alveolar Crestal Height</td>
                    <td className="py-2.5 px-3 font-mono">1.42 mm</td>
                    <td className="py-2.5 px-3 font-mono">1.40 mm</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-700">-0.02 mm</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Stable Bone
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/50">
                    <td className="py-2.5 px-3 font-semibold text-on-surface">Lamina Dura Integrity</td>
                    <td className="py-2.5 px-3">Continuous</td>
                    <td className="py-2.5 px-3">Continuous</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-700">0.00 mm</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        No Periapical
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <span className="font-bold block mb-1">Caries Velocity Calculated:</span>
              <p className="text-[11px] leading-relaxed">
                Lesion velocity is <span className="font-bold">0.012 mm/day (0.36 mm/month)</span>. Without immediate
                restorative intervention, pulp chamber breach estimated within 4–6 months.
              </p>
            </div>
          </section>

          {/* Clinical Action Decision Tree (5 Cols) */}
          <section className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
              <Icon name="alt_route" className="text-sm text-primary" />
              <span>Evidence-Based Clinical Directives</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-2.5">
                <Icon name="check_circle" className="text-base text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-on-surface block">Restorative Directive (Urgent &lt; 7 Days)</span>
                  <span className="text-[11px] text-on-surface-variant">
                    Tooth #16 DO Biomimetic composite restoration under rubber dam isolation.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-2.5">
                <Icon name="update" className="text-base text-secondary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-on-surface block">Recare Interval Compression</span>
                  <span className="text-[11px] text-on-surface-variant">
                    Shorten bitewing surveillance interval from 12 months to 6 months.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-2.5">
                <Icon name="medication" className="text-base text-tertiary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-on-surface block">Preventive Chemotherapy</span>
                  <span className="text-[11px] text-on-surface-variant">
                    Prescribe 5,000 ppm high-fluoride toothpaste + 5% NaF varnish application.
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Navigation Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => navigate('/investigations/follow-up')}
                className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 shadow-sm transition-all"
              >
                <Icon name="schedule_send" className="text-base" />
                <span>Assign Clinical Follow-Up (11.22)</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/investigations/review')}
                className="w-full py-2.5 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs flex items-center justify-center gap-2 border border-outline-variant/30 transition-colors"
              >
                <Icon name="arrow_back" className="text-base" />
                <span>Return to Clinical Review (11.20)</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </InvestigationShell>
  );
}

