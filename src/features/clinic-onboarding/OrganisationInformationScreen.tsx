import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

export function OrganisationInformationScreen() {
  const navigate = useNavigate();

  // Form states
  const [legalName, setLegalName] = useState('Greenfield Dental Clinics Limited');
  const [tradingName, setTradingName] = useState('Greenfield Dental Clinic');
  const [yearEstablished, setYearEstablished] = useState('2018');
  const [taxId, setTaxId] = useState('24910842-0001');

  // Contact
  const [clinicEmail, setClinicEmail] = useState('info@greenfielddental.ng');
  const [primaryPhone, setPrimaryPhone] = useState('+234 803 555 0192');
  const [secondaryPhone, setSecondaryPhone] = useState('+234 812 900 4421');
  const [websiteUrl, setWebsiteUrl] = useState('https://www.greenfielddental.ng');

  // Address
  const [country, setCountry] = useState('Nigeria');
  const [stateName, setStateName] = useState('FCT Abuja');
  const [city, setCity] = useState('Abuja');
  const [streetAddress, setStreetAddress] = useState('Plot 1482, Cadastral Zone A07, Ademola Adetokunbo Crescent, Wuse 2');
  const [sameOperationalAddress, setSameOperationalAddress] = useState(true);
  const [operationalAddress, setOperationalAddress] = useState('');

  // Mission statement & scope
  const [missionStatement, setMissionStatement] = useState(
    'Greenfield Dental Clinic is dedicated to providing high-precision restorative, implant, and preventive dentistry utilizing digital workflows, sterile Class B autoclaves, and patient-centered clinical care.'
  );

  // Photo
  const [facadeUploaded, setFacadeUploaded] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/clinic-onboarding/representative-details');
  };

  return (
    <ClinicOnboardingShell
      currentStep={3}
      totalSteps={6}
      stepTitle="Organisation Information"
      stepCategory="Entity Profile"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <span>Stage 15.4</span> &bull; <span>Corporate Identity</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-on-surface">
            Organisation Legal &amp; Clinical Information
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Enter your healthcare facility's official registered corporate credentials, operational contacts, and physical practice premises.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1: Legal Entity Profile */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-4 shadow-sm">
            <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
              <Icon name="corporate_fare" className="text-primary text-base" />
              Corporate Identity &amp; Facade
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Official Registered Legal Entity Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Greenfield Dental Clinics Limited"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <span className="text-[10px] text-on-surface-variant mt-1 block">Must match Corporate Affairs Commission (CAC) certificate</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Trading Name / Brand Name (DBA) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Greenfield Dental Clinic"
                  value={tradingName}
                  onChange={(e) => setTradingName(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <span className="text-[10px] text-on-surface-variant mt-1 block">Public-facing brand name displayed to patients</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Year Established <span className="text-error">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1950"
                  max="2026"
                  value={yearEstablished}
                  onChange={(e) => setYearEstablished(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Federal Tax Identification Number (TIN) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 24910842-0001"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Facade Photo Upload */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Facility Signage &amp; Exterior Photo
              </label>
              {facadeUploaded ? (
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                      <Icon name="photo_camera" className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface">greenfield_clinic_facade.jpg</p>
                      <p className="text-[11px] text-on-surface-variant">1.8 MB &bull; Geotagged &bull; Verified</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFacadeUploaded(false)}
                      className="text-xs font-semibold text-error hover:underline px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setFacadeUploaded(true)}
                  className="cursor-pointer border-2 border-dashed border-outline-variant hover:border-primary rounded-xl p-5 text-center bg-surface-container-low/50 hover:bg-surface-container-low transition-colors"
                >
                  <Icon name="cloud_upload" className="text-3xl text-primary mb-1 mx-auto" />
                  <p className="text-xs font-semibold text-on-surface">Click to upload facility entrance photo</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">JPEG, PNG up to 5MB with clear building signage</p>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Contact Channels */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-4 shadow-sm">
            <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
              <Icon name="contact_phone" className="text-primary text-base" />
              Institutional Contact Channels
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Official Facility Email <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <Icon name="mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base" />
                  <input
                    type="email"
                    required
                    value={clinicEmail}
                    onChange={(e) => setClinicEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Primary Clinic Telephone <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <Icon name="phone" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base" />
                  <input
                    type="tel"
                    required
                    value={primaryPhone}
                    onChange={(e) => setPrimaryPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Secondary / Emergency Hotline
                </label>
                <div className="relative">
                  <Icon name="support_agent" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base" />
                  <input
                    type="tel"
                    value={secondaryPhone}
                    onChange={(e) => setSecondaryPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Official Website
                </label>
                <div className="relative">
                  <Icon name="language" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base" />
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Registered Legal Address */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-4 shadow-sm">
            <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
              <Icon name="location_on" className="text-primary text-base" />
              Registered Legal Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">Country</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">State / Territory</label>
                <input
                  type="text"
                  required
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">City / LGA</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Full Physical Street Address &amp; Cadastral Plot <span className="text-error">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Same address toggle */}
            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={sameOperationalAddress}
                  onChange={(e) => setSameOperationalAddress(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant"
                />
                <span className="text-xs font-medium text-on-surface">
                  Clinical operational premises address is identical to registered legal address
                </span>
              </label>
            </div>

            {!sameOperationalAddress && (
              <div className="mt-3 p-4 rounded-xl bg-surface-container-low border border-primary/20 space-y-2">
                <label className="block text-xs font-semibold text-on-surface">
                  Clinical Facility Physical Operating Address <span className="text-error">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Enter the actual physical clinic branch location..."
                  value={operationalAddress}
                  onChange={(e) => setOperationalAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Card 4: Clinical Mission Statement */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
                <Icon name="description" className="text-primary text-base" />
                Clinical Scope &amp; Mission Statement
              </h3>
              <span className={`text-[11px] ${missionStatement.length > 500 ? 'text-error font-bold' : 'text-on-surface-variant'}`}>
                {missionStatement.length} / 500 chars
              </span>
            </div>

            <textarea
              rows={3}
              maxLength={500}
              value={missionStatement}
              onChange={(e) => setMissionStatement(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="State your clinic's primary clinical vision, patient demographic focus, and commitment to evidence-based dental excellence..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/type-selection')}
              className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors"
            >
              Back
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
            >
              <span>Save &amp; Continue to Representative</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </div>
        </form>
      </div>
    </ClinicOnboardingShell>
  );
}
