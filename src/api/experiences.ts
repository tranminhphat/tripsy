import axios from "./configureAxios";
import { IExperienceResponse } from "interfaces/experiences/experience.interface";
import createFilterString from "helpers/createFilterString";
import { ExperienceFieldType } from "types";
import createLookUpString from "helpers/createLookUpString";

export const getExperiences = (filterObject: IExperienceResponse) => {
  const filterString = createFilterString(filterObject);
  return axios.get(`experiences?filter=${filterString}`);
};

export const getExperienceById = (
  id: string,
  fieldsArray?: ExperienceFieldType[]
) => {
  if (fieldsArray) {
    const fieldString = createLookUpString(fieldsArray);
    return axios.get(`experiences/${id}?fields=${fieldString}`);
  }
  return axios.get(`experiences/${id}`);
};

export const createExperience = () => {
  return axios.post(`experiences`);
};

export const updateExperienceById = (id: string, data) => {
  return axios.put(`experiences/${id}`, data);
};

export const deleteExperienceById = (id: string) => {
  return axios.delete(`experiences/${id}`);
};
