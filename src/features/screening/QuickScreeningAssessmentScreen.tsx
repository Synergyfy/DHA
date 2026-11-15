import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ScreeningShell } from './ScreeningShell';
import { Icon } from '../../design/Primitives';

export function QuickScreeningAssessmentScreen() {
  const [teethFindings, setTeethFindings] = useState<string[]>(['decay', 'discolouration']);
  const [gumFindings, setGumFindings] = useState<string[]>(['redness', 'bleeding']);
  const [tissueFindings, setTissueFindings] = useState<string[]>(['healthy']);
  const [hygieneFindings, setHygieneFindings] = useState<string[]>(['plaque']);
  const [observations, setObservations] = useState(
    'Upper right primary molar #54 shows cavitated dark pit on occlusal surface. Plaque deposits along gum margin. Advised on circular brushing technique.'
  );

  const toggleTeeth = (id: string) => {
    if (teethFindings.includes(id)) {
      setTeethFindings(teethFindings.filter((f) => f !== id));
    } else {
      setTeethFindings([...teethFindings, id]);
    }
  };

  const toggleGums = (id: string) => {
    if (gumFindings.includes(id)) {
      setGumFindings(gumFindings.filter((f) => f !== id));
    } else {
      setGumFindings([...gumFindings, id]);
    }
  };

  const toggleTissue = (id: string) => {
    if (tissueFindings.includes(id)) {
      setTissueFindings(tissueFindings.filter((f) => f !== id));
    } else {
      setTissueFindings([...tissueFindings, id]);
    }
  };

  const toggleHygiene = (id: string) => {
    if (hygieneFindings.includes(id)) {
      setHygieneFindings(hygieneFindings.filter((f) => f !== id));
    } else {
      setHygieneFindings([...hygieneFindings, id]);
    }
  };

  return (
    <ScreeningShell
      pageTitle="Clinical Findings Assessment"
      badgeCode="8.5"
      badgeLabel="Step 4 of 5"
      currentStep={4}
      totalSteps={5}
    >
      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {/* Progress Header */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Step 4 of 5: Objective Clinical Findings</span>
            </span>
            <span className="text-secondary font-bold">Quick Protocol DHA-QS</span>
          </div>

          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full w-4/5" />
          </div>

          {/* Patient Chip */}
          <div className="p-3 bg-surface-container-low rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center text-xs">
                ZA
              </div>
              <div>
                <span className="font-bold text-on-surface block">Zayd Al-Mansoori (9y)</span>
                <span className="text-error font-medium flex items-center gap-1">
                  <Icon name="emergency" className="text-[12px]" />
                  <span>Reported Toothache & Bleeding</span>
                </span>
              </div>
            </div>

            <span className="font-mono text-xs text-primary font-bold">Student #4092</span>
          </div>
        </section>

        {/* Non-Diagnostic Disclaimer */}
        <div className="p-4 rounded-2xl bg-error-container text-on-error-container flex items-start gap-3 text-xs">
          <Icon name="info" className="text-error text-[20px] shrink-0 mt-0.5" />
          <div>
            <strong className="text-error font-bold block text-sm">Non-Diagnostic Screening</strong>
            <p className="mt-0.5 leading-relaxed">
              Basic visual field inspection only. Full 32-tooth odontogram charting, probing depths, and radiographs belong to clinical clinic sections.
            </p>
          </div>
        </div>

        {/* 4 Assessment Accordion Groups */}
        <div className="space-y-4">
          {/* GROUP 1: TEETH */}
          <details className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3 group" open>
            <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm text-on-surface">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                  <Icon name="dentistry" className="text-[20px]" />
                </div>
                <div>
                  <span className="block">Group 1: Teeth Observations</span>
                  <span className="text-[11px] text-error font-semibold">2 Observations Flagged</span>
                </div>
              </div>
              <Icon name="expand_more" className="text-[20px] text-on-surface-variant transition-transform group-open:rotate-180" />
            </summary>

            <div className="pt-3 border-t border-outline-variant/20 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'decay', label: 'Suspected visible tooth decay', note: 'Upper right molar #54 occlusal' },
                { id: 'broken', label: 'Broken or damaged teeth', note: 'Coronal fracture / incisal chip' },
                { id: 'missing', label: 'Missing teeth', note: 'Non-developmental exfoliation' },
                { id: 'discolouration', label: 'Visible dark staining', note: 'Localized pit & fissure' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleTeeth(item.id)}
                  className={`p-3 rounded-2xl border text-left flex items-start justify-between transition ${
                    teethFindings.includes(item.id)
                      ? 'bg-primary-fixed/30 border-primary text-on-surface font-semibold'
                      : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant'
                  }`}
                >
                  <div>
                    <span className="block text-xs">{item.label}</span>
                    <span className="text-[10px] text-on-surface-variant font-normal">{item.note}</span>
                  </div>
                  <Icon
                    name={teethFindings.includes(item.id) ? 'check_box' : 'check_box_outline_blank'}
                    className={`text-[18px] shrink-0 ${teethFindings.includes(item.id) ? 'text-primary' : ''}`}
                  />
                </button>
              ))}
            </div>
          </details>

          {/* GROUP 2: GUMS */}
          <details className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3 group" open>
            <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm text-on-surface">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-error-container text-error flex items-center justify-center">
                  <Icon name="water_drop" className="text-[20px]" />
                </div>
                <div>
                  <span className="block">Group 2: Gums & Gingival Health</span>
                  <span className="text-[11px] text-error font-semibold">2 Signs Present</span>
                </div>
              </div>
              <Icon name="expand_more" className="text-[20px] text-on-surface-variant transition-transform group-open:rotate-180" />
            </summary>

            <div className="pt-3 border-t border-outline-variant/20 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'redness', label: 'Gum redness / erythema', note: 'Marginal erythema around upper molars' },
                { id: 'bleeding', label: 'Visible bleeding on check', note: 'Mild bleeding on cotton exploration' },
                { id: 'swelling', label: 'Gum swelling / edema', note: 'Papillary or generalized edema' },
                { id: 'recession', label: 'Gingival recession', note: 'Root surface exposure' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleGums(item.id)}
                  className={`p-3 rounded-2xl border text-left flex items-start justify-between transition ${
                    gumFindings.includes(item.id)
                      ? 'bg-error-container/30 border-error text-on-surface font-semibold'
                      : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant'
                  }`}
                >
                  <div>
                    <span className="block text-xs">{item.label}</span>
                    <span className="text-[10px] text-on-surface-variant font-normal">{item.note}</span>
                  </div>
                  <Icon
                    name={gumFindings.includes(item.id) ? 'check_box' : 'check_box_outline_blank'}
                    className={`text-[18px] shrink-0 ${gumFindings.includes(item.id) ? 'text-error' : ''}`}
                  />
                </button>
              ))}
            </div>
          </details>

          {/* GROUP 3: ORAL TISSUES */}
          <details className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3 group">
            <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm text-on-surface">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary-container text-secondary flex items-center justify-center">
                  <Icon name="sentiment_satisfied" className="text-[20px]" />
                </div>
                <div>
                  <span className="block">Group 3: Oral Tissues & Mucosa</span>
                  <span className="text-[11px] text-secondary font-semibold">
                    {tissueFindings.includes('healthy') ? 'Clean & Pink' : 'Findings Noted'}
                  </span>
                </div>
              </div>
              <Icon name="expand_more" className="text-[20px] text-on-surface-variant transition-transform group-open:rotate-180" />
            </summary>

            <div className="pt-3 border-t border-outline-variant/20 space-y-2 text-xs">
              <button
                type="button"
                onClick={() => toggleTissue('healthy')}
                className={`w-full p-3 rounded-xl flex items-center justify-between transition text-left ${
                  tissueFindings.includes('healthy')
                    ? 'bg-secondary-container/40 text-on-surface font-semibold'
                    : 'bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <span>No obvious oral tissue concern observed</span>
                <Icon
                  name={tissueFindings.includes('healthy') ? 'check_box' : 'check_box_outline_blank'}
                  className={`text-[18px] ${tissueFindings.includes('healthy') ? 'text-secondary' : ''}`}
                />
              </button>
            </div>
          </details>

          {/* GROUP 4: GENERAL ORAL HYGIENE */}
          <details className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3 group" open>
            <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm text-on-surface">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-container text-primary flex items-center justify-center">
                  <Icon name="cleaning_services" className="text-[20px]" />
                </div>
                <div>
                  <span className="block">Group 4: Oral Hygiene Assessment</span>
                  <span className="text-[11px] text-primary font-semibold">
                    {hygieneFindings.includes('plaque') ? 'Plaque Present' : 'Fair Hygiene'}
                  </span>
                </div>
              </div>
              <Icon name="expand_more" className="text-[20px] text-on-surface-variant transition-transform group-open:rotate-180" />
            </summary>

            <div className="pt-3 border-t border-outline-variant/20 space-y-2 text-xs">
              <button
                type="button"
                onClick={() => toggleHygiene('plaque')}
                className={`w-full p-3 rounded-xl flex items-center justify-between transition text-left ${
                  hygieneFindings.includes('plaque')
                    ? 'bg-primary-fixed/30 text-on-surface font-semibold'
                    : 'bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <div>
                  <strong className="text-on-surface block font-bold">Visible Plaque Accumulation</strong>
                  <span className="text-on-surface-variant text-[11px] font-normal">
                    Moderate generalized plaque along gingival margins
                  </span>
                </div>
                <Icon
                  name={hygieneFindings.includes('plaque') ? 'check_box' : 'check_box_outline_blank'}
                  className={`text-[18px] ${hygieneFindings.includes('plaque') ? 'text-primary' : ''}`}
                />
              </button>
            </div>
          </details>
        </div>

        {/* Additional Screener Observations */}
        <section className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2">
          <label className="text-xs font-bold text-on-surface block" htmlFor="observations">
            Clinical Screener Observations (Auto-saved)
          </label>
          <textarea
            id="observations"
            rows={3}
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="w-full p-3 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </section>

        {/* Clinical Photographs Section */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-title-sm text-sm sm:text-base font-bold text-on-surface flex items-center gap-2">
              <Icon name="photo_camera" className="text-primary text-[20px]" />
              <span>Screening Reference Photos</span>
            </h4>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-secondary text-[11px] font-bold">
              Consent Active
            </span>
          </div>

          <div className="p-3 bg-surface-container-low rounded-2xl flex items-center gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-surface-container-high">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEOvPMsRtB61W2dfIsl2jlza1bxRXlfEpNC6sr3GywGkDZht41hFYyImaVGP1zn5wGF07mqQnWig74H4EoTF5b7kaeZ-gFni5RLri_rqx_pv_TASx-ocWA1wkavPihhXsZQTDdkOwCYL85W60fwVtZblvcQLoEBvVorPD848xp-FMMEXlGlFsetluQ0kcDThWyuu86dgIIYNqOwKHJ4xyFQee6a2EKf6DJxqMOYDNS"
                alt="Upper Right Arch"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs space-y-0.5">
              <span className="font-bold text-on-surface block">Upper Right Arch (#54 Molar)</span>
              <span className="text-on-surface-variant font-mono text-[10px]">Macro screening view · Non-diagnostic</span>
            </div>
          </div>
        </section>

        {/* Navigation Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <NavLink
            to="/screening/start"
            className="px-4 py-2.5 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition"
          >
            Back to Complaints
          </NavLink>

          <NavLink
            to="/screening/outcome"
            className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5"
          >
            <span>Continue to Outcome</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </NavLink>
        </div>
      </div>
    </ScreeningShell>
  );
}

export default QuickScreeningAssessmentScreen;

