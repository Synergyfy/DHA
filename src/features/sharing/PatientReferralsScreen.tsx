import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SharingShell } from './SharingShell';
import { Icon } from '../../design/Primitives';

interface Referral {
  id: string;
  refCode: string;
  doctorName: string;
  specialty: string;
  facility: string;
  patientName: string;
  patientBadge?: string;
  date: string;
  status: 'active' | 'completed' | 'cancelled';
  statusLabel: string;
  referringDoctor: string;
  avatarUrl?: string;
}

export function PatientReferralsScreen() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');

  const referrals: Referral[] = [
    {
      id: 'ref-1',
      refCode: '#REF-DHA-2025-0894',
      doctorName: 'Dr. Reem Al-Nuaimi',
      specialty: 'Orthodontics & Dento-facial Orthopedics',
      facility: 'Medcare Medical Centre',
      patientName: 'Sarah Al-Mansoor',
      date: 'Referred: Nov 8, 2025',
      status: 'active',
      statusLabel: 'Accepted by Specialist',
      referringDoctor: 'Dr. Tariq Mansoor',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCNIudSoAbUfFy7bCZiaruoZf_1F1eTKy5JsB5SOY3rVZC2w7FYbzAnIogis0t4YOp5dHtgNx1IxEGdzD0YQP-FPwkE3d7mh46fnY-lMIkzV5zrUqkYxbtkHIcJiCWIkpDAQRedtXBw_vNsRucK8P22kBk2xcoCBCNO4CYNKvBzuerd6fMqa4QlOdHEVJfJvBQwvPVzlzh_irzICpnvp4mJSfMWPXAx9bQvmfcHmuZj',
    },
    {
      id: 'ref-2',
      refCode: '#REF-DHA-2025-0756',
      doctorName: 'Dr. Fatima Hassan',
      specialty: 'Pediatric Dentistry',
      facility: 'Al Zahra Pediatric Clinic',
      patientName: 'Zayd Al-Mansoor',
      patientBadge: 'Dependent (9y)',
      date: 'Sep 15 – Oct 20, 2025',
      status: 'completed',
      statusLabel: 'Completed',
      referringDoctor: 'Dr. Tariq Mansoor',
    },
    {
      id: 'ref-3',
      refCode: '#REF-DHA-2025-0612',
      doctorName: 'Dubai Dental Hospital',
      specialty: 'Oral Surgery — Wisdom Teeth Triage',
      facility: 'Dubai Healthcare City Branch',
      patientName: 'Sarah Al-Mansoor',
      date: 'Jul 3 – Aug 12, 2025',
      status: 'completed',
      statusLabel: 'Completed',
      referringDoctor: 'Dr. Tariq Mansoor',
    },
  ];

  const filteredReferrals = referrals.filter((ref) => {
    if (activeFilter === 'all') return true;
    return ref.status === activeFilter;
  });

  return (
    <SharingShell
      pageTitle="Patient Referrals"
      badgeCode="7.6"
      badgeLabel="Referral Tracking"
    >
      <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
        {/* Referrals Summary Header */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
              <Icon name="send_and_archive" className="text-[24px]" />
            </div>
            <div>
              <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                Clinical Referrals
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Direct cross-clinic care transfers across verified DHA healthcare facilities.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="px-3.5 py-1.5 rounded-xl bg-primary-fixed/30 border border-primary/20 text-center">
              <div className="text-sm font-extrabold text-primary">1</div>
              <div className="text-[10px] uppercase font-bold text-on-surface-variant">Active</div>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-secondary-container/40 border border-secondary/20 text-center">
              <div className="text-sm font-extrabold text-secondary">2</div>
              <div className="text-[10px] uppercase font-bold text-on-surface-variant">Completed</div>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-surface-container text-center">
              <div className="text-sm font-extrabold text-on-surface-variant">0</div>
              <div className="text-[10px] uppercase font-bold text-on-surface-variant">Cancelled</div>
            </div>
          </div>
        </section>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                activeFilter === 'all'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All Referrals ({referrals.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('active')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                activeFilter === 'active'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Active (1)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('completed')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                activeFilter === 'completed'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Completed (2)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('cancelled')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                activeFilter === 'cancelled'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Cancelled (0)
            </button>
          </div>

          <NavLink
            to="/patient-dashboard/discovery"
            className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>Browse Specialists</span>
            <Icon name="arrow_forward" className="text-[14px]" />
          </NavLink>
        </div>

        {/* Referrals Cards Grid */}
        {filteredReferrals.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredReferrals.map((ref) => (
              <div
                key={ref.id}
                className={`p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between space-y-4 ${
                  ref.status === 'active' ? 'ring-1 ring-primary/30' : ''
                }`}
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[11px] font-bold text-primary bg-primary-fixed/20 px-2.5 py-1 rounded-lg">
                      {ref.refCode}
                    </span>

                    {ref.status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span>{ref.statusLabel}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                        <Icon name="check" className="text-[14px] text-secondary" />
                        <span>{ref.statusLabel}</span>
                      </span>
                    )}
                  </div>

                  {/* Specialist & Specialty */}
                  <div className="flex items-center gap-3">
                    {ref.avatarUrl ? (
                      <div className="w-12 h-12 rounded-2xl bg-surface-container-high overflow-hidden shrink-0">
                        <img src={ref.avatarUrl} alt={ref.doctorName} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                        <Icon name="domain" className="text-[24px]" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="font-title-sm text-base font-bold text-on-surface truncate">
                        {ref.doctorName}
                      </h3>
                      <p className="text-xs font-semibold text-primary truncate">{ref.specialty}</p>
                      <p className="text-xs text-on-surface-variant truncate">{ref.facility}</p>
                    </div>
                  </div>

                  {/* Doctor Transfer Visual */}
                  <div className="p-3 bg-surface-container-low rounded-2xl text-xs flex items-center justify-between gap-2">
                    <div className="truncate">
                      <span className="text-[10px] text-on-surface-variant block uppercase font-bold">
                        Referred By
                      </span>
                      <span className="font-semibold text-on-surface truncate">{ref.referringDoctor}</span>
                    </div>

                    <Icon name="arrow_forward" className="text-primary text-[16px] shrink-0" />

                    <div className="truncate text-right">
                      <span className="text-[10px] text-on-surface-variant block uppercase font-bold">
                        For Patient
                      </span>
                      <span className="font-semibold text-on-surface truncate">
                        {ref.patientName} {ref.patientBadge && `(${ref.patientBadge})`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer & Actions */}
                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant text-[11px]">{ref.date}</span>

                  {ref.status === 'active' ? (
                    <NavLink
                      to="/patient-dashboard/sharing/referral-details"
                      className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5"
                    >
                      <span>Track Progress</span>
                      <Icon name="arrow_forward" className="text-[14px]" />
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/patient-dashboard/sharing/referral-details"
                      className="px-3.5 py-1.5 rounded-xl bg-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition"
                    >
                      View Report
                    </NavLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-surface-container-high text-primary flex items-center justify-center mx-auto">
              <Icon name="folder_off" className="text-[28px]" />
            </div>
            <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
              No Referrals in this Category
            </h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
              All active specialist handovers and previous case transfers will appear here.
            </p>
          </div>
        )}

        {/* Informative Guidance Banner */}
        <section className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3">
          <Icon name="info" className="text-primary text-[20px] shrink-0 mt-0.5" />
          <div className="text-xs text-on-surface-variant space-y-1">
            <strong className="text-on-surface font-semibold block">How DHA Dental Referrals Work:</strong>
            <p>
              When your primary dentist refers you to a specialist (e.g., Orthodontist, Periodontist, or Surgeon), 
              the clinical notes and diagnostic scans are linked directly through your unified health identity. 
              You retain full control over which records are shared.
            </p>
          </div>
        </section>
      </div>
    </SharingShell>
  );
}

export default PatientReferralsScreen;

