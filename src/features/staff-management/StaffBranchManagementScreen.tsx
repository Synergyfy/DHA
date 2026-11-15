import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const StaffBranchManagementScreen: React.FC = () => {
  const navigate = useNavigate();
  const [historyOpen, setHistoryOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
        <div className="max-w-5xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/staff-management/directory')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff] transition-colors"
              title="Go back"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg md:text-xl text-[#131b2e] truncate">
              Staff Branch Management
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast('Context menu opened')}
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
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-8 pt-20 pb-20">
        <div className="flex flex-col gap-5">
          {/* Profile & Deployment Master Card */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-[#cce5ff] text-[#006194] flex items-center justify-center font-['Plus_Jakarta_Sans'] font-bold text-xl shrink-0 shadow-xs">
                  MA
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-['Plus_Jakarta_Sans'] text-lg md:text-xl font-bold text-[#131b2e]">
                      Dr. Michael Adeyemi
                    </h2>
                    <span className="bg-[#eaedff] text-[#3f4850] text-xs font-mono px-2 py-0.5 rounded">
                      #STF-ADE-01
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-[#707881] mt-0.5">
                    Senior Consultant • Restorative Dentistry
                  </p>
                </div>
              </div>

              <div className="bg-[#86f2e4] text-[#006f66] px-3 py-1 rounded-full flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                <span className="text-xs font-bold uppercase tracking-wider">Active Deployments</span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 mt-4 border-t border-[#eaedff]">
              <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex flex-col justify-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
                  Total Weekly Hours
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#006194]">40</span>
                  <span className="text-xs text-[#707881]">hrs / wk</span>
                </div>
                <span className="text-xs text-[#006a61] flex items-center gap-1 mt-1 font-medium">
                  <Icon name="domain" className="text-sm" />
                  Across 2 Clinical Sites
                </span>
              </div>

              <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex flex-col justify-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
                  Licensure Standing
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <Icon name="verified" className="text-[#006a61] text-lg" filled />
                  <span className="font-semibold text-sm text-[#131b2e]">MDCN Verified</span>
                </div>
                <span className="text-xs font-mono text-[#707881] mt-1">Reg #DEN-78421</span>
              </div>
            </div>

            {/* Active Branches Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <span className="bg-[#eaedff] text-[#131b2e] text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <Icon name="star" className="text-xs text-[#006194]" />
                HQ: Wuse 2 Main
              </span>
              <span className="text-[#bfc7d2] text-xs">•</span>
              <span className="bg-[#eaedff] text-[#131b2e] text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <Icon name="sync_alt" className="text-xs text-[#006a61]" />
                Rotational: Maitama Specialist
              </span>
            </div>
          </div>

          {/* Branch Allocation List Header */}
          <div className="flex items-center justify-between px-1">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
              Assigned Facilities
            </h3>
            <span className="text-xs font-bold text-[#707881] uppercase tracking-wider">
              Current Roster (2)
            </span>
          </div>

          {/* Branch 1: Primary HQ */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#eaedff] overflow-hidden">
            <div className="p-4 md:p-5 bg-gradient-to-r from-[#cce5ff]/30 via-transparent to-transparent border-b border-[#eaedff]">
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="bg-[#006194] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Icon name="home_work" className="text-xs" />
                  Primary Base • 32 hrs/wk
                </span>
                <span className="bg-[#eaedff] text-[#3f4850] text-xs font-mono px-2 py-0.5 rounded">
                  HQ #001
                </span>
              </div>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#131b2e]">
                Harmony Dental Clinic — Wuse 2
              </h4>
              <p className="text-xs text-[#707881]">Plot 124 Aminu Kano Cres, Wuse II, Abuja</p>
            </div>

            <div className="p-4 md:p-5 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-2 rounded-xl">
                  <Icon name="badge" className="text-[#006194] text-base" />
                  <div className="min-w-0 text-xs">
                    <p className="text-[#707881] text-[10px] uppercase font-bold">Role Title</p>
                    <p className="font-semibold text-[#131b2e] truncate">Lead Restorative Dentist</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-2 rounded-xl">
                  <Icon name="medical_services" className="text-[#006194] text-base" />
                  <div className="min-w-0 text-xs">
                    <p className="text-[#707881] text-[10px] uppercase font-bold">Designated Operatory</p>
                    <p className="font-semibold text-[#131b2e] truncate">Operatory 01 (Master)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-2 rounded-xl">
                  <Icon name="calendar_month" className="text-[#006194] text-base" />
                  <div className="min-w-0 text-xs">
                    <p className="text-[#707881] text-[10px] uppercase font-bold">Duty Schedule</p>
                    <p className="font-semibold text-[#131b2e]">Mon, Tue, Thu, Fri (08:30–17:30)</p>
                  </div>
                </div>
              </div>

              {/* Delegations */}
              <div>
                <p className="text-[11px] font-bold text-[#707881] uppercase tracking-wider mb-2">
                  Operational Delegations
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-[#eaedff] text-[#131b2e] px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Icon name="verified_user" className="text-xs text-[#006a61]" />
                    Lead Restorative Triage
                  </span>
                  <span className="bg-[#eaedff] text-[#131b2e] px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Icon name="sanitizer" className="text-xs text-[#006a61]" />
                    Class B Sterilization QA
                  </span>
                  <span className="bg-[#eaedff] text-[#131b2e] px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Icon name="school" className="text-xs text-[#006a61]" />
                    Resident Mentorship
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                <button
                  onClick={() => triggerToast('Edit schedule calendar opened')}
                  className="flex-1 bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="edit_calendar" className="text-base text-[#006194]" />
                  Edit Schedule
                </button>
                <button
                  onClick={() => navigate('/staff-management/directory')}
                  className="flex-1 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="group" className="text-base" />
                  View Branch Roster
                </button>
              </div>
            </div>
          </div>

          {/* Branch 2: Rotational Facility */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#eaedff] overflow-hidden">
            <div className="p-4 md:p-5 bg-gradient-to-r from-[#86f2e4]/20 via-transparent to-transparent border-b border-[#eaedff]">
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="bg-[#006a61] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Icon name="cached" className="text-xs" />
                  Rotational Specialty • 8 hrs/wk
                </span>
                <span className="bg-[#eaedff] text-[#3f4850] text-xs font-mono px-2 py-0.5 rounded">
                  Branch #003
                </span>
              </div>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#131b2e]">
                Harmony Specialist Dental Centre — Maitama
              </h4>
              <p className="text-xs text-[#707881]">14 Gana Street, Maitama District, Abuja</p>
            </div>

            <div className="p-4 md:p-5 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-2 rounded-xl">
                  <Icon name="badge" className="text-[#006a61] text-base" />
                  <div className="min-w-0 text-xs">
                    <p className="text-[#707881] text-[10px] uppercase font-bold">Role Title</p>
                    <p className="font-semibold text-[#131b2e] truncate">Visiting Endo Consultant</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-2 rounded-xl">
                  <Icon name="biotech" className="text-[#006a61] text-base" />
                  <div className="min-w-0 text-xs">
                    <p className="text-[#707881] text-[10px] uppercase font-bold">Designated Operatory</p>
                    <p className="font-semibold text-[#131b2e] truncate">Operatory 02 (Micro Endo Bay)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-2 rounded-xl">
                  <Icon name="schedule" className="text-[#006a61] text-base" />
                  <div className="min-w-0 text-xs">
                    <p className="text-[#707881] text-[10px] uppercase font-bold">Duty Schedule</p>
                    <p className="font-semibold text-[#131b2e]">Wednesdays (09:00–17:00)</p>
                  </div>
                </div>
              </div>

              {/* Delegations */}
              <div>
                <p className="text-[11px] font-bold text-[#707881] uppercase tracking-wider mb-2">
                  Operational Delegations
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-[#eaedff] text-[#131b2e] px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Icon name="dentistry" className="text-xs text-[#006194]" />
                    Complex Molar Endodontics
                  </span>
                  <span className="bg-[#eaedff] text-[#131b2e] px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Icon name="auto_fix_high" className="text-xs text-[#006194]" />
                    Aesthetic Veneers Consultation
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                <button
                  onClick={() => triggerToast('Edit schedule calendar opened')}
                  className="flex-1 bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="edit_calendar" className="text-base text-[#006194]" />
                  Edit Schedule
                </button>
                <button
                  onClick={() => triggerToast('Rotational removal initiated')}
                  className="bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ffdad6]/80 text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="person_remove" className="text-base" />
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Add Additional Facility Banner */}
          <button
            onClick={() => navigate('/staff-management/branch-assignment')}
            className="w-full bg-[#f2f3ff] hover:bg-[#eaedff] p-4 md:p-5 rounded-2xl transition-all flex items-center justify-between text-left border border-[#eaedff] group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Icon name="add_business" className="text-xl" />
              </div>
              <div>
                <p className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131b2e]">
                  + Assign to Additional Branch
                </p>
                <p className="text-xs text-[#707881]">
                  e.g. Gwarinpa Outpost or Jabi Satellite Clinic
                </p>
              </div>
            </div>
            <Icon name="chevron_right" className="text-lg text-[#707881] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Assignment History Log (Accordion) */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#eaedff] p-5">
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className="w-full flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <Icon name="history" className="text-lg text-[#006194]" />
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131b2e]">
                  Assignment History Log
                </h4>
                <span className="bg-[#eaedff] text-[#3f4850] text-[11px] font-mono px-2 py-0.5 rounded-full">
                  2 records
                </span>
              </div>
              <Icon
                name="expand_more"
                className={`text-lg text-[#707881] transition-transform duration-200 ${
                  historyOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {historyOpen && (
              <div className="mt-4 pt-3 border-t border-[#eaedff] relative pl-6 space-y-4 text-xs">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#eaedff]"></div>

                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#006a61] ring-4 ring-white"></div>
                  <span className="font-mono text-[#707881] text-[11px]">10 May 2025 • 11:20 AM</span>
                  <p className="font-semibold text-[#131b2e] mt-0.5">Rotational Assignment Added</p>
                  <p className="text-[#707881]">
                    Assigned 8 hrs/week at Maitama Specialist Centre by Medical Director Dr. Sarah Odumodu.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#006194] ring-4 ring-white"></div>
                  <span className="font-mono text-[#707881] text-[11px]">14 Jan 2024 • 09:00 AM</span>
                  <p className="font-semibold text-[#131b2e] mt-0.5">Primary Base Established</p>
                  <p className="text-[#707881]">
                    Contract finalized for Wuse 2 HQ as Lead Restorative Dentist with full clinical privileges.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Statutory Credential Safeguard Notice */}
          <div className="bg-[#f2f3ff] rounded-2xl p-4 md:p-5 flex items-start gap-3 border border-[#eaedff]">
            <Icon name="gavel" className="text-xl text-[#006a61] shrink-0 mt-0.5" />
            <div className="text-xs text-[#3f4850] space-y-1">
              <p className="font-semibold text-[#131b2e]">Statutory Credential Safeguard</p>
              <p className="leading-relaxed">
                Practitioner credentials (<span className="font-mono text-[#131b2e] font-semibold">MDCN #DEN-78421</span>) and regional indemnity insurance automatically cover all licensed Harmony Group facilities within the Federal Capital Territory (FCT Abuja). Altering or transferring a branch deployment does not impact independent medical standing or diagnostic verification authority.
              </p>
            </div>
          </div>

          {/* Master Administrative Bottom Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigate('/staff-management/branch-assignment')}
              className="w-full sm:flex-1 h-12 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Icon name="swap_horiz" className="text-lg" />
              Change Primary Branch
            </button>
            <button
              onClick={() => triggerToast('Exporting deployment schedule PDF...')}
              className="w-full sm:flex-1 h-12 bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Icon name="ios_share" className="text-lg text-[#006194]" />
              Export Deployment Schedule
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
