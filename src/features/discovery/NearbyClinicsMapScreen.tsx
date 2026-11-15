import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { DiscoverySubNav } from './DiscoverySubNav';
import { Icon } from '../../design/Primitives';

interface MapClinic {
  id: string;
  pinNumber: number;
  name: string;
  accreditation: string;
  rating: number;
  reviewsCount: number;
  address: string;
  district: string;
  distance: string;
  nextSlot: string;
  cx: number;
  cy: number;
  specialities: string[];
  phone: string;
}

export function NearbyClinicsMapScreen() {
  const navigate = useNavigate();

  const clinics: MapClinic[] = [
    {
      id: 'al-zahra',
      pinNumber: 1,
      name: 'Al Zahra Dental Hub',
      accreditation: 'DHA Diamond • JCI Accredited',
      rating: 4.9,
      reviewsCount: 486,
      address: 'Building 34, 19th St, Oud Metha Medical Zone',
      district: 'Oud Metha',
      distance: '1.2 km away',
      nextSlot: 'Today, 3:15 PM',
      cx: 340,
      cy: 220,
      specialities: ['Prosthodontics', 'Orthodontics', 'Implantology'],
      phone: '+971 4 336 6666',
    },
    {
      id: 'dubai-smile',
      pinNumber: 2,
      name: 'Dubai Smile Studio DHCC',
      accreditation: 'DHA Gold Star Accredited',
      rating: 4.8,
      reviewsCount: 240,
      address: 'Al Razi Bldg 64, Dubai Healthcare City',
      district: 'DHCC',
      distance: '2.1 km away',
      nextSlot: 'Tomorrow, 11:00 AM',
      cx: 430,
      cy: 260,
      specialities: ['Paediatric Dentistry', 'Cosmetics'],
      phone: '+971 4 429 8888',
    },
    {
      id: 'dubai-london',
      pinNumber: 3,
      name: 'Dubai London Clinic Dental Unit',
      accreditation: 'DHA Accredited Facility',
      rating: 4.7,
      reviewsCount: 194,
      address: 'Crescent Tower, Dubai Festival City',
      district: 'Festival City',
      distance: '4.8 km away',
      nextSlot: 'Wed, 10:30 AM',
      cx: 560,
      cy: 170,
      specialities: ['General Dentistry', 'Endodontics'],
      phone: '+971 4 378 1111',
    },
    {
      id: 'jumeirah-oral',
      pinNumber: 4,
      name: 'Jumeirah Oral Studio',
      accreditation: 'DHA Diamond Star Facility',
      rating: 4.9,
      reviewsCount: 320,
      address: 'Villa 14B, Al Wasl Road, Jumeirah 2',
      district: 'Jumeirah',
      distance: '5.2 km away',
      nextSlot: 'Today, 5:00 PM',
      cx: 190,
      cy: 330,
      specialities: ['Aesthetic Smile Design', 'Invisalign'],
      phone: '+971 4 344 5555',
    },
    {
      id: 'healthbay',
      pinNumber: 5,
      name: 'HealthBay Dental Polyclinic',
      accreditation: 'DHA Accredited Facility',
      rating: 4.6,
      reviewsCount: 156,
      address: 'Al Wasl Road, Al Safa 1',
      district: 'Al Safa',
      distance: '6.4 km away',
      nextSlot: 'Thu, 9:00 AM',
      cx: 140,
      cy: 420,
      specialities: ['Family Dentistry', 'Preventive Care'],
      phone: '+971 4 348 7140',
    },
  ];

  const [selectedClinicId, setSelectedClinicId] = useState<string>('al-zahra');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedClinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0];

  return (
    <DashboardShell pageTitle="Interactive Map & Nearby Clinics">
      <DiscoverySubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Control Layer */}
        <section className="bg-surface-container-lowest rounded-3xl p-4 sm:p-5 border border-outline-variant/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-2xl border border-outline-variant/30 shrink-0">
              <button
                type="button"
                onClick={() => navigate('/patient-dashboard/discovery/results')}
                className="px-4 py-2 rounded-xl text-on-surface-variant hover:text-on-surface font-title-sm font-semibold flex items-center gap-1.5 transition-all"
              >
                <Icon name="view_list" className="text-[18px]" />
                <span>List View</span>
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-surface-container-lowest text-primary font-title-sm font-semibold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Icon name="map" className="text-[18px]" />
                <span>Interactive Map</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm font-semibold">
              <Icon name="near_me" className="text-[15px] text-secondary" />
              <span>5 Clinics within 7 km</span>
            </div>
          </div>

          <div className="relative w-full md:w-80">
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search map location or clinic..."
              className="w-full h-11 pl-10 pr-4 bg-surface-container-low text-on-surface font-body-md rounded-xl border border-outline-variant/30 focus:border-primary focus:outline-none"
            />
          </div>
        </section>

        {/* Responsive Layout: Map + Clinic Detail / List Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left/Center: Interactive SVG Map (8 cols on lg) */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm relative h-[480px] sm:h-[560px] flex flex-col justify-between">
            {/* Map Canvas Header Info */}
            <div className="absolute top-4 left-4 z-20 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-outline-variant/30 shadow-xs flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></div>
              <span className="font-label-md text-on-surface font-semibold">
                Oud Metha &amp; Healthcare City Medical Cluster
              </span>
            </div>

            {/* Floating Zoom & Recenter Controls */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
                className="w-10 h-10 rounded-xl bg-surface-container-lowest shadow-md border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                aria-label="Zoom in map"
              >
                <Icon name="add" className="text-[20px]" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
                className="w-10 h-10 rounded-xl bg-surface-container-lowest shadow-md border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                aria-label="Zoom out map"
              >
                <Icon name="remove" className="text-[20px]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoomLevel(1);
                  setSelectedClinicId('al-zahra');
                }}
                className="w-10 h-10 rounded-xl bg-surface-container-lowest shadow-md border border-outline-variant/30 flex items-center justify-center text-primary hover:bg-surface-container transition-colors"
                aria-label="Recenter map"
                title="Recenter"
              >
                <Icon name="my_location" className="text-[20px]" />
              </button>
            </div>

            {/* Stylized Vector Map Canvas */}
            <div className="w-full h-full overflow-hidden relative bg-[#e8eef6] select-none flex items-center justify-center">
              <svg
                viewBox="0 0 700 520"
                className="w-full h-full transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* Background Grid Pattern */}
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d5deec" strokeWidth="0.8" />
                  </pattern>
                  <linearGradient id="creekGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#cde5ff" />
                    <stop offset="100%" stopColor="#94ccff" />
                  </linearGradient>
                </defs>

                <rect width="700" height="520" fill="url(#grid)" />

                {/* Dubai Creek Curved Vector Body */}
                <path
                  d="M 680 0 C 600 60, 480 80, 420 120 C 370 150, 350 180, 390 230 C 420 270, 480 280, 520 330 C 560 380, 510 440, 460 520 L 700 520 L 700 0 Z"
                  fill="url(#creekGrad)"
                  opacity="0.75"
                />

                {/* District Enclaves */}
                {/* Oud Metha Medical Zone */}
                <rect
                  x="280"
                  y="160"
                  width="130"
                  height="120"
                  rx="16"
                  fill="#dae2fd"
                  opacity="0.45"
                  stroke="#006194"
                  strokeDasharray="4 4"
                  strokeWidth="1.2"
                />
                <text x="295" y="185" fill="#004b73" fontSize="11" fontWeight="700" fontFamily="Inter">
                  OUD METHA ZONE
                </text>

                {/* DHCC Enclave */}
                <rect
                  x="390"
                  y="230"
                  width="130"
                  height="110"
                  rx="16"
                  fill="#cce5ff"
                  opacity="0.45"
                  stroke="#007bb9"
                  strokeDasharray="4 4"
                  strokeWidth="1.2"
                />
                <text x="405" y="255" fill="#004b74" fontSize="11" fontWeight="700" fontFamily="Inter">
                  DHCC MEDICAL CLUSTER
                </text>

                {/* Jumeirah Sector */}
                <rect
                  x="100"
                  y="280"
                  width="160"
                  height="180"
                  rx="16"
                  fill="#86f2e4"
                  opacity="0.25"
                  stroke="#006a61"
                  strokeDasharray="4 4"
                  strokeWidth="1.2"
                />
                <text x="120" y="305" fill="#005049" fontSize="11" fontWeight="700" fontFamily="Inter">
                  JUMEIRAH COASTAL
                </text>

                {/* Main Arterial Roadways */}
                {/* Sheikh Zayed Road (E11) */}
                <path d="M 60 520 L 320 0" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
                <path d="M 60 520 L 320 0" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />

                {/* Sheikh Rashid Road */}
                <path d="M 200 120 L 650 350" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
                <path d="M 200 120 L 650 350" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />

                {/* Al Khail Road */}
                <path d="M 220 520 L 520 50" stroke="#cbd5e1" strokeWidth="7" strokeLinecap="round" />
                <path d="M 220 520 L 520 50" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

                {/* Road Labels */}
                <text x="110" y="440" fill="#64748b" fontSize="9" fontWeight="600" transform="rotate(-62 110 440)">
                  Sheikh Zayed Rd (E11)
                </text>
                <text x="350" y="200" fill="#64748b" fontSize="9" fontWeight="600" transform="rotate(27 350 200)">
                  Sheikh Rashid Rd
                </text>

                {/* Clickable Clinic Markers */}
                {clinics.map((clinic) => {
                  const isSelected = selectedClinicId === clinic.id;
                  return (
                    <g
                      key={clinic.id}
                      className="cursor-pointer transition-transform hover:scale-110"
                      onClick={() => setSelectedClinicId(clinic.id)}
                    >
                      {/* Pulsing ring if selected */}
                      {isSelected && (
                        <circle
                          cx={clinic.cx}
                          cy={clinic.cy}
                          r="26"
                          fill="#006194"
                          opacity="0.2"
                          className="animate-ping"
                        />
                      )}

                      {/* Drop shadow pin base */}
                      <circle cx={clinic.cx} cy={clinic.cy + 3} r="16" fill="#000000" opacity="0.15" />

                      {/* Main Pin Circle */}
                      <circle
                        cx={clinic.cx}
                        cy={clinic.cy}
                        r="16"
                        fill={isSelected ? '#006194' : '#006a61'}
                        stroke="#ffffff"
                        strokeWidth="3"
                      />

                      {/* Pin Number */}
                      <text
                        x={clinic.cx}
                        y={clinic.cy + 5}
                        fill="#ffffff"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="Inter"
                      >
                        {clinic.pinNumber}
                      </text>

                      {/* Pin Label Pill */}
                      <rect
                        x={clinic.cx - 55}
                        y={clinic.cy - 34}
                        width="110"
                        height="20"
                        rx="6"
                        fill={isSelected ? '#131b2e' : '#ffffff'}
                        stroke={isSelected ? '#006194' : '#bfc7d2'}
                        strokeWidth="1"
                        opacity="0.95"
                      />
                      <text
                        x={clinic.cx}
                        y={clinic.cy - 20}
                        fill={isSelected ? '#ffffff' : '#131b2e'}
                        fontSize="9.5"
                        fontWeight="600"
                        textAnchor="middle"
                        fontFamily="Inter"
                      >
                        {clinic.name.split(' ')[0]} {clinic.name.split(' ')[1]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Map Legend */}
            <div className="p-3 bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline-variant/30 flex items-center justify-between text-label-sm">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-on-surface">
                  <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
                  Selected Facility
                </span>
                <span className="flex items-center gap-1.5 text-on-surface">
                  <span className="w-3 h-3 rounded-full bg-secondary inline-block"></span>
                  Accredited Clinics
                </span>
              </div>
              <span className="text-on-surface-variant font-medium">Click any pin to inspect</span>
            </div>
          </div>

          {/* Right: Selected Clinic Detail Card + List (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Active Selected Card */}
            <div className="bg-surface-container-lowest rounded-3xl p-5 border-2 border-primary shadow-md space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">
                    <Icon name="verified" className="text-[14px]" />
                    <span>{selectedClinic.accreditation}</span>
                  </span>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface pt-1">
                    {selectedClinic.name}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center shrink-0">
                  {selectedClinic.pinNumber}
                </div>
              </div>

              <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-lg">
                  <Icon name="star" className="text-amber-500 text-[15px] fill-current" />
                  <span className="font-bold text-on-surface">{selectedClinic.rating}</span>
                  <span>({selectedClinic.reviewsCount})</span>
                </div>
                <span>•</span>
                <span className="text-secondary font-semibold">{selectedClinic.distance}</span>
              </div>

              <div className="space-y-2 text-body-sm text-on-surface-variant bg-surface-container-low p-3.5 rounded-2xl">
                <div className="flex items-start gap-2">
                  <Icon name="location_on" className="text-secondary text-[17px] shrink-0 mt-0.5" />
                  <span>{selectedClinic.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="call" className="text-primary text-[17px] shrink-0" />
                  <span>{selectedClinic.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="schedule" className="text-secondary text-[17px] shrink-0" />
                  <span className="text-on-surface font-semibold">Next Available: {selectedClinic.nextSlot}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selectedClinic.specialities.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-outline-variant/30 space-y-2">
                <button
                  type="button"
                  onClick={() => navigate('/patient-dashboard/discovery/clinic')}
                  className="w-full py-3 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Icon name="apartment" className="text-[18px]" />
                  <span>View Full Clinic Profile</span>
                </button>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedClinic.phone}`}
                    className="flex-1 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-title-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Icon name="call" className="text-[17px] text-primary" />
                    <span>Call</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => alert(`Starting Google Maps directions to ${selectedClinic.address}...`)}
                    className="flex-1 py-2.5 bg-secondary hover:bg-secondary-fixed text-on-secondary hover:text-on-secondary-fixed rounded-xl font-title-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Icon name="directions" className="text-[17px]" />
                    <span>Navigate</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Other Nearby Facilities Quick Selector */}
            <div className="bg-surface-container-lowest rounded-3xl p-4 border border-outline-variant/30 space-y-2">
              <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-bold block px-1">
                Other Facilities in Area
              </span>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {clinics
                  .filter((c) => c.id !== selectedClinicId)
                  .map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedClinicId(c.id)}
                      className="w-full p-2.5 rounded-xl hover:bg-surface-container text-left flex items-center justify-between transition-colors border border-outline-variant/20"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-surface-container-high text-primary font-bold text-label-sm flex items-center justify-center shrink-0">
                          {c.pinNumber}
                        </span>
                        <div className="truncate">
                          <span className="font-title-sm text-on-surface block truncate">{c.name}</span>
                          <span className="font-label-sm text-on-surface-variant">{c.district} • {c.distance}</span>
                        </div>
                      </div>
                      <Icon name="chevron_right" className="text-[18px] text-on-surface-variant shrink-0" />
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}

