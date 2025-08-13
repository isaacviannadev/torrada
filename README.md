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

```tsx
import { ToastProvider, ToastViewport, useToast } from "torrada";
import "torrada/style.css"; // default styles

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

---

## 🏗️ Overview & Design Rationale

### Component API

**Core Components:**
- **`ToastProvider`**: Manages toast state and configuration
- **`ToastViewport`**: Renders toasts in a specific position with theme
- **`useToast`**: Hook providing toast creation, update, and dismiss methods

**Key Architecture Decisions:**
- **Headless store** built with `useSyncExternalStore` → minimal re-renders and small API surface
- **Viewport rendered via portal** to `document.body` → avoids layout shift (CLS ≈ 0)
- **UI skin implemented with CSS variables** → easy theming without locking consumers
- **Exit control:** `beforeDismiss` hook to wait for exit animation before removing nodes

**Trade-offs:**
- **No animation dependencies**: Pure CSS (`transform`/`opacity`) for simplicity and performance
- **Minimal global state**: Toast array not pushed through Context to avoid app-wide re-renders
- **Portal-based rendering**: Slightly more complex setup but eliminates layout interference

---

## ⚙️ Setup Instructions

### Repository Setup
```bash
# Clone the repository
git clone https://github.com/isaacviannadev/torrada.git
cd torrada

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Running Tests
```bash
# Unit and integration tests
npm run test

# Tests in watch mode
npm run test:watch

# End-to-end tests
npm run test:e2e

# Coverage report
npm run coverage
```

---

## 💡 Usage Examples

### Basic Toast Creation
```tsx
const { toast } = useToast();

// Simple success toast
toast({ 
  kind: "success", 
  title: "Operation completed!" 
});

// Toast with description and custom duration
toast({ 
  kind: "info", 
  title: "Processing...", 
  description: "Please wait while we handle your request.",
  duration: 3000 
});
```

### Advanced Toast Management
```tsx
const { toast, update, dismiss, dismissAll } = useToast();

// Create and update toast
const id = toast({ title: "Uploading..." });
update(id, { title: "Uploaded!", kind: "success", duration: 2500 });

// Dismiss specific toast
dismiss(id);

// Dismiss all toasts
dismissAll();
```

### Custom Toast
Create highly customizable toasts with JSX content, custom icons, actions, and styling:

```tsx
const { customToast } = useToast();

// Custom content toast
customToast({
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
        <div style={{ fontWeight: 'bold' }}>Design System</div>
        <div style={{ fontSize: '14px', opacity: 0.8 }}>
          Custom notification
        </div>
      </div>
    </div>
  ),
  duration: 8000,
});

// Toast with custom icon and actions
customToast({
  title: 'Interactive Toast',
  description: 'Click the buttons below to interact',
  customIcon: <span style={{ fontSize: '24px' }}>⭐</span>,
  customActions: (
    <>
      <button onClick={() => console.log('Action 1')}>Action 1</button>
      <button onClick={() => console.log('Action 2')}>Action 2</button>
    </>
  ),
});

// Custom styled toast
customToast({
  title: 'Styled Toast',
  customStyle: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
  },
  customClassName: 'my-custom-toast',
});
```

**Custom Toast Features:**
- **`customContent`**: Complete JSX content replacement
- **`customIcon`**: Custom icon element
- **`customActions`**: Interactive buttons and controls
- **`customStyle`**: Inline CSS styles
- **`customClassName`**: Custom CSS classes

For detailed documentation, see **[CUSTOM_TOAST.md](./CUSTOM_TOAST.md)**.

### Provider Configuration
```tsx
<ToastProvider
  max={5}                 // maximum number of stacked toasts
  defaultDuration={5000}  // default duration in ms
>
  <App />
</ToastProvider>
```

### Viewport Configuration
```tsx
<ToastViewport
  position="top-right"              // top|bottom x left|right|center
  theme="dark"                      // light|dark
  announce="polite"                 // polite|assertive for screen readers
  animationMs={180}                 // exit animation duration
/>
```

---

## 🎨 Theming & Customization

### CSS Variables Override
The system uses **CSS variables** for easy customization. Override them in your app theme:

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

### Positioning Options
**Available positions:**
- `top-left`, `top-center`, `top-right`
- `bottom-left`, `bottom-center`, `bottom-right`

**CSS classes for custom positioning:**
- `.t-viewport` + position: `t-top-right`, `t-top-left`, etc.
- `.t-item` + kind: `.success`, `.error`, `.info`, `.warning`

### Theme Switching
- `ToastViewport` sets `data-theme="light|dark"`
- Create additional themes with `[data-theme="custom"]` and override variables
- Supports dynamic theme switching at runtime

---

## ♿ Accessibility Notes

### Screen Reader Support
- **Live regions:** each toast uses `role="status"` + `aria-live="polite"` by default
- **Error handling:** errors use `role="alert"` + `aria-live="assertive"`
- **Atomic announcements:** `aria-atomic="true"` ensures complete toast content is read

### Keyboard Navigation
- **Tab navigation:** `Tab` reaches the close button within each toast
- **Activation:** `Enter/Space` activates the close button
- **Dismissal:** `Esc` closes the currently focused toast
- **Focus management:** toasts **do not steal focus** when appearing

### Motion Preferences
- **Reduced motion:** fully respects `prefers-reduced-motion`
- **Animation control:** animations disabled/shortened when motion is reduced
- **Performance:** maintains smooth operation regardless of motion preferences

---

## ⚡ Performance Metrics

### Animation Performance Budgets
- **Enter animation:** **180ms** target duration
- **Exit animation:** **180ms** target duration
- **Expected CLS:** **≈ 0** (no layout shifts)
- **GPU acceleration:** uses `transform` and `opacity` only

### Rendering Performance
- **Re-render optimization:** `useSyncExternalStore` minimizes unnecessary updates
- **Memory management:** proper cleanup of dismissed toasts prevents memory leaks
- **Bundle size:** optimized for minimal impact on application size

### Measurement Tools
- **DevTools Performance:** record FPS/timeline while spawning multiple toasts
- **Lighthouse:** verify CLS ~0 and performance scores
- **Accessibility testing:** validate with screen readers and keyboard navigation

---

## 🧪 Testing Instructions

### Unit & Integration Tests
**Coverage areas:**
- Store logic (stacking, auto-dismiss, manual dismiss, update/duration)
- Viewport & item components (position, theme, portal, accessibility)
- Hook integration (`useToast` behavior, context integration)

**Commands:**
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run coverage
```

### End-to-End Tests (Playwright)
**Test scenarios:**
- Toast stacking and positioning
- Auto-dismiss functionality
- Manual dismiss (close button, keyboard shortcuts)
- User interactions and accessibility

**Setup & execution:**
```bash
# Install Playwright browsers (one-time setup)
npx playwright install --with-deps

# Run E2E tests (dev server auto-starts)
npm run test:e2e

# Run specific test file
npx playwright test tests/e2e/toast.spec.ts
```

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
