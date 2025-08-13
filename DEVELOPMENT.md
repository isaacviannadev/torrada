# Development Guide

This document contains detailed information about the Torrada project development setup, testing, and contribution guidelines. For usage instructions and API documentation, see the main [README.md](./README.md).

## 🏗️ Project Architecture

### Core Structure

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

### Technical Implementation Details

**Store Architecture:**
- Uses `useSyncExternalStore` for minimal re-renders
- Implements `beforeDismiss` hook for animation coordination
- Manages toast lifecycle (create, update, dismiss, auto-dismiss)

**Portal Implementation:**
- Renders toasts via `createPortal` to `document.body`
- Prevents layout shifts and interference with app content
- Maintains proper z-index stacking

**CSS Architecture:**
- CSS variables for theming and customization
- Utility classes for positioning and styling
- Responsive design considerations

## 🧪 Testing Strategy

### Test Coverage Goals

**Unit Tests (90%+ coverage target):**
- Store logic and state management
- Component rendering and props
- Hook behavior and context integration
- Utility functions and helpers

**Integration Tests:**
- Component interactions
- Context provider behavior
- Toast lifecycle management

**E2E Tests:**
- User interactions and workflows
- Cross-browser compatibility
- Accessibility compliance

### Running Tests

```bash
# Unit and integration tests
npm run test

# Tests in watch mode
npm run test:watch

# Generate coverage report
npm run coverage

# End-to-end tests
npm run test:e2e

# Run specific test file
npx playwright test tests/e2e/toast.spec.ts
```

### Test Environment Setup

**Vitest Configuration:**
- JSDOM environment for DOM testing
- React Testing Library for component testing
- Coverage reporting with v8

**Playwright Configuration:**
- Chromium, Firefox, and WebKit browsers
- Visual regression testing support
- Accessibility testing integration

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

### Package Configuration
- **Exports** configured for ESM and CommonJS
- **Side effects** marked for CSS files
- **Peer dependencies** for React compatibility
- **Files** included in npm package

## 📊 Performance Monitoring

### Development Tools
- **React DevTools Profiler** for component performance
- **Chrome DevTools Performance** for animation timing
- **Lighthouse CI** for performance regression detection

### Metrics to Track
- **Animation frame rates** during toast spawning
- **Memory usage** with multiple toasts
- **Bundle size** impact of changes
- **Accessibility** compliance scores

## 📝 Contributing Guidelines

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

### Common Development Issues

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

**TypeScript Issues**
- Verify type definitions are correct
- Check for circular dependencies
- Ensure proper import/export paths

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Playwright Testing](https://playwright.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

For questions about development or contributing, please open an issue on GitHub or contact the maintainers.
