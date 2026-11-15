import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const CreateCustomRoleScreen: React.FC = () => {
  const navigate = useNavigate();
  const [roleTitle, setRoleTitle] = useState('Inventory & Consumables Officer');
  const [roleCategory, setRoleCategory] = useState('admin_ops');
  const [roleDesc, setRoleDesc] = useState(
    'Oversees dental restorative consumables, autoclave biological indicators, biocide stocks, and vendor deliveries across Wuse 2 and Maitama.'
  );
  const [branchScope, setBranchScope] = useState<'multi' | 'wuse2' | 'maitama'>('multi');

  // Accordions
  const [accordionA, setAccordionA] = useState(true);
  const [accordionB, setAccordionB] = useState(true);

  // Checkboxes
  const [permA1, setPermA1] = useState(true);
  const [permA2, setPermA2] = useState(true);
  const [permA3, setPermA3] = useState(true);
  const [permA4, setPermA4] = useState(true);

  const [permB1, setPermB1] = useState(true);
  const [permB2, setPermB2] = useState(false);
  const [permB3, setPermB3] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedCount = [permA1, permA2, permA3, permA4, permB1, permB2, permB3].filter(Boolean).length;

  const toggleAllAccordions = () => {
    const newState = !(accordionA && accordionB);
    setAccordionA(newState);
    setAccordionB(newState);
  };

  const handleSave = () => {
    triggerToast(`Role "${roleTitle}" created successfully and dispatched to audit log.`);
    setTimeout(() => {
      navigate('/staff-management/roles');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Inter']">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-xs">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/staff-management/roles')}
              aria-label="Go Back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#131b2e] text-base md:text-lg truncate">
              Create Custom Role
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerToast('More role options opened')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="more_vert" className="text-xl" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#006194] flex items-center justify-center text-white ml-1">
              <Icon name="person" className="text-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Top Helper Guidance Banner */}
        <div className="bg-[#f2f3ff] rounded-2xl p-5 md:p-6 shadow-xs border border-[#dae2fd]/60 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="shield_with_heart" className="text-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
                Statutory Compliance Active
              </div>
              <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                Configure custom operational permissions within statutory healthcare boundaries. Patient clinical records remain protected under Nigerian Data Protection Regulation (NDPR).
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Basic Role Identification */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-[#eaedff]">
            <div className="w-8 h-8 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006194]">
              <Icon name="badge" className="text-base" />
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
                1. Basic Role Identification
              </h2>
              <p className="text-xs text-[#707881]">Define identity scope and facility clearance</p>
            </div>
          </div>

          {/* Role Title Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#131b2e]">
              Role Title <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Sterilization Technician"
                className="w-full h-12 px-4 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all border border-[#dae2fd]/60"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
                <Icon name="check_circle" className="text-lg text-[#006a61]" />
              </div>
            </div>
            <p className="text-[11px] text-[#707881]">Official title visible in system audit trails and logs</p>
          </div>

          {/* Role Category Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#131b2e]">
              Role Category <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative">
              <select
                value={roleCategory}
                onChange={(e) => setRoleCategory(e.target.value)}
                className="w-full h-12 px-4 pr-10 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all border border-[#dae2fd]/60"
              >
                <option value="admin_ops">Administrative & Operational</option>
                <option value="clinical_supp">Clinical Support</option>
                <option value="admin">Administrative</option>
                <option value="billing">Financial & Billing</option>
                <option value="facility">Facility Care & Biocide</option>
              </select>
              <Icon name="expand_more" className="text-lg text-[#707881] absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Role Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#131b2e]">Role Description</label>
              <span className="text-[11px] text-[#707881]">Optional audit note</span>
            </div>
            <textarea
              rows={3}
              value={roleDesc}
              onChange={(e) => setRoleDesc(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all border border-[#dae2fd]/60 resize-none leading-relaxed"
            />
          </div>

          {/* Target Branch Scope */}
          <div className="space-y-2.5 pt-1">
            <label className="block text-xs font-semibold text-[#131b2e]">
              Target Branch Scope <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="space-y-2">
              <label className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                branchScope === 'multi' ? 'bg-[#f2f3ff] border-[#006194]' : 'bg-white border-[#eaedff] hover:bg-[#f2f3ff]'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="branchScope"
                    checked={branchScope === 'multi'}
                    onChange={() => setBranchScope('multi')}
                    className="w-4 h-4 text-[#006194] accent-[#006194]"
                  />
                  <div>
                    <div className="font-semibold text-xs text-[#131b2e] flex items-center gap-2">
                      <span>Multi-Branch</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#86f2e4]/40 text-[#006a61] font-bold">
                        All Harmony Facilities
                      </span>
                    </div>
                    <div className="text-xs text-[#707881] mt-0.5">
                      Full synchronization across Wuse 2, Maitama, and satellite clinics
                    </div>
                  </div>
                </div>
                <Icon name="apartment" className="text-lg text-[#006194]" />
              </label>

              <label className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                branchScope === 'wuse2' ? 'bg-[#f2f3ff] border-[#006194]' : 'bg-white border-[#eaedff] hover:bg-[#f2f3ff]'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="branchScope"
                    checked={branchScope === 'wuse2'}
                    onChange={() => setBranchScope('wuse2')}
                    className="w-4 h-4 text-[#006194] accent-[#006194]"
                  />
                  <div>
                    <div className="font-semibold text-xs text-[#131b2e]">Wuse 2 Main Branch Only</div>
                    <div className="text-xs text-[#707881] mt-0.5">Central operative theatre & main inventory hub</div>
                  </div>
                </div>
                <Icon name="location_on" className="text-lg text-[#707881]" />
              </label>

              <label className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                branchScope === 'maitama' ? 'bg-[#f2f3ff] border-[#006194]' : 'bg-white border-[#eaedff] hover:bg-[#f2f3ff]'
              }`}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="branchScope"
                    checked={branchScope === 'maitama'}
                    onChange={() => setBranchScope('maitama')}
                    className="w-4 h-4 text-[#006194] accent-[#006194]"
                  />
                  <div>
                    <div className="font-semibold text-xs text-[#131b2e]">Maitama Specialist Outpost Only</div>
                    <div className="text-xs text-[#707881] mt-0.5">Pediatric & Orthodontic specialty outpost</div>
                  </div>
                </div>
                <Icon name="health_and_safety" className="text-lg text-[#707881]" />
              </label>
            </div>
          </div>
        </section>

        {/* Section 2: Permission Assignment */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006194]">
                <Icon name="key" className="text-base" />
              </div>
              <div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
                  2. Permission Assignment
                </h2>
                <p className="text-xs text-[#707881]">Granular modules & regulatory gates</p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleAllAccordions}
              className="text-[#006194] font-semibold text-xs hover:underline"
            >
              {accordionA && accordionB ? 'Collapse All' : 'Expand All'}
            </button>
          </div>

          {/* Accordion A */}
          <div className="rounded-xl bg-[#f2f3ff] overflow-hidden border border-[#dae2fd]/50">
            <button
              type="button"
              onClick={() => setAccordionA(!accordionA)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#eaedff] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#006194]/10 flex items-center justify-center text-[#006194] shrink-0">
                  <Icon name="inventory_2" className="text-base" />
                </div>
                <div className="min-w-0">
                  <div className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e] truncate">
                    Supplies, Equipment & Inventory
                  </div>
                  <div className="text-[11px] text-[#707881]">
                    Section 16.24 – 16.29 • <span className="text-[#006a61] font-semibold">4 Selected</span>
                  </div>
                </div>
              </div>
              <Icon
                name="expand_more"
                className={`text-lg text-[#707881] transition-transform duration-200 ${accordionA ? 'rotate-180' : ''}`}
              />
            </button>

            {accordionA && (
              <div className="p-4 pt-1 space-y-2.5">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-white cursor-pointer hover:bg-[#faf8ff] border border-[#eaedff]">
                  <input
                    type="checkbox"
                    checked={permA1}
                    onChange={(e) => setPermA1(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-[#131b2e]">View Consumables Stock Levels & Par Limits</div>
                    <p className="text-[11px] text-[#707881] mt-0.5">Access stock levels for resins, impression paste, syringes, and bur kits.</p>
                  </div>
                  <span className="text-[10px] text-[#006a61] font-bold bg-[#86f2e4]/30 px-2 py-0.5 rounded">Granted</span>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white cursor-pointer hover:bg-[#faf8ff] border border-[#eaedff]">
                  <input
                    type="checkbox"
                    checked={permA2}
                    onChange={(e) => setPermA2(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-[#131b2e]">Record Received Shipments & GRN Lots</div>
                    <p className="text-[11px] text-[#707881] mt-0.5">Scan barcoded delivery crates, verify manifests, and record expiry batch logs.</p>
                  </div>
                  <span className="text-[10px] text-[#006a61] font-bold bg-[#86f2e4]/30 px-2 py-0.5 rounded">Granted</span>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white cursor-pointer hover:bg-[#faf8ff] border border-[#eaedff]">
                  <input
                    type="checkbox"
                    checked={permA3}
                    onChange={(e) => setPermA3(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-[#131b2e]">Trigger Reorder Alerts to Practice Manager</div>
                    <p className="text-[11px] text-[#707881] mt-0.5">Notify central procurement when anesthetic carpules drop below 20% buffer.</p>
                  </div>
                  <span className="text-[10px] text-[#006a61] font-bold bg-[#86f2e4]/30 px-2 py-0.5 rounded">Granted</span>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white cursor-pointer hover:bg-[#faf8ff] border border-[#eaedff]">
                  <input
                    type="checkbox"
                    checked={permA4}
                    onChange={(e) => setPermA4(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-[#131b2e]">Schedule Equipment Service Maintenance (Section 16.26)</div>
                    <p className="text-[11px] text-[#707881] mt-0.5">Book quarterly servicing for dental chairs, suction motors, and autoclaves.</p>
                  </div>
                  <span className="text-[10px] text-[#006a61] font-bold bg-[#86f2e4]/30 px-2 py-0.5 rounded">Granted</span>
                </label>

                {/* Restricted */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 opacity-70 border border-[#eaedff]">
                  <input type="checkbox" disabled className="mt-0.5 w-4 h-4 rounded cursor-not-allowed text-[#707881]" />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-[#131b2e] flex items-center gap-1.5">
                      <span>Decommission Bio-Medical Radiology Hardware</span>
                      <Icon name="lock" className="text-xs text-[#ba1a1a]" />
                    </div>
                    <p className="text-[11px] text-[#707881] mt-0.5">Requires Level 4 Radiation Safety Officer & Medical Director executive sign-off.</p>
                  </div>
                  <span className="text-[10px] text-[#ba1a1a] font-bold bg-[#ffdad6] px-2 py-0.5 rounded">Restricted</span>
                </div>
              </div>
            )}
          </div>

          {/* Accordion B */}
          <div className="rounded-xl bg-[#f2f3ff] overflow-hidden border border-[#dae2fd]/50">
            <button
              type="button"
              onClick={() => setAccordionB(!accordionB)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#eaedff] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#86f2e4]/40 flex items-center justify-center text-[#006a61] shrink-0">
                  <Icon name="receipt_long" className="text-base" />
                </div>
                <div className="min-w-0">
                  <div className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e] truncate">
                    Billing & Procurement Verification
                  </div>
                  <div className="text-[11px] text-[#707881]">
                    Invoicing & Ledger boundaries • <span className="text-[#006a61] font-semibold">{[permB1, permB2, permB3].filter(Boolean).length} Selected</span>
                  </div>
                </div>
              </div>
              <Icon
                name="expand_more"
                className={`text-lg text-[#707881] transition-transform duration-200 ${accordionB ? 'rotate-180' : ''}`}
              />
            </button>

            {accordionB && (
              <div className="p-4 pt-1 space-y-2.5">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-white cursor-pointer hover:bg-[#faf8ff] border border-[#eaedff]">
                  <input
                    type="checkbox"
                    checked={permB1}
                    onChange={(e) => setPermB1(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-[#131b2e]">View Supplier Purchase Orders & Unit Costs</div>
                    <p className="text-[11px] text-[#707881] mt-0.5">Verify quantity against invoice rates for incoming dental laboratory shipments.</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${permB1 ? 'bg-[#86f2e4]/30 text-[#006a61]' : 'bg-[#eaedff] text-[#707881]'}`}>
                    {permB1 ? 'Granted' : 'Unchecked'}
                  </span>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white cursor-pointer hover:bg-[#faf8ff] border border-[#eaedff]">
                  <input
                    type="checkbox"
                    checked={permB2}
                    onChange={(e) => setPermB2(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-[#131b2e]">Process Patient Counter Payments</div>
                    <p className="text-[11px] text-[#707881] mt-0.5">Operate reception POS, issue paper receipts, and process debit terminal transactions.</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${permB2 ? 'bg-[#86f2e4]/30 text-[#006a61]' : 'bg-[#eaedff] text-[#707881]'}`}>
                    {permB2 ? 'Granted' : 'Unchecked'}
                  </span>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white cursor-pointer hover:bg-[#faf8ff] border border-[#eaedff]">
                  <input
                    type="checkbox"
                    checked={permB3}
                    onChange={(e) => setPermB3(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-[#131b2e]">Approve Fee Waivers or Adjustments</div>
                    <p className="text-[11px] text-[#707881] mt-0.5">Authorize patient copay discounts, pro-bono credits, or disputed billing adjustments.</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${permB3 ? 'bg-[#86f2e4]/30 text-[#006a61]' : 'bg-[#eaedff] text-[#707881]'}`}>
                    {permB3 ? 'Granted' : 'Unchecked'}
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Accordion C: Locked */}
          <div className="rounded-xl bg-[#f2f3ff]/80 overflow-hidden border border-[#dae2fd]/50">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                  <Icon name="gavel" className="text-base" />
                </div>
                <div className="min-w-0">
                  <div className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e] flex items-center gap-1.5">
                    <span>Patient & Clinical Boundaries</span>
                    <Icon name="lock" className="text-xs text-[#707881]" />
                  </div>
                  <div className="text-[11px] text-[#707881]">Statutory NDPR & Dental Council Guardrails</div>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono font-bold bg-[#eaedff] px-2 py-0.5 rounded text-[#707881]">
                Locked
              </span>
            </div>

            <div className="p-4 pt-0">
              <div className="bg-white rounded-xl p-3.5 flex items-start gap-3 border border-[#dae2fd]/50">
                <Icon name="lock" className="text-lg text-[#ba1a1a] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-semibold text-[#ba1a1a]">Clinical Masking Enforced</div>
                  <p className="text-[#3f4850] mt-0.5 leading-relaxed">
                    This operational role cannot be granted access to patient health records, diagnostic radiographs, or odontogram notes under Nigeria Data Protection Regulation (NDPR) Section 3.1.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Summary Counter */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
              Compliance & Security Index
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006a61] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-pulse"></span>
              <span>Statutory Verified</span>
            </span>
          </div>

          <div className="bg-[#f2f3ff] rounded-xl p-4 md:p-5 flex items-center justify-between flex-wrap gap-4 border border-[#dae2fd]/50">
            <div>
              <div className="flex items-center gap-2">
                <Icon name="verified_user" className="text-base text-[#006194]" />
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
                  {selectedCount} Permissions Selected • 0 Statutory Violations
                </span>
              </div>
              <div className="text-xs text-[#3f4850] mt-1">
                Level 2 Operational Access <span className="text-[#707881]">(Standard Non-Clinical)</span>
              </div>
            </div>

            <div className="w-11 h-11 rounded-full bg-[#cce5ff] text-[#006194] font-['Plus_Jakarta_Sans'] font-bold text-base flex items-center justify-center">
              L2
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center gap-2 text-xs text-[#131b2e] border border-[#dae2fd]/40">
              <Icon name="task_alt" className="text-base text-[#006a61]" />
              <span className="truncate font-medium">Branch Sync Valid</span>
            </div>
            <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center gap-2 text-xs text-[#131b2e] border border-[#dae2fd]/40">
              <Icon name="verified" className="text-base text-[#006a61]" />
              <span className="truncate font-medium">PHI Data Redacted</span>
            </div>
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="w-full h-12 bg-[#006194] hover:bg-[#007bb9] active:scale-[0.99] text-white font-['Plus_Jakarta_Sans'] text-xs md:text-sm font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Icon name="how_to_reg" className="text-lg" />
            <span>Save & Create Role</span>
          </button>

          <button
            type="button"
            onClick={() => triggerToast('Role configuration saved as draft template.')}
            className="w-full h-12 bg-white hover:bg-[#f2f3ff] active:scale-[0.99] text-[#006194] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-xl border border-[#eaedff] transition-all flex items-center justify-center gap-2"
          >
            <Icon name="save_as" className="text-lg" />
            <span>Save as Draft Template</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm('Discard changes and return to role management?')) {
                navigate('/staff-management/roles');
              }
            }}
            className="w-full h-11 text-[#707881] hover:text-[#131b2e] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Icon name="close" className="text-base" />
            <span>Cancel & Discard</span>
          </button>
        </div>
      </main>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs flex items-center gap-3 border border-white/10 animate-fade-in">
          <Icon name="check_circle" className="text-lg text-[#86f2e4]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
