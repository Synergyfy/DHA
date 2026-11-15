import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function ClinicOnboardingSupportScreen() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<'overview' | 'branches' | 'staff' | 'changes' | 'support'>('support');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [ticketCategory, setTicketCategory] = useState('radiation');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [selectedNotesModal, setSelectedNotesModal] = useState<string | null>(null);

  const handleNavClick = (tab: 'overview' | 'branches' | 'staff' | 'changes' | 'support') => {
    setActiveNav(tab);
    if (tab === 'overview') navigate('/clinic-onboarding/admin-dashboard');
    if (tab === 'branches') navigate('/clinic-onboarding/branch-approval');
    if (tab === 'staff') navigate('/clinic-onboarding/staff-management');
    if (tab === 'changes') navigate('/clinic-onboarding/profile-management');
    if (tab === 'support') navigate('/clinic-onboarding/support');
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNewTicketModal(false);
    setShowToast(true);
    setTicketSubject('');
    setTicketMessage('');
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/clinic-onboarding/dashboard')}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Go back"
            >
              <Icon name="arrow_back_ios_new" className="text-xl" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-[#006194]">
              <Icon name="local_hospital" className="text-[22px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-tight">Clinic Onboarding Support</span>
              <span className="text-xs uppercase tracking-wider text-[#006a61] font-semibold">DHA Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/clinic-onboarding/support')}
              aria-label="Notifications"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Icon name="notifications" className="text-xl" />
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
          {/* Welcome & Concierge Badge Card */}
          <div className="relative overflow-hidden rounded-xl bg-white p-5 sm:p-6 shadow-sm border border-slate-200/70">
            <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
              <div className="space-y-1.5 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider">
                  <Icon name="verified" className="text-[15px] text-[#006a61]" />
                  <span>Fast Track Clinic Onboarding</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1 truncate">
                  Greenfield Dental Clinic Ltd.
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5">
                  <Icon name="badge" className="text-[#006194] text-[18px] shrink-0" />
                  <span>
                    Assigned Officer: <strong className="text-slate-900 font-semibold">Officer T. Adeleke</strong> (Desk #04, FCT Health Secretariat)
                  </span>
                </p>
              </div>

              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-sky-100 shrink-0 border-2 border-white shadow-sm">
                <img
                  className="w-full h-full object-cover"
                  alt="Officer T. Adeleke"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256"
                />
                <span
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-teal-600 rounded-full border-2 border-white"
                  title="Officer Online"
                />
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 mt-5 pt-3 border-t border-slate-100">
              <div className="rounded-lg bg-[#f2f3ff] p-3 text-center border border-sky-100/60">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Open Ticket</span>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-[#006194] animate-pulse" />
                  <span className="text-xl sm:text-2xl font-bold text-[#006194]">1</span>
                </div>
              </div>
              <div className="rounded-lg bg-[#f2f3ff] p-3 text-center border border-sky-100/60">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Resolved</span>
                <span className="text-xl sm:text-2xl font-bold text-[#006a61] block mt-1">3</span>
              </div>
              <div className="rounded-lg bg-[#f2f3ff] p-3 text-center border border-sky-100/60">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Avg. Response</span>
                <span className="text-xl sm:text-2xl font-bold text-sky-800 block mt-1">&lt; 2h</span>
              </div>
            </div>
          </div>

          {/* Dedicated Support Hotline Quick Callout */}
          <div className="rounded-xl bg-[#006194] text-white p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Icon name="phone_in_talk" className="text-[26px]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs uppercase tracking-wider text-sky-200 font-semibold">Dedicated Hotline</span>
                  <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-medium text-white">
                    Mon–Fri 08:00–17:00 WAT
                  </span>
                </div>
                <p className="text-lg sm:text-xl font-bold mt-1 text-white tracking-tight">
                  +234 9 461 8800 <span className="text-sm font-normal text-sky-200">(Ext. 4)</span>
                </p>
                <p className="text-xs text-sky-100 mt-1 flex items-center gap-1">
                  <Icon name="verified_user" className="text-[15px]" />
                  <span>Emergency Onboarding &amp; Verification Desk</span>
                </p>
              </div>
            </div>
          </div>

          {/* Regulatory Inquiries Header & New Ticket Trigger */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Icon name="forum" className="text-[#006194] text-[22px]" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Regulatory Inquiries</h2>
            </div>
            <button
              onClick={() => setShowNewTicketModal(true)}
              className="h-10 px-4 rounded-lg bg-[#006194] hover:bg-[#004b73] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Icon name="add_circle" className="text-[18px]" />
              <span>New Ticket</span>
            </button>
          </div>

          {/* Active Inquiry Thread Section */}
          <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200/70 space-y-3">
            <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 font-mono text-xs text-slate-700 font-semibold">
                    #SUP-ONB-7821
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-[#004b73] text-xs font-semibold">
                    Verification &amp; Radiation Safety
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 pt-1">
                  Clarification on NNRA Physicist Radiation Scatter Survey for Operatory 04
                </h3>
              </div>
            </div>

            {/* Status Row */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#f2f3ff] border border-sky-100/60">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006194] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006194]" />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#006194]">
                  Awaiting DHA Response (In Queue)
                </span>
              </div>
              <span className="text-xs text-slate-500">Today, 09:45 WAT</span>
            </div>

            {/* Thread Snapshot */}
            <div className="p-4 rounded-lg bg-[#faf8ff] border-l-4 border-[#006194] space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">
                  AB
                </div>
                <span className="text-xs font-semibold text-slate-900">Dr. Amina Bello</span>
                <span className="text-xs text-slate-500">• Medical Director</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                “We have uploaded the certified scatter survey from Lead Shield Consults Ltd. Can you confirm if physical reinspection is needed before 24 Oct?”
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs shadow-2xs">
                <Icon name="picture_as_pdf" className="text-[#006194] text-[18px]" />
                <span className="font-medium">NNRA_Scatter_Survey_Op04.pdf</span>
                <span className="text-slate-400 text-[11px]">(2.4 MB)</span>
              </div>
            </div>

            {/* Data Privacy Note */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 text-xs">
              <Icon name="lock" className="text-[16px] text-[#006a61] shrink-0" />
              <p className="leading-tight">
                Protected Workspace: Internal DHA audit logs are safeguarded. Only published regulatory correspondences appear here.
              </p>
            </div>
          </div>

          {/* Past Resolved Inquiries Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Resolved Inquiries (3)</h2>
              <span className="text-xs text-[#006a61] font-semibold">All Requirements Verified</span>
            </div>

            {/* Resolved Card 1 */}
            <div className="rounded-xl bg-white p-4 sm:p-5 shadow-sm border border-slate-200/70 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono text-xs text-slate-600 font-semibold">
                      #SUP-ONB-7640
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-teal-800 font-semibold bg-teal-50 px-2.5 py-0.5 rounded-md">
                      <Icon name="check_circle" className="text-[14px]" />
                      Closed
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 pt-0.5">
                    FCT-HEFAMAA address mismatch rectification
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 text-xs text-slate-500 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Icon name="published_with_changes" className="text-[16px] text-teal-700" />
                  Resolved 17 Oct by Off. T. Adeleke
                </span>
                <button
                  onClick={() => setSelectedNotesModal('Address coordinates updated to Plot 412 Aminu Kano Crescent, Wuse II in accordance with current commercial tenancy deed.')}
                  className="font-semibold text-[#006194] hover:underline flex items-center gap-0.5"
                >
                  <span>Review Notes</span>
                  <Icon name="chevron_right" className="text-[16px]" />
                </button>
              </div>
            </div>

            {/* Resolved Card 2 */}
            <div className="rounded-xl bg-white p-4 sm:p-5 shadow-sm border border-slate-200/70 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono text-xs text-slate-600 font-semibold">
                      #SUP-ONB-7512
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-teal-800 font-semibold bg-teal-50 px-2.5 py-0.5 rounded-md">
                      <Icon name="check_circle" className="text-[14px]" />
                      Closed
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 pt-0.5">
                    Adding visiting specialist with multiple branch credentials
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 text-xs text-slate-500 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Icon name="badge" className="text-[16px] text-teal-700" />
                  Resolved 15 Oct by Support Desk #04
                </span>
                <button
                  onClick={() => setSelectedNotesModal('Dual branch credential binding activated for Dr. Daniel James across HQ and Garki branches.')}
                  className="font-semibold text-[#006194] hover:underline flex items-center gap-0.5"
                >
                  <span>Review Notes</span>
                  <Icon name="chevron_right" className="text-[16px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Official Resources & Blueprints */}
          <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="menu_book" className="text-[#006194] text-[20px]" />
                <h2 className="text-base font-bold text-slate-900">Official Resources &amp; Blueprints</h2>
              </div>
              <span className="text-xs text-slate-500">Updated 2026</span>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  title: 'DHA Clinic Accreditation Guidebook',
                  desc: 'Official requirements PDF (v4.2)',
                  icon: 'description',
                  iconColor: 'bg-sky-100 text-[#006194]',
                },
                {
                  title: 'Radiation Safety Protocol Blueprint',
                  desc: 'NNRA Compliance Standards 2026',
                  icon: 'shield',
                  iconColor: 'bg-teal-100 text-teal-800',
                },
                {
                  title: 'Staff Scope & Role Isolation Reference Chart',
                  desc: 'Statutory credentials & supervision laws',
                  icon: 'groups',
                  iconColor: 'bg-sky-100 text-sky-800',
                },
              ].map((res, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#f2f3ff] hover:bg-sky-100/60 transition-colors border border-sky-100/50 cursor-pointer"
                  onClick={() => alert(`Downloading resource: ${res.title}`)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${res.iconColor}`}>
                      <Icon name={res.icon} className="text-[20px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">{res.title}</p>
                      <p className="text-[11px] text-slate-500">{res.desc}</p>
                    </div>
                  </div>
                  <Icon name="download" className="text-slate-400 hover:text-[#006194] text-[20px] shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="confirmation_number" className="text-[#006194] text-[24px]" />
                <h2 className="text-lg font-bold text-slate-900">Open Onboarding Ticket</h2>
              </div>
              <button
                onClick={() => setShowNewTicketModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Submit queries directly to your designated accreditation officer. Replies are guaranteed within standard regulatory operating windows.
            </p>
            <form onSubmit={handleTicketSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">Inquiry Category</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full h-11 rounded-lg bg-[#f2f3ff] px-3 text-xs sm:text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#006194]"
                >
                  <option value="documents">Document Verification &amp; HEFAMAA Certificates</option>
                  <option value="inspection">Physical Branch Inspection Scheduling</option>
                  <option value="radiation">Radiation &amp; NNRA Equipment Clearance</option>
                  <option value="staff">Staff Invitations &amp; Practice Licensing</option>
                  <option value="technical">Technical Portal &amp; Credential Sync</option>
                  <option value="other">Other Regulatory Guidance</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">Subject / Summary</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g., Update on Dental Chair Lead Shielding Audit"
                  className="w-full h-11 rounded-lg bg-[#f2f3ff] px-3 text-xs sm:text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#006194]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">Detailed Inquiry</label>
                <textarea
                  required
                  rows={3}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Provide context, license reference numbers, or operatory IDs..."
                  className="w-full rounded-lg bg-[#f2f3ff] p-3 text-xs sm:text-sm text-slate-800 outline-none focus:ring-2 focus:ring-[#006194]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">Attach Supporting Documentation</label>
                <div className="rounded-lg border-2 border-dashed border-sky-300 bg-sky-50/50 p-4 text-center cursor-pointer hover:bg-sky-50 transition-colors">
                  <Icon name="cloud_upload" className="text-2xl text-[#006194] mx-auto" />
                  <p className="text-xs font-semibold text-slate-800 mt-1">Tap to browse files</p>
                  <p className="text-[11px] text-slate-500">PDF, JPG, or PNG (Max 15MB each)</p>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#006194] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#004b73]"
                >
                  <span>Submit Ticket</span>
                  <Icon name="send" className="text-[16px]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Notes Modal */}
      {selectedNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Resolution Audit Notes</h3>
              <button onClick={() => setSelectedNotesModal(null)} className="text-slate-400 hover:text-slate-600">
                <Icon name="close" className="text-xl" />
              </button>
            </div>
            <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-100 leading-relaxed">
              {selectedNotesModal}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedNotesModal(null)}
                className="px-4 py-1.5 rounded-lg bg-[#006194] text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification upon Ticket Submission */}
      {showToast && (
        <div className="fixed bottom-24 inset-x-4 max-w-sm mx-auto z-50 p-3.5 rounded-xl bg-[#006a61] text-white shadow-lg flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Icon name="task_alt" className="text-[20px]" />
            <span className="text-xs font-medium">Ticket submitted to Officer T. Adeleke!</span>
          </div>
          <button onClick={() => setShowToast(false)} className="text-white/80 hover:text-white">
            <Icon name="close" className="text-[16px]" />
          </button>
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
