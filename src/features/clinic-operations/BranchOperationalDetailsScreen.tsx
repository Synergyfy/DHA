import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface OperatoryRoom {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Ready' | 'Calibrated' | 'Maintenance';
  provider: string;
  icon: string;
}

export const BranchOperationalDetailsScreen: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [restockQty, setRestockQty] = useState('10');
  const [stockLevel, setStockLevel] = useState(3);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const operatories: OperatoryRoom[] = [
    {
      id: 'OP-01',
      name: 'Operatory Suite A',
      type: 'Restorative Care',
      status: 'Active',
      provider: 'Dr. Okoro • Active in procedure',
      icon: 'medical_services',
    },
    {
      id: 'OP-02',
      name: 'Operatory Suite B',
      type: 'Orthodontics & Aligners',
      status: 'Active',
      provider: 'Dr. Bello • Bonding appointment',
      icon: 'airline_seat_recline_extra',
    },
    {
      id: 'OP-03',
      name: 'CBCT Imaging Suite',
      type: 'Radiology & Surgery',
      status: 'Calibrated',
      provider: 'Planmeca 3D • Ready for scan',
      icon: 'upload_file',
    },
    {
      id: 'OP-04',
      name: 'Hygiene Bay 01',
      type: 'Preventive Prophylaxis',
      status: 'Ready',
      provider: 'Sanitised & Ready for intake',
      icon: 'clean_hands',
    },
  ];

  const handleOrderRestock = (e: React.FormEvent) => {
    e.preventDefault();
    setStockLevel((prev) => prev + parseInt(restockQty, 10));
    setIsRestockModalOpen(false);
    showToast(`Purchase order for ${restockQty} packs of Composite Resin A2 submitted!`);
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] text-[#faf8ff] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-[#86f2e4] text-lg" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <Icon name="close" className="text-sm" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#dae2fd]/40">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full text-[#131b2e] hover:bg-[#e2e7ff] active:bg-[#dae2fd] transition-colors"
              aria-label="Back"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#006194]">Campus Registry</span>
                <span className="text-xs text-[#707881]">•</span>
                <span className="font-mono text-xs text-[#3f4850]">Branch HQ #001</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Branch Operational Details
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Exporting branch operational report...')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="download" className="text-[16px]" />
              <span>Export Audit</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Icon name="domain" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Hero Location & Facility Mosaic */}
        <div className="relative overflow-hidden rounded-2xl bg-white border border-[#dae2fd] shadow-sm p-6">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-[#86f2e4]/20 blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-semibold uppercase tracking-wider">
              <Icon name="verified" className="text-[15px] fill-current" />
              <span>HQ #001 • DHA Tier 2 Surgical Centre</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f2f3ff] text-[#006a61] text-xs font-mono font-semibold border border-[#86f2e4]/50">
                <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse" />
                <span>Online & Operational</span>
              </span>
            </div>
          </div>

          {/* Title & Organization */}
          <div className="mt-4 relative z-10">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-bold text-[#131b2e]">
              Wuse 2 Main Campus
            </h2>
            <p className="text-sm text-[#3f4850] flex items-center gap-1.5 mt-1">
              <Icon name="domain" className="text-[18px] text-[#006194]" />
              <span>BrightSmile Dental Centre • Primary Flagship Hub</span>
            </p>
          </div>

          {/* Visual Mosaic & Location Snippet */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 relative z-10">
            <div className="md:col-span-2 relative h-48 sm:h-56 rounded-xl overflow-hidden shadow-xs border border-[#dae2fd]/60 group">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                alt="Modern dental surgical operatory"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs text-white font-semibold flex items-center gap-1.5">
                  <Icon name="local_hospital" className="text-[16px] text-[#86f2e4]" />
                  <span>Operatory Suite A • Planmeca Sovereign High-Precision Chair</span>
                </span>
              </div>
            </div>

            <div className="relative h-48 sm:h-56 rounded-xl bg-[#f2f3ff] border border-[#dae2fd] flex flex-col items-center justify-center text-center p-5 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#cce5ff] flex items-center justify-center text-[#006194] shadow-xs">
                <Icon name="location_on" className="text-[26px]" />
              </div>
              <div>
                <span className="text-sm font-bold text-[#131b2e] block">14 Aminu Kano Crescent</span>
                <span className="text-xs text-[#3f4850] block mt-0.5">Wuse 2, Abuja, FCT</span>
              </div>
              <button
                type="button"
                onClick={() => setShowMapModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Icon name="map" className="text-[15px]" />
                <span>Interactive Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Operational Pulse Stat Grid (Today's Live Flow) */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse" />
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e]">
                Live Patient Flow & Throughput
              </h3>
            </div>
            <span className="font-mono text-xs text-[#707881]">Real-time Telemetry • Updated 1m ago</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#f2f3ff] rounded-xl p-4 text-center border border-[#eaedff]">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#006194] block">28</span>
              <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider mt-1 block">Scheduled</span>
              <span className="text-[11px] text-[#707881]">Booked across 4 suites</span>
            </div>

            <div className="bg-[#f2f3ff] rounded-xl p-4 text-center border border-[#eaedff]">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#006195] block">6</span>
              <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider mt-1 block">Walk-ins</span>
              <span className="text-[11px] text-[#707881]">Triaged at reception</span>
            </div>

            <div className="bg-[#86f2e4]/20 rounded-xl p-4 text-center border border-[#86f2e4]/50">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#006a61] block">4</span>
              <span className="text-xs font-semibold text-[#006a61] uppercase tracking-wider mt-1 block">In Waiting</span>
              <span className="text-[11px] text-[#006f66]">Average wait 9 mins</span>
            </div>
          </div>

          {/* Capacity Progress Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="w-full bg-[#eaedff] rounded-full h-2.5 overflow-hidden flex">
              <div className="bg-[#006194] h-full w-[74%] rounded-l-full" title="74% Booked Procedures" />
              <div className="bg-[#006a61] h-full w-[16%]" title="16% Walk-ins In Chair" />
              <div className="bg-[#bfc7d2] h-full w-[10%] rounded-r-full" title="10% Buffer Capacity" />
            </div>
            <div className="flex flex-wrap items-center justify-between text-xs text-[#3f4850] pt-1">
              <span>
                Total Facility Capacity: <strong className="text-[#131b2e]">82% Utilised</strong>
              </span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#006194]" /> Booked (74%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#006a61]" /> Walk-in (16%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#bfc7d2]" /> Buffer (10%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Workstations & Bio-Safety */}
          <div className="lg:col-span-7 space-y-6">
            {/* Operational Capacity & Clinical Workstations */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194]">
                    <Icon name="dentistry" className="text-[20px]" />
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e]">
                      Operatories & Workstations
                    </h3>
                    <p className="text-xs text-[#707881]">4 Surgical Rooms • 10 Active Rostered</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#89f5e7]/40 text-[#005049] text-xs font-mono font-bold">
                  100% Online
                </span>
              </div>

              {/* Operatories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {operatories.map((op) => (
                  <div
                    key={op.id}
                    className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-start gap-3 hover:border-[#dae2fd] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#006194] shrink-0 shadow-xs">
                      <Icon name={op.icon} className="text-[20px]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="font-bold text-xs text-[#131b2e] truncate">{op.name}</p>
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            op.status === 'Active'
                              ? 'bg-[#cce5ff] text-[#001d31]'
                              : op.status === 'Ready'
                              ? 'bg-[#89f5e7] text-[#00201d]'
                              : 'bg-[#dae2fd] text-[#131b2e]'
                          }`}
                        >
                          {op.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#3f4850] truncate mt-0.5">{op.type}</p>
                      <p className="text-[11px] text-[#006a61] truncate mt-1">{op.provider}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Staff Roster Allocation Micro-Pill */}
              <div className="rounded-xl bg-[#eaedff] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-[#dae2fd]">
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-2 overflow-hidden">
                    <div className="inline-block h-7 w-7 rounded-full bg-[#006194] text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                      D
                    </div>
                    <div className="inline-block h-7 w-7 rounded-full bg-[#006195] text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                      B
                    </div>
                    <div className="inline-block h-7 w-7 rounded-full bg-[#006a61] text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                      M
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#131b2e]">10 Staff Members on Duty</span>
                </div>
                <span className="text-xs text-[#3f4850]">5 Clinicians • 3 Nurses • 2 Desk Officers</span>
              </div>
            </div>

            {/* Facilities, Bio-Safety & Asset Readiness */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#89f5e7]/50 flex items-center justify-center text-[#006a61]">
                    <Icon name="verified" className="text-[20px]" />
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e]">
                      Facilities & Safety Diagnostics
                    </h3>
                    <p className="text-xs text-[#707881]">Live Bio-Safety Equipment Audits</p>
                  </div>
                </div>
                <Icon name="shield" className="text-[22px] text-[#006a61]" />
              </div>

              <div className="space-y-3">
                {/* Autoclave */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <Icon name="sanitizer" className="text-[20px] text-[#006a61] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-xs text-[#131b2e]">Autoclave Unit 01</p>
                      <p className="text-xs text-[#707881]">Cycle #4 Active • 134°C Vacuum Sterilisation</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-mono font-semibold self-start sm:self-auto">
                    Spore Test Passed 08:00 AM
                  </span>
                </div>

                {/* CBCT */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <Icon name="radiology" className="text-[20px] text-[#006194] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-xs text-[#131b2e]">CBCT Planmeca ProMax 3D</p>
                      <p className="text-xs text-[#707881]">Radiation Safety Inspection Valid</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#eaedff] text-[#131b2e] text-xs font-mono font-semibold self-start sm:self-auto">
                    Next Audit Jan 2027
                  </span>
                </div>

                {/* Emergency Oxygen */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <Icon name="air" className="text-[20px] text-[#006a61] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-xs text-[#131b2e]">Emergency Oxygen Reserve</p>
                      <p className="text-xs text-[#707881]">Hydro-tested Sep 2026 • 2,000 PSI</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#89f5e7]/40 text-[#005049] text-xs font-mono font-bold self-start sm:self-auto">
                    100% Full
                  </span>
                </div>

                {/* Low Stock Alert Banner */}
                <div className="p-3.5 rounded-xl bg-[#ffdad6] text-[#93000a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#ba1a1a]/20">
                  <div className="flex items-start gap-2.5">
                    <Icon name="warning" className="text-[22px] text-[#ba1a1a] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-xs text-[#93000a]">Low Stock Inventory Alert</p>
                      <p className="text-xs text-[#ba1a1a]/90">Flowable Composite Resin A2 • {stockLevel} packs left</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsRestockModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-[#ba1a1a] text-white text-xs font-semibold hover:bg-[#93000a] transition-colors shrink-0 self-start sm:self-auto"
                  >
                    Order Restock
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Governance & Navigation Shortcuts */}
          <div className="lg:col-span-5 space-y-6">
            {/* Premises & Leadership Governance */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Icon name="verified_user" className="text-[20px] text-[#006194]" />
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e]">
                  Premises & Governance
                </h3>
              </div>

              <div className="space-y-3.5">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <Icon name="pin_drop" className="text-[20px] text-[#707881] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Physical Premises</p>
                    <p className="text-xs font-medium text-[#131b2e] mt-0.5">
                      14 Aminu Kano Crescent, opposite Parkview Plaza, Wuse 2, Abuja FCT
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <Icon name="call" className="text-[20px] text-[#707881] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Contact Channels</p>
                    <p className="text-xs font-bold text-[#131b2e] mt-0.5">+234 9 461 8800</p>
                    <p className="text-xs text-[#006a61] font-mono mt-0.5">Emergency Hotline: Ext 01 (24/7 Triage)</p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3">
                  <Icon name="schedule" className="text-[20px] text-[#707881] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Service Timings</p>
                    <p className="text-xs text-[#131b2e] mt-0.5">
                      Mon–Fri: <span className="font-bold">08:30 – 18:00</span>
                    </p>
                    <p className="text-xs text-[#131b2e]">
                      Sat: <span className="font-bold">09:00 – 14:00</span>
                    </p>
                    <p className="text-xs text-[#707881]">
                      Sun: <span className="font-semibold text-[#006195]">Emergency On-Call Only</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Leadership Cards */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-[#dae2fd]/60">
                <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#89f5e7] flex items-center justify-center text-[#00201d] shrink-0 font-bold text-sm">
                    DM
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-[#131b2e] truncate">David Musa</p>
                    <p className="text-[11px] text-[#707881] truncate">Branch Manager</p>
                    <p className="text-[10px] font-mono text-[#006194]">Lic #FCT-OPS-091</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#cce5ff] flex items-center justify-center text-[#001d31] shrink-0 font-bold text-sm">
                    DO
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-[#131b2e] truncate">Dr. Daniel Okoro</p>
                    <p className="text-[11px] text-[#707881] truncate">Medical Director</p>
                    <p className="text-[10px] font-mono text-[#006194]">Reg #DEN-78421</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contextual Action Shortcuts Grid */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e]">
                  Branch Operations Hub
                </h3>
                <span className="text-xs font-mono text-[#006194]">Quick Jump</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 16.7 Appointments */}
                <button
                  type="button"
                  onClick={() => navigate('/clinic-operations/appointment-list')}
                  className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-left hover:bg-[#eaedff] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#cce5ff] flex items-center justify-center text-[#006194] mb-2 group-hover:scale-105 transition-transform">
                    <Icon name="calendar_month" className="text-[18px]" />
                  </div>
                  <p className="font-bold text-xs text-[#131b2e]">Appointments</p>
                  <p className="font-mono text-[11px] text-[#707881] mt-0.5">28 booked today</p>
                </button>

                {/* 16.14 Waiting Queue */}
                <button
                  type="button"
                  onClick={() => navigate('/clinic-operations/waiting-queue')}
                  className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-left hover:bg-[#eaedff] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#86f2e4] flex items-center justify-center text-[#006f66] mb-2 group-hover:scale-105 transition-transform">
                    <Icon name="queue" className="text-[18px]" />
                  </div>
                  <p className="font-bold text-xs text-[#131b2e]">Waiting Queue</p>
                  <p className="font-mono text-[11px] text-[#006a61] mt-0.5">4 active patients</p>
                </button>

                {/* 16.16 Staff Schedule */}
                <button
                  type="button"
                  onClick={() => navigate('/clinic-operations/shift-timetable')}
                  className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-left hover:bg-[#eaedff] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#131b2e] mb-2 group-hover:scale-105 transition-transform">
                    <Icon name="badge" className="text-[18px]" />
                  </div>
                  <p className="font-bold text-xs text-[#131b2e]">Staff Roster</p>
                  <p className="font-mono text-[11px] text-[#707881] mt-0.5">10 rostered shifts</p>
                </button>

                {/* 16.24 Equipment Bay */}
                <button
                  type="button"
                  onClick={() => navigate('/clinic-operations/equipment-register')}
                  className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-left hover:bg-[#eaedff] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#cde5ff] flex items-center justify-center text-[#006195] mb-2 group-hover:scale-105 transition-transform">
                    <Icon name="build_circle" className="text-[18px]" />
                  </div>
                  <p className="font-bold text-xs text-[#131b2e]">Equipment Bay</p>
                  <p className="font-mono text-[11px] text-[#707881] mt-0.5">24 registered units</p>
                </button>

                {/* 16.36 Branch Reports */}
                <button
                  type="button"
                  onClick={() => {
                    showToast('Opening Branch Operational Reports (Screen 16.36)...');
                  }}
                  className="col-span-2 p-3.5 rounded-xl bg-[#006194] text-white text-left flex items-center justify-between hover:bg-[#007bb9] transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white">
                      <Icon name="analytics" className="text-[20px]" />
                    </div>
                    <div>
                      <p className="font-bold text-xs">Branch Operational Reports</p>
                      <p className="text-[11px] text-white/80">Clinical Audits & EOD Revenue Telemetry</p>
                    </div>
                  </div>
                  <Icon name="arrow_forward" className="text-[18px]" />
                </button>
              </div>
            </div>

            {/* Statutory Profile Protection Notice */}
            <div className="p-4 rounded-xl bg-[#eaedff]/60 border border-[#dae2fd] flex items-start gap-3">
              <Icon name="lock" className="text-[20px] text-[#707881] shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-[#3f4850]">
                <h4 className="font-bold text-[#131b2e]">Statutory Profile Protection</h4>
                <p className="leading-relaxed">
                  Core corporate identity, ownership structure, and legal premises leases can only be altered via Section
                  15.27 Organisation Change Review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="pin_drop" className="text-[#006194] text-xl" />
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                  Wuse 2 Main Campus Location
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMapModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f3ff] text-[#707881]"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>
            <div className="h-64 rounded-xl bg-[#eaedff] overflow-hidden relative flex items-center justify-center border border-[#dae2fd]">
              <div className="text-center p-4">
                <Icon name="map" className="text-4xl text-[#006194] mb-2" />
                <p className="text-xs font-bold text-[#131b2e]">14 Aminu Kano Crescent</p>
                <p className="text-xs text-[#3f4850]">Wuse 2, Abuja, Federal Capital Territory</p>
                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-white text-[#006194] font-mono text-xs font-semibold shadow-xs">
                  Coordinates: 9.0765° N, 7.4898° E
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-[#3f4850]">
              <span>Opposite Parkview Plaza, next to Sterling Bank</span>
              <button
                type="button"
                onClick={() => {
                  showToast('Opened in Google Maps navigation');
                  setShowMapModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#006194] text-white font-semibold hover:bg-[#007bb9]"
              >
                Open in Maps
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restock Order Modal */}
      {isRestockModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <Icon name="add_shopping_cart" className="text-[26px]" />
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-[#131b2e]">
                Order Consumable Restock
              </h3>
              <p className="text-xs text-[#3f4850] mt-1">
                Trigger expedited procurement for Flowable Composite Resin VITA A2.
              </p>
            </div>
            <form onSubmit={handleOrderRestock} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Restock Package Quantity</label>
                <div className="grid grid-cols-4 gap-2">
                  {['5', '10', '20', '50'].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setRestockQty(qty)}
                      className={`py-2 rounded-lg text-xs font-semibold border ${
                        restockQty === qty
                          ? 'bg-[#006194] text-white border-[#006194]'
                          : 'bg-[#f2f3ff] text-[#131b2e] border-[#dae2fd]'
                      }`}
                    >
                      {qty} packs
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-[#f2f3ff] p-3 rounded-xl text-xs space-y-1 text-[#3f4850]">
                <div className="flex justify-between">
                  <span>Supplier:</span>
                  <span className="font-semibold text-[#131b2e]">Dentsply Sirona Africa Hub</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Inventory:</span>
                  <span className="font-bold text-[#ba1a1a]">{stockLevel} packs</span>
                </div>
                <div className="flex justify-between">
                  <span>Lead Time:</span>
                  <span className="font-semibold text-[#131b2e]">Same-day courier (Abuja)</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRestockModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#006194] hover:bg-[#007bb9] shadow-sm flex items-center gap-1.5"
                >
                  <Icon name="check" className="text-[16px]" />
                  <span>Submit Purchase Order</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
