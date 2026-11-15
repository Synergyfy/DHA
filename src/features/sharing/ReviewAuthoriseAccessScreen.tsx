import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SharingShell } from './SharingShell';
import { Icon } from '../../design/Primitives';

type Duration = '7-days' | '30-days' | 'visit-done';

export function ReviewAuthoriseAccessScreen() {
  const navigate = useNavigate();
  const [duration, setDuration] = useState<Duration>('30-days');
  const [channel, setChannel] = useState<'direct' | 'qr'>('direct');
  const [consentChecked, setConsentChecked] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [records, setRecords] = useState([
    { id: 'opg', name: 'Panoramic Radiograph (OPG)', date: '15 Dec 2024 · High Res DICOM', category: 'Investigations', included: true },
    { id: 'bitewings', name: 'Periapical Bitewing Set (4 Views)', date: '10 Oct 2024 · Caries Diagnostic', category: 'Investigations', included: true },
    { id: 'odontogram', name: 'FDI 32-Tooth Digital Odontogram', date: 'v1.2 · 10 Oct 2024 · Restorations mapped', category: 'Examinations', included: true },
    { id: 'psr', name: 'Periodontal PSR Screening Report', date: '10 Oct 2024 · Pocket depths code 0-1', category: 'Examinations', included: true },
    { id: 'screening', name: 'Community Screening Summary', date: '12 Jan 2024 · DHA Mobile Clinic', category: 'Screening History', included: true },
  ]);

  const toggleInclude = (id: string, include: boolean) => {
    setRecords(records.map((r) => (r.id === id ? { ...r, included: include } : r)));
  };

  const includedCount = records.filter((r) => r.included).length;

  return (
    <SharingShell
      pageTitle="Review & Authorise Access"
      badgeCode="7.3"
      badgeLabel="Step 3 of 3: Authorization"
    >
      <div className="space-y-8 lg:space-y-10">
        {/* Reassurance Banner */}
        <section className="bg-secondary-container/30 rounded-3xl p-5 sm:p-6 border border-secondary/20 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
            <Icon name="verified_user" className="text-[20px]" />
          </div>
          <div>
            <h3 className="font-title-sm text-sm sm:text-base font-bold text-on-surface">
              Explicit Patient Consent Protocol
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
              Your dental records remain cryptographically sealed until you tap authorise. You hold complete ownership and can revoke active permissions at any moment without clinic pre-approval.
            </p>
          </div>
        </section>

        {/* 1. Recipient & Scope Bento Card */}
        <section className="p-6 sm:p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT_78YbA3xx3X2FsL3kYu0Re6c0AkhO3fVaW-LHO9G_Tg6uquE9HHYqo3GAYa1VXmrM2DAwPEFWuW7A39Csc32PAWqDcw-PKSQliYAAxsO1yHL4uKW1RsNc8wap47E2NTr095lJztisH3mHVuOYlokBpuYGn2w82z5xHwU0bD0Ia1mbnYG9JaqJwGF4wUWsVTU0XCGa7jyYVUcwyr0XCc-mnnSQv4JmUcy4ePCqB1C"
                  alt="Dr. Tariq Mansoor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                    Dr. Tariq Mansoor
                  </h2>
                  <Icon name="check_circle" className="text-secondary text-[16px]" />
                </div>
                <div className="text-xs text-on-surface-variant font-mono">
                  DHA Lic. #48912 · Jumeirah Dental Care Clinic
                </div>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold self-start sm:self-auto">
              Verified Clinician
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-surface-container-low">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">
                Sharing Purpose
              </span>
              <span className="font-bold text-sm text-on-surface mt-1 block">
                Continuing Dental Care & Routine Review
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">
                Patient Subject
              </span>
              <span className="font-bold text-sm text-on-surface mt-1 block">
                Sarah Al-Mansoor (Primary Adult Profile)
              </span>
            </div>
          </div>

          {/* Access Duration Window */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-xs font-bold uppercase tracking-wider text-on-surface">
                Authorised Duration Window
              </span>
              <span className="text-xs font-bold text-primary">
                {duration === '7-days' ? '7 Days Window' : duration === '30-days' ? 'Standard 30 Days' : 'Single Visit'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-surface-container-low p-1.5 rounded-2xl">
              {[
                { id: '7-days' as Duration, label: '7 Days' },
                { id: '30-days' as Duration, label: 'Standard 30 Days' },
                { id: 'visit-done' as Duration, label: 'Until Visit Done' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDuration(item.id)}
                  className={`py-2 text-center rounded-xl text-xs font-bold transition ${
                    duration === item.id
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Granular Record Review & Partial Approval List */}
        <section className="p-6 sm:p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                Granular Record Scope
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Toggle any item to exclude it from transmission. Excluded items remain encrypted and hidden.
              </p>
            </div>
            <span className="text-xs font-bold text-primary bg-primary-fixed/30 px-3 py-1 rounded-full">
              {includedCount} of {records.length} Approved
            </span>
          </div>

          <div className="space-y-3">
            {records.map((rec) => (
              <div
                key={rec.id}
                className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  rec.included
                    ? 'bg-surface-container-low border-outline-variant/30'
                    : 'bg-surface-container-lowest border-outline-variant/20 opacity-50'
                }`}
              >
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {rec.category}
                  </div>
                  <div className="font-bold text-sm text-on-surface mt-0.5">{rec.name}</div>
                  <div className="text-xs text-on-surface-variant">{rec.date}</div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => toggleInclude(rec.id, true)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                      rec.included
                        ? 'bg-primary text-on-primary shadow-2xs'
                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Included
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleInclude(rec.id, false)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                      !rec.included
                        ? 'bg-error-container text-on-error-container font-bold shadow-2xs'
                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Exclude
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Delivery Channel Switcher */}
        <section className="p-6 sm:p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
          <h3 className="font-title-md text-base font-bold text-on-surface">Delivery Channel</h3>

          <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setChannel('direct')}
              className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                channel === 'direct'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name="send" className="text-[16px]" />
              <span>Direct In-App Handshake</span>
            </button>

            <button
              type="button"
              onClick={() => setChannel('qr')}
              className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                channel === 'qr'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name="qr_code_2" className="text-[16px]" />
              <span>Authenticated QR</span>
            </button>
          </div>

          {channel === 'direct' ? (
            <div className="p-4 rounded-2xl bg-surface-container-low flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0">
                <Icon name="devices" className="text-[20px]" />
              </div>
              <div className="text-xs text-on-surface-variant">
                <strong className="text-on-surface">Automatic EHR Push:</strong> Direct handshake with Dr. Tariq's DHA portal terminal instantly once authorised.
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-surface-container-low flex flex-col items-center text-center space-y-3">
              <div className="w-32 h-32 bg-white rounded-2xl p-2 shadow-sm flex items-center justify-center">
                <Icon name="qr_code_2" className="text-slate-900 text-[100px]" />
              </div>
              <p className="text-xs text-on-surface-variant max-w-sm">
                Scanning alone does not yield records. Dr. Mansoor must sign with his DHA Smart PASS smartcard to initiate decrypt.
              </p>
            </div>
          )}
        </section>

        {/* 4. Legal Declaration & Sovereign Consent */}
        <section className="p-6 sm:p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Icon name="balance" className="text-secondary text-[22px]" />
            <h3 className="font-title-md text-base font-bold text-on-surface">
              Legal Declaration & Authority
            </h3>
          </div>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-1 w-5 h-5 rounded text-primary accent-primary cursor-pointer shrink-0"
            />
            <span className="text-xs text-on-surface-variant leading-relaxed">
              I confirm that I authorise <strong>Dr. Tariq Mansoor</strong> to view the <strong className="text-on-surface">{includedCount}</strong> selected clinical records for continuing dental care. I reserve sovereign ownership and may revoke or modify this access token at any time via my DHA Profile.
            </span>
          </label>
        </section>

        {/* Action Triggers */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition"
          >
            Decline Request / Back
          </button>

          <button
            type="button"
            disabled={!consentChecked || includedCount === 0}
            onClick={() => setSuccessModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-on-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Icon name="lock_open" className="text-[18px]" />
            <span>Authorise Selected Records ({includedCount})</span>
          </button>
        </section>

        {/* Success Modal Overlay */}
        {successModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-outline-variant/30 shadow-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto shadow-sm">
                <Icon name="task_alt" className="text-[36px]" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                  DHA Clearance Issued
                </span>
                <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                  Access Authorised Successfully!
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed pt-1">
                  Dr. Tariq Mansoor has been securely provisioned access to your {includedCount} selected records. Token expires in 30 days.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Auth Token Reference:</span>
                  <span className="font-mono font-bold text-primary">DHA-SHR-2025-9981</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Audit Status:</span>
                  <span className="font-semibold text-secondary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span>Recorded in Sovereign Ledger</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <NavLink
                  to="/patient-dashboard/sharing/manage-access"
                  className="w-full py-3 rounded-xl bg-primary text-on-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Go to Manage Shared Access</span>
                  <Icon name="arrow_forward" className="text-[16px]" />
                </NavLink>
                <NavLink
                  to="/patient-dashboard"
                  className="w-full py-2.5 rounded-xl bg-surface-container text-on-surface-variant text-xs font-semibold hover:text-on-surface"
                >
                  Return to Patient Dashboard
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </SharingShell>
  );
}

export default ReviewAuthoriseAccessScreen;

