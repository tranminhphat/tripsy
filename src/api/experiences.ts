import createFilterString from "helpers/createFilterString";
import createLookUpString from "helpers/createLookUpString";
import IExperience from "interfaces/experiences/experience.interface";
import { ExperienceFieldType } from "types";
import axios from "./configureAxios";

export const getExperiencesByDate = (dayOfYear: number) => {
  return axios.get(`experiences/date/${dayOfYear}`);
};

export const getExperiences = (filterObject: IExperience) => {
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

export const updatePhotoGallery = (
  id: string,
  type: string,
  base64String: string
) => {
  return axios.put(`experiences/${id}/update-gallery`, {
    photo: { type, base64String },
  });
};

export const deleteExperienceById = (id: string) => {
  return axios.delete(`experiences/${id}`);
};
