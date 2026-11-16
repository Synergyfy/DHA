import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

export function ExaminationWorkspaceOverviewScreen() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <ExaminationShell
      pageTitle="Section 10 Examination Workspace"
      badgeCode="10.4"
      badgeLabel="Encounter Master Desk"
      currentStep="Clinical Encounter Overview & Module Hub"
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Master Clinical Banner */}
        <section className="bg-surface-container rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden border border-outline-variant/30">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-lowest flex items-center justify-center text-primary font-bold text-lg shadow-sm shrink-0">
                  CO
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-on-surface">Chinedu Okafor</h2>
                    <span className="text-xs font-semibold bg-surface-container-highest px-2 py-0.5 rounded-full text-on-surface-variant">
                      34y • Male
                    </span>
                    <span className="font-mono text-xs font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded-full">
                      DHA-10482
                    </span>
                  </div>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    Attending: Dr. Daniel James (#DEN-48912) • Central Branch
                  </div>
                </div>
              </div>

              {/* Status Indicator Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>In Progress (Auto-saved 10:28 AM)</span>
              </div>
            </div>

            {/* Examination Details Grid */}
            <div className="bg-surface-container-lowest/90 backdrop-blur-sm rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border border-outline-variant/20">
              <div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Exam Type & Template</span>
                <span className="font-bold text-sm text-on-surface">Comprehensive Examination</span>
                <span className="font-mono text-outline block mt-0.5">Std Comprehensive v1.0 (DHA Locked)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Encounter Facility</span>
                <span className="font-bold text-sm text-on-surface">DHA Dental Care — Central Branch</span>
                <span className="text-secondary font-medium flex items-center gap-1 mt-0.5">
                  <Icon name="location_on" className="text-xs" />
                  <span>Sector 10 Clinical Hub</span>
                </span>
              </div>
            </div>

            {/* Progress Tracker Ring & Bar */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="verified_user" className="text-primary text-base" />
                  <span className="font-bold text-xs sm:text-sm text-on-surface">Clinical Readiness</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-extrabold text-primary">62%</span>
                  <span className="text-xs text-on-surface-variant font-medium">(5 of 8 Sections Active)</span>
                </div>
              </div>

              {/* Segmented Progress Bar */}
              <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden flex gap-0.5 p-0.5">
                <div className="h-full bg-secondary rounded-l-full w-[12.5%]" title="History: Completed" />
                <div className="h-full bg-secondary w-[12.5%]" title="Extraoral: Completed" />
                <div className="h-full bg-tertiary-container w-[12.5%] animate-pulse" title="Soft Tissue: In Progress" />
                <div className="h-full bg-tertiary-container w-[12.5%] animate-pulse" title="Perio: In Progress" />
                <div className="h-full bg-surface-dim w-[12.5%]" title="Occlusion: Pending" />
                <div className="h-full bg-primary w-[12.5%]" title="Odontogram: Linked" />
                <div className="h-full bg-secondary w-[12.5%]" title="Investigations: Complete" />
                <div className="h-full bg-surface-variant rounded-r-full w-[12.5%]" title="Plan: Draft" />
              </div>

              <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 font-medium">
                <span>1. Patient Intake</span>
                <span>4. Diagnostics</span>
                <span>8. Final Sign-off</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Action Micro Toolbar */}
        <section className="bg-surface-container-lowest rounded-2xl p-2.5 shadow-sm border border-outline-variant/30 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => showToast('Attachment dialog opened. Ready for clinic docs.')}
            className="flex-1 py-2 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold"
          >
            <Icon name="attach_file" className="text-base text-primary" />
            <span>Attachment</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Clinical rapid note pad saved.')}
            className="flex-1 py-2 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold"
          >
            <Icon name="edit_note" className="text-base text-secondary" />
            <span>Quick Notes</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Printing clinical examination summary sheet...')}
            className="flex-1 py-2 px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold"
          >
            <Icon name="print" className="text-base text-tertiary" />
            <span>Print Sheet</span>
          </button>
        </section>

        {/* Module Catalog Header */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-on-surface">Clinical Examination Modules</h2>
            <p className="text-xs text-on-surface-variant">Systematic 8-phase diagnostic protocol</p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-fixed px-2.5 py-1 rounded-full">
            Required for Sign-off
          </span>
        </div>

        {/* 8 Examination Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Module 1: Patient History & Complaint */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-secondary-container/60 text-on-secondary-container flex items-center justify-center font-mono text-xs font-bold">
                    01
                  </div>
                  <h3 className="font-bold text-sm text-on-surface">Patient History & Complaint</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase flex items-center gap-1">
                  <Icon name="check_circle" className="text-xs" />
                  <span>Completed</span>
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                Main complaint: Right posterior tooth sensitivity with cold stimulants. Penicillin allergy flagged.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant text-[11px]">Updated by <strong>Dr. Daniel</strong></span>
              <Link
                to="/examination/history-complaint"
                className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs transition-colors inline-flex items-center gap-1"
              >
                <span>Review</span>
                <Icon name="chevron_right" className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Module 2: Extraoral Examination */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-secondary-container/60 text-on-secondary-container flex items-center justify-center font-mono text-xs font-bold">
                    02
                  </div>
                  <h3 className="font-bold text-sm text-on-surface">Extraoral Examination</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase flex items-center gap-1">
                  <Icon name="check_circle" className="text-xs" />
                  <span>Completed</span>
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                Facial symmetry intact, cervical lymph nodes non-tender, TMJ normal bilateral opening range (45mm).
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant text-[11px]">Logged today 10:14 AM</span>
              <Link
                to="/examination/extraoral"
                className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs transition-colors inline-flex items-center gap-1"
              >
                <span>Review</span>
                <Icon name="chevron_right" className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Module 3: Intraoral Soft Tissue */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-mono text-xs font-bold">
                    03
                  </div>
                  <h3 className="font-bold text-sm text-on-surface">Intraoral Soft Tissue</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                  <span>In Progress</span>
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                Buccal mucosa & tongue normal; localized marginal erythema flagged in quadrant 1 & 4.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
              <span className="text-tertiary font-bold text-[11px] flex items-center gap-1">
                <Icon name="warning" className="text-xs" />
                <span>1 Clinical Flag</span>
              </span>
              <Link
                to="/examination/soft-tissue"
                className="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-bold text-xs transition-colors inline-flex items-center gap-1 shadow-sm"
              >
                <span>Resume</span>
                <Icon name="edit" className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Module 4: Periodontal Examination */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-mono text-xs font-bold">
                    04
                  </div>
                  <h3 className="font-bold text-sm text-on-surface">Periodontal Examination</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                  <span>In Progress</span>
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                General screening logged; 6-point full-mouth pocket depth probing pending Q2 completion.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant text-[11px]">4 of 6 quadrants measured</span>
              <Link
                to="/examination/periodontal"
                className="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-bold text-xs transition-colors inline-flex items-center gap-1 shadow-sm"
              >
                <span>Continue</span>
                <Icon name="arrow_forward" className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Module 5: Occlusion & Function */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-mono text-xs font-bold">
                    05
                  </div>
                  <h3 className="font-bold text-sm text-on-surface">Occlusion & Function</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-outline text-[10px] font-bold uppercase">
                  Not Assessed
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                Class I molar relationship to verify; overbite and canine guidance awaiting dynamic check.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant text-[11px]">Pending initial entry</span>
              <button
                type="button"
                onClick={() => showToast('Opening Occlusal examination worksheet...')}
                className="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-dim text-on-surface font-bold text-xs transition-colors inline-flex items-center gap-1"
              >
                <span>Start</span>
                <Icon name="add" className="text-xs" />
              </button>
            </div>
          </div>

          {/* Module 6: Linked Odontogram Section 9 */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-primary/30 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-mono text-xs font-bold">
                    06
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-on-surface">Dental Odontogram</h3>
                    <span className="font-mono text-[10px] text-primary font-semibold">DHA Section 9 Active Hub</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold uppercase flex items-center gap-1">
                  <Icon name="link" className="text-xs" />
                  <span>Linked & Active</span>
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-2 leading-relaxed">
                32 Teeth mapped. Caries identified at #16 MO; previous restoration #46 intact.
              </p>

              {/* Tooth quick matrix */}
              <div className="bg-surface-container rounded-xl p-2 mb-3 flex items-center justify-between text-center overflow-x-auto text-[10px]">
                <div className="px-2 py-1 bg-surface-container-lowest rounded font-mono">#18 Sound</div>
                <div className="px-2 py-1 bg-surface-container-lowest rounded font-mono">#17 Sound</div>
                <div className="px-2 py-1 bg-error-container text-error font-bold rounded font-mono">#16 Caries</div>
                <div className="px-2 py-1 bg-surface-container-lowest rounded font-mono">#15 Sound</div>
                <div className="px-2 py-1 bg-secondary-container text-secondary font-bold rounded font-mono">#46 Restored</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
              <span className="text-on-surface font-medium text-[11px]">32/32 Teeth Synced</span>
              <Link
                to="/odontogram/overview"
                className="px-3 py-1.5 rounded-xl bg-primary-container text-on-primary-container font-bold text-xs transition-colors inline-flex items-center gap-1 shadow-sm"
              >
                <span>Open Odontogram</span>
                <Icon name="open_in_new" className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Module 7: Investigations & Radiographs */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-secondary-container/60 text-on-secondary-container flex items-center justify-center font-mono text-xs font-bold">
                    07
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-on-surface">Investigations & Radiographs</h3>
                    <span className="font-mono text-[10px] text-secondary font-semibold">Section 11 Records</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase flex items-center gap-1">
                  <Icon name="check_circle" className="text-xs" />
                  <span>Completed</span>
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                2 Bitewings + 1 Periapical attached. Coronal radiolucency tooth #16 confirmed. Bone level normal.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant text-[11px]">3 DICOM Series Uploaded</span>
              <Link
                to="/odontogram/investigations"
                className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs transition-colors inline-flex items-center gap-1"
              >
                <span>View X-Rays</span>
                <Icon name="chevron_right" className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Module 8: Clinical Impression & Plan */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-surface-variant text-on-surface flex items-center justify-center font-mono text-xs font-bold">
                    08
                  </div>
                  <h3 className="font-bold text-sm text-on-surface">Clinical Impression & Plan</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-variant text-on-surface text-[10px] font-bold uppercase flex items-center gap-1">
                  <Icon name="hourglass_top" className="text-xs" />
                  <span>Draft Pending</span>
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                Provisional diagnosis formulation awaiting final periodontal charting & occlusal sign-off.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant text-[11px]">Pre-validation gate</span>
              <Link
                to="/odontogram/summary"
                className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs transition-colors inline-flex items-center gap-1"
              >
                <span>Edit Draft</span>
                <Icon name="edit" className="text-xs" />
              </Link>
            </div>
          </div>
        </div>

        {/* Action Hub */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => showToast('Encounter draft saved to DHA electronic records.')}
            className="flex-1 py-3 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors border border-outline-variant/30"
          >
            <Icon name="save" className="text-base" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/odontogram/summary')}
            className="flex-2 py-3 px-6 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <span>Validate & Review Sign-off</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>
        </div>
      </div>
    </ExaminationShell>
  );
}
export default ExaminationWorkspaceOverviewScreen;

