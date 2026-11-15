import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type CategoryFilter = 'All' | 'Clinics' | 'Hospitals' | 'Specialist' | 'Diagnostics';
type StatusFilter = 'All' | 'Under Review' | 'Gazetted' | 'Action Req.' | 'Suspended';

interface Facility {
  id: string;
  name: string;
  rcNumber: string;
  state: string;
  type: 'Clinics' | 'Hospitals' | 'Specialist' | 'Diagnostics';
  status: 'Under Review' | 'Gazetted' | 'Action Req.' | 'Suspended';
  statusDetail: string;
  units: string;
  chairs: string;
  staff: string;
  progressPercent?: number;
  progressLabel?: string;
  sealId?: string;
  auditDate?: string;
  warningNote?: string;
  link: string;
}

const FACILITIES_DATA: Facility[] = [
  {
    id: 'GDC',
    name: 'Greenfield Dental Clinic Ltd',
    rcNumber: 'CAC RC-1489201',
    state: 'Abuja FCT',
    type: 'Clinics',
    status: 'Under Review',
    statusDetail: 'Under Review • 82%',
    units: '2 Clinics',
    chairs: '6 Chairs',
    staff: '6 Rostered',
    progressPercent: 82,
    progressLabel: 'Zonal Hygiene & Safety Audit • Step 4 of 5 Completed',
    link: '/clinic-onboarding/dha-profile',
  },
  {
    id: 'BSDG',
    name: 'BrightSmile Dental Group',
    rcNumber: 'CAC RC-1092481',
    state: 'Abuja FCT',
    type: 'Clinics',
    status: 'Gazetted',
    statusDetail: 'Gazetted • Accredited',
    sealId: 'DHA-FAC-2025-0102 • Valid thru Oct 2027',
    units: '4 Clinics',
    chairs: '14 Chairs',
    staff: '18 Rostered',
    progressPercent: 100,
    progressLabel: 'Full Compliance Certified • Triennial Cycle',
    link: '/clinic-onboarding/dha-profile',
  },
  {
    id: 'AMH',
    name: 'Apex Maxillofacial Hospital',
    rcNumber: 'CAC RC-2938472',
    state: 'Abuja FCT',
    type: 'Hospitals',
    status: 'Action Req.',
    statusDetail: 'Statutory Info Required',
    units: '1 Hospital',
    chairs: '8 Chairs',
    staff: '12 Rostered',
    warningNote: 'Overdue autoclave spore assay & radiation badge contractor upload (Ref 15.32)',
    link: '/clinic-onboarding/request-information',
  },
  {
    id: 'SCCP',
    name: 'SmileCare Community Practice',
    rcNumber: 'CAC RC-992140',
    state: 'Abuja FCT',
    type: 'Specialist',
    status: 'Under Review',
    statusDetail: 'Audit 22 Oct • Inspector Aliyu K.',
    units: '1 Clinic',
    chairs: '2 Chairs',
    staff: '3 Rostered',
    progressPercent: 50,
    progressLabel: 'Tenancy Verified • Physical Premises Pending',
    link: '/clinic-onboarding/branch-review',
  },
  {
    id: 'CDSL',
    name: 'Cedars Dental Surgery Ltd',
    rcNumber: 'CAC RC-884920',
    state: 'Abuja FCT',
    type: 'Clinics',
    status: 'Suspended',
    statusDetail: 'Suspended • Order 15.38',
    units: '1 Clinic',
    chairs: '3 Chairs',
    staff: '4 Rostered',
    warningNote: 'Administrative Cease & Desist: IV sedation without monitor + uncalibrated autoclave',
    link: '/clinic-onboarding/organisation-suspension',
  },
];

export function DHAOrganisationManagementScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('All');
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 2400);
  };

  const filteredFacilities = useMemo(() => {
    return FACILITIES_DATA.filter((f) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.rcNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || f.type === selectedCategory;
      const matchesStatus =
        selectedStatus === 'All' || f.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-['Inter',sans-serif]">
      {/* Toast Notification */}
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
            <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shadow-sm">
              <Icon name="local_hospital" className="text-[22px]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#006194] uppercase tracking-wider block">
                DHA RegOps
              </span>
              <h1 className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight">
                DHA Organisation Management
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerToast('Census export dispatched to downloads')}
              className="hidden sm:flex h-9 px-3.5 items-center gap-1.5 rounded-xl border border-[#dae2fd] text-xs font-semibold text-[#131b2e] bg-white hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="download" className="text-[16px] text-[#006194]" />
              <span>Export Census</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/entry')}
              className="h-9 px-3.5 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Icon name="add" className="text-[18px]" />
              <span className="hidden sm:inline">Register Facility</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shadow-sm text-white ml-1">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-28 space-y-6">
        {/* Metric Overview Bento */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {/* Card 1: Total Registered */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
                Facilities
              </span>
              <span className="flex items-center text-[#006194] text-xs font-bold gap-0.5">
                <Icon name="trending_up" className="text-[14px]" />
                <span>+6%</span>
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#006194] tracking-tight">
                184
              </span>
              <p className="text-xs text-[#3f4850] mt-0.5">National Census Pool</p>
            </div>
          </div>

          {/* Card 2: Gazetted */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
                Gazetted
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#006a61]" />
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#006a61] tracking-tight">
                132
              </span>
              <p className="text-xs text-[#3f4850] mt-0.5">Active &amp; Certified</p>
            </div>
          </div>

          {/* Card 3: In Triage */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881]">
                In Triage
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] font-mono text-[10px] font-bold">
                38 New
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight">
                38
              </span>
              <div className="w-full bg-[#dae2fd] rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-[#006194] h-full rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
          </div>

          {/* Card 4: Suspended / Restricted */}
          <div className="bg-[#ffdad6]/40 p-4 sm:p-5 rounded-2xl border border-[#ffdad6] shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#93000a]">
                Restricted
              </span>
              <Icon name="gavel" className="text-[#ba1a1a] text-[18px]" />
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#ba1a1a] tracking-tight">
                14
              </span>
              <p className="text-xs text-[#93000a] mt-0.5 font-medium">Compliance Hold</p>
            </div>
          </div>
        </section>

        {/* Search & Surveillance Filter Box */}
        <section className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dae2fd]/80 shadow-sm space-y-3.5">
          {/* Search Bar */}
          <div className="relative flex items-center w-full">
            <Icon name="search" className="absolute left-3.5 text-[#707881] text-[20px] pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search CAC RC#, org name, or Director..."
              className="w-full h-11 pl-11 pr-10 rounded-xl bg-[#f2f3ff] text-[#131b2e] placeholder:text-[#707881] text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all border border-transparent focus:border-[#006194]"
            />
            <button
              type="button"
              aria-label="Scan barcode"
              onClick={() => triggerToast('Barcode & QR scanner initialized')}
              className="absolute right-3 text-[#707881] hover:text-[#131b2e] p-1"
            >
              <Icon name="document_scanner" className="text-[18px]" />
            </button>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {(['All', 'Clinics', 'Hospitals', 'Specialist', 'Diagnostics'] as CategoryFilter[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850]'
                }`}
              >
                {cat === 'All' ? 'All Types (184)' : `${cat}`}
              </button>
            ))}
          </div>

          {/* Secondary Demographic Filters */}
          <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#dae2fd]/60 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1 text-xs font-semibold text-[#707881]">
                <Icon name="tune" className="text-[16px]" />
                <span>Filters:</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#eaedff] text-[#131b2e] text-xs font-mono font-medium flex items-center gap-1">
                State: FCT Abuja
              </span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as StatusFilter)}
                className="px-2.5 py-1 rounded-lg bg-[#f2f3ff] text-[#3f4850] text-xs font-medium border border-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#006194]"
              >
                <option value="All">Status: All</option>
                <option value="Under Review">Under Review</option>
                <option value="Gazetted">Gazetted</option>
                <option value="Action Req.">Action Req.</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="text-[#006194] text-xs font-semibold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        </section>

        {/* Live Surveillance Stream Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Live Registry Stream
            </span>
          </div>
          <span className="text-xs font-mono text-[#707881]">
            Viewing {filteredFacilities.length} of 184 Facilities
          </span>
        </div>

        {/* Facility Cards Stream */}
        <div className="space-y-4">
          {filteredFacilities.map((fac) => (
            <article
              key={fac.id}
              onClick={() => navigate(fac.link)}
              className="bg-white rounded-2xl border border-[#dae2fd]/80 p-5 shadow-sm hover:border-[#006194] hover:shadow-md transition-all cursor-pointer space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194] shrink-0 mt-0.5">
                    <Icon name="medical_services" className="text-[22px]" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-[#131b2e] truncate hover:text-[#006194]">
                      {fac.name}
                    </h2>
                    <p className="text-xs font-mono text-[#707881] mt-0.5">
                      {fac.rcNumber} • {fac.state}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0 ${
                    fac.status === 'Gazetted'
                      ? 'bg-[#86f2e4] text-[#006f66]'
                      : fac.status === 'Under Review'
                      ? 'bg-[#cce5ff] text-[#001d31]'
                      : fac.status === 'Action Req.'
                      ? 'bg-[#ffdad6] text-[#93000a]'
                      : 'bg-[#ba1a1a] text-white'
                  }`}
                >
                  {fac.statusDetail}
                </span>
              </div>

              {/* Metric Details Strip */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#f2f3ff] text-center text-xs">
                <div>
                  <span className="text-[10px] font-bold text-[#707881] uppercase block">
                    Units
                  </span>
                  <span className="font-bold text-[#131b2e] mt-0.5 block">{fac.units}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#707881] uppercase block">
                    Chairs
                  </span>
                  <span className="font-bold text-[#131b2e] mt-0.5 block">{fac.chairs}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#707881] uppercase block">
                    Staff
                  </span>
                  <span className="font-bold text-[#131b2e] mt-0.5 block">{fac.staff}</span>
                </div>
              </div>

              {/* Progress or Warning or Seal */}
              {fac.progressPercent !== undefined && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#3f4850] font-medium">{fac.progressLabel}</span>
                    <span className="text-[#006194] font-mono font-bold">
                      {fac.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-[#eaedff] rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        fac.progressPercent === 100 ? 'bg-[#006a61]' : 'bg-[#006194]'
                      }`}
                      style={{ width: `${fac.progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {fac.warningNote && (
                <div className="p-3 bg-[#ffdad6]/40 border border-[#ffdad6] rounded-xl text-xs text-[#93000a] flex items-start gap-2">
                  <Icon name="warning" className="text-[16px] shrink-0 mt-0.5 text-[#ba1a1a]" />
                  <p className="font-medium leading-relaxed">{fac.warningNote}</p>
                </div>
              )}

              {fac.sealId && (
                <div className="p-2.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-xs flex items-center justify-between">
                  <span className="text-[#707881] font-mono text-[11px]">{fac.sealId}</span>
                  <span className="text-[#006a61] font-bold flex items-center gap-1 text-[11px]">
                    <Icon name="verified" className="text-[14px]" />
                    <span>Active Seal</span>
                  </span>
                </div>
              )}

              {/* Action Links */}
              <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between text-xs">
                <span className="text-[#707881]">Click card for facility dossier</span>
                <span className="text-[#006194] font-bold flex items-center gap-1">
                  <span>Open Dossier</span>
                  <Icon name="arrow_forward" className="text-[14px]" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* RegOps Bottom Navigation Dock */}
      <footer className="fixed bottom-0 w-full z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-t border-[#dae2fd] shadow-lg">
        <div className="max-w-md sm:max-w-xl mx-auto h-16 px-4 flex items-center justify-around text-xs">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/organisation-management')}
            className="flex flex-col items-center gap-1 text-[#006194] font-bold"
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
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="edit_document" className="text-[20px]" />
            <span className="text-[10px]">Changes</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
export default DHAOrganisationManagementScreen;
