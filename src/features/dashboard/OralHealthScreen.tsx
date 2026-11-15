import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardShell } from './DashboardShell';
import { Icon } from '../../design/Primitives';

interface ToothData {
  number: number;
  name: string;
  quadrant: string;
  status: 'sound' | 'restored' | 'watch' | 'missing';
  notes: string;
  treatment?: string;
}

const TOOTH_DATABASE: Record<number, ToothData> = {
  16: {
    number: 16,
    name: 'Maxillary Right First Molar',
    quadrant: 'Upper Right (Quadrant 1)',
    status: 'restored',
    notes: 'Intact composite resin restoration (Occlusal-Mesial). Margin sealed, sound. No marginal microleakage or secondary caries detected.',
    treatment: 'Prophylaxis maintenance',
  },
  36: {
    number: 36,
    name: 'Mandibular Left First Molar',
    quadrant: 'Lower Left (Quadrant 3)',
    status: 'watch',
    notes: 'Minor occlusal fissure staining; firm on tactile probe, non-carious. Slated for longitudinal preventive observation.',
    treatment: 'Fissure sealant evaluation at next recall',
  },
};

export function OralHealthScreen() {
  const [selectedTooth, setSelectedTooth] = useState<ToothData>(TOOTH_DATABASE[16]);
  const [specExpanded, setSpecExpanded] = useState(false);
  const [showEmptyDemo, setShowEmptyDemo] = useState(false);

  const selectTooth = (num: number) => {
    if (TOOTH_DATABASE[num]) {
      setSelectedTooth(TOOTH_DATABASE[num]);
    } else {
      setSelectedTooth({
        number: num,
        name: `Tooth #${num}`,
        quadrant: num < 20 ? 'Upper Right (Q1)' : num < 30 ? 'Upper Left (Q2)' : num < 40 ? 'Lower Left (Q3)' : 'Lower Right (Q4)',
        status: 'sound',
        notes: 'Sound tooth structure, intact coronal anatomy. Normal physiological probing depth with intact proximal contacts.',
      });
    }
  };

  const upperTeeth = [17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27];
  const lowerTeeth = [47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37];

  return (
    <DashboardShell pageTitle="Oral Health Overview" showBack>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* Title & Clinical Certification Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col">
            <h1 className="font-headline-lg-mobile sm:font-headline-md text-headline-lg-mobile sm:text-headline-md text-on-surface font-bold tracking-tight">
              Oral Health Overview
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Validated clinical diagnostics &amp; biometric findings attested by certified DHA dentists
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-2xs">
              <Icon name="verified" filled className="text-[16px]" />
              <span>DHA Certified Record</span>
            </span>
          </div>
        </div>

        {/* Clinical Attestation Banner */}
        <section className="rounded-2xl bg-secondary-container/25 border border-secondary-container/60 p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <Icon name="verified" className="text-[18px]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                  DHA Verified Diagnostic Record
                </span>
                <span className="text-on-surface-variant">•</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                  Examination Date: Dec 12, 2024
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface font-medium leading-snug">
                Attested by <strong className="text-primary font-bold">Dr. Farouk Al-Mansoori</strong>{' '}
                <span className="text-on-surface-variant font-mono text-label-sm">(Lic #DHA-D-48912)</span>
              </p>
              <div className="mt-2.5 p-3 rounded-xl bg-surface-container-lowest/90 border border-outline-variant/30 flex items-start gap-2">
                <Icon name="info" className="text-[16px] text-secondary mt-0.5 shrink-0" />
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Diagnoses and ratings are strictly populated from licensed practitioner examinations. DHA never automatically generates or calculates artificial diagnostic scores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Primary Rail (8 cols on lg) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Clinical Diagnostic Stability Status */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Clinical Status Rating
                  </span>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="px-3.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-headline-sm text-headline-sm font-bold flex items-center gap-2 shadow-2xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                      Good
                    </span>
                    <span className="font-title-sm text-title-sm text-secondary font-semibold">
                      Clinical Stability
                    </span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary shadow-xs">
                  <Icon name="sentiment_very_satisfied" filled className="text-[30px]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block">
                    Last Verified Examination
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface font-bold block mt-0.5">
                    Dec 12, 2024
                  </span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">
                    Periodic Clinical Recall
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block">
                    Examining Facility
                  </span>
                  <span className="font-title-sm text-title-sm text-on-surface font-bold block mt-0.5 truncate">
                    Al Zahra Dental Hub
                  </span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant">
                    Oud Metha, Dubai
                  </span>
                </div>
              </div>

              {/* Standardized DHA Diagnostic Label System Collapsible */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setSpecExpanded(!specExpanded)}
                  className="w-full py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between text-left"
                >
                  <span className="font-title-sm text-title-sm text-on-surface-variant font-medium flex items-center gap-2">
                    <Icon name="rule" className="text-[18px] text-primary" />
                    <span>Standardized DHA Diagnostic Label Taxonomy</span>
                  </span>
                  <Icon
                    name="expand_more"
                    className={`text-[20px] text-on-surface-variant transition-transform duration-200 ${
                      specExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {specExpanded && (
                  <div className="mt-2.5 p-4 rounded-xl bg-surface-container-low space-y-2.5 border border-outline-variant/20 animate-in fade-in duration-150">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold block mb-1">
                      Approved Clinical Label Taxonomy:
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-surface-container-lowest gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                          Good
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface">
                          Physiologically stable, no active pathology
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">
                        Active Baseline
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-surface-container-lowest gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
                          Needs Attention
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface">
                          Incipient conditions / monitoring advised
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Standard</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-surface-container-lowest gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                          Requires Dental Review
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface">
                          Active intervention mandated by practitioner
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Standard</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-surface-container-lowest gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm font-bold">
                          Assessment Not Yet Available
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface">
                          No verified examination history
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Unscreened</span>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Tooth-Related Findings & Interactive Odontogram Matrix */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-xs">
                    <Icon name="dentistry" className="text-[22px]" />
                  </div>
                  <div>
                    <h2 className="font-title-md text-title-md text-on-surface font-bold">
                      Tooth-Related Findings
                    </h2>
                    <p className="font-label-sm text-label-sm text-secondary font-semibold">
                      28 permanent teeth present (Full dentition)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-high font-label-sm text-label-sm text-on-surface font-semibold">
                    FDI World System
                  </span>
                </div>
              </div>

              {/* Interactive Odontogram Dental Arch */}
              <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-outline-variant/20 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                    Interactive Dental Arch (Tap any tooth to inspect)
                  </span>
                  <div className="flex items-center gap-3 font-label-sm text-label-sm">
                    <span className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="w-2.5 h-2.5 rounded-full bg-surface-container-lowest border border-outline-variant/50"></span>
                      Sound
                    </span>
                    <span className="flex items-center gap-1.5 text-secondary font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> Restored
                    </span>
                    <span className="flex items-center gap-1.5 text-tertiary font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> Watch
                    </span>
                  </div>
                </div>

                {/* Arch Teeth Buttons Grid */}
                <div className="space-y-3 py-2 overflow-x-auto no-scrollbar">
                  {/* Upper Maxillary Arch */}
                  <div className="flex items-center justify-center gap-1.5 min-w-[500px]">
                    <span className="font-label-code text-[11px] text-on-surface-variant font-mono w-10">
                      Upper
                    </span>
                    {upperTeeth.map((tooth, idx) => {
                      const isSelected = selectedTooth.number === tooth;
                      const isRestored = tooth === 16;
                      return (
                        <button
                          key={tooth}
                          type="button"
                          onClick={() => selectTooth(tooth)}
                          className={`w-7 sm:w-8 h-9 rounded-lg flex flex-col items-center justify-center font-label-sm text-[11px] font-bold transition-all ${
                            isSelected
                              ? 'ring-2 ring-primary scale-110 shadow-sm z-10'
                              : 'hover:scale-105'
                          } ${
                            isRestored
                              ? 'bg-secondary-container text-on-secondary-container ring-1 ring-secondary'
                              : 'bg-surface-container-lowest text-on-surface shadow-2xs'
                          }`}
                        >
                          {tooth}
                          {idx === 6 && <span className="sr-only">midline</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Lower Mandibular Arch */}
                  <div className="flex items-center justify-center gap-1.5 min-w-[500px]">
                    <span className="font-label-code text-[11px] text-on-surface-variant font-mono w-10">
                      Lower
                    </span>
                    {lowerTeeth.map((tooth) => {
                      const isSelected = selectedTooth.number === tooth;
                      const isWatch = tooth === 36;
                      return (
                        <button
                          key={tooth}
                          type="button"
                          onClick={() => selectTooth(tooth)}
                          className={`w-7 sm:w-8 h-9 rounded-lg flex flex-col items-center justify-center font-label-sm text-[11px] font-bold transition-all ${
                            isSelected
                              ? 'ring-2 ring-primary scale-110 shadow-sm z-10'
                              : 'hover:scale-105'
                          } ${
                            isWatch
                              ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant ring-1 ring-tertiary'
                              : 'bg-surface-container-lowest text-on-surface shadow-2xs'
                          }`}
                        >
                          {tooth}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center pt-1 border-t border-outline-variant/20">
                  <span className="font-label-sm text-[11px] text-on-surface-variant">
                    Third molars (#18, #28, #38, #48) congenitally absent • Midline symmetrical
                  </span>
                </div>
              </div>

              {/* Selected Tooth Inspector Panel */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row items-start gap-4 animate-in fade-in duration-150">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-headline-sm text-headline-sm font-bold shrink-0 shadow-xs ${
                    selectedTooth.status === 'restored'
                      ? 'bg-secondary-container text-on-secondary-container'
                      : selectedTooth.status === 'watch'
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                      : 'bg-surface-container-highest text-primary'
                  }`}
                >
                  {selectedTooth.number}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface">
                        {selectedTooth.name}
                      </h3>
                      <p className="font-label-sm text-[11px] text-on-surface-variant">
                        {selectedTooth.quadrant}
                      </p>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold uppercase ${
                        selectedTooth.status === 'restored'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : selectedTooth.status === 'watch'
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                          : 'bg-surface-container-lowest text-secondary'
                      }`}
                    >
                      {selectedTooth.status === 'restored'
                        ? 'Sound Restoration'
                        : selectedTooth.status === 'watch'
                        ? 'Watch & Monitor'
                        : 'Sound & Intact'}
                    </span>
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                    {selectedTooth.notes}
                  </p>

                  {selectedTooth.treatment && (
                    <div className="mt-2 text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                      <Icon name="check_circle" className="text-[14px]" />
                      <span>Recommendation: {selectedTooth.treatment}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Periodontal Health & Gums */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shadow-xs">
                    <Icon name="water_drop" className="text-[22px]" />
                  </div>
                  <div>
                    <h2 className="font-title-md text-title-md text-on-surface font-bold">
                      Periodontal Health &amp; Gums
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Gingival status and periodontal probing assessment
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-2xs">
                  Healthy Baseline
                </span>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-surface-container-low text-center border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block">
                    Gingival Index
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1 block">
                    Grade 1
                  </span>
                  <span className="font-label-sm text-[11px] text-tertiary font-medium">
                    Mild Marginal
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-low text-center border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block">
                    Pocket Depths
                  </span>
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold mt-1 block">
                    1–2 mm
                  </span>
                  <span className="font-label-sm text-[11px] text-secondary font-medium">
                    Physiological Normal
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-low text-center border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block">
                    Bleeding on Probing (BOP)
                  </span>
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold mt-1 block">
                    6%
                  </span>
                  <span className="font-label-sm text-[11px] text-secondary font-medium">
                    Low Risk (&lt;10%)
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low flex items-start gap-2.5 border border-outline-variant/20">
                <Icon name="stethoscope" className="text-[20px] text-primary shrink-0 mt-0.5" />
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Localized mild marginal erythema noted on lower anterior incisors (#31-#42). Interdental papillae preserved without blunting or detachment. No pathological pocketing (&gt;3mm) identified.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar Rail (5 cols on lg) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Quick Action Navigation Bar */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Clinical Actions
              </h2>

              <button
                type="button"
                onClick={() => alert('Opening interactive high-res 3D panoramic viewer')}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
              >
                <Icon name="radiology" className="text-[20px]" />
                <span>View Full Odontogram &amp; X-Rays</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => alert('Downloading official DHA treatment plan schedule')}
                  className="h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="event_note" className="text-[18px]" />
                  <span>Treatment Plan</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Generating certified DHA diagnostic summary PDF...')}
                  className="h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="download" className="text-[18px]" />
                  <span>Summary PDF</span>
                </button>
              </div>
            </section>

            {/* Other Recorded Oral Conditions */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-xs">
                  <Icon name="clinical_notes" className="text-[20px]" />
                </div>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Other Oral Conditions
                </h2>
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-surface-container-low flex items-start justify-between gap-3 border border-outline-variant/20">
                  <div>
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold block">
                      Enamel Wear &amp; Attrition
                    </span>
                    <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 leading-snug">
                      Minimal physiological incisal edge attrition; no active nocturnal bruxism facets or abfraction grooves.
                    </p>
                  </div>
                  <Icon name="check_circle" filled className="text-[20px] text-secondary shrink-0" />
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-low flex items-start justify-between gap-3 border border-outline-variant/20">
                  <div>
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold block">
                      Mucosa &amp; Soft Tissues
                    </span>
                    <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 leading-snug">
                      Normal pink vascularity, uniform moisture, no mucosal lesions, leukoplakia, or aphthous ulcerations detected.
                    </p>
                  </div>
                  <Icon name="check_circle" filled className="text-[20px] text-secondary shrink-0" />
                </div>
              </div>
            </section>

            {/* Pending Directives & Next Steps */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary shadow-xs">
                  <Icon name="assignment_turned_in" className="text-[20px]" />
                </div>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Next Steps &amp; Directives
                </h2>
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-tertiary-fixed/20 border border-tertiary/20 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Icon name="calendar_month" className="text-[16px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Ultrasonic Prophylaxis
                      </span>
                      <span className="font-label-sm text-label-sm text-tertiary font-bold">
                        Apr 2025
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                      Routine preventive hygiene scheduled for 4-month interval to maintain periodontal stability.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Icon name="medication" className="text-[16px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Prescription Dentifrice
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">
                        Active
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                      High-fluoride dentifrice regimen prescribed (1450 ppm NaF) twice daily for targeted enamel remineralization.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Approved Clinical Empty State Preview */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
                    Unscreened Empty State
                  </h3>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">
                    Design Showcase for New Patient Chart
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmptyDemo(!showEmptyDemo)}
                  className="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-dim text-on-surface font-label-sm text-label-sm font-semibold transition-colors"
                >
                  {showEmptyDemo ? 'Hide Demo' : 'Toggle Demo'}
                </button>
              </div>

              {showEmptyDemo && (
                <div className="p-6 rounded-xl bg-surface-container-low flex flex-col items-center text-center border border-outline-variant/20 animate-in fade-in duration-200">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-primary mb-3 shadow-sm">
                    <Icon name="clinical_notes" className="text-[32px]" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm font-bold uppercase tracking-wider mb-2">
                    Assessment Not Yet Available
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    No examination records yet
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[280px] mt-1.5 mb-4 leading-relaxed">
                    Your oral-health summary will appear here after your first screening or dental examination.
                  </p>
                  <NavLink
                    to="/patient-dashboard/first-time"
                    className="h-11 px-5 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98]"
                  >
                    <Icon name="calendar_add_on" className="text-[18px]" />
                    <span>View First-Time Guide</span>
                  </NavLink>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

