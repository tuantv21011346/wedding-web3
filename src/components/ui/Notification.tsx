import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  isVisible,
  onClose,
}) => {
  // Define styles based on notification type
  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-50',
          textColor: 'text-green-800',
          borderColor: 'border-green-500',
          icon: <CheckCircleIcon className="w-5 h-5 text-green-600" />
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          textColor: 'text-red-800',
          borderColor: 'border-red-500',
          icon: <ExclamationCircleIcon className="w-5 h-5 text-red-600" />
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-500',
          icon: <ExclamationCircleIcon className="w-5 h-5 text-yellow-600" />
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-500',
          icon: <InformationCircleIcon className="w-5 h-5 text-blue-600" />
        };
    }
  };

  const styles = getNotificationStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-4 right-4 z-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center p-3 rounded-lg shadow-lg border-l-4 ${styles.bgColor} ${styles.textColor} ${styles.borderColor} max-w-md`}
          >
            <div className="flex-shrink-0 mr-2">
              {styles.icon}
            </div>
            <div className="flex-grow">
              {message}
            </div>
            <div className="flex-shrink-0 ml-2">
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
