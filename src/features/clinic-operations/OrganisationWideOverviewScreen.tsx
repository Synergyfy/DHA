import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function OrganisationWideOverviewScreen() {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 2400);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      triggerToast('Consolidated Group Report Dispatched to Medical Director');
    }, 1500);
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-['Inter',sans-serif]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#283044] text-[#eef0ff] px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <Icon name="check_circle" className="text-[16px] text-[#00a392]" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#006194] text-white shadow-sm shrink-0">
              <Icon name="dentistry" className="text-[22px]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#131b2e] truncate">
                  BrightSmile Dental OS
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#eaedff] text-[#006194] text-[10px] font-bold uppercase tracking-wider">
                  DHA
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/clinic-operations/branch-switcher')}
                className="flex items-center gap-0.5 text-xs text-[#3f4850] hover:text-[#131b2e] transition-colors text-left"
              >
                <span className="font-medium truncate max-w-[140px] sm:max-w-xs">
                  All Combined Branches (Abuja)
                </span>
                <Icon name="keyboard_arrow_down" className="text-[16px]" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              disabled={isExporting}
              onClick={handleExport}
              className="hidden sm:flex h-9 px-3.5 items-center gap-1.5 rounded-xl border border-[#dae2fd] text-xs font-semibold text-[#131b2e] bg-white hover:bg-[#eaedff] transition-colors"
            >
              <Icon
                name={isExporting ? 'sync' : 'picture_as_pdf'}
                className={`text-[16px] text-[#006194] ${isExporting ? 'animate-spin' : ''}`}
              />
              <span>{isExporting ? 'Compiling...' : 'Export Group PDF'}</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shadow-sm text-white ml-1">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-28 space-y-6">
        {/* Scope & Facility Indicator Strip */}
        <div className="w-full bg-[#eaedff] rounded-2xl p-3 sm:p-4 flex items-center justify-between border border-[#dae2fd]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#001d31] shrink-0 shadow-sm">
              <Icon name="domain_add" className="text-[20px]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006194] block leading-tight">
                Consolidated Scope
              </span>
              <p className="text-xs sm:text-sm font-bold text-[#131b2e] truncate">
                3 Operating Sites • Abuja Metropolitan District
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] shrink-0 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse" />
            <span>Live Group Feed</span>
          </div>
        </div>

        {/* Hero Multi-Site Metric Summary Banner */}
        <div className="w-full bg-gradient-to-br from-[#006194] via-[#007bb9] to-[#287ab3] rounded-3xl p-6 sm:p-7 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="flex justify-between items-start mb-4 relative z-10 flex-wrap gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#cce5ff] opacity-90 block">
                Aggregate Today's Revenue
              </span>
              <div className="flex items-baseline gap-3 mt-1 flex-wrap">
                <span className="text-3xl sm:text-4xl font-black tracking-tight font-mono">
                  ₦2,450,000
                </span>
                <span className="text-xs font-bold text-[#89f5e7] bg-white/15 px-2.5 py-0.5 rounded-full">
                  +12.4% vs last Thu
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#cce5ff] shrink-0">
              <Icon name="query_stats" className="text-[26px]" />
            </div>
          </div>

          {/* Revenue Proportional Segmented Bar */}
          <div className="w-full space-y-2 pt-1 relative z-10">
            <div className="w-full h-2.5 rounded-full bg-white/20 flex overflow-hidden p-0.5 gap-1">
              <div
                className="h-full bg-[#89f5e7] rounded-full transition-all duration-500"
                style={{ width: '45%' }}
                title="Wuse 2: 45%"
              />
              <div
                className="h-full bg-[#cce5ff] rounded-full transition-all duration-500"
                style={{ width: '32%' }}
                title="Garki: 32%"
              />
              <div
                className="h-full bg-[#94ccff] rounded-full transition-all duration-500"
                style={{ width: '23%' }}
                title="Maitama: 23%"
              />
            </div>
            <div className="flex justify-between items-center text-xs font-medium text-[#cce5ff] pt-0.5 flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#89f5e7] inline-block" />
                <span>Wuse 2 Main (45% • ₦1,102,500)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#cce5ff] inline-block" />
                <span>Garki Satellite (32% • ₦784,000)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#94ccff] inline-block" />
                <span>Maitama Outpost (23% • ₦563,500)</span>
              </span>
            </div>
          </div>

          {/* Micro KPIs Row */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/15 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Icon name="person_pin" className="text-[18px] text-[#cce5ff]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-[#cce5ff]">Registered Patient Base</p>
                <p className="text-sm sm:text-base font-bold truncate mt-0.5">
                  8,420 <span className="text-xs text-[#89f5e7] font-semibold">(+48 wtd)</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Icon name="badge" className="text-[18px] text-[#89f5e7]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-[#cce5ff]">Active Clinicians</p>
                <p className="text-sm sm:text-base font-bold truncate mt-0.5">
                  16 Rostered On-Duty
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Appointment Aggregate Dial Card */}
        <div className="w-full bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="calendar_view_day" className="text-[#006194] text-[20px]" />
              <h2 className="text-sm font-bold text-[#131b2e] uppercase tracking-wider">
                Daily Appointments Across Group
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#eaedff] text-[#006194] text-xs font-bold">
              64 Total Today
            </span>
          </div>

          {/* Segmented Progression Meter */}
          <div className="w-full h-3 rounded-full bg-[#f2f3ff] flex overflow-hidden gap-1 p-0.5 border border-[#dae2fd]">
            <div
              className="h-full rounded-full bg-[#006a61] transition-all"
              style={{ width: '59.3%' }}
              title="Completed: 38"
            />
            <div
              className="h-full rounded-full bg-[#006194] transition-all"
              style={{ width: '25%' }}
              title="In Progress: 16"
            />
            <div
              className="h-full rounded-full bg-[#dae2fd] transition-all"
              style={{ width: '12.5%' }}
              title="Scheduled: 8"
            />
            <div
              className="h-full rounded-full bg-[#ba1a1a] transition-all"
              style={{ width: '3.2%' }}
              title="No-Show: 2"
            />
          </div>

          {/* 4-Pill Metric Distribution */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col items-center">
              <span className="text-lg font-bold text-[#006a61]">38</span>
              <span className="text-[10px] text-[#707881] font-semibold mt-0.5">Done</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col items-center">
              <span className="text-lg font-bold text-[#006194]">16</span>
              <span className="text-[10px] text-[#707881] font-semibold mt-0.5">Active</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col items-center">
              <span className="text-lg font-bold text-[#131b2e]">8</span>
              <span className="text-[10px] text-[#707881] font-semibold mt-0.5">Queued</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#ffdad6]/50 border border-[#ffdad6] flex flex-col items-center">
              <span className="text-lg font-bold text-[#ba1a1a]">2</span>
              <span className="text-[10px] text-[#93000a] font-semibold mt-0.5">No-Show</span>
            </div>
          </div>
        </div>

        {/* Comparative Branch Status (3 Facilities) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Icon name="apartment" className="text-[#006194] text-[20px]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#131b2e]">
                Comparative Branch Status
              </h2>
            </div>
            <span className="text-xs font-semibold text-[#006a61]">3 of 3 Online</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Branch A: Wuse 2 Main */}
            <div className="bg-white rounded-3xl p-5 border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#006194] transition-all">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-[#131b2e]">Wuse 2 Central HQ</h3>
                    <p className="text-xs text-[#006a61] flex items-center gap-1 mt-0.5 font-medium">
                      <Icon name="verified" className="text-[14px]" />
                      <span>DHA Gazetted • Tier 2 Surgical</span>
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-[10px] font-bold">
                    HQ #001
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 mt-2 text-center">
                  <div className="bg-[#f2f3ff] rounded-xl p-2">
                    <span className="text-[9px] font-bold text-[#707881] uppercase block">Util</span>
                    <span className="text-sm font-bold text-[#006194]">88%</span>
                    <span className="text-[9px] text-[#006a61] block">4/4 Chairs</span>
                  </div>
                  <div className="bg-[#f2f3ff] rounded-xl p-2">
                    <span className="text-[9px] font-bold text-[#707881] uppercase block">Appts</span>
                    <span className="text-sm font-bold text-[#131b2e]">28</span>
                    <span className="text-[9px] text-[#707881] block">5 Clinicians</span>
                  </div>
                  <div className="bg-[#f2f3ff] rounded-xl p-2">
                    <span className="text-[9px] font-bold text-[#707881] uppercase block">Wait</span>
                    <span className="text-sm font-bold text-[#006a61]">14m</span>
                    <span className="text-[9px] text-[#006a61] block">&lt;20m target</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/clinic-operations/branch-overview')}
                className="w-full h-10 rounded-xl bg-[#eaedff] hover:bg-[#cce5ff] text-[#006194] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <span>View Wuse 2 Operations</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </button>
            </div>

            {/* Branch B: Garki Satellite */}
            <div className="bg-white rounded-3xl p-5 border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#006194] transition-all">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-[#131b2e]">Garki Satellite (#002)</h3>
                    <p className="text-xs text-[#006195] flex items-center gap-1 mt-0.5 font-medium">
                      <Icon name="check_circle" className="text-[14px]" />
                      <span>DHA Provisional • Outpatient</span>
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850] text-[10px] font-bold">
                    #002
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 mt-2 text-center">
                  <div className="bg-[#f2f3ff] rounded-xl p-2">
                    <span className="text-[9px] font-bold text-[#707881] uppercase block">Util</span>
                    <span className="text-sm font-bold text-[#006194]">75%</span>
                    <span className="text-[9px] text-[#006a61] block">2/2 Chairs</span>
                  </div>
                  <div className="bg-[#f2f3ff] rounded-xl p-2">
                    <span className="text-[9px] font-bold text-[#707881] uppercase block">Appts</span>
                    <span className="text-sm font-bold text-[#131b2e]">22</span>
                    <span className="text-[9px] text-[#707881] block">3 Clinicians</span>
                  </div>
                  <div className="bg-[#f2f3ff] rounded-xl p-2">
                    <span className="text-[9px] font-bold text-[#707881] uppercase block">Wait</span>
                    <span className="text-sm font-bold text-[#006a61]">9m</span>
                    <span className="text-[9px] text-[#006a61] block">Optimal</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => triggerToast('Routing to Garki Satellite overview')}
                className="w-full h-10 rounded-xl bg-[#eaedff] hover:bg-[#cce5ff] text-[#006194] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <span>View Garki Operations</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </button>
            </div>

            {/* Branch C: Maitama Specialist */}
            <div className="bg-white rounded-3xl p-5 border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#006194] transition-all">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-[#131b2e]">Maitama Outpost (#003)</h3>
                    <p className="text-xs text-[#006a61] flex items-center gap-1 mt-0.5 font-medium">
                      <Icon name="verified" className="text-[14px]" />
                      <span>DHA Gazetted • Pediatric &amp; Ortho</span>
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                    #003
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 mt-2 text-center">
                  <div className="bg-[#f2f3ff] rounded-xl p-2">
                    <span className="text-[9px] font-bold text-[#707881] uppercase block">Util</span>
                    <span className="text-sm font-bold text-[#006194]">92%</span>
                    <span className="text-[9px] text-[#ba1a1a] block">High Load</span>
                  </div>
                  <div className="bg-[#f2f3ff] rounded-xl p-2">
                    <span className="text-[9px] font-bold text-[#707881] uppercase block">Appts</span>
                    <span className="text-sm font-bold text-[#131b2e]">14</span>
                    <span className="text-[9px] text-[#707881] block">2 Specialists</span>
                  </div>
                  <div className="bg-[#f2f3ff] rounded-xl p-2">
                    <span className="text-[9px] font-bold text-[#707881] uppercase block">Wait</span>
                    <span className="text-sm font-bold text-[#006a61]">11m</span>
                    <span className="text-[9px] text-[#006a61] block">Smooth flow</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => triggerToast('Routing to Maitama Outpost overview')}
                className="w-full h-10 rounded-xl bg-[#eaedff] hover:bg-[#cce5ff] text-[#006194] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <span>View Maitama Operations</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Cross-Branch Resource & Shift Matrix & Central Workflow Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Cross-Branch Resource Matrix */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="transfer_within_a_station" className="text-[#006194] text-[20px]" />
                <h3 className="text-sm font-bold text-[#131b2e] uppercase tracking-wider">
                  Cross-Branch Resource Matrix
                </h3>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]" />
            </div>

            <div className="space-y-3">
              {/* Doctor Rotation Alert 1 */}
              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="directions_car" className="text-[18px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <h4 className="text-xs font-bold text-[#131b2e]">Dr. Sarah Bello</h4>
                    <span className="text-[10px] font-bold text-[#006194] bg-[#cce5ff] px-2 py-0.5 rounded">
                      14:00 Rotation
                    </span>
                  </div>
                  <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                    Endodontic Consult • Rotating from <strong>Wuse 2</strong> to{' '}
                    <strong>Maitama</strong> for 3 root canal obturations.
                  </p>
                </div>
              </div>

              {/* Trauma Surgeon Alert 2 */}
              <div className="p-3.5 rounded-2xl bg-[#86f2e4]/30 border border-[#86f2e4] flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#006a61] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Icon name="medical_services" className="text-[18px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <h4 className="text-xs font-bold text-[#006f66]">Dr. Daniel Okoro</h4>
                    <span className="text-[10px] font-bold bg-[#006a61] text-white px-2 py-0.5 rounded-full">
                      Trauma Pager Active
                    </span>
                  </div>
                  <p className="text-xs text-[#006f66] mt-1 leading-relaxed">
                    Designated Multi-Site Maxillofacial On-Call • Standby for emergency surgical intake across all 3 units.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Central Clinical Workflow Pipeline */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="account_tree" className="text-[#006194] text-[20px]" />
                <h3 className="text-sm font-bold text-[#131b2e] uppercase tracking-wider">
                  Central Workflow Pipeline
                </h3>
              </div>
              <span className="text-xs font-mono font-medium text-[#707881]">Group Aggregate</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#dae2fd] flex items-center justify-center text-[#006194] shrink-0">
                    <Icon name="biotech" className="text-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#131b2e]">Pending Lab Investigations</p>
                    <p className="text-[11px] text-[#707881]">Crowns, Histology &amp; Aligners</p>
                  </div>
                </div>
                <span className="text-lg font-black text-[#006194] font-mono">11</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#dae2fd] flex items-center justify-center text-[#006a61] shrink-0">
                    <Icon name="request_quote" className="text-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#131b2e]">Quotes Awaiting Decision</p>
                    <p className="text-[11px] text-[#006a61] font-semibold">
                      ₦1,850,000 Pipeline Value
                    </p>
                  </div>
                </div>
                <span className="text-lg font-black text-[#131b2e] font-mono">9</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#dae2fd] flex items-center justify-center text-[#006195] shrink-0">
                    <Icon name="event_repeat" className="text-[18px]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#131b2e]">Group Follow-ups This Week</p>
                    <p className="text-[11px] text-[#707881]">Post-op Suture Removals &amp; Checks</p>
                  </div>
                </div>
                <span className="text-lg font-black text-[#006a61] font-mono">34</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Bottom Action Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/branch-switcher')}
            className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            <Icon name="swap_horiz" className="text-[20px]" />
            <span>Switch to Specific Branch View (16.5)</span>
          </button>
          <button
            type="button"
            disabled={isExporting}
            onClick={handleExport}
            className="w-full h-12 rounded-xl bg-white hover:bg-[#f2f3ff] border border-[#dae2fd] text-[#131b2e] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Icon
              name={isExporting ? 'sync' : 'picture_as_pdf'}
              className={`text-[18px] text-[#006a61] ${isExporting ? 'animate-spin' : ''}`}
            />
            <span>
              {isExporting ? 'Compiling Analytics...' : 'Export Consolidated Group Report (PDF)'}
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
export default OrganisationWideOverviewScreen;
