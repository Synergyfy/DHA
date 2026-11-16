import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SharingShell } from './SharingShell';
import { Icon } from '../../design/Primitives';

export function RecordSharingOverviewScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'timeline'>('active');
  const [emptyDemo, setEmptyDemo] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <SharingShell
      pageTitle="Record Sharing Overview"
      badgeCode="7.1"
      badgeLabel="DHA Privacy Shield Active"
    >
      <div className="space-y-8 lg:space-y-10">
        {/* Top Assurance Pill Banner */}
        <section className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <Icon name="verified_user" className="text-[20px]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-on-surface">
                <span>DHA Privacy Shield Active</span>
                <Icon name="lock" className="text-secondary text-[14px]" />
              </div>
              <p className="text-xs text-on-surface-variant">
                Granular record control. Verified DHA clinicians only. No automated blanket sharing.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPrivacyModalOpen(true)}
            className="p-2 rounded-xl text-primary hover:bg-surface-container transition"
            title="Privacy Shield Details"
          >
            <Icon name="info" className="text-[22px]" />
          </button>
        </section>

        {/* Active Patient Scope Card */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary font-bold text-base">
                SA
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full ring-2 ring-surface-container-lowest" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                  Ngozi Eze
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                  Primary Profile
                </span>
              </div>
              <div className="text-xs text-on-surface-variant font-mono mt-0.5">
                DHA ID: 984-2041-889 · Guardian for Zayd & Layla
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setEmptyDemo(!emptyDemo)}
              className="px-3 py-1.5 rounded-xl bg-surface-container text-xs font-semibold text-primary hover:bg-surface-container-high transition"
            >
              {emptyDemo ? 'Restore Active Data' : 'Toggle Empty State'}
            </button>
            <NavLink
              to="/patient-dashboard/sharing/share-records"
              className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5"
            >
              <Icon name="ios_share" className="text-[16px]" />
              <span>Share New Record</span>
            </NavLink>
          </div>
        </section>

        {/* 4 Metric Bento Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <span className="font-headline-sm text-lg font-extrabold">{emptyDemo ? '0' : '3'}</span>
            </div>
            <div>
              <div className="text-xs text-on-surface-variant font-medium">Active Access</div>
              <div className="text-xs font-bold text-on-surface">Clinics & Doctors</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0">
              <span className="font-headline-sm text-lg font-extrabold">{emptyDemo ? '0' : '2'}</span>
            </div>
            <div>
              <div className="text-xs text-on-surface-variant font-medium">Pending Requests</div>
              <div className="text-xs font-bold text-error">Awaiting Consent</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="font-headline-sm text-lg font-extrabold">{emptyDemo ? '0' : '1'}</span>
            </div>
            <div>
              <div className="text-xs text-on-surface-variant font-medium">Specialist Track</div>
              <div className="text-xs font-bold text-secondary">Active Referral</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container text-on-surface flex items-center justify-center shrink-0">
              <Icon name="history_toggle_off" className="text-[20px]" />
            </div>
            <div>
              <div className="text-xs text-on-surface-variant font-medium">Audit Trail</div>
              <NavLink to="/patient-dashboard/sharing/history" className="text-xs font-bold text-primary hover:underline">
                View Full Log →
              </NavLink>
            </div>
          </div>
        </section>

        {/* Priority Pending Request Banner */}
        {!emptyDemo && (
          <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border-l-4 border-l-primary border border-outline-variant/30 shadow-sm space-y-4">
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
                    <span className="font-title-sm text-base font-bold text-on-surface">Dr. Reem Nwosu</span>
                    <Icon name="verified" className="text-secondary text-[16px]" />
                  </div>
                  <span className="text-xs text-on-surface-variant">Consultant Orthodontist · Medcare Clinic</span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold self-start sm:self-auto">
                Action Required (Pending)
              </span>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-on-surface-variant">
                Requested Purpose: <strong className="text-primary font-semibold">Specialist Orthodontic Consultation</strong>
              </span>
              <span className="text-on-surface font-semibold">
                3 Records: Panoramic OPG, Bite-wing X-Ray, Periodontal Chart
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <NavLink
                to="/patient-dashboard/sharing/access-requests"
                className="px-4 py-2 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high transition"
              >
                Decline
              </NavLink>
              <NavLink
                to="/patient-dashboard/sharing/review-authorise"
                className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5"
              >
                <Icon name="verified" className="text-[16px]" />
                <span>Review & Authorise Access</span>
              </NavLink>
            </div>
          </section>
        )}

        {/* Empty State Showcase */}
        {emptyDemo && (
          <section className="p-12 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-surface-container-high text-primary flex items-center justify-center mx-auto">
              <Icon name="shield_person" className="text-[32px]" />
            </div>
            <h3 className="font-headline-sm text-lg font-bold text-on-surface">No Records Shared Yet</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
              You are in complete control. No clinics or clinicians currently hold active sharing keys to your dental records.
            </p>
            <NavLink
              to="/patient-dashboard/sharing/share-records"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-sm"
            >
              <Icon name="add" className="text-[16px]" />
              <span>Share with a DHA Clinic</span>
            </NavLink>
          </section>
        )}

        {/* Active Shared Access vs Audit Timeline Tabs */}
        {!emptyDemo && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('active')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeTab === 'active'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Active Permissions (3)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('timeline')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeTab === 'timeline'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Audit Timeline
                </button>
              </div>

              <NavLink
                to="/patient-dashboard/sharing/manage-access"
                className="text-xs font-bold text-primary hover:underline hidden sm:inline"
              >
                Manage All Access →
              </NavLink>
            </div>

            {/* Tab 1: Active Permissions */}
            {activeTab === 'active' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0">
                        <Icon name="dentistry" className="text-[20px]" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-on-surface">Dr. Tariq Mansoor</div>
                        <div className="text-xs text-on-surface-variant">Victoria Island Dental Care</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-[11px] font-bold">
                      Expires in 14d
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-secondary-container/40 text-on-secondary-container text-[11px] font-semibold flex items-center gap-1">
                      <Icon name="check" className="text-[12px]" />
                      <span>Screenings & Exams</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-secondary-container/40 text-on-secondary-container text-[11px] font-semibold flex items-center gap-1">
                      <Icon name="check" className="text-[12px]" />
                      <span>Bite-wing Diagnostics</span>
                    </span>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                    <span>Last read: Today, 10:14 AM</span>
                    <NavLink
                      to="/patient-dashboard/sharing/manage-access"
                      className="text-primary font-bold hover:underline"
                    >
                      Modify Access →
                    </NavLink>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                        <Icon name="domain" className="text-[20px]" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-on-surface">Lagos Smile Dental Centre</div>
                        <div className="text-xs text-on-surface-variant">Institutional Facility</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-secondary text-[11px] font-bold">
                      Verified Active
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[11px] font-semibold">
                      Odontogram Matrix
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[11px] font-semibold">
                      Cone Beam CT (3D)
                    </span>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                    <span>Valid until: Dec 31, 2025</span>
                    <NavLink
                      to="/patient-dashboard/sharing/manage-access"
                      className="text-primary font-bold hover:underline"
                    >
                      Modify Access →
                    </NavLink>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Audit Timeline */}
            {activeTab === 'timeline' && (
              <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-secondary-container/50 text-secondary flex items-center justify-center shrink-0">
                    <Icon name="visibility" className="text-[16px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-on-surface">Dr. Tariq Mansoor</span>
                      <span className="text-on-surface-variant">Today, 10:14 AM</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Accessed Bite-wing X-Ray Series (2024) via authorized continuing care protocol.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                    <Icon name="outgoing_mail" className="text-[16px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-on-surface">Specialist Referral Sent</span>
                      <span className="text-on-surface-variant">Yesterday</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Case packet forwarded to Dr. Reem Nwosu. Status: Awaiting Specialist Intake.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                    <Icon name="key_off" className="text-[16px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-on-surface">Permission Revoked</span>
                      <span className="text-on-surface-variant">3 days ago</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Access permissions terminated for Nigerian Specialty Dental. Cryptographic token destroyed.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Privacy Shield Explainer Modal */}
        {privacyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-outline-variant/30 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="verified_user" className="text-primary text-[24px]" />
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface">DHA Privacy Shield</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(false)}
                  className="text-on-surface-variant hover:text-on-surface"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-on-surface-variant leading-relaxed">
                <p>
                  <strong className="text-on-surface">Strict DHA Accreditation:</strong> Only licensed healthcare professionals registered within Lagos can request or receive records.
                </p>
                <p>
                  <strong className="text-on-surface">No Blanket Sharing:</strong> Authorizations are item-specific. A dentist asking for X-Rays cannot see your payment ledger or unrelated medical documents.
                </p>
                <p>
                  <strong className="text-on-surface">Cryptographic Audit Trail:</strong> Every document inspection produces an immutable audit timestamp logged on the national ledger.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold"
                >
                  Understood & Protected
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SharingShell>
  );
}

export default RecordSharingOverviewScreen;

