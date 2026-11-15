import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

interface AnnotationPin {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  category: 'Caries' | 'Measurement' | 'Healthy' | 'Note';
  description: string;
  icdas?: string;
}

export function ClinicalPhotographViewerScreen() {
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [filterMode, setFilterMode] = useState<'natural' | 'crosspol' | 'fissure'>('crosspol');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showCrosshair, setShowCrosshair] = useState<boolean>(false);
  const [selectedPinId, setSelectedPinId] = useState<string>('pin-1');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [isExifDrawerOpen, setIsExifDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pins: AnnotationPin[] = [
    {
      id: 'pin-1',
      x: 52,
      y: 46,
      title: 'Tooth #16 Disto-Occlusal Fissure',
      category: 'Caries',
      icdas: 'ICDAS 3 (Micro-Cavitation)',
      description: 'Localized enamel breakdown with underlying shadow into outer dentin. Depth ~1.2mm.',
    },
    {
      id: 'pin-2',
      x: 62,
      y: 44,
      title: 'Digital Caliper Pin',
      category: 'Measurement',
      description: 'Caliper distance: 2.40 mm between mesial and distal fissure margins.',
    },
    {
      id: 'pin-3',
      x: 28,
      y: 48,
      title: '#15 Distal Contact Zone',
      category: 'Healthy',
      description: 'Intact marginal ridge, physiologic contact point with #16 mesial surface, no interproximal shadowing.',
    },
  ];

  const galleryPhotos = [
    {
      id: 'photo-1',
      title: 'Tooth #16 Occlusal Macro',
      timestamp: 'Today, 10:14 AM',
      type: 'Macro 1:1',
      badge: 'Current Target',
      lens: 'RF 100mm f/2.8L',
    },
    {
      id: 'photo-2',
      title: 'Maxillary Right Mirror View',
      timestamp: 'Today, 10:16 AM',
      type: 'Intraoral Mirror',
      badge: 'Supporting',
      lens: 'RF 100mm f/2.8L',
    },
    {
      id: 'photo-3',
      title: 'Buccal Retracted Aspect',
      timestamp: 'Today, 10:18 AM',
      type: 'Retracted Field',
      badge: 'Gingival Check',
      lens: 'RF 100mm f/2.8L',
    },
    {
      id: 'photo-4',
      title: 'Baseline Pre-Op Photo',
      timestamp: '14 Oct 2024',
      type: 'Arch Archive',
      badge: 'Historic T0',
      lens: 'EF 100mm f/2.8L',
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(200, Math.max(80, prev + delta)));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const activePin = pins.find((p) => p.id === selectedPinId) || pins[0];

  return (
    <InvestigationShell
      pageTitle="Clinical Photograph Viewer"
      badgeCode="11.19"
      badgeLabel="Clinical Macro Photography"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="INV-2025-0914-PHOTO"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 select-none">
        {/* Toast alert */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Control Bar */}
        <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center shrink-0">
              <Icon name="photo_camera" className="text-2xl" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-on-surface">Tooth #16 Occlusal Surface Macro</h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
                  Canon EOS R6 Mark II • RF 100mm f/2.8L Macro
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Cross-Polarized Polar Ring
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Captured by Nurse Zainab Tariq (#RAD-10928) • Calibrated 1:1 reproduction scale • Color standard Delta-E &lt; 1.2
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={() => setIsExifDrawerOpen(!isExifDrawerOpen)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${isExifDrawerOpen
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container border-outline-variant/40'
                }`}
            >
              <Icon name="info" className="text-sm" />
              <span>{isExifDrawerOpen ? 'Hide Camera Metadata' : 'Camera EXIF Data'}</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('High-Res 24MP Uncompressed TIFF queued for export.')}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/40 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="download" className="text-sm text-outline" />
              <span className="hidden sm:inline">Export RAW/TIFF</span>
            </button>

            <NavLink
              to="/investigations/review"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="fact_check" className="text-sm" />
              <span>Send to Clinical Review</span>
            </NavLink>
          </div>
        </section>

        {/* EXIF Metadata Card (Expandable) */}
        {isExifDrawerOpen && (
          <section className="bg-surface-container-low/70 border border-outline-variant/30 rounded-2xl p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs animate-fadeIn">
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
              <span className="text-[10px] uppercase font-mono tracking-wider text-outline block">Camera Body</span>
              <span className="font-semibold text-on-surface">Canon EOS R6 Mk II</span>
              <span className="text-[10px] text-on-surface-variant block">Full Frame 24.2 MP</span>
            </div>
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
              <span className="text-[10px] uppercase font-mono tracking-wider text-outline block">Macro Lens</span>
              <span className="font-semibold text-on-surface">RF 100mm f/2.8L</span>
              <span className="text-[10px] text-on-surface-variant block">1.4x Magnification IS</span>
            </div>
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
              <span className="text-[10px] uppercase font-mono tracking-wider text-outline block">Lighting Modality</span>
              <span className="font-semibold text-on-surface">Godox MF-R76 Ring</span>
              <span className="text-[10px] text-emerald-700 font-medium block">Dual Polarized 5600K</span>
            </div>
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
              <span className="text-[10px] uppercase font-mono tracking-wider text-outline block">Exposure Triad</span>
              <span className="font-semibold text-on-surface">f/22 • 1/200s</span>
              <span className="text-[10px] text-on-surface-variant block">ISO 200 Native</span>
            </div>
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
              <span className="text-[10px] uppercase font-mono tracking-wider text-outline block">Color Profile</span>
              <span className="font-semibold text-on-surface">DHA D65 Calibrated</span>
              <span className="text-[10px] text-on-surface-variant block">X-Rite ColorChecker 24</span>
            </div>
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
              <span className="text-[10px] uppercase font-mono tracking-wider text-outline block">DICOM Integration</span>
              <span className="font-semibold text-on-surface font-mono">DHA-WORM-SHA256</span>
              <span className="text-[10px] text-emerald-700 font-medium block">NABIDH Hash Sealed</span>
            </div>
          </section>
        )}

        {/* Main Workspace Layout: Canvas on Left/Center, Diagnostic Sidebar on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Photograph Viewer Canvas (8 Cols) */}
          <section className="lg:col-span-8 flex flex-col gap-4">
            {/* Viewport Frame */}
            <div className="relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col min-h-[480px] sm:min-h-[540px]">
              {/* Canvas HUD Overlay Bar */}
              <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
                <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-slate-200 text-xs pointer-events-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono font-semibold">T16-OCCLUSAL</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400 font-mono">{zoomLevel}%</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400 font-mono">{rotation}°</span>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md p-1 rounded-full border border-slate-700/60 pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => setFilterMode('natural')}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${filterMode === 'natural' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                      }`}
                  >
                    Natural
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterMode('crosspol')}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${filterMode === 'crosspol' ? 'bg-emerald-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                      }`}
                  >
                    Cross-Polarized
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterMode('fissure')}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${filterMode === 'fissure' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                      }`}
                  >
                    Caries Boost
                  </button>
                </div>
              </div>

              {/* Graphical Tooth Anatomy & Live Photograph Canvas */}
              <div className="relative flex-1 flex items-center justify-center p-8 overflow-hidden bg-radial from-slate-900 via-slate-950 to-black">
                {/* 1mm Calibrated Grid Overlay */}
                {showGrid && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                )}

                {/* Crosshair target overlay */}
                {showCrosshair && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-full h-[1px] bg-cyan-400/30" />
                    <div className="h-full w-[1px] bg-cyan-400/30 absolute" />
                    <div className="w-16 h-16 rounded-full border border-cyan-400/40 absolute" />
                  </div>
                )}

                {/* Interactive Scalable Photo Content */}
                <div
                  className="relative transition-transform duration-200 cursor-crosshair"
                  style={{
                    transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                  }}
                >
                  {/* High-Fidelity SVG Occlusal Molar Anatomy Representation */}
                  <svg
                    width="340"
                    height="320"
                    viewBox="0 0 340 320"
                    className={`rounded-3xl shadow-2xl transition-all duration-300 ${filterMode === 'crosspol'
                      ? 'contrast-125 saturate-110 drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]'
                      : filterMode === 'fissure'
                        ? 'contrast-150 brightness-95 saturate-150'
                        : 'contrast-100'
                      }`}
                  >
                    <defs>
                      {/* Enamel Gradient */}
                      <radialGradient id="enamelGrad" cx="50%" cy="45%" r="50%">
                        <stop offset="0%" stopColor="#fff8eb" />
                        <stop offset="45%" stopColor="#f7ecd7" />
                        <stop offset="80%" stopColor="#eedec2" />
                        <stop offset="100%" stopColor="#c5ad89" />
                      </radialGradient>

                      {/* Translucency Cusp Gradients */}
                      <linearGradient id="cuspShine" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f5ebda" stopOpacity="0.1" />
                      </linearGradient>

                      {/* Cavitation Shadow */}
                      <radialGradient id="cavityGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#2b1406" />
                        <stop offset="60%" stopColor="#5a2e10" />
                        <stop offset="90%" stopColor="#9a5a22" />
                        <stop offset="100%" stopColor="#ca904a" />
                      </radialGradient>

                      {/* Gingival Surrounding Tissue */}
                      <radialGradient id="gumBg" cx="50%" cy="50%" r="65%">
                        <stop offset="0%" stopColor="#c9586e" />
                        <stop offset="60%" stopColor="#943347" />
                        <stop offset="100%" stopColor="#5c1c2b" />
                      </radialGradient>
                    </defs>

                    {/* Surrounding Gingival Retracted Frame */}
                    <rect width="340" height="320" rx="28" fill="url(#gumBg)" />

                    {/* Rubber Dam Ring Clamp Outline (Virtual) */}
                    <ellipse cx="170" cy="160" rx="148" ry="136" fill="none" stroke="#64748b" strokeWidth="4" strokeDasharray="6 4" opacity="0.4" />

                    {/* Adjacent Tooth #15 Marginal Ridge Visible */}
                    <path
                      d="M 20 80 Q 55 160 20 240 Q 60 220 80 160 Q 60 100 20 80 Z"
                      fill="#e8dbbf"
                      stroke="#ab9370"
                      strokeWidth="2"
                    />

                    {/* Tooth #16 Main Molar Body (Rhomboid Occlusal Outline) */}
                    <path
                      d="M 95 95 
                         C 130 55, 230 55, 260 85 
                         C 295 120, 290 200, 265 240 
                         C 230 275, 130 270, 95 235 
                         C 70 200, 65 125, 95 95 Z"
                      fill="url(#enamelGrad)"
                      stroke="#8c7352"
                      strokeWidth="3.5"
                    />

                    {/* Cuspal Inclines / Triangular Ridges */}
                    {/* Mesiobuccal Cusp */}
                    <path d="M 105 105 Q 145 130 160 155 Q 120 165 95 135 Z" fill="url(#cuspShine)" opacity="0.6" />
                    {/* Distobuccal Cusp */}
                    <path d="M 245 95 Q 210 130 180 155 Q 220 165 255 130 Z" fill="url(#cuspShine)" opacity="0.6" />
                    {/* Mesiolingual Cusp (Largest) */}
                    <path d="M 105 220 Q 145 180 165 160 Q 130 155 100 185 Z" fill="url(#cuspShine)" opacity="0.6" />
                    {/* Distolingual Cusp */}
                    <path d="M 255 225 Q 210 185 185 160 Q 220 155 245 195 Z" fill="url(#cuspShine)" opacity="0.6" />

                    {/* Fissure System: Central Developmental Groove & Oblique Ridge */}
                    <path
                      d="M 115 155 Q 165 150 175 160 Q 185 170 240 165"
                      fill="none"
                      stroke="#573617"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 175 160 Q 210 120 235 110"
                      fill="none"
                      stroke="#6b4520"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 170 165 Q 155 205 145 225"
                      fill="none"
                      stroke="#573617"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* TARGET LESION: Disto-Occlusal Pit / Fissure Microcavitation */}
                    <circle cx="195" cy="158" r="9" fill="url(#cavityGrad)" stroke="#1a0c03" strokeWidth="1.5" />
                    <circle cx="193" cy="156" r="3" fill="#0f0702" />

                    {/* Demineralized Enamel White Spot Halo */}
                    <circle cx="195" cy="158" r="16" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2" opacity="0.75" />

                    {/* Caliper 2.4mm measurement indicator graphic */}
                    <g opacity="0.85">
                      <line x1="175" y1="135" x2="215" y2="135" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 1" />
                      <line x1="175" y1="130" x2="175" y2="140" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="215" y1="130" x2="215" y2="140" stroke="#38bdf8" strokeWidth="2" />
                      <text x="180" y="128" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        2.4 mm
                      </text>
                    </g>
                  </svg>

                  {/* Interactive Annotation Pins Overlay */}
                  {pins.map((pin) => {
                    const isSelected = pin.id === selectedPinId;
                    return (
                      <button
                        key={pin.id}
                        type="button"
                        onClick={() => setSelectedPinId(pin.id)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform ${isSelected ? 'scale-125 z-30' : 'scale-100 z-10 hover:scale-110'
                          }`}
                        style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                        title={pin.title}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 text-xs font-bold transition-all ${pin.category === 'Caries'
                            ? isSelected
                              ? 'bg-rose-500 text-white border-white ring-4 ring-rose-500/40 animate-pulse'
                              : 'bg-rose-600/90 text-white border-rose-200'
                            : pin.category === 'Measurement'
                              ? isSelected
                                ? 'bg-cyan-500 text-slate-950 border-white ring-4 ring-cyan-500/40'
                                : 'bg-cyan-600/90 text-white border-cyan-200'
                              : isSelected
                                ? 'bg-emerald-500 text-white border-white ring-4 ring-emerald-500/40'
                                : 'bg-emerald-600/90 text-white border-emerald-200'
                            }`}
                        >
                          <Icon
                            name={
                              pin.category === 'Caries'
                                ? 'priority_high'
                                : pin.category === 'Measurement'
                                  ? 'straighten'
                                  : 'check'
                            }
                            className="text-sm font-bold"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Canvas Toolbar */}
              <div className="bg-slate-900 border-t border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">Zoom:</span>
                  <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                    <button
                      type="button"
                      onClick={() => handleZoom(-20)}
                      className="p-1.5 rounded hover:bg-slate-700 text-slate-300 disabled:opacity-40"
                      disabled={zoomLevel <= 80}
                      title="Zoom Out"
                    >
                      <Icon name="remove" className="text-sm" />
                    </button>
                    <span className="px-2 font-mono font-bold text-white min-w-[48px] text-center">{zoomLevel}%</span>
                    <button
                      type="button"
                      onClick={() => handleZoom(20)}
                      className="p-1.5 rounded hover:bg-slate-700 text-slate-300 disabled:opacity-40"
                      disabled={zoomLevel >= 200}
                      title="Zoom In"
                    >
                      <Icon name="add" className="text-sm" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setZoomLevel(100)}
                    className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-mono"
                    title="100% 1:1 Actual Macro Size"
                  >
                    1:1
                  </button>

                  <button
                    type="button"
                    onClick={handleRotate}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1"
                    title="Rotate 90 Degrees"
                  >
                    <Icon name="rotate_right" className="text-base" />
                    <span className="font-mono">{rotation}°</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={showGrid}
                      onChange={(e) => setShowGrid(e.target.checked)}
                      className="rounded border-slate-700 text-primary focus:ring-0"
                    />
                    <span>1mm Grid</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={showCrosshair}
                      onChange={(e) => setShowCrosshair(e.target.checked)}
                      className="rounded border-slate-700 text-primary focus:ring-0"
                    />
                    <span>Crosshair</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Longitudinal Session Photographic Strip */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon name="collections" className="text-primary text-base" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                    Clinical Series & Longitudinal Comparative Shots
                  </h3>
                </div>
                <span className="text-[11px] text-outline">4 Exposures Linked</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {galleryPhotos.map((photo, idx) => {
                  const isActive = idx === selectedPhotoIndex;
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => {
                        setSelectedPhotoIndex(idx);
                        showToast(`Loaded ${photo.title}`);
                      }}
                      className={`text-left p-2.5 rounded-xl border transition-all ${isActive
                        ? 'bg-primary/5 border-primary shadow-sm ring-2 ring-primary/20'
                        : 'bg-surface-container-low/50 border-outline-variant/30 hover:bg-surface-container hover:border-outline-variant'
                        }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${isActive ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant'
                            }`}
                        >
                          {photo.badge}
                        </span>
                        <span className="text-[10px] font-mono text-outline">{photo.type}</span>
                      </div>
                      <h4 className="text-xs font-bold text-on-surface line-clamp-1">{photo.title}</h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">{photo.timestamp}</p>
                      <p className="text-[10px] text-outline font-mono mt-1">{photo.lens}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Right Diagnostic Callout & Clinical Interpretation Panel (4 Cols) */}
          <section className="lg:col-span-4 flex flex-col gap-4">
            {/* Selected Landmark Detail Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Active Annotation</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activePin.category === 'Caries'
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : activePin.category === 'Measurement'
                      ? 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                >
                  {activePin.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-on-surface">{activePin.title}</h3>
              {activePin.icdas && (
                <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
                  <Icon name="warning" className="text-sm" />
                  <span>{activePin.icdas}</span>
                </div>
              )}

              <p className="text-xs text-on-surface-variant leading-relaxed mt-3 bg-surface-container-low/60 p-3 rounded-xl border border-outline-variant/20">
                {activePin.description}
              </p>

              {/* Pin Switcher Tabs */}
              <div className="mt-4 pt-3 border-t border-outline-variant/30 flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold text-outline">Switch Target Pin:</span>
                <div className="flex flex-col gap-1">
                  {pins.map((pin) => (
                    <button
                      key={pin.id}
                      type="button"
                      onClick={() => setSelectedPinId(pin.id)}
                      className={`text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${pin.id === selectedPinId
                        ? 'bg-primary/10 text-primary font-bold border border-primary/30'
                        : 'hover:bg-surface-container-low text-on-surface'
                        }`}
                    >
                      <span className="truncate">{pin.title}</span>
                      <span className="text-[10px] font-mono text-outline shrink-0 ml-2">{pin.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ICDAS & Colorimetry Scoring Reference */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                <Icon name="palette" className="text-sm text-primary" />
                <span>ICDAS Caries Criteria & Vitality</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <span className="font-semibold text-on-surface block">ICDAS Code 3</span>
                    <span className="text-[11px] text-on-surface-variant">
                      Localized enamel breakdown due to caries with no visible dentin or underlying shadow.
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <span className="font-semibold text-on-surface block">ICDAS Code 4</span>
                    <span className="text-[11px] text-on-surface-variant">
                      Underlying dark shadow from dentine with or without localized enamel breakdown.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Icon name="verified" className="text-sm text-emerald-600" />
                  <span>Cross-Correlation with Bitewing</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-normal">
                  Clinical photo correlates with Right Bitewing (#INV-2025-0914-BWPA): radiolucency extends into the outer 1/3 of coronal dentin.
                </p>
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm flex flex-col gap-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-outline mb-1">Next Clinical Actions</h4>

              <button
                type="button"
                onClick={() => navigate('/investigations/review')}
                className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 shadow-sm transition-all"
              >
                <Icon name="fact_check" className="text-base" />
                <span>Open Clinical Interpretation (11.20)</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/investigations/compare')}
                className="w-full py-2.5 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs flex items-center justify-center gap-2 border border-outline-variant/30 transition-colors"
              >
                <Icon name="compare" className="text-base text-primary" />
                <span>Compare with Baseline 2024 (11.21)</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/investigations/library')}
                className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-surface-container-low text-on-surface-variant font-medium text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Icon name="arrow_back" className="text-base" />
                <span>Return to Investigation Library</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </InvestigationShell>
  );
}

