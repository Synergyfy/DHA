import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvestigationShell } from './InvestigationShell';
import { Icon } from '../../design/Primitives';

type CategoryOption = 'radiography' | 'opg' | 'cbct' | 'lab' | 'photo' | 'other';

export function InvestigationCategoryDetailsScreen() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>('radiography');
  const [subType, setSubType] = useState('Bitewing (BW-R) & Periapical (#16 Tri-Apex Combo)');
  const [projectionAngle, setProjectionAngle] = useState('Standard Right Molar Interproximal + Bisecting Periapical');
  const [acqDate, setAcqDate] = useState('16 Feb 2025');
  const [acqTime, setAcqTime] = useState('09:40 GST');
  const [facility, setFacility] = useState('DHA Central Dental Clinic (In-House Radiology)');
  const [suite, setSuite] = useState('Operatory 4 (Dexis Platinum)');
  const [seriesId, setSeriesId] = useState('DEX-2025-0216-981');
  const [notes, setNotes] = useState(
    'Two intraoral digital exposures taken under rubber dam clearance. Clear visualization of tooth #16 crown, alveolar crest, and mesial/distal bone heights. Zero motion artifact.'
  );
  const [radiationAccordionOpen, setRadiationAccordionOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const categories = [
    {
      id: 'radiography' as CategoryOption,
      title: 'Dental Radiography',
      desc: 'Intraoral • Bitewing / PA',
      icon: 'radiology',
    },
    {
      id: 'opg' as CategoryOption,
      title: 'Panoramic (OPG)',
      desc: 'Orthopantomogram Full Arch',
      icon: 'crop_free',
    },
    {
      id: 'cbct' as CategoryOption,
      title: 'CBCT & 3D Imaging',
      desc: 'Cone Beam Volume DICOM',
      icon: 'view_in_ar',
    },
    {
      id: 'lab' as CategoryOption,
      title: 'Laboratory Tests',
      desc: 'Biopsy, Path, Smears',
      icon: 'biotech',
    },
    {
      id: 'photo' as CategoryOption,
      title: 'Clinical Photos',
      desc: 'Intraoral / Extraoral Macro',
      icon: 'photo_camera',
    },
    {
      id: 'other' as CategoryOption,
      title: 'Other Clinical Docs',
      desc: 'Referrals, External PDFs',
      icon: 'clinical_notes',
    },
  ];

  return (
    <InvestigationShell
      pageTitle="Investigation Category & Metadata"
      badgeCode="11.10"
      badgeLabel="Upload Flow (2/4)"
      currentStep="Metadata Config"
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

        {/* Step Progress Tracker */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 sm:p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-secondary uppercase tracking-wider">Step 2 of 4</span>
            <span className="text-outline font-mono">50% Completed</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full transition-all duration-300 w-1/2" />
          </div>
          <div className="flex items-center justify-between pt-1">
            <h2 className="text-base sm:text-lg font-bold text-on-surface">
              Investigation Category & Technical Metadata
            </h2>
            <Icon name="verified" className="text-secondary text-lg" />
          </div>
        </div>

        {/* Patient Context Chip */}
        <div className="bg-surface-container-low rounded-xl p-3 sm:p-4 border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Icon name="badge" className="text-base" />
            </div>
            <div>
              <span className="font-bold text-on-surface">
                Chinedu Okafor <span className="text-on-surface-variant font-normal">(34y M, DHA-10482)</span>
              </span>
              <div className="text-[11px] text-outline font-mono">
                Req #REQ-2025-0914 • Verified Electronic Order
              </div>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold self-start sm:self-auto">
            Active Encounter
          </span>
        </div>

        {/* Section 1: Modality Category Grid */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <h3 className="font-bold text-sm text-on-surface">1. Investigation Modality & Category</h3>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Required</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((c) => {
              const isSelected = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-xs'
                      : 'border-outline-variant/30 bg-surface hover:border-outline-variant hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container text-primary'}`}>
                      <Icon name={c.icon} className="text-lg" />
                    </div>
                    {isSelected ? (
                      <Icon name="check_circle" className="text-primary text-lg" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-outline-variant/40" />
                    )}
                  </div>
                  <span className="font-bold text-xs text-on-surface block leading-tight">{c.title}</span>
                  <span className="text-[11px] text-on-surface-variant block mt-0.5">{c.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Specific Sub-Type & Projection Angle */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="font-bold text-sm text-on-surface">2. Specific Investigation Sub-Type</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Investigation Sub-Type
              </label>
              <select
                aria-label="Investigation Sub-Type"
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-outline-variant/40 bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="Bitewing (BW-R) & Periapical (#16 Tri-Apex Combo)">
                  Bitewing (BW-R) & Periapical (#16 Tri-Apex Combo)
                </option>
                <option value="Single Periapical (#16 Root Apex)">Single Periapical (#16 Root Apex)</option>
                <option value="Bitewing Right Premolar/Molar Pair">Bitewing Right Premolar/Molar Pair</option>
                <option value="Full Mouth Periapical Series (FMX 18-Series)">Full Mouth Periapical Series (FMX 18-Series)</option>
                <option value="Occlusal View (Maxillary)">Occlusal View (Maxillary)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Projection Angle & Anatomical Alignment
              </label>
              <input
                type="text"
                value={projectionAngle}
                onChange={(e) => setProjectionAngle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-outline-variant/40 bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-[11px] text-outline mt-1 block">
                Standardized angulation with Rinn XCP alignment ring holder.
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Clinical Timestamps & Dates */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <h3 className="font-bold text-sm text-on-surface">3. Clinical Timestamps & Dates</h3>
            </div>
            <span className="font-mono text-xs bg-surface-container px-2 py-0.5 rounded text-outline">
              UTC+04:00 (GST)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-on-surface mb-1">Acquisition Date</label>
              <input
                type="text"
                value={acqDate}
                onChange={(e) => setAcqDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-outline-variant/40 bg-surface text-on-surface"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Acquisition Time</label>
              <input
                type="text"
                value={acqTime}
                onChange={(e) => setAcqTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-outline-variant/40 bg-surface text-on-surface"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-on-surface">
              <Icon name="cloud_done" className="text-secondary text-base" />
              <span>Result Received: <strong>16 Feb 2025, 09:45 GST</strong></span>
            </div>
            <span className="text-secondary font-bold text-[11px]">Immediate Sync (5m lag)</span>
          </div>
        </div>

        {/* Section 4: Provider & Diagnostic Facility */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="font-bold text-sm text-on-surface">4. Provider & Diagnostic Facility</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-on-surface mb-1">Diagnostic Provider / Clinic</label>
              <input
                type="text"
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-outline-variant/40 bg-surface text-on-surface"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Radiology Suite</label>
                <input
                  type="text"
                  value={suite}
                  onChange={(e) => setSuite(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-outline-variant/40 bg-surface text-on-surface"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Series / Ext Ref ID</label>
                <input
                  type="text"
                  value={seriesId}
                  onChange={(e) => setSeriesId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-outline-variant/40 bg-surface text-on-surface font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Radiographer / Operating Clinician</label>
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary font-bold flex items-center justify-center text-xs">
                    ZT
                  </div>
                  <div>
                    <span className="font-bold text-on-surface block">Nurse Zainab Tariq</span>
                    <span className="text-[11px] text-outline font-mono">RN-9428 • Certified Dental Radiographer</span>
                  </div>
                </div>
                <Icon name="verified_user" className="text-secondary text-base" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Equipment & Radiation Parameters Accordion */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => setRadiationAccordionOpen(!radiationAccordionOpen)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-secondary-container text-on-secondary-container">
                <Icon name="tune" className="text-base" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-on-surface">5. Equipment & Radiation Parameters</h3>
                <span className="text-[11px] text-secondary font-medium block">ALARA Compliant Protocol Verified</span>
              </div>
            </div>
            <Icon
              name="expand_more"
              className={`text-outline transition-transform ${radiationAccordionOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {radiationAccordionOpen && (
            <div className="px-5 pb-5 pt-2 border-t border-outline-variant/20 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-secondary-container text-on-secondary-container flex items-start gap-2.5">
                <Icon name="shield" className="text-secondary text-lg shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">ALADA Protocol Verified</span>
                  <p className="text-[11px] opacity-90 mt-0.5 leading-snug">
                    Radiation exposure is As Low As Diagnostically Acceptable according to UAE Federal Authority for Nuclear Regulation (FANR) standards.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase block">Machine Sensor</span>
                  <span className="font-bold text-on-surface">Dexis Titanium Digital Sensor #02</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase block">Exposure Specifications</span>
                  <span className="font-bold text-on-surface font-mono">65 kVp • 7 mA • 0.12 sec</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 6: Clinical Notes */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <h3 className="font-bold text-sm text-on-surface">6. Clinical Description & Acquisition Notes</h3>
            </div>
            <span className="text-[11px] text-outline">Clinician Entry</span>
          </div>

          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 rounded-xl border border-outline-variant/40 bg-surface-container-low focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs leading-relaxed"
          />

          <div className="flex items-center justify-between text-[11px] text-outline pt-1">
            <span className="flex items-center gap-1 text-emerald-700">
              <Icon name="spellcheck" className="text-xs" />
              Auto-saved to draft
            </span>
            <span className="font-mono">{notes.length} / 500 chars</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => {
              showToast('Saved technical parameters');
              navigate('/investigations/upload/association');
            }}
            className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-primary/95 transition-all"
          >
            <span>Proceed to Tooth & Encounter Association (11.11)</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/investigations/upload')}
            className="w-full py-2.5 text-on-surface-variant hover:text-on-surface text-xs font-semibold flex items-center justify-center transition-colors"
          >
            Back to File Selection
          </button>
        </div>
      </div>
    </InvestigationShell>
  );
}

