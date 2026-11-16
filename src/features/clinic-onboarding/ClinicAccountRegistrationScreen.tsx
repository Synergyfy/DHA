import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

export function ClinicAccountRegistrationScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const linkedParam = searchParams.get('linked');

  // Form states
  const [fullName, setFullName] = useState(linkedParam ? 'Dr. Amina Bello' : '');
  const [email, setEmail] = useState(linkedParam ? 'amina.bello@greenfielddental.ng' : '');
  const [phoneCode, setPhoneCode] = useState('+234');
  const [phone, setPhone] = useState(linkedParam ? '803 555 0192' : '');
  const [relationship, setRelationship] = useState('medical_director');
  const [customRelationship, setCustomRelationship] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [governanceAffirmed, setGovernanceAffirmed] = useState(false);
  const [isLinked, setIsLinked] = useState(Boolean(linkedParam));

  // Email corporate domain check
  const isCorporateEmail = useMemo(() => {
    if (!email || !email.includes('@')) return null;
    const domain = email.split('@')[1]?.toLowerCase() || '';
    const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    if (freeDomains.includes(domain)) return false;
    return domain.length > 3 && domain.includes('.');
  }, [email]);

  // Password rules
  const rules = useMemo(() => {
    return {
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSymbol: /[^A-Za-z0-9]/.test(password),
    };
  }, [password]);

  const strengthScore = useMemo(() => {
    let score = 0;
    if (rules.minLength) score++;
    if (rules.hasUpper) score++;
    if (rules.hasNumber) score++;
    if (rules.hasSymbol) score++;
    return score;
  }, [rules]);

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const canSubmit =
    fullName.trim().length > 2 &&
    email.trim().length > 4 &&
    phone.trim().length > 6 &&
    strengthScore >= 3 &&
    passwordsMatch &&
    governanceAffirmed;

  const handleLinkExisting = () => {
    setIsLinked(true);
    setFullName('Dr. Amina Bello');
    setEmail('amina.bello@greenfielddental.ng');
    setPhone('803 555 0192');
    setRelationship('medical_director');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate('/clinic-onboarding/type-selection');
  };

  return (
    <ClinicOnboardingShell
      currentStep={1}
      totalSteps={6}
      stepTitle="Account & Representative"
      stepCategory="Representative Identity"
    >
      <div className="max-w-2xl mx-auto">
        {/* Banner: Fast track if holding #DEN record */}
        <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Icon name="verified" className="text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">Hold an active Practitioner (#DEN) ID?</p>
              <p className="text-[11px] text-on-surface-variant">
                Link your licensed dentist profile to automatically fill certified practitioner credentials.
              </p>
            </div>
          </div>
          {!isLinked ? (
            <button
              type="button"
              onClick={handleLinkExisting}
              className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors shrink-0"
            >
              Link #DEN
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary px-2.5 py-1 bg-secondary-container/50 rounded-lg shrink-0">
              <Icon name="check_circle" className="text-sm" /> Linked #DEN-78421
            </span>
          )}
        </div>

        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <span>Stage 15.2</span> &bull; <span>Corporate Representative</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-on-surface">
            Establish Representative Profile
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Provide the identity details of the designated legal representative or clinical director empowered to act on behalf of the facility.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1: Principal Representative Details */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-4 shadow-sm">
            <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
              <Icon name="person" className="text-primary text-base" />
              Representative Identity
            </h3>

            {/* Legal Full Name */}
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Legal Full Name <span className="text-error">*</span>
              </label>
              <div className="relative">
                <Icon name="badge" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Amina Bello or Ibrahim Hassan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Corporate Email with validation badge */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-on-surface">
                  Corporate / Official Email <span className="text-error">*</span>
                </label>
                {isCorporateEmail === true && (
                  <span className="text-[11px] font-semibold text-secondary flex items-center gap-1">
                    <Icon name="verified" className="text-xs" /> Corporate Domain Recognized
                  </span>
                )}
                {isCorporateEmail === false && (
                  <span className="text-[11px] font-medium text-amber-600 flex items-center gap-1">
                    <Icon name="info" className="text-xs" /> Public webmail used (official clinic domain recommended)
                  </span>
                )}
              </div>
              <div className="relative">
                <Icon name="mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base" />
                <input
                  type="email"
                  required
                  placeholder="name@clinicdomain.com or info@facility.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Telephone Number */}
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Direct Contact Mobile <span className="text-error">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  className="w-28 px-2 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="+234">+234 (NG)</option>
                </select>
                <div className="relative flex-1">
                  <Icon name="phone" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base" />
                  <input
                    type="tel"
                    required
                    placeholder="803 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Institutional Relationship */}
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Legal Relationship to Facility <span className="text-error">*</span>
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="medical_director">Medical Director &bull; Statutory Clinician Lead</option>
                <option value="owner">Practice Owner / Founder / Principal Partner</option>
                <option value="operations_manager">Operations Manager / Chief Administrator</option>
                <option value="legal_rep">Authorised Corporate Representative / Legal Counsel</option>
                <option value="other">Other Appointed Officer</option>
              </select>

              {relationship === 'other' && (
                <div className="mt-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Specify exact designation and title"
                    value={customRelationship}
                    onChange={(e) => setCustomRelationship(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Portal Passphrase & Security */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-4 shadow-sm">
            <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
              <Icon name="lock" className="text-primary text-base" />
              Portal Access Passphrase
            </h3>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Passphrase <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Choose an institutional passphrase"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-lg" />
                </button>
              </div>
            </div>

            {/* Password strength meter */}
            {password.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-on-surface-variant">Complexity:</span>
                  <span
                    className={`font-semibold ${
                      strengthScore <= 1
                        ? 'text-error'
                        : strengthScore <= 3
                        ? 'text-amber-600'
                        : 'text-secondary'
                    }`}
                  >
                    {strengthScore <= 1 ? 'Weak' : strengthScore <= 3 ? 'Good' : 'Strong'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 h-1.5 rounded-full overflow-hidden bg-surface-container">
                  <div className={`h-full ${strengthScore >= 1 ? 'bg-primary' : 'bg-transparent'}`} />
                  <div className={`h-full ${strengthScore >= 2 ? 'bg-primary' : 'bg-transparent'}`} />
                  <div className={`h-full ${strengthScore >= 3 ? 'bg-primary' : 'bg-transparent'}`} />
                  <div className={`h-full ${strengthScore >= 4 ? 'bg-secondary' : 'bg-transparent'}`} />
                </div>
                {/* Rules Checklist */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className={`flex items-center gap-1.5 ${rules.minLength ? 'text-secondary font-medium' : 'text-on-surface-variant'}`}>
                    <Icon name={rules.minLength ? 'check_circle' : 'circle'} className="text-xs" />
                    <span>8+ characters</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${rules.hasUpper ? 'text-secondary font-medium' : 'text-on-surface-variant'}`}>
                    <Icon name={rules.hasUpper ? 'check_circle' : 'circle'} className="text-xs" />
                    <span>1 uppercase letter</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${rules.hasNumber ? 'text-secondary font-medium' : 'text-on-surface-variant'}`}>
                    <Icon name={rules.hasNumber ? 'check_circle' : 'circle'} className="text-xs" />
                    <span>1 numeric digit</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${rules.hasSymbol ? 'text-secondary font-medium' : 'text-on-surface-variant'}`}>
                    <Icon name={rules.hasSymbol ? 'check_circle' : 'circle'} className="text-xs" />
                    <span>1 symbol / punctuation</span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Confirm Passphrase <span className="text-error">*</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Confirm passphrase"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-[11px] text-error mt-1 flex items-center gap-1">
                  <Icon name="error" className="text-xs" /> Passphrases do not match.
                </p>
              )}
            </div>
          </div>

          {/* Statutory Solemn Affirmation */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={governanceAffirmed}
                onChange={(e) => setGovernanceAffirmed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant"
              />
              <span className="text-xs text-on-surface-variant leading-relaxed">
                I solemnly declare that I am authorized by the entity's governing board or principal partners to register this facility on the DHA platform and accept clinical governance terms.
              </span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/entry')}
              className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`px-6 py-2.5 rounded-xl font-heading font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md ${
                canSubmit
                  ? 'bg-primary text-white hover:bg-primary/90 shadow-primary/20'
                  : 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed shadow-none'
              }`}
            >
              <span>Continue to Entity Type</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </div>
        </form>
      </div>
    </ClinicOnboardingShell>
  );
}
