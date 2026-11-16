import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function AlternativeTreatmentOptionsScreen() {
  const navigate = useNavigate();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const clinicalRationales = {
    A: 'Vital coronal pulp safely shielded with 2.1mm confirmed dentinal bridge. Minimal healthy tooth removal indicated; leverages ultra-conservative adhesive bonding without requiring cuspal reduction.',
    B: 'Maximum cuspal reinforcement and superior structural rigidity against heavy bruxism/masticatory shear stresses. Provides flawless contact point reconstruction.',
    C: 'Applies active calcium silicate liner to encourage tertiary dentinogenesis in the event micro-pinpoint exposure occurs during deep excavating, followed by provisional seal and 8-week monitoring.',
  };

  const patientRationales = {
    A: "Your tooth's nerve is healthy and safely shielded with natural bone. This direct tooth-colored filling saves the most of your real tooth and is completed in a single comfortable 45-minute visit.",
    B: 'A custom lab-milled ceramic crown piece crafted to lock in extra strength if you grind your teeth. It lasts 15+ years with maximum durability.',
    C: 'A protective medicated healing layer placed over the tooth nerve to help it heal naturally, sealed with a temporary filling to observe before permanent finishing.',
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleConfirmAlternatives = () => {
    showToast('Standard 4.2.B validation met: 3 alternative pathways attached to plan dossier');
    setTimeout(() => {
      navigate('/treatment-plans/priority-rationale');
    }, 700);
  };

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Alternatives"
      badgeCode="13.8"
      badgeLabel="DHA Standard 4.2.B"
      currentStep="Informed Alternatives"
    >
      <div className="space-y-6 max-w-5xl mx-auto pb-16">
        {/* Header Clinical Context Strip */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#cce5ff] text-[#001d31] font-bold text-xs flex items-center justify-center shrink-0">
              AO
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#131b2e]">Amara Okafor</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#707881]">34y F</span>
                <span className="font-mono text-xs text-[#006194]">#TP-2026-089</span>
              </div>
              <p className="text-xs text-[#707881]">Attending: Dr. Daniel James (Harmony Dental Wuse 2)</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#cce5ff]/50 border border-[#93ccff]/40 self-start sm:self-auto">
            <Icon name="dentistry" className="text-[16px] text-[#006194]" />
            <span className="text-xs font-mono font-bold text-[#006194]">Target Tooth #16 MO</span>
          </div>
        </div>

        {/* DHA Governance Notice */}
        <div className="bg-gradient-to-r from-[#cce5ff]/40 to-[#f2f3ff] rounded-2xl p-5 border border-[#93ccff]/40 shadow-xs relative overflow-hidden">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Icon name="gavel" className="text-[20px]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#006194]">
                  DHA Clinical Standard 4.2.B
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#006194] shadow-xs">
                  Mandatory Governance
                </span>
              </div>
              <h2 className="text-base font-bold text-[#131b2e]">
                Alternative Treatment Pathways &amp; Informed Consent
              </h2>
              <p className="text-xs text-[#3f4850] mt-0.5 leading-relaxed">
                Presentation of evidence-based clinical alternatives and patient transparent pricing is
                statutorily mandatory prior to any invasive or irreversible odontological procedures.
              </p>
            </div>
          </div>
        </div>

        {/* Diagnostic Baseline Summary */}
        <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="radiology" className="text-[18px] text-[#006194]" />
              <span>Clinical Baseline Presentation</span>
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#89f5e7]/40 text-[#006a61]">
              Vital Pulp Preserved (2.1mm Buffer)
            </span>
          </div>
          <p className="text-xs text-[#3f4850] leading-relaxed">
            Tooth <strong className="text-[#131b2e]">#16</strong> exhibits deep mesio-occlusal caries extending
            within <span className="font-bold text-[#006194]">2.1mm</span> of vital coronal pulp tissue. Intact dentinal ceiling verified via Dexis bitewing radiograph (BW-R-1048).
          </p>
        </div>

        {/* Patient Preview Mode Switch Toggle */}
        <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] text-[#006194] flex items-center justify-center">
              <Icon name="visibility" className="text-[18px]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#131b2e]">Patient Plain-Language Mode</p>
              <p className="text-[11px] text-[#707881]">
                {isPreviewMode ? 'Showing patient-friendly descriptions' : 'Showing clinical/technical terminology'}
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isPreviewMode}
              onChange={(e) => setIsPreviewMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#dae2fd] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006194]"></div>
          </label>
        </div>

        {/* 3 Treatment Pathway Cards */}
        <div className="space-y-4">
          {/* OPTION A: Primary Recommended Option */}
          <div className="bg-white rounded-2xl border-2 border-[#006a61] shadow-md overflow-hidden relative">
            <div className="bg-gradient-to-r from-[#006a61] to-[#00897b] text-white px-5 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="recommend" className="text-[18px]" />
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Dentist Recommended Primary Option
                </span>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-[#006a61]">
                Option A
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#131b2e]">
                  Direct Biomimetic Resin Composite (2-Surface MO)
                </h3>
                <p className="text-xs font-semibold text-[#006a61] mt-0.5">
                  Conservative Direct Adhesive Restoration
                </p>
              </div>

              {/* Rationale */}
              <div className="bg-[#f2f3ff] p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                  {isPreviewMode ? 'Why Dr. Daniel Recommends This' : 'Clinical Rationale'}
                </span>
                <p className="text-xs text-[#131b2e] leading-relaxed">
                  {isPreviewMode ? patientRationales.A : clinicalRationales.A}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-0.5">
                  <span className="text-[#707881] text-[11px]">Chairtime Duration</span>
                  <span className="font-bold text-[#131b2e] flex items-center gap-1">
                    <Icon name="schedule" className="text-[15px] text-[#006194]" /> 1 Visit (~45 mins)
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-0.5">
                  <span className="text-[#707881] text-[11px]">Estimated Longevity</span>
                  <span className="font-bold text-[#131b2e] flex items-center gap-1">
                    <Icon name="history_toggle_off" className="text-[15px] text-[#006a61]" /> 7 – 10 Years
                  </span>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="space-y-1.5 text-xs text-[#3f4850]">
                <div className="flex items-start gap-2">
                  <Icon name="check_circle" className="text-[16px] text-[#006a61] shrink-0 mt-0.5" />
                  <span>Immediate single-appointment marginal seal; zero biological width violation.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="check_circle" className="text-[16px] text-[#006a61] shrink-0 mt-0.5" />
                  <span>Preserves maximum virgin enamel and healthy marginal ridges.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="info" className="text-[16px] text-[#707881] shrink-0 mt-0.5" />
                  <span>Demands strict absolute moisture isolation (rubber dam placement required).</span>
                </div>
              </div>

              {/* Financial Strip */}
              <div className="pt-3 border-t border-[#eaedff] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#707881] block">Total Gross Fee</span>
                  <span className="text-sm font-bold text-[#131b2e]">NGN 850.00</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#006a61] font-bold block">Patient Copay (20%)</span>
                  <span className="text-lg font-extrabold text-[#006a61]">NGN 170.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* OPTION B: CAD/CAM Ceramic Inlay / Onlay */}
          <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
            <div className="bg-[#f2f3ff] px-5 py-2.5 flex items-center justify-between text-[#3f4850]">
              <span className="text-xs font-bold uppercase tracking-wider">
                Valid High-Durability Alternative
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-[#006194] shadow-xs">
                Option B
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#131b2e]">
                  Indirect Ceramic Onlay / Inlay (CAD/CAM Lithium Disilicate)
                </h3>
                <p className="text-xs font-semibold text-[#006194] mt-0.5">
                  Chairside High-Strength Bonded Milled Ceramic
                </p>
              </div>

              <div className="bg-[#f2f3ff] p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                  {isPreviewMode ? 'Why Consider This' : 'Clinical Rationale'}
                </span>
                <p className="text-xs text-[#131b2e] leading-relaxed">
                  {isPreviewMode ? patientRationales.B : clinicalRationales.B}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-0.5">
                  <span className="text-[#707881] text-[11px]">Chairtime Duration</span>
                  <span className="font-bold text-[#131b2e] flex items-center gap-1">
                    <Icon name="schedule" className="text-[15px] text-[#006194]" /> 2 Visits (or 90m block)
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-0.5">
                  <span className="text-[#707881] text-[11px]">Estimated Longevity</span>
                  <span className="font-bold text-[#131b2e] flex items-center gap-1">
                    <Icon name="workspace_premium" className="text-[15px] text-[#006194]" /> 15+ Years
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#eaedff] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#707881] block">Total Gross Fee</span>
                  <span className="text-sm font-bold text-[#131b2e]">NGN 2,200.00</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#006194] font-bold block">Estimated Copay</span>
                  <span className="text-lg font-extrabold text-[#006194]">NGN 750.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* OPTION C: Therapeutic Pulp Cap & Biodentine */}
          <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
            <div className="bg-[#f2f3ff] px-5 py-2.5 flex items-center justify-between text-[#3f4850]">
              <span className="text-xs font-bold uppercase tracking-wider">
                Stepwise / Guarded Biological Pathway
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-[#707881] shadow-xs">
                Option C
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#131b2e]">
                  Indirect Pulp Cap + Biodentine™ Bioactive Base
                </h3>
                <p className="text-xs font-semibold text-[#707881] mt-0.5">
                  Stepwise Excavation &amp; Provisional Bioseal
                </p>
              </div>

              <div className="bg-[#f2f3ff] p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                  {isPreviewMode ? 'Why Consider This' : 'Clinical Rationale'}
                </span>
                <p className="text-xs text-[#131b2e] leading-relaxed">
                  {isPreviewMode ? patientRationales.C : clinicalRationales.C}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-0.5">
                  <span className="text-[#707881] text-[11px]">Chairtime Duration</span>
                  <span className="font-bold text-[#131b2e] flex items-center gap-1">
                    <Icon name="pending_actions" className="text-[15px] text-[#006194]" /> 2 Stages (8w re-eval)
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-0.5">
                  <span className="text-[#707881] text-[11px]">Stepwise Goal</span>
                  <span className="font-bold text-[#131b2e] flex items-center gap-1">
                    <Icon name="healing" className="text-[15px] text-[#006a61]" /> Bridge Formation
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#eaedff] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#707881] block">Stage 1 Initial Fee</span>
                  <span className="text-sm font-bold text-[#131b2e]">NGN 1,150.00</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#707881] font-bold block">Stage 1 Copay</span>
                  <span className="text-lg font-extrabold text-[#131b2e]">NGN 350.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparative Decision Matrix Table */}
        <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Icon name="compare" className="text-[20px] text-[#006194]" />
            <h4 className="text-base font-bold text-[#131b2e]">Comparative Decision Matrix</h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#f2f3ff] text-[#707881] font-bold">
                  <th className="py-2.5 px-3 rounded-l-lg">Dimension</th>
                  <th className="py-2.5 px-3 text-[#006a61]">A: Direct Resin (Rec)</th>
                  <th className="py-2.5 px-3">B: Ceramic Onlay</th>
                  <th className="py-2.5 px-3 rounded-r-lg">C: Biodentine Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaedff]">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#707881]">Longevity</td>
                  <td className="py-2.5 px-3 font-bold text-[#006a61]">7 – 10 Years</td>
                  <td className="py-2.5 px-3 text-[#131b2e]">15+ Years</td>
                  <td className="py-2.5 px-3 text-[#707881]">Transitional (8w)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#707881]">Tooth Invasiveness</td>
                  <td className="py-2.5 px-3 font-bold text-[#006a61]">Ultra-Low (Selective)</td>
                  <td className="py-2.5 px-3 text-[#131b2e]">Moderate (Divergence)</td>
                  <td className="py-2.5 px-3 text-[#707881]">Selective Excavation</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#707881]">Appointments</td>
                  <td className="py-2.5 px-3 font-bold text-[#006a61]">1 Visit (45 mins)</td>
                  <td className="py-2.5 px-3 text-[#131b2e]">1 – 2 Visits</td>
                  <td className="py-2.5 px-3 text-[#707881]">2 Stages (Re-eval)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#707881]">Patient Copay</td>
                  <td className="py-2.5 px-3 font-bold text-[#006a61]">NGN 170</td>
                  <td className="py-2.5 px-3 font-bold text-[#006194]">NGN 750</td>
                  <td className="py-2.5 px-3 font-bold text-[#131b2e]">NGN 350</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Attending Dentist Endorsement */}
        <div className="bg-[#f2f3ff] rounded-2xl p-5 border border-[#eaedff] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shrink-0">
              DJ
            </div>
            <div>
              <p className="text-sm font-bold text-[#131b2e]">Dr. Daniel James, DDS</p>
              <p className="text-xs text-[#707881]">Consultant Restorative Odontology • Lic. #DEN-48912</p>
            </div>
          </div>
          <p className="text-xs text-[#131b2e] italic bg-white p-3.5 rounded-xl border border-[#eaedff] leading-relaxed">
            “Option A is strongly advised today given confirmed vital pulp and adequate dentin buffer (2.1mm).
            Minimal healthy tissue removal satisfies conservative biomimetic criteria while minimizing immediate financial liability.”
          </p>
          <div className="flex items-center justify-between text-xs text-[#707881] pt-1">
            <span>Verified Digital Signature Token</span>
            <span className="text-[#006a61] font-semibold flex items-center gap-1">
              <Icon name="lock" className="text-[14px]" /> 24 Feb 2026, 11:42 WAT
            </span>
          </div>
        </div>

        {/* Action Trays */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={handleConfirmAlternatives}
            className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
          >
            <Icon name="assignment_turned_in" className="text-[18px]" />
            <span>Confirm &amp; Attach Alternatives to Plan (Proceed to 13.9)</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('New alternative template appended')}
            className="w-full h-12 rounded-xl bg-white border border-[#eaedff] text-[#006194] font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#f2f3ff] transition-colors"
          >
            <Icon name="add_circle" className="text-[18px]" />
            <span>+ Add Custom Alternative Option</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/treatment-plans/builder')}
            className="w-full py-2.5 text-center text-[#707881] hover:text-[#131b2e] text-xs font-semibold transition-colors"
          >
            Return to Treatment Plan Builder
          </button>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[18px] text-[#89f5e7]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </TreatmentPlanShell>
  );
}
