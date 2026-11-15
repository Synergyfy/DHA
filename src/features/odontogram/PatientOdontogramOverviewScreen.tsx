import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { OdontogramShell } from './OdontogramShell';
import { Icon } from '../../design/Primitives';

export function PatientOdontogramOverviewScreen() {
  const [sandboxMode, setSandboxMode] = useState(false);

  return (
    <OdontogramShell
      pageTitle="Patient Odontogram Overview"
      badgeCode="9.1"
      badgeLabel="FDI Odontogram Active"
    >
      <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
        {/* Governance & Verification Notice */}
        <section className="p-4 sm:p-5 rounded-3xl bg-surface-container border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <Icon name="verified_user" className="text-[18px]" />
            </div>
            <div>
              <span className="font-bold text-on-surface block">Verified Dentist Workspace</span>
              <span className="text-on-surface-variant font-mono">
                Audit Lock Active: DHA Governance Directive #DHA-GOV-2024-C
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSandboxMode(!sandboxMode)}
              className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-primary text-xs font-semibold shadow-xs hover:bg-surface-container-high transition"
            >
              {sandboxMode ? 'Live Records' : 'Sandbox Mode'}
            </button>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-[11px] font-bold">
              NABIDH Sync: On
            </span>
          </div>
        </section>

        {/* Patient Summary Card */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface-container-high ring-2 ring-primary/20">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4qNY-pExWU4-nphY4134Wpw7IcXVtuHhj4AljZewnT1nyFcSAveqjF0Idq5mKKWksy-hR3PVhzBdDr5IoLpK485fwKnB7WP4ilvHVafYYLWo5lRoebh5Iw0fE0uwqLvAOvOadgp65xVG73KJZ_f9SXK1Mklbs5FhV_691eh11qnbVzwH5jjAZ6OMbp4CN5ri4ZVnALipWTsc9BskWVkTWAIm_z9crOy1HY5w0-5hX"
                  alt="Amina Yusuf"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-secondary ring-2 ring-surface-container-lowest" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                  Amina Yusuf
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                  Permanent Dentition
                </span>
              </div>
              <div className="text-xs text-on-surface-variant font-mono mt-0.5 space-x-2">
                <span>DHA ID: DHA-000245</span>
                <span>•</span>
                <span>Lifecode: DHA-LC-9012-A</span>
                <span>•</span>
                <span>28y Female</span>
              </div>
            </div>
          </div>

          <NavLink
            to="/odontogram/findings"
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center justify-center gap-1.5 self-start sm:self-auto"
          >
            <Icon name="add_circle" className="text-[18px]" />
            <span>Start Fresh Examination</span>
          </NavLink>
        </section>

        {/* Active Working Session Card (In-Progress Draft) */}
        <section className="p-6 sm:p-7 rounded-3xl bg-surface-container-lowest border-2 border-primary/40 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                Active Examination Draft (v1.2)
              </h3>
              <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary text-[11px] font-mono font-bold">
                Auto-saved 10:15 AM
              </span>
            </div>

            <span className="text-xs text-on-surface-variant font-mono">28 Permanent Teeth Charted</span>
          </div>

          {/* Quick Surface Grid Preview */}
          <div className="p-4 bg-surface-container-low rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant">
              <span>FDI Quick Surface Matrix</span>
              <span className="text-primary">Tap tooth node to inspect</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {[
                { num: '18', status: 'absent', label: 'Absent' },
                { num: '17', status: 'sound', label: 'Sound' },
                { num: '16', status: 'caries', label: 'Caries MO' },
                { num: '15', status: 'sound', label: 'Sound' },
                { num: '11', status: 'sound', label: 'Sound' },
                { num: '21', status: 'restored', label: 'Comp MI' },
                { num: '24', status: 'sound', label: 'Sound' },
                { num: '46', status: 'observe', label: 'Watch Distal' },
              ].map((tooth) => (
                <div
                  key={tooth.num}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition ${
                    tooth.status === 'caries'
                      ? 'bg-error-container text-on-error-container border-error font-bold shadow-xs'
                      : tooth.status === 'restored'
                      ? 'bg-secondary-container text-on-secondary-container border-secondary font-semibold'
                      : tooth.status === 'observe'
                      ? 'bg-primary-fixed/40 text-primary border-primary font-semibold'
                      : 'bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant'
                  }`}
                >
                  <span className="font-mono text-xs font-extrabold">{tooth.num}</span>
                  <span className="text-[10px] mt-0.5 truncate">{tooth.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-bold flex items-center gap-1">
                <Icon name="warning" className="text-[14px]" />
                <span>#16 Caries D3</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold flex items-center gap-1">
                <Icon name="check_circle" className="text-[14px]" />
                <span>#21 Composite Resin</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-medium flex items-center gap-1">
                <Icon name="bookmark" className="text-[14px]" />
                <span>#46 Under Observation</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <NavLink
                to="/odontogram/summary"
                className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition"
              >
                Inspect Draft
              </NavLink>
              <NavLink
                to="/odontogram/findings"
                className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5"
              >
                <span>Resume Active Draft</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </NavLink>
            </div>
          </div>
        </section>

        {/* Quick Links Bento Matrix */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NavLink
            to="/odontogram/investigations"
            className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:border-primary transition group space-y-2 block"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Icon name="hub" className="text-[22px]" />
            </div>
            <h3 className="font-title-sm text-base font-bold text-on-surface">
              Diagnostic Linking Hub
            </h3>
            <p className="text-xs text-on-surface-variant">
              Attach bitewings, periapicals, and DICOM 3D scans to individual teeth or quadrants.
            </p>
          </NavLink>

          <NavLink
            to="/odontogram/history"
            className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:border-primary transition group space-y-2 block"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Icon name="history_edu" className="text-[22px]" />
            </div>
            <h3 className="font-title-sm text-base font-bold text-on-surface">
              Longitudinal History
            </h3>
            <p className="text-xs text-on-surface-variant">
              Timeline view of 4 sealed historical odontograms spanning from 2022 to 2025.
            </p>
          </NavLink>

          <NavLink
            to="/odontogram/compare"
            className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:border-primary transition group space-y-2 block"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Icon name="compare" className="text-[22px]" />
            </div>
            <h3 className="font-title-sm text-base font-bold text-on-surface">
              Comparative Analysis
            </h3>
            <p className="text-xs text-on-surface-variant">
              Side-by-side differential between baseline examination and current findings.
            </p>
          </NavLink>
        </section>
      </div>
    </OdontogramShell>
  );
}

export default PatientOdontogramOverviewScreen;

