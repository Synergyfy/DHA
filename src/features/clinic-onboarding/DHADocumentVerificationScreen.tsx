import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function DHADocumentVerificationScreen() {
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [auditChecks, setAuditChecks] = useState({
    registry: true,
    cac: true,
    premises: true,
    scope: true,
  });
  const [determination, setDetermination] = useState<'verified' | 'clarify' | 'reject'>('verified');
  const [saveNotice, setSaveNotice] = useState(false);

  const toggleCheck = (key: keyof typeof auditChecks) => {
    setAuditChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearedCount = Object.values(auditChecks).filter(Boolean).length;
  const totalCount = Object.keys(auditChecks).length;

  const handleZoomIn = () => {
    if (zoomLevel < 150) setZoomLevel((prev) => prev + 15);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 75) setZoomLevel((prev) => prev - 15);
  };

  const handleZoomFit = () => {
    setZoomLevel(100);
  };

  const handleSave = () => {
    setSaveNotice(true);
    setTimeout(() => {
      setSaveNotice(false);
      navigate('/clinic-onboarding/review-workspace');
    }, 1200);
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/clinic-onboarding/review-workspace')}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Go back"
            >
              <Icon name="arrow_back_ios_new" className="text-xl" />
            </button>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 truncate">
              DHA Document Verification
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Official Document Registry: FCT Health & Human Services Secretariat.')}
              aria-label="Application Info"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Icon name="help_outline" className="text-xl" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
        <div className="space-y-6">
          {/* Top Document Identity Card */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-3">
            <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
              <div className="space-y-1 min-w-0">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider">
                  <Icon name="verified" className="text-[14px] text-[#006a61]" />
                  Statutory Operating Permit
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                  Greenfield Dental Clinic Ltd
                </h2>
                <p className="font-mono text-xs text-[#006194] font-bold tracking-wide">
                  REF: #FCT-HEFAMAA-DENT-0842
                </p>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#f2f3ff] text-slate-800 text-xs font-semibold border border-sky-100">
                  <span className="w-2 h-2 rounded-full bg-[#006a61] mr-2 animate-pulse" />
                  Active (23m left)
                </span>
              </div>
            </div>

            {/* Metadata Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-[#f2f3ff] space-y-0.5 border border-sky-100/60">
                <span className="text-[11px] text-slate-500 font-semibold uppercase flex items-center gap-1">
                  <Icon name="account_balance" className="text-[14px]" />
                  Issuing Authority
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                  FCT Health &amp; Human Services Secretariat
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#f2f3ff] space-y-0.5 border border-sky-100/60">
                <span className="text-[11px] text-slate-500 font-semibold uppercase flex items-center gap-1">
                  <Icon name="date_range" className="text-[14px]" />
                  Tenure Period
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900">
                  10 Jan 2025 – 09 Jan 2027
                </p>
              </div>
            </div>

            {/* Submitter Tag */}
            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-50 text-slate-600 text-xs border border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2 truncate">
                <div className="w-6 h-6 rounded-full bg-sky-100 text-[#006194] flex items-center justify-center shrink-0">
                  <Icon name="medical_services" className="text-[14px]" />
                </div>
                <span className="truncate">
                  Submitted by <strong className="text-slate-900">Dr. Amina Bello (MD)</strong>
                </span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">18 Oct 2026, 15:30 WAT</span>
            </div>
          </div>

          {/* Desktop 2-Column Split: Left col (Preview Canvas), Right col (Audit Checklist & Determination) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Document Inspection Canvas */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Icon name="visibility" className="text-[#006194] text-[20px]" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">Fidelity Preview</h3>
                  </div>

                  {/* View Controls */}
                  <div className="flex items-center gap-1 bg-[#f2f3ff] p-1 rounded-lg border border-sky-100">
                    <button
                      onClick={handleZoomOut}
                      aria-label="Zoom Out"
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-slate-700 transition-colors"
                    >
                      <Icon name="zoom_out" className="text-[18px]" />
                    </button>
                    <span className="font-mono text-xs px-2 text-slate-600 font-bold select-none">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      aria-label="Zoom In"
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-slate-700 transition-colors"
                    >
                      <Icon name="zoom_in" className="text-[18px]" />
                    </button>
                    <button
                      onClick={handleZoomFit}
                      aria-label="Fit to Width"
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-slate-700 transition-colors"
                    >
                      <Icon name="fit_screen" className="text-[18px]" />
                    </button>
                  </div>
                </div>

                {/* Scalable Interactive Preview Container */}
                <div className="w-full overflow-x-auto rounded-xl bg-slate-100/70 p-4 relative select-none border border-slate-200">
                  <div
                    className="w-full min-w-[340px] bg-white rounded-lg shadow-md p-6 relative overflow-hidden transition-all duration-200 mx-auto"
                    style={{
                      transform: `scale(${zoomLevel / 100})`,
                      transformOrigin: 'top center',
                    }}
                  >
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                      <Icon name="verified_user" className="text-[200px] text-[#006194] -rotate-12" />
                    </div>

                    {/* Certificate Header */}
                    <div className="flex flex-col items-center text-center space-y-1 mb-6">
                      <div className="w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center text-[#006194] shadow-xs mb-1">
                        <Icon name="shield_person" className="text-[32px]" />
                      </div>
                      <span className="text-[10px] tracking-wider uppercase text-slate-500 font-bold">
                        Federal Capital Territory Administration
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        Health &amp; Human Services Secretariat
                      </h4>
                      <span className="inline-block px-3 py-0.5 rounded-full bg-teal-50 text-teal-800 font-mono text-[11px] uppercase tracking-wider font-semibold">
                        HEFAMAA Registered Facility #0842
                      </span>
                    </div>

                    {/* Body Copy Simulation */}
                    <div className="space-y-3 text-center px-4">
                      <p className="text-xs text-slate-500">
                        This certifies that statutory premises inspection was duly carried out and approval is conferred unto:
                      </p>
                      <div className="py-2">
                        <h5 className="text-base sm:text-lg font-bold text-[#006194]">
                          GREENFIELD DENTAL CLINIC LTD
                        </h5>
                        <p className="text-xs text-slate-700 font-medium mt-0.5">
                          Plot 1048, Cadastral Zone B03, Wuye District, Abuja FCT
                        </p>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Authorized for the practice of:{' '}
                        <strong className="text-slate-900">Dental Clinic – Outpatient Diagnostic &amp; Operative Services</strong>.
                      </p>
                    </div>

                    {/* Endorsement Badges & Seal Section */}
                    <div className="mt-6 pt-4 bg-[#f2f3ff] rounded-lg p-4 flex items-center justify-between border border-sky-100">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-[#006a61]">
                          <Icon name="verified" className="text-[18px]" />
                          <span className="font-mono text-xs font-bold uppercase">Cadastral Endorsed</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Geo-ref: 9.0432° N, 7.4321° E</p>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-sky-100 flex flex-col items-center justify-center p-1 text-center -rotate-12 shadow-xs border border-sky-300">
                        <span className="text-[8px] text-[#006194] font-bold leading-tight uppercase">REGISTRAR</span>
                        <Icon name="draw" className="text-[18px] text-[#006194]" />
                        <span className="text-[7px] text-[#006194] uppercase font-bold">VALIDATED</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download Trigger Action */}
                <button
                  type="button"
                  onClick={() => alert('Downloading official PDF docket (3.8 MB)...')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Icon name="cloud_download" className="text-[20px] text-[#006194]" />
                  <span>Download Original Scanned PDF (3.8 MB)</span>
                </button>
              </div>

              {/* Version History & Audit Trail */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Version Trail</h3>
                  <span className="text-xs text-slate-400">1 Archived Revision</span>
                </div>
                <div className="p-3 rounded-lg bg-[#f2f3ff] flex items-center justify-between border border-sky-100/60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-[#006194]">
                      <span className="font-mono text-xs font-bold">v1.0</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">Original Electronic Ingestion</p>
                      <p className="text-[11px] text-slate-500">Clean 300 DPI OCR scan • SHA-256 hash verified</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#006a61] bg-teal-50 px-2.5 py-0.5 rounded-full shrink-0">
                    Current
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Statutory Audit Checklist & Reviewer Determination */}
            <div className="lg:col-span-5 space-y-4">
              {/* Statutory Audit Checklist */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="fact_check" className="text-[#006a61] text-[20px]" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">Statutory Audit Items</h3>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    clearedCount === totalCount
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {clearedCount} / {totalCount} Cleared
                  </span>
                </div>

                <div className="space-y-2.5">
                  <label className="flex items-start gap-3 p-3 rounded-lg bg-[#f2f3ff] cursor-pointer hover:bg-sky-50 transition-colors border border-sky-100/60">
                    <input
                      type="checkbox"
                      checked={auditChecks.registry}
                      onChange={() => toggleCheck('registry')}
                      className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                    />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900">Registry Authenticity Confirmed</p>
                      <p className="text-xs text-slate-600 mt-0.5">Validated live against FCT Health Secretariat primary registry index.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-lg bg-[#f2f3ff] cursor-pointer hover:bg-sky-50 transition-colors border border-sky-100/60">
                    <input
                      type="checkbox"
                      checked={auditChecks.cac}
                      onChange={() => toggleCheck('cac')}
                      className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                    />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900">CAC Corporate Identity Match</p>
                      <p className="text-xs text-slate-600 mt-0.5">Entity name precisely conforms to RC-749210 corporate filing.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-lg bg-[#f2f3ff] cursor-pointer hover:bg-sky-50 transition-colors border border-sky-100/60">
                    <input
                      type="checkbox"
                      checked={auditChecks.premises}
                      onChange={() => toggleCheck('premises')}
                      className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                    />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900">Premises &amp; Cadastral Alignment</p>
                      <p className="text-xs text-slate-600 mt-0.5">Physical coordinate addresses match current commercial lease Deed.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-lg bg-[#f2f3ff] cursor-pointer hover:bg-sky-50 transition-colors border border-sky-100/60">
                    <input
                      type="checkbox"
                      checked={auditChecks.scope}
                      onChange={() => toggleCheck('scope')}
                      className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                    />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900">Practice Scope Category Conformity</p>
                      <p className="text-xs text-slate-600 mt-0.5">Clinical authorization category meets Level 2 Outpatient Dental parameters.</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Reviewer Determination Module */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-4">
                <div className="flex items-center gap-2">
                  <Icon name="assignment_turned_in" className="text-[#006194] text-[20px]" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">Reviewer Determination</h3>
                </div>

                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    determination === 'verified' ? 'bg-teal-50 border-teal-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}>
                    <input
                      type="radio"
                      name="determination"
                      value="verified"
                      checked={determination === 'verified'}
                      onChange={() => setDetermination('verified')}
                      className="w-4 h-4 accent-[#006a61]"
                    />
                    <div className="flex flex-col min-w-0 text-xs">
                      <span className="font-bold text-slate-900">Mark Verified &amp; Endorse</span>
                      <span className="text-slate-500">Attach official accreditation audit stamp to dossier.</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    determination === 'clarify' ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}>
                    <input
                      type="radio"
                      name="determination"
                      value="clarify"
                      checked={determination === 'clarify'}
                      onChange={() => setDetermination('clarify')}
                      className="w-4 h-4 accent-amber-600"
                    />
                    <div className="flex flex-col min-w-0 text-xs">
                      <span className="font-bold text-slate-900">Request Clarification / Re-upload</span>
                      <span className="text-slate-500">Issue regulatory inquiry notice to Dr. Amina Bello.</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    determination === 'reject' ? 'bg-red-50 border-red-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}>
                    <input
                      type="radio"
                      name="determination"
                      value="reject"
                      checked={determination === 'reject'}
                      onChange={() => setDetermination('reject')}
                      className="w-4 h-4 accent-red-600"
                    />
                    <div className="flex flex-col min-w-0 text-xs">
                      <span className="font-bold text-red-700">Reject Document</span>
                      <span className="text-slate-500">Flag unauthentic or incompatible statutory submission.</span>
                    </div>
                  </label>
                </div>

                {/* Official Stamp & Active Status Box */}
                <div className={`p-4 rounded-xl flex items-start gap-3 border ${
                  determination === 'verified'
                    ? 'bg-teal-50 border-teal-200 text-teal-900'
                    : determination === 'clarify'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-red-50 border-red-200 text-red-900'
                }`}>
                  <Icon
                    name={determination === 'verified' ? 'gavel' : determination === 'clarify' ? 'help' : 'cancel'}
                    className={`text-[24px] shrink-0 mt-0.5 ${
                      determination === 'verified' ? 'text-teal-700' : determination === 'clarify' ? 'text-amber-700' : 'text-red-700'
                    }`}
                  />
                  <div className="space-y-1 text-xs">
                    <p className="font-bold">
                      {determination === 'verified' && 'Status: Marked Verified • Endorsement Affixed'}
                      {determination === 'clarify' && 'Status: Clarification Notice Pending'}
                      {determination === 'reject' && 'Status: Marked Rejected'}
                    </p>
                    <p className="opacity-90 leading-relaxed">
                      {determination === 'verified' && (
                        <>Credentialing Desk #04 endorsement signed by <strong className="font-semibold">Inspector I. Musa</strong>.</>
                      )}
                      {determination === 'clarify' && (
                        <>System will request complementary certified evidence from submitter.</>
                      )}
                      {determination === 'reject' && (
                        <>Record will require complete re-submission under HEFAMAA protocol.</>
                      )}
                    </p>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#004b73] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                  >
                    <Icon name="save" className="text-[20px]" />
                    <span>Save &amp; Return to Application (15.30)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      alert('Proceeding to NNRA Radiation Safety Permit verification.');
                    }}
                    className="w-full h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Next Document: NNRA Permit</span>
                    <Icon name="arrow_forward" className="text-[18px]" />
                  </button>
                </div>

                {saveNotice && (
                  <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-semibold flex items-center gap-2">
                    <Icon name="check_circle" className="text-[18px]" />
                    Document verification status recorded successfully!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
