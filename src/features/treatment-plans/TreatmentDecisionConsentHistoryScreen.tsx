import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

type FilterCategory = 'all' | 'plan' | 'item' | 'consent';

interface TimelineEvent {
  id: string;
  category: 'plan' | 'item' | 'consent';
  timestamp: string;
  title: string;
  badge: string;
  badgeColor: string;
  icon: string;
  iconBg: string;
  details: string;
  meta: string;
  refCode?: string;
  copay?: string;
}

export function TreatmentDecisionConsentHistoryScreen() {
  const navigate = useNavigate();

  const [currentFilter, setCurrentFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const events: TimelineEvent[] = [
    {
      id: 'EV-001',
      category: 'consent',
      timestamp: 'Today 11:42 WAT',
      title: 'Periodontal Recare Consent Granted',
      badge: 'Active Consent',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      icon: 'check',
      iconBg: 'bg-[#006a61] text-white',
      details: 'Patient: Amara Okafor · Authentication: NIN biometric verification Biometric',
      meta: 'Witnessed: Dr. Daniel James',
      refCode: '#CON-089-C v1.0',
    },
    {
      id: 'EV-002',
      category: 'consent',
      timestamp: 'Today 11:40 WAT',
      title: 'Fluoride Varnish Consent Granted',
      badge: 'Active Consent',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      icon: 'check',
      iconBg: 'bg-[#006a61] text-white',
      details: 'Patient: Amara Okafor · Authentication: Mobile Health App PIN',
      meta: 'Tooth #15 Preventive Remineralization Protocol',
      refCode: '#CON-089-B v1.0',
    },
    {
      id: 'EV-003',
      category: 'plan',
      timestamp: 'Today 11:35 WAT',
      title: 'Patient Treatment Plan Decision: Full Acceptance',
      badge: 'Full Acceptance',
      badgeColor: 'bg-[#cce5ff] text-[#001d31]',
      icon: 'done_all',
      iconBg: 'bg-[#006194] text-white',
      details: 'Patient accepted all 3 of 3 items presented in treatment regimen (Direct Composite, Fluoride Varnish, Periodontal Scaling).',
      meta: 'Recorded by Amara Okafor (Autonomous Adult)',
      copay: 'NGN 290.00',
    },
    {
      id: 'EV-004',
      category: 'plan',
      timestamp: '14 Oct 2026, 11:15 WAT',
      title: 'Plan Formally Approved & Released to Patient',
      badge: 'Draft → Approved',
      badgeColor: 'bg-slate-100 text-slate-800',
      icon: 'clinical_notes',
      iconBg: 'bg-[#287ab3] text-white',
      details: 'Signed by attending clinician Dr. Daniel James (License #DEN-48912) following standard 6-point statutory clinical verification.',
      meta: 'All 6 statutory clinical safety checks cleared',
      refCode: '#TP-2026-089',
    },
    {
      id: 'EV-005',
      category: 'item',
      timestamp: '12 Oct 2026, 16:30 WAT',
      title: 'Alternative Treatment Option B (Ceramic Inlay) Explored',
      badge: 'Option Explored',
      badgeColor: 'bg-amber-100 text-amber-900',
      icon: 'alt_route',
      iconBg: 'bg-amber-500 text-white',
      details: 'Presented by Dr. Daniel James; patient weighed restorative longevity against out-of-pocket costs and elected conservative direct composite approach.',
      meta: 'Stored in differential registry for clinical review',
    },
    {
      id: 'EV-006',
      category: 'item',
      timestamp: '12 Oct 2026, 14:10 WAT',
      title: 'Treatment Plan #TP-2026-089 Created',
      badge: 'Genesis Record',
      badgeColor: 'bg-purple-100 text-purple-900',
      icon: 'auto_awesome',
      iconBg: 'bg-purple-600 text-white',
      details: 'Synthesized and originated from Section 12 Approved AI Diagnostic Summary #DHA-CS-9842.',
      meta: 'AI Clinical Synthesis Audited & Certified',
      refCode: '#DHA-CS-9842',
    },
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchCategory = currentFilter === 'all' || ev.category === currentFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        ev.title.toLowerCase().includes(q) ||
        ev.details.toLowerCase().includes(q) ||
        ev.timestamp.toLowerCase().includes(q) ||
        (ev.refCode && ev.refCode.toLowerCase().includes(q));
      return matchCategory && matchQuery;
    });
  }, [currentFilter, searchQuery, events]);

  const categoryCounts = {
    all: events.length,
    plan: events.filter((e) => e.category === 'plan').length,
    item: events.filter((e) => e.category === 'item').length,
    consent: events.filter((e) => e.category === 'consent').length,
  };

  return (
    <TreatmentPlanShell
      pageTitle="Decisions &amp; Consent Audit"
      badgeCode="13.14"
      badgeLabel="Immutable Audit Trail"
      currentStep="13.14"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Compliance & Search Section */}
        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[#006194]">
              <Icon name="verified" className="text-lg" />
              <span className="text-xs font-bold tracking-wider uppercase">
                DHA Clinical Compliance §13.14 Ledger
              </span>
            </div>
            <span className="bg-teal-50 text-[#006a61] border border-teal-200 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 self-start sm:self-auto font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              Ledger Synchronized
            </span>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by procedure, date, reference or decision type..."
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-[#006194] focus:ring-1 focus:ring-[#006194] outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <Icon name="cancel" className="text-lg" />
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {(['all', 'plan', 'item', 'consent'] as FilterCategory[]).map((cat) => {
              const label =
                cat === 'all'
                  ? 'All Events'
                  : cat === 'plan'
                  ? 'Plan Decisions'
                  : cat === 'item'
                  ? 'Item Decisions'
                  : 'Consents';
              const active = currentFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCurrentFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#006194] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {categoryCounts[cat]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Patient Context Header Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006194] to-[#004b73] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                AO
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900 truncate">Amara Okafor</h2>
                  <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">34y Female</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 flex-wrap">
                  <span className="font-mono text-[#006194] font-semibold">#TP-2026-089</span>
                  <span>•</span>
                  <span>Attending: Dr. Daniel James (#DEN-48912)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-500">
              <span className="flex items-center gap-1 bg-teal-50 text-[#006a61] border border-teal-200 px-2.5 py-1 rounded-full font-semibold">
                <Icon name="shield" className="text-sm" />
                NIN biometric verification
              </span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-full font-mono text-[11px] text-slate-700">
                Nigeria Health Information Exchange Node #LAG-9811
              </span>
            </div>
          </div>
        </div>

        {/* Cryptographic Audit Ledger Seal Banner */}
        <div className="bg-[#e2e7ff] rounded-2xl p-5 shadow-xs border border-blue-200">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Icon name="lock" className="text-xl" />
            </div>
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">Cryptographic WORM Audit Ledger</h3>
                <span className="bg-[#006194]/10 text-[#006194] px-2 py-0.5 rounded text-[10px] font-bold">
                  SHA-256
                </span>
              </div>
              <p className="text-xs text-[#3f4850] leading-relaxed">
                Immutable WORM Record. Historical decisions and consent declarations cannot be overwritten, modified, or silently deleted under DHA Health Informatics governance.
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs font-mono bg-white/80 backdrop-blur rounded-xl px-3 py-1.5 border border-blue-200/60 w-fit">
                <Icon name="fingerprint" className="text-[#006194] text-sm" />
                <span className="truncate max-w-[240px] text-slate-700">7f9a1c...e84b2390f021</span>
                <button
                  type="button"
                  onClick={() => showToast('SHA-256 Ledger Hash copied to clipboard')}
                  className="text-[#006194] hover:underline font-bold ml-1 text-xs"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Audit Trail */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="history" className="text-[#006194] text-xl" />
              <h3 className="font-bold text-base text-slate-900">Chronological Event Ledger</h3>
            </div>
            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
              WAT Timezone (UTC+4)
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="py-12 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-6">
              <Icon name="search_off" className="text-3xl text-slate-400 mb-2" />
              <h4 className="font-bold text-slate-900 text-sm">No Ledger Entries Found</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Try adjusting your search query or reset the filter category to view events.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCurrentFilter('all');
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-slate-100 text-[#006194] font-bold text-xs hover:bg-slate-200"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="relative pl-7 space-y-4 before:content-[''] before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {filteredEvents.map((event) => (
                <div key={event.id} className="relative group">
                  {/* Node icon indicator */}
                  <div className={`absolute -left-7 top-2 w-6 h-6 rounded-full flex items-center justify-center shadow-xs ${event.iconBg}`}>
                    <Icon name={event.icon} className="text-xs" />
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-2">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${event.badgeColor}`}>
                        {event.badge}
                      </span>
                      <span className="font-mono text-xs text-slate-400">{event.timestamp}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mt-1">{event.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{event.details}</p>

                    {event.copay && (
                      <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs">
                        <span className="text-slate-600 flex items-center gap-1.5">
                          <Icon name="payments" className="text-[#006194] text-base" />
                          Estimated Patient Co-Pay:
                        </span>
                        <span className="text-sm font-bold text-[#006194]">{event.copay}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{event.meta}</span>
                      {event.refCode && (
                        <span className="font-mono font-semibold text-[#006194]">{event.refCode}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Material Change & Renewal Advisory */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-start gap-3">
          <Icon name="info" className="text-[#006194] text-xl mt-0.5 shrink-0" />
          <div className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900">Material Change &amp; Intra-Op Modification Policy (§13.B):</strong> If procedure scope shifts unexpectedly during clinical operative delivery (e.g. unanticipated pulp proximity requiring endodontic intervention), a revised consent version (v2.0) must be digitally signed prior to irreversible step progression.
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => showToast('Generating official DHA Compliance PDF audit trail...')}
            className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#004b73] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Icon name="picture_as_pdf" className="text-base" />
            <span>Export Legal Audit Trail (PDF)</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Nigeria Health Information Exchange Node Confirmed: Block #8421 cryptographic match valid')}
            className="w-full h-12 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-300 flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <Icon name="verified" className="text-[#006a61] text-base" />
            <span>Verify Nigeria Health Information Exchange Ledger Hash</span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/consent')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            ← Back to Consent Management
          </button>
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/scheduling')}
            className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
          >
            <span>Proceed to Treatment Scheduling (13.15)</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
