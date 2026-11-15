import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function VerificationRejectionDetailsScreen() {
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);
  const [consultationBooked, setConsultationBooked] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 3000);
    }, 1200);
  };

  const handleBookConsultation = () => {
    setConsultationBooked(true);
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
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Notice of Regulatory Non-Approval • Ref #DHA-APP-2026-8819
              </span>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Verification Rejection Details
              </h1>
            </div>
          </div>

          <button
            onClick={() => navigate('/clinic-onboarding/dashboard')}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Dashboard
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 lg:px-8 pt-6 space-y-6">
        {/* Rejection Notice Banner */}
        <section className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Icon name="cancel" className="text-3xl" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                  Regulatory Decision: Non-Approved
                </span>
                <span className="text-xs text-rose-700 font-medium">
                  Issued: 20 Oct 2026 • By DHA Accreditation Board
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Application Withheld Pending Critical Remediation
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The DHA Health Facility Licensing Committee has conducted desk and statutory audits for <strong>Greenfield Dental Clinic Limited</strong>. While the corporate identity and clinical workforce credentials met all standards, two critical compliance deficiencies prevent the issuance of an operational facility license.
              </p>
            </div>
          </div>
        </section>

        {/* Specific Findings Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Icon name="fact_check" className="text-rose-600 text-lg" />
            Specific Statutory Audit Findings
          </h3>

          <div className="space-y-3">
            {/* Finding 1 */}
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <Icon name="error_outline" className="text-base text-rose-600" />
                  Finding 1: Premise Address Discrepancy on HEFAMAA License
                </span>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded uppercase">
                  Major Defect
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-5">
                The submitted FCT Health Facility Operating Certificate (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">#FCT-HEFAMAA-DENT-0842</code>) indicates the premises location as <em>Plot 102 Aminu Kano Crescent</em>, whereas the tenancy agreement, corporate registration, and geospatial inspection coordinates indicate <em>Plot 104 Aminu Kano Crescent</em>.
              </p>
              <div className="pl-5 text-xs text-rose-800 font-medium flex items-center gap-1">
                <Icon name="arrow_right_alt" className="text-sm" />
                Required: Updated HEFAMAA schedule or official address correction letter from FCT Public Health.
              </div>
            </div>

            {/* Finding 2 */}
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <Icon name="error_outline" className="text-base text-rose-600" />
                  Finding 2: Incomplete NNRA Secondary Scatter Survey for Operatory 04
                </span>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded uppercase">
                  Safety Critical
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-5">
                The Nigerian Nuclear Regulatory Authority (NNRA) scatter radiation survey report was not endorsed by an accredited medical radiation safety officer prior to the statutory deadline.
              </p>
              <div className="pl-5 text-xs text-rose-800 font-medium flex items-center gap-1">
                <Icon name="arrow_right_alt" className="text-sm" />
                Required: Physical dose rate survey report stamped by accredited NNRA physicist.
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Pathway to Fast-Track Reapplication */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Icon name="published_with_changes" className="text-teal-600 text-lg" />
              Pathway to Corrective Reapplication (Zero Filing Fee)
            </h3>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              90-Day Fee Waiver Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center">
                1
              </div>
              <h4 className="text-xs font-bold text-slate-900">Harmonise HEFAMAA Address</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Obtain endorsement from FCT Health Secretariat confirming Plot 104 as the designated premises.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center">
                2
              </div>
              <h4 className="text-xs font-bold text-slate-900">Attach Stamped Scatter Log</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Upload the finalized medical physicist dose report for Operatory 04 with operator console shield readings.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center">
                3
              </div>
              <h4 className="text-xs font-bold text-slate-900">One-Click Resubmission</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                All previous 8 compliant modules remain pre-populated; expedite review within 48 hours of resubmission.
              </p>
            </div>
          </div>
        </section>

        {/* Support & Dispute Resolution */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Officer Consultation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <Icon name="support_agent" className="text-lg" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Speak with Review Officer #04
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Book a complimentary 15-minute video clarification session to review required amendments directly with the desk officer.
            </p>
            {consultationBooked ? (
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                <Icon name="check_circle" className="text-sm" />
                Session requested! Confirmation sent to CMD email.
              </div>
            ) : (
              <button
                type="button"
                onClick={handleBookConsultation}
                className="w-full py-2 rounded-xl border border-teal-600 text-teal-700 text-xs font-semibold hover:bg-teal-50 transition-colors"
              >
                Schedule Officer Clarification Call
              </button>
            )}
          </div>

          {/* Ombudsman Appeal */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <Icon name="gavel" className="text-lg" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Ombudsman &amp; Administrative Appeal
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              If you believe this determination was made in error or without considering relevant documentation, you may lodge an appeal.
            </p>
            <button
              type="button"
              onClick={() => alert('Administrative appeal dossier template opened for drafting.')}
              className="w-full py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              File Administrative Appeal
            </button>
          </div>
        </section>

        {/* Action Panel */}
        <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <Icon name={downloadDone ? 'check' : 'download'} className="text-sm" />
            {downloading ? 'Preparing PDF...' : downloadDone ? 'Dossier Downloaded!' : 'Download Rejection Notice (PDF)'}
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/dashboard')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/document-review')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md shadow-teal-700/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Icon name="refresh" className="text-sm" />
              Start Corrective Resubmission
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
