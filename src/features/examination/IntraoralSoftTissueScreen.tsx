import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

export function IntraoralSoftTissueScreen() {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<string[]>(['zone-1', 'zone-2', 'zone-6']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    if (openSections.includes(id)) {
      setOpenSections(openSections.filter((s) => s !== id));
    } else {
      setOpenSections([...openSections, id]);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <ExaminationShell
      pageTitle="Intraoral Soft Tissue Examination"
      badgeCode="10.7"
      badgeLabel="Module 3 of 8"
      currentStep="Module 3: Stomatological & Mucosal Screen"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Subheader & Progress Module */}
        <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-primary uppercase tracking-wider">Module 3 of 8 • Intraoral Soft Tissue</span>
            <span className="font-mono text-xs font-semibold text-on-surface-variant">Protocol Sec 10.7</span>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden flex">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: '37.5%' }} />
          </div>
        </section>

        {/* Clinical Scope Banner */}
        <div className="bg-primary/5 rounded-2xl p-4 flex items-start gap-3 shadow-sm border border-primary/20 text-xs">
          <Icon name="clinical_notes" className="text-primary text-xl mt-0.5 shrink-0" />
          <div>
            <h3 className="font-bold text-on-surface text-sm">Mucous Membrane & Soft Tissue Inspection</h3>
            <p className="text-on-surface-variant mt-0.5 leading-relaxed">
              Screening per Stomatological Clinical Protocol v1.0. Systematically evaluate mucosal color, texture, surface integrity, and underlying glandular architecture.
            </p>
          </div>
        </div>

        {/* 7 Anatomical Inspection Zones Accordions */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-on-surface">Anatomical Inspection Zones</h2>
            <span className="text-[11px] font-bold uppercase text-outline">7 Sub-Sites</span>
          </div>

          {/* Zone 1: Lips & Labial Mucosa */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('zone-1')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Icon name="face" className="text-base" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">1. Lips & Labial Mucosa</h3>
                  <span className="text-xs text-on-surface-variant">Vermilion, sulci & labial frenum</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/50 text-secondary text-[11px] font-bold flex items-center gap-1">
                  <Icon name="check_circle" className="text-xs" />
                  <span>Normal</span>
                </span>
                <Icon
                  name="expand_more"
                  className={`text-outline transition-transform duration-200 ${openSections.includes('zone-1') ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {openSections.includes('zone-1') && (
              <div className="px-4 pb-4 pt-1 border-t border-outline-variant/20">
                <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                    Standard Diagnostic Assessment
                  </span>
                  <p className="leading-relaxed">
                    Smooth vermilion border bilaterally; patent labial frenum without blanching tension. No induration, mucosal cracking, or focal ulceration detected.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Zone 2: Buccal Mucosa & Vestibule (FLAGGED ABNORMAL) */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-error/30 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('zone-2')}
              className="w-full p-4 flex items-center justify-between text-left bg-error-container/15 hover:bg-error-container/25 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error shrink-0">
                  <Icon name="warning" className="text-base" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-on-surface">2. Buccal Mucosa & Vestibule</h3>
                    <span className="w-2 h-2 rounded-full bg-error shrink-0" />
                  </div>
                  <span className="text-xs text-on-surface-variant">Cheek lining & retromolar pad</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-bold flex items-center gap-1">
                  <Icon name="priority_high" className="text-xs" />
                  <span>Abnormal</span>
                </span>
                <Icon
                  name="expand_more"
                  className={`text-outline transition-transform duration-200 ${openSections.includes('zone-2') ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {openSections.includes('zone-2') && (
              <div className="p-4 space-y-3 border-t border-error/20 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                    Coded Findings
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-error-container text-on-error-container font-semibold flex items-center gap-1">
                      <Icon name="flag" className="text-xs text-error" />
                      <span>Localized Erythema</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-highest text-on-surface font-medium">
                      Linea Alba (Right)
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-highest text-on-surface font-medium">
                      Fordyce Granules (Bilateral)
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-outline block">
                    Structured Diagnostic Observations
                  </span>
                  <p className="leading-relaxed text-on-surface">
                    Distinct hyperkeratotic linea alba observed along occlusal plane on right quadrant. Discrete sebaceous Fordyce granules noted bilaterally. Mild localized erythematous patch adjacent to maxillary right first molar (#16) vestibule.
                  </p>
                </div>

                <div className="bg-primary/5 rounded-xl p-3 border border-primary/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-primary font-bold text-[11px]">
                    <Icon name="edit_note" className="text-sm" />
                    <span>Clinician Annotation (Dr. James)</span>
                  </div>
                  <p className="text-on-surface italic text-xs leading-relaxed">
                    "Mild erythema near #16 vestibule corresponding to patient cold complaint and reported brush sensitivity. Photographic assessment logged below."
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Zone 3: Tongue */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('zone-3')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Icon name="texture" className="text-base" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">3. Tongue (Dorsal, Ventral, Lateral)</h3>
                  <span className="text-xs text-on-surface-variant">Papillae & lateral borders</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/50 text-secondary text-[11px] font-bold flex items-center gap-1">
                  <Icon name="check_circle" className="text-xs" />
                  <span>Normal</span>
                </span>
                <Icon
                  name="expand_more"
                  className={`text-outline transition-transform duration-200 ${openSections.includes('zone-3') ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {openSections.includes('zone-3') && (
              <div className="px-4 pb-4 pt-1 border-t border-outline-variant/20">
                <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface">
                  <p className="leading-relaxed">
                    Filiform and fungiform papillae healthy and evenly distributed. Lateral tongue margins evaluated with sterile gauze displacement: clear of leukoplakia, erythroplakia, or traumatic hyperkeratosis. Lingual frenum demonstrates unrestricted midline mobility.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Zone 4: Floor of Mouth */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('zone-4')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Icon name="water_drop" className="text-base" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">4. Floor of Mouth</h3>
                  <span className="text-xs text-on-surface-variant">Sublingual gland & Wharton’s ducts</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/50 text-secondary text-[11px] font-bold flex items-center gap-1">
                  <Icon name="check_circle" className="text-xs" />
                  <span>Normal</span>
                </span>
                <Icon
                  name="expand_more"
                  className={`text-outline transition-transform duration-200 ${openSections.includes('zone-4') ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {openSections.includes('zone-4') && (
              <div className="px-4 pb-4 pt-1 border-t border-outline-variant/20">
                <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface">
                  <p className="leading-relaxed">
                    Bilateral submandibular caruncles and Wharton’s duct orifices patent with clear salivary expression upon digital stimulation. Tissues supple upon bimanual floor-of-mouth palpation; no sialoliths or submucosal nodules.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Zone 5: Hard & Soft Palate, Uvula */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('zone-5')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Icon name="roofing" className="text-base" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">5. Hard & Soft Palate, Uvula</h3>
                  <span className="text-xs text-on-surface-variant">Rugae, vault contour & symmetry</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/50 text-secondary text-[11px] font-bold flex items-center gap-1">
                  <Icon name="check_circle" className="text-xs" />
                  <span>Normal</span>
                </span>
                <Icon
                  name="expand_more"
                  className={`text-outline transition-transform duration-200 ${openSections.includes('zone-5') ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {openSections.includes('zone-5') && (
              <div className="px-4 pb-4 pt-1 border-t border-outline-variant/20">
                <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface">
                  <p className="leading-relaxed">
                    Anterior palatal rugae distinct, incisive papilla normal without inflammatory swelling. Hard palate vault contour regular with no clefts or torus palatinus. Soft palate and uvula rise symmetrically on phonation without deviation.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Zone 6: Attached & Marginal Gingiva (FLAGGED ABNORMAL) */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-error/30 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('zone-6')}
              className="w-full p-4 flex items-center justify-between text-left bg-error-container/15 hover:bg-error-container/25 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error shrink-0">
                  <Icon name="dentistry" className="text-base" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-on-surface">6. Attached & Marginal Gingiva</h3>
                    <span className="w-2 h-2 rounded-full bg-error shrink-0" />
                  </div>
                  <span className="text-xs text-on-surface-variant">Gingival architecture & papillae</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-bold flex items-center gap-1">
                  <Icon name="priority_high" className="text-xs" />
                  <span>Abnormal</span>
                </span>
                <Icon
                  name="expand_more"
                  className={`text-outline transition-transform duration-200 ${openSections.includes('zone-6') ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {openSections.includes('zone-6') && (
              <div className="p-4 space-y-3 border-t border-error/20 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-error-container text-on-error-container font-semibold flex items-center gap-1">
                    <Icon name="flag" className="text-xs text-error" />
                    <span>Marginal Gingivitis Q1</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-error-container text-on-error-container font-semibold flex items-center gap-1">
                    <Icon name="flag" className="text-xs text-error" />
                    <span>Lower Anterior Edema Q4</span>
                  </span>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl space-y-2">
                  <p className="leading-relaxed text-on-surface">
                    Localized marginal erythema and slight rolled margins in Quadrant 1 (buccal of #15, #16) and Quadrant 4 lower anteriors. Mild stippling loss over interdental papillae.
                  </p>
                  <div className="flex items-center gap-1.5 text-primary font-bold text-[11px]">
                    <Icon name="arrow_right_alt" className="text-base" />
                    <span>Detailed 6-Point Periodontal Probing deferred to Section 4</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Zone 7: Oropharynx & Tonsillar Pillars */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('zone-7')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <Icon name="record_voice_over" className="text-base" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-on-surface">7. Oropharynx & Tonsillar Pillars</h3>
                  <span className="text-xs text-on-surface-variant">Fauces, pillars & pharynx</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/50 text-secondary text-[11px] font-bold flex items-center gap-1">
                  <Icon name="check_circle" className="text-xs" />
                  <span>Normal</span>
                </span>
                <Icon
                  name="expand_more"
                  className={`text-outline transition-transform duration-200 ${openSections.includes('zone-7') ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {openSections.includes('zone-7') && (
              <div className="px-4 pb-4 pt-1 border-t border-outline-variant/20">
                <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface">
                  <p className="leading-relaxed">
                    Grade 1 palatine tonsils tucked behind anterior pillars, non-erythematous. Posterior pharyngeal wall smooth, devoid of purulent exudate or lymphoid cobblestoning.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Diagnostic Imaging Card */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Icon name="photo_camera" className="text-primary text-xl" />
              <h3 className="font-bold text-sm text-on-surface">Diagnostic Clinical Imaging</h3>
            </div>
            <span className="font-mono text-xs text-on-surface-variant font-semibold">1 File Attached</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4 p-3.5 bg-surface-container-low rounded-2xl">
            <div className="relative w-full sm:w-28 h-28 rounded-xl overflow-hidden shrink-0 bg-surface-container">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80"
                alt="UR Buccal Vestibule"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-black/75 text-white px-1.5 py-0.5 rounded text-[10px] font-mono">
                UR-16
              </div>
            </div>

            <div className="flex-1 min-w-0 text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-[10px]">
                  Consent Verified
                </span>
                <span className="font-mono text-[10px] text-outline">16 Feb 2025</span>
              </div>
              <h4 className="font-bold text-sm text-on-surface truncate">UR Buccal Vestibule & Tooth 16 Gingival Margin</h4>
              <p className="text-on-surface-variant leading-relaxed">
                High-resolution quadrant capture demonstrating localized vascularity and rolled gingival contour.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => showToast('Opening high-res clinical macro viewport...')}
                  className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                >
                  <Icon name="visibility" className="text-xs" />
                  <span>View Full</span>
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => showToast('Intraoral camera connected. Ready to capture.')}
            className="w-full py-2.5 bg-surface-container hover:bg-surface-container-high text-primary rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Icon name="add_a_photo" className="text-base" />
            <span>+ Capture / Attach Intraoral Photo</span>
          </button>
        </section>

        {/* Clinical Governance Notice */}
        <div className="p-4 rounded-2xl bg-surface-container-low flex items-start gap-3 text-xs text-on-surface-variant border border-outline-variant/20">
          <Icon name="shield_with_heart" className="text-secondary text-lg shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-on-surface font-semibold">Clinical Governance:</strong> Soft tissue findings are preliminary pending Dr. Daniel James final validation. Any mucosal lesion exhibiting non-healing erosion, induration, or unexplained leukoplakia requires mandatory 14-day recare tracking protocol.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => navigate('/examination/periodontal')}
            className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            <span>Proceed to Periodontal Examination (Section 4)</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => showToast('Soft tissue examination progress saved.')}
              className="h-10 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="save" className="text-sm text-primary" />
              <span>Save Progress</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/examination/workspace')}
              className="h-10 bg-surface-container-low hover:bg-surface-container text-on-surface-variant rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="arrow_back" className="text-sm" />
              <span>Workspace</span>
            </button>
          </div>
        </div>
      </div>
    </ExaminationShell>
  );
}
export default IntraoralSoftTissueScreen;

