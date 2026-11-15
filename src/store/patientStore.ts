import { create } from 'zustand';

export interface PatientProfile {
  id: string;
  name: string;
  shortName: string;
  role: string;
  initials: string;
  lifecode: string;
  avatarBg: string;
  avatarColor: string;
  type: 'adult' | 'guardian' | 'child';
  age?: number;
  dentition: string;
  teethCount: number;
  upcomingVisit?: string;
  verified: boolean;
}

export const PROFILES: Record<string, PatientProfile> = {
  amara: {
    id: 'amara',
    name: 'Amara Chioma Okafor',
    shortName: 'Amara',
    role: 'Verified Active Patient',
    initials: 'AO',
    lifecode: 'DHA-9420-ORL',
    avatarBg: 'bg-primary-fixed',
    avatarColor: 'text-on-primary-fixed',
    type: 'adult',
    dentition: 'Permanent Dentition',
    teethCount: 28,
    upcomingVisit: 'Fri, Jan 24 • 10:30 AM',
    verified: true,
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah Al-Mansoor',
    shortName: 'Sarah Al-M.',
    role: 'Guardian / Account Owner',
    initials: 'SM',
    lifecode: 'DHA-8102-ADL',
    avatarBg: 'bg-secondary-container',
    avatarColor: 'text-on-secondary-container',
    type: 'guardian',
    dentition: 'Permanent Dentition',
    teethCount: 32,
    upcomingVisit: 'Wed, Feb 12 • 02:00 PM',
    verified: true,
  },
  tariq: {
    id: 'tariq',
    name: 'Tariq Okafor',
    shortName: 'Tariq (Child)',
    role: 'Child Dependent (Age 6)',
    initials: 'TO',
    lifecode: 'DHA-9420-CHD1',
    avatarBg: 'bg-secondary-container',
    avatarColor: 'text-on-secondary-container',
    type: 'child',
    age: 6,
    dentition: 'Primary Dentition (Deciduous)',
    teethCount: 20,
    upcomingVisit: 'Tue, Jan 28 • 03:30 PM',
    verified: true,
  },
  zayd: {
    id: 'zayd',
    name: 'Zayd Okafor',
    shortName: 'Zayd (Child)',
    role: 'Child Dependent (Age 9)',
    initials: 'ZO',
    lifecode: 'DHA-9420-CHD2',
    avatarBg: 'bg-surface-container-highest',
    avatarColor: 'text-primary',
    type: 'child',
    age: 9,
    dentition: 'Mixed Dentition Stage',
    teethCount: 24,
    upcomingVisit: 'Thu, Mar 06 • 11:00 AM',
    verified: true,
  },
};

interface PatientStoreState {
  activeProfileId: string;
  activeProfile: PatientProfile;
  setActiveProfile: (id: string) => void;
  qrModalOpen: boolean;
  setQrModalOpen: (open: boolean) => void;
  flossingReminder: boolean;
  toggleFlossingReminder: () => void;
  fluorideReminder: boolean;
  toggleFluorideReminder: () => void;
  unreadCount: number;
  decrementUnread: () => void;
  clearUnread: () => void;
}

export const usePatientStore = create<PatientStoreState>((set) => ({
  activeProfileId: 'amara',
  activeProfile: PROFILES.amara,
  setActiveProfile: (id: string) => {
    const profile = PROFILES[id] || PROFILES.amara;
    set({ activeProfileId: id, activeProfile: profile });
  },
  qrModalOpen: false,
  setQrModalOpen: (open: boolean) => set({ qrModalOpen: open }),
  flossingReminder: true,
  toggleFlossingReminder: () => set((state) => ({ flossingReminder: !state.flossingReminder })),
  fluorideReminder: true,
  toggleFluorideReminder: () => set((state) => ({ fluorideReminder: !state.fluorideReminder })),
  unreadCount: 3,
  decrementUnread: () => set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) })),
  clearUnread: () => set({ unreadCount: 0 }),
}));

