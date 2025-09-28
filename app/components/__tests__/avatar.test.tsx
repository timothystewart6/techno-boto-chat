import { render } from '@testing-library/react';
import Avatar from '../avatar';

describe('Avatar Component', () => {
  it('renders user avatar with distinct styling', () => {
    const { container } = render(<Avatar isUser={true} />);

    // Look for the container with gradient classes
    const avatarContainer = container.querySelector(
      '[class*="from-accent-primary"]',
    );
    expect(avatarContainer).toBeTruthy();
    expect(avatarContainer).toHaveClass('from-accent-primary');
  });

  it('renders bot avatar with distinct styling', () => {
    const { container } = render(<Avatar isUser={false} />);

    // Look for the container with border classes
    const avatarContainer = container.querySelector(
      '[class*="border-border-primary"]',
    );
    expect(avatarContainer).toBeTruthy();
    expect(avatarContainer).toHaveClass('border-border-primary');
  });

  it('differentiates between user and bot visually', () => {
    const { container: userContainer, rerender } = render(
      <Avatar isUser={true} />,
    );
    const userAvatar = userContainer.querySelector('[class*="rounded-full"]');
    const userClasses = userAvatar?.className;

    rerender(<Avatar isUser={false} />);
    const { container: botContainer } = render(<Avatar isUser={false} />);
    const botAvatar = botContainer.querySelector('[class*="rounded-full"]');
    const botClasses = botAvatar?.className;

    // User and bot avatars should have different visual treatments
    expect(userClasses).not.toBe(botClasses);
    expect(userClasses).toContain('from-accent-primary');
    expect(botClasses).toContain('border-border-primary');
  });

  it('renders appropriate SVG icons', () => {
    const { container: userContainer } = render(<Avatar isUser={true} />);
    const { container: botContainer } = render(<Avatar isUser={false} />);

    // Both should have SVG elements
    expect(userContainer.querySelector('svg')).toBeTruthy();
    expect(botContainer.querySelector('svg')).toBeTruthy();

    // User icon should be filled
    const userSvg = userContainer.querySelector('svg');
    expect(userSvg).toHaveAttribute('fill', 'currentColor');

    // Bot icon should be stroked
    const botSvg = botContainer.querySelector('svg');
    expect(botSvg).toHaveAttribute('stroke', 'currentColor');
  });
});
