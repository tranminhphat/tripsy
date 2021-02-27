import axios from "./configureAxios";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import createFilterString from "helpers/createFilterString";

export const getExperiences = (filterObject: IExperienceResponse) => {
  const filterString = createFilterString(filterObject);
  return axios.get(`experiences?filter=${filterString}`);
};

export const getExperienceById = (id: string) => {
  return axios.get(`experiences/${id}`);
};

export const createExperience = () => {
  return axios.post(`experiences`);
};

export const updateExperienceById = (id: string, data) => {
  return axios.put(`experiences/${id}`, data);
};
