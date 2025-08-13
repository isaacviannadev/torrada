import { ToastProvider, ToastViewport, useToast } from '..';

function Controls() {
  const { toast, dismissAll } = useToast();
  return (
    <div style={{ padding: 16, display: 'flex', gap: 8 }}>
      <button
        id='spawn-success'
        onClick={() => toast({ kind: 'success', title: 'Saved!' })}
      >
        Success
      </button>
      <button
        id='spawn-error'
        onClick={() => toast({ kind: 'error', title: 'Oops' })}
      >
        Error
      </button>
      <button
        id='spawn-3'
        onClick={() => {
          toast({ title: '1' });
          toast({ title: '2' });
          toast({ title: '3' });
        }}
      >
        Spawn x3
      </button>
      <button id='close-all' onClick={() => dismissAll()}>
        Close All
      </button>
    </div>
  );
}

export function App() {
  return (
    <ToastProvider defaultDuration={800}>
      <Controls />
      <ToastViewport animationMs={0} position='top-right' theme='light' />
    </ToastProvider>
  );
}
