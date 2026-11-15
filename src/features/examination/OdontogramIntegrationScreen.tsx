import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

interface ToothFinding {
  fdi: string;
  name: string;
  type: 'caries' | 'restoration_composite' | 'restoration_amalgam' | 'healthy';
  surface: string;
  icdas?: string;
  statusText: string;
  symptoms?: string;
  dateCharted: string;
}

export function OdontogramIntegrationScreen() {
  const navigate = useNavigate();
  const [selectedToothFdi, setSelectedToothFdi] = useState<string>('16');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const findings: Record<string, ToothFinding> = {
    '16': {
      fdi: '16',
      name: 'Maxillary Right First Molar',
      type: 'caries',
      surface: 'Occlusal-Mesial (OM)',
      icdas: 'Code 3-4 (Cavitated Enamel/Dentin)',
      statusText: 'Active Dentinal Caries — Primary Finding',
      symptoms: 'Cold sensitivity, dull intermittent ache with sweets',
      dateCharted: '16 Feb 2025 • Dr. Daniel James',
    },
    '21': {
      fdi: '21',
      name: 'Maxillary Left Central Incisor',
      type: 'restoration_composite',
      surface: 'Mesio-Incisal (MI)',
      statusText: 'Sound Composite Restoration',
      symptoms: 'Asymptomatic • Margins intact, no secondary caries',
      dateCharted: '05 Aug 2022 • Dr. Sarah Al-Rashid',
    },
    '46': {
      fdi: '46',
      name: 'Mandibular Right First Molar',
      type: 'restoration_amalgam',
      surface: 'Occlusal (O)',
      statusText: 'Sound Amalgam Restoration',
      symptoms: 'Asymptomatic • Stable anatomical contour',
      dateCharted: '14 Oct 2024 • Dr. Tariq Mansoor',
    },
  };

  const teethQ1 = ['18', '17', '16', '15', '14', '13', '12', '11'];
  const teethQ2 = ['21', '22', '23', '24', '25', '26', '27', '28'];
  const teethQ4 = ['48', '47', '46', '45', '44', '43', '42', '41'];
  const teethQ3 = ['31', '32', '33', '34', '35', '36', '37', '38'];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getToothBadgeColor = (fdi: string) => {
    if (fdi === '16') return 'bg-red-500 text-white animate-pulse ring-2 ring-red-400';
    if (fdi === '21') return 'bg-blue-600 text-white';
    if (fdi === '46') return 'bg-slate-600 text-white';
    return 'bg-surface-container hover:bg-surface-container-high text-on-surface';
  };

  const currentFinding = findings[selectedToothFdi];

  return (
    <ExaminationShell
      pageTitle="Odontogram Integration"
      badgeCode="10.10"
      badgeLabel="Module 6 of 8"
      currentStep="Module 6: Odontogram Sync & Charting Integration"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Top Context Subheader */}
        <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm border border-outline-variant/30 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-primary uppercase tracking-wider">Module 6 of 8 • DHA Section 10</span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Section 9 Live Sync Active</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-sm sm:text-base text-on-surface">Integrated Dental Charting Matrix</span>
            <span className="text-outline">Attending: Dr. Daniel James</span>
          </div>
        </section>

        {/* Live Synchronisation Status Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-surface-container to-secondary/10 rounded-2xl p-4 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shrink-0">
              <Icon name="sync" className="text-lg animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xs sm:text-sm font-bold text-on-surface">Bidirectional Odontogram Synchronization</h2>
                <span className="px-1.5 py-0.2 rounded bg-primary/20 text-primary text-[10px] font-mono font-bold">
                  NABIDH-READY
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Live link established with Section 9 odontogram repository • Last synced 2 minutes ago
              </p>
            </div>
          </div>
          <NavLink
            to="/odontogram/overview"
            className="px-3.5 py-2 rounded-xl bg-primary-container text-on-primary-container hover:opacity-90 transition-opacity text-xs font-bold flex items-center gap-1.5 shrink-0"
          >
            <Icon name="open_in_new" className="text-sm" />
            <span>Open Section 9</span>
          </NavLink>
        </div>

        {/* Summary Statistics Counter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="text-[11px] text-on-surface-variant block">Total Charted</span>
            <span className="text-xl font-bold font-mono text-on-surface">32</span>
            <span className="text-[10px] text-secondary block font-semibold">Complete Dentition</span>
          </div>
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="text-[11px] text-on-surface-variant block">Active Pathology</span>
            <span className="text-xl font-bold font-mono text-red-500">1</span>
            <span className="text-[10px] text-red-500 block font-semibold">Tooth #16 Caries</span>
          </div>
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="text-[11px] text-on-surface-variant block">Existing Restorations</span>
            <span className="text-xl font-bold font-mono text-blue-600">2</span>
            <span className="text-[10px] text-blue-600 block font-semibold">#21 Composite, #46 Amalgam</span>
          </div>
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="text-[11px] text-on-surface-variant block">Integrity Index</span>
            <span className="text-xl font-bold font-mono text-secondary">93.8%</span>
            <span className="text-[10px] text-on-surface-variant block font-semibold">DMFT: 3 (D:1, M:0, F:2)</span>
          </div>
        </div>

        {/* Interactive Arch Anatomy Matrix */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h3 className="text-sm font-bold text-on-surface">FDI Dental Arch Matrix (32 Teeth)</h3>
              <p className="text-[11px] text-on-surface-variant">Tap any tooth to inspect correlated clinical findings</p>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Caries
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Composite
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" /> Amalgam
              </span>
            </div>
          </div>

          <div className="space-y-4 overflow-x-auto pb-2">
            {/* Maxillary Upper Arch */}
            <div>
              <div className="text-[11px] font-bold text-primary uppercase tracking-wider mb-2 text-center">
                Maxillary Arch (Upper Dentition)
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                {/* Quadrant 1 (Right) */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {teethQ1.map((fdi) => (
                    <button
                      key={fdi}
                      type="button"
                      onClick={() => {
                        setSelectedToothFdi(fdi);
                        showToast(`Selected Tooth #${fdi}`);
                      }}
                      className={`w-8 h-9 sm:w-10 sm:h-12 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center transition-all ${getToothBadgeColor(
                        fdi
                      )} ${selectedToothFdi === fdi ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    >
                      <span className="text-[11px] sm:text-xs">{fdi}</span>
                      {fdi === '16' && <span className="text-[8px] uppercase tracking-tighter">Caries</span>}
                    </button>
                  ))}
                </div>

                <div className="w-px h-10 bg-outline-variant/40 mx-1" />

                {/* Quadrant 2 (Left) */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {teethQ2.map((fdi) => (
                    <button
                      key={fdi}
                      type="button"
                      onClick={() => {
                        setSelectedToothFdi(fdi);
                        showToast(`Selected Tooth #${fdi}`);
                      }}
                      className={`w-8 h-9 sm:w-10 sm:h-12 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center transition-all ${getToothBadgeColor(
                        fdi
                      )} ${selectedToothFdi === fdi ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    >
                      <span className="text-[11px] sm:text-xs">{fdi}</span>
                      {fdi === '21' && <span className="text-[8px] uppercase tracking-tighter">Comp</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full border-t border-dashed border-outline-variant/30 my-2" />

            {/* Mandibular Lower Arch */}
            <div>
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                {/* Quadrant 4 (Right) */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {teethQ4.map((fdi) => (
                    <button
                      key={fdi}
                      type="button"
                      onClick={() => {
                        setSelectedToothFdi(fdi);
                        showToast(`Selected Tooth #${fdi}`);
                      }}
                      className={`w-8 h-9 sm:w-10 sm:h-12 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center transition-all ${getToothBadgeColor(
                        fdi
                      )} ${selectedToothFdi === fdi ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    >
                      <span className="text-[11px] sm:text-xs">{fdi}</span>
                      {fdi === '46' && <span className="text-[8px] uppercase tracking-tighter">Amalg</span>}
                    </button>
                  ))}
                </div>

                <div className="w-px h-10 bg-outline-variant/40 mx-1" />

                {/* Quadrant 3 (Left) */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {teethQ3.map((fdi) => (
                    <button
                      key={fdi}
                      type="button"
                      onClick={() => {
                        setSelectedToothFdi(fdi);
                        showToast(`Selected Tooth #${fdi}`);
                      }}
                      className={`w-8 h-9 sm:w-10 sm:h-12 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center transition-all ${getToothBadgeColor(
                        fdi
                      )} ${selectedToothFdi === fdi ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                    >
                      <span className="text-[11px] sm:text-xs">{fdi}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-[11px] font-bold text-primary uppercase tracking-wider mt-2 text-center">
                Mandibular Arch (Lower Dentition)
              </div>
            </div>
          </div>
        </section>

        {/* Selected Tooth Detail Panel */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-base ${getToothBadgeColor(
                  selectedToothFdi
                )}`}
              >
                #{selectedToothFdi}
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">
                  {currentFinding?.name || `Tooth #${selectedToothFdi} (Sound / Natural)`}
                </h3>
                <span className="text-xs text-on-surface-variant font-mono">
                  {currentFinding ? currentFinding.statusText : 'No pathological findings charted'}
                </span>
              </div>
            </div>

            {currentFinding?.type === 'caries' && (
              <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300 text-xs font-bold uppercase tracking-wider animate-pulse">
                ACTION REQUIRED
              </span>
            )}
            {currentFinding?.type && currentFinding.type !== 'caries' && (
              <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                SOUND
              </span>
            )}
          </div>

          {currentFinding ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                <span className="text-on-surface-variant font-semibold">Surface Involvement</span>
                <p className="font-bold text-on-surface">{currentFinding.surface}</p>
                {currentFinding.icdas && (
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-surface-container font-mono text-[11px] text-primary font-bold">
                    {currentFinding.icdas}
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                <span className="text-on-surface-variant font-semibold">Clinical Presentation</span>
                <p className="font-bold text-on-surface">{currentFinding.symptoms}</p>
                <p className="text-[10px] text-outline mt-1">{currentFinding.dateCharted}</p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-surface-container-low text-center text-xs text-on-surface-variant">
              <Icon name="check_circle" className="text-secondary text-2xl mb-1 mx-auto" />
              <p className="font-semibold text-on-surface">Intact Healthy Tooth Structure</p>
              <p className="text-[11px] text-outline">
                No active decay, fractures, or restorations recorded on Tooth #{selectedToothFdi}.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-outline font-mono">
              FDI Standard ISO-3950 Designation
            </span>
            <button
              type="button"
              onClick={() => showToast(`Added finding note for Tooth #${selectedToothFdi}`)}
              className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Icon name="add_circle" className="text-sm text-primary" />
              <span>Add Local Finding</span>
            </button>
          </div>
        </section>

        {/* Footer Navigation Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/examination/occlusion')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Icon name="arrow_back" className="text-sm" />
            <span>Module 5: Occlusion</span>
          </button>

          <button
            type="button"
            onClick={() => {
              showToast('Odontogram Matrix Confirmed');
              navigate('/examination/investigations');
            }}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <span>Module 7: Investigations</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </div>
    </ExaminationShell>
  );
}

export default OdontogramIntegrationScreen;

