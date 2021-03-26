import axios from "./configureAxios";

export const createBookingSession = (metadata) => {
  return axios.post("/payments/booking", { metadata });
};
