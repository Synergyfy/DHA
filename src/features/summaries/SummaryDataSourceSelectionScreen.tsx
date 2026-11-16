import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';
import { QuickLinks } from '../../design/QuickLinks';

interface DataSourceItem {
  id: string;
  category: 'A' | 'B' | 'C' | 'D' | 'E';
  title: string;
  sectionCode: string;
  date: string;
  author: string;
  isVerified: boolean;
  type: 'verified' | 'unverified' | 'lab' | 'medical';
  badgeLabel: string;
  summary: string;
  tags?: string[];
  imageUrl?: string;
  metrics?: { label: string; value: string }[];
}

const mockDataSources: DataSourceItem[] = [
  // Category A
  {
    id: 'src-a1',
    category: 'A',
    title: 'Latest Odontogram Chart',
    sectionCode: 'Section 9',
    date: '12 Oct 2026',
    author: 'Dr. Daniel James',
    isVerified: true,
    type: 'verified',
    badgeLabel: 'Verified',
    summary: 'Active restorative findings recorded with 3D tooth-surface mapping.',
    tags: ['#16 Caries (Active)', '#15 Watch Area', '#46 Restoration'],
  },
  {
    id: 'src-a2',
    category: 'A',
    title: 'Historical Baseline Odontogram',
    sectionCode: 'Section 9',
    date: '15 Apr 2026',
    author: 'Clinic Archive',
    isVerified: true,
    type: 'verified',
    badgeLabel: 'Archived',
    summary: 'Baseline intact · Prior to current caries development.',
  },
  // Category B
  {
    id: 'src-b1',
    category: 'B',
    title: 'Comprehensive Oral Examination',
    sectionCode: 'Section 10',
    date: '12 Oct 2026',
    author: 'Dr. Daniel James',
    isVerified: true,
    type: 'verified',
    badgeLabel: 'Verified',
    summary: 'PSR Code 2 recorded • Soft oral tissues clear • Minor gingival inflammation.',
    tags: ['PSR Code 2', 'Tissues Clear', 'Pulp Vitality +ve'],
  },
  // Category C
  {
    id: 'src-c1',
    category: 'C',
    title: 'Digital Bitewings & Periapical #16',
    sectionCode: 'Section 11',
    date: '13 Oct 2026',
    author: 'Dexis 16-bit High Definition',
    isVerified: true,
    type: 'verified',
    badgeLabel: 'Verified',
    summary: 'ALARA Compliant · Approved by Dr. Daniel James for AI reading.',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=200&auto=format&fit=crop&q=80',
    tags: ['#16 Coronal Radiolucency', 'Pulp Clearance 2.1mm', 'Lamina Dura Intact'],
  },
  {
    id: 'src-c2',
    category: 'C',
    title: 'Historical Panoramic OPG',
    sectionCode: 'Radiology',
    date: '14 Oct 2024',
    author: 'External Diagnostic Center',
    isVerified: false,
    type: 'unverified',
    badgeLabel: 'Unverified Upload',
    summary: 'Patient-provided copy · Low resolution scan for historical comparison only.',
  },
  // Category D
  {
    id: 'src-d1',
    category: 'D',
    title: 'Pre-Op Coagulation & Salivary Flow Panel',
    sectionCode: 'Laboratory',
    date: '14 Oct 2026',
    author: 'Al Barsha Diagnostic Lab',
    isVerified: true,
    type: 'lab',
    badgeLabel: 'Verified Lab',
    summary: 'Coagulation markers within standard elective limits; salivary buffering normal.',
    metrics: [
      { label: 'INR', value: '1.02 (Normal)' },
      { label: 'Salivary Flow', value: '1.4 mL/min' },
    ],
  },
  // Category E
  {
    id: 'src-e1',
    category: 'E',
    title: 'General Medical Profile',
    sectionCode: 'Medical Dossier',
    date: 'Updated Oct 2026',
    author: 'Patient Attested',
    isVerified: true,
    type: 'medical',
    badgeLabel: 'Patient Attested',
    summary: 'Systemic health intake with critical antibiotic sensitivity warnings.',
    tags: ['Penicillin Allergy (Severe)', 'Asthmatic', 'Normotensive'],
  },
  {
    id: 'src-e2',
    category: 'E',
    title: 'Previous Dental Treatments',
    sectionCode: 'Sections 1–8',
    date: 'Historical Registry',
    author: 'Harmony Dental Archive',
    isVerified: true,
    type: 'verified',
    badgeLabel: 'Verified',
    summary: 'Resin Composite #36 restored 2023 · Stable margin, sound occlusion.',
  },
];

export function SummaryDataSourceSelectionScreen() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'src-a1',
    'src-b1',
    'src-c1',
    'src-d1',
    'src-e1',
    'src-e2',
  ]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAllEligible = () => {
    setSelectedIds(mockDataSources.map((s) => s.id));
  };

  const selectVerifiedOnly = () => {
    setSelectedIds(mockDataSources.filter((s) => s.isVerified).map((s) => s.id));
  };

  const deselectAll = () => {
    setSelectedIds([]);
  };

  const selectedCount = selectedIds.length;
  const totalCount = mockDataSources.length;
  const verifiedCount = selectedIds.filter(
    (id) => mockDataSources.find((s) => s.id === id)?.isVerified
  ).length;
  const labCount = selectedIds.filter(
    (id) => mockDataSources.find((s) => s.id === id)?.type === 'lab'
  ).length;
  const medCount = selectedIds.filter(
    (id) => mockDataSources.find((s) => s.id === id)?.type === 'medical'
  ).length;
  const unverifiedCount = selectedIds.filter(
    (id) => !mockDataSources.find((s) => s.id === id)?.isVerified
  ).length;

  return (
    <SummaryShell
      pageTitle="Clinical Data Source Selection"
      badgeCode="12.3"
      badgeLabel="Step 1 of 3"
      currentStep="Step 1 of 3 · Sources"
    >
      <div className="space-y-6">
        {/* Stepper Breadcrumb Pill */}
        <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-white border border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006194] animate-pulse"></span>
            <span className="text-xs font-bold text-[#006194] uppercase tracking-wider">
              Step 1 of 3
            </span>
            <span className="text-xs text-[#707881]">· Data Source Ingestion</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-1.5 rounded-full bg-[#006194]"></div>
            <div className="w-2 h-1.5 rounded-full bg-[#dae2fd]"></div>
            <div className="w-2 h-1.5 rounded-full bg-[#dae2fd]"></div>
          </div>
        </div>

        {/* Active Patient Context Banner */}
        <section className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl overflow-hidden bg-[#e2e7ff] shrink-0 ring-2 ring-[#006194]/20 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                  alt="Amara Okafor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#131b2e]">Amara Okafor</h3>
                  <Icon name="verified" className="text-[#006194] text-[18px]" />
                </div>
                <div className="flex items-center gap-2 text-xs text-[#707881] mt-0.5">
                  <span className="font-mono text-[#006194]">DHA-2026-00451</span>
                  <span>•</span>
                  <span>34y Female</span>
                  <span>•</span>
                  <span>Active File</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66]">
                NABIDH Verified
              </span>
            </div>
          </div>
        </section>

        {/* Statutory Governance & Audit Notice */}
        <section className="bg-[#f2f3ff] p-4 sm:p-5 rounded-2xl border border-[#eaedff] flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-white text-[#006194] flex items-center justify-center shrink-0 shadow-xs">
            <Icon name="shield_lock" className="text-[20px]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">
              Statutory Governance &amp; Audit Protection
            </h4>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              Only clinical data you are authorized to access can be synthesized. AI-generated summaries
              preserve original source provenance, dates, and non-destructive clinical versioning.
            </p>
          </div>
        </section>

        {/* Selection Controls & Dynamic Summary Bar */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Icon name="dataset" className="text-[#006194] text-[20px]" />
              <span className="text-sm font-bold text-[#131b2e]">
                {selectedCount} of {totalCount} Data Sources Selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-[#006194] text-white px-3 py-1 rounded-full">
                {verifiedCount} Verified Active
              </span>
              {unverifiedCount > 0 && (
                <span className="text-xs font-bold bg-[#ffdad6] text-[#ba1a1a] px-3 py-1 rounded-full">
                  {unverifiedCount} Unverified
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <button
              type="button"
              onClick={selectAllEligible}
              className="px-3.5 py-1.5 rounded-xl bg-[#cce5ff] text-[#006194] hover:bg-[#93ccff] text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Icon name="select_all" className="text-[16px]" />
              <span>Select All Eligible ({totalCount})</span>
            </button>
            <button
              type="button"
              onClick={selectVerifiedOnly}
              className="px-3.5 py-1.5 rounded-xl bg-[#e2e7ff] text-[#131b2e] hover:bg-[#dae2fd] text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Icon name="verified" className="text-[16px] text-[#006a61]" />
              <span>Verified Only</span>
            </button>
            <button
              type="button"
              onClick={deselectAll}
              className="px-3.5 py-1.5 rounded-xl bg-[#f2f3ff] text-[#707881] hover:text-[#131b2e] text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Icon name="deselect" className="text-[16px]" />
              <span>Deselect All</span>
            </button>
          </div>
        </div>

        {/* Selectable Source Categories List */}
        <div className="space-y-6">
          {/* Category A: Odontogram & Tooth Findings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="dentistry" className="text-[#006194] text-[18px]" />
                <h4 className="text-sm font-bold text-[#131b2e]">
                  Category A · Odontogram &amp; Findings
                </h4>
              </div>
              <span className="text-xs text-[#707881]">Odontogram Chart</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockDataSources
                .filter((s) => s.category === 'A')
                .map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleSelect(item.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-white border-[#006194] ring-2 ring-[#006194]/20 shadow-xs'
                          : 'bg-[#faf8ff] border-[#eaedff] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-[#006194] text-white shadow-xs'
                              : 'bg-[#eaedff] text-transparent'
                          }`}
                        >
                          <Icon name="check" className="text-[16px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h5 className="text-sm font-bold text-[#131b2e] truncate">{item.title}</h5>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                item.isVerified
                                  ? 'bg-[#86f2e4] text-[#006f66]'
                                  : 'bg-[#eaedff] text-[#3f4850]'
                              }`}
                            >
                              {item.badgeLabel}
                            </span>
                          </div>
                          <div className="text-xs text-[#707881] font-mono mb-2">
                            {item.date} • {item.author}
                          </div>
                          <p className="text-xs text-[#3f4850]">{item.summary}</p>
                          {item.tags && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#e2e7ff] text-[#006194]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Category B: Detailed Clinical Examination */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="stethoscope" className="text-[#006194] text-[18px]" />
                <h4 className="text-sm font-bold text-[#131b2e]">
                  Category B · Detailed Clinical Examination
                </h4>
              </div>
              <span className="text-xs text-[#707881]">Clinical Exam</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockDataSources
                .filter((s) => s.category === 'B')
                .map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleSelect(item.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-white border-[#006194] ring-2 ring-[#006194]/20 shadow-xs'
                          : 'bg-[#faf8ff] border-[#eaedff] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-[#006194] text-white shadow-xs'
                              : 'bg-[#eaedff] text-transparent'
                          }`}
                        >
                          <Icon name="check" className="text-[16px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h5 className="text-sm font-bold text-[#131b2e] truncate">{item.title}</h5>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66]">
                              {item.badgeLabel}
                            </span>
                          </div>
                          <div className="text-xs text-[#707881] font-mono mb-2">
                            {item.date} • {item.author}
                          </div>
                          <p className="text-xs text-[#3f4850]">{item.summary}</p>
                          {item.tags && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#e2e7ff] text-[#006194]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Category C: Radiographic Imaging */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="radiology" className="text-[#006194] text-[18px]" />
                <h4 className="text-sm font-bold text-[#131b2e]">
                  Category C · Radiographic Imaging
                </h4>
              </div>
              <span className="text-xs text-[#707881]">Radiology & Imaging</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockDataSources
                .filter((s) => s.category === 'C')
                .map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleSelect(item.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-white border-[#006194] ring-2 ring-[#006194]/20 shadow-xs'
                          : 'bg-[#faf8ff] border-[#eaedff] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-[#006194] text-white shadow-xs'
                              : 'bg-[#eaedff] text-transparent'
                          }`}
                        >
                          <Icon name="check" className="text-[16px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h5 className="text-sm font-bold text-[#131b2e] truncate">{item.title}</h5>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                item.isVerified
                                  ? 'bg-[#86f2e4] text-[#006f66]'
                                  : 'bg-[#ffdad6] text-[#ba1a1a]'
                              }`}
                            >
                              {item.badgeLabel}
                            </span>
                          </div>
                          <div className="text-xs text-[#707881] font-mono mb-2">
                            {item.date} • {item.author}
                          </div>
                          <p className="text-xs text-[#3f4850]">{item.summary}</p>

                          {item.imageUrl && (
                            <div className="mt-2.5 flex items-center gap-3 p-2 bg-[#f2f3ff] rounded-xl">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-black shrink-0">
                                <img
                                  src={item.imageUrl}
                                  alt="Radiograph preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-[11px] text-[#3f4850]">
                                High contrast 16-bit sensor telemetry loaded
                              </span>
                            </div>
                          )}

                          {item.tags && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#e2e7ff] text-[#006194]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Category D & E: Laboratory & Medical History */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="history_edu" className="text-[#006194] text-[18px]" />
                <h4 className="text-sm font-bold text-[#131b2e]">
                  Category D &amp; E · Lab &amp; Medical History
                </h4>
              </div>
              <span className="text-xs text-[#707881]">Sections 1–8 &amp; 11</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockDataSources
                .filter((s) => s.category === 'D' || s.category === 'E')
                .map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleSelect(item.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-white border-[#006194] ring-2 ring-[#006194]/20 shadow-xs'
                          : 'bg-[#faf8ff] border-[#eaedff] opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-[#006194] text-white shadow-xs'
                              : 'bg-[#eaedff] text-transparent'
                          }`}
                        >
                          <Icon name="check" className="text-[16px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h5 className="text-sm font-bold text-[#131b2e] truncate">{item.title}</h5>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66]">
                              {item.badgeLabel}
                            </span>
                          </div>
                          <div className="text-xs text-[#707881] font-mono mb-2">
                            {item.date} • {item.author}
                          </div>
                          <p className="text-xs text-[#3f4850]">{item.summary}</p>

                          {item.metrics && (
                            <div className="flex items-center gap-2 mt-2">
                              {item.metrics.map((m) => (
                                <span
                                  key={m.label}
                                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#f2f3ff] text-[#131b2e]"
                                >
                                  {m.label}: {m.value}
                                </span>
                              ))}
                            </div>
                          )}

                          {item.tags && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                    tag.includes('Allergy')
                                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                                      : 'bg-[#e2e7ff] text-[#006194]'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Source Selection Digest Card */}
        <section className="bg-gradient-to-br from-white via-[#f2f3ff] to-white p-5 rounded-2xl border border-[#eaedff] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="analytics" className="text-[#006194] text-[20px]" />
            <h4 className="text-sm font-bold text-[#131b2e]">Synthesis Ingestion Digest</h4>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center mb-4">
            <div className="bg-white p-3 rounded-xl border border-[#eaedff] shadow-xs">
              <span className="text-2xl font-extrabold text-[#006194] block">{verifiedCount}</span>
              <span className="text-xs text-[#707881]">Verified Clinical</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#eaedff] shadow-xs">
              <span className="text-2xl font-extrabold text-[#006a61] block">{labCount}</span>
              <span className="text-xs text-[#707881]">Lab Panels</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#eaedff] shadow-xs">
              <span className="text-2xl font-extrabold text-[#131b2e] block">{medCount}</span>
              <span className="text-xs text-[#707881]">Medical Profile</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs bg-white p-3 rounded-xl border border-[#eaedff]">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  unverifiedCount > 0 ? 'bg-[#ba1a1a]' : 'bg-[#006a61]'
                }`}
              ></span>
              <span className="text-[#3f4850] font-medium">
                {unverifiedCount} Unverified Record{unverifiedCount === 1 ? '' : 's'} Selected
              </span>
            </div>
            <span className="font-mono text-[#006194] font-semibold">Engine v2.4</span>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/summaries/patient-selection')}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#eaedff] hover:bg-[#f2f3ff] text-[#3f4850] text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
          >
            <Icon name="arrow_back" className="text-[18px]" />
            <span>Back to Patient</span>
          </button>

          <button
            type="button"
            disabled={selectedCount === 0}
            onClick={() => navigate('/summaries/generate')}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-white text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 ${
              selectedCount === 0
                ? 'bg-[#bfc7d2] cursor-not-allowed'
                : 'bg-[#006194] hover:bg-[#007bb9]'
            }`}
          >
            <span>Proceed to Config (Step 2)</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
        </div>
      </div>
      <QuickLinks
        title="Data Ingestion"
        links={[
          { to: '/summaries/odontogram', label: 'Odontogram Ingestion', icon: 'dentistry' },
          { to: '/summaries/investigations', label: 'Investigations Data', icon: 'radiology' },
        ]}
      />
    </SummaryShell>
  );
}
