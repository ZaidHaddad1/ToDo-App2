import { createContext, useContext, useState } from "react";
import MySnackbar from "../my-component/MySnackbar";
export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpenSnack(true);
    setMessage(message);
    setTimeout(() => {
      setOpenSnack(false);
      setMessage("");
    }, 2000);
  }
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <MySnackbar openSnack={openSnack} message={message} />
      {children}
    </ToastContext.Provider>
  );
};
export const useToast = () => {
  return useContext(ToastContext);
};
