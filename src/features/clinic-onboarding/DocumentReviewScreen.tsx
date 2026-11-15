import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

interface DocumentItem {
  id: string;
  title: string;
  category: 'verified' | 'pending' | 'action';
  docNumber: string;
  statusLabel: string;
  note: string;
  meta: string;
  hasSeal?: boolean;
}

const ALL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'cac',
    title: 'CAC Certificate of Incorporation',
    category: 'verified',
    docNumber: 'RC-1489201',
    statusLabel: 'Audited & Verified',
    note: 'Verified against CAC live portal. Legal entity incorporation in good standing.',
    meta: 'Uploaded 18 Oct 2026 • Attested by Dr. Amina Bello',
    hasSeal: true,
  },
  {
    id: 'licence',
    title: 'FCT Facility Operating Licence',
    category: 'verified',
    docNumber: 'FCT-HEFAMAA-0842',
    statusLabel: 'Active • Verified',
    note: 'HEFAMAA physical inspection endorsement verified. Valid through 09 Jan 2027.',
    meta: 'Approved by FCT Health & Human Services Secretariat',
    hasSeal: true,
  },
  {
    id: 'address',
    title: 'Physical Address Verification',
    category: 'verified',
    docNumber: 'Cadastral Zone A08',
    statusLabel: 'GIS Validated',
    note: 'Physical street address matches spatial GIS cadastral mapping for Wuse 2.',
    meta: 'Plot 142 Aminu Kano Crescent tenancy agreement verified',
    hasSeal: true,
  },
  {
    id: 'resolution',
    title: 'Medical Director Board Resolution',
    category: 'pending',
    docNumber: 'BOD-2026-04',
    statusLabel: 'Pending Desk Review',
    note: 'Assigned to DHA Desk Reviewer #04 (Queue Pos: 2). Estimated completion: 2 hours.',
    meta: 'Uploaded Today, 11:20 AM • Cryptographic hash signed',
    hasSeal: false,
  },
  {
    id: 'radiation',
    title: 'NNRA Radiation Safety Permit',
    category: 'action',
    docNumber: 'Pending Upload',
    statusLabel: 'Action Required',
    note: 'Upload required prior to chairside radiology module activation & clinic go-live.',
    meta: 'Mandatory for Cone Beam CT & intraoral X-ray units',
    hasSeal: false,
  },
];

export function DocumentReviewScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'pending' | 'action'>('all');
  const [docs, setDocs] = useState<DocumentItem[]>(ALL_DOCUMENTS);

  const filteredDocs = useMemo(() => {
    if (activeFilter === 'all') return docs;
    return docs.filter(d => d.category === activeFilter);
  }, [docs, activeFilter]);

  const handleSimulateUpload = (id: string) => {
    setDocs(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          category: 'pending',
          docNumber: 'NNRA-2026-SUBMITTED',
          statusLabel: 'Under Desk Review',
          note: 'Submitted for verification. Assigned to Nuclear Regulatory inspection desk.',
        };
      }
      return d;
    }));
  };

  const handleContinue = () => {
    navigate('/clinic-onboarding/additional-branches');
  };

  return (
    <ClinicOnboardingShell
      currentStep={8}
      totalSteps={8}
      stepTitle="Document Review"
      stepCategory="Accreditation Audit"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                <Icon name="verified_user" className="text-sm" />
                <span>DHA Registry Audit SEC 15.11</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-on-surface">
                Greenfield Dental Clinic Ltd
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Facility Accreditation Dossier &bull; Ref: <strong className="font-mono text-on-surface">DHA-FCT-2026-8891</strong>
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-secondary-container/60 text-secondary flex items-center justify-center shrink-0 shadow-sm">
              <Icon name="local_hospital" className="text-2xl" />
            </div>
          </div>

          {/* Readiness Gauge */}
          <div className="mt-5 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">Verification Readiness Score</span>
              <span className="text-base font-heading font-bold text-primary">75%</span>
            </div>
            <div className="w-full bg-surface-container-highest h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all duration-700 ease-out" style={{ width: '75%' }} />
            </div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1 flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-secondary font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary" /> 3 Verified
              </span>
              <span className="flex items-center gap-1.5 text-tertiary font-semibold">
                <span className="w-2 h-2 rounded-full bg-tertiary" /> 1 Pending Audit
              </span>
              <span className="flex items-center gap-1.5 text-error font-semibold">
                <span className="w-2 h-2 rounded-full bg-error" /> 1 Outstanding
              </span>
            </div>
          </div>
        </div>

        {/* Filter Segmented Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
              activeFilter === 'all'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            All Documents ({docs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('verified')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
              activeFilter === 'verified'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Verified ({docs.filter(d => d.category === 'verified').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('pending')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
              activeFilter === 'pending'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Pending Review ({docs.filter(d => d.category === 'pending').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('action')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
              activeFilter === 'action'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Action Required ({docs.filter(d => d.category === 'action').length})
          </button>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {filteredDocs.map((doc) => {
            const isVerified = doc.category === 'verified';
            const isPending = doc.category === 'pending';
            const isAction = doc.category === 'action';

            return (
              <article
                key={doc.id}
                className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isVerified
                          ? 'bg-secondary-container/50 text-secondary'
                          : isPending
                          ? 'bg-tertiary-container/30 text-tertiary'
                          : 'bg-error-container/40 text-error'
                      }`}
                    >
                      <Icon
                        name={isVerified ? 'verified' : isPending ? 'hourglass_top' : 'warning'}
                        className="text-xl"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-sm sm:text-base text-on-surface truncate">
                        {doc.title}
                      </h4>
                      <p className="font-mono text-xs text-on-surface-variant mt-0.5">{doc.docNumber}</p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                      isVerified
                        ? 'bg-secondary-container text-on-secondary-container'
                        : isPending
                        ? 'bg-surface-container-high text-on-surface'
                        : 'bg-error-container text-on-error-container'
                    }`}
                  >
                    <Icon
                      name={isVerified ? 'check_circle' : isPending ? 'pending' : 'priority_high'}
                      className="text-xs"
                    />
                    {doc.statusLabel}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low text-xs space-y-1">
                  <p className="font-medium text-on-surface">{doc.note}</p>
                  <p className="text-[11px] text-on-surface-variant">{doc.meta}</p>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  {doc.hasSeal ? (
                    <span className="font-semibold text-secondary flex items-center gap-1">
                      <Icon name="history_edu" className="text-sm" /> DHA Cryptographic Seal Affixed
                    </span>
                  ) : isAction ? (
                    <span className="font-semibold text-error flex items-center gap-1">
                      <Icon name="schedule" className="text-sm" /> Mandatory for Practice Activation
                    </span>
                  ) : (
                    <span className="text-on-surface-variant italic">Auditing by Ministerial Registrar</span>
                  )}

                  <div className="flex items-center gap-2">
                    {isAction ? (
                      <button
                        type="button"
                        onClick={() => handleSimulateUpload(doc.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <Icon name="cloud_upload" className="text-sm" />
                        <span>Upload Now</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => alert(`Previewing ${doc.title}`)}
                        className="px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container font-semibold transition-colors flex items-center gap-1 text-on-surface"
                      >
                        <Icon name="visibility" className="text-sm" />
                        <span>View PDF</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Supplementary Action Bar */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => alert('Downloading official DHA verification dossier bundle...')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-container-highest text-on-surface font-semibold text-xs hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="download" className="text-base text-primary" />
            <span>Download Verification Dossier (PDF)</span>
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
          >
            <span>Continue to Branch Registration</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>
        </div>
      </div>
    </ClinicOnboardingShell>
  );
}
