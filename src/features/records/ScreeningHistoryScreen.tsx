import { useState } from 'react';
import { DashboardShell } from '../dashboard/DashboardShell';
import { RecordsSubNav } from './RecordsSubNav';
import { Icon } from '../../design/Primitives';

interface PastScreening {
  id: string;
  title: string;
  date: string;
  location: string;
  screener: string;
  screenerLic: string;
  priority: string;
  priorityBadge: string;
  notes: string;
  outcome: string;
  icon: string;
}

const PAST_SCREENINGS: PastScreening[] = [
  {
    id: 'past-1',
    title: 'Lagos Schools Oral Health Inspection 2022',
    date: 'Nov 18, 2022',
    location: 'Lagos Public Academy',
    screener: 'Dr. Tariq Mansoor',
    screenerLic: 'DHA-GP-4190',
    priority: 'Priority 1 (Low)',
    priorityBadge: 'bg-secondary-container text-on-secondary-container',
    notes: 'No caries detected. Fissure sealants intact on first permanent molars. Excellent plaque index.',
    outcome: 'Annual Routine Check Completed',
    icon: 'school',
  },
  {
    id: 'past-2',
    title: 'Corporate Wellness Dental Van 2021',
    date: 'Sep 05, 2021',
    location: 'DIFC Gate Village',
    screener: 'Leila Haddad',
    screenerLic: 'DHA-DH-3004',
    priority: 'Priority 2 (Scaling)',
    priorityBadge: 'bg-surface-container-highest text-primary',
    notes: 'Supra-gingival calculus on lingual surfaces. Advised professional ultrasonic prophylaxis within 90 days.',
    outcome: 'Routine Cleaning Completed Nov 2021',
    icon: 'corporate_fare',
  },
];

export function ScreeningHistoryScreen() {
  const [copied, setCopied] = useState(false);
  const [expandedPast, setExpandedPast] = useState<string | null>('past-1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const referralCode = 'REF-DHA-2024-8841';

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <DashboardShell pageTitle="Screening History" showBack>
      <RecordsSubNav />

      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-secondary text-on-secondary px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <Icon name="check_circle" className="text-[20px]" />
          <span className="font-title-sm text-title-sm font-semibold">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-75"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline-lg-mobile sm:font-headline-md text-headline-lg-mobile sm:text-headline-md text-on-surface font-bold tracking-tight">
                Screening History
              </h1>
              <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold uppercase tracking-wide">
                3 Completed
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Community, school &amp; outreach visual dental screenings across Lagos
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <Icon name="verified" filled className="text-[15px]" />
              <span>DHA Outreach Registry</span>
            </span>
          </div>
        </div>

        {/* Crucial Distinction Banner (Clinical vs Screening Safeguard) */}
        <section className="rounded-2xl bg-surface-container-high border-l-4 border-primary p-4 sm:p-5 shadow-xs flex items-start gap-3.5 relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-xs mt-0.5">
            <Icon name="info" filled className="text-[22px]" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-title-sm text-title-sm text-on-surface font-bold">
              Screening vs. Clinical Diagnosis Safeguard
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mt-1">
              A dental screening is a rapid visual assessment by a trained screener to identify potential issues and provide triage guidance. It is <strong className="text-on-surface font-bold">NOT</strong> a full clinical diagnosis, does not replace regular comprehensive dental examinations, and does not include radiographic imaging.
            </p>
          </div>
        </section>

        {/* Responsive Multi-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Column (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Latest Screener Event Primary Card */}
            <section className="rounded-2xl bg-surface-container-lowest p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-5">
              {/* Event Header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                    Most Recent Screening Event
                  </span>
                  <span className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md">
                    <Icon name="verified" filled className="text-[16px] text-primary" />
                    <span>Verified DHA Outreach</span>
                  </span>
                </div>

                <h2 className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-on-surface font-bold">
                  Nigeria Dental Health Authority Community Oral Wellness Drive 2024
                </h2>

                <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
                  <span className="flex items-center gap-1">
                    <Icon name="calendar_today" className="text-[16px] text-outline" />
                    <span>Oct 14, 2024</span>
                  </span>
                  <span className="text-outline">•</span>
                  <span className="flex items-center gap-1">
                    <Icon name="location_on" className="text-[16px] text-outline" />
                    <span>Lagos City Mall Public Health Pavilion</span>
                  </span>
                </div>
              </div>

              {/* Event Visual Photo Banner */}
              <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden relative shadow-sm border border-outline-variant/20">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUxHPKW8uzyiZdKwQjjqzd2Flf3lZqHxi-KNtguQgg46U3UvtesMmL8nKLh0NdV-0aw0Y5smtzH6MOSRgbDsM9Bb65ntdtanDds-gSFJ6Si-fS9zC6IlBDpd7R8nh_fW-C0pwSch07cpYwGy1b_1FpfQGGkBKe0-olzjjfzfJyVS_lFo_d1hNYiH0AOO2e9CSBNS7-pm9xpWkN-7fZSUYr_9fHzi4GcTRKe6gVcn_-"
                  alt="DHA Dental Screening Booth at Lagos City Mall"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-transparent to-transparent flex items-end p-4">
                  <span className="px-3 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-code text-label-code shadow-xs font-semibold">
                    Visual Assessment &amp; Triage (Non-invasive)
                  </span>
                </div>
              </div>

              {/* Certified Screener Identity Block */}
              <div className="rounded-xl bg-surface-container-low p-4 flex items-center justify-between gap-3 border border-outline-variant/20">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-headline-sm text-headline-sm font-bold shrink-0 shadow-2xs">
                    FZ
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-title-sm text-title-sm text-on-surface font-bold truncate">
                        Fatima Musa
                      </span>
                      <Icon name="check_circle" filled className="text-[16px] text-primary" />
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      DHA Licensed Dental Hygienist
                    </span>
                    <span className="font-label-code text-label-code text-outline tracking-wider font-mono">
                      LIC #DHA-DH-88219
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Verified DHA Dental Hygienist credential: Active standing.')}
                  className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors shrink-0"
                  aria-label="Screener Credentials"
                >
                  <Icon name="badge" className="text-[20px]" />
                </button>
              </div>

              {/* Recorded Screening Observations (4 Focal Zones) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-title-sm text-title-sm text-on-surface font-bold flex items-center gap-2">
                    <Icon name="visibility" className="text-[18px] text-primary" />
                    <span>Recorded Screening Observations</span>
                  </h3>
                  <span className="font-label-sm text-label-sm text-outline font-semibold">
                    4 Focal Zones
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Item 1: Hygiene Baseline */}
                  <div className="rounded-xl bg-surface-container-low p-3.5 flex flex-col gap-1 border border-outline-variant/20">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1 font-semibold">
                        <Icon name="dentistry" className="text-[15px] text-secondary" />
                        <span>Hygiene Baseline</span>
                      </span>
                      <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-bold">
                        Fair
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface mt-1">
                      Localized soft plaque along lower anterior teeth.
                    </p>
                  </div>

                  {/* Item 2: Caries / Suspicion */}
                  <div className="rounded-xl bg-surface-container-low p-3.5 flex flex-col gap-1 border border-outline-variant/20">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1 font-semibold">
                        <Icon name="search_insights" className="text-[15px] text-primary" />
                        <span>Caries / Suspicion</span>
                      </span>
                      <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-bold">
                        Watch #36
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface mt-1">
                      Zero cavitated lesions detected visually. Tooth #36 occlusal pit noted for clinician review.
                    </p>
                  </div>

                  {/* Item 3: Gingival & Tissue */}
                  <div className="rounded-xl bg-surface-container-low p-3.5 flex flex-col gap-1 border border-outline-variant/20">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1 font-semibold">
                        <Icon name="vital_signs" className="text-[15px] text-secondary" />
                        <span>Gingival &amp; Mucosa</span>
                      </span>
                      <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-bold">
                        Mild Margin
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface mt-1">
                      Mild marginal gingivitis observed, no ulcerations or mucosal lesions.
                    </p>
                  </div>

                  {/* Item 4: Orthodontic Occlusion */}
                  <div className="rounded-xl bg-surface-container-low p-3.5 flex flex-col gap-1 border border-outline-variant/20">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1 font-semibold">
                        <Icon name="reorder" className="text-[15px] text-outline" />
                        <span>Occlusion &amp; Alignment</span>
                      </span>
                      <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-bold">
                        Angle Class I
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface mt-1">
                      Mild lower anterior crowding (Angle Class I occlusion).
                    </p>
                  </div>
                </div>
              </div>

              {/* Triage Outcome & Recommendations Container */}
              <div className="rounded-2xl bg-surface-container-high p-4 sm:p-5 flex flex-col gap-3.5 border border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-xs">
                    <Icon name="checklist" className="text-[20px]" />
                  </div>
                  <div>
                    <span className="font-title-sm text-title-sm text-on-surface font-bold block">
                      Triaged Outcome Priority
                    </span>
                    <span className="font-body-sm text-body-sm text-primary font-bold">
                      Priority 2 — Routine Follow-up Recommended
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-surface-container-lowest p-3.5 flex flex-col gap-1 shadow-2xs">
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">
                      Screener Directive
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                      Schedule comprehensive examination with registered dentist within 30-60 days for full charting and bitewing radiographs.
                    </p>
                  </div>

                  <div className="rounded-xl bg-surface-container-lowest p-3.5 flex flex-col gap-1 shadow-2xs">
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">
                      Oral Hygiene Advisory
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                      Improve interdental cleaning technique; use soft-bristled brush at 45-degree angle.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Historical Screenings Accordion (Past Outreach Screenings) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Past Screenings Archive
                </h2>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  2 Previous Drives
                </span>
              </div>

              <div className="space-y-3">
                {PAST_SCREENINGS.map((past) => {
                  const isExpanded = expandedPast === past.id;
                  return (
                    <div
                      key={past.id}
                      className="rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedPast(isExpanded ? null : past.id)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-xs">
                            <Icon name={past.icon} className="text-[22px]" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-title-sm text-title-sm text-on-surface font-bold truncate">
                              {past.title}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {past.date} • {past.location}
                            </span>
                          </div>
                        </div>

                        <Icon
                          name="expand_more"
                          className={`text-on-surface-variant transition-transform duration-200 shrink-0 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-1 space-y-3 bg-surface-container-lowest border-t border-outline-variant/20 animate-in fade-in duration-150">
                          <div className="rounded-xl bg-surface-container-low p-3.5 flex flex-col gap-1.5 border border-outline-variant/20">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className="font-label-md text-label-md text-on-surface-variant font-semibold">
                                Screener: {past.screener} ({past.screenerLic})
                              </span>
                              <span
                                className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${past.priorityBadge}`}
                              >
                                {past.priority}
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                              {past.notes}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1">
                            <span>Outcome: {past.outcome}</span>
                            <button
                              type="button"
                              onClick={() => showToast(`Archived record opened for ${past.title}`)}
                              className="text-primary font-bold hover:underline"
                            >
                              View Archive Record →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar Rail (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Official DHA Referral Dispatch Card */}
            <section className="rounded-2xl bg-secondary-container text-on-secondary-container p-5 sm:p-6 shadow-md flex flex-col gap-4 relative overflow-hidden border border-secondary/20">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-secondary-fixed opacity-30 pointer-events-none blur-xl"></div>

              <div className="flex flex-col gap-1 relative z-10">
                <div className="flex items-center gap-1.5">
                  <Icon name="send" filled className="text-[20px]" />
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                    Official DHA Referral Generated
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold">
                  Lagos Smile Dental Centre
                </h3>
                <p className="font-body-sm text-body-sm opacity-90">
                  Community screening routing voucher for priority clinical intake verification.
                </p>
              </div>

              {/* Referral Voucher Code Box */}
              <div className="rounded-xl bg-surface-container-lowest text-on-surface p-3.5 flex items-center justify-between shadow-xs relative z-10 border border-outline-variant/30">
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-outline font-semibold">
                    REFERRAL CODE
                  </span>
                  <span className="font-label-code text-label-code font-bold tracking-wider text-primary text-base select-all font-mono">
                    {referralCode}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={copyReferralCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-bold active:scale-95 transition-all"
                >
                  <Icon name={copied ? 'done' : 'content_copy'} className="text-[16px] text-secondary" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Action Triggers */}
              <div className="flex flex-col gap-2.5 relative z-10 pt-1">
                <button
                  type="button"
                  onClick={() => showToast('Opening direct booking for Lagos Smile Dental Centre...')}
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all"
                >
                  <Icon name="calendar_add_on" className="text-[20px]" />
                  <span>Book Referred Dental Appointment</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Downloading certified screening slip PDF...')}
                  className="w-full h-12 rounded-xl bg-surface-container-lowest text-on-secondary-container hover:bg-surface-container-low font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Icon name="download" className="text-[20px]" />
                  <span>Download Screening Slip (PDF)</span>
                </button>
              </div>
            </section>

            {/* Micro FAQ / Reassurance Help Box */}
            <section className="rounded-2xl bg-surface-container-low p-4 sm:p-5 border border-outline-variant/30 flex items-start gap-3">
              <Icon name="contact_support" className="text-primary text-[22px] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-title-sm text-title-sm text-on-surface font-semibold">
                  Missing a School or Community Screening?
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Screening records sync automatically using your National Identification Number (NIN) or Lifecode. Contact DHA Oral Care Toll-Free <strong className="text-on-surface font-bold">0800-000-0000</strong> for manual voucher recovery.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

