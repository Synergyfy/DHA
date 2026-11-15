import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

interface DicomStudy {
  id: string;
  accession: string;
  title: string;
  modality: 'Bitewing' | 'Periapical' | 'Panoramic';
  date: string;
  time: string;
  reviewedBy: string;
  status: 'reviewed' | 'baseline' | 'pending';
  finding: string;
  kvp: number;
  exposureTime: string;
  targetTooth?: string;
  resolution: string;
}

export function InvestigationIntegrationScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'Bitewing' | 'Periapical' | 'Panoramic'>('all');
  const [selectedStudy, setSelectedStudy] = useState<DicomStudy | null>(null);
  const [brightness, setBrightness] = useState<number>(50);
  const [contrast, setContrast] = useState<number>(50);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const studies: DicomStudy[] = [
    {
      id: 'study-1',
      accession: 'BW-R-2025-0216',
      title: 'Right Posterior Bitewing Radiograph',
      modality: 'Bitewing',
      date: '16 Feb 2025',
      time: '09:42 GST',
      reviewedBy: 'Dr. Daniel James (#DEN-48912)',
      status: 'reviewed',
      finding: 'Coronal radiolucency involving outer third of dentin on Tooth #16 Occlusal-Mesial aspect. Correlates with ICDAS 3/4 active caries. Crestal bone level stable at 1.5mm from CEJ.',
      kvp: 65,
      exposureTime: '0.12s',
      targetTooth: '#16',
      resolution: '2400 x 1800 px (16-bit DICOM)',
    },
    {
      id: 'study-2',
      accession: 'PA-16-2025-0216',
      title: 'Periapical Radiograph — Tooth #16',
      modality: 'Periapical',
      date: '16 Feb 2025',
      time: '09:48 GST',
      reviewedBy: 'Dr. Daniel James (#DEN-48912)',
      status: 'reviewed',
      finding: 'Continuous lamina dura and uniform periodontal ligament space around mesiobuccal, distobuccal, and palatal roots. No periapical radiolucency. Root anatomy normal.',
      kvp: 70,
      exposureTime: '0.14s',
      targetTooth: '#16',
      resolution: '2048 x 1536 px (16-bit DICOM)',
    },
    {
      id: 'study-3',
      accession: 'OPG-2024-1014',
      title: 'Digital Orthopantomogram (Panoramic)',
      modality: 'Panoramic',
      date: '14 Oct 2024',
      time: '11:15 GST',
      reviewedBy: 'Dr. Tariq Mansoor (#DEN-31204)',
      status: 'baseline',
      finding: 'Baseline full dentition. Symmetrical condylar heads bilaterally. Maxillary sinuses clear. No radiopaque or radiolucent bony pathologies across maxilla and mandible.',
      kvp: 74,
      exposureTime: '14.2s',
      resolution: '3000 x 1500 px (16-bit DICOM)',
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredStudies = activeFilter === 'all'
    ? studies
    : studies.filter((s) => s.modality === activeFilter);

  return (
    <ExaminationShell
      pageTitle="Investigation Integration"
      badgeCode="10.11"
      badgeLabel="Module 7 of 8"
      currentStep="Module 7: Radiographic & Diagnostic Imaging Integration"
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
            <span className="font-bold text-primary uppercase tracking-wider">Module 7 of 8 • DHA Section 10</span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Section 11 Investigations Linked</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-sm sm:text-base text-on-surface">Radiographic Integration & DICOM Hub</span>
            <span className="text-outline">Attending: Dr. Daniel James</span>
          </div>
        </section>

        {/* NABIDH DICOM Hub Banner */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold shrink-0">
              <Icon name="photo_library" className="text-xl text-secondary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-on-surface">NABIDH PACS Diagnostic Bridge</h2>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-[10px] font-bold">
                  3 ACTIVE DICOM STUDIES
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Direct DICOM retrieval with lossless bit-depth calibration and calibrated measurement tools
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => showToast('Connecting to NABIDH Central PACS Archive...')}
            className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Icon name="refresh" className="text-sm text-primary" />
            <span>Sync PACS</span>
          </button>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
            }`}
          >
            All Studies ({studies.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('Bitewing')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeFilter === 'Bitewing'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
            }`}
          >
            Bitewings (1)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('Periapical')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeFilter === 'Periapical'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
            }`}
          >
            Periapical (1)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('Panoramic')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeFilter === 'Panoramic'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
            }`}
          >
            Panoramic (1)
          </button>
        </div>

        {/* Diagnostic Studies Cards Grid */}
        <div className="space-y-4">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-4 hover:border-primary/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold">
                    <Icon
                      name={
                        study.modality === 'Bitewing'
                          ? 'dentistry'
                          : study.modality === 'Periapical'
                          ? 'straighten'
                          : 'panorama'
                      }
                      className="text-xl"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-on-surface">{study.title}</h3>
                      <span className="px-2 py-0.5 rounded bg-surface-container text-[10px] font-mono font-bold text-primary">
                        {study.accession}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">
                      Acquired {study.date} • {study.time} • {study.reviewedBy}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      study.status === 'reviewed'
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    {study.status === 'reviewed' ? 'Clinically Reviewed' : 'Baseline Reference'}
                  </span>
                </div>
              </div>

              {/* Study Radiographic Thumbnail and Diagnostic Finding */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Simulated DICOM Preview Frame */}
                <div
                  onClick={() => setSelectedStudy(study)}
                  className="relative h-44 rounded-xl bg-neutral-900 overflow-hidden cursor-pointer group border border-outline-variant/30 flex flex-col items-center justify-center p-3"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                    <Icon name="radiology" className="text-4xl mb-1 text-primary-fixed-dim" />
                    <span className="text-[11px] font-mono font-bold text-neutral-300">
                      {study.modality.toUpperCase()} DICOM
                    </span>
                    <span className="text-[9px] text-neutral-500 font-mono mt-0.5">
                      {study.resolution}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-black/80 text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Icon name="fullscreen" className="text-base" />
                      <span>Launch DICOM Viewer</span>
                    </span>
                  </div>

                  {study.targetTooth && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-red-400 font-mono text-[10px] font-bold">
                      Target: {study.targetTooth}
                    </div>
                  )}
                </div>

                {/* Finding & Correlated Diagnosis */}
                <div className="md:col-span-2 space-y-3">
                  <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface">Radiologist / Clinician Finding</span>
                      <span className="text-[10px] text-outline font-mono">
                        {study.kvp} kVp • {study.exposureTime}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface leading-relaxed">
                      {study.finding}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedStudy(study)}
                        className="px-3 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center gap-1.5 hover:bg-primary/90 transition-colors"
                      >
                        <Icon name="zoom_in" className="text-sm" />
                        <span>View Full Res</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast(`DICOM calibration verified for ${study.accession}`)}
                        className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Icon name="straighten" className="text-sm text-primary" />
                        <span>Measure</span>
                      </button>
                    </div>

                    <span className="text-[10px] text-outline font-mono">
                      NABIDH SHA-256 Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DICOM Full-Resolution Modal Viewer */}
        {selectedStudy && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
            <div className="bg-surface-container-lowest max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 flex flex-col max-h-[92vh]">
              {/* Modal Header */}
              <div className="bg-surface-container-low p-4 border-b border-outline-variant/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold">
                    <Icon name="radiology" className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">{selectedStudy.title}</h3>
                    <p className="text-[11px] font-mono text-on-surface-variant">
                      {selectedStudy.accession} • {selectedStudy.resolution}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStudy(null)}
                  className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
                >
                  <Icon name="close" className="text-base" />
                </button>
              </div>

              {/* Viewer Workspace */}
              <div className="p-4 bg-black flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-[320px]">
                {/* Mock High-Res Canvas */}
                <div
                  className="w-full max-w-lg aspect-[4/3] rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center text-neutral-300 relative shadow-inner"
                  style={{
                    filter: `brightness(${brightness / 50}) contrast(${contrast / 50})`,
                  }}
                >
                  <Icon name="dentistry" className="text-8xl text-neutral-600 mb-2" />
                  <span className="font-mono text-sm font-bold tracking-wide">
                    {selectedStudy.modality.toUpperCase()} DICOM ENGINE
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500 mt-1">
                    Lossless Bit-Depth Calibrated (NABIDH PACS)
                  </span>

                  {selectedStudy.targetTooth && (
                    <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/75 border border-red-500/40 text-left">
                      <span className="text-[10px] text-red-400 font-bold block">PATHOLOGY REGION</span>
                      <span className="font-mono text-xs text-white">Tooth {selectedStudy.targetTooth} OM Caries</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 text-[9px] font-mono text-neutral-500">
                    W: 2400 | L: 1200
                  </div>
                </div>
              </div>

              {/* Window / Level Controls Toolbar */}
              <div className="p-4 bg-surface-container-low border-t border-outline-variant/30 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span>Brightness (Window Level)</span>
                      <span>{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[11px]">
                      <span>Contrast (Window Width)</span>
                      <span>{contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={contrast}
                      onChange={(e) => setContrast(parseInt(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-[11px] text-on-surface-variant truncate mr-2">
                    Finding: <span className="font-semibold text-on-surface">{selectedStudy.finding}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setBrightness(50);
                      setContrast(50);
                      showToast('Window/Level Reset to Default');
                    }}
                    className="px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold shrink-0"
                  >
                    Reset W/L
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global DICOM Link Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
          <div className="flex items-center gap-2">
            <Icon name="add_to_queue" className="text-primary text-xl" />
            <span className="text-xs text-on-surface font-semibold">
              Need to append another radiograph or scan to this examination session?
            </span>
          </div>
          <button
            type="button"
            onClick={() => showToast('Opening NABIDH DICOM Study Selector...')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Icon name="link" className="text-sm text-primary" />
            <span>+ Link New Study</span>
          </button>
        </div>

        {/* Footer Navigation Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/examination/odontogram-integration')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Icon name="arrow_back" className="text-sm" />
            <span>Module 6: Odontogram</span>
          </button>

          <button
            type="button"
            onClick={() => {
              showToast('Investigations Synced and Sealed');
              navigate('/examination/assessment');
            }}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <span>Module 8: Assessment</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </div>
    </ExaminationShell>
  );
}

export default InvestigationIntegrationScreen;

