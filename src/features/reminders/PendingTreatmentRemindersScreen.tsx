import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { RemindersSubNav } from './RemindersSubNav';
import { Icon } from '../../design/Primitives';

type TreatmentCategory = 'all' | 'recommended' | 'awaiting' | 'scheduled' | 'archive';

export function PendingTreatmentRemindersScreen() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>('all');
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryText, setInquiryText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendInquiry = () => {
    if (!inquiryText.trim()) return;
    setInquiryOpen(false);
    setInquiryText('');
    showToast('Secure clinical inquiry forwarded to Lagos Smile Dental Centre. Clinician response within 24h.');
  };

  return (
    <DashboardShell pageTitle="Pending Treatment Reminders">
      <RemindersSubNav />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 z-50 max-w-md p-3.5 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl flex items-center gap-3 animate-fade-in">
          <Icon name="check_circle" className="text-[20px] text-secondary shrink-0" />
          <span className="font-body-sm text-body-sm leading-snug">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Intro Banner */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1 font-bold">
              <Icon name="health_and_safety" filled className="text-[13px]" />
              DHA Clinical Roadmaps
            </span>
            <span className="text-on-surface-variant font-label-sm text-label-sm">
              Updated Today, 08:30 AM
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-md sm:text-headline-lg text-on-surface tracking-tight mt-0.5">
            Pending Treatments &amp; Care Roadmaps
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Actionable clinician directives, reminders &amp; treatment follow-ups synchronized across DHA accredited dental clinics.
          </p>
        </div>

        {/* Care Protocol Context Callout Banner */}
        <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl flex items-start gap-3.5 border border-outline-variant/20 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0 shadow-2xs">
            <Icon name="verified_user" className="text-[22px]" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-title-sm text-title-sm text-on-surface font-bold">
              Transparent Governance Distinction
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
              Explicit dentist directives are labeled separately from automated DHA preventive recall schedules.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All', count: 4 },
            { id: 'recommended', label: 'Recommended', count: 1 },
            { id: 'awaiting', label: 'Awaiting Booking', count: 1 },
            { id: 'scheduled', label: 'Scheduled', count: 1 },
            { id: 'archive', label: 'Archive', count: 1 },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as TreatmentCategory)}
              className={`shrink-0 px-4 py-2 rounded-xl font-label-md text-label-md flex items-center gap-1.5 transition-all shadow-xs ${
                activeCategory === cat.id
                  ? 'bg-primary text-on-primary font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeCategory === cat.id
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Column (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* CARD 1: Recommended Preventive Pit & Fissure Sealant */}
            {(activeCategory === 'all' || activeCategory === 'recommended') && (
              <div className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
                <div className="p-5 sm:p-6 flex flex-col gap-4">
                  {/* Status Band */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm flex items-center gap-1.5 font-bold shadow-2xs">
                      <Icon name="new_releases" className="text-[14px]" />
                      Recommended
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                      <Icon name="event" className="text-[15px]" />
                      Dec 12, 2024
                    </span>
                  </div>

                  {/* Directive Content */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col min-w-0">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Preventive Pit &amp; Fissure Sealant
                      </h2>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-primary-fixed text-on-primary-fixed font-label-code text-label-code font-bold">
                          Tooth #36
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Lower Left 1st Molar
                        </span>
                      </div>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-surface-container-high overflow-hidden shrink-0 shadow-inner">
                      <img
                        className="w-full h-full object-cover"
                        alt="Macro dental photo of posterior lower molar tooth"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNHc7rvuoSiHkKn8ZUVm-p8apIfaUO5N51Qd8C0Gq1b8T0d3VOgBYZy1vAqXUvmz-TySd_NGmqwQ4TmbTG1dw3g1VeeNNgdKpmRIORt0x6bYqR8bgP6BmdC3bHul8vJYD8IgTY73GRRjR51MptY82-4fBewBy28ow_0C_Ix6L99sd5fISsW1L3F9PcxOK8s653pZEP7CaDTbfATXyGhJZaieFnejAs98fgpdLXw66t"
                      />
                    </div>
                  </div>

                  {/* Clinician Instruction Callout */}
                  <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-1 border border-outline-variant/20">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Icon name="assignment_turned_in" className="text-[18px]" />
                      <span className="font-label-md text-label-md uppercase tracking-wider font-bold">
                        Dentist Follow-up Instruction
                      </span>
                    </div>
                    <p className="font-title-sm text-title-sm text-on-surface font-semibold pt-0.5">
                      Action Recommended: Within 30–60 Days
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Deep occlusal fissure staining noted during exam; non-invasive sealant strongly recommended to arrest demineralization.
                    </p>
                  </div>

                  {/* Coverage & Doctor */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col border border-outline-variant/20">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Attending Clinician
                      </span>
                      <span className="font-title-sm text-title-sm text-on-surface font-bold truncate">
                        Dr. Chinedu Okafor
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                        Lagos Smile Dental Centre
                      </span>
                    </div>
                    <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col border border-outline-variant/20">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Coverage Pre-approval
                      </span>
                      <div className="flex items-center gap-1">
                        <Icon name="check_circle" className="text-secondary text-[16px]" />
                        <span className="font-title-sm text-title-sm text-secondary font-bold truncate">
                          100% DHA NHIA
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        NHIA Primary Cover Eligible
                      </span>
                    </div>
                  </div>

                  {/* Expandable Clinician Inquiry Drawer */}
                  {inquiryOpen && (
                    <div className="flex flex-col gap-3 bg-surface-container p-4 rounded-xl border border-outline-variant/30 animate-scale-up">
                      <div className="flex items-center justify-between">
                        <span className="font-title-sm text-title-sm text-on-surface font-bold">
                          Secure Clinical Query
                        </span>
                        <button
                          type="button"
                          onClick={() => setInquiryOpen(false)}
                          className="text-on-surface-variant hover:text-on-surface"
                        >
                          <Icon name="close" className="text-[18px]" />
                        </button>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Submit a direct query to Dr. Chinedu Okafor regarding prep, pain concerns, or anesthesia requirements.
                      </p>
                      <input
                        type="text"
                        value={inquiryText}
                        onChange={(e) => setInquiryText(e.target.value)}
                        placeholder="Type your message to clinic..."
                        className="w-full h-11 px-3.5 bg-surface-container-lowest text-on-surface rounded-xl font-body-sm text-body-sm border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={handleSendInquiry}
                        className="h-10 px-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 self-end shadow-xs hover:bg-primary-container"
                      >
                        <span>Send Direct Question</span>
                        <Icon name="send" className="text-[16px]" />
                      </button>
                    </div>
                  )}

                  {/* Action Footer */}
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <NavLink
                      to="/patient-dashboard/quick-actions"
                      className="flex-1 h-12 bg-primary text-on-primary rounded-xl font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-primary-container active:scale-[0.98] transition-transform"
                    >
                      <Icon name="calendar_month" className="text-[20px]" />
                      <span>Book Procedure Now</span>
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => setInquiryOpen(!inquiryOpen)}
                      className="h-12 px-4 bg-surface-container-highest text-on-surface rounded-xl font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container"
                    >
                      <Icon name="chat_bubble" className="text-[18px] text-primary" />
                      <span>Ask Clinician</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CARD 2: Ultrasonic Scaling & Quadrant Polishing */}
            {(activeCategory === 'all' || activeCategory === 'awaiting') && (
              <div className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
                <div className="p-5 sm:p-6 flex flex-col gap-4">
                  {/* Status Band */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm flex items-center gap-1.5 font-bold shadow-2xs">
                      <Icon name="pending_actions" className="text-[14px]" />
                      Awaiting Appointment
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                      <Icon name="history" className="text-[15px]" />
                      Logged Dec 12, 2024
                    </span>
                  </div>

                  {/* Core Content */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col min-w-0">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Ultrasonic Scaling &amp; Quadrant Polishing
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-code text-label-code font-semibold">
                          Full Mouth
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Lower Anterior Lingual Focus
                        </span>
                      </div>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-surface-container-high overflow-hidden shrink-0 shadow-inner">
                      <img
                        className="w-full h-full object-cover"
                        alt="Ultrasonic scaler instrument tip"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEYF4tXwwEU651TbkpBQdEh52ghKneE4kXy3BQGkpx7t7sPmoh4F48JrCyYqyZa-47zEEMpGbIITVLWl26NTSo6sUEhapY6n18LZE6omrgISR1800NX06mjmWXbhgQUVrk0pvluCLxHN_ldNsTl_WWo8eBJiyIlG0eWeTyemvY5oONS11PFL7IV9C9kpVLAgacVfrGHgTrPkbbTOJjetXJKKqvAMGtygDFGJ8ou-DH"
                      />
                    </div>
                  </div>

                  {/* Origin Badge */}
                  <div className="bg-surface-container p-4 rounded-xl flex items-start gap-3 border border-outline-variant/20">
                    <Icon name="info" className="text-primary text-[20px] shrink-0 mt-0.5" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-label-md text-primary font-bold">
                        DHA System Follow-up Reminder
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                        Default 4-Month Interval • Not New Clinical Advice. Generated per Nigeria Dental Health Authority preventive oral hygiene guidelines.
                      </p>
                    </div>
                  </div>

                  {/* Facility Recommendation */}
                  <div className="bg-surface-container-low p-3.5 rounded-xl flex items-center justify-between border border-outline-variant/20">
                    <div className="flex items-center gap-3">
                      <Icon name="local_hospital" className="text-on-surface-variant text-[22px]" />
                      <div className="flex flex-col">
                        <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                          Available at 18 DHA Network Clinics
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Nearest: Nad Al Sheba Health Center (3.2 km)
                        </span>
                      </div>
                    </div>
                  </div>

                  <NavLink
                    to="/patient-dashboard/quick-actions"
                    className="w-full h-12 bg-primary text-on-primary rounded-xl font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-primary-container active:scale-[0.98] transition-transform"
                  >
                    <Icon name="search" className="text-[20px]" />
                    <span>Find Available Slots</span>
                  </NavLink>
                </div>
              </div>
            )}

            {/* CARD 3: Enamel Fluoride Touchup (Scheduled) */}
            {(activeCategory === 'all' || activeCategory === 'scheduled') && (
              <div className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
                <div className="p-5 sm:p-6 flex flex-col gap-4">
                  {/* Status Band */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1.5 font-bold shadow-2xs">
                      <Icon name="event_available" className="text-[14px]" />
                      Scheduled
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-surface-container-high font-label-code text-label-code text-on-surface-variant">
                      Ref: DHA-APPT-8821
                    </span>
                  </div>

                  {/* Core Content */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col min-w-0">
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Enamel Fluoride Touchup &amp; Remineralization
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-code text-label-code font-semibold">
                          General Dentition
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Topical Varnish Application
                        </span>
                      </div>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-surface-container-high overflow-hidden shrink-0 shadow-inner">
                      <img
                        className="w-full h-full object-cover"
                        alt="Dental topical fluoride varnish"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf1n2DnhXqjRIScJimnJC9D0tnU41I8OaOBGIyjYpNwKM7bHrWxkfU1AnomQo7IkEgo2M0A87VgeCwY-RWX2ONtomsaIARTWR8eyW9tGjDnd8K3EvCRFdAihBlCd4TpirSd_1M_wjzFp4hdIRw4r0z3GI6GzkonQSku16t7_bGpSboE7OYf0tSb1mRRlzUciaL-Uotv1KCbWF85l93whds6RMdfEUD_ucqKF0ZfbSc"
                      />
                    </div>
                  </div>

                  {/* Time Block */}
                  <div className="bg-secondary-container/30 p-4 rounded-xl flex items-center gap-3 border border-secondary/20">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center shrink-0 text-secondary shadow-2xs">
                      <Icon name="calendar_clock" className="text-[22px]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-title-sm text-title-sm text-on-surface font-bold">
                        Jan 24, 2025 at 10:30 AM
                      </span>
                      <span className="font-body-sm text-body-sm text-on-secondary-container">
                        Lagos Smile Dental Centre • Room 04 (Dr. Chinedu Okafor)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-on-surface-variant px-1 font-body-sm">
                    <span className="flex items-center gap-1.5">
                      <Icon name="notifications_active" className="text-[17px] text-secondary" />
                      SMS &amp; App Reminder Activated
                    </span>
                    <span className="font-label-sm text-[11px]">48h advance alert</span>
                  </div>

                  <NavLink
                    to="/patient-dashboard/reminders/appointments"
                    className="w-full h-12 bg-surface-container-highest text-on-surface rounded-xl font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 hover:bg-surface-container transition-colors"
                  >
                    <Icon name="badge" className="text-[20px] text-primary" />
                    <span>View Appointment Details</span>
                  </NavLink>
                </div>
              </div>
            )}

            {/* CARD 4: Completed & Historic Archive */}
            {(activeCategory === 'all' || activeCategory === 'archive') && (
              <div className="flex flex-col bg-surface-container-low/70 rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden opacity-90">
                <div className="p-5 sm:p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1.5 font-bold">
                      <Icon name="archive" className="text-[14px]" />
                      Deactivated &amp; Historic
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Completed Records
                    </span>
                  </div>

                  {/* Item 1 */}
                  <div className="p-4 rounded-xl bg-surface-container-lowest flex flex-col gap-2 border border-outline-variant/20">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                          Direct Posterior Composite Restoration
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Tooth #16 • Upper Right 1st Molar
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-code text-[11px]">
                        Completed Dec 12, 2024
                      </span>
                    </div>
                    <div className="bg-surface-container-low p-2.5 rounded-lg flex items-center gap-2">
                      <Icon name="check_circle" className="text-secondary text-[16px] shrink-0" />
                      <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                        Completed treatment — Active reminders automatically deactivated under DHA clinical governance.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="p-4 rounded-xl bg-surface-container-lowest flex flex-col gap-2 border border-outline-variant/20">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <span className="font-title-sm text-title-sm text-on-surface line-through decoration-on-surface-variant/40 font-semibold">
                          Discontinued Amalgam Replacement
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Tooth #46 • Superseded by clinical evaluation
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-code text-[11px]">
                        Discontinued
                      </span>
                    </div>
                    <div className="bg-surface-container-low p-2.5 rounded-lg flex items-center gap-2">
                      <Icon name="do_not_disturb_on" className="text-outline text-[16px] shrink-0" />
                      <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                        Discontinued — No reminders generated. Amalgam stability verified non-pathological.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 bg-surface-container text-center border-t border-outline-variant/20">
                  <span className="font-body-sm text-[12px] text-on-surface-variant flex items-center justify-center gap-1.5">
                    <Icon name="history_edu" className="text-[16px]" />
                    Historical treatments remain archived in My Records without generating prompt notifications.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Quick-Help Hotline Banner */}
            <div className="bg-gradient-to-r from-primary-fixed to-surface-container-high p-5 sm:p-6 rounded-2xl flex flex-col gap-3.5 shadow-xs border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-2xs">
                  <Icon name="contact_support" className="text-[24px]" />
                </div>
                <div>
                  <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
                    Unsure about a recommendation?
                  </h3>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    DHA 800-DHA Oral Health Advisors
                  </span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Licensed coordinators can clarify treatment rationale, insurance coverage tiers, and pre-authorization validity.
              </p>
              <a
                href="tel:800342"
                className="w-full h-11 bg-surface-container-lowest text-primary font-title-sm text-title-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs hover:bg-surface-container-low transition-colors"
              >
                <Icon name="call" className="text-[18px]" />
                <span>Call 800-DHA (342)</span>
              </a>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl bg-surface-container-lowest p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
                <Icon name="assignment" className="text-primary text-[20px]" />
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  Related Clinical Charts
                </h3>
              </div>
              <div className="space-y-2">
                <NavLink
                  to="/patient-dashboard/records/treatments"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface font-body-sm font-medium transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="healing" className="text-secondary text-[18px]" />
                    <span>Treatment History</span>
                  </div>
                  <Icon name="chevron_right" className="text-[16px] text-on-surface-variant" />
                </NavLink>

                <NavLink
                  to="/patient-dashboard/records/examinations"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface font-body-sm font-medium transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="clinical_notes" className="text-primary text-[18px]" />
                    <span>Examination Notes</span>
                  </div>
                  <Icon name="chevron_right" className="text-[16px] text-on-surface-variant" />
                </NavLink>

                <NavLink
                  to="/patient-dashboard/records/clinical-summary"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface font-body-sm font-medium transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="grid_view" className="text-primary text-[18px]" />
                    <span>Tooth Map &amp; FDI Matrix</span>
                  </div>
                  <Icon name="chevron_right" className="text-[16px] text-on-surface-variant" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

