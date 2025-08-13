import { render, screen, within } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ToastProvider, ToastViewport, useToast } from '../../src';

function Demo() {
  const { toast } = useToast();
  React.useEffect(() => {
    toast({ title: 'A' });
  }, [toast]);
  return null;
}

describe('viewport', () => {
  it('aplica posição e tema no viewport e renderiza toast', async () => {
    render(
      <ToastProvider>
        <Demo />
        <ToastViewport position='top-left' theme='dark' />
      </ToastProvider>
    );

    await screen.findByText('A');

    const viewport = document.body.querySelector('.t-viewport') as HTMLElement;
    expect(viewport).toBeTruthy();
    expect(viewport.className).toContain('t-top-left');
    expect(viewport.getAttribute('data-theme')).toBe('dark');
    expect(within(viewport).getByText('A')).toBeTruthy();
  });
});
