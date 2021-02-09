import Action from "../@types/action";
import { SET_USER, ERASE_USER } from "../actions/user/userActionType";

const initialState = {};

export default function userReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SET_USER: {
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    }
    case ERASE_USER: {
      return {
        ...state,
        user: {},
      };
    }
    default:
      return state;
  }
}
