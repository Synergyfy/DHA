import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function PatientTreatmentPreviewScreen() {
  const navigate = useNavigate();

  const [selectedTooth, setSelectedTooth] = useState<string>('16');
  const [expandedStep1, setExpandedStep1] = useState<boolean>(true);
  const [expandedStep2, setExpandedStep2] = useState<boolean>(false);
  const [showInlayModal, setShowInlayModal] = useState<boolean>(false);

  const teethList = [
    { num: '14', name: 'Upper Right 1st Premolar', status: 'Healthy', note: 'No treatment needed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { num: '15', name: 'Upper Right 2nd Premolar', status: 'Incipient Enamel Caries', note: 'Fluoride Shield (Step 2)', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { num: '16', name: 'Upper Right 1st Molar', status: 'Active Dentin Cavity', note: 'Composite Filling (Step 1)', color: 'bg-amber-50 text-amber-700 border-amber-300 ring-2 ring-[#006194]' },
    { num: '17', name: 'Upper Right 2nd Molar', status: 'Sound Restoration', note: 'Existing filling intact', color: 'bg-slate-50 text-slate-600 border-slate-200' },
    { num: '18', name: 'Upper Right 3rd Molar', status: 'Erupted / Normal', note: 'Hygiene monitoring', color: 'bg-slate-50 text-slate-600 border-slate-200' },
  ];

  return (
    <TreatmentPlanShell
      pageTitle="Patient Treatment Preview"
      badgeCode="13.11"
      badgeLabel="Patient Facing View"
      currentStep="13.11"
    >
      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Navigation & Patient Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#eaedff] shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006194] to-[#004b73] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              AO
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">Your Proposed Care Plan</h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Ready for Review
                </span>
              </div>
              <p className="text-sm text-slate-600 flex items-center gap-2 mt-0.5">
                <span>Prepared by <strong>Dr. Daniel Mensah, DDS</strong></span>
                <span>•</span>
                <span>DHA Primary Dental Clinic</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="px-3 py-1.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-right">
              <span className="text-[11px] block font-medium text-slate-400 uppercase tracking-wider">LifeCode ID</span>
              <span className="font-mono text-xs font-bold text-[#006194]">AE-990-281-DXB</span>
            </div>
          </div>
        </div>

        {/* Good News Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#e6f4ea] via-[#f0fdf4] to-[#e0f2fe] border border-emerald-200/80 p-6 shadow-sm">
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-xs">
              <Icon name="verified" className="text-sm" />
              Early Intervention Advantage
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Good News: We Caught It Early!
              </h2>
              <p className="mt-2 text-slate-700 leading-relaxed max-w-2xl text-sm sm:text-base">
                Your molar tooth (<span className="font-semibold text-slate-900">#16</span>) has a small surface cavity, but it is nowhere near the sensitive nerve. A healthy <span className="font-semibold text-emerald-800">2.1 mm</span> natural barrier protects your tooth, meaning a gentle, comfortable tooth-coloured filling is all that is required.
              </p>
            </div>

            {/* Micro-Stat Pill Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/90 backdrop-blur rounded-xl p-3.5 border border-emerald-200/60 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Icon name="auto_fix_high" className="text-xl" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Treatment Type</div>
                  <div className="text-sm font-bold text-slate-900">Gentle Filling Only</div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur rounded-xl p-3.5 border border-emerald-200/60 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#006194] flex items-center justify-center shrink-0">
                  <Icon name="schedule" className="text-xl" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Estimated Time</div>
                  <div className="text-sm font-bold text-slate-900">45-Min Single Visit</div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur rounded-xl p-3.5 border border-emerald-200/60 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-100 text-[#006a61] flex items-center justify-center shrink-0">
                  <Icon name="sentiment_satisfied" className="text-xl" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Expected Recovery</div>
                  <div className="text-sm font-bold text-slate-900">Immediate & Pain-Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tooth Visualizer Ribbon */}
        <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Icon name="dentistry" className="text-[#006194]" />
                Upper Right Quadrant (Teeth 14 – 18)
              </h3>
              <p className="text-xs text-slate-500">Tap a tooth to view clinical details and proposed procedure</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              FDI Notation
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
            {teethList.map((tooth) => {
              const isSelected = selectedTooth === tooth.num;
              return (
                <button
                  key={tooth.num}
                  type="button"
                  onClick={() => setSelectedTooth(tooth.num)}
                  className={`text-left p-3 rounded-xl border transition-all text-xs ${tooth.color} ${
                    isSelected ? 'ring-2 ring-[#006194] shadow-sm transform scale-[1.02]' : 'hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">#{tooth.num}</span>
                    <Icon name="dentistry" className="text-base opacity-70" />
                  </div>
                  <div className="font-semibold truncate">{tooth.status}</div>
                  <div className="text-[10px] mt-0.5 opacity-80 truncate">{tooth.note}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Treatment Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Icon name="format_list_numbered" className="text-[#006194]" />
              Recommended Care Steps (2 Procedures)
            </h3>
            <span className="text-xs text-slate-500">Approved by DHA Clinical Review</span>
          </div>

          {/* Step 1 Card */}
          <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden transition-all">
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-blue-50/40 to-transparent">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#006194] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31]">
                        Priority: Immediate
                      </span>
                      <span className="text-xs font-mono text-slate-500">DHA-RES-DC-001 · D2391</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                        ADA Level A
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mt-1">
                      Direct Tooth-Coloured Composite Restoration
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Tooth #16 (Upper Right First Molar) · Occlusal-Mesial Surface
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-[10px] block font-semibold text-slate-400 uppercase">Your Share (20%)</span>
                    <span className="text-lg font-bold text-[#006194]">AED 170</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpandedStep1(!expandedStep1)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
                    aria-label="Toggle details"
                  >
                    <Icon name={expandedStep1 ? 'expand_less' : 'expand_more'} className="text-xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Step Details */}
            {expandedStep1 && (
              <div className="p-5 bg-[#faf8ff] space-y-4">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    What happens during this step:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#eaedff]">
                      <Icon name="check_circle" className="text-emerald-600 text-lg mt-0.5 shrink-0" />
                      <div className="text-xs text-slate-700">
                        <strong>Targeted Gentle Numbing:</strong> Quick, painless local numbing applied solely to tooth #16.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#eaedff]">
                      <Icon name="check_circle" className="text-emerald-600 text-lg mt-0.5 shrink-0" />
                      <div className="text-xs text-slate-700">
                        <strong>Micro-Preparation:</strong> Less than 2 mm of softened enamel removed, keeping 98% of healthy tooth intact.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#eaedff]">
                      <Icon name="check_circle" className="text-emerald-600 text-lg mt-0.5 shrink-0" />
                      <div className="text-xs text-slate-700">
                        <strong>Layered Nano-Composite:</strong> Biocompatible, colour-matched resin sculpted layer-by-layer.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#eaedff]">
                      <Icon name="check_circle" className="text-emerald-600 text-lg mt-0.5 shrink-0" />
                      <div className="text-xs text-slate-700">
                        <strong>Bite Alignment Polish:</strong> High-gloss finish calibrated to your natural occlusion for instant chewing.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#eaedff] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Icon name="health_and_safety" className="text-emerald-600 text-lg" />
                    <span>Insurance (DHA Enaya 80%): <strong>AED 680 Covered</strong></span>
                  </div>
                  <div className="text-slate-500">
                    Total Statutory Tariff: <span className="line-through">AED 850</span> → Patient Co-pay: <strong>AED 170</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 2 Card */}
          <div className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden transition-all">
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-teal-50/40 to-transparent">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#006a61] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-900">
                        Preventive Shield
                      </span>
                      <span className="text-xs font-mono text-slate-500">DHA-PRV-FV-001 · D1208</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                        WHO Guideline
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mt-1">
                      Fluoride Remineralisation Varnish Treatment
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Tooth #15 (Upper Right Second Premolar) · Mesial Contact Surface
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-[10px] block font-semibold text-slate-400 uppercase">Your Share (20%)</span>
                    <span className="text-lg font-bold text-[#006a61]">AED 120</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpandedStep2(!expandedStep2)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
                    aria-label="Toggle details"
                  >
                    <Icon name={expandedStep2 ? 'expand_less' : 'expand_more'} className="text-xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Step Details */}
            {expandedStep2 && (
              <div className="p-5 bg-[#faf8ff] space-y-4">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    What happens during this step:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#eaedff]">
                      <Icon name="check_circle" className="text-teal-600 text-lg mt-0.5 shrink-0" />
                      <div className="text-xs text-slate-700">
                        <strong>60-Second Application:</strong> A medical-grade fluoride varnish is painted onto the early chalky lesion.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#eaedff]">
                      <Icon name="check_circle" className="text-teal-600 text-lg mt-0.5 shrink-0" />
                      <div className="text-xs text-slate-700">
                        <strong>Zero Drilling or Injections:</strong> Non-invasive preventive care that halts decay before a cavity forms.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#eaedff]">
                      <Icon name="check_circle" className="text-teal-600 text-lg mt-0.5 shrink-0" />
                      <div className="text-xs text-slate-700">
                        <strong>Long-Acting Mineral Matrix:</strong> Continually releases calcium and fluoride into enamel over 90 days.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#eaedff]">
                      <Icon name="check_circle" className="text-teal-600 text-lg mt-0.5 shrink-0" />
                      <div className="text-xs text-slate-700">
                        <strong>Immediate Eating Allowed:</strong> Only soft foods recommended for the first 2 hours post-visit.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#eaedff] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Icon name="health_and_safety" className="text-teal-600 text-lg" />
                    <span>Insurance (DHA Enaya 80%): <strong>AED 480 Covered</strong></span>
                  </div>
                  <div className="text-slate-500">
                    Total Statutory Tariff: <span className="line-through">AED 600</span> → Patient Co-pay: <strong>AED 120</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alternative Upgrade Option Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Icon name="diamond" className="text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">Explore Premium Alternative: Ceramic Inlay</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    Optional Upgrade
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 max-w-xl">
                  Prefer maximum longevity? A custom CAD/CAM milled ceramic porcelain inlay offers 15+ years durability for tooth #16.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowInlayModal(!showInlayModal)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-800 border border-amber-300 hover:bg-amber-100/60 transition-colors whitespace-nowrap shadow-xs"
            >
              {showInlayModal ? 'Hide Comparison' : 'Compare Upgrade (+AED 750)'}
            </button>
          </div>

          {showInlayModal && (
            <div className="mt-4 pt-4 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-amber-200">
                <div className="font-bold text-slate-900 mb-1">Standard Direct Composite (Recommended)</div>
                <ul className="space-y-1 text-slate-600">
                  <li>• 1 single visit (45 minutes)</li>
                  <li>• 5–7 years durability</li>
                  <li>• Fully covered under 20% co-pay (AED 170)</li>
                </ul>
              </div>
              <div className="p-3 bg-amber-100/60 rounded-xl border border-amber-300">
                <div className="font-bold text-amber-950 mb-1">Ceramic Porcelain Inlay (Premium)</div>
                <ul className="space-y-1 text-amber-900">
                  <li>• 2 visits or in-house CAD/CAM milling</li>
                  <li>• 15+ years superior wear resistance</li>
                  <li>• Out-of-pocket upgrade: AED 750 + AED 170</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Financial Summary Bento Box */}
        <div className="rounded-2xl bg-[#283044] text-white p-6 shadow-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                DHA Universal Healthcare Tier
              </span>
              <h3 className="text-lg font-bold text-white">Your Treatment Financial Summary</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
              <Icon name="check_circle" className="text-sm" />
              Insurance Pre-Approval Guaranteed
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
              <div className="text-[11px] text-slate-400 font-medium">Your Total Co-Pay</div>
              <div className="text-2xl font-extrabold text-white mt-1">AED 290</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">20% Patient Share</div>
            </div>

            <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
              <div className="text-[11px] text-slate-400 font-medium">DHA Covered (80%)</div>
              <div className="text-2xl font-extrabold text-emerald-300 mt-1">AED 1,160</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Direct Billing</div>
            </div>

            <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
              <div className="text-[11px] text-slate-400 font-medium">Total Procedure Cost</div>
              <div className="text-2xl font-extrabold text-slate-300 mt-1">AED 1,450</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Statutory 2026 Tariff</div>
            </div>

            <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
              <div className="text-[11px] text-slate-400 font-medium">Flexible Payment</div>
              <div className="text-sm font-bold text-amber-300 mt-1.5">3 × AED 96.67</div>
              <div className="text-[10px] text-slate-400 mt-0.5">0% Interest EasyPay</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-white/10">
            <Icon name="info" className="text-sm text-slate-400 shrink-0" />
            <span>Estimates verified under DHA Regulatory Circular 2026/04. No unexpected facility surcharges or surprise billing.</span>
          </div>
        </div>

        {/* Have Questions Card */}
        <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#006194] flex items-center justify-center shrink-0">
              <Icon name="chat" className="text-2xl" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Have Questions Before You Decide?</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Dr. Daniel Mensah is on hand to clarify procedure steps, alternative materials, or comfort options.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/patient-decision')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors whitespace-nowrap shadow-xs"
          >
            Ask Dr. Daniel a Question
          </button>
        </div>

        {/* Sticky Proceed Action Bar */}
        <div className="sticky bottom-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-[#eaedff] p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500 font-medium">Ready to confirm your appointments?</div>
            <div className="text-sm font-bold text-slate-900">Step 13.12: Select individual procedures to accept or decline</div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/dentist-approval')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Back to Clinical View
            </button>
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/patient-decision')}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold bg-[#006194] text-white hover:bg-[#004b73] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Make Your Treatment Choices</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </div>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
