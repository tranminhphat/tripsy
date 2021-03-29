import axios from "./configureAxios";

export const createCheckoutSession = (metadata) => {
  return axios.post("/stripe/checkout-session", { metadata });
};

export const retrieveCheckoutSession = (sessionId: string) => {
  return axios.get(`/stripe/checkout-session/${sessionId}`);
};
