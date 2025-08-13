import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToastProvider, ToastViewport, useToast } from '../../src';

function Demo() {
  const { toast } = useToast();
  return <button onClick={() => toast({ title: 'Saved' })}>Make Toast</button>;
}

describe('provider + viewport (smoke)', () => {
  it('renders and show a toast', () => {
    render(
      <ToastProvider>
        <Demo />
        <ToastViewport />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Make Toast'));
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });
});
