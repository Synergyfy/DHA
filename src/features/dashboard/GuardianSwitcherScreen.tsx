import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardShell } from './DashboardShell';
import { usePatientStore, PROFILES } from '../../store/patientStore';
import { Icon } from '../../design/Primitives';

export function GuardianSwitcherScreen() {
  const navigate = useNavigate();
  const { activeProfileId, setActiveProfile } = usePatientStore();
  const [selectedPreviewId, setSelectedPreviewId] = useState<string>(
    activeProfileId === 'amara' ? 'tariq' : activeProfileId
  );
  const [switchToast, setSwitchToast] = useState<string | null>(null);

  const handleSelectProfile = (id: string, redirect = true) => {
    setActiveProfile(id);
    setSelectedPreviewId(id);
    const profile = PROFILES[id];
    setSwitchToast(`Active chart switched to ${profile?.name}. Clinical isolation applied.`);
    if (redirect) {
      setTimeout(() => {
        navigate('/patient-dashboard');
      }, 1200);
    } else {
      setTimeout(() => setSwitchToast(null), 3500);
    }
  };

  const previewProfile = PROFILES[selectedPreviewId] || PROFILES.tariq;

  // Pediatric Deciduous tooth arrays (Universal A-T notation)
  const maxArch = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const manArch = ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];

  return (
    <DashboardShell pageTitle="Guardian & Family Switcher" showBack>
      {switchToast && (
        <div className="fixed top-20 right-4 z-50 bg-secondary text-on-secondary px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <Icon name="check_circle" className="text-[20px]" />
          <span className="font-title-sm text-title-sm font-semibold">{switchToast}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* Security Isolation Notice Header */}
        <section className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Icon name="verified_user" className="text-[22px]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-title-sm text-title-sm text-on-surface font-bold">
                  Strict Clinical Isolation &amp; Privacy Safeguards
                </span>
                <span className="font-label-sm text-label-sm uppercase px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-bold">
                  DHA Certified Protocol
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                Records, radiograph X-rays, prescriptions, and allergen profiles are strictly segregated between guardian and pediatric dependent charts in compliance with UAE Federal Health Privacy Regulations.
              </p>
            </div>
          </div>
        </section>

        {/* Section Heading */}
        <div className="space-y-1">
          <h1 className="font-headline-lg-mobile sm:font-headline-md text-headline-lg-mobile sm:text-headline-md text-on-surface font-bold tracking-tight">
            Who are you viewing today?
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Select an individual profile to view diagnostic odontograms, Lifecodes, and appointments.
          </p>
        </div>

        {/* Profiles Selector Responsive Grid (3 columns on desktop) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Profile 1: Sarah Al-Mansoor (Guardian / Account Owner) */}
          <div
            className={`p-5 rounded-2xl bg-surface-container-lowest shadow-sm border transition-all flex flex-col justify-between hover:shadow-md ${
              activeProfileId === 'sarah'
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-outline-variant/30'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="relative w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-title-md text-title-md font-bold shrink-0 shadow-xs">
                  SM
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-xs">
                    <Icon name="check" className="text-[13px]" />
                  </span>
                </div>

                {activeProfileId === 'sarah' ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-bold">
                    Active
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-[11px] text-on-surface-variant font-medium">
                    Owner
                  </span>
                )}
              </div>

              <h2 className="font-title-md text-title-md text-on-surface font-bold">
                Sarah Al-Mansoor
              </h2>
              <span className="font-label-sm text-label-sm text-secondary font-semibold block mt-0.5">
                Guardian / Account Owner
              </span>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                Adult Primary Account • Permanent Dentition (32 Teeth)
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="font-label-code text-label-code px-2 py-0.5 rounded bg-surface-container-low text-primary font-medium tracking-wide font-mono">
                  DHA-8102-ADL
                </span>
                <span className="font-label-sm text-[11px] text-secondary flex items-center gap-0.5 font-medium">
                  <Icon name="shield" className="text-[14px]" /> Verified
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedPreviewId('sarah')}
                className="font-title-sm text-[13px] text-on-surface-variant hover:text-on-surface font-medium"
              >
                Preview Chart
              </button>
              <button
                type="button"
                onClick={() => handleSelectProfile('sarah')}
                className="h-10 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Select Profile</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </button>
            </div>
          </div>

          {/* Profile 2: Tariq Okafor (Child Age 6) */}
          <div
            className={`p-5 rounded-2xl bg-surface-container-lowest shadow-sm border transition-all flex flex-col justify-between hover:shadow-md ${
              activeProfileId === 'tariq'
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-outline-variant/30'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="relative w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-title-md text-title-md font-bold shrink-0 shadow-xs">
                  TO
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs">
                    <Icon name="child_care" className="text-[13px]" />
                  </span>
                </div>

                {activeProfileId === 'tariq' ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-bold">
                    Active
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-[11px] font-bold">
                    Child (Age 6)
                  </span>
                )}
              </div>

              <h2 className="font-title-md text-title-md text-on-surface font-bold">
                Tariq Okafor
              </h2>
              <span className="font-label-sm text-label-sm text-primary font-semibold block mt-0.5">
                Guardian-Managed Dependent
              </span>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                Primary Dentition (20 Deciduous Teeth A–T)
              </p>

              <div className="mt-3 p-2 rounded-xl bg-surface-container-low flex items-center gap-2">
                <Icon name="event" className="text-secondary text-[18px] shrink-0" />
                <span className="font-body-sm text-[11px] text-on-surface truncate">
                  Jan 28, 2025 • Fluoride Varnish
                </span>
                <span className="ml-auto font-label-sm text-[10px] px-1.5 py-0.2 rounded bg-secondary-container text-on-secondary-container font-bold">
                  Confirmed
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedPreviewId('tariq')}
                className="font-title-sm text-[13px] text-on-surface-variant hover:text-on-surface font-medium"
              >
                Preview Chart
              </button>
              <button
                type="button"
                onClick={() => handleSelectProfile('tariq')}
                className="h-10 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Select Tariq</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </button>
            </div>
          </div>

          {/* Profile 3: Zayd Okafor (Child Age 9) */}
          <div
            className={`p-5 rounded-2xl bg-surface-container-lowest shadow-sm border transition-all flex flex-col justify-between hover:shadow-md ${
              activeProfileId === 'zayd'
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-outline-variant/30'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="relative w-12 h-12 rounded-2xl bg-surface-container-highest text-primary flex items-center justify-center font-title-md text-title-md font-bold shrink-0 shadow-xs">
                  ZO
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary shadow-xs">
                    <Icon name="child_care" className="text-[13px]" />
                  </span>
                </div>

                {activeProfileId === 'zayd' ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-bold">
                    Active
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-[11px] text-on-surface-variant font-bold">
                    Child (Age 9)
                  </span>
                )}
              </div>

              <h2 className="font-title-md text-title-md text-on-surface font-bold">
                Zayd Okafor
              </h2>
              <span className="font-label-sm text-label-sm text-primary font-semibold block mt-0.5">
                Guardian-Managed Dependent
              </span>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                Mixed Dentition Stage (24 Teeth Present)
              </p>

              <div className="mt-3 p-2 rounded-xl bg-surface-container-low flex items-center gap-2">
                <Icon name="notifications_active" className="text-primary text-[18px] shrink-0" />
                <span className="font-body-sm text-[11px] text-on-surface truncate">
                  Ortho Assessment Recall due in 2 mo
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedPreviewId('zayd')}
                className="font-title-sm text-[13px] text-on-surface-variant hover:text-on-surface font-medium"
              >
                Preview Chart
              </button>
              <button
                type="button"
                onClick={() => handleSelectProfile('zayd')}
                className="h-10 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Select Zayd</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </button>
            </div>
          </div>
        </section>

        {/* Action Row: Add Child Dependent Profile */}
        <button
          type="button"
          onClick={() => alert('Opening Emirates ID & Birth Certificate link verification modal...')}
          className="w-full p-5 rounded-2xl bg-surface-container-low/70 hover:bg-surface-container-low border border-dashed border-outline-variant/60 transition-all flex items-center justify-center gap-3 shadow-xs"
        >
          <div className="w-10 h-10 rounded-full bg-surface-container-highest text-primary flex items-center justify-center shadow-xs">
            <Icon name="add" className="text-[22px]" />
          </div>
          <div className="text-left">
            <span className="font-title-sm text-title-sm text-primary font-bold block leading-tight">
              + Add Another Child Dependent Profile
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant block leading-tight">
              Link dependent via Emirates ID verification or UAE Birth Certificate
            </span>
          </div>
        </button>

        {/* Interactive Active Profile Preview Mode */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon name="visibility" className="text-primary text-[22px]" />
              <h2 className="font-title-md text-title-md text-on-surface font-bold">
                Preview: Diagnostic Context for {previewProfile.name}
              </h2>
            </div>
            <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-2.5 py-0.5 rounded-full font-semibold self-start sm:self-center">
              Simulated Clinical Context
            </span>
          </div>

          {/* Quick Metrics Snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant block">
                Dentition Classification
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  {previewProfile.teethCount}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {previewProfile.dentition}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-secondary font-medium">
                <Icon name="check_circle" filled className="text-[16px]" />
                <span className="font-label-sm text-label-sm">Cavity-free verified status</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant block">
                Upcoming Pediatric Visit
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-sm text-headline-sm text-secondary font-bold">
                  {previewProfile.upcomingVisit || 'Schedule Due'}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-on-surface-variant">
                <Icon name="location_on" className="text-[16px] text-tertiary" />
                <span className="font-label-sm text-label-sm truncate">
                  Al Barsha Primary Pediatric Center
                </span>
              </div>
            </div>
          </div>

          {/* Primary Odontogram Mini Grid Graphic (Deciduous Universal A-T) */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-label-sm text-label-sm text-on-surface font-bold">
                Pediatric Arch Map (Universal System A–T)
              </span>
              <span className="font-label-code text-label-code text-primary font-semibold font-mono">
                100% DHA Verified Baseline
              </span>
            </div>

            <div className="space-y-2 py-1 overflow-x-auto no-scrollbar">
              {/* Maxillary Arch (A to J) */}
              <div className="flex items-center justify-between gap-1 min-w-[360px]">
                <span className="font-label-code text-[11px] text-on-surface-variant w-8 font-mono">
                  Max
                </span>
                <div className="flex-1 flex justify-between gap-1">
                  {maxArch.map((tooth) => (
                    <span
                      key={tooth}
                      className="w-7 sm:w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-code text-[11px] font-bold shadow-2xs"
                    >
                      {tooth}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mandibular Arch (K to T) */}
              <div className="flex items-center justify-between gap-1 min-w-[360px]">
                <span className="font-label-code text-[11px] text-on-surface-variant w-8 font-mono">
                  Man
                </span>
                <div className="flex-1 flex justify-between gap-1">
                  {manArch.map((tooth) => (
                    <span
                      key={tooth}
                      className="w-7 sm:w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-code text-[11px] font-bold shadow-2xs"
                    >
                      {tooth}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button in Preview */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => handleSelectProfile(previewProfile.id)}
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
            >
              <Icon name="check" className="text-[20px]" />
              <span>Make {previewProfile.shortName} the Active Patient Chart</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveProfile(previewProfile.id);
                navigate('/patient-dashboard/oral-health');
              }}
              className="h-12 px-6 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-title-sm text-title-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="folder_open" className="text-[18px]" />
              <span>Open Records</span>
            </button>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

