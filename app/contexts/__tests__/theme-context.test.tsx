import { render } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../theme-context';
import React, { act } from 'react';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Test component to use the theme hook
const TestComponent = () => {
  const { theme, setTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button data-testid="set-light" onClick={() => setTheme('light')}>
        Set Light
      </button>
      <button data-testid="toggle-theme" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('provides default dark theme', () => {
    const { getByTestId } = render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('provides default light theme when specified', () => {
    const { getByTestId } = render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>,
    );

    expect(getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('allows theme switching', () => {
    const { getByTestId } = render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>,
    );

    const setLightButton = getByTestId('set-light');

    act(() => {
      setLightButton.click();
    });

    expect(getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('allows theme toggling', () => {
    const { getByTestId } = render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>,
    );

    const toggleButton = getByTestId('toggle-theme');

    act(() => {
      toggleButton.click();
    });

    expect(getByTestId('current-theme')).toHaveTextContent('dark');

    // Toggle back
    act(() => {
      toggleButton.click();
    });
    expect(getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<TestComponent />);
    }).toThrow();

    consoleSpy.mockRestore();
  });
});
