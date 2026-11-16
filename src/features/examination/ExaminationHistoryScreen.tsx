import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { QuickLinks } from '../../design/QuickLinks';
import { Icon } from '../../design/Primitives';

interface HistoricalExam {
  id: string;
  date: string;
  relativeTime: string;
  type: 'Comprehensive Examination' | 'Focused Examination';
  isCurrent?: boolean;
  clinician: string;
  license: string;
  facility: string;
  status: 'Sealed' | 'Baseline' | 'Complete' | 'Archived';
  statusColor: string;
  summary: string;
  studiesCount: number;
  badgeLabel?: string;
}

export function ExaminationHistoryScreen() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'comprehensive' | 'focused'>('all');
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>(['exam-1', 'exam-2']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const history: HistoricalExam[] = [
    {
      id: 'exam-1',
      date: '16 Feb 2025',
      relativeTime: 'Today • 10:47 GST',
      type: 'Comprehensive Examination',
      isCurrent: true,
      clinician: 'Dr. Daniel James',
      license: '#DEN-48912',
      facility: 'DHA Dental Care — Central Branch',
      status: 'Sealed',
      statusColor: 'bg-secondary-container text-on-secondary-container',
      summary: 'Tooth #16 cavitated occlusal-mesial dentinal caries (ICDAS 3/4) with reversible pulpitis. Localized gingivitis Q1 & Q4. Stable Class I occlusion.',
      studiesCount: 3,
      badgeLabel: 'ACTIVE SESSION',
    },
    {
      id: 'exam-2',
      date: '14 Oct 2024',
      relativeTime: '4 months ago',
      type: 'Comprehensive Examination',
      clinician: 'Dr. Tariq Mansoor',
      license: '#DEN-31204',
      facility: 'DHA Dental Care — Central Branch',
      status: 'Baseline',
      statusColor: 'bg-primary/15 text-primary',
      summary: 'Baseline comprehensive charting. Full dentition present. Existing amalgam restoration on #46 sound. Baseline panoramic radiograph (OPG) archived.',
      studiesCount: 1,
      badgeLabel: 'NABIDH BASELINE',
    },
    {
      id: 'exam-3',
      date: '12 Jan 2024',
      relativeTime: '13 months ago',
      type: 'Focused Examination',
      clinician: 'Dr. Daniel James',
      license: '#DEN-48912',
      facility: 'DHA Dental Care — Central Branch',
      status: 'Complete',
      statusColor: 'bg-surface-container text-on-surface',
      summary: 'Targeted assessment of Quadrant 1 transient cold sensitivity. Enamel demineralization noted at #16 fissure; topical 5% sodium fluoride varnish applied.',
      studiesCount: 0,
    },
    {
      id: 'exam-4',
      date: '05 Aug 2022',
      relativeTime: '2.5 years ago',
      type: 'Comprehensive Examination',
      clinician: 'Dr. Sarah Al-Rashid',
      license: '#DEN-22091',
      facility: 'Al Barsha Primary Health Centre',
      status: 'Archived',
      statusColor: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300',
      summary: 'Initial intake examination. Direct resin composite restoration placed on Tooth #21 Mesio-Incisal (MI) angle following minor incisal trauma.',
      studiesCount: 2,
      badgeLabel: 'GENESIS INTAKE',
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clinician.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === 'all'
        ? true
        : typeFilter === 'comprehensive'
        ? item.type === 'Comprehensive Examination'
        : item.type === 'Focused Examination';

    return matchesSearch && matchesType;
  });

  const toggleCompareSelection = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((x) => x !== id));
    } else {
      if (selectedForCompare.length >= 2) {
        setSelectedForCompare([selectedForCompare[1], id]);
      } else {
        setSelectedForCompare([...selectedForCompare, id]);
      }
    }
  };

  return (
    <ExaminationShell
      pageTitle="Examination History"
      badgeCode="10.18"
      badgeLabel="Longitudinal Record"
      currentStep="Longitudinal Clinical Examination Timeline & Archival Record"
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
            <span className="font-bold text-primary uppercase tracking-wider">Longitudinal Record • DHA Section 10</span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-surface-container-high px-2 py-0.5 rounded-full font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span>4 Clinical Encounters</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-sm sm:text-base text-on-surface">Longitudinal Examination Trajectory</span>
            <span className="text-outline">Patient: Chinedu Okafor (DHA-10482)</span>
          </div>
        </section>

        {/* Summary Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="text-[11px] text-on-surface-variant block">Total Examinations</span>
            <span className="text-xl font-bold font-mono text-on-surface">4</span>
            <span className="text-[10px] text-secondary block font-semibold">NABIDH Synchronized</span>
          </div>
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="text-[11px] text-on-surface-variant block">Comprehensive</span>
            <span className="text-xl font-bold font-mono text-primary">3</span>
            <span className="text-[10px] text-on-surface-variant block font-semibold">Full 8-Module Scopes</span>
          </div>
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="text-[11px] text-on-surface-variant block">Focused / Problem</span>
            <span className="text-xl font-bold font-mono text-blue-600">1</span>
            <span className="text-[10px] text-on-surface-variant block font-semibold">Q1 Fluoride Therapy</span>
          </div>
          <div className="p-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center">
            <span className="text-[11px] text-on-surface-variant block">Clinical Continuity</span>
            <span className="text-xl font-bold font-mono text-secondary">30 mo</span>
            <span className="text-[10px] text-secondary block font-semibold">Since Aug 2022</span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Icon name="search" className="absolute left-3 top-2.5 text-outline text-base" />
            <input
              type="text"
              placeholder="Search by diagnosis, doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-1.5 bg-surface-container p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  typeFilter === 'all' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'
                }`}
              >
                All (4)
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('comprehensive')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  typeFilter === 'comprehensive' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'
                }`}
              >
                Comprehensive (3)
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('focused')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  typeFilter === 'focused' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'
                }`}
              >
                Focused (1)
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-primary-container text-on-primary-container hover:opacity-90 transition-opacity text-xs font-bold flex items-center gap-1.5"
            >
              <Icon name="compare_arrows" className="text-sm" />
              <span>Compare</span>
            </button>
          </div>
        </div>

        {/* Longitudinal Timeline Stream */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-outline-variant/40">
          {filteredHistory.map((exam) => (
            <div key={exam.id} className="relative">
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 top-3 w-5 h-5 rounded-full border-2 border-surface flex items-center justify-center ${
                  exam.isCurrent ? 'bg-secondary animate-ping' : 'bg-primary'
                }`}
              />
              <div
                className={`absolute -left-6 sm:-left-8 top-3 w-5 h-5 rounded-full border-2 border-surface flex items-center justify-center ${
                  exam.isCurrent ? 'bg-secondary' : 'bg-primary'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Timeline Card */}
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-3 hover:border-primary/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-on-surface">{exam.type}</span>
                      {exam.badgeLabel && (
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                          {exam.badgeLabel}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${exam.statusColor}`}>
                        {exam.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-on-surface-variant flex-wrap">
                      <span className="font-bold text-primary">{exam.date}</span>
                      <span>({exam.relativeTime})</span>
                      <span>•</span>
                      <span>{exam.facility}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-on-surface">{exam.clinician}</span>
                    <span className="font-mono text-[10px] text-outline">{exam.license}</span>
                  </div>
                </div>

                <p className="text-xs text-on-surface leading-relaxed">
                  {exam.summary}
                </p>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
                    <Icon name="photo_library" className="text-sm text-primary" />
                    <span>{exam.studiesCount} Linked Studies / Scans</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => showToast(`Opening full archive for examination on ${exam.date}`)}
                      className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Icon name="visibility" className="text-sm text-primary" />
                      <span>View Dossier</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Selection Modal */}
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-surface-container-lowest max-w-lg w-full rounded-3xl p-6 border border-outline-variant/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-2">
                  <Icon name="compare" className="text-primary text-xl" />
                  <h3 className="text-sm font-bold text-on-surface">Select Two Encounters to Compare</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
                >
                  <Icon name="close" className="text-sm" />
                </button>
              </div>

              <p className="text-xs text-on-surface-variant">
                Side-by-side odontogram & periodontal probing depth diff analysis between examination dates.
              </p>

              <div className="space-y-2 text-xs">
                {history.map((h) => {
                  const isChecked = selectedForCompare.includes(h.id);
                  return (
                    <div
                      key={h.id}
                      onClick={() => toggleCompareSelection(h.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-primary/10 border-primary font-bold'
                          : 'bg-surface-container-low border-outline-variant/20 hover:bg-surface-container'
                      }`}
                    >
                      <div>
                        <span className="text-on-surface block">{h.date} — {h.type}</span>
                        <span className="text-[10px] text-outline font-normal">{h.clinician} • {h.facility}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center ${
                          isChecked ? 'bg-primary text-white' : 'border border-outline-variant'
                        }`}
                      >
                        {isChecked && <Icon name="check" className="text-xs" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-outline font-mono">
                  {selectedForCompare.length} of 2 Selected
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCompareModalOpen(false)}
                    className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={selectedForCompare.length !== 2}
                    onClick={() => {
                      setIsCompareModalOpen(false);
                      navigate('/odontogram/compare');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${
                      selectedForCompare.length === 2
                        ? 'bg-primary text-on-primary shadow-sm hover:bg-primary/90'
                        : 'bg-surface-container text-outline cursor-not-allowed'
                    }`}
                  >
                    Launch Diff Engine
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/examination/attachments')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Icon name="arrow_back" className="text-sm" />
            <span>Dossier Attachments</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/examination/workspace')}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <Icon name="dashboard" className="text-sm" />
            <span>Return to Workspace Overview</span>
          </button>
        </div>
      </div>
      <QuickLinks
        title="History Actions"
        links={[
          { to: '/examination/amendment', label: 'Addendum Amendment', icon: 'security_update_good' },
          { to: '/examination/patient-summary', label: 'Patient Summary', icon: 'preview' },
          { to: '/examination/recommendations', label: 'Follow-up Recommendations', icon: 'playlist_add_check' },
        ]}
      />
    </ExaminationShell>
  );
}

export default ExaminationHistoryScreen;

