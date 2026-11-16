/**
 * Public-facing provider profiles featured on the landing page.
 *
 * These power the public profile pages at
 * `/find-care/dentist-profile/:providerId` and
 * `/find-care/clinic-profile/:providerId` — pages anyone can view without a
 * patient-dashboard session.
 */
export type PublicProviderKind = 'dentist' | 'clinic';

export interface PublicProviderProfile {
  id: string;
  kind: PublicProviderKind;
  name: string;
  specialty: string;
  location: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  availabilityLabel: string;
  availability: string;
  about: string;
  services: string[];
  credentials: string[];
  hours: string[];
}

export const PUBLIC_PROVIDERS: PublicProviderProfile[] = [
  {
    id: 'nnamdi-obi',
    kind: 'dentist',
    name: 'Dr. Nnamdi Obi',
    specialty: 'Pediatric Dental Specialist',
    location: 'Ikoyi Dental Care, Lagos',
    badge: 'MDCN Licensed Clinician',
    rating: 4.9,
    reviewsCount: 142,
    imageUrl: 'https://images.pexels.com/photos/5355862/pexels-photo-5355862.jpeg?auto=compress&cs=tinysrgb&w=1200',
    availabilityLabel: 'Next Slot',
    availability: 'Tomorrow at 10:30 AM',
    about:
      'Paediatric and general dental specialist focused on gentle, prevention-first care for children and families. Dr. Obi combines behaviour-guided dentistry with evidence-based preventive protocols to make every visit comfortable and effective.',
    services: [
      'Paediatric check-ups & cleanings',
      'Early childhood caries treatment',
      'Pit-and-fissure sealants',
      'Fluoride varnish programmes',
      'Silver diamine fluoride therapy',
      'Child emergency dental care',
    ],
    credentials: [
      'MDCN Licensed Clinician (DHA #48912)',
      'MBBS, BDS — Paediatric Dentistry residency',
      'Member, Nigerian Dental Association',
    ],
    hours: ['Mon – Fri: 8:00 AM – 5:00 PM', 'Saturday: 9:00 AM – 1:00 PM', 'Sunday: Emergency cases only'],
  },
  {
    id: 'amina-bello',
    kind: 'dentist',
    name: 'Dr. Amina Bello',
    specialty: 'Orthodontist & Clear Aligners',
    location: 'Maitama Healthcare, Abuja',
    badge: 'MDCN Consultant Orthodontist',
    rating: 5.0,
    reviewsCount: 98,
    imageUrl: 'https://images.pexels.com/photos/5234472/pexels-photo-5234472.jpeg?auto=compress&cs=tinysrgb&w=1200',
    availabilityLabel: 'Next Slot',
    availability: 'Available Today at 4:00 PM',
    about:
      'Consultant orthodontist specialising in discreet aligners, complex bite correction and facial-growth guidance for teens and adults. Every treatment plan starts with a full digital scan and a clear, staged timeline.',
    services: [
      'Clear aligner therapy',
      'Fixed braces (metal & ceramic)',
      'Teen orthodontic screening',
      'Bite & jaw alignment reviews',
      'Retainers and relapse correction',
      'Digital smile assessment',
    ],
    credentials: [
      'MDCN Consultant Orthodontist (DHA #51207)',
      'BDS, FDS RCS — Orthodontics',
      'Invisalign® certified provider',
    ],
    hours: ['Mon – Thu: 9:00 AM – 6:00 PM', 'Friday: 9:00 AM – 3:00 PM', 'Saturday: By appointment'],
  },
  {
    id: 'lagos-smile-centre',
    kind: 'clinic',
    name: 'Lagos Smile Centre',
    specialty: 'Comprehensive Multi-Speciality Clinic',
    location: 'Victoria Island, Lagos',
    badge: 'Accredited Polyclinic',
    rating: 4.8,
    reviewsCount: 310,
    imageUrl: 'https://images.pexels.com/photos/6809645/pexels-photo-6809645.jpeg?auto=compress&cs=tinysrgb&w=1200',
    availabilityLabel: 'Hours',
    availability: 'Open 7 Days • Emergency Dental',
    about:
      'An accredited multi-speciality dental polyclinic bringing general, surgical, orthodontic and emergency dentistry under one roof. Fully integrated with DHA verified records and NHIA billing for seamless, consent-based care.',
    services: [
      'General & preventive dentistry',
      'Emergency dental unit (7 days)',
      'Oral surgery & extractions',
      'Implants and prosthodontics',
      'Orthodontics & clear aligners',
      'Digital X-ray and 3D imaging',
    ],
    credentials: [
      'DHA Accredited Polyclinic (DHA #CL-2291)',
      'NHIA participating facility',
      '12 verified practitioners on staff',
    ],
    hours: [
      'Mon – Sat: 8:00 AM – 8:00 PM',
      'Sunday: 10:00 AM – 6:00 PM',
      'Emergency desk: 24/7 triage line',
    ],
  },
  {
    id: 'farouk-Okafor',
    kind: 'dentist',
    name: 'Dr. Chinedu Okafor',
    specialty: 'Paediatric & General Specialist',
    location: 'Ikeja Clinic, Lagos',
    badge: 'DHA Licensed Clinician',
    rating: 4.9,
    reviewsCount: 124,
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrB5Fh5Z4sSivDOwoz5udceVl1zMwb6p9qFM2yCLKg9yhQ10zfb_h4r-W9uDb7rmu9yo-AuSih3N2GqYUuEcjkBl1ZMocgBhdSrrjvWKC3P7JC9POH0qetd7y9eGnCzh5b-B2oThvts1nMDawQUTqYzpmqj5d4Mq_Uc7560oa2AnotqsObZ4a74ziOfemyPXd0tU9X0IBnOXS6wd7VhXPck2xZ_pZgTJcqCviTcCVic',
    availabilityLabel: 'Next Slot',
    availability: 'Tomorrow 10:00 AM',
    about:
      'Paediatric and general dentist combining gentle child-focused care with routine adult dentistry. Fast-Track appointments keep waiting times short for families and first-time visitors.',
    services: [
      'Paediatric check-ups & cleanings',
      'Fluoride and sealant programmes',
      'Fillings and minimally invasive restorations',
      'Family routine dentistry',
      'Same-week emergency triage',
    ],
    credentials: ['DHA #48912 — Licensed Practitioner', 'Member, Nigerian Dental Association'],
    hours: ['Sat – Thu: 9:00 AM – 6:00 PM', 'Friday: Closed', 'Fast-Track slots: Daily 10:00 AM'],
  },
  {
    id: 'reem-Nwosu',
    kind: 'dentist',
    name: 'Dr. Reem Nwosu',
    specialty: 'Consultant Orthodontist',
    location: 'Victoria Island Orthodontic Studio, Lagos',
    badge: 'DHA Consultant Orthodontist',
    rating: 5.0,
    reviewsCount: 98,
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrD31ppAHvEd2CGLC4CN9AES9bcs_wBcFixmKwUFtaj_5PSPU6CVXXZHw6j7v7C4_sbNtrzknzONtUTBKp_SG7zKSNdMg_kqm9yu6lh36QI1XFaoYkm_wdeKLljiZwSxLx0Ahs01s7poa2g80QTy4P5UuF7uABUj_3Q79RtgsolL78gjIedWICsZ1b6LYfkX-Ucaj8y6WJVrk-EzAESur7BtjEQ-4xEHfuHsgV_qm2B1AA',
    availabilityLabel: 'Next Slot',
    availability: 'Today 4:00 PM',
    about:
      'Consultant orthodontist delivering same-day assessments and staged aligner or fixed-brace treatment for teens and adults, with digital treatment planning at every step.',
    services: [
      'Clear aligner therapy',
      'Fixed braces (ceramic & metal)',
      'Same-day orthodontic assessment',
      'Retainers and relapse correction',
      'Growth and bite reviews for teens',
    ],
    credentials: ['DHA #51204 — Consultant Orthodontist', 'MSc Orthodontics, certified aligner provider'],
    hours: ['Mon – Fri: 10:00 AM – 7:00 PM', 'Saturday: 10:00 AM – 3:00 PM', 'Same-day slots until 4:00 PM'],
  },
  {
    id: 'Bello-dental-hub',
    kind: 'clinic',
    name: 'Lagos Smile Dental Centre',
    specialty: 'Multi-Speciality Centre (General, Cosmetic, Surgery)',
    location: 'Ikeja, Lagos',
    badge: 'DHA Accredited Facility',
    rating: 4.8,
    reviewsCount: 310,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8zADe8I0laqW0tE8uvNrafsAbjbXTBBF2_I3baxK_AImmUeZqpBIodu7j6a7MVN-jZZ6qO5KyK0htQWZnRATNaZF_UNKuk6wTOgGN0-Yb0XYd3cUIAxGCOVc6DziFJJthFZyCN2w8cngdpQ5imMe8wtSGBeZM24m9B7MrvSR5dfluHWBMIHqM7KEUrbUJt2LljHqbXDmm0BpVbczEsMvIMswOzA5_YTE0D_vwV8fE',
    availabilityLabel: 'Hours',
    availability: 'Available Daily • Walk-ins OK',
    about:
      'A busy multi-speciality dental hub with 10 licensed practitioners covering general, cosmetic and surgical dentistry under one roof — walk-ins accepted daily.',
    services: [
      'General & cosmetic dentistry',
      'Oral & maxillofacial surgery',
      'Implants and full-mouth rehabilitation',
      'Endodontics (root canal therapy)',
      'Hygienist cleanings & whitening',
    ],
    credentials: ['DHA Facility #9021 — Accredited Centre', '10 licensed DHA practitioners'],
    hours: ['Daily: 8:00 AM – 9:00 PM', 'Friday: 2:00 PM – 9:00 PM', 'Walk-ins accepted all week'],
  },
];

export function findPublicProvider(id?: string): PublicProviderProfile | undefined {
  return PUBLIC_PROVIDERS.find((provider) => provider.id === id);
}
