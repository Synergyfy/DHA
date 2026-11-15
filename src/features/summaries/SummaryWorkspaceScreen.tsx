import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

export function SummaryWorkspaceScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'findings' | 'plan'>('all');
  const [excursiveChecked, setExcursiveChecked] = useState<boolean>(false);
  const [advisoryDismissed, setAdvisoryDismissed] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <SummaryShell
      pageTitle="Clinical Summary Workspace"
      badgeCode="12.5"
      badgeLabel="Workspace Co-Pilot"
      currentStep="Draft v1.0 Workspace"
    >
      <div className="space-y-6">
        {/* Top Progress & Status Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2 px-4 rounded-xl bg-white border border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006194] animate-pulse"></span>
            <span className="text-xs font-bold text-[#006194] uppercase tracking-wider">
              Workspace Live Sync Active
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#707881]">
            <span>DOC-ID: DHA-CS-9842</span>
            <span>•</span>
            <span className="text-[#006a61] font-semibold">Auto-saved 1m ago</span>
          </div>
        </div>

        {/* Document Meta & AI Draft Header Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1.5 bg-[#e2e7ff] text-[#006194] px-3 py-1 rounded-full text-xs font-bold">
              <Icon name="auto_awesome" className="text-[16px]" />
              <span>AI DRAFT v1.0 • UNAPPROVED</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f3ff] text-[#707881] text-xs font-mono">
              <Icon name="lock_open" className="text-[14px]" />
              <span>Dentist Drafting Mode</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e]">
              Comprehensive Oral-Health Clinical Summary
            </h2>
            <p className="text-xs sm:text-sm text-[#707881] mt-1 leading-relaxed">
              Synthesized diagnostic brief combining patient chart, digital bitewings, periodontal probe matrix,
              and ICD-10 dental pathology criteria for clinician sign-off.
            </p>
          </div>

          {/* Patient & Clinician Metadata Matrix */}
          <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#006194] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                AO
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#131b2e]">Amara Okafor</h4>
                <span className="text-[#707881]">34y Female • DHA-2026-00451</span>
                <span className="block text-[11px] font-mono text-[#006194] mt-0.5">
                  Encounter: #EXAM-2026-1048
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:border-l sm:border-[#eaedff] sm:pl-4">
              <div className="w-11 h-11 rounded-2xl bg-[#86f2e4] text-[#006a61] flex items-center justify-center shrink-0">
                <Icon name="stethoscope" className="text-[20px]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#131b2e]">Dr. Daniel James (#DEN-48912)</h4>
                <span className="text-[#707881]">Harmony Dental Clinic • Wuse 2</span>
                <span className="block text-[11px] font-mono text-[#006a61] mt-0.5">
                  Sign-off Pending
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Safeguard Alert Card */}
        <div className="bg-[#ffdad6]/60 border border-[#ffdad6] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="warning" className="text-[22px]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-bold text-[#ba1a1a]">Medical History Safeguard</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white text-[#ba1a1a]">
                  Critical Alert
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#93000a] leading-relaxed">
                <strong>Penicillin Allergy (Severe)</strong> • Mild Asthma. Extreme caution required with antibiotic
                prophylaxis and post-op prescriptions.
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-[#93000a]">
                <Icon name="history" className="text-[15px]" />
                <span>Verified clinical intake • Section 2 Medical History</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => showToast('Quick document editor enabled for all sections.')}
            className="flex items-center gap-1.5 bg-white border border-[#eaedff] px-3.5 py-2 rounded-xl text-xs font-bold text-[#006194] hover:bg-[#f2f3ff] transition-colors shrink-0 shadow-xs"
          >
            <Icon name="edit_note" className="text-[16px]" />
            <span>Edit Document</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Regenerating Section 5: AI Diagnostic Correlation...')}
            className="flex items-center gap-1.5 bg-white border border-[#eaedff] px-3.5 py-2 rounded-xl text-xs font-bold text-[#006a61] hover:bg-[#f2f3ff] transition-colors shrink-0 shadow-xs"
          >
            <Icon name="sync" className="text-[16px]" />
            <span>Regenerate Section</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Clinician comment block appended.')}
            className="flex items-center gap-1.5 bg-white border border-[#eaedff] px-3.5 py-2 rounded-xl text-xs font-bold text-[#3f4850] hover:bg-[#f2f3ff] transition-colors shrink-0 shadow-xs"
          >
            <Icon name="add_comment" className="text-[16px]" />
            <span>Add Clinician Note</span>
          </button>
          <button
            type="button"
            onClick={() => {
              showToast('Draft validated and queued for final practitioner sign-off.');
              navigate('/summaries/dashboard');
            }}
            className="flex items-center gap-1.5 bg-[#006194] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#007bb9] transition-all shrink-0 shadow-xs"
          >
            <Icon name="task_alt" className="text-[16px]" />
            <span>Submit Draft →</span>
          </button>
        </div>

        {/* Workspace Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-[#eaedff] pb-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'all'
                ? 'bg-[#006194] text-white'
                : 'text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            All Sections (7)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('findings')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'findings'
                ? 'bg-[#006194] text-white'
                : 'text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            Diagnostic Findings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('plan')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'plan'
                ? 'bg-[#006194] text-white'
                : 'text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            Treatment &amp; Directives
          </button>
        </div>

        {/* Clinical Sections Accordion / Cards List */}
        <div className="space-y-4">
          {/* Section 1: Presenting Complaint */}
          {(activeTab === 'all' || activeTab === 'findings') && (
            <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#e2e7ff] text-[#006194] font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                    Patient Overview &amp; Chief Complaint
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingSection(editingSection === 1 ? null : 1)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f2f3ff] text-[#707881] hover:text-[#006194] flex items-center justify-center transition-colors"
                  aria-label="Edit section 1"
                >
                  <Icon name="edit" className="text-[18px]" />
                </button>
              </div>

              {editingSection === 1 ? (
                <div className="space-y-2">
                  <textarea
                    defaultValue="34-year-old female presents for scheduled restorative evaluation complaining of mild cold sensitivity on right upper quadrant. Discomfort is transient, resolving in under 5 seconds without lingering throbbing pain."
                    rows={3}
                    className="w-full text-xs sm:text-sm p-3 border border-[#eaedff] rounded-xl focus:ring-2 focus:ring-[#006194]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingSection(null)}
                      className="px-3 py-1 text-xs font-bold text-[#707881]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSection(null);
                        showToast('Section 1 updated.');
                      }}
                      className="px-3 py-1 text-xs font-bold bg-[#006194] text-white rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-[#131b2e] leading-relaxed">
                  34-year-old female presents for scheduled restorative evaluation complaining of mild cold
                  sensitivity on right upper quadrant. Discomfort is transient, resolving in under 5 seconds
                  without lingering throbbing pain.
                </p>
              )}

              <div className="bg-[#faf8ff] rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs border border-[#eaedff]">
                <div className="flex items-center gap-1.5 text-[#3f4850]">
                  <Icon name="verified_user" className="text-[#006a61] text-[16px]" />
                  <span>Source: Sec 10 Clinical Exam (12 Oct 2026)</span>
                </div>
                <span className="bg-[#e2e7ff] text-[#006194] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  Verified Source
                </span>
              </div>
            </div>
          )}

          {/* Section 2: Odontogram & Tooth Findings */}
          {(activeTab === 'all' || activeTab === 'findings') && (
            <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#e2e7ff] text-[#006194] font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                    Odontogram &amp; Tooth Findings
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingSection(editingSection === 2 ? null : 2)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f2f3ff] text-[#707881] hover:text-[#006194] flex items-center justify-center transition-colors"
                  aria-label="Edit section 2"
                >
                  <Icon name="edit" className="text-[18px]" />
                </button>
              </div>

              {/* Visual Tooth Chips */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#ffdad6]/40 border border-[#ffdad6] rounded-xl p-3 text-center">
                  <span className="text-xs font-mono font-bold text-[#006194] block">FDI #16</span>
                  <span className="text-xs font-bold text-[#ba1a1a] block mt-0.5">MO Caries</span>
                  <span className="text-[11px] text-[#707881] font-mono">ICDAS 3/4</span>
                </div>
                <div className="bg-[#faf8ff] border border-[#eaedff] rounded-xl p-3 text-center">
                  <span className="text-xs font-mono font-bold text-[#131b2e] block">FDI #15</span>
                  <span className="text-xs font-bold text-[#006a61] block mt-0.5">Sound</span>
                  <span className="text-[11px] text-[#707881] font-mono">Distal Watch</span>
                </div>
                <div className="bg-[#faf8ff] border border-[#eaedff] rounded-xl p-3 text-center">
                  <span className="text-xs font-mono font-bold text-[#131b2e] block">FDI #46</span>
                  <span className="text-xs font-bold text-[#006a61] block mt-0.5">Restored</span>
                  <span className="text-[11px] text-[#707881] font-mono">Composite OK</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#131b2e] leading-relaxed">
                FDI #16 displays active mesio-occlusal cavitated dentinal caries with shadowed undermining
                enamel. Occlusal margins intact on neighboring premolar #15. Antagonist mandibular molar #46
                presents intact sound composite restoration without occlusal disharmony.
              </p>

              <div className="bg-[#faf8ff] rounded-xl p-3 flex items-center justify-between text-xs border border-[#eaedff]">
                <div className="flex items-center gap-1.5 text-[#3f4850]">
                  <Icon name="grid_view" className="text-[#006194] text-[16px]" />
                  <span>Sec 9 Odontogram Chart Matrix</span>
                </div>
                <span className="bg-[#86f2e4] text-[#006f66] font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                  3 Teeth Indexed
                </span>
              </div>
            </div>
          )}

          {/* Section 3: Periodontal & Soft Tissue */}
          {(activeTab === 'all' || activeTab === 'findings') && (
            <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#e2e7ff] text-[#006194] font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                    Periodontal &amp; Soft Tissue Architecture
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingSection(editingSection === 3 ? null : 3)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f2f3ff] text-[#707881] hover:text-[#006194] flex items-center justify-center transition-colors"
                  aria-label="Edit section 3"
                >
                  <Icon name="edit" className="text-[18px]" />
                </button>
              </div>

              {/* Quick Metrics Bar */}
              <div className="flex items-center justify-around bg-[#faf8ff] border border-[#eaedff] rounded-xl p-3 text-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                    PSR Code
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#006194]">Code 2</span>
                </div>
                <div className="w-px h-8 bg-[#eaedff]"></div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                    Mean Depth
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#131b2e]">2.4 mm</span>
                </div>
                <div className="w-px h-8 bg-[#eaedff]"></div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                    Mobility
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#006a61]">Class 0</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#131b2e] leading-relaxed">
                Generalized healthy pink firm gingiva, localized mild marginal inflammation in Quadrant 1
                interdental papilla. Sulcular probing depths 2-3mm generally, with isolated 4mm localized
                mesiobuccal pocket associated with plaque retention at #16 cervical margin.
              </p>

              <div className="bg-[#faf8ff] rounded-xl p-3 flex items-center justify-between text-xs border border-[#eaedff]">
                <div className="flex items-center gap-1.5 text-[#3f4850]">
                  <Icon name="dentistry" className="text-[#006a61] text-[16px]" />
                  <span>Sec 10 Full Periodontal Chart</span>
                </div>
                <span className="font-mono text-[#707881]">6-Pt Probe Recorded</span>
              </div>
            </div>
          )}

          {/* Section 4: Radiographic Findings */}
          {(activeTab === 'all' || activeTab === 'findings') && (
            <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#e2e7ff] text-[#006194] font-bold text-xs flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">Radiographic Findings</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingSection(editingSection === 4 ? null : 4)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f2f3ff] text-[#707881] hover:text-[#006194] flex items-center justify-center transition-colors"
                  aria-label="Edit section 4"
                >
                  <Icon name="edit" className="text-[18px]" />
                </button>
              </div>

              {/* Radiograph Thumbnail Preview */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden bg-black shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80"
                  alt="Dexis Bitewing radiograph"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1.5">
                    <Icon name="radiology" className="text-[16px]" />
                    <span className="font-medium">Dexis Bitewing (R-BW-04)</span>
                  </div>
                  <span className="font-mono bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[11px]">
                    Pulp Horn Clearance: 2.1mm
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#131b2e] leading-relaxed">
                Coronal radiolucency extending through enamel-dentin junction into outer 1/3 of coronal dentin
                on tooth #16. Distance to closest pulp horn measured at 2.1mm. Periapical radiograph PA-16
                demonstrates intact continuous lamina dura and absent apical rarefaction or widening of PDL space.
              </p>

              <div className="bg-[#faf8ff] rounded-xl p-3 flex items-center justify-between text-xs border border-[#eaedff]">
                <div className="flex items-center gap-1.5 text-[#3f4850]">
                  <Icon name="perm_media" className="text-[#006194] text-[16px]" />
                  <span>Sec 11 Radiographic Series (13 Oct 2026)</span>
                </div>
                <span className="bg-[#e2e7ff] text-[#006194] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  DICOM Validated
                </span>
              </div>
            </div>
          )}

          {/* Section 5: AI Diagnostic Correlation */}
          {(activeTab === 'all' || activeTab === 'findings') && (
            <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Icon name="neurology" className="text-[#006194] text-[20px]" />
                  <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                    Diagnostic Correlation &amp; AI Consideration
                  </h3>
                </div>
                <span className="bg-[#e2e7ff] text-[#006194] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  Synthesized
                </span>
              </div>

              <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff] space-y-2">
                <div className="flex items-start gap-2.5">
                  <Icon name="psychology" className="text-[#006194] text-[20px] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#006194] mb-1">
                      ICD-10 Diagnostic Formulation
                    </h4>
                    <p className="text-xs sm:text-sm text-[#131b2e] leading-relaxed">
                      Patient-reported cold sensitivity combined with 2.1mm measured residual dentin
                      thickness strongly correlates with <strong>Reversible Pulpitis</strong> secondary to{' '}
                      <strong>ICD-10 K02.62 (Caries of Dentin)</strong>. Pulp vitality preserved without
                      spontaneous nocturnal pain.
                    </p>
                  </div>
                </div>
              </div>

              {/* Confidence & Explainability */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#707881]">AI Diagnostic Alignment</span>
                  <span className="font-mono text-[#006a61] font-bold">96.8% Confidence</span>
                </div>
                <div className="w-full h-2 bg-[#f2f3ff] rounded-full overflow-hidden">
                  <div className="h-full bg-[#006a61] rounded-full" style={{ width: '96.8%' }}></div>
                </div>
              </div>

              <div className="bg-[#faf8ff] rounded-xl p-3 flex items-center justify-between text-xs border border-[#eaedff]">
                <span className="text-[#707881]">Sources: Sec 9, Sec 10, Sec 11 Cross-Reference</span>
                <button
                  type="button"
                  onClick={() => showToast('Explainability audit log: Ingested 18 features.')}
                  className="text-xs font-bold text-[#006194] flex items-center gap-1 hover:underline"
                >
                  <span>Audit Model</span>
                  <Icon name="open_in_new" className="text-[14px]" />
                </button>
              </div>
            </div>
          )}

          {/* Section 6: Clinician Advisory & Verification Note */}
          {!advisoryDismissed && (activeTab === 'all' || activeTab === 'plan') && (
            <div className="bg-[#eaedff] rounded-2xl p-5 border border-[#dae2fd] shadow-xs space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-[#006194] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon name="notification_important" className="text-[20px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">
                      Clinician Advisory &amp; Verification Note
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#006194]">
                      Requires Sign-off
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Cold vitality thermal testing (+ve with 4s immediate cessation) corroborates reversible
                    pulpitis; verify lateral excursive contacts against #46 prior to final curing of restorative
                    resin to eliminate occlusal trauma.
                  </p>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setExcursiveChecked(!excursiveChecked);
                        showToast(
                          excursiveChecked
                            ? 'Contact verification cleared.'
                            : 'Lateral excursive contact verified.'
                        );
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all ${
                        excursiveChecked
                          ? 'bg-[#006a61] text-white'
                          : 'bg-white text-[#006194] hover:bg-[#f2f3ff]'
                      }`}
                    >
                      <Icon name="check" className="text-[16px]" />
                      <span>{excursiveChecked ? 'Contact Verified' : 'Confirm Contact Checked'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdvisoryDismissed(true)}
                      className="text-xs font-semibold text-[#707881] hover:text-[#131b2e]"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 7: Proposed Treatment Plan & Recare Directives */}
          {(activeTab === 'all' || activeTab === 'plan') && (
            <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#e2e7ff] text-[#006194] font-bold text-xs flex items-center justify-center">
                    5
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                    Proposed Treatment Plan &amp; Recare
                  </h3>
                </div>
                <span className="bg-[#86f2e4] text-[#006f66] font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  Actionable
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#86f2e4] text-[#006a61] flex items-center justify-center">
                      <Icon name="medical_services" className="text-[20px]" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">
                        Direct Composite Resin (2-Surface)
                      </h4>
                      <span className="text-xs text-[#707881] font-mono">
                        Tooth #16 MO • Code: DHA-RES-2S
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-[#006194]">Planned</span>
                </div>

                <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#e2e7ff] text-[#006194] flex items-center justify-center">
                      <Icon name="event_repeat" className="text-[20px]" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">Routine Recare Recall</h4>
                      <span className="text-xs text-[#707881] font-mono">
                        Interval: 6 Months • Occlusal re-eval
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-[#707881]">Scheduled</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#131b2e] leading-relaxed">
                Recommended operative therapy to proceed under rubber dam isolation with selective enamel
                etch and self-etch dentin bonding protocol to maximize bond longevity and minimize post-operative
                sensitivity.
              </p>

              <div className="bg-[#faf8ff] rounded-xl p-3 flex items-center justify-between text-xs border border-[#eaedff]">
                <div className="flex items-center gap-1.5 text-[#006a61] font-semibold">
                  <Icon name="verified" className="text-[16px]" />
                  <span>Standard Practice Protocol • DHA Dental Board</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Source Attribution Footer */}
        <div className="bg-[#f2f3ff] rounded-2xl p-5 border border-[#eaedff] text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#707881] uppercase tracking-wider">
            <Icon name="folder_special" className="text-[16px] text-[#006194]" />
            <span>Clinical Source Integrity Audit</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="bg-white text-[#3f4850] font-mono text-xs px-2.5 py-1 rounded-lg border border-[#eaedff] shadow-xs">
              [Sec 9 Odontogram]
            </span>
            <span className="bg-white text-[#3f4850] font-mono text-xs px-2.5 py-1 rounded-lg border border-[#eaedff] shadow-xs">
              [Sec 10 Exam]
            </span>
            <span className="bg-white text-[#3f4850] font-mono text-xs px-2.5 py-1 rounded-lg border border-[#eaedff] shadow-xs">
              [Sec 11 Bitewing]
            </span>
            <span className="bg-[#e2e7ff] text-[#006194] font-mono text-xs px-2.5 py-1 rounded-lg border border-[#cce5ff] shadow-xs">
              [Verified Source]
            </span>
          </div>

          <p className="text-xs text-[#707881] font-mono">
            Electronic Signature hash: sha256-a94f0e21b...882c
          </p>
        </div>

        {/* Bottom Floating Action Dock */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#eaedff]">
          <button
            type="button"
            onClick={() => showToast('Draft saved to local clinical cache.')}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#eaedff] hover:bg-[#f2f3ff] text-[#3f4850] text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Icon name="save" className="text-[18px]" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            onClick={() => {
              showToast('Clinical summary approved & digital signature applied.');
              setTimeout(() => {
                navigate('/summaries/dashboard');
              }, 1000);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-sm font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Review &amp; Approve (12.15)</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-4 right-4 max-w-sm mx-auto p-4 bg-[#283044] text-[#eef0ff] rounded-2xl shadow-xl flex items-center justify-between z-50 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-2.5">
              <Icon name="check_circle" className="text-[#86f2e4] text-[20px]" />
              <span className="text-xs font-medium">{toastMessage}</span>
            </div>
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
