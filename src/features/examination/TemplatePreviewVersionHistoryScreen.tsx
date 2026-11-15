import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

export function TemplatePreviewVersionHistoryScreen() {
  const navigate = useNavigate();
  const [isSchemaExpanded, setIsSchemaExpanded] = useState<boolean>(true);
  const [isRollbackModalOpen, setIsRollbackModalOpen] = useState<boolean>(false);
  const [selectedRollbackVersion, setSelectedRollbackVersion] = useState<string>('v1.1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const confirmRollback = () => {
    setIsRollbackModalOpen(false);
    showToast(`Schema restored to working draft v1.3 based on ${selectedRollbackVersion}`);
  };

  return (
    <ExaminationShell
      pageTitle="Template Preview & Version History"
      badgeCode="10.23"
      badgeLabel="Version History"
      currentStep="Schema Preview & WORM Compliant Audit Trail"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Top Context & Template Master Header */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-semibold">
              <Icon name="domain" className="text-sm" />
              <span>Central Dental Branch</span>
            </div>
            <span className="font-mono text-xs text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded shadow-sm">
              #TMP-CB-004
            </span>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-on-surface">
              Central Branch Prosthodontic Baseline
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>v1.2 (Active • Published)</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant text-xs font-semibold">
                <Icon name="inventory_2" className="text-sm" />
                <span>42 Bound Clinical Encounters</span>
              </span>
            </div>
          </div>
        </section>

        {/* Header Dossier Card */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <Icon name="badge" className="text-xl" />
              </div>
              <div className="min-w-0 text-xs">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Lead Author</p>
                <p className="font-bold text-on-surface text-sm truncate">Dr. Daniel James</p>
                <p className="font-mono text-outline">#DEN-48912</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                <Icon name="verified" className="text-xl text-secondary" />
              </div>
              <div className="min-w-0 text-xs">
                <p className="text-[10px] text-secondary uppercase tracking-wider font-bold">Medical Approver</p>
                <p className="font-bold text-on-surface text-sm truncate">Dr. K. Al-Falasi</p>
                <p className="text-secondary font-semibold">Medical Director</p>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 bg-surface-container-low rounded-xl p-3 text-center border border-outline-variant/20">
            <div>
              <span className="text-lg sm:text-xl font-bold font-mono text-primary block">7</span>
              <span className="text-[11px] text-on-surface-variant font-medium">Modules</span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold font-mono text-secondary block">ISO-3950</span>
              <span className="text-[11px] text-on-surface-variant font-medium">FDI Notation</span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold font-mono text-on-surface block">Sec 13</span>
              <span className="text-[11px] text-on-surface-variant font-medium">Tx Pathway</span>
            </div>
          </div>
        </section>

        {/* Regulatory Immobility Warning Callout */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border-l-4 border-l-secondary border border-outline-variant/30 relative overflow-hidden flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
            <Icon name="gavel" className="text-lg text-secondary" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-on-surface">Legacy Examination Guarantee</h3>
              <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded font-mono text-[10px] font-bold uppercase">
                DHA Sealed
              </span>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Updating or deprecating this template will <strong className="text-on-surface">NOT</strong> alter or invalidate any of the <span className="text-primary font-bold">42 examinations</span> previously conducted under v1.0 or v1.1. Previous encounters remain permanently locked to their intake schema version.
            </p>
          </div>
        </section>

        {/* Interactive Schema Preview Accordion Card */}
        <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsSchemaExpanded(!isSchemaExpanded)}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon name="account_tree" className="text-lg" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-on-surface">Schema Preview (v1.2 Active)</h3>
                <p className="text-[11px] text-on-surface-variant">Structured architecture & diagnostic gates</p>
              </div>
            </div>
            <div className={`w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant transition-transform ${isSchemaExpanded ? 'rotate-180' : ''}`}>
              <Icon name="expand_more" className="text-base" />
            </div>
          </button>

          {isSchemaExpanded && (
            <div className="px-5 pb-5 pt-0 space-y-3 text-xs border-t border-outline-variant/20 pt-3">
              <div className="p-3.5 rounded-xl bg-surface-container-low space-y-2 border border-outline-variant/20">
                {/* Modules Enabled */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="check_circle" className="text-primary text-base" />
                    <span className="font-bold text-on-surface">Clinical Modules Enabled</span>
                  </div>
                  <span className="font-mono font-bold text-on-surface bg-surface-container-lowest px-2 py-0.5 rounded shadow-sm text-[11px]">
                    7 Active
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pl-6">
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px]">Extraoral Screening</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px]">Soft Tissue / Palate</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px]">Periodontal (BPE)</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px]">Odontogram FDI</span>
                  <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-bold text-[11px]">Module 5: OVD Record</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px]">Edentulous Ridge Class</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px]">Prosthetic Treatment Plan</span>
                </div>

                {/* Mandatory Prompts */}
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                  <div className="flex items-center gap-2">
                    <Icon name="rule" className="text-secondary text-base" />
                    <span className="font-bold text-on-surface">Mandatory Gate Prompts</span>
                  </div>
                  <span className="font-bold text-secondary text-[11px]">2 Guidelines</span>
                </div>
                <div className="pl-6 space-y-1 text-on-surface-variant text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Resting Freeway Space (RFS) tolerance input (±0.5mm)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>High-resolution residual alveolar ridge quadrant photo</span>
                  </div>
                </div>

                {/* Dentition Framework */}
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                  <div className="flex items-center gap-2">
                    <Icon name="dentistry" className="text-primary text-base" />
                    <span className="font-bold text-on-surface">Dentition Framework</span>
                  </div>
                  <span className="font-mono text-primary font-bold">ISO-3950 (FDI)</span>
                </div>

                {/* Pathway Link */}
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                  <div className="flex items-center gap-2">
                    <Icon name="link" className="text-primary text-base" />
                    <span className="font-bold text-on-surface">Section 13 Prosthetic Link</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">
                    Auto-Routed
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Version History Audit Trail Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="history_toggle_off" className="text-primary text-xl" />
              <h3 className="text-sm sm:text-base font-bold text-on-surface">Version History Audit Trail</h3>
            </div>
            <span className="text-xs text-on-surface-variant font-mono">3 Snapshots Logged</span>
          </div>

          {/* Timeline Stack */}
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-outline-variant/40">
            {/* Version 1.2 (Active) */}
            <div className="relative">
              <div className="absolute -left-6 sm:-left-8 top-3 w-5 h-5 rounded-full bg-secondary animate-pulse" />
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-on-surface">Version 1.2</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                        Current • Active
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">Active since 10 Feb 2025 • 08:30 GST</p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <Icon name="lock" className="text-sm" />
                  </div>
                </div>

                <div className="bg-surface-container-low p-3 rounded-xl space-y-1 text-xs border border-outline-variant/20">
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-semibold">
                    <Icon name="person" className="text-xs text-primary" />
                    <span>Author: <strong className="text-on-surface">Dr. Daniel James</strong></span>
                  </div>
                  <p className="text-on-surface leading-relaxed">
                    Added Occlusal Vertical Dimension (OVD) measurement prompt in Module 5; adjusted BPE probing progression order for maxillary arches.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 font-mono">
                  <span className="text-secondary font-bold flex items-center gap-1">
                    <Icon name="radio_button_checked" className="text-xs" />
                    <span>Active Production Standard</span>
                  </span>
                  <span className="text-outline">SHA: c74f9d2</span>
                </div>
              </div>
            </div>

            {/* Version 1.1 (Archived) */}
            <div className="relative">
              <div className="absolute -left-6 sm:-left-8 top-3 w-5 h-5 rounded-full bg-surface-container-highest border border-outline-variant" />
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-on-surface">Version 1.1</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium">
                        Archived
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      Used 24 Oct 2024 – 09 Feb 2025 • (29 Encounters)
                    </p>
                  </div>
                  <Icon name="inventory" className="text-outline text-lg" />
                </div>

                <div className="bg-surface-container-low p-3 rounded-xl space-y-1 text-xs border border-outline-variant/20">
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-semibold">
                    <Icon name="person" className="text-xs text-tertiary" />
                    <span>Author: <strong className="text-on-surface">Dr. Tariq Mansoor</strong></span>
                  </div>
                  <p className="text-on-surface leading-relaxed">
                    Added intraoral photo requirement for edentulous ridges prior to final prosthetic impression approval.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => showToast('Loaded read-only snapshot for v1.1 (Cryptographically immutable)')}
                    className="flex-1 py-2 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Icon name="visibility" className="text-sm" />
                    <span>Inspect v1.1</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRollbackVersion('v1.1');
                      setIsRollbackModalOpen(true);
                    }}
                    className="py-2 px-3 rounded-xl bg-secondary-container text-on-secondary-container font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                  >
                    <Icon name="replay" className="text-sm" />
                    <span>Rollback</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Version 1.0 (Genesis) */}
            <div className="relative">
              <div className="absolute -left-6 sm:-left-8 top-3 w-5 h-5 rounded-full bg-surface-container-highest border border-outline-variant" />
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-on-surface">Version 1.0</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-xs font-bold">
                        Genesis
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">Created 15 Jun 2024 • (13 Encounters)</p>
                  </div>
                  <Icon name="verified" className="text-primary text-lg" />
                </div>

                <div className="bg-surface-container-low p-3 rounded-xl space-y-1 text-xs border border-outline-variant/20">
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-semibold">
                    <Icon name="person" className="text-xs text-primary" />
                    <span>Author: <strong className="text-on-surface">Dr. Daniel James</strong></span>
                  </div>
                  <p className="text-on-surface leading-relaxed">
                    Initial creation and regulatory branch registration under UAE DHA Standard Guidelines for Restorative Dentistry.
                  </p>
                </div>

                <div className="pt-1 text-xs">
                  <button
                    type="button"
                    onClick={() => showToast('Loaded genesis snapshot for v1.0')}
                    className="w-full py-2 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Icon name="visibility" className="text-sm" />
                    <span>Inspect Genesis Snapshot</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Actions Container */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => {
              showToast('Creating working draft for Schema v1.3...');
              navigate('/examination/templates/create');
            }}
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Icon name="edit_document" className="text-base" />
            <span>Edit Template as v1.3</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => showToast('Template cloned to working draft workspace')}
              className="h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="content_copy" className="text-base text-primary" />
              <span>Duplicate</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/examination/templates/library')}
              className="h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="arrow_back" className="text-base" />
              <span>Template Library</span>
            </button>
          </div>
        </div>

        {/* Rollback Confirmation Modal */}
        {isRollbackModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-surface-container-lowest max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-outline-variant/30 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto">
                <Icon name="published_with_changes" className="text-2xl text-secondary" />
              </div>

              <div>
                <h4 className="text-base font-bold text-on-surface">Rollback to Version {selectedRollbackVersion}?</h4>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  This creates draft <strong className="text-on-surface">v1.3</strong> mirroring the {selectedRollbackVersion} schema. Existing encounters conducted under v1.2 remain unaltered.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsRollbackModalOpen(false)}
                  className="flex-1 h-11 rounded-xl bg-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmRollback}
                  className="flex-1 h-11 rounded-xl bg-secondary text-on-secondary font-bold shadow hover:opacity-90 transition-opacity"
                >
                  Confirm Rollback
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ExaminationShell>
  );
}

export default TemplatePreviewVersionHistoryScreen;

