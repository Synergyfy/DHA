import { create } from 'zustand';

export type ContactMethod = 'phone' | 'email';
export type AccountType = 'self' | 'guardian';

export interface HealthAnswers {
  condition: string;
  allergy: string;
  medication: string;
  brushing: string;
  flossing: string;
  tobacco: string;
  bloodGroup: string;
  emergencyName: string;
  emergencyPhone: string;
}

const emptyHealth: HealthAnswers = {
  condition: '',
  allergy: '',
  medication: '',
  brushing: '',
  flossing: '',
  tobacco: '',
  bloodGroup: '',
  emergencyName: '',
  emergencyPhone: '',
};

interface RegistrationDraftState {
  /** Which contact route the patient chose for verification. */
  method: ContactMethod;
  phone: string;
  email: string;
  passwordSet: boolean;
  contactVerified: boolean;

  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: string;
  nin: string;
  accountType: AccountType;

  health: HealthAnswers;
  healthSaved: boolean;
  healthSkipped: boolean;

  setContact: (patch: Partial<Pick<RegistrationDraftState, 'method' | 'phone' | 'email' | 'passwordSet'>>) => void;
  setIdentity: (
    patch: Partial<
      Pick<
        RegistrationDraftState,
        'firstName' | 'middleName' | 'lastName' | 'dob' | 'gender' | 'nin' | 'accountType'
      >
    >,
  ) => void;
  setHealth: (patch: Partial<HealthAnswers>) => void;
  setFlags: (
    patch: Partial<
      Pick<RegistrationDraftState, 'contactVerified' | 'healthSaved' | 'healthSkipped'>
    >,
  ) => void;
}

/**
 * Draft of the Section 1 registration flow. Frontend-only: the data lives in
 * browser memory for the session and is never submitted anywhere. It exists so
 * the later steps (verification, personal details, summary) can show what the
 * patient actually entered instead of inventing placeholder identities.
 */
export const useRegistrationDraft = create<RegistrationDraftState>((set) => ({
  method: 'phone',
  phone: '',
  email: '',
  passwordSet: false,
  contactVerified: false,

  firstName: '',
  middleName: '',
  lastName: '',
  dob: '',
  gender: '',
  nin: '',
  accountType: 'self',

  health: { ...emptyHealth },
  healthSaved: false,
  healthSkipped: false,

  setContact: (patch) => set(patch),
  setIdentity: (patch) => set(patch),
  setHealth: (patch) =>
    set((state) => ({ health: { ...state.health, ...patch } })),
  setFlags: (patch) => set(patch),
}));
