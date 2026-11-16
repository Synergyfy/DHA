import { useState } from 'react';
import { DashboardShell } from '../dashboard/DashboardShell';
import { RecordsSubNav } from './RecordsSubNav';
import { Icon } from '../../design/Primitives';

interface ToothPeek {
  number: number;
  status: string;
  condition: string;
  tone: string;
}

const TEETH_PEEK: ToothPeek[] = [
  { number: 18, status: 'Missing', condition: 'Congenitally absent / non-erupted', tone: 'bg-surface-container-high opacity-50' },
  { number: 17, status: 'Sound', condition: 'Sound and healthy enamel structure', tone: 'bg-surface-container-lowest text-on-surface' },
  { number: 16, status: 'Restored', condition: 'Composite MOD restoration with sound marginal seal', tone: 'bg-primary-fixed text-on-primary-fixed-variant font-bold ring-2 ring-primary' },
  { number: 11, status: 'Sound', condition: 'Sound anterior central incisor', tone: 'bg-surface-container-lowest text-on-surface' },
  { number: 21, status: 'Sound', condition: 'Sound anterior central incisor', tone: 'bg-surface-container-lowest text-on-surface' },
  { number: 26, status: 'Sound', condition: 'Sound posterior molar', tone: 'bg-surface-container-lowest text-on-surface' },
  { number: 36, status: 'Watch', condition: 'Deep occlusal pit staining (non-carious fissure)', tone: 'bg-surface-container-highest text-primary font-bold' },
];

export function DentalExaminationScreen() {
  const [selectedTooth, setSelectedTooth] = useState<ToothPeek>(TEETH_PEEK[2]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <DashboardShell pageTitle="Dental Examination Record" showBack>
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
        {/* Verification & Trust Banner */}
        <section className="bg-secondary-container text-on-secondary-container rounded-2xl p-4 sm:p-5 shadow-sm flex items-center justify-between border border-secondary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-secondary shrink-0 shadow-xs">
              <Icon name="verified" filled className="text-[20px]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                DHA Certified Clinical Record
              </span>
              <span className="font-body-sm text-body-sm opacity-90 truncate">
                Immutable &amp; Cryptographically Authenticated • Vault Block #9084
              </span>
            </div>
          </div>
          <Icon name="lock" className="text-[22px] text-secondary opacity-80 shrink-0 hidden sm:block" />
        </section>

        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-surface-container-high text-on-surface-variant font-label-code text-label-code px-2.5 py-0.5 rounded-full font-mono">
                REF #EX-2024-9182
              </span>
              <span className="bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold">
                Approved Report
              </span>
            </div>
            <h1 className="font-headline-lg-mobile sm:font-headline-md text-headline-lg-mobile sm:text-headline-md text-on-surface font-bold tracking-tight mt-1.5">
              Dental Examination Record
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
              Approved patient-facing clinical diagnostic findings &amp; verified directives
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast('Official DHA examination summary PDF downloaded with digital seal.')}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Icon name="download" className="text-[18px]" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Responsive Multi-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Clinical Rail (8 cols on lg) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Clinician & Facility Information Card */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTSc2-SpG7LrwydoUYR97wyft0cq0CXPTWj3INlL0JY1TDOlRYfUU8mE3MZFyqwjYmg79ZSSeT7AkSWV-8u7OTyjoAcimRRwyxnOIVd4ImWOaRCqgGj3dXVU_8SnNAmQY1neqaw6Xg3p7XxNVaMWy3XmX7MuRaXI7G5ug69mRewrXrn_q3t-z8NuxizGycXcqZsnwzRa5tWozwJ33xtjKIQVW-xY0rYGVBpM8s5pSw"
                    alt="Dr. Chinedu Okafor"
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-xs">
                    <Icon name="verified" filled className="text-[14px]" />
                  </div>
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                      Dr. Chinedu Okafor
                    </h2>
                    <span className="font-label-code text-label-code text-primary font-bold font-mono">
                      DHA-D-48912
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">
                    Senior Endodontist &amp; General Dental Practitioner
                  </p>
                  <span className="font-label-sm text-label-sm text-secondary font-bold mt-1">
                    Licensed Clinician • Attending Specialist
                  </span>
                </div>
              </div>

              {/* Facility Metadata Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-surface-container-low rounded-xl p-3.5 border border-outline-variant/20">
                <div className="flex items-start gap-2 min-w-0">
                  <Icon name="location_on" className="text-[18px] text-primary shrink-0 mt-0.5" />
                  <div className="truncate">
                    <span className="font-label-sm text-[11px] text-on-surface-variant block">Facility</span>
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate block">
                      Lagos Smile Dental Centre
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant truncate block">
                      Ikeja, Lagos
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 min-w-0">
                  <Icon name="calendar_today" className="text-[18px] text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-label-sm text-[11px] text-on-surface-variant block">Date &amp; Time</span>
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold block">
                      Dec 12, 2024
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant block">
                      10:15 AM – 11:00 AM
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 min-w-0">
                  <Icon name="medical_services" className="text-[18px] text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-label-sm text-[11px] text-on-surface-variant block">Visit Reason</span>
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate block">
                      Comprehensive Recall
                    </span>
                    <span className="font-body-sm text-[11px] text-secondary font-semibold block">
                      Periodic Workup
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Odontogram Quick Peek */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Icon name="dentistry" className="text-primary text-[22px]" />
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">
                    Digital Odontogram Snapshot
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Full 3D anatomical model loaded.')}
                  className="text-primary font-label-md text-label-md font-semibold flex items-center gap-1 hover:underline"
                >
                  <span>Full 3D Map</span>
                  <Icon name="chevron_right" className="text-[16px]" />
                </button>
              </div>

              <div className="bg-surface-container-low rounded-xl p-4 space-y-3 border border-outline-variant/20">
                <div className="flex items-center justify-between font-label-code text-label-code text-on-surface-variant px-1 font-mono">
                  <span>MAXILLARY (UPPER ARCH)</span>
                  <span className="text-secondary font-bold">28 Evaluated</span>
                </div>

                {/* Tooth Strip */}
                <div className="flex items-center justify-between gap-1.5 overflow-x-auto py-1 no-scrollbar">
                  {TEETH_PEEK.map((tooth) => {
                    const isSelected = selectedTooth.number === tooth.number;
                    return (
                      <button
                        key={tooth.number}
                        type="button"
                        onClick={() => setSelectedTooth(tooth)}
                        className={`flex flex-col items-center p-2 rounded-xl shrink-0 w-12 text-center transition-all ${
                          tooth.tone
                        } ${isSelected ? 'ring-2 ring-primary scale-105 shadow-xs' : 'hover:scale-102'}`}
                      >
                        <span className="font-label-code text-label-code font-bold font-mono">
                          {tooth.number}
                        </span>
                        <Icon
                          name={
                            tooth.status === 'Missing'
                              ? 'close'
                              : tooth.status === 'Restored'
                              ? 'shield'
                              : tooth.status === 'Watch'
                              ? 'visibility'
                              : 'check_circle'
                          }
                          className="text-[16px] mt-0.5"
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Live Selection Callout */}
                <div className="bg-surface-container-lowest rounded-xl p-3 flex items-center justify-between gap-2 shadow-2xs border border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 animate-pulse"></span>
                    <span className="font-body-sm text-body-sm text-on-surface">
                      <strong>Tooth #{selectedTooth.number}:</strong> {selectedTooth.condition}
                    </span>
                  </div>
                  <span className="font-label-sm text-[11px] text-on-surface-variant shrink-0">
                    Tap to inspect
                  </span>
                </div>
              </div>
            </section>

            {/* Patient-Readable Approved Findings (4 Cards) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  Clinical Examination Findings
                </h3>
                <span className="font-label-sm text-label-sm text-secondary bg-secondary-fixed/50 px-2.5 py-0.5 rounded-full font-bold">
                  Clinician Approved
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Finding 1 */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                          <Icon name="qr_code_2" filled className="text-[18px]" />
                        </div>
                        <div>
                          <h4 className="font-title-sm text-title-sm text-on-surface font-bold">
                            Overall Dentition
                          </h4>
                          <span className="font-body-sm text-[11px] text-secondary font-semibold">
                            Optimal Health Score
                          </span>
                        </div>
                      </div>
                      <span className="bg-surface-container-high text-on-surface-variant font-label-code text-label-code px-2 py-0.5 rounded-full">
                        Grade A
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                      Good Clinical Stability. 28 permanent teeth evaluated and documented in sound arch symmetry without prosthetic deficiency.
                    </p>
                  </div>
                </div>

                {/* Finding 2 */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                          <Icon name="verified_user" className="text-[18px]" />
                        </div>
                        <div>
                          <h4 className="font-title-sm text-title-sm text-on-surface font-bold">
                            Hard Tissue Analysis
                          </h4>
                          <span className="font-body-sm text-[11px] text-on-surface-variant">
                            Enamel &amp; Margin Integrity
                          </span>
                        </div>
                      </div>
                      <span className="bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-[11px] px-2 py-0.5 rounded-full font-bold">
                        0 Active Caries
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                      Zero active cavitated caries. Tooth #16 restored with sound marginal seal. Tooth #36 marked for preventive observation at recall.
                    </p>
                  </div>
                </div>

                {/* Finding 3 */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center">
                          <Icon name="water_drop" className="text-[18px]" />
                        </div>
                        <div>
                          <h4 className="font-title-sm text-title-sm text-on-surface font-bold">
                            Soft Tissue &amp; Gums
                          </h4>
                          <span className="font-body-sm text-[11px] text-on-surface-variant">
                            Sulcus &amp; Attachment
                          </span>
                        </div>
                      </div>
                      <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-[11px] px-2 py-0.5 rounded-full font-semibold">
                        Stage I Marginal
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                      Mild marginal gingivitis (Grade 1 localized to lower anterior region). Physiological probing depths 1–2 mm. No pathological mobility.
                    </p>
                  </div>
                </div>

                {/* Finding 4 */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                          <Icon name="psychology" className="text-[18px]" />
                        </div>
                        <div>
                          <h4 className="font-title-sm text-title-sm text-on-surface font-bold">
                            Occlusal &amp; TMJ
                          </h4>
                          <span className="font-body-sm text-[11px] text-on-surface-variant">
                            Bite &amp; Jaw Movement
                          </span>
                        </div>
                      </div>
                      <span className="bg-secondary-container text-on-secondary-container font-label-sm text-[11px] px-2 py-0.5 rounded-full font-bold">
                        Normal
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                      Normal TMJ function bilaterally. No clicking, deviation, or muscle tenderness upon palpation. No nocturnal bruxism facets detected.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Approved Clinical Directives */}
            <section className="bg-surface-container-low rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
              <div className="flex items-center gap-2.5">
                <Icon name="assignment_turned_in" className="text-primary text-[22px]" />
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  Approved Clinical Directives
                </h3>
              </div>

              <div className="space-y-3">
                <div className="bg-surface-container-lowest rounded-xl p-4 flex items-start gap-3.5 shadow-2xs border border-outline-variant/20">
                  <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-code text-label-code shrink-0 mt-0.5 font-bold font-mono">
                    1
                  </div>
                  <div>
                    <span className="font-title-sm text-title-sm text-on-surface font-bold">
                      Preventive Home Regimen
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                      Maintain 1450 ppm fluoridated toothpaste regimen twice daily. Use interdental brushes daily.
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-4 flex items-start gap-3.5 shadow-2xs border border-outline-variant/20">
                  <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-code text-label-code shrink-0 mt-0.5 font-bold font-mono">
                    2
                  </div>
                  <div>
                    <span className="font-title-sm text-title-sm text-on-surface font-bold">
                      Professional Hygiene Protocol
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                      Schedule ultrasonic scaling and polishing in 4 months (Target window: April 2025).
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-4 flex items-start gap-3.5 shadow-2xs border border-outline-variant/20">
                  <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-code text-label-code shrink-0 mt-0.5 font-bold font-mono">
                    3
                  </div>
                  <div>
                    <span className="font-title-sm text-title-sm text-on-surface font-bold">
                      Preventive Monitoring
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                      Re-evaluate tooth #36 occlusal fissure at next recall. No restorative drilling required at this time.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Rail (4 cols on lg) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Action Card */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Record Actions
              </h3>
              <button
                type="button"
                onClick={() => showToast('Official DHA Examination PDF downloaded.')}
                className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Icon name="download" className="text-[20px]" />
                <span>Download Official PDF</span>
              </button>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => showToast('Secure temporary share link copied.')}
                  className="h-11 bg-secondary text-on-secondary font-title-sm text-title-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-xs hover:bg-secondary/90 transition-colors"
                >
                  <Icon name="share" className="text-[18px]" />
                  <span>Share</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Full 3D Odontogram loaded.')}
                  className="h-11 bg-surface-container-low hover:bg-surface-container text-primary font-title-sm text-title-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="view_in_ar" className="text-[18px]" />
                  <span>3D Odontogram</span>
                </button>
              </div>
            </section>

            {/* Linked Diagnostic Records Gallery */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  Linked Imaging Records
                </h3>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                  3 Files
                </span>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => showToast('Viewing Right Bitewing Radiograph...')}
                  className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20 cursor-pointer hover:border-primary/40 transition-all flex items-center gap-3 p-2.5"
                >
                  <div className="w-16 h-14 rounded-lg bg-inverse-surface overflow-hidden shrink-0">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTuUcyRe7p255PK7OMhZHFIXT3nl1pZk06VtixIs6LtfYU_RNdisGGTCKsI6FbrULNRCbbf33cvvz8pnhvF3qdGpuo1iNTAZeiGC9H3jg0t8eMiN444pGsXff4NTpqfh3Cc5F7hng1kViaLfc3jFgvqCz_zrXif7vqAWYOWBXdhO5PNX_1uCZnBhVJ8kUL-EkD26h3SndaKUDt1KWaioQGU44jK61ztWNhWp6xyfzK"
                      alt="Right Bitewing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate block">
                      Right Bitewing (BW-R)
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant block">
                      Dec 12, 2024 • 1.4 MB
                    </span>
                  </div>
                  <Icon name="visibility" className="text-primary text-[18px] shrink-0" />
                </div>

                <div
                  onClick={() => showToast('Viewing Left Bitewing Radiograph...')}
                  className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20 cursor-pointer hover:border-primary/40 transition-all flex items-center gap-3 p-2.5"
                >
                  <div className="w-16 h-14 rounded-lg bg-inverse-surface overflow-hidden shrink-0">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIjcnOWHP7M-YI5WnIBqJaWdCDQhaEb-Rp2pMQIzCaA4tO-WORpGl5eePcFYOqk4BPL79V9R0newzlC0PSzCHxf5cOAmaC5pWkT1CCDRE8Pw1E8FmpEI7DIXyjQIprA5Q5JyJwD3_RE6GuxUgFpo2tqwu78Ibw5hr5H6Kc0yifqVpHAb-ZkKzRpymVWUVeSQ0oLXKypcjkuzwjmkfqE4rbywUP7YkR8qS8qiYQnh4C"
                      alt="Left Bitewing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate block">
                      Left Bitewing (BW-L)
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant block">
                      Dec 12, 2024 • 1.6 MB
                    </span>
                  </div>
                  <Icon name="visibility" className="text-primary text-[18px] shrink-0" />
                </div>

                <div
                  onClick={() => showToast('Viewing Full Panoramic OPG...')}
                  className="bg-surface-container-low rounded-xl border border-outline-variant/20 cursor-pointer hover:border-primary/40 transition-all flex items-center gap-3 p-2.5"
                >
                  <div className="w-16 h-14 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                    <Icon name="radiology" className="text-[26px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate block">
                      Panoramic OPG Radiograph
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant block">
                      Orthopantomogram • 4.2 MB
                    </span>
                  </div>
                  <Icon name="visibility" className="text-primary text-[18px] shrink-0" />
                </div>
              </div>
            </section>

            {/* Disclaimer & Policy Notice */}
            <section className="bg-surface-container-high rounded-2xl p-4 sm:p-5 border border-outline-variant/30 flex items-start gap-3 text-on-surface-variant">
              <Icon name="policy" className="text-[20px] text-primary shrink-0 mt-0.5" />
              <p className="font-body-sm text-body-sm leading-relaxed">
                This is an official patient record. Clinical notes are digitally signed and finalized under Nigeria Dental Health Authority governance. Contact Lagos Smile Dental Centre directly for official clinical amendments or hospital referral letters.
              </p>
            </section>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

