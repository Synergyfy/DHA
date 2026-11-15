import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type TabType =
  | 'overview'
  | 'org_info'
  | 'registration'
  | 'services'
  | 'documents'
  | 'contact'
  | 'history';

export function OrganisationProfileManagementScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Editable non-sensitive fields
  const [tradingName, setTradingName] = useState('Greenfield Dental & Implant Centre');
  const [tagline, setTagline] = useState('Premier multi-specialty dental practice offering restorative, surgical, and implantology care.');
  const [phone, setPhone] = useState('+234 9 461 8801');
  const [email, setEmail] = useState('info@greenfielddental.ng');
  const [website, setWebsite] = useState('https://greenfielddental.ng');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAmendmentModal, setShowAmendmentModal] = useState(false);

  const handleSave = () => {
    setToastMessage('Public practice profile changes saved successfully.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'overview', label: 'Overview', icon: 'visibility' },
    { key: 'org_info', label: 'Organisation Info', icon: 'business' },
    { key: 'registration', label: 'Registration & CAC', icon: 'verified' },
    { key: 'services', label: 'Services & Scope', icon: 'medical_services' },
    { key: 'documents', label: 'Documents', icon: 'folder_open' },
    { key: 'contact', label: 'Contact Details', icon: 'call' },
    { key: 'history', label: 'Change History', icon: 'history' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-700 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <Icon name="check_circle" className="text-base" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-8 py-3.5 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/clinic-onboarding/dashboard')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Return to Dashboard"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                DHA Facility Profile Management
              </span>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Organisation Profile &amp; Governance
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAmendmentModal(true)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors flex items-center gap-1"
            >
              <Icon name="lock_reset" className="text-sm" />
              <span>Request Regulated Change</span>
            </button>
            <button
              onClick={handleSave}
              className="text-xs font-bold px-4 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition-colors"
            >
              Save Edits
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 lg:px-8 pt-6 space-y-6">
        {/* Profile Identity Card */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-800 text-white flex items-center justify-center font-extrabold text-2xl shadow-md border-2 border-teal-600 shrink-0">
              GD
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Greenfield Dental Clinic Limited
                </h2>
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded uppercase">
                  CAC RC-1489201
                </span>
              </div>
              <p className="text-xs text-slate-600 flex items-center gap-2">
                <span>Trading as: <strong>{tradingName}</strong></span>
                <span>•</span>
                <span>CMD: Dr. Amina Bello (#DEN-78421)</span>
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Icon name="place" className="text-sm text-teal-600" />
                <span>Plot 104 Aminu Kano Cresc, Wuse 2, Abuja • 2 Registered Facilities</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0 text-left sm:text-right space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Accreditation Standing</div>
            <div className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-1 rounded inline-flex items-center gap-1 border border-teal-200">
              <Icon name="verified" className="text-sm text-teal-600" />
              Under Statutory Desk Review
            </div>
            <div className="text-[11px] text-slate-500">Docket #DHA-APP-2026-8819</div>
          </div>
        </section>

        {/* Regulated Attributes Governance Notice */}
        <section className="bg-amber-50/70 border border-amber-300 rounded-2xl p-4 flex items-start gap-3">
          <Icon name="gavel" className="text-amber-700 text-xl shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-amber-900">
            <span className="font-bold uppercase tracking-wider">Statutory Governance Lock:</span>
            <p className="leading-relaxed">
              Legal Entity Name, CAC Registration Number, Primary Healthcare Facility Address, and Chief Medical Director appointments are locked by DHA ministerial decree. Changing these details requires filing a formal DHA Profile Amendment Notice with certified corporate resolutions.
            </p>
          </div>
        </section>

        {/* Horizontal Navigation Tabs */}
        <div className="border-b border-slate-200 overflow-x-auto flex gap-2 pb-0.5 scrollbar-none">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap rounded-t-xl transition-colors flex items-center gap-1.5 border-b-2 ${
                activeTab === t.key
                  ? 'border-teal-600 text-teal-800 bg-teal-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon name={t.icon} className="text-base" />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Overview & Editable Trading Name */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Form details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Directly Editable Fields */}
              <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    Public Practice Identity (Customizable)
                  </h3>
                  <span className="text-xs text-slate-400">Directly editable</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Public Trading Name
                    </label>
                    <input
                      type="text"
                      value={tradingName}
                      onChange={(e) => setTradingName(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      This name is displayed to patients on the DHA public booking directory.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Practice Tagline &amp; Patient Description
                    </label>
                    <textarea
                      rows={3}
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Reception Booking Phone
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Patient Inquiries Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Practice Website URL
                    </label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
                    />
                  </div>
                </div>
              </section>

              {/* Locked Regulated Fields */}
              <section className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Icon name="lock" className="text-slate-400 text-sm" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                      Locked Statutory Credentials
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowAmendmentModal(true)}
                    className="text-xs font-bold text-teal-700 hover:underline"
                  >
                    Request Amendment
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-medium">Registered Legal Entity:</span>
                    <div className="font-bold text-slate-800 mt-0.5">Greenfield Dental Clinic Limited</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-medium">CAC Registration No:</span>
                    <div className="font-mono font-bold text-slate-800 mt-0.5">RC-1489201</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-medium">FCT Facility Licence:</span>
                    <div className="font-mono font-bold text-slate-800 mt-0.5">FCT-HEFAMAA-DENT-0842</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-medium">Chief Medical Director:</span>
                    <div className="font-bold text-slate-800 mt-0.5">Dr. Amina Bello (#DEN-78421)</div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Live Patient Directory Preview Card */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Patient Search Preview
                </h3>
                <span className="text-[11px] text-teal-700 font-semibold">Live Preview</span>
              </div>

              {/* Directory Preview Card with Watermark */}
              <div className="bg-white rounded-2xl border border-slate-300 p-5 shadow-md relative overflow-hidden space-y-4">
                {/* Watermark Overlay */}
                <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[0.5px] pointer-events-none flex items-center justify-center">
                  <div className="transform -rotate-12 border-2 border-amber-500/60 bg-amber-500/10 text-amber-800 font-bold text-xs uppercase px-4 py-1.5 rounded-lg tracking-widest shadow-sm">
                    Awaiting DHA Verification
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-800 text-white font-bold flex items-center justify-center text-lg">
                    GD
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {tradingName}
                    </h4>
                    <span className="text-[11px] text-teal-700 font-medium">Specialist Dental Clinic</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{tagline}"
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <Icon name="place" className="text-slate-400 text-sm" />
                    <span>Plot 104 Aminu Kano Cresc, Wuse 2, Abuja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="call" className="text-slate-400 text-sm" />
                    <span>{phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="language" className="text-slate-400 text-sm" />
                    <span className="text-teal-700">{website}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    disabled
                    className="w-full py-2 rounded-xl bg-slate-200 text-slate-500 text-xs font-bold cursor-not-allowed"
                  >
                    Book Appointment (Pending Approval)
                  </button>
                </div>
              </div>

              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900">
                <span className="font-bold">Public Directory Note:</span> Once your application completes Phase 5 approval, this card will appear on the DHA citizen portal for online bookings.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Organisation Info */}
        {activeTab === 'org_info' && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Organisation &amp; Corporate Identity Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400">Legal Entity Type:</span>
                <div className="font-bold text-slate-800 mt-0.5">Private Limited Liability Company (Ltd)</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400">Year Founded:</span>
                <div className="font-bold text-slate-800 mt-0.5">2018 (8 Years in Operation)</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400">Federal Tax ID (TIN):</span>
                <div className="font-mono font-bold text-slate-800 mt-0.5">21094821-0001</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400">Governance Head:</span>
                <div className="font-bold text-slate-800 mt-0.5">Dr. Amina Bello (CMD &amp; Trustee)</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400">Primary Bank:</span>
                <div className="font-bold text-slate-800 mt-0.5">Stanbic IBTC Bank Plc</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400">Insurance Network:</span>
                <div className="font-bold text-slate-800 mt-0.5">14 Major HMOs Integrated</div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Registration */}
        {activeTab === 'registration' && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Statutory Licensing &amp; Regulatory Filings
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Corporate Affairs Commission (CAC)</div>
                  <div className="text-xs text-slate-500 font-mono">RC-1489201 • Active &amp; Valid</div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">Verified</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">FCT Health Facility Operating Certificate</div>
                  <div className="text-xs text-slate-500 font-mono">#FCT-HEFAMAA-DENT-0842 (Expires 31 Jan 2027)</div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">Verified</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">NNRA Radiation Facility License</div>
                  <div className="text-xs text-slate-500 font-mono">#NNRA-MED-XRAY-2024-991 (Desk review in progress)</div>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded">Under Audit</span>
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: Services */}
        {activeTab === 'services' && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Approved Clinical Services &amp; Specialties
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900">General &amp; Restorative Dentistry</span>
                <p className="text-slate-500 mt-0.5">Composite restorations, root canal therapy, crown &amp; bridge prosthetics.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900">Oral &amp; Maxillofacial Surgery</span>
                <p className="text-slate-500 mt-0.5">Surgical impactions, frenectomy, alveolar ridge augmentation.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900">Orthodontics &amp; Dentofacial Orthopaedics</span>
                <p className="text-slate-500 mt-0.5">Fixed appliance therapy, ceramic braces, clear aligner treatments.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900">Dental Radiography &amp; CBCT</span>
                <p className="text-slate-500 mt-0.5">3D Cone Beam Computed Tomography, digital panoramic imaging.</p>
              </div>
            </div>
          </section>
        )}

        {/* Tab 5: Documents */}
        {activeTab === 'documents' && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Compliance Vault Documents
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="picture_as_pdf" className="text-red-600 text-lg" />
                  <span className="font-semibold text-slate-800">CAC_Certificate_RC1489201.pdf</span>
                </div>
                <span className="text-slate-500 font-mono">1.8 MB</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="picture_as_pdf" className="text-red-600 text-lg" />
                  <span className="font-semibold text-slate-800">FCT_HEFAMAA_Facility_Licence.pdf</span>
                </div>
                <span className="text-slate-500 font-mono">2.1 MB</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="picture_as_pdf" className="text-red-600 text-lg" />
                  <span className="font-semibold text-slate-800">Tenancy_Agreement_Wuse2_Signed.pdf</span>
                </div>
                <span className="text-slate-500 font-mono">4.5 MB</span>
              </div>
            </div>
          </section>
        )}

        {/* Tab 6: Contact */}
        {activeTab === 'contact' && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Practice Locations &amp; Emergency Contacts
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Main Facility (HQ #001)</div>
                <p className="text-slate-600">Plot 104 Aminu Kano Crescent, Wuse 2, Abuja, FCT</p>
                <p className="text-slate-500">Phone: +234 9 461 8801 • Emergency: +234 800 473 3634</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Satellite Branch (Branch #002)</div>
                <p className="text-slate-600">Suite B4, Area 11 Plaza, Garki 2, Abuja</p>
                <p className="text-slate-500">Branch Lead: Dr. Tunde Fashola • Lead Phone: +234 802 331 9904</p>
              </div>
            </div>
          </section>
        )}

        {/* Tab 7: History */}
        {activeTab === 'history' && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Audit &amp; Change History Log
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">Trading Name Updated</span>
                  <p className="text-slate-500">Changed from 'Greenfield Dental Clinic' to 'Greenfield Dental &amp; Implant Centre'</p>
                </div>
                <span className="text-slate-400 font-mono">18 Oct 2026</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">Garki Satellite Branch Registered</span>
                  <p className="text-slate-500">Added Branch #002 under corporate entity RC-1489201</p>
                </div>
                <span className="text-slate-400 font-mono">15 Oct 2026</span>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Regulated Amendment Request Modal */}
      {showAmendmentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Icon name="lock_reset" className="text-lg" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Request Regulated Profile Change
                </h3>
              </div>
              <button
                onClick={() => setShowAmendmentModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <Icon name="close" className="text-lg" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              To update statutory credentials (such as CAC Registered Legal Name, Facility Head, or Licensed Premise Address), please select the attribute and attach a formal Board Resolution or Ministerial Notice.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Regulated Field</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-800">
                  <option>Primary Facility Physical Address</option>
                  <option>Chief Medical Director (CMD) Appointment</option>
                  <option>CAC Registered Corporate Name</option>
                  <option>Facility License Scope Expansion</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Justification &amp; Authority</label>
                <textarea
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-800"
                  placeholder="Explain reason for statutory adjustment..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowAmendmentModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAmendmentModal(false);
                  setToastMessage('Amendment request #DHA-AMD-1092 logged for Board Review.');
                  setTimeout(() => setToastMessage(null), 3500);
                }}
                className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold"
              >
                Submit Amendment Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
