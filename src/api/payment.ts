import axios from "./configureAxios";

export const createBookingSession = (metadata) => {
  return axios.post("/payments/booking", { metadata });
};

export const retrieveBookingSession = (sessionId: string) => {
  return axios.get(`/payments/booking/${sessionId}`);
};
