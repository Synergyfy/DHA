import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function OrganisationEntryScreen() {
  const navigate = useNavigate();
  const [selectedPathway, setSelectedPathway] = useState<'new' | 'existing'>('new');
  const [existingId, setExistingId] = useState('');
  const [showIdInput, setShowIdInput] = useState(false);

  const handleContinue = () => {
    if (selectedPathway === 'new') {
      navigate('/clinic-onboarding/register');
    } else {
      if (!existingId.trim()) {
        setShowIdInput(true);
        return;
      }
      navigate('/clinic-onboarding/register?linked=' + encodeURIComponent(existingId));
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col text-on-surface antialiased selection:bg-primary-fixed-dim selection:text-primary">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center shadow-sm shadow-primary/20">
              <Icon name="corporate_fare" className="text-2xl" />
            </div>
            <div>
              <span className="font-heading font-bold text-base tracking-tight text-on-surface">DHA Health Facility Gateway</span>
              <p className="text-xs text-on-surface-variant">Dubai Health Authority &bull; Facility Statutory Enrollment</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-container/20 text-primary border border-primary/20">
              <Icon name="verified_user" className="text-sm" />
              Accredited Node
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center">
        {/* Title & Context */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/60 text-on-secondary-container text-xs font-semibold uppercase tracking-wider mb-3">
            <Icon name="badge" className="text-sm" />
            SEC 15.1 &bull; Organisation Registration
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-on-surface tracking-tight mb-3">
            Register or Link Your Healthcare Facility
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Begin the statutory accreditation process for dental clinics, hospitals, diagnostic centers, and specialist practices operating under DHA clinical governance standards.
          </p>
        </div>

        {/* Dual Pathway Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Option A: New to DHA */}
          <div
            onClick={() => {
              setSelectedPathway('new');
              setShowIdInput(false);
            }}
            className={`cursor-pointer relative rounded-2xl p-6 sm:p-8 transition-all duration-200 border-2 ${
              selectedPathway === 'new'
                ? 'border-primary bg-surface-container-lowest shadow-md ring-4 ring-primary/10'
                : 'border-outline-variant/40 bg-surface-container-low hover:border-outline-variant hover:bg-surface-container-lowest'
            }`}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon name="domain_add" className="text-3xl" />
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedPathway === 'new'
                    ? 'border-primary bg-primary text-white'
                    : 'border-outline-variant bg-transparent'
                }`}
              >
                {selectedPathway === 'new' && <Icon name="check" className="text-sm font-bold" />}
              </div>
            </div>

            <div className="mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">New Enrollment</span>
              <h3 className="text-xl font-heading font-bold text-on-surface">I am New to DHA</h3>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
              Establish a new healthcare organisation profile. Guided 6-step statutory onboarding for clinic owners, medical directors, and authorised corporate representatives.
            </p>

            <ul className="space-y-2.5 text-xs text-on-surface-variant/90 border-t border-outline-variant/30 pt-4">
              <li className="flex items-center gap-2">
                <Icon name="check_circle" className="text-secondary text-base shrink-0" />
                <span>Full CAC &amp; Regulatory Licensing Verification</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check_circle" className="text-secondary text-base shrink-0" />
                <span>Establish Multi-Operatory Practice Sites</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check_circle" className="text-secondary text-base shrink-0" />
                <span>Assign Staff Roles &amp; Clinical Privileges</span>
              </li>
            </ul>
          </div>

          {/* Option B: Already have DHA account */}
          <div
            onClick={() => setSelectedPathway('existing')}
            className={`cursor-pointer relative rounded-2xl p-6 sm:p-8 transition-all duration-200 border-2 ${
              selectedPathway === 'existing'
                ? 'border-primary bg-surface-container-lowest shadow-md ring-4 ring-primary/10'
                : 'border-outline-variant/40 bg-surface-container-low hover:border-outline-variant hover:bg-surface-container-lowest'
            }`}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container/50 text-secondary flex items-center justify-center">
                <Icon name="vpn_key" className="text-3xl" />
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedPathway === 'existing'
                    ? 'border-primary bg-primary text-white'
                    : 'border-outline-variant bg-transparent'
                }`}
              >
                {selectedPathway === 'existing' && <Icon name="check" className="text-sm font-bold" />}
              </div>
            </div>

            <div className="mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Fast-Track Setup</span>
              <h3 className="text-xl font-heading font-bold text-on-surface">I Already Have an Account</h3>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
              Connect to an existing licensed practitioner account (#DEN ID) or corporate group. Carries over pre-verified credentials and personal identity tokens.
            </p>

            <ul className="space-y-2.5 text-xs text-on-surface-variant/90 border-t border-outline-variant/30 pt-4">
              <li className="flex items-center gap-2">
                <Icon name="check_circle" className="text-secondary text-base shrink-0" />
                <span>Instant Practitioner License Auto-Populate</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check_circle" className="text-secondary text-base shrink-0" />
                <span>Fast-track 2-Minute Facility Registration</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check_circle" className="text-secondary text-base shrink-0" />
                <span>Unified Governance &amp; Second-Opinion Access</span>
              </li>
            </ul>

            {selectedPathway === 'existing' && (
              <div className="mt-5 p-3.5 bg-surface-container rounded-xl border border-outline-variant/40 space-y-2">
                <label className="text-xs font-semibold text-on-surface block">
                  Enter Professional License or Facility Ref
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Icon name="badge" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base" />
                    <input
                      type="text"
                      placeholder="e.g. DEN-78421 or FAC-1092"
                      value={existingId}
                      onChange={(e) => setExistingId(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setExistingId('DEN-78421')}
                    className="px-2.5 py-1 text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                  >
                    Use Demo
                  </button>
                </div>
                {showIdInput && !existingId && (
                  <p className="text-[11px] text-error flex items-center gap-1">
                    <Icon name="error" className="text-xs" /> Please enter your license ID or select New Enrollment.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Icon name="verified" className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">Tier 1–4 Licensing</p>
              <p className="text-[11px] text-on-surface-variant">Standardized tiers</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary-container/50 text-secondary flex items-center justify-center shrink-0">
              <Icon name="share_reviews" className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">Verified Referrals</p>
              <p className="text-[11px] text-on-surface-variant">Inter-clinic network</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-tertiary-container/30 text-tertiary flex items-center justify-center shrink-0">
              <Icon name="lock" className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">Digital Vault</p>
              <p className="text-[11px] text-on-surface-variant">Encrypted records</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-variant text-on-surface-variant flex items-center justify-center shrink-0">
              <Icon name="fact_check" className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">CAC Registry</p>
              <p className="text-[11px] text-on-surface-variant">Instant validation</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30">
          <div className="flex items-center gap-3 text-left">
            <Icon name="gavel" className="text-xl text-primary shrink-0" />
            <p className="text-xs text-on-surface-variant">
              Compliance with Federal Ministry of Health, MDCN, &amp; DHA Clinical Governance Guidelines (2026 Edition).
            </p>
          </div>
          <button
            type="button"
            onClick={handleContinue}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-white font-heading font-semibold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 shrink-0"
          >
            <span>{selectedPathway === 'new' ? 'Begin Facility Enrollment' : 'Continue with DHA Account'}</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>
        </div>
      </main>
    </div>
  );
}
