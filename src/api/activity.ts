import createFilterString from "helpers/createFilterString";
import axios from "./configureAxios";

export const getActivities = (filterObject) => {
  const filterString = createFilterString(filterObject);
  return axios.get(`activities?filter=${filterString}`);
};

export const getActivityById = (id: string) => {
  return axios.get(`activities/${id}`);
};

export const createActivity = async (model) => {
  return await axios.post("activities", { model });
};

export const updateActivityById = async (id: string, updatedProperties) => {
  return await axios.put(`activities/${id}`, updatedProperties);
};

export const deleteActivityById = async (id: string) => {
  return await axios.delete(`activities/${id}`);
};
