import { useState } from 'react';
import { ToastProvider, ToastViewport, ToastViewportProps, useToast } from '..';

function Controls() {
  const { toast, dismissAll } = useToast();

  return (
    <div style={{ padding: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button
        id='spawn-success'
        style={{
          padding: '8px 16px',
          backgroundColor: '#f8f9fa',
          color: '#212529',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'normal',
        }}
        onClick={() => toast({ kind: 'success', title: 'Saved!' })}
      >
        Success
      </button>
      <button
        id='spawn-error'
        style={{
          padding: '8px 16px',
          backgroundColor: '#f8f9fa',
          color: '#212529',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'normal',
        }}
        onClick={() => toast({ kind: 'error', title: 'Oops' })}
      >
        Error
      </button>
      <button
        id='spawn-warning'
        style={{
          padding: '8px 16px',
          backgroundColor: '#f8f9fa',
          color: '#212529',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'normal',
        }}
        onClick={() => toast({ kind: 'warning', title: 'Attention' })}
      >
        Warning
      </button>
      <button
        id='spawn-info'
        style={{
          padding: '8px 16px',
          backgroundColor: '#f8f9fa',
          color: '#212529',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'normal',
        }}
        onClick={() => toast({ kind: 'info', title: 'Information' })}
      >
        Info
      </button>
      <button
        id='spawn-3'
        style={{
          padding: '8px 16px',
          backgroundColor: '#f8f9fa',
          color: '#212529',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'normal',
        }}
        onClick={() => {
          toast({ title: '1' });
          toast({ title: '2' });
          toast({ title: '3' });
        }}
      >
        Spawn x3
      </button>

      <button
        id='close-all'
        style={{
          padding: '8px 16px',
          backgroundColor: '#f8f9fa',
          color: '#212529',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'normal',
        }}
        onClick={() => dismissAll()}
      >
        Close All
      </button>
    </div>
  );
}

function ControlsPositions({
  currentPosition,
  onPositionChange,
}: {
  currentPosition: ToastViewportProps['position'];
  onPositionChange: (position: ToastViewportProps['position']) => void;
}) {
  const { toast, dismissAll } = useToast();

  const positions: ToastViewportProps['position'][] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Position: {currentPosition}</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {positions.map((position) => (
            <button
              key={position}
              id={`position-${position}`}
              onClick={() => {
                if (position !== currentPosition) {
                  dismissAll();
                  onPositionChange(position);
                  toast({ title: `Position changed from ${currentPosition}` });
                } else {
                  toast({ title: currentPosition });
                }
              }}
              style={{
                padding: '8px 16px',
                backgroundColor:
                  currentPosition === position ? '#007bff' : '#f8f9fa',
                color: currentPosition === position ? 'white' : '#212529',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: currentPosition === position ? 'bold' : 'normal',
              }}
            >
              {position}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function UpdateControls() {
  const { toast, dismissAll, update } = useToast();

  const handleAsyncToast = async () => {
    const id = toast({
      kind: 'info',
      title: 'Starting operation...',
      description: 'Wait, processing...',
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      update(id, {
        kind: 'success',
        title: 'Operation concluded!',
        description: 'Asynchronous processing completed successfully! 🎉',
      });
    } catch (error) {
      update(id, {
        kind: 'error',
        title: 'Operation error',
        description: 'Failure during processing',
      });
    }
  };

  return (
    <div style={{ padding: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button
        id='async-toast'
        style={{
          padding: '8px 16px',
          backgroundColor: '#f8f9fa',
          color: '#212529',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'normal',
        }}
        onClick={handleAsyncToast}
      >
        Async Toast
      </button>
    </div>
  );
}

function CustomToastControls() {
  const { customToast, toast } = useToast();

  const handleCustomContentToast = () => {
    customToast({
      title: 'Custom Content',
      customContent: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
            }}
          >
            🎨
          </div>
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              Design System
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              Custom styled notification
            </div>
          </div>
        </div>
      ),
      duration: 8000,
    });
  };

  const handleCustomIconToast = () => {
    customToast({
      title: 'Custom Icon Toast',
      description: 'This toast has a custom icon and actions',
      customIcon: (
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#8b5cf6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
          }}
        >
          ⭐
        </div>
      ),
      customActions: (
        <>
          <button onClick={() => toast({ kind: 'success', title: 'Liked!' })}>
            👍 Like
          </button>
          <button onClick={() => toast({ kind: 'info', title: 'Shared!' })}>
            📤 Share
          </button>
        </>
      ),
      duration: 10000,
    });
  };

  const handleCustomStyleToast = () => {
    customToast({
      title: 'Custom Styled',
      description: 'Toast with custom styling and layout',
      customClassName: 'custom-gradient-toast',
      customStyle: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
      },
      duration: 6000,
    });
  };

  const handleInteractiveToast = () => {
    customToast({
      title: 'Interactive Toast',
      description: 'Click the buttons below to interact',
      customActions: (
        <>
          <button
            onClick={() =>
              toast({ kind: 'success', title: 'Action 1 executed!' })
            }
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
            }}
          >
            Action 1
          </button>
          <button
            onClick={() =>
              toast({ kind: 'warning', title: 'Action 2 executed!' })
            }
            style={{
              background: '#f59e0b',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
            }}
          >
            Action 2
          </button>
        </>
      ),
      duration: 12000,
    });
  };

  return (
    <div style={{ padding: 16 }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#8b5cf6' }}>
        Custom Toast Examples
      </h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          id='custom-content-toast'
          style={{
            padding: '8px 16px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'normal',
          }}
          onClick={handleCustomContentToast}
        >
          Custom Content
        </button>
        <button
          id='custom-icon-toast'
          style={{
            padding: '8px 16px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'normal',
          }}
          onClick={handleCustomIconToast}
        >
          Custom Icon + Actions
        </button>
        <button
          id='custom-style-toast'
          style={{
            padding: '8px 16px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'normal',
          }}
          onClick={handleCustomStyleToast}
        >
          Custom Styling
        </button>
        <button
          id='interactive-toast'
          style={{
            padding: '8px 16px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'normal',
          }}
          onClick={handleInteractiveToast}
        >
          Interactive
        </button>
      </div>
    </div>
  );
}

export function App() {
  const [currentPosition, setCurrentPosition] =
    useState<ToastViewportProps['position']>('top-right');

  return (
    <ToastProvider defaultDuration={5000}>
      <Controls />
      <ControlsPositions
        currentPosition={currentPosition}
        onPositionChange={setCurrentPosition}
      />
      <UpdateControls />
      <CustomToastControls />
      <ToastViewport position={currentPosition} theme='light' />
    </ToastProvider>
  );
}
