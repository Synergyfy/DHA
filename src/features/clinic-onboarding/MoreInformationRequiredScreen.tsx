import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function MoreInformationRequiredScreen() {
  const navigate = useNavigate();

  const [statement, setStatement] = useState(
    'Operatory 04 was fitted with 2.0mm Pb equivalent lead ply lining by LeadShield Africa Ltd on 12 September 2026. The independent medical physicist survey attached hereto confirms scatter dose levels are below 0.02 mGy/week at the operator console, fully compliant with NNRA Code 2024.'
  );
  const [hasFile, setHasFile] = useState(true);
  const [attestationChecked, setAttestationChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const maxChars = 1000;

  const handleSubmit = () => {
    if (!attestationChecked || !hasFile || statement.trim().length === 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/clinic-onboarding/application-status');
      }, 1000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-8 py-3.5 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/clinic-onboarding/application-status')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Return to Status"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <div>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Action Required • Ref #DHA-REQ-4402
              </span>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Supplementary Information Request
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/clinic-onboarding/dashboard')}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 lg:px-8 pt-6 space-y-6">
        {/* Priority Banner */}
        <section className="bg-amber-500/10 border-2 border-amber-400 rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Icon name="warning" className="text-2xl" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                  Priority Clarification Required
                </span>
                <span className="text-xs font-semibold text-amber-900 flex items-center gap-1">
                  <Icon name="schedule" className="text-sm" />
                  Deadline: 02 Nov 2026 (14 Days Remaining)
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Operatory 04 Radiation Safety Permit &amp; Lead Shielding Attestation
              </h2>
              <div className="bg-white/80 rounded-xl p-3.5 border border-amber-200 text-xs text-slate-700 leading-relaxed space-y-1">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Icon name="shield" className="text-sm text-amber-700" />
                  Inspectorate Feedback (Senior Review Officer #04):
                </div>
                <p>
                  "The initial NNRA draft report uploaded under verification documents does not explicitly certify secondary scatter protection for <strong>Operatory 04 (CBCT &amp; Dental Imaging Suite)</strong>. Please attach the certified medical physicist scatter survey report or the NNRA site commissioning certificate, along with a written statement affirming structural barrier specs."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Document Upload */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Icon name="upload_file" className="text-teal-600 text-lg" />
              1. Upload Certified Physicist Radiation Scatter Survey
            </h3>
            <span className="text-xs text-slate-500 font-medium">PDF, JPG up to 15MB</span>
          </div>

          {hasFile ? (
            <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <Icon name="picture_as_pdf" className="text-xl" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    Operatory4_LeadScatter_Survey_LeadShieldLtd.pdf
                  </div>
                  <div className="text-[11px] text-teal-800 font-medium mt-0.5">
                    2.4 MB • Staged for transmission
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setHasFile(false)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Remove file"
                >
                  <Icon name="delete" className="text-lg" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setHasFile(true)}
              className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-8 text-center bg-slate-50 hover:bg-teal-50/20 cursor-pointer transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center mb-2">
                <Icon name="cloud_upload" className="text-2xl" />
              </div>
              <div className="text-sm font-bold text-slate-800">
                Click to browse or drop certified survey PDF here
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Must be signed and stamped by an NNRA-accredited medical physicist
              </div>
            </div>
          )}
        </section>

        {/* Section 2: Written Statement */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Icon name="notes" className="text-teal-600 text-lg" />
              2. Written Medical Director Clarification Statement
            </h3>
            <span
              className={`text-xs font-mono font-medium ${
                statement.length > maxChars ? 'text-red-600' : 'text-slate-400'
              }`}
            >
              {statement.length}/{maxChars} characters
            </span>
          </div>

          <div>
            <textarea
              rows={4}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent leading-relaxed text-slate-800"
              placeholder="Provide exact details regarding structural shielding, lead equiv, and protective barriers in Operatory 04..."
            />
            <p className="text-[11px] text-slate-500 mt-1.5">
              Include contractor details, lead lining thickness (mm Pb), and radiation warning sign locations.
            </p>
          </div>
        </section>

        {/* Section 3: Statutory Affirmation */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={attestationChecked}
              onChange={(e) => setAttestationChecked(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
            />
            <span className="text-xs text-slate-700 leading-normal">
              I, <strong>Dr. Amina Bello (CMD #DEN-78421)</strong>, affirm under penalty of regulatory sanctions that the secondary radiation scatter measurements submitted herein represent actual physical inspections conducted on-site at Wuse 2 HQ Operatory 04.
            </span>
          </label>
        </section>

        {/* Action Bar */}
        <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/application-status')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel &amp; Return
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              disabled={!attestationChecked || !hasFile || statement.trim().length === 0 || isSubmitting}
              onClick={handleSubmit}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                attestationChecked && hasFile && statement.trim().length > 0 && !isSubmitting
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Icon name="sync" className="text-base animate-spin" />
                  Transmitting to Inspectorate...
                </>
              ) : submitSuccess ? (
                <>
                  <Icon name="check_circle" className="text-base text-emerald-300" />
                  Response Lodged!
                </>
              ) : (
                <>
                  <Icon name="send" className="text-base" />
                  Submit Response to Inspectorate
                </>
              )}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
