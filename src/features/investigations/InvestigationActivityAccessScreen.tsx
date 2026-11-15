import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

export function InvestigationActivityAccessScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'activity' | 'access'>('activity');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleVerifyBlockchain = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      showToast('NABIDH Node Hash Verified: 100% cryptographic match with consensus ledger.');
      setTimeout(() => setVerifiedSuccess(false), 4000);
    }, 1200);
  };

  return (
    <InvestigationShell
      pageTitle="Investigation Activity & Access History"
      badgeCode="11.25"
      badgeLabel="WORM Statutory Audit Log"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="INV-2025-0914-BWPA"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Investigation Header Badge Context Card */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base shrink-0">
              CO
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-xs font-semibold">
                  INV-2025-0914-BWPA
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
                  <Icon name="verified" className="text-xs" />
                  NABIDH Synced
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
                  WORM IMMUTABLE
                </span>
              </div>
              <h2 className="text-lg font-bold text-on-surface mt-1 truncate">Chinedu Okafor (34y M)</h2>
              <p className="text-xs text-on-surface-variant">
                Patient ID: <span className="font-semibold text-on-surface">DHA-10482</span> • Digital Bitewing & Periapical Series
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            <button
              type="button"
              onClick={handleVerifyBlockchain}
              disabled={isVerifying}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                verifiedSuccess
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-primary text-on-primary hover:bg-primary/95 border-primary shadow-sm'
              }`}
            >
              <Icon name={isVerifying ? 'sync' : verifiedSuccess ? 'check_circle' : 'enhanced_encryption'} className={`text-sm ${isVerifying ? 'animate-spin' : ''}`} />
              <span>{isVerifying ? 'Verifying...' : verifiedSuccess ? 'Verified (100% Match)' : 'Verify Blockchain Receipt'}</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Statutory Audit Log PDF generated and downloaded.')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/40 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="download" className="text-sm text-outline" />
              <span>Export Audit PDF</span>
            </button>
          </div>
        </section>

        {/* Statutory Security Compliance Advisory Notice */}
        <section className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-primary/20 flex items-start gap-3.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <Icon name="shield" className="text-xl" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-xs text-on-surface uppercase tracking-wide">
                Statutory WORM Compliance Mandate
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="text-xs font-semibold text-secondary uppercase">UAE Federal Law No. 2</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              Read-only immutable audit chronology. Under UAE Federal Health Data Governance and DHA Administrative Standards,
              all activity and electronic access events are cryptographically sealed and cannot be edited, purged, or retroactively altered.
            </p>
          </div>
        </section>

        {/* Tab Switcher Navigation */}
        <div className="bg-surface-container-low p-1.5 rounded-2xl flex items-center max-w-md border border-outline-variant/30 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-2 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'activity'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="history" className="text-base" />
            <span>Activity History (5 Events)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('access')}
            className={`flex-1 py-2 px-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'access'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="visibility" className="text-base" />
            <span>Access History (6 Logs)</span>
          </button>
        </div>

        {/* TAB 1: Activity History */}
        {activeTab === 'activity' && (
          <section className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/40 shadow-sm relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-outline-variant/20">
              <span className="text-xs font-bold uppercase tracking-wider text-outline">
                Chronological Investigation Timeline (5 Events)
              </span>
              <span className="text-xs font-mono text-primary font-medium">Standard Gulf Time (GST)</span>
            </div>

            <div className="relative flex flex-col gap-6 pl-2 sm:pl-4">
              {/* Vertical Connecting Line */}
              <div className="absolute left-[27px] sm:left-[35px] top-4 bottom-4 w-0.5 bg-outline-variant/30 -z-0"></div>

              {/* Event 1 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-sm">
                  <Icon name="assignment_turned_in" className="text-xl" />
                </div>
                <div className="flex-1 bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/20">
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <span className="text-sm font-bold text-on-surface">Clinical Review Signed & Sealed</span>
                    <span className="text-xs font-mono text-outline font-semibold">16 Feb 2025 • 11:22 GST</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">
                    By <span className="font-semibold text-on-surface">Dr. Daniel James (#DEN-48912)</span> • Lead Consultant Restorative Dentist
                  </p>
                  <div className="mt-2.5 p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col gap-1 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-[11px] font-semibold">
                        ICD-10 K02.62
                      </span>
                      <span className="text-on-surface-variant text-[11px]">• Published bilingual portal summary</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[11px] text-outline mt-0.5">
                      <Icon name="lock" className="text-xs text-secondary" />
                      <span className="truncate">SHA-256: c7b014f39ae7821bde3b0c44298fc1c149afbf4c...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <Icon name="medical_services" className="text-xl" />
                </div>
                <div className="flex-1 bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/20">
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <span className="text-sm font-bold text-on-surface">Tooth Association & Caliper Tagging Updated</span>
                    <span className="text-xs font-mono text-outline font-semibold">16 Feb 2025 • 10:15 GST</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">
                    By <span className="font-semibold text-on-surface">Dr. Daniel James (#DEN-48912)</span>
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold text-xs">
                      Tooth #16 (Target DO)
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant text-xs font-medium">
                      Tooth #15 (Contact)
                    </span>
                    <span className="text-xs text-outline font-mono">Depth Caliper: 2.1mm</span>
                  </div>
                </div>
              </div>

              {/* Event 3 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-surface-container-high text-tertiary flex items-center justify-center shrink-0 shadow-sm">
                  <Icon name="cloud_done" className="text-xl" />
                </div>
                <div className="flex-1 bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/20">
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <span className="text-sm font-bold text-on-surface">DICOM Ingestion Committed to PACS</span>
                    <span className="text-xs font-mono text-outline font-semibold">16 Feb 2025 • 09:45 GST</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">
                    By <span className="font-semibold text-on-surface">Automated WORM Ingestion Pipeline (NABIDH Gateway)</span>
                  </p>
                  <div className="bg-surface-container-lowest rounded-lg p-2.5 mt-2 flex items-center justify-between text-xs font-mono text-on-surface-variant border border-outline-variant/20">
                    <span>2 DICOM series (27.0 MB)</span>
                    <span className="text-secondary font-semibold">ALARA: 65 kVp, 0.12s, 0.015 mSv</span>
                  </div>
                </div>
              </div>

              {/* Event 4 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <Icon name="radiology" className="text-xl" />
                </div>
                <div className="flex-1 bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/20">
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <span className="text-sm font-bold text-on-surface">Radiographic Acquisition Completed</span>
                    <span className="text-xs font-mono text-outline font-semibold">16 Feb 2025 • 09:40 GST</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">
                    By <span className="font-semibold text-on-surface">Nurse Zainab Tariq (RN-9428)</span> • Operatory 4 Radiology Bay
                  </p>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-1.5">
                    <Icon name="devices" className="text-sm text-outline" />
                    <span>Sensor: Dexis Titanium #02 High-Definition Intraoral Sensor</span>
                  </div>
                </div>
              </div>

              {/* Event 5 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center shrink-0 shadow-sm">
                  <Icon name="post_add" className="text-xl" />
                </div>
                <div className="flex-1 bg-surface-container-low/60 rounded-xl p-4 border border-outline-variant/20">
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <span className="text-sm font-bold text-on-surface">Investigation Order Created</span>
                    <span className="text-xs font-mono text-outline font-semibold">16 Feb 2025 • 09:15 GST</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">
                    By <span className="font-semibold text-on-surface">Dr. Daniel James (#DEN-48912)</span>
                  </p>
                  <div className="mt-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300">
                      Urgency: Urgent (&lt; 4h)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: Access History */}
        {activeTab === 'access' && (
          <section className="space-y-4">
            {/* Emergency Policy Banner */}
            <div className="bg-secondary-container/40 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm border border-secondary/30">
              <div className="flex items-center gap-3">
                <Icon name="health_and_safety" className="text-2xl text-on-secondary-container" />
                <div>
                  <h4 className="text-xs font-bold text-on-secondary-container uppercase tracking-wide">
                    Emergency Override Status (Break-Glass Audit)
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Zero break-glass emergency security overrides invoked. Standard role-based access verified.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-surface-container-lowest text-secondary font-bold text-xs rounded-xl shadow-sm border border-secondary/20">
                0 INCIDENTS
              </span>
            </div>

            {/* Access Logs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Access 1 */}
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                  DJ
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-sm font-bold text-on-surface truncate">Dr. Daniel James</h4>
                    <span className="text-xs font-mono text-outline font-semibold">11:15 GST</span>
                  </div>
                  <span className="text-xs font-medium text-primary">Consultant Restorative</span>
                  <div className="bg-surface-container-low rounded-xl p-3 mt-2 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="clinical_notes" className="text-sm text-outline" />
                      <span>Purpose: <strong className="font-semibold">Clinical Review & Diagnosis</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant font-mono text-[11px]">
                      <Icon name="desktop_windows" className="text-sm text-outline" />
                      <span>Operatory 4 Workstation • 10.240.12.84</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Access 2 */}
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                  ZT
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-sm font-bold text-on-surface truncate">Nurse Zainab Tariq</h4>
                    <span className="text-xs font-mono text-outline font-semibold">09:38 GST</span>
                  </div>
                  <span className="text-xs font-medium text-secondary">Dental Radiographer</span>
                  <div className="bg-surface-container-low rounded-xl p-3 mt-2 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="file_upload" className="text-sm text-outline" />
                      <span>Purpose: <strong className="font-semibold">File Acquisition & Upload</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant font-mono text-[11px]">
                      <Icon name="terminal" className="text-sm text-outline" />
                      <span>Dexis Terminal 04 • 10.240.12.19</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Access 3 */}
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                  CO
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-sm font-bold text-on-surface truncate">Chinedu Okafor</h4>
                    <span className="text-xs font-mono text-outline font-semibold">11:30 GST</span>
                  </div>
                  <span className="text-xs font-medium text-outline">Patient (Self Service)</span>
                  <div className="bg-surface-container-low rounded-xl p-3 mt-2 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="account_circle" className="text-sm text-outline" />
                      <span>Purpose: <strong className="font-semibold">Patient Portal View (Summary Only)</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant font-mono text-[11px]">
                      <Icon name="smartphone" className="text-sm text-outline" />
                      <span>Mobile App (iOS 18.3) • Verified 2FA Token</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Access 4 */}
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                  SA
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-sm font-bold text-on-surface truncate">Sarah Al-Nuaimi</h4>
                    <span className="text-xs font-mono text-outline font-semibold">10:05 GST</span>
                  </div>
                  <span className="text-xs font-medium text-outline">Clinic Operations</span>
                  <div className="bg-surface-container-low rounded-xl p-3 mt-2 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-on-surface">
                      <Icon name="receipt_long" className="text-sm text-outline" />
                      <span>Purpose: <strong className="font-semibold">Billing & Insurance Verification</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant font-mono text-[11px]">
                      <Icon name="computer" className="text-sm text-outline" />
                      <span>Reception Desktop 01 • 10.240.10.15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer Navigation Strip */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <Icon name="verified_user" className="text-secondary text-base" />
            <span className="font-mono text-outline">NABIDH Node Hash: 0x88f4921adbe28014890c2</span>
            <span className="text-secondary font-bold uppercase">&bull; Audited & Verified</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/investigations/history')}
              className="px-3.5 py-2 rounded-xl font-bold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="history_edu" className="text-sm" />
              <span>Version Ledger (11.23)</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/investigations/directory')}
              className="px-3.5 py-2 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="badge" className="text-sm" />
              <span>Provider Directory (11.26)</span>
            </button>
          </div>
        </section>
      </div>
    </InvestigationShell>
  );
}

