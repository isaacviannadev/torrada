/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveAttribute(attr: string, value?: string): R;
  toHaveClass(className: string): R;
  toHaveStyle(css: string | Record<string, any>): R;
  toHaveTextContent(text: string | RegExp): R;
  toHaveValue(value: string | string[] | number): R;
  toBeVisible(): R;
  toBeDisabled(): R;
  toBeEnabled(): R;
  toBeRequired(): R;
  toBeValid(): R;
  toBeInvalid(): R;
  toHaveFocus(): R;
  toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R;
  toBeChecked(): R;
  toBePartiallyChecked(): R;
  toHaveDescription(text: string | RegExp): R;
}

declare global {
  namespace Vi {
    interface JestAssertion<T = any> extends CustomMatchers<T> {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }
}
