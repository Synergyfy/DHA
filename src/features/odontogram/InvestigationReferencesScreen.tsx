import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { OdontogramShell } from './OdontogramShell';
import { Icon } from '../../design/Primitives';

export function InvestigationReferencesScreen() {
  const [filterScope, setFilterScope] = useState<'all' | 'single' | 'multi' | 'general'>('all');
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <OdontogramShell
      pageTitle="Investigation References"
      badgeCode="9.6"
      badgeLabel="Diagnostic Radiographs"
    >
      <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
        {/* Scope & Safeguards Notice */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 shadow-sm flex items-start gap-3 text-xs">
          <div className="w-9 h-9 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">
            <Icon name="hub" className="text-[20px]" />
          </div>
          <div className="space-y-1">
            <strong className="text-on-surface font-semibold block text-sm">
              Investigation Linking Hub (Section 9.6)
            </strong>
            <p className="text-on-surface-variant leading-relaxed">
              Associate diagnostic radiographs and external imaging studies with charted teeth. Raw DICOM telemetry and bulk ingest files remain securely archived under Section 11 (Imaging Repository).
            </p>
          </div>
        </section>

        {/* Primary Action Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowLinkModal(true)}
            className="px-5 py-3 rounded-2xl bg-primary text-on-primary text-xs font-bold shadow-xs hover:bg-primary/90 transition flex items-center justify-center gap-2"
          >
            <Icon name="add_link" className="text-[18px]" />
            <span>Link Diagnostic Investigation</span>
          </button>

          {/* Segmented Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setFilterScope('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                filterScope === 'all'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All Attached (3)
            </button>
            <button
              type="button"
              onClick={() => setFilterScope('single')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                filterScope === 'single'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Single Tooth (1)
            </button>
            <button
              type="button"
              onClick={() => setFilterScope('multi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                filterScope === 'multi'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Arch / Multi-Tooth (1)
            </button>
            <button
              type="button"
              onClick={() => setFilterScope('general')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                filterScope === 'general'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              General Exam (1)
            </button>
          </div>
        </div>

        {/* Investigation Cards */}
        <div className="space-y-4">
          {/* Card 1: Bitewing (Multi) */}
          {(filterScope === 'all' || filterScope === 'multi') && (
            <div className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">
                    <Icon name="radiology" className="text-[22px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-sm sm:text-base font-bold text-on-surface">
                      Digital Bitewing Radiographs (Right Quadrant)
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Bitewing X-Ray · Captured: 12 Jan 2025 · Downtown Dental
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold shrink-0">
                  NABIDH Linked
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-36 bg-surface-container border border-outline-variant/20">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDa_teFb_2DjbuTa8yg7onKYCvd3CtV2xVYnyAC2hUukFPQxojaiSylT82e_GugQXs-kgOtA53GjIT92wrOx1YbxkiHN1KZvK1GzJgfEfc9O4bkA7oZGMejjwhuqf1YsJWHCYLEz6y9uJlIHhzIDqY5u0SRXFlrg_KuLRcJXzWvluzhhGZoIgCrBd_XW0XMynYj07eGYOi3iJ9wJVFrYNnCrTYDIMOYLTx_BoYxgL_"
                  alt="Bitewing Radiograph"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-surface/90 text-on-surface text-[10px] font-mono">
                  DICOM Series • 14-bit Depth
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-on-surface-variant font-medium">Linked Teeth:</span>
                <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary font-mono font-bold">#16 Maxillary</span>
                <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary font-mono font-bold">#15 Premolar</span>
                <span className="px-2 py-0.5 rounded bg-secondary-container text-secondary font-mono font-bold">#46 Mandibular</span>
                <span className="px-2 py-0.5 rounded bg-secondary-container text-secondary font-mono font-bold">#45 Premolar</span>
              </div>

              <p className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant">
                <strong>Clinical Indication:</strong> Interproximal caries evaluation #16 MO; enamel demineralization monitoring.
              </p>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => triggerToast('Opening full-resolution DICOM viewer')}
                  className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold text-primary hover:bg-surface-container-high transition flex items-center gap-1.5"
                >
                  <Icon name="zoom_in" className="text-[16px]" />
                  <span>Inspect Reference</span>
                </button>
              </div>
            </div>
          )}

          {/* Card 2: Periapical Tooth #16 (Single) */}
          {(filterScope === 'all' || filterScope === 'single') && (
            <div className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">
                    <Icon name="medical_services" className="text-[22px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-sm sm:text-base font-bold text-on-surface">
                      Periapical Radiograph Tooth #16
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Single View · Sensor #OPG-02 · 12 Jan 2025
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold shrink-0">
                  Direct Capture
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-36 bg-surface-container border border-outline-variant/20">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAULtorGObUX0jn2Xq7GZGXA-dIT-fa_guy2YU8mI8tozOz-uof3t1HnMqmGdWG9_AXhhm5ebEwH8NCiS0KmYboVj2Js4aTrVbsDxhGasTqvuL1es8rhyAxIVn3IzqDxFjcvHRwlHJosZ_jvuRRSO19_aYgs3C1D2WVp1VpnTZZK8Lw3ePI08ohVqcCilWHZIUZwih_hHqBk3qPVURaJuI5wbvvtZNygbHh_LjVaMT6"
                  alt="Periapical Tooth #16"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-on-surface-variant font-medium">Linked Tooth:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-mono text-[11px] font-bold">
                  Tooth #16 (FDI 16)
                </span>
              </div>

              <p className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant">
                <strong>Diagnostic Finding:</strong> Verifying intact lamina dura and evaluating proximity of deep occlusal preparation to pulp chamber.
              </p>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => triggerToast('Opening PA Tooth #16 in high-contrast viewer')}
                  className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold text-primary hover:bg-surface-container-high transition flex items-center gap-1.5"
                >
                  <Icon name="zoom_in" className="text-[16px]" />
                  <span>Inspect Reference</span>
                </button>
              </div>
            </div>
          )}

          {/* Card 3: Panoramic (General) */}
          {(filterScope === 'all' || filterScope === 'general') && (
            <div className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">
                    <Icon name="all_inclusive" className="text-[22px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-sm sm:text-base font-bold text-on-surface">
                      Panoramic Radiograph (Full OPG)
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Arch Overview · NABIDH Import · 14 Oct 2024
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-semibold shrink-0">
                  Archived Baseline
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-36 bg-surface-container border border-outline-variant/20">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ14JsB_IHMF6706OokdQjaP2kvdtVa69rXnQ3mB0YCK07aJU_RjIIXWTb3lIQpcfaA_SKw5c28a-bCCpuS32yCAY7mCnA2dYXIRJ_eQIrvdIFRXdeaxlW6yvOMtGLXJ1WHFUx419Uwv3wD22Duf3F3zNgtTUjsGPBUhyd1IpdMymlcHF9LG213cczTRs2fYO-DeumWhHGORQ2qlxkY1gBpr-GIKAEjohg9ol50dHd"
                  alt="Panoramic OPG"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-on-surface-variant font-medium">Scope:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-medium text-[11px]">
                  Entire Maxillary & Mandibular Arch
                </span>
              </div>

              <p className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant">
                <strong>Status Note:</strong> Routine baseline imaging imported prior to comprehensive rehabilitation planning.
              </p>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => triggerToast('Loading Full OPG baseline archive')}
                  className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold text-primary hover:bg-surface-container-high transition flex items-center gap-1.5"
                >
                  <Icon name="zoom_in" className="text-[16px]" />
                  <span>Inspect Reference</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal for Linking Diagnostic */}
        {showLinkModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 space-y-4 border border-outline-variant/30 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-base font-bold text-on-surface flex items-center gap-2">
                  <Icon name="link" className="text-primary text-[20px]" />
                  <span>Link Diagnostic Investigation</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="text-on-surface-variant hover:text-on-surface"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <label className="font-bold text-on-surface block">Select Unlinked Record:</label>
                <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-on-surface block">CBCT 3D Volume (Sextant 2)</span>
                    <span className="text-[10px] text-on-surface-variant">08 Jan 2025 · Dr. Al Mansoor Imaging</span>
                  </div>
                  <input type="radio" defaultChecked name="investigation_rec" className="text-primary" />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLinkModal(false);
                    triggerToast('Linked CBCT Volume to Tooth #16');
                  }}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold"
                >
                  Apply Link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-inverse-surface text-inverse-on-surface text-xs font-semibold shadow-lg flex items-center gap-2">
            <Icon name="check_circle" className="text-secondary text-[18px]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Action Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <NavLink
            to="/odontogram/findings"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition text-center"
          >
            Back to Findings
          </NavLink>

          <NavLink
            to="/odontogram/summary"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center justify-center gap-2"
          >
            <span>Continue to Clinical Summary Review</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </NavLink>
        </div>
      </div>
    </OdontogramShell>
  );
}

export default InvestigationReferencesScreen;

