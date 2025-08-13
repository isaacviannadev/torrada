import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ToastProvider, ToastViewport, useToast } from '../../src';

function Demo() {
  const { toast } = useToast();
  return <button onClick={() => toast({ title: 'Bye' })}>spawn</button>;
}

describe('animations', () => {
  it('apply class leaving and only remove after delay', async () => {
    render(
      <ToastProvider>
        <Demo />
        <ToastViewport animationMs={180} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('spawn'));
    const item = await screen.findByText('Bye');
    const root = item.closest('.t-item')!;
    expect(root).toBeTruthy();

    const close = screen.getByRole('button', { name: /close notification/i });
    fireEvent.click(close);

    await vi.waitFor(() => {
      expect(root.className).toMatch(/leaving/);
    });

    await vi.waitFor(
      () => {
        expect(screen.queryByText('Bye')).toBeNull();
      },
      { timeout: 1000 }
    );
  });
});
