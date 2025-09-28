import { Notification } from '@/app/types';

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: number) => void;
}

function NotificationItem({ notification, onRemove }: NotificationItemProps) {
  const getIcon = () => {
    if (notification.type === 'error') {
      return (
        <svg
          className="h-5 w-5 text-accent-error"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    if (notification.type === 'success') {
      return (
        <svg
          className="h-5 w-5 text-accent-success"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    return (
      <svg
        className="h-5 w-5 text-accent-primary"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  const getStyles = () => {
    if (notification.type === 'error') {
      return 'bg-accent-error/10 border-accent-error/50 text-accent-error';
    }
    if (notification.type === 'success') {
      return 'bg-accent-success/10 border-accent-success/50 text-accent-success';
    }
    return 'bg-accent-primary/10 border-accent-primary/50 text-accent-primary';
  };

  return (
    <div
      className={`max-w-sm p-4 rounded-xl shadow-custom-lg border backdrop-blur-sm glass animate-slide-down ${getStyles()}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="ml-3">
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        </div>
        <button
          onClick={() => onRemove(notification.id)}
          className="flex-shrink-0 ml-4 text-text-quaternary hover:text-text-tertiary transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface NotificationListProps {
  notifications: Notification[];
  onRemove: (id: number) => void;
}

export default function NotificationList({
  notifications,
  onRemove,
}: NotificationListProps) {
  return (
    <div className="fixed top-20 right-4 z-40 space-y-3">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
