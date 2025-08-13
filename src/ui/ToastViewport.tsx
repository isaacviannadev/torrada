import React, {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import { useToast } from '../core/context';
import type { ToastRecord } from '../core/types';
import { ToastItem } from './ToastItem';
import './styles.css';

export type ToastViewportProps = {
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
  theme?: 'light' | 'dark';
  announce?: 'polite' | 'assertive';
  className?: string;
  style?: React.CSSProperties;
  animationMs?: number;
};

const posClass = {
  'top-right': 't-top-right',
  'top-left': 't-top-left',
  'bottom-right': 't-bottom-right',
  'bottom-left': 't-bottom-left',
  'top-center': 't-top-center',
  'bottom-center': 't-bottom-center',
} as const;

export function ToastViewport({
  position = 'top-right',
  theme = 'light',
  announce = 'polite',
  className,
  style,
  animationMs = 180,
}: ToastViewportProps) {
  const { _store, dismiss } = useToast();
  const toasts = useSyncExternalStore(
    _store.subscribe,
    _store.getSnapshot,
    _store.getSnapshot
  );

  const [leaving, setLeaving] = useState<Set<string>>(new Set());

  const exitDelay = useMemo(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    ) {
      return 0;
    }
    return animationMs;
  }, [animationMs]);

  useEffect(() => {
    _store.setConfig({
      beforeDismiss: (id) => {
        setLeaving((s) => new Set(s).add(id));
        return new Promise<void>((resolve) => {
          setTimeout(() => resolve(), exitDelay);
        });
      },
    });
  }, [_store, exitDelay]);

  const node = (
    <div
      className={['t-viewport', posClass[position], className]
        .filter(Boolean)
        .join(' ')}
      data-theme={theme}
      style={style}
      role='region'
      aria-label='Notifications'
    >
      {toasts.map((t: ToastRecord) => (
        <ToastItem
          key={t.id}
          toast={t}
          onClose={dismiss}
          announce={announce}
          leaving={leaving.has(t.id)}
          onExited={() => {
            setLeaving((s) => {
              if (!s.has(t.id)) return s;
              const next = new Set(s);
              next.delete(t.id);
              return next;
            });
          }}
        />
      ))}
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(node, document.body);
  }
  return node;
}
