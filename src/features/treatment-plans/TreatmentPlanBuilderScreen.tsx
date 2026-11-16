import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { QuickLinks } from '../../design/QuickLinks';
import { Icon } from '../../design/Primitives';

interface TreatmentItem {
  id: string;
  code: string;
  dhaCode: string;
  title: string;
  tooth: string;
  amount: number;
  priority: 'Urgent' | 'Attention' | 'Routine';
  clinicalReason?: string;
  statusLabel?: string;
}

export function TreatmentPlanBuilderScreen() {
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [phase1Items, setPhase1Items] = useState<TreatmentItem[]>([
    {
      id: 'item-1',
      code: '#13.1-A',
      dhaCode: 'DHA-RES-2S',
      title: 'Direct Biomimetic Resin Composite (2-Surface MO)',
      tooth: 'Tooth: FDI #16 (Universal #3, Maxillary Right 1st Molar)',
      amount: 850,
      priority: 'Urgent',
      clinicalReason: 'Cavitated ICDAS 3/4 dentin caries. Preserved 2.1mm dentin bridge.',
      statusLabel: 'Assigned: Dr. Daniel James',
    },
  ]);

  const [phase2Items, setPhase2Items] = useState<TreatmentItem[]>([
    {
      id: 'item-2',
      code: '#13.2-A',
      dhaCode: 'DHA-PREV-FLUOR',
      title: 'Topical Fluoride Varnish & Enamel Remineralization',
      tooth: 'Tooth: FDI #15 (Distal surface white spot ICDAS 1)',
      amount: 250,
      priority: 'Attention',
      statusLabel: 'DHA Verified Standard',
    },
    {
      id: 'item-3',
      code: '#13.2-B',
      dhaCode: 'DHA-PERIO-REC',
      title: 'Comprehensive Periodontal Maintenance & Occlusal Audit',
      tooth: 'Area: Full Dentition (Quadrants 1–4)',
      amount: 350,
      priority: 'Routine',
      statusLabel: 'Full Mouth Scale & Polish',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddItemPhase1 = () => {
    const newItem: TreatmentItem = {
      id: `item-${Date.now()}`,
      code: '#13.1-B',
      dhaCode: 'DHA-PULP-CAP',
      title: 'Therapeutic Indirect Pulp Cap with Calcium Silicate',
      tooth: 'Tooth: FDI #16 (Deep pulp barrier)',
      amount: 200,
      priority: 'Urgent',
      clinicalReason: 'Pulpal buffer preservation under composite.',
      statusLabel: 'Assigned: Dr. Daniel James',
    };
    setPhase1Items([...phase1Items, newItem]);
    showToast('Appended item to Phase 1');
  };

  const handleAddItemPhase2 = () => {
    const newItem: TreatmentItem = {
      id: `item-${Date.now()}`,
      code: '#13.2-C',
      dhaCode: 'DHA-SEAL-PR',
      title: 'Pit and Fissure Sealant Placement',
      tooth: 'Tooth: FDI #17 (Sound occlusal fissures)',
      amount: 150,
      priority: 'Routine',
      statusLabel: 'Preventive Measure',
    };
    setPhase2Items([...phase2Items, newItem]);
    showToast('Appended item to Phase 2');
  };

  const handleDeleteItem1 = (id: string) => {
    setPhase1Items(phase1Items.filter((i) => i.id !== id));
    showToast('Item removed from Phase 1');
  };

  const handleDeleteItem2 = (id: string) => {
    setPhase2Items(phase2Items.filter((i) => i.id !== id));
    showToast('Item removed from Phase 2');
  };

  const totalGross =
    phase1Items.reduce((acc, curr) => acc + curr.amount, 0) +
    phase2Items.reduce((acc, curr) => acc + curr.amount, 0);

  const copayEst = Math.round(totalGross * 0.2);

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Plan Builder"
      badgeCode="13.5"
      badgeLabel="Phases & Items"
      currentStep="Plan Builder"
    >
      <div className="space-y-6 max-w-5xl mx-auto pb-24">
        {/* Plan Header Context Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-full">
                  #TP-2026-089
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#3f4850] font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
                  Draft v1.0 • In Construction
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#131b2e] leading-snug">
                Tooth #16 Restorative &amp; Preventive Protocol
              </h1>
              <div className="flex items-center gap-3 text-xs text-[#707881] flex-wrap pt-0.5">
                <span className="font-semibold text-[#131b2e]">Amara Okafor (34y F)</span>
                <span>•</span>
                <span className="text-[#006194] font-medium">Attending: Dr. Daniel James</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="h-10 px-4 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] font-semibold text-xs flex items-center gap-1.5 transition-colors self-start shrink-0"
            >
              <Icon name="visibility" className="text-[18px]" />
              <span>Preview Plan</span>
            </button>
          </div>

          {/* Level 1 Bento Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="layers" className="text-[18px] text-[#006194]" />
                <span className="text-xs text-[#707881]">Structure</span>
              </div>
              <span className="text-xs font-bold text-[#131b2e]">
                2 Phases / {phase1Items.length + phase2Items.length} Items
              </span>
            </div>

            <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="schedule" className="text-[18px] text-[#006194]" />
                <span className="text-xs text-[#707881]">Chairtime</span>
              </div>
              <span className="text-xs font-bold text-[#131b2e]">~75 mins</span>
            </div>

            <div className="col-span-2 md:col-span-1 bg-[#cce5ff]/50 border border-[#93ccff]/40 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="account_balance_wallet" className="text-[18px] text-[#006194]" />
                <span className="text-xs text-[#006194] font-semibold">Gross Est.</span>
              </div>
              <span className="text-sm font-extrabold text-[#006194]">
                AED {totalGross.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/phases')}
              className="px-4 py-2 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Icon name="add_circle" className="text-[16px]" />
              <span>+ Add Treatment Phase</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/odontogram/view')}
              className="px-4 py-2 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Icon name="dentistry" className="text-[16px] text-[#006a61]" />
              <span>Chart Reference</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Quick-Pill Preview */}
        <div className="bg-[#eaedff] rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#006194] flex items-center justify-center font-extrabold text-sm shadow-xs">
              #16
            </div>
            <div>
              <p className="text-sm font-bold text-[#131b2e]">Target FDI #16 (Maxillary Right 1st Molar)</p>
              <p className="text-xs text-[#707881]">Preserved 2.1mm dentin bridge • Contact white spot on #15</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-md bg-[#89f5e7] text-[#00201d] uppercase">
            Verified
          </span>
        </div>

        {/* Master Hierarchy List: Phases & Items */}
        <div className="space-y-6">
          {/* Phase 1 */}
          <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
            {/* Phase Header */}
            <div className="p-4 sm:p-5 bg-[#f2f3ff] border-b border-[#eaedff] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    1
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-[#131b2e]">
                      Phase 1: Acute Restorative Intervention
                    </h2>
                    <p className="text-xs text-[#707881]">Target: &lt; 7 Days • Est. 45 mins chairside</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center gap-1">
                  <Icon name="emergency" className="text-[14px]" /> Urgent
                </span>
              </div>
              <p className="text-xs text-[#3f4850] bg-white p-2.5 rounded-xl border border-[#eaedff]">
                Immediate cavitation arrest and dentin protection to prevent mechanical pulp exposure.
              </p>
            </div>

            {/* Items inside Phase 1 */}
            <div className="p-4 sm:p-5 space-y-3">
              {phase1Items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f2f3ff] rounded-xl p-4 border border-[#eaedff] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[#006194] bg-[#cce5ff] px-2 py-0.5 rounded">
                          {item.code}
                        </span>
                        <span className="font-mono text-xs font-semibold bg-white text-[#131b2e] px-2 py-0.5 rounded border border-[#eaedff]">
                          {item.dhaCode}
                        </span>
                        <span className="text-xs font-bold bg-[#ffdad6] text-[#ba1a1a] px-2 py-0.5 rounded-full">
                          {item.priority}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#131b2e]">{item.title}</h3>
                      <p className="text-xs font-medium text-[#006194]">{item.tooth}</p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-base font-extrabold text-[#131b2e]">
                        AED {item.amount.toLocaleString()}
                      </span>
                      <p className="text-[11px] text-[#707881]">Draft UCC</p>
                    </div>
                  </div>

                  {item.clinicalReason && (
                    <div className="p-2.5 rounded-lg bg-white border border-[#eaedff] flex items-start gap-2 text-xs text-[#3f4850]">
                      <Icon name="clinical_notes" className="text-[16px] text-[#006194] shrink-0 mt-0.5" />
                      <p>
                        <strong className="text-[#131b2e]">Clinical Reason:</strong> {item.clinicalReason}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-[#eaedff] text-xs">
                    <span className="flex items-center gap-1.5 text-[#006a61] font-medium">
                      <Icon name="verified_user" className="text-[15px]" />
                      {item.statusLabel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => showToast('Editing Item ' + item.code)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#eaedff] text-[#006194] font-semibold text-xs border border-[#eaedff]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem1(item.id)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-[#ffdad6] text-[#707881] hover:text-[#ba1a1a] flex items-center justify-center border border-[#eaedff]"
                        aria-label="Remove item"
                      >
                        <Icon name="delete" className="text-[16px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddItemPhase1}
                className="w-full py-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-dashed border-[#93ccff]"
              >
                <Icon name="add" className="text-[18px]" />
                <span>+ Add Item to Phase 1</span>
              </button>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
            {/* Phase Header */}
            <div className="p-4 sm:p-5 bg-[#f2f3ff] border-b border-[#eaedff] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#006a61] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    2
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-[#131b2e]">
                      Phase 2: Remineralization &amp; Preventative Recare
                    </h2>
                    <p className="text-xs text-[#707881]">Target: 14–30 Days • Est. 30 mins chairside</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#89f5e7]/40 text-[#006a61] flex items-center gap-1">
                  <Icon name="autorenew" className="text-[14px]" /> Recare
                </span>
              </div>
              <p className="text-xs text-[#3f4850] bg-white p-2.5 rounded-xl border border-[#eaedff]">
                Non-invasive remineralization of adjacent contact and baseline periodontal prophylaxis.
              </p>
            </div>

            {/* Items inside Phase 2 */}
            <div className="p-4 sm:p-5 space-y-3">
              {phase2Items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f2f3ff] rounded-xl p-4 border border-[#eaedff] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[#006194] bg-[#cce5ff] px-2 py-0.5 rounded">
                          {item.code}
                        </span>
                        <span className="font-mono text-xs font-semibold bg-white text-[#131b2e] px-2 py-0.5 rounded border border-[#eaedff]">
                          {item.dhaCode}
                        </span>
                        <span className="text-xs font-semibold bg-[#eaedff] text-[#3f4850] px-2 py-0.5 rounded-full">
                          {item.priority}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#131b2e]">{item.title}</h3>
                      <p className="text-xs font-medium text-[#006a61]">{item.tooth}</p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-base font-extrabold text-[#131b2e]">
                        AED {item.amount.toLocaleString()}
                      </span>
                      <p className="text-[11px] text-[#707881]">Draft UCC</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#eaedff] text-xs">
                    <span className="flex items-center gap-1.5 text-[#707881] font-medium">
                      <Icon name="check_circle" className="text-[15px] text-[#006a61]" />
                      {item.statusLabel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => showToast('Editing Item ' + item.code)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#eaedff] text-[#006194] font-semibold text-xs border border-[#eaedff]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem2(item.id)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-[#ffdad6] text-[#707881] hover:text-[#ba1a1a] flex items-center justify-center border border-[#eaedff]"
                        aria-label="Remove item"
                      >
                        <Icon name="delete" className="text-[16px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddItemPhase2}
                className="w-full py-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-dashed border-[#93ccff]"
              >
                <Icon name="add" className="text-[18px]" />
                <span>+ Add Item to Phase 2</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statutory Compliance Note */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 sm:p-5 border border-[#eaedff] flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#89f5e7]/40 text-[#006a61] flex items-center justify-center shrink-0">
            <Icon name="health_and_safety" className="text-[22px]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#131b2e]">Compliance &amp; Co-Pay Note</h4>
            <p className="text-xs text-[#3f4850] mt-0.5 leading-relaxed">
              All procedural codes conform to DHA Unified Clinical Coding (UCC-2026). Prior authorization
              submission will be automatically batched upon finalizing Phase 1.
            </p>
          </div>
        </div>

        {/* Builder Sticky Bottom Toolbar */}
        <aside className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#eaedff] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-safe">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-2">
            {/* Financial Strip */}
            <div className="flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[#f2f3ff] text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#707881]">Gross Plan:</span>
                <span className="font-extrabold text-[#131b2e]">AED {totalGross.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="shield_with_heart" className="text-[16px] text-[#006a61]" />
                <span className="text-[#707881]">Est. Copay (20%):</span>
                <span className="font-bold text-[#006a61]">AED {copayEst.toLocaleString()}</span>
              </div>
            </div>

            {/* CTA Triggers */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => showToast('Treatment Plan Draft #TP-2026-089 Saved')}
                className="flex-1 h-12 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Icon name="bookmark_border" className="text-[18px]" />
                <span>Save Draft</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/treatment-plans/phases')}
                className="flex-[2] h-12 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
              >
                <span>Phase Management (13.6)</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </button>
            </div>
          </div>
        </aside>

        {/* Plan Preview Modal */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2.5">
                  <Icon name="fact_check" className="text-[22px] text-[#006194]" />
                  <h3 className="text-base font-bold text-[#131b2e]">Plan Overview Summary</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#f2f3ff] text-[#707881] hover:text-[#131b2e] flex items-center justify-center"
                >
                  <Icon name="close" className="text-[18px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-0.5">
                  <p className="font-bold text-[#707881] uppercase tracking-wider text-[10px]">Patient Profile</p>
                  <p className="font-bold text-[#131b2e] text-sm">Amara Okafor • 34y Female</p>
                  <p className="text-[#707881]">DHA Identity: 784-1990-2839210-1</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-2">
                  <p className="font-bold text-[#707881] uppercase tracking-wider text-[10px]">Sequential Schedule</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#131b2e]">Phase 1: Acute Intervention</span>
                    <span className="font-bold text-[#006194]">AED 850</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#131b2e]">Phase 2: Remineralization &amp; Prophy</span>
                    <span className="font-bold text-[#006194]">AED 600</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#89f5e7]/30 flex items-center justify-between">
                  <span className="font-semibold text-[#006a61]">Patient Portion Payable</span>
                  <span className="text-base font-extrabold text-[#006a61]">AED {copayEst}.00</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsPreviewOpen(false);
                    showToast('PDF Exported');
                  }}
                  className="flex-1 h-11 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Icon name="print" className="text-[18px]" />
                  <span>Export PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="flex-1 h-11 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-bold text-xs"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[18px] text-[#89f5e7]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
      <QuickLinks
        title="Plan Sections"
        links={[
          { to: '/treatment-plans/item-config', label: 'Add Treatment Item', icon: 'post_add' },
          { to: '/treatment-plans/cost-estimate', label: 'Cost Estimator', icon: 'payments' },
          { to: '/treatment-plans/consent', label: 'Informed Consent', icon: 'draw' },
          { to: '/treatment-plans/scheduling', label: 'Appointment Scheduling', icon: 'event_available' },
        ]}
      />
    </TreatmentPlanShell>
  );
}
