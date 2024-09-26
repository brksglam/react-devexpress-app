// components/Notification.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showNotification = (message, type = 'success') => {
  toast[type](message, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const Notification = () => {
  return <ToastContainer />;
};

export default Notification;
