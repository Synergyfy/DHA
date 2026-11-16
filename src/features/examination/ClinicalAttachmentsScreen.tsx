import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

interface DossierFile {
  id: string;
  category: 'patient' | 'examination' | 'anatomical' | 'tooth';
  name: string;
  type: 'photo' | 'radiograph' | 'document';
  format: string;
  size: string;
  date: string;
  author: string;
  status: 'verified' | 'pending';
  sha256: string;
  target?: string;
  resolution?: string;
  mimeType: string;
}

export function ClinicalAttachmentsScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'photo' | 'radiograph' | 'document'>('all');
  const [selectedFileMeta, setSelectedFileMeta] = useState<DossierFile | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [uploadCategory, setUploadCategory] = useState<string>('tooth');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const files: DossierFile[] = [
    {
      id: 'f-1',
      category: 'patient',
      name: 'Nigerian_ID_Chinedu_Okafor_FrontBack.pdf',
      type: 'document',
      format: 'PDF',
      size: '1.2 MB',
      date: '14 Oct 2024',
      author: 'Front Desk Reception',
      status: 'verified',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      mimeType: 'application/pdf',
    },
    {
      id: 'f-2',
      category: 'patient',
      name: 'Cardiology_Medical_Clearance_Letter.pdf',
      type: 'document',
      format: 'PDF',
      size: '340 KB',
      date: '10 Feb 2025',
      author: 'Dr. Tariq (Cardiologist)',
      status: 'verified',
      sha256: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
      mimeType: 'application/pdf',
    },
    {
      id: 'f-3',
      category: 'examination',
      name: 'RAW_0028_Neutral_Facial_Profile.DNG',
      type: 'photo',
      format: 'DNG',
      size: '18.4 MB',
      date: '16 Feb 2025',
      author: 'Dr. Daniel James',
      status: 'verified',
      sha256: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
      resolution: '6000 x 4000 px (35mm sensor)',
      mimeType: 'image/x-adobe-dng',
    },
    {
      id: 'f-4',
      category: 'examination',
      name: 'Signed_Digital_Consent_Comprehensive_Exam.pdf',
      type: 'document',
      format: 'PDF',
      size: '520 KB',
      date: '16 Feb 2025',
      author: 'Chinedu Okafor (e-Signature)',
      status: 'verified',
      sha256: '499e05f624d781fbfe15b9c2409740590a35d97f22316e6f4773c52a0a256a42',
      mimeType: 'application/pdf',
    },
    {
      id: 'f-5',
      category: 'anatomical',
      name: 'UR_Q1_Buccal_Vestibule_Mucosa_4K.jpg',
      type: 'photo',
      format: 'JPEG',
      size: '12.1 MB',
      date: '16 Feb 2025',
      author: 'Dr. Daniel James',
      status: 'verified',
      sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      resolution: '3840 x 2160 px (Ultra HD)',
      mimeType: 'image/jpeg',
    },
    {
      id: 'f-6',
      category: 'tooth',
      name: 'Tooth_16_MO_Cavitated_Lesion_Macro.jpg',
      type: 'photo',
      format: 'JPEG',
      size: '8.7 MB',
      date: '16 Feb 2025',
      author: 'Dr. Daniel James',
      status: 'verified',
      sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      target: 'Tooth #16 OM',
      resolution: '4000 x 3000 px (Macro 1:1)',
      mimeType: 'image/jpeg',
    },
    {
      id: 'f-7',
      category: 'tooth',
      name: 'PA_16_Apex_Periapical_DICOM.dcm',
      type: 'radiograph',
      format: 'DICOM',
      size: '4.2 MB',
      date: '16 Feb 2025',
      author: 'Radiology Dept',
      status: 'verified',
      sha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
      target: 'Tooth #16',
      resolution: '2048 x 1536 px (16-bit)',
      mimeType: 'application/dicom',
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredFiles = activeFilter === 'all'
    ? files
    : files.filter((f) => f.type === activeFilter);

  const getFileIcon = (type: string) => {
    if (type === 'photo') return 'image';
    if (type === 'radiograph') return 'radiology';
    return 'description';
  };

  return (
    <ExaminationShell
      pageTitle="Clinical Attachments & Media"
      badgeCode="10.13"
      badgeLabel="Clinical Dossier"
      currentStep="Clinical Dossier: Documents, Photos & DICOM Records"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Top Context Subheader */}
        <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm border border-outline-variant/30 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-primary uppercase tracking-wider">Clinical Dossier • DHA Section 10</span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-surface-container-high px-2 py-0.5 rounded-full font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span>7 Total Media Objects</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-sm sm:text-base text-on-surface">Integrated Patient Attachment Archive</span>
            <span className="text-outline">Total Storage: 45.5 MB</span>
          </div>
        </section>

        {/* Summary Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="text-[11px] text-on-surface-variant block">Total Files</span>
            <span className="text-xl font-bold font-mono text-on-surface">7</span>
            <span className="text-[10px] text-secondary block font-semibold">100% Cryptographically Verified</span>
          </div>
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="text-[11px] text-on-surface-variant block">Clinical Photos</span>
            <span className="text-xl font-bold font-mono text-primary">3</span>
            <span className="text-[10px] text-on-surface-variant block font-semibold">1 RAW, 2 Ultra HD</span>
          </div>
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="text-[11px] text-on-surface-variant block">Radiographic Series</span>
            <span className="text-xl font-bold font-mono text-secondary">2</span>
            <span className="text-[10px] text-secondary block font-semibold">DICOM Lossless</span>
          </div>
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="text-[11px] text-on-surface-variant block">Legal Documents</span>
            <span className="text-xl font-bold font-mono text-blue-600">2</span>
            <span className="text-[10px] text-blue-600 block font-semibold">E-Signed & Notarized</span>
          </div>
        </div>

        {/* Filter Pills and Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              All Files (7)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('photo')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === 'photo'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              Photos (3)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('radiograph')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === 'radiograph'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              Radiographs (2)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('document')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === 'document'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
              }`}
            >
              Documents (2)
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <Icon name="upload" className="text-sm" />
            <span>+ Upload Attachment</span>
          </button>
        </div>

        {/* Files Repository Cards */}
        <div className="space-y-3">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold shrink-0">
                  <Icon name={getFileIcon(file.type)} className="text-xl" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-on-surface truncate">
                      {file.name}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-surface-container text-[10px] font-mono font-bold text-primary">
                      {file.format}
                    </span>
                    {file.target && (
                      <span className="px-1.5 py-0.2 rounded bg-red-100 dark:bg-red-950 text-red-600 font-mono text-[10px] font-bold">
                        {file.target}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-on-surface-variant flex-wrap mt-0.5">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.date}</span>
                    <span>•</span>
                    <span>{file.author}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => setSelectedFileMeta(file)}
                  className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Icon name="info" className="text-sm text-primary" />
                  <span>Meta</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast(`Previewing ${file.name}...`)}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Icon name="visibility" className="text-sm" />
                  <span>View</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Metadata Inspection Modal */}
        {selectedFileMeta && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-surface-container-lowest max-w-lg w-full rounded-3xl p-6 border border-outline-variant/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-2">
                  <Icon name="fingerprint" className="text-primary text-xl" />
                  <h3 className="text-sm font-bold text-on-surface">Cryptographic Metadata</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFileMeta(null)}
                  className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
                >
                  <Icon name="close" className="text-sm" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                  <span className="text-on-surface-variant font-semibold">File Designation</span>
                  <p className="font-bold text-on-surface break-all">{selectedFileMeta.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <span className="text-on-surface-variant text-[10px] block">MIME Type</span>
                    <span className="font-mono font-bold text-on-surface">{selectedFileMeta.mimeType}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <span className="text-on-surface-variant text-[10px] block">File Size</span>
                    <span className="font-mono font-bold text-on-surface">{selectedFileMeta.size}</span>
                  </div>
                </div>

                {selectedFileMeta.resolution && (
                  <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <span className="text-on-surface-variant text-[10px] block">Resolution & Calibration</span>
                    <span className="font-mono font-bold text-on-surface">{selectedFileMeta.resolution}</span>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant font-semibold">SHA-256 Digest (Nigeria Health Information Exchange Vault)</span>
                    <button
                      type="button"
                      onClick={() => showToast('SHA-256 Checksum copied to clipboard')}
                      className="text-primary text-[10px] font-bold"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="font-mono text-[10px] text-outline break-all bg-surface-container p-2 rounded">
                    {selectedFileMeta.sha256}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedFileMeta(null)}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal Simulation */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl p-6 border border-outline-variant/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-2">
                  <Icon name="upload_file" className="text-primary text-xl" />
                  <h3 className="text-sm font-bold text-on-surface">Upload Clinical Attachment</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
                >
                  <Icon name="close" className="text-sm" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-on-surface block mb-1">Dossier Category Target</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface"
                  >
                    <option value="patient">Patient-Level (Clearance / ID)</option>
                    <option value="examination">Examination-Level (Consent / Face Profile)</option>
                    <option value="anatomical">Anatomical Area (Mucosa / Vestibule)</option>
                    <option value="tooth">Tooth-Specific (Target Tooth #16)</option>
                  </select>
                </div>

                {/* Dropzone */}
                <div className="border-2 border-dashed border-outline-variant/40 rounded-2xl p-6 text-center space-y-2 hover:border-primary/60 transition-colors cursor-pointer bg-surface-container-low/50">
                  <Icon name="cloud_upload" className="text-3xl text-primary mx-auto" />
                  <p className="font-semibold text-on-surface">Drag and drop file here, or browse</p>
                  <p className="text-[10px] text-outline">Supports DICOM (.dcm), RAW (.dng), JPEG, PNG, PDF up to 50MB</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    showToast('File attached successfully and cryptographically signed');
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold"
                >
                  Attach to Dossier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/examination/assessment')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Icon name="arrow_back" className="text-sm" />
            <span>Module 8: Assessment</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/examination/history')}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <span>Examination History</span>
            <Icon name="history" className="text-sm" />
          </button>
        </div>
      </div>
    </ExaminationShell>
  );
}

export default ClinicalAttachmentsScreen;

