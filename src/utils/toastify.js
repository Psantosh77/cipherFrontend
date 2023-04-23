import { toast} from 'react-toastify';

export const SHOW_ERROR_NOTIFICATION = (error) => {
  toast.error(error, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const SHOW_INFO_NOTIFICATION = (msg, time = 8000) => {
  toast.info(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const SHOW_SUCCESS_NOTIFICATION = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const SHOW_WARN_NOTIFICATION = (msg) => {
  toast.warn(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
