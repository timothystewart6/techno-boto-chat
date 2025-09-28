import { renderHook, act } from '@testing-library/react';
import { useNotifications } from '../use-notifications';

describe('useNotifications Hook', () => {
  it('starts with empty notifications', () => {
    const { result } = renderHook(() => useNotifications());

    expect(result.current.notifications).toEqual([]);
  });

  it('adds notification when showNotification is called', () => {
    const { result } = renderHook(() => useNotifications());

    act(() => {
      result.current.showNotification('Test message', 'success');
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].message).toBe('Test message');
    expect(result.current.notifications[0].type).toBe('success');
  });

  it('removes notification when removeNotification is called', () => {
    const { result } = renderHook(() => useNotifications());

    // Add a notification first
    act(() => {
      result.current.showNotification('Test message', 'success');
    });

    const notificationId = result.current.notifications[0].id;

    // Remove the notification
    act(() => {
      result.current.removeNotification(notificationId);
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  it('handles different notification types', () => {
    const { result } = renderHook(() => useNotifications());

    act(() => {
      result.current.showNotification('Success', 'success');
      result.current.showNotification('Error', 'error');
      result.current.showNotification('Info', 'info');
    });

    expect(result.current.notifications).toHaveLength(3);
    expect(result.current.notifications.map((n) => n.type)).toEqual([
      'success',
      'error',
      'info',
    ]);
  });

  it('assigns unique IDs to notifications', () => {
    const { result } = renderHook(() => useNotifications());

    act(() => {
      result.current.showNotification('First', 'success');
      result.current.showNotification('Second', 'error');
    });

    const ids = result.current.notifications.map((n) => n.id);
    expect(ids[0]).not.toBe(ids[1]);
    expect(new Set(ids).size).toBe(2); // All unique
  });
});
