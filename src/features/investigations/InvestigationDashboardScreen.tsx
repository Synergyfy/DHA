import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { InvestigationShell } from './InvestigationShell';
import { Icon } from '../../design/Primitives';

interface WorklistMetric {
  id: string;
  title: string;
  count: number;
  subtext: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  trend?: string;
}

export function InvestigationDashboardScreen() {
  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'urgent' | 'review' | 'scheduled'>('all');
  const [reviewModalRequest, setReviewModalRequest] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const metrics: WorklistMetric[] = [
    {
      id: 'total',
      title: 'Active Worklist',
      count: 248,
      subtext: '+14% vs last week',
      icon: 'receipt_long',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary/20',
      trend: '+14%',
    },
    {
      id: 'pending',
      title: 'Pending Intake',
      count: 14,
      subtext: 'Avg wait: 1.8 hrs',
      icon: 'pending_actions',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      id: 'captured',
      title: 'Awaiting Results',
      count: 8,
      subtext: 'Scans & Lab assays',
      icon: 'hourglass_top',
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
    },
    {
      id: 'review',
      title: 'Awaiting Review',
      count: 12,
      subtext: '3 Urgent Triage',
      icon: 'rate_review',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
    },
    {
      id: 'followup',
      title: 'Follow-up Due',
      count: 5,
      subtext: 'Recall & repeat tests',
      icon: 'notification_important',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  const recentRequests = [
    {
      ref: 'REQ-2025-0914',
      patient: 'Chinedu Okafor',
      dhaId: 'DHA-10482',
      ageGender: '34y M',
      modality: 'Dental Radiography',
      test: 'BW-R & Targeted PA #16',
      priority: 'Urgent',
      status: 'Awaiting Review',
      timestamp: 'Today, 09:45 AM',
      teeth: ['#16', '#15', '#46'],
      assignedTech: 'Nurse Zainab Tariq',
      criticalAlert: true,
    },
    {
      ref: 'REQ-2025-0902',
      patient: 'Fatima Bello',
      dhaId: 'DHA-08921',
      ageGender: '29y F',
      modality: '3D CBCT Scan',
      test: 'Full Maxillary Arch Scan',
      priority: 'Routine',
      status: 'Scheduled',
      timestamp: 'Today, 10:30 AM',
      teeth: ['Maxilla'],
      assignedTech: 'Humaid Musa',
      criticalAlert: false,
    },
    {
      ref: 'REQ-2025-0899',
      patient: 'Marcus Vance',
      dhaId: 'DHA-04192',
      ageGender: '42y M',
      modality: 'Panoramic OPG',
      test: 'Full Dentition Orthopantomogram',
      priority: 'Emergency',
      status: 'Awaiting Review',
      timestamp: 'Today, 08:15 AM',
      teeth: ['Full Arch'],
      assignedTech: 'Sarah Jenkins',
      criticalAlert: true,
    },
    {
      ref: 'REQ-2025-0871',
      patient: 'Amina Yusuf',
      dhaId: 'DHA-000245',
      ageGender: '52y F',
      modality: 'Clinical Laboratory',
      test: 'FBC + Coagulation Profile (PT/INR)',
      priority: 'Routine',
      status: 'In Analysis',
      timestamp: 'Yesterday, 14:20 PM',
      teeth: ['N/A'],
      assignedTech: 'DHA Central Lab Bio-1',
      criticalAlert: false,
    },
  ];

  const filteredRequests = recentRequests.filter((r) => {
    if (activeTab === 'urgent' && r.priority !== 'Urgent' && r.priority !== 'Emergency') return false;
    if (activeTab === 'review' && r.status !== 'Awaiting Review') return false;
    if (activeTab === 'scheduled' && r.status !== 'Scheduled') return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        r.patient.toLowerCase().includes(q) ||
        r.ref.toLowerCase().includes(q) ||
        r.dhaId.toLowerCase().includes(q) ||
        r.test.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <InvestigationShell
      pageTitle="Investigation Dashboard & Operations"
      badgeCode="11.1"
      badgeLabel="Diagnostic Control"
      currentStep="Hub Worklist"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <Icon name="check_circle" className="text-emerald-400 text-lg" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Hero Section with Quick CTAs & Period Picker */}
        <div className="bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low border border-outline-variant/30 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary text-on-primary">
                  DHA DIAGNOSTIC HUB
                </span>
                <span className="text-xs text-on-surface-variant font-mono">Real-Time PACS & Lab Feed</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-on-surface">
                Radiology & Laboratory Central Worklist
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                Review radiologic scans, laboratory assays, and prioritize emergency patient orders across DHA clinics.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-surface rounded-xl p-1 border border-outline-variant/30 shadow-xs">
                {(['today', 'week', 'month'] as const).map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setFilterPeriod(period)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      filterPeriod === period
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>

              <NavLink
                to="/investigations/create"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-primary text-on-primary hover:bg-primary/95 shadow-sm transition-all"
              >
                <Icon name="add" className="text-base" />
                <span>Create Investigation</span>
              </NavLink>

              <NavLink
                to="/investigations/queue"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 transition-colors"
              >
                <Icon name="safety_check" className="text-base" />
                <span>Patient Queue</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Metrics Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {metrics.map((m) => (
            <div
              key={m.id}
              onClick={() => {
                if (m.id === 'urgent' || m.id === 'review') setActiveTab('review');
                else if (m.id === 'pending') setActiveTab('scheduled');
                else setActiveTab('all');
              }}
              className={`p-4 rounded-xl border ${m.borderColor} ${m.bgColor} cursor-pointer hover:shadow-md transition-all group`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-xs font-semibold text-on-surface-variant group-hover:text-on-surface`}>
                  {m.title}
                </span>
                <div className={`p-1.5 rounded-lg bg-surface/80 ${m.color}`}>
                  <Icon name={m.icon} className="text-lg" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                {m.count}
              </div>
              <div className="text-[11px] text-on-surface-variant mt-1 flex items-center justify-between">
                <span>{m.subtext}</span>
                {m.trend && (
                  <span className="text-emerald-700 font-semibold">{m.trend}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Critical Clinical Alerts Banner */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                <Icon name="warning" className="text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                    Priority Clinical Alert • Requires Review
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-900">
                    Tooth #16 Resorption Alert
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-rose-950 mt-0.5">
                  <strong>Chinedu Okafor (DHA-10482):</strong> High-definition Targeted PA shows deep periapical lucency with encroaching sinus floor. Order #REQ-2025-0914 awaiting dentist validation.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <NavLink
                to="/investigations/details"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs"
              >
                Review Radiograph
              </NavLink>
            </div>
          </div>
        </div>

        {/* Main Grid: Requests Stream & Results Awaiting Review */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Interactive Requests Stream */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 sm:p-5 shadow-xs">
              {/* Header & Filter Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/20">
                <div>
                  <h3 className="font-bold text-base text-on-surface">Live Investigation Queue</h3>
                  <p className="text-xs text-on-surface-variant">Active diagnostic requests across all modalities</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-56">
                    <Icon name="search" className="absolute left-2.5 top-2.5 text-outline text-sm" />
                    <input
                      type="text"
                      placeholder="Search patient, DHA, ref..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-outline-variant/40 bg-surface-container-low focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <NavLink
                    to="/investigations/requests"
                    className="p-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container text-xs font-medium text-primary flex items-center gap-1 shrink-0"
                    title="Full Requests Table"
                  >
                    <Icon name="table_chart" className="text-base" />
                    <span className="hidden sm:inline">Full Table</span>
                  </NavLink>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 pt-3 pb-3 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'All Active', count: recentRequests.length },
                  { id: 'urgent', label: 'Urgent / STAT', count: 2 },
                  { id: 'review', label: 'Awaiting Review', count: 2 },
                  { id: 'scheduled', label: 'Scheduled', count: 1 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      activeTab === tab.id ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Requests List */}
              <div className="space-y-3 mt-1">
                {filteredRequests.map((req) => (
                  <div
                    key={req.ref}
                    className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest hover:border-primary/40 hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-primary">{req.ref}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          req.priority === 'Emergency'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : req.priority === 'Urgent'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {req.priority}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          req.status === 'Awaiting Review'
                            ? 'bg-purple-100 text-purple-800'
                            : req.status === 'Scheduled'
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-outline font-medium">{req.timestamp}</span>
                    </div>

                    <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-on-surface">{req.patient}</h4>
                          <span className="text-xs text-outline font-mono">({req.dhaId})</span>
                          <span className="text-xs text-on-surface-variant">• {req.ageGender}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5">
                          <span className="font-semibold text-primary">{req.modality}:</span>
                          <span>{req.test}</span>
                          {req.teeth[0] !== 'N/A' && (
                            <span className="px-1.5 py-0.2 rounded bg-surface-container font-mono text-[10px]">
                              Teeth: {req.teeth.join(', ')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <NavLink
                          to="/investigations/details"
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                        >
                          View Order
                        </NavLink>
                        {req.status === 'Awaiting Review' && (
                          <button
                            type="button"
                            onClick={() => {
                              setReviewModalRequest(req.ref);
                              showToast(`Opened quick interpretation for ${req.ref}`);
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-on-primary hover:bg-primary/95 shadow-xs transition-colors flex items-center gap-1"
                          >
                            <Icon name="visibility" className="text-sm" />
                            <span>Interpret</span>
                          </button>
                        )}
                        {req.status === 'Scheduled' && (
                          <NavLink
                            to="/investigations/schedule"
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 transition-colors flex items-center gap-1"
                          >
                            <Icon name="event" className="text-sm" />
                            <span>Reschedule</span>
                          </NavLink>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-outline-variant/15 flex items-center justify-between text-[11px] text-outline">
                      <span>Tech: {req.assignedTech}</span>
                      <span className="flex items-center gap-1 text-emerald-700 font-medium">
                        <Icon name="verified" className="text-xs" />
                        Nigeria Health Information Exchange Hashed & Signed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Diagnostic Shortcuts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <NavLink
                to="/investigations/create"
                className="p-3.5 rounded-xl border border-outline-variant/30 bg-surface hover:bg-surface-container-low transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Icon name="add_to_photos" className="text-xl" />
                </div>
                <span className="text-xs font-bold text-on-surface">Order PA / Bitewing</span>
                <span className="text-[10px] text-outline">Rapid intraoral order</span>
              </NavLink>

              <NavLink
                to="/investigations/create"
                className="p-3.5 rounded-xl border border-outline-variant/30 bg-surface hover:bg-surface-container-low transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
              >
                <div className="p-2 rounded-lg bg-sky-100 text-sky-700 group-hover:scale-110 transition-transform">
                  <Icon name="camera" className="text-xl" />
                </div>
                <span className="text-xs font-bold text-on-surface">Order OPG / CBCT</span>
                <span className="text-[10px] text-outline">3D Volumetric scan</span>
              </NavLink>

              <NavLink
                to="/investigations/create"
                className="p-3.5 rounded-xl border border-outline-variant/30 bg-surface hover:bg-surface-container-low transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
              >
                <div className="p-2 rounded-lg bg-amber-100 text-amber-700 group-hover:scale-110 transition-transform">
                  <Icon name="science" className="text-xl" />
                </div>
                <span className="text-xs font-bold text-on-surface">Order Lab Assays</span>
                <span className="text-[10px] text-outline">FBC, Coagulation, Biopsy</span>
              </NavLink>

              <NavLink
                to="/investigations/queue"
                className="p-3.5 rounded-xl border border-outline-variant/30 bg-surface hover:bg-surface-container-low transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
              >
                <div className="p-2 rounded-lg bg-purple-100 text-purple-700 group-hover:scale-110 transition-transform">
                  <Icon name="how_to_reg" className="text-xl" />
                </div>
                <span className="text-xs font-bold text-on-surface">Patient Triage Queue</span>
                <span className="text-[10px] text-outline">Review incoming self-orders</span>
              </NavLink>
            </div>
          </div>

          {/* Right Col: Captured Results Awaiting Interpretation & Today's Schedule */}
          <div className="space-y-4">
            {/* Captured Results Preview Card */}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <Icon name="perm_media" className="text-primary text-lg" />
                  <h3 className="font-bold text-sm text-on-surface">Captured Scans (Pending Dx)</h3>
                </div>
                <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  2 Pending
                </span>
              </div>

              <div className="space-y-3 mt-3">
                {/* Result 1 Preview */}
                <div className="p-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-on-surface">Chinedu Okafor</span>
                    <span className="text-[10px] font-mono text-outline">REQ-2025-0914</span>
                  </div>
                  {/* Simulated Radiograph Thumbnail */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    {/* Visual simulated dental X-Ray lines */}
                    <div className="text-center z-10 p-2">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/80 text-white text-[10px] font-bold">
                        <Icon name="warning" className="text-xs" />
                        Tooth #16 Periapical Lucency
                      </div>
                      <p className="text-[11px] text-slate-200 mt-1">Bitewing Right + PA #16 (65 kVp, 0.12s)</p>
                    </div>
                    <div className="absolute top-2 right-2 z-20">
                      <span className="px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono">
                        DEXIS SENSOR
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-outline">Uploaded 30 mins ago</span>
                    <NavLink
                      to="/investigations/details"
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5"
                    >
                      Interpret Scan
                      <Icon name="chevron_right" className="text-sm" />
                    </NavLink>
                  </div>
                </div>

                {/* Result 2 Preview */}
                <div className="p-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-on-surface">Marcus Vance</span>
                    <span className="text-[10px] font-mono text-outline">REQ-2025-0899</span>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <div className="text-center z-10 p-2">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/80 text-white text-[10px] font-bold">
                        <Icon name="info" className="text-xs" />
                        Full Dentition Panoramic OPG
                      </div>
                      <p className="text-[11px] text-slate-200 mt-1">Impacted #38, #48 third molars visible</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-outline">Uploaded 1.5 hrs ago</span>
                    <NavLink
                      to="/investigations/details"
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5"
                    >
                      Interpret Scan
                      <Icon name="chevron_right" className="text-sm" />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Diagnostic Imaging Appointments */}
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <Icon name="schedule" className="text-secondary text-lg" />
                  <h3 className="font-bold text-sm text-on-surface">Today's Intake Schedule</h3>
                </div>
                <NavLink
                  to="/investigations/schedule"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Manage
                </NavLink>
              </div>

              <div className="space-y-3 mt-3">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <div className="text-center px-2 py-1 rounded-lg bg-surface font-mono font-bold text-xs text-primary shrink-0 border border-outline-variant/20">
                    10:30
                    <span className="block text-[9px] text-outline font-normal">AM</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-semibold text-xs text-on-surface truncate">Fatima Bello</h4>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Confirmed
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant truncate">3D CBCT Full Maxillary Arch</p>
                    <span className="text-[10px] text-outline">Tech: Humaid Musa • Suite 2</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <div className="text-center px-2 py-1 rounded-lg bg-surface font-mono font-bold text-xs text-primary shrink-0 border border-outline-variant/20">
                    11:15
                    <span className="block text-[9px] text-outline font-normal">AM</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-semibold text-xs text-on-surface truncate">Zayd Tariq (Pediatric)</h4>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                        Checking In
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant truncate">Pediatric Bitewing Series (ALARA)</p>
                    <span className="text-[10px] text-outline">Tech: Sarah Jenkins • Suite 1</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <div className="text-center px-2 py-1 rounded-lg bg-surface font-mono font-bold text-xs text-primary shrink-0 border border-outline-variant/20">
                    14:00
                    <span className="block text-[9px] text-outline font-normal">PM</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-semibold text-xs text-on-surface truncate">Khalid Mansoor</h4>
                      <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                        Slotted
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant truncate">Full OPG + Cephalometric Scan</p>
                    <span className="text-[10px] text-outline">Tech: Humaid Musa • Suite 2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Interpretation Modal */}
        {reviewModalRequest && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-surface rounded-2xl max-w-lg w-full border border-outline-variant/30 shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <Icon name="biotech" className="text-primary text-xl" />
                  <h3 className="font-bold text-base text-on-surface">Quick Interpretation: {reviewModalRequest}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setReviewModalRequest(null)}
                  className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
                >
                  <Icon name="close" className="text-lg" />
                </button>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1.5">
                <div className="font-semibold text-primary">Pre-populated Findings:</div>
                <p className="text-on-surface-variant">
                  Apical radiolucency observed with disruption of lamina dura on tooth #16. Immediate endodontic evaluation advised.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalRequest(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-surface border border-outline-variant/40 text-on-surface hover:bg-surface-container"
                >
                  Close
                </button>
                <NavLink
                  to="/investigations/details"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-xs"
                >
                  Full Radiograph Workspace
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </InvestigationShell>
  );
}
