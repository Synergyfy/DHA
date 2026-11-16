import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface InventoryItem {
  id: string;
  name: string;
  dept: string;
  specs: string;
  status: 'Optimal' | 'Low Stock' | 'Out of Stock' | 'Expiring';
  statusClass: string;
  inStock: number;
  unit: string;
  minThreshold: number;
  expDate: string;
  price: string;
  location: string;
}

export const SuppliesInventoryOverviewScreen: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isConsolidated, setIsConsolidated] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const inventoryItems: InventoryItem[] = [
    {
      id: 'SKU-RES-3M-Z350',
      name: 'Filtek Z350 XT Universal Restorative',
      dept: 'Restorative',
      specs: 'Body A2 • 4g Syringe',
      status: 'Optimal',
      statusClass: 'bg-[#86f2e4]/30 text-[#006f66]',
      inStock: 18,
      unit: 'units',
      minThreshold: 5,
      expDate: 'Dec 2027',
      price: '₦18,500/unit',
      location: 'Cabinet R-01',
    },
    {
      id: 'SKU-ANE-SEP-27G',
      name: 'Septoject Dental Needles 27G',
      dept: 'Anesthetics',
      specs: 'Septodont • Long 35mm',
      status: 'Optimal',
      statusClass: 'bg-[#86f2e4]/30 text-[#006f66]',
      inStock: 8,
      unit: 'boxes (800)',
      minThreshold: 3,
      expDate: 'Aug 2028',
      price: '₦8,400/box',
      location: 'Cabinet A-02',
    },
    {
      id: 'SKU-IPC-CAV-05L',
      name: 'CaviCide Surface Disinfectant',
      dept: 'IPC & Hygiene',
      specs: '5L Bulk Refill Canister',
      status: 'Low Stock',
      statusClass: 'bg-[#ffdad6] text-[#ba1a1a]',
      inStock: 2,
      unit: 'cans',
      minThreshold: 4,
      expDate: 'Jan 2028',
      price: '₦32,000/can',
      location: 'Sterile Bay Refill',
    },
    {
      id: 'SKU-DIS-GLV-MED',
      name: 'Microflex Diamond Grip Latex',
      dept: 'Disposables',
      specs: 'Size Medium • 100/box',
      status: 'Optimal',
      statusClass: 'bg-[#86f2e4]/30 text-[#006f66]',
      inStock: 24,
      unit: 'boxes',
      minThreshold: 10,
      expDate: 'May 2029',
      price: '₦6,500/box',
      location: 'Central Store Rm 2',
    },
    {
      id: 'SKU-RES-RLX-LUT',
      name: '3M RelyX Luting Plus Cement',
      dept: 'Restorative',
      specs: 'Resin Modified Glass Ionomer Kit',
      status: 'Optimal',
      statusClass: 'bg-[#86f2e4]/30 text-[#006f66]',
      inStock: 5,
      unit: 'kits',
      minThreshold: 2,
      expDate: 'Feb 2027',
      price: '₦42,000/kit',
      location: 'Cabinet B-4',
    },
    {
      id: 'SKU-RES-3M-FL2',
      name: 'Composite Flowable Resin A2',
      dept: 'Restorative',
      specs: 'Filtek Supreme • 2g Syringe pack',
      status: 'Low Stock',
      statusClass: 'bg-[#ffdad6] text-[#ba1a1a]',
      inStock: 3,
      unit: 'packs',
      minThreshold: 5,
      expDate: 'Oct 2027',
      price: '₦15,000/pack',
      location: 'Cabinet R-03, Sh. 2',
    },
  ];

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.dept.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-28">
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
                <span className="text-xs uppercase tracking-wider font-semibold text-[#006194]">Dispensary Supply</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Supplies & Inventory Overview
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/clinic-operations/add-inventory-item')}
              className="px-3.5 py-1.5 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Icon name="add_box" className="text-[16px]" />
              <span>Add Item</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Top Scope & Location Strip */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194]">
              <Icon name="inventory" className="text-[22px]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#707881] block">Facility Scope</span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Wuse 2 Main Branch Dispensary
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsConsolidated(!isConsolidated);
              showToast(isConsolidated ? 'Viewing Wuse 2 local stock' : 'Consolidated Group Inventory Active');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
              isConsolidated
                ? 'bg-[#006194] text-white border-[#006194]'
                : 'bg-[#f2f3ff] text-[#3f4850] border-[#dae2fd] hover:text-[#131b2e]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${isConsolidated ? 'bg-[#86f2e4] animate-pulse' : 'bg-[#006a61]'}`}
            />
            <span>{isConsolidated ? 'Consolidated Group View' : 'Single Branch'}</span>
            <Icon name="sync_alt" className="text-[16px]" />
          </button>
        </div>

        {/* Telemetry 2x2 / 4-Col Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total SKUs */}
          <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#707881]">Total SKUs</span>
              <Icon name="category" className="text-[#006194] text-[18px]" />
            </div>
            <div className="mt-3">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">148</span>
              <p className="text-xs text-[#006194] font-medium mt-0.5">4 Active Dental Depts</p>
            </div>
          </div>

          {/* Low Stock */}
          <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#707881]">Low Stock</span>
              <Icon name="warning" className="text-[#ba1a1a] text-[18px]" />
            </div>
            <div className="mt-3">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#ba1a1a]">4</span>
              <p className="text-xs text-[#ba1a1a] font-medium mt-0.5">Reorder needed</p>
            </div>
          </div>

          {/* Out of Stock */}
          <div className="bg-[#ffdad6]/40 rounded-2xl border border-[#ba1a1a]/20 p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#93000a]">Out of Stock</span>
              <Icon name="error_outline" className="text-[#ba1a1a] text-[18px]" />
            </div>
            <div className="mt-3">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#ba1a1a]">1</span>
              <p className="text-xs text-[#93000a] font-medium mt-0.5">Supplier ETA: Today</p>
            </div>
          </div>

          {/* Expiring Soon */}
          <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#707881]">Expiring Soon</span>
              <Icon name="event_busy" className="text-[#006195] text-[18px]" />
            </div>
            <div className="mt-3">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">3</span>
              <p className="text-xs text-[#006195] font-medium mt-0.5">&lt;45 Days remaining</p>
            </div>
          </div>
        </div>

        {/* Search & Barcode Scan Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center h-12 px-4 rounded-xl bg-white border border-[#dae2fd] shadow-sm gap-3 focus-within:ring-2 focus-within:ring-[#006194]">
            <Icon name="search" className="text-[#707881] text-[20px]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, SKU, 3M, Septodont..."
              className="w-full bg-transparent border-0 outline-none text-xs text-[#131b2e] placeholder:text-[#707881]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-[#707881] hover:text-[#131b2e]">
                <Icon name="close" className="text-[16px]" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => showToast('Optical camera barcode scanner primed...')}
            aria-label="Scan barcode"
            className="h-12 w-12 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0 hover:bg-[#93ccff] active:scale-95 transition-all shadow-sm"
          >
            <Icon name="qr_code_scanner" className="text-[22px]" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['All', 'Restorative', 'IPC & Hygiene', 'Anesthetics', 'Disposables'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-white text-[#3f4850] border border-[#dae2fd] hover:bg-[#f2f3ff]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Directory Table/Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Supply Inventory Catalog
              </h2>
              <span className="font-mono text-xs text-[#707881]">
                {filteredItems.length} of {inventoryItems.length} items
              </span>
            </div>

            <div className="space-y-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate('/clinic-operations/inventory-item-details')}
                  className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm hover:border-[#006194]/50 cursor-pointer transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e] truncate">
                          {item.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.statusClass}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#707881] mt-0.5">
                        <span className="font-semibold text-[#006194]">{item.dept}</span>
                        <span>•</span>
                        <span>{item.specs}</span>
                      </div>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#131b2e] shrink-0">
                      {item.price}
                    </span>
                  </div>

                  <div className="bg-[#f2f3ff] rounded-xl p-2.5 flex items-center justify-between text-xs text-[#3f4850] border border-[#eaedff]">
                    <div className="flex items-center gap-4">
                      <span>
                        In Stock: <strong className="text-[#131b2e]">{item.inStock} {item.unit}</strong>
                      </span>
                      <span>
                        Exp: <strong className="text-[#707881]">{item.expDate}</strong>
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#707881]">{item.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Critical Stock Attention & Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Critical Attention Panel */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#ba1a1a]">
                  <Icon name="priority_high" className="text-[20px]" />
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold uppercase tracking-wider text-[#131b2e]">
                    Critical Stock Attention
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#ba1a1a] font-bold">3 Flagged</span>
              </div>

              {/* Item 1 */}
              <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-[#131b2e] truncate">Composite Flowable Resin A2</p>
                    <span className="text-[11px] text-[#707881]">Filtek Supreme 2g syringe</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast('Purchase order dispatched for 10 packs Flowable Resin A2');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#006194] text-white text-[11px] font-semibold hover:bg-[#007bb9]"
                  >
                    Reorder
                  </button>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#ba1a1a] font-semibold">3 on hand (Min: 5)</span>
                  <span className="font-mono text-[10px] text-[#707881]">SKU: RES-FLW-02</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3.5 rounded-xl bg-[#ffdad6]/40 border border-[#ba1a1a]/20 space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xs text-[#93000a] truncate">Septocaine 4% Articaine</p>
                    <span className="px-1.5 py-0.5 rounded bg-[#ba1a1a] text-white text-[10px] font-bold uppercase">
                      0 Left
                    </span>
                  </div>
                  <span className="text-[11px] text-[#93000a]/80">1:100k Epinephrine • 50 Cartridges</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#93000a] font-semibold">
                  <span className="flex items-center gap-1">
                    <Icon name="schedule" className="text-[14px]" />
                    Supplier ETA: Today 14:30
                  </span>
                  <span className="text-[10px] text-[#707881]">Septodont</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xs text-[#131b2e] truncate">Spore-Check Biological Indicator</p>
                    <span className="px-1.5 py-0.5 rounded bg-[#cde5ff] text-[#001d32] text-[10px] font-bold uppercase">
                      Expiring
                    </span>
                  </div>
                  <span className="text-[11px] text-[#707881]">Autoclave Vials (6 remaining)</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#006195] font-semibold">
                  <span>Expires: 15 Nov 2026</span>
                  <span className="font-mono text-[10px] text-[#707881]">Lot #SC-8921</span>
                </div>
              </div>
            </div>

            {/* Quick Batch Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => showToast('Exporting valuation spreadsheet & PDF...')}
                className="p-3 rounded-xl bg-white border border-[#dae2fd] text-xs font-semibold text-[#131b2e] hover:bg-[#f2f3ff] flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Icon name="picture_as_pdf" className="text-[16px] text-[#006194]" />
                <span>Export Valuation</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Generating monthly consumption audit...')}
                className="p-3 rounded-xl bg-white border border-[#dae2fd] text-xs font-semibold text-[#131b2e] hover:bg-[#f2f3ff] flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Icon name="fact_check" className="text-[16px] text-[#006a61]" />
                <span>Usage Audit</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
