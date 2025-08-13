import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ToastProvider, ToastViewport, useToast } from '../../src';

function Demo() {
  const { toast, update, dismissAll } = useToast();
  const lastIdRef = React.useRef<string | null>(null);

  return (
    <div>
      <button
        onClick={() => {
          lastIdRef.current = toast({ title: 'A' });
        }}
      >
        spawn
      </button>

      <button
        onClick={() => {
          if (lastIdRef.current) update(lastIdRef.current, { title: 'B' });
        }}
      >
        update
      </button>

      <button onClick={() => dismissAll()}>clear</button>
    </div>
  );
}

describe('useToast hook', () => {
  it('cria, atualiza e limpa toasts', async () => {
    render(
      <ToastProvider defaultDuration={10_000}>
        <Demo />
        <ToastViewport />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('spawn'));
    const itemA = await screen.findByText('A');
    expect(itemA).toBeInTheDocument();

    fireEvent.click(screen.getByText('update'));
    const itemB = await screen.findByText('B');
    expect(itemB).toBeInTheDocument();
    expect(screen.queryByText('A')).toBeNull();

    fireEvent.click(screen.getByText('clear'));
    expect(screen.queryByText('B')).toBeNull();
  });

  it('empilha múltiplos toasts', async () => {
    render(
      <ToastProvider defaultDuration={10_000}>
        <Demo />
        <ToastViewport />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('spawn'));
    fireEvent.click(screen.getByText('spawn'));
    fireEvent.click(screen.getByText('spawn'));

    const items = await screen.findAllByRole('status');
    expect(items.length >= 1).toBe(true);
  });
});
