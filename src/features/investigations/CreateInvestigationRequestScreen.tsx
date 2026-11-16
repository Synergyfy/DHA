import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvestigationShell } from './InvestigationShell';
import { Icon } from '../../design/Primitives';

type CategoryType = 'radiography' | 'opg' | 'cbct' | 'lab' | 'photography' | 'other';
type PriorityType = 'routine' | 'urgent' | 'emergency';

export function CreateInvestigationRequestScreen() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryType>('radiography');
  const [priority, setPriority] = useState<PriorityType>('urgent');
  const [protocol, setProtocol] = useState('BW-R + Targeted PA #16');
  const [viewsCount, setViewsCount] = useState(2);
  const [clinicalReason, setClinicalReason] = useState(
    'Severe throbbing localized pain at #16 with percussion tenderness. Evaluate periapical radiolucency and periodontal ligament widening.'
  );
  const [icd10, setIcd10] = useState('K04.7 - Periapical abscess without sinus');
  const [selectedTeeth, setSelectedTeeth] = useState<string[]>(['16', '15', '46']);
  const [equipment, setEquipment] = useState('Dexis Titanium CMOS Sensor');
  const [diagnosticLocation, setDiagnosticLocation] = useState('DHA Central Radiology Dept (Suite 1)');

  // Radiation safeguards
  const [safeguards, setSafeguards] = useState({
    alaraConfirmed: true,
    nonIonizingEvaluated: true,
    pregnancyScreened: true,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const categories = [
    {
      id: 'radiography' as CategoryType,
      name: 'Intraoral Radiography',
      desc: 'Bitewing, Periapical (PA), Occlusal views',
      icon: 'radiology',
      popular: true,
    },
    {
      id: 'opg' as CategoryType,
      name: 'Panoramic OPG',
      desc: 'Full dentition, TMJ, and maxillary sinus screening',
      icon: 'panorama_horizontal',
      popular: true,
    },
    {
      id: 'cbct' as CategoryType,
      name: '3D CBCT Volumetric',
      desc: 'High-res 3D volumetric field-of-view scan',
      icon: 'view_in_ar',
    },
    {
      id: 'lab' as CategoryType,
      name: 'Clinical Laboratory',
      desc: 'FBC, INR/PT coagulation, biopsy histopathology',
      icon: 'science',
    },
    {
      id: 'photography' as CategoryType,
      name: 'Clinical Photography',
      desc: 'Standardized intraoral & extraoral photo series',
      icon: 'photo_camera',
    },
    {
      id: 'other' as CategoryType,
      name: 'Other Specialized',
      desc: 'Pulp vitality, cephalometric, diagnostic splint',
      icon: 'more_horiz',
    },
  ];

  const icdRecommendations = [
    'K04.7 - Periapical abscess without sinus',
    'K02.62 - Dental caries on pit & fissure into dentin',
    'K05.32 - Chronic periodontitis, generalized severe',
    'K08.4 - Partial loss of teeth due to trauma/caries',
  ];

  // Simplified FDI tooth map
  const maxillaryTeeth = ['18', '17', '16', '15', '14', '13', '12', '11', '21', '22', '23', '24', '25', '26', '27', '28'];
  const mandibularTeeth = ['48', '47', '46', '45', '44', '43', '42', '41', '31', '32', '33', '34', '35', '36', '37', '38'];

  const toggleTooth = (tooth: string) => {
    setSelectedTeeth((prev) =>
      prev.includes(tooth) ? prev.filter((t) => t !== tooth) : [...prev, tooth]
    );
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!safeguards.alaraConfirmed) {
      showToast('Please confirm ALARA / radiation safety compliance.');
      return;
    }
    showToast('Investigation Order #REQ-2025-0914 created and routed to Radiology!');
    setTimeout(() => {
      navigate('/investigations/details');
    }, 1000);
  };

  return (
    <InvestigationShell
      pageTitle="Create Investigation Requisition"
      badgeCode="11.3"
      badgeLabel="Diagnostic Order"
      currentStep="Order Specification"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <Icon name="check_circle" className="text-emerald-400 text-lg" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Patient Context Banner */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-base">
              CO
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-base sm:text-lg text-on-surface">Chinedu Okafor</h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-surface-container text-on-surface">
                  DHA-10482
                </span>
                <span className="text-xs text-on-surface-variant">34y • Male</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-1 flex-wrap">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Icon name="check_circle" className="text-xs" />
                  Active Encounter #ENC-2026-881
                </span>
                <span>•</span>
                <span className="text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded">
                  Allergy: Penicillin (Severe)
                </span>
              </div>
            </div>
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="text-[11px] text-outline block">Ordering Clinician</span>
            <span className="text-xs font-semibold text-on-surface block">Dr. Daniel James (#DEN-48912)</span>
            <span className="text-[10px] text-emerald-700 font-mono">DHA License Verified</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="space-y-6">
          {/* Step 1: Investigation Category Grid */}
          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-on-surface flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">1</span>
                  Select Investigation Modality
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Choose diagnostic discipline required for encounter</p>
              </div>
              <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                Required
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-xs'
                        : 'border-outline-variant/30 bg-surface hover:border-outline-variant hover:bg-surface-container-low'
                    }`}
                  >
                    {cat.popular && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.2 rounded bg-secondary/10 text-secondary">
                        Common
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container text-primary'}`}>
                        <Icon name={cat.icon} className="text-lg" />
                      </div>
                      <span className="font-bold text-xs text-on-surface">{cat.name}</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant line-clamp-2">{cat.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Protocol & Exposure Setup */}
          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-on-surface flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">2</span>
                  Protocol & Technical Configuration
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Specify views, exposure parameters, and detector equipment</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Requisition Protocol Preset
                </label>
                <select
                  aria-label="Requisition Protocol Preset"
                  value={protocol}
                  onChange={(e) => setProtocol(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-outline-variant/40 bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="BW-R + Targeted PA #16">Bitewing Right + Targeted PA #16 (Recommended)</option>
                  <option value="Full Mouth Series (18 Views)">Full Mouth Series - FMX (18 Views)</option>
                  <option value="Anterior PA Upper/Lower">Anterior PA Upper & Lower</option>
                  <option value="Bilateral Bitewings (4 Views)">Bilateral Bitewings (4 Views)</option>
                  <option value="Custom Single Periapical">Custom Single Periapical</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Detector / Acquisition Hardware
                </label>
                <select
                  aria-label="Detector hardware"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-outline-variant/40 bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Dexis Titanium CMOS Sensor">Dexis Titanium CMOS High-Res Sensor (Suite 1)</option>
                  <option value="Carestream CS 7600 PSP Plates">Carestream CS 7600 Phosphor Storage Plates</option>
                  <option value="Morita Veraview X800 CBCT/OPG">Morita Veraview X800 3D Unit (Suite 2)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Planned Projections / Views
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-outline-variant/40 rounded-xl overflow-hidden bg-surface">
                    <button
                      type="button"
                      onClick={() => setViewsCount(Math.max(1, viewsCount - 1))}
                      className="px-3 py-2 text-xs hover:bg-surface-container font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-mono font-bold text-xs text-primary">{viewsCount} Views</span>
                    <button
                      type="button"
                      onClick={() => setViewsCount(viewsCount + 1)}
                      className="px-3 py-2 text-xs hover:bg-surface-container font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-on-surface-variant">Estimated dose: <strong>0.005 mSv (Minimal)</strong></span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Diagnostic Facility / Destination
                </label>
                <select
                  aria-label="Diagnostic facility"
                  value={diagnosticLocation}
                  onChange={(e) => setDiagnosticLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-outline-variant/40 bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="DHA Central Radiology Dept (Suite 1)">DHA Central Radiology Dept (Suite 1)</option>
                  <option value="Al Zahra Diagnostic Imaging Wing">Al Zahra Diagnostic Imaging Wing</option>
                  <option value="Lagos Hospital Maxillofacial Suite">Lagos Hospital Maxillofacial Suite</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Associated Teeth (FDI Interactive Arch Picker) */}
          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-on-surface flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">3</span>
                  Target Teeth Selection (FDI System)
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Click tooth numbers to link to this radiographic order</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary">Selected: {selectedTeeth.join(', ') || 'None'}</span>
                <button
                  type="button"
                  onClick={() => setSelectedTeeth([])}
                  className="text-xs text-outline hover:text-rose-600 underline"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Tooth Matrix */}
            <div className="space-y-3 p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <div>
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">
                  Maxillary Arch (Upper)
                </span>
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
                  {maxillaryTeeth.map((tooth) => {
                    const isSelected = selectedTeeth.includes(tooth);
                    return (
                      <button
                        key={tooth}
                        type="button"
                        onClick={() => toggleTooth(tooth)}
                        className={`w-7 sm:w-9 h-8 sm:h-9 rounded-lg font-mono text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-primary text-on-primary shadow-xs ring-2 ring-primary/40'
                            : 'bg-surface text-on-surface hover:bg-surface-container border border-outline-variant/30'
                        }`}
                      >
                        {tooth}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant/20">
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">
                  Mandibular Arch (Lower)
                </span>
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
                  {mandibularTeeth.map((tooth) => {
                    const isSelected = selectedTeeth.includes(tooth);
                    return (
                      <button
                        key={tooth}
                        type="button"
                        onClick={() => toggleTooth(tooth)}
                        className={`w-7 sm:w-9 h-8 sm:h-9 rounded-lg font-mono text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-primary text-on-primary shadow-xs ring-2 ring-primary/40'
                            : 'bg-surface text-on-surface hover:bg-surface-container border border-outline-variant/30'
                        }`}
                      >
                        {tooth}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Clinical Indication & ICD-10 */}
          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
            <div>
              <h3 className="font-bold text-base text-on-surface flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">4</span>
                Clinical Indication & Diagnostic Code
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Medical justification required for insurance & radiation audit</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Clinical Problem & Narrative Indication
              </label>
              <textarea
                rows={3}
                value={clinicalReason}
                onChange={(e) => setClinicalReason(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-outline-variant/40 bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Describe patient complaint, duration, clinical presentation..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Recommended ICD-10 Diagnostic Code
              </label>
              <input
                type="text"
                value={icd10}
                onChange={(e) => setIcd10(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-outline-variant/40 bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              />

              <div className="flex flex-wrap gap-1.5 mt-2">
                {icdRecommendations.map((rec) => (
                  <button
                    key={rec}
                    type="button"
                    onClick={() => setIcd10(rec)}
                    className="px-2 py-1 rounded-lg text-[11px] bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/30 transition-colors"
                  >
                    + {rec.split(' - ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 5: Triage Priority & Urgency */}
          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
            <div>
              <h3 className="font-bold text-base text-on-surface flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-xs flex items-center justify-center">5</span>
                Triage Priority & SLA
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Determines queue placement and radiographer alerting</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'routine' as PriorityType,
                  title: 'Routine',
                  sla: 'Standard (< 24 hrs)',
                  color: 'border-slate-300 text-slate-700 bg-slate-50',
                },
                {
                  id: 'urgent' as PriorityType,
                  title: 'Urgent (Fast-Track)',
                  sla: 'Priority Intake (< 4 hrs)',
                  color: 'border-amber-300 text-amber-800 bg-amber-50',
                },
                {
                  id: 'emergency' as PriorityType,
                  title: 'Emergency / STAT',
                  sla: 'Immediate (< 30 mins)',
                  color: 'border-rose-400 text-rose-800 bg-rose-50',
                },
              ].map((p) => {
                const isSelected = priority === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPriority(p.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? `${p.color} ring-2 ring-primary/40 shadow-xs`
                        : 'border-outline-variant/30 bg-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-on-surface">{p.title}</span>
                      {isSelected && <Icon name="check_circle" className="text-primary text-base" />}
                    </div>
                    <span className="text-[11px] text-on-surface-variant block">{p.sla}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 6: Radiation Safety & ALARA Compliance Checks */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Icon name="verified_user" className="text-lg text-amber-700" />
              <span>DHA Radiation Protection & Regulatory Governance</span>
            </div>
            <p className="text-xs text-amber-800">
              In accordance with Nigeria Federal Authority for Nuclear Regulation (FANR) and DHA Clinical Guidelines:
            </p>

            <div className="space-y-2 pt-1 text-xs text-amber-950">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={safeguards.alaraConfirmed}
                  onChange={(e) => setSafeguards({ ...safeguards, alaraConfirmed: e.target.checked })}
                  className="rounded text-primary focus:ring-primary mt-0.5"
                />
                <span>
                  <strong>ALARA / ALADA Compliance:</strong> Radiation dose is justified and kept As Low As Reasonably Achievable using collimation and thyroid shielding.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={safeguards.nonIonizingEvaluated}
                  onChange={(e) => setSafeguards({ ...safeguards, nonIonizingEvaluated: e.target.checked })}
                  className="rounded text-primary focus:ring-primary mt-0.5"
                />
                <span>
                  <strong>Non-Ionizing Modality Inadequacy:</strong> The clinical problem cannot be resolved through visual, tactile, or non-ionizing modalities alone.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={safeguards.pregnancyScreened}
                  onChange={(e) => setSafeguards({ ...safeguards, pregnancyScreened: e.target.checked })}
                  className="rounded text-primary focus:ring-primary mt-0.5"
                />
                <span>
                  <strong>Patient Verification:</strong> Confirmed patient identity and screened for physiological contraindications / pregnancy status.
                </span>
              </label>
            </div>
          </div>

          {/* Bottom Action Tray */}
          <div className="sticky bottom-4 bg-surface/95 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Icon name="lock" className="text-sm text-emerald-700" />
              <span>Nigeria Health Information Exchange Audit Hash Ready</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => showToast('Order draft saved to local encounter state')}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-surface border border-outline-variant/40 hover:bg-surface-container text-on-surface transition-colors"
              >
                Save Draft
              </button>

              <button
                type="submit"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Icon name="send" className="text-sm" />
                <span>Sign & Route Order</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </InvestigationShell>
  );
}

