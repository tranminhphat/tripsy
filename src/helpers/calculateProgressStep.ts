import { IExperienceResponse } from "interfaces/experiences/experience.interface";

export const calculateProgressStep = (
  experienceDocument: IExperienceResponse
) => {
  const { theme, location, language, a } = experienceDocument;
  if (!theme) {
    return [1, 1];
  }
  if (!location) {
    return [1, 2];
  }
  if (!language) {
    return [1, 3];
  }
  if (!a) {
    return [2, 1];
  }

  return [1, 0];
};

export const isProgressDone = (
  experienceDocument: IExperienceResponse,
  progressNumber: number
) => {
  const { theme, location, language, a } = experienceDocument;

  switch (progressNumber) {
    case 1:
      if (theme && location && language) {
        return true;
      } else {
        return false;
      }

    case 2:
      if (a) {
        return true;
      } else {
        return false;
      }
    default:
      return false;
  }
};
