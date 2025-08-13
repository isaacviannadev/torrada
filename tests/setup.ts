import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

expect.extend(matchers);

declare module 'vitest' {
  interface Assertion<T = any> extends jest.Matchers<void, T> {}
}

afterEach(() => {
  cleanup();
});
