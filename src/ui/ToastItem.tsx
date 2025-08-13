import React, { useEffect } from 'react';
import type { ToastRecord } from '../core/types';

type Props = {
  toast: ToastRecord;
  onClose: (id: string) => void;
  announce?: 'polite' | 'assertive';
  className?: string;
  style?: React.CSSProperties;
  leaving?: boolean;
  onExited?: () => void;
  animationMs?: number;
};

export function ToastItem({
  toast,
  onClose,
  announce = 'polite',
  className,
  style,
  leaving = false,
  onExited,
  animationMs = 180,
}: Props) {
  const role =
    announce === 'assertive' || toast.kind === 'error' ? 'alert' : 'status';
  const ariaLive: 'polite' | 'assertive' =
    role === 'alert' ? 'assertive' : 'polite';

  useEffect(() => {
    if (!leaving) return;
    console.log(
      '🎭 ToastItem leaving effect triggered for:',
      toast.id,
      'animationMs:',
      animationMs
    );
    const delay = animationMs;
    const id = window.setTimeout(() => {
      console.log('🎬 ToastItem onExited called for:', toast.id);
      onExited?.();
    }, delay + 20);
    return () => window.clearTimeout(id);
  }, [leaving, onExited, animationMs]);

  return (
    <div
      className={['t-item', toast.kind, leaving ? 'leaving' : '', className]
        .filter(Boolean)
        .join(' ')}
      role={role}
      aria-live={ariaLive}
      aria-atomic='true'
      style={style}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          onClose(toast.id);
        }
      }}
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            fill='currentColor'
            viewBox='0 0 256 256'
          >
            <path d='M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z'></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
