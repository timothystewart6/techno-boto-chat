import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotificationList from '../notification-list';
import { Notification } from '@/app/types';

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'success',
    message: 'Success message',
    timestamp: new Date(),
    duration: 3000,
  },
  {
    id: 2,
    type: 'error',
    message: 'Error message',
    timestamp: new Date(),
    duration: 5000,
  },
];

describe('NotificationList Component', () => {
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all notifications', () => {
    render(
      <NotificationList
        notifications={mockNotifications}
        onRemove={mockOnRemove}
      />,
    );

    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders empty state when no notifications', () => {
    render(<NotificationList notifications={[]} onRemove={mockOnRemove} />);

    // Should not render any notification items
    expect(screen.queryByText('Success message')).not.toBeInTheDocument();
  });

  it('calls onRemove when close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <NotificationList
        notifications={[mockNotifications[0]]}
        onRemove={mockOnRemove}
      />,
    );

    const closeButton = screen.getByRole('button');
    await user.click(closeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });

  it('displays correct notification types with different styling', () => {
    render(
      <NotificationList
        notifications={mockNotifications}
        onRemove={mockOnRemove}
      />,
    );

    // Both notifications should be present with different visual treatments
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();

    // Check for different styling classes
    const successNotification = screen.getByText('Success message');
    const errorNotification = screen.getByText('Error message');

    // Navigate up to the parent container with styling classes
    const successContainer = successNotification.closest(
      '[class*="bg-accent-success"]',
    );
    const errorContainer = errorNotification.closest(
      '[class*="bg-accent-error"]',
    );

    expect(successContainer).toBeInTheDocument();
    expect(errorContainer).toBeInTheDocument();
  });

  it('shows appropriate icons for different notification types', () => {
    const { container } = render(
      <NotificationList
        notifications={mockNotifications}
        onRemove={mockOnRemove}
      />,
    );

    // Should have SVG icons for success and error states
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);

    // Check for close button icons plus notification type icons
    expect(icons.length).toBeGreaterThanOrEqual(2); // At least notification icons
  });
});
