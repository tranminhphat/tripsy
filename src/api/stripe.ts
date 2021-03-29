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

/* Checkout session */

export const createCheckoutSession = (metadata) => {
  return axios.post("/stripe/checkout-session", { metadata });
};

export const getCheckoutSessionById = (sessionId: string) => {
  return axios.get(`/stripe/checkout-session/${sessionId}`);
};

/* Refund */

export const createRefund = async (paymentIntentId: string) => {
  return await axios.post(
    `stripe/refunds?payment_intent_id=${paymentIntentId}`
  );
};

export const getRefundById = async (refundId: string) => {
  return await axios.get(`stripe/refunds/${refundId}`);
};
