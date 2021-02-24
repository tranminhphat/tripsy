import axios from "./configureAxios";
import { IExperience } from "interfaces/experiences/experience.interface";
import createFilterString from "helpers/createFilterString";

export const getExperiences = (filterObject) => {
  const filterString = createFilterString(filterObject);
  return axios.get(`experiences?filter=${filterString}`);
};

export const createExperience = (experience: IExperience) => {
  return axios.post(`experiences`, experience);
};
