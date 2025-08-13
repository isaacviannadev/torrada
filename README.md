# Torrada — React Toast Notification System

[![npm version](https://img.shields.io/npm/v/torrada.svg)](https://www.npmjs.com/package/torrada)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, accessible, and customizable **toast** system for React. Easy to use with full accessibility support and smooth animations.

## 🚀 Installation

```bash
npm install torrada
```

**Requirements:** React 18+ and React DOM 18+

## 📖 Quick Start

### Basic Usage

```tsx
import { ToastProvider, ToastViewport, useToast } from "torrada";

function Page() {
  const { toast } = useToast();
  
  return (
    <button onClick={() => toast({ 
      kind: "success", 
      title: "Saved!", 
      description: "All set." 
    })}>
      Save
    </button>
  );
}

export function App() {
  return (
    <ToastProvider max={5} defaultDuration={5000}>
      <Page />
      <ToastViewport position="top-right" theme="light" />
    </ToastProvider>
  );
}
```

### Advanced Features

```tsx
const { toast, update, dismiss, dismissAll } = useToast();

// Create toast
const id = toast({ title: "Uploading..." });

// Update toast
update(id, { title: "Uploaded", kind: "success", duration: 2500 });

// Close toasts
dismiss(id);    // close one
dismissAll();   // close all
```

## ⚙️ Configuration

### ToastProvider

```tsx
<ToastProvider
  max={5}                 // maximum number of stacked toasts
  defaultDuration={5000}  // default duration in ms
/>
```

### ToastViewport

```tsx
<ToastViewport
  position="top-right"              // top|bottom x left|right|center
  theme="dark"                      // light|dark
  announce="polite"                 // polite|assertive for screen readers
  animationMs={180}                 // exit animation duration
/>
```

## 🎨 Customization & Theming

The system uses **CSS variables** for easy customization:

```css
:root {
  --toast-radius: 12px;
  --toast-shadow: 0 8px 24px rgba(0,0,0,.18);
  --toast-gap: 8px;

  --toast-bg: #fff;
  --toast-fg: #111;
  --toast-border: #e6e6e6;

  --toast-success: #16a34a;
  --toast-error: #dc2626;
  --toast-info: #2563eb;
  --toast-warning: #d97706;
}
```

**Useful classes:**
- `.t-viewport` + position: `t-top-right`, `t-top-left`, `t-bottom-right`, `t-bottom-left`, `t-top-center`, `t-bottom-center`
- Item: `.t-item` + kind: `.success | .error | .info | .warning`

## ♿ Accessibility

- **Live regions:** each toast uses `role="status"` + `aria-live="polite"` by default
- **Focus:** toasts **do not steal focus** when appearing
- **Keyboard:** `Tab` to close button, `Enter/Space` to activate, `Esc` to close
- **Screen readers:** full support with automatic announcements
- **Reduced motion:** respects `prefers-reduced-motion`

## ⚡ Performance

- **Zero CLS:** Viewport uses `position: fixed` to avoid layout shifts
- **GPU-optimized animations:** only `opacity` and `transform` for performance
- **Minimal re-renders:** uses `useSyncExternalStore` for optimization
- **Animation timing:** enter and exit in 180ms

---

## 🏗️ Development & Contributing

For detailed information about the project architecture, testing, and development setup, see **[DEVELOPMENT.md](./DEVELOPMENT.md)**.

This includes:
- Project structure and architecture details
- Testing strategy (unit, integration, E2E)
- Development setup and workflow
- Performance benchmarks
- Contributing guidelines

## 📄 License

MIT © Contributors
