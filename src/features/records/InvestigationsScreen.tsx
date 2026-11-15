import { useState } from 'react';
import { DashboardShell } from '../dashboard/DashboardShell';
import { RecordsSubNav } from './RecordsSubNav';
import { Icon } from '../../design/Primitives';

type FileCategory = 'all' | 'radiograph' | 'photo' | 'lab';

interface VaultFile {
  id: string;
  type: 'radiograph' | 'photo' | 'lab';
  title: string;
  fileName: string;
  dateStr: string;
  size: string;
  doctor?: string;
  badge: string;
  badgeTone: string;
  thumbUrl?: string;
  code?: string;
  notes?: string;
}

const VAULT_FILES: VaultFile[] = [
  {
    id: 'f1',
    type: 'radiograph',
    title: 'Bitewing Radiograph (Right Premolar/Molar)',
    fileName: 'DHA_BW_Right_01.dicom',
    dateStr: 'Dec 12, 2024',
    size: '3.4 MB',
    doctor: 'Dr. Farouk Al-Mansoori',
    badge: 'Tooth #16 Margin',
    badgeTone: 'bg-surface-container text-primary',
    code: 'BW-01',
    thumbUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCp4dGHjM8U9oS9Fu5StutOStrum8rAMcdQjXT3UKy_HdlCoC1COBwyteue1PhUcOS1fX_DIsilioIlIH5K79l0kCHm0G47fX42OX1uNC5qdoOUic-HjENyQ7TJ2CSO_bUfh7V3NZUolJOErGBhNMBocx0r7nuaoY207e12XOx1B7hYEW0pHIDDfFfqN5L_8NlGWSjcCFuHEtv-YURG5N69lDmuMZ0Q1tpsSNG2wyQU',
  },
  {
    id: 'f2',
    type: 'radiograph',
    title: 'Bitewing Radiograph (Left Premolar/Molar)',
    fileName: 'DHA_BW_Left_02.dicom',
    dateStr: 'Dec 12, 2024',
    size: '3.2 MB',
    doctor: 'DICOM Standard PACS',
    badge: 'Tooth #36 Fissure',
    badgeTone: 'bg-surface-container text-primary',
    code: 'BW-02',
    thumbUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAB2qGucDIL2lQrFqHXYEnrr-HtO2QZdH8Ch6ZyxvTuDCayxBiWuxm35HTzW3vqCgRpVtbyeOGHB54HXbIw2Aq9iidNVYGaDXYg6xTkWuHwEz1VUEtym5uNwn6dHZxiAnYOaix1PvdBZHgbIxS3MnTtezh85tfCZGvWjZpyfnJaNmctqO4g6Wstsy3j6KB9dbg3bAdjw6wPa7pPunZg8nQCEU8l7CDYxT_lCNq22R2J',
  },
  {
    id: 'f3',
    type: 'photo',
    title: 'Upper Arch Occlusal View',
    fileName: 'IMG_Arch_Occlusal_HDR.jpg',
    dateStr: 'Dec 12, 2024',
    size: '5.8 MB JPEG',
    doctor: 'Canon Medical Ring Flash',
    badge: 'Intraoral Photo',
    badgeTone: 'bg-secondary-container text-on-secondary-container',
    code: 'COLOR',
    thumbUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkzyn2MPixux_wIbpkzruKbcF0oZnN9SX9aD1xeeDOteEbfjjJ-1eBBvwQ0zfNSLLERLts0GpBgfAfgWHgGGfOpXsYFLmG9w6UlZ6xA7b0TFYxK1-LVXivQ8Dw9P9zzi5JiZsO4nOijWdhiA1s_R-9tCvMRtMmNMRBNHJ_3fbAYh1JRJsk1TNnq0qSP5n0E7fD7gIgP1YxswDFm2Z-IgK-NHBJ6OeowOeuKWtwRt8y',
  },
  {
    id: 'f4',
    type: 'lab',
    title: 'Biopsy & Histopathology Report',
    fileName: 'Salivary_Panel_Lab.pdf',
    dateStr: 'Aug 15, 2024',
    size: '420 KB PDF',
    doctor: 'Dubai Central Diagnostic Labs',
    badge: 'Verified Lab',
    badgeTone: 'bg-tertiary-fixed text-on-tertiary-fixed',
    notes: 'Unstimulated Salivary Flow & pH Analysis: 0.42 mL/min (Normal), pH 7.1 Optimal.',
  },
];

export function InvestigationsScreen() {
  const [activeCategory, setActiveCategory] = useState<FileCategory>('all');
  const [selectedFiles, setSelectedFiles] = useState<string[]>(['opg-master']);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [contrastInverted, setContrastInverted] = useState(false);
  const [measureRulerVisible, setMeasureRulerVisible] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSelect = (id: string) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFiles = VAULT_FILES.filter((file) => {
    if (activeCategory === 'all') return true;
    return file.type === activeCategory;
  });

  return (
    <DashboardShell pageTitle="Investigations & Diagnostic Vault" showBack>
      <RecordsSubNav />

      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-secondary text-on-secondary px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <Icon name="check_circle" className="text-[20px]" />
          <span className="font-title-sm text-title-sm font-semibold">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-75"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary w-fit">
              <Icon name="lock" filled className="text-[15px]" />
              <span className="font-label-sm text-label-sm tracking-wide uppercase font-bold">
                Encrypted E-Health Vault (AES-256)
              </span>
            </div>
            <h1 className="font-headline-lg-mobile sm:font-headline-md text-headline-lg-mobile sm:text-headline-md text-on-surface font-bold tracking-tight mt-1.5">
              Investigations &amp; Diagnostic Vault
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
              Certified full-arch radiographs, bitewings, 3D volumetric DICOM files &amp; lab reports
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => showToast('Opening secure uploader for external clinic scans...')}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-title-sm text-title-sm font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Icon name="cloud_upload" className="text-[20px]" />
              <span>Upload Record</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Files (8)' },
            { id: 'radiograph', label: 'Radiographs (4)' },
            { id: 'photo', label: 'Clinical Photos (2)' },
            { id: 'lab', label: 'Lab Reports (2)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id as FileCategory)}
              className={`px-4 py-2 rounded-full font-label-md text-label-md font-semibold transition-all whitespace-nowrap shrink-0 ${
                activeCategory === tab.id
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Multi-Column Responsive PACS Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main PACS Rail (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">
            {/* OPG Full Panoramic Dental Radiograph Master Card */}
            {(activeCategory === 'all' || activeCategory === 'radiograph') && (
              <section className="rounded-2xl bg-surface-container-lowest p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                        <Icon name="verified" filled className="text-[14px]" />
                        <span>Clinician Verified</span>
                      </span>
                      <span className="font-label-code text-label-code text-on-surface-variant font-mono">
                        DHA_OPG_2024_0891.dicom
                      </span>
                    </div>

                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1.5">
                      Panoramic Dental Radiograph (OPG)
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Dec 12, 2024 • 14.2 MB • Full Maxillofacial Arch Radiogram
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSelect('opg-master')}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                      selectedFiles.includes('opg-master')
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                    aria-label="Toggle selection"
                  >
                    <Icon
                      name={selectedFiles.includes('opg-master') ? 'check_box' : 'check_box_outline_blank'}
                      className="text-[22px]"
                    />
                  </button>
                </div>

                {/* Interactive DICOM Radiography Viewer Canvas */}
                <div className="relative w-full rounded-2xl overflow-hidden bg-inverse-surface shadow-inner">
                  <div className="relative w-full h-64 sm:h-80 md:h-96 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0GUE-KpuTVgCEKJpz5C_8W4g2gotSLBObAN6dOD2y4D6FrL8GQ5r5ji2F4p2Q9XQM7ZIXjdl_aWAvZ_NyENj-SyUaY5IHs2XooC4NDpef0w93GooA4Joi4LVUd4Tvkpg9CzwCLhGIPBhxgOwxwtcJjRTSWMkWr_V7dw-UvY643XGZM0cdQGzL9sJrXi9mQfP4g7HkZjtcOTNqL6QZLYzXzIUwntKIrrmUka4FxHBZ"
                      alt="Full Panoramic OPG Dental Radiograph"
                      className="w-full h-full object-cover transition-transform duration-200"
                      style={{
                        transform: `scale(${zoomLevel})`,
                        filter: contrastInverted ? 'invert(1) hue-rotate(180deg)' : 'none',
                      }}
                    />

                    {/* Calibrated Bit-Depth HUD Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-inverse-surface/85 backdrop-blur-md text-inverse-on-surface font-label-code text-label-code border border-white/10 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                      <span>16-bit Grayscale • 0.12mm Calibrated</span>
                    </div>

                    {/* Ruler Tool Overlay */}
                    {measureRulerVisible && (
                      <div className="absolute bottom-4 left-4 right-4 bg-inverse-surface/90 backdrop-blur-md p-3 rounded-xl text-inverse-on-surface border border-white/10 animate-in fade-in duration-150">
                        <div className="flex justify-between font-label-code text-label-code text-secondary-fixed font-bold mb-1">
                          <span>Molar #46 Root Apex to Alveolar Crest</span>
                          <span>18.4 mm distance</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <div className="w-2/3 h-full bg-secondary-fixed rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Radiology Control Toolbar */}
                  <div className="bg-inverse-surface text-inverse-on-surface px-4 py-2.5 flex items-center justify-between gap-2 border-t border-white/10 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
                        className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 active:scale-95 text-inverse-on-surface transition-colors"
                        title="Zoom In"
                      >
                        <Icon name="zoom_in" className="text-[20px]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                        className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 active:scale-95 text-inverse-on-surface transition-colors"
                        title="Zoom Out"
                      >
                        <Icon name="zoom_out" className="text-[20px]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setContrastInverted(!contrastInverted)}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center active:scale-95 transition-colors ${
                          contrastInverted ? 'bg-secondary text-on-secondary' : 'hover:bg-white/10 text-inverse-on-surface'
                        }`}
                        title="Invert Contrast"
                      >
                        <Icon name="contrast" className="text-[20px]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setMeasureRulerVisible(!measureRulerVisible)}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center active:scale-95 transition-colors ${
                          measureRulerVisible ? 'bg-secondary text-on-secondary' : 'hover:bg-white/10 text-inverse-on-surface'
                        }`}
                        title="Measure Distance"
                      >
                        <Icon name="square_foot" className="text-[20px]" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setZoomLevel(1);
                          setContrastInverted(false);
                          setMeasureRulerVisible(false);
                        }}
                        className="px-3 py-1 rounded-lg text-secondary-fixed hover:bg-white/10 flex items-center gap-1 font-label-sm text-label-sm font-semibold transition-colors"
                      >
                        <Icon name="fullscreen" className="text-[18px]" />
                        <span>Fit-to-View</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Radiologist Clinical Interpretation */}
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-outline-variant/20">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Icon name="stethoscope" className="text-[18px]" />
                    <span className="font-label-md text-label-md font-bold">
                      Clinical Radiologist Interpretation
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface leading-relaxed mt-0.5">
                    Full permanent dentition visible. No apical radiolucency or periapical pathosis observed. Alveolar crest levels remain within physiological limits. Symmetrical condylar morphology bilaterally.
                  </p>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                    Verified by Radiologist <strong className="text-on-surface">Dr. Tariq Al-Nuaimi</strong> (DHA Lic #48201)
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => showToast('Downloading certified 14.2 MB DICOM archive...')}
                    className="flex-1 h-11 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Icon name="download" className="text-[18px]" />
                    <span>High-Res DICOM (14.2 MB)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Exporting high-contrast medical JPEG...')}
                    className="h-11 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Icon name="image" className="text-[18px] text-primary" />
                    <span>Export JPEG</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Generating secure 24h practitioner sharing token...')}
                    className="h-11 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Icon name="share" className="text-[18px] text-primary" />
                    <span>Share DICOM</span>
                  </button>
                </div>
              </section>
            )}

            {/* Other Vault Items List */}
            <div className="space-y-3">
              <h3 className="font-title-md text-title-md text-on-surface font-bold px-1">
                Intraoral Diagnostics &amp; Specialized Records
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="rounded-2xl bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        {file.thumbUrl ? (
                          <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-inverse-surface shrink-0 shadow-2xs">
                            <img
                              src={file.thumbUrl}
                              alt={file.title}
                              className="w-full h-full object-cover"
                            />
                            {file.code && (
                              <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-inverse-surface/85 text-inverse-on-surface font-label-code text-[9px] font-bold">
                                {file.code}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="w-18 h-18 rounded-xl bg-surface-container flex flex-col items-center justify-center text-primary shrink-0 shadow-2xs">
                            <Icon name="picture_as_pdf" className="text-[28px]" />
                            <span className="font-label-code text-[10px] mt-0.5 font-bold">PDF</span>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleSelect(file.id)}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                            selectedFiles.includes(file.id)
                              ? 'bg-primary text-on-primary shadow-xs'
                              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                          }`}
                        >
                          <Icon
                            name={selectedFiles.includes(file.id) ? 'check_box' : 'check_box_outline_blank'}
                            className="text-[20px]"
                          />
                        </button>
                      </div>

                      <div>
                        <span className={`px-2 py-0.5 rounded-full font-label-sm text-[11px] font-bold ${file.badgeTone}`}>
                          {file.badge}
                        </span>
                        <h4 className="font-title-sm text-title-sm text-on-surface font-bold mt-1 line-clamp-1">
                          {file.title}
                        </h4>
                        <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                          {file.dateStr} • {file.size}
                        </p>
                        {file.notes && (
                          <p className="font-body-sm text-[12px] text-on-surface-variant mt-1.5 bg-surface-container-low p-2 rounded-lg">
                            {file.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                      {file.type === 'lab' ? (
                        <button
                          type="button"
                          onClick={() => setPdfModalOpen(true)}
                          className="h-9 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Icon name="visibility" className="text-[16px]" />
                          <span>Preview PDF</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => showToast(`Preview loaded for ${file.title}`)}
                          className="h-9 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Icon name="visibility" className="text-[16px]" />
                          <span>View Image</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => showToast(`Downloaded ${file.fileName}`)}
                        className="w-9 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center transition-colors"
                        aria-label="Download"
                      >
                        <Icon name="download" className="text-[18px]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* External Records & Patient Uploads */}
            <section className="rounded-2xl bg-surface-container-low p-5 border border-outline-variant/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="folder_shared" className="text-primary text-[22px]" />
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">
                    Patient Uploads &amp; External Records
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">1 File</span>
              </div>

              <div className="rounded-xl bg-surface-container-lowest p-4 shadow-xs border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-[11px] font-bold">
                    <Icon name="info" className="text-[13px]" />
                    <span>Patient Uploaded — Not Clinically Verified</span>
                  </div>
                  <h4 className="font-title-sm text-title-sm text-on-surface font-semibold mt-1">
                    Previous Clinic Panoramic Scan
                  </h4>
                  <p className="font-body-sm text-[12px] text-on-surface-variant">
                    Uploaded Oct 18, 2023 • 8.1 MB • Exterior Provider (Dubai Healthcare City)
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Downloading external scan...')}
                  className="w-9 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0"
                  aria-label="Download external scan"
                >
                  <Icon name="download" className="text-[18px]" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => showToast('Opening secure document upload dialog...')}
                className="w-full h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
              >
                <Icon name="cloud_upload" className="text-[20px]" />
                <span>Upload New Diagnostic Scan or Lab Report</span>
              </button>
            </section>
          </div>

          {/* Sidebar PACS Rail (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Batch Selection Drawer Box */}
            <section className="rounded-2xl bg-surface-container-lowest p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  File Batch Operations
                </h3>
                <span className="font-label-sm text-label-sm text-primary font-bold bg-primary-fixed/40 px-2.5 py-0.5 rounded-full">
                  {selectedFiles.length} Selected
                </span>
              </div>

              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Select clinical radiographs and lab results to download an encrypted multi-file ZIP or generate a single-use specialist share code.
              </p>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => showToast(`Generating encrypted ZIP with ${selectedFiles.length} files...`)}
                  className="w-full h-11 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Icon name="archive" className="text-[18px]" />
                  <span>Download Selected (ZIP)</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Secure practitioner sharing token generated.')}
                  className="w-full h-11 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Icon name="share" className="text-[18px]" />
                  <span>Share with Provider</span>
                </button>
              </div>
            </section>

            {/* PACS Specifications Card */}
            <section className="rounded-2xl bg-surface-container-low p-5 border border-outline-variant/30 space-y-3">
              <h4 className="font-title-sm text-title-sm text-on-surface font-bold flex items-center gap-1.5">
                <Icon name="verified_user" className="text-secondary text-[18px]" />
                <span>PACS &amp; DICOM Standards</span>
              </h4>
              <div className="space-y-2 text-[12px] text-on-surface-variant">
                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span>Modality Standard</span>
                  <span className="font-bold text-on-surface">DICOM 3.0 / WADO-RS</span>
                </div>
                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span>Resolution</span>
                  <span className="font-bold text-on-surface">Up to 3000 x 1500 (16-bit)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-outline-variant/20">
                  <span>Encryption</span>
                  <span className="font-bold text-on-surface">AES-256 Vault at Rest</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Cloud Audit</span>
                  <span className="font-bold text-secondary">DHA Verified Hub</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {pdfModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setPdfModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-surface-container-lowest shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 flex items-center justify-between bg-surface-container-low border-b border-outline-variant/20">
              <div className="flex items-center gap-2.5">
                <Icon name="description" className="text-primary text-[22px]" />
                <div>
                  <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
                    Salivary_Panel_Lab.pdf
                  </h3>
                  <span className="font-label-sm text-[11px] text-on-surface-variant">
                    Dubai Central Diagnostic Laboratories
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPdfModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 max-h-[60vh]">
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-2xs space-y-3">
                <div className="flex justify-between items-center text-on-surface-variant font-label-code text-label-code">
                  <span>SAMPLE: #DHA-84920-LAB</span>
                  <span>AUG 15, 2024</span>
                </div>
                <h4 className="font-title-md text-title-md text-on-surface font-bold">
                  Unstimulated Salivary Flow &amp; pH Analysis
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-surface-container-low">
                    <span className="font-body-sm text-[12px] text-on-surface-variant">Flow Rate</span>
                    <p className="font-title-sm text-title-sm text-primary font-bold mt-0.5">
                      0.42 mL/min (Normal)
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low">
                    <span className="font-body-sm text-[12px] text-on-surface-variant">Buffering pH</span>
                    <p className="font-title-sm text-title-sm text-secondary font-bold mt-0.5">
                      7.1 Optimal
                    </p>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Histological evaluation reveals mild localized inflammatory infiltrate consistent with minor ductal micro-lithiasis. No cellular atypia or dysplasia detected.
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low flex items-center justify-end gap-2.5 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setPdfModalOpen(false)}
                className="h-10 px-4 rounded-xl text-on-surface-variant font-title-sm text-title-sm hover:bg-surface-container"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => {
                  setPdfModalOpen(false);
                  showToast('Downloaded Salivary_Panel_Lab.pdf');
                }}
                className="h-10 px-4 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <Icon name="download" className="text-[18px]" />
                <span>Download PDF (420 KB)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
