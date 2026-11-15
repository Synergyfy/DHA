import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

interface TimeSlot {
  time: string;
  duration: string;
  status: 'booked' | 'selected' | 'available';
  note?: string;
  fullWidth?: boolean;
}

export function TreatmentSchedulingScreen() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState('18');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHolding, setIsHolding] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const dates = [
    { day: 'Sun', date: '18', active: true, available: true },
    { day: 'Mon', date: '19', active: false, available: true },
    { day: 'Tue', date: '20', active: false, available: true },
    { day: 'Wed', date: '21', active: false, available: true },
    { day: 'Thu', date: '22', active: false, available: true },
    { day: 'Fri', date: '23', active: false, available: false },
    { day: 'Sat', date: '24', active: false, available: true },
  ];

  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', duration: '45m', status: 'booked' },
    { time: '10:00 AM', duration: '45m', status: 'selected' },
    { time: '11:15 AM', duration: '45m', status: 'available' },
    { time: '02:30 PM', duration: '45m', status: 'available' },
    { time: '04:00 PM', duration: '45m', status: 'available', note: 'Late Afternoon Slot', fullWidth: true },
  ];

  const handleBooking = () => {
    showToast(`Appointment confirmed for Sunday, ${selectedDate} Oct 2026 at ${selectedSlot}!`);
    setTimeout(() => {
      navigate('/treatment-plans/appointment-details');
    }, 1200);
  };

  const handleHold = () => {
    setIsHolding(true);
    showToast('Slot placed on temporary 24-hour administrative hold.');
  };

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Scheduling"
      badgeCode="13.15"
      badgeLabel="Operatory Booking"
      currentStep="13.15"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Operatory Selector Banner */}
        <div className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#006194] flex items-center justify-center shrink-0">
              <Icon name="domain" className="text-xl" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Practice</span>
              <span className="text-sm font-bold text-slate-900 truncate block">
                DHA Primary Dental Clinic (Al Wasl) • Operatory 02
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => showToast('Operatory 02 confirmed as primary operative suite')}
            className="h-9 px-3.5 rounded-xl bg-slate-100 text-[#006194] text-xs font-bold flex items-center gap-1 hover:bg-slate-200 transition-colors shrink-0"
          >
            <span>Operatory 02</span>
            <Icon name="expand_more" className="text-base" />
          </button>
        </div>

        {/* Patient Context & Safety Alert Card */}
        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#006194] to-[#004b73] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                AO
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-slate-900">Amara Okafor</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">34y Female</span>
                </div>
                <span className="text-xs text-slate-500">Care Plan #TP-2026-089 • Full Plan Accepted</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-teal-50 text-[#006a61] border border-teal-200 text-xs font-semibold uppercase flex items-center gap-1 shrink-0">
              <Icon name="verified" className="text-sm" />
              Consent Verified
            </span>
          </div>

          {/* Critical Allergy Alert */}
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-center gap-2.5 text-xs font-semibold">
            <Icon name="warning" className="text-red-600 text-lg shrink-0" />
            <span>ALERT: Penicillin Allergy Documented (Direct Anaphylaxis Risk) · Non-Beta-Lactam Regimen</span>
          </div>
        </div>

        {/* Treatment Items Ready for Scheduling */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="assignment_turned_in" className="text-[#006194] text-lg" />
              <h2 className="font-bold text-base text-slate-900">Procedures to Schedule</h2>
            </div>
            <span className="text-xs font-bold text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-full">
              1 Procedure Selected
            </span>
          </div>

          {/* Card 1: Urgent Procedure */}
          <div className="bg-white p-5 rounded-2xl border-2 border-[#006194] shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#006194] text-white flex items-center justify-center shrink-0">
                  <Icon name="check" className="text-sm" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Tooth #16 Direct Biomimetic Resin Composite
                  </h3>
                  <p className="text-xs text-slate-500">Multi-surface composite restoration · Maxillary Right 1st Molar (MO)</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase shrink-0">
                Urgent (&lt; 7 Days)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Icon name="timer" className="text-[#006194] text-base" />
                <span>Estimated Duration: <strong className="text-slate-900">45 Mins</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Icon name="chair" className="text-[#006a61] text-base" />
                <span>Surgical Suite: <strong className="text-slate-900">Operatory 02</strong></span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Operatory Trays Pre-Configured:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">Rubber Dam Kit #4</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">Dual-wavelength LED Light</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">Biomimetic Nano-Hybrid Cart</span>
              </div>
            </div>
          </div>

          {/* Card 2: Dependent / Follow-up Procedure */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 opacity-90 shadow-xs space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                  <Icon name="schedule" className="text-sm" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Tooth #15 Fluoride Varnish &amp; Prophylaxis</h4>
                  <p className="text-xs text-slate-500">Target booking window: 02 Nov 2026 (Phase 2 Recare)</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold shrink-0">
                Phase 2 Dependent
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600 flex items-center gap-2 border border-slate-100">
              <Icon name="link" className="text-[#006a61] text-base shrink-0" />
              <span>Recommended 14 days post-restoration after Tooth #16 seal stabilizes.</span>
            </div>
          </div>
        </div>

        {/* Clinician & Operatory Team Configuration */}
        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900">Assigned Care Delivery Team</span>
            <span className="text-xs text-[#006a61] font-semibold flex items-center gap-1">
              <Icon name="check_circle" className="text-sm" />
              Roster Confirmed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold">
                  DJ
                </div>
                <div>
                  <p className="font-bold text-slate-900">Dr. Daniel James, DDS</p>
                  <p className="text-slate-500 text-[11px]">Lead Restorative Dentist (#DEN-48912)</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#006194] uppercase bg-blue-100 px-2 py-0.5 rounded">Primary</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#006a61] text-white flex items-center justify-center font-bold">
                  ZT
                </div>
                <div>
                  <p className="font-bold text-slate-900">Nurse Zainab Tariq</p>
                  <p className="text-slate-500 text-[11px]">Chairside Surgical Nurse (RN-9428)</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#006a61] uppercase bg-teal-100 px-2 py-0.5 rounded">Assistant</span>
            </div>
          </div>
        </div>

        {/* Calendar & Date Selection Strip */}
        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-base font-bold text-slate-900 block">October 2026</span>
              <span className="text-xs text-slate-500">Urgent restorative appointment window open</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
              >
                <Icon name="chevron_left" className="text-base" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
              >
                <Icon name="chevron_right" className="text-base" />
              </button>
            </div>
          </div>

          {/* Date Buttons */}
          <div className="grid grid-cols-7 gap-2 text-center select-none">
            {dates.map((d) => {
              const isSelected = selectedDate === d.date;
              return (
                <button
                  key={d.date}
                  type="button"
                  disabled={!d.available}
                  onClick={() => d.available && setSelectedDate(d.date)}
                  className={`flex flex-col items-center py-2.5 px-1 rounded-xl transition-all ${
                    !d.available
                      ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#006194] text-white shadow-md scale-102 font-bold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-[11px] uppercase opacity-80">{d.day}</span>
                  <span className="text-base font-bold mt-0.5">{d.date}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1 ${
                      !d.available ? 'bg-transparent' : isSelected ? 'bg-white' : 'bg-[#006a61]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Time Slots */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Available Chairside Slots (Sunday, {selectedDate} Oct)</span>
              <span className="text-slate-500">Operatory 02</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {timeSlots.map((slot) => {
                const isSelected = selectedSlot === slot.time;
                if (slot.status === 'booked') {
                  return (
                    <div
                      key={slot.time}
                      className="p-3 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-between text-xs border border-slate-200/60 opacity-60 cursor-not-allowed"
                    >
                      <div className="flex items-center gap-2">
                        <Icon name="lock" className="text-sm" />
                        <span className="font-medium">{slot.time}</span>
                      </div>
                      <span className="text-[11px]">Booked</span>
                    </div>
                  );
                }

                return (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`p-3 rounded-xl flex items-center justify-between text-xs transition-all ${
                      slot.fullWidth ? 'sm:col-span-2' : ''
                    } ${
                      isSelected
                        ? 'bg-[#006194] text-white shadow-md font-bold'
                        : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        name={isSelected ? 'check_circle' : 'radio_button_unchecked'}
                        className={`text-base ${isSelected ? 'text-white' : 'text-[#006a61]'}`}
                      />
                      <span>{slot.time}</span>
                      {slot.note && <span className="text-[10px] opacity-80">({slot.note})</span>}
                    </div>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                        isSelected ? 'bg-white/20 text-white' : 'text-[#006a61]'
                      }`}
                    >
                      {slot.duration} Free
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Appointment Logistics & Guidance */}
        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-sm space-y-3 text-xs">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Icon name="clinical_notes" className="text-[#006194] text-base" />
            Logistics &amp; Patient Preparation
          </h3>

          <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Pre-Operative Directive</span>
            <p className="text-slate-700 leading-relaxed">
              Advise patient to take a light meal 1 hour prior to local anesthetic. No antibiotic prophylaxis required. Penicillin allergy actively cross-referenced against operatory cart inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
              <Icon name="sms" className="text-[#006194] text-lg shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Automated Dispatch</span>
                <span className="font-semibold text-slate-800">SMS &amp; Push to Amara (+971 50 *** 8491)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="payments" className="text-[#006a61] text-lg shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-[#006a61] uppercase block">Patient Co-Pay</span>
                  <span className="text-[11px] text-slate-600">Due at chairside checkout</span>
                </div>
              </div>
              <span className="text-base font-extrabold text-[#006a61]">AED 170.00</span>
            </div>
          </div>
        </div>

        {/* Booking Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleBooking}
            className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#004b73] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Icon name="calendar_add_on" className="text-lg" />
            <span>Confirm &amp; Book Treatment Appointment</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleHold}
              disabled={isHolding}
              className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#006194] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="lock_clock" className="text-base" />
              <span>{isHolding ? 'Held for 24h' : 'Hold (24h)'}</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Displaying clinic full weekly master schedule...')}
              className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="calendar_view_week" className="text-base" />
              <span>Full Schedule</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/decision-history')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              ← Back to Decisions &amp; Consent History
            </button>
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/appointment-details')}
              className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
            >
              <span>View Appointment Details (13.16)</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
