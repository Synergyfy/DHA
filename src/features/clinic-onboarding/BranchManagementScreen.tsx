import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

export function BranchManagementScreen() {
  const navigate = useNavigate();
  const [branchFilter, setBranchFilter] = useState<'all' | 'hq' | 'satellite'>('all');

  const handleContinue = () => {
    navigate('/clinic-onboarding/professional-invitation');
  };

  return (
    <ClinicOnboardingShell
      currentStep={14}
      totalSteps={18}
      stepTitle="Branch Management"
      stepCategory="Facility Directory"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Hero Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                <Icon name="domain_verification" className="text-sm" />
                <span>Facility Branch Directory</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-on-surface">
                Greenfield Dental Group
              </h2>
              <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span>2 Total Practice Locations (1 Primary Headquarters &bull; 1 Satellite Branch)</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/branch-details')}
              className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5 shadow-sm shadow-primary/20 shrink-0"
            >
              <Icon name="add_circle" className="text-base" />
              <span>Register New Branch</span>
            </button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 mt-5 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center">
            <div>
              <span className="font-heading font-extrabold text-lg sm:text-xl text-primary">6</span>
              <span className="block text-[11px] font-semibold text-on-surface-variant">Total Operatories</span>
            </div>
            <div className="border-x border-outline-variant/30">
              <span className="font-heading font-extrabold text-lg sm:text-xl text-secondary">8</span>
              <span className="block text-[11px] font-semibold text-on-surface-variant">Staff Rostered</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-sm font-bold">
                <span className="text-secondary">1 Active</span>
                <span className="text-on-surface-variant">&bull;</span>
                <span className="text-amber-600">1 Audit</span>
              </div>
              <span className="block text-[11px] font-semibold text-on-surface-variant">Branch Status</span>
            </div>
          </div>
        </div>

        {/* Operating Locations List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-heading font-bold text-sm sm:text-base text-on-surface flex items-center gap-2">
              <Icon name="local_hospital" className="text-primary text-lg" />
              Operating Facilities (2)
            </h3>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setBranchFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  branchFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                All (2)
              </button>
              <button
                type="button"
                onClick={() => setBranchFilter('hq')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  branchFilter === 'hq'
                    ? 'bg-primary text-white'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                HQ #001
              </button>
              <button
                type="button"
                onClick={() => setBranchFilter('satellite')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  branchFilter === 'satellite'
                    ? 'bg-primary text-white'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Satellite #002
              </button>
            </div>
          </div>

          {/* Branch 1: Wuse 2 Main (HQ) */}
          {(branchFilter === 'all' || branchFilter === 'hq') && (
          <article className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-fixed text-primary flex items-center gap-1">
                  <Icon name="star" className="text-xs" /> Primary Practice Headquarters
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container flex items-center gap-1">
                  <Icon name="verified" className="text-xs" /> Verified &amp; Approved
                </span>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-surface-container text-primary">
                HQ-ABJ-01
              </span>
            </div>

            <div>
              <h4 className="font-heading font-bold text-base text-on-surface">Wuse 2 Main (HQ #001)</h4>
              <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                <Icon name="location_on" className="text-sm text-outline" />
                14 Aminu Kano Crescent, Wuse 2, Abuja
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-surface-container-low text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Clinical Director</span>
                <span className="font-semibold text-on-surface">Dr. Amina Bello</span>
                <span className="font-mono text-[11px] text-outline block">#DEN-78421</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Configuration</span>
                <span className="font-semibold text-on-surface">4 Active Surgical Suites</span>
                <span className="text-[11px] text-on-surface-variant block">6 Clinicians &amp; Officers Assigned</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-on-surface-variant block mb-1.5">Accredited Specialties:</span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-medium">Comprehensive Restorative</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-medium">3D CBCT Imaging</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-medium">Orthodontics</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-medium">Implant Surgery</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => navigate('/clinic-onboarding/branch-details')}
                className="px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1"
              >
                <Icon name="tune" className="text-sm" />
                <span>Manage Facility</span>
              </button>
            </div>
          </article>
          )}

          {/* Branch 2: Garki Branch (Satellite) */}
          {(branchFilter === 'all' || branchFilter === 'satellite') && (
          <article className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-surface-container text-on-surface-variant flex items-center gap-1">
                  <Icon name="share_location" className="text-xs" /> Secondary Satellite Branch
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                  <Icon name="schedule" className="text-xs" /> Pending DHA Facility Audit
                </span>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-surface-container text-tertiary">
                SAT-ABJ-02
              </span>
            </div>

            <div>
              <h4 className="font-heading font-bold text-base text-on-surface">Garki Branch (#002)</h4>
              <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                <Icon name="location_on" className="text-sm text-outline" />
                Plot 108 Mohammadu Buhari Way, Garki 2, Abuja
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-surface-container-low text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Designated Branch Lead</span>
                <span className="font-semibold text-on-surface">Dr. Tunde Fashola</span>
                <span className="font-mono text-[11px] text-outline block">#DEN-65412</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Configuration</span>
                <span className="font-semibold text-on-surface">2 Planned Operatory Suites</span>
                <span className="text-[11px] text-on-surface-variant block">2 Clinicians Assigned</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-high/60 flex items-start gap-2.5 text-xs">
              <Icon name="event_upcoming" className="text-primary text-lg shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-on-surface block">Audit In Progress</span>
                <p className="text-on-surface-variant">
                  Premises inspection scheduled with FCT Health Secretariat for <strong>24 Oct 2026</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => navigate('/clinic-onboarding/branch-details')}
                className="px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <Icon name="edit" className="text-sm" />
                <span>Edit Details</span>
              </button>
            </div>
          </article>
          )}
        </div>

        {/* Corporate Legal Hierarchy Card */}
        <section className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
            <div className="flex items-center gap-2">
              <Icon name="account_tree" className="text-primary text-xl" />
              <h3 className="font-heading font-bold text-sm sm:text-base text-on-surface">Legal Corporate Hierarchy</h3>
            </div>
            <span className="font-mono text-xs font-bold text-secondary bg-secondary-container/50 px-2.5 py-0.5 rounded-full">
              CAC Verified
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low space-y-3">
            {/* Root node */}
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon name="corporate_fare" className="text-lg" />
                </div>
                <div>
                  <span className="text-xs font-bold text-on-surface">Greenfield Dental Clinic Ltd</span>
                  <p className="font-mono text-[11px] text-on-surface-variant">CAC Registration: CAC-1489201</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-primary-fixed text-primary">
                PARENT ENTITY
              </span>
            </div>

            {/* Child branches */}
            <div className="pl-6 space-y-2 border-l-2 border-primary/20 ml-4">
              <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between text-xs">
                <span className="font-semibold text-on-surface flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary" /> Wuse 2 HQ Branch
                </span>
                <span className="text-[11px] font-semibold text-secondary">Main Node</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between text-xs">
                <span className="font-semibold text-on-surface flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Garki Satellite Branch
                </span>
                <span className="text-[11px] font-semibold text-amber-700">Auditing</span>
              </div>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/additional-branches')}
            className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
          >
            <span>Continue to Staff Invitations (15.15)</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>
        </div>
      </div>
    </ClinicOnboardingShell>
  );
}
