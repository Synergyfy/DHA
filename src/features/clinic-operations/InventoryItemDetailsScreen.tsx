import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const InventoryItemDetailsScreen: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [onHandQty, setOnHandQty] = useState(3);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);
  const [restockUnits, setRestockUnits] = useState('10');
  const [usagePatient, setUsagePatient] = useState('Amara Okafor');
  const [usageOperatory, setUsageOperatory] = useState('Suite 01');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(restockUnits, 10) || 0;
    setOnHandQty((prev) => prev + qty);
    setIsRestockModalOpen(false);
    showToast(`Received restock of ${qty} units. Physical stock updated.`);
  };

  const handleUsageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onHandQty <= 0) {
      showToast('Error: No units on hand to dispense!');
      return;
    }
    setOnHandQty((prev) => Math.max(0, prev - 1));
    setIsUsageModalOpen(false);
    showToast(`1 syringe dispensed to ${usageOperatory} for patient ${usagePatient}.`);
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] text-[#faf8ff] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-[#86f2e4] text-lg" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <Icon name="close" className="text-sm" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#dae2fd]/40">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full text-[#131b2e] hover:bg-[#e2e7ff] active:bg-[#dae2fd] transition-colors"
              aria-label="Back"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#006194]">Item Telemetry</span>
                <span className="text-xs text-[#707881]">•</span>
                <span className="font-mono text-xs text-[#3f4850]">#SKU-RES-3M-FL2</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Inventory Item Details
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/clinic-operations/add-inventory-item')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="edit" className="text-[16px]" />
              <span>Edit Item</span>
            </button>
            <button
              onClick={() => showToast('Printing barcode tags for SKU-RES-3M-FL2...')}
              className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#006194] transition-colors"
            >
              <Icon name="print" className="text-[18px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Location & Category Strip */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#707881]">
            <Icon name="domain" className="text-[16px] text-[#006194]" />
            <span className="font-medium text-[#131b2e]">Wuse 2 Main Branch</span>
            <span>•</span>
            <span className="font-mono">Cabinet R-03, Shelf 2</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-bold self-start sm:self-auto">
            Restorative Dentistry
          </span>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Hero, Low Stock Alert, Telemetry Bento, Financials */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Item Overview Card */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#eaedff] border border-[#dae2fd]">
                  <img
                    src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"
                    alt="Composite flowable resin syringe"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 bg-white/90 backdrop-blur rounded p-1 text-[#006194]">
                    <Icon name="medication_liquid" className="text-[14px]" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-xs text-[#006194] bg-[#cce5ff] px-2 py-0.5 rounded font-semibold">
                    #SKU-RES-3M-FL2
                  </span>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-[#131b2e] truncate mt-1">
                    Composite Flowable Resin A2
                  </h2>
                  <p className="text-xs text-[#707881]">Filtek Supreme 2g Syringe • 3M ESPE</p>
                </div>
              </div>

              {/* Badges Bar */}
              <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between text-xs text-[#3f4850] border border-[#eaedff]">
                <div className="flex items-center gap-1.5 text-[#006a61] font-semibold">
                  <Icon name="verified" className="text-[16px]" />
                  <span>DHA §16.29 Bio-Tracked Asset</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/clinic-operations/add-inventory-item')}
                    className="text-[#006194] font-semibold hover:underline flex items-center gap-0.5"
                  >
                    <Icon name="edit" className="text-[14px]" /> Edit
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => showToast('Label sent to thermal printer')}
                    className="text-[#707881] font-semibold hover:text-[#131b2e] flex items-center gap-0.5"
                  >
                    <Icon name="print" className="text-[14px]" /> Label
                  </button>
                </div>
              </div>
            </div>

            {/* Amber Low Stock Alert Banner */}
            <div className="bg-[#ffdad6]/40 rounded-2xl p-4 flex items-center justify-between gap-4 border border-[#ba1a1a]/20 shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#ffdad6] flex items-center justify-center shrink-0 text-[#ba1a1a]">
                  <Icon name="warning" className="text-[20px]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs uppercase font-bold text-[#93000a] tracking-wider">Low Stock Alert</span>
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping" />
                  </div>
                  <p className="text-xs text-[#93000a]/90 truncate">
                    {onHandQty} on hand (Min: 5 units • Par: 15)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsRestockModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] flex items-center gap-1.5 shrink-0 shadow-sm transition-colors"
              >
                <Icon name="bolt" className="text-[16px]" />
                <span>Fast Reorder</span>
              </button>
            </div>

            {/* Telemetry Dashboard Bento (4 Tiles) */}
            <div className="grid grid-cols-2 gap-4">
              {/* On Hand Total */}
              <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#707881]">
                  <span>Physical On Hand</span>
                  <Icon name="inventory_2" className="text-[#006194] text-[18px]" />
                </div>
                <div className="my-3 flex items-baseline gap-1.5">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#131b2e]">
                    {onHandQty}
                  </span>
                  <span className="text-xs text-[#707881]">Syringes</span>
                </div>
                <div>
                  <div className="w-full bg-[#eaedff] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#006194] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (onHandQty / 15) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#707881] mt-1 block">
                    {Math.round((onHandQty / 15) * 100)}% of Par Level (15)
                  </span>
                </div>
              </div>

              {/* Days of Supply */}
              <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#707881]">
                  <span>Supply Buffer</span>
                  <Icon name="pace" className="text-[#006a61] text-[18px]" />
                </div>
                <div className="my-3 flex items-baseline gap-1.5">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#ba1a1a]">1.5</span>
                  <span className="text-xs text-[#707881]">Days</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#707881]">
                  <Icon name="trending_down" className="text-[14px] text-[#ba1a1a]" />
                  <span>Avg 2.1 units/day</span>
                </div>
              </div>

              {/* Reserved Today */}
              <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#707881]">
                  <span>Reserved Today</span>
                  <Icon name="calendar_clock" className="text-[#006195] text-[18px]" />
                </div>
                <div className="my-3 flex items-baseline gap-1.5">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#006195]">2</span>
                  <span className="text-xs text-[#707881]">Syringes</span>
                </div>
                <p className="text-[11px] text-[#707881] truncate">Op 01 (Amara) • Op 03</p>
              </div>

              {/* Free / Uncommitted */}
              <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#707881]">
                  <span>Uncommitted</span>
                  <Icon name="check_circle" className="text-[#006a61] text-[18px]" />
                </div>
                <div className="my-3 flex items-baseline gap-1.5">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#006a61]">
                    {Math.max(0, onHandQty - 2)}
                  </span>
                  <span className="text-xs text-[#707881]">Syringe</span>
                </div>
                <p className="text-[11px] text-[#006a61] font-semibold">Eligible for walk-ins</p>
              </div>
            </div>

            {/* Quick Action Grid (4 Buttons) */}
            <div className="bg-[#f2f3ff] rounded-2xl p-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center border border-[#eaedff]">
              <button
                type="button"
                onClick={() => setIsRestockModalOpen(true)}
                className="bg-white hover:bg-[#eaedff] p-3 rounded-xl flex flex-col items-center justify-center transition-all shadow-xs group"
              >
                <div className="w-8 h-8 rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <Icon name="add_box" className="text-[18px]" />
                </div>
                <span className="text-xs font-bold text-[#131b2e]">Receive Restock</span>
              </button>

              <button
                type="button"
                onClick={() => setIsUsageModalOpen(true)}
                className="bg-white hover:bg-[#eaedff] p-3 rounded-xl flex flex-col items-center justify-center transition-all shadow-xs group"
              >
                <div className="w-8 h-8 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <Icon name="dentistry" className="text-[18px]" />
                </div>
                <span className="text-xs font-bold text-[#131b2e]">Chairside Usage</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('Opening physical inventory cycle count...')}
                className="bg-white hover:bg-[#eaedff] p-3 rounded-xl flex flex-col items-center justify-center transition-all shadow-xs group"
              >
                <div className="w-8 h-8 rounded-full bg-[#eaedff] text-[#131b2e] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <Icon name="tune" className="text-[18px]" />
                </div>
                <span className="text-xs font-bold text-[#131b2e]">Audit Count</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('Inter-branch inventory transfer requisition opened...')}
                className="bg-white hover:bg-[#eaedff] p-3 rounded-xl flex flex-col items-center justify-center transition-all shadow-xs group"
              >
                <div className="w-8 h-8 rounded-full bg-[#cde5ff] text-[#006195] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                  <Icon name="move_up" className="text-[18px]" />
                </div>
                <span className="text-xs font-bold text-[#131b2e]">Branch Transfer</span>
              </button>
            </div>

            {/* Financial & Billing Metrics */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#006194]">
                  <Icon name="payments" className="text-[20px]" />
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">
                    Unit Economics & Valuation
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#006a61]">Margin 38.6%</span>
              </div>

              <div className="grid grid-cols-3 gap-3 bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
                <div>
                  <span className="text-[10px] text-[#707881] uppercase block">Unit Cost</span>
                  <span className="text-sm font-bold text-[#131b2e]">₦9,200</span>
                  <span className="text-[10px] text-[#707881] block mt-0.5">PO-2026-088</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#707881] uppercase block">Billable Rate</span>
                  <span className="text-sm font-bold text-[#006194]">₦15,000</span>
                  <span className="text-[10px] text-[#006a61] block mt-0.5">HMO & Private</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#707881] uppercase block">Stock Value</span>
                  <span className="text-sm font-bold text-[#131b2e]">₦{onHandQty * 9200}</span>
                  <span className="text-[10px] text-[#707881] block mt-0.5">{onHandQty} Syringes total</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Batches, Inbound Deliveries, Audit Log */}
          <div className="lg:col-span-5 space-y-6">
            {/* Batches & In-Flight Deliveries */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">
                  Active Batches & Inbound Orders
                </h3>
                <span className="text-xs font-mono text-[#006194]">1 Active • 1 Inbound</span>
              </div>

              <div className="space-y-3">
                {/* Active Lot Card */}
                <div className="bg-[#f2f3ff] rounded-xl p-3.5 border border-[#eaedff] space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#86f2e4]/40 text-[#006f66] flex items-center justify-center shrink-0">
                        <Icon name="verified_user" className="text-[18px]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#131b2e]">Lot #LOT-3M-8812</span>
                          <span className="bg-[#86f2e4]/40 text-[#006f66] text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                            In Use
                          </span>
                        </div>
                        <p className="text-[11px] text-[#707881]">Qty: 3 Units • Opened 18 Oct 2026</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#dae2fd]/60 text-xs text-[#707881]">
                    <span>Expiry: 14 Oct 2027</span>
                    <span className="font-semibold text-[#006a61]">358 Days Remaining</span>
                  </div>
                </div>

                {/* Inbound PO Card */}
                <div className="bg-[#cce5ff]/30 rounded-xl p-3.5 border border-[#006194]/20 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0">
                        <Icon name="local_shipping" className="text-[18px]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#131b2e]">PO-2026-104</span>
                          <span className="bg-[#cce5ff] text-[#001d31] text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                            Dispatched
                          </span>
                        </div>
                        <p className="text-[11px] text-[#707881]">10 units • Dental Supplies West Africa</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#006194]">₦92,000</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#006194]/20 text-xs">
                    <span className="text-[#006194] font-semibold flex items-center gap-1">
                      <Icon name="schedule" className="text-[14px]" />
                      ETA: Today 15:30
                    </span>
                    <button
                      type="button"
                      onClick={() => showToast('Dispatch delivery vehicle tracking link opened')}
                      className="text-xs text-[#006194] underline font-semibold"
                    >
                      Track Driver
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Movement & Dispensing Audit Timeline */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#006194]">
                  <Icon name="history" className="text-[20px]" />
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">
                    Dispensing & Movement Log
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Opening complete dispensing ledger...')}
                  className="text-xs font-semibold text-[#006194] hover:underline"
                >
                  View Complete
                </button>
              </div>

              {/* Timeline Items */}
              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#eaedff]">
                {/* Log 1 */}
                <div className="relative space-y-1">
                  <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#006a61] ring-4 ring-white" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#131b2e]">1 Syringe Dispensed (Chairside)</span>
                    <span className="font-mono text-xs text-[#707881]">Today, 09:25 AM</span>
                  </div>
                  <p className="text-xs text-[#707881]">
                    Operatory Suite 01 • <span className="font-medium text-[#131b2e]">Dr. Daniel Okoro</span>
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 bg-[#f2f3ff] px-2 py-1 rounded-lg text-xs text-[#3f4850]">
                    <Icon name="person" className="text-[13px] text-[#006194]" />
                    <span>Amara Okafor (Class II MO Composite)</span>
                  </div>
                </div>

                {/* Log 2 */}
                <div className="relative space-y-1">
                  <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#006a61]/70 ring-4 ring-white" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#131b2e]">1 Syringe Dispensed</span>
                    <span className="font-mono text-xs text-[#707881]">Yesterday, 16:40 PM</span>
                  </div>
                  <p className="text-xs text-[#707881]">
                    Operatory Suite 02 • <span className="font-medium text-[#131b2e]">Dr. Aisha Bello</span>
                  </p>
                </div>

                {/* Log 3 */}
                <div className="relative space-y-1">
                  <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#006194] ring-4 ring-white" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#131b2e]">+5 Syringes Received</span>
                    <span className="font-mono text-xs text-[#707881]">18 Oct 2026</span>
                  </div>
                  <p className="text-xs text-[#707881]">Delivery GRN #REC-5510 • Verified by Lead Nurse Grace</p>
                </div>
              </div>
            </div>

            {/* Regulatory Statement */}
            <div className="p-4 rounded-xl bg-[#eaedff]/60 border border-[#dae2fd] flex items-start gap-3">
              <Icon name="policy" className="text-[20px] text-[#006194] shrink-0 mt-0.5" />
              <div className="text-xs text-[#3f4850] space-y-1">
                <span className="font-bold text-[#131b2e] block">DHA Regulatory Compliance Statement</span>
                <p className="leading-relaxed">
                  All restorative and biomaterial supplies are tracked under DHA Regulatory Code §16.29. Each unit
                  dispensed carries batch serialization linked to patient encounters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Restock Modal */}
      {isRestockModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
              Fast Reorder Stock
            </h3>
            <p className="text-xs text-[#707881]">
              Order replacement syringes from Dental Supplies West Africa Ltd (48hr courier).
            </p>
            <form onSubmit={handleRestockSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Quantity (Syringes)</label>
                <div className="grid grid-cols-4 gap-2">
                  {['5', '10', '15', '20'].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setRestockUnits(qty)}
                      className={`py-2 rounded-xl text-xs font-semibold border ${
                        restockUnits === qty
                          ? 'bg-[#006194] text-white border-[#006194]'
                          : 'bg-[#f2f3ff] text-[#131b2e] border-[#dae2fd]'
                      }`}
                    >
                      {qty} units
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-[#f2f3ff] p-3 rounded-xl text-xs space-y-1 text-[#3f4850]">
                <div className="flex justify-between">
                  <span>Supplier:</span>
                  <span className="font-bold text-[#131b2e]">Dental Supplies West Africa</span>
                </div>
                <div className="flex justify-between">
                  <span>Unit Rate:</span>
                  <span>₦9,200.00</span>
                </div>
                <div className="flex justify-between font-bold text-[#006194] pt-1 border-t border-[#dae2fd]/60">
                  <span>Total Estimated Cost:</span>
                  <span>₦{(parseInt(restockUnits, 10) || 0) * 9200}</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRestockModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#006194] hover:bg-[#007bb9] shadow-sm flex items-center gap-1.5"
                >
                  <Icon name="local_shipping" className="text-[16px]" />
                  <span>Dispatch PO</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chairside Usage Modal */}
      {isUsageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
              Record Chairside Usage
            </h3>
            <p className="text-xs text-[#707881]">
              Log dispensing of 1 syringe to patient EHR encounter under DHA §16.29.
            </p>
            <form onSubmit={handleUsageSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Patient Name</label>
                <input
                  type="text"
                  value={usagePatient}
                  onChange={(e) => setUsagePatient(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Operatory Suite</label>
                <select
                  value={usageOperatory}
                  onChange={(e) => setUsageOperatory(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                >
                  <option value="Suite 01">Operatory Suite 01 (Dr. Daniel Okoro)</option>
                  <option value="Suite 02">Operatory Suite 02 (Dr. Aisha Bello)</option>
                  <option value="Suite 03">Operatory Suite 03 (Surgical Bay)</option>
                  <option value="Hygiene Bay 01">Hygiene Bay 01</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUsageModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#006a61] hover:bg-[#005049] shadow-sm flex items-center gap-1.5"
                >
                  <Icon name="check" className="text-[16px]" />
                  <span>Log Dispense (-1)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
