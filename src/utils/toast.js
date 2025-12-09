import { toast } from 'react-toastify';

const defaultOptions = {
  position: "top-right",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

const typeDefaults = {
  success: { autoClose: 3000 },
  error: { autoClose: 5000 },
  info: { autoClose: 3000 },
  warning: { autoClose: 4000 },
  loading: { 
    autoClose: false,
    closeOnClick: false,
    closeButton: false,
    pauseOnHover: false,
    draggable: false,
  },
};

export const showSuccess = (message) => toast.success(message, { ...defaultOptions, ...typeDefaults.success });
export const showError = (message) => toast.error(message, { ...defaultOptions, ...typeDefaults.error });
export const showInfo = (message) => toast.info(message, { ...defaultOptions, ...typeDefaults.info });
export const showWarning = (message) => toast.warning(message, { ...defaultOptions, ...typeDefaults.warning });
export const showLoading = (message) => toast.loading(message, { ...defaultOptions, ...typeDefaults.loading });

export const showCustom = (message, type = 'info', options = {}) => 
  toast[type](message, { ...defaultOptions, ...typeDefaults[type], ...options });

export const dismissToast = (toastId) => toast.dismiss(toastId);
export const dismissAllToasts = () => toast.dismiss();

export const showPromise = (promise, messages = {}) => 
  toast.promise(
    promise,
    {
      pending: messages.pending || 'Processing...',
      success: messages.success || 'Success!',
      error: messages.error || 'Something went wrong',
    },
    defaultOptions
  );

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
