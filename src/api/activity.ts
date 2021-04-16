import createFilterString from "helpers/createFilterString";
import axios from "./configureAxios";

export const getActivities = (filterObject) => {
  const filterString = createFilterString(filterObject);
  return axios.get(`activities?filter=${filterString}`);
};

export const getActivityById = (id: string) => {
  return axios.get(`activities/${id}`);
};

export const createActivity = (model) => {
  return axios.post("activities", { model });
};

export const updateActivityById = (id: string, updatedProperties) => {
  return axios.put(`activities/${id}`, updatedProperties);
};

export const updateListOfGuest = (id: string) => {
  return axios.put(`activities/${id}/update-guestlist`);
};

export const deleteActivityById = (id: string) => {
  return axios.delete(`activities/${id}`);
};
