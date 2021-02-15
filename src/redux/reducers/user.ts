import IAction from "interfaces/action/action.interface";
import {
  SET_USER_DATA,
  CLEAR_USER_DATA,
} from "../actions/user/userActionTypes";

const initialState = {};

export default function userReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_USER_DATA: {
      const { user } = action.payload;
      return {
        ...state,
        userData: user,
      };
    }
    case CLEAR_USER_DATA: {
      return {
        ...state,
        userData: {},
      };
    }
    default:
      return state;
  }
}
