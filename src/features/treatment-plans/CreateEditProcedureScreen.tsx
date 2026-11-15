import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function CreateEditProcedureScreen() {
  const navigate = useNavigate();

  // State
  const [procTitle, setProcTitle] = useState('CAD/CAM Chairside Lithium Disilicate Inlay/Onlay');
  const [specialty, setSpecialty] = useState('Restorative & Prosthodontic');
  const [cdtCode, setCdtCode] = useState('D2610');
  const [uccCode, setUccCode] = useState('DHA-PROSTH-CAD1');
  const [clinicalScope, setClinicalScope] = useState(
    'High-strength milled monolithic ceramic restoration designed to preserve cusp architecture and resist heavy occlusal wear.'
  );
  const [chairtimeMinutes, setChairtimeMinutes] = useState(90);
  const [clinicFee, setClinicFee] = useState('2200.00');
  const [operatorLicense, setOperatorLicense] = useState(
    'Licensed General Dentist (#DEN) or Prosthodontist'
  );
  const [branchWuse, setBranchWuse] = useState(true);
  const [branchJumeirah, setBranchJumeirah] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [showDeactivationWarning, setShowDeactivationWarning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleStatus = () => {
    if (isActive) {
      // Trigger statutory dependency safeguard
      setShowDeactivationWarning(true);
    } else {
      setIsActive(true);
      setShowDeactivationWarning(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      showToast('Procedure catalog entry updated and synchronized with DHA Unified Registry.');
      setTimeout(() => {
        setSaveSuccess(false);
        navigate('/treatment-plans/procedure-catalogue');
      }, 1200);
    }, 800);
  };

  return (
    <TreatmentPlanShell
      pageTitle="Create/Edit Procedure"
      badgeCode="13.28"
      badgeLabel="Catalogue Editor"
      currentStep="Step 28 of 30"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[20px] text-[#6bd8cb]" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Immutability Warning Banner */}
        <div className="bg-[#ffdad6]/60 rounded-2xl p-4 sm:p-5 border border-[#ffdad6] shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#ffdad6] flex items-center justify-center shrink-0 mt-0.5 text-[#ba1a1a]">
              <Icon name="gavel" className="text-[20px]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                <span className="text-sm font-bold text-[#93000a]">
                  Statutory Non-Retroactivity Rule (DHA Standard)
                </span>
                <span className="bg-white/80 text-[#93000a] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  DHA Standard
                </span>
              </div>
              <p className="text-xs text-[#3f4850] leading-relaxed">
                Updating procedure descriptions, chairtime, or tariff schedules applies strictly prospectively to future treatment plans. Historical treatment records and signed patient quotations preserve the exact terms that applied when executed.
              </p>
            </div>
          </div>
        </div>

        {/* Responsive Grid Form: 2 Columns on Desktop */}
        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols): Identification & Operatory Logistics */}
          <div className="lg:col-span-7 space-y-6">
            {/* SECTION 1: Identification & Clinical Classification */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#cce5ff]/50 flex items-center justify-center text-[#006194]">
                    <Icon name="clinical_notes" className="text-[18px]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#131b2e]">
                      1. Identification & Classification
                    </h2>
                    <p className="text-xs text-[#707881]">Core taxonomy & DHA standard mapping</p>
                  </div>
                </div>
                <span className="text-[11px] uppercase font-bold tracking-wider bg-[#86f2e4]/30 text-[#006f66] px-2.5 py-0.5 rounded-full">
                  Verified UCC
                </span>
              </div>

              {/* Procedure Title */}
              <div className="space-y-1">
                <label htmlFor="procTitle" className="text-xs font-bold text-[#131b2e]">
                  Procedure Official Title
                </label>
                <input
                  id="procTitle"
                  type="text"
                  value={procTitle}
                  onChange={(e) => setProcTitle(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#faf8ff] text-[#131b2e] rounded-xl border border-[#bfc7d2] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006194]"
                />
                <span className="text-[11px] text-[#707881] block">
                  Standardized restorative naming format under DHA-MOH taxonomy
                </span>
              </div>

              {/* Specialty Category */}
              <div className="space-y-1">
                <label htmlFor="specialtyCat" className="text-xs font-bold text-[#131b2e]">
                  Specialty Category
                </label>
                <select
                  id="specialtyCat"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#faf8ff] text-[#131b2e] rounded-xl border border-[#bfc7d2] text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]"
                >
                  <option>Restorative & Prosthodontic</option>
                  <option>Periodontics & Preventive</option>
                  <option>Endodontics</option>
                  <option>Oral & Maxillofacial Surgery</option>
                  <option>Orthodontics & Dentofacial</option>
                </select>
              </div>

              {/* Regulatory Code Mapping Badges */}
              <div className="bg-[#f2f3ff] rounded-xl p-3.5 border border-[#eaedff] space-y-2">
                <span className="text-[11px] font-bold text-[#707881] uppercase tracking-wider block">
                  Regulatory Code Alignment
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#eaedff]">
                    <Icon name="pin" className="text-[16px] text-[#006194]" />
                    <div className="flex-1">
                      <span className="text-[10px] text-[#707881] block">CDT Code</span>
                      <input
                        type="text"
                        value={cdtCode}
                        onChange={(e) => setCdtCode(e.target.value)}
                        className="font-mono text-xs font-bold text-[#006194] bg-transparent focus:outline-none w-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#eaedff]">
                    <Icon name="verified_user" className="text-[16px] text-[#006a61]" />
                    <div className="flex-1">
                      <span className="text-[10px] text-[#707881] block">UCC Reference</span>
                      <input
                        type="text"
                        value={uccCode}
                        onChange={(e) => setUccCode(e.target.value)}
                        className="font-mono text-xs font-bold text-[#006a61] bg-transparent focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinical Scope & Objective */}
              <div className="space-y-1">
                <label htmlFor="clinicalScope" className="text-xs font-bold text-[#131b2e]">
                  Clinical Scope & Objective
                </label>
                <textarea
                  id="clinicalScope"
                  rows={3}
                  value={clinicalScope}
                  onChange={(e) => setClinicalScope(e.target.value)}
                  className="w-full p-3.5 bg-[#faf8ff] text-[#131b2e] rounded-xl border border-[#bfc7d2] text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#006194] resize-none"
                />
                <span className="text-[11px] text-[#707881]">
                  Mandatory documentation criteria under UAE medical records charter.
                </span>
              </div>
            </div>

            {/* SECTION 2: Clinical Execution & Operatory Logistics */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#eaedff]">
                <div className="w-8 h-8 rounded-lg bg-[#cce5ff]/50 flex items-center justify-center text-[#006194]">
                  <Icon name="chair" className="text-[18px]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#131b2e]">2. Operatory Logistics</h2>
                  <p className="text-xs text-[#707881]">Chair allocation, setup, and staffing</p>
                </div>
              </div>

              {/* Default Chairtime Stepper */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  Standard Chairtime Commitment
                </label>
                <div className="flex items-center justify-between bg-[#f2f3ff] rounded-xl p-2 border border-[#eaedff]">
                  <button
                    type="button"
                    onClick={() => setChairtimeMinutes(Math.max(15, chairtimeMinutes - 15))}
                    className="w-10 h-10 rounded-lg bg-white text-[#131b2e] flex items-center justify-center shadow-xs active:scale-95 transition-transform"
                    aria-label="Decrease chairtime"
                  >
                    <Icon name="remove" className="text-[20px]" />
                  </button>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#006194]">{chairtimeMinutes}</span>
                    <span className="text-xs font-medium text-[#707881]">Minutes</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setChairtimeMinutes(Math.min(360, chairtimeMinutes + 15))}
                    className="w-10 h-10 rounded-lg bg-white text-[#131b2e] flex items-center justify-center shadow-xs active:scale-95 transition-transform"
                    aria-label="Increase chairtime"
                  >
                    <Icon name="add" className="text-[20px]" />
                  </button>
                </div>
                <span className="text-[11px] text-[#707881]">
                  Applies block reservation default to operatory schedule
                </span>
              </div>

              {/* Required Clinical Instrumentation */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#131b2e]">
                  Required Clinical Instrumentation
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                    <div className="flex items-center gap-2.5">
                      <Icon name="medical_services" className="text-[#006a61] text-[20px]" />
                      <span className="text-xs font-medium text-[#131b2e]">
                        Rubber Dam Isolation Kit #4
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#006a61] bg-white px-2 py-0.5 rounded-md border border-[#eaedff]">
                      Sterilized
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                    <div className="flex items-center gap-2.5">
                      <Icon name="screenshot_monitor" className="text-[#006194] text-[20px]" />
                      <span className="text-xs font-medium text-[#131b2e]">
                        Intraoral 3D Scanner (HD Cart)
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#006194] bg-white px-2 py-0.5 rounded-md border border-[#eaedff]">
                      Calibrated
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                    <div className="flex items-center gap-2.5">
                      <Icon name="precision_manufacturing" className="text-[#3f4850] text-[20px]" />
                      <span className="text-xs font-medium text-[#131b2e]">
                        Chairside Milling Unit (Block Ready)
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#3f4850] bg-white px-2 py-0.5 rounded-md border border-[#eaedff]">
                      Pre-warmed
                    </span>
                  </div>
                </div>
              </div>

              {/* Minimum Operator License */}
              <div className="space-y-1">
                <label htmlFor="operatorLicense" className="text-xs font-bold text-[#131b2e]">
                  Minimum Operator License Level
                </label>
                <select
                  id="operatorLicense"
                  value={operatorLicense}
                  onChange={(e) => setOperatorLicense(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#faf8ff] text-[#131b2e] rounded-xl border border-[#bfc7d2] text-xs focus:outline-none focus:ring-2 focus:ring-[#006194]"
                >
                  <option>Licensed General Dentist (#DEN) or Prosthodontist</option>
                  <option>Board Certified Prosthodontist Only</option>
                  <option>Restorative Specialist</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Tariffs, Practice Deployment, Attestation & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* SECTION 3: Tariff & Insurance Tiering */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#eaedff]">
                <div className="w-8 h-8 rounded-lg bg-[#cce5ff]/50 flex items-center justify-center text-[#006194]">
                  <Icon name="payments" className="text-[18px]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#131b2e]">
                    3. Tariff & Insurance Tiering
                  </h2>
                  <p className="text-xs text-[#707881]">Billing governance & fiscal classification</p>
                </div>
              </div>

              {/* Standard Clinic Fee */}
              <div className="space-y-1">
                <label htmlFor="clinicFee" className="text-xs font-bold text-[#131b2e]">
                  Harmony Clinic Base Tariff
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sm font-bold text-[#006194]">
                    AED
                  </div>
                  <input
                    id="clinicFee"
                    type="number"
                    step="10"
                    value={clinicFee}
                    onChange={(e) => setClinicFee(e.target.value)}
                    className="w-full h-11 pl-14 pr-3.5 bg-[#faf8ff] text-[#131b2e] font-bold text-base rounded-xl border border-[#bfc7d2] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                </div>
                <span className="text-[11px] text-[#707881]">
                  Gross reference rate before insurance copay calculation
                </span>
              </div>

              {/* Insurance Copay Tier Card */}
              <div className="bg-[#f2f3ff] rounded-xl p-3.5 border border-[#eaedff] flex items-start gap-3">
                <Icon name="health_and_safety" className="text-[#006a61] text-[22px] mt-0.5 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-[#131b2e] block">
                    Tier 2 Coverage Specification
                  </span>
                  <p className="text-[#3f4850] mt-0.5 leading-relaxed">
                    Specialized Indirect Care • Standard 20–30% Patient Copay schedule under regional network contracts.
                  </p>
                </div>
              </div>

              {/* Tax Exemption Status Banner */}
              <div className="bg-[#faf8ff] rounded-xl p-3.5 border border-[#eaedff] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Icon name="account_balance" className="text-[#006194] text-[20px]" />
                  <div>
                    <span className="text-xs font-bold text-[#131b2e] block">UAE VAT Zero-Rated</span>
                    <span className="text-[11px] text-[#707881]">Statutory qualified medical care exemption</span>
                  </div>
                </div>
                <span className="bg-[#cce5ff]/50 text-[#004b73] px-2.5 py-1 rounded-full font-mono text-xs font-bold">
                  0% VAT
                </span>
              </div>
            </div>

            {/* SECTION 4: Practice Deployment & Status */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#eaedff]">
                <div className="w-8 h-8 rounded-lg bg-[#cce5ff]/50 flex items-center justify-center text-[#006194]">
                  <Icon name="domain" className="text-[18px]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#131b2e]">
                    4. Practice Deployment & Status
                  </h2>
                  <p className="text-xs text-[#707881]">Multi-branch catalog assignments</p>
                </div>
              </div>

              {/* Branch Availability */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#131b2e]">Authorized Facility Branches</label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl border border-[#eaedff] cursor-pointer hover:bg-[#eaedff] transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Icon name="location_on" className="text-[#006194] text-[18px]" />
                      <span className="text-xs font-semibold text-[#131b2e]">
                        Harmony Dental — Wuse 2
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={branchWuse}
                      onChange={(e) => setBranchWuse(e.target.checked)}
                      className="w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl border border-[#eaedff] cursor-pointer hover:bg-[#eaedff] transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Icon name="location_on" className="text-[#006194] text-[18px]" />
                      <span className="text-xs font-semibold text-[#131b2e]">
                        Harmony Dental — Jumeirah Branch
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={branchJumeirah}
                      onChange={(e) => setBranchJumeirah(e.target.checked)}
                      className="w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
                    />
                  </label>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="bg-[#f2f3ff] rounded-xl p-3.5 border border-[#eaedff] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isActive ? 'bg-[#006a61]' : 'bg-[#ba1a1a]'
                    }`}
                  ></div>
                  <div>
                    <span className="text-xs font-bold text-[#131b2e] block">
                      Procedure Status: {isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-[11px] text-[#707881]">
                      Available for patient charting and quotation
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleStatus}
                  className={`w-12 h-7 rounded-full relative p-0.5 transition-colors focus:outline-none ${
                    isActive ? 'bg-[#006194]' : 'bg-[#bfc7d2]'
                  }`}
                  role="switch"
                  aria-checked={isActive}
                >
                  <span
                    className={`w-6 h-6 bg-white rounded-full block shadow-md transform transition-transform ${
                      isActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  ></span>
                </button>
              </div>

              {/* Deactivation Safeguard Alert (Triggered on toggle attempt) */}
              {showDeactivationWarning && (
                <div className="bg-[#ffdad6]/80 rounded-xl p-4 border border-[#ffdad6] space-y-2">
                  <div className="flex items-start gap-2.5">
                    <Icon name="warning" className="text-[#ba1a1a] text-[20px] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-[#93000a] block">
                        Deactivation Blocked by Clinical Dependency
                      </span>
                      <p className="text-xs text-[#93000a]/90 mt-1 leading-relaxed">
                        Cannot deactivate or delete; <strong>8 active treatment plans</strong> currently utilize this procedure code. Conclude or reassign those courses before withdrawal.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setShowDeactivationWarning(false)}
                      className="px-3 py-1 bg-white text-[#131b2e] rounded-lg text-xs font-bold shadow-xs hover:bg-[#f2f3ff]"
                    >
                      Understood
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Attestation Signature Card */}
            <div className="bg-[#f2f3ff] rounded-2xl p-4 border border-[#eaedff] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#006194] shadow-xs shrink-0">
                <Icon name="verified" className="text-[20px]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider block">
                  Clinical Attestation Authority
                </span>
                <p className="text-xs font-bold text-[#131b2e] truncate">
                  Dr. Daniel James (DDS, #DEN-48912)
                </p>
                <span className="text-[11px] text-[#707881] block truncate">
                  Harmony Dental Clinical Director
                </span>
              </div>
            </div>

            {/* Actions Area */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="w-full h-12 bg-[#006194] hover:bg-[#004b73] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                {isSaving ? (
                  <>
                    <Icon name="refresh" className="text-[20px] animate-spin" />
                    <span>Synchronizing Registry...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <Icon name="check_circle" className="text-[20px] text-[#86f2e4]" />
                    <span>Procedure Registered</span>
                  </>
                ) : (
                  <>
                    <Icon name="save" className="text-[20px]" />
                    <span>Save Clinic Procedure</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  showToast('Procedure saved to draft template library.');
                  navigate('/treatment-plans/template-library');
                }}
                className="w-full h-11 bg-white hover:bg-[#f2f3ff] text-[#006194] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#eaedff]"
              >
                <Icon name="post_add" className="text-[18px]" />
                <span>Save & Add to Treatment Template</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/treatment-plans/procedure-catalogue')}
                className="w-full py-2 text-xs text-[#707881] hover:text-[#131b2e] font-semibold text-center transition-colors"
              >
                Cancel without saving
              </button>
            </div>
          </div>
        </form>
      </div>
    </TreatmentPlanShell>
  );
}
