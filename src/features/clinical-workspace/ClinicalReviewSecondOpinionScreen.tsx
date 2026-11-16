import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

const CLINICIANS_LIST = [
  {
    name: 'Dr. Sameer Malik',
    creds: 'DDS, MSc Prostho • Medical Director',
    clinic: 'Harmony Victoria Island Clinic',
    initials: 'SM',
  },
  {
    name: 'Dr. Laila Okoye',
    creds: 'BDS, PhD Endodontics • Clinical Lead',
    clinic: 'Harmony Downtown Center',
    initials: 'LM',
  },
  {
    name: 'Dr. Tariq Haddad',
    creds: 'DMD, MClinDent Periodontology',
    clinic: 'Harmony DIFC Specialized Care',
    initials: 'TH',
  },
];

interface QueueCase {
  id: string;
  patientName: string;
  ageGender: string;
  code: string;
  priority: 'expedited' | 'standard';
  timeLeft: string;
  referrer: string;
  inquiry: string;
  tags: string[];
  receivedTime: string;
}

const QUEUE_CASES: QueueCase[] = [
  {
    id: 'REQ-2026-904',
    patientName: 'Tariq Okoye',
    ageGender: '42y M',
    code: 'DHA-P-9021',
    priority: 'expedited',
    timeLeft: 'Expedited SLA (Remaining 4h)',
    referrer: 'Dr. Elena Rostova (Periodontist, Downtown Clinic)',
    inquiry:
      '"Tooth #21 severe localized vertical bone loss after trauma. Assessing immediate surgical extraction vs crown-lengthening and ferrule restoration."',
    tags: ['CBCT Volumetric 3D', 'Periapical Paired', 'Trauma Assessment'],
    receivedTime: 'Today 08:30 WAT',
  },
  {
    id: 'REQ-2026-881',
    patientName: 'Fatima Bello',
    ageGender: '29y F',
    code: 'DHA-P-4412',
    priority: 'standard',
    timeLeft: 'Standard SLA (48h Window)',
    referrer: 'Dr. Marcus Vance (General Dental Surgeon)',
    inquiry:
      '"Evaluation of full arch digital impression for monolithic zirconia bridge spanning #44-#47 with high occlusal load indices."',
    tags: ['Digital Scan Mesh', 'Occlusal Heatmap'],
    receivedTime: 'Yesterday 16:15 WAT',
  },
  {
    id: 'REQ-2026-843',
    patientName: 'David K. Chen',
    ageGender: '51y M',
    code: 'DHA-P-3390',
    priority: 'standard',
    timeLeft: 'Standard SLA (48h Window)',
    referrer: 'Dr. Reem Nwosu (Endodontic Resident)',
    inquiry:
      '"Tooth #36 separated rotary file instrument in mesiobuccal apical third. Reviewing ultrasonic retrieval feasibility vs intentional replantation."',
    tags: ['Endo Micro Radiograph', 'Apex Locator Log'],
    receivedTime: '2 days ago',
  },
];

export function ClinicalReviewSecondOpinionScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'request' | 'queue'>('request');
  const [docIndex, setDocIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [reviewClassification, setReviewClassification] = useState(
    'Specialist Prosthodontic & Biomechanical Assessment'
  );
  const [inquiryText, setInquiryText] = useState(
    'Tooth #16 cavitated lesion ICDAS 4 prepped under rubber dam. Remaining dentin thickness is 2.1mm above pulp ceiling. Inquiring whether 3-surface direct biomimetic resin composite provides sufficient cuspal deflection protection or if chairside Cerec lithium disilicate onlay is mandated.'
  );
  const [includeBitewings, setIncludeBitewings] = useState(true);
  const [includeOdontogram, setIncludeOdontogram] = useState(true);
  const [includeMacroPhotos, setIncludeMacroPhotos] = useState(true);
  const [includeFullHistory, setIncludeFullHistory] = useState(false);
  const [priorityLevel, setPriorityLevel] = useState<'expedited' | 'routine'>('expedited');
  const [biometricVerified, setBiometricVerified] = useState(true);

  // Queue state
  const [queueCases, setQueueCases] = useState<QueueCase[]>(QUEUE_CASES);
  const [queueFilter, setQueueFilter] = useState<'all' | 'urgent' | 'prostho' | 'endo'>('all');
  const [inspectCase, setInspectCase] = useState<QueueCase | null>(null);

  const currentDoctor = CLINICIANS_LIST[docIndex];

  const handleCycleDoctor = () => {
    const nextIdx = (docIndex + 1) % CLINICIANS_LIST.length;
    setDocIndex(nextIdx);
    setToastMessage(`Assigned colleague updated to ${CLINICIANS_LIST[nextIdx].name}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveDraft = () => {
    setToastMessage('Statutory consultation draft saved to practitioner queue.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biometricVerified) {
      setToastMessage('Error: Statutory biometric authorization must be confirmed.');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    const newCase: QueueCase = {
      id: `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: 'Amara Okafor',
      ageGender: '34y F',
      code: 'NG-990-281-LAG',
      priority: priorityLevel === 'expedited' ? 'expedited' : 'standard',
      timeLeft: priorityLevel === 'expedited' ? 'Expedited SLA (<24h)' : 'Standard SLA (48-72h)',
      referrer: 'Dr. Daniel James, DDS (#DEN-48912)',
      inquiry: inquiryText,
      tags: ['Tooth #16', 'Biomimetic Prep', 'Dexis BW-R-1048'],
      receivedTime: 'Just now',
    };

    setQueueCases([newCase, ...queueCases]);
    setToastMessage('Peer Review Request Submitted! Audit entry generated.');
    setTimeout(() => {
      setToastMessage(null);
      setActiveTab('queue');
    }, 1200);
  };

  const filteredQueue = queueCases.filter((c) => {
    if (queueFilter === 'urgent') return c.priority === 'expedited';
    if (queueFilter === 'prostho') return c.inquiry.toLowerCase().includes('prostho') || c.inquiry.toLowerCase().includes('bridge') || c.inquiry.toLowerCase().includes('onlay');
    if (queueFilter === 'endo') return c.inquiry.toLowerCase().includes('endo') || c.inquiry.toLowerCase().includes('file');
    return true;
  });

  return (
    <ClinicalWorkspaceShell
      pageTitle="Clinical Review & Second Opinion Requests"
      badgeCode="14.21"
      badgeLabel="Peer Consultation Protocol"
      activeNav="dashboard"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#131b2e] text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200">
            <span className="w-2 h-2 rounded-full bg-[#86f2e4] animate-pulse"></span>
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-[#707881] hover:text-white ml-2"
            >
              <Icon name="close" className="text-[16px]" />
            </button>
          </div>
        )}

        {/* Top Segmented Controller */}
        <div className="bg-white rounded-2xl border border-[#eaedff] p-1.5 shadow-sm flex items-center max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab('request')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'request'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'text-[#3f4850] hover:bg-[#f2f3ff]'
            }`}
          >
            <Icon name="rate_review" className="text-[18px]" />
            <span>Request Review (New)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('queue')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'queue'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'text-[#3f4850] hover:bg-[#f2f3ff]'
            }`}
          >
            <Icon name="inbox" className="text-[18px]" />
            <span>Review Queue</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'queue' ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#006194]'
              }`}
            >
              {queueCases.length}
            </span>
          </button>
        </div>

        {/* ===================== VIEW 1: REQUEST CREATION ===================== */}
        {activeTab === 'request' && (
          <form onSubmit={handleSubmitReview} className="space-y-6">
            {/* Stepper Progress */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                  Statutory Peer Review Trace
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#cce5ff]/60 text-[#004b74] font-mono text-[10px] font-bold">
                  Step 1 of 5
                </span>
              </div>

              {/* 5-Step Visualizer */}
              <div className="grid grid-cols-5 gap-2 pt-1 text-center">
                {[
                  { step: 1, label: 'Initiated', active: true, icon: 'edit_note' },
                  { step: 2, label: 'Assigned', active: false, icon: 'person_check' },
                  { step: 3, label: 'Verified', active: false, icon: 'verified' },
                  { step: 4, label: 'Opinion', active: false, icon: 'gavel' },
                  { step: 5, label: 'Handoff', active: false, icon: 'done_all' },
                ].map((s) => (
                  <div key={s.step} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        s.active
                          ? 'bg-[#006194] text-white shadow-sm'
                          : 'bg-[#f2f3ff] text-[#707881]'
                      }`}
                    >
                      <Icon name={s.icon} className="text-[16px]" />
                    </div>
                    <span
                      className={`text-[10px] font-semibold ${
                        s.active ? 'text-[#006194] font-bold' : 'text-[#707881]'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Patient Dossier Card */}
            <div className="bg-white rounded-3xl border border-[#eaedff] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                  Target Patient Dossier
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-bold flex items-center gap-1">
                  <Icon name="shield" className="text-[14px]" />
                  <span>Verified Identity</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#006194] to-[#007bb9] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                    AO
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-[#131b2e]">Amara Okafor</h3>
                      <span className="font-mono text-xs text-[#707881]">34y • Female</span>
                    </div>
                    <p className="text-xs text-[#006194] font-mono mt-0.5 font-bold">
                      LifeCode: NG-990-281-LAG
                    </p>
                    <div className="flex items-center gap-2 flex-wrap pt-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold flex items-center gap-1">
                        <Icon name="warning" className="text-[12px]" />
                        <span>Penicillin Allergy (High Risk)</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#707881] text-[10px] font-semibold">
                        Primary: Lagos Hills
                      </span>
                    </div>
                  </div>
                </div>

                {/* Linked Plan */}
                <div className="p-3 bg-[#f2f3ff] rounded-2xl border border-[#eaedff] text-xs space-y-1 sm:max-w-xs w-full">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                    Linked Treatment Plan
                  </div>
                  <div className="font-bold text-[#131b2e]">#TP-2026-089: Biomimetic Resin #16</div>
                  <button
                    type="button"
                    onClick={() => navigate('/dentist/patient-overview')}
                    className="text-[11px] font-semibold text-[#006194] hover:underline flex items-center gap-1"
                  >
                    <span>View Tooth Chart</span>
                    <Icon name="arrow_forward" className="text-[12px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Review Classification Field */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-2">
              <label className="block text-xs font-bold text-[#131b2e]">
                Clinical Review Classification
              </label>
              <select
                value={reviewClassification}
                onChange={(e) => setReviewClassification(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
              >
                <option>Specialist Prosthodontic &amp; Biomechanical Assessment</option>
                <option>Endodontic Retreatment Evaluation</option>
                <option>Periodontal Surgical Prognosis &amp; Crown Lengthening</option>
                <option>Orthodontic Clearance &amp; Root Resorption Check</option>
              </select>
              <p className="text-[10px] text-[#707881]">
                Designates formal statutory specialty field according to Nigeria Dental Health Authority clinical licensing frameworks.
              </p>
            </div>

            {/* Assigned Reviewing Clinician with Switcher */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                  <Icon name="assignment_ind" className="text-[16px] text-[#006194]" />
                  <span>Assigned Reviewing Clinician</span>
                </label>
                <button
                  type="button"
                  onClick={handleCycleDoctor}
                  className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
                >
                  <Icon name="sync_alt" className="text-[14px]" />
                  <span>Switch Colleague</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {currentDoctor.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-[#131b2e]">{currentDoctor.name}</h4>
                      <Icon name="verified" className="text-[14px] text-[#006a61]" />
                    </div>
                    <div className="text-xs text-[#707881] mt-0.5">{currentDoctor.creds}</div>
                    <div className="text-[10px] text-[#006194] font-medium mt-0.5">
                      {currentDoctor.clinic}
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-bold">
                  On-Duty
                </span>
              </div>
            </div>

            {/* Clinical Inquiry Textarea */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                  <Icon name="clinical_notes" className="text-[16px] text-[#006194]" />
                  <span>Clinical Inquiry &amp; Diagnostic Rationale</span>
                </label>
                <span className="font-mono text-[10px] text-[#707881]">
                  ICDAS 4 • Rubber Dam Protocol
                </span>
              </div>
              <textarea
                rows={4}
                required
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                className="w-full p-3 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194] leading-relaxed resize-none"
              />
              <p className="text-[10px] text-[#707881]">
                Include axial depth measurements, remaining dentin thickness (RDT), and biomechanical load considerations.
              </p>
            </div>

            {/* Disclosed Clinical Data Package (Least-Privilege) */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                    <Icon name="lock_open" className="text-[16px] text-[#006194]" />
                    <span>Disclosed Clinical Data Package</span>
                  </h4>
                  <p className="text-[10px] text-[#707881]">
                    Statutory least-privilege medical privacy enclosure
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#006194] text-[10px] font-bold">
                  3 Files Disclosed
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeBitewings}
                      onChange={(e) => setIncludeBitewings(e.target.checked)}
                      className="w-4 h-4 accent-[#006194]"
                    />
                    <span className="font-semibold text-[#131b2e]">
                      Dexis Bitewing Radiographs (BW-R-1048)
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#707881]">DICOM 14MB</span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeOdontogram}
                      onChange={(e) => setIncludeOdontogram(e.target.checked)}
                      className="w-4 h-4 accent-[#006194]"
                    />
                    <span className="font-semibold text-[#131b2e]">
                      Odontogram Q1 Findings (#15, #16, #17)
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#707881]">Chart Mesh</span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeMacroPhotos}
                      onChange={(e) => setIncludeMacroPhotos(e.target.checked)}
                      className="w-4 h-4 accent-[#006194]"
                    />
                    <span className="font-semibold text-[#131b2e]">
                      High-Res Intraoral Macro Photography
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#707881]">4 Images</span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] opacity-60 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeFullHistory}
                      onChange={(e) => setIncludeFullHistory(e.target.checked)}
                      className="w-4 h-4 accent-[#006194]"
                    />
                    <span className="font-semibold text-[#131b2e]">
                      Full Medical History &amp; Demographics
                    </span>
                  </div>
                  <span className="text-[10px] text-[#ba1a1a] font-bold">Omitted (Privacy)</span>
                </label>
              </div>
            </div>

            {/* SLA Priority Selector */}
            <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-3">
              <label className="block text-xs font-bold text-[#131b2e]">
                Clinical SLA &amp; Response Urgency
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPriorityLevel('expedited')}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    priorityLevel === 'expedited'
                      ? 'bg-[#faf8ff] border-[#006194] ring-2 ring-[#006194]/20'
                      : 'bg-white border-[#eaedff]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#131b2e]">Expedited SLA (&lt; 24h)</span>
                    <Icon
                      name={priorityLevel === 'expedited' ? 'check_circle' : 'radio_button_unchecked'}
                      className={`text-[16px] ${
                        priorityLevel === 'expedited' ? 'text-[#006194]' : 'text-[#707881]'
                      }`}
                    />
                  </div>
                  <span className="text-[11px] text-[#707881] mt-1">
                    For active chairside windows &amp; immediate phase approvals
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriorityLevel('routine')}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    priorityLevel === 'routine'
                      ? 'bg-[#faf8ff] border-[#006194] ring-2 ring-[#006194]/20'
                      : 'bg-white border-[#eaedff]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#131b2e]">Routine Cohort (48–72h)</span>
                    <Icon
                      name={priorityLevel === 'routine' ? 'check_circle' : 'radio_button_unchecked'}
                      className={`text-[16px] ${
                        priorityLevel === 'routine' ? 'text-[#006194]' : 'text-[#707881]'
                      }`}
                    />
                  </div>
                  <span className="text-[11px] text-[#707881] mt-1">
                    For next-phase restorative or elective planning
                  </span>
                </button>
              </div>
            </div>

            {/* Statutory Consent & Compliance Verification Check */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#86f2e4]/20 border border-[#86f2e4]/50 flex items-start gap-3">
              <input
                type="checkbox"
                required
                checked={biometricVerified}
                onChange={(e) => setBiometricVerified(e.target.checked)}
                className="w-5 h-5 accent-[#006a61] mt-0.5 shrink-0"
              />
              <div className="text-xs">
                <h4 className="font-bold text-[#005049]">
                  Statutory Patient Authorization Verified
                </h4>
                <p className="text-[#005049]/90 mt-0.5 leading-relaxed">
                  Patient biometric authorization confirmed for encrypted specialist peer review under Nigeria Federal Medical Liability Law No. 4 (2016) and DHA Clinical Governance Directive.
                </p>
                <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-[#005049]">
                  <span>Biometric Hash: 0x9B...44D</span>
                  <span>•</span>
                  <span>Timestamp: 14:08 WAT</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#eaedff] bg-white text-xs font-bold text-[#3f4850] hover:bg-[#f2f3ff]"
              >
                Save Draft to Practitioner Tray
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] shadow-sm flex items-center justify-center gap-2"
              >
                <Icon name="send" className="text-[16px]" />
                <span>Submit Second Opinion Request</span>
              </button>
            </div>
          </form>
        )}

        {/* ===================== VIEW 2: REVIEW QUEUE ===================== */}
        {activeTab === 'queue' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#131b2e]">Peer Opinion Queue</h3>
                <p className="text-xs text-[#707881] mt-0.5">
                  Statutory peer consults awaiting your clinical assessment
                </p>
              </div>
              <span className="w-9 h-9 rounded-full bg-[#cce5ff]/50 text-[#006194] font-bold text-sm flex items-center justify-center">
                {queueCases.length}
              </span>
            </div>

            {/* Queue Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'all', label: `All Cases (${queueCases.length})` },
                { id: 'urgent', label: 'Urgent < 24h' },
                { id: 'prostho', label: 'Prosthodontics' },
                { id: 'endo', label: 'Endodontics' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setQueueFilter(f.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    queueFilter === f.id
                      ? 'bg-[#006194] text-white border-[#006194]'
                      : 'bg-white text-[#3f4850] border-[#eaedff] hover:bg-[#f2f3ff]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Queue Items */}
            <div className="space-y-3">
              {filteredQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white border border-[#eaedff] shadow-xs space-y-3 hover:border-[#006194]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase ${
                        item.priority === 'expedited'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : 'bg-[#f2f3ff] text-[#006194]'
                      }`}
                    >
                      {item.timeLeft}
                    </span>
                    <span className="font-mono text-xs text-[#707881]">{item.id}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#131b2e]">
                      {item.patientName} • {item.ageGender}
                    </h4>
                    <p className="text-xs text-[#707881] mt-0.5">Referred by: {item.referrer}</p>
                  </div>

                  <p className="text-xs text-[#3f4850] p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] leading-relaxed italic">
                    {item.inquiry}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[#006194] text-[10px] font-semibold border border-[#eaedff]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#eaedff] flex items-center justify-between text-xs text-[#707881]">
                    <span>Received: {item.receivedTime}</span>
                    <button
                      type="button"
                      onClick={() => setInspectCase(item)}
                      className="px-4 py-1.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] transition-colors"
                    >
                      Review &amp; Sign Opinion
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inspect & Sign Modal */}
        {inspectCase && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#eaedff] max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <Icon name="gavel" className="text-[20px] text-[#006194]" />
                  <span className="text-sm font-bold text-[#131b2e]">
                    Clinical Opinion: {inspectCase.id}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectCase(null)}
                  className="text-[#707881] hover:text-[#131b2e] p-1 rounded-lg"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] space-y-1">
                  <div className="font-bold text-[#131b2e]">{inspectCase.patientName}</div>
                  <p className="text-[#707881] italic">{inspectCase.inquiry}</p>
                </div>

                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">
                    Your Formal Opinion &amp; Recommendation
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter specialist recommendation, surgical clearance parameters, and restorative rationale..."
                    className="w-full p-2.5 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194] resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setInspectCase(null)}
                    className="px-4 py-2 rounded-xl border border-[#eaedff] text-xs font-bold text-[#3f4850]"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage(`Signed opinion submitted for ${inspectCase.patientName}!`);
                      setInspectCase(null);
                      setTimeout(() => setToastMessage(null), 3000);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77]"
                  >
                    Authenticate &amp; Sign
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
