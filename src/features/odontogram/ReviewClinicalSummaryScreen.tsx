import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OdontogramShell } from './OdontogramShell';
import { Icon } from '../../design/Primitives';

interface ToothSummaryItem {
  id: string;
  fdi: string;
  name: string;
  status: 'Caries' | 'Restored' | 'Observe' | 'Missing' | 'Sound';
  badgeColor: string;
  surfaces?: string;
  diagnosis: string;
  plan: string;
  radiographRef?: string;
  urgency: 'Immediate' | 'Scheduled' | 'Routine' | 'None';
}

const toothSummaries: ToothSummaryItem[] = [
  {
    id: '16',
    fdi: '#16',
    name: 'Upper Right 1st Molar',
    status: 'Caries',
    badgeColor: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
    surfaces: 'Distal-Occlusal (DO)',
    diagnosis: 'Active dentinal caries penetrating inner enamel boundary (ICDAS 4). Early sensitivity to thermal stimuli.',
    plan: 'Indirect composite restoration / ceramic overlay recommended. Direct capping if excavation requires.',
    radiographRef: 'Bitewing BW-2025-01 (14 Feb 2025)',
    urgency: 'Scheduled',
  },
  {
    id: '21',
    fdi: '#21',
    name: 'Upper Left Central Incisor',
    status: 'Restored',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    surfaces: 'Mesio-Incisal (MI)',
    diagnosis: 'Existing resin composite restoration (placed 2022). Margins intact, no marginal discoloration or secondary leakage.',
    plan: 'Annual routine recall polishing. No restorative intervention indicated at present.',
    radiographRef: 'Periapical PA-2025-02 (14 Feb 2025)',
    urgency: 'Routine',
  },
  {
    id: '46',
    fdi: '#46',
    name: 'Lower Right 1st Molar',
    status: 'Observe',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    surfaces: 'Occlusal Pit (O)',
    diagnosis: 'Incipient enamel demineralization in central fissure (ICDAS 1-2). Cold test positive within normal limits.',
    plan: 'High-fluoride varnish (5% NaF) topical application. Re-assess with intraoral camera at 6-month recall.',
    radiographRef: 'Bitewing BW-2025-01 (14 Feb 2025)',
    urgency: 'Routine',
  },
  {
    id: '18',
    fdi: '#18',
    name: 'Upper Right 3rd Molar',
    status: 'Missing',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    diagnosis: 'Clinically absent / developmentally missing. Confirmed by OPG panorex.',
    plan: 'No intervention required.',
    radiographRef: 'Panoramic OPG-2025-01 (14 Feb 2025)',
    urgency: 'None',
  },
  {
    id: '48',
    fdi: '#48',
    name: 'Lower Right 3rd Molar',
    status: 'Missing',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    diagnosis: 'Surgically extracted in 2021 (documented in DHA dental archive). Healing uneventful.',
    plan: 'No action needed.',
    urgency: 'None',
  },
];

export function ReviewClinicalSummaryScreen() {
  const navigate = useNavigate();
  const [selectedToothId, setSelectedToothId] = useState<string>('16');
  const [attested, setAttested] = useState<boolean>(true);
  const [clinicianPin, setClinicianPin] = useState<string>('4891');
  const [expandedSection, setExpandedSection] = useState<'perio' | 'stomatology' | 'audit' | null>('perio');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const selectedTooth = toothSummaries.find((t) => t.id === selectedToothId) || toothSummaries[0];

  const handleSealAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attested) return;
    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/odontogram/confirmation');
    }, 400);
  };

  return (
    <OdontogramShell
      pageTitle="Review & Clinical Summary"
      badgeCode="9.7"
      badgeLabel="Pre-Submission Audit"
    >
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-container to-secondary p-6 text-white shadow-lg">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm tracking-wide uppercase">
                  Section 9.7 • Final Verification
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                  Draft Audit Passed
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Review & Clinical Summary</h1>
              <p className="mt-1 text-sm text-blue-100 max-w-2xl">
                Inspect all documented tooth pathology, diagnostic investigation associations, and soft tissue assessments prior to cryptographic sealing in the DHA national registry.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/odontogram/investigations"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur text-white transition-colors"
              >
                <Icon name="arrow_back" className="text-base" />
                <span>Back to Investigations</span>
              </Link>
              <Link
                to="/odontogram/history"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-primary hover:bg-white/90 shadow transition-colors"
              >
                <Icon name="history" className="text-base" />
                <span>Patient History</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Primary 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Tooth Summary Strip, Selected Detail, Periodontal & Stomatology */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tooth Archetype Strip */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="dentistry" className="text-primary text-xl" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Active Odontogram Findings</h2>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {toothSummaries.length} focal conditions flagged
                </span>
              </div>

              {/* Horizontal Tooth Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {toothSummaries.map((tooth) => {
                  const isSelected = tooth.id === selectedToothId;
                  return (
                    <button
                      key={tooth.id}
                      onClick={() => setSelectedToothId(tooth.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20 dark:bg-primary/10'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">{tooth.fdi}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold border ${tooth.badgeColor}`}>
                          {tooth.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium truncate">{tooth.name}</p>
                      {tooth.surfaces && (
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-0.5 truncate">{tooth.surfaces}</p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Tooth Deep Dive */}
              <div className="mt-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 p-4.5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono font-extrabold text-base">
                      {selectedTooth.fdi}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{selectedTooth.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Surfaces: <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedTooth.surfaces || 'None / Intact'}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${selectedTooth.badgeColor}`}>
                      {selectedTooth.status}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      Urgency: {selectedTooth.urgency}
                    </span>
                  </div>
                </div>

                <div className="mt-3.5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider block mb-1">
                      Clinical Finding & ICDAS
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{selectedTooth.diagnosis}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider block mb-1">
                      Recommended Treatment Plan
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{selectedTooth.plan}</p>
                  </div>
                </div>

                {selectedTooth.radiographRef && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Icon name="image" className="text-primary text-sm" />
                      <span>Evidence: <strong>{selectedTooth.radiographRef}</strong></span>
                    </div>
                    <Link
                      to="/odontogram/investigations"
                      className="text-primary hover:underline font-medium text-xs inline-flex items-center gap-1"
                    >
                      <span>View Radiograph</span>
                      <Icon name="arrow_forward" className="text-xs" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Periodontal Triage Accordion */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <button
                onClick={() => setExpandedSection(expandedSection === 'perio' ? null : 'perio')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
                    <Icon name="monitoring" className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Periodontal Assessment Triage</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Mean probing depth: 2.1mm • Bleeding on probing: 12%</p>
                  </div>
                </div>
                <Icon
                  name="expand_more"
                  className={`text-slate-400 transition-transform duration-200 ${expandedSection === 'perio' ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedSection === 'perio' && (
                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">Probing Depth</span>
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">2.1 mm</div>
                    <span className="text-[10px] text-emerald-600 font-medium">Within normal limits</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">BOP Score</span>
                    <div className="text-lg font-extrabold text-amber-600 mt-0.5">12%</div>
                    <span className="text-[10px] text-amber-600 font-medium">Mild gingival bleeding</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">Plaque Index</span>
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">18%</div>
                    <span className="text-[10px] text-emerald-600 font-medium">Good hygiene</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">Furcation</span>
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">Grade 0</div>
                    <span className="text-[10px] text-slate-500 font-medium">No involvement</span>
                  </div>
                </div>
              )}
            </div>

            {/* Stomatology / General Findings Accordion */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <button
                onClick={() => setExpandedSection(expandedSection === 'stomatology' ? null : 'stomatology')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                    <Icon name="face" className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Stomatology & Occlusal Relationships</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Class I molar relationship • Normal mucosa • Bilateral tori</p>
                  </div>
                </div>
                <Icon
                  name="expand_more"
                  className={`text-slate-400 transition-transform duration-200 ${expandedSection === 'stomatology' ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedSection === 'stomatology' && (
                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/60 space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Icon name="check_circle" className="text-emerald-500 text-base mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">Dentition & Occlusion:</strong>
                      <span className="text-slate-600 dark:text-slate-300 ml-1">Class I molar relationship bilaterally. Mild anterior mandibular crowding without functional interference.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Icon name="check_circle" className="text-emerald-500 text-base mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">Temporomandibular Joint (TMJ):</strong>
                      <span className="text-slate-600 dark:text-slate-300 ml-1">Right clicking on wide opening. Maximal opening 44mm. Non-painful, asymptomatic, no deviation.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Icon name="check_circle" className="text-emerald-500 text-base mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">Oral Mucosa:</strong>
                      <span className="text-slate-600 dark:text-slate-300 ml-1">Palate, floor of mouth, buccal mucosa, and tongue pink, moist, free of ulcerations, lesions or keratosis.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Icon name="info" className="text-blue-500 text-base mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">Bony Outgrowths:</strong>
                      <span className="text-slate-600 dark:text-slate-300 ml-1">Mild bilateral lingual mandibular tori adjacent to premolars. Physiological variant, asymptomatic.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (4 cols): Attestation, Completeness Validation, Action Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Completeness Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Examination Completeness</h3>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  94% (30/32 teeth)
                </span>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
                <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: '94%' }} />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Icon name="check" className="text-emerald-500 text-sm" /> Full Arch Caries Charting
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">Complete</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Icon name="check" className="text-emerald-500 text-sm" /> Radiographic Cross-Link
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">3 Linked</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Icon name="check" className="text-emerald-500 text-sm" /> Periodontal Screening
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">PSR / Full</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Icon name="check" className="text-emerald-500 text-sm" /> Soft Tissue Pathology Screen
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">Negative</span>
                </div>
              </div>
            </div>

            {/* Clinician Signature & Attestation Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Icon name="verified_user" className="text-primary text-lg" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Clinician Attestation</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">DHA Health Regulation Sector</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <p>
                  I hereby attest that the findings recorded in this electronic odontogram are true, accurate, and documented in conformity with DHA Clinical Dental Guidelines v3.4.
                </p>
                <div className="mt-2 text-[11px] font-mono text-slate-500">
                  Attending: Dr. Daniel Example • Lic #DEN-48912
                </div>
              </div>

              <form onSubmit={handleSealAndSubmit} className="space-y-4">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={attested}
                    onChange={(e) => setAttested(e.target.checked)}
                    className="mt-0.5 rounded text-primary focus:ring-primary h-4 w-4 border-slate-300 dark:border-slate-700"
                  />
                  <span>I confirm clinical accuracy and authorize permanent registry sealing.</span>
                </label>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Clinician PIN / Digital Signature
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      maxLength={4}
                      value={clinicianPin}
                      onChange={(e) => setClinicianPin(e.target.value)}
                      placeholder="Enter 4-digit PIN"
                      className="w-full px-3 py-2 pl-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono tracking-widest text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Icon name="lock" className="absolute left-3 top-2.5 text-slate-400 text-sm" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!attested || clinicianPin.length < 4 || isSubmitting}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="sync" className="animate-spin text-base" />
                      <span>Sealing Record...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="lock" className="text-base" />
                      <span>Approve Summary & Seal Odontogram</span>
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 text-center">
                <Link
                  to="/odontogram/overview"
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors inline-flex items-center gap-1"
                >
                  <Icon name="edit" className="text-xs" />
                  <span>Return to Draft Editor</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OdontogramShell>
  );
}
export default ReviewClinicalSummaryScreen;
