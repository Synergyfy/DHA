import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Icon } from './Primitives';

interface ToastMessage {
  id: number;
  text: string;
  tone: 'neutral' | 'success';
}

interface ToastContextValue {
  showToast: (text: string, tone?: 'neutral' | 'success') => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Lightweight toast used for simulated interactions (Stitch uses an
 * equivalent fixed pill toast on button press). Frontend-only feedback —
 * it never represents a completed real-world transaction.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback((text: string, tone: 'neutral' | 'success' = 'neutral') => {
    const id = ++nextId.current;
    setToasts((prev) => [...prev, { id, text, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex flex-col items-center gap-2 px-4 pb-safe"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={[
              'flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full px-4 py-2',
              'font-label-md text-label-md shadow-lg',
              toast.tone === 'success'
                ? 'bg-primary text-on-primary'
                : 'bg-on-surface text-surface',
            ].join(' ')}
          >
            {toast.tone === 'success' ? (
              <Icon name="check_circle" className="text-[16px]" filled />
            ) : null}
            <span className="text-center">{toast.text}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
