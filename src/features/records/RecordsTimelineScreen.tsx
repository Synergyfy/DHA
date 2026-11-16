import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { RecordsSubNav } from './RecordsSubNav';
import { Icon } from '../../design/Primitives';

type YearFilter = 'all' | '2024' | '2023' | '2022';
type ModalityFilter = 'all' | 'exams' | 'radiographs' | 'screenings' | 'treatments' | 'amendments';

interface TimelineEvent {
  id: string;
  year: '2024' | '2023' | '2022';
  modality: 'exams' | 'radiographs' | 'screenings' | 'treatments' | 'amendments';
  dateStr: string;
  badgeLabel: string;
  badgeIcon: string;
  badgeClass: string;
  dotClass: string;
  title: string;
  clinicianOrFacility: string;
  clinicianIcon: string;
  summarySnippet: string;
  contentNode: 'amendment' | 'exam' | 'imaging' | 'screening' | 'prophylaxis' | 'historical';
}

const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: 'node-1',
    year: '2024',
    modality: 'amendments',
    dateStr: 'DEC 20, 2024',
    badgeLabel: 'Amendment',
    badgeIcon: 'edit_note',
    badgeClass: 'bg-primary-fixed text-on-primary-fixed-variant',
    dotClass: 'bg-primary-container',
    title: 'Record Amendment v1.1',
    clinicianOrFacility: 'Dr. Chinedu Okafor (Prosthodontics)',
    clinicianIcon: 'stethoscope',
    summarySnippet: 'Tooth #16 post-op thermal vitality note updated following restorative check.',
    contentNode: 'amendment',
  },
  {
    id: 'node-2',
    year: '2024',
    modality: 'exams',
    dateStr: 'DEC 12, 2024',
    badgeLabel: 'Clinical Exam',
    badgeIcon: 'clinical_notes',
    badgeClass: 'bg-secondary-container text-on-secondary-container',
    dotClass: 'bg-secondary-fixed text-on-secondary-fixed',
    title: 'Comprehensive Examination & Routine Charting',
    clinicianOrFacility: 'Lagos Smile Dental Centre • Clinic Room 4B',
    clinicianIcon: 'domain',
    summarySnippet: '28 teeth checked • 1 restored • Periodontal health physiologically stable.',
    contentNode: 'exam',
  },
  {
    id: 'node-3',
    year: '2024',
    modality: 'radiographs',
    dateStr: 'DEC 12, 2024',
    badgeLabel: 'Radiograph',
    badgeIcon: 'radiology',
    badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    dotClass: 'bg-tertiary',
    title: 'Diagnostic Imaging - High-Res Bitewing Series',
    clinicianOrFacility: 'Al Zahra Radiology Suite • DICOM Encrypted',
    clinicianIcon: 'medical_services',
    summarySnippet: '2x High-contrast bitewings (BW-Right #14–#17, BW-Left #24–#27) archived in DICOM vault.',
    contentNode: 'imaging',
  },
  {
    id: 'node-4',
    year: '2024',
    modality: 'screenings',
    dateStr: 'OCT 14, 2024',
    badgeLabel: 'Screening',
    badgeIcon: 'assignment_turned_in',
    badgeClass: 'bg-surface-container-high text-on-surface-variant',
    dotClass: 'bg-outline',
    title: 'Community Dental Screening',
    clinicianOrFacility: 'Lagos Primary Care Mobile Screening Camp #3',
    clinicianIcon: 'health_and_safety',
    summarySnippet: 'Mobile field triage observation • Referral REF-DHA-2024-8841 generated.',
    contentNode: 'screening',
  },
  {
    id: 'node-5',
    year: '2024',
    modality: 'treatments',
    dateStr: 'AUG 05, 2024',
    badgeLabel: 'Treatment',
    badgeIcon: 'check_circle',
    badgeClass: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    dotClass: 'bg-secondary',
    title: 'Preventive Prophylaxis & Scaling Completed',
    clinicianOrFacility: 'Dr. Amina Bello (Dental Hygienist)',
    clinicianIcon: 'person_check',
    summarySnippet: 'Full-mouth supragingival ultrasonic debridement with topical fluoridation.',
    contentNode: 'prophylaxis',
  },
  {
    id: 'node-6',
    year: '2023',
    modality: 'exams',
    dateStr: 'MAR 18, 2023',
    badgeLabel: 'Legacy File',
    badgeIcon: 'person',
    badgeClass: 'bg-surface-container text-on-surface-variant',
    dotClass: 'bg-surface-container text-outline',
    title: 'Historical Records Intake',
    clinicianOrFacility: 'Patient Upload • Legacy Clinic PDF',
    clinicianIcon: 'cloud_done',
    summarySnippet: 'Archive_Prior_Dentist_2022.pdf (2.4 MB) • Certified hash attached.',
    contentNode: 'historical',
  },
];

export function RecordsTimelineScreen() {
  const [selectedYear, setSelectedYear] = useState<YearFilter>('all');
  const [selectedModality, setSelectedModality] = useState<ModalityFilter>('all');
  const [activeImageZoom, setActiveImageZoom] = useState<string | null>(null);
  const [isAmendmentModalOpen, setIsAmendmentModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  // Default: start with the first item expanded, others collapsed for clean concise layout
  const [expandedEventIds, setExpandedEventIds] = useState<Set<string>>(new Set(['node-1']));

  const toggleExpand = (id: string) => {
    setExpandedEventIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedEventIds(new Set(TIMELINE_DATA.map((e) => e.id)));
  };

  const collapseAll = () => {
    setExpandedEventIds(new Set());
  };

  const filteredEvents = TIMELINE_DATA.filter((evt) => {
    const matchYear = selectedYear === 'all' || evt.year === selectedYear;
    const matchModality = selectedModality === 'all' || evt.modality === selectedModality;
    return matchYear && matchModality;
  });

  const handleExportPortfolio = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setToastMessage('Complete DHA Dental Health Portfolio exported (ZIP with SHA-256 manifest).');
      setTimeout(() => setToastMessage(null), 3500);
    }, 1800);
  };

  return (
    <DashboardShell pageTitle="Records & History">
      <RecordsSubNav />

      {/* Floating notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 z-50 max-w-md p-3 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl flex items-center gap-2.5 animate-in fade-in duration-200">
          <Icon name="check_circle" className="text-[18px] text-secondary shrink-0" />
          <span className="text-xs leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Bitewing Zoom Lightbox Modal */}
      {activeImageZoom && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveImageZoom(null)}
        >
          <div className="relative max-w-3xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl p-2 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setActiveImageZoom(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors z-10"
            >
              <Icon name="close" className="text-[20px]" />
            </button>
            <img src={activeImageZoom} alt="Enlarged radiograph" className="w-full max-h-[75vh] object-contain rounded-xl" />
            <div className="p-2.5 text-center text-white/80 text-[11px] font-mono">
              High-Resolution Bitewing Radiograph • Certified Medical Lossless Frame
            </div>
          </div>
        </div>
      )}

      {/* Amendment Modal */}
      {isAmendmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-4 sm:p-5 shadow-2xl flex flex-col gap-3 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center">
                  <Icon name="edit_note" className="text-[16px]" />
                </div>
                <h3 className="text-sm sm:text-base text-on-surface font-semibold">
                  Amendment Audit Trail (v1.1)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAmendmentModalOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Every EHR entry modified post-signing undergoes cryptographic hash recalculation and logs the attending clinician credential.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-surface-container-low rounded-xl border-l-4 border-primary">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-primary font-bold">Version 1.1 (Active)</span>
                  <span className="text-on-surface-variant text-[10px]">Dec 20, 2024 • 14:22</span>
                </div>
                <p className="text-on-surface mt-1">
                  Appended thermal sensitivity response verification on tooth #16 composite restoration.
                </p>
                <span className="text-[10px] text-on-surface-variant mt-0.5 block">
                  Author: Dr. Chinedu Okafor (DHA #D-3309)
                </span>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl border-l-4 border-outline-variant opacity-75">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-on-surface-variant font-bold">Version 1.0 (Baseline)</span>
                  <span className="text-on-surface-variant text-[10px]">Dec 12, 2024 • 11:05</span>
                </div>
                <p className="text-on-surface-variant mt-1">
                  Initial examination note recorded after comprehensive charting session.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setIsAmendmentModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container"
              >
                Close Audit Log
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Title & Context Card */}
        <div className="rounded-2xl bg-surface-container-lowest p-4 sm:p-5 shadow-xs border border-outline-variant/30 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-[10px] uppercase tracking-wider text-secondary font-semibold">
                Verified EHR Stream
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] bg-surface-container px-2 py-0.5 rounded-full text-primary font-semibold">
                MRN-9402-AE
              </span>
              <span className="text-[10px] text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-md">
                Amara Khan
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-on-surface">
              Records Timeline
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
              Longitudinal dental health trail from clinical visits, community outreach, and imaging investigations
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-3 gap-2 bg-surface-container-low p-2.5 sm:p-3 rounded-xl border border-outline-variant/20">
            <div className="flex flex-col">
              <span className="text-[10px] text-on-surface-variant">Verified Logs</span>
              <span className="text-sm sm:text-base font-bold text-primary">
                14 Events
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-on-surface-variant">Active Arch</span>
              <span className="text-sm sm:text-base font-bold text-secondary">
                28 Teeth
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-on-surface-variant">Last Clinical</span>
              <span className="text-sm sm:text-base font-bold text-on-surface">
                Dec 2024
              </span>
            </div>
          </div>
        </div>

        {/* Filter Carousel & Modality Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-surface-container-lowest p-2.5 sm:p-3 rounded-2xl border border-outline-variant/30 shadow-xs">
          {/* Horizontal Scroll Year Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={() => setSelectedYear('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-xs ${
                selectedYear === 'all'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              All Events
            </button>
            <button
              type="button"
              onClick={() => setSelectedYear('2024')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedYear === '2024'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              2024{' '}
              <span className="bg-surface-container-highest px-1.5 py-0.2 rounded-full font-mono text-[10px] ml-1 text-primary">
                8
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedYear('2023')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedYear === '2023'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              2023{' '}
              <span className="bg-surface-container-highest px-1.5 py-0.2 rounded-full font-mono text-[10px] ml-1 text-primary">
                4
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedYear('2022')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedYear === '2022'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              2022{' '}
              <span className="bg-surface-container-highest px-1.5 py-0.2 rounded-full font-mono text-[10px] ml-1 text-primary">
                2
              </span>
            </button>
          </div>

          {/* Action buttons & Type Filter */}
          <div className="flex items-center gap-2 justify-between sm:justify-end">
            <button
              type="button"
              onClick={() => {
                if (expandedEventIds.size === filteredEvents.length) {
                  collapseAll();
                } else {
                  expandAll();
                }
              }}
              className="text-[11px] text-primary font-semibold hover:underline flex items-center gap-1 shrink-0 px-2 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors"
            >
              <Icon
                name={expandedEventIds.size === filteredEvents.length ? 'unfold_less' : 'unfold_more'}
                className="text-[15px]"
              />
              <span>{expandedEventIds.size === filteredEvents.length ? 'Collapse All' : 'Expand All'}</span>
            </button>

            <div className="relative flex-1 sm:flex-initial">
              <select
                aria-label="Filter events by activity type"
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value as ModalityFilter)}
                className="appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface text-xs py-1.5 pl-2.5 pr-7 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer w-full font-medium"
              >
                <option value="all">All Modalities</option>
                <option value="exams">Examinations</option>
                <option value="radiographs">Radiographs</option>
                <option value="screenings">Screenings</option>
                <option value="treatments">Treatments</option>
                <option value="amendments">Amendments</option>
              </select>
              <Icon
                name="expand_more"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* Main Timeline Column (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Interactive Timeline Track */}
            <div className="relative flex flex-col pl-6 sm:pl-7">
              {/* Continuous Vertical Spine */}
              <div className="absolute left-2.5 sm:left-3 top-3 bottom-6 w-0.5 bg-gradient-to-b from-primary via-secondary to-outline-variant"></div>

              {/* Timeline Entries Container */}
              <div className="flex flex-col gap-3.5">
                {filteredEvents.length === 0 ? (
                  <div className="p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 text-center flex flex-col items-center gap-2">
                    <Icon name="event_busy" className="text-[32px] text-on-surface-variant" />
                    <span className="text-sm font-semibold text-on-surface">No events found</span>
                    <p className="text-xs text-on-surface-variant">
                      No events match the selected year and modality filter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedYear('all');
                        setSelectedModality('all');
                      }}
                      className="mt-1 text-primary text-xs font-semibold hover:underline"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  filteredEvents.map((evt) => {
                    const isExpanded = expandedEventIds.has(evt.id);

                    return (
                      <div key={evt.id} className="relative flex flex-col gap-1.5 group">
                        {/* Milestone Node Marker */}
                        <div className="absolute -left-[27px] sm:-left-[30px] top-2 w-5 h-5 rounded-full bg-surface-container-lowest border-2 border-surface-container-lowest flex items-center justify-center shadow-md">
                          {evt.contentNode === 'exam' ? (
                            <div className="w-full h-full rounded-full bg-secondary-fixed flex items-center justify-center">
                              <Icon name="verified" className="text-on-secondary-fixed text-[12px]" />
                            </div>
                          ) : evt.contentNode === 'prophylaxis' ? (
                            <div className="w-full h-full rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                              <Icon name="healing" className="text-[11px]" />
                            </div>
                          ) : evt.contentNode === 'historical' ? (
                            <div className="w-full h-full rounded-full bg-surface-container flex items-center justify-center text-outline">
                              <Icon name="file_upload" className="text-[11px]" />
                            </div>
                          ) : (
                            <span className={`w-2.5 h-2.5 rounded-full ${evt.dotClass}`}></span>
                          )}
                        </div>

                        {/* Collapsible Card Container: Short information by default */}
                        <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 overflow-hidden hover:border-primary/40 transition-colors">
                          {/* Compact Summary Header (Always Visible, Click to Toggle) */}
                          <button
                            type="button"
                            onClick={() => toggleExpand(evt.id)}
                            className="w-full p-3 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-surface-container-lowest/80 transition-colors"
                            aria-expanded={isExpanded}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-mono text-primary font-bold text-[10px] sm:text-xs">
                                  {evt.dateStr}
                                </span>
                                <span
                                  className={`${evt.badgeClass} text-[9px] uppercase px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold`}
                                >
                                  <Icon name={evt.badgeIcon} className="text-[11px]" />
                                  <span>{evt.badgeLabel}</span>
                                </span>
                              </div>

                              <h2 className="text-xs sm:text-sm font-bold text-on-surface truncate">
                                {evt.title}
                              </h2>

                              <div className="flex items-center gap-1 text-on-surface-variant text-[11px] mt-0.5 truncate">
                                <Icon name={evt.clinicianIcon} className="text-[14px] text-primary shrink-0" />
                                <span className="truncate">{evt.clinicianOrFacility}</span>
                              </div>

                              {/* Concise snippet shown when collapsed so user gets context without full detail clutter */}
                              {!isExpanded && (
                                <p className="text-[11px] text-on-surface-variant/80 mt-1 line-clamp-1 italic">
                                  {evt.summarySnippet}
                                </p>
                              )}
                            </div>

                            {/* Expand/Collapse Chevron indicator */}
                            <div className="flex items-center gap-1 shrink-0 ml-1">
                              <span className="text-[10px] text-primary font-semibold hidden sm:inline">
                                {isExpanded ? 'Less' : 'Details'}
                              </span>
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 ${
                                  isExpanded ? 'bg-primary-fixed text-primary rotate-180' : 'bg-surface-container text-on-surface-variant'
                                }`}
                              >
                                <Icon name="expand_more" className="text-[18px]" />
                              </div>
                            </div>
                          </button>

                          {/* Expanded Full Details Section */}
                          {isExpanded && (
                            <div className="px-3 pb-3 sm:px-4 sm:pb-4 pt-1 border-t border-outline-variant/20 flex flex-col gap-3 animate-in fade-in duration-150">
                              {evt.contentNode === 'amendment' && (
                                <>
                                  <div className="bg-surface-container-low rounded-xl p-2.5 sm:p-3 flex flex-col gap-1 border border-outline-variant/20">
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                                      <span className="text-xs font-semibold text-on-surface">
                                        Tooth #16 • Maxillary Right First Molar
                                      </span>
                                    </div>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">
                                      Updated post-operative sensitivity note on tooth #16 composite restoration following secondary thermal vitality response check.
                                    </p>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => setIsAmendmentModalOpen(true)}
                                    className="flex items-center justify-between py-2 px-3 bg-surface-container rounded-xl text-primary hover:bg-surface-container-high transition-colors"
                                  >
                                    <span className="text-xs flex items-center gap-1.5 font-semibold">
                                      <Icon name="history" className="text-[16px]" />
                                      View Amendment History (2 versions)
                                    </span>
                                    <Icon name="chevron_right" className="text-[18px]" />
                                  </button>
                                </>
                              )}

                              {evt.contentNode === 'exam' && (
                                <>
                                  {/* Summary Metrics Grid */}
                                  <div className="grid grid-cols-3 gap-2 bg-surface-container-low p-2.5 rounded-xl text-center border border-outline-variant/20">
                                    <div className="flex flex-col items-center">
                                      <span className="text-sm sm:text-base font-bold text-on-surface leading-none">
                                        28
                                      </span>
                                      <span className="text-[10px] text-on-surface-variant mt-0.5">
                                        Teeth Checked
                                      </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <span className="text-sm sm:text-base font-bold text-primary leading-none">
                                        1
                                      </span>
                                      <span className="text-[10px] text-on-surface-variant mt-0.5">
                                        Restored
                                      </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <span className="text-sm sm:text-base font-bold text-secondary leading-none">
                                        Healthy
                                      </span>
                                      <span className="text-[10px] text-on-surface-variant mt-0.5">
                                        Periodontal
                                      </span>
                                    </div>
                                  </div>

                                  {/* Linked Assets */}
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                                      Linked Records &amp; Assets
                                    </span>
                                    <div className="flex flex-col sm:flex-row items-center gap-2">
                                      <NavLink
                                        to="/patient-dashboard/records/investigations"
                                        className="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high px-2.5 py-1.5 rounded-xl w-full sm:flex-1 transition-colors"
                                      >
                                        <Icon name="radiology" className="text-primary text-[16px]" />
                                        <span className="text-xs text-on-surface truncate">
                                          Panoramic OPG
                                        </span>
                                      </NavLink>
                                      <NavLink
                                        to="/patient-dashboard/records/investigations"
                                        className="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high px-2.5 py-1.5 rounded-xl w-full sm:flex-1 transition-colors"
                                      >
                                        <Icon name="burst_mode" className="text-primary text-[16px]" />
                                        <span className="text-xs text-on-surface truncate">
                                          2x Bitewings
                                        </span>
                                      </NavLink>
                                    </div>
                                  </div>

                                  {/* Action Tray */}
                                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                                    <NavLink
                                      to="/patient-dashboard/records/clinical-summary"
                                      className="flex-1 py-2 px-3 bg-primary text-on-primary rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-primary-container transition-colors shadow-2xs"
                                    >
                                      <Icon name="visibility" className="text-[15px]" />
                                      <span>Open Clinical Summary</span>
                                    </NavLink>
                                    <NavLink
                                      to="/patient-dashboard/records/examinations"
                                      className="py-2 px-3 bg-surface-container text-on-surface hover:bg-surface-container-high rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                                    >
                                      <Icon name="clinical_notes" className="text-[15px]" />
                                      <span>Full Exam Note</span>
                                    </NavLink>
                                  </div>
                                </>
                              )}

                              {evt.contentNode === 'imaging' && (
                                <>
                                  {/* Bitewing side-by-side with click to zoom */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-0.5">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setActiveImageZoom(
                                          'https://lh3.googleusercontent.com/aida-public/AB6AXuCA4DNh7dZLu-lubHEymIcb2-5TMo_8votPjuIzx2-3bSdQU_4Y_M27z5B9IiAdZs1SajJcjkbVlW9byC0X3I3EJ2pDnkFKDCC1lIj2VM3iYT10Qu6ylMhgvMHGiRNHm0oQ5zNEE4xvJHJn8wRHWAgvmazCSeGIScwoscu1ULzCKZkNqHK5Kcq4tBiQ9J255NfwXZCqnYeHBhYqMHyaF-8QNreWv0sMgmhx4VoZqVdu'
                                        )
                                      }
                                      className="relative rounded-xl overflow-hidden bg-on-surface group/img text-left focus:outline-none"
                                    >
                                      <img
                                        className="w-full h-28 object-cover opacity-90 group-hover/img:opacity-100 group-hover/img:scale-102 transition-all"
                                        alt="High contrast medical bitewing radiograph"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA4DNh7dZLu-lubHEymIcb2-5TMo_8votPjuIzx2-3bSdQU_4Y_M27z5B9IiAdZs1SajJcjkbVlW9byC0X3I3EJ2pDnkFKDCC1lIj2VM3iYT10Qu6ylMhgvMHGiRNHm0oQ5zNEE4xvJHJn8wRHWAgvmazCSeGIScwoscu1ULzCKZkNqHK5Kcq4tBiQ9J255NfwXZCqnYeHBhYqMHyaF-8QNreWv0sMgmhx4VoZqVdu"
                                      />
                                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-on-surface/90 to-transparent p-2 flex justify-between items-center text-on-primary">
                                        <span className="font-mono text-[10px]">BW-Right #14–#17</span>
                                        <Icon name="zoom_in" className="text-[14px]" />
                                      </div>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        setActiveImageZoom(
                                          'https://lh3.googleusercontent.com/aida-public/AB6AXuBOmpTfN5sibIqj-Mcvh0rbP7USjai-8d3GyLE4SDFIvDps3AmcafD4PzhEocO3e98uoE8Fn41VB7kFcPBKah0CsuraPeRF18e-A-oyMcQCUaR-_vfgx0pZc2Q9or2pcdraj68eDu7nBjTgA2X8AHmyTK9o4lMNIFpTligAxDe8Rgg-jU6Gag7lrZEr6PMy9ycvbCEdy5jP4unwxROcmA_z5GNWxnOGhhVK-bcZDuGg'
                                        )
                                      }
                                      className="relative rounded-xl overflow-hidden bg-on-surface group/img text-left focus:outline-none"
                                    >
                                      <img
                                        className="w-full h-28 object-cover opacity-90 group-hover/img:opacity-100 group-hover/img:scale-102 transition-all"
                                        alt="High resolution dental bitewing radiograph"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOmpTfN5sibIqj-Mcvh0rbP7USjai-8d3GyLE4SDFIvDps3AmcafD4PzhEocO3e98uoE8Fn41VB7kFcPBKah0CsuraPeRF18e-A-oyMcQCUaR-_vfgx0pZc2Q9or2pcdraj68eDu7nBjTgA2X8AHmyTK9o4lMNIFpTligAxDe8Rgg-jU6Gag7lrZEr6PMy9ycvbCEdy5jP4unwxROcmA_z5GNWxnOGhhVK-bcZDuGg"
                                      />
                                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-on-surface/90 to-transparent p-2 flex justify-between items-center text-on-primary">
                                        <span className="font-mono text-[10px]">BW-Left #24–#27</span>
                                        <Icon name="zoom_in" className="text-[14px]" />
                                      </div>
                                    </button>
                                  </div>

                                  <NavLink
                                    to="/patient-dashboard/records/investigations"
                                    className="flex items-center justify-between py-2 px-3 bg-surface-container rounded-xl text-tertiary hover:bg-surface-container-high transition-colors text-xs font-semibold"
                                  >
                                    <span className="flex items-center gap-1.5">
                                      <Icon name="radiology" className="text-[15px]" />
                                      Launch Interactive DICOM Vault
                                    </span>
                                    <Icon name="arrow_forward" className="text-[15px]" />
                                  </NavLink>
                                </>
                              )}

                              {evt.contentNode === 'screening' && (
                                <>
                                  <div className="bg-surface-container-low rounded-xl p-2.5 flex items-start gap-2 border border-outline-variant/20">
                                    <Icon name="info" className="text-outline text-[16px] shrink-0 mt-0.5" />
                                    <div className="flex flex-col">
                                      <span className="text-[11px] font-semibold text-on-surface">
                                        Triage Advisory
                                      </span>
                                      <span className="text-xs text-on-surface-variant leading-snug">
                                        Field observation only — preliminary triaging. Non-invasive observation. Referral code REF-DHA-2024-8841 generated.
                                      </span>
                                    </div>
                                  </div>

                                  <NavLink
                                    to="/patient-dashboard/records/screenings"
                                    className="flex items-center justify-between py-2 px-3 bg-surface-container rounded-xl text-primary hover:bg-surface-container-high transition-colors text-xs font-semibold"
                                  >
                                    <span className="flex items-center gap-1.5">
                                      <Icon name="visibility" className="text-[15px]" />
                                      View Screening Protocol &amp; Referral
                                    </span>
                                    <Icon name="chevron_right" className="text-[16px]" />
                                  </NavLink>
                                </>
                              )}

                              {evt.contentNode === 'prophylaxis' && (
                                <>
                                  <p className="text-xs text-on-surface-variant bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20 leading-relaxed">
                                    Full-mouth supragingival &amp; subgingival ultrasonic debridement with topical fluoridation paste applied. Recall interval: 6 months.
                                  </p>

                                  <NavLink
                                    to="/patient-dashboard/records/treatments"
                                    className="flex items-center justify-between py-2 px-3 bg-surface-container rounded-xl text-secondary hover:bg-surface-container-high transition-colors text-xs font-semibold"
                                  >
                                    <span className="flex items-center gap-1.5">
                                      <Icon name="healing" className="text-[15px]" />
                                      View Treatment History &amp; Insurance Details
                                    </span>
                                    <Icon name="chevron_right" className="text-[16px]" />
                                  </NavLink>
                                </>
                              )}

                              {evt.contentNode === 'historical' && (
                                <>
                                  <div className="flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/20">
                                    <div className="flex items-center gap-2">
                                      <Icon name="description" className="text-primary text-[20px]" />
                                      <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-on-surface">
                                          Archive_Prior_Dentist_2022.pdf
                                        </span>
                                        <span className="text-[10px] text-on-surface-variant">
                                          2.4 MB • Certified Hash Attached
                                        </span>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setToastMessage('Opening Legacy Historical Archive preview...');
                                        setTimeout(() => setToastMessage(null), 2500);
                                      }}
                                      className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors"
                                      title="Open document"
                                    >
                                      <Icon name="open_in_new" className="text-[16px]" />
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar Column (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Timeline Node Legend */}
            <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-xs border border-outline-variant/30 flex flex-col gap-3">
              <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2.5">
                <Icon name="palette" className="text-primary text-[18px]" />
                <h3 className="text-xs sm:text-sm text-on-surface font-bold">
                  Timeline Node Legend
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-4.5 h-4.5 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed text-[10px] font-bold shadow-2xs">
                    ✓
                  </span>
                  <span className="text-on-surface">
                    Verified Clinical Exam
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-4.5 h-4.5 rounded-full bg-tertiary flex items-center justify-center shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <span className="text-on-surface">
                    Investigation / Imaging
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-4.5 h-4.5 rounded-full bg-outline flex items-center justify-center shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <span className="text-on-surface">
                    Screening Observation
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-4.5 h-4.5 rounded-full bg-primary-container flex items-center justify-center shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </span>
                  <span className="text-on-surface">
                    Amendment / Clinical Update
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-4.5 h-4.5 rounded-full bg-surface-container flex items-center justify-center text-outline text-[11px] shadow-2xs">
                    ↑
                  </span>
                  <span className="text-on-surface">
                    Self-Reported / Patient Document
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Export Action Card */}
            <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-xs border border-outline-variant/30 flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Icon name="archive" className="text-primary text-[20px]" />
                <h3 className="text-xs sm:text-sm text-on-surface font-bold">
                  EHR Health Portfolio
                </h3>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Export comprehensive longitudinal timeline, clinical examination summaries, diagnostic bitewings, and certified DHA practitioner signatures.
              </p>
              <button
                type="button"
                onClick={handleExportPortfolio}
                disabled={isExporting}
                className="w-full py-2.5 px-3 rounded-xl bg-primary text-on-primary text-xs font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-primary-container transition-all active:scale-95 disabled:opacity-60"
              >
                <Icon name={isExporting ? 'hourglass_top' : 'download'} className="text-[18px]" />
                <span>{isExporting ? 'Packaging Archive...' : 'Export Complete Portfolio'}</span>
              </button>
            </div>

            {/* DHA Data Governance Notice */}
            <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/20 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-secondary">
                <Icon name="verified_user" className="text-[16px]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  DHA Data Governance
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                All records stored with 256-bit AES encryption in compliance with the Nigeria Health Data Law. Patient retains irrevocable full access to historical milestones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
