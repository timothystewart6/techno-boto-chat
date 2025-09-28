import { render } from '@testing-library/react';
import LoadingIndicator from '../loading-indicator';

describe('LoadingIndicator Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<LoadingIndicator />);

    // Should render the main container
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has animated elements', () => {
    const { container } = render(<LoadingIndicator />);

    // Check that animation classes are applied to the pulse dots
    const animatedDots = container.querySelectorAll('.animate-pulse');
    expect(animatedDots.length).toBeGreaterThan(0);
    expect(animatedDots[0]).toHaveClass('animate-pulse');
  });

  it('has proper structure', () => {
    const { container } = render(<LoadingIndicator />);

    // Check for the presence of animated dots
    const dots = container.querySelectorAll(
      '.h-2.w-2.rounded-full.bg-text-tertiary.animate-pulse',
    );
    expect(dots).toHaveLength(3);
  });

  it('includes svg icon', () => {
    const { container } = render(<LoadingIndicator />);

    // Check for SVG presence
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
