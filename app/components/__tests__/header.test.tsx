import { render, screen } from '@testing-library/react';
import Header from '../header';

// Mock the ThemeToggle component since it's tested separately
jest.mock('../theme-toggle', () => {
  return function MockThemeToggle() {
    return <div data-testid="theme-toggle">Theme Toggle</div>;
  };
});

describe('Header Component', () => {
  const defaultProps = {
    title: 'techno-boto-chat',
    subtitle: 'Your AI Assistant',
  };

  const mockModelInfo = {
    modelName: 'test-model-v1',
    endpoint: 'https://test-endpoint.com',
  };

  it('renders application title', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText('techno-boto-chat')).toBeInTheDocument();
    expect(screen.getByText('Your AI Assistant')).toBeInTheDocument();
  });

  it('renders theme toggle component', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('displays model information when provided', () => {
    render(<Header {...defaultProps} modelInfo={mockModelInfo} />);

    expect(screen.getByText(/test-model-v1/)).toBeInTheDocument();
  });

  it('handles undefined model info gracefully', () => {
    render(<Header {...defaultProps} />);

    // Should still render the header without crashing
    expect(screen.getByText('techno-boto-chat')).toBeInTheDocument();
  });

  it('has proper header structure', () => {
    render(<Header {...defaultProps} />);

    // Should have heading element
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('displays model endpoint when available', () => {
    render(<Header {...defaultProps} modelInfo={mockModelInfo} />);

    // Check if endpoint info is displayed
    expect(screen.getByText('https://test-endpoint.com')).toBeInTheDocument();
  });
});
