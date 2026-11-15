import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

interface ToothItem {
  id: string;
  fdi: string;
  palmer: string;
  universal: string;
  name: string;
  status: 'active_caries' | 'watch' | 'restored' | 'sound';
  statusLabel: string;
  icdas: string;
  badgeTag: string;
  surface: string;
  perio: string;
  breakdown: string;
  linkedInvestigation?: {
    type: string;
    note: string;
  };
}

const mockTeeth: ToothItem[] = [
  {
    id: 'tooth-16',
    fdi: '16',
    palmer: 'UR6',
    universal: '#3',
    name: 'Maxillary Right 1st Molar',
    status: 'active_caries',
    statusLabel: 'Active Caries (ICDAS 3/4)',
    icdas: 'ICDAS 3/4',
    badgeTag: 'NEW FINDING',
    surface: 'Mesio-Occlusal (MO)',
    perio: '4.0mm Pocket (MB)',
    breakdown:
      'Active cavitated dentinal lesion with shadowed undermining enamel margin. No direct pulpal exposure noted clinically. Localized mild erythema at margin; Class 0 mobility.',
    linkedInvestigation: {
      type: 'Bitewing BW-R (13 Oct 2026)',
      note: '2.1mm pulp clearance verified • Enamel-dentin junction compromised',
    },
  },
  {
    id: 'tooth-15',
    fdi: '15',
    palmer: 'UR5',
    universal: '#4',
    name: 'Maxillary Right 2nd Premolar',
    status: 'watch',
    statusLabel: 'Watch (ICDAS 1)',
    icdas: 'ICDAS 1',
    badgeTag: 'UNCHANGED',
    surface: 'Disto-Occlusal (DO)',
    perio: '2.0mm Sulcular Depth',
    breakdown:
      'Faint white-spot demineralization visible upon continuous air drying. Marginal ridge intact and structurally sound. Gingiva is pink and stippled.',
    linkedInvestigation: {
      type: 'Dexis Bitewing (13 Oct 2026)',
      note: 'Confined strictly within outer enamel boundary',
    },
  },
  {
    id: 'tooth-46',
    fdi: '46',
    palmer: 'LR6',
    universal: '#30',
    name: 'Mandibular Right 1st Molar',
    status: 'restored',
    statusLabel: 'Restored & Stable',
    icdas: 'Intact Restoration',
    badgeTag: 'HISTORICAL (2023)',
    surface: 'Occluso-Lingual (OL)',
    perio: '2.5mm (Healthy)',
    breakdown:
      'Sound direct composite resin restoration placed in 2023. Marginal integrity intact, smooth finish, no secondary recurrent caries, no overhang detected.',
  },
];

export function OdontogramSummaryScreen() {
  const navigate = useNavigate();
  const [notation, setNotation] = useState<'fdi' | 'palmer' | 'universal'>('fdi');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'watch' | 'restored' | 'sound'>('all');
  const [highlightedTooth, setHighlightedTooth] = useState<string | null>('16');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const getToothLabel = (tooth: ToothItem) => {
    if (notation === 'palmer') return tooth.palmer;
    if (notation === 'universal') return tooth.universal;
    return `Tooth #${tooth.fdi}`;
  };

  const filteredTeeth = mockTeeth.filter((t) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return t.status === 'active_caries';
    if (selectedFilter === 'watch') return t.status === 'watch';
    if (selectedFilter === 'restored') return t.status === 'restored';
    if (selectedFilter === 'sound') return t.status === 'sound';
    return true;
  });

  return (
    <SummaryShell
      pageTitle="12.6 Odontogram Summary"
      badgeCode="12.6"
      badgeLabel="Odontogram AI"
      currentStep="Tooth-by-Tooth Summary"
    >
      <div className="space-y-6">
        {/* Context Banner */}
        <section className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold uppercase tracking-wider">
                <Icon name="auto_fix_high" className="text-[14px]" />
                <span>AI SYNTHESIZED v1.0 • UNAPPROVED</span>
              </span>
            </div>
            <span className="text-xs text-[#707881] font-mono">Encounter: 12 Oct 2026</span>
          </div>

          <div className="bg-[#faf8ff] p-4 rounded-xl border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#131b2e]">Amara Okafor</h2>
              <p className="text-xs text-[#707881]">34y Female • DHA-2026-00451</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#e2e7ff] text-[#006194] font-mono text-xs font-bold">
                32 Indexed (Perm.)
              </span>
              <p className="text-xs text-[#707881] mt-0.5">Dr. Daniel James (#DEN-48912)</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-[#eaedff]">
            <button
              type="button"
              onClick={() => showToast('Comparing against 15 Apr 2026 baseline chart...')}
              className="text-[#006194] font-semibold flex items-center gap-1 hover:underline"
            >
              <Icon name="history" className="text-[15px]" />
              <span>Compare Baseline (15 Apr 2026)</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/odontogram/full')}
              className="text-[#006a61] font-semibold flex items-center gap-1 hover:underline"
            >
              <Icon name="clinical_notes" className="text-[15px]" />
              <span>Full Section 9 Chart</span>
            </button>
          </div>
        </section>

        {/* Notation Selector */}
        <section className="bg-white p-2 rounded-2xl border border-[#eaedff] shadow-xs flex items-center gap-1">
          <button
            type="button"
            onClick={() => setNotation('fdi')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs text-center transition-all ${
              notation === 'fdi'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'text-[#3f4850] hover:bg-[#f2f3ff]'
            }`}
          >
            FDI / ISO (Two-Digit)
          </button>
          <button
            type="button"
            onClick={() => setNotation('palmer')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs text-center transition-all ${
              notation === 'palmer'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'text-[#3f4850] hover:bg-[#f2f3ff]'
            }`}
          >
            Palmer Notation
          </button>
          <button
            type="button"
            onClick={() => setNotation('universal')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs text-center transition-all ${
              notation === 'universal'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'text-[#3f4850] hover:bg-[#f2f3ff]'
            }`}
          >
            Universal (#1–#32)
          </button>
        </section>

        {/* Visual Odontogram Mini-Map */}
        <section className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="grid_view" className="text-[#006194] text-[20px]" />
              <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                Arch Matrix Diagnostic Map
              </h3>
            </div>
            <span className="text-xs text-[#707881]">Click tooth node to filter</span>
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ba1a1a]"></span>
              <span className="text-[#131b2e] font-medium">Caries (Active)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#006195]"></span>
              <span className="text-[#131b2e] font-medium">Watch / Demin.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#006a61]"></span>
              <span className="text-[#131b2e] font-medium">Restored</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#eaedff]"></span>
              <span className="text-[#707881]">Sound</span>
            </div>
          </div>

          {/* Dental Matrix Representation */}
          <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff] overflow-x-auto no-scrollbar space-y-3">
            {/* Maxillary (Upper) Arch */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881] block mb-1">
                Maxillary Arch (Upper)
              </span>
              <div className="flex gap-1 min-w-[500px]">
                {['18', '17', '16', '15', '14', '13', '12', '11', '21', '22', '23', '24', '25', '26', '27', '28'].map(
                  (t) => {
                    const is16 = t === '16';
                    const is15 = t === '15';
                    const isSelected = highlightedTooth === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setHighlightedTooth(t)}
                        className={`flex-1 py-1.5 rounded-lg text-center font-mono text-xs font-bold transition-all ${
                          is16
                            ? 'bg-[#ba1a1a] text-white shadow-xs animate-pulse ring-2 ring-[#ba1a1a]/40'
                            : is15
                            ? 'bg-[#006195] text-white shadow-xs'
                            : 'bg-white text-[#707881] border border-[#eaedff] hover:border-[#006194]'
                        } ${isSelected ? 'scale-105' : ''}`}
                        title={`Tooth #${t}`}
                      >
                        {t}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            <div className="h-px bg-[#eaedff] w-full"></div>

            {/* Mandibular (Lower) Arch */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#707881] block mb-1">
                Mandibular Arch (Lower)
              </span>
              <div className="flex gap-1 min-w-[500px]">
                {['48', '47', '46', '45', '44', '43', '42', '41', '31', '32', '33', '34', '35', '36', '37', '38'].map(
                  (t) => {
                    const is46 = t === '46';
                    const isSelected = highlightedTooth === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setHighlightedTooth(t)}
                        className={`flex-1 py-1.5 rounded-lg text-center font-mono text-xs font-bold transition-all ${
                          is46
                            ? 'bg-[#006a61] text-white shadow-xs'
                            : 'bg-white text-[#707881] border border-[#eaedff] hover:border-[#006194]'
                        } ${isSelected ? 'scale-105' : ''}`}
                        title={`Tooth #${t}`}
                      >
                        {t}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Quick Critical Callout */}
          <div className="bg-[#ffdad6]/40 border border-[#ffdad6] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Icon name="priority_high" className="text-[#ba1a1a] text-[18px]" />
              <span className="text-[#131b2e]">
                <strong>Tooth #16:</strong> 2.1mm pulp clearance verified on Bitewing BW-R.
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-bold uppercase tracking-wide">
              Priority Action
            </span>
          </div>
        </section>

        {/* Filterable Finding Tabs */}
        <section className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 ${
              selectedFilter === 'all'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#707881] border border-[#eaedff] hover:text-[#131b2e]'
            }`}
          >
            All Teeth (32)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('active')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 shrink-0 ${
              selectedFilter === 'active'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#707881] border border-[#eaedff] hover:text-[#131b2e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            <span>Active Pathologies (1)</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('watch')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 shrink-0 ${
              selectedFilter === 'watch'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#707881] border border-[#eaedff] hover:text-[#131b2e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#006195]"></span>
            <span>Watch Areas (1)</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('restored')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 shrink-0 ${
              selectedFilter === 'restored'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#707881] border border-[#eaedff] hover:text-[#131b2e]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
            <span>Existing Restorations (1)</span>
          </button>
        </section>

        {/* Tooth Summary Cards */}
        <section className="space-y-4">
          {filteredTeeth.map((tooth) => (
            <article
              key={tooth.id}
              className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden space-y-4"
            >
              {/* Card Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#faf8ff] to-white border-b border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base sm:text-lg font-bold text-[#131b2e]">
                      {getToothLabel(tooth)}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                        tooth.status === 'active_caries'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : tooth.status === 'watch'
                          ? 'bg-[#cde5ff] text-[#006195]'
                          : 'bg-[#86f2e4] text-[#006f66]'
                      }`}
                    >
                      {tooth.statusLabel}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#3f4850]">
                      {tooth.badgeTag}
                    </span>
                  </div>
                  <p className="text-xs text-[#707881] mt-0.5">
                    {tooth.name} • {tooth.palmer} • Universal {tooth.universal}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#f2f3ff] text-[#006194] flex items-center justify-center shrink-0">
                  <Icon
                    name={
                      tooth.status === 'active_caries'
                        ? 'warning'
                        : tooth.status === 'watch'
                        ? 'visibility'
                        : 'verified'
                    }
                    className="text-[18px]"
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="px-4 sm:px-5 pb-5 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff]">
                    <span className="text-[10px] uppercase font-bold text-[#707881] block">
                      Involved Surface
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#131b2e] mt-0.5 block">
                      {tooth.surface}
                    </span>
                  </div>
                  <div className="bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff]">
                    <span className="text-[10px] uppercase font-bold text-[#707881] block">
                      Gingival / Perio
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#131b2e] mt-0.5 block">
                      {tooth.perio}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#707881] block mb-1">
                    Clinical Breakdown
                  </span>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    {tooth.breakdown}
                  </p>
                </div>

                {tooth.linkedInvestigation && (
                  <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#cce5ff] flex items-center gap-3">
                    <Icon name="radiology" className="text-[#006194] text-[22px] shrink-0" />
                    <div className="min-w-0">
                      <h5 className="font-bold text-[#131b2e] truncate">
                        {tooth.linkedInvestigation.type}
                      </h5>
                      <p className="text-[#3f4850] text-[11px] truncate">
                        {tooth.linkedInvestigation.note}
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#eaedff]">
                  <span className="text-[11px] text-[#707881]">
                    Section 9 Record • Dr. Daniel James
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => showToast(`Opened detail dossier for Tooth #${tooth.fdi}`)}
                      className="px-3 py-1.5 rounded-lg bg-[#faf8ff] border border-[#eaedff] hover:bg-[#f2f3ff] text-[#006194] font-bold"
                    >
                      Details
                    </button>
                    {tooth.status === 'active_caries' && (
                      <button
                        type="button"
                        onClick={() => navigate('/summaries/image-review')}
                        className="px-3 py-1.5 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white font-bold flex items-center gap-1 shadow-xs"
                      >
                        <Icon name="view_in_ar" className="text-[14px]" />
                        <span>Radiograph</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* AI Synthesis Narrative Box */}
        <section className="bg-gradient-to-br from-white via-[#f2f3ff] to-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Icon name="auto_awesome" className="text-[18px]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#131b2e]">AI Diagnostic Formulation &amp; Summary</h4>
              <p className="text-xs text-[#707881]">Synthesized from Section 9 &amp; Imaging records</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed pt-1">
            Primary restorative concern localized to FDI #16 with active mesio-occlusal dentin caries encroaching
            to within 2.1mm of pulp horn. Neighboring premolar #15 exhibits initial non-cavitated demineralization
            suitable for remineralization therapy. Antagonist quadrant stable with intact resin restoration on #46.
            No widespread periodontal breakdown or severe furcation involvements detected.
          </p>
          <div className="pt-2 flex items-center gap-1 text-[11px] text-[#707881]">
            <Icon name="info" className="text-[14px]" />
            <span>AI synthesis only. Does not independently diagnose. Attending dentist verification required.</span>
          </div>
        </section>

        {/* Bottom Navigation Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => showToast('Compiling Odontogram PDF summary...')}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#eaedff] hover:bg-[#f2f3ff] text-[#3f4850] text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Icon name="picture_as_pdf" className="text-[18px]" />
            <span>Export PDF</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/summaries/investigations')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Investigations (12.7)</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 left-4 right-4 max-w-sm mx-auto p-4 bg-[#283044] text-[#eef0ff] rounded-2xl shadow-xl flex items-center justify-between z-50 animate-in fade-in slide-in-from-bottom duration-200">
            <span className="text-xs font-medium">{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-[#bfc7d2] hover:text-white"
            >
              <Icon name="close" className="text-[16px]" />
            </button>
          </div>
        )}
      </div>
    </SummaryShell>
  );
}
