import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createToastStore } from '../../src/core/store';

describe('toast store', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds and stacks with limit (FIFO)', () => {
    const store = createToastStore({ max: 2, defaultDuration: 5000 });
    const id1 = store.add({ title: 'a' });
    const id2 = store.add({ title: 'b' });
    const id3 = store.add({ title: 'c' });

    const snap = store.getSnapshot();
    expect(snap.length).toBe(2);
    const ids = snap.map((t) => t.id);
    expect(ids).not.toContain(id1);
    expect(ids[0]).toBe(id3);
    expect(ids[1]).toBe(id2);
  });

  it('auto-dismiss after duration', () => {
    const store = createToastStore({ max: 5, defaultDuration: 1000 });
    const id = store.add({ title: 'bye' });
    expect(store.getSnapshot().some((t) => t.id === id)).toBe(true);

    vi.advanceTimersByTime(1000);
    expect(store.getSnapshot().some((t) => t.id === id)).toBe(false);
  });

  it('dismiss manual remove immediately', () => {
    const store = createToastStore({ max: 5, defaultDuration: 10000 });
    const id = store.add({ title: 'x' });
    store.dismiss(id);
    expect(store.getSnapshot().some((t) => t.id === id)).toBe(false);
  });

  it('update allows changing duration and rescheduling auto-dismiss', () => {
    const store = createToastStore({ defaultDuration: 10000 });
    const id = store.add({ title: 'x' });
    store.update(id, { duration: 500 });
    vi.advanceTimersByTime(400);
    expect(store.getSnapshot().some((t) => t.id === id)).toBe(true);
    vi.advanceTimersByTime(200);
    expect(store.getSnapshot().some((t) => t.id === id)).toBe(false);
  });
});
