import { useEffect, useState } from 'react';
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
    'top-right',
    'top-left',
    'top-center',
    'bottom-right',
    'bottom-left',
    'bottom-center',
  ];

  useEffect(() => {
    dismissAll();
  }, [currentPosition]);

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
                onPositionChange(position);
                toast({ title: currentPosition });
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
      <ToastViewport position={currentPosition} theme='light' />
    </ToastProvider>
  );
}
