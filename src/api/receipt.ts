import axios from "./configureAxios";

export const createReceipt = async (model) => {
  return await axios.post("/receipts", { model });
};

export const updateReceiptById = async (id: string, updatedProperties) => {
  return await axios.put(`receipts/${id}`, updatedProperties);
};

export const deleteReceiptById = async (id: string) => {
  return await axios.delete(`receipts/${id}`);
};
