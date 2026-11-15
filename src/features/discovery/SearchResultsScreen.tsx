import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { DiscoverySubNav } from './DiscoverySubNav';
import { Icon } from '../../design/Primitives';

type ProviderTypeFilter = 'all' | 'dentist' | 'clinic';
type SortOption = 'recommended' | 'rating' | 'distance' | 'earliest';

export function SearchResultsScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || 'Orthodontist';
  const initialLoc = searchParams.get('loc') || 'Oud Metha & Jumeirah';

  const [query, setQuery] = useState(initialQuery);
  const [providerType, setProviderType] = useState<ProviderTypeFilter>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [distanceFilter, setDistanceFilter] = useState<'any' | '5km' | '10km'>('5km');
  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  const sortLabels: Record<SortOption, string> = {
    recommended: 'Recommended (DHA Quality Score)',
    rating: 'Highest Rated (4.8+ Stars)',
    distance: 'Nearest Distance (Proximity)',
    earliest: 'Earliest Available Slot',
  };

  const handleResetFilters = () => {
    setQuery('');
    setProviderType('all');
    setVerifiedOnly(false);
    setDistanceFilter('any');
    setSimulateEmpty(false);
  };

  return (
    <DashboardShell pageTitle="Search DHA Dental Registry">
      <DiscoverySubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Search Control Bar */}
        <section className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-sm space-y-4">
          {/* Query Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Icon
                name="search"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dentist, clinic, treatment, or specialty..."
                className="w-full h-12 pl-10 pr-10 bg-surface-container-low focus:bg-white text-on-surface font-body-md rounded-2xl border border-outline-variant/40 focus:border-primary focus:outline-none transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
                  aria-label="Clear search query"
                >
                  <Icon name="close" className="text-[16px]" />
                </button>
              )}
            </div>

            {/* View Mode Segment: List vs Map */}
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-2xl shrink-0 border border-outline-variant/30 w-full sm:w-auto justify-center">
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-surface-container-lowest text-primary font-title-sm font-semibold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Icon name="view_list" className="text-[18px]" />
                <span>List</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/patient-dashboard/discovery/map')}
                className="px-4 py-2 rounded-xl text-on-surface-variant hover:text-on-surface font-title-sm font-semibold flex items-center gap-1.5 transition-all"
              >
                <Icon name="map" className="text-[18px]" />
                <span>Map</span>
              </button>
            </div>
          </div>

          {/* Horizontal Filter Chips Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-label-md">
            {/* Provider Type Toggle */}
            <div className="flex items-center bg-surface-container-low rounded-xl p-0.5 border border-outline-variant/30 shrink-0">
              <button
                type="button"
                onClick={() => setProviderType('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  providerType === 'all'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                All (4)
              </button>
              <button
                type="button"
                onClick={() => setProviderType('dentist')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  providerType === 'dentist'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Dentists
              </button>
              <button
                type="button"
                onClick={() => setProviderType('clinic')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  providerType === 'clinic'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Clinics
              </button>
            </div>

            {/* Verified Only Chip */}
            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 shrink-0 transition-colors font-semibold ${
                verifiedOnly
                  ? 'bg-secondary-container/40 border-secondary text-on-secondary-container'
                  : 'bg-surface-container-lowest border-outline-variant/40 text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <Icon name="verified" className="text-[16px] text-secondary" />
              <span>DHA Verified Only</span>
              {verifiedOnly && <Icon name="check" className="text-[14px]" />}
            </button>

            {/* Distance Filter */}
            <button
              type="button"
              onClick={() =>
                setDistanceFilter(distanceFilter === '5km' ? '10km' : distanceFilter === '10km' ? 'any' : '5km')
              }
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 shrink-0 transition-colors font-semibold ${
                distanceFilter !== 'any'
                  ? 'bg-primary-fixed border-primary text-on-primary-fixed'
                  : 'bg-surface-container-lowest border-outline-variant/40 text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <Icon name="near_me" className="text-[16px]" />
              <span>{distanceFilter === 'any' ? 'Any Distance' : `< ${distanceFilter}`}</span>
            </button>

            {/* Simulated Empty State Tester */}
            <button
              type="button"
              onClick={() => setSimulateEmpty(!simulateEmpty)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 shrink-0 transition-colors font-semibold ${
                simulateEmpty
                  ? 'bg-error-container border-error text-on-error-container'
                  : 'bg-surface-container-lowest border-outline-variant/40 text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <Icon name="filter_alt_off" className="text-[16px]" />
              <span>{simulateEmpty ? 'Simulating Empty' : 'Test Empty State'}</span>
            </button>
          </div>
        </section>

        {/* Results Count & Sorting Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
          <div>
            <h2 className="font-title-md text-title-md font-bold text-on-surface">
              {simulateEmpty ? '0 Providers' : '4 DHA Providers Found'}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              In <span className="font-semibold text-on-surface">{initialLoc}</span> matching "{query || 'All'}"
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSortMenuOpen(!sortMenuOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm font-semibold transition-colors"
            >
              <Icon name="sort" className="text-[18px] text-primary" />
              <span>Sort: {sortLabels[sortOption].split('(')[0].trim()}</span>
              <Icon name="expand_more" className="text-[18px]" />
            </button>

            {sortMenuOpen && (
              <div className="absolute right-0 top-12 w-72 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 z-30 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSortOption(key);
                      setSortMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-xl text-body-sm transition-colors ${
                      sortOption === key
                        ? 'bg-primary-fixed text-on-primary-fixed font-bold'
                        : 'text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span>{sortLabels[key]}</span>
                    {sortOption === key && <Icon name="check" className="text-[16px] text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Results Body */}
        {simulateEmpty ? (
          /* Empty State */
          <div className="bg-surface-container-lowest rounded-3xl p-12 border border-outline-variant/30 text-center space-y-4 max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-surface-container-low text-on-surface-variant flex items-center justify-center mx-auto">
              <Icon name="search_off" className="text-[32px]" />
            </div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              No DHA Providers Found
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We couldn't find any registered facilities or licensed dentists matching your current filter criteria. Try expanding the distance radius or clearing specific search keywords.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-6 py-3 bg-primary text-on-primary hover:bg-primary-container rounded-2xl font-title-sm font-semibold transition-all shadow-sm"
              >
                Reset Search Filters
              </button>
            </div>
          </div>
        ) : (
          /* Results Cards Grid */
          <div className="space-y-5">
            {/* Card 1: Verified Specialist Doctor */}
            {(providerType === 'all' || providerType === 'dentist') && (
              <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary-fixed text-primary font-headline-sm font-bold flex items-center justify-center shrink-0 shadow-xs">
                    TN
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">
                        <Icon name="verified" className="text-[14px]" />
                        <span>DHA Verified Active</span>
                      </span>
                      <span className="font-label-sm font-mono text-on-surface-variant">#DHA-D-48912</span>
                      <span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-on-surface-variant">
                        Invisalign Platinum
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Dr. Tariq Al-Nuaimi
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Consultant Orthodontist • 14 Years Experience
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-body-sm text-on-surface-variant pt-1">
                      <div className="flex items-center gap-1">
                        <Icon name="apartment" className="text-[16px] text-primary" />
                        <span className="font-medium text-on-surface">Emirates Orthodontics &amp; Studio</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="location_on" className="text-[16px] text-secondary" />
                        <span>Oud Metha (1.8 km)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="star" className="text-amber-500 text-[16px] fill-current" />
                        <span className="font-bold text-on-surface">4.9</span>
                        <span>(128 reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-end justify-between gap-3 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/30">
                  <div className="text-left sm:text-right md:text-right w-full sm:w-auto">
                    <span className="font-label-sm text-on-surface-variant block">Consultation Fee</span>
                    <span className="font-title-md font-bold text-primary">AED 350</span>
                    <span className="font-label-sm text-secondary font-medium block mt-0.5">
                      Next Slot: Today at 4:30 PM
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => navigate('/patient-dashboard/discovery/dentist')}
                      className="px-4 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-title-sm font-semibold transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/patient-dashboard/discovery/dentist')}
                      className="px-5 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm font-semibold transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <Icon name="event" className="text-[17px]" />
                      <span>Book Slot</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Card 2: Accredited Clinic */}
            {(providerType === 'all' || providerType === 'clinic') && (
              <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-secondary-container text-on-secondary-container font-headline-sm font-bold flex items-center justify-center shrink-0 shadow-xs">
                    <Icon name="apartment" className="text-[30px]" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">
                        <Icon name="verified" className="text-[14px]" />
                        <span>DHA Diamond Star Facility</span>
                      </span>
                      <span className="font-label-sm font-mono text-on-surface-variant">JCI Accredited</span>
                    </div>

                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Emirates Orthodontics &amp; Studio
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Multi-Speciality Dental Center • 4 DHA Specialists on Staff
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-body-sm text-on-surface-variant pt-1">
                      <div className="flex items-center gap-1">
                        <Icon name="location_on" className="text-[16px] text-secondary" />
                        <span>Oud Metha, Medical Zone (1.8 km)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="star" className="text-amber-500 text-[16px] fill-current" />
                        <span className="font-bold text-on-surface">4.8</span>
                        <span>(312 reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="airline_seat_recline_extra" className="text-[16px] text-primary" />
                        <span>6 Treatment Suites</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-end justify-between gap-3 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/30">
                  <div className="text-left sm:text-right md:text-right w-full sm:w-auto">
                    <span className="font-label-sm text-on-surface-variant block">Insurance In-Network</span>
                    <span className="font-title-sm font-bold text-on-surface">NextCare, AXA, Daman</span>
                    <span className="font-label-sm text-secondary font-medium block mt-0.5">
                      Next Slot: Tomorrow at 10:00 AM
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => navigate('/patient-dashboard/discovery/clinic')}
                      className="px-4 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-title-sm font-semibold transition-colors"
                    >
                      View Clinic
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/patient-dashboard/discovery/clinic')}
                      className="px-5 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm font-semibold transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <Icon name="calendar_month" className="text-[17px]" />
                      <span>Book Clinic</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Card 3: Verification Pending Doctor */}
            {(providerType === 'all' || providerType === 'dentist') && !verifiedOnly && (
              <div className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 opacity-90">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container-high text-on-surface-variant font-headline-sm font-bold flex items-center justify-center shrink-0">
                    SH
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-label-sm font-semibold">
                        <Icon name="pending" className="text-[14px]" />
                        <span>DHA Verification In Progress</span>
                      </span>
                      <span className="font-label-sm font-mono text-on-surface-variant">#DHA-D-99410</span>
                    </div>

                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Dr. Sara Al-Haddad
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Specialist Endodontist • Al Zahra Dental Care
                    </p>

                    <div className="p-3 bg-surface-container rounded-xl text-body-sm text-on-surface-variant mt-2 max-w-xl">
                      <p>
                        Credentials are under annual review with the DHA Licensing Registry. Public patient ratings are temporarily paused during verification audits.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => alert('Direct enquiries for Dr. Sara Al-Haddad are routed through Al Zahra Dental Care reception.')}
                    className="w-full md:w-auto px-5 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-title-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Icon name="call" className="text-[17px]" />
                    <span>Call Facility Desk</span>
                  </button>
                </div>
              </div>
            )}

            {/* Card 4: Unverified / Restricted Clinic */}
            {(providerType === 'all' || providerType === 'clinic') && !verifiedOnly && (
              <div className="bg-error-container/20 rounded-3xl p-6 border border-error/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-error/10 text-error font-headline-sm font-bold flex items-center justify-center shrink-0">
                    <Icon name="warning" className="text-[28px]" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error text-on-error font-label-sm font-semibold">
                        <Icon name="block" className="text-[14px]" />
                        <span>DHA License Inactive / Restricted</span>
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Prime Oral Wellness Pavilion
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Deira Sector • Not Certified for DHA Digital Lifecode Sync
                    </p>

                    <p className="font-body-sm text-error font-medium mt-1">
                      Caution: This facility does not meet active DHA dental accreditation standards. Digital appointments cannot be scheduled through this platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => alert('Report submitted to DHA Health Regulation Sector for inspection.')}
                    className="w-full md:w-auto px-4 py-2.5 bg-error text-on-error hover:bg-error/90 rounded-xl font-title-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Icon name="flag" className="text-[17px]" />
                    <span>Report Facility</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </DashboardShell>
  );
}

