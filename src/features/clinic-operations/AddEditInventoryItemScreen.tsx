import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const AddEditInventoryItemScreen: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<'add' | 'edit'>('add');

  // Form Fields
  const [itemName, setItemName] = useState('Filtek™ Supreme Ultra Universal Restorative (A2 Enamel)');
  const [brand, setBrand] = useState('3M Oral Care');
  const [category, setCategory] = useState('restorative');
  const [sku, setSku] = useState('SKU-RES-3M-A2E');
  const [desc, setDesc] = useState(
    'Nanohybrid direct composite restorative material for anterior and posterior restorations, syringe dispenser 4g.'
  );

  const [uom, setUom] = useState('Syringe (4g)');
  const [initQty, setInitQty] = useState(15);
  const [minThreshold, setMinThreshold] = useState(5);
  const [maxPar, setMaxPar] = useState(25);
  const [storageBin, setStorageBin] = useState('Sterile Dispensary Bay • Cabinet R-03, Shelf 2');

  const [costPrice, setCostPrice] = useState('14,500.00');
  const [retailCharge, setRetailCharge] = useState('18,500.00');
  const [vendor, setVendor] = useState('vend-201');
  const [lotNumber, setLotNumber] = useState('LOT-2026-90412');
  const [mfgDate, setMfgDate] = useState('2026-01-10');
  const [expDate, setExpDate] = useState('2028-12-15');

  const [policyAlert, setPolicyAlert] = useState(true);
  const [policyLot, setPolicyLot] = useState(true);
  const [policyCold, setPolicyCold] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Margin calculation
  const cost = parseFloat(costPrice.replace(/,/g, '')) || 0;
  const retail = parseFloat(retailCharge.replace(/,/g, '')) || 0;
  const marginPercent = cost > 0 && retail > cost ? (((retail - cost) / cost) * 100).toFixed(1) : '0';

  // Capacity calculations
  const capacityPercent = Math.min(100, Math.round((initQty / maxPar) * 100));
  const minPercent = Math.min(100, (minThreshold / maxPar) * 100);
  const currentPercent = Math.min(100 - minPercent, Math.max(0, ((initQty - minThreshold) / maxPar) * 100));
  const remainderPercent = Math.max(0, 100 - (minPercent + currentPercent));

  const handleScanBarcode = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setSku('SKU-RES-3M-A2E-90412');
      showToast('Optical Match: 3M Direct Composite Lot 90412 linked!');
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      mode === 'add'
        ? `"${itemName}" has been added to Wuse 2 inventory!`
        : `Record for "${itemName}" updated successfully!`
    );
    setTimeout(() => navigate('/clinic-operations/supplies-overview'), 1000);
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
                <span className="text-xs uppercase tracking-wider font-semibold text-[#006194]">Dispensary Catalog</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                {mode === 'add' ? 'Register New Inventory Item' : 'Edit Inventory Item Record'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                showToast('Draft saved to local storage.');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="bookmark_border" className="text-[16px]" />
              <span>Save Draft</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Branch Context Strip & Mode Selector */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-semibold text-[#006194] flex items-center gap-1">
                <Icon name="domain" className="text-[16px]" />
                BrightSmile Dental Centre • Wuse 2 Main Dispensary
              </span>
              <span className="bg-[#86f2e4]/30 text-[#006f66] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                HQ #001
              </span>
            </div>
            <p className="text-xs text-[#707881] font-mono">Registry Spec: INV-REG-2026-v2</p>
          </div>

          <div className="bg-[#eaedff] p-1 rounded-xl flex items-center shadow-xs">
            <button
              type="button"
              onClick={() => {
                setMode('add');
                showToast('Add Mode Selected: Registering new clinical supply');
              }}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mode === 'add' ? 'bg-white text-[#006194] shadow-sm' : 'text-[#707881] hover:text-[#131b2e]'
              }`}
            >
              <Icon name="add_circle" className="text-[16px]" />
              <span>New Item</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('edit');
                showToast('Edit Mode Enabled: Editing existing stock profile');
              }}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mode === 'edit' ? 'bg-white text-[#006194] shadow-sm' : 'text-[#707881] hover:text-[#131b2e]'
              }`}
            >
              <Icon name="edit_note" className="text-[16px]" />
              <span>Edit Mode</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: Item Classification */}
          <div className="bg-white rounded-2xl border border-[#dae2fd] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#cce5ff] flex items-center justify-center text-[#006194]">
                  <Icon name="medical_services" className="text-[20px]" />
                </div>
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                    1. Item Classification
                  </h2>
                  <p className="text-xs text-[#707881]">General identification & catalog tags</p>
                </div>
              </div>
              <span className="text-xs uppercase bg-[#eaedff] text-[#006194] px-2.5 py-1 rounded font-semibold">
                Step 1 of 4
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                  Item Clinical Name <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1">Brand / Manufacturer</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1">Category Classification</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  >
                    <option value="restorative">Restorative Dentistry</option>
                    <option value="endodontics">Endodontics</option>
                    <option value="periodontics">Periodontics</option>
                    <option value="sterilization">IPC & Sterilization</option>
                    <option value="anesthesia">Anesthesia & Pain</option>
                    <option value="surgical">Surgical Disposables</option>
                  </select>
                </div>
              </div>

              {/* SKU & Barcode Scanner */}
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">SKU / Internal Barcode</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className={`w-full text-xs font-mono p-3 rounded-xl border ${
                        isScanning ? 'border-[#006a61] ring-2 ring-[#86f2e4]' : 'border-[#dae2fd]'
                      } bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleScanBarcode}
                    disabled={isScanning}
                    className="h-11 px-4 rounded-xl bg-[#cce5ff] text-[#006194] font-semibold text-xs flex items-center gap-1.5 hover:bg-[#93ccff] transition-colors"
                  >
                    <Icon name={isScanning ? 'sync' : 'qr_code_scanner'} className={`text-[18px] ${isScanning ? 'animate-spin' : ''}`} />
                    <span>{isScanning ? 'Scanning...' : 'Scan'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Material Description</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Stock Quantities & Unit Management */}
          <div className="bg-white rounded-2xl border border-[#dae2fd] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#86f2e4]/40 flex items-center justify-center text-[#006f66]">
                  <Icon name="inventory" className="text-[20px]" />
                </div>
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                    2. Stock Quantities & Storage
                  </h2>
                  <p className="text-xs text-[#707881]">Levels, thresholds, and dispensary binning</p>
                </div>
              </div>
              <span className="text-xs uppercase bg-[#eaedff] text-[#006194] px-2.5 py-1 rounded font-semibold">
                Step 2 of 4
              </span>
            </div>

            {/* UoM Buttons */}
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-2">Unit of Measurement (UoM)</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {['Syringe (4g)', 'Box', 'Kit', 'Bottle', 'Pack', 'Vial'].map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => setUom(unit)}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                      uom === unit
                        ? 'bg-[#006194] text-white border-[#006194] shadow-sm'
                        : 'bg-[#f2f3ff] text-[#3f4850] border-[#dae2fd] hover:bg-[#eaedff]'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Steppers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#eaedff] flex flex-col justify-between">
                <span className="text-xs font-semibold text-[#707881]">Initial Received</span>
                <div className="flex items-center justify-between my-2">
                  <button
                    type="button"
                    onClick={() => setInitQty(Math.max(0, initQty - 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-[#131b2e]"
                  >
                    <Icon name="remove" className="text-[18px]" />
                  </button>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#006194]">
                    {initQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setInitQty(initQty + 1)}
                    className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-[#131b2e]"
                  >
                    <Icon name="add" className="text-[18px]" />
                  </button>
                </div>
                <span className="text-[11px] text-[#707881] text-center">dispensary intake</span>
              </div>

              <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#eaedff] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#707881]">Reorder Min</span>
                  <Icon name="warning" className="text-[#ba1a1a] text-[16px]" />
                </div>
                <div className="flex items-center justify-between my-2">
                  <button
                    type="button"
                    onClick={() => setMinThreshold(Math.max(1, minThreshold - 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-[#131b2e]"
                  >
                    <Icon name="remove" className="text-[18px]" />
                  </button>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#ba1a1a]">
                    {minThreshold}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMinThreshold(minThreshold + 1)}
                    className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-[#131b2e]"
                  >
                    <Icon name="add" className="text-[18px]" />
                  </button>
                </div>
                <span className="text-[11px] text-[#ba1a1a] text-center font-medium">triggers reorder alert</span>
              </div>

              <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#eaedff] flex flex-col justify-between">
                <span className="text-xs font-semibold text-[#707881]">Par / Max Capacity</span>
                <div className="flex items-center justify-between my-2">
                  <button
                    type="button"
                    onClick={() => setMaxPar(Math.max(initQty, maxPar - 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-[#131b2e]"
                  >
                    <Icon name="remove" className="text-[18px]" />
                  </button>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">
                    {maxPar}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMaxPar(maxPar + 1)}
                    className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-[#131b2e]"
                  >
                    <Icon name="add" className="text-[18px]" />
                  </button>
                </div>
                <span className="text-[11px] text-[#707881] text-center">shelf par limit</span>
              </div>
            </div>

            {/* Capacity Meter */}
            <div className="bg-[#f2f3ff] p-4 rounded-xl space-y-2 border border-[#eaedff]">
              <div className="flex justify-between text-xs">
                <span>
                  Capacity Usage: <strong className="text-[#006194]">{capacityPercent}%</strong>
                </span>
                <span className="text-[#707881]">
                  Target Range: {minThreshold} - {maxPar} units
                </span>
              </div>
              <div className="h-2.5 w-full bg-[#eaedff] rounded-full overflow-hidden flex">
                <div className="h-full bg-[#ba1a1a]/70" style={{ width: `${minPercent}%` }} />
                <div className="h-full bg-[#006194]" style={{ width: `${currentPercent}%` }} />
                <div className="h-full bg-[#eaedff]" style={{ width: `${remainderPercent}%` }} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                Storage Bin & Dispensary Location
              </label>
              <input
                type="text"
                value={storageBin}
                onChange={(e) => setStorageBin(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
              />
            </div>
          </div>

          {/* SECTION 3: Procurement & Traceability */}
          <div className="bg-white rounded-2xl border border-[#dae2fd] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#cde5ff] flex items-center justify-center text-[#006195]">
                  <Icon name="receipt_long" className="text-[20px]" />
                </div>
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                    3. Procurement & Traceability
                  </h2>
                  <p className="text-xs text-[#707881]">Pricing structure and regulatory lot tracking</p>
                </div>
              </div>
              <span className="text-xs uppercase bg-[#eaedff] text-[#006194] px-2.5 py-1 rounded font-semibold">
                Step 3 of 4
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Cost Price per Unit</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-xs font-bold text-[#707881]">₦</span>
                  <input
                    type="text"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="w-full text-xs font-mono pl-8 p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Billing Unit Charge</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-xs font-bold text-[#006a61]">₦</span>
                  <input
                    type="text"
                    value={retailCharge}
                    onChange={(e) => setRetailCharge(e.target.value)}
                    className="w-full text-xs font-mono pl-8 p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                </div>
                <div className="flex justify-between items-center text-xs mt-1">
                  <span className="text-[#707881]">Clinic tariff</span>
                  <span className="px-2 py-0.5 rounded bg-[#86f2e4]/30 text-[#006f66] font-bold">
                    +{marginPercent}% margin
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1">Accredited Supplier / Vendor</label>
              <select
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
              >
                <option value="vend-201">Dental Supplies West Africa Ltd (#VEND-201)</option>
                <option value="vend-104">Apex Oral Biotech Abuja (#VEND-104)</option>
                <option value="vend-339">Meditrade Pharma Global (#VEND-339)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Batch / Lot Identifier</label>
                <input
                  type="text"
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                  className="w-full text-xs font-mono uppercase p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Manufacturing Date</label>
                <input
                  type="date"
                  value={mfgDate}
                  onChange={(e) => setMfgDate(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Expiration Date</label>
                <input
                  type="date"
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Operational Policies & Dispensing Controls */}
          <div className="bg-white rounded-2xl border border-[#dae2fd] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#dae2fd] flex items-center justify-center text-[#131b2e]">
                  <Icon name="policy" className="text-[20px]" />
                </div>
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                    4. Dispensary & Safety Protocols
                  </h2>
                  <p className="text-xs text-[#707881]">Automated triggers and regulatory compliance</p>
                </div>
              </div>
              <span className="text-xs uppercase bg-[#eaedff] text-[#006194] px-2.5 py-1 rounded font-semibold">
                Step 4 of 4
              </span>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors cursor-pointer border border-[#eaedff]">
                <input
                  type="checkbox"
                  checked={policyAlert}
                  onChange={(e) => setPolicyAlert(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#131b2e] block">Low Stock Executive Alert</span>
                  <span className="text-[#707881]">
                    Instantly dispatch SMS/App notification to Wuse 2 Practice Manager when stock dips below 5 units.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors cursor-pointer border border-[#eaedff]">
                <input
                  type="checkbox"
                  checked={policyLot}
                  onChange={(e) => setPolicyLot(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#131b2e] block">Chairside Lot Verification (DHA Mandate)</span>
                  <span className="text-[#707881]">
                    Force dental assistant or nurse to scan or confirm batch number before applying restorative material
                    to patient EHR.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors cursor-pointer border border-[#eaedff]">
                <input
                  type="checkbox"
                  checked={policyCold}
                  onChange={(e) => setPolicyCold(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#006194] accent-[#006194]"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#131b2e] block">Refrigeration / Cold Chain Required</span>
                  <span className="text-[#707881]">
                    Requires dedicated 2°C - 8°C cold monitoring chamber. Leave off for ambient restorative resin (20°C -
                    25°C).
                  </span>
                </div>
              </label>
            </div>

            <div
              className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 ${
                policyCold ? 'bg-[#cde5ff] text-[#001d32]' : 'bg-[#f2f3ff] text-[#3f4850]'
              }`}
            >
              <Icon name={policyCold ? 'ac_unit' : 'thermostat'} className="text-[20px] text-[#006194] shrink-0" />
              <span>
                {policyCold
                  ? 'Chilled Cold Chain Active: Transfer directly to Operatory Dispensary Fridge (2°C – 8°C).'
                  : 'Standard storage assigned: Controlled operatory room climate (20°C – 25°C / 68°F – 77°F).'}
              </span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/clinic-operations/supplies-overview')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#eaedff] text-xs font-bold text-[#131b2e] hover:bg-[#dae2fd] transition-colors"
            >
              Cancel & Return
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="save" className="text-[18px]" />
              <span>{mode === 'add' ? 'Save & Add to Inventory' : 'Update Item Record'}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
