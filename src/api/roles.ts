import axios from "./configureAxios";

export const getRoles = () => {
  return axios.get("/roles");
};
