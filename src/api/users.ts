import createLookUpString from "helpers/createLookUpString";
import { UserFieldType } from "types";
import axios from "./configureAxios";

export const getCurrentUser = (fields?: UserFieldType[]) => {
  if (fields) {
    const fieldString = createLookUpString(fields);
    return axios.get(`/users/me?fields=${fieldString}`);
  } else {
    return axios.get(`/users/me`);
  }
};

export const getUserById = (id: string) => {
  return axios.get(`users/${id}`);
};

export const updateUserById = (id: string, data) => {
  return axios.put(`users/${id}`, data);
};
