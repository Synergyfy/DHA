import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type DurationOption = '30 mins' | '45 mins' | '60 mins' | '90 mins';
type BookingSource = 'walk-in' | 'app' | 'referral' | 'phone';

interface TimeSlot {
  time: string;
  status: 'booked' | 'available' | 'maintenance';
  label?: string;
}

const TIME_SLOTS: TimeSlot[] = [
  { time: '09:00 AM', status: 'booked', label: 'Booked • Ext.' },
  { time: '10:30 AM', status: 'available', label: 'Available' },
  { time: '11:45 AM', status: 'available', label: 'Available' },
  { time: '02:00 PM', status: 'available', label: 'Available' },
  { time: '03:30 PM', status: 'maintenance', label: 'Operatory Maint.' },
];

export const CreateEditAppointmentScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLocation] = useState('Wuse 2 Main Branch (HQ #001)');
  const [selectedProcedure, setSelectedProcedure] = useState('Direct Restorative (Class II Resin)');
  const [selectedClinician, setSelectedClinician] = useState('Dr. Daniel Okoro, DDS');
  const [selectedDateChip, setSelectedDateChip] = useState('Thu, Oct 22 (Active)');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [duration, setDuration] = useState<DurationOption>('60 mins');
  const [bookingSource, setBookingSource] = useState<BookingSource>('app');
  const [adminNotes, setAdminNotes] = useState(
    'Patient requested Dr. Okoro specifically; recare check from last month composite evaluation.'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Appointment successfully scheduled for Amara Okafor!');
    setTimeout(() => {
      navigate('/clinic-operations/calendar');
    }, 1200);
  };

  const handleSaveDraft = () => {
    showToast('Draft saved. Slot held for 15 minutes.');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-[#131b2e] text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium animate-fade-in border border-white/10">
          <Icon name="check_circle" className="text-[#86f2e4] text-[18px]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/60">
        <div className="max-w-4xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="w-10 h-10 -ml-1 flex items-center justify-center rounded-xl text-[#131b2e] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] truncate">
              Create Appointment
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast('Options menu opened')}
              className="w-10 h-10 rounded-xl hover:bg-[#eaedff] flex items-center justify-center text-[#3f4850] transition-colors"
            >
              <Icon name="more_vert" className="text-[22px]" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              DM
            </div>
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-5 pb-20">
        {/* Branch / Facility Context Banner */}
        <div className="mb-4">
          <div className="flex items-center justify-between p-3.5 bg-[#f2f3ff] rounded-2xl border border-[#dae2fd]/70 shadow-sm flex-wrap gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#dae2fd] flex items-center justify-center shrink-0 text-[#006194]">
                <Icon name="domain" className="text-[22px]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#006194] font-bold">
                    Location
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" />
                </div>
                <p className="text-sm font-semibold text-[#131b2e] truncate">{selectedLocation}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/clinic-operations/branch-switcher')}
              type="button"
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#eaedff] text-[#006194] text-xs font-semibold flex items-center gap-1 border border-[#bfc7d2]/60 shadow-xs transition-colors"
            >
              <span>Change</span>
              <Icon name="expand_more" className="text-[16px]" />
            </button>
          </div>
        </div>

        {/* Patient Snapshot Card */}
        <div className="mb-5 bg-white rounded-2xl border border-[#dae2fd]/60 p-4 sm:p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5 min-w-0 flex-1">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full bg-[#89f5e7] text-[#00201d] flex items-center justify-center font-bold text-lg shadow-sm ring-4 ring-[#f2f3ff]">
                  AO
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#006a61] text-white rounded-full flex items-center justify-center shadow-xs"
                  title="Verified Patient Record"
                >
                  <Icon name="verified" className="text-[13px]" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] truncate">
                    Amara Okafor
                  </h2>
                  <span className="bg-[#86f2e4] text-[#006f66] text-[11px] font-bold px-2 py-0.5 rounded-full">
                    VERIFIED
                  </span>
                </div>
                <p className="text-xs text-[#3f4850] truncate mt-0.5">
                  34y Female • LifeCode:{' '}
                  <span className="font-mono font-semibold text-[#006194]">AE-990-281-DXB</span>
                </p>
                <p className="text-xs text-[#3f4850]">
                  MRN: <span className="font-mono text-[#131b2e]">DHA-2026-00451</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => showToast('Opening patient selector modal')}
              type="button"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] text-xs font-semibold flex items-center gap-1 border border-[#dae2fd]/70 transition-colors shrink-0"
              title="Switch Patient"
            >
              <Icon name="swap_horiz" className="text-[18px]" />
              <span className="hidden sm:inline">Switch</span>
            </button>
          </div>

          {/* Critical Clinical Alert Pill & Phone */}
          <div className="mt-3.5 pt-3 border-t border-[#f2f3ff] flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a]">
              <Icon name="warning" className="text-[15px] text-[#ba1a1a]" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Allergy: Penicillin (Severe)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#3f4850]">
              <Icon name="phone" className="text-[15px] text-[#006a61]" />
              <span>+234 803 555 0192</span>
            </div>
          </div>
        </div>

        {/* Form Details Container */}
        <form onSubmit={handleConfirm} className="flex flex-col gap-4">
          {/* Procedure & Clinician Card */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 sm:p-5 shadow-sm flex flex-col gap-4">
            {/* Appointment Type Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#131b2e] flex items-center justify-between">
                <span>Clinical Procedure</span>
                <span className="text-xs font-medium text-[#006194] flex items-center gap-1">
                  <Icon name="auto_fix_high" className="text-[14px]" /> Standard CDT
                </span>
              </label>
              <div className="relative">
                <select
                  value={selectedProcedure}
                  onChange={(e) => setSelectedProcedure(e.target.value)}
                  className="w-full h-12 bg-[#f2f3ff] border border-[#dae2fd]/60 rounded-xl px-3.5 text-sm font-semibold text-[#131b2e] appearance-none focus:outline-none focus:ring-2 focus:ring-[#006194] cursor-pointer"
                >
                  <option>Direct Restorative (Class II Resin)</option>
                  <option>Periodic Comprehensive Examination &amp; OPG</option>
                  <option>Root Canal Therapy (Endodontic Molar)</option>
                  <option>Crown Preparation &amp; Digital Scan</option>
                  <option>Emergency Toothache Triage &amp; Sedation</option>
                </select>
                <Icon
                  name="arrow_drop_down"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3f4850] text-[22px] pointer-events-none"
                />
              </div>
            </div>

            {/* Attending Clinician Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#131b2e]">Attending Clinician</label>
              <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#dae2fd]/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#cce5ff] text-[#004b73] flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                    DO
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#131b2e]">{selectedClinician}</p>
                    <p className="text-xs text-[#006a61] font-semibold">Chief Restorative • 98% Match</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedClinician(
                      selectedClinician === 'Dr. Daniel Okoro, DDS'
                        ? 'Dr. Sarah Bello, BDS'
                        : 'Dr. Daniel Okoro, DDS'
                    )
                  }
                  className="w-8 h-8 rounded-lg bg-white border border-[#bfc7d2]/60 flex items-center justify-center text-[#3f4850] hover:text-[#131b2e] transition-colors"
                >
                  <Icon name="unfold_more" className="text-[18px]" />
                </button>
              </div>
            </div>

            {/* Operatory Suite Allocation */}
            <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl border border-[#dae2fd]/60">
              <div className="flex items-center gap-3">
                <Icon name="medical_services" className="text-[#006a61] text-[22px]" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#707881] block">
                    Assigned Operatory
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#131b2e]">
                    Suite 01 (Surgical Restorative)
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#89f5e7] text-[#00201d]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" /> Ready
              </span>
            </div>
          </div>

          {/* Date & Schedule Matrix Card */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 sm:p-5 shadow-sm flex flex-col gap-4">
            {/* Date Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#131b2e] flex items-center justify-between">
                <span>Date Selection</span>
                <span className="text-xs text-[#707881]">Q4 Clinic Schedule</span>
              </label>
              <div className="h-12 bg-[#f2f3ff] border border-[#dae2fd]/60 rounded-xl px-3.5 flex items-center justify-between text-[#131b2e]">
                <div className="flex items-center gap-2.5">
                  <Icon name="calendar_today" className="text-[#006194] text-[20px]" />
                  <span className="text-sm font-bold">Thursday, 22 Oct 2026</span>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Calendar date picker opened')}
                  className="text-[#006194] hover:text-[#007bb9] p-1"
                >
                  <Icon name="edit_calendar" className="text-[20px]" />
                </button>
              </div>

              {/* Quick Date Chips */}
              <div className="flex items-center gap-2 mt-1 overflow-x-auto pb-1 no-scrollbar">
                {['Today', 'Tomorrow', 'Thu, Oct 22 (Active)', 'Next Mon (Oct 26)'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setSelectedDateChip(chip)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedDateChip === chip
                        ? 'bg-[#006194] text-white shadow-xs'
                        : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850]'
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots Dynamic Grid */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-[#131b2e]">Operatory Time Slots</span>
                <span className="text-xs text-[#006a61] font-bold uppercase tracking-wider">3 Slots Open</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTime === slot.time && slot.status === 'available';
                  const isBooked = slot.status === 'booked';
                  const isMaint = slot.status === 'maintenance';

                  if (isBooked || isMaint) {
                    return (
                      <div
                        key={slot.time}
                        className="p-2.5 rounded-xl bg-[#f2f3ff] opacity-60 flex flex-col items-center justify-center py-2.5 cursor-not-allowed border border-[#dae2fd]/40"
                      >
                        <span className="text-xs font-bold text-[#707881] line-through">{slot.time}</span>
                        <span className="text-[10px] text-[#ba1a1a] font-medium">{slot.label}</span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={slot.time}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-2.5 rounded-xl flex flex-col items-center justify-center py-2.5 relative cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-[#006194] text-white shadow-md border-transparent ring-2 ring-[#006194] ring-offset-2'
                          : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] border-[#dae2fd]/60'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1 right-1.5">
                          <Icon name="check_circle" className="text-[16px] text-white" />
                        </div>
                      )}
                      <span className="text-xs sm:text-sm font-bold">{slot.time}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-[#cce5ff]' : 'text-[#006a61] font-bold'}`}>
                        {isSelected ? 'Selected' : slot.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Estimated Duration Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-[#131b2e]">Estimated Duration</label>
              <div className="grid grid-cols-4 gap-2">
                {(['30 mins', '45 mins', '60 mins', '90 mins'] as DurationOption[]).map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setDuration(dur)}
                    className={`py-2 text-center rounded-xl text-xs font-bold transition-all border ${
                      duration === dur
                        ? 'bg-[#86f2e4] text-[#006f66] border-[#86f2e4] shadow-xs'
                        : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850] border-[#dae2fd]/60'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Channel & Referral Source */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 sm:p-5 shadow-sm flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-bold text-[#131b2e]">Booking Source / Channel</label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'walk-in', label: 'Reception Walk-in', icon: 'storefront' },
                { id: 'app', label: 'Patient App Booking', icon: 'smartphone' },
                { id: 'referral', label: 'Referral Hotline', icon: 'support_agent' },
                { id: 'phone', label: 'Phone Call', icon: 'call' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBookingSource(item.id as BookingSource)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-left transition-all border ${
                    bookingSource === item.id
                      ? 'bg-[#cce5ff] text-[#004b73] border-[#93ccff] font-bold shadow-xs'
                      : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850] border-[#dae2fd]/60'
                  }`}
                >
                  <Icon name={item.icon} className="text-[18px]" />
                  <span className="text-xs sm:text-sm font-semibold truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Front-Desk & Clinical Admin Notes */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 sm:p-5 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-[#131b2e]">
                Administrative Front-Desk Notes
              </label>
              <span className="text-xs font-mono text-[#707881]">Internal Only</span>
            </div>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={3}
              className="w-full bg-[#f2f3ff] border border-[#dae2fd]/60 rounded-xl p-3 text-xs sm:text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194] resize-none"
            />
            <p className="text-xs text-[#3f4850] flex items-center gap-1">
              <Icon name="lock" className="text-[14px]" /> Synchronized securely across the dental charting ledger.
            </p>
          </div>

          {/* Conflict Prevention & Safeguard Validation Callout */}
          <div className="bg-[#86f2e4]/30 border border-[#86f2e4] rounded-2xl p-4 shadow-sm flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="shield_with_heart" className="text-[18px]" />
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-bold text-[#006a61]">Schedule Safeguard Cleared</p>
              <p className="text-xs text-[#005049] mt-0.5 leading-relaxed">
                Operatory 01 &amp; Dr. Okoro are confirmed available at {selectedTime}. No double-booking conflict detected.
              </p>
            </div>
          </div>

          {/* Action Trays */}
          <div className="mt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="w-full sm:flex-1 h-12 bg-white hover:bg-[#eaedff] border border-[#bfc7d2]/60 text-[#006194] rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors order-2 sm:order-1"
            >
              <Icon name="bookmark_border" className="text-[18px]" />
              <span>Save Draft &amp; Hold Slot (15m)</span>
            </button>
            <button
              type="submit"
              className="w-full sm:flex-1 h-12 bg-[#006194] hover:bg-[#007bb9] active:scale-[0.99] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all order-1 sm:order-2"
            >
              <Icon name="calendar_month" className="text-[20px]" />
              <span>Confirm &amp; Schedule Appointment</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
