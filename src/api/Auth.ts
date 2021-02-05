import { apiUrl } from "../configs";
import axios from "axios";

export const AUTH_URL = `${apiUrl}/auth`;

export const login = (formValues: any) => {
  axios.post(`${AUTH_URL}/login`, formValues).then((res) => {
    console.log(res);
  });
};
