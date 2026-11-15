import { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

interface InvestigationItem {
  id: string;
  patientName: string;
  patientInitials: string;
  patientAgeGender: string;
  dhaId: string;
  status: 'Awaiting Review' | 'Reviewed' | 'Archived';
  category: 'Dental X-Rays' | 'OPG' | 'CBCT 3D' | 'Laboratory' | 'Clinical Photos';
  modalityTitle: string;
  modalitySub: string;
  tag: string;
  timestamp: string;
  clinician: string;
  teeth?: { code: string; label: string; primary?: boolean }[];
  indication?: string;
  finding?: string;
  metrics?: { label: string; value: string; unit: string; normal: string }[];
  images?: { label: string; tag: string; src: string; alt: string }[];
  cbctMock?: { label: string; badge: string; src: string };
  opgMock?: { label: string; src: string };
  detailsUrl: string;
  viewerUrl: string;
  viewerLabel: string;
  viewerIcon: string;
  nabidhVerified?: boolean;
}

const mockInvestigations: InvestigationItem[] = [
  {
    id: 'INV-10482',
    patientName: 'Chinedu Okafor',
    patientInitials: 'CO',
    patientAgeGender: '34y M',
    dhaId: 'DHA-10482',
    status: 'Awaiting Review',
    category: 'Dental X-Rays',
    modalityTitle: 'Dental Radiography',
    modalitySub: 'Bitewing BW-R & PA #16',
    tag: 'DICOM',
    timestamp: '16 Feb 2025, 09:40 GST',
    clinician: 'Nurse Zainab Tariq',
    teeth: [
      { code: '#16', label: '#16 (Primary Caries OM)', primary: true },
      { code: '#15', label: '#15' },
      { code: '#46', label: '#46' },
    ],
    images: [
      {
        label: 'BW-R',
        tag: 'Bitewing Right',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm0iuxSAjNN9JQEfw0-hyvn2zPfbuNJYKtXjq-qaqNkfWi6RGPLlHF9Zr-T6h6KR05fh-pdeycLLFMp_ASlxCK4p4Q5IkyfeStQQAvj6BB1PRy0ME-FxJMmdpLg5fYYWqHALBoidPZ0YgSdZFM35ufO_LDElNCZmVwtiMeTBo90JQ8lTJtx33--yMZDRxWhFe26STSz7d9vQsiIc_TemfvmloDl1Ixso_NQlCHmqwa',
        alt: 'Digital dental bitewing X-ray showing upper and lower molar teeth alignment with subtle proximal enamel shadow on tooth 16',
      },
      {
        label: 'PA-16',
        tag: 'Periapical #16',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVDkCfu-1a__d3VOQjrPkJLqHSi3OdRTB7JBbs_FHRQ9x8-KfA0UsRY30SYYGZUJbAszsIw_51ME2KtlsgUdVNLU61TeJxKsJOgYFc_oi3HjCB4Cc_oXXdDHM9kiOE04AI2tl9owYK3tp35EMxmndV7FfBtPqaUDFiCeTPMJmN_CgnmkttFSvNTqmyzKmng9TIZnKqq3D57lOPNr2m6vDqL1gj1XCMmzDv4y09LFWZ',
        alt: 'Periapical dental radiograph focused on tooth sixteen root apex and surrounding alveolar bone structure',
      },
    ],
    detailsUrl: '/investigations/record-details',
    viewerUrl: '/investigations/viewer/xray',
    viewerLabel: 'Open Viewer (11.15)',
    viewerIcon: 'visibility',
    nabidhVerified: true,
  },
  {
    id: 'INV-08921',
    patientName: 'Fatima Al-Zahra',
    patientInitials: 'FA',
    patientAgeGender: '29y F',
    dhaId: 'DHA-08921',
    status: 'Reviewed',
    category: 'CBCT 3D',
    modalityTitle: 'CBCT 3D Maxillary Arch',
    modalitySub: '0.2mm voxel volume • Al Zahra Imaging',
    tag: 'NABIDH',
    timestamp: '14 Feb 2025, 11:20 GST',
    clinician: 'Dr. Tariq Mansoor',
    indication: 'Pre-implant alveolar bone volume mapping #14-#16. Ridge width optimal.',
    cbctMock: {
      label: 'Axial / Sagittal / 3D Vol',
      badge: 'Interactive 3D',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdlKwNswVqF0IWPCXJaodI6jCRRG8GNaziRuDk7nY02XrtvSwENljeC7c53PJFBGGI1dCiYEnOw2bXN-nmgMV3JTL4OI5980R6fPz06xrsjS1JQsRl2CENv7CB211xdm9KkmRyejpuX8nCy6jjPzgx3vdVCUNS8Plc62-MhQAc2PN0Hog7IqL2DNQTTU2ZsEpASmhyYAPwpHHQwDn7rK4RYT23M5cIh6fQbN8bOZHz',
    },
    detailsUrl: '/investigations/record-details',
    viewerUrl: '/investigations/viewer/cbct',
    viewerLabel: 'Open 3D Viewer (11.17)',
    viewerIcon: 'view_in_ar',
    nabidhVerified: true,
  },
  {
    id: 'INV-00412',
    patientName: 'Marcus Vance',
    patientInitials: 'MV',
    patientAgeGender: '42y M',
    dhaId: 'DHA-00412',
    status: 'Reviewed',
    category: 'OPG',
    modalityTitle: 'Panoramic Radiograph (OPG)',
    modalitySub: 'Full Arch • Emergency Radiology Unit',
    tag: 'OPG',
    timestamp: '12 Feb 2025, 16:15 GST',
    clinician: 'Dr. Daniel James',
    finding: 'Impacted lower third molars #38, #48 in close proximity to inferior alveolar nerve (IAN) canal.',
    opgMock: {
      label: 'Full Dentition FOV',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgvGs9OE4A5cI2Tj6qRZ_nid-NuWmZV2zh5rvNVmqq-U9Q828MBnvd9TtztNQTR2M5J9oBaWW8InCl4ybIxgSrUfKUJER-zqLKbeYGbI9sk4YRvDhk7E-UdPrtVHbuZvogTrUaWoK_0nmzrlDK4treTnK_6d1KeSkteDy-GDLBpkjqPK2E7HBMeBdjs1AQRndy3HuEt9jdIhVax-aYFrMxIokBnaMvwlTDIWDyxBPl',
    },
    detailsUrl: '/investigations/record-details',
    viewerUrl: '/investigations/viewer/opg',
    viewerLabel: 'Open OPG Viewer (11.16)',
    viewerIcon: 'photo_size_select_large',
    nabidhVerified: false,
  },
  {
    id: 'INV-00245',
    patientName: 'Amina Yusuf',
    patientInitials: 'AY',
    patientAgeGender: '28y F',
    dhaId: 'DHA-00245',
    status: 'Reviewed',
    category: 'Laboratory',
    modalityTitle: 'Full Blood Count & Coagulation',
    modalitySub: 'Pre-surgical screening • Al Barsha Diagnostic Lab',
    tag: 'LAB',
    timestamp: '10 Feb 2025, 08:30 GST',
    clinician: 'Verified LIS Entry',
    metrics: [
      { label: 'Platelet Count', value: '240', unit: 'x10^9/L', normal: 'Normal (150-400)' },
      { label: 'Hemoglobin (Hb)', value: '12.8', unit: 'g/dL', normal: 'Normal (12.0-15.5)' },
    ],
    detailsUrl: '/investigations/record-details',
    viewerUrl: '/investigations/viewer/lab',
    viewerLabel: 'Open Lab Viewer (11.18)',
    viewerIcon: 'lab_profile',
    nabidhVerified: true,
  },
];

export function InvestigationLibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('Last 6 Months');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [nabidhFilterActive, setNabidhFilterActive] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const categories = [
    { label: 'All', count: 42 },
    { label: 'Dental X-Rays', count: 18 },
    { label: 'OPG', count: 8 },
    { label: 'CBCT 3D', count: 6 },
    { label: 'Laboratory', count: 7 },
    { label: 'Clinical Photos', count: 3 },
  ];

  const filteredItems = useMemo(() => {
    return mockInvestigations.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'All' && item.status !== selectedStatus) {
        return false;
      }
      // NABIDH verified toggle
      if (nabidhFilterActive && !item.nabidhVerified) {
        return false;
      }
      // Text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.patientName.toLowerCase().includes(q);
        const matchId = item.dhaId.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
        const matchModality = item.modalityTitle.toLowerCase().includes(q) || item.modalitySub.toLowerCase().includes(q);
        const matchTeeth = item.teeth?.some((t) => t.label.toLowerCase().includes(q)) ?? false;
        return matchName || matchId || matchModality || matchTeeth;
      }
      return true;
    });
  }, [selectedCategory, selectedStatus, nabidhFilterActive, searchQuery]);

  const triggerFeedback = (message: string) => {
    setActionFeedback(message);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  return (
    <InvestigationShell
      pageTitle="Investigation Library"
      badgeCode="11.13"
      badgeLabel="Repository"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Action notification toast */}
        {actionFeedback && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Sub-Header & Live Sync Bar */}
        <section className="bg-surface-container-low/70 border border-outline-variant/30 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon name="domain" className="text-lg" />
              </span>
              <span className="font-semibold text-on-surface text-sm sm:text-base truncate">
                DHA Central Dental Clinic
              </span>
              <Icon name="expand_more" className="text-outline text-base shrink-0" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed text-xs font-semibold self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>NABIDH Linked & Synchronized</span>
            </div>
          </div>

          {/* Search Input Component */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
              <Icon name="search" className="text-xl" />
            </div>
            <input
              type="search"
              id="investigation-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient, record ID, tooth #, modality (e.g. #16, Bitewing, Fatima)..."
              className="w-full h-12 pl-11 pr-24 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline-variant text-sm border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary shadow-xs transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1 text-outline">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:text-on-surface rounded-full transition-colors"
                  title="Clear search"
                >
                  <Icon name="close" className="text-base" />
                </button>
              )}
              <button
                type="button"
                onClick={() => triggerFeedback('Voice search listening on microphone...')}
                className="p-1.5 hover:text-primary rounded-full transition-colors"
                title="Voice search"
              >
                <Icon name="mic" className="text-lg" />
              </button>
            </div>
          </div>
        </section>

        {/* Horizontal Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-primary text-on-primary ring-2 ring-primary/30'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[11px] ${
                    isSelected ? 'bg-on-primary/25 text-on-primary' : 'bg-surface-container-highest text-on-surface'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Clinical Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container-low/40 p-3 rounded-xl border border-outline-variant/20">
          <div className="flex flex-wrap items-center gap-2">
            {/* Time filter selector */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="appearance-none inline-flex items-center gap-1 pl-8 pr-7 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-medium border border-outline-variant/30 hover:bg-surface-container-highest transition-colors cursor-pointer"
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="Past Year">Past Year</option>
                <option value="All Time">All Time</option>
              </select>
              <span className="material-symbols-outlined text-outline text-[16px] absolute left-2 pointer-events-none">
                calendar_month
              </span>
              <span className="material-symbols-outlined text-outline text-[16px] absolute right-2 pointer-events-none">
                arrow_drop_down
              </span>
            </div>

            {/* Status dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none inline-flex items-center gap-1 pl-8 pr-7 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-medium border border-outline-variant/30 hover:bg-surface-container-highest transition-colors cursor-pointer"
              >
                <option value="All">Status (All)</option>
                <option value="Awaiting Review">Awaiting Review</option>
                <option value="Reviewed">Reviewed</option>
              </select>
              <span className="material-symbols-outlined text-outline text-[16px] absolute left-2 pointer-events-none">
                filter_alt
              </span>
              <span className="material-symbols-outlined text-outline text-[16px] absolute right-2 pointer-events-none">
                arrow_drop_down
              </span>
            </div>
          </div>

          {/* NABIDH Verified filter badge button */}
          <button
            type="button"
            onClick={() => setNabidhFilterActive(!nabidhFilterActive)}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              nabidhFilterActive
                ? 'bg-secondary text-on-secondary shadow-xs ring-2 ring-secondary/30'
                : 'bg-secondary-container/40 text-on-secondary-container hover:bg-secondary-container/60'
            }`}
          >
            <Icon name="verified" className="text-sm" />
            <span>NABIDH Verified Only</span>
            {nabidhFilterActive && <span className="text-[10px] bg-secondary-fixed/30 px-1 rounded">ON</span>}
          </button>
        </div>

        {/* Results Count Header */}
        <div className="flex items-center justify-between text-xs text-on-surface-variant px-1">
          <span>
            Showing <strong className="text-on-surface font-semibold">{filteredItems.length}</strong> investigations
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </span>
          <span className="font-mono text-[11px] text-outline">PACS / RIS Online</span>
        </div>

        {/* Investigations List Grid: 1 col on mobile, 2 cols on lg, responsive */}
        {filteredItems.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30 shadow-xs flex flex-col items-center justify-center gap-3">
            <span className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-outline">
              <Icon name="search_off" className="text-2xl" />
            </span>
            <h3 className="font-semibold text-on-surface text-base">No investigations match your filters</h3>
            <p className="text-xs text-on-surface-variant max-w-sm">
              Try modifying your search query or reset the category and status filters above.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('All');
                setNabidhFilterActive(false);
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-xs overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-primary/40"
              >
                {/* Card Header */}
                <div className="p-4 sm:p-5 pb-3 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary flex-shrink-0 text-sm">
                        {item.patientInitials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-on-surface text-base truncate">
                            {item.patientName}
                          </span>
                          <span className="text-xs text-outline">{item.patientAgeGender}</span>
                        </div>
                        <span className="font-mono text-xs text-primary font-medium tracking-wide">
                          {item.dhaId}
                        </span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    {item.status === 'Awaiting Review' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold flex-shrink-0">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        Awaiting Review
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-xs font-semibold flex-shrink-0">
                        <Icon name="check_circle" className="text-xs text-secondary" />
                        Reviewed
                      </span>
                    )}
                  </div>

                  {/* Modality Description Banner */}
                  <div className="flex items-center justify-between gap-2 bg-surface-container-low px-3.5 py-2.5 rounded-xl border border-outline-variant/20">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Icon
                          name={
                            item.category === 'CBCT 3D'
                              ? 'view_in_ar'
                              : item.category === 'OPG'
                              ? 'pan_tool'
                              : item.category === 'Laboratory'
                              ? 'biotech'
                              : 'radiology'
                          }
                          className="text-lg"
                        />
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-on-surface text-xs sm:text-sm truncate">
                          {item.modalityTitle}
                        </span>
                        <span className="text-xs text-outline truncate">{item.modalitySub}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono text-[11px] font-semibold">
                      {item.tag}
                    </span>
                  </div>

                  {/* Clinical Metadata Grid */}
                  <div className="grid grid-cols-2 gap-2 text-on-surface-variant text-xs pt-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <Icon name="schedule" className="text-outline text-sm shrink-0" />
                      <span className="truncate">{item.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Icon name="badge" className="text-outline text-sm shrink-0" />
                      <span className="truncate">{item.clinician}</span>
                    </div>
                  </div>

                  {/* Odontogram Teeth Tags */}
                  {item.teeth && item.teeth.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">Teeth:</span>
                      {item.teeth.map((t) => (
                        <span
                          key={t.code}
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
                            t.primary
                              ? 'bg-error-container text-on-error-container border border-error/20'
                              : 'bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Indication Note */}
                  {item.indication && (
                    <div className="bg-surface-container-high/40 p-2.5 rounded-xl flex items-start gap-2 border border-outline-variant/20 text-xs">
                      <Icon name="assignment" className="text-primary text-base shrink-0 mt-0.5" />
                      <p className="text-on-surface leading-relaxed">
                        <strong className="font-semibold">Indication:</strong> {item.indication}
                      </p>
                    </div>
                  )}

                  {/* Finding Alert Callout */}
                  {item.finding && (
                    <div className="bg-surface-container p-2.5 rounded-xl flex items-start gap-2 border border-outline-variant/20 text-xs">
                      <Icon name="clinical_notes" className="text-secondary text-base shrink-0 mt-0.5" />
                      <p className="text-on-surface leading-relaxed">
                        <strong className="font-semibold">Finding:</strong> {item.finding}
                      </p>
                    </div>
                  )}

                  {/* Lab Metrics Bento */}
                  {item.metrics && (
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {item.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-0.5"
                        >
                          <span className="text-xs text-outline">{m.label}</span>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="font-bold text-on-surface text-lg">{m.value}</span>
                            <span className="font-mono text-xs text-outline">{m.unit}</span>
                          </div>
                          <span className="text-[11px] text-secondary font-medium mt-0.5">{m.normal}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Radiograph Previews (2 thumbnails) */}
                  {item.images && item.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {item.images.map((img) => (
                        <NavLink
                          key={img.label}
                          to={item.viewerUrl}
                          className="relative rounded-xl overflow-hidden aspect-[4/3] bg-inverse-surface group cursor-pointer block border border-outline-variant/30"
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
                            <span className="font-mono px-2 py-0.5 rounded bg-black/60 text-[11px] font-semibold backdrop-blur-xs">
                              {img.label}
                            </span>
                            <Icon name="zoom_in" className="text-base opacity-80 group-hover:opacity-100" />
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  )}

                  {/* CBCT Mock Visual */}
                  {item.cbctMock && (
                    <NavLink
                      to={item.viewerUrl}
                      className="relative w-full h-36 rounded-xl overflow-hidden bg-inverse-surface mt-1 group cursor-pointer block border border-outline-variant/30"
                    >
                      <img
                        src={item.cbctMock.src}
                        alt="CBCT Orthogonal Slice"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 rounded-md bg-black/70 text-white font-mono text-[10px] backdrop-blur-xs">
                          {item.cbctMock.label}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white text-xs font-semibold bg-primary/90 px-2.5 py-1 rounded-lg backdrop-blur-sm shadow-sm">
                        <Icon name="3d_rotation" className="text-sm" />
                        <span>{item.cbctMock.badge}</span>
                      </div>
                    </NavLink>
                  )}

                  {/* OPG Mock Visual */}
                  {item.opgMock && (
                    <NavLink
                      to={item.viewerUrl}
                      className="relative w-full h-32 rounded-xl overflow-hidden bg-inverse-surface mt-1 group cursor-pointer block border border-outline-variant/30"
                    >
                      <img
                        src={item.opgMock.src}
                        alt="Panoramic OPG Radiograph"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs">
                        <Icon name="aspect_ratio" className="text-sm" />
                        <span className="font-mono text-[11px]">{item.opgMock.label}</span>
                      </div>
                    </NavLink>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="p-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between gap-2">
                  <NavLink
                    to={item.detailsUrl}
                    className="flex-1 h-11 px-3 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-highest transition-colors text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Icon name="info" className="text-outline text-base" />
                    <span>Details (11.14)</span>
                  </NavLink>

                  <NavLink
                    to={item.viewerUrl}
                    className="flex-1 h-11 px-3 rounded-xl bg-primary text-on-primary hover:bg-primary/95 transition-all text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Icon name={item.viewerIcon} className="text-base" />
                    <span>{item.viewerLabel}</span>
                  </NavLink>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Floating / Sticky Archive Tools Tray */}
        <div className="sticky bottom-4 z-30 w-full p-4 rounded-2xl bg-surface/95 backdrop-blur-xl border border-outline-variant/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant w-full sm:w-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate">NABIDH Live Sync Engine: 42 records cached</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => triggerFeedback('Initiating batch DICOM lossless package export...')}
              className="flex-1 sm:flex-initial h-11 px-4 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Icon name="download_for_offline" className="text-primary text-base" />
              <span>Batch Export DICOM</span>
            </button>
            <button
              type="button"
              onClick={() => triggerFeedback('NABIDH bidirectional sync completed successfully!')}
              className="flex-1 sm:flex-initial h-11 px-4 rounded-xl bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed transition-all text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Icon name="sync" className="text-secondary text-base" />
              <span>Sync NABIDH</span>
            </button>
          </div>
        </div>
      </div>
    </InvestigationShell>
  );
}
