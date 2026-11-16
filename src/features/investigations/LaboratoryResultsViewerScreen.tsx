import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

export function LaboratoryResultsViewerScreen() {
  const [viewMode, setViewMode] = useState<'comparative' | 'table' | 'doc'>('comparative');
  const [inspectModalOpen, setInspectModalOpen] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const analytes = [
    {
      name: 'Haemoglobin (Hb)',
      specimen: 'EDTA Whole Blood',
      result: '12.8',
      unit: 'g/dL',
      refRange: '12.0 – 15.5',
      status: 'Normal',
      isFlagged: false,
    },
    {
      name: 'Platelet Count',
      specimen: 'Automated Cell Counter',
      result: '245',
      unit: 'x10⁹/L',
      refRange: '150 – 450',
      status: 'Normal',
      isFlagged: false,
    },
    {
      name: 'Prothrombin Time (PT)',
      specimen: 'Citrated Plasma',
      result: '11.8',
      unit: 'sec',
      refRange: '11.0 – 13.5',
      status: 'Normal',
      isFlagged: false,
    },
    {
      name: 'INR (Coagulation)',
      specimen: 'Derived Ratio',
      result: '1.02',
      unit: 'ratio',
      refRange: '0.8 – 1.2',
      status: 'Normal',
      isFlagged: false,
    },
    {
      name: 'Serum Ferritin',
      specimen: 'Chemiluminescence',
      result: '18.2',
      unit: 'ng/mL',
      refRange: '20.0 – 200.0',
      status: 'Mild Deficit',
      isFlagged: true,
    },
    {
      name: 'Fasting Glucose',
      specimen: 'Fluoride Plasma',
      result: '92',
      unit: 'mg/dL',
      refRange: '70 – 99',
      status: 'Normal',
      isFlagged: false,
    },
    {
      name: 'HbA1c (Glycated)',
      specimen: 'HPLC Method',
      result: '5.4',
      unit: '%',
      refRange: '< 5.7',
      status: 'Normal',
      isFlagged: false,
    },
  ];

  return (
    <InvestigationShell
      pageTitle="Laboratory Results Viewer"
      badgeCode="11.18"
      badgeLabel="LIS / Hematology"
      patientName="Amina Yusuf"
      dhaId="DHA-00245"
      orderRef="REQ-2025-0871"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 select-none">
        {/* Toast Feedback */}
        {actionFeedback && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Patient & Requisition Clinical Identity Banner */}
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-on-surface truncate">Amina Yusuf</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
                  <Icon name="verified" className="text-xs" />
                  DHA-00245
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">28y F • DOB: 14/05/1996 • Nigeria Resident</p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-outline-variant/20">
              <span className="font-mono text-xs sm:text-sm text-primary font-bold">REQ-2025-0871</span>
              <span className="text-[11px] text-outline">LIS: ABL-2025-99214</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-outline-variant/20 bg-surface-container-low rounded-xl p-3 text-xs">
            <div className="flex flex-col">
              <span className="text-[11px] text-outline font-semibold uppercase tracking-wider">Facility</span>
              <span className="font-semibold text-on-surface truncate mt-0.5">Surulere Diagnostic Laboratory</span>
              <span className="text-secondary font-medium">DHA Accredited #LAB-401 • CAP Certified</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-outline font-semibold uppercase tracking-wider">Timeline</span>
              <span className="font-semibold text-on-surface truncate mt-0.5">Collected: 14 Feb, 08:30 WAT</span>
              <span className="text-on-surface-variant">Authorized: 14 Feb, 14:15 WAT</span>
            </div>
          </div>
        </section>

        {/* View Mode Selector Tabs */}
        <div className="bg-surface-container border border-outline-variant/30 p-1.5 rounded-2xl flex items-center gap-1.5 shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode('comparative')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              viewMode === 'comparative'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="splitscreen" className="text-base" />
            <span>Comparative View</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              viewMode === 'table'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="table_chart" className="text-base" />
            <span>Structured Table</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('doc')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              viewMode === 'doc'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="description" className="text-base" />
            <span>Source PDF</span>
          </button>
        </div>

        {/* Dynamic Layout Based on Selected View Mode */}
        <div className={`grid grid-cols-1 ${viewMode === 'comparative' ? 'lg:grid-cols-12' : ''} gap-6`}>
          {/* Card 1: Original Diagnostic Document Source */}
          {(viewMode === 'comparative' || viewMode === 'doc') && (
            <div className={viewMode === 'comparative' ? 'lg:col-span-5 flex flex-col gap-4' : 'w-full flex flex-col gap-4'}>
              <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-xs overflow-hidden flex flex-col">
                <div className="p-4 bg-surface-container-high/40 border-b border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                      <Icon name="verified_user" className="text-lg" />
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-sm">Original Diagnostic Report Source</h3>
                      <p className="text-[11px] text-on-surface-variant">Certified Electronic Dispatch</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    CAP Validated
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  {/* File card simulation */}
                  <div className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/20 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-14 bg-surface-container-high rounded-md flex flex-col items-center justify-center p-1 text-center shadow-xs shrink-0">
                        <Icon name="picture_as_pdf" className="text-primary text-xl" />
                        <span className="text-[9px] text-outline font-mono mt-0.5">1/1</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-xs text-on-surface truncate">
                          Signed_CBC_Coagulation_99214.pdf
                        </span>
                        <span className="text-[11px] text-outline truncate">SHA-256 Fingerprint verified</span>
                        <span className="text-[11px] text-secondary font-medium mt-0.5 truncate">
                          Authorized by: Dr. Samira K., FRCPath
                        </span>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex flex-col items-center justify-center text-center p-1 shrink-0">
                      <Icon name="workspace_premium" className="text-secondary text-base" />
                      <span className="text-[7px] font-bold text-on-secondary-container leading-none uppercase">DHA</span>
                    </div>
                  </div>

                  {/* Verification note & inspect button */}
                  <div className="bg-surface-container-high/30 rounded-xl p-3 flex items-center justify-between gap-2 border border-outline-variant/20">
                    <div className="flex items-center gap-2 min-w-0 text-xs text-on-surface-variant">
                      <Icon name="policy" className="text-secondary text-lg shrink-0" />
                      <span className="truncate">Digital seal intact • 14-02-2025 14:15:02 UTC+4</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInspectModalOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary text-xs font-semibold shadow-xs hover:bg-surface-container transition-colors shrink-0 flex items-center gap-1"
                    >
                      <Icon name="visibility" className="text-sm" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Card 2: Structured Laboratory Analyte Table */}
          {(viewMode === 'comparative' || viewMode === 'table') && (
            <div className={viewMode === 'comparative' ? 'lg:col-span-7 flex flex-col gap-4' : 'w-full flex flex-col gap-4'}>
              <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-xs overflow-hidden flex flex-col">
                <div className="p-4 bg-surface-container-high/40 border-b border-outline-variant/20 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
                      Validated Panel
                    </span>
                    <h3 className="font-bold text-on-surface text-sm sm:text-base">
                      Pre-Operative Dental Bleeding & Gingivitis Workup
                    </h3>
                    <p className="text-xs text-on-surface-variant">Hematology & Coagulation Markers</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant shrink-0">
                    <Icon name="biotech" className="text-xl" />
                  </div>
                </div>

                {/* Summary Chips */}
                <div className="px-4 py-2.5 bg-surface-container-low border-b border-outline-variant/20 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold shrink-0">
                    <Icon name="check_circle" className="text-xs" /> 6 Normal
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold shrink-0">
                    <Icon name="warning" className="text-xs" /> 1 Borderline Low
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface font-semibold shrink-0">
                    <Icon name="gavel" className="text-xs text-secondary" /> Surgical Fit: Cleared
                  </span>
                </div>

                {/* Analyte Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-surface-container-low text-outline font-semibold uppercase tracking-wider text-[11px] border-b border-outline-variant/20">
                        <th className="py-2.5 px-4">Analyte / Test</th>
                        <th className="py-2.5 px-3 text-right">Result</th>
                        <th className="py-2.5 px-4 text-right">Reference & Flag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/15">
                      {analytes.map((row, idx) => (
                        <tr
                          key={row.name}
                          className={`transition-colors ${
                            row.isFlagged
                              ? 'bg-amber-50/70 hover:bg-amber-100/70'
                              : idx % 2 === 1
                              ? 'bg-surface-container-low/30 hover:bg-surface-container-low/70'
                              : 'hover:bg-surface-container-low/50'
                          }`}
                        >
                          <td className="py-3 px-4 min-w-[160px]">
                            <span
                              className={`font-semibold block ${
                                row.isFlagged ? 'text-amber-900' : 'text-on-surface'
                              }`}
                            >
                              {row.name}
                            </span>
                            <span className="text-[11px] text-outline">{row.specimen}</span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <span
                              className={`font-mono text-sm font-bold ${
                                row.isFlagged ? 'text-amber-900' : 'text-on-surface'
                              }`}
                            >
                              {row.result}
                            </span>
                            <span className="block text-[11px] text-outline">{row.unit}</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex flex-col items-end">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  row.isFlagged
                                    ? 'bg-amber-200 text-amber-900'
                                    : 'bg-secondary-container text-on-secondary-container'
                                }`}
                              >
                                {row.isFlagged ? (
                                  <>
                                    <Icon name="arrow_downward" className="text-[11px]" />
                                    <span>{row.status}</span>
                                  </>
                                ) : (
                                  <>
                                    <Icon name="check" className="text-[11px]" />
                                    <span>{row.status}</span>
                                  </>
                                )}
                              </span>
                              <span className="font-mono text-[10px] text-outline mt-0.5">{row.refRange}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Dentist Clinical Interpretation Section */}
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Icon name="clinical_notes" className="text-lg" />
              </div>
              <span className="text-xs uppercase tracking-wider font-bold text-primary">
                Dentist Clinical Interpretation
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-medium">
              Restricted • Professional
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-3 text-xs sm:text-sm">
            <p className="leading-relaxed text-on-surface">
              “Hematology parameters within safe limits for routine subgingival scaling and minor periodontal surgery.
              Normal platelet and INR rule out systemic coagulopathy for reported gingival bleeding. Recommend dietary
              iron consultation for borderline low ferritin.”
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                  DJ
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-on-surface text-xs">Dr. Daniel James</span>
                  <span className="text-[11px] text-secondary">Lic. DHA #DEN-48912 • Periodontics</span>
                </div>
              </div>
              <span className="text-xs text-outline font-medium">Verified & Appended</span>
            </div>
          </div>
        </section>

        {/* Regulatory Safeguard Notice */}
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-on-surface-variant">
          <Icon name="verified" className="text-secondary text-base shrink-0 mt-0.5" />
          <p className="leading-tight">
            Reference ranges sourced from accredited Nigeria CAP/ISO-15189 laboratory standards. AI extraction pre-verified
            by licensed laboratory technician before clinician presentation.
          </p>
        </div>

        {/* Workflow Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsApproved(true);
              triggerFeedback('Laboratory workup approved, signed and sealed into dental record #EXAM-0982');
            }}
            className={`w-full sm:flex-1 h-12 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs ${
              isApproved
                ? 'bg-secondary text-on-secondary ring-2 ring-secondary/30'
                : 'bg-primary text-on-primary hover:bg-primary/90'
            }`}
          >
            <Icon name="task_alt" className="text-lg" />
            <span>{isApproved ? 'Approved & Sealed in Record (11.20)' : 'Approve & Seal into Dental Record (11.20)'}</span>
          </button>

          <button
            type="button"
            onClick={() => triggerFeedback('Patient-friendly layman summary published to DHA Patient Portal')}
            className="w-full sm:flex-1 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-secondary hover:bg-secondary-container/20 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Icon name="forward_to_inbox" className="text-lg" />
            <span>Release Patient-Friendly Summary</span>
          </button>

          <NavLink
            to="/investigations/library"
            className="w-full sm:w-auto px-5 h-12 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <Icon name="folder_managed" className="text-base" />
            <span>Library</span>
          </NavLink>
        </div>

        {/* Source PDF Inspect Modal */}
        {inspectModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl border border-outline-variant/30 p-6 shadow-2xl flex flex-col gap-4 animate-scaleIn">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <Icon name="picture_as_pdf" className="text-primary text-xl" />
                  <h3 className="font-bold text-on-surface text-base">Surulere Diagnostic Laboratory — Official Slip</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectModalOpen(false)}
                  className="p-1 rounded-full text-outline hover:text-on-surface"
                >
                  <Icon name="close" className="text-lg" />
                </button>
              </div>

              <div className="bg-white text-slate-800 p-6 rounded-xl border border-slate-300 font-sans text-xs space-y-4 shadow-inner">
                <div className="flex justify-between border-b pb-3">
                  <div>
                    <div className="font-bold text-sm text-primary">Surulere DIAGNOSTIC CENTER LLC</div>
                    <div className="text-[11px] text-slate-500">DHA Health Facility Lic: #LAB-401 • Lagos, Nigeria</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-bold">ABL-2025-99214</div>
                    <div className="text-[10px] text-slate-500">CAP Accredited #719201</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-lg border">
                  <div>Patient: <strong>YUSUF, AMINA</strong></div>
                  <div>DHA ID: <strong>DHA-00245</strong></div>
                  <div>Sample: EDTA + Plasma</div>
                  <div>Authorized: 14-Feb-2025 14:15 WAT</div>
                </div>

                <div className="space-y-1 pt-1 font-mono text-[11px]">
                  <div className="flex justify-between font-bold border-b pb-1">
                    <span>TEST</span>
                    <span>RESULT</span>
                    <span>REF INTERVAL</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>Hemoglobin</span>
                    <span>12.8 g/dL</span>
                    <span>12.0 - 15.5</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>Platelet Count</span>
                    <span>245 x10^9/L</span>
                    <span>150 - 450</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>Prothrombin Time</span>
                    <span>11.8 sec</span>
                    <span>11.0 - 13.5</span>
                  </div>
                  <div className="flex justify-between py-0.5 text-amber-700 font-bold bg-amber-50">
                    <span>Serum Ferritin [L]</span>
                    <span>18.2 ng/mL</span>
                    <span>20.0 - 200.0</span>
                  </div>
                </div>

                <div className="border-t pt-2 flex justify-between items-center text-[10px] text-slate-500">
                  <span>Digitally Signed: Dr. Samira K., FRCPath</span>
                  <span>Direct LIS-Nigeria Health Information Exchange Certified</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setInspectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold"
                >
                  Close Document
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </InvestigationShell>
  );
}
