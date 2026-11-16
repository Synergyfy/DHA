import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

type AuditFilter = 'all' | 'ai' | 'clinician' | 'governance';

interface AuditEvent {
  id: string;
  category: 'ai' | 'clinician' | 'governance';
  icon: string;
  iconBg: string;
  badge: string;
  badgeColor: string;
  timestamp: string;
  title: string;
  description: string;
  extraElement?: React.ReactNode;
}

export function AIActivitySourceHistoryScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<AuditFilter>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const auditEvents: AuditEvent[] = [
    {
      id: 'ev-8',
      category: 'governance',
      icon: 'verified',
      iconBg: 'bg-[#86f2e4] text-[#006a61]',
      badge: 'Human Clinician',
      badgeColor: 'bg-[#86f2e4] text-[#006a61]',
      timestamp: 'Today 11:28:44 WAT',
      title: 'Dossier Approved & Sealed',
      description:
        'Signed with digital signature key by Dr. Daniel James (#DEN-48912). Cryptographic SHA-256 seal verified and broadcasted to Nigeria Nigeria Health Information Exchange Health Exchange.',
      extraElement: (
        <div className="mt-2 bg-[#faf8ff] p-2.5 rounded-lg border border-[#eaedff] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#707881]">
            <Icon name="lock" className="text-[15px] text-[#006a61]" />
            <span className="font-mono text-[11px] truncate max-w-[200px]">SHA256: 9f82...b84c2a</span>
          </div>
          <span className="text-xs font-bold text-[#006a61]">COMMITTED</span>
        </div>
      ),
    },
    {
      id: 'ev-7',
      category: 'governance',
      icon: 'patient_list',
      iconBg: 'bg-[#eaedff] text-[#006194]',
      badge: 'Human Clinician',
      badgeColor: 'bg-[#eaedff] text-[#006194]',
      timestamp: 'Today 11:24:10 WAT',
      title: 'Patient Portal Visibility Authorized',
      description:
        "Authorized plain-language explainer and interactive Tooth #16 restorative diagram for Amara's mobile portal. Sensitive internal EMR SOAP metrics restricted to clinical view.",
      extraElement: (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs bg-[#faf8ff] border border-[#eaedff] px-2.5 py-0.5 rounded font-medium text-[#131b2e]">
            Target: Tooth #16
          </span>
          <span className="text-xs bg-[#faf8ff] border border-[#eaedff] px-2.5 py-0.5 rounded font-medium text-[#131b2e]">
            Format: Lay Explainer
          </span>
        </div>
      ),
    },
    {
      id: 'ev-6',
      category: 'clinician',
      icon: 'edit_note',
      iconBg: 'bg-[#dae2fd] text-[#006194]',
      badge: 'Human Clinician',
      badgeColor: 'bg-[#dae2fd] text-[#006194]',
      timestamp: 'Today 11:15:22 WAT',
      title: 'Clinician Custom Directive Added',
      description: 'Added specific restorative instruction for preparation.',
      extraElement: (
        <div className="mt-2 p-3 bg-[#faf8ff] rounded-lg border-l-3 border-[#006194] border border-[#eaedff]">
          <p className="text-xs text-[#131b2e] italic">
            &ldquo;Check lateral excursive contacts on #46 during preparation of #16.&rdquo;
          </p>
          <span className="text-[11px] text-[#707881] block mt-1">Operator: Dr. Daniel James</span>
        </div>
      ),
    },
    {
      id: 'ev-5',
      category: 'ai',
      icon: 'auto_awesome',
      iconBg: 'bg-[#cce5ff] text-[#006194]',
      badge: 'AI Engine v2.4',
      badgeColor: 'bg-[#cce5ff] text-[#006194]',
      timestamp: 'Today 10:42:05 WAT',
      title: 'Patient-Friendly Explainer Formulated',
      description:
        'Translated anatomical Latin terms to lay dental vocabulary. Readability audited at Flesch-Kincaid Grade 6.2 with safety guardrails applied.',
      extraElement: (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs bg-[#86f2e4]/30 text-[#006a61] px-2.5 py-0.5 rounded font-semibold">
            Flesch-Kincaid: 6.2
          </span>
          <span className="text-xs bg-[#eaedff] text-[#006194] px-2.5 py-0.5 rounded font-semibold">
            Safety Check: Pass
          </span>
        </div>
      ),
    },
    {
      id: 'ev-4',
      category: 'ai',
      icon: 'psychology',
      iconBg: 'bg-[#cce5ff] text-[#006194]',
      badge: 'AI Engine v2.4',
      badgeColor: 'bg-[#cce5ff] text-[#006194]',
      timestamp: 'Today 10:20:18 WAT',
      title: 'Clinical SOAP Summary Generated',
      description:
        'Structured diagnostic synthesis using template DHA Standard Comprehensive v2.4. Diagnostic correlation mapped to ICD-10 K02.62 (Caries of Dentin).',
      extraElement: (
        <div className="flex items-center gap-1.5 text-[#006a61] text-xs font-bold mt-2">
          <Icon name="task_alt" className="text-[16px]" />
          <span>Inference Confidence: 99.4%</span>
        </div>
      ),
    },
    {
      id: 'ev-3',
      category: 'ai',
      icon: 'input',
      iconBg: 'bg-[#eaedff] text-[#707881]',
      badge: 'System Ingestion',
      badgeColor: 'bg-[#eaedff] text-[#707881]',
      timestamp: 'Today 10:16:04 WAT',
      title: 'Clinical Data Sources Ingested',
      description:
        'Secure ingestion of 6 verified records: Sec 9 Odontogram, Sec 10 Periodontal Exam, Sec 11 Dexis Bitewing Radiographs, CAP Lab Panel, & Medical History (Penicillin Anaphylaxis flag).',
    },
    {
      id: 'ev-2',
      category: 'governance',
      icon: 'fingerprint',
      iconBg: 'bg-[#86f2e4] text-[#006a61]',
      badge: 'Consent Verified',
      badgeColor: 'bg-[#86f2e4] text-[#006a61]',
      timestamp: 'Today 10:14:30 WAT',
      title: 'Patient Identity & Consent Verified',
      description:
        'Biometric token & NIN biometric verification validation confirmed chairside with Amara Okafor. Explicit consent granted for AI synthesis and Nigeria Health Information Exchange syncing.',
    },
    {
      id: 'ev-1',
      category: 'governance',
      icon: 'power_settings_new',
      iconBg: 'bg-[#dae2fd] text-[#131b2e]',
      badge: 'Session Origin',
      badgeColor: 'bg-[#dae2fd] text-[#131b2e]',
      timestamp: 'Today 10:12:00 WAT',
      title: 'AI Summary Session Initiated',
      description:
        'Triggered by Dr. Daniel James from Dental Terminal D-04 (Operatory 2). Session key established via TLS 1.3.',
    },
  ];

  const filteredEvents = auditEvents.filter((ev) => {
    if (activeFilter === 'all') return true;
    return ev.category === activeFilter;
  });

  return (
    <SummaryShell
      pageTitle="AI Activity & Source History"
      badgeCode="12.18"
      badgeLabel="Statutory Audit Trail"
      currentStep="Activity & Audit"
    >
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-white/10 animate-fade-in">
            <Icon name="check_circle" className="text-emerald-400 text-[18px]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header Hero */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[#006194]">
            <Icon name="verified_user" className="text-[18px]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              Statutory Audit Trail
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e]">
            AI Activity &amp; Provenance Audit
          </h2>
          <p className="text-xs sm:text-sm text-[#707881]">
            Cryptographic event log &amp; data source chronology for Dossier{' '}
            <span className="font-mono font-bold text-[#006194]">#DHA-CS-9842</span>
          </p>
        </div>

        {/* Patient & Encounter Context Badge Card */}
        <section className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#eaedff] text-[#006194] flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                AO
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-[#131b2e]">Amara Okafor</h4>
                  <span className="text-xs text-[#707881]">34y F</span>
                </div>
                <span className="font-mono text-xs text-[#006194] font-semibold">
                  DHA-2026-00451
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#86f2e4] text-[#006a61] text-xs font-bold flex items-center gap-1">
              <Icon name="shield" className="text-[14px]" />
              Nigeria Health Information Exchange Synced
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff]">
              <span className="text-[#707881] block">Supervising Clinician</span>
              <span className="font-bold text-[#131b2e] block mt-0.5">Dr. Daniel James</span>
              <span className="font-mono text-[#006a61] text-[11px]">#DEN-48912</span>
            </div>
            <div className="bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff]">
              <span className="text-[#707881] block">Clinical Encounter</span>
              <span className="font-mono font-bold text-[#131b2e] block mt-0.5">
                #EXAM-2026-1048
              </span>
              <span className="text-[#707881] text-[11px]">12 Oct 2026</span>
            </div>
          </div>
        </section>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeFilter === 'all'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#707881] hover:text-[#131b2e] border border-[#eaedff]'
            }`}
          >
            <span>All Events</span>
            <span className="bg-white/20 px-1.5 py-0.2 rounded-full text-[10px]">8</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('ai')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeFilter === 'ai'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#707881] hover:text-[#131b2e] border border-[#eaedff]'
            }`}
          >
            <span>AI Synthesis</span>
            <span className="bg-[#eaedff] text-[#006194] px-1.5 py-0.2 rounded-full text-[10px]">
              3
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('clinician')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeFilter === 'clinician'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#707881] hover:text-[#131b2e] border border-[#eaedff]'
            }`}
          >
            <span>Clinical Edits</span>
            <span className="bg-[#eaedff] text-[#006194] px-1.5 py-0.2 rounded-full text-[10px]">
              2
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('governance')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeFilter === 'governance'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#707881] hover:text-[#131b2e] border border-[#eaedff]'
            }`}
          >
            <span>Governance &amp; Sign-off</span>
            <span className="bg-[#eaedff] text-[#006194] px-1.5 py-0.2 rounded-full text-[10px]">
              3
            </span>
          </button>
        </div>

        {/* Interactive Audit Chronology */}
        <section className="relative space-y-4 pl-4 sm:pl-6 border-l-2 border-[#eaedff] ml-3 sm:ml-4">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="relative group">
              {/* Timeline dot */}
              <div
                className={`absolute -left-[25px] sm:-left-[33px] top-4 w-5 h-5 rounded-full border-4 border-white shadow-xs ${
                  ev.category === 'governance'
                    ? 'bg-[#006a61]'
                    : ev.category === 'clinician'
                    ? 'bg-[#006194]'
                    : 'bg-[#007bb9]'
                }`}
              />

              {/* Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-2 hover:border-[#c2d1e0] transition-all">
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase ${ev.badgeColor}`}>
                    {ev.badge}
                  </span>
                  <span className="font-mono text-[#707881]">{ev.timestamp}</span>
                </div>

                <h4 className="font-bold text-sm sm:text-base text-[#131b2e]">{ev.title}</h4>
                <p className="text-xs sm:text-sm text-[#42474e] leading-relaxed">{ev.description}</p>

                {ev.extraElement}
              </div>
            </div>
          ))}
        </section>

        {/* Data Source Provenance Card */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#eaedff] text-[#006194] flex items-center justify-center">
                <Icon name="account_tree" className="text-[20px]" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#131b2e]">
                  Data Source Provenance
                </h4>
                <span className="text-xs text-[#006a61] font-semibold">Tamper-Proof Ledger</span>
              </div>
            </div>
            <Icon name="verified" className="text-[#006a61] text-[22px]" />
          </div>

          <p className="text-xs text-[#707881] leading-relaxed">
            Verified pursuant to <strong className="text-[#131b2e]">Nigeria Federal Health Law No. 2</strong> and DHA Health Information Exchange governance standard.
          </p>

          <div className="space-y-2.5">
            <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#131b2e]">
                  Sec 9 Odontogram &amp; Periodontal Matrix
                </span>
                <span className="font-mono text-[#707881]">12 Oct 2026 09:14</span>
              </div>
              <span className="font-mono text-[11px] text-[#006194] block truncate">
                HASH: 4e91b5c4643b17726de3f90118acb2049b81b9c1
              </span>
            </div>

            <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#131b2e]">
                  Sec 11 Dexis Digital Bitewings (DICOM)
                </span>
                <span className="font-mono text-[#707881]">13 Oct 2026 14:02</span>
              </div>
              <span className="font-mono text-[11px] text-[#006194] block truncate">
                HASH: a81df3977c04e22394018bc9842a1290bb87f1a
              </span>
            </div>

            <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#131b2e]">
                  CAP Lab Blood &amp; Coagulation Panel
                </span>
                <span className="font-mono text-[#707881]">14 Oct 2026 08:30</span>
              </div>
              <span className="font-mono text-[11px] text-[#006194] block truncate">
                HASH: f023ca79d863c1092837482bb4910248ad832ec
              </span>
            </div>
          </div>
        </section>

        {/* Primary Statutory Action Buttons */}
        <section className="space-y-3">
          <button
            type="button"
            onClick={() => showToast('Exporting Statutory Audit Report PDF...')}
            className="w-full h-12 bg-[#006194] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#004e78] transition-colors"
          >
            <Icon name="picture_as_pdf" className="text-[20px]" />
            <span>Export Statutory Audit Report (PDF)</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Blockchain verification receipt confirmed valid on Nigeria HealthNet')}
            className="w-full h-12 bg-white text-[#006194] border border-[#eaedff] rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs hover:bg-[#faf8ff] transition-colors"
          >
            <Icon name="policy" className="text-[20px]" />
            <span>Verify Blockchain Integrity Receipt</span>
          </button>
        </section>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/summaries/history')}
            className="px-4 py-2.5 rounded-xl border border-[#c2d1e0] text-[#131b2e] font-bold text-xs hover:bg-[#faf8ff] flex items-center gap-1.5 transition-colors"
          >
            <Icon name="arrow_back" className="text-[16px]" />
            <span>Version History (12.17)</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/summaries/templates')}
            className="px-5 py-2.5 rounded-xl bg-[#006194] text-white font-bold text-xs hover:bg-[#004e78] flex items-center gap-1.5 shadow-md shadow-[#006194]/20 transition-all hover:scale-[1.02]"
          >
            <span>Template Library (12.19)</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </button>
        </div>
      </div>
    </SummaryShell>
  );
}
