import createFilterString from "helpers/createFilterString";
import axios from "./configureAxios";

export const getReceipts = (filterObject) => {
  const filterString = createFilterString(filterObject);
  return axios.get(`receipts?filter=${filterString}`);
};

export const createReceipt = (model) => {
  return axios.post("receipts", { model });
};

export const updateReceiptById = (id: string, updatedProperties) => {
  return axios.put(`receipts/${id}`, updatedProperties);
};

export const deleteReceiptById = (id: string) => {
  return axios.delete(`receipts/${id}`);
};
