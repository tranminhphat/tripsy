import axios from "./configureAxios";

export const getUserById = (id: string) => {
  return axios.get(`user/${id}`);
};

export const updateUserById = (id: string, data) => {
  return axios.put(`user/${id}`, data);
};
