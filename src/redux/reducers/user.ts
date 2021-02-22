import IAction from "interfaces/action/action.interface";
import Cookies from "js-cookie";

const initialState = { isLoggedIn: Cookies.get("jwt") };

export default function userReducer(state = initialState, action: IAction) {
  switch (action.type) {
    default:
      return state;
  }
}
