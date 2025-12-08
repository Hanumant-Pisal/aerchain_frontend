import { toast } from 'react-toastify';


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


export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};


export const dismissAllToasts = () => {
  toast.dismiss();
};


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
