import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { OdontogramShell } from './OdontogramShell';
import { Icon } from '../../design/Primitives';

export function GeneralOralFindingsScreen() {
  const [openAccordions, setOpenAccordions] = useState<string[]>(['cat-a', 'cat-b']);
  const [crowdingChecked, setCrowdingChecked] = useState(true);
  const [tmjNormal, setTmjNormal] = useState(true);
  const [softTissueNormal, setSoftTissueNormal] = useState(true);
  const [torusChecked, setTorusChecked] = useState(true);

  const toggleAccordion = (id: string) => {
    if (openAccordions.includes(id)) {
      setOpenAccordions(openAccordions.filter((a) => a !== id));
    } else {
      setOpenAccordions([...openAccordions, id]);
    }
  };

  return (
    <OdontogramShell
      pageTitle="General Oral Findings"
      badgeCode="9.5"
      badgeLabel="Stomatology & Alignment"
    >
      <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
        {/* Patient Context Banner */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                Amina Yusuf
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-mono text-xs">
                28y Female
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-xs font-bold">
                DHA-000245
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Comprehensive Stomatology & Non-Dental Structures Assessment
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-surface-container-low text-xs font-semibold text-primary flex items-center gap-1.5 self-start sm:self-auto">
            <Icon name="edit_note" className="text-[16px]" />
            <span>Draft Mode</span>
          </div>
        </section>

        {/* Progress Summary Ribbon */}
        <section className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <Icon name="task_alt" className="text-[20px]" />
            </div>
            <div>
              <div className="text-xs text-on-surface-variant">Review Progress</div>
              <div className="text-sm font-bold text-on-surface">4 of 4 Assessed</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <Icon name="flag" className="text-[20px]" />
            </div>
            <div>
              <div className="text-xs text-on-surface-variant">Flagged Variants</div>
              <div className="text-sm font-bold text-on-surface">2 Recorded</div>
            </div>
          </div>
        </section>

        {/* 4 Assessment Accordion Groups */}
        <div className="space-y-4">
          {/* CATEGORY A: DENTITION & ARCH ALIGNMENT */}
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion('cat-a')}
              className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-3 hover:bg-surface-container-low transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                  <Icon name="straighten" className="text-[22px]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-title-sm text-sm sm:text-base font-bold text-on-surface">
                      A. Dentition Arrangement & Arch Alignment
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-[11px] font-bold">
                      1 Flagged
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">
                    Mandibular anterior crowding noted
                  </p>
                </div>
              </div>

              <Icon
                name={openAccordions.includes('cat-a') ? 'expand_less' : 'expand_more'}
                className="text-[24px] text-on-surface-variant shrink-0"
              />
            </button>

            {openAccordions.includes('cat-a') && (
              <div className="px-5 sm:px-6 pb-6 pt-0 space-y-4 text-xs border-t border-outline-variant/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={() => setCrowdingChecked(!crowdingChecked)}
                    className={`p-3.5 rounded-2xl border text-left flex items-start justify-between transition ${
                      crowdingChecked ? 'bg-primary-fixed/20 border-primary text-on-surface' : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant'
                    }`}
                  >
                    <div>
                      <strong className="block font-bold">Moderate Crowding</strong>
                      <span className="text-[11px] text-on-surface-variant">Mandibular anterior teeth #31–#42</span>
                    </div>
                    <Icon name={crowdingChecked ? 'check_box' : 'check_box_outline_blank'} className={`text-[18px] ${crowdingChecked ? 'text-primary' : ''}`} />
                  </button>

                  <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between text-on-surface-variant">
                    <span>Diastema / Spacing (&gt;2mm)</span>
                    <Icon name="check_box_outline_blank" className="text-[18px]" />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between text-on-surface-variant">
                    <span>Crossbite (Anterior / Posterior)</span>
                    <Icon name="check_box_outline_blank" className="text-[18px]" />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between text-on-surface-variant">
                    <span>Attrition / Bruxism / Occlusal Wear</span>
                    <Icon name="check_box_outline_blank" className="text-[18px]" />
                  </div>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-primary tracking-wider block">
                    Clinician Annotation:
                  </span>
                  <p className="text-on-surface">Class I molar relationship bilaterally. Mild anterior mandibular imbrication noted.</p>
                </div>
              </div>
            )}
          </div>

          {/* CATEGORY B: TMJ & JAW FUNCTION */}
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion('cat-b')}
              className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-3 hover:bg-surface-container-low transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <Icon name="head_mounted_device" className="text-[22px]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-title-sm text-sm sm:text-base font-bold text-on-surface">
                      B. Temporomandibular Joint (TMJ) & Function
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                      Normal
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">
                    Full range of motion, zero joint clicks or tenderness
                  </p>
                </div>
              </div>

              <Icon
                name={openAccordions.includes('cat-b') ? 'expand_less' : 'expand_more'}
                className="text-[24px] text-on-surface-variant shrink-0"
              />
            </button>

            {openAccordions.includes('cat-b') && (
              <div className="px-5 sm:px-6 pb-6 pt-0 space-y-4 text-xs border-t border-outline-variant/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={() => setTmjNormal(!tmjNormal)}
                    className={`p-3.5 rounded-2xl border text-left flex items-start justify-between transition ${
                      tmjNormal ? 'bg-secondary-container/30 border-secondary text-on-surface' : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant'
                    }`}
                  >
                    <div>
                      <strong className="block font-bold">No Obvious TMJ Dysfunction Observed</strong>
                      <span className="text-[11px] text-on-surface-variant">Smooth hinge & glide bilateral excursion</span>
                    </div>
                    <Icon name={tmjNormal ? 'check_box' : 'check_box_outline_blank'} className={`text-[18px] ${tmjNormal ? 'text-secondary' : ''}`} />
                  </button>

                  <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between text-on-surface-variant">
                    <span>Clicking / Crepitus</span>
                    <Icon name="check_box_outline_blank" className="text-[18px]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CATEGORY C: ORAL SOFT TISSUES */}
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion('cat-c')}
              className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-3 hover:bg-surface-container-low transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center shrink-0">
                  <Icon name="face" className="text-[22px]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-title-sm text-sm sm:text-base font-bold text-on-surface">
                      C. Oral Soft Tissues (Tongue, Palate, Cheeks)
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-bold">
                      No Pathology
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">
                    Normal moist mucosa, ducts patent
                  </p>
                </div>
              </div>

              <Icon
                name={openAccordions.includes('cat-c') ? 'expand_less' : 'expand_more'}
                className="text-[24px] text-on-surface-variant shrink-0"
              />
            </button>

            {openAccordions.includes('cat-c') && (
              <div className="px-5 sm:px-6 pb-6 pt-0 space-y-4 text-xs border-t border-outline-variant/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={() => setSoftTissueNormal(!softTissueNormal)}
                    className={`p-3.5 rounded-2xl border text-left flex items-start justify-between transition ${
                      softTissueNormal ? 'bg-secondary-container/30 border-secondary text-on-surface' : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant'
                    }`}
                  >
                    <div>
                      <strong className="block font-bold">No Obvious Soft Tissue Concern Observed</strong>
                      <span className="text-[11px] text-on-surface-variant">Normal appearance across buccal, lingual, palatal mucosa</span>
                    </div>
                    <Icon name={softTissueNormal ? 'check_box' : 'check_box_outline_blank'} className={`text-[18px] ${softTissueNormal ? 'text-secondary' : ''}`} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CATEGORY D: BONY STRUCTURES */}
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden transition">
            <button
              type="button"
              onClick={() => toggleAccordion('cat-d')}
              className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-3 hover:bg-surface-container-low transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                  <Icon name="skeleton" className="text-[22px]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-title-sm text-sm sm:text-base font-bold text-on-surface">
                      D. Bony & Maxillofacial Structures
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-[11px] font-bold">
                      1 Benign Variant
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">
                    Bilateral Torus Mandibularis observed
                  </p>
                </div>
              </div>

              <Icon
                name={openAccordions.includes('cat-d') ? 'expand_less' : 'expand_more'}
                className="text-[24px] text-on-surface-variant shrink-0"
              />
            </button>

            {openAccordions.includes('cat-d') && (
              <div className="px-5 sm:px-6 pb-6 pt-0 space-y-4 text-xs border-t border-outline-variant/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={() => setTorusChecked(!torusChecked)}
                    className={`p-3.5 rounded-2xl border text-left flex items-start justify-between transition ${
                      torusChecked ? 'bg-primary-fixed/20 border-primary text-on-surface' : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant'
                    }`}
                  >
                    <div>
                      <strong className="block font-bold">Torus Mandibularis</strong>
                      <span className="text-[11px] text-on-surface-variant">Bilateral, asymptomatic, lingual premolar shelf</span>
                    </div>
                    <Icon name={torusChecked ? 'check_box' : 'check_box_outline_blank'} className={`text-[18px] ${torusChecked ? 'text-primary' : ''}`} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Diagnostic Imagery Thumbnails */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-title-sm text-sm sm:text-base font-bold text-on-surface flex items-center gap-2">
              <Icon name="photo_camera" className="text-primary text-[20px]" />
              <span>Associated Diagnostic Clinical Imagery</span>
            </h3>
            <span className="text-xs text-on-surface-variant">2 Photos Linked</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden bg-surface-container h-32 sm:h-40 border border-outline-variant/20">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyDf4tzVdy1zaeZm45tC89kIPuEbI4OuCxBTjhefahRKHMRLX2_jUO7koL-f3d8unsh8glc8GGvcf648Bdb233DqQWreNDbpfiLRdfXMO0C-DD2od-gElpfWNQL_-6MUrGWGIAkk7X6bwUhT3XVwe8SG8idT2LL10wnXpa9o3w2FgXo7vsYd5D840vLDJltamYLCNmNZ8FcaCUMMLf7BoGFi_3_8w6u48dNt5L7I-C"
                alt="Arch Anterior"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-surface/90 text-on-surface text-[10px] font-mono font-bold">
                Arch Anterior (Crowding)
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-surface-container h-32 sm:h-40 border border-outline-variant/20">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwicfiD8jOtOWtZOW_w-3iQz8elnH-LEOXbU5Qn7PJm3IM_cF2t1ZtnJV7FgzGiGCPSKpOkGkxZrY2ttL4FEFj7c3I1jSQsf-nAqD4WyUQLpbAIMJKrQc_OxSXHYlU_UEeO_VbhnIh27TUyRdBTrJO4clLhHfPIaiVUvBkzRE0upjztwnR7DjOwh9wqkVSrMKiEwjaVkgodjUQoGkHPCu4yTIf4S-IkWDGoQEZGQjA"
                alt="Lingual Tori"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-surface/90 text-on-surface text-[10px] font-mono font-bold">
                Lingual Mandibular Tori
              </span>
            </div>
          </div>
        </section>

        {/* Action Footers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <NavLink
            to="/odontogram/overview"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition text-center"
          >
            Back to Overview
          </NavLink>

          <NavLink
            to="/odontogram/investigations"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center justify-center gap-2"
          >
            <span>Proceed to Investigation References</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </NavLink>
        </div>
      </div>
    </OdontogramShell>
  );
}

export default GeneralOralFindingsScreen;

