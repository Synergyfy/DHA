import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SharingShell } from './SharingShell';
import { Icon } from '../../design/Primitives';

export function ReferralDetailsScreen() {
  const [authorizedRecords, setAuthorizedRecords] = useState<string[]>([
    'opg',
    'odontogram',
  ]);
  const [showConsentModal, setShowConsentModal] = useState(false);

  const toggleCephConsent = () => {
    if (!authorizedRecords.includes('cephalometric')) {
      setAuthorizedRecords([...authorizedRecords, 'cephalometric']);
    }
    setShowConsentModal(false);
  };

  return (
    <SharingShell
      pageTitle="Referral Details"
      badgeCode="7.7"
      badgeLabel="Referral #REF-DHA-2025-0894"
    >
      <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
        {/* Top Status Hero */}
        <section className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-primary bg-primary-fixed/20 px-3 py-1 rounded-lg">
                #REF-DHA-2025-0894
              </span>
              <span className="text-xs text-on-surface-variant font-mono">Issued: 08 Nov 2025</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Accepted by Specialist</span>
            </div>
          </div>

          <div>
            <h1 className="font-headline-sm text-xl sm:text-2xl font-bold text-on-surface">
              Orthodontics & Dento-facial Orthopedics
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              Current Status: <strong className="text-primary font-semibold">Awaiting Patient Appointment Booking</strong>
            </p>
          </div>

          {/* Doctor Transfer Flow Visual */}
          <div className="p-4 sm:p-5 bg-surface-container-low rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Referring */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0">
                <Icon name="dentistry" className="text-[24px]" />
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider block">
                  Referring Clinician
                </span>
                <span className="font-title-sm text-sm sm:text-base font-bold text-on-surface block">
                  Dr. Tariq Mansoor
                </span>
                <span className="text-xs text-on-surface-variant">
                  General Dentistry · Jumeirah Dental Care
                </span>
              </div>
            </div>

            {/* Transfer Arrow */}
            <div className="hidden md:flex flex-col items-center justify-center px-4">
              <span className="text-[10px] font-bold text-primary tracking-wider uppercase mb-1">
                Clinical Referral
              </span>
              <div className="w-24 h-0.5 bg-primary/30 relative flex items-center justify-end">
                <Icon name="arrow_forward" className="text-primary text-[18px] -mr-1" />
              </div>
            </div>

            {/* Receiving Specialist */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-surface-container-high overflow-hidden shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNIudSoAbUfFy7bCZiaruoZf_1F1eTKy5JsB5SOY3rVZC2w7FYbzAnIogis0t4YOp5dHtgNx1IxEGdzD0YQP-FPwkE3d7mh46fnY-lMIkzV5zrUqkYxbtkHIcJiCWIkpDAQRedtXBw_vNsRucK8P22kBk2xcoCBCNO4CYNKvBzuerd6fMqa4QlOdHEVJfJvBQwvPVzlzh_irzICpnvp4mJSfMWPXAx9bQvmfcHmuZj"
                  alt="Dr. Reem Al-Nuaimi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] text-primary uppercase font-bold tracking-wider block">
                  Assigned Specialist
                </span>
                <span className="font-title-sm text-sm sm:text-base font-bold text-on-surface block">
                  Dr. Reem Al-Nuaimi
                </span>
                <span className="text-xs text-on-surface-variant">
                  Consultant Orthodontist · Medcare Clinic
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2-Column Responsive Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Main Clinical Details Column */}
          <div className="space-y-6">
            {/* Clinical Referral Details */}
            <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <h2 className="font-title-md text-base sm:text-lg font-bold text-on-surface flex items-center gap-2">
                <Icon name="clinical_notes" className="text-primary text-[20px]" />
                <span>Clinical Notes & Diagnostic Summary</span>
              </h2>

              <div>
                <span className="text-xs font-bold text-on-surface-variant block mb-2">
                  Presenting Concerns & Triage Tags
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-xl bg-primary-fixed/20 text-primary text-xs font-semibold">
                    Anterior Crossbite
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-primary-fixed/20 text-primary text-xs font-semibold">
                    Class II Malocclusion
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-primary-fixed/20 text-primary text-xs font-semibold">
                    Moderate Lower Crowding
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-secondary-container/40 text-on-secondary-container text-xs font-semibold">
                    Adult Orthodontic Track
                  </span>
                </div>
              </div>

              <div className="p-4 bg-surface-container-low rounded-2xl text-xs space-y-2 border-l-4 border-l-primary">
                <div className="flex items-center justify-between text-on-surface-variant text-[11px]">
                  <span className="font-bold uppercase tracking-wider">Referring Dentist Assessment:</span>
                  <span>Exam Date: 08 Nov 2025</span>
                </div>
                <p className="text-on-surface leading-relaxed italic">
                  “Patient presents with moderate crowding in the lower arch with anterior crossbite affecting teeth 11 and 21. Class II molar relationship bilaterally. Healthy periodontium with good oral hygiene score. Referred for specialist orthodontic evaluation and clear aligner feasibility assessment.”
                </p>
                <div className="text-right text-[11px] font-semibold text-primary">
                  — Dr. Tariq Mansoor, BDS, MSc
                </div>
              </div>
            </section>

            {/* Supporting Records Attached */}
            <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-title-md text-base sm:text-lg font-bold text-on-surface flex items-center gap-2">
                  <Icon name="folder_shared" className="text-primary text-[20px]" />
                  <span>Linked Diagnostic Records</span>
                </h2>
                <span className="text-xs text-on-surface-variant">
                  {authorizedRecords.length} of 3 Authorized
                </span>
              </div>

              <div className="space-y-2.5">
                {/* Record 1 */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                      <Icon name="check" className="text-[18px]" />
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-on-surface block">
                        Full Panoramic OPG X-Ray
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-mono">
                        Captured: 24 Oct 2024 · High Resolution DICOM
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-secondary text-[10px] font-bold">
                    Authorized
                  </span>
                </div>

                {/* Record 2 */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                      <Icon name="check" className="text-[18px]" />
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-on-surface block">
                        Digital Odontogram & Caries Chart
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-mono">
                        Updated: 08 Nov 2025 · 32-Tooth Matrix
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-secondary text-[10px] font-bold">
                    Authorized
                  </span>
                </div>

                {/* Record 3 */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      authorizedRecords.includes('cephalometric')
                        ? 'bg-secondary-container text-secondary'
                        : 'bg-error-container text-on-error-container'
                    }`}>
                      <Icon
                        name={authorizedRecords.includes('cephalometric') ? 'check' : 'lock'}
                        className="text-[18px]"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-on-surface block">
                        Lateral Cephalometric Radiograph
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-mono">
                        Specialist Request · Pending Consent
                      </span>
                    </div>
                  </div>

                  {authorizedRecords.includes('cephalometric') ? (
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-secondary text-[10px] font-bold">
                      Authorized
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowConsentModal(true)}
                      className="px-3 py-1 rounded-lg bg-primary text-on-primary text-[11px] font-bold hover:bg-primary/90 transition shadow-2xs"
                    >
                      Authorize Access
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Quick Actions Bar */}
            <div className="p-4 sm:p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <NavLink
                to="/patient-dashboard/reminders"
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center gap-2"
              >
                <Icon name="calendar_month" className="text-[18px]" />
                <span>Book Specialist Appointment</span>
              </NavLink>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2.5 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition flex items-center gap-1.5"
                >
                  <Icon name="phone" className="text-[16px]" />
                  <span>Call Coordinator</span>
                </button>
                <button
                  type="button"
                  className="px-4 py-2.5 rounded-xl border border-outline-variant/40 text-xs font-semibold text-on-surface hover:bg-surface-container transition flex items-center gap-1.5"
                >
                  <Icon name="download" className="text-[16px]" />
                  <span>PDF Summary</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stepper Sidebar Column */}
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4 sticky top-28">
              <div className="flex items-center justify-between">
                <h3 className="font-title-sm text-sm sm:text-base font-bold text-on-surface flex items-center gap-1.5">
                  <Icon name="timeline" className="text-primary text-[18px]" />
                  <span>Referral Milestones</span>
                </h3>
                <span className="text-[11px] font-bold text-primary font-mono">Step 4 of 7</span>
              </div>

              {/* 7-Step Vertical Stepper */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/30">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[10px] shadow-xs">
                    <Icon name="check" className="text-[12px]" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-on-surface block">1. Referral Initiated</span>
                    <span className="text-[11px] text-on-surface-variant font-mono">08 Nov 2025 · 10:30 AM</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[10px] shadow-xs">
                    <Icon name="check" className="text-[12px]" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-on-surface block">2. Diagnostic Pack Attached</span>
                    <span className="text-[11px] text-on-surface-variant font-mono">08 Nov 2025 · 10:32 AM</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[10px] shadow-xs">
                    <Icon name="check" className="text-[12px]" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-on-surface block">3. Specialist Intake Accepted</span>
                    <span className="text-[11px] text-on-surface-variant font-mono">09 Nov 2025 · 02:15 PM</span>
                  </div>
                </div>

                {/* Step 4 (Current) */}
                <div className="relative">
                  <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] ring-4 ring-primary/20">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-primary block">4. Appointment Booking</span>
                    <span className="text-[11px] text-on-surface-variant">
                      Patient action required · Medcare Clinic
                    </span>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative opacity-50">
                  <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center text-[10px]">
                    5
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-on-surface block">5. Specialist Consultation</span>
                    <span className="text-[11px] text-on-surface-variant">Pending appointment</span>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="relative opacity-50">
                  <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center text-[10px]">
                    6
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-on-surface block">6. Cross-Clinic Care Plan</span>
                    <span className="text-[11px] text-on-surface-variant">Treatment synchronisation</span>
                  </div>
                </div>

                {/* Step 7 */}
                <div className="relative opacity-50">
                  <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center text-[10px]">
                    7
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-on-surface block">7. Care Handover & Close</span>
                    <span className="text-[11px] text-on-surface-variant">Return to primary dentist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Cephalometric consent */}
        {showConsentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 space-y-4 border border-outline-variant/30 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="lock_open" className="text-primary text-[22px]" />
                  <h3 className="font-title-md text-base font-bold text-on-surface">
                    Authorize Lateral Cephalometric
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConsentModal(false)}
                  className="text-on-surface-variant hover:text-on-surface"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                Dr. Reem Al-Nuaimi has requested access to your Lateral Cephalometric Radiographs to assess craniofacial jaw structure.
              </p>

              <div className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1">
                <div className="font-semibold text-on-surface">Consent Validity: 30 days</div>
                <div className="text-on-surface-variant text-[11px]">
                  Encrypted token issued directly through DHA Consent Gateway.
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowConsentModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={toggleCephConsent}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 shadow-xs"
                >
                  Confirm Authorization
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SharingShell>
  );
}

export default ReferralDetailsScreen;

