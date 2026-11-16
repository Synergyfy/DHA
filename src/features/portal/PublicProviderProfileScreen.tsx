import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { findPublicProvider, type PublicProviderKind } from './publicProviders';
import { PublicSiteHeader } from './PublicSiteHeader';

interface PublicProviderProfileScreenProps {
  /** Route kind (`dentist-profile` vs `clinic-profile`) — used to catch mismatched links. */
  kind: PublicProviderKind;
}

/**
 * Public provider profile — Route:
 *   `/find-care/dentist-profile/:providerId`
 *   `/find-care/clinic-profile/:providerId`
 *
 * Anyone (signed out or signed in) can open a featured dentist or clinic from
 * the landing page's "View Profile" / "View Centre" links. Nothing here is
 * part of the patient dashboard.
 */
export const PublicProviderProfileScreen: React.FC<PublicProviderProfileScreenProps> = ({ kind }) => {
  const navigate = useNavigate();
  const { providerId } = useParams<{ providerId: string }>();
  const provider = findPublicProvider(providerId);
  const isClinic = (provider?.kind ?? kind) === 'clinic';

  if (!provider || provider.kind !== kind) {
    return (
      <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-['Inter'] flex flex-col antialiased">
        <PublicSiteHeader />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full text-center rounded-2xl bg-white border border-[#eaedff] p-10 shadow-sm">
            <Icon name="person_search" className="text-[36px] text-[#707881] mb-3" />
            <h1 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">Profile not found</h1>
            <p className="text-sm text-[#3f4850] mt-2">
              This provider profile may have moved. Browse the public directory to find verified dentists and clinics.
            </p>
            <button
              type="button"
              onClick={() => navigate('/portal/find-care')}
              className="mt-5 h-11 px-6 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9]"
            >
              Browse Find Care
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-['Inter'] flex flex-col antialiased">
      {/* Top Header — shared public-site header */}
      <PublicSiteHeader />

      <main className="flex-1 w-full pb-16">
        {/* Profile Hero */}
        <section className="bg-gradient-to-b from-[#f2f3ff] to-[#faf8ff] border-b border-[#eaedff]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <button
              type="button"
              onClick={() => navigate('/portal/find-care')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006194] hover:text-[#007bb9] mb-6 transition-colors"
            >
              <Icon name="arrow_back" className="text-[16px]" />
              <span>Back to Find Care</span>
            </button>

            <div className="flex flex-col md:flex-row gap-6 md:items-center">
              <div className="relative w-full md:w-56 h-48 md:h-56 rounded-3xl overflow-hidden bg-white border border-[#eaedff] shadow-sm shrink-0">
                <img src={provider.imageUrl} alt={provider.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                  <Icon name="verified" className="text-[14px]" />
                  {provider.badge}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold text-[#006a61] uppercase tracking-wider">
                  {isClinic ? 'Verified Dental Centre' : 'Verified Dental Practitioner'}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight">
                  {provider.name}
                </h1>
                <p className="text-sm font-medium text-[#006194]">{provider.specialty}</p>
                <p className="text-sm text-[#3f4850] flex items-center gap-1.5">
                  <Icon name="location_on" className="text-[16px] text-[#707881]" />
                  {provider.location}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#131b2e] bg-white border border-[#eaedff] px-3 py-1.5 rounded-full shadow-sm">
                    <Icon name="star" className="text-[14px] text-amber-500" filled={true} />
                    {provider.rating.toFixed(1)}{' '}
                    <span className="text-[#707881] font-medium">({provider.reviewsCount} reviews)</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#005049] bg-[#86f2e4]/25 border border-[#86f2e4]/50 px-3 py-1.5 rounded-full">
                    <Icon name={isClinic ? 'schedule' : 'event_available'} className="text-[14px]" />
                    {provider.availabilityLabel}: {provider.availability}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="h-11 px-6 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] shadow-sm transition-all active:scale-[0.98]"
                  >
                    Book Appointment
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/portal/find-care')}
                    className="h-11 px-6 rounded-xl bg-white border border-[#eaedff] text-[#006194] text-xs font-semibold hover:bg-[#f2f3ff] transition-colors"
                  >
                    Compare Other Providers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Details */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* About */}
          <div className="lg:col-span-2 rounded-2xl bg-white border border-[#eaedff] p-6 shadow-sm space-y-5">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">
                About {isClinic ? 'the Centre' : 'the Practitioner'}
              </h2>
              <p className="text-sm text-[#3f4850] leading-relaxed mt-2">{provider.about}</p>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">Services Offered</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {provider.services.map((service) => (
                  <span
                    key={service}
                    className="text-xs font-medium text-[#006194] bg-[#f2f3ff] border border-[#eaedff] px-3 py-1.5 rounded-lg"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">Verified Credentials</h2>
              <ul className="space-y-2 mt-3">
                {provider.credentials.map((credential) => (
                  <li key={credential} className="flex items-start gap-2 text-sm text-[#3f4850]">
                    <Icon name="verified" className="text-[16px] text-[#006a61] mt-0.5 shrink-0" />
                    <span>{credential}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hours & booking */}
          <div className="rounded-2xl bg-white border border-[#eaedff] p-6 shadow-sm flex flex-col gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">
                {isClinic ? 'Opening Hours' : 'Consultation Hours'}
              </h2>
              <ul className="space-y-2 mt-3">
                {provider.hours.map((line) => (
                  <li key={line} className="text-sm text-[#3f4850] flex items-start gap-2">
                    <Icon name="schedule" className="text-[16px] text-[#006194] mt-0.5 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff]">
              <p className="text-xs text-[#3f4850] leading-relaxed">
                Booking, records and follow-ups are shared with this provider only after you sign in and give explicit
                consent.
              </p>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="mt-3 w-full h-10 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9]"
              >
                Sign In to Book
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f2f3ff] border-t border-[#eaedff] py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#707881]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#006194] flex items-center justify-center text-white">
              <Icon name="dentistry" className="text-[14px]" />
            </div>
            <span className="font-semibold text-[#131b2e]">DHA Dental Health Authority</span>
          </div>
          <span>&copy; 2026 DHA. All rights reserved. Public Provider Directory.</span>
        </div>
      </footer>
    </div>
  );
};
