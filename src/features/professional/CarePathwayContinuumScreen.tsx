import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { PublicSiteHeader } from '../portal/PublicSiteHeader';
import { ProfessionalPublicTabs } from './ProfessionalPublicTabs';

type StageId = 1 | 2 | 3 | 4;

export function CarePathwayContinuumScreen() {
  const [activeStage, setActiveStage] = useState<StageId>(1);

  const stages = [
    {
      id: 1 as StageId,
      title: 'Screening',
      subtitle: 'Early Detection & Triage',
      desc: 'A screening programme or authorised professional records initial oral health findings using standardized non-invasive triage checks.',
      chips: ['Non-diagnostic preventive assessment', 'Flagged observations logged'],
      roles: {
        screener: 'Logs visible caries risk, biofilm burden, and urgent pain flags without full diagnostic charting.',
        patient: 'Receives standardized clearance or triage referral code via DHA registry.',
      },
    },
    {
      id: 2 as StageId,
      title: 'Clinical Review',
      subtitle: 'Triage Routing & Matching',
      desc: 'Where necessary, the patient is directed to an appropriate accredited dental clinic or specialist for further assessment.',
      chips: ['Parent notification & provider discovery', 'Direct referral matching'],
      roles: {
        network: 'Coordinates automated proximity routing to accredited pediatric and general clinics.',
        clinic: 'Pre-reviews flagged triage metrics and books definitive operatory chair time.',
      },
    },
    {
      id: 3 as StageId,
      title: 'Care & Treatment',
      subtitle: 'Full Diagnostics & Restoration',
      desc: 'The authorised dental professional conducts a full 32-tooth examination, completes odontograms, and authenticates clinical treatment records.',
      chips: ['Full 32-tooth odontogram & diagnosis', 'Treatment plan established'],
      roles: {
        dentist: 'Performs visual-tactile exam, indicated bite-wings, restorative procedures, and authenticates clinical records.',
        registry: 'Cryptographically locks completed interventions to update health fitness records.',
      },
    },
    {
      id: 4 as StageId,
      title: 'Follow-up & Continuity',
      subtitle: 'Longitudinal Wellness',
      desc: 'Relevant referrals, recare cadences, and continuous preventive recalls are organised across the patient’s life-course.',
      chips: ['Recare cadence & recovery tracking', 'Longitudinal oral health continuity'],
      roles: {
        primary: 'Reviews post-operative healing and reinforces personalized oral hygiene habits.',
        dha: 'Aggregates anonymised clinical outcomes to benchmark national dental health metrics.',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col antialiased">
      <PublicSiteHeader />

      <ProfessionalPublicTabs />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="space-y-10 lg:space-y-14">
        {/* Header Intro */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
            <Icon name="hub" className="text-[14px]" />
            <span>0B.6 CONNECTED CARE PATHWAY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight font-display leading-tight">
            From Screening to Appropriate Dental Care
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            A structured, transparent 4-stage continuum connecting early detection to specialized clinical treatment and long-term preventive recall.
          </p>
        </section>

        {/* Interactive 4-Stage Pathway Timeline */}
        <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 border border-outline-variant/30 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
            <div>
              <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                Care Continuum Stages (4)
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Click any stage card below to inspect stakeholder responsibilities and clinical milestones.
              </p>
            </div>
            <span className="text-xs text-primary font-bold bg-primary-fixed/30 px-3 py-1 rounded-full self-start sm:self-auto flex items-center gap-1">
              <Icon name="touch_app" className="text-[16px]" />
              <span>Interactive Inspection</span>
            </span>
          </div>

          {/* Desktop 4-Column Timeline or Mobile Vertical Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {stages.map((stage) => {
              const isSelected = activeStage === stage.id;
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-primary text-on-primary border-primary shadow-lg scale-102'
                      : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/30 text-on-surface shadow-2xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center ${
                          isSelected
                            ? 'bg-white text-primary shadow-sm'
                            : 'bg-surface-container-highest text-primary'
                        }`}
                      >
                        {stage.id}
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          isSelected ? 'text-teal-200' : 'text-primary'
                        }`}
                      >
                        Stage 0{stage.id}
                      </span>
                    </div>

                    <div>
                      <h3 className={`font-title-md text-base font-bold ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                        {stage.title}
                      </h3>
                      <div
                        className={`text-[11px] font-medium ${
                          isSelected ? 'text-white/80' : 'text-on-surface-variant'
                        }`}
                      >
                        {stage.subtitle}
                      </div>
                    </div>

                    <p
                      className={`text-xs leading-relaxed ${
                        isSelected ? 'text-white/90' : 'text-on-surface-variant'
                      }`}
                    >
                      {stage.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-bold">
                    <span>{isSelected ? 'Currently Viewing' : 'Tap to expand'}</span>
                    <Icon name={isSelected ? 'check_circle' : 'arrow_forward'} className="text-[16px]" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expanded Detail Box for Active Stage */}
          {(() => {
            const current = stages.find((s) => s.id === activeStage) || stages[0];
            return (
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold flex items-center justify-center text-xs">
                      0{current.id}
                    </span>
                    <h3 className="font-title-md text-base font-bold text-on-surface">
                      Detailed Breakdown: {current.title} — {current.subtitle}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {current.chips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-xs font-semibold text-primary shadow-2xs"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                      <Icon name="verified_user" className="text-[18px]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface uppercase tracking-wider">
                        Clinical Execution
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                        {Object.values(current.roles)[0]}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                      <Icon name="perm_identity" className="text-[18px]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface uppercase tracking-wider">
                        Patient & System Alignment
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                        {Object.values(current.roles)[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* Action Triggers */}
        <section className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
              Explore your place on the care continuum
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Review credential requirements for screening, diagnostic charting, or referral handling.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <NavLink
              to="/professional/who-can-join"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 transition"
            >
              <span>Who Can Join DHA?</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </NavLink>
          </div>
        </section>
      </div>
      </main>
    </div>
  );
}

export default CarePathwayContinuumScreen;

