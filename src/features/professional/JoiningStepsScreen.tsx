import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfessionalShell } from './ProfessionalShell';
import { Icon } from '../../design/Primitives';

type StepNumber = 1 | 2 | 3 | 4 | 5;

export function JoiningStepsScreen() {
  const [activeStep, setActiveStep] = useState<StepNumber>(1);

  const steps = [
    {
      step: 1 as StepNumber,
      title: 'Choose your account type',
      desc: 'Select whether you are an individual clinician, clinic facility, academic school, or screening organisation.',
      chips: ['Individual Clinician', 'Clinic Facility', 'Academic School', 'Screening Org'],
      detail: 'Determines the workspace layout, role privileges, and verification requirements needed for compliance.',
    },
    {
      step: 2 as StepNumber,
      title: 'Complete your registration',
      desc: 'Enter verified professional email, institutional contact details, and authenticate through secure OTP.',
      chips: ['Domain Match', '2FA OTP Enabled', 'National Identification Number (NIN) verification OAuth'],
      detail: 'Ensures institutional ownership and eliminates unauthorized proxy account registrations.',
    },
    {
      step: 3 as StepNumber,
      title: 'Provide required professional or organisational information',
      desc: 'Submit medical license numbers, clinic facility commercial permits, or school accreditation documents.',
      chips: ['PDF / JPG / PNG', 'Encrypted at Rest', 'Direct NPI API Check'],
      detail: 'Encrypted document vault storing high-resolution copies of current licensure and trade certificates.',
    },
    {
      step: 4 as StepNumber,
      title: 'Complete the applicable verification or review process',
      desc: 'DHA administrative and clinical auditing boards review credentials to ensure strict healthcare standards.',
      chips: ['SLA: 24–48 Hours', 'Clinical Board Review', 'Fast-Track Active'],
      detail: 'Credential examiners verify active standing with MOHAP, DHA, and foreign dental registry boards.',
    },
    {
      step: 5 as StepNumber,
      title: 'Access the services available to your approved account',
      desc: 'Log in to your tailored workspace and begin coordinating screenings, examinations, or referrals.',
      chips: ['Unified Clinician Portal', 'Live Odontograms', 'Immediate EHR Sync'],
      detail: 'Full activation of assigned capabilities with live access to the central Lagos digital health spine.',
    },
  ];

  return (
    <ProfessionalShell
      pageTitle="Joining DHA Is Straightforward"
      badgeCode="0B.9"
      badgeLabel="Onboarding Walkthrough"
    >
      <div className="space-y-10 lg:space-y-14">
        {/* Header Intro */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
            <Icon name="verified" className="text-[14px]" />
            <span>0B.9 ONBOARDING WALKTHROUGH</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight font-display leading-tight">
            Joining DHA Is Straightforward
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            Follow our structured verification pathway to connect your practice or organisation with the Nigeria Dental Health Authority network.
          </p>

          {/* Visual Milestone Progress Bar */}
          <div className="mt-6 p-6 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-primary">Progression Map</span>
              <span className="font-semibold text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
                5 Verification Stages
              </span>
            </div>

            {/* 5-Step Segmented Bar */}
            <div className="grid grid-cols-5 gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  onClick={() => setActiveStep(s as StepNumber)}
                  className={`h-2.5 rounded-full cursor-pointer transition-all ${
                    activeStep >= s ? 'bg-primary' : 'bg-surface-container-high'
                  }`}
                  title={`Stage ${s}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
              <span>Avg. Turnaround: <strong>24–48 hours</strong></span>
              <span className="font-semibold text-secondary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span>Pre-check System Active</span>
              </span>
            </div>
          </div>
        </section>

        {/* 5-Step Guided Progression Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display">
              Verification Lifecycle (5 Stages)
            </h2>
            <span className="text-xs font-bold text-on-secondary-container bg-secondary-container px-3 py-1 rounded-full">
              Standard Track
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((item) => {
              const isCurrent = activeStep === item.step;
              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-surface-container-lowest border-primary shadow-lg ring-2 ring-primary/20 scale-102'
                      : 'bg-surface-container-lowest border-outline-variant/30 hover:border-outline shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center ${
                          isCurrent
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'bg-surface-container text-primary'
                        }`}
                      >
                        {item.step}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-fixed/30 px-2 py-0.5 rounded">
                        Stage {item.step}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-title-md text-base font-bold text-on-surface leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.chips.map((chip, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-surface-container-low text-[11px] font-semibold text-on-surface"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-outline-variant/20 text-[11px] text-primary font-bold flex items-center justify-between">
                    <span>{isCurrent ? 'Selected Stage' : 'Tap to focus'}</span>
                    <Icon name={isCurrent ? 'check_circle' : 'chevron_right'} className="text-[16px]" />
                  </div>
                </div>
              );
            })}

            {/* Crucial Regulatory Distinction Notice (Fills 6th slot on desktop) */}
            <div className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between space-y-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-surface-container-lowest text-primary flex items-center justify-center shadow-xs mb-3">
                  <Icon name="policy" className="text-[22px]" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-title-sm text-sm font-bold text-on-surface">Process Integrity Notice</h4>
                  <span className="text-[10px] font-bold uppercase bg-surface-container text-on-surface-variant px-2 py-0.5 rounded">
                    Audit
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Registration, document submission, and account verification are distinct milestones. Accounts are not automatically verified immediately upon form submission.
                </p>
              </div>

              <div className="text-[11px] text-secondary font-bold flex items-center gap-1">
                <Icon name="schedule" className="text-[14px]" />
                <span>Reviewed by DHA Clinical Auditing Board</span>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Assurance Photo Banner */}
        <section className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-outline-variant/30 h-56 sm:h-64 bg-slate-900">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoyQtn_feWUrehpihlWgNNUuK6-HpgANqsgAGuUxC5C56aY_rT4sE0W0GZOu9SjWHAPRXdX4t49SESZAI3q5wf_5NjmlVQgs8QmPAtdBqwdhDG0h3ivgW0kRowFtphmHb6DnXJgLiucMf7-BfTTy_x6zUlrRDQ4ZgEYxQc3c_2nnWlEKRSmOAkU5-W_CIdgLebN7vv0TQl-vAGfsgJWlwpkYldyz8IKyHHBfMBUlOv"
            alt="Modern clinical dental lab with a tablet screen showing verification checks"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 sm:p-8">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
                <Icon name="verified" className="text-[22px]" />
              </div>
              <div>
                <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-white">
                  DHA Clinical Auditing Board
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Multi-layer credential cross-reference with national registries · ISO 27001 Certified
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Stack */}
        <section className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
              Begin Professional Registration
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Have your license or commercial permit ready for 1-click verification.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <NavLink
              to="/register"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 transition"
            >
              <span>Start Stage 1 Onboarding</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </NavLink>
          </div>
        </section>
      </div>
    </ProfessionalShell>
  );
}

export default JoiningStepsScreen;

