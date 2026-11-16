import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InvestigationShell } from './InvestigationShell';
import { Icon } from '../../design/Primitives';

interface StagedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  params: string;
  sensor: string;
}

export function UploadInvestigationScreen() {
  const navigate = useNavigate();
  const [workflowMode, setWorkflowMode] = useState<'linked' | 'external'>('linked');
  const [formatsOpen, setFormatsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([
    {
      id: 'f1',
      name: 'BW_Right_Molar_Exp01.dcm',
      size: '14.2 MB',
      type: 'DCM',
      progress: 100,
      params: '65 kVp • 0.12s • Lossless 16-bit',
      sensor: 'Dexis Sensor #2',
    },
    {
      id: 'f2',
      name: 'PA_Tooth16_Apex_Exp02.dcm',
      size: '12.8 MB',
      type: 'DCM',
      progress: 100,
      params: '65 kVp • 0.10s • Direct Stream',
      sensor: 'Dexis Sensor #2',
    },
  ]);

  const handleSimulateAddFile = (sensorName: string) => {
    const newFile: StagedFile = {
      id: `f-${Date.now()}`,
      name: `Capture_Series_${stagedFiles.length + 1}.dcm`,
      size: '13.5 MB',
      type: 'DCM',
      progress: 100,
      params: '65 kVp • 0.11s • Direct Stream',
      sensor: sensorName,
    };
    setStagedFiles([...stagedFiles, newFile]);
    showToast(`Ingested new DICOM acquisition via ${sensorName}!`);
  };

  return (
    <InvestigationShell
      pageTitle="Diagnostic Media Ingestion"
      badgeCode="11.9"
      badgeLabel="Upload Flow (1/4)"
      currentStep="File Staging"
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

        {/* Progress Stepper Banner */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 sm:p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-primary flex items-center gap-1.5">
              <Icon name="radio_button_checked" className="text-base text-primary" />
              Step 1 of 4: File Selection & Sensor Staging
            </span>
            <span className="text-outline font-mono">25% Complete</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-300 w-1/4" />
          </div>
        </div>

        {/* Workflow Mode Toggle */}
        <div className="bg-surface-container p-1 rounded-xl flex items-stretch shadow-xs max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setWorkflowMode('linked')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5 ${
              workflowMode === 'linked'
                ? 'bg-surface text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="link" className="text-base" />
            <span>Linked Order</span>
          </button>
          <button
            type="button"
            onClick={() => setWorkflowMode('external')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5 ${
              workflowMode === 'external'
                ? 'bg-surface text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="cloud_sync" className="text-base" />
            <span>External Intake</span>
          </button>
        </div>

        {/* Linked Request Banner (if in linked mode) */}
        {workflowMode === 'linked' ? (
          <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/30 shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Icon name="verified_user" className="text-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                      Authorized Order
                    </span>
                    <span className="text-outline">•</span>
                    <span className="font-mono text-xs text-on-surface-variant font-semibold">
                      PRIORITY: URGENT
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-on-surface">#REQ-2025-0914</h2>
                </div>
              </div>
              <span className="bg-surface px-2.5 py-1 rounded-full font-mono text-xs text-on-surface border border-outline-variant/20 shadow-xs">
                DHA-10482
              </span>
            </div>

            <div className="bg-surface rounded-xl p-3 border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-outline block text-[11px]">Patient Identity</span>
                <span className="font-bold text-on-surface">Chinedu Okafor (M, 34y)</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-outline block text-[11px]">Expected Modality</span>
                <span className="font-semibold text-primary">Dexis Digital Bitewing (BW-R) & Tooth #16 PA</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/30 text-xs text-on-surface-variant flex items-center gap-2">
            <Icon name="info" className="text-base text-secondary" />
            <span>External Intake mode selected: DICOM metadata will automatically associate patient upon upload.</span>
          </div>
        )}

        {/* File Drop & Direct Sensor Ingestion Zone */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Icon name="add_a_photo" className="text-3xl" />
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg text-on-surface">Stage Diagnostic Files</h3>
            <p className="text-xs text-on-surface-variant max-w-md mx-auto mt-1 leading-relaxed">
              Ingest DICOM (.dcm), Lossless PNG, JPEG, TIFF, or Clinical Multi-slice PDF (Max 150MB per acquisition series).
            </p>
          </div>

          {/* Action Ingestion Buttons */}
          <div className="space-y-2 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => handleSimulateAddFile('Local File Selector')}
              className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-primary/95 transition-all"
            >
              <Icon name="upload_file" className="text-lg" />
              <span>Select from Local Workstation</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSimulateAddFile('Intraoral Camera Stream')}
                className="py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Icon name="photo_camera" className="text-primary text-base" />
                <span className="truncate">Intraoral Camera</span>
              </button>

              <button
                type="button"
                onClick={() => handleSimulateAddFile('Dexis PACS Gateway')}
                className="py-2 px-3 rounded-xl bg-secondary-container hover:bg-secondary-container/80 text-on-secondary-container font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Icon name="sensors" className="text-base" />
                <span className="truncate">Dexis PACS Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* Staged Upload Queue List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-on-surface">Staged Acquisition Series</h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-primary text-on-primary font-mono">
                {stagedFiles.length}
              </span>
            </div>
            <span className="text-xs font-semibold text-secondary flex items-center gap-1">
              <Icon name="check_circle" className="text-sm" />
              All Validated
            </span>
          </div>

          <div className="space-y-2.5">
            {stagedFiles.map((file) => (
              <div
                key={file.id}
                className="bg-surface rounded-xl border border-outline-variant/30 p-3.5 shadow-xs space-y-2"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0 relative overflow-hidden font-bold text-xs">
                    <Icon name="radiology" className="text-2xl" />
                    <div className="absolute bottom-0 inset-x-0 bg-primary/20 text-center font-mono text-[9px] font-bold text-primary py-0.5">
                      {file.type}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs sm:text-sm text-on-surface truncate">
                        {file.name}
                      </span>
                      <Icon name="check_circle" className="text-secondary text-base shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-on-surface-variant mt-0.5">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span className="text-secondary font-semibold">{file.progress}% Ingested</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-lg px-3 py-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-on-surface-variant font-mono text-[11px]">
                  <span className="text-on-surface font-medium flex items-center gap-1">
                    <Icon name="memory" className="text-xs text-secondary" />
                    {file.sensor}
                  </span>
                  <span>•</span>
                  <span>{file.params}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Supplementary Attachment */}
          <button
            type="button"
            onClick={() => showToast('Attached radiation dose calculation sheet')}
            className="w-full py-2.5 px-4 bg-surface rounded-xl border border-outline-variant/30 shadow-xs text-primary font-semibold text-xs flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
          >
            <Icon name="post_add" className="text-base" />
            <span>+ Attach Supplementary Radiation Dose Sheet (PDF)</span>
          </button>
        </div>

        {/* Accepted Modalities Accordion */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => setFormatsOpen(!formatsOpen)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
          >
            <div className="flex items-center gap-2">
              <Icon name="rule" className="text-primary text-lg" />
              <span className="font-bold text-xs sm:text-sm text-on-surface">Supported Diagnostic Formats</span>
            </div>
            <Icon
              name="expand_more"
              className={`text-on-surface-variant transition-transform ${formatsOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {formatsOpen && (
            <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-outline-variant/20 text-xs">
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="font-bold text-on-surface block">Dental X-Rays / OPG</span>
                <span className="text-[10px] text-outline font-mono">DICOM, PNG, JPEG, PDF</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="font-bold text-on-surface block">CBCT Volumetric</span>
                <span className="text-[10px] text-outline font-mono">DICOM (.dcm), ZIP, PDF</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="font-bold text-on-surface block">Pathology Reports</span>
                <span className="text-[10px] text-outline font-mono">PDF, 600+ DPI Scans</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="font-bold text-on-surface block">Clinical Camera</span>
                <span className="text-[10px] text-outline font-mono">JPG, Lossless PNG, HEIC</span>
              </div>
            </div>
          )}
        </div>

        {/* Nigeria Health Information Exchange Compliance Notice */}
        <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/20 flex items-start gap-3 text-xs">
          <div className="p-2 rounded-xl bg-secondary-container text-on-secondary-container shrink-0 mt-0.5">
            <Icon name="security" className="text-base" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-secondary">
              <span>Nigeria Health Information Exchange Compliance Verification</span>
              <span className="px-1.5 py-0.2 rounded bg-secondary/10 text-[10px] font-mono">SHA-256</span>
            </div>
            <p className="text-on-surface-variant mt-1 leading-relaxed">
              All uploaded clinical media are assigned an immutable cryptographic hash upon ingestion. Post-hoc tamper or replacement is strictly audited under Nigeria Health Data Law.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => navigate('/investigations/upload/details')}
            className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-primary/95 transition-all"
          >
            <span>Proceed to Category & Details (11.10)</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/investigations/awaiting-results')}
            className="w-full py-2.5 text-on-surface-variant hover:text-on-surface text-xs font-semibold flex items-center justify-center transition-colors"
          >
            Cancel Upload
          </button>
        </div>
      </div>
    </InvestigationShell>
  );
}

