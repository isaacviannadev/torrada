import React from 'react';
import type { ToastOptions, ToastStore, ToastStoreConfig } from './types';
export type ToastProviderProps = Partial<ToastStoreConfig> & {
    children: React.ReactNode;
};
export declare function ToastProvider({ children, max, defaultDuration, }: ToastProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useToast(): {
    toast: (opts: ToastOptions) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
    update: (id: string, patch: Partial<Omit<ToastOptions, "id">>) => void;
    _store: ToastStore;
};
