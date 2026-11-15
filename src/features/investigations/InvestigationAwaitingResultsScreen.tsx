import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { InvestigationShell } from './InvestigationShell';
import { Icon } from '../../design/Primitives';

interface PendingOrder {
  ref: string;
  patient: string;
  ageGender: string;
  dhaId: string;
  priority: 'Urgent' | 'Routine' | 'Pathology';
  status: string;
  isOverdue?: boolean;
  overdueText?: string;
  inChair?: boolean;
  modality: string;
  spec: string;
  facility: string;
  category: 'radiology' | 'pathology' | 'cbct';
}

export function InvestigationAwaitingResultsScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'urgent' | 'radiology' | 'pathology' | 'overdue'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDescending, setSortDescending] = useState(true);
  const [uploadModalOrder, setUploadModalOrder] = useState<{ ref: string; patient: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [orders, setOrders] = useState<PendingOrder[]>([
    {
      ref: 'REQ-2025-0914',
      patient: 'Fatima Al-Zahra',
      ageGender: '29y Female',
      dhaId: 'DHA-08921',
      priority: 'Urgent',
      status: 'Awaiting External DICOM',
      isOverdue: true,
      overdueText: '1h 45m Overdue',
      modality: 'CBCT 3D Maxillary Arch Scan',
      spec: 'FOV 8x8cm • High-Resolution DICOM',
      facility: 'Al Zahra Advanced Dental Imaging Centre',
      category: 'cbct',
    },
    {
      ref: 'REQ-2025-0915',
      patient: 'Chinedu Okafor',
      ageGender: '34y Male',
      dhaId: 'DHA-10482',
      priority: 'Urgent',
      status: 'In Chair / Exposing',
      inChair: true,
      modality: 'Bitewing BW-R + #16 Periapical',
      spec: 'Dexis Sensor #02 • 70kV Intraoral (ALARA)',
      facility: 'In-Clinic Radiology Suite (Operatory 4)',
      category: 'radiology',
    },
    {
      ref: 'REQ-2025-0899',
      patient: 'Marcus Vance',
      ageGender: '42y Male',
      dhaId: 'DHA-00412',
      priority: 'Routine',
      status: 'Scheduled Today 14:30',
      modality: 'Panoramic OPG (Full Arch)',
      spec: 'Standard Digital Orthopantomogram',
      facility: 'Emergency Radiology Unit (West Wing)',
      category: 'radiology',
    },
    {
      ref: 'REQ-2025-0871',
      patient: 'Amina Yusuf',
      ageGender: '28y Female',
      dhaId: 'DHA-00245',
      priority: 'Pathology',
      status: 'In Lab • Est 16:00',
      modality: 'Full Blood Count & Serum Ferritin',
      spec: 'Gingival bleeding workup panel',
      facility: 'Al Barsha Medical Diagnostic Laboratory',
      category: 'pathology',
    },
  ]);

  const handleMarkComplete = (ref: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.ref === ref ? { ...o, status: 'Completed (Ready for Ingest)', inChair: false } : o))
    );
    showToast(`Order ${ref} status updated to Captured & Ready`);
  };

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'urgent' && o.priority !== 'Urgent') return false;
    if (activeFilter === 'overdue' && !o.isOverdue) return false;
    if (activeFilter === 'radiology' && o.category !== 'radiology' && o.category !== 'cbct') return false;
    if (activeFilter === 'pathology' && o.category !== 'pathology') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.patient.toLowerCase().includes(q) ||
        o.ref.toLowerCase().includes(q) ||
        o.dhaId.toLowerCase().includes(q) ||
        o.modality.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <InvestigationShell
      pageTitle="Investigation Requests & Awaiting Results"
      badgeCode="11.8"
      badgeLabel="Diagnostic Worklist"
      currentStep="Awaiting Acquisition"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <Icon name="check_circle" className="text-emerald-400 text-lg" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Top Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-on-surface">
              Awaiting Results Clinical Queue
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
              Live status of diagnostic radiology acquisitions, external CBCT scans, and pathology laboratory panels.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <NavLink
              to="/investigations/upload"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-primary text-on-primary hover:bg-primary/95 shadow-sm transition-all"
            >
              <Icon name="add_a_photo" className="text-base" />
              <span>Direct Ingest (11.9)</span>
            </NavLink>
          </div>
        </div>

        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-surface rounded-xl border border-outline-variant/30 p-4 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider block">
                Active Orders
              </span>
              <div className="text-2xl font-extrabold text-primary mt-1">8</div>
              <span className="text-[11px] text-on-surface-variant">3 Rad • 3 CBCT • 2 Lab</span>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Icon name="clinical_notes" className="text-2xl" />
            </div>
          </div>

          <div className="bg-rose-50/70 rounded-xl border border-rose-200 p-4 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
                Overdue SLA Breaches
              </span>
              <div className="text-2xl font-extrabold text-rose-600 mt-1">1</div>
              <span className="text-[11px] text-rose-900">&gt; 24h Window Exceeded</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-100 text-rose-700">
              <Icon name="warning" className="text-2xl" />
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-outline-variant/30 p-4 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
                Expected Today
              </span>
              <div className="text-2xl font-extrabold text-secondary mt-1">4</div>
              <span className="text-[11px] text-on-surface-variant">Target Due &lt; 18:00</span>
            </div>
            <div className="p-3 rounded-xl bg-secondary-container text-on-secondary-container">
              <Icon name="schedule" className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Icon name="search" className="absolute left-3 top-2.5 text-outline text-base" />
              <input
                type="text"
                placeholder="Search by ref, patient name, DHA ID, or modality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-outline-variant/40 bg-surface-container-low focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setSortDescending(!sortDescending);
                showToast(`Sorted by ${sortDescending ? 'Patient Name A-Z' : 'Days Outstanding'}`);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-surface border border-outline-variant/30 hover:bg-surface-container text-on-surface transition-colors shrink-0"
            >
              <Icon name="swap_vert" className="text-base text-primary" />
              <span>{sortDescending ? 'Days Outstanding' : 'Patient Name A-Z'}</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {[
              { id: 'all', label: 'All Orders', count: 8 },
              { id: 'urgent', label: 'Urgent', count: 2, dot: 'bg-rose-500' },
              { id: 'radiology', label: 'Radiology & CBCT', count: 4 },
              { id: 'pathology', label: 'Pathology & Lab', count: 2 },
              { id: 'overdue', label: 'Overdue SLA', count: 1, text: 'text-rose-600' },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveFilter(chip.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeFilter === chip.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {chip.dot && <span className={`w-1.5 h-1.5 rounded-full ${chip.dot}`} />}
                <span>{chip.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeFilter === chip.id ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high'
                }`}>
                  {chip.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Order Cards Stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrders.map((o) => (
            <div
              key={o.ref}
              className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              {/* Card Color Strip */}
              <div
                className={`h-1.5 w-full ${
                  o.isOverdue
                    ? 'bg-rose-600'
                    : o.inChair
                    ? 'bg-secondary'
                    : o.priority === 'Pathology'
                    ? 'bg-primary'
                    : 'bg-surface-container-high'
                }`}
              />

              <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                {/* Header row */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono font-bold text-xs text-primary">{o.ref}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            o.priority === 'Urgent'
                              ? 'bg-rose-100 text-rose-800'
                              : o.priority === 'Pathology'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {o.priority.toUpperCase()}
                        </span>
                        {o.isOverdue && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 flex items-center gap-1">
                            <Icon name="timer_off" className="text-xs" />
                            {o.overdueText}
                          </span>
                        )}
                        {o.inChair && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-secondary-container text-on-secondary-container flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                            In Chair / Exposing
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-base text-on-surface mt-1">{o.patient}</h3>
                      <span className="text-xs text-on-surface-variant font-mono">
                        {o.ageGender} • {o.dhaId}
                      </span>
                    </div>
                  </div>

                  {/* Modality Details Box */}
                  <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 mt-3 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-on-surface">
                      <Icon name="radiology" className="text-primary text-base" />
                      <span>{o.modality}</span>
                    </div>
                    <p className="text-on-surface-variant text-[11px]">{o.spec}</p>
                    <div className="flex items-center gap-1 text-outline text-[11px] pt-0.5">
                      <Icon name="domain" className="text-xs" />
                      <span className="truncate">{o.facility}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/15">
                  {o.inChair ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleMarkComplete(o.ref)}
                        className="flex-1 py-2 px-3 rounded-xl bg-surface-container-high text-primary hover:bg-surface-container-highest text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        <Icon name="check_circle" className="text-sm" />
                        <span>Mark Complete</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadModalOrder({ ref: o.ref, patient: o.patient })}
                        className="flex-1 py-2 px-3 rounded-xl bg-primary text-on-primary hover:bg-primary/95 text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
                      >
                        <Icon name="input" className="text-sm" />
                        <span>Ingest File (11.9)</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setUploadModalOrder({ ref: o.ref, patient: o.patient })}
                        className="flex-1 py-2 px-3 rounded-xl bg-primary text-on-primary hover:bg-primary/95 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <Icon name="cloud_upload" className="text-sm" />
                        <span>Upload Result (11.9)</span>
                      </button>
                      <a
                        href="tel:+97143786000"
                        onClick={() => showToast(`Calling ${o.facility}...`)}
                        className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                        title="Contact Facility"
                      >
                        <Icon name="phone" className="text-base text-primary" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Quick Ingest / Upload Sheet Triggered by Cards */}
        {uploadModalOrder && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-surface rounded-2xl max-w-lg w-full border border-outline-variant/30 shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                    Screen 11.9 Quick Ingestion
                  </span>
                  <h3 className="font-bold text-base text-on-surface">Upload Diagnostic Result</h3>
                  <p className="text-xs text-on-surface-variant font-mono">
                    {uploadModalOrder.patient} • {uploadModalOrder.ref}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadModalOrder(null)}
                  className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
                >
                  <Icon name="close" className="text-lg" />
                </button>
              </div>

              {/* File Drop Box Simulation */}
              <div
                onClick={() => showToast('File selected: DICOM_SERIES_49102.DCM (Verified Lossless 16-bit)')}
                className="border-2 border-dashed border-outline-variant/40 hover:border-primary/60 rounded-xl p-6 text-center bg-surface-container-low cursor-pointer transition-colors space-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <Icon name="upload_file" className="text-2xl" />
                </div>
                <div className="font-bold text-xs text-on-surface">Click to select DICOM series or PDF</div>
                <p className="text-[11px] text-on-surface-variant max-w-xs mx-auto">
                  Supports PACS archive zip or single slice max 250MB
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => showToast('Connected to PACS Node 04. Queried active study UID')}
                  className="p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-left flex items-center gap-2"
                >
                  <Icon name="router" className="text-primary text-lg" />
                  <div>
                    <span className="font-bold block">Fetch from PACS</span>
                    <span className="text-[10px] text-outline">Auto-query DICOM UID</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => showToast('Scanner tray ready for optical document ingestion')}
                  className="p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-left flex items-center gap-2"
                >
                  <Icon name="document_scanner" className="text-secondary text-lg" />
                  <div>
                    <span className="font-bold block">Doc Scanner</span>
                    <span className="text-[10px] text-outline">Lab report OCR</span>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOrder(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-surface border border-outline-variant/40 text-on-surface hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUploadModalOrder(null);
                    navigate('/investigations/upload');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-xs flex items-center gap-1.5"
                >
                  <span>Proceed to Full Flow (11.9)</span>
                  <Icon name="arrow_forward" className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </InvestigationShell>
  );
}

