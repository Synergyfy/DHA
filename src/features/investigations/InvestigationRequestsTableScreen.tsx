import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { InvestigationShell } from './InvestigationShell';
import { Icon } from '../../design/Primitives';

interface InvestigationItem {
  id: string;
  patient: string;
  dhaId: string;
  ageGender: string;
  modality: 'Intraoral X-Ray' | '3D CBCT' | 'Panoramic OPG' | 'Laboratory' | 'Histopathology';
  protocol: string;
  teeth: string[];
  priority: 'Routine' | 'Urgent' | 'Emergency';
  status: 'Awaiting Result' | 'Scheduled' | 'Awaiting Review' | 'Completed' | 'In Analysis';
  orderingProvider: string;
  date: string;
  facility: string;
}

export function InvestigationRequestsTableScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const requests: InvestigationItem[] = [
    {
      id: 'REQ-2025-0914',
      patient: 'Chinedu Okafor',
      dhaId: 'DHA-10482',
      ageGender: '34y M',
      modality: 'Intraoral X-Ray',
      protocol: 'BW-R + Targeted PA #16',
      teeth: ['#16', '#15', '#46'],
      priority: 'Urgent',
      status: 'Awaiting Review',
      orderingProvider: 'Dr. Daniel James',
      date: 'Today, 09:45 AM',
      facility: 'DHA Central Radiology',
    },
    {
      id: 'REQ-2025-0902',
      patient: 'Fatima Al-Zahra',
      dhaId: 'DHA-08921',
      ageGender: '29y F',
      modality: '3D CBCT',
      protocol: 'Full Maxillary Arch Scan (FOV 8x8)',
      teeth: ['Maxillary Arch'],
      priority: 'Routine',
      status: 'Scheduled',
      orderingProvider: 'Dr. Daniel James',
      date: 'Today, 10:30 AM',
      facility: 'Al Zahra Diagnostic Center',
    },
    {
      id: 'REQ-2025-0899',
      patient: 'Marcus Vance',
      dhaId: 'DHA-04192',
      ageGender: '42y M',
      modality: 'Panoramic OPG',
      protocol: 'Full Dentition Orthopantomogram',
      teeth: ['Full Dentition'],
      priority: 'Emergency',
      status: 'Awaiting Review',
      orderingProvider: 'Dr. Daniel James',
      date: 'Today, 08:15 AM',
      facility: 'DHA Central Radiology',
    },
    {
      id: 'REQ-2025-0871',
      patient: 'Amina Yusuf',
      dhaId: 'DHA-000245',
      ageGender: '52y F',
      modality: 'Laboratory',
      protocol: 'FBC + Coagulation (PT/INR)',
      teeth: ['Systemic'],
      priority: 'Routine',
      status: 'In Analysis',
      orderingProvider: 'Dr. Daniel James',
      date: 'Yesterday, 14:20 PM',
      facility: 'DHA Central Laboratory',
    },
    {
      id: 'REQ-2025-0860',
      patient: 'Layla Al-Mansoor',
      dhaId: 'DHA-07119',
      ageGender: '27y F',
      modality: 'Intraoral X-Ray',
      protocol: 'Bitewing Series (4 views)',
      teeth: ['#14-#17', '#24-#27'],
      priority: 'Routine',
      status: 'Completed',
      orderingProvider: 'Dr. Sarah Smith',
      date: '12 Nov 2026',
      facility: 'DHA Central Radiology',
    },
    {
      id: 'REQ-2025-0855',
      patient: 'Tariq Al-Hashimi',
      dhaId: 'DHA-03221',
      ageGender: '58y M',
      modality: 'Histopathology',
      protocol: 'Lateral Tongue Border Biopsy',
      teeth: ['Soft Tissue'],
      priority: 'Urgent',
      status: 'Awaiting Result',
      orderingProvider: 'Dr. Daniel James',
      date: '11 Nov 2026',
      facility: 'Dubai Hospital Pathology Dept',
    },
  ];

  const filteredRequests = requests.filter((r) => {
    if (selectedStatus !== 'all' && r.status !== selectedStatus) return false;
    if (selectedModality !== 'all' && r.modality !== selectedModality) return false;
    if (selectedPriority !== 'all' && r.priority !== selectedPriority) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.patient.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.dhaId.toLowerCase().includes(q) ||
        r.protocol.toLowerCase().includes(q) ||
        r.orderingProvider.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRequests.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRequests.map((r) => r.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <InvestigationShell
      pageTitle="Investigation Requests Worklist"
      badgeCode="11.2"
      badgeLabel="Requests Table"
      currentStep="Multi-Filter Catalog"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <Icon name="check_circle" className="text-emerald-400 text-lg" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Top Control Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-on-surface">
              Investigation Orders & Requisitions
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Manage clinical radiology orders, pathology requisitions, and track DICOM acquisition statuses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <NavLink
              to="/investigations/create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-primary text-on-primary hover:bg-primary/95 shadow-sm transition-all"
            >
              <Icon name="add" className="text-base" />
              <span>Create Request</span>
            </NavLink>

            <NavLink
              to="/investigations/schedule"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-surface-container border border-outline-variant/30 text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <Icon name="calendar_month" className="text-base text-primary" />
              <span>Schedule Slot</span>
            </NavLink>
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input with barcode scanner simulation */}
            <div className="relative flex-1">
              <Icon name="search" className="absolute left-3.5 top-3 text-outline text-lg" />
              <input
                type="text"
                placeholder="Search by Request ID, Patient name, DHA ID, tooth # or protocol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant/40 bg-surface-container-low focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="button"
                onClick={() => showToast('Simulating Barcode/QR Requisition Scanner...')}
                className="absolute right-2 top-2 px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface border border-outline-variant/30 hover:bg-surface-container text-on-surface flex items-center gap-1"
                title="Scan Patient Barcode"
              >
                <Icon name="qr_code_scanner" className="text-sm text-primary" />
                <span className="hidden sm:inline">Scan</span>
              </button>
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                aria-label="Filter by Modality"
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                className="px-3 py-2 text-xs font-medium rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface focus:outline-none"
              >
                <option value="all">All Modalities</option>
                <option value="Intraoral X-Ray">Intraoral X-Ray</option>
                <option value="3D CBCT">3D CBCT</option>
                <option value="Panoramic OPG">Panoramic OPG</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Histopathology">Histopathology</option>
              </select>

              <select
                aria-label="Filter by Priority"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 text-xs font-medium rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="Routine">Routine</option>
                <option value="Urgent">Urgent</option>
                <option value="Emergency">Emergency</option>
              </select>

              {/* View toggle (cards vs table) */}
              <div className="flex items-center rounded-xl border border-outline-variant/30 p-1 bg-surface-container-low">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'table' ? 'bg-surface text-primary shadow-xs' : 'text-outline hover:text-on-surface'
                  }`}
                  title="Table View"
                >
                  <Icon name="table_rows" className="text-lg" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'cards' ? 'bg-surface text-primary shadow-xs' : 'text-outline hover:text-on-surface'
                  }`}
                  title="Card View"
                >
                  <Icon name="grid_view" className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {/* Status Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {[
              { id: 'all', label: 'All Orders', count: requests.length },
              { id: 'Awaiting Review', label: 'Awaiting Review', count: 2 },
              { id: 'Scheduled', label: 'Scheduled', count: 1 },
              { id: 'In Analysis', label: 'In Analysis', count: 1 },
              { id: 'Awaiting Result', label: 'Awaiting Result', count: 1 },
              { id: 'Completed', label: 'Completed', count: 1 },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setSelectedStatus(chip.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedStatus === chip.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span>{chip.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedStatus === chip.id ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high'
                }`}>
                  {chip.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Batch Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Icon name="check_box" className="text-lg" />
              <span>{selectedIds.length} order(s) selected</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => showToast(`Exported ${selectedIds.length} orders to CSV`)}
                className="px-3 py-1 rounded-lg bg-surface text-on-surface text-xs font-semibold hover:bg-surface-container transition-colors shadow-xs"
              >
                Export CSV
              </button>
              <button
                type="button"
                onClick={() => showToast(`Printing ${selectedIds.length} requisitions batch`)}
                className="px-3 py-1 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
              >
                Print Requisitions
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="p-1 rounded-lg text-outline hover:text-on-surface"
              >
                <Icon name="close" className="text-base" />
              </button>
            </div>
          </div>
        )}

        {/* Desktop Table View */}
        {viewMode === 'table' ? (
          <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-outline-variant/30 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredRequests.length && filteredRequests.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded text-primary focus:ring-primary"
                        aria-label="Select all orders"
                      />
                    </th>
                    <th className="py-3 px-4">Request Ref</th>
                    <th className="py-3 px-4">Patient Information</th>
                    <th className="py-3 px-4">Investigation & Protocol</th>
                    <th className="py-3 px-4">Target Teeth</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date / Facility</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredRequests.map((req) => {
                    const isSelected = selectedIds.includes(req.id);
                    return (
                      <tr
                        key={req.id}
                        className={`hover:bg-surface-container-low/70 transition-colors ${
                          isSelected ? 'bg-primary/5' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(req.id)}
                            className="rounded text-primary focus:ring-primary"
                            aria-label={`Select ${req.id}`}
                          />
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-primary whitespace-nowrap">
                          {req.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-on-surface">{req.patient}</div>
                          <div className="text-[11px] text-outline font-mono">
                            {req.dhaId} • {req.ageGender}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-on-surface">{req.protocol}</div>
                          <div className="text-[11px] text-primary font-semibold">{req.modality}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {req.teeth.map((t) => (
                              <span
                                key={t}
                                className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              req.priority === 'Emergency'
                                ? 'bg-rose-100 text-rose-800'
                                : req.priority === 'Urgent'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {req.priority}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              req.status === 'Awaiting Review'
                                ? 'bg-purple-100 text-purple-800'
                                : req.status === 'Scheduled'
                                ? 'bg-sky-100 text-sky-800'
                                : req.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {req.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="text-on-surface">{req.date}</div>
                          <div className="text-[11px] text-outline">{req.facility}</div>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <NavLink
                              to="/investigations/details"
                              className="p-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                              title="View Details"
                            >
                              <Icon name="visibility" className="text-base" />
                            </NavLink>
                            {req.status === 'Scheduled' && (
                              <NavLink
                                to="/investigations/schedule"
                                className="p-1.5 rounded-lg border border-outline-variant/30 text-sky-600 hover:bg-sky-50 transition-colors"
                                title="Reschedule"
                              >
                                <Icon name="event" className="text-base" />
                              </NavLink>
                            )}
                            <button
                              type="button"
                              onClick={() => showToast(`Printing order packet for ${req.id}`)}
                              className="p-1.5 rounded-lg border border-outline-variant/30 text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                              title="Print Requisition"
                            >
                              <Icon name="print" className="text-base" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Responsive Mobile Card View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl border border-outline-variant/30 bg-surface shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-primary">{req.id}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        req.priority === 'Emergency'
                          ? 'bg-rose-100 text-rose-800'
                          : req.priority === 'Urgent'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {req.priority}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        req.status === 'Awaiting Review'
                          ? 'bg-purple-100 text-purple-800'
                          : req.status === 'Scheduled'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-on-surface">{req.patient}</h4>
                  <p className="text-xs text-outline font-mono">
                    {req.dhaId} • {req.ageGender}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-container-low text-xs space-y-1">
                  <div className="font-semibold text-primary">{req.modality}</div>
                  <div className="text-on-surface">{req.protocol}</div>
                  <div className="text-[11px] text-outline">Teeth: {req.teeth.join(', ')}</div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-outline-variant/20">
                  <span className="text-outline text-[11px]">{req.date}</span>
                  <NavLink
                    to="/investigations/details"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-on-primary hover:bg-primary/95 shadow-xs transition-colors flex items-center gap-1"
                  >
                    <span>View Order</span>
                    <Icon name="arrow_forward" className="text-sm" />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </InvestigationShell>
  );
}

