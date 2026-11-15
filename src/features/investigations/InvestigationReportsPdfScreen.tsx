import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

export function InvestigationReportsPdfScreen() {
  const navigate = useNavigate();
  const [activeArchetype, setActiveArchetype] = useState<'clinical' | 'technical' | 'patient'>('clinical');
  const [pdfZoom, setPdfZoom] = useState<number>(100);
  const [patientLanguage, setPatientLanguage] = useState<'en' | 'ar'>('en');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePrint = () => {
    showToast('Sending document to DHA Secure Clinic AirPrint queue...');
    window.print();
  };

  const handleDownload = () => {
    showToast('Downloading cryptographically sealed PDF (DHA-REP-2025-0914.pdf)...');
  };

  return (
    <InvestigationShell
      pageTitle="Investigation Reports & PDF Preview"
      badgeCode="11.24"
      badgeLabel="Formal Clinical PDF Certificate"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="REP-2025-0914"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Document Controls Bar */}
        <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Document Archetype Selector */}
          <div className="flex items-center bg-surface-container-low rounded-xl p-1 border border-outline-variant/30 text-xs overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveArchetype('clinical')}
              className={`px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeArchetype === 'clinical'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name="description" className="text-sm" />
              <span>1. Comprehensive Clinical Report</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveArchetype('technical')}
              className={`px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeArchetype === 'technical'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name="tune" className="text-sm" />
              <span>2. Technical Dosimetry Sheet</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveArchetype('patient')}
              className={`px-3 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                activeArchetype === 'patient'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name="family_restroom" className="text-sm" />
              <span>3. Patient Care Summary</span>
            </button>
          </div>

          {/* PDF Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-surface-container-low rounded-xl p-1 border border-outline-variant/30 text-xs">
              <button
                type="button"
                onClick={() => setPdfZoom((prev) => Math.max(75, prev - 15))}
                disabled={pdfZoom <= 75}
                className="p-1.5 rounded hover:bg-surface-container text-on-surface disabled:opacity-40"
                title="Zoom Out"
              >
                <Icon name="remove" className="text-xs" />
              </button>
              <span className="px-2 font-mono font-bold text-on-surface">{pdfZoom}%</span>
              <button
                type="button"
                onClick={() => setPdfZoom((prev) => Math.min(130, prev + 15))}
                disabled={pdfZoom >= 130}
                className="p-1.5 rounded hover:bg-surface-container text-on-surface disabled:opacity-40"
                title="Zoom In"
              >
                <Icon name="add" className="text-xs" />
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/40 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="print" className="text-sm text-outline" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="download" className="text-sm" />
              <span>Download Signed PDF</span>
            </button>
          </div>
        </section>

        {/* Simulated PDF Paper Stage (A4 Document Canvas) */}
        <section className="bg-slate-200/80 rounded-3xl p-4 sm:p-8 flex justify-center items-center overflow-x-auto shadow-inner border border-slate-300">
          <div
            className="w-full max-w-[850px] bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 border border-slate-300 transition-transform duration-200"
            style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top center' }}
          >
            {/* Header: Dubai Health Authority Official Branding */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl tracking-wider">
                  DHA
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-950 uppercase">
                    Dubai Health Authority
                  </h1>
                  <p className="text-xs font-medium text-slate-600 font-serif">
                    هيئة الصحة بدبي &bull; Government of Dubai
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Central Dental Diagnostic Facility #DHA-FAC-8812 &bull; NABIDH Network
                  </p>
                </div>
              </div>

              {/* QR Code & Security Stamp */}
              <div className="text-right flex flex-col items-end">
                <div className="w-14 h-14 bg-slate-100 border border-slate-300 rounded p-1 flex items-center justify-center">
                  <Icon name="qr_code_2" className="text-3xl text-slate-900" />
                </div>
                <span className="font-mono text-[9px] text-slate-500 mt-1">TOKEN: QR-DHA-98124</span>
                <span className="font-mono text-[9px] text-emerald-700 font-bold">DIGITALLY SEALED</span>
              </div>
            </div>

            {/* Document Archetype 1: Comprehensive Clinical Report */}
            {activeArchetype === 'clinical' && (
              <div className="space-y-6 text-xs text-slate-800">
                {/* Document Title Banner */}
                <div className="bg-slate-100 p-3 rounded-lg border border-slate-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Document Type:</span>
                    <h2 className="text-sm font-bold text-slate-950">
                      OFFICIAL DENTAL INVESTIGATION & DIAGNOSTIC REPORT
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Report Reference:</span>
                    <span className="font-mono font-bold text-slate-900">#DHA-REP-2025-0914</span>
                  </div>
                </div>

                {/* Section 1: Demographics & Clinical Requisition */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    1. Patient & Examination Demographics
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Patient Name:</span>
                      <span className="font-bold text-slate-950">Chinedu Okafor</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Emirates ID:</span>
                      <span className="font-mono font-semibold text-slate-900">784-1990-1284910-1</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">DHA MRN:</span>
                      <span className="font-mono font-semibold text-slate-900">DHA-10482</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Age / Gender:</span>
                      <span className="font-semibold text-slate-900">34 Years / Male</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Referring Clinician:</span>
                      <span className="font-semibold text-slate-900">Dr. Daniel James</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">DHA License:</span>
                      <span className="font-mono font-semibold text-slate-900">#DEN-48912</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Examination Date:</span>
                      <span className="font-semibold text-slate-900">16 Feb 2025</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Encounter ID:</span>
                      <span className="font-mono font-semibold text-slate-900">#EXAM-0982</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: Clinical Findings & Diagnostic Formulation */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    2. Radiographic & Diagnostic Findings
                  </h3>
                  <div className="border border-slate-300 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 border-b border-slate-300 font-semibold text-slate-700">
                        <tr>
                          <th className="py-2 px-3">Tooth / Site</th>
                          <th className="py-2 px-3">ICD-10 Code</th>
                          <th className="py-2 px-3">Classification</th>
                          <th className="py-2 px-3">Depth / Radiographic Metric</th>
                          <th className="py-2 px-3">Pulp Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="py-2.5 px-3 font-bold text-slate-950">Tooth #16 DO</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-900">K02.52</td>
                          <td className="py-2.5 px-3">Caries of Dentine (Active)</td>
                          <td className="py-2.5 px-3 font-mono">2.10 mm into outer dentin</td>
                          <td className="py-2.5 px-3 text-emerald-800 font-bold">Vital (Reversible)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">Tooth #17 M</td>
                          <td className="py-2.5 px-3 font-mono text-slate-600">K02.3</td>
                          <td className="py-2.5 px-3">Arrested Enamel Incipient</td>
                          <td className="py-2.5 px-3 font-mono">&lt; 0.40 mm (Enamel only)</td>
                          <td className="py-2.5 px-3 text-slate-700">Normal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Embedded Radiographic Plate Printout */}
                <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                      DIAGNOSTIC RADIOGRAPHIC IMAGE ATTACHED
                    </span>
                    <h4 className="text-xs font-bold text-white">Series: Right Bitewing (BW-R) &bull; Size 2 HD</h4>
                    <p className="text-[11px] text-slate-300">
                      Demineralization depth calibrated at 2.1mm. No evidence of apical radiolucency. Lamina dura intact.
                    </p>
                  </div>
                  <div className="w-24 h-20 bg-slate-950 rounded border border-slate-700 flex flex-col items-center justify-center shrink-0">
                    <Icon name="radiology" className="text-2xl text-slate-400" />
                    <span className="text-[9px] font-mono text-slate-400 mt-1">DICOM 16-BIT</span>
                  </div>
                </div>

                {/* Section 3: Recommended Treatment Directive */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    3. Recommended Restorative Directive
                  </h3>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        Primary Procedure: Direct Biomimetic Composite Restoration (DHA-RES-2S)
                      </span>
                      <span className="font-bold text-rose-700 text-[11px]">Recommended Window: &lt; 7 Days</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Carious lesion on #16 DO has progressed +1.5mm since baseline (Oct 2024). Immediate operative intervention
                      is necessary to arrest decay and prevent endodontic involvement. Topical 5% NaF varnish application to adjacent
                      teeth.
                    </p>
                  </div>
                </div>

                {/* Section 4: Attestation & Digital Signature Block */}
                <div className="pt-4 border-t-2 border-slate-900 grid grid-cols-2 gap-6 items-end">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Attending Clinician:</span>
                    <div className="font-serif italic text-base text-slate-950 font-bold mt-1">
                      Dr. Daniel James, BDS, MSc, DHA
                    </div>
                    <span className="text-[10px] text-slate-600 block">
                      DHA Consultant Restorative Dentistry &bull; Reg #DEN-48912
                    </span>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 block">SHA-256 Cryptographic Seal:</span>
                    <span className="font-mono text-[9px] text-slate-800 break-all block">
                      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </span>
                    <span className="text-[10px] text-emerald-800 font-bold block">
                      NABIDH Live Timestamp: 16-FEB-2025 11:42:02 GST
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Document Archetype 2: Technical Radiation Dosimetry Sheet */}
            {activeArchetype === 'technical' && (
              <div className="space-y-6 text-xs text-slate-800">
                <div className="bg-slate-100 p-3 rounded-lg border border-slate-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Document Type:</span>
                    <h2 className="text-sm font-bold text-slate-950">
                      RADIATION SAFETY, DOSIMETRY & DICOM TECHNICAL CALIBRATION SHEET
                    </h2>
                  </div>
                  <span className="font-mono font-bold text-slate-900 text-xs">ALARA STAGE 1 VERIFIED</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase block">Radiology Generator</span>
                    <span className="font-bold text-slate-900">Carestream CS 2200</span>
                    <span className="text-[10px] text-slate-600 block">High Frequency DC</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase block">Digital Receptor</span>
                    <span className="font-bold text-slate-900">RVG 6200 HD Size 2</span>
                    <span className="text-[10px] text-slate-600 block">Optical Fiber Scintillator</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase block">Radiation Settings</span>
                    <span className="font-bold text-slate-900">60 kVp &bull; 7 mA</span>
                    <span className="text-[10px] text-slate-600 block">Exposure Time: 0.120 sec</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase block">Dose Area Product (DAP)</span>
                    <span className="font-bold text-slate-900 font-mono">18.4 mGy&bull;cm²</span>
                    <span className="text-[10px] text-emerald-700 font-semibold block">&lt; 30% DHA Reference Level</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase block">Effective Patient Dose</span>
                    <span className="font-bold text-slate-900 font-mono">0.015 mSv</span>
                    <span className="text-[10px] text-slate-600 block">Equivalent to 1.5 days background</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase block">Radiation Officer</span>
                    <span className="font-bold text-slate-900">Nurse Zainab Tariq</span>
                    <span className="text-[10px] text-slate-600 block">License #RAD-10928</span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
                  <span className="font-bold block mb-1">DHA Radiation Protection Committee Certification:</span>
                  <p className="text-[11px] leading-relaxed">
                    This radiographic exposure complies with Federal Authority for Nuclear Regulation (FANR) guidelines and
                    DHA Radiation Safety Standard DHA-RAD-STD-02. Shielding and collimation validated.
                  </p>
                </div>
              </div>
            )}

            {/* Document Archetype 3: Patient Care Summary */}
            {activeArchetype === 'patient' && (
              <div className="space-y-6 text-xs text-slate-800">
                <div className="flex items-center justify-between bg-slate-100 p-3 rounded-lg border border-slate-300">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Document Type:</span>
                    <h2 className="text-sm font-bold text-slate-950">
                      PATIENT ORAL HEALTH CARE SUMMARY & VISUAL GUIDE
                    </h2>
                  </div>
                  {/* Language Switch */}
                  <div className="flex items-center bg-white rounded-lg p-0.5 border border-slate-300">
                    <button
                      type="button"
                      onClick={() => setPatientLanguage('en')}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        patientLanguage === 'en' ? 'bg-primary text-white' : 'text-slate-600'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setPatientLanguage('ar')}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        patientLanguage === 'ar' ? 'bg-primary text-white' : 'text-slate-600'
                      }`}
                    >
                      العربية
                    </button>
                  </div>
                </div>

                {patientLanguage === 'en' ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                      <h3 className="text-sm font-bold text-blue-950">What did your dental X-rays show?</h3>
                      <p className="text-xs text-blue-900 leading-relaxed">
                        Your dental X-ray showed an area of decay on the back of your upper right molar (Tooth #16). The decay
                        has passed through the hard outer enamel and entered the softer second layer (dentin). Fortunately, the
                        nerve of the tooth is still healthy and fully alive!
                      </p>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                      <h3 className="text-sm font-bold text-amber-950">What is the recommended next step?</h3>
                      <p className="text-xs text-amber-900 leading-relaxed">
                        Dr. Daniel recommends scheduling a tooth-colored filling within the next 7 days. Treating this now
                        will protect the nerve and prevent the need for more complex treatment like a root canal.
                      </p>
                    </div>

                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                      <h3 className="text-sm font-bold text-emerald-950">Tips for your daily oral care routine:</h3>
                      <ul className="list-disc list-inside space-y-1 text-xs text-emerald-900">
                        <li>Brush twice daily with fluoride toothpaste for a full 2 minutes.</li>
                        <li>Floss gently between your back molars every evening before bed.</li>
                        <li>Limit sugary snacks and carbonated beverages between meals.</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-right" dir="rtl">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                      <h3 className="text-sm font-bold text-blue-950">ماذا أظهرت الأشعة السينية لأسنانك؟</h3>
                      <p className="text-xs text-blue-900 leading-relaxed">
                        أظهرت الأشعة السينية وجود تسوس في الجهة الخلفية للضرس العلوي الأيمن (الضرس رقم 16). اخترق التسوس طبقة المينا
                        الخارجية ووصل إلى الطبقة الثانية (العاج). لحسن الحظ، فإن عصب الضرس لا يزال سليماً وحياً تماماً!
                      </p>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                      <h3 className="text-sm font-bold text-amber-950">ما هي الخطوة التالية الموصى بها؟</h3>
                      <p className="text-xs text-amber-900 leading-relaxed">
                        يوصي الدكتور دانيال بتحديد موعد لإجراء حشوة تجميلية بلون السن خلال الأيام السبعة القادمة. معالجة هذا التسوس الآن
                        ستحمي العصب وتمنع الحاجة إلى علاجات أكثر تعقيداً مثل سحب العصب.
                      </p>
                    </div>

                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                      <h3 className="text-sm font-bold text-emerald-950">نصائح للعناية اليومية بصحة فمك:</h3>
                      <ul className="list-disc list-inside space-y-1 text-xs text-emerald-900">
                        <li>نظف أسنانك مرتين يومياً بمعجون يحتوي على الفلورايد لمدة دقيقتين كاملتين.</li>
                        <li>استخدم خيط الأسنان بلطف بين الأضراس الخلفية كل مساء قبل النوم.</li>
                        <li>قلل من الوجبات الخفيفة السكرية والمشروبات الغازية بين الوجبات الرئيسية.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Bottom Fast Navigation Strip */}
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Icon name="verified_user" className="text-primary text-base" />
            <span className="font-semibold text-on-surface">Official Record:</span>
            <span className="text-on-surface-variant">Available anytime in Patient Portal & NABIDH Core Health Records.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/investigations/dashboard')}
              className="px-3.5 py-2 rounded-xl font-bold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="dashboard" className="text-sm" />
              <span>Back to Investigations Hub (11.1)</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/investigations/library')}
              className="px-3.5 py-2 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="folder_managed" className="text-sm" />
              <span>Investigation Library (11.13)</span>
            </button>
          </div>
        </section>
      </div>
    </InvestigationShell>
  );
}

