import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

interface RecommendationCard {
  id: string;
  title: string;
  priorityLabel: string;
  priorityColor: string;
  targetTooth?: string;
  targetScope?: string;
  targetDate: string;
  description: string;
  provider: string;
  destinationModule: string;
  destinationRoute: string;
  linkedEntity: string;
  actionText: string;
  accentBarColor: string;
}

export function FollowUpRecommendationsScreen() {
  const navigate = useNavigate();
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newRecTitle, setNewRecTitle] = useState<string>('');
  const [newRecPriority, setNewRecPriority] = useState<string>('Routine');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [recommendations, setRecommendations] = useState<RecommendationCard[]>([
    {
      id: 'rec-1',
      title: 'Operative Restoration #16',
      priorityLabel: 'High Priority • Next 7 Days',
      priorityColor: 'bg-error-container text-on-error-container',
      targetTooth: 'Tooth #16 (OM)',
      targetDate: '23 Feb 2025',
      description:
        'Cavitated dentinal caries ICDAS 3/4 requiring biomimetic resin composite. Marginal prep with localized micro-matrix isolation.',
      provider: 'Dr. Daniel James (Restorative Suite)',
      destinationModule: 'Sec 13: Treatment Planning',
      destinationRoute: '/treatments',
      linkedEntity: 'Linked to Plan #TP-2025-04',
      actionText: 'Configure Treatment Step',
      accentBarColor: 'bg-error',
    },
    {
      id: 'rec-2',
      title: 'Supra & Subgingival Debridement',
      priorityLabel: 'Moderate • 14–21 Days',
      priorityColor: 'bg-surface-container-highest text-primary',
      targetScope: 'Full Mouth',
      targetDate: '02 Mar 2025',
      description:
        'Plaque-induced marginal gingivitis, BOP 18%, localized calculus in Q1 & Q4. Ultrasonic scaling followed by polish and chlorhexidine irrigation.',
      provider: 'Dental Hygienist (Clinic Floor)',
      destinationModule: 'Sec 4: Patient Reminders',
      destinationRoute: '/reminders',
      linkedEntity: 'Automated SMS & App Prompt',
      actionText: 'View Notification Trigger',
      accentBarColor: 'bg-secondary',
    },
    {
      id: 'rec-3',
      title: 'Specialist Endodontic Consultation',
      priorityLabel: 'Conditional / Watch Item',
      priorityColor: 'bg-surface-container text-on-surface-variant',
      targetTooth: '#16 Pulp Audit',
      targetDate: '16 Mar 2025',
      description:
        'Sensitivity monitoring on #16; pulp vitality follow-up required if thermal cold response lingers >5s post-restoration. Triage token reserved.',
      provider: 'Endodontic Specialist Panel (DHA Network)',
      destinationModule: 'Sec 20: Referral Management',
      destinationRoute: '/sharing/referrals',
      linkedEntity: 'Pre-authorized Token #REF-9081',
      actionText: 'Manage Referral Token',
      accentBarColor: 'bg-outline-variant',
    },
    {
      id: 'rec-4',
      title: '6-Month Comprehensive Recall & Radiographs',
      priorityLabel: 'Routine Recall',
      priorityColor: 'bg-secondary-container text-on-secondary-container',
      targetScope: 'Preventative',
      targetDate: '16 Aug 2025',
      description:
        'Standard periodic oral evaluation, annual bitewings, margin stability assessment for composite restoration, and periodontal re-charting.',
      provider: 'Dr. Daniel James (DHA Dental Care)',
      destinationModule: 'Sec 4: Patient Reminders',
      destinationRoute: '/reminders',
      linkedEntity: 'Auto-Queue 180 Days',
      actionText: 'Inspect Recall Schedule',
      accentBarColor: 'bg-secondary-fixed',
    },
  ]);

  const handleDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setIsDispatched(true);
      showToast('All recommendations dispatched successfully to Nigeria Health Information Exchange & integrated clinical modules!');
    }, 1100);
  };

  const handleAddRecommendation = () => {
    if (!newRecTitle.trim()) {
      showToast('Please enter a recommendation title');
      return;
    }
    const newCard: RecommendationCard = {
      id: `rec-${Date.now()}`,
      title: newRecTitle,
      priorityLabel: newRecPriority,
      priorityColor:
        newRecPriority === 'Urgent'
          ? 'bg-error-container text-on-error-container'
          : 'bg-surface-container text-on-surface',
      targetScope: 'Clinical Follow-up',
      targetDate: 'March 2025',
      description: 'Custom clinician recommendation appended to clinical dossier.',
      provider: 'Dr. Daniel James',
      destinationModule: 'Sec 13: Treatment Planning',
      destinationRoute: '/treatments',
      linkedEntity: 'DHA Care Plan',
      actionText: 'View Details',
      accentBarColor: 'bg-primary',
    };
    setRecommendations([...recommendations, newCard]);
    setNewRecTitle('');
    setIsAddModalOpen(false);
    showToast('Added follow-up recommendation');
  };

  return (
    <ExaminationShell
      pageTitle="Follow-up Recommendations"
      badgeCode="10.20"
      badgeLabel="Care Pathways"
      currentStep="Post-Examination Actionable Care Pathways"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Patient & Encounter Hero Bar */}
        <section className="bg-surface-container-low rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-base shrink-0">
                CO
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-bold text-on-surface truncate">Chinedu Okafor</h2>
                  <span className="text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-semibold">
                    34y • Male
                  </span>
                </div>
                <p className="text-xs font-mono text-on-surface-variant truncate">
                  DHA-10482 • Enc #EXAM-DHA-2025-0982
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                <Icon name="verified" className="text-sm text-secondary" />
                <span>Verified</span>
              </span>
              <p className="text-xs text-on-surface-variant font-medium mt-1">Dr. Daniel James</p>
            </div>
          </div>

          {/* Live Status Banner */}
          <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-3 border border-outline-variant/20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon name="assignment_turned_in" className="text-xl" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-on-surface truncate">Post-Examination Care Pathways</h3>
                <p className="text-[11px] text-on-surface-variant truncate">
                  {recommendations.length} Actionable Recommendations Formulated
                </p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-primary bg-surface-container px-2.5 py-1 rounded-lg shrink-0">
              {recommendations.length} Active
            </span>
          </div>
        </section>

        {/* Main Recommendations Stack */}
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="p-5 space-y-3">
                {/* Top Metadata & Priority */}
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${rec.priorityColor}`}>
                      {rec.priorityLabel.includes('High') && (
                        <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
                      )}
                      <span>{rec.priorityLabel}</span>
                    </span>
                    {(rec.targetTooth || rec.targetScope) && (
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container text-primary font-bold">
                        {rec.targetTooth || rec.targetScope}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-on-surface-variant font-mono">Target: {rec.targetDate}</span>
                </div>

                {/* Title & Clinical Indication */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-on-surface">{rec.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                    {rec.description}
                  </p>
                </div>

                {/* Provider and Target Module Badges */}
                <div className="space-y-2 pt-1 border-t border-outline-variant/20 text-xs">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <Icon name="clinical_notes" className="text-primary text-sm shrink-0" />
                    <span>Provider: <strong className="text-on-surface">{rec.provider}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap pt-0.5">
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container text-primary font-mono text-[11px] font-semibold flex items-center gap-1">
                      <Icon name="account_tree" className="text-xs" />
                      <span>{rec.destinationModule}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-secondary-container/50 text-on-secondary-container text-[11px] font-bold flex items-center gap-1">
                      <Icon name="link" className="text-xs" />
                      <span>{rec.linkedEntity}</span>
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      showToast(`Navigating to ${rec.destinationModule}...`);
                      navigate(rec.destinationRoute);
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>{rec.actionText}</span>
                    <Icon name="arrow_forward" className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Status Stripe */}
              <div className={`h-1.5 w-full ${rec.accentBarColor}`} />
            </div>
          ))}

          {/* Add New Recommendation Trigger */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="w-full p-5 rounded-2xl bg-surface-container-lowest border-2 border-dashed border-outline-variant/40 hover:border-primary/60 shadow-sm flex flex-col items-center justify-center gap-2 text-primary transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-surface-container-high group-hover:bg-primary-container flex items-center justify-center transition-colors">
              <Icon name="add_circle" className="text-2xl text-primary" />
            </div>
            <div className="text-center">
              <span className="text-xs sm:text-sm font-bold block">Add Follow-up Recommendation</span>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Queue additional clinical interventions, specialist referrals, or tests</p>
            </div>
          </button>
        </div>

        {/* Destination Cross-Module Quick-Jumps */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-bold text-on-surface">Integrated Destination Modules</h4>
            <span className="text-[11px] font-mono text-outline">DHA Dental EMR</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <NavLink
              to="/reminders"
              className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container shadow-sm flex items-center gap-2.5 transition-colors border border-outline-variant/20"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                <Icon name="notifications" className="text-base" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-on-surface-variant block">Sec 4</span>
                <span className="text-xs font-bold text-on-surface truncate block">Reminders</span>
              </div>
            </NavLink>

            <NavLink
              to="/examination/investigations"
              className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container shadow-sm flex items-center gap-2.5 transition-colors border border-outline-variant/20"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                <Icon name="radiology" className="text-base" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-on-surface-variant block">Sec 11</span>
                <span className="text-xs font-bold text-on-surface truncate block">Radiology</span>
              </div>
            </NavLink>

            <NavLink
              to="/treatments"
              className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container shadow-sm flex items-center gap-2.5 transition-colors border border-outline-variant/20"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                <Icon name="assignment" className="text-base" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-on-surface-variant block">Sec 13</span>
                <span className="text-xs font-bold text-on-surface truncate block">Tx Planning</span>
              </div>
            </NavLink>

            <NavLink
              to="/sharing/referrals"
              className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container shadow-sm flex items-center gap-2.5 transition-colors border border-outline-variant/20"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                <Icon name="forward_to_inbox" className="text-base" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-on-surface-variant block">Sec 20</span>
                <span className="text-xs font-bold text-on-surface truncate block">Referrals</span>
              </div>
            </NavLink>
          </div>
        </section>

        {/* Practitioner Confirmation & Audit Trail Banner */}
        <section className="bg-surface-container-low rounded-2xl p-4 flex items-start gap-3 border border-outline-variant/30 text-xs">
          <Icon name="verified_user" className="text-secondary text-xl shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-on-surface block">Clinician Sign-Off Ready</span>
            <p className="text-on-surface-variant leading-relaxed">
              Recommendations will automatically sync with the Nigeria Dental Health Authority Nigeria Health Information Exchange exchange and generate clinical task items upon dispatch.
            </p>
          </div>
        </section>

        {/* Bottom Actions Zone */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            disabled={isDispatching || isDispatched}
            onClick={handleDispatch}
            className={`w-full h-12 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
              isDispatched
                ? 'bg-secondary text-on-secondary'
                : 'bg-primary hover:bg-primary/90 text-on-primary'
            }`}
          >
            {isDispatching ? (
              <>
                <Icon name="progress_activity" className="text-base animate-spin" />
                <span>Dispatching to DHA Modules & Nigeria Health Information Exchange...</span>
              </>
            ) : isDispatched ? (
              <>
                <Icon name="check_circle" className="text-base" />
                <span>All Recommendations Dispatched</span>
              </>
            ) : (
              <>
                <Icon name="send" className="text-base" />
                <span>Save & Dispatch All Recommendations</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/examination/review')}
            className="w-full h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Icon name="arrow_back" className="text-base" />
            <span>Return to Examination Review</span>
          </button>
        </div>

        {/* Add Recommendation Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl p-6 border border-outline-variant/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <h3 className="text-sm sm:text-base font-bold text-on-surface">Queue Recommendation</h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
                >
                  <Icon name="close" className="text-sm" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-on-surface block">Title / Intervention</label>
                  <input
                    type="text"
                    value={newRecTitle}
                    onChange={(e) => setNewRecTitle(e.target.value)}
                    placeholder="e.g. Occlusal Night Guard Fabrication"
                    className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-on-surface block">Priority Tier</label>
                  <select
                    value={newRecPriority}
                    onChange={(e) => setNewRecPriority(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="Urgent">Urgent • Immediate</option>
                    <option value="Moderate">Moderate • 14–21 Days</option>
                    <option value="Routine">Routine • Preventative</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddRecommendation}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold"
                >
                  Add to Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ExaminationShell>
  );
}

export default FollowUpRecommendationsScreen;

