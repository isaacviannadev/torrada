import { useSyncExternalStore } from 'react';
import { useToast } from '../core/context';
import type { ToastRecord } from '../core/types';

/**
 * Minimum viewport to display toasts.
 * No styles/positioning/animation.
 */
export function ToastViewport() {
  const { _store, dismiss } = useToast();

  const toasts = useSyncExternalStore(
    _store.subscribe,
    _store.getSnapshot,
    _store.getSnapshot
  );

  return (
    <div role='region' aria-label='Notifications'>
      <ul>
        {toasts.map((t: ToastRecord) => (
          <li key={t.id}>
            <div
              role={t.kind === 'error' ? 'alert' : 'status'}
              aria-live={t.kind === 'error' ? 'assertive' : 'polite'}
            >
              {t.title && <strong>{t.title}</strong>}
              {t.description && <div>{t.description}</div>}
              <button
                aria-label='Close notification'
                onClick={() => dismiss(t.id)}
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
