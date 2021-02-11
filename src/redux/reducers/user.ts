import IAction from "interfaces/action/index.interface";
import { SET_USER, ERASE_USER } from "../actions/user/userActionTypes";

const initialState = {};

export default function userReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_USER: {
      const { user } = action.payload;
      return {
        ...state,
        userData: user,
      };
    }
    case ERASE_USER: {
      return {
        ...state,
        userData: {},
      };
    }
    default:
      return state;
  }
}
