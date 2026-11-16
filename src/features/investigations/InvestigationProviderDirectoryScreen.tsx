import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

interface ProviderCard {
  id: string;
  name: string;
  category: 'imaging' | 'pathology' | 'in-house';
  categoryLabel: string;
  badge: string;
  accreditation: string;
  location: string;
  distance: string;
  specs: string[];
  slaText: string;
  contactText: string;
  contactIcon: string;
  isInHouse?: boolean;
  statusBadge?: string;
  advisory?: string;
  operatoryStatus?: string;
  queueCount?: string;
}

export function InvestigationProviderDirectoryScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'imaging' | 'pathology' | 'in-house'>('all');
  const [accreditationFilter, setAccreditationFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New partner state
  const [newCenterName, setNewCenterName] = useState<string>('');
  const [newCenterCategory, setNewCenterCategory] = useState<string>('imaging');
  const [newCenterLocation, setNewCenterLocation] = useState<string>('Surulere');

  const providers: ProviderCard[] = [
    {
      id: 'prov-1',
      name: 'Al Zahra Advanced Dental Imaging',
      category: 'imaging',
      categoryLabel: 'Advanced 3D & Panoramic Imaging',
      badge: 'DHA Verified • JCI Accredited',
      accreditation: 'jci',
      location: 'Surulere 1',
      distance: '1.8 km',
      specs: ['Morita Veraview X800 3D', '80μm High-Res CBCT', 'Orthopantomograph (OPG)', 'Lateral Ceph'],
      slaText: '< 4 Hours for Stat CBCT',
      contactText: '+234 1 378 6000',
      contactIcon: 'call',
    },
    {
      id: 'prov-2',
      name: 'Surulere Diagnostic Laboratory',
      category: 'pathology',
      categoryLabel: 'Clinical Pathology & Hematology',
      badge: 'DHA Verified • CAP ISO-15189',
      accreditation: 'cap',
      location: 'Surulere 2',
      distance: '2.4 km',
      specs: ['Pre-op Coagulation (PT/INR)', 'Full Blood Count', 'HbA1c Chairside', 'Salivary Cortisol'],
      slaText: 'Same-Day Results (Avg 3.5h)',
      contactText: 'orders@albarsha-lab.ae',
      contactIcon: 'mail',
    },
    {
      id: 'prov-3',
      name: 'DHA Central Dental Radiology',
      category: 'in-house',
      categoryLabel: 'Intraoral & Chairside Diagnostics',
      badge: 'In-House Facility • FANR ALADA',
      accreditation: 'dha',
      location: 'DHA Main Campus',
      distance: 'Suite 4, Floor 2',
      specs: ['Dexis Titanium Sensor', 'Digital Bitewings', 'Tri-Apical Periapical', 'Intraoral Macro Photo'],
      slaText: 'Immediate (< 15 mins)',
      contactText: 'Ext. 4882',
      contactIcon: 'domain',
      isInHouse: true,
      operatoryStatus: 'Operatory 4 Available',
      queueCount: '1 patient in queue',
    },
    {
      id: 'prov-4',
      name: 'Mediclinic Parkview Oral Unit',
      category: 'imaging',
      categoryLabel: 'Specialized Maxillofacial Radiology',
      badge: 'Verification Pending (Annual Re-audit)',
      accreditation: 'jci',
      location: 'Victoria Island Healthcare Zone',
      distance: 'Umm Suqeim St',
      specs: ['Dual-Energy CBCT', 'TMJ Dynamic Protocol', 'Stereolithographic DICOM'],
      slaText: '24 Hours for Reconstruction',
      contactText: '+234 1 445 5000',
      contactIcon: 'call',
      advisory: 'Referral requests currently require secondary clinic director endorsement prior to study upload.',
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRegisterPartner = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterModalOpen(false);
    showToast(`Partner application submitted for ${newCenterName || 'New Diagnostic Facility'}. DHA licensing audit initiated.`);
    setNewCenterName('');
  };

  const filteredProviders = providers.filter((p) => {
    const matchesCategory = activeFilter === 'all' || p.category === activeFilter;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAccreditation =
      accreditationFilter === '' || p.accreditation === accreditationFilter;
    const matchesLocation =
      locationFilter === '' || p.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesCategory && matchesSearch && matchesAccreditation && matchesLocation;
  });

  return (
    <InvestigationShell
      pageTitle="Laboratory & Imaging Provider Directory"
      badgeCode="11.26"
      badgeLabel="Accredited Diagnostic Network"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="DIR-2025-0914"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Clinical Header Ribbon */}
        <section className="rounded-2xl bg-surface-container-low p-5 sm:p-6 shadow-sm relative overflow-hidden border border-outline-variant/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-1.5 text-secondary mb-1">
                <Icon name="verified_user" className="text-lg" />
                <span className="text-xs uppercase tracking-wider font-bold">Accredited Health Network</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Verified Diagnostic Network</h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                14 Certified Partner Centers & Dedicated In-House Radiology Suites
              </p>
            </div>

            {/* Quick Stat Chips & Onboard CTA */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface shadow-xs text-xs font-semibold border border-outline-variant/30">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span>11 Active Feeds</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface shadow-xs text-xs font-semibold border border-outline-variant/30">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>99.4% SLA Adherence</span>
              </div>
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Icon name="add_business" className="text-base" />
                <span>Onboard Provider Partner</span>
              </button>
            </div>
          </div>
        </section>

        {/* Search & Smart Discovery Controls */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-outline-variant/40 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative w-full flex-1">
              <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search provider name, equipment, modality, location..."
                className="w-full h-11 pl-10 pr-10 bg-surface rounded-xl text-xs font-medium text-on-surface placeholder:text-outline border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <Icon name="close" className="text-base" />
                </button>
              )}
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
              <select
                value={accreditationFilter}
                onChange={(e) => setAccreditationFilter(e.target.value)}
                className="h-11 bg-surface text-on-surface text-xs font-medium px-3 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">Accreditation (All)</option>
                <option value="cap">CAP Accredited</option>
                <option value="jci">JCI International</option>
                <option value="dha">DHA Gold Standard</option>
              </select>

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="h-11 bg-surface text-on-surface text-xs font-medium px-3 rounded-xl border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">Location (All Lagos)</option>
                <option value="Surulere">Surulere (1 & 2)</option>
                <option value="main campus">DHA Main Campus</option>
                <option value="Victoria Island">Victoria Island Zone</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                activeFilter === 'all'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/30'
              }`}
            >
              <span>All Centers</span>
              <span className="opacity-80 font-mono">(14)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('imaging')}
              className={`px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                activeFilter === 'imaging'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/30'
              }`}
            >
              <Icon name="radiology" className="text-sm" />
              <span>Imaging Centers</span>
              <span className="opacity-80 font-mono">(6)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('pathology')}
              className={`px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                activeFilter === 'pathology'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/30'
              }`}
            >
              <Icon name="biotech" className="text-sm" />
              <span>Pathology Labs</span>
              <span className="opacity-80 font-mono">(5)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('in-house')}
              className={`px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                activeFilter === 'in-house'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/30'
              }`}
            >
              <Icon name="domain" className="text-sm" />
              <span>In-House Suites</span>
              <span className="opacity-80 font-mono">(3)</span>
            </button>
          </div>
        </section>

        {/* Provider Cards Grid */}
        {filteredProviders.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant/30 space-y-3">
            <Icon name="manage_search" className="text-4xl text-outline mx-auto" />
            <h3 className="text-base font-bold text-on-surface">No Diagnostic Providers Found</h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
              No centers match your current filter parameters. Try clearing your search keyword or resetting the filter pills.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
                setAccreditationFilter('');
                setLocationFilter('');
              }}
              className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
            >
              <Icon name="refresh" className="text-base" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProviders.map((prov) => (
              <article
                key={prov.id}
                className={`bg-surface-container-lowest rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                  prov.isInHouse ? 'border-primary/40 bg-gradient-to-br from-surface-container-lowest to-primary/5' : 'border-outline-variant/40'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold mb-1">
                        <Icon name="verified" className="text-xs" />
                        {prov.badge}
                      </span>
                      <h3 className="text-base font-bold text-on-surface truncate">{prov.name}</h3>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                        <span>{prov.categoryLabel}</span>
                        <span className="text-outline">&bull;</span>
                        <span className="text-primary font-semibold">{prov.location} ({prov.distance})</span>
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0 shadow-xs">
                      <Icon
                        name={
                          prov.category === 'imaging'
                            ? 'radiology'
                            : prov.category === 'pathology'
                            ? 'biotech'
                            : 'local_hospital'
                        }
                        className="text-2xl"
                      />
                    </div>
                  </div>

                  {/* In-House Live Status Callout */}
                  {prov.operatoryStatus && (
                    <div className="my-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="font-bold">{prov.operatoryStatus}</span>
                      </div>
                      <span className="text-emerald-700 font-medium">{prov.queueCount}</span>
                    </div>
                  )}

                  {/* Advisory Box if any */}
                  {prov.advisory && (
                    <div className="my-2.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                      <Icon name="info" className="text-base text-amber-700 shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-relaxed">{prov.advisory}</p>
                    </div>
                  )}

                  {/* Modalities Chips */}
                  <div className="mt-3 bg-surface-container-low/70 p-3 rounded-xl border border-outline-variant/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-outline block mb-1.5 flex items-center gap-1">
                      <Icon name="tune" className="text-xs" />
                      Modalities & Specifications
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {prov.specs.map((spec, i) => (
                        <span
                          key={i}
                          className="bg-surface-container-lowest px-2 py-0.5 rounded text-[11px] font-mono text-on-surface border border-outline-variant/20"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* SLA & Live Telemetry */}
                  <div className="mt-3 flex items-center justify-between text-xs pt-1 border-t border-outline-variant/20">
                    <div className="flex items-center gap-1.5 text-secondary font-semibold">
                      <Icon name="timer" className="text-sm" />
                      <span>{prov.slaText}</span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant font-mono text-[11px]">
                      <Icon name={prov.contactIcon} className="text-xs text-outline" />
                      <span>{prov.contactText}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 flex items-center gap-2 border-t border-outline-variant/20">
                  <button
                    type="button"
                    onClick={() => {
                      if (prov.isInHouse) navigate('/investigations/queue');
                      else showToast(`Booking requisition initiated for ${prov.name}.`);
                    }}
                    className="flex-1 py-2.5 px-3 bg-primary text-on-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-primary/95 transition-all"
                  >
                    <Icon name={prov.isInHouse ? 'format_list_bulleted' : 'calendar_month'} className="text-base" />
                    <span>{prov.isInHouse ? 'Open Live Worklist' : 'Book Study'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast(`Location and routing for ${prov.name} copied to clipboard.`)}
                    className="p-2.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl border border-outline-variant/30 flex items-center justify-center transition-colors"
                    title="Location details"
                  >
                    <Icon name="location_on" className="text-lg text-primary" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Modal: Register Provider Partner */}
        {isRegisterModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/40 space-y-4 animate-scaleIn">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-2">
                  <Icon name="add_business" className="text-primary text-xl" />
                  <h3 className="text-base font-bold text-on-surface">Onboard Diagnostic Facility</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-surface-container text-outline"
                >
                  <Icon name="close" className="text-lg" />
                </button>
              </div>

              <form onSubmit={handleRegisterPartner} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-on-surface block mb-1">Facility Legal Name:</label>
                  <input
                    type="text"
                    required
                    value={newCenterName}
                    onChange={(e) => setNewCenterName(e.target.value)}
                    placeholder="e.g. Lekki Phase 1 Radiology Center"
                    className="w-full rounded-xl border border-outline-variant/40 bg-surface px-3 py-2 text-on-surface"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1">Modality Domain:</label>
                    <select
                      value={newCenterCategory}
                      onChange={(e) => setNewCenterCategory(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant/40 bg-surface px-3 py-2 text-on-surface"
                    >
                      <option value="imaging">Advanced Dental Imaging (CBCT/OPG)</option>
                      <option value="pathology">Clinical Pathology & Bloods</option>
                      <option value="in-house">In-House Branch Suite</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-on-surface block mb-1">Lagos District:</label>
                    <input
                      type="text"
                      required
                      value={newCenterLocation}
                      onChange={(e) => setNewCenterLocation(e.target.value)}
                      placeholder="e.g. Victoria Island 1"
                      className="w-full rounded-xl border border-outline-variant/40 bg-surface px-3 py-2 text-on-surface"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-on-surface block mb-1">DHA Medical License Number:</label>
                  <input
                    type="text"
                    required
                    placeholder="DHA-FAC-XXXXX"
                    className="w-full rounded-xl border border-outline-variant/40 bg-surface px-3 py-2 text-on-surface font-mono"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                  <button
                    type="button"
                    onClick={() => setIsRegisterModalOpen(false)}
                    className="px-4 py-2 rounded-xl font-semibold bg-surface-container-low hover:bg-surface-container text-on-surface"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm"
                  >
                    Submit for DHA Verification
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer Navigation Strip */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <Icon name="hub" className="text-primary text-base" />
            <span className="font-semibold text-on-surface">Integrated PACS & Laboratory Hub:</span>
            <span className="text-on-surface-variant">Instant DICOM & HL7 integration across all verified providers.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/investigations/activity-access')}
              className="px-3.5 py-2 rounded-xl font-bold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="history" className="text-sm" />
              <span>Activity & Access (11.25)</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/investigations/templates')}
              className="px-3.5 py-2 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="clinical_notes" className="text-sm" />
              <span>Template Library (11.27)</span>
            </button>
          </div>
        </section>
      </div>
    </InvestigationShell>
  );
}

