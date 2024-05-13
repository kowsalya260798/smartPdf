import { ToastOptions, toast } from 'react-toastify';
const showNotification = (type: string, msg: string, options = {}) => {
   const defaultOptions:ToastOptions = {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'smart-toaster',      
    };
    const mergedOptions = { ...defaultOptions, ...options };
    const error_styles = {
        style: {
            background: 'red',    // Background color for error
            color: 'white',       // Text color for error
            icon: 'white',          // Icon color for error
          }
    }

    const success_styles = {
        style: {
            background: 'green',    // Background color for error
            color: 'white',       // Text color for error
            icon: 'white',          // Icon color for error
          }
    }
    if (type == "success") {
        return toast.success(msg,{...mergedOptions});
    } else if (type == "error") {
        return toast.error(msg,{...mergedOptions});
    } else if (type == "warn") {
        return toast.warn(msg,mergedOptions);
    } else if (type == "info") {
        return toast.info(msg,mergedOptions);
    }
}

export { showNotification }
