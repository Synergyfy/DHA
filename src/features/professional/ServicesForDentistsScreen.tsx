import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfessionalShell } from './ProfessionalShell';
import { Icon } from '../../design/Primitives';

type ToolCategory = 'all' | 'core' | 'collab';

export function ServicesForDentistsScreen() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [selectedTooth, setSelectedTooth] = useState<number>(11);

  const teethSample = [
    { num: 11, status: 'Healthy Surface', color: 'bg-emerald-500' },
    { num: 12, status: 'Composite Restoration', color: 'bg-teal-500' },
    { num: 13, status: 'Healthy Surface', color: 'bg-emerald-500' },
    { num: 14, status: 'Caries Flagged (Class II)', color: 'bg-amber-500' },
    { num: 21, status: 'Ceramic Crown', color: 'bg-sky-500' },
    { num: 22, status: 'Healthy Surface', color: 'bg-emerald-500' },
    { num: 23, status: 'Healthy Surface', color: 'bg-emerald-500' },
    { num: 24, status: 'Root Canal Completed', color: 'bg-indigo-500' },
  ];

  return (
    <ProfessionalShell
      pageTitle="Digital Tools for Dental Professionals"
      badgeCode="0B.3"
      badgeLabel="Dental Practitioners & Specialists"
    >
      <div className="space-y-10 lg:space-y-14">
        {/* Header Intro Section */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
            <Icon name="verified_user" className="text-[14px]" />
            <span>0B.3 DENTAL PRACTITIONERS & SPECIALISTS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight font-display leading-tight">
            Digital Tools for Dental Professionals
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            Spend less time managing scattered paperwork and more time focusing on patient care. DHA provides professional tools to support your dental practice, interactive odontogram charting, and referral coordination.
          </p>
        </section>

        {/* Visual Hero Operatory Banner */}
        <section className="relative rounded-3xl overflow-hidden shadow-lg border border-outline-variant/30 h-52 sm:h-64 bg-slate-900">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHFoWtG3Rv7CdXkSNKze3GepKxX50Ix0CNA11e6n90fIV6A0Pd73a2j41GKtGg2KLQLmhY-mVCbvTcB4O7aLrimSlHX-HSf_UZCPWeJhEevCmoT1RlCghx0rAVN2lab5Xf_g_DZlAfJNZmHZ9cpsPpeb2kV5FQeY-4Tf_KZWHG_33Sal4M87V4wsvsETjRaJaWREzE7uoCjqGSfzM-HfJu6R7sa2a6gtSz0_QWexJx"
            alt="Modern high-tech dental operatory with clean dental odontogram charting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 sm:p-8">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
                <Icon name="dentistry" className="text-[22px]" />
              </div>
              <div>
                <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-white">
                  Accredited Clinical Workflow Suite
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  FDI 2-Digit Standard Charting · Cryptographic Licensure Timestamps
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Odontogram Feature Sandbox */}
        <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Live Interactive Sandbox
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface mt-0.5 font-display">
                Interactive FDI Odontogram Preview
              </h2>
            </div>
            <span className="text-xs text-secondary font-semibold bg-secondary-container/40 px-3 py-1 rounded-full self-start sm:self-auto">
              FDI World Dental Federation Standard
            </span>
          </div>

          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
            Tap on any tooth in the arch below to inspect clinical condition codes, historical restorative work, and surface-specific findings.
          </p>

          {/* Tooth Arch Buttons */}
          <div className="p-4 sm:p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-wrap items-center justify-center gap-3">
            {teethSample.map((tooth) => (
              <button
                key={tooth.num}
                type="button"
                onClick={() => setSelectedTooth(tooth.num)}
                className={`p-3 rounded-2xl transition flex flex-col items-center gap-1.5 min-w-[70px] ${
                  selectedTooth === tooth.num
                    ? 'bg-primary text-on-primary shadow-md scale-105'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-2xs'
                }`}
              >
                <span className="font-mono text-sm font-bold">{tooth.num}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${tooth.color}`} />
                <span className="text-[10px] opacity-80">
                  {tooth.num < 20 ? 'Upper R' : 'Upper L'}
                </span>
              </button>
            ))}
          </div>

          {/* Selected Tooth Live Findings Card */}
          {(() => {
            const current = teethSample.find((t) => t.num === selectedTooth) || teethSample[0];
            return (
              <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary font-mono font-bold flex items-center justify-center">
                    #{current.num}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-on-surface-variant">Active Clinical Finding</div>
                    <div className="font-bold text-sm text-on-surface">{current.status}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-primary flex items-center gap-1">
                  <Icon name="verified" className="text-secondary text-[16px]" />
                  <span>Verified by Dr. Reem (DHA-1892)</span>
                </span>
              </div>
            );
          })()}
        </section>

        {/* 6 Feature Cards Grid with Interactive Category Switcher */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display">
              Clinician Suite Modules (6)
            </h2>

            <div className="inline-flex p-1 bg-surface-container rounded-2xl self-start sm:self-auto">
              {(['all', 'core', 'collab'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                    activeCategory === cat
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {cat === 'all' ? 'All Services (6)' : cat === 'core' ? 'Core Clinical' : 'Continuity & Referrals'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Patient Management */}
            {(activeCategory === 'all' || activeCategory === 'core') && (
              <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary mb-4">
                    <Icon name="badge" className="text-[24px]" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-title-md text-base font-bold text-on-surface">Patient Management</h3>
                    <span className="text-[10px] font-semibold bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full">
                      Core Access
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Access authorised patient profiles, past treatment episodes, and relevant oral health records securely.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-secondary font-medium">
                  <span>Role-governed records</span>
                  <Icon name="chevron_right" className="text-[18px]" />
                </div>
              </div>
            )}

            {/* Card 2: Dental Screening */}
            {(activeCategory === 'all' || activeCategory === 'core') && (
              <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary mb-4">
                    <Icon name="fact_check" className="text-[24px]" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-title-md text-base font-bold text-on-surface">Dental Screening</h3>
                    <span className="text-[10px] font-semibold bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">
                      Screening Ready
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Record basic oral health screening findings rapidly using the standardized clinical screening workflow.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Standardised triage metrics</span>
                  <Icon name="chevron_right" className="text-[18px]" />
                </div>
              </div>
            )}

            {/* Card 3: Detailed Dental Examination */}
            {(activeCategory === 'all' || activeCategory === 'core') && (
              <div className="p-6 rounded-3xl bg-surface-container-lowest border-2 border-primary-fixed shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-4">
                    <Icon name="grid_view" className="text-[24px]" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-title-md text-base font-bold text-on-surface">Detailed Examination</h3>
                    <span className="text-[10px] font-bold bg-primary text-on-primary px-2 py-0.5 rounded-full">
                      Tier 2 Verified
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Carry out comprehensive examinations using dental findings, periodontal probings, and odontogram tools.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-primary font-bold">
                  <span>Full 32-Tooth Charting</span>
                  <Icon name="chevron_right" className="text-[18px]" />
                </div>
              </div>
            )}

            {/* Card 4: Clinical Records */}
            {(activeCategory === 'all' || activeCategory === 'collab') && (
              <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary mb-4">
                    <Icon name="clinical_notes" className="text-[24px]" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-title-md text-base font-bold text-on-surface">Clinical Records</h3>
                    <span className="text-[10px] font-semibold bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full">
                      Audit Log
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Record examination findings, radiograph investigations, and clinical summaries with immutable attribution.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-secondary font-medium">
                  <span>Cryptographic timestamping</span>
                  <Icon name="chevron_right" className="text-[18px]" />
                </div>
              </div>
            )}

            {/* Card 5: Treatment Planning */}
            {(activeCategory === 'all' || activeCategory === 'collab') && (
              <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary mb-4">
                    <Icon name="event_repeat" className="text-[24px]" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-title-md text-base font-bold text-on-surface">Treatment Planning</h3>
                    <span className="text-[10px] font-semibold bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full">
                      Care Pathway
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Organise phased restorative treatments, monitor healing cadence, and schedule recare recall appointments.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Phased restorative modules</span>
                  <Icon name="chevron_right" className="text-[18px]" />
                </div>
              </div>
            )}

            {/* Card 6: Referrals */}
            {(activeCategory === 'all' || activeCategory === 'collab') && (
              <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary mb-4">
                    <Icon name="forward_to_inbox" className="text-[24px]" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-title-md text-base font-bold text-on-surface">Referral Routing</h3>
                    <span className="text-[10px] font-semibold bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full">
                      DHA Network
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Refer patients to specialized DHA oral surgeons, endodontists, and orthodontists with live status tracking.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-secondary font-medium">
                  <span>Real-time status tracking</span>
                  <Icon name="chevron_right" className="text-[18px]" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Clinical Governance Policy Advisory */}
        <section className="bg-surface-container-high rounded-3xl p-6 sm:p-8 border border-outline-variant/20 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center shrink-0 text-primary shadow-xs">
            <Icon name="shield" className="text-[22px]" />
          </div>
          <div>
            <h4 className="font-title-sm text-sm font-bold text-on-surface">Clinical Governance & Scope Policy</h4>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              <strong className="text-on-surface">Important Notice:</strong> A screener's access remains limited strictly to assigned screening activities. Basic screening is never represented as a full clinical diagnosis. Detailed examination access is restricted to appropriate onboarded clinic facilities and verified licensed professionals.
            </p>
          </div>
        </section>

        {/* Action Zone */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <div>
            <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">Ready to connect your clinical practice?</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">Instant licensing validation via National Health Professional Registry</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <NavLink
              to="/professional/who-can-join"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 transition"
            >
              <span>Join as a Professional</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </NavLink>
          </div>
        </section>
      </div>
    </ProfessionalShell>
  );
}

export default ServicesForDentistsScreen;

