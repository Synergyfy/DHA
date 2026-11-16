import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { InvestigationShell } from './InvestigationShell';
import { Icon } from '../../design/Primitives';

interface PatientQueueItem {
  id: string;
  patient: string;
  dhaId: string;
  ageGender: string;
  modality: string;
  requestedService: string;
  reason: string;
  submissionDate: string;
  priority: 'High' | 'Normal' | 'Low';
  status: 'Pending Review' | 'Info Requested' | 'Approved' | 'Declined';
  externalReferral?: string;
  isPediatric?: boolean;
}

export function PatientInvestigationRequestsQueueScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [queueItems, setQueueItems] = useState<PatientQueueItem[]>([
    {
      id: 'PT-REQ-8891',
      patient: 'Marcus Vance',
      dhaId: 'DHA-04192',
      ageGender: '42y M',
      modality: '3D CBCT Scan',
      requestedService: 'Mandibular Arch Volumetric Field (FOV 5x5)',
      reason: 'Referred by private oral surgeon for impaction assessment of lower third molars (#38, #48) near inferior alveolar nerve canal.',
      submissionDate: 'Today, 08:30 AM (2 hrs ago)',
      priority: 'High',
      status: 'Pending Review',
      externalReferral: 'Referral_Surgeon_DrAlBalooshi.pdf (1.8 MB)',
    },
    {
      id: 'PT-REQ-8884',
      patient: 'Amina Yusuf',
      dhaId: 'DHA-000245',
      ageGender: '52y F',
      modality: 'Clinical Laboratory',
      requestedService: 'Full Blood Count (FBC) + Coagulation (PT/INR)',
      reason: 'Pre-operative clearance required ahead of planned implant fixture placement next week. History of anticoagulant medication.',
      submissionDate: 'Today, 09:10 AM (1 hr ago)',
      priority: 'Normal',
      status: 'Pending Review',
    },
    {
      id: 'PT-REQ-8879',
      patient: 'Zayd Tariq',
      dhaId: 'DHA-01923',
      ageGender: '9y M (Pediatric)',
      modality: 'Dental Radiography',
      requestedService: 'Bilateral Pediatric Bitewing Series',
      reason: 'Mother reports pain on mastication lower left quadrant. Requesting X-rays before clinic visit.',
      submissionDate: 'Yesterday, 16:45 PM',
      priority: 'Normal',
      status: 'Info Requested',
      isPediatric: true,
    },
    {
      id: 'PT-REQ-8850',
      patient: 'Aisha Okoye',
      dhaId: 'DHA-07119',
      ageGender: '27y F',
      modality: 'Intraoral Radiographs',
      requestedService: '4-View Posterior Bitewing Check',
      reason: 'Annual routine screening for interproximal recurrent caries.',
      submissionDate: '12 Nov 2026',
      priority: 'Low',
      status: 'Approved',
    },
  ]);

  const handleApprove = (id: string, patient: string) => {
    setQueueItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Approved' } : item))
    );
    showToast(`Approved request for ${patient}! Converted to official requisition.`);
  };

  const handleRequestInfo = (id: string, patient: string) => {
    setQueueItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Info Requested' } : item))
    );
    showToast(`Clarification message dispatched to ${patient} via portal & SMS.`);
  };

  const filteredItems = queueItems.filter((item) => {
    if (selectedFilter !== 'all' && item.status !== selectedFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.patient.toLowerCase().includes(q) ||
        item.dhaId.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.requestedService.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <InvestigationShell
      pageTitle="Patient Investigation Requests Queue"
      badgeCode="11.6"
      badgeLabel="Triage & Triage Queue"
      currentStep="Clinician Clearance"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <Icon name="check_circle" className="text-emerald-400 text-lg" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Regulatory Governance Mandate Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-surface border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-900 shrink-0 mt-0.5 sm:mt-0">
              <Icon name="gavel" className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-200 text-amber-950">
                  DHA Radiation & Lab Mandate
                </span>
                <span className="text-xs text-amber-900 font-mono">FANR Rule 14-B</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-on-surface mt-1">
                Mandatory Clinician Triage for Patient-Initiated Orders
              </h2>
              <p className="text-xs text-on-surface-variant max-w-2xl">
                Patients cannot self-schedule diagnostic ionizing radiation without explicit clinical justification and clearance by a licensed dental practitioner.
              </p>
            </div>
          </div>

          <div className="p-3 bg-surface/90 rounded-xl border border-outline-variant/30 text-xs shrink-0 text-center sm:text-right">
            <span className="text-[10px] text-outline uppercase tracking-wider block">Triage SLA Target</span>
            <span className="text-sm font-bold text-emerald-700">&lt; 4 Hours (94.2% on-time)</span>
            <span className="text-[10px] text-outline block">Avg turnaround: 1.4 hrs</span>
          </div>
        </div>

        {/* Search & Filter Header */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Icon name="search" className="absolute left-3 top-2.5 text-outline text-base" />
              <input
                type="text"
                placeholder="Search patient name, DHA ID, service requested..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-outline-variant/40 bg-surface-container-low focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex items-center gap-2">
              <NavLink
                to="/investigations/create"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-primary text-on-primary hover:bg-primary/95 shadow-xs transition-colors shrink-0"
              >
                <Icon name="add" className="text-base" />
                <span>Direct Requisition</span>
              </NavLink>
            </div>
          </div>

          {/* Status Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {[
              { id: 'all', label: 'All Incoming', count: queueItems.length },
              { id: 'Pending Review', label: 'Pending Clinician Review', count: 2 },
              { id: 'Info Requested', label: 'Clarification Needed', count: 1 },
              { id: 'Approved', label: 'Approved & Converted', count: 1 },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setSelectedFilter(chip.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedFilter === chip.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span>{chip.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedFilter === chip.id ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high'
                }`}>
                  {chip.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Requests Queue Cards Stream */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isApproved = item.status === 'Approved';
            const isInfoRequested = item.status === 'Info Requested';
            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isApproved
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : isInfoRequested
                    ? 'border-amber-200 bg-amber-50/20'
                    : 'border-outline-variant/30 bg-surface shadow-xs hover:border-primary/40'
                }`}
              >
                {/* Card Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline-variant/20">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-xs text-primary">{item.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.priority === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.priority} Priority
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      isApproved
                        ? 'bg-emerald-100 text-emerald-800'
                        : isInfoRequested
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.status}
                    </span>
                    {item.isPediatric && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                        Pediatric Protocol
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-outline font-medium">{item.submissionDate}</span>
                </div>

                {/* Card Body */}
                <div className="py-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Patient Info */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-outline block">Patient Profile</span>
                    <h3 className="font-bold text-sm text-on-surface">{item.patient}</h3>
                    <div className="text-xs text-on-surface-variant font-mono">
                      {item.dhaId} • {item.ageGender}
                    </div>
                  </div>

                  {/* Service & Clinical Narrative */}
                  <div className="md:col-span-2 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-primary">{item.modality}:</span>
                      <span className="font-semibold text-on-surface">{item.requestedService}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      "{item.reason}"
                    </p>

                    {item.externalReferral && (
                      <div className="pt-1 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-container border border-outline-variant/30 text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer">
                          <Icon name="picture_as_pdf" className="text-rose-600 text-sm" />
                          <span>{item.externalReferral}</span>
                        </span>
                        <span className="text-[11px] text-emerald-700 font-medium">Verified Signature Attached</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-outline flex items-center gap-1">
                    <Icon name="security" className="text-xs text-emerald-600" />
                    <span>ALARA Justification Audit Required</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {isApproved ? (
                      <NavLink
                        to="/investigations/details"
                        className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <Icon name="visibility" className="text-sm" />
                        <span>View Generated Order</span>
                      </NavLink>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleRequestInfo(item.id, item.patient)}
                          className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-semibold bg-surface border border-outline-variant/40 hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center gap-1"
                        >
                          <Icon name="contact_support" className="text-sm text-amber-600" />
                          <span>Request Clinical Info</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleApprove(item.id, item.patient)}
                          className="flex-1 sm:flex-none px-4 py-1.5 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-xs transition-all flex items-center justify-center gap-1.5"
                        >
                          <Icon name="check" className="text-sm" />
                          <span>Approve & Convert to Order</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </InvestigationShell>
  );
}

