import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

interface PatientQueueItem {
  id: string;
  name: string;
  shortName: string;
  ageGender: string;
  age: number;
  dob: string;
  blood: string;
  dhaId: string;
  status: string;
  type: string;
  isPediatric?: boolean;
  photoUrl: string;
  consentType: string;
  encounterId: string;
  recordsCount: {
    odontograms: number;
    exams: number;
    investigations: number;
    drafts: number;
  };
}

const mockPatients: PatientQueueItem[] = [
  {
    id: 'amara',
    name: 'Amara Okafor',
    shortName: 'Amara O.',
    ageGender: '34y Female',
    age: 34,
    dob: '14 Oct 1992',
    blood: 'O+',
    dhaId: 'DHA-2026-00451',
    status: 'In-Clinic Today',
    type: 'Adult',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    consentType: 'Adult Patient (Autonomous Medical Consent)',
    encounterId: '#EXAM-2026-1048',
    recordsCount: {
      odontograms: 2,
      exams: 1,
      investigations: 4,
      drafts: 1,
    },
  },
  {
    id: 'chinedu',
    name: 'Chinedu Okafor',
    shortName: 'Chinedu O.',
    ageGender: '41y Male',
    age: 41,
    dob: '28 Aug 1985',
    blood: 'A+',
    dhaId: 'DHA-10482',
    status: 'Pending Summary',
    type: 'Adult',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    consentType: 'Adult Patient (Autonomous Medical Consent)',
    encounterId: '#EXAM-2026-0988',
    recordsCount: {
      odontograms: 1,
      exams: 1,
      investigations: 2,
      drafts: 1,
    },
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    shortName: 'Marcus V.',
    ageGender: '28y Male',
    age: 28,
    dob: '05 May 1998',
    blood: 'B+',
    dhaId: 'DHA-2026-00389',
    status: 'In-Clinic Today',
    type: 'Adult',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    consentType: 'Adult Patient (Autonomous Medical Consent)',
    encounterId: '#EXAM-2026-1049',
    recordsCount: {
      odontograms: 1,
      exams: 1,
      investigations: 1,
      drafts: 0,
    },
  },
  {
    id: 'amina',
    name: 'Amina Yusuf',
    shortName: 'Amina Y.',
    ageGender: '26y Female',
    age: 26,
    dob: '19 Nov 2000',
    blood: 'O-',
    dhaId: 'DHA-2026-00712',
    status: 'Pending Summary',
    type: 'Adult',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    consentType: 'Adult Patient (Autonomous Medical Consent)',
    encounterId: '#EXAM-2026-1050',
    recordsCount: {
      odontograms: 2,
      exams: 1,
      investigations: 3,
      drafts: 0,
    },
  },
  {
    id: 'zayd',
    name: 'Zayd Tariq',
    shortName: 'Zayd T.',
    ageGender: '7y Male',
    age: 7,
    dob: '12 Jan 2019',
    blood: 'A+',
    dhaId: 'DHA-2026-00901',
    status: 'Recent Encounters',
    type: 'Pediatric',
    isPediatric: true,
    photoUrl: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80',
    consentType: 'Guardian Consent Verified (Fatima Tariq - Mother)',
    encounterId: '#EXAM-2026-0914',
    recordsCount: {
      odontograms: 1,
      exams: 1,
      investigations: 1,
      drafts: 0,
    },
  },
];

export function SummaryPatientSelectionScreen() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Recent' | 'Pending' | 'Today'>('All');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('amara');

  const selectedPatient =
    mockPatients.find((p) => p.id === selectedPatientId) || mockPatients[0];

  const filteredPatients = mockPatients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.dhaId.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'All') return true;
    if (activeFilter === 'Recent') return p.status === 'Recent Encounters' || p.status === 'In-Clinic Today';
    if (activeFilter === 'Pending') return p.status === 'Pending Summary';
    if (activeFilter === 'Today') return p.status === 'In-Clinic Today';
    return true;
  });

  return (
    <SummaryShell
      pageTitle="Patient Selection & Confirmation"
      badgeCode="12.2"
      badgeLabel="Step 1 · Selection"
      currentStep="Step 1"
      patientName={selectedPatient.name}
      dhaId={selectedPatient.dhaId}
    >
      <div className="space-y-6">
        {/* Search & Segmented Filtering Module */}
        <section className="bg-white p-4 sm:p-5 rounded-2xl border border-[#eaedff] shadow-xs space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#707881]">
              <Icon name="search" className="text-[20px]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patient name, DHA Lifecode, or phone..."
              className="w-full h-12 pl-11 pr-10 bg-[#faf8ff] border border-[#eaedff] text-[#131b2e] placeholder:text-[#707881] text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#707881] hover:text-[#131b2e]"
                aria-label="Clear search"
              >
                <Icon name="cancel" className="text-[18px]" />
              </button>
            )}
          </div>

          {/* Filter Pills Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveFilter('All')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeFilter === 'All'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#e2e7ff]'
              }`}
            >
              <span>All Patients</span>
              <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
                {mockPatients.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('Today')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'Today'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#e2e7ff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
              <span>In-Clinic Today</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('Pending')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'Pending'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#e2e7ff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#006195]"></span>
              <span>Pending Summary</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('Recent')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'Recent'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#e2e7ff]'
              }`}
            >
              Recent Encounters
            </button>
          </div>
        </section>

        {/* Quick Carousel: Recent Patients in Clinic Queue */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#3f4850]">
              Recent In-Clinic Queue
            </h3>
            <span className="text-xs text-[#707881]">Click card to switch dossier</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {filteredPatients.map((patient) => {
              const isSelected = selectedPatientId === patient.id;
              return (
                <button
                  key={patient.id}
                  type="button"
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`relative p-3 rounded-2xl border text-center flex flex-col items-center transition-all ${
                    isSelected
                      ? 'bg-white border-[#006194] ring-2 ring-[#006194] shadow-md scale-[1.02]'
                      : 'bg-white border-[#eaedff] hover:border-[#bfc7d2] shadow-xs'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#006194] text-white flex items-center justify-center">
                      <Icon name="check" className="text-[14px]" />
                    </div>
                  )}

                  {patient.isPediatric && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#cde5ff] text-[#001d32] text-[9px] font-extrabold uppercase">
                      PED
                    </div>
                  )}

                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[#e2e7ff] mb-2 ring-2 ring-[#f2f3ff] shadow-xs">
                    <img
                      src={patient.photoUrl}
                      alt={patient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4 className="text-xs font-bold text-[#131b2e] truncate w-full">
                    {patient.shortName}
                  </h4>
                  <span className="text-[11px] text-[#707881] mt-0.5">{patient.ageGender}</span>
                  <span
                    className={`text-[10px] font-bold mt-1.5 px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[#cce5ff] text-[#006194]'
                        : 'bg-[#f2f3ff] text-[#3f4850]'
                    }`}
                  >
                    {isSelected ? 'Selected' : patient.status}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Detailed Patient Dossier Card */}
        <section className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
          {/* Header with demographics */}
          <div className="p-5 sm:p-6 bg-gradient-to-br from-white via-[#f2f3ff] to-white border-b border-[#eaedff]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm ring-2 ring-[#006194] shrink-0">
                  <img
                    src={selectedPatient.photoUrl}
                    alt={selectedPatient.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-bold text-[#131b2e]">
                      {selectedPatient.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold flex items-center gap-1">
                      <Icon name="verified" className="text-[14px]" />
                      Verified
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3f4850] mt-0.5">
                    {selectedPatient.ageGender} • DOB: {selectedPatient.dob} • Blood: {selectedPatient.blood}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold uppercase tracking-wider">
                  Active Case
                </span>
              </div>
            </div>

            {/* Matrix details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#eaedff]">
              <div className="bg-white p-3 rounded-xl border border-[#eaedff]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                  DHA Lifecode
                </span>
                <span className="text-xs font-mono font-bold text-[#006194] mt-0.5 block">
                  {selectedPatient.dhaId}
                </span>
                <span className="text-[10px] text-[#006a61] font-semibold flex items-center gap-1 mt-0.5">
                  <Icon name="hub" className="text-[11px]" />
                  Nigeria Health Information Exchange Synced
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#eaedff]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                  Episode Status
                </span>
                <span className="text-xs font-bold text-[#131b2e] mt-0.5 block">
                  Comprehensive Care
                </span>
                <span className="text-[10px] text-[#707881] mt-0.5 block">Wuse 2 Clinic Branch</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#eaedff]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                  Attending Dentist
                </span>
                <span className="text-xs font-bold text-[#131b2e] mt-0.5 block">
                  Dr. Daniel James
                </span>
                <span className="text-[10px] text-[#707881] font-mono mt-0.5 block">#DEN-48912</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#eaedff]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                  Active Encounter
                </span>
                <span className="text-xs font-mono font-bold text-[#006194] mt-0.5 block">
                  {selectedPatient.encounterId}
                </span>
                <span className="text-[10px] text-[#006a61] font-semibold mt-0.5 block">
                  Chairside Ingest Ready
                </span>
              </div>
            </div>
          </div>

          {/* Clinical Safety & Consent Gate */}
          <div className="p-5 sm:p-6 space-y-3 bg-[#faf8ff]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="gshield" className="text-[#006a61] text-[20px]" />
                <h4 className="text-sm font-bold text-[#131b2e]">Clinical Safety &amp; Consent</h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850] text-xs font-semibold">
                Level 3 Protocol
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#eaedff]">
                <Icon name="check_circle" className="text-[#006a61] text-[20px] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h5 className="font-bold text-[#131b2e]">Chairside Identity Confirmed</h5>
                  <p className="text-[#3f4850] mt-0.5 leading-relaxed">
                    Verified identity matches active chairside encounter{' '}
                    <strong className="text-[#131b2e]">{selectedPatient.encounterId}</strong> with
                    active biometric and ID credential.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#eaedff]">
                <Icon name="verified_user" className="text-[#006a61] text-[20px] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h5 className="font-bold text-[#131b2e]">Consent Confirmed</h5>
                  <p className="text-[#3f4850] mt-0.5 leading-relaxed">
                    {selectedPatient.consentType}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#eaedff]/60 border border-[#dae2fd] flex items-start gap-2.5 text-xs text-[#3f4850]">
              <Icon name="policy" className="text-[#006194] text-[18px] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-[#131b2e]">Dr. Daniel James</strong> is authorized under{' '}
                <span className="text-[#006194] font-semibold">DHA Health Informatics Regulation</span>{' '}
                to synthesize clinical records into automated diagnostic draft summaries.
              </p>
            </div>
          </div>
        </section>

        {/* Available Clinical Records for AI Synthesis */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="dataset" className="text-[#006194] text-[20px]" />
              <h4 className="text-base font-bold text-[#131b2e]">Available Ingestion Records</h4>
            </div>
            <span className="text-xs font-bold text-[#006194]">4 Categories Ready</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Section 9: Odontograms */}
            <div className="p-4 bg-white rounded-2xl border border-[#eaedff] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0">
                  <Icon name="dentistry" className="text-[22px]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block">Sec 9: Odontogram</span>
                  <span className="text-[11px] text-[#707881]">
                    {selectedPatient.recordsCount.odontograms} Charts Indexed
                  </span>
                </div>
              </div>
              <Icon name="check_circle" className="text-[#006a61] text-[20px]" />
            </div>

            {/* Section 10: Clinical Exams */}
            <div className="p-4 bg-white rounded-2xl border border-[#eaedff] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#86f2e4] text-[#006a61] flex items-center justify-center shrink-0">
                  <Icon name="clinical_notes" className="text-[22px]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block">Sec 10: Clinical Exam</span>
                  <span className="text-[11px] text-[#707881]">
                    {selectedPatient.recordsCount.exams} Comprehensive Exam
                  </span>
                </div>
              </div>
              <Icon name="check_circle" className="text-[#006a61] text-[20px]" />
            </div>

            {/* Section 11: Investigations */}
            <div className="p-4 bg-white rounded-2xl border border-[#eaedff] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#006195] flex items-center justify-center shrink-0">
                  <Icon name="radiology" className="text-[22px]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block">Sec 11: Investigations</span>
                  <span className="text-[11px] text-[#707881]">
                    {selectedPatient.recordsCount.investigations} Assets &amp; Lab
                  </span>
                </div>
              </div>
              <Icon name="check_circle" className="text-[#006a61] text-[20px]" />
            </div>

            {/* Previous AI Summaries */}
            <div className="p-4 bg-white rounded-2xl border border-[#eaedff] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#3f4850] flex items-center justify-center shrink-0">
                  <Icon name="smart_toy" className="text-[22px]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block">Previous Summaries</span>
                  <span className="text-[11px] text-[#707881]">
                    {selectedPatient.recordsCount.drafts > 0
                      ? `${selectedPatient.recordsCount.drafts} Draft in Progress`
                      : 'None'}
                  </span>
                </div>
              </div>
              <Icon name="history" className="text-[#006194] text-[20px]" />
            </div>
          </div>
        </section>

        {/* Tip & Governance Notice */}
        <div className="p-4 bg-[#f2f3ff] rounded-2xl border border-[#eaedff] flex items-start gap-3 text-xs text-[#3f4850]">
          <Icon name="psychology" className="text-[#006194] text-[20px] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Selecting confirmation preserves clinical provenance. You will have full supervisory control to accept,
            edit, or reject any generated narrative in the workspace.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/summaries/dashboard')}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#eaedff] hover:bg-[#f2f3ff] text-[#3f4850] text-sm font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => navigate('/summaries/sources')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Confirm Patient &amp; Select Sources</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
        </div>
      </div>
    </SummaryShell>
  );
}
