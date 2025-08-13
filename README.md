# Torrada — React Toast Notification System

A lightweight, accessible, and customizable **toast** system for React. It fulfills the assessment requirements:
- **Core:** create, stack, auto‑dismiss, and manual dismiss.
- **Theming & Customization:** CSS variables–based theming and configurable positioning.
- **Animation & Performance:** smooth enter/exit, no layout shift, `prefers-reduced-motion` honored.
- **Accessibility:** screen‑reader announcements, does not steal focus, keyboard (Esc to close).
- **Testing:** unit, integration (hook), and E2E.

---

## Overview & Design Rationale

**Architecture**
- **Headless store** (no UI) built with `useSyncExternalStore` → minimal re‑renders and a small API surface.
- **Viewport** rendered via **portal** to `document.body` → avoids **layout shift** (CLS ≈ 0) and layout interference.
- **UI skin** implemented with **CSS variables** → easy theming and branding without locking consumers.
- **Exit control:** `beforeDismiss` hook in the store (injected by the Viewport) to **wait for exit animation** before removing the node, preventing jank.

**Trade‑offs**
- No animation dependencies: we use **pure CSS** (`transform`/`opacity`) for simplicity and performance.
- Minimal global state: we do not push the toast array through Context to avoid app‑wide re‑renders.

---

## Setup (Repository)

```bash
# install deps
npm i

# run demo app (opens a simple page at /)
npm run dev

# build the library (types + bundled output)
npm run build
```

---

## Usage Examples

### Basic

```tsx
import { ToastProvider, ToastViewport, useToast } from "torrada";

function Page() {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ kind: "success", title: "Saved!", description: "All set." })}>
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

### Update / Dismiss

```tsx
const { toast, update, dismiss, dismissAll } = useToast();
const id = toast({ title: "Uploading…" });
update(id, { title: "Uploaded", kind: "success", duration: 2500 });
dismiss(id);    // close one
dismissAll();   // close all
```

### Provider Options

```tsx
<ToastProvider
  max={5}                 // max number of stacked toasts
  defaultDuration={5000}  // default duration (ms)
/>
```

### Viewport Options

```tsx
<ToastViewport
  position="top-right"              // top|bottom x left|right|center
  theme="dark"                      // light|dark
  announce="polite"                 // polite|assertive for SR
  animationMs={180}                 // exit duration (0 when reduced-motion is on)
/>
```

---

## Theming & Customization

The UI uses **CSS variables**. Override them in your app theme:

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

**Helpful classes**
- `.t-viewport` + position: `t-top-right`, `t-top-left`, `t-bottom-right`, `t-bottom-left`, `t-top-center`, `t-bottom-center`
- Item: `.t-item` + kind: `.success | .error | .info | .warning`

**Theme**
- `ToastViewport` sets `data-theme="light|dark"`. Create additional themes with `[data-theme="…"]` and override variables.

---

## Accessibility Notes

- **Live regions:** each toast uses `role="status"` + `aria-live="polite"` by default. Errors use `role="alert"` / `aria-live="assertive"`. `aria-atomic="true"` ensures the whole block is read.
- **Focus:** toasts **do not steal focus** on mount. Close via **Esc** when focus is inside the toast; close button has `aria-label="Close notification"`.
- **Keyboard:** `Tab` reaches the close button; `Enter/Space` activates; `Esc` closes.
- **Reduced motion:** honored via `prefers-reduced-motion`; animations disabled/shortened accordingly.

---

## Animation & Performance

- **Zero CLS:** Viewport uses `position: fixed`.
- **GPU‑friendly animations:** only `opacity` and `transform`.
- **Budgets**
  - Enter: **180 ms**
  - Exit: **180 ms**
  - Expected CLS: **≈ 0**
- **How to measure**
  - **DevTools Performance**: record FPS/timeline while spawning multiple toasts.
  - **Lighthouse**: verify CLS ~0.
  - With `prefers-reduced-motion`, verify transitions are minimized.
- **Minimal re‑renders:** `useSyncExternalStore` + external store; removal is delayed via `beforeDismiss` to avoid list reflow/jank.

---

## Testing Instructions

### Unit/Integration
Covers store (stacking of newest, auto‑dismiss, manual dismiss, update/duration), viewport/item (position, theme, portal, a11y roles/live, Esc, focus), and the `useToast` hook.

```bash
npm run test
```

### E2E (Playwright)
Covers **stacking**, **auto‑dismiss**, and **manual dismiss** in the demo app.

```bash
# install browsers once
npx playwright install --with-deps

# run e2e (dev server auto-starts)
npm run test:e2e
```

---

## Project Structure

```
src/
  core/            # headless store, types, provider/hook
  ui/              # viewport + item (skin) + styles.css
  dev/             # tiny demo app (dev only)
tests/
  unit/            # vitest + RTL
  e2e/             # playwright
```

---

## License

MIT © Contributors
