import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const StaffEmploymentDetailsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [engagementType, setEngagementType] = useState('perm-specialist');
  const [newNote, setNewNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      triggerToast('Changes saved to confidential HR ledger #AUD-8829.');
    }, 600);
  };

  const handlePdf = () => {
    triggerToast('Generating signed employment certificate with watermarked QR verification...');
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
              onClick={() => navigate('/staff-management/profile')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff] transition-colors"
              title="Go back"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg md:text-xl text-[#131b2e] truncate">
              Staff Employment Details
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast('HR audit options')}
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
          {/* Confidential Clearance & Access Banner */}
          <div className="bg-[#eaedff] rounded-2xl p-4 md:p-5 shadow-xs border border-[#dae2fd]">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-white text-[#006194] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <Icon name="verified_user" className="text-lg" />
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#006194]/10 text-[#006194] font-bold text-[10px] uppercase px-2 py-0.5 rounded tracking-wider">
                    Tier 3 Executive
                  </span>
                  <span className="text-[#707881] flex items-center gap-1 font-mono text-[11px]">
                    <Icon name="lock" className="text-xs" />
                    Encrypted HR Vault
                  </span>
                </div>
                <p className="font-bold text-[#131b2e] text-sm mt-1 truncate">
                  Confidential Personnel File • Tier 3 Executive HR Access Only
                </p>
                <p className="text-[#707881] mt-0.5">
                  Access logged to tamper-evident audit ledger #AUD-8829.
                </p>
              </div>
            </div>
          </div>

          {/* Practitioner Identity Snapshot Card */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#cce5ff] text-[#006194] flex items-center justify-center font-['Plus_Jakarta_Sans'] font-bold text-xl shadow-xs">
                  MA
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center shadow-xs">
                  <Icon name="medical_services" className="text-xs" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="bg-[#86f2e4] text-[#006f66] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Core Staff
                  </span>
                  <span className="font-mono text-xs text-[#707881]">#STF-ADE-01</span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-lg md:text-xl text-[#131b2e] truncate mt-1">
                  Dr. Michael Adeyemi, DDS
                </h2>
                <p className="text-xs md:text-sm text-[#707881] truncate">
                  Lead Restorative Dentist • Full-Time
                </p>
              </div>
            </div>
          </div>

          {/* Separation of Concerns Advisory Banner */}
          <div className="bg-[#f2f3ff] rounded-2xl p-4 md:p-5 flex items-start gap-3.5 border border-[#eaedff]">
            <Icon name="gavel" className="text-xl text-[#006194] shrink-0 mt-0.5" />
            <div className="text-xs text-[#3f4850] space-y-1">
              <p className="font-semibold text-sm text-[#006194]">Separation of Concerns Notice</p>
              <p className="leading-relaxed">
                Employment & Contractual Details are strictly separated from statutory MDCN/DHA clinical licensing. Modifying HR terms does not alter independent medical standing.
              </p>
            </div>
          </div>

          {/* 1. Employment Contract & Status */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
                  <Icon name="badge" className="text-base" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                  Contract & Status
                </h3>
              </div>
              <span className="bg-[#86f2e4] text-[#006f66] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Active Core Staff
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#131b2e] mb-1.5">
                  Engagement Classification
                </label>
                <div className="relative">
                  <select
                    value={engagementType}
                    onChange={(e) => setEngagementType(e.target.value)}
                    className="w-full h-12 bg-[#f2f3ff] text-xs md:text-sm text-[#131b2e] font-semibold rounded-xl px-3.5 appearance-none focus:outline-none focus:bg-white border border-[#eaedff]"
                  >
                    <option value="perm-specialist">Full-Time Permanent Specialist</option>
                    <option value="fixed-locum">Fixed-Term Locum Practitioner</option>
                    <option value="sessional-consultant">Sessional Visiting Consultant</option>
                    <option value="clinical-intern">Clinical Dental Intern / Resident</option>
                  </select>
                  <Icon name="expand_more" className="absolute right-3.5 top-3 text-[#707881] text-2xl pointer-events-none" />
                </div>
                <p className="text-[#707881] mt-1">Defines pension entitlement, paid CME allocations, and bonus tiers.</p>
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#f2f3ff] rounded-xl p-3.5 flex flex-col justify-between">
                  <span className="text-[#707881]">Date Joined</span>
                  <span className="font-bold text-sm text-[#131b2e] mt-1">14 Jan 2024</span>
                  <div className="inline-flex items-center gap-1 mt-2 bg-white px-2 py-0.5 rounded-lg text-[#006194] font-mono text-[11px] w-fit shadow-xs">
                    <Icon name="schedule" className="text-xs" />
                    <span>2y 9m Tenure</span>
                  </div>
                </div>

                <div className="bg-[#f2f3ff] rounded-xl p-3.5 flex flex-col justify-between">
                  <span className="text-[#707881]">Probation Completed</span>
                  <span className="font-bold text-sm text-[#131b2e] mt-1">14 Jul 2024</span>
                  <div className="inline-flex items-center gap-1 mt-2 bg-[#86f2e4]/40 text-[#006a61] px-2 py-0.5 rounded-lg font-mono text-[11px] w-fit">
                    <Icon name="verified" className="text-xs" filled />
                    <span>Certified</span>
                  </div>
                </div>
              </div>

              {/* Notice Period */}
              <div>
                <label className="block font-semibold text-[#131b2e] mb-1.5">
                  Mandatory Separation Notice Period
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    disabled
                    value="60 Calendar Days"
                    className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] font-semibold text-xs md:text-sm rounded-xl px-3.5 pr-10 border border-[#eaedff]"
                  />
                  <Icon name="lock" className="absolute right-3.5 text-[#707881] text-base" />
                </div>
                <p className="text-[#707881] mt-1">Requires Chief Medical Officer dual sign-off to waive or amend.</p>
              </div>
            </div>
          </section>

          {/* 2. Organizational Hierarchy & Cadre */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#eaedff]">
              <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="account_tree" className="text-base" />
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                Hierarchy & Cadre
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#131b2e] mb-2">
                  Reporting Line Managers
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3.5 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center font-bold text-xs">
                        SO
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#131b2e]">Dr. Sarah Okafor</p>
                        <p className="text-[11px] text-[#707881]">Clinical Director (Medical Head)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#dae2fd] text-[#3f4850]">
                      Primary
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center font-bold text-xs">
                        SE
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#131b2e]">Samuel Eze</p>
                        <p className="text-[11px] text-[#707881]">Operations Lead (Admin)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#dae2fd] text-[#3f4850]">
                      Operational
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#131b2e] mb-1.5">
                  Assigned Clinical Department
                </label>
                <div className="h-12 bg-[#f2f3ff] rounded-xl px-3.5 flex items-center justify-between text-xs md:text-sm font-semibold text-[#131b2e] border border-[#eaedff]">
                  <span>Restorative & Esthetic Dentistry</span>
                  <Icon name="verified" className="text-base text-[#006a61]" filled />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#131b2e] mb-1.5">
                  Pay Grade / Cadre Assignment
                </label>
                <div className="bg-[#f2f3ff] rounded-xl p-3.5 flex items-center justify-between border border-[#eaedff] flex-wrap gap-2">
                  <div>
                    <p className="font-semibold text-sm text-[#131b2e]">Senior Consultant Cadre</p>
                    <p className="text-xs font-mono text-[#006194] font-semibold mt-0.5">Scale Level SC-04 • Tier A Benefits</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast('Cadre scale audit log retrieved.')}
                    className="px-3 py-1.5 rounded-lg bg-white text-[#006194] text-xs font-semibold shadow-xs hover:bg-[#eaedff] transition-colors"
                  >
                    Audit Scale
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Work Location & Contracted Hours */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#eaedff]">
              <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="domain" className="text-base" />
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                Location & Contracted Hours
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {/* Branch 1 */}
              <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-2 border border-[#eaedff]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#131b2e]">Wuse 2 Main Branch</span>
                  <span className="bg-[#006194] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Base Facility
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#707881]">
                  <span>Operatory Suites 1 & 3 (Chairside)</span>
                  <span className="font-bold text-[#131b2e]">32 hrs / week</span>
                </div>
                <div className="w-full bg-[#dae2fd] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#006194] h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>

              {/* Branch 2 */}
              <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-2 border border-[#eaedff]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#131b2e]">Maitama Specialist Centre</span>
                  <span className="bg-[#dae2fd] text-[#131b2e] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Secondary
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#707881]">
                  <span>Specialist Consultation Clinic (Wednesdays)</span>
                  <span className="font-bold text-[#131b2e]">8 hrs / week</span>
                </div>
                <div className="w-full bg-[#dae2fd] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#006a61] h-full rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>

              {/* On-Call Callout */}
              <div className="p-3.5 bg-[#eaedff] rounded-xl flex items-start gap-3 text-xs text-[#3f4850] border border-[#dae2fd]">
                <Icon name="alarm_on" className="text-lg text-[#006a61] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#131b2e]">On-Call Compensation Plan</p>
                  <p className="text-[#707881] mt-0.5 leading-relaxed">
                    Tier 1 Weekend Urgent Triage: 1.75× standard hourly surcharge + call-out bonus for unscheduled restorative trauma coverage.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Emergency Contact & Next of Kin */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
                  <Icon name="family_restroom" className="text-base" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                  Emergency Next of Kin
                </h3>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-medium text-[#707881]">
                <Icon name="lock" className="text-xs" />
                Secured
              </span>
            </div>

            <div className="bg-[#f2f3ff] rounded-xl p-4 flex flex-col gap-3 text-xs border border-[#eaedff]">
              <div>
                <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wide block">
                  Full Name & Title
                </span>
                <span className="font-bold text-sm text-[#131b2e] block mt-0.5">
                  Dr. (Mrs.) Folake Adeyemi
                </span>
                <span className="inline-block mt-1 bg-white text-[#707881] px-2.5 py-0.5 rounded shadow-xs">
                  Spouse & Designated Primary Next of Kin
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#eaedff]">
                <div>
                  <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wide block">
                    Emergency Direct Dial
                  </span>
                  <span className="font-bold text-sm text-[#131b2e] block mt-0.5">
                    +234 802 881 9920
                  </span>
                </div>
                <a
                  href="tel:+2348028819920"
                  className="w-10 h-10 rounded-xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center shadow-xs hover:bg-[#89f5e7] transition-colors"
                  title="Call Next of Kin"
                >
                  <Icon name="call" className="text-lg" />
                </a>
              </div>
            </div>
          </section>

          {/* 5. Administrative & HR Notes */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
                  <Icon name="history_edu" className="text-base" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                  HR Administrative Ledger
                </h3>
              </div>
              <span className="font-mono text-xs text-[#707881] bg-[#f2f3ff] px-2 py-0.5 rounded">
                Rev 08-2026
              </span>
            </div>

            <div className="bg-[#f2f3ff] rounded-xl p-3.5 space-y-1 text-xs border border-[#eaedff]">
              <div className="flex items-center justify-between text-[#707881] text-[11px]">
                <span className="font-semibold text-[#006194]">Executive Note • Signed by S. Okafor</span>
                <span className="font-mono">24 Aug 2026</span>
              </div>
              <p className="text-[#131b2e] leading-relaxed italic">
                “Annual performance review completed Aug 2026. Promoted to Restorative Clinical Lead. Eligible for academic conference sabbatical 2027.”
              </p>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-semibold text-[#131b2e]">
                Add New Audited Annotation
              </label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
                placeholder="Record contract revisions, administrative dispensations, or executive covenants..."
                className="w-full bg-[#f2f3ff] text-[#131b2e] text-xs rounded-xl p-3.5 focus:outline-none focus:bg-white border border-[#eaedff] resize-none"
              />
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full sm:flex-1 h-12 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Icon name="save" className="text-lg" />
              <span>{isSaving ? 'Saving to HR Vault...' : 'Save HR Profile Changes'}</span>
            </button>
            <button
              onClick={handlePdf}
              className="w-full sm:flex-1 h-12 bg-white hover:bg-[#f2f3ff] text-[#131b2e] border border-[#eaedff] rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Icon name="picture_as_pdf" className="text-lg text-[#006194]" />
              <span>Generate Employment Letter (PDF)</span>
            </button>
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => navigate('/staff-management/profile')}
              className="text-xs text-[#707881] hover:text-[#131b2e] font-semibold inline-flex items-center gap-1 transition-colors"
            >
              <Icon name="arrow_back" className="text-sm" />
              <span>Back to Staff Profile</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
