import React from 'react';
import type { ToastRecord } from '../core/types';

type Props = {
  toast: ToastRecord;
  onClose: (id: string) => void;
  announce?: 'polite' | 'assertive';
  className?: string;
  style?: React.CSSProperties;
};

export function ToastItem({
  toast,
  onClose,
  announce = 'polite',
  className,
  style,
}: Props) {
  const role =
    toast.kind === 'error' || announce === 'assertive' ? 'alert' : 'status';
  const ariaLive = role === 'alert' ? 'assertive' : 'polite';

  return (
    <div
      className={['t-item', toast.kind, className].filter(Boolean).join(' ')}
      role={role}
      aria-live={ariaLive}
      style={style}
    >
      <div className='t-row'>
        <div className='t-col' style={{ flex: 1 }}>
          {toast.title && <div className='t-title'>{toast.title}</div>}
          {toast.description && (
            <div className='t-desc'>{toast.description}</div>
          )}
        </div>
        <button
          className='t-close'
          aria-label='Close notification'
          onClick={() => onClose(toast.id)}
        >
          ×
        </button>
      </div>
    </div>
  );
}
