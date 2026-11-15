import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function DHARequestInformationScreen() {
  const navigate = useNavigate();
  const [queryCategory, setQueryCategory] = useState<'radiation' | 'premises' | 'staff' | 'cac' | 'waste'>('radiation');
  const [priorityLevel, setPriorityLevel] = useState<'standard' | 'urgent'>('standard');
  const [responseDeadline, setResponseDeadline] = useState('14');
  const [subject, setSubject] = useState('Missing NNRA Medical Physicist Radiation Scatter Survey for Operatory 04 CBCT');
  const [queryBody, setQueryBody] = useState(
    'The submitted dossier lacks certified medical physics scatter survey verification for the Planmeca ProMax 3D CBCT unit installed in Operatory 04. In accordance with Radiation Safety Law & Regulations 2006, Section 14(b), please upload an NNRA-accredited radiation shielding survey report showing lead equivalency test measurements, scatter dose contours, and operator partition shielding compliance.'
  );
  const [requiredDocs, setRequiredDocs] = useState([
    { id: 1, label: 'NNRA Certified Physicist Scatter Survey Report (PDF)', checked: true },
    { id: 2, label: 'Radiation Safety Officer (RSO) Appointment Letter (PDF)', checked: true },
    { id: 3, label: 'Operatory 04 Lead Shielding Wall & Door Attestation (PDF)', checked: true },
    { id: 4, label: 'Equipment Decommissioning & Leakage Assurance Rider', checked: false },
  ]);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  const toggleDocCheck = (id: number) => {
    setRequiredDocs((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, checked: !doc.checked } : doc))
    );
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/clinic-onboarding/review-workspace')}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Go back"
            >
              <Icon name="arrow_back_ios_new" className="text-xl" />
            </button>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 truncate">
              DHA Request Information
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Statutory RFI Policy: Applications clock pauses upon dispatch of formal regulatory query.')}
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
        <div className="space-y-6">
          {/* Header Context Summary Card */}
          <div className="relative overflow-hidden bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-slate-200/70 space-y-3">
            <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider">
                    <Icon name="verified" className="text-[14px] text-[#006a61]" />
                    DHA Regulatory Action
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    #DHA-APP-2026-8819
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                  Issue Statutory Information Query (RFI)
                </h2>
                <p className="text-xs sm:text-sm text-[#006194] font-semibold flex items-center gap-1.5 mt-0.5">
                  <Icon name="domain" className="text-[16px]" />
                  <span>Greenfield Dental Clinic Ltd • RC-1489201</span>
                </p>
              </div>

              <div className="shrink-0 p-3 bg-[#f2f3ff] rounded-xl text-xs space-y-1 border border-sky-100 text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Officer</span>
                <span className="font-bold text-slate-900 block">Insp. Ibrahim Musa</span>
                <span className="text-slate-500 font-mono text-[11px] block">Desk #04 • FCT Zone</span>
              </div>
            </div>

            {/* Statutory Pause Alert */}
            <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 leading-relaxed">
              <Icon name="pause_circle" className="text-[18px] text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Statutory SLA Notice:</strong> Dispatching this query transitions application status to{' '}
                <span className="font-semibold text-amber-950">"Information Requested"</span> and formally pauses the 30-day licensing review clock until the applicant responds.
              </div>
            </div>
          </div>

          {/* Desktop 2-Column Form Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Query Config & Details */}
            <div className="lg:col-span-7 space-y-5">
              {/* Query Categorisation */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Icon name="tune" className="text-[#006194] text-[18px]" />
                  Target Regulatory Gateway
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'radiation', label: 'Radiation Safety & NNRA Permit', icon: 'warning' },
                    { id: 'premises', label: 'Premises & Operatory Layout', icon: 'meeting_room' },
                    { id: 'staff', label: 'Staff Credentialing & Roster', icon: 'badge' },
                    { id: 'cac', label: 'CAC Incorporation & Governance', icon: 'account_balance' },
                    { id: 'waste', label: 'Biohazard Waste Management', icon: 'delete_sweep' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setQueryCategory(cat.id as typeof queryCategory)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                        queryCategory === cat.id
                          ? 'bg-sky-50 border-[#006194] text-[#006194] shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Icon name={cat.icon} className="text-[18px]" />
                      <span className="truncate">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Query Content */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-4">
                <div className="space-y-1">
                  <label htmlFor="query-subject" className="text-xs font-bold text-slate-900 block">
                    Statutory Query Subject
                  </label>
                  <input
                    id="query-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg bg-[#f2f3ff] text-slate-900 text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="query-body" className="text-xs font-bold text-slate-900">
                      Deficiency Notice &amp; Required Remediation
                    </label>
                    <span className="text-[11px] text-slate-400">Formal Legal Instrument</span>
                  </div>
                  <textarea
                    id="query-body"
                    rows={6}
                    value={queryBody}
                    onChange={(e) => setQueryBody(e.target.value)}
                    className="w-full p-3.5 rounded-lg bg-[#f2f3ff] text-slate-900 text-xs sm:text-sm leading-relaxed outline-none focus:ring-2 focus:ring-[#006194] resize-none"
                  />
                </div>

                {/* Macro quick tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
                  <span className="text-slate-400 text-[11px]">Insert Statutory Macro:</span>
                  {[
                    '+ NNRA Sec 14(b)',
                    '+ HEFAMAA Standard 4.1',
                    '+ MDCN Supervision Rule',
                  ].map((macro) => (
                    <button
                      key={macro}
                      type="button"
                      onClick={() => setQueryBody((prev) => prev + `\n[Reference: ${macro}]`)}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium"
                    >
                      {macro}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Deadlines, Document Checklist & Submission */}
            <div className="lg:col-span-5 space-y-5">
              {/* Response Timeline & Priority */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Icon name="timer" className="text-[#006194] text-[18px]" />
                  Response Window &amp; Priority
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Statutory Compliance Window</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { days: '7', label: '7 Days (Fast)' },
                        { days: '14', label: '14 Days (Standard)' },
                        { days: '30', label: '30 Days (Extended)' },
                      ].map((item) => (
                        <button
                          key={item.days}
                          type="button"
                          onClick={() => setResponseDeadline(item.days)}
                          className={`py-2 px-2 rounded-lg border text-center font-semibold transition-all ${
                            responseDeadline === item.days
                              ? 'bg-sky-50 border-[#006194] text-[#006194]'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-600 block mb-1 font-semibold">Query Priority</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPriorityLevel('standard')}
                        className={`py-2 rounded-lg border font-semibold flex items-center justify-center gap-1.5 ${
                          priorityLevel === 'standard'
                            ? 'bg-sky-50 border-[#006194] text-[#006194]'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon name="info" className="text-[16px]" />
                        <span>Standard RFI</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriorityLevel('urgent')}
                        className={`py-2 rounded-lg border font-semibold flex items-center justify-center gap-1.5 ${
                          priorityLevel === 'urgent'
                            ? 'bg-red-50 border-red-500 text-red-700'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon name="priority_high" className="text-[16px]" />
                        <span>Urgent / Audit Block</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Required Upload Checklist */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Icon name="checklist" className="text-[#006194] text-[18px]" />
                    Requested Supporting Evidence
                  </h3>
                  <span className="text-xs text-[#006194] font-semibold">
                    {requiredDocs.filter((d) => d.checked).length} items
                  </span>
                </div>

                <div className="space-y-2">
                  {requiredDocs.map((doc) => (
                    <label
                      key={doc.id}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#f2f3ff] hover:bg-sky-50 transition-colors border border-sky-100/60 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={doc.checked}
                        onChange={() => toggleDocCheck(doc.id)}
                        className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                      />
                      <span className="text-xs text-slate-800 leading-snug">{doc.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowDispatchModal(true)}
                  className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#004b73] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                >
                  <Icon name="send" className="text-[18px]" />
                  <span>Dispatch Statutory Query (RFI)</span>
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Icon name={draftSaved ? 'check' : 'save'} className="text-[16px]" />
                    <span>{draftSaved ? 'Saved Draft' : 'Save Query Draft'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/clinic-onboarding/review-workspace')}
                    className="h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Icon name="arrow_back" className="text-[16px]" />
                    <span>Cancel</span>
                  </button>
                </div>

                {draftSaved && (
                  <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-semibold flex items-center gap-2">
                    <Icon name="check_circle" className="text-[16px]" />
                    RFI draft saved to dossier queue.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dispatch Confirmation Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-sky-100 text-[#006194] flex items-center justify-center mx-auto">
              <Icon name="mark_email_read" className="text-3xl" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Dispatch Statutory Query?</h3>
              <p className="text-xs text-slate-600">
                This will officially transmit Query #DHA-REQ-4402 to Dr. Amina Bello at Greenfield Dental Clinic Ltd with a {responseDeadline}-day response deadline.
              </p>
            </div>
            <div className="p-3 bg-[#f2f3ff] rounded-lg text-xs text-slate-700 border border-sky-100 space-y-1">
              <p className="font-semibold text-slate-900 truncate">Subject: {subject}</p>
              <p className="text-slate-500">Applicant notified via SMS (+234 803 219 4482) &amp; portal email.</p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDispatchModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDispatchModal(false);
                  navigate('/clinic-onboarding/admin-dashboard');
                }}
                className="px-5 py-2 rounded-lg bg-[#006194] text-white text-xs font-semibold hover:bg-[#004b73]"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
