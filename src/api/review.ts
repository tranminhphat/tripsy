import createFilterString from "helpers/createFilterString";
import axios from "./configureAxios";

export const createUserReview = (
  objectId: string,
  numOfStars: number,
  content: string
) => {
  return axios.post("/reviews", {
    objectId,
    numOfStars,
    content,
    onModel: "User",
  });
};

export const createExperienceReview = (
  objectId: string,
  numOfStars: number,
  content: string
) => {
  return axios.post("/reviews", {
    objectId,
    numOfStars,
    content,
    onModel: "Experience",
  });
};

export const getReviews = (filterObject) => {
  const filterString = createFilterString(filterObject);
  return axios.get(`reviews?filter=${filterString}`);
};
