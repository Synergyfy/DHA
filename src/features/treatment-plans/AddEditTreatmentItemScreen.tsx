import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function AddEditTreatmentItemScreen() {
  const navigate = useNavigate();

  const [notationSystem, setNotationSystem] = useState<'FDI' | 'Palmer' | 'Universal'>('FDI');
  const [activeSurfaces, setActiveSurfaces] = useState<{ [key: string]: boolean }>({
    B: false,
    M: true,
    D: false,
    L: false,
    O: true,
  });

  const [multiToothLinked, setMultiToothLinked] = useState(false);
  const [surgicalObjective, setSurgicalObjective] = useState(
    'Excavate infected dentin under rubber dam isolation, selective enamel etch, self-etch dentin primer, and incremental C-factor controlled composite placement.'
  );

  const [priorityTier] = useState('Urgent (< 7 Days)');
  const [chairtime, setChairtime] = useState('45 Mins');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleSurface = (surface: string) => {
    setActiveSurfaces((prev) => ({
      ...prev,
      [surface]: !prev[surface],
    }));
  };

  const selectedSurfacesCount = Object.values(activeSurfaces).filter(Boolean).length;
  const grossFee = 850;
  const coverage80 = 680;
  const copay20 = 170;

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Item Configuration"
      badgeCode="13.7"
      badgeLabel="Item Config"
      currentStep="Item #13.1-A"
    >
      <div className="space-y-6 max-w-4xl mx-auto pb-16">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-lg">
                #13.1-A
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-[#89f5e7]/40 text-[#006a61] flex items-center gap-1">
                <Icon name="bolt" className="text-[14px]" />
                Phase 1: Acute Restorative
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#707881]">
                Draft Item
              </span>
            </div>
            <span className="text-xs text-[#707881] font-mono">DHA-RES-2S</span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#131b2e]">
              Configure Tooth Restorative Action
            </h1>
            <p className="text-xs text-[#707881] mt-0.5">
              Define surgical protocol, tooth surface mappings, clinical justifications, and insurance coding.
            </p>
          </div>
        </div>

        {/* Critical Allergy Safeguard Alert */}
        <div className="bg-[#ffdad6]/60 rounded-2xl p-4 sm:p-5 border border-[#ba1a1a]/20 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <Icon name="warning" className="text-[20px]" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-[#93000a]">
              Critical Clinical Safeguard: Penicillin Allergy
            </h2>
            <p className="text-xs text-[#ba1a1a] font-medium leading-relaxed mt-0.5">
              Severe hypersensitivity verified. Pre-procedure rinse and post-op analgesia must strictly exclude
              beta-lactams and linked cross-allergens.
            </p>
          </div>
        </div>

        {/* 1. Procedure Identification */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                <Icon name="medical_services" className="text-[18px]" />
              </span>
              <h3 className="text-sm font-bold text-[#131b2e]">1. Procedure Identification</h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#89f5e7]/40 text-[#006a61]">
              CDT / UCC-2026
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-[#3f4850] block mb-1">Procedure Category</label>
              <div className="h-12 px-4 rounded-xl bg-[#f2f3ff] flex items-center justify-between text-sm text-[#131b2e]">
                <div className="flex items-center gap-2 truncate">
                  <Icon name="category" className="text-[#707881] text-[18px]" />
                  <span className="font-medium truncate">Restorative Dentistry (Operative)</span>
                </div>
                <Icon name="unfold_more" className="text-[#707881] text-[20px]" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#3f4850] block mb-1">
                Procedure Name &amp; Clinical Description
              </label>
              <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-1">
                <p className="text-sm font-bold text-[#131b2e]">
                  Direct Biomimetic Resin Composite (2-Surface MO)
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-white text-[#006194] font-bold border border-[#eaedff]">
                    DHA-RES-2S
                  </span>
                  <span className="text-xs text-[#707881]">• Coronal Cavitation Direct Adhesive Bonding</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Anatomical Mapping & Interactive Odontogram */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                <Icon name="dentistry" className="text-[18px]" />
              </span>
              <h3 className="text-sm font-bold text-[#131b2e]">2. Anatomical Surface Mapping</h3>
            </div>

            {/* Notation Toggle */}
            <div className="flex items-center p-0.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff]">
              {(['FDI', 'Palmer', 'Universal'] as const).map((system) => (
                <button
                  key={system}
                  type="button"
                  onClick={() => setNotationSystem(system)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    notationSystem === system
                      ? 'bg-white text-[#006194] shadow-xs'
                      : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  {system}
                </button>
              ))}
            </div>
          </div>

          {/* Tooth Context Card */}
          <div className="flex items-center justify-between p-4 bg-[#f2f3ff] rounded-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-[#006194]">#16</span>
                <span className="text-sm font-bold text-[#131b2e]">Maxillary Right 1st Molar</span>
              </div>
              <span className="text-xs text-[#707881]">Quadrant 1 (Upper Right Posterior)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#89f5e7]/40 text-[#006a61] text-xs font-semibold">
              <Icon name="check_circle" className="text-[14px]" />
              <span>Single Unit Restorative</span>
            </div>
          </div>

          {/* Interactive SVG Surface Diagram */}
          <div className="flex flex-col items-center justify-center py-4 px-6 bg-[#f2f3ff] rounded-2xl border border-[#eaedff]">
            <div className="flex items-center justify-between w-full max-w-xs mb-2 text-xs font-bold text-[#707881]">
              <span>BUCCAL (B)</span>
              <span className="text-[#006194]">OCCLUSAL VIEW</span>
              <span>LINGUAL (L)</span>
            </div>

            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full drop-shadow-xs select-none" viewBox="0 0 160 160">
                {/* Buccal Surface (B) */}
                <polygon
                  points="30,30 130,30 108,52 52,52"
                  className={`cursor-pointer transition-colors ${
                    activeSurfaces.B ? 'fill-[#006194]' : 'fill-white hover:fill-[#cce5ff]'
                  }`}
                  stroke="#bfc7d2"
                  strokeWidth="2"
                  onClick={() => toggleSurface('B')}
                />
                <text
                  x="80"
                  y="44"
                  textAnchor="middle"
                  className={`text-[11px] font-bold pointer-events-none ${
                    activeSurfaces.B ? 'fill-white' : 'fill-[#707881]'
                  }`}
                >
                  B
                </text>

                {/* Mesial Surface (M) */}
                <polygon
                  points="30,30 52,52 52,108 30,130"
                  className={`cursor-pointer transition-colors ${
                    activeSurfaces.M ? 'fill-[#007bb9]' : 'fill-white hover:fill-[#cce5ff]'
                  }`}
                  stroke="#bfc7d2"
                  strokeWidth="2"
                  onClick={() => toggleSurface('M')}
                />
                <text
                  x="42"
                  y="84"
                  textAnchor="middle"
                  className={`text-[11px] font-bold pointer-events-none ${
                    activeSurfaces.M ? 'fill-white' : 'fill-[#707881]'
                  }`}
                >
                  M
                </text>

                {/* Distal Surface (D) */}
                <polygon
                  points="130,30 130,130 108,108 108,52"
                  className={`cursor-pointer transition-colors ${
                    activeSurfaces.D ? 'fill-[#006194]' : 'fill-white hover:fill-[#cce5ff]'
                  }`}
                  stroke="#bfc7d2"
                  strokeWidth="2"
                  onClick={() => toggleSurface('D')}
                />
                <text
                  x="118"
                  y="84"
                  textAnchor="middle"
                  className={`text-[11px] font-bold pointer-events-none ${
                    activeSurfaces.D ? 'fill-white' : 'fill-[#707881]'
                  }`}
                >
                  D
                </text>

                {/* Lingual Surface (L) */}
                <polygon
                  points="30,130 52,108 108,108 130,130"
                  className={`cursor-pointer transition-colors ${
                    activeSurfaces.L ? 'fill-[#006194]' : 'fill-white hover:fill-[#cce5ff]'
                  }`}
                  stroke="#bfc7d2"
                  strokeWidth="2"
                  onClick={() => toggleSurface('L')}
                />
                <text
                  x="80"
                  y="123"
                  textAnchor="middle"
                  className={`text-[11px] font-bold pointer-events-none ${
                    activeSurfaces.L ? 'fill-white' : 'fill-[#707881]'
                  }`}
                >
                  L
                </text>

                {/* Occlusal Core Surface (O) */}
                <rect
                  x="52"
                  y="52"
                  width="56"
                  height="56"
                  rx="4"
                  className={`cursor-pointer transition-colors ${
                    activeSurfaces.O ? 'fill-[#006194]' : 'fill-white hover:fill-[#cce5ff]'
                  }`}
                  stroke="#bfc7d2"
                  strokeWidth="1.5"
                  onClick={() => toggleSurface('O')}
                />
                <text
                  x="80"
                  y="85"
                  textAnchor="middle"
                  className={`text-[13px] font-bold pointer-events-none ${
                    activeSurfaces.O ? 'fill-white' : 'fill-[#707881]'
                  }`}
                >
                  O
                </text>
              </svg>
            </div>

            {/* Surface Status Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              {(['M', 'O', 'D', 'B', 'L'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSurface(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeSurfaces[s]
                      ? 'bg-[#006194] text-white shadow-xs'
                      : 'bg-white text-[#707881] border border-[#eaedff] hover:bg-[#eaedff]'
                  }`}
                >
                  Surface {s} {activeSurfaces[s] ? '✓' : ''}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-[#707881] mt-2">
              Selected Surfaces: <strong>{selectedSurfacesCount} Surface(s)</strong> (MO configuration)
            </p>
          </div>

          {/* Multi-tooth linkage toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f3ff]">
            <div className="flex items-center gap-2.5">
              <Icon name="link" className="text-[#006194] text-[20px]" />
              <div>
                <p className="text-xs font-bold text-[#131b2e]">Link Multi-Tooth Quadrant Block</p>
                <p className="text-[11px] text-[#707881]">Synchronize isolation &amp; matrix protocols</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={multiToothLinked}
                onChange={(e) => setMultiToothLinked(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#dae2fd] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006194]"></div>
            </label>
          </div>
        </div>

        {/* 3. Clinical Evidence & Diagnostics (4 Links) */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#89f5e7]/40 text-[#006a61] flex items-center justify-center">
                <Icon name="verified" className="text-[18px]" />
              </span>
              <h3 className="text-sm font-bold text-[#131b2e]">3. Clinical Evidence &amp; Diagnostics</h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#89f5e7]/40 text-[#006a61]">
              4 Verified Links
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#707881]">Odontogram Finding</span>
                <span className="text-[10px] font-semibold text-[#006a61] bg-[#89f5e7]/40 px-1.5 rounded">12 Oct 2026</span>
              </div>
              <p className="text-xs font-bold text-[#131b2e]">Mesio-occlusal cavitated dentin caries (ICDAS 3/4)</p>
            </div>

            <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#707881]">Clinical Examination</span>
                <span className="text-[10px] font-semibold text-[#006194] bg-[#cce5ff] px-1.5 rounded">Vital Pulp</span>
              </div>
              <p className="text-xs font-bold text-[#131b2e]">Cold sensitivity &lt; 5s, percussion negative, no mobility</p>
            </div>

            <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#707881]">Digital Imaging</span>
                <span className="text-[10px] font-semibold text-[#006194] bg-[#cce5ff] px-1.5 rounded">BW-R Bitewing</span>
              </div>
              <p className="text-xs font-bold text-[#131b2e]">Bitewing BW-R: 2.1mm coronal dentin buffer intact</p>
            </div>

            <div className="p-3 rounded-xl bg-[#89f5e7]/20 border border-[#006a61]/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#006a61]">AI Biomimetic Diagnostic</span>
                <span className="text-[10px] font-bold text-[#006a61] bg-white px-1.5 py-0.5 rounded shadow-xs">98.4% Match</span>
              </div>
              <p className="text-xs font-bold text-[#131b2e]">#DHA-CS-9842 (Approved by Dr. Daniel James)</p>
            </div>
          </div>
        </div>

        {/* 4. Operational Directives */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center">
              <Icon name="tune" className="text-[18px]" />
            </span>
            <h3 className="text-sm font-bold text-[#131b2e]">4. Operational &amp; Surgical Directives</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-[#3f4850] block mb-1">
                Detailed Surgical Objective
              </label>
              <textarea
                rows={3}
                value={surgicalObjective}
                onChange={(e) => setSurgicalObjective(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194] resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#3f4850] block mb-1">Priority Tier</label>
                <div className="h-11 px-3 rounded-xl bg-[#f2f3ff] flex items-center justify-between text-xs font-semibold text-[#131b2e]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
                    <span>{priorityTier}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/treatment-plans/priority-rationale')}
                    className="text-[#006194] hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#3f4850] block mb-1">Estimated Chairtime</label>
                <div className="h-11 px-3 rounded-xl bg-[#f2f3ff] flex items-center gap-2 text-xs font-semibold text-[#131b2e]">
                  <Icon name="schedule" className="text-[18px] text-[#006194]" />
                  <input
                    type="text"
                    value={chairtime}
                    onChange={(e) => setChairtime(e.target.value)}
                    className="bg-transparent focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>

            {/* Clinician */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f3ff]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs">
                  DJ
                </div>
                <div>
                  <p className="text-xs font-bold text-[#131b2e]">Dr. Daniel James, DDS</p>
                  <p className="text-[11px] text-[#707881]">Lead Restorative Surgeon • Lic. #DEN-48912</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-[#006194] border border-[#eaedff]">
                Assigned
              </span>
            </div>
          </div>
        </div>

        {/* 5. Financial & Copay Breakdown */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                <Icon name="payments" className="text-[18px]" />
              </span>
              <h3 className="text-sm font-bold text-[#131b2e]">5. Cost &amp; Insurance Coverage</h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#89f5e7]/40 text-[#006a61]">
              NHIA Tier 1
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#f2f3ff] space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-[#3f4850]">
              <span>Gross Procedure Fee</span>
              <span className="font-bold text-[#131b2e]">NGN {grossFee}.00</span>
            </div>
            <div className="flex items-center justify-between text-[#006a61]">
              <span>Approved Benefit Coverage (80%)</span>
              <span className="font-bold">- NGN {coverage80}.00</span>
            </div>
            <div className="h-px bg-[#eaedff] my-1"></div>
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-sm font-bold text-[#131b2e] block">Patient Estimated Copay (20%)</span>
                <span className="text-[11px] text-[#707881]">Collected at clinical checkout</span>
              </div>
              <span className="text-xl font-extrabold text-[#006194]">NGN {copay20}.00</span>
            </div>
          </div>
        </div>

        {/* Action Trays */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={() => {
              showToast('Item #13.1-A saved successfully');
              setTimeout(() => navigate('/treatment-plans/builder'), 600);
            }}
            className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
          >
            <Icon name="save" className="text-[18px]" />
            <span>Save Treatment Item &amp; Return to Builder</span>
          </button>

          <button
            type="button"
            onClick={() => {
              showToast('Item saved! Ready to configure next procedure.');
              setActiveSurfaces({ B: false, M: false, D: false, L: false, O: false });
            }}
            className="w-full h-12 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-[#eaedff]"
          >
            <Icon name="add_circle" className="text-[18px]" />
            <span>Save and Add Another Item</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/treatment-plans/builder')}
            className="w-full py-2.5 text-center text-[#707881] hover:text-[#ba1a1a] text-xs font-semibold transition-colors"
          >
            Discard Changes
          </button>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[18px] text-[#89f5e7]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </TreatmentPlanShell>
  );
}
