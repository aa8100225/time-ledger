import { toast, ToastContent, ToastOptions, Slide, Id } from "react-toastify";

export const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "colored",
  transition: Slide,
};

export enum ToastType {
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning",
  Default = "default",
}

const createToastContent = (message: string): React.ReactNode => {
  return (
    <>
      <strong>{message}</strong>
    </>
  );
};

/**
 *
 * @param {ToastType} type
 * @param {string} message
 * @param {ToastOptions} [options=defaultToastOption]
 * @return {Id}
 */
export const showToast = (
  type: ToastType,
  message: string,
  options: Partial<ToastOptions> = {}
): Id => {
  const optionsToApply = { ...defaultToastOptions, ...options };
  const content = createToastContent(message);

  switch (type) {
    case ToastType.Success:
      return toast.success(content, optionsToApply);
    case ToastType.Error:
      return toast.error(content, optionsToApply);
    case ToastType.Info:
      return toast.info(content, optionsToApply);
    case ToastType.Warning:
      return toast.warn(content, optionsToApply);
    case ToastType.Default:
      return toast(content, optionsToApply);
    default:
      return toast(content, optionsToApply);
  }
};
