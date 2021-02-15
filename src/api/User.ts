import axios from "./configureAxios";

export const getUserById = (id: string) => {
  return axios.get(`users/${id}`);
};
