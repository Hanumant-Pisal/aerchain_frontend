import { toast } from 'react-toastify';

// Success notifications
export const showSuccess = (message) => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

// Error notifications
export const showError = (message) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

// Info notifications
export const showInfo = (message) => {
  return toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

// Warning notifications
export const showWarning = (message) => {
  return toast.warning(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};

// Loading notifications (auto-close manually)
export const showLoading = (message) => {
  return toast.loading(message, {
    position: "top-right",
    closeOnClick: false,
    closeButton: false,
    pauseOnHover: false,
    draggable: false,
    theme: "light",
  });
};

// Custom notifications with options
export const showCustom = (message, type = 'info', options = {}) => {
  return toast[type](message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    ...options
  });
};

// Dismiss a specific toast
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};

// Promise-based toast (for async operations)
export const showPromise = (promise, messages) => {
  return toast.promise(
    promise,
    {
      pending: messages.pending || 'Processing...',
      success: messages.success || 'Success!',
      error: messages.error || 'Something went wrong',
    },
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    }
  );
};

export default {
  showSuccess,
  showError,
  showInfo,
  showWarning,
  showLoading,
  showCustom,
  dismissToast,
  dismissAllToasts,
  showPromise
};
