import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const BranchAssignmentScreen: React.FC = () => {
  const navigate = useNavigate();

  const [primaryBranch, setPrimaryBranch] = useState<'wuse2' | 'maitama' | 'gwarinpa'>('wuse2');
  const [rotationalMaitama, setRotationalMaitama] = useState(true);
  const [rotationalGwarinpa, setRotationalGwarinpa] = useState(false);
  const [syncCalendar, setSyncCalendar] = useState(true);
  const [relinkPrescription, setRelinkPrescription] = useState(true);
  const [effectiveDate, setEffectiveDate] = useState('2026-11-01');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConfirmAssignment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      triggerToast('Branch assignment synchronized successfully with MDCN registry');
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/staff-management/branches');
      }, 1800);
    }, 1200);
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-['Inter'] antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-[9999] bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in text-sm font-medium border border-white/10">
          <Icon name="info" className="text-[#89f5e7] text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#eaedff]">
        <div className="max-w-4xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/staff-management/branches')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff] transition-colors"
              title="Go back"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg md:text-xl text-[#131b2e] truncate">
              Branch Assignment
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast('Deployment options')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="more_vert" className="text-xl" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 pt-20 pb-20">
        <div className="flex flex-col gap-5">
          {/* Staff Profile & Current Deployment Card */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-[#cce5ff] text-[#006194] flex items-center justify-center font-['Plus_Jakarta_Sans'] font-bold text-xl shadow-xs">
                  MA
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center shadow-xs">
                  <Icon name="verified" className="text-xs" filled />
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="font-['Plus_Jakarta_Sans'] text-lg md:text-xl font-bold text-[#131b2e] truncate">
                  Dr. Michael Adeyemi
                </h2>
                <p className="text-xs md:text-sm text-[#707881] truncate">
                  Restorative Lead • DDS, Senior Consultant
                </p>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-semibold">
                    <Icon name="verified_user" className="text-xs" filled />
                    MDCN #DEN-78421
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850] text-xs font-mono">
                    #STF-ADE-01
                  </span>
                </div>
              </div>
            </div>

            {/* Active Deployment Micro-Summary */}
            <div className="mt-4 pt-3 border-t border-[#eaedff] bg-[#f2f3ff] rounded-xl p-3.5 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#707881] block">Active Primary Base</span>
                  <span className="text-xs md:text-sm font-semibold text-[#131b2e]">Harmony Dental Clinic — Wuse 2</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white text-[#006194] font-semibold shadow-xs">
                HQ Operatory 01
              </span>
            </div>
          </div>

          {/* Form Section 1: Primary Branch Selection */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                  Primary Assignment
                </h3>
                <p className="text-xs text-[#707881]">
                  Central facility for clinical authorship, scheduling lead & supply logs
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#006194] uppercase tracking-wide bg-[#cce5ff] px-2 py-0.5 rounded-full">
                Required
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {/* Option 1: Wuse 2 */}
              <label
                className={`relative flex items-start gap-3.5 p-4 rounded-xl cursor-pointer transition-all border ${
                  primaryBranch === 'wuse2'
                    ? 'border-[#006194] bg-[#f2f3ff]/70 shadow-xs'
                    : 'border-[#eaedff] hover:bg-[#faf8ff]'
                }`}
              >
                <input
                  type="radio"
                  name="primary_branch"
                  value="wuse2"
                  checked={primaryBranch === 'wuse2'}
                  onChange={() => setPrimaryBranch('wuse2')}
                  className="mt-1 accent-[#006194]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-[#131b2e]">Harmony Dental Clinic — Wuse 2</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#004b73] text-[11px] font-bold">
                      Current HQ
                    </span>
                  </div>
                  <p className="text-xs text-[#707881] mt-1">Plot 1042 Aminu Kano Cres • 5 Operatories • Digital OPG Lab</p>
                  <div className="mt-2.5 flex items-center gap-3 text-xs text-[#3f4850]">
                    <span className="flex items-center gap-1">
                      <Icon name="dentistry" className="text-xs text-[#006a61]" />
                      Chairside Lead
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="groups" className="text-xs text-[#006194]" />
                      8 Residents
                    </span>
                  </div>
                </div>
              </label>

              {/* Option 2: Maitama */}
              <label
                className={`relative flex items-start gap-3.5 p-4 rounded-xl cursor-pointer transition-all border ${
                  primaryBranch === 'maitama'
                    ? 'border-[#006194] bg-[#f2f3ff]/70 shadow-xs'
                    : 'border-[#eaedff] hover:bg-[#faf8ff]'
                }`}
              >
                <input
                  type="radio"
                  name="primary_branch"
                  value="maitama"
                  checked={primaryBranch === 'maitama'}
                  onChange={() => setPrimaryBranch('maitama')}
                  className="mt-1 accent-[#006194]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-[#131b2e]">Harmony Specialist Centre — Maitama</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850] text-[11px] font-semibold">
                      Specialty Hub
                    </span>
                  </div>
                  <p className="text-xs text-[#707881] mt-1">8 Gana Street • 4 Operatories • CBCT & Surgical Suite</p>
                </div>
              </label>

              {/* Option 3: Gwarinpa */}
              <label
                className={`relative flex items-start gap-3.5 p-4 rounded-xl cursor-pointer transition-all border ${
                  primaryBranch === 'gwarinpa'
                    ? 'border-[#006194] bg-[#f2f3ff]/70 shadow-xs'
                    : 'border-[#eaedff] hover:bg-[#faf8ff]'
                }`}
              >
                <input
                  type="radio"
                  name="primary_branch"
                  value="gwarinpa"
                  checked={primaryBranch === 'gwarinpa'}
                  onChange={() => setPrimaryBranch('gwarinpa')}
                  className="mt-1 accent-[#006194]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-[#131b2e]">Harmony Dental Outpost — Gwarinpa</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850] text-[11px] font-semibold">
                      Satellite
                    </span>
                  </div>
                  <p className="text-xs text-[#707881] mt-1">3rd Avenue Block B • 2 Operatories • Ambulatory Care</p>
                </div>
              </label>
            </div>
          </section>

          {/* Form Section 2: Rotational Facilities */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
              Rotational Facilities
            </h3>
            <p className="text-xs text-[#707881] mb-4">
              Cross-branch clinical privileges and patient charting rights
            </p>

            <div className="grid grid-cols-1 gap-3">
              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f2f3ff] cursor-pointer hover:bg-[#eaedff] transition-colors">
                <input
                  type="checkbox"
                  checked={rotationalMaitama}
                  onChange={(e) => setRotationalMaitama(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#006a61]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs md:text-sm text-[#131b2e]">Maitama Specialist Centre</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66]">
                      Rotational Active
                    </span>
                  </div>
                  <p className="text-xs text-[#707881] mt-0.5">Assigned 2 sessions/week • Microscope Suite 2</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f2f3ff] cursor-pointer hover:bg-[#eaedff] transition-colors">
                <input
                  type="checkbox"
                  checked={rotationalGwarinpa}
                  onChange={(e) => setRotationalGwarinpa(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#006a61]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs md:text-sm text-[#131b2e]">Gwarinpa Outpost</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850]">
                      On-Call Backup
                    </span>
                  </div>
                  <p className="text-xs text-[#707881] mt-0.5">Emergency endodontic escalation privileges</p>
                </div>
              </label>
            </div>
          </section>

          {/* Form Section 3: Duty Scope by Location */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                Duty Scope by Location
              </h3>
              <span className="text-xs font-mono text-[#707881]">2 Stations Configured</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Wuse 2 Card */}
              <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#004b73] flex items-center justify-center">
                        <Icon name="medical_services" className="text-base" />
                      </div>
                      <span className="font-semibold text-xs md:text-sm text-[#131b2e]">Wuse 2 Clinic (Primary HQ)</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#006194]">Mon – Fri</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#3f4850] mt-3">
                    <div className="flex items-start gap-2">
                      <Icon name="badge" className="text-sm text-[#006194] mt-0.5 shrink-0" />
                      <p><span className="font-semibold text-[#131b2e]">Role:</span> Restorative Lead & Operatory 01 Principal</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="schedule" className="text-sm text-[#006a61] mt-0.5 shrink-0" />
                      <p className="text-[#707881]">Full daily schedule (08:30 – 16:30) • Final clinical sign-off for prosthetic lab fabrications</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maitama Card */}
              <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#86f2e4] text-[#006f66] flex items-center justify-center">
                        <Icon name="biotech" className="text-base" />
                      </div>
                      <span className="font-semibold text-xs md:text-sm text-[#131b2e]">Maitama Specialist Centre</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#006a61]">Wed & Alt Sat</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#3f4850] mt-3">
                    <div className="flex items-start gap-2">
                      <Icon name="psychology_alt" className="text-sm text-[#006a61] mt-0.5 shrink-0" />
                      <p><span className="font-semibold text-[#131b2e]">Role:</span> Visiting Endodontic & Restorative Consultant</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="event_repeat" className="text-sm text-[#006194] mt-0.5 shrink-0" />
                      <p className="text-[#707881]">Complex micro-endodontics & retreatment referrals (10:00 – 17:00)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Form Section 4: Effective Date & Transition Protocol */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                  Effective Date & Cutover
                </h3>
                <p className="text-xs text-[#707881]">Schedule alignment & slot reassignment</p>
              </div>
              <Icon name="calendar_month" className="text-xl text-[#006194]" />
            </div>

            {/* Date Picker */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">
                Effective Commencement Date
              </label>
              <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <Icon name="event_available" className="text-lg text-[#006194]" />
                  <input
                    type="date"
                    value={effectiveDate}
                    onChange={(e) => setEffectiveDate(e.target.value)}
                    className="bg-transparent text-sm font-semibold text-[#131b2e] focus:outline-none"
                  />
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white text-[#707881] font-medium shadow-xs">
                  In 14 Days
                </span>
              </div>
            </div>

            {/* Transition Protocol Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f2f3ff] cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={syncCalendar}
                  onChange={(e) => setSyncCalendar(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded accent-[#006194]"
                />
                <div className="min-w-0 text-xs">
                  <span className="font-semibold text-[#131b2e] block">
                    Sync chairside schedule with Wuse 2 operatory calendar
                  </span>
                  <span className="text-[#707881] block mt-0.5">
                    Automatically moves 14 pre-booked consultation buffers to Dr. Adeyemi's slot without patient reschedule SMS.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f2f3ff] cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={relinkPrescription}
                  onChange={(e) => setRelinkPrescription(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded accent-[#006194]"
                />
                <div className="min-w-0 text-xs">
                  <span className="font-semibold text-[#131b2e] block">
                    Re-link digital prescription pad to Maitama hub
                  </span>
                  <span className="text-[#707881] block mt-0.5">
                    Authorizes compound controlled pharmacy requests during visiting Wednesday clinics.
                  </span>
                </div>
              </label>
            </div>
          </section>

          {/* Safeguards Notice */}
          <div className="bg-[#eaedff] rounded-2xl p-4 md:p-5 flex items-start gap-3.5 border border-[#dae2fd]">
            <div className="w-8 h-8 rounded-lg bg-white text-[#006194] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Icon name="shield_with_heart" className="text-lg" />
            </div>
            <div className="text-xs text-[#3f4850] space-y-1">
              <h4 className="font-semibold text-[#131b2e]">Audit & Integrity Governance</h4>
              <p className="leading-relaxed">
                Changing primary facility re-anchors patient intake routing, dental nurse allocations, and operatory inventory requisitions. 
                <strong className="text-[#131b2e]"> Historical odontograms, signed charting notes, and surgical records</strong> remain immutable under MDCN credential #DEN-78421 across all Harmony Dental branches.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleConfirmAssignment}
              disabled={isSubmitting || isSuccess}
              className={`w-full sm:flex-1 h-12 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all ${
                isSuccess
                  ? 'bg-[#006a61] text-white'
                  : 'bg-[#006194] hover:bg-[#007bb9] text-white'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Icon name="progress_activity" className="text-lg animate-spin" />
                  <span>Updating MDCN Registry...</span>
                </>
              ) : isSuccess ? (
                <>
                  <Icon name="task_alt" className="text-lg" />
                  <span>Assignment Synchronized</span>
                </>
              ) : (
                <>
                  <Icon name="check_circle" className="text-lg" />
                  <span>Confirm Branch Assignment</span>
                </>
              )}
            </button>
            <button
              onClick={() => navigate('/staff-management/branches')}
              className="w-full sm:flex-1 h-12 rounded-xl bg-white hover:bg-[#f2f3ff] text-[#3f4850] border border-[#eaedff] text-xs md:text-sm font-semibold flex items-center justify-center transition-colors"
            >
              Cancel & Keep Current Assignment
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
