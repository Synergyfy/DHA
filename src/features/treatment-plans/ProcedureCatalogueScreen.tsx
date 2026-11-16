import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

interface ProcedureData {
  id: string;
  scope: 'dha-standard' | 'clinic-custom';
  category: 'operative' | 'preventive' | 'endodontics' | 'prosthodontics' | 'surgery';
  categoryLabel: string;
  title: string;
  cdt: string;
  code: string;
  chairtime: string;
  price: string;
  priceLabel: string;
  priceSub?: string;
  range?: string;
  indication: string;
  details: string;
  highlight?: string;
  author?: string;
  branches?: string;
  equipment?: string;
  utilization?: string;
  requiresPreAuth?: boolean;
  hygienistApproved?: boolean;
}

export function ProcedureCatalogueScreen() {
  const navigate = useNavigate();

  // State
  const [currentScope, setCurrentScope] = useState<'all' | 'dha-standard' | 'clinic-custom'>('all');
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArch, setSelectedArch] = useState('All Arches');
  const [selectedProtocol, setSelectedProtocol] = useState<ProcedureData | null>(null);

  const procedures: ProcedureData[] = [
    {
      id: 'proc-d2392',
      scope: 'dha-standard',
      category: 'operative',
      categoryLabel: 'Operative / Restorative',
      title: 'Direct Biomimetic Resin Composite (2-Surface MO)',
      cdt: 'D2392',
      code: 'DHA-RES-2S',
      chairtime: '45 Mins',
      price: 'NGN 850',
      priceLabel: 'Base Tariff',
      range: 'NGN 750 – NGN 950',
      indication: 'Mesio-occlusal cavitated dentin caries. Rubber dam isolation mandatory per DHA guideline.',
      details: 'High-density micro-hybrid nano-composite with biomimetic dentin replacement layer.',
      utilization: 'High Utilization (Top 5%)',
    },
    {
      id: 'proc-d1206',
      scope: 'dha-standard',
      category: 'preventive',
      categoryLabel: 'Preventive & Hygiene',
      title: 'Topical Fluoride Varnish Application (Single Arch/Tooth)',
      cdt: 'D1206',
      code: 'DHA-PREV-FLUOR',
      chairtime: '15 Mins',
      price: 'NGN 250',
      priceLabel: 'Standard Tariff',
      indication: 'High-caries risk preventive coating. Applicable every 3-6 months for pediatric & root exposure patients.',
      details: 'Duraphat 5% Sodium Fluoride (22,600 ppm F) suspension with resin base.',
      hygienistApproved: true,
    },
    {
      id: 'proc-d2610',
      scope: 'clinic-custom',
      category: 'prosthodontics',
      categoryLabel: 'Prosthodontics',
      title: 'CAD/CAM Chairside Lithium Disilicate Inlay/Onlay',
      cdt: 'D2610',
      code: 'HDC-REST-INLAY',
      chairtime: '90 Mins (or 2 Visits)',
      price: 'NGN 2,200',
      priceLabel: 'Clinic Price',
      indication: 'Cusp capping and posterior structural restoration preserving supra-gingival tooth enamel.',
      details: 'Cerec Primemill precision milled monolithic IPS e.max block with crystallizing glaze cycle.',
      branches: 'Harmony Wuse 2, Harmony Victoria Island',
      author: 'Dr. Daniel James (DDS, #DEN-48912)',
      equipment: 'Milling Unit: Cerec Primemill',
    },
    {
      id: 'proc-d3330',
      scope: 'dha-standard',
      category: 'endodontics',
      categoryLabel: 'Endodontics',
      title: 'Molar Root Canal Therapy (Excluding Core Build-up)',
      cdt: 'D3330',
      code: 'DHA-ENDO-MOLAR',
      chairtime: '75 Mins',
      price: 'NGN 2,400',
      priceLabel: 'Base Tariff',
      indication: 'Irreversible pulpitis, pulpal necrosis, or apical periodontitis in multi-rooted molars.',
      details: 'Working length determination, rotary NiTi instrumentation, and warm vertical gutta-percha obturation.',
      requiresPreAuth: true,
    },
  ];

  const archOptions = [
    { id: 'all', label: 'All Arches', icon: 'dentistry' },
    { id: 'max-post', label: 'Maxillary Post (14-18, 24-28)' },
    { id: 'ant', label: 'Anterior (13-23, 33-43)' },
    { id: 'mand-post', label: 'Mandibular Post (34-38, 44-48)' },
  ];

  const categoryOptions = [
    { id: 'all', label: 'All Fields' },
    { id: 'operative', label: 'Operative / Restorative' },
    { id: 'preventive', label: 'Preventive & Hygiene' },
    { id: 'endodontics', label: 'Endodontics' },
    { id: 'prosthodontics', label: 'Prosthodontics' },
    { id: 'surgery', label: 'Oral Surgery' },
  ];

  const filteredProcedures = useMemo(() => {
    return procedures.filter((p) => {
      const matchesScope = currentScope === 'all' || p.scope === currentScope;
      const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.cdt.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query) ||
        p.categoryLabel.toLowerCase().includes(query);

      return matchesScope && matchesCategory && matchesQuery;
    });
  }, [procedures, currentScope, currentCategory, searchQuery]);

  const resetFilters = () => {
    setCurrentScope('all');
    setCurrentCategory('all');
    setSearchQuery('');
    setSelectedArch('All Arches');
  };

  return (
    <TreatmentPlanShell
      pageTitle="Procedure Catalogue"
      badgeCode="13.27"
      badgeLabel="Central Master Registry"
      currentStep="Step 27 of 30"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Statutory Governance Notice Banner */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#006194] shrink-0 mt-0.5 shadow-xs">
              <Icon name="verified" className="text-[20px]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-sm font-bold text-[#131b2e]">
                  DHA Unified Procedure Catalogue (UCC-2026)
                </span>
                <span className="bg-[#cce5ff] text-[#004b73] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Statutory Reference
                </span>
              </div>
              <p className="text-xs text-[#3f4850] leading-relaxed">
                Central repository of clinical dental procedures, standard chairtime envelopes, and tariff baselines. Catalogue pricing updates never alter past completed historical treatment records.
              </p>
            </div>
          </div>
        </div>

        {/* Arch Scope Selector (Odontogram Quick-Context Bar) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Arch Anatomy Scope:
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {archOptions.map((arch) => (
              <button
                key={arch.id}
                type="button"
                onClick={() => setSelectedArch(arch.label)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs shrink-0 transition-all flex items-center gap-1.5 border ${
                  selectedArch === arch.label
                    ? 'bg-[#006194] text-white border-[#006194] shadow-xs'
                    : 'bg-[#f2f3ff] text-[#3f4850] border-[#eaedff] hover:bg-[#eaedff]'
                }`}
              >
                {arch.icon && <Icon name={arch.icon} className="text-[14px]" />}
                <span>{arch.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search, Scope Tabs & Category Filter Chips */}
        <div className="space-y-3">
          {/* Search Input */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#707881]">
              <Icon name="search" className="text-[20px]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by procedure title, CDT code (e.g. D2392), or UCC-2026 ref..."
              className="w-full h-12 pl-10 pr-10 bg-white text-[#131b2e] rounded-xl text-sm shadow-sm border border-[#eaedff] placeholder:text-[#707881] focus:outline-none focus:ring-2 focus:ring-[#006194] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#707881] hover:text-[#131b2e]"
              >
                <Icon name="cancel" className="text-[18px]" />
              </button>
            )}
          </div>

          {/* Scope Tabs & Filter Chips Grid */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Scope Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-[#f2f3ff] p-1 rounded-xl border border-[#eaedff] max-w-md">
              <button
                type="button"
                onClick={() => setCurrentScope('all')}
                className={`py-2 px-3 rounded-lg text-center text-xs font-bold transition-all ${
                  currentScope === 'all'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#707881] hover:text-[#131b2e]'
                }`}
              >
                All (184)
              </button>
              <button
                type="button"
                onClick={() => setCurrentScope('dha-standard')}
                className={`py-2 px-3 rounded-lg text-center text-xs font-bold transition-all ${
                  currentScope === 'dha-standard'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#707881] hover:text-[#131b2e]'
                }`}
              >
                DHA Standard (142)
              </button>
              <button
                type="button"
                onClick={() => setCurrentScope('clinic-custom')}
                className={`py-2 px-3 rounded-lg text-center text-xs font-bold transition-all ${
                  currentScope === 'clinic-custom'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#707881] hover:text-[#131b2e]'
                }`}
              >
                Clinic Custom (42)
              </button>
            </div>

            {/* Match Counter */}
            <div className="flex items-center gap-2 text-xs text-[#707881]">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              <span>Showing {filteredProcedures.length} catalogued procedures</span>
              <span>•</span>
              <span className="font-semibold text-[#006194]">Synced with DHA Registry</span>
            </div>
          </div>

          {/* Category Filter Chips (Horizontal Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {categoryOptions.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCurrentCategory(cat.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  currentCategory === cat.id
                    ? 'bg-[#006194] text-white border-[#006194] shadow-xs'
                    : 'bg-white text-[#3f4850] border-[#eaedff] hover:bg-[#f2f3ff]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Procedures Grid (Responsive: 1 col on mobile, 2 cols on tablet/desktop) */}
        {filteredProcedures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProcedures.map((proc) => (
              <article
                key={proc.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] flex flex-col justify-between hover:border-[#bfc7d2] transition-all"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                          proc.scope === 'dha-standard'
                            ? 'bg-[#86f2e4]/30 text-[#006f66]'
                            : 'bg-[#cce5ff]/50 text-[#006194]'
                        }`}
                      >
                        <Icon
                          name={proc.scope === 'dha-standard' ? 'shield' : 'domain'}
                          className="text-[13px]"
                        />
                        {proc.scope === 'dha-standard' ? 'DHA Standard' : 'Clinic Custom'}
                      </span>
                      <span className="bg-[#f2f3ff] text-[#707881] px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                        {proc.categoryLabel}
                      </span>
                    </div>

                    <span className="bg-[#86f2e4]/20 text-[#006a61] text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Icon name="check_circle" className="text-[13px]" /> Active
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#131b2e] leading-snug">
                      {proc.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 font-mono text-xs text-[#707881]">
                      <span>
                        CDT: <strong className="text-[#131b2e]">{proc.cdt}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Ref: <strong className="text-[#006194]">{proc.code}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Logistics Strip */}
                  <div className="grid grid-cols-2 gap-2 bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#006194] shrink-0 shadow-xs">
                        <Icon name="schedule" className="text-[16px]" />
                      </div>
                      <div>
                        <p className="text-[11px] text-[#707881]">Chairtime</p>
                        <p className="text-xs font-bold text-[#131b2e]">{proc.chairtime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#006a61] shrink-0 shadow-xs">
                        <Icon name="payments" className="text-[16px]" />
                      </div>
                      <div>
                        <p className="text-[11px] text-[#707881]">{proc.priceLabel}</p>
                        <p className="text-xs font-bold text-[#006a61]">{proc.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Indication Note */}
                  <div className="bg-[#faf8ff] rounded-xl p-3 border border-[#eaedff] text-xs text-[#3f4850] space-y-1">
                    {proc.range && (
                      <div className="flex items-center justify-between text-[11px] text-[#707881] pb-1 border-b border-[#eaedff]">
                        <span>Permitted Branch Range:</span>
                        <span className="font-bold text-[#131b2e]">{proc.range}</span>
                      </div>
                    )}
                    <p className="flex items-start gap-1.5 pt-0.5">
                      <Icon name="info" className="text-[15px] text-[#006194] shrink-0 mt-0.5" />
                      <span>
                        <strong>Indication:</strong> {proc.indication}
                      </span>
                    </p>
                    {proc.author && (
                      <p className="text-[11px] text-[#707881] pt-1">
                        Author: <strong>{proc.author}</strong> ({proc.branches})
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-[#eaedff] mt-3 flex items-center justify-between text-xs">
                  {proc.requiresPreAuth ? (
                    <span className="text-[#006a61] font-semibold flex items-center gap-1">
                      <Icon name="approval_delegation" className="text-[15px]" />
                      Pre-Auth Required
                    </span>
                  ) : proc.hygienistApproved ? (
                    <span className="text-[#006194] font-semibold flex items-center gap-1">
                      <Icon name="verified_user" className="text-[15px]" />
                      Hygienist Certified
                    </span>
                  ) : proc.equipment ? (
                    <span className="text-[#707881] font-mono text-[11px]">
                      {proc.equipment}
                    </span>
                  ) : (
                    <span className="text-[#707881]">{proc.utilization || 'DHA Standard'}</span>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedProtocol(proc)}
                    className="text-[#006194] hover:text-[#004b73] font-bold flex items-center gap-0.5"
                  >
                    View Protocol
                    <Icon name="chevron_right" className="text-[16px]" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-[#eaedff] space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#f2f3ff] text-[#707881] flex items-center justify-center mx-auto">
              <Icon name="search_off" className="text-[28px]" />
            </div>
            <h3 className="text-base font-bold text-[#131b2e]">No Matching Procedures</h3>
            <p className="text-xs text-[#707881] max-w-sm mx-auto">
              We couldn't find any standardized or clinic-custom procedure matching your current search query and scope filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 bg-[#006194] text-white font-bold text-xs rounded-xl hover:bg-[#004b73] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Safeguards Notice */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 sm:p-5 border border-[#eaedff] flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#707881] shrink-0 mt-0.5 shadow-xs">
            <Icon name="gavel" className="text-[20px]" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-[#131b2e] uppercase tracking-wider mb-0.5">
              Statutory Safeguards & Clinical Autonomy
            </h4>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              Catalogue entries serve as reference templates and tariffs. Inclusion in the catalogue does not imply automated clinical justification for any patient; clinical need must always be verified by an authorized dentist.
            </p>
          </div>
        </div>

        {/* Bottom Quick-Action Panel */}
        <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-[#eaedff] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="hidden sm:flex flex-col">
            <span className="text-xs text-[#707881]">Practice Procedure Customization</span>
            <span className="text-sm font-bold text-[#131b2e]">Harmony Dental Group Registry</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/procedure-editor')}
            className="w-full sm:w-auto h-12 px-6 bg-[#006194] hover:bg-[#004b73] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Icon name="add_circle" className="text-[20px]" />
            <span>+ Add Clinic-Specific Procedure (13.28)</span>
          </button>
        </div>

        {/* Protocol Details Modal */}
        {selectedProtocol && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#eaedff] space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center">
                    <Icon name="menu_book" className="text-[20px]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#131b2e]">Clinical Protocol Dossier</h3>
                    <p className="font-mono text-xs text-[#707881]">
                      {selectedProtocol.code} • {selectedProtocol.cdt}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProtocol(null)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f2f3ff] text-[#707881] flex items-center justify-center"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#3f4850]">
                <div>
                  <h4 className="font-bold text-[#131b2e] text-sm mb-1">{selectedProtocol.title}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#006194] font-semibold">
                    {selectedProtocol.categoryLabel}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#707881]">Chairtime Envelope:</span>
                    <span className="font-bold text-[#131b2e]">{selectedProtocol.chairtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#707881]">Reference Tariff:</span>
                    <span className="font-bold text-[#006a61]">{selectedProtocol.price}</span>
                  </div>
                  {selectedProtocol.range && (
                    <div className="flex justify-between">
                      <span className="text-[#707881]">Permitted Range:</span>
                      <span className="font-bold text-[#131b2e]">{selectedProtocol.range}</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="font-bold text-[#131b2e] block mb-1">Clinical Indication:</span>
                  <p className="bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff] leading-relaxed">
                    {selectedProtocol.indication}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#131b2e] block mb-1">Biomaterial & Technique Specifications:</span>
                  <p className="bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff] leading-relaxed">
                    {selectedProtocol.details}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProtocol(null);
                    navigate('/treatment-plans/builder');
                  }}
                  className="flex-1 h-11 bg-[#006194] hover:bg-[#004b73] text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Insert in Plan Builder (13.5)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProtocol(null)}
                  className="px-4 h-11 bg-[#f2f3ff] text-[#3f4850] font-semibold rounded-xl text-xs hover:bg-[#eaedff] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TreatmentPlanShell>
  );
}
