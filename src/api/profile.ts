import axios from "./configureAxios";

export const getProfileById = (id: string) => {
  return axios.get(`profiles/${id}`);
};

export const createProfile = () => {
  return axios.post(`profiles`);
};

export const updateProfileById = (id: string, updatedProperties) => {
  return axios.put(`profiles/${id}`, updatedProperties);
};
