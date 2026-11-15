import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { DiscoverySubNav } from './DiscoverySubNav';
import { Icon } from '../../design/Primitives';

type BranchKey = 'oud-metha' | 'al-barsha';

export function ClinicProfileScreen() {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState<BranchKey>('oud-metha');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const staffDoctors = [
    {
      id: 'farouk',
      name: 'Dr. Farouk Al-Mansoori',
      title: 'Consultant Prosthodontist',
      license: 'DHA-D-48912',
      rating: 4.9,
      reviews: 142,
      nextSlot: 'Today, 3:15 PM',
      initials: 'FA',
      bg: 'bg-primary-fixed text-primary',
    },
    {
      id: 'mariam',
      name: 'Dr. Mariam Al-Husseini',
      title: 'Specialist Paediatric Dentist',
      license: 'DHA-D-51204',
      rating: 4.9,
      reviews: 98,
      nextSlot: 'Tomorrow, 9:30 AM',
      initials: 'MH',
      bg: 'bg-secondary-container text-on-secondary-container',
    },
    {
      id: 'tariq',
      name: 'Dr. Tariq Al-Nuaimi',
      title: 'Consultant Orthodontist',
      license: 'DHA-D-39180',
      rating: 4.8,
      reviews: 128,
      nextSlot: 'Tomorrow, 2:00 PM',
      initials: 'TN',
      bg: 'bg-tertiary-fixed text-on-tertiary-fixed',
    },
  ];

  return (
    <DashboardShell pageTitle="Clinic Profile — Al Zahra Dental Hub" showBack>
      <DiscoverySubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Architectural Hero Card */}
        <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm">
          {/* Header Image Banner */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-surface-container">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80"
              alt="Al Zahra Dental Hub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/30"></div>

            {/* Accreditation Badge */}
            <div className="absolute top-4 left-4 bg-surface-container-lowest/95 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-outline-variant/30">
              <Icon name="verified" className="text-secondary text-[18px]" />
              <span className="font-label-sm text-on-surface font-bold uppercase tracking-wider">
                DHA Diamond Star • JCI International Accredited
              </span>
            </div>

            {/* License Code */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white font-mono px-3 py-1 rounded-full font-label-sm">
              #DHA-FAC-01492
            </div>
          </div>

          {/* Clinic Identity & Summary */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                  Al Zahra Dental Hub
                </h1>
                <p className="font-title-md text-title-md text-on-surface-variant">
                  Comprehensive Multi-Speciality Dental Center &amp; Implantology Institute
                </p>

                <div className="flex flex-wrap items-center gap-3 text-body-sm text-on-surface-variant pt-1">
                  <div className="flex items-center gap-1">
                    <Icon name="location_on" className="text-secondary text-[18px]" />
                    <span className="text-on-surface font-semibold">Oud Metha Medical Zone, Dubai</span>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-lg">
                    <Icon name="star" className="text-amber-500 text-[16px] fill-current" />
                    <span className="font-bold text-on-surface">4.9</span>
                    <span>(486 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 bg-secondary-container/40 text-on-secondary-container px-2.5 py-0.5 rounded-lg font-semibold">
                    <Icon name="shield" className="text-[15px]" />
                    <span>100% DHA Audit Score</span>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <a
                  href="tel:+97143366666"
                  className="px-4 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-2xl font-title-sm font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Icon name="call" className="text-[18px] text-primary" />
                  <span>Call Clinic</span>
                </a>
                <button
                  type="button"
                  onClick={() => navigate('/patient-dashboard/discovery/map')}
                  className="px-4 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-2xl font-title-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Icon name="map" className="text-[18px] text-secondary" />
                  <span>View Map</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="px-6 py-3 bg-primary hover:bg-primary-container text-on-primary rounded-2xl font-title-sm font-semibold shadow-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Icon name="event" className="text-[18px]" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>

            {/* Immediate Slot Announcement */}
            <div className="bg-primary-fixed/40 border border-primary/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
                  <Icon name="schedule" className="text-[20px]" />
                </div>
                <div>
                  <span className="font-label-sm text-primary font-bold uppercase tracking-wider block">
                    Earliest Available Slot
                  </span>
                  <span className="font-title-sm text-on-surface font-semibold">
                    Today at 3:15 PM with Dr. Farouk Al-Mansoori (Prosthodontics)
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/patient-dashboard/discovery/dentist')}
                className="px-4 py-2 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-title-sm font-semibold transition-all shadow-xs shrink-0 cursor-pointer"
              >
                Claim Slot
              </button>
            </div>

            {/* Multi-Branch Campus Selector */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-2">
                <button
                  type="button"
                  onClick={() => setSelectedBranch('oud-metha')}
                  className={`px-4 py-2 rounded-xl font-title-sm font-semibold transition-all flex items-center gap-1.5 ${
                    selectedBranch === 'oud-metha'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <Icon name="apartment" className="text-[18px]" />
                  <span>Oud Metha (Main Campus)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBranch('al-barsha')}
                  className={`px-4 py-2 rounded-xl font-title-sm font-semibold transition-all flex items-center gap-1.5 ${
                    selectedBranch === 'al-barsha'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <Icon name="domain" className="text-[18px]" />
                  <span>Al Barsha Branch</span>
                </button>
              </div>

              {/* Branch Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30">
                <div className="space-y-3">
                  <span className="font-label-sm text-secondary font-bold uppercase tracking-wider block">
                    Campus Location &amp; Access
                  </span>
                  <div className="space-y-2 text-body-sm text-on-surface-variant">
                    <div className="flex items-start gap-2">
                      <Icon name="pin_drop" className="text-secondary text-[18px] shrink-0 mt-0.5" />
                      <span>
                        {selectedBranch === 'oud-metha'
                          ? 'Building 34, 19th Street, Oud Metha Medical Zone, Dubai, UAE'
                          : 'Barsha Heights Dental Wing, Al Barsha 1, Dubai, UAE'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="directions_car" className="text-primary text-[18px] shrink-0" />
                      <span>Complimentary Valet Parking &amp; Dedicated Wheelchair Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="subway" className="text-primary text-[18px] shrink-0" />
                      <span>
                        {selectedBranch === 'oud-metha'
                          ? '400m from Oud Metha Metro Station (Green Line)'
                          : '600m from Dubai Internet City Metro Station'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="font-label-sm text-secondary font-bold uppercase tracking-wider block">
                    Operating Hours
                  </span>
                  <div className="space-y-1.5 text-body-sm">
                    <div className="flex items-center justify-between py-1 border-b border-outline-variant/20">
                      <span className="text-on-surface font-medium">Saturday – Thursday:</span>
                      <span className="font-semibold text-primary">08:00 AM – 09:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-outline-variant/20">
                      <span className="text-on-surface font-medium">Friday:</span>
                      <span className="font-semibold text-primary">02:00 PM – 08:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-on-surface font-medium">Emergency Triage:</span>
                      <span className="font-bold text-error">24/7 On-Call Surgeon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dentists on Staff (Horizontal Scroll / Responsive Grid) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                DHA Dentists &amp; Specialists on Staff
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Consultant and specialist doctors licensed under Al Zahra Dental Hub
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staffDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl ${doc.bg} font-headline-sm font-bold flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {doc.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <Icon name="verified" className="text-secondary text-[15px]" />
                        <span className="font-label-sm font-mono text-secondary font-semibold">
                          {doc.license}
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md font-bold text-on-surface truncate">
                        {doc.name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                        {doc.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-xl text-body-sm">
                    <div className="flex items-center gap-1">
                      <Icon name="star" className="text-amber-500 text-[16px] fill-current" />
                      <span className="font-bold text-on-surface">{doc.rating}</span>
                      <span className="text-on-surface-variant text-label-sm">({doc.reviews})</span>
                    </div>
                    <span className="text-secondary font-semibold text-label-sm">
                      Next: {doc.nextSlot}
                    </span>
                  </div>
                </div>

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
                    className="px-4 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm font-semibold transition-colors shadow-xs cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Equipment & Campus Amenities */}
        <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-4">
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
            <Icon name="biotech" className="text-primary text-[22px]" />
            <span>Facility Equipment &amp; Campus Amenities</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Al Zahra Dental Hub maintains state-of-the-art diagnostic and surgical equipment adhering to European &amp; DHA Grade-A criteria.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
            {[
              { icon: 'camera', title: 'Cone Beam 3D CT', desc: 'Ultra-low radiation 3D volumetric scans' },
              { icon: 'view_in_ar', title: 'iTero 3D Scanners', desc: 'Impression-free digital optical scanning' },
              { icon: 'airline_seat_flat', title: 'Sedation Suite', desc: 'Licensed nitrous oxide & IV sedation' },
              { icon: 'child_care', title: 'Paediatric Zone', desc: 'Sensory-adapted play area for children' },
              { icon: 'accessible', title: 'ADA Accessible', desc: 'Wheelchair lifts and wide operatory suites' },
              { icon: 'local_parking', title: 'Valet Parking', desc: 'Free patient parking at main entrance' },
              { icon: 'sanitizer', title: 'Class-B Sterilization', desc: 'Continuous barcode pouch tracking' },
              { icon: 'wifi', title: 'High-Speed Wi-Fi', desc: 'Complimentary patient waiting network' },
            ].map((amenity) => (
              <div
                key={amenity.title}
                className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-1.5"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
                  <Icon name={amenity.icon} className="text-[20px]" />
                </div>
                <span className="font-title-sm text-on-surface font-bold block">{amenity.title}</span>
                <span className="font-body-sm text-on-surface-variant text-[12px] block">
                  {amenity.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Accepted Insurance Networks */}
        <section className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
              <Icon name="verified_user" className="text-secondary text-[22px]" />
              <span>Accepted Direct-Billing Insurance</span>
            </h2>
            <span className="font-label-sm text-secondary font-semibold">Live Claim Approvals</span>
          </div>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {[
              'Daman National',
              'NextCare (All Tiers)',
              'AXA / GIG Gulf',
              'Mednet Global',
              'MetLife Dental',
              'Cigna Global Health',
              'NAS Administration',
              'Neuron Network',
            ].map((ins) => (
              <span
                key={ins}
                className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface font-title-sm font-semibold flex items-center gap-1.5"
              >
                <Icon name="check" className="text-secondary text-[16px]" />
                <span>{ins}</span>
              </span>
            ))}
          </div>
        </section>

        {/* Booking Dialog Modal */}
        {bookingModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setBookingModalOpen(false)}
          >
            <div
              className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-center animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-3xl bg-primary-fixed text-primary flex items-center justify-center mx-auto shadow-sm">
                <Icon name="calendar_month" className="text-[36px]" />
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Book at Al Zahra Dental Hub
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Would you like to book an appointment with our available specialist <span className="font-semibold text-on-surface">Dr. Farouk Al-Mansoori</span> or speak with clinic reception?
              </p>
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setBookingModalOpen(false);
                    navigate('/patient-dashboard/discovery/dentist');
                  }}
                  className="w-full py-3 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  View Dr. Farouk's Available Slots
                </button>
                <a
                  href="tel:+97143366666"
                  className="w-full py-3 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-title-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="call" className="text-[18px] text-primary" />
                  <span>Call Reception (+971 4 336 6666)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </DashboardShell>
  );
}

