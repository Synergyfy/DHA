import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function DHAApplicationReviewWorkspaceScreen() {
  const navigate = useNavigate();
  const [openAccordions, setOpenAccordions] = useState<number[]>([1, 7]);
  const [internalNotes, setInternalNotes] = useState(
    'HEFAMAA operating license verified with Secretariat. Waiting for physical inspection of Garki satellite on 24 Oct and medical physicist scatter survey for Operatory 04 CBCT before final gazetting.'
  );
  const [clinicFeedback, setClinicFeedback] = useState(
    'Please ensure your certified radiological survey engineer is present during the NNRA scatter survey for the CBCT unit.'
  );
  const [draftSaved, setDraftSaved] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const toggleAccordion = (id: number) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => {
      setDraftSaved(false);
    }, 2500);
  };

  const gateways = [
    {
      id: 1,
      title: '1. Legal Entity & CAC',
      statusText: 'Verified • Checked against CAC Registry',
      badge: 'Passed',
      badgeClass: 'bg-teal-50 text-teal-800',
      icon: 'account_balance',
      content: (
        <div className="space-y-2 text-xs text-slate-600">
          <div className="p-2.5 rounded-lg bg-white flex items-center justify-between font-mono border border-slate-100">
            <span>RC Status: ACTIVE / INCORPORATED</span>
            <span className="text-[#006a61] font-semibold">100% Match</span>
          </div>
          <p>
            Certified true copy matches federal enterprise records. Authorized capital verified compliant with dental surgical operations threshold.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: '2. Representative Authority',
      statusText: 'Verified • Board Resolution validated',
      badge: 'Passed',
      badgeClass: 'bg-teal-50 text-teal-800',
      icon: 'assignment_ind',
      content: (
        <p className="text-xs text-slate-600">
          Managing Partner Board Resolution signed by 3 registered directors delegating administrative rights to Dr. Amina Bello.
        </p>
      ),
    },
    {
      id: 3,
      title: '3. Healthcare Licensing',
      statusText: 'Verified • FCT-HEFAMAA-DENT-0842 confirmed active',
      badge: 'Passed',
      badgeClass: 'bg-teal-50 text-teal-800',
      icon: 'medical_services',
      content: (
        <p className="text-xs text-slate-600">
          FCT Health Services Secretariat annual operational quota paid up to 31 Dec 2027.
        </p>
      ),
    },
    {
      id: 4,
      title: '4. Clinic Infrastructure',
      statusText: 'Satisfied • 4 Operatories, Solar Inverter verified',
      badge: 'Passed',
      badgeClass: 'bg-teal-50 text-teal-800',
      icon: 'meeting_room',
      content: (
        <p className="text-xs text-slate-600">
          Autoclave validation certificate and continuous 15kVA pure sine power redundancy confirmed via facility schematic.
        </p>
      ),
    },
    {
      id: 5,
      title: '5. Primary Site Location',
      statusText: 'Verified • Cadastral Zone A08 geo-match',
      badge: 'Passed',
      badgeClass: 'bg-teal-50 text-teal-800',
      icon: 'pin_drop',
      content: (
        <p className="text-xs text-slate-600">
          Plot 412, Aminu Kano Crescent, Wuse II, Abuja. Cadastral geographic coordinate verified against AGIS registry.
        </p>
      ),
    },
    {
      id: 6,
      title: '6. Operating Hours',
      statusText: 'Compliant • Emergency on-call rota verified',
      badge: 'Passed',
      badgeClass: 'bg-teal-50 text-teal-800',
      icon: 'schedule',
      content: (
        <p className="text-xs text-slate-600">
          Core hours: Mon-Fri 08:00 - 18:00, Sat 09:00 - 14:00. 24/7 designated emergency triaging hotline registered.
        </p>
      ),
    },
    {
      id: 7,
      title: '7. Regulatory Documents',
      statusText: '1 Pending • NNRA Radiation Safety Permit',
      badge: 'Requires Action',
      badgeClass: 'bg-amber-100 text-amber-800 font-bold',
      icon: 'warning',
      isPending: true,
      content: (
        <div className="space-y-3 pt-1">
          <div className="p-3.5 rounded-lg bg-white border border-amber-200/80 shadow-2xs space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  NNRA Certificate of Registration for X-Ray Equip
                </span>
                <span className="text-xs text-slate-600">
                  Operatory 4 (Planmeca ProMax 3D CBCT unit) requires medical physics lead lining validation.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-mono text-[11px] font-bold shrink-0">
                Stage 2
              </span>
            </div>
            <button
              onClick={() => navigate('/clinic-onboarding/document-verification')}
              className="w-full py-2.5 rounded-lg bg-[#006194] hover:bg-[#004b73] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Icon name="visibility" className="text-[18px]" />
              <span>Inspect Documents (15.31)</span>
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: '8. Satellite Branches',
      statusText: '1 Pending Premise Inspection • Garki Branch #002',
      badge: 'Field Visit',
      badgeClass: 'bg-slate-100 text-slate-700 font-semibold',
      icon: 'domain_verification',
      content: (
        <p className="text-xs text-slate-600">
          Assigned Field Officer: Insp. Sarah Danladi. Scheduled on-site sterilization validation booked for 24 Oct 2026, 11:00 AM.
        </p>
      ),
    },
    {
      id: 9,
      title: '9. Staff & Practitioners',
      statusText: 'Compliant • 6 rostered, MD Dr. Bello #DEN-78421',
      badge: 'Passed',
      badgeClass: 'bg-teal-50 text-teal-800',
      icon: 'groups',
      content: (
        <p className="text-xs text-slate-600">
          MDCN practicing licenses cross-checked. 3 Dental Surgeons, 1 Orthodontist specialist, 2 Hygienists all certified in good standing.
        </p>
      ),
    },
    {
      id: 10,
      title: '10. Services & Specialities',
      statusText: 'Compliant • 5 specialities declared',
      badge: 'Passed',
      badgeClass: 'bg-teal-50 text-teal-800',
      icon: 'dentistry',
      content: (
        <p className="text-xs text-slate-600">
          Approved scope: General Dental Practice, Orthodontics, Endodontics, Periodontics, and Pediatric Dentistry.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/clinic-onboarding/admin-dashboard')}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Go back"
            >
              <Icon name="arrow_back_ios_new" className="text-xl" />
            </button>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 truncate">
              DHA Application Review Workspace
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('DHA Review Guideline: Minimum 9/10 Gateways must pass before granting license.')}
              aria-label="Application Info"
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-36">
        <div className="space-y-6">
          {/* Dossier Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/70 p-5 sm:p-6 space-y-4 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap relative z-10">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <Icon name="verified_user" className="text-[#006194] text-[18px]" />
                  <span className="font-mono text-xs text-slate-500 font-semibold tracking-wider uppercase">
                    Ref #DHA-APP-2026-8819
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1 truncate">
                  Greenfield Dental Clinic Ltd
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2 mt-1">
                  <span>RC-1489201</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>Submitted 18 Oct 2026</span>
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold whitespace-nowrap shadow-xs flex items-center gap-1.5 shrink-0 border border-teal-200">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                Under Desk Review
              </span>
            </div>

            {/* Inspector Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 bg-[#f2f3ff] rounded-lg p-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-sky-100 text-[#006194] flex items-center justify-center shrink-0">
                  <Icon name="badge" className="text-[18px]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Reviewer</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate block">Insp. Ibrahim Musa</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <Icon name="alt_route" className="text-[18px]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Track &amp; Queue</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate block">FCT Desk • Pos #02</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar Matrix */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/70 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="fact_check" className="text-[#006194] text-[20px]" />
                <span className="text-sm font-bold text-slate-900">Verification Dossier</span>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-sky-100 text-[#006194] font-bold">
                8 / 10 Cleared
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
              <div className="bg-[#006a61] h-full rounded-l-full transition-all duration-500" style={{ width: '80%' }} />
              <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: '10%' }} />
              <div className="bg-slate-300 h-full rounded-r-full" style={{ width: '10%' }} />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5 flex-wrap gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]" /> 8 Verified
              </span>
              <span className="flex items-center gap-1.5 font-medium text-amber-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 1 Radiation Audit
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> 1 Field Visit
              </span>
            </div>
          </div>

          {/* Document Inspection Snapshot Showcase */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Critical Document Previews</h3>
                <p className="text-xs text-slate-500">Automated OCR and security seal scan status</p>
              </div>
              <button
                onClick={() => navigate('/clinic-onboarding/document-verification')}
                className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#006194] text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Icon name="open_in_new" className="text-[16px]" />
                <span>Audit Tray</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {/* Doc 1: CAC */}
              <div
                onClick={() => navigate('/clinic-onboarding/document-verification')}
                className="flex flex-col space-y-1.5 group cursor-pointer"
              >
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 shadow-xs border border-slate-200">
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Icon name="description" className="text-4xl text-slate-400" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#006a61] text-white flex items-center justify-center shadow-md">
                    <Icon name="check" className="text-[14px] font-bold" />
                  </span>
                  <span className="absolute bottom-2 left-2 right-2 text-xs text-white truncate font-medium">
                    CAC Incorp
                  </span>
                </div>
                <span className="font-mono text-xs text-[#006a61] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" /> Verified
                </span>
              </div>

              {/* Doc 2: HEFAMAA */}
              <div
                onClick={() => navigate('/clinic-onboarding/document-verification')}
                className="flex flex-col space-y-1.5 group cursor-pointer"
              >
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 shadow-xs border border-slate-200">
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Icon name="badge" className="text-4xl text-slate-400" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#006a61] text-white flex items-center justify-center shadow-md">
                    <Icon name="check" className="text-[14px] font-bold" />
                  </span>
                  <span className="absolute bottom-2 left-2 right-2 text-xs text-white truncate font-medium">
                    FCT Lic.
                  </span>
                </div>
                <span className="font-mono text-xs text-[#006a61] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" /> Active
                </span>
              </div>

              {/* Doc 3: NNRA Radiation (Pending) */}
              <div
                onClick={() => navigate('/clinic-onboarding/document-verification')}
                className="flex flex-col space-y-1.5 group cursor-pointer"
              >
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-amber-50 shadow-xs border border-amber-300">
                  <div className="w-full h-full bg-amber-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Icon name="warning" className="text-4xl text-amber-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md">
                    <Icon name="schedule" className="text-[14px] font-bold" />
                  </span>
                  <span className="absolute bottom-2 left-2 right-2 text-xs text-white truncate font-medium">
                    NNRA Rad.
                  </span>
                </div>
                <span className="font-mono text-xs text-amber-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" /> 1 Pending
                </span>
              </div>
            </div>
          </div>

          {/* Verification Modules Accordion Stack */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">10 Regulatory Gateways</h3>
              <span className="text-xs text-slate-500">Tap to inspect breakdown</span>
            </div>

            <div className="space-y-2.5">
              {gateways.map((gw) => {
                const isOpen = openAccordions.includes(gw.id);
                return (
                  <div
                    key={gw.id}
                    className={`bg-white rounded-xl shadow-sm border transition-all overflow-hidden ${
                      gw.isPending ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200/70'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(gw.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          gw.isPending ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                        }`}>
                          <Icon name={gw.icon} className="text-[18px]" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm font-bold text-slate-900 block truncate">{gw.title}</span>
                          <span className={`text-xs truncate block ${gw.isPending ? 'text-amber-700 font-semibold' : 'text-slate-500'}`}>
                            {gw.statusText}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${gw.badgeClass}`}>
                          {gw.badge}
                        </span>
                        <Icon
                          name="expand_more"
                          className={`text-slate-400 text-[20px] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 bg-[#faf8ff] border-t border-slate-100">
                        {gw.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Note Segregation Architecture: Internal vs Public Feedback */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Review Documentation</h3>
              <span className="font-mono text-xs text-red-700 flex items-center gap-1 font-semibold">
                <Icon name="lock" className="text-[14px]" />
                Strict Confidentiality
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Confidential Internal Notes */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200/70 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-700">
                    <Icon name="shield_person" className="text-[20px]" />
                    <label htmlFor="confidential-notes" className="text-sm font-bold text-slate-900">
                      Internal Reviewer Notes
                    </label>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[11px] font-bold">
                    DHA Eyes Only
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  These comments are encrypted and never shown to the applicant clinic.
                </p>
                <textarea
                  id="confidential-notes"
                  rows={4}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#f2f3ff] text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] transition-colors resize-none"
                />
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Logged by: I. Musa (ID #882)</span>
                  <button
                    onClick={() => setInternalNotes((prev) => prev + '\n[Audit Macro: Premise inspection scheduled with Zonal Panel]')}
                    className="text-[#006194] font-semibold hover:underline"
                  >
                    Insert Audit Macro
                  </button>
                </div>
              </div>

              {/* Public Clinic Feedback Notice */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200/70 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#006a61]">
                    <Icon name="campaign" className="text-[20px]" />
                    <label htmlFor="public-feedback" className="text-sm font-bold text-slate-900">
                      Applicant Feedback Notice
                    </label>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[11px] font-bold">
                    Visible to Clinic
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  This feedback will accompany any RFI query or formal approval notification dispatched to the clinic.
                </p>
                <textarea
                  id="public-feedback"
                  rows={4}
                  value={clinicFeedback}
                  onChange={(e) => setClinicFeedback(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#f2f3ff] text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] transition-colors resize-none"
                />
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Dispatched upon decision submit</span>
                  <span className="text-[#006a61] font-medium">Ready for dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Persistent Decision Action Bar (Fixed Bottom) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">
        <div className="max-w-4xl mx-auto flex flex-col space-y-2">
          <div className="grid grid-cols-2 gap-3">
            {/* Approve Action */}
            <button
              onClick={() => setShowApproveModal(true)}
              className="h-12 px-4 rounded-xl bg-[#006194] hover:bg-[#004b73] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
            >
              <Icon name="check_circle" className="text-[20px]" />
              <span className="truncate">Approve Clinic (15.33)</span>
            </button>

            {/* Request Information Action */}
            <button
              onClick={() => navigate('/clinic-onboarding/request-information')}
              className="h-12 px-4 rounded-xl bg-[#006a61] hover:bg-teal-800 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
            >
              <Icon name="help" className="text-[20px]" />
              <span className="truncate">RFI Notice (15.32)</span>
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 pt-0.5">
            <button
              onClick={() => setShowRejectModal(true)}
              className="h-9 px-3 rounded-lg text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Icon name="cancel" className="text-[16px]" />
              <span>Reject Application</span>
            </button>

            <button
              onClick={handleSaveDraft}
              className={`h-9 px-4 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                draftSaved
                  ? 'bg-teal-100 text-teal-800'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <Icon name={draftSaved ? 'check' : 'save'} className="text-[16px]" />
              <span>{draftSaved ? 'Saved to Queue!' : 'Save Review Draft'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto">
              <Icon name="verified" className="text-3xl" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Grant DHA Clinic Accreditation</h3>
              <p className="text-xs text-slate-600">
                Are you sure you want to approve Greenfield Dental Clinic Ltd? Once confirmed, the official registration certificate will be generated and dispatched.
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg text-xs text-amber-800 border border-amber-200">
              Note: 1 radiation audit item is currently marked pending. Approving now will grant a provisional 90-day operational license.
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowApproveModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowApproveModal(false);
                  navigate('/clinic-onboarding/confirmation');
                }}
                className="px-5 py-2 rounded-lg bg-[#006194] text-white text-xs font-semibold hover:bg-[#004b73]"
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Icon name="gavel" className="text-3xl" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Reject Application Dossier</h3>
              <p className="text-xs text-slate-600">
                This will officially terminate docket #DHA-APP-2026-8819 and dispatch a formal rejection notice with appeal instructions.
              </p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  navigate('/clinic-onboarding/rejection-details');
                }}
                className="px-5 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
