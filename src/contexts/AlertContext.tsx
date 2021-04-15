import * as React from "react";
import { createContext, useState } from "react";
import { AlertType } from "types";

const AlertContext = createContext<any>(null);

const AlertProvider: React.FC<{}> = ({ children }) => {
  const [isAlert, setIsAlert] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>();
  const [alertMessage, setAlertMessage] = useState<string | null>();

  return (
    <AlertContext.Provider
      value={{
        isAlert,
        alertType,
        alertMessage,
        alert: (alertType?: AlertType, alertMessage?: string) => {
          if (alertType && alertMessage) {
            setIsAlert(true);
            setAlertType(alertType);
            setAlertMessage(alertMessage);
          } else {
            setIsAlert(false);
            setAlertType(undefined);
            setAlertMessage(null);
          }
        },
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider };
export default AlertContext;
