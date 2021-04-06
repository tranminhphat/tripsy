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

export const changePassword = (
  currentPassword: string,
  newPassword: string
) => {
  return axios.put(`users/change-password`, { currentPassword, newPassword });
};

export const changeAvatar = (base64String: string) => {
  return axios.put(`users/change-avatar`, { base64String });
};

export const verifyIdentity = (idCard: { front: string; back: string }) => {
  return axios.put(`users/verify-id`, { idCard });
};
