import IAction from "interfaces/action/action.interface";
import {
  GET_EXPERIENCE,
  RESET_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from "redux/actions/experience/experienceActionTypes";

const initialState = {};

export default function experienceReducer(
  state = initialState,
  action: IAction
) {
  switch (action.type) {
    case GET_EXPERIENCE:
      return state;
    case UPDATE_EXPERIENCE:
      return { ...state, ...action.payload.updatedProperties };
    case RESET_EXPERIENCE:
      state = initialState;
      return true;
    default:
      return state;
  }
}
