import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { InvestigationShell } from './InvestigationShell';
import { Icon } from '../../design/Primitives';

export function InvestigationRequestConfirmationScreen() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePrint = () => {
    showToast('Generating high-resolution Radiology Intake Slip PDF...');
    window.print();
  };

  return (
    <InvestigationShell
      pageTitle="Investigation Request Dispatched"
      badgeCode="11.7"
      badgeLabel="Order Confirmation"
      currentStep="Dispatched & Sealed"
      orderRef="REQ-2025-0914"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <Icon name="check_circle" className="text-emerald-400 text-lg" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Celebratory Success Banner */}
        <div className="relative overflow-hidden bg-surface rounded-2xl border border-secondary/20 p-5 sm:p-6 shadow-xs">
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-secondary/5 pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative">
            <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center shrink-0 shadow-sm text-on-secondary-container">
              <Icon name="check_circle" className="text-3xl" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Clinical Order Confirmed
                </span>
                <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                  Order #REQ-2025-0914
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-on-surface mt-1">
                Investigation Request Dispatched & Sealed
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                Transmitted directly to the radiology queue with instant PACS allocation and encrypted biometric hash.
              </p>
            </div>
          </div>

          {/* Live Clinical Priority Triage Pill */}
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-surface-container-low px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600" />
              </span>
              <span className="text-xs font-bold text-on-surface uppercase tracking-wide">
                Status: Dispatched • Priority Urgent (Fast-Track)
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-md">
              Triage Window: &lt; 4 Hours
            </span>
          </div>
        </div>

        {/* QR & Clinical Intake Routing Card */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="qr_code_scanner" className="text-primary text-xl" />
              <h3 className="font-bold text-sm sm:text-base text-on-surface">Radiology Intake Digital Pass</h3>
            </div>
            <span className="font-mono text-xs font-semibold text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
              DHA-ORD-914-DX
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
            {/* Crisp Simulated QR SVG */}
            <div className="bg-surface p-3 rounded-xl shadow-xs flex flex-col items-center justify-center shrink-0 border border-outline-variant/30">
              <svg className="w-24 h-24 text-on-surface" fill="currentColor" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h28v28H4V4zm4 4v20h20V8H8zm4 4h12v12H12V12zM64 4h28v28H64V4zm4 4v20h20V8H68zm4 4h12v12H72V12zM4 64h28v28H4V64zm4 4v20h20V68H8zm4 4h12v12H12V72z" />
                <path d="M40 8h8v8h-8zm12 0h4v4h-4zm-8 12h8v4h-8zm12 4h4v8h-4zm-12 8h4v4h-4zm8 0h4v4h-4zm-16 8h8v4h-8zm12 4h12v4H48zm16-4h4v4h-4zm12 0h8v4h-8zm-24 8h4v8h-4zm12 0h12v4H60zm16 4h8v8h-8zm-36 8h4v4h-4zm8 0h8v4h-8zm12 0h4v4h-4zm-20 8h8v4h-8zm12 4h4v8h-4zm16-4h12v4H68zm-28 8h16v4H40zm24 0h4v4h-4zm8 0h12v4H72zm-28 8h4v4h-4zm8 0h8v4h-8zm16 0h8v4h-8z" />
              </svg>
              <span className="font-mono text-[10px] text-on-surface-variant mt-1.5 tracking-widest uppercase">
                DHA-TOKEN-DX
              </span>
            </div>

            <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-secondary">
                <Icon name="shield" className="text-base" />
                <span className="text-xs font-bold uppercase tracking-wide">Contactless Clinical Routing</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Allows the radiology technician instant room intake without physical paperwork. The imaging protocol auto-populates directly onto <strong>Dexis Workstation Suite 4</strong> upon scanning.
              </p>

              {/* Barcode representation */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-outline-variant/20">
                <div className="flex items-center gap-[3px] h-6 justify-center sm:justify-start overflow-hidden opacity-80">
                  <div className="w-1 h-full bg-on-surface" />
                  <div className="w-0.5 h-full bg-on-surface" />
                  <div className="w-1.5 h-full bg-on-surface" />
                  <div className="w-0.5 h-full bg-on-surface" />
                  <div className="w-2 h-full bg-on-surface" />
                  <div className="w-0.5 h-full bg-on-surface" />
                  <div className="w-1 h-full bg-on-surface" />
                  <div className="w-2 h-full bg-on-surface" />
                  <div className="w-0.5 h-full bg-on-surface" />
                  <div className="w-1.5 h-full bg-on-surface" />
                  <div className="w-0.5 h-full bg-on-surface" />
                  <div className="w-1 h-full bg-on-surface" />
                  <div className="w-2.5 h-full bg-on-surface" />
                  <div className="w-0.5 h-full bg-on-surface" />
                  <div className="w-1.5 h-full bg-on-surface" />
                  <div className="w-1 h-full bg-on-surface" />
                  <div className="w-0.5 h-full bg-on-surface" />
                  <div className="w-2 h-full bg-on-surface" />
                </div>
                <span className="font-mono text-[11px] text-outline font-semibold">
                  CODE128: 10482-914-DX
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Order Specification Summary */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs">
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                Diagnostic Specification
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
                <Icon name="verified" className="text-xs" />
                NABIDH E-Signed
              </span>
            </div>

            {/* Patient Header Box */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                  CO
                </div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Chinedu Okafor</h4>
                  <span className="text-xs text-on-surface-variant font-mono">34y Male • DHA-10482</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-primary bg-surface px-2.5 py-1 rounded-lg border border-outline-variant/20">
                Chair 4 Intake
              </span>
            </div>

            {/* Modality & Targets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div className="space-y-1">
                <span className="text-outline uppercase text-[11px] font-semibold block">Ordered Modality & Projection</span>
                <div className="flex items-center gap-1.5 text-on-surface font-semibold text-sm">
                  <Icon name="radiology" className="text-primary text-base" />
                  <span>Dexis Digital Intraoral Bitewing Right + Periapical (#16 Apex)</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-outline uppercase text-[11px] font-semibold block">Target Anatomical Units (FDI)</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold font-mono">
                    FDI #16 (Maxillary R1st Molar)
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-mono font-medium">
                    FDI #46 (Antagonist)
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-outline uppercase text-[11px] font-semibold block">Ordering Practitioner</span>
                <div className="font-semibold text-on-surface">Dr. Daniel James (#DEN-48912)</div>
                <div className="text-on-surface-variant text-[11px]">Lead Restorative Specialist</div>
              </div>

              <div className="space-y-1">
                <span className="text-outline uppercase text-[11px] font-semibold block">Assigned Suite</span>
                <div className="font-semibold text-on-surface">DHA Central Branch • Suite 4</div>
                <div className="text-on-surface-variant text-[11px]">In-Clinic Dexis Sensor Station</div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low px-5 py-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
            <div className="flex items-center gap-1.5 font-mono">
              <Icon name="schedule" className="text-sm" />
              <span>Logged: 16 Feb 2025, 09:15 GST</span>
            </div>
            <span className="font-mono font-bold text-primary">Encounter: #EXAM-DHA-2025-0982</span>
          </div>
        </div>

        {/* Digital Radiology Pipeline Stepper Tracker */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-on-surface">Digital Radiology Pipeline Tracker</h3>
            <span className="text-xs font-semibold text-secondary uppercase">Step 1 of 4 Active</span>
          </div>

          <div className="relative pl-3 space-y-4">
            <div className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-outline-variant/30" />

            {/* Step 1 */}
            <div className="relative flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 z-10 shadow-xs">
                <Icon name="meeting_room" className="text-base" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-on-surface">1. Patient Room Check-in</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                    Now Active
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Patient called to Radiology Suite 4. Biometric token verified on workstation.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                2
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs text-on-surface">2. Image Acquisition & ALARA Shield</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Lead thyroid/apron positioning; pediatric/adult low-dose digital sensor exposure.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                3
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs text-on-surface">3. DICOM Auto-Ingestion & NABIDH Sync</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Lossless calibrated transmission directly to the DHA central clinical vault.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0 z-10 font-bold text-xs">
                4
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs text-on-surface">4. Clinical Review & Caries Interpretation</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Transfers back to Dr. Daniel James for definitive diagnostic reporting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Helpful Radiographer Dispatch Notice */}
        <div className="flex items-center gap-3 p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20 text-xs">
          <Icon name="info" className="text-secondary text-xl shrink-0" />
          <p className="text-on-surface-variant leading-relaxed">
            The radiographer has received this notification on <strong>Dexis Terminal #04</strong>. Expected acquisition turnaround estimation: <strong>12 minutes</strong>.
          </p>
        </div>

        {/* Action Triggers */}
        <div className="space-y-2 pt-2">
          <NavLink
            to="/investigations/awaiting-results"
            className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-primary/95 transition-all"
          >
            <span>View Live Worklist / Awaiting Results (11.8)</span>
            <Icon name="arrow_forward" className="text-base" />
          </NavLink>

          <button
            type="button"
            onClick={handlePrint}
            className="w-full py-2.5 px-4 rounded-xl bg-surface border border-outline-variant/40 text-on-surface font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-surface-container transition-colors shadow-xs"
          >
            <Icon name="print" className="text-primary text-base" />
            <span>Print Radiology Intake Slip (PDF)</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/examination/workspace')}
            className="w-full py-2 text-on-surface-variant hover:text-primary text-xs font-medium flex items-center justify-center gap-1 transition-colors"
          >
            <Icon name="chevron_left" className="text-base" />
            <span>Back to Section 10 Clinical Workspace</span>
          </button>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-[11px] text-center text-outline max-w-md mx-auto leading-relaxed pt-2">
          Dispatched under UAE Federal Health Law & NABIDH e-order standard. Modality protocol bound to encounter <span className="font-mono text-on-surface font-semibold">#EXAM-DHA-2025-0982</span>.
        </p>
      </div>
    </InvestigationShell>
  );
}

