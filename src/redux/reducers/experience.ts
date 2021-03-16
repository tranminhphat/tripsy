import IAction from "interfaces/action/action.interface";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import {
  GET_EXPERIENCE,
  RESET_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from "redux/actions/experience/experienceActionTypes";

const initialState: IExperienceResponse = {};

const experienceReducer = (state = initialState, action: IAction) => {
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
};

export default experienceReducer;
