import axios from "./configureAxios";

export const getRoles = () => {
  return axios.get("/roles");
};

export const getRoleById = (id: string) => {
  return axios.get(`/roles/${id}`);
};

export const createRole = (model) => {
  return axios.post("/roles", { model });
};

export const updateRoleById = (id: string, updatedProperties) => {
  return axios.put(`/roles/${id}`, { updatedProperties });
};

export const deleteRoleById = (id: string) => {
  return axios.delete(`/roles/${id}`);
};
