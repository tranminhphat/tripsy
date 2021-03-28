import axios from "./configureAxios";

/* Account */
export const getAccountById = (accountId: string) => {
  return axios.get(`stripe/accounts/${accountId}`);
};

export const createPayOutAccount = () => {
  return axios.post(`stripe/accounts`);
};

export const createOnBoardingLink = (accountId: string) => {
  return axios.post(`stripe/accounts/${accountId}/link`);
};
