import IAction from "interfaces/action/action.interface";
import {
  SET_USER_ID,
  DELETE_USER_ID,
} from "redux/actions/user/userActionTypes";

const initialState = { userId: null };

export default function userReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_USER_ID:
      return { userId: action.payload.userId };
    case DELETE_USER_ID:
      return { userId: null };
    default:
      return state;
  }
}
