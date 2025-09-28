import { useState, useRef, useEffect } from 'react';
import { Notification } from '@/app/types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timeoutRefs = useRef<Set<NodeJS.Timeout>>(new Set());
  const idCounter = useRef(0);

  // Cleanup timeouts on unmount
  useEffect(() => {
    const timeouts = timeoutRefs.current;
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      timeouts.clear();
    };
  }, []);

  const showNotification = (
    message: string,
    type: 'error' | 'success' | 'info' = 'info',
  ) => {
    const notification: Notification = {
      id: Date.now() + ++idCounter.current, // Ensure uniqueness
      message,
      type,
      timestamp: new Date(),
    };

    setNotifications((prev) => [...prev, notification]);

    // Auto-remove notification after 5 seconds
    const timeoutId = setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      timeoutRefs.current.delete(timeoutId);
    }, 5000);

    // Track timeout for cleanup
    timeoutRefs.current.add(timeoutId);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return {
    notifications,
    showNotification,
    removeNotification,
  };
}
