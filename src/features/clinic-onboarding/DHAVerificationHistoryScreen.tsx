import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type CategoryFilter = 'all' | 'app' | 'audit' | 'branch' | 'inquiry';

interface TimelineEvent {
  id: string;
  category: 'app' | 'audit' | 'branch' | 'inquiry';
  timestamp: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  officer: string;
  officerDesk: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const EVENTS: TimelineEvent[] = [
  {
    id: '1',
    category: 'inquiry',
    timestamp: '19 Oct 2026 • 09:15 WAT',
    badge: 'RFI Issued',
    badgeColor: 'bg-[#ffdad6] text-[#93000a]',
    title: 'Statutory Query Issued (#DHA-REQ-4402)',
    description:
      'Request for clarification on Operatory 04 CBCT radiation scatter survey report. Status shifted from Under Review to More Information Required.',
    officer: 'Inspector I. Musa',
    officerDesk: 'Credentialing Desk #04',
    icon: 'help',
    iconBg: 'bg-[#ffdad6]',
    iconColor: 'text-[#ba1a1a]',
  },
  {
    id: '2',
    category: 'audit',
    timestamp: '18 Oct 2026 • 16:30 WAT',
    badge: 'Registry Match',
    badgeColor: 'bg-[#89f5e7] text-[#00201d]',
    title: 'Document Verified & Endorsed',
    description:
      'FCT-HEFAMAA Operating License #0842 verified against FCT Health Services Secretariat live registry database.',
    officer: 'Inspector I. Musa',
    officerDesk: 'Live Validation Handshake',
    icon: 'check_circle',
    iconBg: 'bg-[#86f2e4]',
    iconColor: 'text-[#006f66]',
  },
  {
    id: '3',
    category: 'app',
    timestamp: '18 Oct 2026 • 15:42 WAT',
    badge: 'Application Lodged',
    badgeColor: 'bg-[#cce5ff] text-[#001d31]',
    title: 'Formal Application Ingestion (#DHA-APP-2026-8819)',
    description:
      '10 statutory schedules submitted by Medical Director Dr. Amina Bello for Greenfield Dental Clinic Ltd with 2 clinic locations.',
    officer: 'Automated Gateway',
    officerDesk: 'DHA Ingestion Node A',
    icon: 'description',
    iconBg: 'bg-[#cce5ff]',
    iconColor: 'text-[#006194]',
  },
  {
    id: '4',
    category: 'branch',
    timestamp: '17 Oct 2026 • 14:10 WAT',
    badge: 'Inspection Booked',
    badgeColor: 'bg-[#dae2fd] text-[#006195]',
    title: 'Branch Premise Audit Booked (#GDC-ABJ-002)',
    description:
      'Physical inspection schedule confirmed for Garki Satellite branch premises on 24 Oct 2026 at 10:00 AM WAT.',
    officer: 'Inspector Adeleke',
    officerDesk: 'FCT Zonal Field Division',
    icon: 'event',
    iconBg: 'bg-[#dae2fd]',
    iconColor: 'text-[#006195]',
  },
  {
    id: '5',
    category: 'app',
    timestamp: '16 Oct 2026 • 11:20 WAT',
    badge: 'MDCN Handshake',
    badgeColor: 'bg-[#86f2e4] text-[#006f66]',
    title: 'Organisation Account Created & Handshake Established',
    description:
      'Primary practitioner identity authenticated with Medical and Dental Council of Nigeria (MDCN) automated folio integration.',
    officer: 'Directorship Gateway',
    officerDesk: 'MDCN Sync Node 02',
    icon: 'domain_verification',
    iconBg: 'bg-[#86f2e4]',
    iconColor: 'text-[#006f66]',
  },
];

export function DHAVerificationHistoryScreen() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 2400);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      triggerToast('Signed Regulatory Audit Trail (PDF) generated successfully');
    }, 1500);
  };

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all') return EVENTS;
    return EVENTS.filter((e) => e.category === selectedCategory);
  }, [selectedCategory]);

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
            <button
              type="button"
              aria-label="Go back"
              onClick={() => navigate('/clinic-onboarding/dha-profile')}
              className="w-10 h-10 flex items-center justify-center text-[#131b2e] hover:text-[#006194] hover:bg-[#eaedff] rounded-xl transition-colors"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                Section 15 • Review
              </span>
              <h1 className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight">
                DHA Verification History
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isExporting}
              onClick={handleExport}
              className="h-9 px-3.5 bg-white hover:bg-[#eaedff] border border-[#dae2fd] text-[#006194] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Icon
                name={isExporting ? 'sync' : 'picture_as_pdf'}
                className={`text-[16px] ${isExporting ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">
                {isExporting ? 'Generating...' : 'Export Audit PDF'}
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shadow-sm text-white ml-1">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-28 space-y-6">
        {/* Cryptographic Ledger Header Card */}
        <div className="relative overflow-hidden bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-[#86f2e4]/30 text-[#006f66] px-3 py-1 rounded-full text-xs font-bold">
              <Icon name="verified" className="text-[16px]" />
              <span className="uppercase tracking-wider">Statutory Authority Ledger</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#3f4850] font-mono text-xs bg-[#f2f3ff] px-2.5 py-1 rounded-lg border border-[#dae2fd]">
              <Icon name="lock" className="text-[14px] text-[#006194]" />
              <span>SHA-256 Valid</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight">
              DHA Regulatory Verification History
            </h2>
            <p className="text-xs sm:text-sm text-[#3f4850] mt-0.5">
              Greenfield Dental Clinic Ltd • CAC RC-1489201
            </p>
            <p className="font-mono text-xs font-bold text-[#006194] mt-1">
              App ID: #DHA-APP-2026-8819
            </p>
          </div>

          {/* Merkle Root Signature Notice */}
          <div className="flex items-start gap-3 bg-[#f2f3ff] p-3.5 rounded-2xl border border-[#dae2fd]">
            <Icon name="fingerprint" className="text-[#006194] text-[22px] shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#131b2e]">Immutable Merkle Root</p>
              <p className="font-mono text-[11px] text-[#707881] truncate select-all">
                a8f47c32e98d8f0012ba47c43901bca7e891204d194fbc91c0
              </p>
            </div>
            <span className="text-[10px] font-bold bg-[#86f2e4] text-[#006f66] px-2 py-0.5 rounded-full uppercase shrink-0">
              Active
            </span>
          </div>
        </div>

        {/* Filter & Timeline Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Event Categories
            </span>
            <div className="flex items-center gap-1 text-[#006194] text-xs font-semibold">
              <Icon name="swap_vert" className="text-[16px]" />
              <span>Most Recent First</span>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All Events', count: 14 },
              { id: 'app', label: 'Applications', count: 4 },
              { id: 'audit', label: 'Doc Audits', count: 5 },
              { id: 'branch', label: 'Branch Milestones', count: 3 },
              { id: 'inquiry', label: 'Inquiries', count: 2 },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setSelectedCategory(chip.id as CategoryFilter)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  selectedCategory === chip.id
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-white hover:bg-[#f2f3ff] text-[#3f4850] border border-[#dae2fd]'
                }`}
              >
                <span>{chip.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === chip.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[#eaedff] text-[#707881]'
                  }`}
                >
                  {chip.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Chronological Timeline Cards */}
        <div className="relative space-y-5 pl-7 sm:pl-9">
          {/* Timeline Guideline */}
          <div className="absolute left-3 sm:left-4 top-3 bottom-3 w-0.5 bg-[#dae2fd]" />

          {filteredEvents.map((evt) => (
            <div key={evt.id} className="relative space-y-1.5">
              {/* Milestone Node */}
              <div
                className={`absolute -left-[27px] sm:-left-[31px] top-3.5 w-6 h-6 rounded-full ${evt.iconBg} flex items-center justify-center shadow-sm z-10 border-2 border-white`}
              >
                <Icon name={evt.icon} className={`text-[13px] ${evt.iconColor}`} />
              </div>

              {/* Timestamp and Badge */}
              <div className="flex items-center justify-between text-xs text-[#707881] px-1">
                <span>{evt.timestamp}</span>
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 rounded-md font-bold ${evt.badgeColor}`}
                >
                  {evt.badge}
                </span>
              </div>

              {/* Event Content Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#dae2fd]/80 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                    {evt.title}
                  </h3>
                  <Icon name="verified_user" className="text-[#006194] text-[18px] shrink-0" />
                </div>
                <p className="text-xs text-[#3f4850] leading-relaxed">
                  {evt.description}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2.5 bg-[#f2f3ff] px-3 py-2 rounded-xl text-xs text-[#707881] border border-[#dae2fd]/60">
                  <div className="flex items-center gap-1.5 text-[#131b2e] font-semibold">
                    <Icon name="badge" className="text-[15px] text-[#006194]" />
                    <span>{evt.officer}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="apartment" className="text-[15px] text-[#707881]" />
                    <span>{evt.officerDesk}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom PDF Export Button */}
        <div className="pt-4">
          <button
            type="button"
            disabled={isExporting}
            onClick={handleExport}
            className="w-full h-12 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            <Icon
              name={isExporting ? 'sync' : 'download'}
              className={`text-[18px] ${isExporting ? 'animate-spin' : ''}`}
            />
            <span>
              {isExporting
                ? 'Exporting Audit Trail...'
                : 'Export Certified Regulatory Audit Trail (Signed PDF)'}
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
export default DHAVerificationHistoryScreen;
