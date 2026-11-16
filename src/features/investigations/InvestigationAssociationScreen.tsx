import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvestigationShell } from './InvestigationShell';
import { Icon } from '../../design/Primitives';

type GranularityType = 'tooth' | 'quad' | 'arch' | 'patient';

export function InvestigationAssociationScreen() {
  const navigate = useNavigate();
  const [encounterBinding, setEncounterBinding] = useState<'active' | 'standalone'>('active');
  const [granularity, setGranularity] = useState<GranularityType>('tooth');
  const [selectedTeeth, setSelectedTeeth] = useState<string[]>(['16', '15', '46']);
  const [primaryTooth, setPrimaryTooth] = useState<string>('16');
  const [regions, setRegions] = useState({
    q1Posterior: true,
    interproximal1516: true,
    tmjCondyle: false,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const maxillaryTeeth = [
    { num: '18', label: 'M3' },
    { num: '17', label: 'M2' },
    { num: '16', label: 'UR6*', isPrimary: true },
    { num: '15', label: 'UR5', isSecondary: true },
    { num: '14', label: 'P1' },
    { num: '13', label: 'C' },
    { num: '12', label: 'I2' },
  ];

  const mandibularTeeth = [
    { num: '47', label: 'M2' },
    { num: '46', label: 'LR6', isAntag: true },
    { num: '45', label: 'P2' },
    { num: '44', label: 'P1' },
    { num: '43', label: 'C' },
    { num: '42', label: 'I2' },
  ];

  const handleToggleTooth = (num: string) => {
    if (selectedTeeth.includes(num)) {
      setSelectedTeeth(selectedTeeth.filter((t) => t !== num));
      if (primaryTooth === num) {
        setPrimaryTooth('');
      }
    } else {
      setSelectedTeeth([...selectedTeeth, num]);
    }
  };

  return (
    <InvestigationShell
      pageTitle="Tooth & Clinical Record Association"
      badgeCode="11.11"
      badgeLabel="Upload Flow (3/4)"
      currentStep="Record Association"
      orderRef="REQ-2025-0914"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <Icon name="check_circle" className="text-emerald-400 text-lg" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Progress Tracker */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 sm:p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-secondary uppercase tracking-wider">Workflow Progression</span>
            <span className="text-outline font-mono">Step 3 of 4 (75%)</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full transition-all duration-300 w-3/4" />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Icon name="dataset_linked" className="text-primary text-xl" />
            <h2 className="text-base sm:text-lg font-bold text-on-surface">
              Tooth & Clinical Record Association
            </h2>
          </div>
        </div>

        {/* Patient Context Banner */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 shadow-xs flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Icon name="badge" className="text-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-on-surface">Chinedu Okafor</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-semibold">
                  Active Patient
                </span>
              </div>
              <p className="text-on-surface-variant text-[11px] font-mono mt-0.5">
                34y Male • MRN: DHA-10482 • Nigeria Health Information Exchange Synced
              </p>
            </div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0 shadow-xs" title="Connected" />
        </div>

        {/* Section A: Clinical Encounter Binding */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="event_available" className="text-secondary text-lg" />
              <h3 className="font-bold text-sm text-on-surface">Clinical Encounter Binding</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase">
              Mandatory
            </span>
          </div>

          <div className="space-y-2">
            {/* Active Care Episode */}
            <label
              onClick={() => setEncounterBinding('active')}
              className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                encounterBinding === 'active'
                  ? 'border-primary bg-primary/5 shadow-xs ring-1 ring-primary/40'
                  : 'border-outline-variant/30 bg-surface hover:bg-surface-container-low'
              }`}
            >
              <input
                type="radio"
                name="encounter_binding"
                checked={encounterBinding === 'active'}
                onChange={() => setEncounterBinding('active')}
                className="mt-1 text-primary focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <div className="flex-1 min-w-0 text-xs">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-primary text-sm">Active Care Episode</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-[10px]">
                    In Clinic Today
                  </span>
                </div>
                <p className="font-semibold text-on-surface mt-1">
                  #EXAM-DHA-2025-0982 • Comprehensive Dental Exam
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant text-[11px]">
                  <Icon name="stethoscope" className="text-xs text-secondary" />
                  <span>Attending: Dr. Daniel James (#DEN-48912)</span>
                </div>
              </div>
            </label>

            {/* Standalone Encounter Option */}
            <label
              onClick={() => setEncounterBinding('standalone')}
              className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                encounterBinding === 'standalone'
                  ? 'border-primary bg-primary/5 shadow-xs ring-1 ring-primary/40'
                  : 'border-outline-variant/30 bg-surface hover:bg-surface-container-low'
              }`}
            >
              <input
                type="radio"
                name="encounter_binding"
                checked={encounterBinding === 'standalone'}
                onChange={() => setEncounterBinding('standalone')}
                className="mt-1 text-primary focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <div className="flex-1 min-w-0 text-xs">
                <span className="font-bold text-on-surface">
                  Associate with standalone / unlinked record
                </span>
                <p className="text-on-surface-variant text-[11px] mt-0.5">
                  External diagnostic request or historical retrospective scan import.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Section B: Target Granularity */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-on-surface">Target Granularity</h3>
            <span className="text-xs font-semibold text-secondary">FDI Two-Digit System</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'tooth' as GranularityType, label: 'Tooth-Specific', icon: 'adjust' },
              { id: 'quad' as GranularityType, label: 'Multi-Tooth / Quad', icon: 'grid_view' },
              { id: 'arch' as GranularityType, label: 'Full Arch / OPG', icon: 'crop_free' },
              { id: 'patient' as GranularityType, label: 'Patient-Level', icon: 'account_box' },
            ].map((btn) => {
              const isSelected = granularity === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setGranularity(btn.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  <Icon name={btn.icon} className="text-base" />
                  <span>{btn.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section C: Interactive Odontogram Teeth Mapper */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="dentistry" className="text-primary text-xl" />
              <h3 className="font-bold text-sm text-on-surface">FDI Odontogram Mapping</h3>
            </div>
            <span className="text-xs font-mono text-outline">Tap tooth to tag</span>
          </div>

          {/* Upper Maxillary Arch */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-bold uppercase tracking-wider text-outline text-[11px]">
                Maxillary (UR • Q1)
              </span>
              <span className="font-mono font-bold text-primary text-[11px]">Upper Right Posterior</span>
            </div>

            <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-1">
              {maxillaryTeeth.map((t) => {
                const isSelected = selectedTeeth.includes(t.num);
                const isPrimary = t.num === '16';
                const isSecondary = t.num === '15';

                return (
                  <button
                    key={t.num}
                    type="button"
                    onClick={() => handleToggleTooth(t.num)}
                    className={`flex flex-col items-center justify-center w-11 sm:w-13 h-14 rounded-xl transition-all shrink-0 ${
                      isPrimary
                        ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400 scale-105'
                        : isSecondary
                        ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-xs'
                        : isSelected
                        ? 'bg-primary text-on-primary font-bold shadow-xs'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/30'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{t.num}</span>
                    <span className="text-[10px] uppercase font-bold tracking-tight">{t.label}</span>
                    {isPrimary && <span className="w-1.5 h-1.5 rounded-full bg-white mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Midline Separator */}
          <div className="flex items-center gap-3 py-1">
            <div className="h-0.5 bg-outline-variant/30 flex-1" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-outline">
              Occlusal Plane Contact
            </span>
            <div className="h-0.5 bg-outline-variant/30 flex-1" />
          </div>

          {/* Lower Mandibular Arch */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-bold uppercase tracking-wider text-outline text-[11px]">
                Mandibular (LR • Q4 Antagonists)
              </span>
              <span className="font-mono font-bold text-secondary text-[11px]">Lower Right</span>
            </div>

            <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-1">
              {mandibularTeeth.map((t) => {
                const isSelected = selectedTeeth.includes(t.num);
                const isAntag = t.num === '46';

                return (
                  <button
                    key={t.num}
                    type="button"
                    onClick={() => handleToggleTooth(t.num)}
                    className={`flex flex-col items-center justify-center w-11 sm:w-13 h-14 rounded-xl transition-all shrink-0 ${
                      isAntag
                        ? 'bg-secondary-container text-on-secondary-container font-bold shadow-md ring-2 ring-secondary/40'
                        : isSelected
                        ? 'bg-primary text-on-primary font-bold shadow-xs'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/30'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{t.num}</span>
                    <span className="text-[10px] uppercase font-semibold">{t.label}</span>
                    {isAntag && (
                      <span className="text-[9px] text-secondary font-bold uppercase">Antag</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Selection Summary */}
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-2.5 text-xs">
            <Icon name="hub" className="text-primary text-base mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-outline block">
                Active Selection Summary
              </span>
              <p className="text-on-surface font-semibold mt-0.5 leading-snug">
                Tooth <strong className="text-rose-600 font-bold">#16 (Primary Target)</strong> +{' '}
                <strong className="text-secondary font-bold">#15 (Adjacent)</strong> +{' '}
                <strong className="text-secondary font-bold">#46 (Occlusal Antagonist)</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Section D: General Anatomical Region Descriptors */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-on-surface">Anatomical Region Descriptors</h3>
            <span className="text-xs text-outline">Optional tags</span>
          </div>

          <div className="space-y-2 text-xs">
            <label className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={regions.q1Posterior}
                  onChange={(e) => setRegions({ ...regions, q1Posterior: e.target.checked })}
                  className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="font-bold text-on-surface block">Quadrant 1 Posterior (Upper Right)</span>
                  <span className="text-on-surface-variant text-[11px]">Covers coronal and radicular alveolar bone</span>
                </div>
              </div>
              <Icon name="verified" className="text-secondary text-base" />
            </label>

            <label className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={regions.interproximal1516}
                  onChange={(e) => setRegions({ ...regions, interproximal1516: e.target.checked })}
                  className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="font-bold text-on-surface block">Interproximal Space #15–#16</span>
                  <span className="text-on-surface-variant text-[11px]">Diagnostic focus: suspected secondary crestal caries</span>
                </div>
              </div>
              <Icon name="verified" className="text-secondary text-base" />
            </label>

            <label className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={regions.tmjCondyle}
                  onChange={(e) => setRegions({ ...regions, tmjCondyle: e.target.checked })}
                  className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="font-bold text-on-surface block">TMJ / Condylar Region</span>
                  <span className="text-on-surface-variant text-[11px]">Articular eminence & bilateral joint spaces</span>
                </div>
              </div>
              <span className="text-outline font-mono text-[11px]">N/A</span>
            </label>
          </div>
        </div>

        {/* Section E: Smart Duplicate Association Safeguard */}
        <div className="bg-secondary-container/40 text-on-secondary-container rounded-2xl p-5 border border-secondary/30 shadow-xs space-y-3">
          <div className="flex items-start gap-3">
            <Icon name="shield_with_heart" className="text-secondary text-2xl shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sm block">Duplicate Check Passed</span>
              <p className="text-xs mt-1 leading-relaxed text-on-surface-variant">
                No prior bitewing uploaded for <strong>Quadrant 1</strong> within the last 6 months. Prior OPG baseline from <strong>14 Oct 2024</strong> is referenced as historical control (Nigeria Health Information Exchange Ref:{' '}
                <span className="font-mono font-bold text-secondary">#NB-LAG-98310</span>).
              </p>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-end">
            <button
              type="button"
              onClick={() => showToast('Opening historical investigation viewer (3 records)...')}
              className="inline-flex items-center gap-1 text-xs text-secondary font-bold hover:underline"
            >
              <span>View 3 existing patient investigations</span>
              <Icon name="launch" className="text-sm" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => {
              showToast('Tooth associations locked');
              navigate('/investigations/upload/review');
            }}
            className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-primary/95 transition-all"
          >
            <span>Proceed to Review & Confirm (11.12)</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/investigations/upload/details')}
            className="w-full py-2.5 text-on-surface-variant hover:text-on-surface text-xs font-semibold flex items-center justify-center transition-colors"
          >
            Back to Metadata Configuration
          </button>
        </div>
      </div>
    </InvestigationShell>
  );
}

