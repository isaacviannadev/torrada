import {
  ToastOptions,
  ToastRecord,
  ToastStore,
  ToastStoreConfig,
} from './types';

function uid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `t_${Math.random().toString(36).slice(2, 10)}`;
}

export function createToastStore(
  initial?: Partial<ToastStoreConfig>
): ToastStore {
  let config: ToastStoreConfig = {
    max: 5,
    defaultDuration: 5000,
    ...initial,
  };

  let toasts: ToastRecord[] = [];
  const timers = new Map<string, ReturnType<typeof setTimeout>>();
  const subs = new Set<() => void>();

  const emit = () => subs.forEach((s) => s());

  const clearAuto = (id: string) => {
    const t = timers.get(id);
    if (t) {
      clearTimeout(t);
      timers.delete(id);
    }
  };

  const scheduleAuto = (id: string, duration: number) => {
    clearAuto(id);
    const t = setTimeout(() => {
      api.dismiss(id);
    }, duration);
    timers.set(id, t);
  };

  const api: ToastStore = {
    getSnapshot() {
      return toasts;
    },
    subscribe(cb) {
      subs.add(cb);
      return () => subs.delete(cb);
    },

    add(opts: ToastOptions) {
      const id = opts.id ?? uid();
      const record: ToastRecord = {
        id,
        title: opts.title,
        description: opts.description,
        kind: opts.kind ?? 'info',
        createdAt: Date.now(),
        duration: opts.duration ?? config.defaultDuration,
      };

      const withNew = [record, ...toasts];

      let next = withNew;
      if (withNew.length > config.max) {
        const removed = withNew.slice(config.max);
        for (const r of removed) clearAuto(r.id);
        next = withNew.slice(0, config.max);
      }

      toasts = next;

      scheduleAuto(id, record.duration);

      emit();
      return id;
    },

    update(id, patch) {
      let changed = false;
      toasts = toasts.map((t) => {
        if (t.id !== id) return t;
        changed = true;
        const next: ToastRecord = {
          ...t,
          ...patch,
          duration: patch.duration ?? t.duration,
        };
        if (patch.duration !== undefined) {
          scheduleAuto(id, next.duration);
        }
        return next;
      });
      if (changed) emit();
    },

    dismiss(id) {
      const before = toasts.length;
      toasts = toasts.filter((t) => t.id !== id);
      clearAuto(id);
      if (toasts.length !== before) emit();
    },

    dismissAll() {
      for (const t of toasts) clearAuto(t.id);
      toasts = [];
      emit();
    },

    setConfig(next) {
      config = { ...config, ...next };
      emit();
    },
  };

  return api;
}
