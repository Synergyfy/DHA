import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function BranchApprovalStatusScreen() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<'overview' | 'branches' | 'staff' | 'changes' | 'support'>('branches');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('24 Oct 2026, 10:00 AM');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleNavClick = (tab: 'overview' | 'branches' | 'staff' | 'changes' | 'support') => {
    setActiveNav(tab);
    if (tab === 'overview') navigate('/clinic-onboarding/admin-dashboard');
    if (tab === 'branches') navigate('/clinic-onboarding/branch-approval');
    if (tab === 'staff') navigate('/clinic-onboarding/staff-management');
    if (tab === 'changes') navigate('/clinic-onboarding/profile-management');
    if (tab === 'support') navigate('/clinic-onboarding/support');
  };

  const steps = [
    {
      id: 1,
      title: 'Geo-Anchor & Tenancy Verified',
      status: 'cleared',
      badge: 'Cleared',
      desc: 'Cadastral GIS coordinates matched Plot 108 records.',
      icon: 'check_circle',
      iconBg: 'bg-teal-100 text-teal-800',
    },
    {
      id: 2,
      title: 'Premises & Operatory Inspection',
      status: 'active',
      badge: '24 Oct 2026',
      desc: 'Scheduled site visit with FCT Health Services Secretariat audit panel.',
      extra: 'Slot: 10:00 AM WAT • Lead: Insp. Adeleke',
      icon: 'meeting_room',
      iconBg: 'bg-primary text-white ring-4 ring-sky-100',
    },
    {
      id: 3,
      title: 'Radiation Shielding Certification',
      status: 'pending',
      badge: 'Awaiting Inspection',
      desc: 'Pending NNRA scattered radiation assessment for panoramic OPG unit.',
      icon: 'arrows_outward',
      iconBg: 'bg-slate-100 text-slate-600',
    },
    {
      id: 4,
      title: 'Medical Director Endorsement',
      status: 'cleared',
      badge: 'Signed',
      desc: 'Signed by Dr. Amina Bello (MD/CEO, Greenfield Dental).',
      icon: 'signature',
      iconBg: 'bg-teal-100 text-teal-800',
    },
    {
      id: 5,
      title: 'Gazette & Operational Activation',
      status: 'locked',
      badge: 'Locked',
      desc: 'Generates public registration certificate upon Step 2 & 3 sign-off.',
      icon: 'verified',
      iconBg: 'bg-slate-100 text-slate-400',
    },
  ];

  const artifacts = [
    {
      title: 'Garki Tenancy Agreement (5 Yrs)',
      subtitle: 'Verified by Cadastral Registry',
      status: 'Valid',
      statusType: 'success',
      icon: 'assignment_turned_in',
    },
    {
      title: 'Operatory Layout & Shielding Schematic',
      subtitle: 'NNRA Desk Review in progress',
      status: 'Under Review',
      statusType: 'review',
      icon: 'architecture',
    },
    {
      title: 'Medical Waste Disposal Rider',
      subtitle: 'Abuja Environmental Protection Board',
      status: 'Valid',
      statusType: 'success',
      icon: 'delete_sweep',
    },
    {
      title: 'Clinical Staff Roster Schedule',
      subtitle: 'MLSCN & MDCN ratio verified',
      status: 'Compliant',
      statusType: 'success',
      icon: 'badge',
    },
  ];

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/clinic-onboarding/branch-management')}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Go back"
            >
              <Icon name="arrow_back_ios_new" className="text-xl" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-[#006194]">
              <Icon name="local_hospital" className="text-[22px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-tight">Clinic Branch Approval</span>
              <span className="text-xs uppercase tracking-wider text-[#006a61] font-semibold">DHA Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/clinic-onboarding/support')}
              aria-label="Help & Support"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Icon name="help_outline" className="text-xl" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
        <div className="space-y-6">
          {/* Operational Restriction Warning Banner */}
          <div className="relative overflow-hidden rounded-xl bg-red-50 border border-red-200/80 text-red-950 p-4 sm:p-5 shadow-sm">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Icon name="gavel" className="text-[20px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm sm:text-base font-bold text-red-900">Operational Restriction in Force</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-100 text-red-800 uppercase font-semibold tracking-wider">
                    Restricted
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-red-900/90 mt-1.5 leading-relaxed">
                  Patient booking and clinical procedures are strictly held for Garki Branch until the physical premises certificate is gazetted by the Health Services Secretariat.
                </p>
              </div>
            </div>
          </div>

          {/* Grid for desktop layout: Left col (Identity & Stepper), Right col (Directives, Artifacts & Actions) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Branch Identity Card & Parent Context */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-900 text-xs font-medium">
                    <Icon name="verified_user" className="text-[16px] text-[#006a61]" />
                    <span>Parent CAC: RC-1489201 • Corporate Cleared</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-md">
                    Branch ID: #002-GRK
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Greenfield Dental Clinic</h1>
                      <span className="text-base font-semibold text-[#006194]">Garki Branch (#002)</span>
                    </div>
                    <div className="shrink-0 px-3 py-1.5 rounded-lg bg-sky-50 text-[#004b73] border border-sky-100 flex items-center gap-1.5 shadow-xs">
                      <Icon name="schedule" className="text-[16px] text-[#006194]" />
                      <span className="text-xs font-semibold whitespace-nowrap">Premises Audit • 24 Oct</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 pt-1">
                    <Icon name="pin_drop" className="text-slate-400 text-[18px] shrink-0" />
                    <span className="truncate">Plot 108 Mohammadu Buhari Way, Garki 2, Abuja, FCT</span>
                  </p>
                </div>

                {/* Facility Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#f2f3ff] rounded-lg p-3 flex flex-col border border-sky-100/60">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Facility Type</span>
                    <span className="text-sm font-semibold text-slate-900 mt-0.5">Satellite Dental Clinic</span>
                  </div>
                  <div className="bg-[#f2f3ff] rounded-lg p-3 flex flex-col border border-sky-100/60">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Assigned Clinical Lead</span>
                    <span className="text-sm font-semibold text-slate-900 mt-0.5 truncate">Dr. Tunde Fashola, BDS</span>
                  </div>
                </div>
              </div>

              {/* Multi-Tier Operational Approval Stepper */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">Operational Accreditation Track</h2>
                    <span className="text-xs text-slate-500">2 of 5 Milestones Completed</span>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    Stage 2 Active
                  </span>
                </div>

                {/* Stepper Vertical Flow */}
                <div className="relative flex flex-col space-y-5 before:absolute before:left-[15px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {steps.map((step) => (
                    <div key={step.id} className={`relative flex items-start gap-3.5 ${step.status === 'locked' ? 'opacity-60' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${step.iconBg} shadow-xs`}>
                        <Icon name={step.icon} className="text-[18px]" />
                      </div>
                      <div className={`flex flex-col min-w-0 flex-1 pt-0.5 ${step.status === 'active' ? 'bg-[#f2f3ff] rounded-lg p-3.5 border border-sky-100' : ''}`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-sm font-semibold ${step.status === 'active' ? 'text-[#006194] font-bold' : 'text-slate-900'}`}>
                            {step.title}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                            step.status === 'cleared'
                              ? 'text-teal-700 bg-teal-50'
                              : step.status === 'active'
                              ? 'bg-[#006194] text-white'
                              : 'text-slate-500 bg-slate-100'
                          }`}>
                            {step.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                        {step.extra && (
                          <div className="mt-2 flex items-center gap-1.5 text-[#006194] text-xs font-semibold">
                            <Icon name="event_available" className="text-[15px]" />
                            <span>{step.extra}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Reviewer Comments Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-[#006194]">
                      <Icon name="record_voice_over" className="text-[18px]" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">DHA Reviewer Directive</span>
                  </div>
                  <span className="text-xs text-slate-500">18 Oct 2026</span>
                </div>
                <div className="p-3.5 rounded-lg bg-[#f2f3ff] text-slate-800 space-y-1.5 border border-sky-100/60">
                  <div className="flex items-center gap-1 text-[#006194]">
                    <Icon name="account_circle" className="text-[16px]" />
                    <span className="text-xs font-semibold">Inspector Adeleke (FCT Audit Desk)</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700 italic">
                    “Premises inspection confirmed for 24 Oct, 10:00 WAT. Ensure Operatory B emergency oxygen cylinder hydro-test certificate is available chairside for physical stamp.”
                  </p>
                </div>
              </div>

              {/* Verification Artifacts Section */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">Verification Artifacts</h2>
                  <span className="text-xs text-[#006194] font-semibold">4 Files Attached</span>
                </div>

                <div className="space-y-2">
                  {artifacts.map((art, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#faf8ff] border border-slate-200/60 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          art.statusType === 'success' ? 'bg-teal-100 text-teal-800' : 'bg-sky-100 text-[#006194]'
                        }`}>
                          <Icon name={art.icon} className="text-[20px]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">{art.title}</p>
                          <p className="text-[11px] text-slate-500 truncate">{art.subtitle}</p>
                        </div>
                      </div>
                      <div className="shrink-0 pl-2">
                        {art.statusType === 'success' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                            <Icon name="check_circle" className="text-[14px]" />
                            {art.status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs font-semibold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md">
                            {art.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Controls */}
              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  className="w-full h-12 bg-[#006194] hover:bg-[#004b73] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                >
                  <Icon name="upload_file" className="text-[20px]" />
                  <span>Upload Additional Branch Documents</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRescheduleModal(true)}
                    className="h-11 bg-white hover:bg-slate-50 text-[#006194] border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Icon name="calendar_month" className="text-[18px]" />
                    <span>Reschedule Audit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/clinic-onboarding/branch-management')}
                    className="h-11 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Icon name="arrow_back" className="text-[18px]" />
                    <span>Branch List</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Upload Branch Document</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600">
                <Icon name="close" className="text-2xl" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Attach certified premises schematics, radiological survey reports, or municipal tenancy certificates for Garki Branch (#002).
            </p>
            <div className="border-2 border-dashed border-sky-300 rounded-xl p-6 text-center bg-sky-50/50 hover:bg-sky-50 transition-colors cursor-pointer">
              <Icon name="cloud_upload" className="text-3xl text-[#006194] mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-800">Drag & drop files or browse</p>
              <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 10MB each</p>
            </div>
            {uploadSuccess && (
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg flex items-center gap-2 text-teal-800 text-xs font-semibold">
                <Icon name="check_circle" className="text-[18px]" />
                Document ingested and queued for DHA reviewer desk!
              </div>
            )}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setUploadSuccess(true);
                  setTimeout(() => {
                    setShowUploadModal(false);
                    setUploadSuccess(false);
                  }, 1200);
                }}
                className="px-5 py-2 rounded-lg bg-[#006194] text-white text-xs font-semibold hover:bg-[#004b73]"
              >
                Confirm Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Reschedule Audit Visit</h3>
              <button onClick={() => setShowRescheduleModal(false)} className="text-slate-400 hover:text-slate-600">
                <Icon name="close" className="text-2xl" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Select an alternative inspection inspection window with Inspector Adeleke:
            </p>
            <div className="space-y-2">
              {[
                '24 Oct 2026, 10:00 AM (Current)',
                '27 Oct 2026, 11:30 AM',
                '29 Oct 2026, 02:00 PM',
                '03 Nov 2026, 09:30 AM',
              ].map((slot) => (
                <label
                  key={slot}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer text-xs font-semibold ${
                    selectedSlot === slot ? 'border-[#006194] bg-sky-50 text-[#006194]' : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span>{slot}</span>
                  <input
                    type="radio"
                    name="slot"
                    checked={selectedSlot === slot}
                    onChange={() => setSelectedSlot(slot)}
                    className="accent-[#006194]"
                  />
                </label>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="px-5 py-2 rounded-lg bg-[#006194] text-white text-xs font-semibold hover:bg-[#004b73]"
              >
                Update Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shared Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-lg mx-auto flex justify-around items-center h-18 px-2 py-2">
          <button
            onClick={() => handleNavClick('overview')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
              activeNav === 'overview' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="dashboard" className="text-[22px]" />
            <span className="text-[11px]">Overview</span>
          </button>
          <button
            onClick={() => handleNavClick('branches')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
              activeNav === 'branches' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="domain_verification" className="text-[22px]" />
            <span className="text-[11px]">Branches</span>
          </button>
          <button
            onClick={() => handleNavClick('staff')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
              activeNav === 'staff' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="badge" className="text-[22px]" />
            <span className="text-[11px]">Staff</span>
          </button>
          <button
            onClick={() => handleNavClick('changes')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
              activeNav === 'changes' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="published_with_changes" className="text-[22px]" />
            <span className="text-[11px]">Changes</span>
          </button>
          <button
            onClick={() => handleNavClick('support')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
              activeNav === 'support' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="support_agent" className="text-[22px]" />
            <span className="text-[11px]">Support</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
