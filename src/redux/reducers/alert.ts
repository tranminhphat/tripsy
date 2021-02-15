import { CLOSE_ALERT, SHOW_ALERT } from "../actions/alert/alertActionTypes";
import IAction from "interfaces/action/action.interface";

const initialState = { isAlert: false, alertType: undefined, alertMessage: "" };

export default function alertReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SHOW_ALERT: {
      return {
        isAlert: true,
        alertType: action.payload.alertType,
        alertMessage: action.payload.alertMessage,
      };
    }
    case CLOSE_ALERT: {
      return { isAlert: false, alertType: undefined, alertMessage: "" };
    }
    default:
      return state;
  }
}
