import { useState } from 'react';
import { Link } from 'react-router-dom';
import { OdontogramShell } from './OdontogramShell';
import { Icon } from '../../design/Primitives';

export function SubmissionConfirmationScreen() {
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  const sha256Digest = 'e8b49f31a290c74fbc0281da901c3b8a10972e61a298bf0dca631109dcba425039ec';
  const recordId = 'DHA-ODO-2025-00492';
  const sealId = 'DHA-SEAL-8849';

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(sha256Digest);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  return (
    <OdontogramShell
      pageTitle="Submission Confirmation"
      badgeCode="9.8"
      badgeLabel="Record Cryptographically Sealed"
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Sealed Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-primary p-8 text-white shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold tracking-wide uppercase">
                <Icon name="verified" className="text-emerald-300 text-sm" />
                <span>DHA Electronic Health Registry</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Clinical Odontogram Sealed</h1>
              <p className="text-emerald-100 text-sm md:text-base max-w-xl">
                The permanent odontogram chart for patient <strong className="text-white">Amina Yusuf</strong> has been cryptographically signed and archived under seal reference <strong className="font-mono text-white">{sealId}</strong>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadPdf}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm shadow transition-all"
              >
                <Icon name="download" className="text-base" />
                <span>{downloadSuccess ? 'Downloaded!' : 'Download Sealed PDF'}</span>
              </button>
              <Link
                to="/odontogram/history"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-semibold text-sm transition-all"
              >
                <Icon name="timeline" className="text-base" />
                <span>View History</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Cryptographic Ledger & Audit Manifest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ledger Hash Card */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Icon name="fingerprint" className="text-xl" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Cryptographic Integrity Hash</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">SHA-256 immutable block verification</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                Block #889,401
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Digest Signature</span>
                <button
                  onClick={handleCopyHash}
                  className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  <Icon name={copiedHash ? 'check' : 'content_copy'} className="text-xs" />
                  <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <code className="text-xs font-mono text-slate-800 dark:text-slate-200 break-all leading-relaxed">
                {sha256Digest}
              </code>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Record ID</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{recordId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Timestamp</span>
                <span className="font-semibold text-slate-900 dark:text-white">16 Feb 2025 10:45 GST</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Attending Doctor</span>
                <span className="font-semibold text-slate-900 dark:text-white">Dr. Daniel Example</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">License Number</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">#DEN-48912</span>
              </div>
            </div>
          </div>

          {/* Audit Status Pill Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Icon name="shield_with_heart" className="text-lg" />
                <span>DHA Compliance Verified</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                This record is now locked against unilateral modification in accordance with UAE Federal Health Law No. 2/2019. Any changes require a documented addendum.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <Link
                to="/odontogram/compare"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Icon name="compare_arrows" className="text-sm" />
                <span>Compare with 2024 Baseline</span>
              </Link>
              <Link
                to="/screening/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Icon name="arrow_back" className="text-sm" />
                <span>Return to Screening Operations</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bento Matrix of Committed Observations */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Icon name="grid_view" className="text-primary text-lg" />
            <span>Committed Clinical Observation Summary</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40">
              <div className="flex items-center justify-between text-xs font-bold text-red-700 dark:text-red-400 mb-1">
                <span>Active Caries</span>
                <span className="font-mono">Tooth #16</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Distal-Occlusal (DO)</p>
              <p className="text-[11px] text-slate-500 mt-1">ICDAS 4 • Direct/Indirect restoration indicated</p>
            </div>

            {/* Card 2 */}
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
              <div className="flex items-center justify-between text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
                <span>Restored Sound</span>
                <span className="font-mono">Tooth #21</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Mesio-Incisal (MI)</p>
              <p className="text-[11px] text-slate-500 mt-1">Composite margin intact • Annual surveillance</p>
            </div>

            {/* Card 3 */}
            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
              <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
                <span>Enamel Demineralization</span>
                <span className="font-mono">Tooth #46</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Occlusal Pit (O)</p>
              <p className="text-[11px] text-slate-500 mt-1">Topical 5% NaF applied • 6-month recall</p>
            </div>

            {/* Card 4 */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>Missing / Extracted</span>
                <span className="font-mono">#18, #48</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Third Molars</p>
              <p className="text-[11px] text-slate-500 mt-1">#18 Agenesis • #48 Surgical extraction 2021</p>
            </div>
          </div>

          {/* Diagnostic Links */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Icon name="link" className="text-primary text-sm" />
              <span>Associated Investigations: <strong>Bitewing BW-01</strong>, <strong>Periapical PA-02</strong>, <strong>Full OPG-01</strong></span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">DICOM UID: 1.2.840.10008.5.1.4.1.1.1</span>
          </div>
        </div>
      </div>
    </OdontogramShell>
  );
}
export default SubmissionConfirmationScreen;
