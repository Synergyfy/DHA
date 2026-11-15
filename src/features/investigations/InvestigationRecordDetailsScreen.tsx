import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

export function InvestigationRecordDetailsScreen() {
  const [activeTab, setActiveTab] = useState<'overview' | 'files' | 'review' | 'teeth' | 'audit'>('overview');
  const [copiedHash, setCopiedHash] = useState(false);
  const [signModalOpen, setSignModalOpen] = useState(false);
  const [signStatus, setSignStatus] = useState<'pending' | 'signed'>('pending');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const hashString = 'c7b014f3a88d7211e40c5f21220489acbb0e1892fc0b4';

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(hashString);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleSignConfirm = () => {
    setSignStatus('signed');
    setSignModalOpen(false);
    setActionFeedback('Investigation record reviewed, digitally signed & committed to NABIDH.');
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <InvestigationShell
      pageTitle="Investigation Details"
      badgeCode="11.14"
      badgeLabel="Diagnostic Record"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="INV-2025-0914-BWPA"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Toast Feedback */}
        {actionFeedback && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="verified" className="text-secondary text-base" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Top Patient Context Banner */}
        <section className="bg-surface-container-low/80 border border-outline-variant/30 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-mono text-xs text-primary uppercase tracking-wider font-semibold">
              Ref #INV-2025-0914-BWPA
            </span>
            {signStatus === 'pending' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container/70 text-on-error-container text-xs font-semibold self-start sm:self-auto border border-error/20">
                <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
                Awaiting Clinician Review
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold self-start sm:self-auto border border-secondary/20">
                <Icon name="verified" className="text-sm text-secondary" />
                Clinically Signed & Archived
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
            Right Posterior Bitewing & Periapical #16 Apex
          </h2>

          {/* Patient Micro Card */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-base shrink-0">
                CO
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-on-surface text-base truncate">Chinedu Okafor</span>
                  <Icon name="verified" className="text-secondary text-sm shrink-0" />
                </div>
                <span className="text-xs text-on-surface-variant truncate">
                  34y Male • DHA-10482 • Blood: O+ • Emirates ID: 784-1990-2819201-1
                </span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-outline-variant/20 shrink-0">
              <span className="text-xs text-outline">Encounter Reference</span>
              <span className="font-mono text-sm text-on-surface font-semibold">#EXAM-0982</span>
            </div>
          </div>

          {/* Quick Meta Links Bar */}
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <Icon name="assignment_ind" className="text-primary text-base shrink-0" />
            <span className="truncate">
              Ordered by <strong className="text-on-surface font-semibold">Dr. Daniel James</strong> (#REQ-2025-0914)
              • Op 4 Dental Suite
            </span>
          </div>
        </section>

        {/* Segmented / Horizontal Scroll Tab Navigation */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-1.5 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: 'overview' },
            { id: 'files', label: 'Files (2)', icon: 'radiology' },
            { id: 'review', label: 'Clinical Review', icon: 'rate_review' },
            { id: 'teeth', label: 'Related Teeth (3)', icon: 'dentistry' },
            { id: 'audit', label: 'Audit & History', icon: 'history' },
          ].map((tab) => {
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex-shrink-0 flex items-center gap-2 transition-all ${
                  isCurrent
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <Icon name={tab.icon} className="text-base" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Left Column (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Section A: Investigation Metadata & Modality */}
            {(activeTab === 'overview' || activeTab === 'files') && (
              <section className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant">
                      <Icon name="medical_services" className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-base">Acquisition Modality</h3>
                      <p className="text-xs text-outline">DICOM Modality: IO (Intraoral Radiography)</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant font-mono text-xs font-bold">
                    ALARA Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                    <span className="text-[11px] text-outline font-medium">Modality & Class</span>
                    <span className="text-xs sm:text-sm font-semibold text-on-surface mt-1">Dental X-Ray</span>
                    <span className="text-xs text-on-surface-variant">Bitewing / PA</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                    <span className="text-[11px] text-outline font-medium">Hardware Sensor</span>
                    <span className="text-xs sm:text-sm font-semibold text-on-surface mt-1 truncate">Dexis Ti #02</span>
                    <span className="text-xs text-secondary font-medium">Direct Stream OK</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                    <span className="text-[11px] text-outline font-medium">Radiation Dose</span>
                    <span className="text-xs sm:text-sm font-semibold text-on-surface mt-1">65 kVp • 7 mA</span>
                    <span className="text-xs text-on-surface-variant">0.12s exposure</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                    <span className="text-[11px] text-outline font-medium">Acquisition Stamp</span>
                    <span className="text-xs sm:text-sm font-semibold text-on-surface mt-1">16 Feb 2025</span>
                    <span className="text-xs text-on-surface-variant">09:40 GST</span>
                  </div>
                </div>

                {/* Facility & Operator Badge Strip */}
                <div className="mt-4 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-on-surface-variant bg-surface-container-low rounded-xl p-3.5 border border-outline-variant/20">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon name="domain" className="text-primary text-xl shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-on-surface text-xs sm:text-sm truncate">
                        DHA Central Dental Clinic • Operatory 4
                      </span>
                      <span className="text-xs text-outline truncate">
                        Acquired by Operator: Nurse Zainab Tariq (RN-9428)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-secondary text-xs font-semibold shrink-0">
                    <Icon name="verified_user" className="text-base" />
                    <span>Quality Approved</span>
                  </div>
                </div>
              </section>
            )}

            {/* Section B: Diagnostic Media Series */}
            {(activeTab === 'overview' || activeTab === 'files') && (
              <section className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                      <Icon name="photo_library" className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-base">Diagnostic Series</h3>
                      <p className="text-xs text-on-surface-variant">2 High-Resolution Intraoral Exposures</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-primary font-semibold bg-primary-fixed px-2.5 py-1 rounded-md">
                    DCM 16-BIT
                  </span>
                </div>

                {/* Media Series Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Tile 1: Bitewing */}
                  <div className="rounded-xl overflow-hidden bg-inverse-surface text-inverse-on-surface shadow-md border border-outline-variant/30 flex flex-col">
                    <div className="relative w-full h-48 bg-cover bg-center overflow-hidden group">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgZ5s1T-7ys3IsVvpAY0ioFCqrNVUYxeDwD-tyvGQQtsiA2El-gXPEYkLcG-OrYTQ0xjcKWW2jfn3Niui6c0mYKcX5j4-MvyjPaRq-4NcStBbmvvMf5cYVjF8IhqW_BkwDxkeH9qC6lDPstFywIKebgxKA-feABybx3F3GNrzdyBpUrDNQVjED2hUZeJZSxOegov5UiiOHJXs_6FPGGK7wfQiYuC3mrMC54nRVtU_0"
                        alt="Dental bitewing radiograph"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-white font-mono text-[11px] font-bold">
                          EXP 01 • BW
                        </span>
                        <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-semibold">
                          14.2 MB
                        </span>
                      </div>
                      {/* Annotated Tooth Pins */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full bg-white text-primary font-mono text-[10px] font-bold shadow-md">
                          #15
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-mono text-[10px] font-bold shadow-md animate-pulse">
                          #16 Caries
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white text-on-surface font-mono text-[10px] font-bold shadow-md">
                          #46
                        </span>
                      </div>
                      <NavLink
                        to="/investigations/viewer/xray"
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/70 backdrop-blur-xs flex items-center justify-center text-white hover:bg-black transition-colors"
                        title="Open X-Ray Viewer"
                      >
                        <Icon name="zoom_in" className="text-lg" />
                      </NavLink>
                    </div>
                    <div className="p-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-on-surface">
                      <div className="min-w-0">
                        <p className="font-semibold text-xs sm:text-sm truncate">BW_Right_Molar_Exp01.dcm</p>
                        <p className="text-[11px] text-outline">Bitewing • Interproximal Evaluation</p>
                      </div>
                      <Icon name="check_circle" className="text-secondary text-lg shrink-0 ml-2" />
                    </div>
                  </div>

                  {/* Tile 2: Periapical */}
                  <div className="rounded-xl overflow-hidden bg-inverse-surface text-inverse-on-surface shadow-md border border-outline-variant/30 flex flex-col">
                    <div className="relative w-full h-48 bg-cover bg-center overflow-hidden group">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfusuo_AczmuGhlW9wr5Z_Cb70Urz7gQpFe4_JcZN7kOyrLqLdrSfWYa8hoYmWKJQdPsNCSc6osBke8rP0wZDrK5O16diKnqV_ciLM9sT8c740iGRYD9jfbLC8Wu2HFaZS8F6EQ8Y-tndMQGdxqq0xy_OgwHQPgD-EYd5oJFQDY09uJAJi86RaHueQuKsO2QN-owKO5ZkiHCEGHFbk2O0JlUlyAcspWt6QRKmx5-Bc"
                        alt="Dental periapical radiograph"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-white font-mono text-[11px] font-bold">
                          EXP 02 • PA
                        </span>
                        <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-semibold">
                          12.8 MB
                        </span>
                      </div>
                      {/* Annotated Tooth Pins */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-mono text-[10px] font-bold shadow-md">
                          #16 Apex Intact
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/90 text-on-surface font-mono text-[10px] font-bold shadow-md">
                          PDL Clear
                        </span>
                      </div>
                      <NavLink
                        to="/investigations/viewer/xray"
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/70 backdrop-blur-xs flex items-center justify-center text-white hover:bg-black transition-colors"
                        title="Open X-Ray Viewer"
                      >
                        <Icon name="zoom_in" className="text-lg" />
                      </NavLink>
                    </div>
                    <div className="p-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-on-surface">
                      <div className="min-w-0">
                        <p className="font-semibold text-xs sm:text-sm truncate">PA_Tooth16_Apex_Exp02.dcm</p>
                        <p className="text-[11px] text-outline">Periapical • Apical Pathology</p>
                      </div>
                      <Icon name="check_circle" className="text-secondary text-lg shrink-0 ml-2" />
                    </div>
                  </div>
                </div>

                {/* Quick Action: Launch Full Radiography Viewer */}
                <NavLink
                  to="/investigations/viewer/xray"
                  className="mt-4 w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary hover:bg-primary/95 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <Icon name="open_in_new" className="text-lg" />
                  <span>Launch Full Dental X-Ray Viewer (11.15)</span>
                  <Icon name="arrow_forward" className="text-base" />
                </NavLink>
              </section>
            )}

            {/* Section C: Associated Clinical Findings & Odontogram Mapping */}
            {(activeTab === 'overview' || activeTab === 'teeth') && (
              <section className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                      <Icon name="dentistry" className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-base">Odontogram Mapping</h3>
                      <p className="text-xs text-outline">FDI Two-Digit Notation System</p>
                    </div>
                  </div>
                  <span className="text-xs text-on-surface-variant font-medium">3 Associated Teeth</span>
                </div>

                {/* Teeth Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {/* Tooth #16 Primary Target */}
                  <div className="p-3.5 rounded-xl bg-error-container/40 border border-error/20 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-error text-lg">#16</span>
                      <span className="px-2 py-0.5 rounded bg-error text-on-error text-[10px] font-bold uppercase">
                        Primary
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-on-surface mt-1">Maxillary R 1st Molar</span>
                    <span className="text-xs text-error font-medium mt-0.5">ICDAS 3/4 Dentinal Caries</span>
                  </div>

                  {/* Tooth #15 Contact */}
                  <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface text-lg">#15</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant text-[10px] font-semibold uppercase">
                        Contact
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-on-surface mt-1">Maxillary R 2nd Pre</span>
                    <span className="text-xs text-outline mt-0.5">Distal Surface Watch</span>
                  </div>

                  {/* Tooth #46 Opposing */}
                  <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface text-lg">#46</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant text-[10px] font-semibold uppercase">
                        Antagonist
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-on-surface mt-1">Mandibular R 1st M</span>
                    <span className="text-xs text-secondary font-medium mt-0.5">Sound Restoration</span>
                  </div>
                </div>

                {/* Clinical Indication Callout */}
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex gap-3 items-start">
                  <Icon name="clinical_notes" className="text-primary text-xl shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Prescribed Clinical Indication
                    </span>
                    <p className="text-xs sm:text-sm text-on-surface mt-1 leading-relaxed">
                      “Evaluate coronal radiolucency depth and periodontal ligament continuity prior to direct composite restoration.
                      Assess proximity to mesial pulp horn of #16.”
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Section: Clinical Review Detail (for Review tab) */}
            {(activeTab === 'review' || activeTab === 'audit') && (
              <section className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-5 sm:p-6 shadow-xs flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon name="rate_review" className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-base">Clinician Findings & Sign-off</h3>
                      <p className="text-xs text-outline">DHA Form 11.14 / Verification</p>
                    </div>
                  </div>
                  {signStatus === 'signed' ? (
                    <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
                      Signed Digitally
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSignModalOpen(true)}
                      className="px-3 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
                    >
                      Sign Now
                    </button>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low text-xs sm:text-sm text-on-surface leading-relaxed flex flex-col gap-2">
                  <div className="font-semibold text-primary text-xs uppercase tracking-wider">
                    Radiological Impression
                  </div>
                  <p>
                    Coronal radiolucency on mesio-occlusal aspect of tooth #16 extending through enamel into outer third of dentin.
                    Lamina dura intact with 2.1mm remaining dentinal bridge to pulp horn. No periapical pathology evident on PA projection.
                    Prognosis favorable for vital pulp therapy / composite restoration.
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 mt-2 text-xs text-on-surface-variant">
                    <span>Reviewing Doctor: Dr. Daniel James (#DEN-48912)</span>
                    <span className="font-mono">Status: {signStatus === 'signed' ? 'Approved & Locked' : 'Pending Formal Sign-off'}</span>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right Column (4 cols on lg): Governance, NABIDH, Audit */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Section D: Governance & Patient Visibility Flag */}
            <section className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                    <Icon name="policy" className="text-lg" />
                  </div>
                  <h3 className="font-bold text-on-surface text-sm sm:text-base">Governance & Access</h3>
                </div>
                <Icon name="encrypted" className="text-secondary text-lg" />
              </div>

              {/* Patient Portal Guard Banner */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="lock" className="text-sm" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-amber-900">
                    {signStatus === 'signed' ? 'Released to Patient Portal' : 'Restricted — Awaiting Dentist Sign-off'}
                  </span>
                  <p className="text-amber-800/90 mt-0.5 leading-snug">
                    {signStatus === 'signed'
                      ? 'Clinical interpretation finalized. Diagnostic summary visible to patient in DHA Portal.'
                      : 'Mandatory clinical safeguard: Uninterpreted findings remain hidden from the patient portal until final signature.'}
                  </p>
                </div>
              </div>

              {/* NABIDH Unified Health Exchange Ledger Verification */}
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon name="verified" className="text-secondary text-sm" />
                    <span className="text-xs text-secondary font-bold uppercase tracking-wider">
                      NABIDH Exchange Hash
                    </span>
                  </div>
                  <span className="text-[11px] text-outline font-medium">Direct Commit</span>
                </div>

                <div className="flex items-center justify-between bg-surface-container-lowest px-3 py-2 rounded-lg border border-outline-variant/20 text-xs">
                  <span className="font-mono text-on-surface-variant truncate">
                    SHA256: {hashString.slice(0, 16)}...
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyHash}
                    className="p-1 hover:text-primary transition-colors text-outline"
                    title="Copy full cryptographic hash"
                  >
                    <Icon name={copiedHash ? 'check' : 'content_copy'} className="text-base" />
                  </button>
                </div>
                {copiedHash && (
                  <span className="text-[10px] text-secondary font-medium">Hash copied to clipboard!</span>
                )}
              </div>

              {/* Quick Actions Tray */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSignModalOpen(true)}
                  disabled={signStatus === 'signed'}
                  className={`w-full h-11 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs ${
                    signStatus === 'signed'
                      ? 'bg-secondary-container text-on-secondary-container cursor-default'
                      : 'bg-primary text-on-primary hover:bg-primary/90'
                  }`}
                >
                  <Icon name="draw" className="text-base" />
                  <span>{signStatus === 'signed' ? 'Review Signed & Sealed' : 'Perform Review & Sign (11.20)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActionFeedback('Downloading Lossless DICOM archive (27.0 MB)...');
                    setTimeout(() => setActionFeedback(null), 3000);
                  }}
                  className="w-full h-11 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-highest transition-colors text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Icon name="download" className="text-outline text-base" />
                  <span>Download DICOM Package</span>
                </button>

                <NavLink
                  to="/odontogram/compare"
                  className="w-full h-11 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-highest transition-colors text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Icon name="compare" className="text-outline text-base" />
                  <span>Compare with Prior Exam</span>
                </NavLink>
              </div>
            </section>
          </div>
        </div>

        {/* Modal: Clinician Review & Sign (11.20 simulated dialog) */}
        {signModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl border border-outline-variant/30 p-6 shadow-2xl flex flex-col gap-4 animate-scaleIn">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                    <Icon name="verified_user" className="text-lg" />
                  </div>
                  <h3 className="font-bold text-on-surface text-base">Clinician Verification Sign-off</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSignModalOpen(false)}
                  className="p-1 rounded-full text-outline hover:text-on-surface"
                >
                  <Icon name="close" className="text-lg" />
                </button>
              </div>

              <div className="text-xs text-on-surface-variant flex flex-col gap-3">
                <p>
                  You are legally signing and approving the radiological interpretation for patient{' '}
                  <strong className="text-on-surface">Chinedu Okafor</strong> (DHA-10482).
                </p>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1 text-[11px]">
                  <div><strong>Modality:</strong> Dental Radiography (Bitewing / PA)</div>
                  <div><strong>Target:</strong> FDI #16 (MO Caries ICDAS 3/4)</div>
                  <div><strong>Clinician:</strong> Dr. Daniel James (Lic. DHA #DEN-48912)</div>
                  <div><strong>Timestamp:</strong> 16 Feb 2025, 10:15 GST</div>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] flex items-center gap-2">
                  <Icon name="cloud_done" className="text-base text-emerald-600 shrink-0" />
                  <span>This approval will automatically commit to the UAE NABIDH Health Ledger.</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setSignModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSignConfirm}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Icon name="draw" className="text-base" />
                  <span>Confirm Digital Signature</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </InvestigationShell>
  );
}
