import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

export function ClinicalReviewInterpretationScreen() {
  const navigate = useNavigate();
  const [activeEvidenceTab, setActiveEvidenceTab] = useState<'bw' | 'pa' | 'photo'>('bw');
  const [icdCode, setIcdCode] = useState<string>('K02.52');
  const [pulpVitality, setPulpVitality] = useState<'reversible' | 'irreversible' | 'necrotic' | 'normal'>('reversible');
  const [coldTestResult, setColdTestResult] = useState<string>('Positive (+), lingering 3-4s');
  const [eptReading, setEptReading] = useState<string>('24 / 80 (Vital)');
  const [percussionStatus, setPercussionStatus] = useState<string>('Negative (Non-tender)');
  const [treatmentDirective, setTreatmentDirective] = useState<string>('DHA-RES-2S');
  const [executionWindow, setExecutionWindow] = useState<'urgent_7d' | 'routine_14d' | 'elective_30d'>('urgent_7d');
  const [languageMode, setLanguageMode] = useState<'en' | 'ar'>('en');
  const [summaryEnglish, setSummaryEnglish] = useState<string>(
    'Tooth #16 (upper right back molar) shows active decay extending through the enamel into the outer layer of dentin. Vitality testing confirms the dental pulp is fully alive with mild reversible irritation. Direct tooth-colored composite restoration is strongly recommended within 7 days to seal the tooth and prevent deeper nerve inflammation.'
  );
  const [summaryArabic, setSummaryArabic] = useState<string>(
    'يُظهر الضرس العلوي الأيمن (#16) تسوساً نشطاً يمتد عبر طبقة المينا إلى الطبقة الخارجية من العاج. أكدت اختبارات حيوية العصب أن العصب سليم وحي مع التهاب طفيف قابل للشفاء. نوصي بشدة بإجراء حشوة تجميلية مباشرة خلال 7 أيام لإغلاق الضرس ومنع وصول التسوس للعصب.'
  );
  const [publishToPortal, setPublishToPortal] = useState<boolean>(true);
  const [statutoryAgreed, setStatutoryAgreed] = useState<boolean>(true);
  const [isSealed, setIsSealed] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const evidenceItems = [
    {
      id: 'bw',
      title: 'Right Bitewing (BW-R)',
      modality: 'Digital Radiograph',
      finding: 'Radiolucency into outer 1/3 of coronal dentin on #16 D. Depth: 2.1mm.',
      badge: 'Key Radiographic Evidence',
      icon: 'radiology',
    },
    {
      id: 'pa',
      title: 'Periapical #16 (PA-16)',
      modality: 'Digital Radiograph',
      finding: 'Intact lamina dura, periodontal ligament space uniform, no apical pathology.',
      badge: 'Vitality Corroboration',
      icon: 'blur_on',
    },
    {
      id: 'photo',
      title: 'Occlusal Macro Photo',
      modality: 'Cross-Polarized 1:1',
      finding: 'Visible micro-cavitation in disto-occlusal fissure with demineralized white halo.',
      badge: 'Surface Confirmation',
      icon: 'photo_camera',
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSealAndCommit = () => {
    if (!statutoryAgreed) {
      showToast('Please check the statutory compliance attestation box first.');
      return;
    }
    setIsSealed(true);
    showToast('Investigation interpretation sealed with SHA-256 and transmitted to NABIDH.');
  };

  return (
    <InvestigationShell
      pageTitle="Clinical Review & Interpretation"
      badgeCode="11.20"
      badgeLabel="Diagnostic Synthesis"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="INV-2025-0914-BWPA"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Clinician Certification Header Banner */}
        <section className="bg-gradient-to-r from-primary/10 via-surface-container-low to-secondary-container/20 border border-primary/20 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
              <Icon name="fact_check" className="text-2xl" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-on-surface">Official Clinical Diagnostic Interpretation</h2>
                {isSealed ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <Icon name="verified" className="text-xs" />
                    SEALED & COMMITTED (v1.2)
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                    <Icon name="edit" className="text-xs" />
                    DRAFTING CLINICAL REVIEW
                  </span>
                )}
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Responsible Clinician: <span className="font-semibold text-on-surface">Dr. Daniel James (#DEN-48912)</span> •
                Encounter: <span className="font-mono">#EXAM-0982</span> • Protocol: <span className="font-mono">DHA-CPG-REST-04</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            <button
              type="button"
              onClick={() => navigate('/investigations/compare')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-outline-variant/40 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="compare" className="text-sm text-primary" />
              <span>Longitudinal Comparison (11.21)</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/investigations/reports')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-outline-variant/40 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="picture_as_pdf" className="text-sm text-primary" />
              <span>PDF Report (11.24)</span>
            </button>
          </div>
        </section>

        {/* Multi-Modal Evidence Carousel */}
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon name="collections_bookmark" className="text-primary text-base" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-outline">
                Linked Multi-Modal Diagnostic Evidence (3 Modalities Correlated)
              </h3>
            </div>
            <span className="text-xs text-outline font-medium">All Modalities Verified</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {evidenceItems.map((item) => {
              const isSelected = activeEvidenceTab === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveEvidenceTab(item.id as 'bw' | 'pa' | 'photo')}
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-primary/5 border-primary ring-2 ring-primary/20 shadow-sm'
                      : 'bg-surface-container-low/60 border-outline-variant/30 hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant'
                      }`}
                    >
                      {item.badge}
                    </span>
                    <Icon name={item.icon} className={`text-base ${isSelected ? 'text-primary' : 'text-outline'}`} />
                  </div>
                  <h4 className="text-sm font-bold text-on-surface">{item.title}</h4>
                  <p className="text-[11px] font-mono text-outline">{item.modality}</p>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed bg-surface-container-lowest/80 p-2.5 rounded-lg border border-outline-variant/20">
                    {item.finding}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Modality Focus Strip */}
          <div className="mt-4 p-3 rounded-xl bg-surface-container-low/80 border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary">Active Modality Inspect:</span>
              <span className="text-on-surface">
                {activeEvidenceTab === 'bw'
                  ? 'Right Bitewing (BW-R) • High-Res DICOM Calibrated'
                  : activeEvidenceTab === 'pa'
                  ? 'Periapical #16 (PA-16) • Apical Third Evaluation'
                  : 'Macro Clinical Photo • 1:1 Cross-Polarized'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                if (activeEvidenceTab === 'bw') navigate('/investigations/viewer/xray');
                else if (activeEvidenceTab === 'pa') navigate('/investigations/viewer/xray');
                else navigate('/investigations/viewer/photo');
              }}
              className="text-primary hover:underline font-bold flex items-center gap-1 shrink-0"
            >
              <span>Launch Full Workstation Viewer</span>
              <Icon name="open_in_new" className="text-xs" />
            </button>
          </div>
        </section>

        {/* Structured Findings & Vitality Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Diagnostic Formulation & Vitality (7 Cols) */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            {/* Primary Diagnosis & ICD-10 Coding */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                <Icon name="medical_services" className="text-sm text-primary" />
                <span>Primary Diagnostic Formulation</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-on-surface block mb-1">
                    ICD-10 Diagnostic Classification:
                  </label>
                  <select
                    value={icdCode}
                    onChange={(e) => setIcdCode(e.target.value)}
                    disabled={isSealed}
                    className="w-full text-xs font-medium rounded-xl border border-outline-variant/40 bg-surface px-3 py-2.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
                  >
                    <option value="K02.52">K02.52 — Caries of dentine, extending into pulp border (Active)</option>
                    <option value="K02.62">K02.62 — Caries of dentine, non-cavitated pit and fissure</option>
                    <option value="K04.01">K04.01 — Reversible pulpitis</option>
                    <option value="K04.02">K04.02 — Irreversible pulpitis (Symptomatic)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-on-surface block mb-1">Tooth Association & Site:</label>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-2 rounded-xl bg-primary/10 text-primary font-bold text-xs border border-primary/20">
                      Tooth #16 (FDI)
                    </span>
                    <span className="px-3 py-2 rounded-xl bg-surface-container-low text-on-surface text-xs font-medium border border-outline-variant/30">
                      Disto-Occlusal (DO)
                    </span>
                    <span className="px-3 py-2 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                      ICDAS 3/4
                    </span>
                  </div>
                </div>
              </div>

              {/* Vitality & Diagnostic Tests Assessment */}
              <div className="pt-3 border-t border-outline-variant/20">
                <h4 className="text-xs font-bold text-on-surface mb-3 flex items-center gap-1.5">
                  <Icon name="monitor_heart" className="text-sm text-secondary" />
                  <span>Pulpal Vitality & Periapical Diagnostic Battery</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <span className="text-[10px] uppercase font-mono text-outline block">Pulpal Diagnosis</span>
                    <select
                      value={pulpVitality}
                      onChange={(e) => setPulpVitality(e.target.value as any)}
                      disabled={isSealed}
                      className="mt-1 w-full text-xs font-bold bg-surface rounded-lg p-1.5 border border-outline-variant/40 text-on-surface"
                    >
                      <option value="reversible">Reversible Pulpitis (Normal response to therapy)</option>
                      <option value="irreversible">Symptomatic Irreversible Pulpitis</option>
                      <option value="normal">Normal Pulp Tissue</option>
                      <option value="necrotic">Pulpal Necrosis (Non-vital)</option>
                    </select>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <span className="text-[10px] uppercase font-mono text-outline block">Thermal Cold Test (Endo-Ice)</span>
                    <input
                      type="text"
                      value={coldTestResult}
                      onChange={(e) => setColdTestResult(e.target.value)}
                      disabled={isSealed}
                      className="mt-1 w-full text-xs font-medium bg-surface rounded-lg p-1.5 border border-outline-variant/40 text-on-surface"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <span className="text-[10px] uppercase font-mono text-outline block">Electric Pulp Test (EPT)</span>
                    <input
                      type="text"
                      value={eptReading}
                      onChange={(e) => setEptReading(e.target.value)}
                      disabled={isSealed}
                      className="mt-1 w-full text-xs font-medium bg-surface rounded-lg p-1.5 border border-outline-variant/40 text-on-surface"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                    <span className="text-[10px] uppercase font-mono text-outline block">Mechanical Percussion</span>
                    <input
                      type="text"
                      value={percussionStatus}
                      onChange={(e) => setPercussionStatus(e.target.value)}
                      disabled={isSealed}
                      className="mt-1 w-full text-xs font-medium bg-surface rounded-lg p-1.5 border border-outline-variant/40 text-on-surface"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Treatment Directives & Execution Window */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                <Icon name="handyman" className="text-sm text-primary" />
                <span>Recommended Treatment Directives & Urgency</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-on-surface block mb-1">DHA Procedure Directive:</label>
                  <select
                    value={treatmentDirective}
                    onChange={(e) => setTreatmentDirective(e.target.value)}
                    disabled={isSealed}
                    className="w-full text-xs font-medium rounded-xl border border-outline-variant/40 bg-surface px-3 py-2.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
                  >
                    <option value="DHA-RES-2S">DHA-RES-2S — 2-Surface Posterior Biomimetic Composite</option>
                    <option value="DHA-RES-3S">DHA-RES-3S — 3-Surface Complex Resin Restoration</option>
                    <option value="DHA-ENDO-MOLAR">DHA-ENDO-MOLAR — Molar Endodontic Therapy</option>
                    <option value="DHA-PREV-FLUORIDE">DHA-PREV-FLUORIDE — Topical NaF Desensitization & Recall</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-on-surface block mb-1">Recommended Execution Window:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setExecutionWindow('urgent_7d')}
                      disabled={isSealed}
                      className={`p-2 rounded-xl text-xs font-bold border transition-colors ${
                        executionWindow === 'urgent_7d'
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                      }`}
                    >
                      Within 7d
                    </button>
                    <button
                      type="button"
                      onClick={() => setExecutionWindow('routine_14d')}
                      disabled={isSealed}
                      className={`p-2 rounded-xl text-xs font-bold border transition-colors ${
                        executionWindow === 'routine_14d'
                          ? 'bg-primary/10 text-primary border-primary/30'
                          : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                      }`}
                    >
                      Within 14d
                    </button>
                    <button
                      type="button"
                      onClick={() => setExecutionWindow('elective_30d')}
                      disabled={isSealed}
                      className={`p-2 rounded-xl text-xs font-bold border transition-colors ${
                        executionWindow === 'elective_30d'
                          ? 'bg-secondary-container text-on-secondary-container border-secondary/30'
                          : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                      }`}
                    >
                      30d Elective
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right Panel: Patient Portal Plain Language Summary & Attestation Seal (5 Cols) */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            {/* Patient Portal Plain Language Summary Card */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon name="chat" className="text-sm text-primary" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-outline">
                    Patient Portal Plain Language Summary
                  </h4>
                </div>
                {/* Language Switcher */}
                <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-outline-variant/30 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setLanguageMode('en')}
                    className={`px-2 py-0.5 rounded font-bold ${
                      languageMode === 'en' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguageMode('ar')}
                    className={`px-2 py-0.5 rounded font-bold ${
                      languageMode === 'ar' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-on-surface-variant">
                Summarized clinical notes are displayed on the DHA Patient App under{' '}
                <span className="font-mono text-primary font-semibold">My Investigations</span>.
              </p>

              {languageMode === 'en' ? (
                <textarea
                  rows={5}
                  value={summaryEnglish}
                  onChange={(e) => setSummaryEnglish(e.target.value)}
                  disabled={isSealed}
                  className="w-full text-xs font-normal rounded-xl border border-outline-variant/40 bg-surface p-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60 leading-relaxed"
                />
              ) : (
                <textarea
                  rows={5}
                  dir="rtl"
                  value={summaryArabic}
                  onChange={(e) => setSummaryArabic(e.target.value)}
                  disabled={isSealed}
                  className="w-full text-xs font-normal rounded-xl border border-outline-variant/40 bg-surface p-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60 leading-relaxed"
                />
              )}

              <div className="flex items-center justify-between text-[11px] text-outline">
                <span>
                  Characters: {languageMode === 'en' ? summaryEnglish.length : summaryArabic.length} (Max 500)
                </span>
                <label className="flex items-center gap-1.5 cursor-pointer text-on-surface select-none">
                  <input
                    type="checkbox"
                    checked={publishToPortal}
                    onChange={(e) => setPublishToPortal(e.target.checked)}
                    disabled={isSealed}
                    className="rounded border-outline-variant text-primary focus:ring-0"
                  />
                  <span className="font-semibold text-xs">Publish to Patient Portal</span>
                </label>
              </div>
            </div>

            {/* Statutory Compliance & Digital Cryptographic Seal */}
            <div className="bg-gradient-to-br from-surface-container-low to-surface-container border border-outline-variant/40 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Icon name="verified_user" className="text-primary text-lg" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                  Statutory Attestation & Cryptographic Seal
                </h4>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={statutoryAgreed}
                    onChange={(e) => setStatutoryAgreed(e.target.checked)}
                    disabled={isSealed}
                    className="mt-0.5 rounded border-outline-variant text-primary focus:ring-0"
                  />
                  <span className="text-[11px] text-on-surface-variant leading-relaxed">
                    I, <span className="font-semibold text-on-surface">Dr. Daniel James (#DEN-48912)</span>, certify that
                    these radiographic and clinical observations are accurate, conform to DHA Health Data Governance Rule{' '}
                    <span className="font-mono text-primary font-semibold">DHA-HIS-P04</span>, and justify the proposed
                    restorative pathway.
                  </span>
                </label>
              </div>

              {isSealed ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <Icon name="lock" className="text-base text-emerald-600" />
                    <span>Cryptographically Sealed with SHA-256</span>
                  </div>
                  <div className="font-mono text-[10px] break-all bg-emerald-100/60 p-2 rounded-lg text-emerald-900 border border-emerald-200">
                    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Recorded in NABIDH WORM Audit Ledger • Version 1.2 Active
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSealAndCommit}
                  className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 shadow-md transition-all"
                >
                  <Icon name="lock" className="text-base" />
                  <span>Commit Interpretation & Seal Record</span>
                </button>
              )}

              {/* Follow-up Navigation Links */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/investigations/follow-up')}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface font-semibold text-xs flex items-center justify-center gap-2 border border-outline-variant/30 transition-colors"
                >
                  <Icon name="schedule_send" className="text-base text-primary" />
                  <span>Configure Clinical Follow-up (11.22)</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/investigations/history')}
                  className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-surface-container-low text-on-surface-variant font-medium text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Icon name="history_edu" className="text-base" />
                  <span>View WORM Ledger & Version Chain (11.23)</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </InvestigationShell>
  );
}

