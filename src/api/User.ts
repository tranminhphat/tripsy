import axios from "./ConfigAxios";

export const getUserById = (id: string) => {
  return axios.get(`users/${id}`);
};
