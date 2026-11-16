import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { InvestigationShell } from './InvestigationShell';
import { Icon } from '../../design/Primitives';

export function InvestigationAppointmentSchedulingScreen() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('2026-11-13');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [selectedFacility, setSelectedFacility] = useState('Al Zahra Diagnostic Wing (Suite 2)');
  const [selectedTech, setSelectedTech] = useState('Humaid Musa (#RAD-3091)');
  const [sendSms, setSendSms] = useState(true);
  const [sendWhatsapp, setSendWhatsapp] = useState(true);
  const [portalSync, setPortalSync] = useState(true);
  const [pregnancyCleared, setPregnancyCleared] = useState(true);
  const [metalRemovalAlert, setMetalRemovalAlert] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const dates = [
    { date: '2026-11-13', day: 'Thu', label: 'Today', available: 4 },
    { date: '2026-11-14', day: 'Fri', label: 'Tomorrow', available: 6 },
    { date: '2026-11-15', day: 'Sat', label: '15 Nov', available: 3 },
    { date: '2026-11-16', day: 'Sun', label: '16 Nov', available: 0 },
    { date: '2026-11-17', day: 'Mon', label: '17 Nov', available: 8 },
    { date: '2026-11-18', day: 'Tue', label: '18 Nov', available: 5 },
  ];

  const morningSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:45 AM', '11:30 AM'];
  const afternoonSlots = ['13:30 PM', '14:15 PM', '15:00 PM', '16:00 PM', '16:45 PM'];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pregnancyCleared || !metalRemovalAlert) {
      showToast('Please confirm patient safety protocol checklists.');
      return;
    }
    setBookingConfirmed(true);
    showToast('Investigation appointment confirmed & automated notices dispatched!');
  };

  return (
    <InvestigationShell
      pageTitle="Investigation Appointment Scheduling"
      badgeCode="11.5"
      badgeLabel="Intake Scheduling"
      currentStep="Slot Allocation"
      patientName="Fatima Bello"
      dhaId="DHA-08921"
      orderRef="REQ-2025-0902"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <Icon name="check_circle" className="text-emerald-400 text-lg" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Requisition Summary Card */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center shrink-0">
              <Icon name="view_in_ar" className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-xs text-primary">REQ-2025-0902</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                  3D CBCT Volumetric
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                  Routine
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-on-surface mt-1">
                Full Maxillary Arch CBCT (FOV 8x8 cm)
              </h2>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5 flex-wrap">
                <span>Patient: <strong>Fatima Bello (DHA-08921)</strong></span>
                <span>•</span>
                <span>29y • Female</span>
                <span>•</span>
                <span>Ref: Dr. Daniel James</span>
              </div>
            </div>
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="text-[11px] text-outline block">Scan Duration</span>
            <span className="text-xs font-bold text-on-surface">20 mins slot</span>
            <span className="text-[10px] text-emerald-700 font-medium block">Machine: Morita X800</span>
          </div>
        </div>

        {bookingConfirmed ? (
          /* Confirmation Success Card */
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <Icon name="event_available" className="text-3xl" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Appointment Successfully Booked
              </span>
              <h3 className="text-xl font-bold text-emerald-950 mt-1">
                {selectedSlot} on {selectedDate}
              </h3>
              <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto">
                Patient <strong>Fatima Bello</strong> has been booked at <strong>{selectedFacility}</strong> with Radiographer <strong>{selectedTech}</strong>.
              </p>
            </div>

            <div className="p-3 bg-white/80 rounded-xl max-w-sm mx-auto text-xs text-slate-700 space-y-1 text-left border border-emerald-200">
              <div className="flex items-center justify-between">
                <span>SMS Notification:</span>
                <span className="font-semibold text-emerald-700">Sent (+234 803 *** 4821)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>WhatsApp Instructions:</span>
                <span className="font-semibold text-emerald-700">Delivered</span>
              </div>
              <div className="flex items-center justify-between">
                <span>DHA App Calendar:</span>
                <span className="font-semibold text-emerald-700">Synchronized</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <NavLink
                to="/investigations/requests"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-on-primary hover:bg-primary/95 transition-all shadow-xs"
              >
                Back to Requests Worklist
              </NavLink>
              <button
                type="button"
                onClick={() => setBookingConfirmed(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-surface border border-outline-variant/40 text-on-surface hover:bg-surface-container transition-colors"
              >
                Modify Slot
              </button>
            </div>
          </div>
        ) : (
          /* Slot Booking Form */
          <form onSubmit={handleConfirmBooking} className="space-y-6">
            {/* Step 1: Date Selection */}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
                  <Icon name="calendar_month" className="text-primary text-base" />
                  Select Examination Date
                </h3>
                <span className="text-xs text-outline">November 2026</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {dates.map((d) => {
                  const isSelected = selectedDate === d.date;
                  const isClosed = d.available === 0;
                  return (
                    <button
                      key={d.date}
                      type="button"
                      disabled={isClosed}
                      onClick={() => setSelectedDate(d.date)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-primary bg-primary text-on-primary shadow-sm'
                          : isClosed
                          ? 'border-outline-variant/20 bg-surface-container-low opacity-50 cursor-not-allowed text-outline'
                          : 'border-outline-variant/30 bg-surface hover:border-primary/40 hover:bg-surface-container-low text-on-surface'
                      }`}
                    >
                      <span className="block text-[11px] font-semibold opacity-80">{d.day}</span>
                      <span className="block text-sm sm:text-base font-bold my-0.5">{d.label}</span>
                      <span className="block text-[10px] font-medium opacity-90">
                        {isClosed ? 'Closed' : `${d.available} slots`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Time Slot Selection */}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
              <div>
                <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
                  <Icon name="schedule" className="text-secondary text-base" />
                  Select Time Slot ({selectedDate})
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">20 minutes allocated for setup, imaging, and DICOM reconstruction</p>
              </div>

              {/* Morning Slots */}
              <div>
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-2">
                  Morning Slots (09:00 - 12:00)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {morningSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-secondary text-on-secondary shadow-xs ring-2 ring-secondary/40'
                            : 'bg-surface border border-outline-variant/30 text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Afternoon Slots */}
              <div className="pt-2 border-t border-outline-variant/20">
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-2">
                  Afternoon Slots (13:30 - 17:00)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {afternoonSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-secondary text-on-secondary shadow-xs ring-2 ring-secondary/40'
                            : 'bg-surface border border-outline-variant/30 text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Equipment & Staff Allocation */}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
                <Icon name="engineering" className="text-primary text-base" />
                Facility & Operator Allocation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Designated Imaging Facility
                  </label>
                  <select
                    aria-label="Designated facility"
                    value={selectedFacility}
                    onChange={(e) => setSelectedFacility(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-outline-variant/40 bg-surface text-on-surface focus:outline-none"
                  >
                    <option value="Al Zahra Diagnostic Wing (Suite 2)">Al Zahra Diagnostic Wing (Suite 2 - Morita X800)</option>
                    <option value="DHA Central Radiology Dept (Suite 1)">DHA Central Radiology Dept (Suite 1)</option>
                    <option value="Lagos Hospital Maxillofacial Lab">Lagos Hospital Maxillofacial Lab</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Assigned Radiographer
                  </label>
                  <select
                    aria-label="Assigned radiographer"
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-outline-variant/40 bg-surface text-on-surface focus:outline-none"
                  >
                    <option value="Humaid Musa (#RAD-3091)">Humaid Musa (#RAD-3091, Senior CBCT Tech)</option>
                    <option value="Sarah Jenkins (#RAD-2041)">Sarah Jenkins (#RAD-2041, Lead Radiographer)</option>
                    <option value="Zainab Tariq (#RAD-1982)">Zainab Tariq (#RAD-1982, Imaging Specialist)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Safety Safeguards & Automated Dispatch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Safeguards */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs text-amber-950">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Icon name="verified_user" className="text-base text-amber-700" />
                  Pre-Scan Patient Directives
                </span>
                <label className="flex items-start gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={pregnancyCleared}
                    onChange={(e) => setPregnancyCleared(e.target.checked)}
                    className="rounded text-primary focus:ring-primary mt-0.5"
                  />
                  <span>
                    <strong>Pregnancy Screening Cleared:</strong> Verified patient is not pregnant or radiation risk justified.
                  </span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={metalRemovalAlert}
                    onChange={(e) => setMetalRemovalAlert(e.target.checked)}
                    className="rounded text-primary focus:ring-primary mt-0.5"
                  />
                  <span>
                    <strong>Metallic Artifact Directives:</strong> Patient notified to remove piercings, spectacles, and dentures prior to CBCT.
                  </span>
                </label>
              </div>

              {/* Patient Dispatch Channels */}
              <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 space-y-2 text-xs">
                <span className="font-bold text-on-surface flex items-center gap-1.5">
                  <Icon name="send" className="text-base text-primary" />
                  Automated Appointment Notices
                </span>
                <label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Icon name="sms" className="text-sm text-outline" />
                    SMS Dispatch (+234 803 *** 4821)
                  </span>
                  <input
                    type="checkbox"
                    checked={sendSms}
                    onChange={(e) => setSendSms(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Icon name="chat" className="text-sm text-emerald-600" />
                    WhatsApp Confirmation & GPS Pin
                  </span>
                  <input
                    type="checkbox"
                    checked={sendWhatsapp}
                    onChange={(e) => setSendWhatsapp(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Icon name="notifications_active" className="text-sm text-sky-600" />
                    DHA Patient App Sync
                  </span>
                  <input
                    type="checkbox"
                    checked={portalSync}
                    onChange={(e) => setPortalSync(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                </label>
              </div>
            </div>

            {/* Bottom Booking CTA */}
            <div className="p-4 bg-surface rounded-2xl border border-outline-variant/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-on-surface-variant text-center sm:text-left">
                <span>Selected: <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong></span>
                <span className="hidden sm:inline"> • Facility: <strong>{selectedFacility}</strong></span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-surface border border-outline-variant/40 text-on-surface hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Icon name="event_available" className="text-base" />
                  <span>Confirm Appointment Slot</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </InvestigationShell>
  );
}

