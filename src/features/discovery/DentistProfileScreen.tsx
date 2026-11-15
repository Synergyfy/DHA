import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { DiscoverySubNav } from './DiscoverySubNav';
import { Icon } from '../../design/Primitives';

export function DentistProfileScreen() {
  const navigate = useNavigate();

  // Booking Widget State
  const dates = [
    { day: 'Mon', date: '14 Oct', slots: '3 slots', id: '2026-10-14' },
    { day: 'Tue', date: '15 Oct', slots: '4 slots', id: '2026-10-15' },
    { day: 'Wed', date: '16 Oct', slots: '2 slots', id: '2026-10-16' },
    { day: 'Thu', date: '17 Oct', slots: '5 slots', id: '2026-10-17' },
  ];

  const times = [
    { period: 'Morning', slots: ['09:30 AM', '11:15 AM'] },
    { period: 'Afternoon', slots: ['02:00 PM', '03:45 PM', '04:30 PM'] },
    { period: 'Evening', slots: ['06:00 PM', '07:15 PM'] },
  ];

  const [selectedDate, setSelectedDate] = useState('2026-10-14');
  const [selectedTime, setSelectedTime] = useState('02:00 PM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const selectedDateObj = dates.find((d) => d.id === selectedDate) || dates[0];

  return (
    <DashboardShell pageTitle="Dentist Profile — Dr. Farouk Al-Mansoori" showBack>
      <DiscoverySubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Profile Header Hero Card */}
        <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-primary-fixed text-primary font-headline-lg font-bold flex items-center justify-center shrink-0 shadow-md">
                FA
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">
                    <Icon name="verified" className="text-[16px]" />
                    <span>DHA Verified Active</span>
                  </span>
                  <span className="font-label-sm font-mono text-secondary font-bold">
                    #DHA-D-48912
                  </span>
                </div>

                <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                  Dr. Farouk Al-Mansoori
                </h1>
                <p className="font-title-md text-title-md text-on-surface-variant font-medium">
                  Consultant Prosthodontist &amp; Oral Implantologist
                </p>

                <div className="flex flex-wrap items-center gap-3 text-body-sm text-on-surface-variant pt-1">
                  <div className="flex items-center gap-1">
                    <Icon name="apartment" className="text-[17px] text-primary" />
                    <span className="text-on-surface font-semibold">Al Zahra Dental Hub (Oud Metha)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="translate" className="text-[17px] text-secondary" />
                    <span>Arabic (Native), English, French</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Fee & Action Box */}
            <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-outline-variant/30 w-full md:w-auto shrink-0 text-left md:text-right space-y-2">
              <span className="font-label-sm text-on-surface-variant block">Consultation Reference Fee</span>
              <div className="font-headline-md font-bold text-primary">AED 350</div>
              <span className="font-label-sm text-secondary font-semibold block">
                Standard DHA Approved Tariff
              </span>
              <a
                href="#booking-widget"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm font-semibold transition-all shadow-xs cursor-pointer"
              >
                <Icon name="event" className="text-[18px]" />
                <span>Jump to Booking</span>
              </a>
            </div>
          </div>

          {/* Official DHA Credential Banner */}
          <div className="mt-6 pt-5 border-t border-outline-variant/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-surface-container-low/60 p-3 rounded-2xl">
              <span className="font-label-sm text-on-surface-variant block">Licensing Authority</span>
              <span className="font-title-sm font-bold text-on-surface">Dubai Health Authority</span>
            </div>
            <div className="bg-surface-container-low/60 p-3 rounded-2xl">
              <span className="font-label-sm text-on-surface-variant block">License Validity</span>
              <span className="font-title-sm font-bold text-secondary">Good Standing (Dec 2027)</span>
            </div>
            <div className="bg-surface-container-low/60 p-3 rounded-2xl">
              <span className="font-label-sm text-on-surface-variant block">Clinical Experience</span>
              <span className="font-title-sm font-bold text-on-surface">16+ Years In Practice</span>
            </div>
            <div className="bg-surface-container-low/60 p-3 rounded-2xl">
              <span className="font-label-sm text-on-surface-variant block">Lifecode Sync</span>
              <span className="font-title-sm font-bold text-primary">100% Digital E-Record</span>
            </div>
          </div>
        </section>

        {/* Two Columns Layout: Left (Info & Reviews) vs Right (Booking Widget) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio, Stats, Pricing & Reviews (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Biography & Focus */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <Icon name="clinical_notes" className="text-primary text-[22px]" />
                <span>Biography &amp; Clinical Expertise</span>
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Dr. Farouk Al-Mansoori is a Senior Consultant Prosthodontist with over 16 years of specialized clinical practice across the UAE and Europe. He completed his advanced fellowship in Oral Rehabilitation at Kings College London and currently chairs the prosthodontic review panel at Al Zahra Dental Hub.
              </p>
              <div className="pt-2">
                <span className="font-label-sm text-on-surface-variant font-bold uppercase tracking-wider block mb-2">
                  Specialized Clinical Focus
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Full-Arch Dental Implants',
                    'Digital Guided Implantology',
                    'Porcelain & E-max Veneers',
                    'Complex Occlusal Reconstruction',
                    'Bone Grafting & Augmentation',
                    'TMJ & Bruxism Management',
                  ].map((chip) => (
                    <span
                      key={chip}
                      className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface font-label-md font-medium"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Patient Rating & Sentiment */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <Icon name="star" className="text-amber-500 text-[22px] fill-current" />
                <span>Patient Satisfaction (4.9 / 5.0)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-4 text-center sm:border-r border-outline-variant/30 sm:pr-4 space-y-1">
                  <div className="font-display-lg text-[44px] font-bold text-on-surface leading-none">
                    4.9
                  </div>
                  <div className="flex items-center justify-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icon key={s} name="star" className="text-[18px] fill-current" />
                    ))}
                  </div>
                  <span className="font-body-sm text-on-surface-variant block">
                    142 Verified DHA Reviews
                  </span>
                </div>

                <div className="sm:col-span-8 space-y-1.5">
                  {[
                    { stars: '5 Stars', pct: '91%' },
                    { stars: '4 Stars', pct: '7%' },
                    { stars: '3 Stars', pct: '2%' },
                    { stars: '2 Stars', pct: '0%' },
                    { stars: '1 Star', pct: '0%' },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2 text-label-sm">
                      <span className="w-14 text-on-surface-variant shrink-0">{row.stars}</span>
                      <div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: row.pct }}
                        ></div>
                      </div>
                      <span className="w-8 text-right font-medium text-on-surface">{row.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sentiment tags */}
              <div className="pt-2 border-t border-outline-variant/30 flex flex-wrap gap-2">
                {[
                  { tag: 'Gentle & Painless', score: '98%' },
                  { tag: 'Transparent Pricing', score: '99%' },
                  { tag: 'Punctual & Respectful', score: '96%' },
                  { tag: 'Clear Treatment Plan', score: '100%' },
                ].map((s) => (
                  <span
                    key={s.tag}
                    className="px-2.5 py-1 rounded-lg bg-secondary-container/40 text-on-secondary-container font-label-sm font-semibold flex items-center gap-1"
                  >
                    <Icon name="thumb_up" className="text-[14px]" />
                    <span>{s.tag} ({s.score})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Transparent Reference Pricing List */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                  <Icon name="payments" className="text-secondary text-[22px]" />
                  <span>DHA Reference Pricing</span>
                </h2>
                <span className="font-label-sm text-secondary font-semibold">Standard Regulated</span>
              </div>

              <div className="divide-y divide-outline-variant/30">
                {[
                  { service: 'Initial Specialist Consultation & Oral Exam', code: 'DHA-PR-01', fee: 'AED 350' },
                  { service: 'Single Titanium Implant (Fixture + Abutment)', code: 'DHA-PR-18', fee: 'AED 4,500' },
                  { service: 'High-Translucency E-max Porcelain Veneer', code: 'DHA-PR-22', fee: 'AED 1,800' },
                  { service: 'Digital 3D Smile Design & Occlusal Scan', code: 'DHA-PR-05', fee: 'AED 500' },
                  { service: 'Full Arch Fixed Restoration (All-on-4 Stage 1)', code: 'DHA-PR-35', fee: 'AED 18,500' },
                ].map((item) => (
                  <div key={item.code} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-title-sm text-on-surface font-semibold block">{item.service}</span>
                      <span className="font-label-sm text-on-surface-variant font-mono">{item.code}</span>
                    </div>
                    <span className="font-title-md font-bold text-primary shrink-0">{item.fee}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Patient Reviews */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                <Icon name="rate_review" className="text-primary text-[22px]" />
                <span>Verified Patient Reviews</span>
              </h2>

              <div className="space-y-4">
                {[
                  {
                    name: 'Tariq M.',
                    badge: 'Verified Visit • Implantology',
                    date: '2 weeks ago',
                    rating: 5,
                    review:
                      'Dr. Farouk was extremely gentle and walked me through my implant plan step-by-step. The 3D scan preview was accurate and surgery had zero complications.',
                  },
                  {
                    name: 'Fatima S.',
                    badge: 'Verified Visit • Ceramic Veneers',
                    date: '1 month ago',
                    rating: 5,
                    review:
                      'Hands down the most skilled prosthodontist in Dubai. No sensitivity at all, and my smile looks completely natural. Al Zahra staff are also very courteous.',
                  },
                  {
                    name: 'Kevin W.',
                    badge: 'Verified Visit • Crown Restoration',
                    date: '2 months ago',
                    rating: 5,
                    review:
                      'Transparent about all costs upfront. He answered all my questions patiently and completed the crown fitting in just two visits.',
                  },
                ].map((rev) => (
                  <div
                    key={rev.name}
                    className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm font-bold text-on-surface">{rev.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm font-semibold">
                          {rev.badge}
                        </span>
                      </div>
                      <span className="font-label-sm text-on-surface-variant">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Icon key={s} name="star" className="text-[15px] fill-current" />
                      ))}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{rev.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Widget (5 cols) */}
          <div id="booking-widget" className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            <div className="bg-surface-container-lowest rounded-3xl p-6 border-2 border-primary shadow-lg space-y-5">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                <div className="space-y-0.5">
                  <span className="font-label-sm text-secondary font-bold uppercase tracking-wider block">
                    Instant DHA Booking
                  </span>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Select Appointment Slot
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                  <Icon name="calendar_month" className="text-[22px]" />
                </div>
              </div>

              {/* Step 1: Date Selector */}
              <div className="space-y-2">
                <span className="font-label-md text-on-surface font-semibold block">
                  1. Choose Date (October 2026)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDate(d.id)}
                      className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                        selectedDate === d.id
                          ? 'bg-primary text-on-primary border-primary shadow-sm'
                          : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30'
                      }`}
                    >
                      <span className="font-label-sm">{d.day}</span>
                      <span className="font-title-sm font-bold">{d.date.split(' ')[0]}</span>
                      <span className={`text-[10px] mt-0.5 ${selectedDate === d.id ? 'text-primary-fixed' : 'text-secondary'}`}>
                        {d.slots}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Time Slot Selector */}
              <div className="space-y-3">
                <span className="font-label-md text-on-surface font-semibold block">
                  2. Choose Preferred Time
                </span>
                {times.map((t) => (
                  <div key={t.period} className="space-y-1.5">
                    <span className="font-label-sm text-on-surface-variant font-medium">
                      {t.period}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {t.slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`px-3 py-2 rounded-xl font-label-md font-semibold transition-all border ${
                            selectedTime === slot
                              ? 'bg-secondary text-on-secondary border-secondary shadow-xs'
                              : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/30'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking Summary Box */}
              <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/30 space-y-2 text-body-sm">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Doctor:</span>
                  <span className="font-semibold text-on-surface">Dr. Farouk Al-Mansoori</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Slot:</span>
                  <span className="font-semibold text-primary">
                    {selectedDateObj.day}, {selectedDateObj.date} at {selectedTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Facility:</span>
                  <span className="font-semibold text-on-surface">Al Zahra Dental Hub</span>
                </div>
                <div className="flex items-center justify-between border-t border-outline-variant/30 pt-2 font-title-sm">
                  <span className="text-on-surface font-bold">Consultation Fee:</span>
                  <span className="text-primary font-bold">AED 350</span>
                </div>
              </div>

              {/* Booking Action */}
              <button
                type="button"
                onClick={() => setBookingConfirmed(true)}
                className="w-full py-3.5 bg-primary hover:bg-primary-container text-on-primary rounded-2xl font-title-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Icon name="check_circle" className="text-[20px]" />
                <span>Confirm &amp; Link to Lifecode</span>
              </button>
              <p className="font-label-sm text-center text-on-surface-variant">
                Free cancellation up to 4 hours before the appointment
              </p>
            </div>

            {/* Affiliated Clinics Card */}
            <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 space-y-3">
              <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold block">
                Practice Locations
              </span>
              <div className="space-y-2.5">
                <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
                  <div>
                    <span className="font-title-sm font-bold text-on-surface block">
                      Al Zahra Dental Hub (Main)
                    </span>
                    <span className="font-body-sm text-on-surface-variant">
                      Oud Metha • Mon, Wed, Thu
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/patient-dashboard/discovery/clinic')}
                    className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md font-semibold"
                  >
                    View Clinic
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
                  <div>
                    <span className="font-title-sm font-bold text-on-surface block">
                      Al Barsha Medical Complex
                    </span>
                    <span className="font-body-sm text-on-surface-variant">
                      Barsha Heights • Tue, Sat
                    </span>
                  </div>
                  <span className="font-label-sm text-on-surface-variant">Alternate Branch</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {bookingConfirmed && (
          <div
            className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setBookingConfirmed(false)}
          >
            <div
              className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-center animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-3xl bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto shadow-sm">
                <Icon name="verified" className="text-[36px]" />
              </div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Appointment Reserved!
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Your consultation with <span className="font-semibold text-on-surface">Dr. Farouk Al-Mansoori</span> has been registered and synced with your DHA Lifecode for <span className="font-semibold text-primary">{selectedDateObj.day}, {selectedDateObj.date} at {selectedTime}</span>.
              </p>
              <div className="p-3.5 bg-surface-container rounded-2xl text-left text-body-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Facility:</span>
                  <span className="font-semibold text-on-surface">Al Zahra Dental Hub</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Reference Token:</span>
                  <span className="font-mono font-bold text-primary">DHA-APT-84910</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBookingConfirmed(false)}
                  className="flex-1 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-title-sm font-semibold transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/patient-dashboard/reminders/appointments')}
                  className="flex-1 py-3 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm font-semibold transition-colors shadow-sm"
                >
                  View in Reminders
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </DashboardShell>
  );
}

