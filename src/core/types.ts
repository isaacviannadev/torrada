import type React from 'react';

export type ToastKind = 'success' | 'error' | 'info' | 'warning' | 'custom';

export type DismissReason = 'auto' | 'manual';

export type ToastOptions = {
  id?: string;
  title?: string;
  description?: string;
  kind?: ToastKind;
  duration?: number; // ms
  customContent?: React.ReactNode;
  customClassName?: string;
  customStyle?: React.CSSProperties;
  customIcon?: React.ReactNode;
  customActions?: React.ReactNode;
};

export type ToastRecord = Required<Pick<ToastOptions, 'id'>> & {
  title?: string;
  description?: string;
  kind: ToastKind;
  createdAt: number;
  duration: number;
  customContent?: React.ReactNode;
  customClassName?: string;
  customStyle?: React.CSSProperties;
  customIcon?: React.ReactNode;
  customActions?: React.ReactNode;
};

export type ToastStoreConfig = {
  max: number; // maximum toasts in the stack
  defaultDuration: number; // default duration (ms)
  beforeDismiss?: (id: string, reason: DismissReason) => void | Promise<void>;
};

export type ToastStore = {
  getSnapshot(): ToastRecord[];
  subscribe(cb: () => void): () => void;

  add(opts: ToastOptions): string;
  update(
    id: string,
    patch: Partial<Omit<ToastRecord, 'id' | 'createdAt'>>
  ): void;
  dismiss(id: string): void;
  dismissAll(): void;
  setConfig(next: Partial<ToastStoreConfig>): void;
};
