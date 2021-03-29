import createFilterString from "helpers/createFilterString";
import axios from "./configureAxios";

export const getReceipts = (filterObject) => {
  const filterString = createFilterString(filterObject);
  return axios.get(`receipts?filter=${filterString}`);
};

export const createReceipt = async (model) => {
  return await axios.post("receipts", { model });
};

export const updateReceiptById = async (id: string, updatedProperties) => {
  return await axios.put(`receipts/${id}`, updatedProperties);
};

export const deleteReceiptById = async (id: string) => {
  return await axios.delete(`receipts/${id}`);
};
