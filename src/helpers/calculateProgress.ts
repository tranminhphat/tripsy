import IExperience from "interfaces/experiences/experience.interface";

export const calculateCurrentProgress = (
  experienceDocument: IExperience,
  isPhoneVerified
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
  if (photoGallery?.some((photo) => photo.url === "")) {
    return [2, 6];
  }
  if (!groupSize) {
    return [3, 1];
  }
  if (!duration) {
    return [3, 2];
  }
  if (!pricing) {
    return [3, 3];
  }
  if (!bookingDate) {
    return [3, 4];
  }
  if (!isPhoneVerified) {
    return [4, 1];
  }
  return [-1, 1];
};
