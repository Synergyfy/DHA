import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { DiscoverySubNav } from './DiscoverySubNav';
import { Icon } from '../../design/Primitives';

interface ClinicCard {
  id: string;
  name: string;
  accreditation: string;
  rating: number;
  reviewsCount: number;
  district: string;
  distance: string;
  nextSlot: string;
  image: string;
  specialities: string[];
  isVerified: boolean;
}

interface DentistCard {
  id: string;
  name: string;
  title: string;
  license: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  languages: string[];
  clinic: string;
  nextSlot: string;
  fee: string;
  avatarBg: string;
  avatarText: string;
}

export function DiscoverHomeScreen() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Dubai Healthcare City');
  const [locationMenuOpen, setLocationMenuOpen] = useState(false);

  const locations = [
    'Dubai Healthcare City',
    'Oud Metha',
    'Jumeirah 1 & 2',
    'Downtown Dubai',
    'Dubai Marina',
    'Business Bay',
    'Al Barsha',
    'Deira / Al Rigga',
  ];

  const specialities = [
    { id: 'general', name: 'General Dentistry', icon: 'dentistry', count: '84 Clinics', color: 'bg-primary-fixed text-on-primary-fixed' },
    { id: 'pediatric', name: 'Paediatric', icon: 'child_care', count: '38 Clinics', color: 'bg-secondary-container text-on-secondary-container' },
    { id: 'ortho', name: 'Orthodontics', icon: 'sentiment_satisfied', count: '52 Clinics', color: 'bg-tertiary-fixed text-on-tertiary-fixed' },
    { id: 'endo', name: 'Endodontics', icon: 'medical_information', count: '29 Clinics', color: 'bg-surface-container-high text-primary' },
    { id: 'surgery', name: 'Oral Surgery', icon: 'masks', count: '24 Clinics', color: 'bg-secondary-fixed text-on-secondary-fixed' },
    { id: 'restorative', name: 'Restorative', icon: 'auto_fix_high', count: '41 Clinics', color: 'bg-primary-fixed-dim text-on-primary-fixed' },
  ];

  const featuredClinics: ClinicCard[] = [
    {
      id: 'al-zahra',
      name: 'Al Zahra Dental Hub',
      accreditation: 'DHA Diamond • JCI Accredited',
      rating: 4.9,
      reviewsCount: 486,
      district: 'Oud Metha, Medical Zone',
      distance: '1.2 km away',
      nextSlot: 'Today, 3:15 PM',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
      specialities: ['Orthodontics', 'Implantology', 'Paediatric'],
      isVerified: true,
    },
    {
      id: 'emirates-ortho',
      name: 'Emirates Orthodontics & Studio',
      accreditation: 'DHA Gold Star Accredited',
      rating: 4.8,
      reviewsCount: 312,
      district: 'Jumeirah 2, Al Wasl Rd',
      distance: '3.4 km away',
      nextSlot: 'Tomorrow, 10:00 AM',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
      specialities: ['Invisalign', 'Braces', 'Aesthetic'],
      isVerified: true,
    },
    {
      id: 'dubai-london',
      name: 'Dubai London Clinic Dental Unit',
      accreditation: 'DHA Accredited Facility',
      rating: 4.7,
      reviewsCount: 224,
      district: 'Dubai Festival City',
      distance: '4.8 km away',
      nextSlot: 'Wed, 11:30 AM',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
      specialities: ['General', 'Cosmetic', 'Endodontics'],
      isVerified: true,
    },
  ];

  const topDentists: DentistCard[] = [
    {
      id: 'farouk',
      name: 'Dr. Farouk Al-Mansoori',
      title: 'Consultant Prosthodontist & Implantologist',
      license: 'DHA-D-48912',
      experience: '16+ Years Experience',
      rating: 4.9,
      reviewsCount: 142,
      languages: ['Arabic', 'English', 'French'],
      clinic: 'Al Zahra Dental Hub',
      nextSlot: 'Today, 3:15 PM',
      fee: 'AED 350',
      avatarBg: 'bg-primary-fixed',
      avatarText: 'FA',
    },
    {
      id: 'mariam',
      name: 'Dr. Mariam Al-Husseini',
      title: 'Specialist Paediatric Dentist',
      license: 'DHA-D-51204',
      experience: '12+ Years Experience',
      rating: 4.9,
      reviewsCount: 98,
      languages: ['Arabic', 'English'],
      clinic: 'Dubai Children Oral Health',
      nextSlot: 'Tomorrow, 9:30 AM',
      fee: 'AED 300',
      avatarBg: 'bg-secondary-container',
      avatarText: 'MH',
    },
    {
      id: 'tariq',
      name: 'Dr. Tariq Al-Nuaimi',
      title: 'Consultant Orthodontist',
      license: 'DHA-D-39180',
      experience: '14+ Years Experience',
      rating: 4.8,
      reviewsCount: 128,
      languages: ['Arabic', 'English'],
      clinic: 'Emirates Orthodontics',
      nextSlot: 'Tomorrow, 2:00 PM',
      fee: 'AED 350',
      avatarBg: 'bg-tertiary-fixed',
      avatarText: 'TN',
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/patient-dashboard/discovery/results?q=${encodeURIComponent(searchQuery)}&loc=${encodeURIComponent(selectedLocation)}`);
  };

  return (
    <DashboardShell pageTitle="Discover Clinics & Dentists">
      <DiscoverySubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Top Header & Search Area */}
        <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container">
                <Icon name="verified" className="text-[15px]" />
              </span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
                Official DHA Dental Provider Registry
              </span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              Find Verified Dentists &amp; Accredited Clinics
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Explore 140+ DHA-licensed dental facilities, verified consultants, transparent reference fees, and direct booking across Dubai.
            </p>

            {/* Global Search Bar */}
            <form onSubmit={handleSearchSubmit} className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Icon
                  name="search"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[22px]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dentist name, clinic, service, or speciality..."
                  className="w-full h-13 pl-11 pr-4 bg-surface-container-low hover:bg-surface-container focus:bg-white text-on-surface font-body-md rounded-2xl border border-outline-variant/40 focus:border-primary focus:outline-none transition-all shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="h-13 px-6 bg-primary hover:bg-primary-container text-on-primary rounded-2xl font-title-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
              >
                <Icon name="search" className="text-[20px]" />
                <span>Search DHA Registry</span>
              </button>
            </form>

            {/* Location Selector Row */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30">
                <Icon name="pin_drop" className="text-secondary text-[20px]" />
                <span className="font-label-md text-on-surface-variant">Area:</span>
                <span className="font-title-sm text-on-surface font-semibold">{selectedLocation}</span>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLocationMenuOpen(!locationMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-title-sm font-semibold transition-colors"
                >
                  <Icon name="my_location" className="text-[18px]" />
                  <span>Change District</span>
                  <Icon name="expand_more" className="text-[18px]" />
                </button>

                {locationMenuOpen && (
                  <div className="absolute right-0 top-12 w-64 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 z-30 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLocation('Near Me (GPS Detected)');
                        setLocationMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-left rounded-xl hover:bg-secondary-container/30 text-secondary font-title-sm"
                    >
                      <Icon name="near_me" className="text-[18px]" />
                      <span>Use Current Location</span>
                    </button>
                    <div className="h-px bg-outline-variant/20 my-1"></div>
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setSelectedLocation(loc);
                          setLocationMenuOpen(false);
                        }}
                        className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-xl font-body-md transition-colors ${
                          selectedLocation === loc
                            ? 'bg-primary-fixed text-on-primary-fixed font-semibold'
                            : 'text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        <span>{loc}</span>
                        {selectedLocation === loc && (
                          <Icon name="check" className="text-[16px] text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Specialities Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                Dental Specialities
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Browse official accredited dental board disciplines
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/patient-dashboard/discovery/services')}
              className="text-primary hover:text-primary-container font-title-sm font-semibold flex items-center gap-1 transition-colors"
            >
              <span>View All 6 Boards</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {specialities.map((spec) => (
              <button
                key={spec.id}
                type="button"
                onClick={() => {
                  navigate(`/patient-dashboard/discovery/results?speciality=${spec.id}`);
                }}
                className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary hover:shadow-md transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${spec.color}`}
                >
                  <Icon name={spec.icon} className="text-[24px]" />
                </div>
                <span className="font-title-sm text-title-sm text-on-surface font-semibold line-clamp-1">
                  {spec.name}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  {spec.count}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Interactive Map Teaser Banner */}
        <section className="bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white font-label-sm uppercase tracking-wider font-semibold">
              <Icon name="map" className="text-[16px]" />
              <span>Geo-Spatial Clinic Locator</span>
            </div>
            <h3 className="font-headline-md text-headline-md font-bold tracking-tight">
              Looking for a clinic near your home or office?
            </h3>
            <p className="font-body-md text-white/90">
              Interactive map with live DHA wait-times, transit directions, and verified insurance in-network filters across all Dubai zones.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => navigate('/patient-dashboard/discovery/map')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-primary hover:bg-surface-container-low rounded-2xl font-title-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Icon name="near_me" className="text-[20px]" />
              <span>Launch Interactive Map</span>
            </button>
          </div>
        </section>

        {/* Featured DHA Accredited Clinics */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                Featured Accredited Clinics
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Top-rated facilities meeting rigorous DHA Clinical Quality &amp; Infection Control standards
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/patient-dashboard/discovery/results?type=clinic')}
              className="text-primary hover:text-primary-container font-title-sm font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Explore All Clinics</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredClinics.map((clinic) => (
              <div
                key={clinic.id}
                className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Clinic Image */}
                <div className="relative h-44 w-full overflow-hidden bg-surface-container">
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                    <Icon name="verified" className="text-secondary text-[16px]" />
                    <span className="font-label-sm text-on-surface font-semibold">
                      {clinic.accreditation}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-primary/90 backdrop-blur-md text-on-primary px-3 py-1 rounded-full font-label-sm font-semibold flex items-center gap-1 shadow-xs">
                    <Icon name="schedule" className="text-[15px]" />
                    <span>Next: {clinic.nextSlot}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-title-md text-title-md font-bold text-on-surface group-hover:text-primary transition-colors">
                        {clinic.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-lg shrink-0">
                        <Icon name="star" className="text-amber-500 text-[16px] fill-current" />
                        <span className="font-label-md font-bold text-on-surface">{clinic.rating}</span>
                        <span className="font-label-sm text-on-surface-variant">({clinic.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm">
                      <Icon name="location_on" className="text-secondary text-[16px]" />
                      <span>{clinic.district}</span>
                      <span className="text-outline">•</span>
                      <span className="text-secondary font-medium">{clinic.distance}</span>
                    </div>

                    {/* Speciality Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {clinic.specialities.map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 bg-surface-container-low text-on-surface-variant font-label-sm rounded-lg"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-outline-variant/30 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => navigate('/patient-dashboard/discovery/clinic')}
                      className="flex-1 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <span>View Profile &amp; Staff</span>
                      <Icon name="chevron_right" className="text-[18px]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/patient-dashboard/discovery/map')}
                      className="w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors shrink-0"
                      title="View on Map"
                    >
                      <Icon name="directions" className="text-[20px] text-secondary" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top DHA Verified Specialists */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                Verified Specialist Dentists
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Consultant and specialist dentists in active good standing with the DHA Licensing Board
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/patient-dashboard/discovery/results?type=dentist')}
              className="text-primary hover:text-primary-container font-title-sm font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Explore All Specialists</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topDentists.map((doc) => (
              <div
                key={doc.id}
                className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Doctor Avatar & Badges */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl ${doc.avatarBg} text-primary font-headline-sm font-bold flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {doc.avatarText}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <Icon name="verified" className="text-secondary text-[16px]" />
                        <span className="font-label-sm font-mono text-secondary font-semibold">
                          {doc.license}
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface truncate">
                        {doc.name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                        {doc.title}
                      </p>
                    </div>
                  </div>

                  {/* Rating & Stats Strip */}
                  <div className="grid grid-cols-2 gap-2 bg-surface-container-low rounded-xl p-2.5 text-center">
                    <div>
                      <span className="font-label-sm text-on-surface-variant block">Experience</span>
                      <span className="font-title-sm font-bold text-on-surface">{doc.experience}</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-on-surface-variant block">Rating</span>
                      <div className="flex items-center justify-center gap-1">
                        <Icon name="star" className="text-amber-500 text-[16px] fill-current" />
                        <span className="font-title-sm font-bold text-on-surface">{doc.rating}</span>
                        <span className="font-label-sm text-on-surface-variant">({doc.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-body-sm text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <Icon name="apartment" className="text-[17px] text-primary" />
                      <span className="text-on-surface font-medium truncate">{doc.clinic}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="translate" className="text-[17px] text-secondary" />
                      <span>{doc.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-label-md text-on-surface-variant">Consultation Fee</span>
                      <span className="font-title-sm font-bold text-primary">{doc.fee}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-outline-variant/30 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/patient-dashboard/discovery/dentist')}
                    className="flex-1 py-2.5 bg-primary-fixed hover:bg-primary-container hover:text-on-primary text-on-primary-fixed rounded-xl font-title-sm font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Profile</span>
                    <Icon name="arrow_forward" className="text-[17px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/patient-dashboard/discovery/dentist')}
                    className="px-4 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm font-semibold transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                  >
                    <Icon name="event" className="text-[17px]" />
                    <span>Book</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Dental Care Callout */}
        <section className="bg-error-container/40 border border-error/20 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-error text-on-error flex items-center justify-center shrink-0 shadow-sm">
              <Icon name="emergency" className="text-[26px]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-title-md text-title-md font-bold text-on-error-container">
                Experiencing Acute Tooth Pain or Dental Trauma?
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                DHA 24/7 Dental Emergency Care Units provide immediate walk-in triage for severe swelling, avulsed teeth, and acute bleeding.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:800342"
              className="px-5 py-3 bg-error text-on-error hover:bg-error/90 rounded-2xl font-title-sm font-semibold shadow-sm flex items-center gap-2 transition-all"
            >
              <Icon name="call" className="text-[18px]" />
              <span>Call DHA 800-DHA (342)</span>
            </a>
          </div>
        </section>
      </main>
    </DashboardShell>
  );
}

