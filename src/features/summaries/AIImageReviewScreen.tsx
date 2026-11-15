import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

type ActiveSeries = 'bw-right' | 'bw-left' | 'periapical' | 'opg';
type ViewMode = 'split' | 'ai' | 'dentist';
type ObservationStatus = 'pending' | 'accepted' | 'rejected';

export function AIImageReviewScreen() {
  const navigate = useNavigate();
  const [activeSeries, setActiveSeries] = useState<ActiveSeries>('bw-right');
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [attestationChecked, setAttestationChecked] = useState(false);
  const [dentistNotes, setDentistNotes] = useState('');
  const [obs1Status, setObs1Status] = useState<ObservationStatus>('pending');
  const [obs2Status, setObs2Status] = useState<ObservationStatus>('pending');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const seriesTabs: { key: ActiveSeries; label: string; icon: string }[] = [
    { key: 'bw-right', label: 'BW-Right', icon: 'panorama_horizontal' },
    { key: 'bw-left', label: 'BW-Left', icon: 'panorama_horizontal' },
    { key: 'periapical', label: 'Periapical #16', icon: 'image' },
    { key: 'opg', label: 'OPG Survey', icon: 'panorama_wide_angle' },
  ];

  const viewModes: { key: ViewMode; label: string; icon: string }[] = [
    { key: 'split', label: 'Split View', icon: 'vertical_split' },
    { key: 'ai', label: 'AI Overlay', icon: 'auto_awesome' },
    { key: 'dentist', label: 'Dentist Mark', icon: 'edit' },
  ];

  const toolStrip = [
    { icon: 'zoom_in', label: 'Zoom In' },
    { icon: 'zoom_out', label: 'Zoom Out' },
    { icon: 'rotate_right', label: 'Rotate 90°' },
    { icon: 'invert_colors', label: 'Invert' },
    { icon: 'push_pin', label: 'AI Pins' },
    { icon: 'restart_alt', label: 'Reset View' },
  ];

  return (
    <SummaryShell
      pageTitle="AI Image Review"
      badgeCode="12.10"
      badgeLabel="Diagnostic Imaging AI"
      currentStep="Image Review"
    >
      <div className="space-y-6">
        {/* 1. Mandatory Clinical Disclaimer Banner */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Icon name="warning" className="text-[24px] text-amber-600" />
            </div>
            <div className="space-y-1.5">
              <p className="text-sm sm:text-base font-bold text-amber-800">
                AI-assisted analysis is advisory only. All findings must be independently verified by a qualified dental professional before clinical action.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-amber-700">
                DHA Regulation: AI outputs do not constitute a diagnosis
              </p>
            </div>
          </div>
        </div>

        {/* 2. DICOM Patient Context Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="badge" className="text-[22px] text-[#006194]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#131b2e]">DICOM Patient Context</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
            <div>
              <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Patient</p>
              <p className="text-sm font-bold text-[#131b2e]">Amara Okafor (34y F)</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider">MRN</p>
              <p className="text-sm font-bold text-[#131b2e]">DHA-2026-00451</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Study</p>
              <p className="text-sm font-bold text-[#131b2e]">Dental Radiographic Series</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Study Date</p>
              <p className="text-sm font-bold text-[#131b2e]">13 Oct 2026</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Referring</p>
              <p className="text-sm font-bold text-[#131b2e]">Dr. Daniel James #DEN-48912</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Modality</p>
              <p className="text-sm font-bold text-[#131b2e]">Digital Intraoral Radiograph (Bitewing)</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Series</p>
              <p className="text-sm font-bold text-[#131b2e]">4 images acquired</p>
            </div>
          </div>
        </div>

        {/* 3. Image Series Selector Tabs */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm">
          <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider mb-3">Image Series</p>
          <div className="flex flex-wrap gap-2">
            {seriesTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSeries(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeSeries === tab.key
                    ? 'bg-[#006194] text-white shadow-md'
                    : 'bg-[#f0f2f8] text-[#707881] hover:bg-[#eaedff] hover:text-[#131b2e]'
                }`}
              >
                <Icon name={tab.icon} className="text-[18px]" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Viewport Mode Toggle */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm">
          <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider mb-3">Viewport Mode</p>
          <div className="flex flex-wrap gap-2">
            {viewModes.map((mode) => (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  viewMode === mode.key
                    ? 'bg-[#006194] text-white shadow-md'
                    : 'bg-[#f0f2f8] text-[#707881] hover:bg-[#eaedff] hover:text-[#131b2e]'
                }`}
              >
                <Icon name={mode.icon} className="text-[18px]" />
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Diagnostic Viewport */}
        <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
          <div className="relative min-h-[400px] aspect-video bg-[#131b2e] flex items-center justify-center">
            {/* Simulated DICOM grid overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Center placeholder */}
            <div className="flex flex-col items-center gap-3 z-10">
              <Icon name="radiology" className="text-[72px] text-slate-500 opacity-60" />
              <p className="text-slate-400 text-sm font-semibold tracking-wide">
                Bitewing Right — #16 Region
              </p>
            </div>

            {/* AI Annotation: Bounding box */}
            <div className="absolute top-[18%] left-[28%] w-[44%] h-[50%] border-2 border-dashed border-amber-400 rounded-lg z-20">
              <span className="absolute -top-6 left-0 bg-amber-400 text-[#131b2e] text-[10px] font-bold px-2 py-0.5 rounded">
                AI Detection Zone
              </span>
            </div>

            {/* AI Annotation: Caliper measurement */}
            <div className="absolute top-[30%] right-[12%] flex flex-col items-center z-20">
              <div className="w-[2px] h-16 bg-cyan-400 relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-cyan-400" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-cyan-400" />
              </div>
              <span className="mt-1 bg-cyan-400/20 border border-cyan-400 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                2.1mm to Pulp Horn
              </span>
            </div>

            {/* AI Annotation: Confidence badge */}
            <div className="absolute bottom-[14%] left-[32%] z-20">
              <span className="bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full">
                ICDAS 3/4 — 94.2% Confidence
              </span>
            </div>

            {/* Corner metadata: Window/Level */}
            <div className="absolute top-3 left-3 z-20">
              <span className="text-slate-500 text-[11px] font-mono">W:2048 L:1024</span>
            </div>

            {/* Corner metadata: Zoom */}
            <div className="absolute top-3 right-3 z-20">
              <span className="text-slate-500 text-[11px] font-mono">1.2×</span>
            </div>
          </div>
        </div>

        {/* 6. Viewport Tool Strip */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {toolStrip.map((tool) => (
              <button
                key={tool.label}
                onClick={() => showToast(`${tool.label} activated`)}
                className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl bg-[#f0f2f8] hover:bg-[#eaedff] transition-colors min-w-[64px]"
              >
                <Icon name={tool.icon} className="text-[22px] text-[#006194]" />
                <span className="text-[10px] font-semibold text-[#707881]">{tool.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 7. AI Observation Cards */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="auto_awesome" className="text-[22px] text-[#006194]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#131b2e]">AI Observations</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Observation #1 */}
            <div className={`bg-white rounded-2xl p-5 sm:p-6 border shadow-sm transition-colors ${
              obs1Status === 'accepted'
                ? 'border-emerald-300 bg-emerald-50/30'
                : obs1Status === 'rejected'
                ? 'border-red-300 bg-red-50/30'
                : 'border-[#eaedff]'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                  Observation #1 — Tooth #16 MO Caries
                </h3>
                {obs1Status !== 'pending' && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    obs1Status === 'accepted'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {obs1Status}
                  </span>
                )}
              </div>
              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#707881] w-24 flex-shrink-0">Severity</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-700">
                    Moderate (ICDAS 3/4)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-[#707881] w-24 flex-shrink-0">Location</span>
                  <span className="text-sm text-[#131b2e]">Mesio-Occlusal surface, dentin involvement</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#707881] w-24 flex-shrink-0">Measurement</span>
                  <span className="text-sm font-semibold text-[#131b2e]">2.1mm clearance to pulp horn</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#707881] w-24 flex-shrink-0">Confidence</span>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="h-2 flex-1 max-w-[120px] bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94.2%' }} />
                    </div>
                    <span className="text-sm font-bold text-emerald-600">94.2%</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-[#707881] w-24 flex-shrink-0">Correlation</span>
                  <span className="text-sm italic text-[#707881]">
                    &quot;Correlates with clinical probe catch and visual cavitation&quot;
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => { setObs1Status('accepted'); showToast('Observation #1 accepted'); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  <Icon name="check" className="text-[18px]" />
                  Accept
                </button>
                <button
                  onClick={() => showToast('Edit mode for Observation #1')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  <Icon name="edit" className="text-[18px]" />
                  Edit
                </button>
                <button
                  onClick={() => { setObs1Status('rejected'); showToast('Observation #1 rejected'); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                >
                  <Icon name="close" className="text-[18px]" />
                  Reject
                </button>
              </div>
            </div>

            {/* Observation #2 */}
            <div className={`bg-white rounded-2xl p-5 sm:p-6 border shadow-sm transition-colors ${
              obs2Status === 'accepted'
                ? 'border-emerald-300 bg-emerald-50/30'
                : obs2Status === 'rejected'
                ? 'border-red-300 bg-red-50/30'
                : 'border-[#eaedff]'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                  Observation #2 — Incidental: Alveolar Crest #15-16
                </h3>
                {obs2Status !== 'pending' && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    obs2Status === 'accepted'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {obs2Status}
                  </span>
                )}
              </div>
              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#707881] w-24 flex-shrink-0">Severity</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-700">
                    Mild (WNL)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-[#707881] w-24 flex-shrink-0">Location</span>
                  <span className="text-sm text-[#131b2e]">Interproximal alveolar crest</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#707881] w-24 flex-shrink-0">Measurement</span>
                  <span className="text-sm font-semibold text-[#131b2e]">Crestal bone 1.5mm from CEJ</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#707881] w-24 flex-shrink-0">Confidence</span>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="h-2 flex-1 max-w-[120px] bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '78.6%' }} />
                    </div>
                    <span className="text-sm font-bold text-amber-600">78.6%</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-[#707881] w-24 flex-shrink-0">Correlation</span>
                  <span className="text-sm italic text-[#707881]">
                    &quot;Consistent with localized BPE 2 assessment&quot;
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => { setObs2Status('accepted'); showToast('Observation #2 accepted'); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  <Icon name="check" className="text-[18px]" />
                  Accept
                </button>
                <button
                  onClick={() => showToast('Edit mode for Observation #2')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  <Icon name="edit" className="text-[18px]" />
                  Edit
                </button>
                <button
                  onClick={() => { setObs2Status('rejected'); showToast('Observation #2 rejected'); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                >
                  <Icon name="close" className="text-[18px]" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Authoritative Dentist Interpretation */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="clinical_notes" className="text-[22px] text-[#006194]" />
            <h2 className="text-lg sm:text-xl font-bold text-[#131b2e]">Authoritative Dentist Interpretation</h2>
          </div>
          <textarea
            rows={5}
            value={dentistNotes}
            onChange={(e) => setDentistNotes(e.target.value)}
            placeholder="Enter your independent radiographic interpretation. This will supersede AI observations in the clinical record..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-[#131b2e] placeholder:text-[#707881] focus:outline-none focus:ring-2 focus:ring-[#006194] focus:border-transparent resize-y min-h-[120px]"
          />
          <label className="flex items-start gap-3 mt-4 p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={attestationChecked}
              onChange={(e) => setAttestationChecked(e.target.checked)}
              className="mt-0.5 h-5 w-5 rounded border-gray-300 text-[#006194] focus:ring-[#006194] flex-shrink-0 accent-[#006194]"
            />
            <span className="text-sm text-[#131b2e] leading-relaxed">
              I, the undersigned dental professional, confirm that I have independently reviewed these radiographic images and that my interpretation above is my own clinical judgment, not solely reliant on AI outputs.
            </span>
          </label>
        </div>

        {/* 9. Statutory Governance Notice */}
        <div className="bg-[#faf8ff] rounded-2xl p-4 sm:p-5 border border-[#eaedff]">
          <div className="flex items-start gap-3">
            <Icon name="policy" className="text-[20px] text-[#707881] flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="text-xs text-[#707881] leading-relaxed">
                This AI image analysis module operates under DHA Clinical AI Governance Policy v2.4 and UAE Federal Law No. 2 of 2019 on Health Information Technology.
              </p>
              <p className="text-xs text-[#707881] leading-relaxed">
                All AI annotations are logged with cryptographic provenance for regulatory audit.
              </p>
            </div>
          </div>
        </div>

        {/* 10. Bottom Action Bar */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-[#eaedff] -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 z-30">
          <button
            onClick={() => showToast('Image review draft saved successfully')}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border-2 border-[#006194] text-[#006194] hover:bg-[#006194]/5 transition-colors"
          >
            <Icon name="save" className="text-[20px]" />
            Save Image Review Draft
          </button>
          <button
            disabled={!attestationChecked}
            onClick={() => {
              showToast('Summary workflow complete — ready for clinician sign-off');
              setTimeout(() => navigate('/summaries/dashboard'), 1500);
            }}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-colors ${
              attestationChecked
                ? 'bg-[#006194] hover:bg-[#005080] shadow-md'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Commit &amp; Complete Summary
            <Icon name="arrow_forward" className="text-[20px]" />
          </button>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-[#131b2e] text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 max-w-md">
            <Icon name="check_circle" className="text-[20px] text-emerald-400 flex-shrink-0" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </SummaryShell>
  );
}
