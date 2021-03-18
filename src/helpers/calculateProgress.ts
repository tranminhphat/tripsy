import { IExperienceResponse } from "interfaces/experiences/experience.interface";

export const calculateCurrentProgress = (
  experienceDocument: IExperienceResponse,
  isIdVerified: boolean
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
    photoGallery,
    groupSize,
    duration,
    startTime,
    pricing,
    bookingDate,
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
  if (!photoGallery) {
    return [2, 6];
  }
  if (!groupSize) {
    return [3, 1];
  }
  if (!!duration) {
    return [3, 2];
  }
  if (!startTime) {
    return [3, 3];
  }
  if (!pricing) {
    return [3, 4];
  }
  if (!bookingDate) {
    return [3, 5];
  }
  if (!isIdVerified) {
    return [4, 2];
  }

  return [-1, 1];
};
