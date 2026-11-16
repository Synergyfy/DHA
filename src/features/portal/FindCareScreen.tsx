import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PortalShell } from './PortalShell';
import { Icon } from '../../design/Primitives';

type CategoryFilter = 'all' | 'general' | 'paediatric' | 'orthodontics' | 'surgery';

interface ProviderItem {
  id: string;
  name: string;
  role: string;
  category: 'general' | 'paediatric' | 'orthodontics' | 'surgery';
  dhaNumber: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  isVerified: boolean;
  nextSlot: string;
  slotTag: string;
  isClinic?: boolean;
  location?: string;
  practitionersCount?: number;
  /** Public profile slug (see `publicProviders.ts`) opened by View Profile / Book Slot. */
  publicProfileId: string;
}

const PROVIDERS_DATA: ProviderItem[] = [
  {
    id: 'prov-1',
    publicProfileId: 'farouk-Okafor',
    name: 'Dr. Chinedu Okafor',
    role: 'Paediatric & General Specialist',
    category: 'paediatric',
    dhaNumber: 'DHA #48912',
    rating: 4.9,
    reviewsCount: 124,
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrB5Fh5Z4sSivDOwoz5udceVl1zMwb6p9qFM2yCLKg9yhQ10zfb_h4r-W9uDb7rmu9yo-AuSih3N2GqYUuEcjkBl1ZMocgBhdSrrjvWKC3P7JC9POH0qetd7y9eGnCzh5b-B2oThvts1nMDawQUTqYzpmqj5d4Mq_Uc7560oa2AnotqsObZ4a74ziOfemyPXd0tU9X0IBnOXS6wd7VhXPck2xZ_pZgTJcqCviTcCVic',
    isVerified: true,
    nextSlot: 'Tomorrow 10:00 AM',
    slotTag: 'Fast-Track',
  },
  {
    id: 'prov-2',
    publicProfileId: 'reem-Nwosu',
    name: 'Dr. Reem Nwosu',
    role: 'Consultant Orthodontist',
    category: 'orthodontics',
    dhaNumber: 'DHA #51204',
    rating: 5.0,
    reviewsCount: 98,
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrD31ppAHvEd2CGLC4CN9AES9bcs_wBcFixmKwUFtaj_5PSPU6CVXXZHw6j7v7C4_sbNtrzknzONtUTBKp_SG7zKSNdMg_kqm9yu6lh36QI1XFaoYkm_wdeKLljiZwSxLx0Ahs01s7poa2g80QTy4P5UuF7uABUj_3Q79RtgsolL78gjIedWICsZ1b6LYfkX-Ucaj8y6WJVrk-EzAESur7BtjEQ-4xEHfuHsgV_qm2B1AA',
    isVerified: true,
    nextSlot: 'Today 4:00 PM',
    slotTag: 'Same Day',
  },
  {
    id: 'prov-3',
    publicProfileId: 'Bello-dental-hub',
    name: 'Lagos Smile Dental Centre',
    role: 'Multi-Speciality Centre (General, Cosmetic, Surgery)',
    category: 'general',
    dhaNumber: 'DHA Facility #9021',
    rating: 4.8,
    reviewsCount: 310,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8zADe8I0laqW0tE8uvNrafsAbjbXTBBF2_I3baxK_AImmUeZqpBIodu7j6a7MVN-jZZ6qO5KyK0htQWZnRATNaZF_UNKuk6wTOgGN0-Yb0XYd3cUIAxGCOVc6DziFJJthFZyCN2w8cngdpQ5imMe8wtSGBeZM24m9B7MrvSR5dfluHWBMIHqM7KEUrbUJt2LljHqbXDmm0BpVbczEsMvIMswOzA5_YTE0D_vwV8fE',
    isVerified: true,
    isClinic: true,
    location: 'Ikeja, Lagos',
    practitionersCount: 10,
    nextSlot: 'Available Daily',
    slotTag: 'Walk-ins OK',
  },
];

export function FindCareScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

  const filteredProviders = PROVIDERS_DATA.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory || (selectedCategory === 'surgery' && p.isClinic);
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PortalShell pageTitle="Find Dental Care">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-6">
        {/* Top Authority Header & Brand Aura */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold uppercase tracking-wider shadow-2xs self-start">
              <Icon name="verified" filled className="text-[14px]" />
              <span>Verified DHA Network</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Live Provider Directory • 1,200+ Licensed Clinics</span>
            </div>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
              Find Dental Care on DHA
            </h1>
            <p className="text-sm sm:text-base text-on-surface-variant mt-1 leading-relaxed">
              Discover dentists and dental clinics on DHA. Explore their services, specialities, available information and verified appointment options across Lagos.
            </p>
          </div>

          {/* Official Notice Advisory Bar */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container text-on-surface border border-outline-variant/30">
            <Icon name="info" className="text-primary text-[20px] shrink-0 mt-0.5" />
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface font-semibold">Important Notice:</strong> Initial discovery includes DHA registered and accredited providers only. Every practitioner maintains an active license verification code.
            </p>
          </div>
        </div>

        {/* Interactive Search and Filters Section */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/30 space-y-3">
          {/* Search Bar */}
          <div className="relative flex items-center w-full">
            <Icon name="search" className="absolute left-3.5 text-on-surface-variant text-[20px] pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by dentist, clinic, or procedure..."
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-surface-container-low text-on-surface text-xs sm:text-sm shadow-2xs placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-on-surface-variant hover:text-on-surface"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            )}
          </div>

          {/* Filter Pills Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              <Icon name="dentistry" className="text-[15px]" />
              <span>All Care</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('general')}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === 'general'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              General Dentistry
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('paediatric')}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === 'paediatric'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              Paediatric
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('orthodontics')}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === 'orthodontics'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              Orthodontics
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('surgery')}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === 'surgery'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              Surgery &amp; Hospitals
            </button>
          </div>
        </div>

        {/* Featured Provider Cards: Responsive Grid (1 col on mobile, 2 on md, 3 on lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProviders.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/30 space-y-2">
              <Icon name="search_off" className="text-[32px] text-on-surface-variant" />
              <p className="text-sm font-semibold text-on-surface">No providers match your search</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredProviders.map((item) => (
              <div
                key={item.id}
                className="provider-card flex flex-col justify-between rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div>
                  {item.isClinic ? (
                    /* Clinic Showcase Header */
                    <div className="relative w-full h-36 bg-surface-container overflow-hidden">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/30 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-secondary text-[10px] uppercase font-bold shadow-xs">
                          <Icon name="apartment" className="text-[12px]" />
                          <span>Clinic Centre</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-highest/95 backdrop-blur-md text-on-surface text-[10px] font-semibold">
                          <Icon name="check_circle" className="text-[12px] text-secondary" />
                          <span>Accredited</span>
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-on-primary">
                        <div>
                          <h3 className="text-sm font-bold drop-shadow-sm">{item.name}</h3>
                          <p className="text-[11px] opacity-90 flex items-center gap-1">
                            <Icon name="location_on" className="text-[13px]" />
                            <span>{item.location}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-surface-container-lowest/90 px-2 py-0.5 rounded-lg text-on-surface shadow-xs">
                          <Icon name="star" filled className="text-amber-500 text-[13px]" />
                          <span className="text-xs font-bold leading-none">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Individual Practitioner Card Header */
                    <div className="p-4 flex gap-3 items-start">
                      <div className="relative shrink-0">
                        <img
                          alt={item.name}
                          src={item.imageUrl}
                          className="w-16 h-18 sm:w-18 sm:h-20 rounded-xl object-cover object-top shadow-xs bg-surface-container"
                        />
                        <div
                          className="absolute -bottom-1 -right-1 bg-secondary text-on-secondary rounded-full p-0.5 shadow-xs"
                          title="Verified Practitioner"
                        >
                          <Icon name="verified" filled className="text-[12px] block" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-center justify-between gap-1">
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold">
                            Verified
                          </span>
                          <span className="text-on-surface-variant text-[10px] font-mono">{item.dhaNumber}</span>
                        </div>
                        <h3 className="text-sm font-bold text-on-surface mt-1 truncate">{item.name}</h3>
                        <p className="text-xs text-on-surface-variant truncate">{item.role}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="flex items-center gap-1 text-on-surface">
                            <Icon name="star" filled className="text-amber-500 text-[14px]" />
                            <span className="text-xs font-bold">{item.rating}</span>
                          </div>
                          <span className="text-outline text-xs">•</span>
                          <span className="text-on-surface-variant text-xs">{item.reviewsCount} reviews</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Clinic extra details strip */}
                  {item.isClinic && (
                    <div className="p-3 border-b border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                      <span>{item.practitionersCount} licensed DHA practitioners</span>
                      <span className="font-semibold text-on-surface">{item.reviewsCount} reviews</span>
                    </div>
                  )}

                  {/* Live Availability Strip */}
                  <div className="px-4 py-2 bg-surface-container-low flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-on-surface text-xs font-medium">
                      <Icon name="calendar_clock" className="text-primary text-[16px]" />
                      <span>
                        Next Slot: <span className="font-semibold text-primary">{item.nextSlot}</span>
                      </span>
                    </div>
                    <span className="text-secondary text-[10px] font-semibold bg-surface-container-lowest px-2 py-0.5 rounded-full shadow-2xs">
                      {item.slotTag}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-3 bg-surface-container-lowest grid grid-cols-2 gap-2 border-t border-outline-variant/20">
                  <NavLink
                    to={`/find-care/${item.isClinic ? 'clinic' : 'dentist'}-profile/${item.publicProfileId}`}
                    className="w-full py-2 px-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                  >
                    <Icon name={item.isClinic ? 'medical_services' : 'badge'} className="text-[16px]" />
                    <span>View Profile</span>
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => navigate(`/find-care/${item.isClinic ? 'clinic' : 'dentist'}-profile/${item.publicProfileId}`)}
                    className="w-full py-2 px-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1 active:scale-95"
                  >
                    <Icon name="event_available" className="text-[16px]" />
                    <span>Book Slot</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold">Looking for a clinic in your neighborhood?</h3>
            <p className="text-xs sm:text-sm text-on-primary/90">
              Browse interactive map coordinates and filter by sub-specialty across Lagos.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/portal/find-care')}
            className="px-5 py-2.5 rounded-xl bg-surface-container-lowest text-primary text-xs sm:text-sm font-semibold shadow-sm hover:bg-surface-container-low transition-all active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Icon name="explore" className="text-[18px]" />
            <span>Open Map Directory</span>
          </button>
        </div>
      </div>
    </PortalShell>
  );
}

