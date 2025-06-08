import { useState, useCallback } from 'react';

interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
  duration: number;
}

interface UseNotificationReturn {
  notification: NotificationState;
  showNotification: (message: string, type: NotificationState['type'], duration?: number) => void;
  hideNotification: () => void;
}

/**
 * Hook để hiển thị thông báo (notification)
 */
export const useNotification = (): UseNotificationReturn => {
  const [notification, setNotification] = useState<NotificationState>({
    message: '',
    type: 'info',
    isVisible: false,
    duration: 5000, // Default 5 seconds
  });
  
  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);
  
  const showNotification = useCallback((
    message: string,
    type: NotificationState['type'] = 'info',
    duration: number = 5000
  ) => {
    // Hide any existing notification first
    setNotification({
      message,
      type,
      isVisible: true,
      duration
    });
    
    // Auto-hide after duration
    if (duration > 0) {
      setTimeout(hideNotification, duration);
    }
  }, [hideNotification]);
  
  return {
    notification,
    showNotification,
    hideNotification
  };
};

export default useNotification;
