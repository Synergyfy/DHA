import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PortalShell } from './PortalShell';
import { Icon } from '../../design/Primitives';

type FamilyMember = 'sarah' | 'zayd' | 'layla';

export function FamilyCareScreen() {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<FamilyMember>('sarah');
  const [isPreparing, setIsPreparing] = useState(false);

  const handleAccountCreation = () => {
    setIsPreparing(true);
    setTimeout(() => {
      navigate('/register');
    }, 700);
  };

  return (
    <PortalShell pageTitle="Family Oral Health">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-8">
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold uppercase tracking-wider">
              <Icon name="family_restroom" className="text-[14px]" />
              <span>Household Continuity</span>
            </span>
            <span className="text-xs text-on-surface-variant font-medium">• Empathetic Family Care</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs text-secondary font-semibold">Unified Patient Charts</span>
          </div>
        </div>

        {/* 2-Column Responsive Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Story & Mission (7 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            {/* Visual Story Card */}
            <div className="relative overflow-hidden rounded-2xl shadow-sm bg-surface-container-lowest">
              <div className="relative h-60 sm:h-72 lg:h-80 w-full overflow-hidden">
                <img
                  alt="African father and young son cheerfully brushing teeth together in a warm, naturally lit bathroom mirror"
                  className="w-full h-full object-cover object-center"
                  src="https://lh3.googleusercontent.com/aida/ALJJyrC22eZO2PwwBUK7THnMy8IP-wA7CyF2goNSFpbY8_7cLvY4ueX-xIQXddribGZ5EBVVdkkYe5dC6sEDGj8O47znWLM79mlYn1yB5_OtBySws1WpSEOyND9qiAsHXj4sAABPyVBDdEl6QeKs6BgJOOqVAqu2NOA6YIy6b9eEHN4spKpa8r0f7VCzC30JnvZ2KjaTu2OXprwbNuWacL1-4Ck0UDLdSkE16Qcl5PvfWcKHUA"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] uppercase tracking-wider font-semibold">
                      <Icon name="family_restroom" className="text-[14px]" />
                      <span>Household Continuity</span>
                    </span>
                    <p className="text-base sm:text-lg font-bold text-surface-bright drop-shadow-sm">
                      Empathetic Family Care
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-bright/20 backdrop-blur-md flex items-center justify-center text-surface-bright shrink-0">
                    <Icon name="health_and_safety" className="text-[22px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Typography & Mission */}
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
                Your Family's Oral Health Matters
              </h1>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Whether you are managing your own dental health or looking after your children's oral health, DHA helps you keep relevant information organised and access the care you need.
              </p>
            </div>

            {/* Benefit Features List */}
            <div className="space-y-3">
              {/* Item 1 */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20 hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex-shrink-0 flex items-center justify-center text-primary shadow-xs">
                  <Icon name="verified" filled className="text-[20px]" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h2 className="text-sm font-semibold text-on-surface">Manage your own patient profile</h2>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Track restorative treatments, routine cleanings, and digital dental X-rays with verifiable clinical notes.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20 hover:border-secondary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex-shrink-0 flex items-center justify-center text-secondary shadow-xs">
                  <Icon name="child_care" filled className="text-[20px]" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h2 className="text-sm font-semibold text-on-surface">Create and manage profiles for children</h2>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Organise paediatric check-ups, preventive sealants, and school screening records under your guardian account.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20 hover:border-tertiary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex-shrink-0 flex items-center justify-center text-tertiary shadow-xs">
                  <Icon name="shield_with_heart" filled className="text-[20px]" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h2 className="text-sm font-semibold text-on-surface">Distinct histories for everyone</h2>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Keep each family member's records, reminders and care history separate and securely backed up.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Household Oral Hub Widget (5 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6">
            {/* Interactive Household Oral Hub Widget */}
            <div className="rounded-2xl bg-surface-container-lowest p-5 sm:p-6 shadow-sm border border-outline-variant/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="hub" className="text-primary text-[22px]" />
                  <span className="text-sm sm:text-base font-bold text-on-surface">Household Oral Hub Preview</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-semibold">
                  3 Connected Profiles
                </span>
              </div>

              {/* Member Selector Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container rounded-xl" role="tablist">
                <button
                  type="button"
                  onClick={() => setSelectedMember('sarah')}
                  role="tab"
                  aria-selected={selectedMember === 'sarah'}
                  className={`py-2 px-1 text-center rounded-lg text-xs transition-all duration-200 flex flex-col items-center gap-0.5 ${
                    selectedMember === 'sarah'
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="truncate w-full">Sarah</span>
                  <span className="text-[10px] text-on-surface-variant font-medium">Guardian</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMember('zayd')}
                  role="tab"
                  aria-selected={selectedMember === 'zayd'}
                  className={`py-2 px-1 text-center rounded-lg text-xs transition-all duration-200 flex flex-col items-center gap-0.5 ${
                    selectedMember === 'zayd'
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="truncate w-full">Zayd (9y)</span>
                  <span className="text-[10px] text-error font-semibold">Due Soon</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMember('layla')}
                  role="tab"
                  aria-selected={selectedMember === 'layla'}
                  className={`py-2 px-1 text-center rounded-lg text-xs transition-all duration-200 flex flex-col items-center gap-0.5 ${
                    selectedMember === 'layla'
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="truncate w-full">Layla (4y)</span>
                  <span className="text-[10px] text-secondary font-semibold">New Patient</span>
                </button>
              </div>

              {/* Member Details Cards */}
              <div className="relative">
                {selectedMember === 'sarah' && (
                  <div className="p-4 rounded-xl bg-surface-container-low space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-sm font-bold shadow-xs">
                          SA
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">Ngozi Eze</p>
                          <p className="text-xs text-on-surface-variant">Primary Adult Profile</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-semibold flex items-center gap-1">
                        <Icon name="check_circle" filled className="text-[12px]" />
                        <span>Routine Care OK</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2.5 rounded-lg bg-surface-container-lowest shadow-2xs">
                        <span className="text-[10px] text-on-surface-variant block">Last Prophylaxis</span>
                        <span className="text-xs font-semibold text-on-surface">3 months ago</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface-container-lowest shadow-2xs">
                        <span className="text-[10px] text-on-surface-variant block">Recare Interval</span>
                        <span className="text-xs font-semibold text-on-surface">Oct 2024</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-on-surface-variant text-xs pt-1 border-t border-outline-variant/20">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Icon name="verified_user" className="text-[14px] text-secondary" />
                        <span>14 records synchronized</span>
                      </span>
                      <NavLink to="/portal/journey" className="text-primary font-semibold hover:underline flex items-center gap-0.5 text-xs">
                        <span>View Odontogram</span>
                        <Icon name="arrow_forward" className="text-[14px]" />
                      </NavLink>
                    </div>
                  </div>
                )}

                {selectedMember === 'zayd' && (
                  <div className="p-4 rounded-xl bg-surface-container-low space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed text-sm font-bold shadow-xs">
                          ZA
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">Zayd Okoye</p>
                          <p className="text-xs text-on-surface-variant">Child Profile • Age 9</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-semibold flex items-center gap-1">
                        <Icon name="notification_important" className="text-[12px]" />
                        <span>Sealant Due</span>
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container-lowest flex items-center justify-between shadow-2xs">
                      <div className="space-y-0.5">
                        <span className="text-xs text-error font-semibold block">Molar Sealant Evaluation</span>
                        <p className="text-[11px] text-on-surface-variant">Tooth #19 &amp; #30 recommended inspection</p>
                      </div>
                      <Icon name="event_upcoming" className="text-primary text-[22px]" />
                    </div>

                    <div className="flex items-center justify-between text-on-surface-variant text-xs pt-1 border-t border-outline-variant/20">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Icon name="school" className="text-[14px] text-primary" />
                        <span>School Oral Pass Active</span>
                      </span>
                      <NavLink to="/portal/family-care" className="text-primary font-semibold hover:underline flex items-center gap-0.5 text-xs">
                        <span>Schedule Check</span>
                        <Icon name="arrow_forward" className="text-[14px]" />
                      </NavLink>
                    </div>
                  </div>
                )}

                {selectedMember === 'layla' && (
                  <div className="p-4 rounded-xl bg-surface-container-low space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed text-sm font-bold shadow-xs">
                          LA
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">Aisha Okoye</p>
                          <p className="text-xs text-on-surface-variant">Toddler Profile • Age 4</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-semibold flex items-center gap-1">
                        <Icon name="star" className="text-[12px]" />
                        <span>First Visit</span>
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container-lowest flex items-center justify-between shadow-2xs">
                      <div className="space-y-0.5">
                        <span className="text-xs text-secondary font-semibold block">Primary Dentition Check</span>
                        <p className="text-[11px] text-on-surface-variant">Fluoride varnish &amp; friendly visual exam</p>
                      </div>
                      <Icon name="sentiment_satisfied" className="text-secondary text-[22px]" />
                    </div>

                    <div className="flex items-center justify-between text-on-surface-variant text-xs pt-1 border-t border-outline-variant/20">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Icon name="child_friendly" className="text-[14px] text-secondary" />
                        <span>Gentle First Visit Toolkit</span>
                      </span>
                      <NavLink to="/portal/find-care" className="text-primary font-semibold hover:underline flex items-center gap-0.5 text-xs">
                        <span>Book Screening</span>
                        <Icon name="arrow_forward" className="text-[14px]" />
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reassurance Banner */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0 mt-0.5">
                <Icon name="lock" className="text-[18px]" />
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                All family member charts maintain standalone encrypted records in compliance with clinical privacy standards. Guardian consent can be transferred or co-managed at any time.
              </p>
            </div>

            {/* Primary Action Card */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 space-y-3">
              <button
                type="button"
                onClick={handleAccountCreation}
                disabled={isPreparing}
                className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-75"
              >
                {isPreparing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-on-primary border-t-transparent animate-spin" />
                    <span>Preparing Secure Setup...</span>
                  </>
                ) : (
                  <>
                    <span>Create Your Patient Account</span>
                    <Icon name="arrow_forward" className="text-[18px]" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-on-surface-variant">
                Already have a DHA profile?{' '}
                <NavLink to="/login" className="text-primary font-semibold hover:underline">
                  Log in here
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

