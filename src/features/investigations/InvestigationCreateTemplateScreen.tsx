import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

export function InvestigationCreateTemplateScreen() {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState<string>('Implant Site CBCT & Ridge Mapping');
  const [imagingCategory, setImagingCategory] = useState<string>('3d_cbct');
  const [subtype, setSubtype] = useState<string>('Quadrant Specific 3D Volumetric Reconstruction');
  const [branch, setBranch] = useState<string>('Central Dental Clinic');
  const [sla, setSla] = useState<string>('Routine (24 - 48h)');

  // Checklist items
  const [fieldFov, setFieldFov] = useState<boolean>(true);
  const [fieldVoxel, setFieldVoxel] = useState<boolean>(true);
  const [fieldSinusIan, setFieldSinusIan] = useState<boolean>(true);
  const [fieldVirtualFixture, setFieldVirtualFixture] = useState<boolean>(true);
  const [fieldStent, setFieldStent] = useState<boolean>(false);

  // Instructions
  const [instructions, setInstructions] = useState<string>(
    'Evaluate residual alveolar bone height and width at planned osteotomy site. Measure distance to anatomical danger zones (IAN canal, maxillary sinus floor). Density assessment (Type D1-D4).'
  );

  // Governance toggles
  const [pregnancyPrompt, setPregnancyPrompt] = useState<boolean>(true);
  const [directorApproval, setDirectorApproval] = useState<boolean>(true);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInsertMacro = (macroText: string) => {
    setInstructions((prev) => `${prev} ${macroText}`);
    showToast(`Inserted macro: ${macroText}`);
  };

  const handlePublish = () => {
    showToast(`Template '${templateName}' successfully published and registered in DHA Protocol Registry.`);
    setTimeout(() => navigate('/investigations/templates'), 1500);
  };

  return (
    <InvestigationShell
      pageTitle="Create / Edit Investigation Template"
      badgeCode="11.28"
      badgeLabel="Protocol Authoring Studio"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="TPL-BUILDER"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Status & Context Pill Bar */}
        <section className="flex items-center justify-between py-1 text-xs">
          <div className="flex items-center gap-2 bg-secondary-container px-3 py-1.5 rounded-full shadow-sm">
            <Icon name="cloud_done" className="text-sm text-on-secondary-container animate-pulse" />
            <span className="text-on-secondary-container font-semibold uppercase tracking-wider text-[11px]">
              Draft v1.0 &bull; Autosaved
            </span>
          </div>
          <span className="font-mono text-outline font-semibold">ID: TPL-CBCT-048</span>
        </section>

        {/* Wizard Stepper */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 2 of 3</span>
            <span className="text-xs text-on-surface-variant font-medium">Next: Governance & Signing Rules</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-on-surface">Modality Parameters & Diagnostic Fields</h2>

          {/* Visual Step Tracker */}
          <div className="grid grid-cols-3 gap-2 mt-1">
            <div className="h-2 rounded-full bg-primary"></div>
            <div className="h-2 rounded-full bg-primary relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-container opacity-40 animate-pulse"></div>
            </div>
            <div className="h-2 rounded-full bg-surface-container-high"></div>
          </div>
          <div className="flex justify-between text-xs text-on-surface-variant mt-0.5">
            <span className="text-primary font-semibold">1. General Metadata</span>
            <span className="text-primary font-bold">2. Diagnostic Protocol Fields</span>
            <span className="opacity-50">3. Governance & Audit</span>
          </div>
        </section>

        {/* Section A: General Metadata */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <Icon name="folder_special" className="text-lg" />
              </div>
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wide">1. General Metadata</h3>
            </div>
            <span className="text-xs font-semibold text-secondary bg-surface-container-low px-2.5 py-1 rounded-full border border-secondary/20">
              Core Specifications
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Template Name */}
            <div>
              <label className="font-semibold text-on-surface block mb-1">Protocol Template Name:</label>
              <div className="bg-surface-container-low rounded-xl px-3.5 py-2.5 flex items-center justify-between border border-outline-variant/30">
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full bg-transparent font-semibold text-on-surface outline-none text-xs"
                />
                <Icon name="edit" className="text-outline text-base ml-2 shrink-0" />
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="font-semibold text-on-surface block mb-1">Imaging & Modality Category:</label>
              <select
                value={imagingCategory}
                onChange={(e) => setImagingCategory(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface font-medium px-3.5 py-2.5 rounded-xl border border-outline-variant/30 text-xs focus:outline-none"
              >
                <option value="3d_cbct">3D Advanced Imaging (CBCT - Cone Beam)</option>
                <option value="intraoral_xray">Intraoral Radiography (Bitewing / Periapical)</option>
                <option value="opg">Panoramic Orthopantomograph (OPG)</option>
                <option value="pathology">Clinical Laboratory & Hematology</option>
              </select>
            </div>

            {/* Subtype & Facility Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] font-mono uppercase text-outline block">Target Subtype</span>
                <input
                  type="text"
                  value={subtype}
                  onChange={(e) => setSubtype(e.target.value)}
                  className="mt-1 w-full bg-transparent font-semibold text-on-surface text-xs outline-none"
                />
              </div>

              <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] font-mono uppercase text-outline block">Clinic Branch</span>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="mt-1 w-full bg-transparent font-semibold text-on-surface text-xs outline-none"
                />
              </div>

              <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] font-mono uppercase text-outline block">Turnaround SLA</span>
                <input
                  type="text"
                  value={sla}
                  onChange={(e) => setSla(e.target.value)}
                  className="mt-1 w-full bg-transparent font-semibold text-secondary text-xs outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section B: Diagnostic Protocol Fields & Modality Checklist */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <Icon name="checklist" className="text-lg" />
              </div>
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wide">
                2. Diagnostic Protocol Fields & Spatial Metrics
              </h3>
            </div>
            <span className="font-mono text-xs text-primary font-bold">5 / 6 Selected</span>
          </div>

          <p className="text-xs text-on-surface-variant">
            Define mandatory radiographic criteria and spatial metrics captured by the radiographer upon image ingestion.
          </p>

          {/* Checklist Matrix */}
          <div className="space-y-2 text-xs">
            {/* Item 1: Mandatory Locked */}
            <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-primary text-on-primary flex items-center justify-center text-xs">
                  <Icon name="check" className="text-xs" />
                </div>
                <div>
                  <span className="font-bold text-on-surface block">Anatomical Quadrant & Tooth Target</span>
                  <span className="text-[11px] text-primary font-medium">Mandatory clinical anchor</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-full">
                <Icon name="lock" className="text-xs text-on-surface-variant" />
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">Locked</span>
              </div>
            </div>

            {/* Item 2 */}
            <label className="flex items-center justify-between p-3.5 bg-surface-container-low/60 hover:bg-surface-container-low rounded-xl border border-outline-variant/20 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={fieldFov}
                  onChange={(e) => setFieldFov(e.target.checked)}
                  className="w-5 h-5 rounded accent-primary cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-on-surface block">Field of View (FOV) selection</span>
                  <span className="text-[11px] text-on-surface-variant">Standardized window (e.g. 5x5cm, 8x8cm)</span>
                </div>
              </div>
              <Icon name="drag_handle" className="text-outline text-base" />
            </label>

            {/* Item 3 */}
            <label className="flex items-center justify-between p-3.5 bg-surface-container-low/60 hover:bg-surface-container-low rounded-xl border border-outline-variant/20 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={fieldVoxel}
                  onChange={(e) => setFieldVoxel(e.target.checked)}
                  className="w-5 h-5 rounded accent-primary cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-on-surface block">Voxel Resolution Minimum</span>
                  <span className="text-[11px] text-on-surface-variant">High-precision threshold (80μm – 125μm)</span>
                </div>
              </div>
              <Icon name="drag_handle" className="text-outline text-base" />
            </label>

            {/* Item 4 */}
            <label className="flex items-center justify-between p-3.5 bg-surface-container-low/60 hover:bg-surface-container-low rounded-xl border border-outline-variant/20 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={fieldSinusIan}
                  onChange={(e) => setFieldSinusIan(e.target.checked)}
                  className="w-5 h-5 rounded accent-primary cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-on-surface block">Sinus Floor & IAN Canal Margin Check</span>
                  <span className="text-[11px] text-secondary font-medium">Mandatory safety clearance metric</span>
                </div>
              </div>
              <Icon name="drag_handle" className="text-outline text-base" />
            </label>

            {/* Item 5 */}
            <label className="flex items-center justify-between p-3.5 bg-surface-container-low/60 hover:bg-surface-container-low rounded-xl border border-outline-variant/20 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={fieldVirtualFixture}
                  onChange={(e) => setFieldVirtualFixture(e.target.checked)}
                  className="w-5 h-5 rounded accent-primary cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-on-surface block">Virtual Implant Fixture Superimposition</span>
                  <span className="text-[11px] text-on-surface-variant">3D CAD prosthetic envelope alignment</span>
                </div>
              </div>
              <Icon name="drag_handle" className="text-outline text-base" />
            </label>

            {/* Item 6 */}
            <label className="flex items-center justify-between p-3.5 bg-surface-container-low/40 hover:bg-surface-container-low rounded-xl border border-outline-variant/20 cursor-pointer transition-colors opacity-90">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={fieldStent}
                  onChange={(e) => setFieldStent(e.target.checked)}
                  className="w-5 h-5 rounded accent-primary cursor-pointer"
                />
                <div>
                  <span className="font-semibold text-on-surface block">Radiopaque Stent / Dual Scan protocol</span>
                  <span className="text-[11px] text-on-surface-variant">Optional barium-marker guided scanning</span>
                </div>
              </div>
              <Icon name="drag_handle" className="text-outline text-base" />
            </label>
          </div>

          <button
            type="button"
            onClick={() => showToast('Custom clinical field builder dialog launched.')}
            className="w-full py-2.5 bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-outline-variant/20"
          >
            <Icon name="add_circle" className="text-base" />
            <span>Add Custom Clinical Field</span>
          </button>
        </section>

        {/* Section C: Default Radiologist Instructions & Prompts */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <Icon name="assignment" className="text-lg" />
              </div>
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wide">
                3. Radiologist & Radiographer Prompts
              </h3>
            </div>
            <span className="text-xs text-outline font-mono">{instructions.length} chars</span>
          </div>

          <div className="space-y-2 text-xs">
            <label className="font-semibold text-on-surface block">Pre-filled Radiographer Prompt:</label>
            <textarea
              rows={4}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full bg-surface-container-low rounded-xl p-3 text-on-surface text-xs leading-relaxed border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />

            {/* Quick Macro Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
              <span className="text-outline text-[11px] shrink-0 font-medium">Quick Insert:</span>
              <button
                type="button"
                onClick={() => handleInsertMacro('[Cortical Thickness & Density (D1-D4)]')}
                className="bg-surface-container-low hover:bg-surface-container text-primary px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 border border-outline-variant/20"
              >
                + Cortical Thickness
              </button>
              <button
                type="button"
                onClick={() => handleInsertMacro('[Mental Foramen Spatial Margin > 2.0mm]')}
                className="bg-surface-container-low hover:bg-surface-container text-primary px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 border border-outline-variant/20"
              >
                + Mental Foramen
              </button>
              <button
                type="button"
                onClick={() => handleInsertMacro('[Hounsfield Unit HU Calibrated Mapping]')}
                className="bg-surface-container-low hover:bg-surface-container text-primary px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 border border-outline-variant/20"
              >
                + HU Density
              </button>
            </div>
          </div>
        </section>

        {/* Section D: Radiation Safety & Statutory Governance */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-outline-variant/20 pb-3">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <Icon name="verified_user" className="text-lg" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wide">
                4. Radiation Safety Governance
              </h3>
              <span className="text-[11px] text-secondary font-semibold uppercase tracking-wider">
                UAE FANR Regulatory Mandate
              </span>
            </div>
          </div>

          {/* Locked ALADA Mandate Card */}
          <div className="bg-surface-container-low rounded-xl p-4 border border-rose-200 flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="security" className="text-xl" />
            </div>
            <div className="flex flex-col gap-1 min-w-0 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-on-surface">ALADA Protocol Justification</span>
                <Icon name="lock" className="text-xs text-outline" />
              </div>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">
                Enforces ALADA (As Low As Diagnostically Acceptable) radiation justification log prior to patient exposure. Cannot be bypassed.
              </p>
              <span className="font-mono text-[10px] text-rose-700 font-bold mt-1">NON-BYPASSABLE SAFETY GATE</span>
            </div>
          </div>

          {/* Safeguard Toggles */}
          <div className="space-y-2 text-xs">
            {/* Pregnancy Safeguard */}
            <div className="flex items-center justify-between p-3.5 bg-surface-container-low/60 rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <Icon name="pregnant_woman" className="text-xl text-primary shrink-0" />
                <div>
                  <span className="font-bold text-on-surface block">Pregnancy Safeguard Prompt</span>
                  <span className="text-[11px] text-on-surface-variant">Pre-exposure mandatory triage check</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPregnancyPrompt(!pregnancyPrompt)}
                className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer shadow-inner ${
                  pregnancyPrompt ? 'bg-primary justify-end' : 'bg-outline-variant justify-start'
                }`}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>

            {/* Medical Director Approval */}
            <div className="flex items-center justify-between p-3.5 bg-surface-container-low/60 rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <Icon name="approval_delegation" className="text-xl text-primary shrink-0" />
                <div>
                  <span className="font-bold text-on-surface block">Medical Director Approval Requirement</span>
                  <span className="text-[11px] text-on-surface-variant">Second-signoff for specialized advanced modalities</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDirectorApproval(!directorApproval)}
                className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors cursor-pointer shadow-inner ${
                  directorApproval ? 'bg-primary justify-end' : 'bg-outline-variant justify-start'
                }`}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/40 shadow-sm flex items-center justify-between gap-3 text-xs">
          <button
            type="button"
            onClick={() => showToast('Protocol draft autosaved to clinic library.')}
            className="px-5 py-2.5 rounded-xl font-bold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/40 flex items-center gap-1.5 transition-colors"
          >
            <Icon name="save" className="text-base" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            className="px-6 py-2.5 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-md flex items-center gap-2 transition-all"
          >
            <span>Preview & Publish Protocol</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>
        </section>
      </div>
    </InvestigationShell>
  );
}

