import React, { createContext, useContext, useMemo } from 'react';
import { createToastStore } from './store';
import type { ToastOptions, ToastStore, ToastStoreConfig } from './types';

type Ctx = {
  store: ToastStore;
};

const ToastContext = createContext<Ctx | null>(null);

export type ToastProviderProps = Partial<ToastStoreConfig> & {
  children: React.ReactNode;
};

export function ToastProvider({
  children,
  max = 5,
  defaultDuration = 5000,
}: ToastProviderProps) {
  const store = useMemo(
    () => createToastStore({ max, defaultDuration }),
    [max, defaultDuration]
  );
  return (
    <ToastContext.Provider value={{ store }}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within <ToastProvider>');
  }
  const { store } = ctx;

  return {
    toast: (opts: ToastOptions) => store.add(opts),
    dismiss: (id: string) => store.dismiss(id),
    dismissAll: () => store.dismissAll(),
    update: (id: string, patch: Partial<Omit<ToastOptions, 'id'>>) =>
      store.update(id, patch as any),
    customToast: (opts: Omit<ToastOptions, 'kind'>) =>
      store.add({ ...opts, kind: 'custom' }),
    _store: store,
  };
}
