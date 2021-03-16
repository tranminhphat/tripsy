import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import {
  GET_EXPERIENCE,
  RESET_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from "./experienceActionTypes";

export const getExperience = () => ({
  type: GET_EXPERIENCE,
});

export const updateExperience = (updatedProperties: IExperienceResponse) => ({
  type: UPDATE_EXPERIENCE,
  payload: { updatedProperties },
});

export const resetExperiece = () => ({
  type: RESET_EXPERIENCE,
});
