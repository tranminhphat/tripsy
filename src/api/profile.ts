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

export const saveExperience = (id: string, experienceId: string) => {
  return axios.put(`profiles/${id}/save-experience/${experienceId}`);
};

export const updateCheckpoints = (themeId: string) => {
  return axios.put(`profiles/update-checkpoints`, { themeId });
};
