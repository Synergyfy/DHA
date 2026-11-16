import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { SharingShell } from './SharingShell';
import { Icon } from '../../design/Primitives';

type FilterTab = 'all' | 'pending' | 'partial' | 'declined';

export function AccessRequestsScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [checkedRecords, setCheckedRecords] = useState<boolean[]>([true, true, true, false]);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, [showToast]);

  const toggleRecord = (index: number) => {
    setCheckedRecords((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleApproveSelected = () => {
    setShowToast(true);
  };

  const handleConfirmDecline = () => {
    setShowDeclineModal(false);
    setDeclineReason('');
    setShowToast(true);
  };

  const filters: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'All Requests', count: 4 },
    { key: 'pending', label: 'Pending', count: 2 },
    { key: 'partial', label: 'Partially Approved', count: 1 },
    { key: 'declined', label: 'Declined', count: 1 },
  ];

  const records = [
    { label: 'Panoramic OPG (2024)', available: true },
    { label: 'Bite-wing X-Ray Series', available: true },
    { label: 'Periodontal Chart', available: true },
    { label: 'Lateral Cephalometric', available: false },
  ];

  const showCard1 = activeFilter === 'all' || activeFilter === 'pending';
  const showCard2 = activeFilter === 'all' || activeFilter === 'pending';
  const showCard3 = activeFilter === 'all' || activeFilter === 'partial';
  const showCard4 = activeFilter === 'all' || activeFilter === 'declined';

  return (
    <SharingShell
      pageTitle="Access Requests"
      badgeCode="7.4"
      badgeLabel="Consent Management"
    >
      <div className="space-y-6 lg:space-y-8">
        {/* 1. Patient Context Banner */}
        <section className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary font-bold text-base">
                SA
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full ring-2 ring-surface-container-lowest" />
            </div>
            <div>
              <h2 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                Ngozi Eze
              </h2>
              <div className="text-xs text-on-surface-variant font-mono mt-0.5">
                DHA ID: 984-2041-889
              </div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold flex items-center gap-1.5">
            <Icon name="pending_actions" className="text-[14px]" />
            <span>2 Pending</span>
          </span>
        </section>

        {/* 2. Zero Blanket Approvals Micro-Banner */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
            <Icon name="shield" className="text-[16px]" />
            <span>Zero-Blanket Policy Active: Each record authorised individually</span>
          </span>
        </div>

        {/* 3. Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                activeFilter === f.key
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        {/* Request Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 4. Card 1: Dr. Reem Nwosu — Pending (High Priority) */}
          {showCard1 && (
            <div className="p-5 rounded-2xl bg-surface-container-lowest border-l-4 border-l-primary border border-outline-variant/30 shadow-sm space-y-4 md:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-high overflow-hidden shrink-0">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNIudSoAbUfFy7bCZiaruoZf_1F1eTKy5JsB5SOY3rVZC2w7FYbzAnIogis0t4YOp5dHtgNx1IxEGdzD0YQP-FPwkE3d7mh46fnY-lMIkzV5zrUqkYxbtkHIcJiCWIkpDAQRedtXBw_vNsRucK8P22kBk2xcoCBCNO4CYNKvBzuerd6fMqa4QlOdHEVJfJvBQwvPVzlzh_irzICpnvp4mJSfMWPXAx9bQvmfcHmuZj"
                      alt="Dr. Reem Nwosu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-title-sm text-base font-bold text-on-surface">
                        Dr. Reem Nwosu
                      </span>
                      <Icon name="verified" className="text-secondary text-[16px]" />
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-[10px] font-bold">
                        DHA Verified
                      </span>
                    </div>
                    <span className="text-xs text-on-surface-variant">
                      Consultant Orthodontist · Medcare
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold self-start sm:self-auto flex items-center gap-1">
                  <Icon name="priority_high" className="text-[14px]" />
                  <span>High Priority · Pending</span>
                </span>
              </div>

              {/* Purpose */}
              <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant">
                Requested Purpose:{' '}
                <strong className="text-primary font-semibold">
                  Specialist Orthodontic Consultation
                </strong>
              </div>

              {/* Granular Record Checkboxes */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-on-surface">Requested Records</p>
                {records.map((rec, idx) => (
                  <label
                    key={rec.label}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={checkedRecords[idx]}
                      onChange={() => toggleRecord(idx)}
                      disabled={!rec.available}
                      className="w-4 h-4 rounded accent-primary shrink-0"
                    />
                    <span className={`text-xs font-medium ${rec.available ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                      {rec.label}
                    </span>
                    {!rec.available && (
                      <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                        Pending capture
                      </span>
                    )}
                    {rec.available && checkedRecords[idx] && (
                      <Icon name="check_circle" className="ml-auto text-primary text-[16px]" />
                    )}
                  </label>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowDeclineModal(true)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={handleApproveSelected}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5"
                >
                  <Icon name="check" className="text-[16px]" />
                  <span>Approve Selected ({checkedRecords.filter(Boolean).length})</span>
                </button>
              </div>
            </div>
          )}

          {/* 5. Card 2: Lagos Smile Dental Centre — Pending */}
          {showCard2 && (
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                    <Icon name="domain" className="text-[20px]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-on-surface">Lagos Smile Dental Centre</div>
                    <div className="text-xs text-on-surface-variant">Institutional Facility</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-bold">
                  Pending
                </span>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant">
                Purpose: <strong className="text-primary font-semibold">Pre-appointment triage</strong>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant text-[11px] font-semibold flex items-center gap-1">
                  <Icon name="description" className="text-[12px]" />
                  <span>Odontogram Matrix</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant text-[11px] font-semibold flex items-center gap-1">
                  <Icon name="description" className="text-[12px]" />
                  <span>Screening Summary</span>
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowDeclineModal(true)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={handleApproveSelected}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5"
                >
                  <Icon name="verified_user" className="text-[16px]" />
                  <span>Review &amp; Approve</span>
                </button>
              </div>
            </div>
          )}

          {/* 6. Card 3: Dr. Tariq Mansoor — Partially Approved */}
          {showCard3 && (
            <div className="p-5 rounded-2xl bg-surface-container-lowest border-l-4 border-l-secondary border border-outline-variant/30 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0">
                    <Icon name="dentistry" className="text-[20px]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-on-surface">Dr. Tariq Mansoor</div>
                    <div className="text-xs text-on-surface-variant">Victoria Island Dental Care</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                  3 of 4 Granted
                </span>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant">
                Partially approved — some record scopes remain pending review.
              </div>

              <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-end">
                <NavLink
                  to="/patient-dashboard/sharing/manage-access"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Manage Scope</span>
                  <Icon name="arrow_forward" className="text-[14px]" />
                </NavLink>
              </div>
            </div>
          )}

          {/* 7. Card 4: City Health Dental Care — Declined */}
          {showCard4 && (
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3 opacity-60">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container text-on-surface-variant flex items-center justify-center shrink-0">
                    <Icon name="domain" className="text-[20px]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-on-surface">City Health Dental Care</div>
                    <div className="text-xs text-on-surface-variant">Institutional Facility</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-bold">
                  Declined
                </span>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant flex items-start gap-2">
                <Icon name="info" className="text-[14px] text-on-surface-variant shrink-0 mt-0.5" />
                <span>
                  Patient declined: Records not relevant to requested purpose
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 8. Decline Reason Bottom Sheet Modal */}
        {showDeclineModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-surface-container-lowest rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-outline-variant/30 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="do_not_disturb_on" className="text-error text-[24px]" />
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                    Decline Access Request
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowDeclineModal(false); setDeclineReason(''); }}
                  className="text-on-surface-variant hover:text-on-surface p-1"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-on-surface-variant">
                Select a reason for declining this request. The requester will be notified.
              </p>

              <div className="space-y-2">
                {[
                  'Records not relevant',
                  'Prefer different provider',
                  'Need more information',
                  'Privacy concern',
                ].map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                      declineReason === reason
                        ? 'bg-error-container/30 border border-error/30'
                        : 'bg-surface-container-low hover:bg-surface-container border border-transparent'
                    }`}
                  >
                    <input
                      type="radio"
                      name="decline-reason"
                      value={reason}
                      checked={declineReason === reason}
                      onChange={() => setDeclineReason(reason)}
                      className="w-4 h-4 accent-error shrink-0"
                    />
                    <span className="text-sm font-medium text-on-surface">{reason}</span>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowDeclineModal(false); setDeclineReason(''); }}
                  className="px-4 py-2 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDecline}
                  disabled={!declineReason}
                  className="px-5 py-2 rounded-xl bg-error text-on-primary text-xs font-bold hover:bg-error/90 transition shadow-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Icon name="block" className="text-[16px]" />
                  <span>Confirm Decline</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 9. Toast Notification */}
        {showToast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-secondary-container text-on-secondary-container text-sm font-bold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <Icon name="check_circle" className="text-[20px]" />
            <span>Action completed successfully</span>
          </div>
        )}
      </div>
    </SharingShell>
  );
}

export default AccessRequestsScreen;
