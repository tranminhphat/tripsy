import axios from "./configureAxios";

export const getRecommendByUserId = (id: string) => {
  return axios.get(`/akin/${id}`);
};

export const addActivityLog = (userId: string, experienceId: string) => {
  return axios.post(`/akin/add-log`, { userId, experienceId });
};

export const removeActivityLog = (userId: string, experienceId: string) => {
  return axios.post(`/akin/remove-log`, { userId, experienceId });
};
