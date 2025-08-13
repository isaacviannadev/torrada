import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ToastProvider, useToast } from '../../src/core/context';
import { ToastViewport } from '../../src/ui/ToastViewport';

function TestComponent() {
  const { customToast, toast } = useToast();

  const handleCustomContentToast = () => {
    customToast({
      title: 'Custom Content',
      customContent: (
        <div data-testid='custom-content'>
          <span>🎨</span>
          <span>Design System</span>
        </div>
      ),
    });
  };

  const handleCustomIconToast = () => {
    customToast({
      title: 'Custom Icon Toast',
      description: 'This toast has a custom icon and actions',
      customIcon: <span data-testid='custom-icon'>⭐</span>,
      customActions: (
        <button
          data-testid='custom-action'
          onClick={() => toast({ kind: 'success', title: 'Action executed!' })}
        >
          Click me
        </button>
      ),
    });
  };

  const handleCustomStyleToast = () => {
    customToast({
      title: 'Custom Styled',
      customStyle: { backgroundColor: 'red' },
      customClassName: 'custom-class',
    });
  };

  return (
    <div>
      <button
        onClick={handleCustomContentToast}
        data-testid='btn-custom-content'
      >
        Custom Content
      </button>
      <button onClick={handleCustomIconToast} data-testid='btn-custom-icon'>
        Custom Icon + Actions
      </button>
      <button onClick={handleCustomStyleToast} data-testid='btn-custom-style'>
        Custom Style
      </button>
    </div>
  );
}

describe('Custom Toast', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render custom content toast', async () => {
    render(
      <ToastProvider>
        <TestComponent />
        <ToastViewport position='top-right' theme='light' />
      </ToastProvider>
    );

    fireEvent.click(screen.getByTestId('btn-custom-content'));

    await waitFor(() => {
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    expect(screen.getByText('🎨')).toBeInTheDocument();
    expect(screen.getByText('Design System')).toBeInTheDocument();
  });

  it('should render custom icon and actions toast', async () => {
    render(
      <ToastProvider>
        <TestComponent />
        <ToastViewport position='top-right' theme='light' />
      </ToastProvider>
    );

    fireEvent.click(screen.getByTestId('btn-custom-icon'));

    await waitFor(() => {
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.getByTestId('custom-action')).toBeInTheDocument();
    });

    expect(screen.getByText('⭐')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should render custom styled toast', async () => {
    render(
      <ToastProvider>
        <TestComponent />
        <ToastViewport position='top-right' theme='light' />
      </ToastProvider>
    );

    fireEvent.click(screen.getByTestId('btn-custom-style'));

    await waitFor(() => {
      const toast = document.querySelector('.t-item.custom');
      expect(toast).toBeInTheDocument();
    });

    const toast = document.querySelector('.t-item.custom');
    expect(toast).toHaveClass('custom-class');
    const computedStyle = window.getComputedStyle(toast!);
    expect(computedStyle.backgroundColor).toBe('rgb(255, 0, 0)'); // red
  });

  it('should have custom kind set to "custom"', async () => {
    render(
      <ToastProvider>
        <TestComponent />
        <ToastViewport position='top-right' theme='light' />
      </ToastProvider>
    );

    fireEvent.click(screen.getByTestId('btn-custom-content'));

    await waitFor(() => {
      const toast = document.querySelector('.t-item.custom');
      expect(toast).toBeInTheDocument();
    });

    const toast = document.querySelector('.t-item.custom');
    expect(toast).toHaveClass('custom');
  });

  it('should support custom actions with click handlers', async () => {
    render(
      <ToastProvider>
        <TestComponent />
        <ToastViewport position='top-right' theme='light' />
      </ToastProvider>
    );

    fireEvent.click(screen.getByTestId('btn-custom-icon'));

    await waitFor(() => {
      expect(screen.getByTestId('custom-action')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('custom-action'));

    await waitFor(() => {
      expect(screen.getByText('Action executed!')).toBeInTheDocument();
    });
  });
});
