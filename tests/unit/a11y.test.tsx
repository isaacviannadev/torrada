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
  it('usa role=status e aria-live=polite por padrão', async () => {
    render(
      <ToastProvider>
        <DemoOnce title='Polite' />
        <ToastViewport />
      </ToastProvider>
    );
    const el = await screen.findByText('Polite');
    // o contêiner com role está no ancestor (t-item)
    const item = el.closest('.t-item')!;
    expect(item).toHaveAttribute('role', 'status');
    expect(item).toHaveAttribute('aria-live', 'polite');
    expect(item).toHaveAttribute('aria-atomic', 'true');
  });

  it('erros sobem para assertive automaticamente', async () => {
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

  it('botão de fechar é acessível por rótulo e Esc fecha', async () => {
    render(
      <ToastProvider>
        <DemoOnce title='CloseMe' />
        <ToastViewport />
      </ToastProvider>
    );
    const itemText = await screen.findByText('CloseMe');
    const item = itemText.closest('.t-item')!;
    // botão close acessível
    const closeBtn = screen.getByRole('button', {
      name: /close notification/i,
    });
    expect(closeBtn).toBeInTheDocument();

    // envia ESC para o item
    item.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    // aguarda sumir
    await screen.findByRole('region', { name: /notifications/i }); // viewport continua
    expect(screen.queryByText('CloseMe')).toBeNull();
  });

  it('não rouba foco ao montar', async () => {
    render(
      <ToastProvider>
        <DemoOnce title='NoFocus' />
        <ToastViewport />
      </ToastProvider>
    );
    await screen.findByText('NoFocus');
    // foco permanece no body (ou no que estiver ativo no teste)
    expect(document.activeElement === document.body).toBe(true);
  });
});
