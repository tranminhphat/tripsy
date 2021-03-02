import createLookUpString from "helpers/createLookUpString";
import { UserFieldType } from "types";
import axios from "./configureAxios";

export const getCurrentUser = (fieldsArray?: UserFieldType[]) => {
  if (fieldsArray) {
    const fieldString = createLookUpString(fieldsArray);
    return axios.get(`/users/me?fields=${fieldString}`);
  } else {
    return axios.get(`/users/me`);
  }
};

export const getUserById = (id: string, fieldsArray?: UserFieldType[]) => {
  if (fieldsArray) {
    const fieldString = createLookUpString(fieldsArray);
    return axios.get(`/users/${id}?fields=${fieldString}`);
  } else {
    return axios.get(`users/${id}`);
  }
};

export const updateUserById = (id: string, data) => {
  return axios.put(`users/${id}`, data);
};
