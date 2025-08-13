import React, { useSyncExternalStore } from 'react';
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
};

const posClass: Record<NonNullable<ToastViewportProps['position']>, string> = {
  'top-right': 't-top-right',
  'top-left': 't-top-left',
  'bottom-right': 't-bottom-right',
  'bottom-left': 't-bottom-left',
  'top-center': 't-top-center',
  'bottom-center': 't-bottom-center',
};

export function ToastViewport({
  position = 'top-right',
  theme = 'light',
  announce = 'polite',
  className,
  style,
}: ToastViewportProps) {
  const { _store, dismiss } = useToast();
  const toasts = useSyncExternalStore(
    _store.subscribe,
    _store.getSnapshot,
    _store.getSnapshot
  );

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
        <ToastItem key={t.id} toast={t} onClose={dismiss} announce={announce} />
      ))}
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(node, document.body);
  }
  return node;
}
