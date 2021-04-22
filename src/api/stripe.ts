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

export const updateCheckoutSession = (
  status: string,
  sessionId: string,
  activityId: string,
  receiptId: string
) => {
  return axios.post(`/stripe/update-checkout/${sessionId}`, {
    status,
    activityId,
    receiptId,
  });
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
