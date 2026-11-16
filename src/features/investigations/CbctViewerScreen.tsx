import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

export function CbctViewerScreen() {
  const [sliceIndex, setSliceIndex] = useState<number>(148);
  const [activePreset, setActivePreset] = useState<'bone' | 'soft' | 'endo'>('bone');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleSavePlan = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setActionFeedback('Implant surgical measurement & MPR report saved to patient record.');
      setTimeout(() => {
        setSaveSuccess(false);
        setActionFeedback(null);
      }, 3500);
    }, 900);
  };

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  return (
    <InvestigationShell
      pageTitle="CBCT Imaging Viewer"
      badgeCode="11.17"
      badgeLabel="3D Volumetric MPR"
      patientName="Fatima Bello"
      dhaId="DHA-08921"
      orderRef="CBCT-2025-0902"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 select-none">
        {/* Toast Feedback */}
        {actionFeedback && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Top Clinical Scan Metadata Banner */}
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-on-surface text-base sm:text-lg truncate">
                  Fatima Bello
                </span>
                <span className="text-xs text-secondary font-bold uppercase bg-secondary-fixed/30 px-2.5 py-0.5 rounded-full">
                  29y F • DHA-08921
                </span>
              </div>
              <p className="text-xs text-outline mt-1 truncate">
                Ref: #CBCT-2025-0902 • Quadrant 1 Maxillary Implant Planning (#14–#16)
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto bg-surface-container-high px-3 py-1.5 rounded-xl border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-xs text-on-surface-variant font-semibold">
                MPR 4-View Active
              </span>
            </div>
          </div>

          {/* Machine Specs Badge Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-outline-variant/20 pt-3 no-scrollbar text-xs">
            <div className="flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-lg text-on-surface-variant whitespace-nowrap">
              <Icon name="view_in_ar" className="text-primary text-base" />
              <span>FOV 8×8 cm</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-lg text-on-surface-variant whitespace-nowrap">
              <Icon name="grain" className="text-primary text-base" />
              <span>80μm High-Res Voxel</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-lg text-on-surface-variant whitespace-nowrap">
              <Icon name="scanner" className="text-primary text-base" />
              <span>Morita Veraview X800</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-lg text-on-surface-variant whitespace-nowrap">
              <Icon name="rotate_right" className="text-primary text-base" />
              <span>360° Acquisition</span>
            </div>
          </div>
        </section>

        {/* MPR 2x2 Workstation Viewport Grid & Slice Scrubber */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Viewports (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-on-surface-variant px-1">
              <div className="flex items-center gap-2">
                <Icon name="grid_view" className="text-primary text-base" />
                <span className="font-semibold text-on-surface">Multi-Planar Reconstruction (4-View Matrix)</span>
              </div>
              <div className="flex items-center gap-1.5 text-secondary font-mono text-[11px]">
                <Icon name="lock" className="text-sm" />
                <span>Orthogonal Sync Locked</span>
              </div>
            </div>

            {/* 2x2 Workstation Viewport Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-inverse-surface p-3 rounded-2xl shadow-xl border border-slate-800">
              {/* View 1: 3D Volumetric Volume */}
              <div className="relative bg-black rounded-xl overflow-hidden flex flex-col h-52 sm:h-56 shadow-inner border border-slate-800">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa8nlncc-CbPd9Yw0ktnS8vtprANYgDtY_nfOkZxPnSQbHk4FzXfmAeXkWrg7CzV_XhF8KvBB4rH7_QjoqUxKxKMtukJ0h1uu7A4AyabPwpTvwHBCDWqv96XMEOu6Ednwlk1t2NNUw_S3MMidn7EhjH8DYNDyhar4qygp0Fdm2uH-A24MBUvYfFTe8O4JMt5ddC-F0EFrVW_kzzJ75Uz3NvNUUodlDo7o6xozDPJVm"
                  alt="3D dental cone beam CT volumetric rendering"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded text-white text-[11px] font-medium border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>3D Volume</span>
                </div>
                <div className="absolute bottom-2 left-2 font-mono text-[10px] text-white/80 bg-black/70 px-1.5 py-0.5 rounded">
                  VR: Bone ISO 1100
                </div>
                <div className="absolute top-2 right-2 font-mono text-[10px] text-secondary-fixed bg-black/70 px-1.5 py-0.5 rounded">
                  Site #15 Target
                </div>
                {/* Virtual Implant Vector Badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-16 border border-dashed border-secondary-fixed/90 rounded bg-secondary-fixed/20 flex flex-col items-center justify-between py-1 shadow-sm">
                    <span className="text-[9px] font-mono text-white font-bold">Ø4.0</span>
                    <Icon name="arrow_downward" className="text-secondary-fixed text-xs" />
                    <span className="text-[9px] font-mono text-white font-bold">10mm</span>
                  </div>
                </div>
              </div>

              {/* View 2: Axial Slice */}
              <div className="relative bg-black rounded-xl overflow-hidden flex flex-col h-52 sm:h-56 shadow-inner border border-slate-800">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlLZZVhRLWkwraEhgmNsw-IBtmLZBXWhvPPTNfx1EXrroSnxhWyURfO-xYF1RdAZ1VGxtX5pzh3ysJCjjGXygaRwvXDALK7Sw5WeLKamB7RxUqfcm_WjA68kLLcPfkxFC2fs7DjngdJhmOEC3OAInnatEVt9viqZGC0AXiJ4BSslg79P96zgZOFdcZYNrCcbC7eIdBQWtrEZrWUTkISOpMrxzaoda8qNCe3oSAQT1n"
                  alt="Axial CT slice"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded text-primary-fixed-dim text-[11px] font-medium border border-white/10">
                  <span>Axial (Z)</span>
                </div>
                <div className="absolute bottom-2 left-2 font-mono text-[10px] text-white/80 bg-black/70 px-1.5 py-0.5 rounded">
                  Z: -14.2 mm
                </div>
                <div className="absolute top-2 right-2 font-mono text-[10px] text-white/70 bg-black/70 px-1.5 py-0.5 rounded">
                  FOV 80×80
                </div>
                {/* Crosshair Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-[1px] bg-primary-fixed-dim/40" />
                  <div className="h-full w-[1px] bg-primary-fixed-dim/40 absolute" />
                  <div className="w-4 h-4 rounded-full border border-secondary-fixed absolute" />
                </div>
              </div>

              {/* View 3: Coronal Slice */}
              <div className="relative bg-black rounded-xl overflow-hidden flex flex-col h-52 sm:h-56 shadow-inner border border-slate-800">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-TKEOyeS54rLTUAJej8-wooWuLXCNijTjagCWXJ0GtXO7LJmXiHUvFE8eHFkA891S_YEmbJdebycFyzz0qfZiNznL0qSBRm6xlTzvdtcesS_k47IA338Ng_kJPZJf_QxkIN4K3HTHy-Z_YVQQRtTPq4uTJCdDheYOrTdkwlrMN3wFZC-cTWWxs12VbxVVz7UWqaidY_lOgDqf-Yu4XU0O73fK6BZOKmoZxP8kNq7k"
                  alt="Coronal CT slice"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded text-secondary-fixed text-[11px] font-medium border border-white/10">
                  <span>Coronal (Y)</span>
                </div>
                <div className="absolute bottom-2 left-2 font-mono text-[10px] text-white/80 bg-black/70 px-1.5 py-0.5 rounded">
                  Y: +8.6 mm
                </div>
                {/* Sinus Floor Caliper Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-20 h-10 border-b-2 border-secondary-fixed/90 flex items-end justify-center">
                    <span className="text-[10px] font-mono text-secondary-fixed bg-black/80 px-1.5 py-0.5 rounded mb-1">
                      H: 8.4mm
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-white/80 mt-1">Sinus Floor Margin</span>
                </div>
              </div>

              {/* View 4: Sagittal / Cross-Sectional */}
              <div className="relative bg-black rounded-xl overflow-hidden flex flex-col h-52 sm:h-56 shadow-inner border border-slate-800">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB30yYalXvJZ-6ZhgVSF7RGHaa_3ZqRxPDOq8mliwL5KcLqwaeRtjkZAjmCSqMeMe6vwmNKbVMjfAHAB-4BrKTe0mIa4dXh_lZXt5-iVKqyjaetza-tp7Qn8ZpsB-DGVubeCBAREMIa30ypJCtwh1N8UpWh9vQyUCXiSrS9oLDS3Bmw09e5LFis6uDBmiE33gpPnlMmjqCzbvnwfPqnkMmw-DJaK_r7Z47PYjy66wXn"
                  alt="Transverse cross-sectional CT view"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded text-primary-fixed-dim text-[11px] font-medium border border-white/10">
                  <span>Sagittal (X)</span>
                </div>
                <div className="absolute bottom-2 left-2 font-mono text-[10px] text-white/80 bg-black/70 px-1.5 py-0.5 rounded">
                  X: 22.0 mm
                </div>
                <div className="absolute top-2 right-2 font-mono text-[10px] text-white/70 bg-black/70 px-1.5 py-0.5 rounded">
                  Thk: 0.5mm
                </div>
                {/* Width Caliper Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-8 border-l-2 border-r-2 border-secondary-fixed flex items-center justify-center">
                    <span className="text-[10px] font-mono text-secondary-fixed bg-black/80 px-1.5 py-0.5 rounded">
                      W: 6.8mm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slice Navigation & Windowing Toolbar */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-4 rounded-2xl shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="linear_scale" className="text-primary text-lg" />
                  <span className="font-semibold text-on-surface text-xs sm:text-sm">Slice Navigation</span>
                </div>
                <span className="font-mono text-xs text-primary bg-primary-fixed/40 px-2.5 py-1 rounded-md font-semibold">
                  Slice {sliceIndex} / 320 (0.5mm step)
                </span>
              </div>

              {/* Interactive Slice Scrubber */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSliceIndex((prev) => Math.max(1, prev - 1))}
                  className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
                  title="Previous Slice"
                >
                  <Icon name="chevron_left" className="text-lg" />
                </button>

                <div className="flex-1 relative flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="320"
                    value={sliceIndex}
                    onChange={(e) => setSliceIndex(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setSliceIndex((prev) => Math.min(320, prev + 1))}
                  className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
                  title="Next Slice"
                >
                  <Icon name="chevron_right" className="text-lg" />
                </button>
              </div>

              {/* Window Presets */}
              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 gap-2 overflow-x-auto text-xs no-scrollbar">
                <span className="text-outline shrink-0 font-medium">Window Presets:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActivePreset('bone');
                      triggerFeedback('Preset: Bone Window (W: 2500, L: 500)');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activePreset === 'bone'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    Bone (W:2500 L:500)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActivePreset('soft');
                      triggerFeedback('Preset: Soft Tissue Window (W: 400, L: 40)');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activePreset === 'soft'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    Soft Tissue
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActivePreset('endo');
                      triggerFeedback('Preset: High-Resolution Endodontic Window');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activePreset === 'endo'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    Endo Hi-Res
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Implant Simulation HUD & Actions (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Implant Simulation HUD Panel */}
            <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-fixed/40 flex items-center justify-center text-primary">
                    <Icon name="colorize" className="text-lg" />
                  </div>
                  <div>
                    <h2 className="font-bold text-on-surface text-sm sm:text-base">Tooth #15 Premolar Site</h2>
                    <p className="text-xs text-outline">Virtual Surgical Guide</p>
                  </div>
                </div>
                <span className="text-xs bg-secondary-container/40 text-on-secondary-container px-2.5 py-1 rounded-full font-bold">
                  Planned Fixture
                </span>
              </div>

              {/* Quantitative Measurements Bento Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Measurement: Height */}
                <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 flex flex-col gap-1">
                  <span className="text-[10px] text-outline uppercase font-semibold">Residual Bone Height</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl font-bold text-primary">8.4</span>
                    <span className="text-outline text-[11px]">mm</span>
                  </div>
                  <div className="flex items-center gap-1 text-secondary text-[11px] font-medium mt-1">
                    <Icon name="verified" className="text-xs" />
                    <span>Safe margin 1.8mm</span>
                  </div>
                </div>

                {/* Measurement: Width */}
                <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 flex flex-col gap-1">
                  <span className="text-[10px] text-outline uppercase font-semibold">Ridge Width</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl font-bold text-primary">6.8</span>
                    <span className="text-outline text-[11px]">mm</span>
                  </div>
                  <div className="flex items-center gap-1 text-secondary text-[11px] font-medium mt-1">
                    <Icon name="check_circle" className="text-xs" />
                    <span>Adequate buccal plate</span>
                  </div>
                </div>

                {/* Bone Quality Classification */}
                <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 flex flex-col gap-1">
                  <span className="text-[10px] text-outline uppercase font-semibold">Bone Density</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-base font-bold text-on-surface">Type D2</span>
                  </div>
                  <p className="text-[11px] text-outline truncate">Dense cortical + trabecular</p>
                </div>

                {/* Virtual Fixture Specification */}
                <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 flex flex-col gap-1">
                  <span className="text-[10px] text-outline uppercase font-semibold">Fixture Model</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-sm font-bold text-on-surface">BLX 4.0×10</span>
                  </div>
                  <p className="text-[11px] text-outline truncate">Straumann Roxolid SLActive</p>
                </div>
              </div>

              {/* Arch Location Strip */}
              <div className="flex items-center justify-between bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 text-xs">
                <span className="text-on-surface-variant font-medium">Quadrant 1 Arch Reference:</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded flex items-center justify-center font-mono text-[11px] bg-surface-container-lowest text-outline">
                    13
                  </span>
                  <span className="w-6 h-6 rounded flex items-center justify-center font-mono text-[11px] bg-surface-container-lowest text-outline">
                    14
                  </span>
                  <span className="w-7 h-7 rounded flex items-center justify-center font-mono text-xs bg-primary text-on-primary font-bold shadow-xs">
                    15
                  </span>
                  <span className="w-6 h-6 rounded flex items-center justify-center font-mono text-[11px] bg-surface-container-lowest text-outline">
                    16
                  </span>
                  <span className="w-6 h-6 rounded flex items-center justify-center font-mono text-[11px] bg-surface-container-lowest text-outline">
                    17
                  </span>
                </div>
              </div>
            </section>

            {/* Practitioner Attestation Pill */}
            <div className="flex items-center gap-2 bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/20 text-xs text-on-surface-variant">
              <Icon name="verified_user" className="text-secondary text-lg shrink-0" />
              <span className="flex-1">
                Simulated MPR Planning verified by <strong className="text-on-surface">Dr. Tariq Mansoor</strong> (#DEN-19402)
              </span>
              <span className="font-mono text-[11px] text-outline">14:22 WAT</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleSavePlan}
                disabled={isSaving}
                className="w-full h-12 bg-primary text-on-primary rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:bg-primary/90 transition-all"
              >
                {isSaving ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    <span>Archiving Plan to Patient File...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <Icon name="check" className="text-lg" />
                    <span>Report Stored to Patient File</span>
                  </>
                ) : (
                  <>
                    <Icon name="bookmark_add" className="text-lg" />
                    <span>Save Implant Measurement & Report</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => triggerFeedback('Exporting STL surface model & Surgical Guide DICOM...')}
                className="w-full h-11 bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-surface-container transition-all"
              >
                <Icon name="file_download" className="text-secondary text-lg" />
                <span>Export STL / Surgical Guide DICOM</span>
              </button>

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
