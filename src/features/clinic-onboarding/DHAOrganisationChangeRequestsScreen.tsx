import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type TabType = 'all' | 'legal' | 'premises' | 'leadership';

interface ChangeRequest {
  id: string;
  category: 'legal' | 'premises' | 'leadership';
  categoryLabel: string;
  step: string;
  orgName: string;
  rcNumber: string;
  zone: string;
  lodgedDate: string;
  submitter: string;
  submitterInitials: string;
  previousValue: string;
  proposedValue: string;
  docTitle: string;
  docSize: string;
  status: 'pending' | 'approved' | 'rfi' | 'rejected';
}

const REQUESTS_DATA: ChangeRequest[] = [
  {
    id: '#CR-2026-092',
    category: 'legal',
    categoryLabel: 'Public Trading / Signage Revision',
    step: 'Step 2 of 3',
    orgName: 'Greenfield Dental Clinic Ltd',
    rcNumber: 'CAC RC-1489201',
    zone: 'FCT Municipal Zone',
    lodgedDate: '19 Oct 2026',
    submitter: 'Dr. Amina Bello, BDS, FWACS',
    submitterInitials: 'AB',
    previousValue: 'Greenfield Dental Clinic',
    proposedValue: 'Greenfield Dental & Implant Centre',
    docTitle: 'CAC_Form_7_Board_Resolution.pdf',
    docSize: '2.4 MB',
    status: 'pending',
  },
  {
    id: '#CR-2026-088',
    category: 'premises',
    categoryLabel: 'Physical Facility Relocation',
    step: 'Step 1 of 3',
    orgName: 'Apex Maxillofacial Hospital',
    rcNumber: 'CAC RC-2938472',
    zone: 'Maitama District',
    lodgedDate: '17 Oct 2026',
    submitter: 'Prof. K. Alabi, FDSRCSEd',
    submitterInitials: 'KA',
    previousValue: 'Plot 12 Area 11 Commercial Arcade, Garki',
    proposedValue: 'Plot 220 Shehu Shagari Way, Maitama, Abuja',
    docTitle: 'Tenancy_Deed_Cadastral_FCT.pdf',
    docSize: '4.1 MB',
    status: 'pending',
  },
  {
    id: '#CR-2026-085',
    category: 'leadership',
    categoryLabel: 'Clinical Directorship Transfer',
    step: 'Step 2 of 3',
    orgName: 'SmileCare Community Practice',
    rcNumber: 'CAC RC-992140',
    zone: 'Wuse Zone 4',
    lodgedDate: '15 Oct 2026',
    submitter: 'Dr. O. Peters (Outgoing CMD)',
    submitterInitials: 'OP',
    previousValue: 'Dr. O. Peters, BDS (MDCN #DEN-33012)',
    proposedValue: 'Dr. F. Alabi, BDS, MPH (MDCN #DEN-48910)',
    docTitle: 'MDCN_Folio_Endorsement_Transfer.pdf',
    docSize: '1.8 MB',
    status: 'pending',
  },
];

export function DHAOrganisationChangeRequestsScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [requests, setRequests] = useState<ChangeRequest[]>(REQUESTS_DATA);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 2400);
  };

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    if (action === 'approved') {
      triggerToast(`Change Request ${id} Approved & Gazetted into National Registry`);
    } else {
      triggerToast(`Change Request ${id} Rejected under Section 15.39`);
    }
  };

  const filteredRequests = useMemo(() => {
    if (activeTab === 'all') return requests;
    return requests.filter((r) => r.category === activeTab);
  }, [activeTab, requests]);

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-['Inter',sans-serif]">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#283044] text-[#eef0ff] px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <Icon name="check_circle" className="text-[16px] text-[#00a392]" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Go back"
              onClick={() => navigate('/clinic-onboarding/organisation-management')}
              className="w-10 h-10 flex items-center justify-center text-[#131b2e] hover:text-[#006194] hover:bg-[#eaedff] rounded-xl transition-colors"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                DHA Registry • Review
              </span>
              <h1 className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight">
                DHA Organisation Change Requests
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerToast('All triage filters synchronized')}
              className="w-10 h-10 flex items-center justify-center text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] rounded-xl transition-colors"
            >
              <Icon name="notifications" className="text-[20px]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shadow-sm text-white">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-28 space-y-6">
        {/* Governance Queue Top Overview */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="admin_panel_settings" className="text-[#006194] text-[22px]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                Healthcare Registry Oversight
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse" />
              <span>Live Queue</span>
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight">
              Change Requests Queue
            </h2>
            <p className="text-xs sm:text-sm text-[#3f4850] mt-0.5">
              Statutory verification desk for practice entity &amp; license modifications
            </p>
          </div>

          {/* Metrics Bento Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#707881] uppercase">Pending Total</span>
                <Icon name="pending_actions" className="text-[#006194] text-[18px]" />
              </div>
              <span className="text-2xl font-black text-[#131b2e] mt-2 font-mono">12</span>
              <span className="text-[11px] text-[#707881]">3 high priority</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#707881] uppercase">Legal Review</span>
                <Icon name="gavel" className="text-[#006195] text-[18px]" />
              </div>
              <span className="text-2xl font-black text-[#006195] mt-2 font-mono">05</span>
              <span className="text-[11px] text-[#3f4850]">Corp &amp; Ownership</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#707881] uppercase">Technical GIS</span>
                <Icon name="location_searching" className="text-[#006a61] text-[18px]" />
              </div>
              <span className="text-2xl font-black text-[#006a61] mt-2 font-mono">04</span>
              <span className="text-[11px] text-[#3f4850]">Site Inspections</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#86f2e4]/30 border border-[#86f2e4] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#006f66] uppercase">Gazetted MTD</span>
                <Icon name="verified" className="text-[#006f66] text-[18px]" />
              </div>
              <span className="text-2xl font-black text-[#006f66] mt-2 font-mono">28</span>
              <span className="text-[11px] text-[#006f66] font-medium">Oct 2026 Cycle</span>
            </div>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Filter Queue
            </span>
            <span className="text-xs font-semibold text-[#006194]">Sorting: SLA Due</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All Requests (12)' },
              { id: 'legal', label: 'Legal & Corporate (5)' },
              { id: 'premises', label: 'Physical Premises (4)' },
              { id: 'leadership', label: 'Clinical Leadership (3)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-white hover:bg-[#f2f3ff] text-[#3f4850] border border-[#dae2fd]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Change Request Cards */}
        <section className="space-y-5">
          {filteredRequests.map((req) => (
            <article
              key={req.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#dae2fd]/80 shadow-sm space-y-4"
            >
              <div className="h-1.5 w-full bg-[#006194]" />

              <div className="p-5 sm:p-6 space-y-4">
                {/* Header & Badges */}
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-md">
                        {req.id}
                      </span>
                      <span className="bg-[#eaedff] text-[#3f4850] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {req.step}
                      </span>
                      {req.status === 'approved' && (
                        <span className="bg-[#86f2e4] text-[#006f66] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          Gazetted
                        </span>
                      )}
                      {req.status === 'rejected' && (
                        <span className="bg-[#ffdad6] text-[#93000a] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          Rejected
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-[#131b2e]">{req.orgName}</h3>
                    <p className="text-xs text-[#707881]">
                      {req.rcNumber} • {req.zone}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-[#006194] bg-[#f2f3ff] px-3 py-1 rounded-full border border-[#dae2fd]">
                    {req.categoryLabel}
                  </span>
                </div>

                {/* Amendment Delta Comparison Block */}
                <div className="bg-[#f2f3ff] rounded-2xl p-4 border border-[#dae2fd]/70 space-y-2.5">
                  <div>
                    <span className="text-[10px] font-bold text-[#707881] uppercase flex items-center gap-1">
                      <Icon name="history" className="text-[14px]" />
                      <span>Previously Gazetted</span>
                    </span>
                    <p className="text-xs font-medium text-[#3f4850] line-through mt-0.5">
                      "{req.previousValue}"
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#006194] text-xs font-bold uppercase">
                    <Icon name="arrow_downward" className="text-[16px]" />
                    <span>Proposed Modification</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#dae2fd] flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-[#006194]">
                      "{req.proposedValue}"
                    </span>
                    <Icon name="check_circle" className="text-[#006a61] text-[18px]" />
                  </div>
                </div>

                {/* Submitter & Document Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#dae2fd]/60">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {req.submitterInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#131b2e] truncate">{req.submitter}</p>
                      <p className="text-[10px] text-[#707881]">Lodged: {req.lodgedDate}</p>
                    </div>
                  </div>

                  {/* Document Attachment Container */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/60 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon name="description" className="text-[#006194] text-[20px] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#131b2e] truncate">{req.docTitle}</p>
                        <p className="text-[10px] text-[#707881]">{req.docSize}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerToast(`Downloaded ${req.docTitle}`)}
                      className="text-[#006194] hover:bg-white p-1 rounded-lg ml-2 shrink-0 transition-colors"
                      title="Download document"
                    >
                      <Icon name="download" className="text-[16px]" />
                    </button>
                  </div>
                </div>

                {/* Actions Tray */}
                {req.status === 'pending' && (
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleAction(req.id, 'approved')}
                      className="flex-1 h-11 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <Icon name="check" className="text-[18px]" />
                      <span>Approve &amp; Gazette Change</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/clinic-onboarding/request-information')}
                      className="h-11 px-4 bg-white hover:bg-[#f2f3ff] border border-[#dae2fd] text-[#006195] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Icon name="contact_support" className="text-[16px]" />
                      <span>Issue Statutory RFI</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(req.id, 'rejected')}
                      className="h-11 px-4 bg-white hover:bg-[#ffdad6]/40 border border-[#ffdad6] text-[#ba1a1a] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Icon name="close" className="text-[16px]" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* RegOps Bottom Navigation Dock */}
      <footer className="fixed bottom-0 w-full z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-t border-[#dae2fd] shadow-lg">
        <div className="max-w-md sm:max-w-xl mx-auto h-16 px-4 flex items-center justify-around text-xs">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/organisation-management')}
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="domain" className="text-[20px]" />
            <span className="text-[10px]">Orgs</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/review-workspace')}
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="fact_check" className="text-[20px]" />
            <span className="text-[10px]">Applications</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/verification-history')}
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="history_edu" className="text-[20px]" />
            <span className="text-[10px]">Verification</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/support-management')}
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="support_agent" className="text-[20px]" />
            <span className="text-[10px]">Support</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/change-requests')}
            className="flex flex-col items-center gap-1 text-[#006194] font-bold"
          >
            <Icon name="edit_document" className="text-[20px]" />
            <span className="text-[10px]">Changes</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
export default DHAOrganisationChangeRequestsScreen;
