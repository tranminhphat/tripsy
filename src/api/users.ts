import axios from "./configureAxios";

export const getUserById = (id: string) => {
  return axios.get(`users/${id}`);
};

export const updateUserById = (id: string, data) => {
  return axios.put(`users/${id}`, data);
};
