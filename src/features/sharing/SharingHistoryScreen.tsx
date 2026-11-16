import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SharingShell } from './SharingShell';
import { Icon } from '../../design/Primitives';

interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  actorType: 'clinician' | 'facility' | 'patient';
  action: string;
  category: 'access' | 'consent' | 'revocation' | 'referral';
  details: string;
  facility: string;
  hash: string;
}

export function SharingHistoryScreen() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'access' | 'consent' | 'revocation' | 'referral'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const auditEvents: AuditEvent[] = [
    {
      id: 'aud-1',
      timestamp: 'Today, 10:14 AM',
      actor: 'Dr. Tariq Mansoor',
      actorType: 'clinician',
      action: 'Record Inspected',
      category: 'access',
      details: 'Accessed Panoramic OPG X-Ray & Bite-wing diagnostic set during scheduled examination.',
      facility: 'Victoria Island Dental Care',
      hash: 'sha256:4f8a...c901',
    },
    {
      id: 'aud-2',
      timestamp: 'Yesterday, 04:30 PM',
      actor: 'Dr. Reem Nwosu',
      actorType: 'clinician',
      action: 'Consent Requested',
      category: 'consent',
      details: 'Requested 30-day access to OPG, Odontogram and Lateral Cephalometric for orthodontic workup.',
      facility: 'Medcare Medical Centre',
      hash: 'sha256:7b2e...a415',
    },
    {
      id: 'aud-3',
      timestamp: '08 Nov 2025, 10:30 AM',
      actor: 'Dr. Tariq Mansoor',
      actorType: 'clinician',
      action: 'Specialist Referral Created',
      category: 'referral',
      details: 'Initiated case referral #REF-DHA-2025-0894 for Class II anterior crossbite treatment.',
      facility: 'Victoria Island Dental Care',
      hash: 'sha256:1a9c...d338',
    },
    {
      id: 'aud-4',
      timestamp: '05 Nov 2025, 02:45 PM',
      actor: 'Ngozi Eze (Patient)',
      actorType: 'patient',
      action: 'Permission Revoked',
      category: 'revocation',
      details: 'Revoked active read permission for Nigerian Specialty Dental. Cryptographic token expired immediately.',
      facility: 'Self-Service via Patient Portal',
      hash: 'sha256:9d01...fa22',
    },
    {
      id: 'aud-5',
      timestamp: '24 Oct 2024, 11:20 AM',
      actor: 'Lagos Smile Dental Centre',
      actorType: 'facility',
      action: 'Triage Access Granted',
      category: 'consent',
      details: 'Authorized 60-day institutional access to Zayd Okoye pediatric preventive screening profile.',
      facility: 'Al Zahra Hospital Lagos',
      hash: 'sha256:6e33...88bb',
    },
  ];

  const filteredEvents = auditEvents.filter((ev) => {
    const matchesCategory = filterCategory === 'all' || ev.category === filterCategory;
    const matchesSearch =
      ev.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.facility.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SharingShell
      pageTitle="Sharing History & Audit Trail"
      badgeCode="7.8"
      badgeLabel="Immutable DHA Ledger"
    >
      <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
        {/* Header Hero */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container text-secondary flex items-center justify-center shrink-0">
              <Icon name="history_toggle_off" className="text-[24px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                  Consent Audit & Access History
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-secondary text-[10px] font-bold">
                  Immutable
                </span>
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Every record view, consent authorization, and access revocation is cryptographically signed and logged.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              className="px-3.5 py-2 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition flex items-center gap-1.5"
            >
              <Icon name="download" className="text-[16px]" />
              <span>Export Audit Trail</span>
            </button>
          </div>
        </section>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by doctor, clinic, or action..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                filterCategory === 'all'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All Events ({auditEvents.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('access')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                filterCategory === 'access'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Reads
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('consent')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                filterCategory === 'consent'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Consents
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('revocation')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                filterCategory === 'revocation'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Revocations
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('referral')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                filterCategory === 'referral'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Referrals
            </button>
          </div>
        </div>

        {/* Timeline Log Feed */}
        {filteredEvents.length > 0 ? (
          <div className="space-y-3">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:border-outline-variant transition"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      ev.category === 'access'
                        ? 'bg-secondary-container/40 text-secondary'
                        : ev.category === 'consent'
                        ? 'bg-primary-fixed/30 text-primary'
                        : ev.category === 'revocation'
                        ? 'bg-error-container text-on-error-container'
                        : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    <Icon
                      name={
                        ev.category === 'access'
                          ? 'visibility'
                          : ev.category === 'consent'
                          ? 'verified_user'
                          : ev.category === 'revocation'
                          ? 'lock_reset'
                          : 'forward_to_inbox'
                      }
                      className="text-[20px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-title-sm text-sm font-bold text-on-surface">
                        {ev.action}
                      </span>
                      <span className="text-xs text-on-surface-variant">by</span>
                      <strong className="text-xs text-primary font-semibold">{ev.actor}</strong>
                      <span className="text-[11px] text-on-surface-variant">({ev.facility})</span>
                    </div>

                    <p className="text-xs text-on-surface-variant leading-relaxed">{ev.details}</p>

                    <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-on-surface-variant">
                      <span>Ledger Digest: {ev.hash}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 self-start sm:self-auto">
                  <span className="text-[11px] font-semibold text-on-surface-variant block">
                    {ev.timestamp}
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${
                      ev.category === 'access'
                        ? 'bg-secondary-container text-secondary'
                        : ev.category === 'consent'
                        ? 'bg-primary/10 text-primary'
                        : ev.category === 'revocation'
                        ? 'bg-error-container text-error'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {ev.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 text-center space-y-3">
            <Icon name="search_off" className="text-[32px] text-on-surface-variant mx-auto" />
            <h3 className="font-headline-sm text-base font-bold text-on-surface">No Events Match Query</h3>
            <p className="text-xs text-on-surface-variant">
              Try adjusting your filter or search terms.
            </p>
          </div>
        )}

        {/* Legal & Regulatory Footnote */}
        <section className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between gap-3 text-xs text-on-surface-variant">
          <div className="flex items-center gap-2">
            <Icon name="shield" className="text-secondary text-[18px]" />
            <span>Compliant with Nigeria Federal Law No. 2 of 2019 on Health Data & Information.</span>
          </div>
          <NavLink
            to="/patient-dashboard/sharing/overview"
            className="text-primary font-bold hover:underline shrink-0"
          >
            Back to Overview
          </NavLink>
        </section>
      </div>
    </SharingShell>
  );
}

export default SharingHistoryScreen;

