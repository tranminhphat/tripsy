import axios from "./configureAxios";

/* Balance */
export const getBalanceByAccountId = (accountId: string) => {
  return axios.get(`stripe/balance/${accountId}`);
};

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

export const createRefund = (paymentIntentId: string) => {
  return axios.post(`stripe/refunds?payment_intent_id=${paymentIntentId}`);
};

export const getRefundById = (refundId: string) => {
  return axios.get(`stripe/refunds/${refundId}`);
};

/* Transfers */

export const createTransfer = (activityId: string) => {
  return axios.post(`stripe/transfers/${activityId}`);
};

/* Transactions */
export const getTransactions = (limit?: number) => {
  return axios.get(`stripe/transactions?limit=${limit}`);
};
