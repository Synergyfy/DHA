import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

interface VersionEntry {
  version: string;
  status: 'Active • Latest' | 'Archived • Sealed';
  timestamp: string;
  actor: string;
  role: string;
  actionTitle: string;
  description: string;
  sha256Hash: string;
  deltaHighlights: string[];
}

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  operator: string;
  terminal: string;
  result: 'Verified' | 'Success' | 'Authorized';
}

export function InvestigationHistoryVersionScreen() {
  const navigate = useNavigate();
  const [selectedVersion, setSelectedVersion] = useState<string>('v1.2');
  const [isVerifyingHashes, setIsVerifyingHashes] = useState<boolean>(false);
  const [verificationPassed, setVerificationPassed] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const versions: VersionEntry[] = [
    {
      version: 'v1.2',
      status: 'Active • Latest',
      timestamp: '16 Feb 2025, 11:42 AM',
      actor: 'Dr. Daniel James',
      role: 'Attending Restorative Dentist (#DEN-48912)',
      actionTitle: 'Clinical Diagnostic Review & Restorative Directive Committed',
      description:
        'Diagnostic synthesis confirmed ICD-10 K02.52 (Active dentin caries Tooth #16 DO). Direct composite restoration directive committed. Bilingual Patient Portal summary published.',
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      deltaHighlights: [
        '+ Added ICD-10 K02.52 diagnosis and vitality scores (EPT 24/80, Cold +ve lingering 3s)',
        '+ Assigned Procedure Directive DHA-RES-2S (Biomimetic 2-surface composite)',
        '+ Generated patient-friendly summary in English and Arabic',
      ],
    },
    {
      version: 'v1.1',
      status: 'Archived • Sealed',
      timestamp: '16 Feb 2025, 10:48 AM',
      actor: 'Dr. Daniel James',
      role: 'Attending Restorative Dentist (#DEN-48912)',
      actionTitle: 'Tooth Association & Caliper Landmark Pinning',
      description:
        'Tagged investigation to Tooth #16 (Maxillary Right First Molar) and adjacent Tooth #17. Placed 2.1mm distal lesion caliper annotation on DICOM frame.',
      sha256Hash: 'c7b014f3299182390aef92389104fa289c0284e5e493e8201a094208a902187e',
      deltaHighlights: [
        '+ FDI Tooth association linked (#16 Primary, #17 Secondary)',
        '+ Annotated 2.1mm caries depth caliper marker on Bitewing BW-R',
      ],
    },
    {
      version: 'v1.0',
      status: 'Archived • Sealed',
      timestamp: '16 Feb 2025, 09:30 AM',
      actor: 'Nurse Zainab Tariq',
      role: 'Lead Radiographer (#RAD-10928)',
      actionTitle: 'Raw DICOM Ingestion & ALARA Dosimetry Verification',
      description:
        'Captured 2 raw digital radiographic frames via Carestream RVG 6200 HD sensor. Radiation parameters validated (60 kVp, 0.12s, 0.015 mSv). Initial WORM commit created.',
      sha256Hash: '4a8f9c10328e1823a0df491028302194a09283f0912409841289410928409128',
      deltaHighlights: [
        '+ Raw DICOM ingestion (2 frames, 4.2 MB total)',
        '+ ALARA Stage 1 compliance validation (0.015 mSv effective dose)',
      ],
    },
  ];

  const auditLogs: AuditLog[] = [
    {
      id: 'aud-1',
      timestamp: '16 Feb 2025, 11:43:02 AM',
      action: 'Cryptographic SHA-256 Seal Committed',
      operator: 'Dr. Daniel James (#DEN-48912)',
      terminal: 'DHA-DENT-WS04 (IP: 10.14.88.22)',
      result: 'Verified',
    },
    {
      id: 'aud-2',
      timestamp: '16 Feb 2025, 11:38:15 AM',
      action: 'Patient Portal Summary Drafted (EN/AR)',
      operator: 'Dr. Daniel James (#DEN-48912)',
      terminal: 'DHA-DENT-WS04 (IP: 10.14.88.22)',
      result: 'Success',
    },
    {
      id: 'aud-3',
      timestamp: '16 Feb 2025, 10:45:10 AM',
      action: 'Radiograph Viewer Opened & Landmark Caliper Placed',
      operator: 'Dr. Daniel James (#DEN-48912)',
      terminal: 'DHA-DENT-WS04 (IP: 10.14.88.22)',
      result: 'Authorized',
    },
    {
      id: 'aud-4',
      timestamp: '16 Feb 2025, 09:31:40 AM',
      action: 'NABIDH PACS WORM Ingestion Receipt Generated',
      operator: 'Automated Gateway (NABIDH-BUS-01)',
      terminal: 'NABIDH Core Hub',
      result: 'Verified',
    },
    {
      id: 'aud-5',
      timestamp: '16 Feb 2025, 09:30:12 AM',
      action: 'RVG 6200 Sensor Exposure Uploaded',
      operator: 'Nurse Zainab Tariq (#RAD-10928)',
      terminal: 'DHA-RAD-STATION-02',
      result: 'Success',
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleVerifyLedger = () => {
    setIsVerifyingHashes(true);
    setTimeout(() => {
      setIsVerifyingHashes(false);
      setVerificationPassed(true);
      showToast('All 3 cryptographic version hashes verified against NABIDH WORM Root Ledger.');
    }, 1200);
  };

  const activeVersionData = versions.find((v) => v.version === selectedVersion) || versions[0];

  return (
    <InvestigationShell
      pageTitle="Investigation History & Version Control"
      badgeCode="11.23"
      badgeLabel="WORM Cryptographic Ledger"
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

        {/* Statutory Non-Destructive WORM Banner */}
        <section className="bg-gradient-to-r from-surface-container-low via-surface-container-lowest to-surface-container-low border border-primary/20 rounded-2xl p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0">
              <Icon name="history_edu" className="text-2xl" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-on-surface">
                  Immutable Non-Destructive Health Ledger
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <Icon name="lock" className="text-xs" />
                  WORM COMPLIANT
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono text-outline border border-outline-variant/30">
                  SHA-256 Chained
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                In compliance with <span className="font-semibold text-on-surface">DHA Health Data Governance Rule DHA-HIS-P04</span>,
                diagnostic records cannot be modified or overwritten once sealed. Every revision creates a new cryptographically signed
                delta version linked to the genesis block.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            <button
              type="button"
              onClick={handleVerifyLedger}
              disabled={isVerifyingHashes}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/40 flex items-center gap-1.5 transition-colors"
            >
              <Icon
                name={isVerifyingHashes ? 'sync' : 'verified'}
                className={`text-sm text-primary ${isVerifyingHashes ? 'animate-spin' : ''}`}
              />
              <span>{isVerifyingHashes ? 'Verifying Hashes...' : 'Verify Cryptographic Integrity'}</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Full WORM Audit Certificate (PDF) generated and signed.')}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="download" className="text-sm" />
              <span>Download Audit Certificate</span>
            </button>
          </div>
        </section>

        {/* Version Chain & Detailed Delta Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Timeline Version Chain (5 Cols) */}
          <section className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                <Icon name="account_tree" className="text-sm text-primary" />
                <span>Version Timeline Chain</span>
              </h3>
              <span className="text-[11px] font-mono text-emerald-700 font-semibold">3 Versions Registered</span>
            </div>

            <div className="space-y-3">
              {versions.map((ver) => {
                const isSelected = selectedVersion === ver.version;
                const isLatest = ver.version === 'v1.2';

                return (
                  <div
                    key={ver.version}
                    onClick={() => setSelectedVersion(ver.version)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-primary/5 border-primary ring-2 ring-primary/20 shadow-sm'
                        : 'bg-surface-container-low/50 border-outline-variant/30 hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-on-surface">{ver.version}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isLatest
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-surface-container-highest text-on-surface-variant'
                          }`}
                        >
                          {ver.status}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-outline">{ver.timestamp}</span>
                    </div>

                    <h4 className="text-xs font-bold text-on-surface">{ver.actionTitle}</h4>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">{ver.actor} &bull; {ver.role}</p>

                    <div className="mt-2.5 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[10px] font-mono text-outline">
                      <span className="truncate max-w-[200px]">SHA: {ver.sha256Hash.substring(0, 16)}...</span>
                      <span className="text-primary font-bold">Delta Details &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {verificationPassed && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2.5">
                <Icon name="shield_with_heart" className="text-xl text-emerald-600 shrink-0" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-bold block">Chain Integrity Verified:</span>
                  All version hashes form a continuous immutable chain anchored in NABIDH blockchain block #914820.
                </div>
              </div>
            )}
          </section>

          {/* Right Column: Selected Version Inspector & Delta Diff (7 Cols) */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            {/* Version Detail Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold text-primary">{activeVersionData.version}</span>
                  <span className="text-sm font-bold text-on-surface">Inspection View</span>
                </div>
                <span className="text-xs font-mono text-outline">{activeVersionData.timestamp}</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-on-surface">{activeVersionData.actionTitle}</h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{activeVersionData.description}</p>
              </div>

              {/* SHA-256 Hash Box */}
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-outline block">
                  SHA-256 Cryptographic Hash Checksum
                </span>
                <span className="font-mono text-[11px] text-on-surface break-all select-all font-semibold block">
                  {activeVersionData.sha256Hash}
                </span>
              </div>

              {/* Delta Highlights List */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-outline mb-2">Delta Modifications:</h5>
                <div className="space-y-1.5 text-xs">
                  {activeVersionData.deltaHighlights.map((delta, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-surface-container-low/70 border border-outline-variant/20 text-on-surface font-mono text-[11px]"
                    >
                      {delta}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comprehensive Access & Audit Trail Table */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                  <Icon name="list_alt" className="text-sm text-primary" />
                  <span>Immutable Access & Modification Audit Trail</span>
                </h4>
                <span className="text-[11px] text-outline">Real-Time Sync</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/30 text-on-surface-variant font-semibold">
                      <th className="py-2 px-2.5">Timestamp</th>
                      <th className="py-2 px-2.5">Action Executed</th>
                      <th className="py-2 px-2.5">Operator</th>
                      <th className="py-2 px-2.5">Terminal / Host</th>
                      <th className="py-2 px-2.5">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-surface-container-low/50">
                        <td className="py-2.5 px-2.5 font-mono text-[11px] text-outline whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="py-2.5 px-2.5 font-semibold text-on-surface">{log.action}</td>
                        <td className="py-2.5 px-2.5 text-on-surface-variant">{log.operator}</td>
                        <td className="py-2.5 px-2.5 font-mono text-[10px] text-outline">{log.terminal}</td>
                        <td className="py-2.5 px-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {log.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/investigations/record-details')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/40 transition-colors"
              >
                Back to Record Details (11.14)
              </button>

              <button
                type="button"
                onClick={() => navigate('/investigations/reports')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Icon name="picture_as_pdf" className="text-base" />
                <span>Open Formal PDF Report (11.24)</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </InvestigationShell>
  );
}

