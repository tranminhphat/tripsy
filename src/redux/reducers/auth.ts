import IAction from "interfaces/action/action.interface";
import Cookies from "js-cookie";
import { SET_AUTH } from "redux/actions/auth/authActionTypes";

const initialState = { isLoggedIn: Cookies.get("jwt") !== undefined };

const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_AUTH: {
      return { isLoggedIn: Cookies.get("jwt") !== undefined };
    }
    default:
      return state;
  }
};

export default authReducer;
