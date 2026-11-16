import { create } from 'zustand';

/**
 * Demo auth session state.
 *
 * The build has no backend: signing in stores a lightweight demo user in
 * localStorage so the UI can react to a signed-in session (e.g. the landing
 * header swaps Get Started / Log In for the account avatar). Signing out
 * clears it again.
 */
export interface AuthUser {
  name: string;
  initials: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  signIn: (user?: Partial<AuthUser>) => void;
  signOut: () => void;
}

const STORAGE_KEY = 'dha-demo-session';

const DEFAULT_USER: AuthUser = {
  name: 'Amara Okafor',
  initials: 'AO',
  role: 'Patient account',
};

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function loadUser(): AuthUser | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AuthUser>;
    if (!parsed || typeof parsed.name !== 'string') return null;
    return {
      name: parsed.name,
      initials: parsed.initials || initialsFor(parsed.name),
      role: parsed.role || DEFAULT_USER.role,
    };
  } catch {
    return null;
  }
}

function persistUser(user: AuthUser | null): void {
  try {
    if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage may be unavailable (private mode) — session stays in memory.
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: loadUser(),
  signIn: (user) => {
    const next: AuthUser = {
      ...DEFAULT_USER,
      ...user,
      initials: user?.initials || initialsFor(user?.name ?? DEFAULT_USER.name),
    };
    persistUser(next);
    set({ user: next });
  },
  signOut: () => {
    persistUser(null);
    set({ user: null });
  },
}));
