import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { RecordsSubNav } from './RecordsSubNav';
import { Icon } from '../../design/Primitives';

interface ToothData {
  id: number;
  name: string;
  quadrant: string;
  status: 'sound' | 'restored' | 'watch' | 'absent';
  conditionTitle?: string;
  details?: string;
  radiologyRef?: string;
  diagnosticType?: string;
}

const TOOTH_DIRECTORY: Record<number, ToothData> = {
  18: { id: 18, name: 'Upper Right 3rd Molar (Wisdom)', quadrant: 'Maxillary Q1', status: 'absent', details: 'Congenitally absent wisdom molar.' },
  17: { id: 17, name: 'Upper Right 2nd Molar', quadrant: 'Maxillary Q1', status: 'sound', details: 'Intact coronal structure, healthy marginal gingiva.' },
  16: {
    id: 16,
    name: 'Upper Right 1st Molar',
    quadrant: 'Maxillary Q1',
    status: 'restored',
    conditionTitle: 'Composite Resin Restoration',
    details: 'Intact margin, no secondary leakage, smooth surface contour. Excellent hygiene maintenance.',
    radiologyRef: 'Verified on Bitewing BW-01',
    diagnosticType: 'Radiographic Cleared',
  },
  15: { id: 15, name: 'Upper Right 2nd Premolar', quadrant: 'Maxillary Q1', status: 'sound', details: 'Sound natural enamel, stable interdental contact.' },
  14: { id: 14, name: 'Upper Right 1st Premolar', quadrant: 'Maxillary Q1', status: 'sound', details: 'Sound natural enamel.' },
  13: { id: 13, name: 'Upper Right Canine', quadrant: 'Maxillary Q1', status: 'sound', details: 'Sound canine guidance, intact cervical margin.' },
  12: { id: 12, name: 'Upper Right Lateral Incisor', quadrant: 'Maxillary Q1', status: 'sound', details: 'Healthy incisal edge, no attrition.' },
  11: { id: 11, name: 'Upper Right Central Incisor', quadrant: 'Maxillary Q1', status: 'sound', details: 'Sound enamel, physiological pulp response.' },

  21: { id: 21, name: 'Upper Left Central Incisor', quadrant: 'Maxillary Q2', status: 'sound', details: 'Sound enamel, symmetrical midline alignment.' },
  22: { id: 22, name: 'Upper Left Lateral Incisor', quadrant: 'Maxillary Q2', status: 'sound', details: 'Sound coronal structure.' },
  23: { id: 23, name: 'Upper Left Canine', quadrant: 'Maxillary Q2', status: 'sound', details: 'Sound canine guidance.' },
  24: { id: 24, name: 'Upper Left 1st Premolar', quadrant: 'Maxillary Q2', status: 'sound', details: 'Sound natural enamel.' },
  25: { id: 25, name: 'Upper Left 2nd Premolar', quadrant: 'Maxillary Q2', status: 'sound', details: 'Sound natural enamel.' },
  26: { id: 26, name: 'Upper Left 1st Molar', quadrant: 'Maxillary Q2', status: 'sound', details: 'Sound occlusal anatomy, no pit demineralization.' },
  27: { id: 27, name: 'Upper Left 2nd Molar', quadrant: 'Maxillary Q2', status: 'sound', details: 'Intact occlusal grooves.' },
  28: { id: 28, name: 'Upper Left 3rd Molar (Wisdom)', quadrant: 'Maxillary Q2', status: 'absent', details: 'Congenitally absent wisdom molar.' },

  48: { id: 48, name: 'Lower Right 3rd Molar (Wisdom)', quadrant: 'Mandibular Q4', status: 'absent', details: 'Congenitally absent wisdom molar.' },
  47: { id: 47, name: 'Lower Right 2nd Molar', quadrant: 'Mandibular Q4', status: 'sound', details: 'Sound natural anatomy.' },
  46: { id: 46, name: 'Lower Right 1st Molar', quadrant: 'Mandibular Q4', status: 'sound', details: 'Sound occlusal fissure, no pathology.' },
  45: { id: 45, name: 'Lower Right 2nd Premolar', quadrant: 'Mandibular Q4', status: 'sound', details: 'Sound natural tooth.' },
  44: { id: 44, name: 'Lower Right 1st Premolar', quadrant: 'Mandibular Q4', status: 'sound', details: 'Sound natural tooth.' },
  43: { id: 43, name: 'Lower Right Canine', quadrant: 'Mandibular Q4', status: 'sound', details: 'Healthy gingival contour.' },
  42: { id: 42, name: 'Lower Right Lateral Incisor', quadrant: 'Mandibular Q4', status: 'sound', details: 'Intact incisal margin.' },
  41: { id: 41, name: 'Lower Right Central Incisor', quadrant: 'Mandibular Q4', status: 'sound', details: 'Healthy lower anterior alignment.' },

  31: { id: 31, name: 'Lower Left Central Incisor', quadrant: 'Mandibular Q3', status: 'sound', details: 'Healthy lower anterior alignment.' },
  32: { id: 32, name: 'Lower Left Lateral Incisor', quadrant: 'Mandibular Q3', status: 'sound', details: 'Intact incisal margin.' },
  33: { id: 33, name: 'Lower Left Canine', quadrant: 'Mandibular Q3', status: 'sound', details: 'Healthy gingival contour.' },
  34: { id: 34, name: 'Lower Left 1st Premolar', quadrant: 'Mandibular Q3', status: 'sound', details: 'Sound natural tooth.' },
  35: { id: 35, name: 'Lower Left 2nd Premolar', quadrant: 'Mandibular Q3', status: 'sound', details: 'Sound natural tooth.' },
  36: {
    id: 36,
    name: 'Lower Left 1st Molar',
    quadrant: 'Mandibular Q3',
    status: 'watch',
    conditionTitle: 'Deep Pit Staining / Non-carious Fissure',
    details: 'Firm on tactile inspection with explorer probe. No active demineralization. Continue watchful monitoring at 6-month recall.',
    radiologyRef: 'Explorer Probe Confirmed',
    diagnosticType: 'Non-Invasive Watch',
  },
  37: { id: 37, name: 'Lower Left 2nd Molar', quadrant: 'Mandibular Q3', status: 'sound', details: 'Intact occlusal surface, stable contacts.' },
  38: { id: 38, name: 'Lower Left 3rd Molar (Wisdom)', quadrant: 'Mandibular Q3', status: 'absent', details: 'Congenitally absent wisdom molar.' },
};

const UPPER_RIGHT = [18, 17, 16, 15, 14, 13, 12, 11];
const UPPER_LEFT = [21, 22, 23, 24, 25, 26, 27, 28];
const LOWER_RIGHT = [48, 47, 46, 45, 44, 43, 42, 41];
const LOWER_LEFT = [31, 32, 33, 34, 35, 36, 37, 38];

export function ClinicalSummaryScreen() {
  const [selectedTooth, setSelectedTooth] = useState<ToothData | null>(TOOTH_DIRECTORY[16]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareRecipient, setShareRecipient] = useState('');
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleToothClick = (toothId: number) => {
    const data = TOOTH_DIRECTORY[toothId];
    if (data) {
      setSelectedTooth(data);
      const labels: Record<string, string> = {
        sound: 'Healthy / Sound enamel and periodontal margin.',
        restored: 'Composite Resin Restoration (Tooth #16). Intact margin.',
        watch: 'Non-carious pit staining under clinical monitoring (Tooth #36).',
        absent: 'Congenitally absent wisdom molar.',
      };
      setToastMessage(`Tooth #${toothId}: ${labels[data.status] || 'No findings recorded.'}`);
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    }
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setToastMessage('Clinical Summary PDF compiled & certified successfully.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1800);
  };

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareRecipient) return;
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
      setIsShareModalOpen(false);
      setShareRecipient('');
      setToastMessage('Encrypted link dispatched to recipient doctor.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1200);
  };

  const renderToothButton = (id: number) => {
    const tooth = TOOTH_DIRECTORY[id];
    if (!tooth) return null;

    const isSelected = selectedTooth?.id === id;

    if (tooth.status === 'absent') {
      return (
        <button
          key={id}
          type="button"
          onClick={() => handleToothClick(id)}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-surface-container-highest text-on-surface-variant opacity-60 active:scale-95 transition-all ${
            isSelected ? 'ring-2 ring-primary' : ''
          }`}
          title={`Tooth #${id} (Absent)`}
        >
          <span className="font-label-code text-label-code font-bold">{id}</span>
          <Icon name="close" className="text-[15px]" />
        </button>
      );
    }

    if (tooth.status === 'restored') {
      return (
        <button
          key={id}
          type="button"
          onClick={() => handleToothClick(id)}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-secondary-container text-on-secondary-container font-bold shadow-sm ring-2 ring-secondary active:scale-95 transition-all ${
            isSelected ? 'scale-105 shadow-md ring-offset-2' : ''
          }`}
          title={`Tooth #${id} (Restored)`}
        >
          <span className="font-label-code text-label-code">{id}</span>
          <div className="w-2 h-2 rounded-full bg-secondary mt-1"></div>
        </button>
      );
    }

    if (tooth.status === 'watch') {
      return (
        <button
          key={id}
          type="button"
          onClick={() => handleToothClick(id)}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-primary-fixed text-on-primary-fixed-variant font-bold shadow-sm ring-2 ring-primary active:scale-95 transition-all ${
            isSelected ? 'scale-105 shadow-md ring-offset-2' : ''
          }`}
          title={`Tooth #${id} (Watch / Monitor)`}
        >
          <span className="font-label-code text-label-code">{id}</span>
          <div className="w-2 h-2 rounded-full bg-primary mt-1"></div>
        </button>
      );
    }

    return (
      <button
        key={id}
        type="button"
        onClick={() => handleToothClick(id)}
        className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-low active:scale-95 transition-all ${
          isSelected ? 'ring-2 ring-primary' : ''
        }`}
        title={`Tooth #${id} (Sound)`}
      >
        <span className="font-label-code text-label-code font-semibold">{id}</span>
        <div className="w-1.5 h-1.5 rounded-full bg-outline-variant mt-1"></div>
      </button>
    );
  };

  return (
    <DashboardShell>
      <RecordsSubNav />

      {/* Floating toast notification */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 z-50 max-w-md p-3.5 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl flex items-center gap-3 animate-fade-in">
          <Icon name="info" className="text-[20px] text-secondary shrink-0" />
          <span className="font-body-sm text-body-sm leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <Icon name="share" className="text-[18px]" />
                </div>
                <h3 className="font-title-md text-title-md text-on-surface">Share Clinical Summary</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            {shareSuccess ? (
              <div className="p-6 text-center flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
                  <Icon name="check_circle" className="text-[28px]" />
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface">Transmission Queued</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  A cryptographic, expiring 72-hour access token has been generated for {shareRecipient}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleShareSubmit} className="flex flex-col gap-4">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Generate an encrypted DHA Clinical Exchange link for licensed specialists or secondary care clinics.
                </p>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">
                    Clinician Email or DHA Facility ID
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. dr.khalid@Lagoshealth.ae or FAC-8821"
                    value={shareRecipient}
                    onChange={(e) => setShareRecipient(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="bg-surface-container-low p-3 rounded-xl flex items-start gap-2.5 text-on-surface-variant">
                  <Icon name="lock" className="text-[18px] text-secondary shrink-0 mt-0.5" />
                  <span className="font-label-code text-[11px] leading-relaxed">
                    DHA Tele-Dental Standard: HIPAA & Nigeria Data Protection Act compliant. Record payload is end-to-end encrypted with DHA E-Health Vault.
                  </span>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsShareModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container text-title-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-title-sm flex items-center gap-2"
                  >
                    <Icon name="send" className="text-[18px]" />
                    <span>Send Encrypted Summary</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Title & Context Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Icon name="assignment_turned_in" className="text-primary text-[20px]" />
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                Verified Clinical Record
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-md sm:text-headline-lg text-on-surface">
              Clinical Summary &amp; Tooth Map
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Interactive visual overview of your dental status, FDI odontogram, and verified recommendations
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-4 py-2.5 bg-primary text-on-primary rounded-xl font-title-sm text-title-sm flex items-center gap-2 shadow-xs hover:bg-primary-container transition-all active:scale-95 disabled:opacity-60"
            >
              <Icon name={isDownloading ? 'hourglass_top' : 'picture_as_pdf'} className="text-[18px]" />
              <span>{isDownloading ? 'Generating...' : 'Export PDF'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="px-4 py-2.5 bg-secondary-container text-on-secondary-container rounded-xl font-title-sm text-title-sm flex items-center gap-2 shadow-xs hover:opacity-90 transition-all active:scale-95"
            >
              <Icon name="share" className="text-[18px]" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Verified Approval Banner */}
        <div className="flex items-start gap-4 p-4 sm:p-5 bg-secondary-container/30 border border-secondary/20 rounded-2xl shadow-xs">
          <div className="w-11 h-11 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0 mt-0.5 shadow-2xs">
            <Icon name="verified" className="text-[24px]" />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-title-md text-title-md text-on-surface font-bold">
                Patient-Friendly Clinical Summary
              </span>
              <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary text-on-secondary font-medium">
                DHA Certified
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Reviewed &amp; approved by{' '}
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                Dr. Chinedu Okafor
              </span>{' '}
              • Dec 12, 2024
            </p>
            <span className="font-label-code text-label-code text-secondary font-semibold">
              Licence DHA-DNT-88419 • Surulere Clinical Center
            </span>
          </div>
        </div>

        {/* Responsive 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Odontogram & Affected Teeth (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Universal Dental Matrix (FDI) Card */}
            <div className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 gap-5">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-2">
                  <Icon name="grid_view" className="text-primary text-[22px]" />
                  <h2 className="font-title-md text-title-md text-on-surface font-bold">
                    Universal Dental Matrix (FDI)
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-lg">
                    Interactive • 32 Teeth
                  </span>
                </div>
              </div>

              {/* Arch Diagram */}
              <div className="flex flex-col gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                {/* Upper Arch Indicator */}
                <div className="flex items-center justify-between px-1">
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wide">
                    Maxillary (Upper Arch)
                  </span>
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    R 18–11 | L 21–28
                  </span>
                </div>

                {/* Upper Arch Rows */}
                <div className="grid grid-cols-8 gap-1.5 sm:gap-2 w-full">
                  {UPPER_RIGHT.map(renderToothButton)}
                </div>
                <div className="grid grid-cols-8 gap-1.5 sm:gap-2 w-full">
                  {UPPER_LEFT.map(renderToothButton)}
                </div>

                {/* Mid-divider line with arch separator label */}
                <div className="flex items-center justify-center py-2">
                  <div className="h-0.5 bg-surface-container-highest flex-grow rounded-full"></div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant px-3 py-0.5 bg-surface-container-high rounded-full font-medium">
                    Occlusal Plane
                  </span>
                  <div className="h-0.5 bg-surface-container-highest flex-grow rounded-full"></div>
                </div>

                {/* Mandibular Lower Arch Indicator */}
                <div className="flex items-center justify-between px-1">
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wide">
                    Mandibular (Lower Arch)
                  </span>
                  <span className="font-label-code text-label-code text-on-surface-variant">
                    R 48–41 | L 31–38
                  </span>
                </div>

                {/* Lower Arch Rows */}
                <div className="grid grid-cols-8 gap-1.5 sm:gap-2 w-full">
                  {LOWER_RIGHT.map(renderToothButton)}
                </div>
                <div className="grid grid-cols-8 gap-1.5 sm:gap-2 w-full">
                  {LOWER_LEFT.map(renderToothButton)}
                </div>
              </div>

              {/* Interactive Odontogram Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="flex items-center gap-2 p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <div className="w-3.5 h-3.5 rounded-full bg-outline-variant shrink-0"></div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                      Sound / Healthy
                    </span>
                    <span className="font-label-code text-label-code text-on-surface-variant">26 teeth</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 bg-secondary-container/40 rounded-xl border border-secondary/20">
                  <div className="w-3.5 h-3.5 rounded-full bg-secondary shrink-0"></div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-label-sm text-on-secondary-container font-semibold truncate">
                      Restored
                    </span>
                    <span className="font-label-code text-label-code text-secondary font-bold">1 tooth (#16)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 bg-primary-fixed/50 rounded-xl border border-primary/20">
                  <div className="w-3.5 h-3.5 rounded-full bg-primary shrink-0"></div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-label-sm text-on-primary-fixed-variant font-semibold truncate">
                      Watch / Monitor
                    </span>
                    <span className="font-label-code text-label-code text-primary font-bold">1 tooth (#36)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 bg-surface-container-highest/60 rounded-xl border border-outline-variant/20">
                  <div className="w-3.5 h-3.5 rounded-full bg-outline shrink-0"></div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold truncate">
                      Absent
                    </span>
                    <span className="font-label-code text-label-code text-on-surface-variant">4 wisdom</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Tooth Live Callout Inspector */}
            {selectedTooth && (
              <div className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-xs border border-primary/20 p-5 gap-3 animate-fade-in">
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-title-sm ${
                        selectedTooth.status === 'restored'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : selectedTooth.status === 'watch'
                          ? 'bg-primary-fixed text-on-primary-fixed-variant'
                          : selectedTooth.status === 'absent'
                          ? 'bg-surface-container-highest text-on-surface-variant'
                          : 'bg-surface-container text-on-surface'
                      }`}
                    >
                      {selectedTooth.id}
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                        {selectedTooth.name}
                      </h3>
                      <span className="font-label-code text-label-code text-primary">
                        {selectedTooth.quadrant} • FDI Standard
                      </span>
                    </div>
                  </div>

                  <span
                    className={`font-label-sm text-label-sm px-3 py-1 rounded-full font-semibold uppercase ${
                      selectedTooth.status === 'restored'
                        ? 'bg-secondary-container text-on-secondary-container'
                        : selectedTooth.status === 'watch'
                        ? 'bg-primary-fixed text-on-primary-fixed-variant'
                        : selectedTooth.status === 'absent'
                        ? 'bg-surface-container-highest text-on-surface-variant'
                        : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    {selectedTooth.status}
                  </span>
                </div>

                <div className="bg-surface-container-low p-3.5 rounded-xl flex flex-col gap-1.5">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Clinical Finding &amp; Assessment:
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                    {selectedTooth.details}
                  </p>
                </div>

                {selectedTooth.radiologyRef && (
                  <div className="flex items-center justify-between pt-1 text-on-surface-variant">
                    <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-secondary">
                      <Icon name="radiology" className="text-[17px]" />
                      <span>{selectedTooth.radiologyRef}</span>
                    </div>
                    <span className="font-label-code text-label-code text-primary font-semibold">
                      {selectedTooth.diagnosticType}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Affected Teeth Detail Cards */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  Teeth Requiring Attention / Restored
                </h2>
                <span className="font-label-sm text-label-sm text-primary font-semibold bg-primary-fixed px-2.5 py-0.5 rounded-full">
                  2 Listed
                </span>
              </div>

              {/* Card 1: Tooth #16 */}
              <div className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold font-title-sm text-title-sm shadow-2xs">
                        16
                      </span>
                      <div>
                        <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                          Tooth #16 • Upper Right 1st Molar
                        </h3>
                        <span className="font-label-code text-label-code text-secondary font-medium">
                          Maxillary Quadrant 1
                        </span>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold flex items-center gap-1">
                      <Icon name="check_circle" className="text-[14px]" />
                      Restored (Sound)
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 p-3.5 bg-surface-container-low rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Clinical Condition
                      </span>
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Composite Resin Restoration
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      “Intact margin, no secondary leakage, smooth surface contour. Excellent hygiene maintenance.”
                    </p>
                  </div>
                </div>

                <div className="px-5 py-2.5 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <Icon name="radiology" className="text-[17px] text-secondary" />
                    <span className="font-label-sm text-label-sm">Verified on Bitewing BW-01</span>
                  </div>
                  <NavLink
                    to="/patient-dashboard/records/investigations"
                    className="font-label-code text-label-code text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Vault</span>
                    <Icon name="arrow_forward" className="text-[13px]" />
                  </NavLink>
                </div>
              </div>

              {/* Card 2: Tooth #36 */}
              <div className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden">
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center font-bold font-title-sm text-title-sm shadow-2xs">
                        36
                      </span>
                      <div>
                        <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                          Tooth #36 • Lower Left 1st Molar
                        </h3>
                        <span className="font-label-code text-label-code text-primary font-medium">
                          Mandibular Quadrant 3
                        </span>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-semibold flex items-center gap-1">
                      <Icon name="visibility" className="text-[14px]" />
                      Watch / Monitor
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 p-3.5 bg-surface-container-low rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        Clinical Condition
                      </span>
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Deep Pit Staining / Non-carious Fissure
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      “Firm on tactile inspection with explorer probe. No active demineralization. Continue watchful monitoring at 6-month recall.”
                    </p>
                  </div>
                </div>

                <div className="px-5 py-2.5 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-on-surface-variant">
                    <Icon name="clinical_notes" className="text-[17px] text-primary" />
                    <span className="font-label-sm text-label-sm">Explorer Probe Confirmed</span>
                  </div>
                  <span className="font-label-code text-label-code text-primary font-semibold">
                    Non-Invasive Watch
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Periodontal Metrics & Recommendations (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Gum & Periodontal Observations Card */}
            <div className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 gap-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-2">
                  <Icon name="health_and_safety" className="text-secondary text-[22px]" />
                  <h2 className="font-title-md text-title-md text-on-surface font-bold">
                    Gum &amp; Periodontal Observations
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                  Healthy Status
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Metric 1: Gingival Index */}
                <div className="flex flex-col p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Gingival Index (GI)
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">
                      Grade 1
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Mild marginal erythema, stable tissue attachment
                  </p>
                  <div className="w-full bg-surface-container-high h-2 rounded-full mt-2.5 overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                {/* Metric 2: Pocket Depths */}
                <div className="flex flex-col p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Sulcus Pocket Depths
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">
                      1 – 2 mm
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary font-medium mt-1">
                    Within healthy physiological limits
                  </p>
                  <div className="w-full bg-surface-container-high h-2 rounded-full mt-2.5 overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>

                {/* Metric 3: BOP */}
                <div className="flex flex-col p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Bleeding on Probing (BOP)
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">
                      6%
                    </span>
                    <span className="font-label-code text-label-code text-on-surface-variant">sites</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Low-risk threshold (&lt;10% target)
                  </p>
                  <div className="w-full bg-surface-container-high h-2 rounded-full mt-2.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Approved Clinician Recommendations Card */}
            <div className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 gap-3.5">
              <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
                <Icon name="recommend" className="text-primary text-[22px]" />
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Approved Clinician Recommendations
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="check" className="text-[17px]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Sulcular Brushing Regimen
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Continue brushing twice daily with gentle sulcular technique (Bass technique) using soft micro-bristles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <div className="w-7 h-7 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="check" className="text-[17px]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Interdental Hygiene Support
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Use interdental brushes (size 0.4mm pink) for lower molars once every evening before night rinse.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Recall Notice Banner */}
            <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-2xl border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs">
                  <Icon name="calendar_clock" className="text-[22px]" />
                </div>
                <div>
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                    6-Month Recall Scheduled
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Window: June 12 – June 20, 2025
                  </p>
                </div>
              </div>
              <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-medium">
                On Track
              </span>
            </div>

            {/* Quick Links to other records */}
            <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 flex flex-col gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Explore Linked Records
              </span>
              <div className="grid grid-cols-2 gap-2">
                <NavLink
                  to="/patient-dashboard/records/examinations"
                  className="p-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface flex items-center gap-2 font-body-sm text-body-sm font-medium transition-all"
                >
                  <Icon name="clinical_notes" className="text-primary text-[18px]" />
                  <span>Exam Notes</span>
                </NavLink>
                <NavLink
                  to="/patient-dashboard/records/investigations"
                  className="p-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface flex items-center gap-2 font-body-sm text-body-sm font-medium transition-all"
                >
                  <Icon name="radiology" className="text-tertiary text-[18px]" />
                  <span>Imaging Vault</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

