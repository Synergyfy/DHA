import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

interface ModuleAuditItem {
  id: number;
  title: string;
  status: 'COMPLETED' | 'LINKED & VERIFIED' | 'LINKED & COMPLETED';
  summary: string;
  details?: React.ReactNode;
  editRoute?: string;
  badgeType?: 'secondary' | 'primary';
}

export function ExaminationReviewValidationScreen() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const auditModules: ModuleAuditItem[] = [
    {
      id: 1,
      title: 'Patient History & Complaints',
      status: 'COMPLETED',
      badgeType: 'secondary',
      summary: 'Chief Complaint: UR molar sharp sensitivity to cold (4-6 sec lingering).',
      editRoute: '/examination/history-complaint',
      details: (
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="px-2 py-0.5 rounded-md bg-error-container text-on-error-container text-[11px] font-semibold flex items-center gap-1">
            <Icon name="warning" className="text-[12px]" />
            <span>Penicillin Allergy (Severe)</span>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface text-[11px] font-medium">
            Mild Asthma (Controlled)
          </span>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Extraoral Examination',
      status: 'COMPLETED',
      badgeType: 'secondary',
      summary: 'Facial symmetry intact. Submandibular & cervical lymph nodes non-tender, mobile. TMJ: 45mm pain-free opening, zero crepitus/clicks.',
      editRoute: '/examination/extraoral',
      details: (
        <div className="flex items-center gap-2 pt-1 text-xs text-on-surface-variant">
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <Icon name="photo_camera" className="text-base" />
          </div>
          <span className="font-medium">1 Clinical Photo Verified (RAW_0028.DNG)</span>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Intraoral Soft Tissue',
      status: 'COMPLETED',
      badgeType: 'secondary',
      summary: 'Bilateral linea alba present. Localized marginal erythema documented in Q1 adjacent to #16 buccal vestibule. No ulcerative or leukoplakic lesions.',
      editRoute: '/examination/soft-tissue',
      details: (
        <div className="flex items-center gap-2 pt-1 text-xs text-on-surface-variant">
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <Icon name="photo_camera" className="text-base" />
          </div>
          <span className="font-medium">1 Quadrant Macro Photo (UR-16-Mucosa.jpg)</span>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Periodontal Assessment',
      status: 'COMPLETED',
      badgeType: 'secondary',
      summary: '6-point circumferential periodontal probing completed. Focal MB pocket 4mm on #16. General pockets ≤ 3mm.',
      editRoute: '/examination/periodontal',
      details: (
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="bg-surface-container-low p-2 rounded-xl">
            <span className="text-[10px] text-on-surface-variant block">BOP Score</span>
            <span className="text-xs sm:text-sm font-bold text-error">18%</span>
          </div>
          <div className="bg-surface-container-low p-2 rounded-xl">
            <span className="text-[10px] text-on-surface-variant block">Plaque Idx</span>
            <span className="text-xs sm:text-sm font-bold text-on-surface">24%</span>
          </div>
          <div className="bg-surface-container-low p-2 rounded-xl">
            <span className="text-[10px] text-on-surface-variant block">Classification</span>
            <span className="text-xs sm:text-sm font-bold text-secondary">Stg I / Gr A</span>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Occlusion & Functional Assessment',
      status: 'COMPLETED',
      badgeType: 'secondary',
      summary: "Angle's Class I molar & canine relationships bilateral. Anterior guidance harmonious. Mild localized attrition facets on lower molars #36, #46.",
      editRoute: '/examination/occlusion',
    },
    {
      id: 6,
      title: 'Dental Odontogram (Sec 9)',
      status: 'LINKED & VERIFIED',
      badgeType: 'primary',
      summary: '32 adult teeth recorded. Primary finding: Active Caries #16 (MO surface, ICDAS 3/4). Restorations: #21 Composite intact, #46 Amalgam stable.',
      editRoute: '/examination/odontogram-integration',
      details: (
        <div className="flex items-center gap-1.5 pt-1 overflow-x-auto text-[11px] font-mono">
          <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-bold">
            #16 CARIES MO
          </span>
          <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container">
            #21 COMPOSITE
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface">
            #46 AMALGAM
          </span>
        </div>
      ),
    },
    {
      id: 7,
      title: 'Diagnostic Radiographs (Sec 11)',
      status: 'LINKED & COMPLETED',
      badgeType: 'primary',
      summary: '3 DICOM series calibrated. Radiolucency observed extending into middle third of coronal dentin on tooth #16 mesial surface. No apical pathosis.',
      editRoute: '/examination/investigations',
      details: (
        <div className="flex items-center justify-between bg-surface-container-low p-2 rounded-xl text-xs">
          <div className="flex items-center gap-1.5">
            <Icon name="radiology" className="text-primary text-base" />
            <span className="text-on-surface">Bitewing Q1/Q4, PA #16, Baseline OPG</span>
          </div>
          <span className="font-semibold text-primary">3 Series</span>
        </div>
      ),
    },
    {
      id: 8,
      title: 'Clinical Impression & Diagnosis',
      status: 'COMPLETED',
      badgeType: 'secondary',
      summary: 'Diagnostic formulation aggregated from all modules with clinical confidence ratings.',
      editRoute: '/examination/assessment',
      details: (
        <div className="space-y-1.5 bg-surface-container-low p-2.5 rounded-xl text-xs">
          <div className="flex items-start gap-1.5">
            <Icon name="priority_high" className="text-error text-base shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-on-surface">Primary Provisional Diagnosis:</span>
              <p className="text-on-surface-variant">Tooth #16 Reversible Pulpitis secondary to Cavitated Dentinal Caries (ICDAS 4).</p>
            </div>
          </div>
          <div className="flex items-start gap-1.5 pt-1 border-t border-outline-variant/20">
            <Icon name="info" className="text-secondary text-base shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-on-surface">Secondary Diagnosis:</span>
              <p className="text-on-surface-variant">Localized Plaque-Induced Marginal Gingivitis (Stage I, Grade A periodontitis).</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <ExaminationShell
      pageTitle="Examination Review & Validation"
      badgeCode="10.14"
      badgeLabel="Review & Validation"
      currentStep="Module Validation & Pre-Sealing Gate"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Patient & Clinic Meta Card */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-base">
                  CO
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-secondary rounded-full ring-2 ring-surface-container-lowest" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-on-surface truncate">Chinedu Okafor</h2>
                  <span className="text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-semibold shrink-0">
                    34y • M
                  </span>
                </div>
                <p className="text-xs font-mono text-primary font-bold">ID: DHA-10482</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/60 text-on-secondary-container text-xs font-bold">
              <Icon name="verified" className="text-sm text-secondary" />
              <span>Identity Verified</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-outline-variant/20">
            <div className="p-3 rounded-xl bg-surface-container-low flex flex-col">
              <span className="text-[11px] text-on-surface-variant font-medium">Clinic Facility</span>
              <span className="text-xs font-bold text-on-surface">DHA Dental Care — Central Branch</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low flex flex-col">
              <span className="text-[11px] text-on-surface-variant font-medium">Attending Clinician Lead</span>
              <span className="text-xs font-bold text-on-surface">Dr. Daniel James</span>
              <span className="text-[10px] font-mono text-outline">License #DEN-48912</span>
            </div>
          </div>
        </section>

        {/* Overall Readiness Hero Banner */}
        <section className="bg-gradient-to-r from-secondary-container/70 via-surface-container to-primary/10 rounded-2xl p-5 shadow-sm border border-secondary/30 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-md">
              <Icon name="verified" className="text-2xl" />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-on-surface">100% Ready for Sealing</h3>
                <span className="text-xs bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full font-bold">
                  8 of 8 Passed
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                All 8 mandatory clinical assessment modules have met DHA Standard v1.0 schema benchmarks and diagnostic completeness criteria.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="text-[11px] text-secondary font-bold bg-surface-container-lowest/80 px-2.5 py-1 rounded-lg shadow-sm">
                  Comprehensive Dental Exam • Standard v1.0
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Matrix Header */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <Icon name="assignment_turned_in" className="text-primary text-xl" />
            <h3 className="text-sm sm:text-base font-bold text-on-surface">Structured Audit Matrix</h3>
          </div>
          <span className="text-xs font-mono font-bold text-secondary bg-secondary-container/50 px-2.5 py-0.5 rounded-full">
            8 of 8 Validated
          </span>
        </div>

        {/* Module Review Accordion / Cards List */}
        <div className="space-y-3">
          {auditModules.map((mod) => (
            <div
              key={mod.id}
              className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-outline-variant/30 space-y-3 hover:border-primary/40 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      mod.badgeType === 'primary'
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-secondary-container text-on-secondary-container'
                    }`}
                  >
                    {mod.id}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-on-surface truncate">{mod.title}</h4>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                      mod.badgeType === 'primary'
                        ? 'bg-primary-container/30 text-primary'
                        : 'bg-secondary-container/50 text-secondary'
                    }`}
                  >
                    {mod.status}
                  </span>
                  {mod.editRoute && (
                    <button
                      type="button"
                      onClick={() => navigate(mod.editRoute!)}
                      aria-label={`Edit ${mod.title}`}
                      className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-surface-container text-primary transition-colors"
                    >
                      <Icon name="edit" className="text-sm" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                {mod.summary}
              </p>

              {mod.details && <div className="pt-1">{mod.details}</div>}
            </div>
          ))}
        </div>

        {/* Clinical Governance & Safeguard Banner */}
        <section className="bg-surface-container-high rounded-2xl p-5 shadow-sm space-y-3 border border-outline-variant/30">
          <div className="flex items-center gap-2">
            <Icon name="lock_clock" className="text-primary text-xl" />
            <h4 className="text-xs sm:text-sm font-bold text-on-surface">Governance & Safeguard Check</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Icon name="check_circle" className="text-secondary text-base shrink-0" />
              <span className="text-on-surface font-medium">Zero unassessed sections marked as normal.</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="check_circle" className="text-secondary text-base shrink-0" />
              <span className="text-on-surface font-medium">Mandatory clinical fields (100%) verified by Dr. Daniel James (#DEN-48912).</span>
            </div>
            <p className="text-[11px] text-outline leading-relaxed pt-1">
              Upon proceeding, this examination record will be cryptographically locked into the DHA Unified Health Registry. Silent overwriting is prohibited under Nigeria Federal Health Law.
            </p>
          </div>
        </section>

        {/* Action Suite Container */}
        <div className="space-y-3 pt-2">
          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => {
              showToast('Validation confirmed. Navigating to Patient Summary...');
              navigate('/examination/patient-summary');
            }}
            className="w-full h-12 bg-primary hover:bg-primary/90 active:bg-primary-container text-on-primary rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <span>Proceed to Patient-Facing Summary (10.17)</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>

          {/* Secondary Split CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => showToast('Draft saved successfully to local clinical cache')}
              className="h-11 bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm border border-outline-variant/30 transition-colors"
            >
              <Icon name="save" className="text-base text-primary" />
              <span>Save Draft</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('Generating DHA Standard PDF Examination Dossier...')}
              className="h-11 bg-surface-container-lowest hover:bg-surface-container text-primary rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm border border-outline-variant/30 transition-colors"
            >
              <Icon name="picture_as_pdf" className="text-base" />
              <span>Export Summary PDF</span>
            </button>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/examination/assessment')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Icon name="arrow_back" className="text-sm" />
            <span>Module 8: Assessment</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/examination/recommendations')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <span>Follow-up Recommendations</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </div>
    </ExaminationShell>
  );
}

export default ExaminationReviewValidationScreen;

