# Development Guide

This document contains detailed information about the Torrada project architecture, development setup, testing, and contribution guidelines.

## 🏗️ Architecture & Design

### Core Principles

**Headless Store Design**
- **Store headless** (no UI) built with `useSyncExternalStore` → minimal re-renders and a small API surface
- **Viewport** rendered via **portal** to `document.body` → avoids **layout shift** (CLS ≈ 0) and layout interference
- **UI skin** implemented with **CSS variables** → easy theming and branding without locking consumers
- **Exit control:** `beforeDismiss` hook in the store (injected by the Viewport) to **wait for exit animation** before removing the node, preventing jank

**Performance Optimizations**
- No animation dependencies: we use **pure CSS** (`transform`/`opacity`) for simplicity and performance
- Minimal global state: we do not push the toast array through Context to avoid app-wide re-renders
- **Zero CLS:** Viewport uses `position: fixed` to avoid layout shifts
- **GPU-friendly animations:** only `opacity` and `transform` for optimal performance

**Accessibility Features**
- **Live regions:** each toast uses `role="status"` + `aria-live="polite"` by default. Errors use `role="alert"` / `aria-live="assertive"`. `aria-atomic="true"` ensures the whole block is read
- **Focus management:** toasts **do not steal focus** on mount. Close via **Esc** when focus is inside the toast; close button has `aria-label="Close notification"`
- **Keyboard navigation:** `Tab` reaches the close button; `Enter/Space` activates; `Esc` closes
- **Reduced motion:** honored via `prefers-reduced-motion`; animations disabled/shortened accordingly

## 📁 Project Structure

```
src/
  core/            # headless store, types, provider/hook
    ├── context.tsx    # React context for toast state
    ├── store.ts       # core toast management logic
    └── types.ts       # TypeScript type definitions
  ui/              # viewport + item (skin) + styles.css
    ├── ToastItem.tsx      # individual toast component
    ├── ToastViewport.tsx  # container for all toasts
    └── styles.css         # CSS variables and styling
  dev/             # demo app (development only)
    ├── App.tsx        # demo application
    └── main.tsx       # entry point for dev server
tests/
  unit/            # vitest + React Testing Library
    ├── a11y.test.tsx      # accessibility tests
    ├── anim.test.tsx      # animation tests
    ├── exemple-usage.test.tsx  # usage examples
    ├── hook.test.tsx      # useToast hook tests
    ├── store.test.ts      # store logic tests
    └── viewport.test.tsx  # viewport component tests
  e2e/             # playwright end-to-end tests
    └── toast.spec.ts      # user interaction tests
  setup.ts         # test configuration
```

## 🧪 Testing Strategy

### Unit & Integration Tests

**Coverage Areas:**
- **Store Logic:** stacking of newest toasts, auto-dismiss functionality, manual dismiss, update/duration handling
- **Viewport & Item Components:** position calculations, theme switching, portal rendering, accessibility roles and live regions
- **Hook Integration:** `useToast` hook behavior, context integration, state management
- **Accessibility:** keyboard navigation, screen reader support, focus management

**Running Tests:**
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run coverage
```

### End-to-End Tests (Playwright)

**Test Scenarios:**
- **Toast Stacking:** verify multiple toasts stack correctly
- **Auto-dismiss:** ensure toasts disappear after specified duration
- **Manual Dismiss:** test close button and keyboard shortcuts
- **User Interactions:** validate toast creation, updates, and removal

**Setup & Execution:**
```bash
# Install Playwright browsers (one-time setup)
npx playwright install --with-deps

# Run E2E tests (dev server auto-starts)
npm run test:e2e

# Run specific test file
npx playwright test tests/e2e/toast.spec.ts
```

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/isaacviannadev/torrada.git
cd torrada

# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Preview production build
npm run preview
```

### Development Workflow

1. **Feature Development**
   - Create feature branch from main
   - Implement changes with tests
   - Ensure all tests pass
   - Update documentation if needed

2. **Testing**
   - Write unit tests for new functionality
   - Add E2E tests for user interactions
   - Verify accessibility compliance
   - Check performance impact

3. **Quality Assurance**
   - Run full test suite
   - Check TypeScript compilation
   - Verify build output
   - Test in demo application

## 📊 Performance Benchmarks

### Animation Performance
- **Enter animation:** 180ms target
- **Exit animation:** 180ms target  
- **Expected CLS:** ≈ 0 (no layout shifts)
- **GPU acceleration:** uses `transform` and `opacity` only

### Rendering Performance
- **Re-render optimization:** `useSyncExternalStore` minimizes unnecessary updates
- **Memory management:** proper cleanup of dismissed toasts
- **Bundle size:** optimized for minimal impact

### Measurement Tools
- **DevTools Performance:** record FPS/timeline while spawning multiple toasts
- **Lighthouse:** verify CLS ~0 and performance scores
- **Accessibility:** test with screen readers and keyboard navigation

## 🔧 Build Configuration

### Vite Configuration
- **Library mode** for npm package distribution
- **TypeScript** compilation with strict settings
- **CSS extraction** for style distribution
- **Multiple formats:** ESM, CommonJS, and TypeScript declarations

### TypeScript Configuration
- **Strict mode** enabled for type safety
- **Declaration files** generated for external usage
- **Path mapping** for clean imports
- **Build-time validation** of all types

## 📝 Contributing

### Code Standards
- **TypeScript:** strict typing, no `any` types
- **Testing:** minimum 90% coverage target
- **Accessibility:** WCAG 2.1 AA compliance
- **Performance:** no regression in animation timing

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Implement changes with tests
4. Ensure all checks pass
5. Submit PR with clear description
6. Address review feedback

### Release Process
1. Update version in `package.json`
2. Update changelog/documentation
3. Create release tag
4. Publish to npm
5. Update GitHub releases

## 🐛 Troubleshooting

### Common Issues

**Build Failures**
- Check TypeScript compilation errors
- Verify all dependencies are installed
- Clear node_modules and reinstall

**Test Failures**
- Ensure test environment is properly configured
- Check for flaky tests in CI environment
- Verify Playwright browser installation

**Development Server Issues**
- Check port availability
- Verify Vite configuration
- Clear browser cache if needed

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Playwright Testing](https://playwright.dev/)
- [Vitest Documentation](https://vitest.dev/)

---

For questions about development or contributing, please open an issue on GitHub or contact the maintainers.
