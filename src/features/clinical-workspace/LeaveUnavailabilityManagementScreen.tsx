import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

interface LeaveHistoryItem {
  id: string;
  category: string;
  dates: string;
  daysCount: number;
  status: 'approved' | 'pending' | 'completed' | 'rejected';
  coveringDoctor: string;
  reason: string;
}

const PAST_LEAVE: LeaveHistoryItem[] = [
  {
    id: 'lv-1',
    category: 'CME / Scientific Conference',
    dates: '28 Nov – 03 Dec 2026',
    daysCount: 6,
    status: 'pending',
    coveringDoctor: 'Dr. Karim Okoye (DDS)',
    reason: 'Greater New York Dental Meeting (GNYDM) 2026 - Speaker & Hands-on Workshop attendee.',
  },
  {
    id: 'lv-2',
    category: 'Annual Vacation',
    dates: '14 Aug – 22 Aug 2026',
    daysCount: 8,
    status: 'completed',
    coveringDoctor: 'Dr. Adaeze Okafor (BDS)',
    reason: 'Summer family recess. Handover completed and patient follow-ups cleared.',
  },
  {
    id: 'lv-3',
    category: 'CME / Scientific Conference',
    dates: '12 Mar – 14 Mar 2026',
    daysCount: 3,
    status: 'completed',
    coveringDoctor: 'Dr. Karim Okoye (DDS)',
    reason: 'Nigerian Dental Association Conference.',
  },
];

export function LeaveUnavailabilityManagementScreen() {
  const navigate = useNavigate();

  // Form state
  const [leaveType, setLeaveType] = useState('Annual Vacation');
  const [startDate, setStartDate] = useState('2026-12-20');
  const [endDate, setEndDate] = useState('2026-12-28');
  const [coveringClinician, setCoveringClinician] = useState('Dr. Karim Okoye (DDS, Prosthodontics)');
  const [handoffNotes, setHandoffNotes] = useState(
    'All active restorative cases reviewed. Emergency crown recementations and post-op checks designated to covering clinician.'
  );
  const [selectedClinics, setSelectedClinics] = useState<string[]>([
    'Harmony Dental Clinic (Wuse 2)',
    'Harmony Specialists Clinic (Victoria Island)',
  ]);

  // Request Submission State
  const [submitted, setSubmitted] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState<LeaveHistoryItem[]>(PAST_LEAVE);

  const toggleClinic = (clinic: string) => {
    if (selectedClinics.includes(clinic)) {
      if (selectedClinics.length > 1) {
        setSelectedClinics(selectedClinics.filter((c) => c !== clinic));
      }
    } else {
      setSelectedClinics([...selectedClinics, clinic]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: LeaveHistoryItem = {
      id: `lv-${Date.now()}`,
      category: leaveType,
      dates: `${startDate} to ${endDate}`,
      daysCount: 7,
      status: 'pending',
      coveringDoctor: coveringClinician.split(' (')[0],
      reason: handoffNotes,
    };
    setLeaveHistory([newRecord, ...leaveHistory]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <ClinicalWorkspaceShell
      pageTitle="Leave & Unavailability Management"
      badgeCode="14.18"
      badgeLabel="Caseload Continuity & Absence"
      activeNav="calendar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#707881]">
            <button
              type="button"
              onClick={() => navigate('/dentist/schedule')}
              className="hover:text-[#006194] transition-colors"
            >
              Working Schedule
            </button>
            <Icon name="chevron_right" className="text-[14px]" />
            <span className="font-semibold text-[#131b2e]">Leave &amp; Absence Protocol</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/dentist/calendar')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#f2f3ff] text-[#006194] text-xs font-semibold border border-[#eaedff] flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Icon name="calendar_month" className="text-[16px]" />
              <span>Back to Calendar</span>
            </button>
          </div>
        </div>

        {/* Top Statutory Patient Protection Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#ffdad6]/40 border border-[#ba1a1a]/30 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Icon name="shield" className="text-[20px]" />
          </div>
          <div className="flex-1 text-xs">
            <h4 className="font-bold text-[#93000a] text-sm">
              DHA Patient Safeguard Protocol (DHA-REG-18.4)
            </h4>
            <p className="text-[#93000a]/90 mt-1 leading-relaxed">
              Submitting absence requests automatically triggers an appointment conflict audit. All booked patients
              affected during the planned absence window must either be transitioned to a verified covering clinician
              or proactively rescheduled before final approval is granted by the Medical Director.
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {submitted && (
          <div className="p-4 bg-[#86f2e4]/30 border border-[#86f2e4] text-[#006f66] rounded-2xl flex items-center gap-3 animate-in fade-in">
            <Icon name="check_circle" className="text-[20px]" />
            <span className="text-xs font-bold">
              Leave request submitted! Appointment conflict resolution plan sent to Medical Director &amp; Dr. Karim Okoye for endorsement.
            </span>
          </div>
        )}

        {/* Leave Entitlements Bento Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 bg-white rounded-2xl border border-[#eaedff] shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
              Annual Vacation
            </div>
            <div className="text-xl font-bold text-[#131b2e] mt-1">18 / 25 Days</div>
            <div className="text-[10px] text-[#006a61] font-semibold mt-0.5">Remaining</div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#eaedff] shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
              CME / Scientific Leave
            </div>
            <div className="text-xl font-bold text-[#006194] mt-1">4 / 7 Days</div>
            <div className="text-[10px] text-[#006194] font-semibold mt-0.5">Remaining</div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#eaedff] shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
              Medical / Sick Leave
            </div>
            <div className="text-xl font-bold text-[#131b2e] mt-1">10 Days</div>
            <div className="text-[10px] text-[#707881] font-medium mt-0.5">Accrued Entitlement</div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#eaedff] shadow-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
              Public &amp; Statutory
            </div>
            <div className="text-xl font-bold text-[#131b2e] mt-1">6 Days</div>
            <div className="text-[10px] text-[#707881] font-medium mt-0.5">Nigeria Calendar 2026</div>
          </div>
        </div>

        {/* Main Grid: Application Form + Appointment Conflict Scanner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Request Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#eaedff] p-6 lg:p-7 shadow-sm space-y-5">
            <div className="pb-3 border-b border-[#eaedff]">
              <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
                <Icon name="edit_calendar" className="text-[20px] text-[#006194]" />
                <span>Request Time Off &amp; Continuity Protocol</span>
              </h2>
              <p className="text-xs text-[#707881] mt-0.5">
                Define absence dates, affected practices, and clinical handover arrangements.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Leave Type */}
              <div>
                <label className="block font-bold text-[#131b2e] mb-1">
                  Absence / Leave Classification
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
                >
                  <option>Annual Vacation</option>
                  <option>CME / Scientific Conference</option>
                  <option>Medical / Sick Leave</option>
                  <option>Compassionate / Emergency</option>
                  <option>Academic Fellowship / Examination</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">
                    First Day of Absence
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">
                    Return to Practice Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
                  />
                </div>
              </div>

              {/* Clinics Affected */}
              <div>
                <label className="block font-bold text-[#131b2e] mb-1">
                  Facilities Covered by Absence
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {['Harmony Dental Clinic (Wuse 2)', 'Harmony Specialists Clinic (Victoria Island)'].map(
                    (clinic) => {
                      const selected = selectedClinics.includes(clinic);
                      return (
                        <button
                          key={clinic}
                          type="button"
                          onClick={() => toggleClinic(clinic)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                            selected
                              ? 'bg-[#006194] text-white border-[#006194]'
                              : 'bg-white text-[#3f4850] border-[#eaedff] hover:bg-[#f2f3ff]'
                          }`}
                        >
                          {selected && <Icon name="check" className="text-[13px] inline mr-1" />}
                          <span>{clinic}</span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Covering Attending Clinician */}
              <div>
                <label className="block font-bold text-[#131b2e] mb-1">
                  Designated Covering Attending Clinician
                </label>
                <select
                  value={coveringClinician}
                  onChange={(e) => setCoveringClinician(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
                >
                  <option>Dr. Karim Okoye (DDS, Prosthodontics) • License #DEN-38102</option>
                  <option>Dr. Adaeze Okafor (BDS, Restorative) • License #DEN-41908</option>
                  <option>Dr. Tariq Qureshi (BDS, Oral Surgery) • License #DEN-50219</option>
                </select>
                <p className="text-[10px] text-[#707881] mt-1">
                  Covering doctor must possess comparable DHA clinical privileges for emergency patient coverage.
                </p>
              </div>

              {/* Clinical Justification / Handoff */}
              <div>
                <label className="block font-bold text-[#131b2e] mb-1">
                  Clinical Handoff &amp; Case Notes
                </label>
                <textarea
                  rows={3}
                  value={handoffNotes}
                  onChange={(e) => setHandoffNotes(e.target.value)}
                  className="w-full p-3 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194] resize-none leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-[#eaedff] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/dentist/schedule')}
                  className="px-4 py-2.5 rounded-xl border border-[#eaedff] bg-white text-xs font-bold text-[#3f4850] hover:bg-[#f2f3ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] shadow-sm flex items-center gap-1.5"
                >
                  <Icon name="send" className="text-[16px]" />
                  <span>Submit Leave Request with Handoff Plan</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column (5 cols): Live Appointment Conflict Scanner */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl border border-[#eaedff] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ea580c] animate-pulse"></div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">
                    Appointment Conflict Scanner
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#ffdcc2] text-[#9a4500] text-[10px] font-bold">
                  4 Conflicts Detected
                </span>
              </div>

              <p className="text-xs text-[#707881] leading-relaxed">
                4 patient encounters are currently scheduled within the requested window ({startDate} to {endDate}). Proposed resolution status:
              </p>

              <div className="space-y-2.5 text-xs">
                {[
                  {
                    patient: 'Marcus Vance',
                    proc: 'Crown Delivery (#14)',
                    resolution: 'Transferred to Dr. Karim Okoye',
                    status: 'Resolved',
                    color: 'text-[#006a61] bg-[#86f2e4]/30',
                  },
                  {
                    patient: 'Elena Rostova',
                    proc: 'Suture Removal (#36)',
                    resolution: 'Auto-reassigned to Hygienist Leyla',
                    status: 'Resolved',
                    color: 'text-[#006a61] bg-[#86f2e4]/30',
                  },
                  {
                    patient: 'Tariq Latif',
                    proc: 'Root Canal Obturation',
                    resolution: 'Patient agreed to move to Jan 3',
                    status: 'Rescheduled',
                    color: 'text-[#006194] bg-[#cce5ff]/50',
                  },
                  {
                    patient: 'Aisha Bin Salem',
                    proc: 'Routine Periodic Exam',
                    resolution: 'SMS / WhatsApp recall dispatch queued',
                    status: 'Pending Call',
                    color: 'text-[#9a4500] bg-[#ffdcc2]',
                  },
                ].map((conf, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-[#131b2e]">{conf.patient}</strong>
                      <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold ${conf.color}`}>
                        {conf.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#707881]">{conf.proc}</div>
                    <div className="text-[11px] text-[#006194] font-medium pt-0.5">
                      ↳ {conf.resolution}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[#f2f3ff] text-[11px] text-[#707881] flex items-center gap-1.5">
                <Icon name="check_circle" className="text-[14px] text-[#006a61]" />
                <span>Caseload coverage compliant with DHA Clinical Continuity Guideline.</span>
              </div>
            </div>

            {/* Leave Policy PDF Download Box */}
            <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs">
                <Icon name="picture_as_pdf" className="text-[20px] text-[#006194]" />
                <div>
                  <div className="font-bold text-[#131b2e]">DHA Leave &amp; Continuity Policy</div>
                  <div className="text-[10px] text-[#707881]">PDF • Version 2026.2 (1.4 MB)</div>
                </div>
              </div>
              <button
                type="button"
                className="px-2.5 py-1.5 bg-white hover:bg-[#eaedff] text-[#006194] text-xs font-semibold rounded-lg border border-[#eaedff] transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Leave History & Status Ledger */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 lg:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
            <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="history" className="text-[20px] text-[#006194]" />
              <span>Leave Application History &amp; Status</span>
            </h2>
            <span className="font-mono text-xs text-[#707881]">
              {leaveHistory.length} Recorded Leaves
            </span>
          </div>

          <div className="space-y-3">
            {leaveHistory.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#131b2e]">{item.category}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'approved' || item.status === 'completed'
                          ? 'bg-[#86f2e4]/30 text-[#006f66]'
                          : 'bg-[#ffdcc2] text-[#9a4500]'
                      }`}
                    >
                      {item.status === 'completed'
                        ? 'Completed & Reconciled'
                        : item.status === 'approved'
                        ? 'Approved by Medical Director'
                        : 'Pending Medical Director Approval'}
                    </span>
                  </div>

                  <div className="text-xs font-mono font-semibold text-[#006194]">
                    {item.dates} ({item.daysCount} Days)
                  </div>

                  <div className="text-xs text-[#707881]">{item.reason}</div>
                </div>

                <div className="text-left md:text-right shrink-0 text-xs">
                  <div className="text-[#707881] text-[10px] uppercase font-bold">
                    Covering Clinician
                  </div>
                  <div className="font-semibold text-[#131b2e] mt-0.5">{item.coveringDoctor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ClinicalWorkspaceShell>
  );
}
