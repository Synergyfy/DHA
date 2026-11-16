import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { InvestigationShell } from './InvestigationShell';
import { QuickLinks } from '../../design/QuickLinks';
import { Icon } from '../../design/Primitives';

export function InvestigationRequestDetailsScreen() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [filterMode, setFilterMode] = useState<'normal' | 'invert' | 'contrast' | 'sharpen'>('normal');
  const [findingsText, setFindingsText] = useState(
    'Distinct periapical radiolucency measuring approx 3.5mm x 4.2mm at the mesiobuccal root apex of tooth #16. Intact lamina dura disrupted. Encroachment upon the floor of the maxillary sinus without overt antral mucosal thickening. No signs of vertical root fracture. Deep distal occlusal composite restoration in close proximity to the pulp horn.'
  );
  const [impression, setImpression] = useState(
    'Chronic apical periodontitis secondary to deep pulpal involvement on tooth #16. Endodontic root canal therapy or apical microsurgery advised.'
  );
  const [isSigned, setIsSigned] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const images = [
    {
      title: 'Targeted Periapical #16',
      subtitle: 'View 1 of 2 • 65 kVp, 7 mA, 0.12s',
      badge: 'Critical Finding',
      badgeColor: 'bg-rose-500 text-white',
      finding: 'Apical radiolucency #16 MB root',
    },
    {
      title: 'Right Bitewing (BW-R)',
      subtitle: 'View 2 of 2 • 65 kVp, 7 mA, 0.10s',
      badge: 'Caries Evaluation',
      badgeColor: 'bg-sky-500 text-white',
      finding: 'Interproximal crestal bone levels #15, #16, #46',
    },
  ];

  const handleSignOff = () => {
    setIsSigned(true);
    showToast('Radiological interpretation signed and committed to Nigeria Health Information Exchange!');
  };

  return (
    <InvestigationShell
      pageTitle="Investigation Order & Radiograph Details"
      badgeCode="11.4"
      badgeLabel="Diagnostic Detail"
      currentStep="Review & Validation"
      orderRef="REQ-2025-0914"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <Icon name="check_circle" className="text-emerald-400 text-lg" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Status Header Banner */}
        <div className="bg-gradient-to-r from-purple-50 via-surface to-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800 shrink-0 mt-0.5 sm:mt-0">
              <Icon name="biotech" className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-sm text-primary">REQ-2025-0914</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Urgent Triage
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  isSigned ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {isSigned ? 'Validated & Signed' : 'Captured • Awaiting Doctor Sign-off'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-on-surface mt-1">
                Targeted Periapical & Right Bitewing Radiography
              </h2>
              <p className="text-xs text-on-surface-variant">
                Associated Exam: <strong>#EXAM-DHA-0982</strong> • Captured by <strong>Nurse Zainab Tariq</strong> at 09:40 AM today
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => showToast('DICOM study sent to PACS Export queue')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-surface border border-outline-variant/40 hover:bg-surface-container text-on-surface transition-colors flex items-center gap-1.5"
            >
              <Icon name="download" className="text-sm" />
              <span>Export DICOM</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('Order printed')}
              className="p-2 rounded-xl text-xs font-semibold bg-surface border border-outline-variant/40 hover:bg-surface-container text-on-surface transition-colors"
              title="Print"
            >
              <Icon name="print" className="text-base" />
            </button>
          </div>
        </div>

        {/* Patient Dossier Ribbon */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[11px] text-outline block">Patient</span>
            <span className="font-bold text-on-surface">Chinedu Okafor</span>
            <span className="text-[11px] text-on-surface-variant font-mono block">DHA-10482 • 34y M</span>
          </div>
          <div>
            <span className="text-[11px] text-outline block">Target Teeth</span>
            <span className="font-bold text-primary font-mono text-sm">#16 (Primary), #15, #46</span>
            <span className="text-[11px] text-outline block">Maxillary Right Molar</span>
          </div>
          <div>
            <span className="text-[11px] text-outline block">Radiation Dose</span>
            <span className="font-bold text-emerald-700">0.005 mSv (DAP 18 mGy·cm²)</span>
            <span className="text-[11px] text-outline block">FANR Level: Class A (Low)</span>
          </div>
          <div>
            <span className="text-[11px] text-outline block">Nigeria Health Information Exchange Hash</span>
            <span className="font-mono text-[10px] text-on-surface-variant block truncate">SHA-256: 8f9ba12ce4...</span>
            <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
              <Icon name="verified" className="text-xs" />
              Blockchain Anchored
            </span>
          </div>
        </div>

        {/* Main Grid: Radiograph Viewer on Left, Clinical Findings on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 cols: Interactive PACS / Radiograph Viewer */}
          <div className="lg:col-span-7 space-y-3">
            <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs">
              {/* Viewer Control Bar */}
              <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sky-400">PACS VIEWER</span>
                  <span className="text-slate-500">•</span>
                  <span className="font-medium text-slate-300">{images[activeImageIndex].title}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Zoom controls */}
                  <div className="flex items-center bg-slate-800 rounded-lg p-0.5">
                    <button
                      type="button"
                      onClick={() => setZoomLevel(Math.max(50, zoomLevel - 15))}
                      className="px-2 py-1 text-slate-300 hover:text-white"
                      title="Zoom Out"
                    >
                      -
                    </button>
                    <span className="px-2 font-mono text-[11px] text-slate-200">{zoomLevel}%</span>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(Math.min(200, zoomLevel + 15))}
                      className="px-2 py-1 text-slate-300 hover:text-white"
                      title="Zoom In"
                    >
                      +
                    </button>
                  </div>

                  {/* Filter Modes */}
                  <div className="flex items-center bg-slate-800 rounded-lg p-0.5">
                    {(['normal', 'invert', 'contrast'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setFilterMode(mode)}
                        className={`px-2 py-1 rounded text-[11px] capitalize transition-colors ${
                          filterMode === mode ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Radiograph Display Canvas */}
              <div
                className={`relative aspect-[4/3] bg-slate-950 flex items-center justify-center overflow-hidden transition-all duration-200 select-none ${
                  filterMode === 'invert'
                    ? 'invert hue-rotate-180'
                    : filterMode === 'contrast'
                    ? 'contrast-150 brightness-90'
                    : ''
                }`}
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                {/* Simulated High-Res Dental Radiograph */}
                <div className="absolute inset-0 bg-radial-gradient from-slate-900 to-black opacity-90" />
                <div className="relative text-center p-6 z-10 max-w-sm">
                  {/* Visual simulated dental anatomy lines */}
                  <div className="w-48 h-56 mx-auto border-2 border-dashed border-slate-600 rounded-3xl p-4 flex flex-col justify-between items-center bg-slate-900/60 shadow-2xl backdrop-blur-xs">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      Maxillary Occlusal Plane
                    </div>
                    {/* Crown & Root simulation */}
                    <div className="relative w-28 h-32 flex flex-col items-center">
                      <div className="w-20 h-14 bg-slate-300 rounded-t-xl border border-slate-400 flex items-center justify-center font-bold text-slate-800 text-xs shadow-inner">
                        Tooth #16
                      </div>
                      <div className="flex gap-2 -mt-1">
                        <div className="w-5 h-16 bg-slate-400/80 rounded-b-md" />
                        <div className="w-5 h-18 bg-slate-400/80 rounded-b-md relative">
                          {/* Pulsing indicator at apex */}
                          <div className="absolute -bottom-2 -left-2 w-9 h-9 rounded-full bg-rose-500/30 border-2 border-rose-500 animate-ping" />
                          <div className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full bg-rose-600/70 border border-white text-white text-[8px] font-bold flex items-center justify-center">
                            !
                          </div>
                        </div>
                        <div className="w-5 h-16 bg-slate-400/80 rounded-b-md" />
                      </div>
                    </div>
                    <div className="text-[9px] font-mono text-rose-400 font-bold">
                      Apex Radiolucency (3.8mm)
                    </div>
                  </div>
                </div>

                {/* Overlaid PACS Annotations */}
                <div className="absolute top-3 left-3 z-20 text-[10px] font-mono text-slate-400 space-y-0.5 bg-black/60 p-2 rounded-lg backdrop-blur-xs">
                  <div>PAT: OKAFOR, CHINEDU</div>
                  <div>DHA: 10482</div>
                  <div>DOB: 14-MAY-1992</div>
                  <div>EXP: 65kVp • 7mA • 0.12s</div>
                </div>

                <div className="absolute top-3 right-3 z-20">
                  <span className="px-2 py-1 rounded bg-black/70 text-sky-400 text-[10px] font-mono border border-sky-400/30">
                    DEXIS TITANIUM CMOS
                  </span>
                </div>
              </div>

              {/* View Switcher Thumbnails */}
              <div className="bg-slate-900 px-4 py-3 border-t border-slate-800 flex items-center gap-3">
                {images.map((img, idx) => (
                  <button
                    key={img.title}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl text-left transition-all ${
                      activeImageIndex === idx
                        ? 'bg-slate-800 border border-sky-500 text-white'
                        : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-sky-400">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{img.title}</div>
                      <div className="text-[10px] text-slate-400">{img.finding}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Exposure Metadata Box */}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 shadow-xs">
              <h4 className="font-bold text-xs text-on-surface mb-2 flex items-center gap-1.5">
                <Icon name="tune" className="text-primary text-sm" />
                Technical & Dosimetry Audit Log
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2 rounded-lg bg-surface-container-low">
                  <span className="text-[10px] text-outline block">Tube Voltage</span>
                  <span className="font-mono font-bold text-on-surface">65.0 kVp</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low">
                  <span className="text-[10px] text-outline block">Tube Current</span>
                  <span className="font-mono font-bold text-on-surface">7.0 mA</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low">
                  <span className="text-[10px] text-outline block">Exposure Time</span>
                  <span className="font-mono font-bold text-on-surface">0.12 sec</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low">
                  <span className="text-[10px] text-outline block">Sensor SN</span>
                  <span className="font-mono font-bold text-on-surface">DX-8912-CMOS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 cols: Clinical Findings & Doctor Sign-Off */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div>
                  <h3 className="font-bold text-sm text-on-surface">Radiological Report & Findings</h3>
                  <p className="text-xs text-on-surface-variant">Formal clinician interpretation</p>
                </div>
                <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  Nigeria Health Information Exchange-11.4
                </span>
              </div>

              {/* Findings narrative */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Observations & Radiographic Findings
                </label>
                <textarea
                  rows={4}
                  value={findingsText}
                  onChange={(e) => setFindingsText(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-outline-variant/40 bg-surface-container-low focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 leading-relaxed"
                />
              </div>

              {/* Clinical Impression */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Diagnostic Impression & Conclusion
                </label>
                <textarea
                  rows={2}
                  value={impression}
                  onChange={(e) => setImpression(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-outline-variant/40 bg-surface-container-low focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Recommended Next Actions */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                <span className="font-bold text-amber-900 flex items-center gap-1">
                  <Icon name="healing" className="text-sm" />
                  Proposed Treatment Plan Pathway:
                </span>
                <p>1. Immediate pulpectomy / endodontic access on tooth #16.</p>
                <p>2. Pre-op CBCT if sinus mucosal reaction worsens.</p>
              </div>

              {/* Validation Status */}
              <div className="pt-2">
                {isSigned ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Icon name="verified" className="text-base text-emerald-600" />
                      <span>Electronically Signed by Dr. Daniel James</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      Signed at {new Date().toLocaleTimeString()} • Encrypted SHA-256 Signature committed to DHA Clinical Repository.
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSignOff}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Icon name="draw" className="text-base" />
                    <span>Validate & Electronically Sign</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Links to Clinical Exam Integration */}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider block">
                Module Integrations
              </span>
              <div className="space-y-1.5">
                <NavLink
                  to="/examination/investigations"
                  className="flex items-center justify-between p-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container transition-colors text-xs font-semibold text-on-surface"
                >
                  <span className="flex items-center gap-2">
                    <Icon name="assignment" className="text-primary text-base" />
                    Link to Exam #EXAM-DHA-0982 (10.11)
                  </span>
                  <Icon name="chevron_right" className="text-outline text-base" />
                </NavLink>

                <NavLink
                  to="/investigations/schedule"
                  className="flex items-center justify-between p-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container transition-colors text-xs font-semibold text-on-surface"
                >
                  <span className="flex items-center gap-2">
                    <Icon name="calendar_today" className="text-secondary text-base" />
                    Schedule Follow-up CBCT (11.5)
                  </span>
                  <Icon name="chevron_right" className="text-outline text-base" />
                </NavLink>

                <NavLink
                  to="/records"
                  className="flex items-center justify-between p-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container transition-colors text-xs font-semibold text-on-surface"
                >
                  <span className="flex items-center gap-2">
                    <Icon name="folder_shared" className="text-amber-600 text-base" />
                    Patient Complete Dossier
                  </span>
                  <Icon name="chevron_right" className="text-outline text-base" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <QuickLinks
        title="Request Lifecycle"
        links={[
          { to: '/investigations/confirmation', label: 'Order Pass', icon: 'qr_code_2' },
          { to: '/investigations/queue', label: 'Patient Queue', icon: 'safety_check' },
          { to: '/investigations/awaiting-results', label: 'Awaiting Results', icon: 'hourglass_top' },
        ]}
      />
    </InvestigationShell>
  );
}

