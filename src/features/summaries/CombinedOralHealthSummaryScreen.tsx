import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

export function CombinedOralHealthSummaryScreen() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const timelineMilestones = [
    {
      date: 'Oct 2024',
      title: 'Baseline Comprehensive Exam',
      current: false,
      bullets: [
        'Full mouth survey completed',
        'Initial ICDAS scoring — all teeth sound (ICDAS 0)',
        'Baseline BPE recorded (generalized code 2)',
      ],
    },
    {
      date: 'Apr 2025',
      title: '6-Month Review',
      current: false,
      bullets: [
        'Prophylaxis completed — calculus removal UR/LR quadrants',
        'Watch #15 ICDAS 1 (DO white spot) first flagged',
        'Oral hygiene instruction reinforced',
      ],
    },
    {
      date: 'Mar 2026',
      title: 'Annual Periodontal Assessment',
      current: false,
      bullets: [
        'Updated BPE — generalized code 2 maintained',
        'Pocket depths recorded: 4mm localized at #16 MB',
        'Bleeding on probing 14% → stable',
      ],
    },
    {
      date: 'Oct 2026',
      title: 'Current Diagnostic Visit',
      current: true,
      bullets: [
        'Tooth #16 MO caries ICDAS 3/4 identified',
        'Bitewing radiograph + CBCT acquired',
        '2.1mm pulp clearance confirmed on CBCT',
      ],
    },
  ];

  return (
    <SummaryShell
      pageTitle="Combined Oral-Health Summary"
      badgeCode="12.8"
      badgeLabel="Longitudinal Synthesis"
      currentStep="Combined Summary"
    >
      <div className="space-y-6">
        {/* ─── 1. Status & Provenance Header Card ─── */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
              AI Draft
            </span>
            <span className="text-xs text-[#707881]">v1.0 • Unapproved</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#006194] border border-blue-200">
              Dentist Drafting Mode
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-[#131b2e] mb-1">
            Combined Oral-Health Longitudinal Summary
          </h2>
          <p className="text-sm text-[#707881] mb-5">
            Aggregates odontogram, investigation, periodontal, and clinical data into a unified temporal view.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff]">
              <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider mb-2">Patient</p>
              <p className="text-sm font-bold text-[#131b2e]">Amara Okafor</p>
              <p className="text-xs text-[#707881] mt-1">34y Female • DHA-2026-00451</p>
            </div>
            <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff]">
              <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider mb-2">Clinician</p>
              <p className="text-sm font-bold text-[#131b2e]">Dr. Daniel James</p>
              <p className="text-xs text-[#707881] mt-1">License #DEN-48912</p>
            </div>
          </div>
        </div>

        {/* ─── 2. Critical Medical Safeguard Alert ─── */}
        <div className="bg-red-50 rounded-2xl p-5 sm:p-6 border border-red-200 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#ba1a1a] flex items-center justify-center">
              <Icon name="warning" className="text-[20px] text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-[#ba1a1a]">Critical Medical Safeguard</h3>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-[#ba1a1a]">
                  Active
                </span>
              </div>
              <p className="text-sm font-semibold text-[#131b2e] mb-1">
                Penicillin Allergy — Anaphylaxis Risk (Severe)
              </p>
              <p className="text-sm text-[#707881]">
                <span className="font-semibold text-[#ba1a1a]">Avoid:</span> Amoxicillin, ampicillin, and all penicillin-class antibiotics.{' '}
                <span className="font-semibold text-[#006a61]">Use:</span> Clindamycin or azithromycin as safe alternatives.
              </p>
            </div>
          </div>
        </div>

        {/* ─── 3. Longitudinal Care Timeline ─── */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Icon name="timeline" className="text-[22px] text-[#006194]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#131b2e]">Longitudinal Care Timeline</h3>
          </div>

          <div className="relative pl-4 sm:pl-6">
            {timelineMilestones.map((m, i) => (
              <div key={i} className="relative pb-8 last:pb-0">
                {/* Connecting line */}
                {i < timelineMilestones.length - 1 && (
                  <div className="absolute left-[11px] top-[36px] bottom-0 w-0.5 bg-[#eaedff]" />
                )}

                <div className="flex items-start gap-4">
                  {/* Date circle */}
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-[3px] mt-0.5 ${
                      m.current
                        ? 'border-[#006194] bg-[#006194]'
                        : 'border-[#707881] bg-white'
                    }`}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          m.current
                            ? 'bg-[#006194] text-white'
                            : 'bg-gray-100 text-[#707881]'
                        }`}
                      >
                        {m.date}
                      </span>
                      {m.current && (
                        <span className="text-xs font-semibold text-[#006194]">← Current</span>
                      )}
                    </div>
                    <h4
                      className={`text-sm sm:text-base font-bold mb-2 ${
                        m.current ? 'text-[#006194]' : 'text-[#131b2e]'
                      }`}
                    >
                      {m.title}
                    </h4>
                    <ul className="space-y-1">
                      {m.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#707881]">
                          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#707881]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 4. Temporal Delta Analysis ─── */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Icon name="trending_up" className="text-[22px] text-[#006194]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#131b2e]">Temporal Delta Analysis</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Delta Card A — Tooth #16 Rapid Progression */}
            <div className="rounded-xl border-l-4 border-[#ba1a1a] bg-red-50/50 p-4 border-t border-r border-b border-t-red-100 border-r-red-100 border-b-red-100">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="error" className="text-[18px] text-[#ba1a1a]" />
                <h4 className="text-sm font-bold text-[#ba1a1a]">Tooth #16 — Rapid Progression</h4>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-start gap-2 text-xs text-[#707881]">
                  <span className="font-semibold text-[#131b2e] flex-shrink-0">Baseline (Oct 2024):</span>
                  Sound enamel, ICDAS 0
                </div>
                <div className="flex items-start gap-2 text-xs text-[#707881]">
                  <span className="font-semibold text-[#131b2e] flex-shrink-0">Current (Oct 2026):</span>
                  ICDAS 3/4 cavitated MO lesion
                </div>
                <p className="text-xs text-[#ba1a1a] font-semibold">
                  Δ 2-year progression from sound to cavitated (accelerated rate)
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#707881]">Severity</span>
                  <span className="text-xs font-bold text-[#ba1a1a]">75%</span>
                </div>
                <div className="w-full h-2.5 bg-red-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#ba1a1a] rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </div>

            {/* Delta Card B — Tooth #15 Stable Watch */}
            <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50/50 p-4 border-t border-r border-b border-t-amber-100 border-r-amber-100 border-b-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="visibility" className="text-[18px] text-amber-600" />
                <h4 className="text-sm font-bold text-amber-700">Tooth #15 — Stable Watch</h4>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-start gap-2 text-xs text-[#707881]">
                  <span className="font-semibold text-[#131b2e] flex-shrink-0">Baseline:</span>
                  Sound enamel
                </div>
                <div className="flex items-start gap-2 text-xs text-[#707881]">
                  <span className="font-semibold text-[#131b2e] flex-shrink-0">Current:</span>
                  ICDAS 1 white spot (DO surface)
                </div>
                <p className="text-xs text-amber-700 font-semibold">
                  Δ Minimal change — remineralization candidate
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#707881]">Severity</span>
                  <span className="text-xs font-bold text-amber-600">15%</span>
                </div>
                <div className="w-full h-2.5 bg-amber-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
            </div>

            {/* Delta Card C — Periodontal Status */}
            <div className="rounded-xl border-l-4 border-[#006194] bg-blue-50/50 p-4 border-t border-r border-b border-t-blue-100 border-r-blue-100 border-b-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="monitor_heart" className="text-[18px] text-[#006194]" />
                <h4 className="text-sm font-bold text-[#006194]">Periodontal Status — Localized Concern</h4>
              </div>

              <div className="space-y-2 mb-3">
                <p className="text-xs text-[#707881]">
                  Overall BPE 2 (generalized) with localized 4mm pocket at #16 MB
                </p>
                <p className="text-xs text-[#707881]">
                  Bleeding on probing: <span className="font-semibold text-[#131b2e]">12%</span> (stable from 14% baseline)
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#707881]">Max Pocket Depth</span>
                    <span className="text-xs font-bold text-[#006194]">4mm</span>
                  </div>
                  <div className="w-full h-2.5 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#006194] rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#707881]">BoP Index</span>
                    <span className="text-xs font-bold text-[#006194]">12%</span>
                  </div>
                  <div className="w-full h-2.5 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#006194] rounded-full" style={{ width: '12%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 5. Linked Longitudinal Imaging Gallery ─── */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Icon name="collections" className="text-[22px] text-[#006194]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#131b2e]">Linked Longitudinal Imaging Gallery</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Image Card 1 — OPG Survey */}
            <div className="rounded-xl border border-[#eaedff] overflow-hidden">
              <div className="bg-[#131b2e] h-40 sm:h-48 flex items-center justify-center">
                <Icon name="camera_alt" className="text-[48px] text-[#707881]" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-[#707881]">
                    OPG
                  </span>
                  <span className="text-xs text-[#707881]">Oct 2024</span>
                </div>
                <h4 className="text-sm font-bold text-[#131b2e] mb-1">OPG Survey (Oct 2024)</h4>
                <p className="text-xs text-[#707881] mb-3">
                  Baseline panoramic — No pathology noted at #16 region
                </p>
                <button
                  onClick={() => showToast('Opening OPG viewer…')}
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#006194] hover:underline"
                >
                  <Icon name="visibility" className="text-[16px]" />
                  View Image
                </button>
              </div>
            </div>

            {/* Image Card 2 — Bitewing Series */}
            <div className="rounded-xl border border-[#eaedff] overflow-hidden">
              <div className="bg-[#131b2e] h-40 sm:h-48 flex items-center justify-center">
                <Icon name="camera_alt" className="text-[48px] text-[#707881]" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#006194]">
                    Bitewing
                  </span>
                  <span className="text-xs text-[#707881]">Oct 2026</span>
                </div>
                <h4 className="text-sm font-bold text-[#131b2e] mb-1">Bitewing Series (Oct 2026)</h4>
                <p className="text-xs text-[#707881] mb-3">
                  Current diagnostic — Radiolucent shadow at #16 MO, 2.1mm pulp clearance
                </p>
                <button
                  onClick={() => showToast('Opening bitewing viewer…')}
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#006194] hover:underline"
                >
                  <Icon name="visibility" className="text-[16px]" />
                  View Image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 6. Actionable Items & Blockers ─── */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Icon name="checklist" className="text-[22px] text-[#006194]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#131b2e]">Actionable Items &amp; Blockers</h3>
          </div>

          <div className="space-y-3">
            {/* Item 1 — Completed (green) */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50/60 border-l-4 border-green-500">
              <span className="text-lg mt-0.5">✅</span>
              <div>
                <p className="text-sm font-semibold text-[#131b2e]">Vitality Confirmed on #16</p>
                <p className="text-xs text-[#707881] mt-0.5">Cold test positive — delayed response noted. Pulp vitality intact.</p>
              </div>
            </div>

            {/* Item 2 — Warning (amber/red) */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50/60 border-l-4 border-[#ba1a1a]">
              <span className="text-lg mt-0.5">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-[#131b2e]">Penicillin Allergy Flagged</p>
                <p className="text-xs text-[#707881] mt-0.5">Amoxicillin contraindicated — use clindamycin or azithromycin alternatives.</p>
              </div>
            </div>

            {/* Item 3 — Pending (amber) */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/60 border-l-4 border-amber-500">
              <span className="text-lg mt-0.5">⏳</span>
              <div>
                <p className="text-sm font-semibold text-[#131b2e]">Treatment Plan Authorization Pending</p>
                <p className="text-xs text-[#707881] mt-0.5">Consultant sign-off required before restorative intervention can proceed.</p>
              </div>
            </div>

            {/* Item 4 — Scheduling (blue) */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/60 border-l-4 border-[#006194]">
              <span className="text-lg mt-0.5">🔔</span>
              <div>
                <p className="text-sm font-semibold text-[#131b2e]">Schedule Restorative Intervention</p>
                <p className="text-xs text-[#707881] mt-0.5">Book within ≤7 working days to prevent further caries progression on #16.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 7. Provenance & Cryptographic Audit ─── */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Icon name="verified_user" className="text-[22px] text-[#006194]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#131b2e]">Provenance &amp; Cryptographic Audit</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-[#eaedff]">
                <tr>
                  <td className="py-3 pr-4 text-xs font-semibold text-[#707881] uppercase tracking-wider whitespace-nowrap w-1/3">
                    Document Hash
                  </td>
                  <td className="py-3 text-sm text-[#131b2e] font-mono text-xs">
                    SHA-256: a3f7c9…e41d8b
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-xs font-semibold text-[#707881] uppercase tracking-wider whitespace-nowrap">
                    Generation Engine
                  </td>
                  <td className="py-3 text-sm text-[#131b2e]">
                    DHA-AI-Summary v3.2.1
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-xs font-semibold text-[#707881] uppercase tracking-wider whitespace-nowrap">
                    Generated
                  </td>
                  <td className="py-3 text-sm text-[#131b2e]">
                    13 Oct 2026, 10:14 AM GST
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-xs font-semibold text-[#707881] uppercase tracking-wider whitespace-nowrap">
                    Linked Encounters
                  </td>
                  <td className="py-3 text-sm text-[#131b2e]">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#eaedff] text-[#006194]">
                        ENC-2024-10-07
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#eaedff] text-[#006194]">
                        ENC-2025-04-15
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#eaedff] text-[#006194]">
                        ENC-2026-10-13
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-xs font-semibold text-[#707881] uppercase tracking-wider whitespace-nowrap">
                    Regulatory Ref
                  </td>
                  <td className="py-3 text-sm text-[#131b2e]">
                    DHA Clinical AI Governance Policy v2.4
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-start gap-2.5 p-3.5 bg-blue-50 rounded-xl border border-blue-100">
            <Icon name="info" className="text-[18px] text-[#006194] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#006194]">
              This AI-generated summary requires clinician attestation before inclusion in official patient records.
            </p>
          </div>
        </div>

        {/* ─── 8. Bottom Action Bar ─── */}
        <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-lg">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-end">
            <button
              onClick={() => showToast('Exporting combined summary…')}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#006194] text-[#006194] font-bold text-sm hover:bg-blue-50 transition-colors"
            >
              <Icon name="download" className="text-[18px]" />
              Export Summary
            </button>
            <button
              onClick={() => navigate('/summaries/interpretation-assistance')}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#006194] text-white font-bold text-sm hover:bg-[#004d76] transition-colors shadow-md"
            >
              AI Interpretation
              <Icon name="arrow_forward" className="text-[18px]" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Toast Notification ─── */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-[#131b2e] text-white text-sm font-medium rounded-xl shadow-xl flex items-center gap-2 animate-fade-in">
          <Icon name="check_circle" className="text-[18px] text-green-400" />
          {toastMessage}
        </div>
      )}
    </SummaryShell>
  );
}
