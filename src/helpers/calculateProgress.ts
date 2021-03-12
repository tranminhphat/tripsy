import { IExperienceResponse } from "interfaces/experiences/experience.interface";

export const calculateCurrentProgress = (
  experienceDocument: IExperienceResponse
) => {
  const {
    theme,
    location,
    language,
    description,
    address,
    hostProvisions,
    guestBrings,
    title,
    photos,
  } = experienceDocument;
  if (!theme) {
    return [1, 1];
  }
  if (!location) {
    return [1, 2];
  }
  if (!language) {
    return [1, 3];
  }
  if (!description) {
    return [2, 1];
  }
  if (!address) {
    return [2, 2];
  }
  if (!hostProvisions) {
    return [2, 3];
  }
  if (!guestBrings) {
    return [2, 4];
  }
  if (!title) {
    return [2, 5];
  }

  return [-1, 1];
};
