import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardShell } from './DashboardShell';
import { usePatientStore } from '../../store/patientStore';
import { Icon } from '../../design/Primitives';

type ActionCategory = 'all' | 'id' | 'records' | 'care' | 'sharing';

interface ActionCardItem {
  id: string;
  category: ActionCategory;
  title: string;
  destination: string;
  description: string;
  tag: string;
  tagColor?: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  actionUrl?: string;
  onClick?: () => void;
  searchKeywords: string;
}

export function QuickActionsScreen() {
  const navigate = useNavigate();
  const { setQrModalOpen } = usePatientStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ActionCategory>('all');
  const [activeNotice, setActiveNotice] = useState<string | null>(null);

  const actions: ActionCardItem[] = [
    {
      id: 'a1',
      category: 'id',
      title: 'My Patient ID & Lifecode',
      destination: 'Lifecode QR Pass & Kiosk Card',
      description:
        'Instant kiosk check-in token with pre-cleared biometric validation for touchless desk arrival.',
      tag: 'DHA-9420-ORL • Ready',
      tagColor: 'text-secondary font-medium',
      icon: 'qr_code_2',
      iconBg: 'bg-primary-fixed',
      iconColor: 'text-on-primary-fixed',
      onClick: () => setQrModalOpen(true),
      searchKeywords: 'patient id lifecode qr pass kiosk check-in token dha-9420-orl',
    },
    {
      id: 'a2',
      category: 'records',
      title: 'My Dental Records',
      destination: 'Diagnostic Records Vault',
      description:
        'Full panoramic orthopantomograms, CBCT 3D volumetric scans, and live periodontal pocket depth charts.',
      tag: '14 Files • Verified DICOM',
      tagColor: 'text-secondary font-medium',
      icon: 'radiology',
      iconBg: 'bg-tertiary-fixed',
      iconColor: 'text-on-tertiary-fixed',
      onClick: () => navigate('/patient-dashboard/oral-health'),
      searchKeywords: 'dental diagnostic records vault panoramic x-rays 3d scans periodontal charts',
    },
    {
      id: 'a3',
      category: 'care',
      title: 'Find a Dentist & Clinics',
      destination: 'Accredited DHA Provider Directory',
      description:
        'Search trusted clinics by orthodontic/pediatric sub-specialties, Dubai districts, and direct insurance tiers.',
      tag: 'Nearest 1.4 km • Enaya / Saada',
      icon: 'location_on',
      iconBg: 'bg-secondary-fixed',
      iconColor: 'text-on-secondary-fixed',
      onClick: () => {
        setActiveNotice('Opening Dubai Accredited Clinic Directory...');
        setTimeout(() => setActiveNotice(null), 3000);
      },
      searchKeywords: 'find dentist accredited clinics directory specialty location insurance network',
    },
    {
      id: 'a4',
      category: 'care',
      title: 'My Follow-ups & Bookings',
      destination: 'Appointment Management',
      description:
        'Manage confirmed clinical appointments, post-extraction checkups, and routine dental hygiene recalls.',
      tag: 'Next: 24 Jan 2025 • Confirmed',
      icon: 'calendar_month',
      iconBg: 'bg-primary-fixed-dim',
      iconColor: 'text-on-primary-fixed',
      onClick: () => navigate('/patient-dashboard'),
      searchKeywords: 'follow-ups appointments bookings management confirmed hygiene routine calendar',
    },
    {
      id: 'a5',
      category: 'records',
      title: 'General Health Profile',
      destination: 'Medical Intake & Allergies',
      description:
        'Critical clinical intake flags: Penicillin allergy noted, Blood Group O+, and primary guardian emergency contacts.',
      tag: 'Penicillin Allergy • O+ POS',
      tagColor: 'text-error font-medium',
      icon: 'clinical_notes',
      iconBg: 'bg-surface-container-high',
      iconColor: 'text-primary',
      onClick: () => navigate('/register/health'),
      searchKeywords: 'general health profile medical intake allergies penicillin blood type emergency contact',
    },
    {
      id: 'a6',
      category: 'sharing',
      title: 'Share Records & Second Opinion',
      destination: 'Secure Record Sharing',
      description:
        'Generate time-limited 24-hour encrypted passcodes or QR vouchers for external dental specialists and secondary opinions.',
      tag: 'AES-256 DHA Vault Encrypted',
      tagColor: 'text-secondary font-medium',
      icon: 'key',
      iconBg: 'bg-secondary-container',
      iconColor: 'text-on-secondary-container',
      onClick: () => {
        setActiveNotice('Generating secure 24-hour single-use consultation link...');
        setTimeout(() => setActiveNotice(null), 3500);
      },
      searchKeywords: 'share records secure record sharing 24hr encrypted token external dentists consent',
    },
  ];

  const filteredActions = actions.filter((act) => {
    const matchesCategory = activeCategory === 'all' || act.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      act.title.toLowerCase().includes(q) ||
      act.description.toLowerCase().includes(q) ||
      act.searchKeywords.includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardShell pageTitle="Quick Actions Hub" showBack>
      {activeNotice && (
        <div className="fixed top-20 right-4 z-50 bg-secondary text-on-secondary px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <Icon name="check_circle" className="text-[20px]" />
          <span className="font-title-sm text-title-sm font-semibold">{activeNotice}</span>
          <button
            type="button"
            onClick={() => setActiveNotice(null)}
            className="ml-2 hover:opacity-75"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* Header & Instant Search Bar */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
                Self-Service Central
              </span>
              <h1 className="font-headline-lg-mobile sm:font-headline-md text-headline-lg-mobile sm:text-headline-md text-on-surface font-bold tracking-tight mt-0.5">
                Quick Actions &amp; Services
              </h1>
            </div>

            <div className="w-10 h-10 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary shadow-xs self-start sm:self-center">
              <Icon name="hub" className="text-[22px]" />
            </div>
          </div>

          {/* Search Input Field */}
          <div className="relative w-full">
            <Icon
              name="search"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[22px] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pass, records, clinics, allergies, triage..."
              className="w-full h-13 pl-12 pr-10 rounded-2xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 border border-outline-variant/30 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center hover:bg-surface-dim transition-colors"
                aria-label="Clear search"
              >
                <Icon name="close" className="text-[16px]" />
              </button>
            )}
          </div>
        </section>

        {/* 24/7 DHA Dental Emergency Priority Banner */}
        <section className="w-full rounded-2xl bg-error-container text-on-error-container p-5 sm:p-6 shadow-md relative overflow-hidden border border-error/20">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-error/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-error text-on-error flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                <Icon name="e911_emergency" className="text-[22px]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm uppercase text-error font-bold tracking-wide">
                    DHA 24/7 Dental Emergency
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-on-error-container/10 font-label-sm text-[10px] font-bold text-error">
                    Live Triage
                  </span>
                </div>
                <h2 className="font-title-md text-title-md text-on-error-container font-bold">
                  Urgent Dental Emergency Hotline
                </h2>
                <p className="font-body-sm text-body-sm text-on-error-container/90 max-w-2xl leading-relaxed">
                  Acute severe toothache, facial swelling, jaw trauma, or severe post-operative bleeding? Connect directly with verified DHA on-call clinicians.
                </p>
              </div>
            </div>

            <a
              href="tel:800342"
              className="h-12 px-6 rounded-xl bg-error text-on-error hover:bg-error/95 font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-sm shrink-0 active:scale-95 transition-all"
            >
              <Icon name="call" className="text-[20px]" />
              <span>Call Triage (800-342)</span>
            </a>
          </div>
        </section>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Actions (6)' },
            { id: 'id', label: 'Lifecode Pass' },
            { id: 'records', label: 'Diagnostic Vault' },
            { id: 'care', label: 'Visits & Clinics' },
            { id: 'sharing', label: 'Secure Tokens' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as ActionCategory)}
              className={`px-4 py-2 rounded-full font-label-md text-label-md font-semibold transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 6 Core Service Actions: Responsive Multi-Column Grid */}
        {filteredActions.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-3xl p-10 text-center flex flex-col items-center justify-center border border-outline-variant/30">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-3">
              <Icon name="manage_search" className="text-[34px]" />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              No Shortcuts Found
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-sm">
              We couldn't find actions matching "{searchQuery}". Try searching for "x-ray", "clinic", or "pass".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm font-semibold shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredActions.map((act) => (
              <div
                key={act.id}
                onClick={act.onClick}
                className="group bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl ${act.iconBg} ${act.iconColor} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon name={act.icon} className="text-[26px]" />
                    </div>

                    <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant shrink-0 group-hover:translate-x-1 transition-transform">
                      <Icon name="arrow_forward" className="text-[18px]" />
                    </div>
                  </div>

                  <h3 className="font-title-md text-title-md text-on-surface font-bold group-hover:text-primary transition-colors">
                    {act.title}
                  </h3>
                  <p className="font-label-sm text-label-sm text-primary font-medium mt-0.5">
                    {act.destination}
                  </p>

                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2.5 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                  <span className={`font-label-sm text-[11px] ${act.tagColor || 'text-on-surface-variant'}`}>
                    {act.tag}
                  </span>
                  <span className="font-label-sm text-[11px] text-primary font-semibold group-hover:underline">
                    Launch →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recent Activity & Audit Trail (Responsive List) */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Icon name="history_toggle_off" className="text-primary text-[22px]" />
              <h2 className="font-title-md text-title-md text-on-surface font-bold">
                Recent Activity &amp; Audit Trail
              </h2>
            </div>
            <button
              type="button"
              onClick={() => alert('Full DHA access logs & audit trail')}
              className="font-label-sm text-label-sm text-primary font-semibold hover:underline"
            >
              View All Logs
            </button>
          </div>

          <div className="divide-y divide-outline-variant/20">
            {/* Audit Item 1 */}
            <div className="py-3.5 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0 mt-0.5">
                <Icon name="share" className="text-[18px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                    Bitewing X-Ray Shared
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0">
                    2d ago
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Shared with Dr. Al-Mansoori • Specialist Endodontics
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-[10px] text-secondary font-medium flex items-center gap-1">
                    <Icon name="lock" className="text-[11px]" />
                    <span>Encrypted 24h</span>
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant font-mono">
                    Auth Ref #SH-8841
                  </span>
                </div>
              </div>
            </div>

            {/* Audit Item 2 */}
            <div className="py-3.5 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0 mt-0.5">
                <Icon name="pin" className="text-[18px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                    Lifecode Kiosk Pass Generated
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0">
                    12 Dec 2024
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Al Barsha Primary Clinic • Kiosk Terminal #03
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-medium flex items-center gap-1">
                    <Icon name="check_circle" className="text-[11px]" />
                    <span>Checked-in (18m duration)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Audit Item 3 */}
            <div className="py-3.5 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0 mt-0.5">
                <Icon name="contact_phone" className="text-[18px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                    Updated Emergency Contact
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0">
                    08 Dec 2024
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Primary Guardian phone (+971 50 *** 921) verified
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-[10px] text-on-surface-variant font-medium">
                    OTP Authenticated
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contextual Coordinator Live Help Strip */}
        <section className="bg-surface-container-low rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-outline-variant/30">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-surface-container-highest text-primary flex items-center justify-center shrink-0 shadow-xs">
              <Icon name="support_agent" className="text-[22px]" />
            </div>
            <div>
              <p className="font-title-sm text-title-sm text-on-surface font-bold">
                Need Dental Navigation Assistance?
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Live consultation with a DHA Dental Care Coordinator
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('Starting live DHA Dental Coordinator session...')}
            className="h-10 px-5 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-primary font-title-sm text-title-sm font-semibold shadow-xs shrink-0 self-start sm:self-center transition-colors"
          >
            Start Chat
          </button>
        </section>
      </div>
    </DashboardShell>
  );
}
