import { useState } from 'react';
import { DashboardShell } from '../dashboard/DashboardShell';
import { RecordsSubNav } from './RecordsSubNav';
import { Icon } from '../../design/Primitives';

type TreatmentFilter = 'all' | 'scheduled' | 'recommended' | 'completed' | 'discontinued';

interface TreatmentItem {
  id: string;
  type: 'scheduled' | 'recommended' | 'completed' | 'discontinued';
  title: string;
  dateStr: string;
  tooth?: string;
  quadrant?: string;
  surface?: string;
  badge: string;
  badgeTone: string;
  doctor: string;
  location: string;
  duration?: string;
  phase?: string;
  rationale?: string;
  coverage?: string;
  material?: string;
  postOp?: string;
  notes?: string;
  actions?: {
    primaryText: string;
    secondaryText?: string;
  };
}

const TREATMENTS: TreatmentItem[] = [
  {
    id: 't1',
    type: 'scheduled',
    title: 'Enamel Fluoride Touchup & Ultrasonic Prophylaxis',
    dateStr: 'Jan 24, 2025 • 10:30 AM (In 4 days)',
    badge: 'Scheduled',
    badgeTone: 'bg-primary-fixed text-on-primary-fixed font-bold',
    doctor: 'Dr. Chinedu Okafor',
    location: 'Suite #402, Lagos Smile Dental Centre',
    duration: '45 mins',
    phase: 'Maintenance / Prevention Phase',
    notes: 'Full Quadrant Scaling & Topical Fluoride Varnish application. Ready for kiosk check-in.',
    actions: {
      primaryText: 'View Appointment Details',
      secondaryText: 'Pre-Op Instructions',
    },
  },
  {
    id: 't2',
    type: 'recommended',
    title: 'Preventive Pit & Fissure Sealant',
    dateStr: 'Proposed Dec 12, 2024',
    tooth: 'Tooth #36 (Lower Left 1st Molar)',
    quadrant: 'Mandibular Quadrant 3',
    surface: 'Occlusal Surface Enamel Layer (ICDAS Code 1)',
    badge: 'Action Needed',
    badgeTone: 'bg-secondary-fixed text-on-secondary-fixed-variant font-bold',
    doctor: 'Dr. Chinedu Okafor',
    location: 'Lagos Smile Dental Centre',
    rationale:
      'Deep fissure staining noted on longitudinal monitoring. Non-invasive resin sealant recommended to arrest occlusal demineralization.',
    coverage: 'DHA NHIA Tier: 100% Covered • 0 NGN Co-Pay',
    actions: {
      primaryText: 'Accept & Book Procedure',
      secondaryText: 'Ask Clinician',
    },
  },
  {
    id: 't3',
    type: 'completed',
    title: 'Direct Posterior Composite Restoration',
    dateStr: 'Dec 12, 2024',
    tooth: 'Tooth #16 (Upper Right 1st Molar)',
    quadrant: 'Maxillary Quadrant 1',
    surface: 'Occlusal-Mesial Surface',
    badge: 'Completed',
    badgeTone: 'bg-secondary-fixed text-on-secondary-fixed-variant font-bold',
    doctor: 'Dr. Chinedu Okafor',
    location: 'Lagos Smile Dental Centre',
    material: 'Filtek Supreme (A2 Shade Resin)',
    postOp: 'Margin sealed, bite adjusted, asymptomatic. Radiographic verification archived.',
    actions: {
      primaryText: 'View Clinical Record',
      secondaryText: 'Warranty Guide',
    },
  },
  {
    id: 't4',
    type: 'completed',
    title: 'Full Mouth Ultrasonic Scaling & Polishing',
    dateStr: 'Aug 05, 2024',
    badge: 'Completed',
    badgeTone: 'bg-secondary-container text-on-secondary-container font-semibold',
    doctor: 'Dr. Amina Bello',
    location: 'Surulere Primary Clinic',
    postOp: 'Supragingival & subgingival calculus removed. 6-month hygiene recall set.',
  },
  {
    id: 't5',
    type: 'completed',
    title: 'Initial Oral Screening & Baseline Charting',
    dateStr: 'Oct 14, 2024',
    badge: 'Completed',
    badgeTone: 'bg-secondary-container text-on-secondary-container font-semibold',
    doctor: 'Fatima Musa (Hygienist)',
    location: 'Lagos City Mall Outreach Camp',
    notes: 'Comprehensive 32-tooth assessment and bitewing radiograph synchronization.',
  },
  {
    id: 't6',
    type: 'discontinued',
    title: 'Invasive Occlusal Amalgam Replacement',
    dateStr: 'Planned Oct 2024 • Superseded',
    badge: 'Superseded',
    badgeTone: 'bg-surface-container-high text-on-surface-variant font-semibold',
    doctor: 'Dr. Chinedu Okafor',
    location: 'Lagos Smile Dental Centre',
    notes:
      'Clinical Decision Note: Secondary examination showed tooth structure structurally intact; invasive replacement avoided in favor of conservative composite restoration on tooth #16.',
  },
];

export function TreatmentHistoryScreen() {
  const [activeFilter, setActiveFilter] = useState<TreatmentFilter>('all');
  const [exporting, setExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      showToast('Official DHA Treatment Log compiled with certified clinician digital seals.');
    }, 1500);
  };

  const filteredTreatments = TREATMENTS.filter((t) => {
    if (activeFilter === 'all') return true;
    return t.type === activeFilter;
  });

  const scheduledCount = TREATMENTS.filter((t) => t.type === 'scheduled').length;
  const recommendedCount = TREATMENTS.filter((t) => t.type === 'recommended').length;
  const completedCount = TREATMENTS.filter((t) => t.type === 'completed').length;
  const discontinuedCount = TREATMENTS.filter((t) => t.type === 'discontinued').length;

  return (
    <DashboardShell pageTitle="Treatment History & Care Plans" showBack>
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
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold flex items-center gap-1">
                <Icon name="history_edu" className="text-[16px]" />
                <span>Clinical Longitudinal Care</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                <Icon name="verified" filled className="text-[14px]" />
                <span>DHA Audited</span>
              </span>
            </div>
            <h1 className="font-headline-lg-mobile sm:font-headline-md text-headline-lg-mobile sm:text-headline-md text-on-surface font-bold tracking-tight mt-1">
              Treatment History &amp; Care Plans
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
              Procedural roadmaps, past therapies, restoration logs &amp; upcoming clinical treatments
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Icon name="picture_as_pdf" className="text-[18px]" />
              <span>Export Dossier</span>
            </button>
          </div>
        </div>

        {/* Interactive Filter Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Items', count: TREATMENTS.length },
            { id: 'scheduled', label: 'Scheduled', count: scheduledCount },
            { id: 'recommended', label: 'Recommended', count: recommendedCount },
            { id: 'completed', label: 'Completed', count: completedCount },
            { id: 'discontinued', label: 'Discontinued', count: discontinuedCount },
          ].map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setActiveFilter(chip.id as TreatmentFilter)}
              className={`px-4 py-2 rounded-full font-label-md text-label-md font-semibold flex items-center gap-2 transition-all whitespace-nowrap shrink-0 ${
                activeFilter === chip.id
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-high hover:bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>{chip.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full font-label-sm text-[11px] font-bold ${
                  activeFilter === chip.id
                    ? 'bg-on-primary/20 text-on-primary'
                    : 'bg-surface-container-highest text-on-surface-variant'
                }`}
              >
                {chip.count}
              </span>
            </button>
          ))}
        </div>

        {/* Treatment Cards Multi-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredTreatments.map((treatment) => (
            <article
              key={treatment.id}
              className={`rounded-2xl p-5 sm:p-6 shadow-sm border transition-all flex flex-col justify-between ${
                treatment.type === 'discontinued'
                  ? 'bg-surface-container-lowest/80 border-outline-variant/30 opacity-85'
                  : 'bg-surface-container-lowest border-outline-variant/30 hover:shadow-md hover:border-primary/40'
              }`}
            >
              <div className="space-y-3.5">
                {/* Card Top: Date & Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`font-label-sm text-label-sm font-semibold flex items-center gap-1.5 ${
                        treatment.type === 'scheduled'
                          ? 'text-primary'
                          : treatment.type === 'completed'
                          ? 'text-secondary'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      <Icon
                        name={
                          treatment.type === 'scheduled'
                            ? 'calendar_clock'
                            : treatment.type === 'completed'
                            ? 'event_available'
                            : treatment.type === 'recommended'
                            ? 'flag'
                            : 'cancel'
                        }
                        className="text-[16px]"
                      />
                      <span>{treatment.dateStr}</span>
                    </span>

                    <h2
                      className={`font-headline-sm text-headline-sm text-on-surface font-bold mt-1 ${
                        treatment.type === 'discontinued'
                          ? 'line-through decoration-on-surface-variant/40'
                          : ''
                      }`}
                    >
                      {treatment.title}
                    </h2>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full font-label-sm text-label-sm whitespace-nowrap shadow-2xs ${treatment.badgeTone}`}
                  >
                    {treatment.badge}
                  </span>
                </div>

                {/* Tooth Callout (if applicable) */}
                {treatment.tooth && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center shrink-0 shadow-2xs">
                        {treatment.tooth.match(/#(\d+)/)?.[1] || 'T'}
                      </div>
                      <div className="min-w-0">
                        <p className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                          {treatment.tooth}
                        </p>
                        <p className="font-label-sm text-[11px] text-on-surface-variant truncate">
                          {treatment.surface || treatment.quadrant}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Metadata Pill Strip */}
                {(treatment.phase || treatment.duration) && (
                  <div className="flex flex-wrap gap-2">
                    {treatment.phase && (
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1 border border-outline-variant/20">
                        <Icon name="shield" className="text-[14px] text-primary" />
                        <span>{treatment.phase}</span>
                      </span>
                    )}
                    {treatment.duration && (
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1 border border-outline-variant/20">
                        <Icon name="timer" className="text-[14px]" />
                        <span>{treatment.duration}</span>
                      </span>
                    )}
                  </div>
                )}

                {/* Rationale / Clinical Note */}
                {treatment.rationale && (
                  <div className="p-3.5 rounded-xl bg-surface-container flex flex-col gap-1 border border-outline-variant/20">
                    <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                      <Icon name="psychology_alt" className="text-[15px]" />
                      <span>Diagnostic Rationale</span>
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {treatment.rationale}
                    </p>
                  </div>
                )}

                {/* Insurance Coverage */}
                {treatment.coverage && (
                  <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
                        <Icon name="health_and_safety" className="text-[18px]" />
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                          DHA Insurance Coverage
                        </span>
                        <span className="font-body-sm text-body-sm text-secondary font-bold">
                          {treatment.coverage}
                        </span>
                      </div>
                    </div>
                    <Icon name="verified" filled className="text-secondary text-[20px]" />
                  </div>
                )}

                {/* Completed Details: Material & Post-Op */}
                {treatment.material && (
                  <div className="grid grid-cols-2 gap-2 text-on-surface">
                    <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                      <span className="font-label-sm text-label-sm text-on-surface-variant block">
                        Restorative Material
                      </span>
                      <span className="font-title-sm text-title-sm font-semibold truncate block mt-0.5">
                        {treatment.material}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                      <span className="font-label-sm text-label-sm text-on-surface-variant block">
                        Lead Clinician
                      </span>
                      <span className="font-title-sm text-title-sm font-semibold truncate block mt-0.5">
                        {treatment.doctor}
                      </span>
                    </div>
                  </div>
                )}

                {treatment.postOp && (
                  <div className="p-3 rounded-xl bg-surface-container flex items-start gap-2 border border-outline-variant/20">
                    <Icon name="verified_user" className="text-secondary text-[18px] shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                        Post-Op Outcome: Verified Sealed
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {treatment.postOp}
                      </p>
                    </div>
                  </div>
                )}

                {/* Discontinued / General Notes */}
                {treatment.notes && (
                  <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface-variant font-body-sm text-body-sm leading-relaxed">
                    {treatment.notes}
                  </div>
                )}

                {/* Doctor & Location Info */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon name="medical_services" className="text-[18px]" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-title-sm text-title-sm text-on-surface truncate font-semibold">
                      {treatment.doctor}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {treatment.location}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast(`Directions loaded for ${treatment.location}`)}
                    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors shrink-0"
                    aria-label="Directions"
                  >
                    <Icon name="near_me" className="text-[16px]" />
                  </button>
                </div>
              </div>

              {/* Action Tray */}
              {treatment.actions && (
                <div className="flex items-center gap-2 pt-4 mt-3 border-t border-outline-variant/20 flex-wrap">
                  <button
                    type="button"
                    onClick={() => showToast(`Action triggered: ${treatment.actions?.primaryText}`)}
                    className="flex-1 min-h-[42px] px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Icon name="check_circle" className="text-[18px]" />
                    <span>{treatment.actions.primaryText}</span>
                  </button>

                  {treatment.actions.secondaryText && (
                    <button
                      type="button"
                      onClick={() => showToast(`Viewing: ${treatment.actions?.secondaryText}`)}
                      className="min-h-[42px] px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-title-sm text-title-sm font-semibold transition-colors"
                    >
                      {treatment.actions.secondaryText}
                    </button>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Export Log CTA Footer Widget */}
        <section className="p-5 sm:p-6 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
              <Icon name="picture_as_pdf" className="text-[26px]" />
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Official Treatment Certificate &amp; Historical Log
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
                Includes digital clinician seals, materials batch/lot numbers &amp; DHA insurance co-pay vouchers for tax and second opinions.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="h-12 px-6 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-bold flex items-center justify-center gap-2 shadow-sm shrink-0 active:scale-[0.99] transition-all"
          >
            {exporting ? (
              <>
                <Icon name="progress_activity" className="text-[18px] animate-spin" />
                <span>Compiling DHA Dossier...</span>
              </>
            ) : (
              <>
                <Icon name="download" className="text-[18px]" />
                <span>Export Full Treatment Log (PDF)</span>
              </>
            )}
          </button>
        </section>
      </div>
    </DashboardShell>
  );
}

