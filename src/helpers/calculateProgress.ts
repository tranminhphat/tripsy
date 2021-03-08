import { IExperienceResponse } from "interfaces/experiences/experience.interface";

export const calculateCurrentProgress = (
  experienceDocument: IExperienceResponse
) => {
  const { theme, location, language, address } = experienceDocument;
  if (!theme) {
    return [1, 1];
  }
  if (!location) {
    return [1, 2];
  }
  if (!language) {
    return [1, 3];
  }
  if (!address) {
    return [2, 1];
  }

  return [-1, -1];
};
