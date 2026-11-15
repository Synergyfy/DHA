import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface WorkOrder {
  id: string;
  category: 'urgent' | 'statutory' | 'preventive';
  badgeLabel: string;
  badgeClass: string;
  title: string;
  asset: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  scopeLabel: string;
  scopeDesc: string;
  techName: string;
  techIcon: string;
  eta: string;
  statusText?: string;
  confirmed?: boolean;
}

export const EquipmentMaintenanceScreen: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'urgent' | 'preventive' | 'statutory'>('all');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Status update modal
  const [statusModalTicket, setStatusModalTicket] = useState<{ id: string; name: string } | null>(null);
  const [ticketStatusUpdate, setTicketStatusUpdate] = useState('In Progress with Parts');

  // Form states
  const [formEquipment, setFormEquipment] = useState('EQ-SCL-08');
  const [formServiceType, setFormServiceType] = useState('Corrective');
  const [formPriority, setFormPriority] = useState('Urgent');
  const [formDesc, setFormDesc] = useState('');
  const [formTech, setFormTech] = useState('Engr. Samuel O.');
  const [formDate, setFormDate] = useState('2026-10-25');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [tickets, setTickets] = useState<WorkOrder[]>([
    {
      id: 'MT-8842',
      category: 'urgent',
      badgeLabel: 'Urgent Repair',
      badgeClass: 'bg-[#ffdad6] text-[#93000a]',
      title: 'Sirona Ultrasonic Scaler & Perio Unit',
      asset: 'Asset #EQ-SCL-08 • Operatory Suite 04',
      icon: 'build',
      iconBg: 'bg-[#ffdad6]/60',
      iconColor: 'text-[#ba1a1a]',
      scopeLabel: 'Diagnostic Issue',
      scopeDesc: 'Handpiece cord sheath micro-fracture causing intermittent ultrasonic fluid delivery and pressure drop.',
      techName: 'FCT Dental MedTech (Engr. Samuel O.)',
      techIcon: 'engineering',
      eta: 'ETA: 15:00 WAT',
    },
    {
      id: 'MT-8840',
      category: 'statutory',
      badgeLabel: 'Statutory Regulatory',
      badgeClass: 'bg-[#86f2e4]/30 text-[#006f66]',
      title: 'Planmeca ProMax 3D CBCT Imaging',
      asset: 'Asset #EQ-CBCT-04 • Suite 03 Imaging Core',
      icon: 'lens_blur',
      iconBg: 'bg-[#86f2e4]/40',
      iconColor: 'text-[#006a61]',
      scopeLabel: 'Mandatory Service',
      scopeDesc: 'NNRA Annual Radiation Scatter Survey, collimator laser calibration & sensor beam alignment.',
      techName: 'Lead Shield Consults (Med. Physicist)',
      techIcon: 'badge',
      eta: '24 Oct 2026, 10:00',
      confirmed: false,
    },
    {
      id: 'MT-8835',
      category: 'preventive',
      badgeLabel: 'Preventive Maintenance',
      badgeClass: 'bg-[#cce5ff] text-[#001d31]',
      title: 'A-dec 500 Operatory Dental Chair',
      asset: 'Asset #EQ-AD-501 • Suite 01 Master Operatory',
      icon: 'airline_seat_recline_extra',
      iconBg: 'bg-[#cce5ff]',
      iconColor: 'text-[#006194]',
      scopeLabel: 'Routine Scope',
      scopeDesc: 'Hydraulic fluid replacement, delivery arm pivot greasing & waterline anti-retraction check valve testing.',
      techName: 'David Musa (Internal Facility Tech)',
      techIcon: 'account_circle',
      eta: '15 Nov 2026',
      statusText: 'Stage: Parts Requisitioned',
    },
    {
      id: 'MT-8831',
      category: 'preventive',
      badgeLabel: '30-Day Cycle Audit',
      badgeClass: 'bg-[#007bb9] text-white',
      title: 'Midmark M11 UltraClave Autoclave',
      asset: 'Asset #EQ-AUT-01 • Central Sterilization Bay',
      icon: 'sanitizer',
      iconBg: 'bg-[#cce5ff]',
      iconColor: 'text-[#006194]',
      scopeLabel: 'Autoclave Verification',
      scopeDesc: 'Door gasket sealing tension replacement, chamber cleaning, and digital temperature thermistor calibration.',
      techName: 'Lead Nurse Zainab Tariq',
      techIcon: 'verified_user',
      eta: '30 Oct 2026',
      statusText: 'Biological Spore Test: Pending',
    },
  ]);

  const filteredTickets = tickets.filter((t) => {
    if (filterType === 'all') return true;
    return t.category === filterType;
  });

  const handleConfirmSlot = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, confirmed: true } : t))
    );
    showToast(`Calendar slot confirmed for #${id}`);
  };

  const handleAttachChecklist = (id: string) => {
    showToast(`NNRA Compliance Template attached to #${id}`);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `MT-${Math.floor(8843 + Math.random() * 50)}`;
    const newOrder: WorkOrder = {
      id: newId,
      category: formServiceType === 'Corrective' ? 'urgent' : formServiceType === 'Statutory' ? 'statutory' : 'preventive',
      badgeLabel: formServiceType,
      badgeClass: formPriority === 'Urgent' ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#cce5ff] text-[#001d31]',
      title: formEquipment.includes('SCL') ? 'Sirona Ultrasonic Scaler' : formEquipment.includes('CBCT') ? 'Planmeca 3D CBCT' : 'General Dental Asset',
      asset: `Asset #${formEquipment} • Wuse 2 Bay`,
      icon: 'build',
      iconBg: 'bg-[#eaedff]',
      iconColor: 'text-[#006194]',
      scopeLabel: 'Scope of Work',
      scopeDesc: formDesc || 'Routine scheduled technical intervention and diagnostics.',
      techName: formTech,
      techIcon: 'engineering',
      eta: formDate,
    };
    setTickets([newOrder, ...tickets]);
    setIsLogModalOpen(false);
    showToast(`Work order #${newId} registered & technician dispatched!`);
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-28">
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
                <span className="text-xs uppercase tracking-wider font-semibold text-[#006194]">Facility Engineering</span>
                <span className="text-xs text-[#707881]">•</span>
                <span className="font-mono text-xs text-[#3f4850]">Section 16.26</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Equipment Maintenance Management
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Generating Bio-Med Maintenance Audit Log PDF...')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="download" className="text-[16px]" />
              <span>Audit PDF</span>
            </button>
            <button
              onClick={() => setIsLogModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Icon name="add_circle" className="text-[16px]" />
              <span>Log Ticket</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Scope Banner */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#006194] text-xs font-semibold uppercase tracking-wider">
                <Icon name="medical_services" className="text-[14px]" />
                Wuse 2 Main Branch • Suite Ops
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-pulse" />
                <span>Live Bay Rota</span>
              </div>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#131b2e]">
              Equipment Maintenance Bay
            </h2>
            <p className="text-xs text-[#707881]">Clinical hardware integrity & bio-med compliance monitoring</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#f2f3ff] text-xs font-medium text-[#131b2e] flex items-center gap-1.5 border border-[#eaedff]">
              <Icon name="domain" className="text-[16px] text-[#707881]" />
              Main Branch & Group Rota
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#ffdad6] text-xs font-bold text-[#93000a] flex items-center gap-1.5 border border-[#ba1a1a]/20">
              <Icon name="warning" className="text-[16px] text-[#ba1a1a]" />
              {tickets.filter((t) => t.category === 'urgent').length} Active Urgent Tickets
            </span>
          </div>
        </div>

        {/* Bio-Safety Safeguard Pill */}
        <div className="bg-[#cce5ff]/40 rounded-2xl p-4 flex items-start gap-3 border border-[#006194]/20 shadow-xs">
          <Icon name="verified_user" className="text-[#006194] text-[22px] shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <span className="font-bold text-[#001d31] uppercase tracking-wider block">
              Statutory Bio-Safety Protocol
            </span>
            <p className="text-[#131b2e] mt-0.5 leading-relaxed">
              All repairs involving ionizing radiation (CBCT/X-ray) or Class B autoclave sterilization require
              authenticated dual-countersign verification prior to clinical patient release.
            </p>
          </div>
        </div>

        {/* Maintenance Telemetry Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Scheduled */}
          <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#707881]">Scheduled</span>
              <div className="w-7 h-7 rounded-lg bg-[#cce5ff] flex items-center justify-center text-[#006194]">
                <Icon name="calendar_month" className="text-[16px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">
                  {tickets.length}
                </span>
                <span className="text-xs font-bold text-[#006194]">Active</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#707881] mt-1 font-mono">
                <span>2 Prev</span> • <span className="text-[#ba1a1a] font-bold">1 Urg</span> • <span>1 Stat</span>
              </div>
            </div>
          </div>

          {/* Completed MTD */}
          <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#707881]">Completed MTD</span>
              <div className="w-7 h-7 rounded-lg bg-[#86f2e4] flex items-center justify-center text-[#006f66]">
                <Icon name="check_circle" className="text-[16px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">14</span>
                <span className="text-xs font-bold text-[#006a61]">100% On-Time</span>
              </div>
              <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#006a61] h-full rounded-full w-full" />
              </div>
            </div>
          </div>

          {/* Urgent Issue */}
          <div className="bg-[#ffdad6]/40 rounded-2xl border border-[#ba1a1a]/20 p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#93000a]">Urgent Issue</span>
              <div className="w-7 h-7 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                <Icon name="priority_high" className="text-[16px]" />
              </div>
            </div>
            <div className="mt-3">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#ba1a1a]">1 Crit</span>
              <p className="font-mono text-xs text-[#93000a] truncate mt-1">Sirona Scaler Line</p>
            </div>
          </div>

          {/* Bio-Med Techs */}
          <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#707881]">Bio-Med Techs</span>
              <div className="w-7 h-7 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#006194]">
                <Icon name="engineering" className="text-[16px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">3</span>
                <span className="text-xs font-bold text-[#006a61]">On-Call</span>
              </div>
              <div className="flex -space-x-1.5 mt-2">
                <div className="w-5 h-5 rounded-full bg-[#006194] text-white flex items-center justify-center text-[10px] font-bold">
                  SO
                </div>
                <div className="w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center text-[10px] font-bold">
                  DM
                </div>
                <div className="w-5 h-5 rounded-full bg-[#006195] text-white flex items-center justify-center text-[10px] font-bold">
                  ZT
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-[#eaedff] p-1 rounded-2xl flex items-center gap-1 border border-[#dae2fd]/60 overflow-x-auto">
          {(
            [
              { key: 'all', label: `All (${tickets.length})` },
              { key: 'urgent', label: `Urgent (${tickets.filter((t) => t.category === 'urgent').length})` },
              { key: 'preventive', label: `Preventive (${tickets.filter((t) => t.category === 'preventive').length})` },
              { key: 'statutory', label: `Statutory (${tickets.filter((t) => t.category === 'statutory').length})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterType(tab.key)}
              className={`flex-1 min-w-[100px] py-2 rounded-xl text-xs font-bold transition-all text-center ${
                filterType === tab.key ? 'bg-white text-[#006194] shadow-sm' : 'text-[#707881] hover:text-[#131b2e]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 2-Column Responsive Layout: Active Work Orders (Left) & Historical Registry (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Work Orders Stream */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold uppercase tracking-wider text-[#131b2e]">
                Active Work Orders
              </h3>
              <span className="font-mono text-xs text-[#707881]">Sorted by Severity</span>
            </div>

            {filteredTickets.map((ticket) => (
              <article
                key={ticket.id}
                className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-3.5 hover:border-[#006194]/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#707881]">#{ticket.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] uppercase font-bold ${ticket.badgeClass}`}>
                        {ticket.badgeLabel}
                      </span>
                    </div>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e] mt-1">
                      {ticket.title}
                    </h4>
                    <span className="font-mono text-xs text-[#707881]">{ticket.asset}</span>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${ticket.iconBg} ${ticket.iconColor}`}
                  >
                    <Icon name={ticket.icon} className="text-[20px]" />
                  </div>
                </div>

                {/* Scope & Diagnostics */}
                <div className="bg-[#f2f3ff] rounded-xl p-3.5 space-y-2 text-xs border border-[#eaedff]">
                  <p className="leading-relaxed text-[#131b2e]">
                    <strong className="font-bold text-[#006194]">{ticket.scopeLabel}:</strong> {ticket.scopeDesc}
                  </p>
                  <div className="pt-2 border-t border-[#dae2fd]/60 flex flex-wrap items-center justify-between gap-2 text-[#707881] font-mono">
                    <div className="flex items-center gap-1.5">
                      <Icon name={ticket.techIcon} className="text-[16px] text-[#006194]" />
                      <span>{ticket.techName}</span>
                    </div>
                    <span
                      className={`font-semibold ${
                        ticket.category === 'urgent' ? 'text-[#ba1a1a]' : 'text-[#006a61]'
                      }`}
                    >
                      {ticket.eta}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setStatusModalTicket({ id: ticket.id, name: ticket.title });
                    }}
                    className="flex-1 py-2 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Icon name="update" className="text-[16px]" />
                    <span>Update Status</span>
                  </button>

                  {ticket.category === 'statutory' ? (
                    <button
                      type="button"
                      onClick={() => handleConfirmSlot(ticket.id)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        ticket.confirmed
                          ? 'bg-[#86f2e4]/30 text-[#006f66]'
                          : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                      }`}
                    >
                      <Icon name="check_circle" className="text-[16px] text-[#006a61]" />
                      <span>{ticket.confirmed ? 'Slot Confirmed' : 'Confirm Slot'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAttachChecklist(ticket.id)}
                      className="flex-1 py-2 rounded-xl bg-[#f2f3ff] text-[#006194] text-xs font-semibold hover:bg-[#eaedff] flex items-center justify-center gap-1.5 transition-colors border border-[#dae2fd]"
                    >
                      <Icon name="attachment" className="text-[16px]" />
                      <span>Checklist</span>
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Historical Service Registry (Right Column) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#006a61]">
                  <Icon name="history_edu" className="text-[20px]" />
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold uppercase tracking-wider text-[#131b2e]">
                    Historical Log (30 Days)
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#006a61] font-semibold">All Passed</span>
              </div>

              <div className="space-y-3">
                {/* History Item 1 */}
                <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#707881]">14 Oct 2026</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#86f2e4]/40 text-[#006f66] text-[10px] font-bold uppercase">
                        Resolved
                      </span>
                    </div>
                    <p className="font-bold text-xs text-[#131b2e] truncate mt-1">
                      Belmont Chair Suite 02 Foot Control
                    </p>
                    <span className="text-[11px] text-[#707881] block">Replaced severed line & housing</span>
                  </div>
                  <Icon name="task_alt" className="text-[#006a61] text-[20px] shrink-0" />
                </div>

                {/* History Item 2 */}
                <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#707881]">08 Oct 2026</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#86f2e4]/40 text-[#006f66] text-[10px] font-bold uppercase">
                        Passed
                      </span>
                    </div>
                    <p className="font-bold text-xs text-[#131b2e] truncate mt-1">Carestream CS 2200 Collimator</p>
                    <span className="text-[11px] text-[#707881] block">Scatter geometry & cone integrity</span>
                  </div>
                  <Icon name="task_alt" className="text-[#006a61] text-[20px] shrink-0" />
                </div>

                {/* History Item 3 */}
                <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff] flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#707881]">28 Sep 2026</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#86f2e4]/40 text-[#006f66] text-[10px] font-bold uppercase">
                        Passed
                      </span>
                    </div>
                    <p className="font-bold text-xs text-[#131b2e] truncate mt-1">Emergency Oxygen Pressure Test</p>
                    <span className="text-[11px] text-[#707881] block">2,000 PSI regulator integrity confirmed</span>
                  </div>
                  <Icon name="task_alt" className="text-[#006a61] text-[20px] shrink-0" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast('Opening complete maintenance archive...')}
                className="w-full py-2.5 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] text-xs font-semibold text-[#006194] text-center transition-colors block"
              >
                View Full Audit History
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Log Ticket Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="build_circle" className="text-[#006194] text-xl" />
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                    Log Maintenance Ticket
                  </h3>
                  <p className="text-xs text-[#707881]">Wuse 2 Clinic Operations</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLogModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f3ff] text-[#707881]"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Target Equipment</label>
                <select
                  value={formEquipment}
                  onChange={(e) => setFormEquipment(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                >
                  <option value="EQ-SCL-08">Sirona Ultrasonic Scaler (#EQ-SCL-08) - Suite 04</option>
                  <option value="EQ-CBCT-04">Planmeca ProMax 3D CBCT (#EQ-CBCT-04) - Suite 03</option>
                  <option value="EQ-AD-501">A-dec 500 Chair (#EQ-AD-501) - Suite 01</option>
                  <option value="EQ-AUT-01">Midmark M11 UltraClave (#EQ-AUT-01) - Sterilization</option>
                  <option value="EQ-CPR-02">Cattani Turbo-Smart Suction (#EQ-CPR-02) - Plant Bay</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Maintenance Classification</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Preventive', 'Corrective', 'Calibration', 'Statutory'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormServiceType(type)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-colors ${
                        formServiceType === type
                          ? 'bg-[#006194] text-white border-[#006194]'
                          : 'bg-[#f2f3ff] text-[#131b2e] border-[#dae2fd]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Priority Level</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Routine', 'High', 'Urgent'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormPriority(p)}
                      className={`p-2 rounded-xl border text-center font-bold transition-colors ${
                        formPriority === p
                          ? p === 'Urgent'
                            ? 'bg-[#ba1a1a] text-white border-[#ba1a1a]'
                            : 'bg-[#006194] text-white border-[#006194]'
                          : 'bg-[#f2f3ff] text-[#131b2e] border-[#dae2fd]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Defect / Scope Description</label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  placeholder="Describe symptoms, operational errors, or protocol scope..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3f4850] mb-1">Assigned Bio-Med</label>
                  <input
                    type="text"
                    value={formTech}
                    onChange={(e) => setFormTech(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3f4850] mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#006194] hover:bg-[#007bb9] shadow-sm flex items-center gap-1.5"
                >
                  <Icon name="send" className="text-[16px]" />
                  <span>Dispatch Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {statusModalTicket && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
              Update Status for #{statusModalTicket.id}
            </h3>
            <p className="text-xs text-[#707881]">{statusModalTicket.name}</p>
            <div>
              <label className="block text-xs font-semibold text-[#3f4850] mb-1">New Status</label>
              <select
                value={ticketStatusUpdate}
                onChange={(e) => setTicketStatusUpdate(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
              >
                <option value="In Progress with Parts">In Progress with Parts</option>
                <option value="Waiting for Technician">Waiting for Technician</option>
                <option value="Completed & Calibrated">Completed & Calibrated</option>
                <option value="Escalated to OEM">Escalated to OEM</option>
              </select>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStatusModalTicket(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Status updated to "${ticketStatusUpdate}" for #${statusModalTicket.id}`);
                  setStatusModalTicket(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#006194] hover:bg-[#007bb9] shadow-sm"
              >
                Save Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
