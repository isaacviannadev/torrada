import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ToastProvider, ToastViewport, useToast } from '../../src';

function DemoOnce(props: {
  kind?: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  announce?: 'polite' | 'assertive';
}) {
  const { toast } = useToast();
  React.useEffect(() => {
    toast({ kind: props.kind ?? 'info', title: props.title ?? 'Hello SR' });
  }, [toast, props.kind, props.title]);
  return null;
}

describe('a11y', () => {
  it('uses role=status and aria-live=polite by default', async () => {
    render(
      <ToastProvider>
        <DemoOnce title='Polite' />
        <ToastViewport />
      </ToastProvider>
    );
    const el = await screen.findByText('Polite');
    const item = el.closest('.t-item')!;
    expect(item).toHaveAttribute('role', 'status');
    expect(item).toHaveAttribute('aria-live', 'polite');
    expect(item).toHaveAttribute('aria-atomic', 'true');
  });

  it('errors are automatically raised to assertive', async () => {
    render(
      <ToastProvider>
        <DemoOnce kind='error' title='Boom' />
        <ToastViewport />
      </ToastProvider>
    );
    const el = await screen.findByText('Boom');
    const item = el.closest('.t-item')!;
    expect(item).toHaveAttribute('role', 'alert');
    expect(item).toHaveAttribute('aria-live', 'assertive');
  });

  it('close button is accessible by label and Esc closes', async () => {
    render(
      <ToastProvider>
        <DemoOnce title='CloseMe' />
        <ToastViewport />
      </ToastProvider>
    );
    const itemText = await screen.findByText('CloseMe');
    const item = itemText.closest('.t-item')!;
    const closeBtn = screen.getByRole('button', {
      name: /close notification/i,
    });
    expect(closeBtn).toBeInTheDocument();

    item.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );

    // Aguarda a remoção do toast (considerando o delay da animação)
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(screen.queryByText('CloseMe')).toBeNull();
  });

  it('does not steal focus when mounting', async () => {
    render(
      <ToastProvider>
        <DemoOnce title='NoFocus' />
        <ToastViewport />
      </ToastProvider>
    );
    await screen.findByText('NoFocus');
    expect(document.activeElement === document.body).toBe(true);
  });
});
