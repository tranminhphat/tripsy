import axios from "./configureAxios";

export const getThemes = () => {
  return axios.get("/themes");
};

export const getThemeById = (id: string) => {
  return axios.get(`/themes/${id}`);
};

export const createTheme = (model) => {
  return axios.post("/themes", { model });
};

export const updateThemeById = (id: string, updatedProperties) => {
  return axios.put(`/themes/${id}`, { updatedProperties });
};

export const deleteThemeById = (id: string) => {
  return axios.delete(`/themes/${id}`);
};
