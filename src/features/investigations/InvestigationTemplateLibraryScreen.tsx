import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

interface TemplateItem {
  id: string;
  title: string;
  category: 'dha' | 'clinic';
  categoryLabel: string;
  version: string;
  modality: 'radiography' | 'cbct' | 'pathology' | 'photography';
  modalityLabel: string;
  modalityIcon: string;
  parameters: string;
  mandatoryPrompts: string[];
  encountersCount: number;
  authorInfo: string;
  turnaroundTarget?: string;
  fhirProfile: string;
}

export function InvestigationTemplateLibraryScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'dha' | 'clinic'>('dha');
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [previewModalTemplate, setPreviewModalTemplate] = useState<TemplateItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const templates: TemplateItem[] = [
    {
      id: 'tpl-1',
      title: 'Standard Intraoral Caries & Periapical Assessment',
      category: 'dha',
      categoryLabel: 'DHA Approved Baseline',
      version: 'v2.1 Active',
      modality: 'radiography',
      modalityLabel: 'Dental Radiography (Bitewing BW-R + Targeted PA)',
      modalityIcon: 'dentistry',
      parameters: '2 Views • 65 kVp, 7 mA • Dexis Sensor #2',
      mandatoryPrompts: [
        'ICD-10 Coding (K02.62 Caries of dentin)',
        'Universal FDI tooth coordinate tagging',
        'Pulp clearance distance caliper calibration',
      ],
      encountersCount: 184,
      authorInfo: '15 Jan 2025 • Dr. Daniel James',
      fhirProfile: 'urn:dha:radiology:v2.1:protocol-std-caries',
    },
    {
      id: 'tpl-2',
      title: 'Pre-Implant 3D CBCT Surgical Workup',
      category: 'dha',
      categoryLabel: 'DHA Standard Baseline',
      version: 'v1.4 Active',
      modality: 'cbct',
      modalityLabel: 'CBCT 3D Maxillofacial Diagnostic',
      modalityIcon: 'view_in_ar',
      parameters: 'FOV 8x8cm • 80μm High-Res Voxel • MPR Sync',
      mandatoryPrompts: [
        'Sinus floor clearance distance margin (> 1.5mm)',
        'Inferior alveolar nerve (IAN) computerized canal tracing',
        'Pregnancy screening & ALARA justification signed',
      ],
      encountersCount: 96,
      authorInfo: '08 Feb 2025 • Radiographic Board',
      fhirProfile: 'urn:dha:radiology:v1.4:cbct-implant-planning',
    },
    {
      id: 'tpl-3',
      title: 'Pre-Surgical Bleeding & Coagulation Panel',
      category: 'dha',
      categoryLabel: 'DHA Standard Baseline',
      version: 'v3.0 Active',
      modality: 'pathology',
      modalityLabel: 'Laboratory Hematology Panel',
      modalityIcon: 'bloodtype',
      parameters: 'Analytes: PT/INR, Platelets, FBC, HbA1c, Ferritin',
      mandatoryPrompts: [
        'Mandatory fasting status confirmation',
        'Anticoagulant therapy disclosure check',
        'Turnaround time SLA: 3.5 hrs',
      ],
      encountersCount: 142,
      authorInfo: 'Updated 2025 • Pathology Ref',
      turnaroundTarget: 'Lab ETA: 3.5 hrs',
      fhirProfile: 'urn:dha:laboratory:v3.0:coag-panel',
    },
    {
      id: 'tpl-4',
      title: 'Central Branch Emergency Odontalgia Protocol',
      category: 'clinic',
      categoryLabel: 'Clinic Custom • Central Branch',
      version: 'v1.2 Active',
      modality: 'radiography',
      modalityLabel: 'Fast-Track PA + Cold Vitality Test',
      modalityIcon: 'speed',
      parameters: 'Target Tooth + Opposing & Adjacent Contacts',
      mandatoryPrompts: [
        'Chairside cold test thermal response logging',
        'High-contrast endodontic apex PA angle',
        'STAT Turnaround Target: < 15 Mins',
      ],
      encountersCount: 78,
      authorInfo: 'Managed by Central Clinic Dental Team',
      turnaroundTarget: '< 15 Mins STAT',
      fhirProfile: 'urn:dha:clinic:v1.2:emergency-odontalgia',
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredTemplates = templates.filter((tpl) => {
    const matchesCategory = tpl.category === selectedCategory;
    const matchesModality = selectedModality === 'all' || tpl.modality === selectedModality;
    const matchesSearch =
      searchQuery === '' ||
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.parameters.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.mandatoryPrompts.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesModality && matchesSearch;
  });

  return (
    <InvestigationShell
      pageTitle="Investigation Template Library"
      badgeCode="11.27"
      badgeLabel="Diagnostic Protocols"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="TPL-2025-0914"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Subtitle & Quick CTA Header Area */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Standardized Diagnostic Protocols</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
              DHA clinical preset templates & ALARA-compliant order configurations
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/investigations/templates/create')}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="add" className="text-base" />
              <span>Create Protocol Template (11.28)</span>
            </button>
          </div>
        </section>

        {/* Search & Segmented Switch Bar */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-outline-variant/40 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search Input */}
            <div className="relative w-full flex-1">
              <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search protocols, modality parameters, ICD-10 codes..."
                className="w-full h-11 pl-10 pr-10 bg-surface rounded-xl text-xs font-medium text-on-surface placeholder:text-outline border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <Icon name="close" className="text-base" />
                </button>
              )}
            </div>

            {/* Segmented Tab Switch: DHA Standard vs Clinic-Specific */}
            <div className="p-1 bg-surface-container-low rounded-xl flex items-center border border-outline-variant/30 text-xs w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => setSelectedCategory('dha')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedCategory === 'dha'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>DHA Standard</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary font-mono">8</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('clinic')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedCategory === 'clinic'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>Clinic-Specific</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-surface-container text-on-surface-variant font-mono">5</span>
              </button>
            </div>
          </div>

          {/* Modality Filter Horizontal Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 text-xs">
            {[
              { id: 'all', label: 'All Modalities' },
              { id: 'radiography', label: 'Radiography (X-Ray)' },
              { id: 'cbct', label: 'CBCT 3D' },
              { id: 'pathology', label: 'Pathology & Bloods' },
              { id: 'photography', label: 'Clinical Photography' },
            ].map((mod) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => setSelectedModality(mod.id)}
                className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                  selectedModality === mod.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/30'
                }`}
              >
                {mod.label}
              </button>
            ))}
          </div>
        </section>

        {/* Protocols Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="p-5 flex flex-col space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold">
                      <Icon name="verified" className="text-xs" />
                      {tpl.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-mono font-medium">
                      {tpl.version}
                    </span>
                  </div>

                  {tpl.turnaroundTarget && (
                    <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      {tpl.turnaroundTarget}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-on-surface tracking-tight">{tpl.title}</h3>

                {/* Modality & Parameters Snapshot */}
                <div className="bg-surface-container-low/70 rounded-xl p-3 border border-outline-variant/20 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-on-surface font-semibold">
                    <Icon name={tpl.modalityIcon} className="text-base text-primary" />
                    <span>{tpl.modalityLabel}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant pl-6 font-mono">{tpl.parameters}</p>
                </div>

                {/* Mandatory Prompts Block */}
                <div className="bg-surface-container-low/40 rounded-xl p-3 space-y-1.5 text-xs border border-outline-variant/20">
                  <div className="flex items-center gap-1.5 text-primary font-bold">
                    <Icon name="rule" className="text-sm" />
                    <span>Mandatory Clinical Protocol Prompts:</span>
                  </div>
                  <ul className="text-[11px] text-on-surface-variant space-y-1 pl-5 list-disc">
                    {tpl.mandatoryPrompts.map((prompt, i) => (
                      <li key={i}>{prompt}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-[11px] text-outline pt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <Icon name="trending_up" className="text-xs text-secondary" />
                    {tpl.encountersCount} encounters this month
                  </span>
                  <span className="truncate max-w-[160px]">{tpl.authorInfo}</span>
                </div>
              </div>

              {/* Action Footer Strip */}
              <div className="bg-surface-container-low/50 px-5 py-3 border-t border-outline-variant/20 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPreviewModalTemplate(tpl)}
                    className="px-3 py-1.5 rounded-lg text-primary hover:bg-surface-container font-semibold text-xs flex items-center gap-1 transition-colors"
                  >
                    <Icon name="visibility" className="text-sm" />
                    <span>View Schema</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast(`Protocol '${tpl.title}' duplicated into Clinic Custom Drafts.`)}
                    className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container font-semibold text-xs flex items-center gap-1 transition-colors"
                  >
                    <Icon name="content_copy" className="text-sm" />
                    <span>Duplicate</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    showToast(`Loaded ${tpl.title} into new investigation order draft.`);
                    navigate('/investigations/create');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center gap-1 shadow-sm hover:bg-primary/95 transition-all"
                >
                  <span>Use in Order</span>
                  <Icon name="arrow_forward" className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Governance & Clinical Compliance Alert */}
        <section className="rounded-2xl p-5 bg-surface-container-low border border-primary/20 flex items-start gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Icon name="verified_user" className="text-xl" />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-sm text-on-surface">Template Safeguards & Regulatory Governance</h4>
            <p className="text-on-surface-variant leading-relaxed">
              Templates enforce mandatory clinician electronic signatures and ALARA/ALADA radiation justifications.
              Statutory DHA baseline protocols are locked and verified by the Nigeria Federal Radiation Board.
            </p>
          </div>
        </section>

        {/* Modal: Interactive Schema Preview */}
        {previewModalTemplate && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface rounded-2xl max-w-lg w-full shadow-2xl border border-outline-variant/40 overflow-hidden animate-scaleIn space-y-4">
              <div className="p-5 bg-surface-container-low border-b border-outline-variant/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
                    <Icon name="schema" className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">{previewModalTemplate.title}</h3>
                    <p className="text-xs text-on-surface-variant">{previewModalTemplate.version} &bull; FHIR DiagnosticOrder</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewModalTemplate(null)}
                  className="p-1 rounded-lg hover:bg-surface-container text-outline"
                >
                  <Icon name="close" className="text-lg" />
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <div>
                  <span className="font-semibold text-primary block mb-1">FHIR Resource URI:</span>
                  <code className="block font-mono text-[11px] bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/30 text-on-surface break-all">
                    {previewModalTemplate.fhirProfile}
                  </code>
                </div>

                <div>
                  <span className="font-semibold text-on-surface block mb-1.5">Required Clinical Pre-conditions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-secondary-container text-on-secondary-container font-semibold">
                      ALARA Justification
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-secondary-container text-on-secondary-container font-semibold">
                      Pregnancy Triage
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-secondary-container text-on-secondary-container font-semibold">
                      FDI 2-Digit Notation
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-secondary-container text-on-secondary-container font-semibold">
                      SHA-256 Sign-off
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                  <span className="font-bold text-on-surface block">Calibration Standard:</span>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    Exposures must calibrate against National Dental Radiation Protection Guidance Bulletin 2024-C with focal spot &le; 0.7mm.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewModalTemplate(null)}
                  className="px-4 py-2 rounded-xl font-semibold text-xs bg-surface hover:bg-surface-container text-on-surface"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewModalTemplate(null);
                    showToast('FHIR Protocol JSON schema exported to clipboard.');
                  }}
                  className="px-4 py-2 rounded-xl font-bold text-xs bg-primary text-on-primary hover:bg-primary/95 shadow-sm"
                >
                  Export JSON
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Strip */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <Icon name="verified" className="text-secondary text-base" />
            <span className="font-semibold text-on-surface">Compliance Verified:</span>
            <span className="text-on-surface-variant">All templates aligned with Nigeria Dental Health Authority clinical guidelines.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/investigations/directory')}
              className="px-3.5 py-2 rounded-xl font-bold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="badge" className="text-sm" />
              <span>Provider Directory (11.26)</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/investigations/templates/create')}
              className="px-3.5 py-2 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="add" className="text-sm" />
              <span>New Template Wizard (11.28)</span>
            </button>
          </div>
        </section>
      </div>
    </InvestigationShell>
  );
}

