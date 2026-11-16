import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

interface PatientQueueItem {
  id: string;
  name: string;
  ageGender: string;
  operatory: string;
  dhaId: string;
  examCode: string;
  status: string;
  avatar: string;
  altText: string;
  selected?: boolean;
}

export function PlanPatientSelectionScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('DHA-2026-00451');
  const [activeTab, setActiveTab] = useState<'queue' | 'recent' | 'all'>('queue');
  const [selectedPatientId, setSelectedPatientId] = useState('p1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedState, setConfirmedState] = useState(false);

  const [checklist, setChecklist] = useState({
    biometric: true,
    medicalHistory: true,
    noDuplicate: true,
  });

  const patients: PatientQueueItem[] = [
    {
      id: 'p1',
      name: 'Amara Okafor',
      ageGender: '34y F',
      operatory: 'Operatory 2',
      dhaId: 'DHA-2026-00451',
      examCode: '#EXAM-2026-1048',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
      altText: 'Portrait of Amara Okafor',
      selected: true,
    },
    {
      id: 'p2',
      name: 'Chinedu Okafor',
      ageGender: '41y M',
      operatory: 'Operatory 3',
      dhaId: 'DHA-10482',
      examCode: '#EXAM-2026-1033',
      status: 'In Preparation',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
      altText: 'Portrait of Chinedu Okafor',
    },
    {
      id: 'p3',
      name: 'Marcus Vance',
      ageGender: '28y M',
      operatory: 'Follow-up due',
      dhaId: 'DHA-00412',
      examCode: '#EXAM-2026-0994',
      status: 'Awaiting Vitals',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
      altText: 'Portrait of Marcus Vance',
    },
  ];

  const handleConfirmPatient = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setConfirmedState(true);
      setTimeout(() => {
        navigate('/treatment-plans/patient-overview');
      }, 700);
    }, 600);
  };

  return (
    <TreatmentPlanShell
      pageTitle="Select Patient for Treatment Plan"
      badgeCode="13.2"
      badgeLabel="Patient Confirmation"
      currentStep="Verification"
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Step Context Subtitle */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex items-center gap-2 text-[#006194] mb-1">
            <Icon name="folder_shared" className="text-[18px]" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Treatment Planning Suite • Clinical Workflow
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#131b2e]">
            Select Patient for Treatment Plan
          </h1>
          <p className="text-sm text-[#707881] mt-1">
            Link new or amended treatment plan to a verified clinical patient record with UAE Pass biometric identity.
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm space-y-4">
          {/* Search Input Bar */}
          <div className="relative flex items-center">
            <Icon name="search" className="absolute left-3.5 text-[#707881] text-[20px]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name, Lifecode (e.g. DHA-2026), or phone..."
              className="w-full h-12 pl-10 pr-10 rounded-xl bg-[#f2f3ff] text-[#131b2e] placeholder:text-[#707881] text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 w-6 h-6 flex items-center justify-center rounded-full bg-[#eaedff] text-[#3f4850] hover:text-[#131b2e]"
                aria-label="Clear search input"
              >
                <Icon name="close" className="text-[14px]" />
              </button>
            )}
          </div>

          {/* Segmented Queue Filter Tabs */}
          <div className="p-1 rounded-xl bg-[#f2f3ff] flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('queue')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'queue'
                  ? 'bg-white text-[#006194] shadow-xs'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              <span>In-Clinic Queue</span>
              <span className="w-5 h-5 rounded-full bg-[#cce5ff] text-[#001d31] text-[11px] font-bold flex items-center justify-center">
                3
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('recent')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                activeTab === 'recent'
                  ? 'bg-white text-[#006194] shadow-xs'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              Recent Encounters
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-[#006194] shadow-xs'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              All Patients
            </button>
          </div>
        </div>

        {/* Chairside Queue Horizontal / Multi-column Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Chairside Queue • Chair 02
            </span>
            <span className="text-xs text-[#006a61] flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              Live Sync Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {patients.map((patient) => {
              const isSelected = selectedPatientId === patient.id;
              return (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#89f5e7]/15 border-[#006a61] shadow-sm'
                      : 'bg-white border-[#eaedff] opacity-85 hover:opacity-100 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={patient.avatar}
                        alt={patient.altText}
                        className="w-12 h-12 rounded-full object-cover border border-[#eaedff]"
                      />
                      {isSelected && (
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                          <Icon name="check_circle" className="text-[#006a61] text-[18px]" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-[#131b2e] truncate">{patient.name}</h3>
                      <p className="text-xs text-[#707881]">{patient.ageGender} • {patient.operatory}</p>
                      <p className="font-mono text-xs text-[#006194] font-medium mt-0.5">{patient.dhaId}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#eaedff]/60 flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#3f4850] font-mono text-[11px]">
                      {patient.examCode}
                    </span>
                    {isSelected ? (
                      <span className="text-[#006a61] font-bold flex items-center gap-1">
                        Active <Icon name="done" className="text-[14px]" />
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPatientId(patient.id);
                        }}
                        className="text-[#006194] font-semibold hover:underline"
                      >
                        Switch
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Patient Confirmation Profile Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-md space-y-5">
          {/* Status Ribbon */}
          <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#89f5e7]/30 text-[#006a61] text-xs font-bold">
              <Icon name="verified" className="text-[16px]" />
              <span>NABIDH Synced Record</span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-[#f2f3ff] text-[#3f4850] font-medium">
              Autonomous Adult Patient
            </span>
          </div>

          {/* Profile Details Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256"
                alt="Amara Okafor Clinical Portrait"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#cce5ff] shadow-sm"
              />
              <div className="absolute -bottom-1.5 -right-1.5 bg-[#006194] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-xs">
                <Icon name="shield" className="text-[14px]" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-extrabold text-[#131b2e]">Amara Okafor</h2>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-[#cce5ff] text-[#001d31]">
                  DHA-2026-00451
                </span>
              </div>
              <p className="text-xs text-[#707881] mt-0.5">34y Female • DOB: 14 Oct 1992</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-[#006a61] font-semibold">
                <Icon name="fingerprint" className="text-[16px]" />
                <span>UAE Pass Level 3 Biometric Verified</span>
              </div>
            </div>
          </div>

          {/* Clinical Episode Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#f2f3ff]">
            <div>
              <span className="text-[11px] uppercase font-bold text-[#707881]">Current Episode</span>
              <p className="text-sm font-semibold text-[#131b2e]">Restorative Care</p>
              <span className="text-xs text-[#707881]">Wuse 2 Clinic Branch (Operatory 2)</span>
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-[#707881]">Attending Clinician</span>
              <p className="text-sm font-semibold text-[#131b2e]">Dr. Daniel James</p>
              <span className="text-xs font-mono text-[#006194]">License: #DEN-48912</span>
            </div>
          </div>

          {/* Medical Alert Badge */}
          <div className="p-3.5 rounded-xl bg-[#ffdad6]/60 border border-[#ba1a1a]/20 flex items-center gap-3">
            <Icon name="warning" className="text-[#ba1a1a] text-[22px] shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#93000a]">Critical Medical Flag</p>
              <p className="text-xs text-[#ba1a1a] font-medium leading-snug">
                Penicillin Anaphylaxis • Verified via Unified NABIDH Allergy Registry
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Record Linkage Summary (4 Streams) */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="account_tree" className="text-[20px] text-[#006194]" />
              <h3 className="text-base font-bold text-[#131b2e]">Clinical Record Linkage</h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#89f5e7]/40 text-[#006a61]">
              4 Streams Ready
            </span>
          </div>

          <div className="space-y-3">
            {/* Stream 1: Odontogram */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f2f3ff]">
              <div className="w-10 h-10 rounded-xl bg-white text-[#006194] flex items-center justify-center shadow-xs shrink-0">
                <Icon name="dentistry" className="text-[22px]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#131b2e]">Clinical Odontogram Chart</span>
                  <span className="text-xs text-[#707881]">12 Oct 2026</span>
                </div>
                <p className="text-xs text-[#3f4850] mt-0.5">
                  Tooth #16 MO Caries (ICDAS 4) • Tooth #15 Watch / Surveillance
                </p>
                <span className="inline-block mt-1.5 text-[11px] font-semibold text-[#006a61] bg-[#89f5e7]/40 px-2 py-0.5 rounded">
                  Interactive Chart Attached
                </span>
              </div>
            </div>

            {/* Stream 2: Clinical Exam */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f2f3ff]">
              <div className="w-10 h-10 rounded-xl bg-white text-[#006194] flex items-center justify-center shadow-xs shrink-0">
                <Icon name="stethoscope" className="text-[22px]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#131b2e]">Comprehensive Clinical Exam</span>
                  <span className="text-xs text-[#707881]">Today 10:30 AM</span>
                </div>
                <p className="text-xs text-[#3f4850] mt-0.5">
                  Comprehensive Exam #EXAM-2026-1048 • Periodontal PSR Code 2
                </p>
              </div>
            </div>

            {/* Stream 3: Radiographs */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f2f3ff]">
              <div className="w-10 h-10 rounded-xl bg-white text-[#006194] flex items-center justify-center shadow-xs shrink-0">
                <Icon name="radiology" className="text-[22px]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#131b2e]">Digital Radiography Records</span>
                  <span className="text-xs font-semibold text-[#006a61]">Verified Bitewing</span>
                </div>
                <p className="text-xs text-[#3f4850] mt-0.5">
                  Dexis Right Bitewing • 2.1mm Coronal Dentin Buffer Verified
                </p>
              </div>
            </div>

            {/* Stream 4: Approved AI Ingestion */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#cce5ff]/40 border border-[#93ccff]/40">
              <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shadow-xs shrink-0">
                <Icon name="psychology" className="text-[22px]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#006194]">AI Diagnostic Ingestion</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#89f5e7] text-[#00201d]">
                    Doctor Approved
                  </span>
                </div>
                <p className="text-xs text-[#3f4850] mt-0.5 font-medium">
                  #DHA-CS-9842: Biomimetic Direct Composite (Tooth #16) + Varnish (#15)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety & Protocol Checklist */}
        <div className="bg-[#f2f3ff] rounded-2xl p-5 sm:p-6 border border-[#eaedff] space-y-4">
          <div className="flex items-center gap-2">
            <Icon name="gpp_good" className="text-[20px] text-[#006a61]" />
            <h4 className="text-sm font-bold text-[#131b2e]">Identity &amp; Patient Safety Verification</h4>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#eaedff] cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.biometric}
                onChange={(e) => setChecklist({ ...checklist, biometric: e.target.checked })}
                className="w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-[#131b2e] block">Biometric Chairside Confirmation</span>
                <span className="text-[11px] text-[#707881]">Verified against UAE Pass Level 3 token</span>
              </div>
              <Icon name="fingerprint" className="text-[#006a61] text-[18px]" />
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#eaedff] cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.medicalHistory}
                onChange={(e) => setChecklist({ ...checklist, medicalHistory: e.target.checked })}
                className="w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-[#131b2e] block">Valid Medical History On File</span>
                <span className="text-[11px] text-[#707881]">Penicillin Anaphylaxis flag cross-referenced in NABIDH</span>
              </div>
              <Icon name="medical_services" className="text-[#006a61] text-[18px]" />
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#eaedff] cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.noDuplicate}
                onChange={(e) => setChecklist({ ...checklist, noDuplicate: e.target.checked })}
                className="w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-[#131b2e] block">No Duplicate Identity Detected</span>
                <span className="text-[11px] text-[#707881]">Lifecode unique match confidence: 100%</span>
              </div>
              <Icon name="badge" className="text-[#006a61] text-[18px]" />
            </label>
          </div>
        </div>

        {/* Clinical Safeguard Alert */}
        <div className="p-4 rounded-xl bg-white border border-[#eaedff] flex items-start gap-3">
          <Icon name="info" className="text-[#006194] text-[20px] shrink-0 mt-0.5" />
          <p className="text-xs text-[#3f4850] leading-relaxed">
            <strong className="text-[#131b2e]">Clinical Safeguard:</strong> Never merge patient identities.
            Generated treatment plans are legally bound to the confirmed DHA Lifecode and verified attending practitioner.
          </p>
        </div>

        {/* Action Trays */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleConfirmPatient}
            disabled={isSubmitting}
            className={`w-full h-12 rounded-xl text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
              confirmedState
                ? 'bg-[#006a61]'
                : isSubmitting
                ? 'bg-[#006194]/80'
                : 'bg-[#006194] hover:bg-[#007bb9]'
            }`}
          >
            {confirmedState ? (
              <>
                <Icon name="check_circle" className="text-[20px]" />
                <span>Patient Confirmed! Routing to Overview...</span>
              </>
            ) : isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Ingesting Diagnostic Data &amp; Binding Record...</span>
              </>
            ) : (
              <>
                <span>Confirm Patient &amp; Continue to Plan Overview</span>
                <Icon name="arrow_forward" className="text-[20px]" />
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedPatientId('p2')}
              className="h-11 rounded-xl bg-white border border-[#eaedff] text-[#3f4850] font-semibold text-xs hover:bg-[#f2f3ff] transition-all"
            >
              Change Patient
            </button>
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/dashboard')}
              className="h-11 rounded-xl bg-transparent text-[#707881] font-semibold text-xs hover:bg-[#f2f3ff] transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
