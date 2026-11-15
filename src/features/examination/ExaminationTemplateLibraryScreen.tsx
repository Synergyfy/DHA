import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

interface TemplateItem {
  id: string;
  title: string;
  type: 'dha' | 'clinic';
  category: 'Comprehensive' | 'Focused' | 'Periodontics' | 'Emergency' | 'Prosthodontics';
  version: string;
  badgeLabel: string;
  description: string;
  modulesCount: number;
  duration: string;
  modules: string[];
  author?: string;
  approver?: string;
  isMandatory?: boolean;
  nabidhReady?: boolean;
}

export function ExaminationTemplateLibraryScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dha' | 'clinic'>('dha');
  const [selectedFilter, setSelectedFilter] = useState<string>('All Types');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const templates: TemplateItem[] = [
    {
      id: 'tmpl-1',
      title: 'Standard Comprehensive Dental Examination',
      type: 'dha',
      category: 'Comprehensive',
      version: 'v1.0 • Mandatory Core',
      badgeLabel: 'DHA Approved Standard',
      description:
        'Complete 8-module clinical charting baseline compliant with Dubai Health Authority regulatory mandate and e-claim requirements.',
      modulesCount: 8,
      duration: '25–40 mins',
      isMandatory: true,
      nabidhReady: true,
      modules: [
        '1. Medical & Dental History',
        '2. Extraoral & TMJ Scan',
        '3. Soft Tissue & Oral Cancer',
        '4. Perio 6-Point Mapping',
        '5. Occlusion & Wear Index',
        '6. Odontogram Matrix',
        '7. Radiology Link (OPG/PA)',
        '8. ICD-10-CM Diagnosis',
      ],
    },
    {
      id: 'tmpl-2',
      title: 'Periodontal Comprehensive & Risk Evaluation',
      type: 'dha',
      category: 'Periodontics',
      version: 'v2.1',
      badgeLabel: 'Specialized Protocol',
      description:
        'Deep longitudinal charting focusing on pocket depth, recession index, furcation involvement, and automated clinical attachment loss (CAL) calculations.',
      modulesCount: 4,
      duration: '20–30 mins',
      modules: [
        '1. Systemic Risk & Smoking',
        '2. Soft Tissue / Gingival Index',
        '3. 6-Point Perio & Mobility',
        '4. Full-Mouth Bitewings / PA',
      ],
    },
    {
      id: 'tmpl-3',
      title: 'Focused Emergency / Odontalgia Protocol',
      type: 'dha',
      category: 'Emergency',
      version: 'v1.2',
      badgeLabel: 'Urgent Triage',
      description:
        'Fast-track presenting complaint logging, single-tooth cold sensitivity, percussion mapping, and single periapical radiograph link.',
      modulesCount: 3,
      duration: '8–12 mins',
      modules: [
        '1. Pain Score & History',
        '2. Single Tooth Diagnostic Matrix',
        '3. Targeted Periapical X-Ray Evaluation',
      ],
    },
    {
      id: 'tmpl-4',
      title: 'Central Branch Prosthodontic Baseline',
      type: 'clinic',
      category: 'Prosthodontics',
      version: 'v1.2 (Active)',
      badgeLabel: 'Clinic Custom • Active',
      description:
        'Customized crown, bridge, and implant abutment evaluation workflow with shade-guide photography module and lab slip connector.',
      modulesCount: 7,
      duration: '30–45 mins',
      author: 'Dr. Daniel James',
      approver: 'Dr. K. Al-Falasi (Clinical Dir.)',
      modules: [
        '1. Restorative Intake',
        '2. OVD & Free-way Space',
        '3. Edentulous Ridge Analysis',
        '4. Tooth Preparation Status',
        '5. Shade & Macro Photography',
        '6. Occlusal Scheme Verification',
        '7. Lab Slip Dispatch',
      ],
    },
    {
      id: 'tmpl-5',
      title: 'Central Branch Geriatric & Removable Prosthodontics',
      type: 'clinic',
      category: 'Comprehensive',
      version: 'v1.0 (Draft)',
      badgeLabel: 'Branch Local',
      description:
        'Tailored examination workflow for elderly patients assessing denture stability, mucosal sores, dry mouth, and root caries.',
      modulesCount: 8,
      duration: '35–50 mins',
      author: 'Dr. Daniel James',
      approver: 'Pending Approval',
      modules: [
        '1. Geriatric Medical Intake',
        '2. Salivary Flow & Dry Mouth',
        '3. Denture Stomatitis Check',
        '4. Ridge Resorption Grading',
        '5. Freeway Space Measurement',
        '6. Root Caries Odontogram',
        '7. Panoramic Bone Density',
        '8. Prosthodontic Care Plan',
      ],
    },
    {
      id: 'tmpl-6',
      title: 'Pediatric First Visit & Caries Risk Triage',
      type: 'clinic',
      category: 'Focused',
      version: 'v1.4',
      badgeLabel: 'Pediatric Care',
      description:
        'Early childhood caries assessment, fluoride varnish staging, behavioral grading (Frankl scale), and dietary sugar audit.',
      modulesCount: 5,
      duration: '15–20 mins',
      author: 'Dr. Tariq Mansoor',
      approver: 'Dr. Daniel James',
      modules: [
        '1. Diet & Fluoride History',
        '2. Frankl Behavior Scale',
        '3. Primary Dentition Odontogram',
        '4. Bitewing / Occlusal Films',
        '5. Prevention & OHI Plan',
      ],
    },
    {
      id: 'tmpl-7',
      title: 'Orthodontic Diagnostic & Cephalometric Baseline',
      type: 'clinic',
      category: 'Focused',
      version: 'v1.0',
      badgeLabel: 'Orthodontics',
      description:
        'Standardized cephalometric tracing integration, facial aesthetics photo series, study model digital scan, and Angle classification.',
      modulesCount: 6,
      duration: '25–35 mins',
      author: 'Dr. Tariq Mansoor',
      approver: 'Dr. K. Al-Falasi',
      modules: [
        '1. Facial Profile & Aesthetics',
        '2. Angle Class & Overjet/Overbite',
        '3. Spacing & Crowding Analysis',
        '4. Lateral Ceph & Panoramic',
        '5. 3D Model Intraoral Scan',
        '6. Orthodontic Treatment Plan',
      ],
    },
  ];

  const filterCategories = ['All Types', 'Comprehensive', 'Focused', 'Periodontics', 'Emergency', 'Prosthodontics'];

  const filteredTemplates = templates.filter((t) => {
    const matchesTab = t.type === activeTab;
    const matchesCategory = selectedFilter === 'All Types' || t.category === selectedFilter;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesCategory && matchesSearch;
  });

  const dhaCount = templates.filter((t) => t.type === 'dha').length;
  const clinicCount = templates.filter((t) => t.type === 'clinic').length;

  return (
    <ExaminationShell
      pageTitle="Examination Template Library"
      badgeCode="10.21"
      badgeLabel="Workflow Standards"
      currentStep="Standardised Clinical Examination Workflows"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Clinician Context Header */}
        <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <Icon name="badge" className="text-xl text-secondary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-on-surface truncate">Dr. Daniel James</span>
                <span className="text-[11px] font-mono text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-semibold">
                  #DEN-48912
                </span>
              </div>
              <span className="text-xs text-on-surface-variant truncate block">
                DHA Dental Care • Central Branch
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-semibold text-secondary">DHA Cloud Sync Active</span>
          </div>
        </section>

        {/* Primary Controls & Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-on-surface">Template Library</h2>
            <p className="text-xs text-on-surface-variant">Standardised clinical examination schemas & workflows</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/examination/templates/create')}
            className="w-full sm:w-auto h-11 px-4 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
          >
            <Icon name="add" className="text-base" />
            <span>Create Template (10.22)</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <Icon name="search" className="absolute left-3.5 top-3 text-outline text-lg" />
          <input
            type="text"
            placeholder="Search templates by protocol, specialty, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-10 rounded-2xl bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline shadow-sm border border-outline-variant/30 focus:outline-none focus:border-primary"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-outline hover:text-on-surface"
            >
              <Icon name="close" className="text-base" />
            </button>
          )}
        </div>

        {/* Segmented Tab Switcher */}
        <div className="p-1 bg-surface-container rounded-2xl flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('dha')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'dha'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="verified_user" className="text-base" />
            <span>DHA Standard</span>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold">
              {dhaCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('clinic')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'clinic'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="domain" className="text-base" />
            <span>Clinic-Specific</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-mono font-bold">
              {clinicCount}
            </span>
          </button>
        </div>

        {/* Secondary Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                selectedFilter === cat
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tab Context Alert */}
        {activeTab === 'dha' ? (
          <div className="p-4 rounded-2xl bg-secondary-container/40 flex items-start gap-3 shadow-sm border border-secondary/20">
            <Icon name="security" className="text-secondary text-2xl shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs">
              <span className="font-bold text-on-secondary-container block">Statutory DHA Protocols (NABIDH Compliant)</span>
              <p className="text-on-surface-variant leading-relaxed">
                Locked official baselines audited for clinical licensing compliance across the Emirate of Dubai. Cannot be altered directly; duplicate to clinic custom to modify.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-primary/10 flex items-start gap-3 shadow-sm border border-primary/20">
            <Icon name="domain" className="text-primary text-2xl shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs">
              <span className="font-bold text-primary block">Central Branch Custom Protocols</span>
              <p className="text-on-surface-variant leading-relaxed">
                Tailored workflows authored by Central Branch clinicians and approved by Medical Direction. Subject to versioning safeguards.
              </p>
            </div>
          </div>
        )}

        {/* Templates Cards Grid */}
        <div className="space-y-4">
          {filteredTemplates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="p-5 space-y-3">
                {/* Badge row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold flex items-center gap-1">
                      <Icon name="verified" className="text-xs text-secondary" />
                      <span>{tmpl.badgeLabel}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-mono text-[11px] font-bold">
                      {tmpl.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-on-surface-variant">{tmpl.version}</span>
                </div>

                {/* Title & description */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-on-surface">{tmpl.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1">{tmpl.description}</p>
                </div>

                {/* Micro Graphic Modules Preview */}
                <div className="p-3 rounded-xl bg-surface-container-low space-y-2 border border-outline-variant/20">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-on-surface flex items-center gap-1.5">
                      <Icon name="view_quilt" className="text-sm text-primary" />
                      <span>Included Modules ({tmpl.modulesCount})</span>
                    </span>
                    <span className="text-secondary font-semibold flex items-center gap-1">
                      <Icon name="timer" className="text-xs" />
                      <span>{tmpl.duration}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-on-surface-variant">
                    {tmpl.modules.map((m) => (
                      <div key={m} className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="truncate">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Author & Review Metadata if Clinic */}
                {tmpl.author && (
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 border-t border-outline-variant/20 flex-wrap gap-2">
                    <span>Author: <strong className="text-on-surface">{tmpl.author}</strong></span>
                    <span>Sign-off: <strong className="text-secondary">{tmpl.approver}</strong></span>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="bg-surface-container-low px-5 py-3 flex items-center justify-between gap-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => navigate('/examination/templates/preview')}
                  className="px-3 py-1.5 rounded-lg text-primary hover:bg-surface-container text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Icon name="visibility" className="text-sm" />
                  <span>Preview Schema (10.23)</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showToast(`Template "${tmpl.title}" duplicated to drafts`)}
                    title="Duplicate to Clinic Custom"
                    className="w-9 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors"
                  >
                    <Icon name="content_copy" className="text-base" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      showToast(`Applied template: ${tmpl.title}`);
                      navigate('/examination/workspace');
                    }}
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Icon name="clinical_notes" className="text-sm" />
                    <span>Use Template</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Governance Safeguards Footer */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex items-start gap-3">
          <Icon name="policy" className="text-outline text-xl shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <span className="font-bold text-on-surface block">Template Safeguards & Governance</span>
            <p className="text-on-surface-variant leading-relaxed">
              Templates cannot bypass mandatory patient consent, eliminate dentist electronic signatures, or convert unassessed diagnostic findings into normal findings automatically. All branch additions remain subject to clinical audit review under DHA Rule SEC10-REG04.
            </p>
          </div>
        </section>

        {/* Quick Nav Footer to Permissions & Admin */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/examination/workspace')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Icon name="arrow_back" className="text-sm" />
            <span>Workspace</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/examination/templates/permissions')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Icon name="admin_panel_settings" className="text-sm" />
            <span>Manage Template Access (10.24)</span>
          </button>
        </div>
      </div>
    </ExaminationShell>
  );
}

export default ExaminationTemplateLibraryScreen;

