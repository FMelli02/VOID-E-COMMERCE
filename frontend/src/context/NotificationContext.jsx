import React, { createContext, useState, useCallback } from 'react';
import Toast from '../components/common/Toast';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: null, type: '' });

  const notify = useCallback((message, type = 'success') => {
    setNotification({ message, type });
  }, []);

  const handleDone = () => {
    setNotification({ message: null, type: '' });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Toast 
        message={notification.message} 
        type={notification.type} 
        onDone={handleDone} 
      />
    </NotificationContext.Provider>
  );
};