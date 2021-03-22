import axios from "./configureAxios";

export const createBookingSession = () => {
  return axios.post("/payments/booking");
};
