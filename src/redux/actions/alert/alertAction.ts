import { AlertType } from "types";
import { SHOW_ALERT, CLOSE_ALERT } from "./alertActionTypes";

export const showAlert = (alertType: AlertType, alertMessage: string) => ({
  type: SHOW_ALERT,
  payload: {
    alertType,
    alertMessage,
  },
});

export const closeAlert = () => ({ type: CLOSE_ALERT });
