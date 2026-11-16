import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SharingShell } from './SharingShell';
import { Icon } from '../../design/Primitives';

/* ------------------------------------------------------------------ */
/*  Static provider data                                              */
/* ------------------------------------------------------------------ */

interface AuditEntry {
  time: string;
  action: string;
}

interface Provider {
  id: string;
  name: string;
  facility: string;
  type: 'individual' | 'institutional';
  photoUrl: string | null;
  icon: string;
  verified: boolean;
  daysLeft: number;
  datasets: string[];
  dependentTag: string | null;
  lastActivity: string;
  auditLog: AuditEntry[];
}

const PROVIDERS: Provider[] = [
  {
    id: 'tariq',
    name: 'Dr. Tariq Mansoor',
    facility: 'Victoria Island Dental Care',
    type: 'individual',
    photoUrl: null,
    icon: 'dentistry',
    verified: true,
    daysLeft: 28,
    datasets: ['OPG Panoramic', 'Odontogram Matrix', 'Screening Records'],
    dependentTag: null,
    lastActivity: 'Today, 10:14 AM',
    auditLog: [
      { time: '13 Nov 2026, 10:14 AM', action: 'Viewed OPG Panoramic scan' },
      { time: '11 Nov 2026, 03:22 PM', action: 'Downloaded Odontogram Matrix' },
      { time: '08 Nov 2026, 09:05 AM', action: 'Access granted by patient' },
    ],
  },
  {
    id: 'reem',
    name: 'Dr. Reem Nwosu',
    facility: 'Medcare Clinic',
    type: 'individual',
    photoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNIudSoAbUfFy7bCZiaruoZf_1F1eTKy5JsB5SOY3rVZC2w7FYbzAnIogis0t4YOp5dHtgNx1IxEGdzD0YQP-FPwkE3d7mh46fnY-lMIkzV5zrUqkYxbtkHIcJiCWIkpDAQRedtXBw_vNsRucK8P22kBk2xcoCBCNO4CYNKvBzuerd6fMqa4QlOdHEVJfJvBQwvPVzlzh_irzICpnvp4mJSfMWPXAx9bQvmfcHmuZj',
    icon: 'dentistry',
    verified: true,
    daysLeft: 14,
    datasets: ['3D Odontogram', 'Cephalometric'],
    dependentTag: null,
    lastActivity: 'Yesterday, 04:45 PM',
    auditLog: [
      { time: '12 Nov 2026, 04:45 PM', action: 'Viewed 3D Odontogram model' },
      { time: '10 Nov 2026, 11:30 AM', action: 'Viewed Cephalometric analysis' },
      { time: '05 Nov 2026, 02:00 PM', action: 'Access granted by patient' },
    ],
  },
  {
    id: 'alzahra',
    name: 'Lagos Smile Dental Centre',
    facility: 'Institutional Facility',
    type: 'institutional',
    photoUrl: null,
    icon: 'domain',
    verified: true,
    daysLeft: 60,
    datasets: ['Odontogram Matrix', 'Cone Beam CT'],
    dependentTag: 'Zayd (Dependent)',
    lastActivity: '10 Nov 2026, 01:20 PM',
    auditLog: [
      { time: '10 Nov 2026, 01:20 PM', action: 'Viewed Odontogram Matrix' },
      { time: '06 Nov 2026, 09:00 AM', action: 'Access granted for dependent Zayd' },
      { time: '06 Nov 2026, 09:00 AM', action: 'Institutional onboarding completed' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function ManageSharedAccessScreen() {
  /* ---- state ---- */
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Expiring Soon' | 'Revoked'>('All');
  const [openAuditLog, setOpenAuditLog] = useState<string | null>(null);
  const [revokeModal, setRevokeModal] = useState<string | null>(null);
  const [revokeAcknowledged, setRevokeAcknowledged] = useState(false);
  const [revokedProviders, setRevokedProviders] = useState<string[]>([]);

  /* ---- helpers ---- */
  const activeProviders = PROVIDERS.filter((p) => !revokedProviders.includes(p.id));
  const revokedList = PROVIDERS.filter((p) => revokedProviders.includes(p.id));

  const filteredProviders = activeProviders.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.facility.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterStatus === 'Active') return p.daysLeft > 14;
    if (filterStatus === 'Expiring Soon') return p.daysLeft <= 14;
    if (filterStatus === 'Revoked') return false;
    return true;
  });

  const handleConfirmRevoke = () => {
    if (revokeModal) {
      setRevokedProviders((prev) => [...prev, revokeModal]);
    }
    setRevokeModal(null);
    setRevokeAcknowledged(false);
  };

  const handleCancelRevoke = () => {
    setRevokeModal(null);
    setRevokeAcknowledged(false);
  };

  const now = new Date().toLocaleString('en-AE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <SharingShell pageTitle="Manage Shared Access" badgeCode="7.5" badgeLabel="Consent Vault">
      <div className="space-y-6">
        {/* ===== 1. Consent Vault Summary Card ===== */}
        <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0">
            <Icon name="shield" className="text-[28px] text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-headline-sm text-on-surface font-bold">3 Providers Active</h2>
            <p className="font-body-md text-on-surface-variant mt-0.5">
              Your shared dental records are encrypted and managed under DHA Consent Vault.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
              <Icon name="lock" className="text-[14px]" />
              Encrypted Log
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-semibold">
              <Icon name="pending_actions" className="text-[14px]" />
              2 Pending Reviews
            </span>
          </div>
        </div>

        {/* ===== 2. Search & Filter Bar ===== */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Icon name="search" className="text-[20px] text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface font-body-md placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-primary/40 transition sm:w-48"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Expiring Soon">Expiring Soon</option>
            <option value="Revoked">Revoked</option>
          </select>
        </div>

        {/* ===== 3-5. Provider Cards Grid ===== */}
        {filterStatus === 'Revoked' ? (
          revokedList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {revokedList.map((provider) => (
                <div
                  key={provider.id}
                  className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 opacity-50 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                      <Icon name={provider.icon} className="text-[22px] text-on-surface-variant" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-title-sm font-semibold text-on-surface truncate">{provider.name}</p>
                      <p className="text-xs text-on-surface-variant">{provider.facility}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-xs font-semibold">
                    <Icon name="block" className="text-[14px]" />
                    Revoked
                  </span>
                  <p className="text-xs text-on-surface-variant">Revoked at: {now}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/20 p-8 text-center">
              <Icon name="check_circle" className="text-[40px] text-primary mx-auto" />
              <p className="font-title-sm text-on-surface-variant mt-2">No revoked authorisations</p>
            </div>
          )
        ) : filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProviders.map((provider) => {
              const auditOpen = openAuditLog === provider.id;
              return (
                <div
                  key={provider.id}
                  className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-sm flex flex-col space-y-4 transition hover:shadow-md"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    {provider.photoUrl ? (
                      <img
                        src={provider.photoUrl}
                        alt={provider.name}
                        className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-outline-variant/20"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                        <Icon name={provider.icon} className="text-[24px] text-primary" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-title-sm font-semibold text-on-surface truncate">{provider.name}</p>
                      <p className="text-xs text-on-surface-variant">{provider.facility}</p>
                      {provider.verified && (
                        <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-primary">
                          <Icon name="verified" className="text-[14px]" />
                          DHA Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expiry & Dependent pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        provider.daysLeft <= 14
                          ? 'bg-error-container text-on-error-container'
                          : 'bg-primary text-on-primary'
                      }`}
                    >
                      <Icon name="schedule" className="text-[14px]" />
                      {provider.daysLeft} days left
                    </span>
                    {provider.dependentTag && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
                        <Icon name="family_restroom" className="text-[14px]" />
                        {provider.dependentTag}
                      </span>
                    )}
                  </div>

                  {/* Authorized datasets */}
                  <div className="flex flex-wrap gap-1.5">
                    {provider.datasets.map((ds) => (
                      <span
                        key={ds}
                        className="px-2 py-0.5 rounded-lg bg-surface-container text-on-surface-variant text-[11px] font-medium border border-outline-variant/20"
                      >
                        {ds}
                      </span>
                    ))}
                  </div>

                  {/* Last Activity */}
                  <p className="text-xs text-on-surface-variant">
                    <span className="font-semibold">Last activity:</span> {provider.lastActivity}
                  </p>

                  {/* Audit Log Drawer */}
                  <button
                    type="button"
                    onClick={() => setOpenAuditLog(auditOpen ? null : provider.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline self-start"
                  >
                    <Icon name="receipt_long" className="text-[16px]" />
                    Audit Log
                    <Icon
                      name={auditOpen ? 'expand_less' : 'expand_more'}
                      className="text-[16px]"
                    />
                  </button>

                  {auditOpen && (
                    <div className="rounded-xl bg-surface-container-low border border-outline-variant/20 p-3 space-y-2 animate-in slide-in-from-top-2 duration-150">
                      {provider.auditLog.map((entry, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <Icon name="history" className="text-[14px] text-secondary mt-0.5 shrink-0" />
                          <div>
                            <p className="text-on-surface font-medium">{entry.action}</p>
                            <p className="text-on-surface-variant text-[10px]">{entry.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Revoke Access Button */}
                  <button
                    type="button"
                    onClick={() => setRevokeModal(provider.id)}
                    className="mt-auto flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-error text-on-primary text-xs font-bold hover:bg-error/90 transition shadow-sm"
                  >
                    <Icon name="block" className="text-[16px]" />
                    Revoke Access
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/20 p-8 text-center">
            <Icon name="search_off" className="text-[40px] text-on-surface-variant mx-auto" />
            <p className="font-title-sm text-on-surface-variant mt-2">No providers match your search</p>
          </div>
        )}

        {/* ===== 7. Revoked Authorizations Section (non-filter view) ===== */}
        {filterStatus !== 'Revoked' && revokedList.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-title-md font-bold text-on-surface flex items-center gap-2">
              <Icon name="block" className="text-[20px] text-error" />
              Revoked Authorisations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {revokedList.map((provider) => (
                <div
                  key={provider.id}
                  className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 opacity-50 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    {provider.photoUrl ? (
                      <img
                        src={provider.photoUrl}
                        alt={provider.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0 grayscale"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                        <Icon name={provider.icon} className="text-[22px] text-on-surface-variant" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-title-sm font-semibold text-on-surface truncate">{provider.name}</p>
                      <p className="text-xs text-on-surface-variant">{provider.facility}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-xs font-semibold">
                      <Icon name="block" className="text-[14px]" />
                      Revoked
                    </span>
                    <span className="text-[10px] text-on-surface-variant">{now}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== 8. Authorise a New Provider CTA ===== */}
        <div className="pt-2">
          <NavLink
            to="/patient-dashboard/sharing/share-records"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-title-sm font-bold hover:bg-primary/90 transition shadow-sm w-full sm:w-auto"
          >
            <Icon name="person_add" className="text-[20px]" />
            Authorise a New Provider
          </NavLink>
        </div>
      </div>

      {/* ===== 6. Revocation Confirmation Modal ===== */}
      {revokeModal && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[3px]"
            onClick={handleCancelRevoke}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-2xl max-w-md w-full p-6 space-y-5 pointer-events-auto animate-in zoom-in-95 fade-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center shrink-0">
                  <Icon name="gpp_bad" className="text-[24px] text-error" />
                </div>
                <div>
                  <h3 className="font-title-md font-bold text-on-surface">Revoke Access</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {PROVIDERS.find((p) => p.id === revokeModal)?.name}
                  </p>
                </div>
              </div>

              {/* Legal disclaimer */}
              <div className="rounded-xl bg-error-container/40 border border-error/20 p-4 text-xs text-on-surface leading-relaxed">
                <p className="font-semibold text-error mb-1">Legal Disclaimer</p>
                <p>
                  Revoking access will immediately terminate this provider's ability to view, download,
                  or process your shared dental records. This action is logged in the DHA Consent Vault
                  and is compliant with Nigeria Federal Decree-Law No. 3 of 2022 on Medical Liability. A
                  copy of this revocation will be sent to both parties.
                </p>
              </div>

              {/* Acknowledgement checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={revokeAcknowledged}
                  onChange={(e) => setRevokeAcknowledged(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-outline-variant accent-error shrink-0"
                />
                <span className="text-xs text-on-surface leading-relaxed">
                  I understand this action is irreversible and the provider will lose all access to my
                  shared records immediately. I confirm this revocation is my informed decision.
                </span>
              </label>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCancelRevoke}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!revokeAcknowledged}
                  onClick={handleConfirmRevoke}
                  className="px-5 py-2 rounded-xl bg-error text-on-primary text-xs font-bold hover:bg-error/90 transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirm Revoke
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </SharingShell>
  );
}

export default ManageSharedAccessScreen;
