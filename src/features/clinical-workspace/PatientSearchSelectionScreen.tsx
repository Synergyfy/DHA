import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';
import { Icon } from '../../design/Primitives';

interface PatientMatch {
  id: string;
  name: string;
  age: number;
  gender: string;
  dob: string;
  lifeCode: string;
  mrn: string;
  phone: string;
  avatar: string;
  clinic: string;
  attending: string;
  activePlan: string;
  status: 'verified' | 'warning' | 'inactive';
  allergy?: string;
  warningNote?: string;
}

export function PatientSearchSelectionScreen() {
  const navigate = useNavigate();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('Amara Okafor');
  const [activeFilter, setActiveFilter] = useState<'all' | 'clinic' | 'assigned' | 'referral' | 'recent'>('all');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('p-1');
  const [showIdentityModal, setShowIdentityModal] = useState<PatientMatch | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const patientMatches: PatientMatch[] = [
    {
      id: 'p-1',
      name: 'Amara Okafor',
      age: 34,
      gender: 'Female',
      dob: '14 Oct 1992',
      lifeCode: 'NG-990-281-LAG',
      mrn: 'DHA-2026-00451',
      phone: '+234 803 *** 8491',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      clinic: 'Harmony Dental Clinic (Wuse 2)',
      attending: 'Dr. Daniel James (DDS, #DEN-48912)',
      activePlan: 'Mesio-Occlusal Resin (#16) — Phase 1 Done',
      status: 'verified',
      allergy: 'Penicillin Anaphylaxis',
    },
    {
      id: 'p-2',
      name: 'Amara E. Okafor',
      age: 22,
      gender: 'Female',
      dob: '28 Jul 2004',
      lifeCode: 'NG-990-812-LAG',
      mrn: 'DHA-2024-09182',
      phone: '+234 802 *** 1190',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      clinic: 'Harmony Dental Clinic (Victoria Island Branch)',
      attending: 'Dr. K. Okoye (#DEN-38291)',
      activePlan: 'Orthodontic Alignment Assessment',
      status: 'warning',
      warningNote: 'Distinct LifeCode: Verify National Identification Number (NIN) before clinical chart access',
    },
    {
      id: 'p-3',
      name: 'Amarachi Okafor-Cole',
      age: 41,
      gender: 'Female',
      dob: '05 Mar 1985',
      lifeCode: 'NG-990-349-LAG',
      mrn: 'DHA-2025-01824',
      phone: '+234 805 *** 6301',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
      clinic: 'Harmony Dental Clinic (Wuse 2)',
      attending: 'Unassigned (Inactive Record)',
      activePlan: 'No Active Treatment Plan',
      status: 'inactive',
    },
  ];

  const filteredPatients = patientMatches.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lifeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'clinic') return p.clinic.includes('Wuse 2');
    if (activeFilter === 'assigned') return p.attending.includes('Dr. Daniel James');
    if (activeFilter === 'recent') return p.status === 'verified';
    return true;
  });

  const selectedPatient = patientMatches.find((p) => p.id === selectedPatientId) || patientMatches[0];

  return (
    <ClinicalWorkspaceShell activeTab="patients">
      <div className="max-w-6xl mx-auto space-y-6 pb-32 md:pb-12">
        {/* Top Gateway Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-teal-900 to-slate-900 p-5 md:p-6 rounded-2xl text-white shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-wider text-teal-300">
                DHA Network Registry Gateway
              </span>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
                Screen 14.7
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold">Patient Search &amp; Selection</h1>
            <p className="text-slate-300 text-sm mt-0.5">
              Query Nigeria Master Health Index by LifeCode, Name, or Mobile to load verified EMR charts.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => showToast('Biometric scanner initialized for Operatory 02')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm transition-all"
            >
              <Icon name="qr_code_scanner" className="text-base text-teal-300" />
              Scan National Identification Number (NIN) verification / QR
            </button>
            <button
              onClick={() => showToast('Nigeria Health Information Exchange cloud sync completed: 100% synchronized')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              <Icon name="cloud_sync" className="text-base" />
              Sync Ledger
            </button>
          </div>
        </div>

        {/* Search Input & Filter Ribbon */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 md:p-5 shadow-sm space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-600 dark:text-teal-400">
              <Icon name="search" className="text-xl" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name, LifeCode (e.g. NG-990-281-LAG), or phone (+234...)"
              className="w-full pl-11 pr-10 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <Icon name="cancel" className="text-lg" />
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {([
              { id: 'all' as const, label: 'All Results', count: filteredPatients.length },
              { id: 'clinic' as const, label: 'Harmony Wuse 2' },
              { id: 'assigned' as const, label: 'My Assigned' },
              { id: 'referral' as const, label: 'Direct Referrals' },
              { id: 'recent' as const, label: 'Recent Patients' },
            ] as { id: 'all' | 'clinic' | 'assigned' | 'referral' | 'recent'; label: string; count?: number }[]).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-1.5 ${
                  activeFilter === filter.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{filter.label}</span>
                {filter.count !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-bold">
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Statutory Safeguard Alert (DHA-M24) */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 rounded-xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center text-amber-700 dark:text-amber-300 shrink-0 mt-0.5">
            <Icon name="verified_user" className="text-xl" />
          </div>
          <div className="text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide">
                Identity Resolution Safeguard (DHA-M24)
              </span>
              <span className="bg-amber-200/60 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded text-[10px] font-semibold">
                Mandatory Policy
              </span>
            </div>
            <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
              Potential duplicate or unverified records trigger automated identity warnings. Never automatically
              merge distinct patient LifeCodes. Attending clinician verification is required before opening sterile
              clinical charts.
            </p>
          </div>
        </div>

        {/* Master & Detail Layout for Tablet/Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Search Results List */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Filtered Matches ({filteredPatients.length} Found)
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Icon name="sync" className="text-xs text-teal-600 animate-spin" /> Live DHA Registry
              </span>
            </div>

            {filteredPatients.map((patient) => {
              const isSelected = selectedPatientId === patient.id;
              const isVerified = patient.status === 'verified';
              const isWarning = patient.status === 'warning';

              return (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`bg-white dark:bg-slate-800 rounded-2xl p-4 transition-all cursor-pointer border ${
                    isSelected
                      ? 'border-2 border-teal-600 shadow-md ring-2 ring-teal-500/10'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm'
                  } ${patient.status === 'inactive' ? 'opacity-70 hover:opacity-100' : ''}`}
                >
                  {/* Status Ribbon */}
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-700 text-xs">
                    {isVerified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-semibold">
                        <Icon name="how_to_reg" className="text-sm" /> Verified &amp; Assigned
                      </span>
                    )}
                    {isWarning && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-semibold">
                        <Icon name="report_problem" className="text-sm" /> Verify National Identification Number (NIN)
                      </span>
                    )}
                    {patient.status === 'inactive' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 font-medium">
                        Inactive Record
                      </span>
                    )}

                    {patient.allergy && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-bold">
                        <Icon name="warning" filled className="text-xs" /> {patient.allergy}
                      </span>
                    )}
                  </div>

                  {/* Patient Info Row */}
                  <div className="flex items-start gap-3.5">
                    <div className="relative shrink-0">
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-13 h-13 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-700"
                      />
                      {isVerified && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-800">
                          <Icon name="check" className="text-[10px]" />
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-1">
                        <h3 className="font-bold text-slate-900 dark:text-white truncate text-base">
                          {patient.name}
                        </h3>
                        <span className="text-xs text-slate-500 shrink-0">
                          {patient.age}y • {patient.gender}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                        <span className="font-semibold text-teal-700 dark:text-teal-400 font-mono">
                          {patient.lifeCode}
                        </span>
                        <span>•</span>
                        <span className="font-mono">MRN: {patient.mrn}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1">
                        <Icon name="call" className="text-xs text-slate-400" />
                        <span>{patient.phone} (NIN biometric verification)</span>
                      </p>
                    </div>
                  </div>

                  {/* Context Info Box */}
                  <div className="mt-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl p-2.5 text-xs space-y-1 text-slate-600 dark:text-slate-300">
                    <p>
                      <strong className="text-slate-900 dark:text-white font-medium">Clinic:</strong> {patient.clinic}
                    </p>
                    <p>
                      <strong className="text-slate-900 dark:text-white font-medium">Attending:</strong>{' '}
                      {patient.attending}
                    </p>
                    <p className="truncate">
                      <strong className="text-slate-900 dark:text-white font-medium">Plan:</strong> {patient.activePlan}
                    </p>
                  </div>

                  {/* Card Action Row */}
                  <div className="mt-3 pt-2 flex items-center justify-between text-xs">
                    {isVerified ? (
                      <span className="text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-teal-500" /> Exact Identity Match
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowIdentityModal(patient);
                        }}
                        className="text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <Icon name="shield_person" className="text-sm" /> Review Identity Evidence
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPatientId(patient.id);
                        if (patient.id === 'p-1') {
                          navigate('/dentist/patient-overview');
                        } else {
                          showToast(`Selected patient ${patient.name}`);
                        }
                      }}
                      className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1"
                    >
                      <span>Select</span>
                      <Icon name="chevron_right" className="text-sm" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Confirmation Stage & Safety Triage (Sticky Cockpit) */}
          <div className="lg:col-span-5">
            <div className="sticky top-20 bg-white dark:bg-slate-800 rounded-2xl border-2 border-teal-600/30 dark:border-teal-500/30 p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 tracking-wider">
                    Stage 14.7 Inspection
                  </span>
                  <h2 className="font-bold text-lg text-slate-900 dark:text-white">Confirm Patient Selection</h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center gap-1">
                  <Icon name="fingerprint" className="text-sm" /> E-ID Verified
                </span>
              </div>

              {/* Selected Profile Highlight */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40">
                <img
                  src={selectedPatient.avatar}
                  alt={selectedPatient.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-teal-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white truncate">{selectedPatient.name}</h4>
                    <span className="text-xs font-mono text-teal-700 dark:text-teal-300 font-semibold">
                      {selectedPatient.dob} ({selectedPatient.age}y)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                    LifeCode: <span className="font-mono font-semibold">{selectedPatient.lifeCode}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    Attending: {selectedPatient.attending}
                  </p>
                </div>
              </div>

              {/* 3-Point Pre-Encounter Safety Triage */}
              <div className="space-y-2 text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Pre-Encounter Clinical Safety
                </span>

                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-2 text-red-900 dark:text-red-200">
                  <Icon name="crisis_alert" filled className="text-base text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Critical Allergy Active:</strong>
                    <span className="text-red-800 dark:text-red-300 text-[11px]">
                      Penicillin anaphylaxis registered on Nigeria Master Health Index. Beta-lactams prohibited.
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <Icon name="assignment_turned_in" className="text-base text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Active Plan #TP-2026-089:</strong>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Phase 1 Direct Resin MO complete. Phase 2 Recare &amp; Fluoride Remineralization pending.
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <Icon name="chair" className="text-base text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Chairside Appointment:</strong>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Operatory 02 reserved today at 10:30 AM (In Chair Active).
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirm Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigate('/dentist/patient-overview')}
                  className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span>Confirm &amp; Open Patient Overview (14.8)</span>
                  <Icon name="arrow_forward" className="text-base" />
                </button>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => navigate('/dentist/appointment-details')}
                    className="py-2 px-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-semibold transition-colors"
                  >
                    View Appointment
                  </button>
                  <button
                    onClick={() => showToast('Patient record access cleared')}
                    className="py-2 px-3 text-slate-500 hover:text-red-600 transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Identity Review Modal */}
        {showIdentityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <Icon name="security" className="text-amber-600" />
                  Identity Evidence Audit
                </h3>
                <button
                  onClick={() => setShowIdentityModal(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <Icon name="close" />
                </button>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs text-amber-800 dark:text-amber-200">
                <p className="font-semibold">{showIdentityModal.warningNote}</p>
              </div>

              <div className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                <p>
                  <strong>Patient Name:</strong> {showIdentityModal.name}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {showIdentityModal.dob} ({showIdentityModal.age} years)
                </p>
                <p>
                  <strong>LifeCode:</strong> {showIdentityModal.lifeCode}
                </p>
                <p>
                  <strong>DHA Medical Record Number:</strong> {showIdentityModal.mrn}
                </p>
                <p>
                  <strong>Registered Branch:</strong> {showIdentityModal.clinic}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowIdentityModal(null)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowIdentityModal(null);
                    showToast('Identity verification flagged for reception review');
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-sm"
                >
                  Flag for Identity Review
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global Toast */}
        {toastMessage && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2">
            <Icon name="check_circle" filled className="text-teal-400 text-sm" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
