import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import Notification from '../components/ui/Notification';

interface NotificationContextProps {
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationState>({
    message: '',
    type: 'info',
    isVisible: false,
  });
  
  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);
  
  const showNotification = useCallback((
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration: number = 5000
  ) => {
    setNotification({
      message,
      type,
      isVisible: true,
    });
    
    // Auto-hide after duration
    if (duration > 0) {
      setTimeout(hideNotification, duration);
    }
  }, [hideNotification]);
  
  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
      }}
    >
      {children}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
