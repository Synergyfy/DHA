import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function RegistrationConfirmationScreen() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const applicationRef = 'DHA-APP-2026-8819';

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(applicationRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadReceipt = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Banner */}
      <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-3.5 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
              DHA
            </div>
            <div>
              <div className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                Nigeria Dental Health Authority &amp; FCT Healthcare Registry
              </div>
              <h1 className="text-sm font-bold text-slate-900">Application Acknowledgment</h1>
            </div>
          </div>
          <button
            onClick={() => navigate('/clinic-onboarding/dashboard')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <Icon name="dashboard" className="text-sm" />
            Dashboard
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 lg:px-8 pt-8 space-y-6">
        {/* Celebratory Hero Card */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 text-center shadow-lg relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Animated Badge */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-50 text-teal-700 border-4 border-teal-100 shadow-inner mb-5">
            <Icon name="verified_user" className="text-4xl text-teal-600" />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white">
              <Icon name="check" className="text-xs font-bold" />
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Application Submitted Successfully!
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Your registration dossier for <strong className="text-slate-800">Greenfield Dental Clinic Limited</strong> has been queued in the DHA Central Registry for statutory desk triage.
          </p>

          {/* Reference Pill */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 p-2 pl-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Application Docket:</span>
              <span className="text-base font-mono font-bold text-teal-800 tracking-wider">
                {applicationRef}
              </span>
            </div>
            <button
              onClick={handleCopyRef}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                copied
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200 shadow-sm'
              }`}
            >
              <Icon name={copied ? 'check' : 'content_copy'} className="text-sm" />
              {copied ? 'Copied to Clipboard' : 'Copy Ref'}
            </button>
          </div>

          {/* Metadata Grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left border-t border-slate-100 pt-6">
            <div className="p-3 rounded-xl bg-slate-50">
              <div className="text-[11px] text-slate-400 font-medium">Filing Timestamp</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">18 Oct 2026, 15:42 WAT</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <div className="text-[11px] text-slate-400 font-medium">Triage Desk</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">FCT Regional Review</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <div className="text-[11px] text-slate-400 font-medium">Facilities Included</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">HQ + 1 Satellite Branch</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <div className="text-[11px] text-slate-400 font-medium">SHA-256 Audit Seal</div>
              <div className="text-xs font-mono font-bold text-slate-700 truncate mt-0.5" title="9e8a5b2c7d1e4f6a8b9c0d1e2f3a4b5c6d7e8f9a">
                9e8a...31bf
              </div>
            </div>
          </div>
        </section>

        {/* 3-Stage Regulatory Roadmap */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Icon name="alt_route" className="text-teal-600 text-lg" />
              Regulatory Evaluation Roadmap
            </h3>
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              Current Stage: Step 1
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Step 1 */}
            <div className="relative p-4 rounded-xl border-2 border-teal-500 bg-teal-50/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-full bg-teal-700 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider bg-teal-100 px-2 py-0.5 rounded">
                    Active Stage
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">Desk &amp; Registry Review</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Registry officers examine CAC corporate status, MDCN medical director credentials, and statutory lease documentation.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-teal-100 text-[11px] text-teal-900 font-semibold flex items-center gap-1">
                <Icon name="schedule" className="text-sm" />
                Est. Duration: 3 – 5 Working Days
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Upcoming
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800">Physical Premise Audit</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Inspectors visit Wuse 2 HQ and Garki branch to evaluate sterilisation facilities, radiation shielding, and emergency egress.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1">
                <Icon name="event" className="text-sm" />
                Scheduled upon desk approval
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Final Phase
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800">Licence Issuance &amp; Go-Live</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  DHA Executive Board reviews recommendations, generates digital facility certificate, and activates public directory listing.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1">
                <Icon name="workspace_premium" className="text-sm" />
                DHA Facility ID Assigned
              </div>
            </div>
          </div>
        </section>

        {/* Informative Guidance */}
        <section className="bg-amber-50/60 rounded-2xl border border-amber-200 p-4 sm:p-5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Icon name="info" className="text-lg" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Need to upload supplementary files or answer reviewer queries?
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              If the review desk requests additional clarification (e.g. secondary radiation scatter certification), you will receive an SMS and email notification. You can upload updates directly through the Onboarding Dashboard.
            </p>
          </div>
        </section>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleDownloadReceipt}
            disabled={isDownloading}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            {isDownloading ? (
              <>
                <Icon name="sync" className="text-base animate-spin" />
                Generating PDF...
              </>
            ) : downloadSuccess ? (
              <>
                <Icon name="check_circle" className="text-base text-emerald-600" />
                Receipt Downloaded!
              </>
            ) : (
              <>
                <Icon name="download" className="text-base" />
                Download Submission Receipt (PDF)
              </>
            )}
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/application-status')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-teal-600 text-teal-700 text-sm font-semibold hover:bg-teal-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Icon name="visibility" className="text-base" />
              View Application Status (15.19)
            </button>
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/dashboard')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold shadow-md shadow-teal-700/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Go to Onboarding Dashboard (15.22)</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
