import axios from "./configureAxios";

export const createPhoneVerification = (number: string) => {
  return axios.post("/vonage/verify", { number });
};

export const sendVerifyToken = (id: string, token: string) => {
  return axios.post(`/vonage/verify/${token}`, { id });
};
