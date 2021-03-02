import { IExperienceResponse } from "interfaces/experiences/experience.interface";

const calculateProgressStep = (experienceDocument: IExperienceResponse) => {
  const { theme, title, language } = experienceDocument;
  if (!theme) {
    return [1, 1];
  }
  if (!title) {
    return [1, 2];
  }
  if (!language) {
    return [1, 3];
  }

  return [1, 0];
};

export default calculateProgressStep;
