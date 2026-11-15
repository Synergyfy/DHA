import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';
import { Icon } from '../../design/Primitives';

/* ─── Reschedule Dialog ─────────────────────────────────────────────── */
function RescheduleDialog({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const [reason, setReason] = useState('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Reschedule Appointment</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <Icon name="close" className="text-xl text-slate-500" />
          </button>
        </div>

        {/* Date picker placeholder */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">New Date &amp; Time</label>
          <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2.5 bg-slate-50 text-slate-500 text-sm">
            <Icon name="calendar_month" className="text-lg" />
            <span>Select date and time…</span>
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Reason for Reschedule</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="Enter reason for rescheduling…"
            className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none"
          />
        </div>

        <div className="flex gap-3 justify-end pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Confirm Reschedule
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Cancel Dialog ─────────────────────────────────────────────────── */
function CancelDialog({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const [reason, setReason] = useState('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Cancel Appointment</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <Icon name="close" className="text-xl text-slate-500" />
          </button>
        </div>

        <p className="text-sm text-slate-600">
          Are you sure you want to cancel this appointment? This action cannot be undone.
        </p>

        {/* Reason dropdown */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Cancellation Reason</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          >
            <option value="">Select a reason…</option>
            <option value="patient_request">Patient Request</option>
            <option value="clinician_unavailable">Clinician Unavailable</option>
            <option value="medical_emergency">Medical Emergency</option>
            <option value="equipment_issue">Equipment / Operatory Issue</option>
            <option value="insurance_issue">Insurance Clearance Issue</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex gap-3 justify-end pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Section Label ─────────────────────────────────────────────────── */
function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon name={icon} className="text-lg text-teal-600" />
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</h3>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Appointment Details Screen — 14.5
   ═══════════════════════════════════════════════════════════════════════ */
export function AppointmentDetailsScreen() {
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <ClinicalWorkspaceShell
      activeNav="calendar"
      pageTitle="Appointment Details"
      badgeCode="14.5"
      badgeLabel="Appointment Details"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 md:pb-6 space-y-6">

        {/* ── Back Button ─────────────────────────────────────────── */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors group"
        >
          <Icon name="arrow_back" className="text-lg group-hover:-translate-x-0.5 transition-transform" />
          Back to Appointments
        </button>

        {/* ── Live Status Banner ──────────────────────────────────── */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-5 md:p-6 text-white shadow-lg shadow-teal-600/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left: status & timer */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300" />
                </span>
                <span className="text-sm font-semibold tracking-wide uppercase">Chairside Active</span>
                <span className="mx-1 text-white/50">·</span>
                <span className="text-sm text-white/90 font-medium">22m elapsed</span>
              </div>
              <p className="text-white/80 text-sm">
                Operatory 02 · Chair B
              </p>
            </div>

            {/* Right: IDs & schedule */}
            <div className="text-sm text-white/80 space-y-1 md:text-right">
              <p className="font-mono text-xs tracking-wide">APT-2026-8819 · ENC-2026-1048</p>
              <p>Sun, 18 Oct 2026 · 10:30 AM – 11:30 AM <span className="text-white/60">(60m)</span></p>
            </div>
          </div>
        </div>

        {/* ── Critical Safety Alert ──────────────────────────────── */}
        <div className="bg-red-50 border-l-4 border-red-600 rounded-r-xl p-4 md:p-5">
          <div className="flex items-start gap-3">
            <Icon name="warning" className="text-2xl text-red-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide">
                ⚠ Penicillin Allergy — Direct Anaphylaxis Risk
              </h3>
              <p className="text-sm text-red-700 leading-relaxed">
                <span className="font-semibold">Protocol:</span> Non-beta lactam anesthetics required
              </p>
              <p className="text-sm text-red-700 leading-relaxed">
                Epipen ready, Bay 3 crash cart proximal
              </p>
            </div>
          </div>
        </div>

        {/* ── Main Content Grid ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ▬▬ LEFT / MAIN COLUMN ▬▬ */}
          <div className="lg:col-span-8 space-y-6">

            {/* Patient Identity Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
              <SectionLabel icon="person" label="Patient Identity" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xl font-bold">
                  AO
                </div>
                {/* Info */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">Amara Okafor</h2>
                    <span className="text-sm text-slate-500">· 34y Female</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-0.5 text-xs font-semibold">
                      <Icon name="verified" className="text-sm" />
                      UAE Pass L3 Verified
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-slate-600 pt-1">
                    <p><span className="font-medium text-slate-500">Emirates ID:</span> AE-990-281-DXB</p>
                    <p><span className="font-medium text-slate-500">DHA Record:</span> DHA-2026-00451</p>
                    <p className="sm:col-span-2">
                      <span className="font-medium text-slate-500">Insurance:</span> Daman National Health
                      <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs font-semibold">Active</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Action Button */}
            <button
              onClick={() => navigate('/treatment-plans/progress-workspace')}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-teal-600/25 transition-all hover:shadow-xl hover:shadow-teal-600/30 active:scale-[0.98]"
            >
              <Icon name="clinical_notes" className="text-xl" />
              Open Clinical Workspace
            </button>

            {/* Clinical Procedure Scope Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
              <SectionLabel icon="medical_services" label="Clinical Procedure Scope" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Procedure details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Procedure</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      Direct Biomimetic Resin Composite (2-Surface MO)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Tooth</p>
                    <p className="text-sm text-slate-700 mt-0.5">#16 (Upper Right First Molar)</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Treatment Plan</p>
                    <p className="text-sm text-slate-700 mt-0.5">
                      TP-2026-089 <span className="text-slate-400">·</span> &ldquo;Phase 1 – Restorative&rdquo;
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Material</p>
                    <p className="text-sm text-slate-700 mt-0.5">Tokuyama Estelite Sigma Quick A2B</p>
                  </div>
                </div>

                {/* Care team & session */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Care Team</p>
                    <div className="mt-1.5 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">DJ</div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">Dr. Daniel James</p>
                          <p className="text-xs text-slate-500">Lead Clinician · BDS, MDS Prostho</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">ZT</div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">Zainab Tariq RN</p>
                          <p className="text-xs text-slate-500">Clinical Nurse</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Biometric Consent</p>
                    <p className="text-sm text-slate-700 mt-0.5 flex items-center gap-1.5">
                      <Icon name="check_circle" className="text-base text-emerald-600" />
                      Signed (CON-089-A)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Session</p>
                    <p className="text-sm text-slate-700 mt-0.5">2 of 3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pre-Operative Directives Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
              <SectionLabel icon="vital_signs" label="Pre-Operative Directives" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Vitals</p>
                  <p className="text-sm text-slate-700">
                    BP 118/76 mmHg
                    <span className="ml-1.5 inline-flex items-center gap-0.5 text-emerald-600 text-xs font-semibold">
                      Normotensive <Icon name="check" className="text-xs" />
                    </span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Pre-Medication</p>
                  <p className="text-sm text-slate-700">None required <span className="text-slate-400">(allergy-adjusted)</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Isolation</p>
                  <p className="text-sm text-slate-700">Rubber Dam Kit #4 — Sterile staging confirmed</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Anesthesia</p>
                  <p className="text-sm text-slate-700">Articaine 4% + 1:100k Epi — 1.8mL buccal infiltration</p>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Prep Note</p>
                  <p className="text-sm text-slate-700 italic">
                    &ldquo;Selective enamel etch 37% H₃PO₄ — 15s protocol&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Operational Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => showToast('Patient status updated to In Chair')}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
              >
                <Icon name="event_seat" className="text-lg" />
                In Chair
              </button>
              <button
                onClick={() => setShowReschedule(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
              >
                <Icon name="edit_calendar" className="text-lg" />
                Reschedule
              </button>
              <button
                onClick={() => setShowCancel(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-red-300 text-red-600 hover:bg-red-50 font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
              >
                <Icon name="cancel" className="text-lg" />
                Cancel
              </button>
            </div>
          </div>

          {/* ▬▬ RIGHT / ASIDE COLUMN ▬▬ */}
          <aside className="lg:col-span-4 space-y-6">

            {/* Financial / Tariff Clearance */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <SectionLabel icon="payments" label="Financial / Tariff Clearance" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Gross</span>
                  <span className="text-sm font-semibold text-slate-900">AED 850.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Daman Coverage (80%)</span>
                  <span className="text-sm font-medium text-slate-700">AED 680.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Patient Copay (20%)</span>
                  <span className="text-sm font-medium text-slate-700">AED 170.00</span>
                </div>
                <hr className="border-slate-100" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Status</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-0.5 text-xs font-semibold">
                    <Icon name="check_circle" className="text-sm" />
                    Settled
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Receipt</span>
                  <span className="text-sm font-mono text-slate-700">REC-2026-904</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Pre-Auth</span>
                  <span className="text-sm font-mono text-slate-700">PA-2026-DXB-00451</span>
                </div>
              </div>
            </div>

            {/* Quick Info — aside summary */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
              <SectionLabel icon="info" label="Quick Reference" />
              <dl className="space-y-2.5 text-sm">
                <div>
                  <dt className="text-xs font-medium text-slate-400 uppercase tracking-wide">Appointment</dt>
                  <dd className="font-mono text-slate-700 mt-0.5">APT-2026-8819</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-slate-400 uppercase tracking-wide">Encounter</dt>
                  <dd className="font-mono text-slate-700 mt-0.5">ENC-2026-1048</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-slate-400 uppercase tracking-wide">Operatory</dt>
                  <dd className="text-slate-700 mt-0.5">Operatory 02 · Chair B</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-slate-400 uppercase tracking-wide">Duration</dt>
                  <dd className="text-slate-700 mt-0.5">60 minutes</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Sticky Bottom Nav (mobile only) ───────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => showToast('Opening clinical notes…')}
          className="flex items-center justify-center h-11 w-11 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          aria-label="Clinical Notes"
        >
          <Icon name="clinical_notes" className="text-xl" />
        </button>
        <button
          onClick={() => navigate('/treatment-plans/progress-workspace')}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
        >
          <Icon name="open_in_new" className="text-lg" />
          Open Workspace
        </button>
      </div>

      {/* ── Dialogs ───────────────────────────────────────────────── */}
      {showReschedule && (
        <RescheduleDialog
          onClose={() => setShowReschedule(false)}
          onConfirm={() => {
            setShowReschedule(false);
            showToast('Appointment rescheduled successfully');
          }}
        />
      )}
      {showCancel && (
        <CancelDialog
          onClose={() => setShowCancel(false)}
          onConfirm={() => {
            setShowCancel(false);
            showToast('Appointment cancelled');
          }}
        />
      )}

      {/* ── Toast ─────────────────────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-[110] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-2xl">
            <Icon name="check_circle" className="text-lg text-emerald-400" />
            {toastMessage}
          </div>
        </div>
      )}
    </ClinicalWorkspaceShell>
  );
}
