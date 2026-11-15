import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

interface CollabCase {
  id: string;
  type: 'urgent' | 'second-opinion' | 'mdt';
  lifeCode: string;
  patientName: string;
  patientAgeGender: string;
  toothNumber: string;
  title: string;
  specialtyTag: string;
  statusText: string;
  dueDate?: string;
  isDueToday?: boolean;
  requester: {
    name: string;
    role: string;
    verified: boolean;
    initials: string;
  };
  inquestNote: string;
  attachmentsCount: number;
  attachments: {
    type: string;
    title: string;
    subTitle: string;
    isKey?: boolean;
    badge?: string;
  }[];
  discussionCount?: number;
  consensusPercent?: number;
  isResolved?: boolean;
  consensusSigners?: string[];
}

const COLLAB_CASES: CollabCase[] = [
  {
    id: 'case-1',
    type: 'urgent',
    lifeCode: 'AE-990-112-DXB',
    patientName: 'Marcus Vance',
    patientAgeGender: '28y M',
    toothNumber: 'Tooth #14',
    title: 'Severe Subgingival Caries vs Biologic Width Encroachment',
    specialtyTag: 'Restorative Consultation',
    statusText: 'Urgent Action Required',
    dueDate: 'Due Today, 17:00 GST',
    isDueToday: true,
    requester: {
      name: 'Dr. Kawthar Al-Mansoor',
      role: 'Consultant Endodontist • Asks for Perio / Crown Lengthening',
      verified: true,
      initials: 'KM',
    },
    inquestNote:
      '"Endodontic retreatment complete with bioceramic seal. Subgingival margin is 2.2mm below alveolar crest on distobuccal. Seeking Dr. James\'s determination on surgical crown lengthening vs orthodontic extrusion to preserve biologic width."',
    attachmentsCount: 3,
    attachments: [
      {
        type: 'bitewing',
        title: 'Dexis BW-R-1048',
        subTitle: 'Bitewing X-Ray',
        isKey: true,
        badge: 'Dexis PACS',
      },
      {
        type: 'cbct',
        title: '3D CBCT Vol.',
        subTitle: '0.075mm slice',
        isKey: true,
        badge: 'Volumetric',
      },
      {
        type: 'perio',
        title: 'Perio Charting',
        subTitle: 'BOP Positive • 6mm DB',
        badge: '6mm DB',
      },
    ],
  },
  {
    id: 'case-2',
    type: 'second-opinion',
    lifeCode: 'AE-990-281-DXB',
    patientName: 'Amara Okafor',
    patientAgeGender: '34y F',
    toothNumber: 'Tooth #16',
    title: 'Biomimetic Margin Reinforcement vs Ceramic Onlay Protocol',
    specialtyTag: 'Multi-unit Reconstruction Plan',
    statusText: 'Awaiting Specialist Review',
    dueDate: 'Response ~24h',
    requester: {
      name: 'Dr. Sameer Malik',
      role: 'Clinic Director & Fixed Prosthodontics Specialist',
      verified: true,
      initials: 'SM',
    },
    inquestNote:
      '"Post-op cavity prep completed with deep margin elevation technique using composite resin. Requesting specialist review of remaining cusp thickness and occlusal clearance prior to CAD/CAM milling."',
    attachmentsCount: 2,
    attachments: [
      {
        type: 'macro',
        title: 'Post-Op Prep Macro',
        subTitle: 'Tooth #16 DME prep',
        isKey: true,
        badge: 'Macro Photo',
      },
      {
        type: 'ai',
        title: 'Section 12 AI Synthesis',
        subTitle: 'Biomimetic draft',
        badge: 'AI Draft',
      },
    ],
    discussionCount: 3,
  },
  {
    id: 'case-3',
    type: 'mdt',
    lifeCode: 'AE-990-414-DXB',
    patientName: 'Fatima Al-Zahra',
    patientAgeGender: '28y F',
    toothNumber: 'Quad 2 GBR',
    title: 'Guided Bone Regeneration Healing Matrix (#14)',
    specialtyTag: 'GBR Protocol Consensus',
    statusText: 'Consensus Reached & Archived',
    requester: {
      name: 'Dr. Tariq Al-Hashimi',
      role: 'Consultant Oral & Maxillofacial Surgeon',
      verified: true,
      initials: 'TA',
    },
    inquestNote:
      '"CBCT bone density evaluation at 16 weeks post-grafting indicates 88% bone consolidation with satisfactory cortical plate stability. Site cleared for stage-2 titanium implant fixture placement."',
    attachmentsCount: 2,
    attachments: [
      {
        type: 'cbct',
        title: 'Graft Site CBCT 3D',
        subTitle: 'Consolidation analysis',
        badge: '88% Dense',
      },
      {
        type: 'consensus',
        title: 'MDT Board Sign-off',
        subTitle: 'DHA-MDT-2026-0941',
        badge: 'Authenticated',
      },
    ],
    consensusPercent: 88,
    isResolved: true,
    consensusSigners: ['DJ', 'TA'],
  },
];

export function ProfessionalCollaborationWorkspaceScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'urgent' | 'second-opinion' | 'mdt'>('all');
  const [showOpinionModal, setShowOpinionModal] = useState<CollabCase | null>(null);
  const [opinionText, setOpinionText] = useState('');
  const [opinionSubmitted, setOpinionSubmitted] = useState(false);

  const filteredCases = useMemo(() => {
    if (activeFilter === 'all') return COLLAB_CASES;
    return COLLAB_CASES.filter((c) => c.type === activeFilter);
  }, [activeFilter]);

  const urgentCount = COLLAB_CASES.filter((c) => c.type === 'urgent').length;
  const secondCount = COLLAB_CASES.filter((c) => c.type === 'second-opinion').length;
  const mdtCount = COLLAB_CASES.filter((c) => c.type === 'mdt').length;

  const handleOpinionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpinionSubmitted(true);
    setTimeout(() => {
      setOpinionSubmitted(false);
      setShowOpinionModal(null);
      setOpinionText('');
    }, 1500);
  };

  return (
    <ClinicalWorkspaceShell
      pageTitle="Professional Collaboration Workspace"
      badgeCode="14.20"
      badgeLabel="Interdisciplinary MDT & Tele-Review"
      activeNav="dashboard"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#707881]">
            <button
              type="button"
              onClick={() => navigate('/dentist/dashboard')}
              className="hover:text-[#006194] transition-colors"
            >
              Clinical Workspace
            </button>
            <Icon name="chevron_right" className="text-[14px]" />
            <span className="font-semibold text-[#131b2e]">Peer Collaboration &amp; MDT Boards</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/dentist/second-opinions')}
              className="px-4 py-2 rounded-xl bg-[#006194] hover:bg-[#004e77] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Icon name="add" className="text-[16px]" />
              <span>+ New Collab Request (14.21)</span>
            </button>
          </div>
        </div>

        {/* Top Stat Pulse Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 bg-white rounded-2xl border border-[#eaedff] shadow-xs text-center">
            <div className="text-2xl font-bold text-[#006194]">{COLLAB_CASES.length}</div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#707881] mt-0.5">
              Active Cases
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#eaedff] shadow-xs text-center">
            <div className="text-2xl font-bold text-[#131b2e]">{secondCount}</div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#707881] mt-0.5">
              2nd Opinions
            </div>
          </div>

          <div className="p-4 bg-[#ffdad6]/40 rounded-2xl border border-[#ba1a1a]/30 shadow-xs text-center relative overflow-hidden">
            <div className="flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
              <span className="text-2xl font-bold text-[#ba1a1a]">{urgentCount}</span>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#ba1a1a] mt-0.5">
              Pending Me (Urgent)
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#eaedff] shadow-xs text-center">
            <div className="text-2xl font-bold text-[#006a61]">{mdtCount}</div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#707881] mt-0.5">
              MDT Boards
            </div>
          </div>
        </div>

        {/* Statutory Guardrail Banner (NABIDH Compliant) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#cce5ff]/30 border border-[#93ccff]/50 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#006a61] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Icon name="verified_user" className="text-[20px]" />
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-[#004b74] text-sm">
                NABIDH Privacy Guardrail Active (Zero Full-Record Leak)
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-[#006a61]/15 text-[#006a61] text-[10px] font-bold">
                UAE LifeCode Protocol
              </span>
            </div>
            <p className="text-[#004b74]/90 mt-1 leading-relaxed">
              Case collaboration shares strictly diagnostic extractions (Dexis radiographs, odontogram slices, verified summaries). Patient identifiers are pseudonymized with cryptographic UAE LifeCode tokens in compliance with Dubai Health Data Regulations.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All Cases', count: COLLAB_CASES.length, icon: 'groups_2' },
            { id: 'urgent', label: 'Assigned to Me', count: urgentCount, isUrgent: true, icon: 'priority_high' },
            { id: 'second-opinion', label: 'Second Opinions', count: secondCount, icon: 'rate_review' },
            { id: 'mdt', label: 'MDT Boards', count: mdtCount, icon: 'dashboard' },
          ].map((tab) => {
            const active = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 border ${
                  active
                    ? 'bg-[#006194] text-white border-[#006194] shadow-sm'
                    : 'bg-white text-[#3f4850] border-[#eaedff] hover:bg-[#f2f3ff]'
                }`}
              >
                <Icon name={tab.icon} className="text-[16px]" />
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    active
                      ? 'bg-white/20 text-white'
                      : tab.isUrgent
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : 'bg-[#eaedff] text-[#131b2e]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Case Cards Feed */}
        <div className="space-y-4">
          {filteredCases.map((c) => {
            const isUrgent = c.type === 'urgent';
            return (
              <div
                key={c.id}
                className={`bg-white rounded-3xl border transition-all shadow-sm overflow-hidden ${
                  isUrgent
                    ? 'border-[#ba1a1a]/40 ring-1 ring-[#ba1a1a]/20'
                    : 'border-[#eaedff] hover:border-[#006194]/30'
                }`}
              >
                {/* Top Status Banner */}
                <div
                  className={`px-5 py-2.5 flex items-center justify-between text-xs font-bold ${
                    isUrgent
                      ? 'bg-[#ffdad6]/60 text-[#93000a]'
                      : c.isResolved
                      ? 'bg-[#86f2e4]/30 text-[#006f66]'
                      : 'bg-[#f2f3ff] text-[#006194]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon
                      name={isUrgent ? 'priority_high' : c.isResolved ? 'check_circle' : 'hourglass_top'}
                      className={`text-[16px] ${isUrgent ? 'animate-bounce' : ''}`}
                    />
                    <span className="uppercase tracking-wider">{c.statusText}</span>
                  </div>
                  {c.dueDate && (
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Icon name="schedule" className="text-[14px]" />
                      <span>{c.dueDate}</span>
                    </span>
                  )}
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  {/* Patient & LifeCode Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[#006194]">
                          LIFECODE: {c.lifeCode}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#131b2e] font-mono text-[10px] font-bold border border-[#eaedff]">
                          {c.toothNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#3f4850] text-[10px] font-semibold">
                          {c.specialtyTag}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#131b2e] mt-1 leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-xs text-[#707881] mt-0.5">
                        {c.patientName} ({c.patientAgeGender})
                      </p>
                    </div>

                    {/* Requester Clinician Card */}
                    <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-center gap-3 shrink-0 sm:max-w-xs">
                      <div className="w-10 h-10 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {c.requester.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-[#131b2e] truncate">
                            {c.requester.name}
                          </span>
                          {c.requester.verified && (
                            <Icon name="verified" className="text-[14px] text-[#006a61]" />
                          )}
                        </div>
                        <div className="text-[10px] text-[#707881] truncate">{c.requester.role}</div>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Inquest / Rationale Quote */}
                  <div className="p-3.5 bg-[#f2f3ff] rounded-2xl border border-[#eaedff] text-xs text-[#131b2e] leading-relaxed">
                    <div className="flex items-center gap-1 text-[#006194] font-bold text-[11px] mb-1">
                      <Icon name="clinical_notes" className="text-[14px]" />
                      <span>Clinical Inquest Note</span>
                    </div>
                    <p className="italic">{c.inquestNote}</p>
                  </div>

                  {/* Authorized Attachments Preview */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
                      Authorized Tele-Dental Attachments ({c.attachmentsCount})
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {c.attachments.map((att, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] flex flex-col justify-between space-y-1 hover:border-[#006194]/40 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-[#131b2e] truncate">
                              {att.title}
                            </span>
                            {att.badge && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#eaedff] text-[#006194]">
                                {att.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-[#707881]">{att.subTitle}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-[#707881]">
                      <Icon name="lock" className="text-[14px] text-[#006a61]" />
                      <span>Encrypted DHA-EHR Channel (UAE LifeCode Encrypted)</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => navigate('/dentist/patient-overview')}
                        className="px-3.5 py-2 rounded-xl bg-white border border-[#eaedff] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
                      >
                        View Odontogram
                      </button>

                      {isUrgent ? (
                        <button
                          type="button"
                          onClick={() => setShowOpinionModal(c)}
                          className="px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <Icon name="rate_review" className="text-[16px]" />
                          <span>Review Case &amp; Provide Opinion</span>
                        </button>
                      ) : c.discussionCount ? (
                        <button
                          type="button"
                          onClick={() => navigate('/dentist/second-opinions')}
                          className="px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <Icon name="forum" className="text-[16px]" />
                          <span>View Discussion Thread ({c.discussionCount})</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => navigate('/dentist/second-opinions')}
                          className="px-4 py-2 rounded-xl bg-[#f2f3ff] text-[#006194] text-xs font-bold hover:bg-[#eaedff] transition-colors flex items-center gap-1.5"
                        >
                          <Icon name="verified" className="text-[16px]" />
                          <span>View Final Consensus Document</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Clinical Velocity Bento Strip */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center shrink-0">
              <Icon name="insights" className="text-[24px]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#131b2e]">Weekly Peer Velocity Benchmark</h4>
              <p className="text-xs text-[#006a61] font-semibold mt-0.5">
                92% faster resolution than standard DHA peer review benchmark (4.2h avg turn-around)
              </p>
            </div>
          </div>

          {/* Mini Bar Graphic */}
          <div className="flex items-end gap-1.5 shrink-0 self-end sm:self-auto h-10">
            <span className="w-3 h-5 bg-[#86f2e4] rounded-t"></span>
            <span className="w-3 h-7 bg-[#86f2e4] rounded-t"></span>
            <span className="w-3 h-8 bg-[#007bb9] rounded-t"></span>
            <span className="w-3 h-10 bg-[#006194] rounded-t"></span>
          </div>
        </div>

        {/* Provide Opinion Modal */}
        {showOpinionModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#eaedff] max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <Icon name="rate_review" className="text-[20px] text-[#006194]" />
                  <span className="text-sm font-bold text-[#131b2e]">
                    Submit Formal Specialist Determination
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOpinionModal(null)}
                  className="text-[#707881] hover:text-[#131b2e] p-1 rounded-lg"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              {opinionSubmitted ? (
                <div className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center mx-auto">
                    <Icon name="check_circle" className="text-[28px]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#131b2e]">
                    Clinical Opinion Digitally Signed
                  </h4>
                  <p className="text-xs text-[#707881]">
                    Transmitted via DHA encrypted channel to {showOpinionModal.requester.name}. Audit entry #OP-2026-9921 generated.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleOpinionSubmit} className="space-y-3 text-xs">
                  <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] space-y-1">
                    <div className="font-bold text-[#131b2e]">{showOpinionModal.title}</div>
                    <div className="text-[11px] text-[#707881]">
                      Patient: {showOpinionModal.patientName} • {showOpinionModal.toothNumber}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#131b2e] mb-1">
                      Specialist Recommendation &amp; Justification
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={opinionText}
                      onChange={(e) => setOpinionText(e.target.value)}
                      placeholder="e.g. Based on 2.2mm distobuccal subgingival margin and crown-to-root ratio, surgical crown lengthening (1.5mm ostectomy) is recommended over orthodontic extrusion..."
                      className="w-full p-3 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194] resize-none leading-relaxed"
                    />
                  </div>

                  <div className="p-2.5 bg-[#f2f3ff] rounded-xl text-[11px] text-[#707881] flex items-center gap-1.5">
                    <Icon name="verified_user" className="text-[14px] text-[#006a61]" />
                    <span>Digitally stamped under Dr. Daniel James (DHA-DEN-48912)</span>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowOpinionModal(null)}
                      className="px-4 py-2 rounded-xl border border-[#eaedff] text-xs font-bold text-[#3f4850]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77]"
                    >
                      Sign &amp; Transmit Opinion
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
