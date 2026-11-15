import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type EquipmentCategory = 'all' | 'chair' | 'imaging' | 'sterilisation' | 'diagnostics';

interface EquipmentAsset {
  id: string;
  tag: string;
  name: string;
  category: 'chair' | 'imaging' | 'sterilisation' | 'diagnostics';
  typeLabel: string;
  typeIcon: string;
  imageUrl: string;
  statusBadge: string;
  statusBadgeClass: string;
  statusDotClass: string;
  statusPulse?: boolean;
  suiteLocation: string;
  suiteDetail?: string;
  complianceBadge?: string;
  serviceNoteTitle: string;
  serviceNoteDesc: string;
  isServiceAlert?: boolean;
  cycleProgress?: {
    tempPressure: string;
    remainingTime: string;
    percent: number;
    startTime: string;
    targetTime: string;
  };
  extraMeta?: string;
  actions: { label: string; icon: string; primary?: boolean; key: string }[];
}

const EQUIPMENT_ASSETS: EquipmentAsset[] = [
  {
    id: 'eq-01',
    tag: '#EQ-AD-501',
    name: 'A-dec 500 Dental Operatory Chair',
    category: 'chair',
    typeLabel: 'Dental Chair & Delivery System',
    typeIcon: 'airline_seat_recline_extra',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=200&auto=format&fit=crop&q=80',
    statusBadge: 'In Use (Operational)',
    statusBadgeClass: 'bg-[#86f2e4] text-[#006f66]',
    statusDotClass: 'bg-[#006a61]',
    statusPulse: true,
    suiteLocation: 'Operatory Suite 01',
    suiteDetail: '• Lead Restorative',
    serviceNoteTitle: 'Next Preventive Service: 15 Nov 2026',
    serviceNoteDesc: 'Annual Hydraulic & Handpiece waterline shock-line flush scheduled.',
    actions: [
      { label: 'View Maintenance Log', icon: 'history', key: 'log' },
      { label: 'Log Service', icon: 'add_task', primary: true, key: 'service' },
    ],
  },
  {
    id: 'eq-02',
    tag: '#EQ-CBCT-04',
    name: 'Planmeca ProMax 3D CBCT Imaging',
    category: 'imaging',
    typeLabel: 'Imaging & Radiography',
    typeIcon: 'radiology',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=200&auto=format&fit=crop&q=80',
    statusBadge: 'Available (Turnover Ready)',
    statusBadgeClass: 'bg-[#86f2e4] text-[#006f66]',
    statusDotClass: 'bg-[#006a61]',
    suiteLocation: 'Suite 03 • CBCT Surgery Bay',
    complianceBadge: 'NNRA Diagnostic Compliance Certified',
    serviceNoteTitle: 'Next Mandatory Inspection: 24 Oct 2026 (7 Days)',
    serviceNoteDesc: 'NNRA Dosimeter badge check & secondary scatter radiation leakage survey.',
    isServiceAlert: true,
    extraMeta: 'Dosimeter Valid: QA-9921',
    actions: [
      { label: 'Calibration History', icon: 'analytics', key: 'calib' },
    ],
  },
  {
    id: 'eq-03',
    tag: '#EQ-AUT-01',
    name: 'Midmark M11 UltraClave Class B',
    category: 'sterilisation',
    typeLabel: 'Sterilisation Equipment',
    typeIcon: 'sanitizer',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=200&auto=format&fit=crop&q=80',
    statusBadge: 'Cycle #4 Running',
    statusBadgeClass: 'bg-[#cce5ff] text-[#001d31]',
    statusDotClass: 'bg-[#006194]',
    statusPulse: true,
    suiteLocation: 'Central Sterilization Bay (Suite 01 Annex)',
    cycleProgress: {
      tempPressure: '134°C • Dynamic Pressure Hold',
      remainingTime: '18 min remaining',
      percent: 62,
      startTime: '11:22 AM',
      targetTime: '11:45 AM',
    },
    complianceBadge: 'Biological Indicator: Spore Strip Passed Today 08:00 AM (Attest 1292)',
    serviceNoteTitle: 'Next Gasket Service: 30 Oct 2026',
    serviceNoteDesc: 'Quarterly silicone door seal inspection and vacuum leak test.',
    actions: [
      { label: 'View Spore Log', icon: 'assignment_turned_in', key: 'spore' },
    ],
  },
  {
    id: 'eq-04',
    tag: '#EQ-XRAY-02',
    name: 'Carestream CS 2200 Intraoral X-Ray',
    category: 'imaging',
    typeLabel: 'Intraoral Radiography',
    typeIcon: 'camera',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&auto=format&fit=crop&q=80',
    statusBadge: 'Available',
    statusBadgeClass: 'bg-[#86f2e4] text-[#006f66]',
    statusDotClass: 'bg-[#006a61]',
    suiteLocation: 'Operatory Suite 02 • Ortho',
    serviceNoteTitle: 'Tube Calibration: 14 Aug 2026',
    serviceNoteDesc: 'Nominal Tube Potential: 70kV / 7mA • Certified Ready for Exposure.',
    actions: [
      { label: 'Inspect Details', icon: 'visibility', key: 'inspect' },
    ],
  },
  {
    id: 'eq-05',
    tag: '#EQ-SCL-08',
    name: 'Sirona Ultrasonic Scaler & Polisher',
    category: 'diagnostics',
    typeLabel: 'Periodontal Equipment',
    typeIcon: 'clean_hands',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=200&auto=format&fit=crop&q=80',
    statusBadge: 'Under Maintenance',
    statusBadgeClass: 'bg-[#ffdad6] text-[#93000a]',
    statusDotClass: 'bg-[#ba1a1a]',
    suiteLocation: 'Operatory Suite 04 • Hygiene Bay',
    serviceNoteTitle: 'Issue: Handpiece cord sheath micro-fracture replacement',
    serviceNoteDesc: 'Technician: FCT Dental MedTech Services • ETA Today 15:00',
    isServiceAlert: true,
    extraMeta: 'Ticket #MT-8842',
    actions: [
      { label: 'Update Service Status', icon: 'edit_note', primary: true, key: 'ticket' },
    ],
  },
];

export const EquipmentRegisterScreen: React.FC = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<EquipmentCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [newAssetTag, setNewAssetTag] = useState('');
  const [newAssetSuite, setNewAssetSuite] = useState('Operatory Suite 01 (Lead Restorative)');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredAssets = EQUIPMENT_ASSETS.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.suiteLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const counts = {
    all: 24,
    chair: 4,
    imaging: 6,
    sterilisation: 4,
    diagnostics: 10,
  };

  const handleAction = (asset: EquipmentAsset, _actionKey: string, actionLabel: string) => {
    showToast(`${actionLabel} opened for ${asset.name} (${asset.tag}).`);
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-28">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in border border-white/20">
          <Icon name="check_circle" className="text-emerald-300 text-[20px]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={() => navigate('/clinic-operations')}
              className="flex items-center gap-2 py-1 px-2 -ml-2 rounded-lg text-left hover:bg-[#eaedff] transition-colors"
            >
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider truncate">
                  Clinic Hub
                </span>
                <span className="font-semibold text-sm md:text-base text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                  Equipment Register
                </span>
              </div>
              <Icon name="expand_more" className="text-[#707881] text-[20px] shrink-0" />
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              aria-label="Notifications"
              onClick={() => showToast('2 equipment items pending inspection')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors relative"
            >
              <Icon name="notifications" className="text-[22px]" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shrink-0 text-white font-semibold text-xs shadow-sm">
              <Icon name="person" className="text-white text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 max-w-7xl mx-auto w-full px-4 md:px-8 flex-1">
        <div className="flex flex-col w-full space-y-6">
          {/* Top Context Header Area */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#006194] text-xs font-semibold uppercase tracking-wider">
              <Icon name="domain" className="text-[16px]" />
              <span>Facility & Asset Management • Wuse 2 Branch</span>
            </div>
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                Equipment Register
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#e2e7ff] text-[#3f4850] font-mono text-xs font-semibold">
                v2.4 Live Tracked
              </span>
            </div>
            <p className="text-sm text-[#3f4850]">
              Bio-medical inventory, operatory assets, maintenance schedules, autoclave spore logs & compliance certifications.
            </p>
          </div>

          {/* Telemetry Metrics Grid (4 cards) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Total Assets */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#dae2fd]/70 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Total Inventory</span>
                <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
                  <Icon name="inventory_2" className="text-[18px]" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                  24 <span className="text-xs font-normal text-[#707881]">Listed</span>
                </div>
                <span className="text-xs text-[#006a61] font-semibold flex items-center gap-1 mt-1">
                  <Icon name="verified" className="text-[13px]" /> 100% Tracked
                </span>
              </div>
            </div>

            {/* Active / In Use */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#dae2fd]/70 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Active Units</span>
                <div className="w-8 h-8 rounded-lg bg-[#86f2e4] flex items-center justify-center text-[#006f66]">
                  <Icon name="check_circle" className="text-[18px]" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                  18 <span className="text-xs font-normal text-[#707881]">Active</span>
                </div>
                <span className="text-xs text-[#3f4850] mt-1 block">Ready & In Operatory</span>
              </div>
            </div>

            {/* Scheduled Maintenance */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#dae2fd]/70 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Maint. Month</span>
                <div className="w-8 h-8 rounded-lg bg-[#cce5ff] flex items-center justify-center text-[#006194]">
                  <Icon name="build_circle" className="text-[18px]" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                  4 <span className="text-xs font-normal text-[#707881]">Due</span>
                </div>
                <span className="text-xs text-[#006194] font-semibold mt-1 block">Scheduled Service</span>
              </div>
            </div>

            {/* Inspection */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#dae2fd]/70 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Inspection</span>
                <div className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                  <Icon name="engineering" className="text-[18px]" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-[#ba1a1a] font-['Plus_Jakarta_Sans',sans-serif]">
                  2 <span className="text-xs font-normal text-[#ba1a1a]">Pending</span>
                </div>
                <span className="text-xs text-[#ba1a1a] font-semibold mt-1 block">Attention Needed</span>
              </div>
            </div>
          </div>

          {/* Search & Category Filters */}
          <div className="flex flex-col gap-3">
            <div className="relative w-full">
              <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-[20px]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search equipment name, asset ID, operatory..."
                className="w-full h-12 pl-10 pr-10 rounded-2xl bg-white shadow-sm border border-[#bfc7d2] text-sm text-[#131b2e] placeholder:text-[#707881] focus:outline-none focus:border-[#006194]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#707881] hover:text-[#131b2e]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all shrink-0 ${
                  activeCategory === 'all'
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
                }`}
              >
                All ({counts.all})
              </button>
              <button
                onClick={() => setActiveCategory('chair')}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all shrink-0 ${
                  activeCategory === 'chair'
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
                }`}
              >
                Dental Chairs ({counts.chair})
              </button>
              <button
                onClick={() => setActiveCategory('imaging')}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all shrink-0 ${
                  activeCategory === 'imaging'
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
                }`}
              >
                Imaging & X-Ray ({counts.imaging})
              </button>
              <button
                onClick={() => setActiveCategory('sterilisation')}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all shrink-0 ${
                  activeCategory === 'sterilisation'
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
                }`}
              >
                Sterilisation ({counts.sterilisation})
              </button>
              <button
                onClick={() => setActiveCategory('diagnostics')}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all shrink-0 ${
                  activeCategory === 'diagnostics'
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
                }`}
              >
                Diagnostics ({counts.diagnostics})
              </button>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm md:text-base text-[#131b2e]">Registered Assets</span>
            <span className="text-xs text-[#707881] flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
              <span>Showing {filteredAssets.length} Operatory Devices</span>
            </span>
          </div>

          {/* Equipment Inventory List Cards (Responsive Grid: 1 col on mobile, 2 cols on lg) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-white rounded-2xl shadow-sm border border-[#dae2fd]/70 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="p-5 flex flex-col gap-3.5">
                  {/* Visual & Identity Top Block */}
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#f2f3ff] relative ring-1 ring-[#dae2fd]">
                      <img className="w-full h-full object-cover" src={asset.imageUrl} alt={asset.name} />
                      <div
                        className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${asset.statusDotClass} ring-2 ring-white ${
                          asset.statusPulse ? 'animate-pulse' : ''
                        }`}
                      ></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-mono text-xs text-[#006194] font-bold">{asset.tag}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${asset.statusBadgeClass}`}>
                          {asset.statusBadge}
                        </span>
                      </div>
                      <h2 className="font-bold text-base text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                        {asset.name}
                      </h2>
                      <div className="text-xs text-[#3f4850] flex items-center gap-1.5 mt-0.5">
                        <Icon name={asset.typeIcon} className="text-[16px] text-[#707881]" />
                        <span className="truncate">{asset.typeLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Location Strip */}
                  <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between text-xs text-[#3f4850]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Icon name="meeting_room" className="text-[18px] text-[#006194] shrink-0" />
                      <span className="font-semibold text-[#131b2e]">{asset.suiteLocation}</span>
                      {asset.suiteDetail && <span className="text-[#707881]">{asset.suiteDetail}</span>}
                    </div>
                    <Icon name="north_east" className="text-[16px] text-[#707881] shrink-0" />
                  </div>

                  {/* Telemetry Cycle Progress Bar Widget if present */}
                  {asset.cycleProgress && (
                    <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#131b2e] flex items-center gap-1.5">
                          <Icon name="thermostat" className="text-[16px] text-[#006194]" />
                          <span>{asset.cycleProgress.tempPressure}</span>
                        </span>
                        <span className="text-[#006194] font-bold font-mono">
                          {asset.cycleProgress.remainingTime}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#dae2fd] overflow-hidden">
                        <div
                          className="h-full bg-[#006194] rounded-full transition-all duration-500"
                          style={{ width: `${asset.cycleProgress.percent}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#707881]">
                        <span>Cycle Start: {asset.cycleProgress.startTime}</span>
                        <span>Target: {asset.cycleProgress.targetTime}</span>
                      </div>
                    </div>
                  )}

                  {/* Compliance Badge if present */}
                  {asset.complianceBadge && (
                    <div className="bg-[#86f2e4]/30 rounded-xl p-2.5 flex items-center gap-2 text-[#006f66] text-xs font-semibold">
                      <Icon name="verified_user" className="text-[18px] text-[#006a61] shrink-0" />
                      <span className="truncate">{asset.complianceBadge}</span>
                    </div>
                  )}

                  {/* Maintenance Detail */}
                  <div className={`p-3 rounded-xl flex items-start gap-2.5 ${asset.isServiceAlert ? 'bg-[#ffdad6]/40' : 'bg-[#f2f3ff]'}`}>
                    <Icon
                      name={asset.isServiceAlert ? 'warning' : 'event_upcoming'}
                      className={`text-[18px] shrink-0 mt-0.5 ${asset.isServiceAlert ? 'text-[#ba1a1a]' : 'text-[#006194]'}`}
                    />
                    <div className="flex flex-col min-w-0 text-xs">
                      <span className={`font-bold ${asset.isServiceAlert ? 'text-[#ba1a1a]' : 'text-[#131b2e]'}`}>
                        {asset.serviceNoteTitle}
                      </span>
                      <p className="text-[#3f4850] mt-0.5 leading-snug">{asset.serviceNoteDesc}</p>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="bg-[#f2f3ff]/60 px-5 py-3 border-t border-[#dae2fd]/60 flex items-center justify-between gap-2 flex-wrap">
                  {asset.extraMeta ? (
                    <span className="text-xs text-[#707881] font-mono flex items-center gap-1">
                      <Icon name="verified" className="text-[14px] text-[#006a61]" />
                      <span>{asset.extraMeta}</span>
                    </span>
                  ) : (
                    <span></span>
                  )}

                  <div className="flex items-center gap-2">
                    {asset.actions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleAction(asset, act.key, act.label)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all shadow-sm ${
                          act.primary
                            ? 'bg-[#006194] text-white hover:bg-[#004b73]'
                            : 'bg-white text-[#131b2e] hover:bg-[#eaedff] border border-[#dae2fd]'
                        }`}
                      >
                        <Icon name={act.icon} className="text-[16px]" />
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Action Zone */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setShowAssetModal(true)}
              className="h-12 px-6 rounded-full bg-[#006194] text-white font-semibold text-sm shadow-xl flex items-center gap-2 hover:bg-[#004b73] active:scale-95 transition-all"
            >
              <Icon name="add" className="text-[20px]" />
              <span>Register New Equipment Asset</span>
            </button>
          </div>
        </div>
      </main>

      {/* Asset Ingestion Modal */}
      {showAssetModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-[#dae2fd]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                  <Icon name="add_box" className="text-[20px]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#131b2e]">Quick Asset Ingestion</h3>
                  <p className="text-xs text-[#707881]">Branch: Wuse 2 Main Clinic</p>
                </div>
              </div>
              <button
                onClick={() => setShowAssetModal(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f2f3ff] flex items-center justify-center text-[#707881]"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Asset Tag or Serial Scan
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAssetTag}
                    onChange={(e) => setNewAssetTag(e.target.value)}
                    placeholder="e.g. #EQ-NEW-091"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                  />
                  <button
                    onClick={() => {
                      setNewAssetTag('#EQ-SCAN-4819');
                      showToast('Barcode scanner read: #EQ-SCAN-4819');
                    }}
                    className="w-11 h-11 rounded-xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center shrink-0 shadow-sm"
                  >
                    <Icon name="qr_code_scanner" className="text-[20px]" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Operatory Assignment
                </label>
                <select
                  value={newAssetSuite}
                  onChange={(e) => setNewAssetSuite(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                >
                  <option value="Operatory Suite 01 (Lead Restorative)">Operatory Suite 01 (Lead Restorative)</option>
                  <option value="Operatory Suite 02 (Orthodontics)">Operatory Suite 02 (Orthodontics)</option>
                  <option value="Suite 03 (CBCT / Surgery Bay)">Suite 03 (CBCT / Surgery Bay)</option>
                  <option value="Operatory Suite 04 (Hygiene Bay)">Operatory Suite 04 (Hygiene Bay)</option>
                  <option value="Central Sterilization Suite">Central Sterilization Suite</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-[#dae2fd] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowAssetModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#707881] hover:bg-[#f2f3ff]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAssetModal(false);
                  showToast(`Asset ${newAssetTag || '#EQ-NEW-091'} registered to ${newAssetSuite}.`);
                }}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#006194] text-white hover:bg-[#004b73]"
              >
                Register Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
