import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';
import { QuickLinks } from '../../design/QuickLinks';

type TabKey = 'organise' | 'highlight' | 'assist';

export function AIClinicalInterpretationScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('organise');
  const [clinicianNotes, setClinicianNotes] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'organise', label: 'L1: Organise' },
    { key: 'highlight', label: 'L2: Highlight' },
    { key: 'assist', label: 'L3: Assist' },
  ];

  return (
    <SummaryShell
      pageTitle="AI Clinical Interpretation"
      badgeCode="12.9"
      badgeLabel="Interpretation Co-Pilot"
      currentStep="AI Assist"
    >
      <div className="space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-[#131b2e] text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in">
            {toastMessage}
          </div>
        )}

        {/* 1. Status Header Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#eaedff] text-[#006194]">
              AI Co-Pilot Mode
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#006194] text-white">
              Level 3 Active
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-[#131b2e] mb-1">
            AI Clinical Interpretation Assistance
          </h2>
          <p className="text-sm text-[#707881] mb-5">
            Three-tier intelligence system: Organise → Highlight → Assist. All outputs require clinician validation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff]">
              <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider mb-2">Patient</p>
              <p className="text-sm font-bold text-[#131b2e]">Amara Okafor</p>
              <p className="text-xs text-[#707881]">34y Female • DHA-2026-00451</p>
            </div>
            <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff]">
              <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider mb-2">Clinician</p>
              <p className="text-sm font-bold text-[#131b2e]">Dr. Daniel James</p>
              <p className="text-xs text-[#707881]">License #DEN-48912</p>
            </div>
          </div>
        </div>

        {/* 2. Critical Allergy Safeguard Banner */}
        <div className="bg-[#ba1a1a] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Icon name="warning" className="text-[24px] text-white flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  ⚠ PENICILLIN ALLERGY — ANAPHYLAXIS RISK (SEVERE)
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">
                  Active
                </span>
              </div>
              <p className="text-sm text-white/90">
                This constraint is enforced across all AI-generated treatment suggestions
              </p>
            </div>
          </div>
        </div>

        {/* 3. 3-Tier Tabbed Interface */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                  activeTab === tab.key
                    ? 'bg-[#006194] text-white'
                    : 'bg-white text-[#006194] border border-[#006194] hover:bg-[#eaedff]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1 — L1: Organise */}
          {activeTab === 'organise' && (
            <div className="space-y-5">
              {/* Odontogram Digest */}
              <div className="bg-[#faf8ff] rounded-xl p-5 border border-[#eaedff]">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="dentistry" className="text-[22px] text-[#006194]" />
                    <h4 className="text-base font-bold text-[#131b2e]">Odontogram Digest</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700">
                    Structured
                  </span>
                </div>
                <div className="space-y-2 text-sm text-[#131b2e] mb-4">
                  <div className="flex items-start gap-2">
                    <Icon name="circle" className="text-[6px] text-[#006194] mt-1.5 flex-shrink-0" />
                    <p><span className="font-semibold">Key finding:</span> Tooth #16 MO cavitated lesion (ICDAS 3/4), Tooth #15 watch (ICDAS 1)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="circle" className="text-[6px] text-[#006194] mt-1.5 flex-shrink-0" />
                    <p><span className="font-semibold">Perio:</span> BPE 2 generalized, 4mm pocket #16 MB</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="circle" className="text-[6px] text-[#006194] mt-1.5 flex-shrink-0" />
                    <p><span className="font-semibold">Mobility:</span> Class 0 across arch</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => showToast('Odontogram digest accepted')}
                    className="px-4 py-2 rounded-xl text-sm font-bold bg-[#006194] text-white hover:bg-[#004f7a] transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => showToast('Odontogram digest rejected')}
                    className="px-4 py-2 rounded-xl text-sm font-bold bg-white text-[#ba1a1a] border border-[#ba1a1a] hover:bg-red-50 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {/* Investigation Digest */}
              <div className="bg-[#faf8ff] rounded-xl p-5 border border-[#eaedff]">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="radiology" className="text-[22px] text-[#006194]" />
                    <h4 className="text-base font-bold text-[#131b2e]">Investigation Digest</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700">
                    Structured
                  </span>
                </div>
                <div className="space-y-2 text-sm text-[#131b2e] mb-4">
                  <div className="flex items-start gap-2">
                    <Icon name="circle" className="text-[6px] text-[#006194] mt-1.5 flex-shrink-0" />
                    <p><span className="font-semibold">Bitewing:</span> #16 MO radiolucent shadow, 2.1mm pulp clearance</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="circle" className="text-[6px] text-[#006194] mt-1.5 flex-shrink-0" />
                    <p><span className="font-semibold">CBCT:</span> No periapical pathology, root integrity confirmed</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="circle" className="text-[6px] text-[#006194] mt-1.5 flex-shrink-0" />
                    <p><span className="font-semibold">Vitality:</span> Cold test positive (delayed 3s response)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => showToast('Investigation digest accepted')}
                    className="px-4 py-2 rounded-xl text-sm font-bold bg-[#006194] text-white hover:bg-[#004f7a] transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => showToast('Investigation digest rejected')}
                    className="px-4 py-2 rounded-xl text-sm font-bold bg-white text-[#ba1a1a] border border-[#ba1a1a] hover:bg-red-50 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {/* Medical History Digest */}
              <div className="bg-[#faf8ff] rounded-xl p-5 border border-[#eaedff]">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="medical_information" className="text-[22px] text-[#006194]" />
                    <h4 className="text-base font-bold text-[#131b2e]">Medical History Digest</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700">
                    Structured
                  </span>
                </div>
                <div className="space-y-2 text-sm text-[#131b2e] mb-4">
                  <div className="flex items-start gap-2">
                    <Icon name="circle" className="text-[6px] text-[#ba1a1a] mt-1.5 flex-shrink-0" />
                    <p><span className="font-semibold text-[#ba1a1a]">Penicillin allergy</span> (Severe — Anaphylaxis)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="circle" className="text-[6px] text-[#006194] mt-1.5 flex-shrink-0" />
                    <p><span className="font-semibold">Current medications:</span> None relevant</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="circle" className="text-[6px] text-[#006194] mt-1.5 flex-shrink-0" />
                    <p><span className="font-semibold">Last dental visit:</span> Apr 2025 (prophylaxis)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => showToast('Medical history digest accepted')}
                    className="px-4 py-2 rounded-xl text-sm font-bold bg-[#006194] text-white hover:bg-[#004f7a] transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => showToast('Medical history digest rejected')}
                    className="px-4 py-2 rounded-xl text-sm font-bold bg-white text-[#ba1a1a] border border-[#ba1a1a] hover:bg-red-50 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2 — L2: Highlight */}
          {activeTab === 'highlight' && (
            <div className="space-y-5">
              {/* Critical Pharmacological Safeguard */}
              <div className="bg-white rounded-xl p-5 border-2 border-[#ba1a1a] shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
                  <h4 className="text-base font-bold text-[#ba1a1a]">Critical Pharmacological Safeguard</h4>
                </div>
                <div className="bg-red-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-[#ba1a1a] mb-2">
                    Penicillin allergy detected. Amoxicillin and ampicillin are CONTRAINDICATED.
                  </p>
                  <p className="text-sm text-[#131b2e] mb-3">
                    <span className="font-semibold">Alternative:</span> Clindamycin 300mg PO or Azithromycin 500mg PO
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-[#707881]">
                    <span><span className="font-semibold">Confidence:</span> 99.2%</span>
                    <span><span className="font-semibold">Source:</span> DHA Pharmacovigilance Database v4.1</span>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Pharmacological safeguard acknowledged')}
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-[#ba1a1a] text-white hover:bg-[#9e1515] transition-colors"
                >
                  Acknowledge
                </button>
              </div>

              {/* Periodontal Pocket Divergence */}
              <div className="bg-white rounded-xl p-5 border-2 border-amber-500 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <h4 className="text-base font-bold text-amber-700">Periodontal Pocket Divergence</h4>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-amber-800 mb-2">
                    #16 MB pocket (4.0mm) diverges from generalized BPE 2 baseline
                  </p>
                  <p className="text-sm text-[#131b2e] mb-3">
                    <span className="font-semibold">Recommendation:</span> Localized subgingival debridement, reassess at 6-week recall
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-[#707881]">
                    <span><span className="font-semibold">Confidence:</span> 87.4%</span>
                    <span><span className="font-semibold">Source:</span> AI Perio-Risk Module v2.3</span>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Periodontal divergence acknowledged')}
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                >
                  Acknowledge
                </button>
              </div>
            </div>
          )}

          {/* Tab 3 — L3: Assist */}
          {activeTab === 'assist' && (
            <div className="space-y-5">
              {/* Differential Diagnostic Formulation */}
              <div className="bg-[#faf8ff] rounded-xl p-5 border border-[#eaedff]">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="psychology" className="text-[22px] text-[#006194]" />
                  <h4 className="text-base font-bold text-[#131b2e]">Differential Diagnostic Formulation</h4>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <p className="text-sm font-bold text-[#131b2e]">
                      Primary: Active Dentinal Caries (#16 MO) — ICD-10: K02.1
                    </p>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#eaedff] text-[#006194]">
                      96.8% Confidence
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#707881] uppercase tracking-wider mb-2">Supporting Evidence</p>
                  <div className="space-y-1.5 text-sm text-[#131b2e]">
                    <div className="flex items-start gap-2">
                      <Icon name="check_circle" className="text-[16px] text-green-600 mt-0.5 flex-shrink-0" />
                      <p>ICDAS 3/4 cavitated lesion confirmed on clinical exam</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="check_circle" className="text-[16px] text-green-600 mt-0.5 flex-shrink-0" />
                      <p>Bitewing radiograph: MO radiolucent shadow with 2.1mm pulp clearance</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="check_circle" className="text-[16px] text-green-600 mt-0.5 flex-shrink-0" />
                      <p>Positive cold vitality test (delayed 3s — within normal range)</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="check_circle" className="text-[16px] text-green-600 mt-0.5 flex-shrink-0" />
                      <p>No periapical pathology on CBCT — excludes irreversible pulpitis</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">Differential:</span> Reversible pulpitis (monitor vitality)
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => showToast('Diagnostic formulation accepted')}
                    className="px-4 py-2 rounded-xl text-sm font-bold bg-[#006194] text-white hover:bg-[#004f7a] transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => showToast('Diagnostic formulation rejected')}
                    className="px-4 py-2 rounded-xl text-sm font-bold bg-white text-[#ba1a1a] border border-[#ba1a1a] hover:bg-red-50 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => showToast('Annotation mode enabled')}
                    className="px-4 py-2 rounded-xl text-sm font-bold bg-white text-[#006194] border border-[#006194] hover:bg-[#eaedff] transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon name="edit_note" className="text-[16px]" />
                      Annotate
                    </span>
                  </button>
                </div>
              </div>

              {/* Recare & Management Protocol Draft */}
              <div className="bg-[#faf8ff] rounded-xl p-5 border border-[#eaedff]">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="assignment" className="text-[22px] text-[#006194]" />
                  <h4 className="text-base font-bold text-[#131b2e]">Recare &amp; Management Protocol Draft</h4>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-[#eaedff]">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#ba1a1a] text-white text-xs font-bold flex items-center justify-center">
                      P1
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#131b2e]">Restorative intervention #16</p>
                      <p className="text-xs text-[#707881]">Within 7 working days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-[#eaedff]">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                      P2
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#131b2e]">Fluoride varnish application #15</p>
                      <p className="text-xs text-[#707881]">Remineralization protocol</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-[#eaedff]">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#006194] text-white text-xs font-bold flex items-center justify-center">
                      P3
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#131b2e]">3-month periodontal reassessment</p>
                      <p className="text-xs text-[#707881]">Localized — #16 MB pocket monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-[#eaedff]">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#006a61] text-white text-xs font-bold flex items-center justify-center">
                      P4
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#131b2e]">6-month comprehensive recall</p>
                      <p className="text-xs text-[#707881]">Full clinical &amp; radiographic review</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => showToast('Management protocol accepted')}
                    className="px-4 py-2 rounded-xl text-sm font-bold bg-[#006194] text-white hover:bg-[#004f7a] transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => showToast('Management protocol rejected')}
                    className="px-4 py-2 rounded-xl text-sm font-bold bg-white text-[#ba1a1a] border border-[#ba1a1a] hover:bg-red-50 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => showToast('Annotation mode enabled')}
                    className="px-4 py-2 rounded-xl text-sm font-bold bg-white text-[#006194] border border-[#006194] hover:bg-[#eaedff] transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon name="edit_note" className="text-[16px]" />
                      Annotate
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Supervising Clinician Directives */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="clinical_notes" className="text-[22px] text-[#006194]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#131b2e]">Supervising Clinician Directives</h3>
          </div>
          <textarea
            value={clinicianNotes}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setClinicianNotes(e.target.value);
              }
            }}
            placeholder="Add clinical directives, overrides, or additional context..."
            rows={4}
            className="w-full rounded-xl border border-[#707881] p-4 text-sm text-[#131b2e] placeholder-[#707881] focus:outline-none focus:ring-2 focus:ring-[#006194] focus:border-transparent resize-none"
          />
          <p className="text-xs text-[#707881] mt-2 text-right">
            {clinicianNotes.length}/500
          </p>
        </div>

        {/* 5. Bottom Action Bar */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-[#eaedff] -mx-5 px-5 py-4 sm:-mx-6 sm:px-6 flex flex-col sm:flex-row gap-3 sm:justify-end rounded-b-2xl">
          <button
            onClick={() => showToast('Session saved successfully')}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#006194] border-2 border-[#006194] hover:bg-[#eaedff] transition-colors w-full sm:w-auto"
          >
            <Icon name="save" className="text-[18px]" />
            Save Session
          </button>
          <button
            onClick={() => navigate('/summaries/image-review')}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#006194] hover:bg-[#004f7a] transition-colors w-full sm:w-auto"
          >
            Proceed to Image Review
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
        </div>
      </div>
      <QuickLinks
        title="Next Steps"
        links={[
          { to: '/summaries/treatment-recommendations', label: 'Treatment Recommendations', icon: 'recommend' },
          { to: '/summaries/edit-output', label: 'Edit AI Output', icon: 'edit_note' },
        ]}
      />
    </SummaryShell>
  );
}
