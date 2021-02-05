import { apiUrl } from "../configs";
import axios from "axios";
import LoginForm from "../@types/forms/LoginForm";
import RegisterForm from "../@types/forms/RegisterForm";

export const AUTH_URL = `${apiUrl}/auth`;

export const login = (loginFormValues: LoginForm) => {
  return axios.post(`${AUTH_URL}/login`, loginFormValues);
};

export const register = (registerFormValues: RegisterForm) => {
  return axios.post(`${AUTH_URL}/register`, registerFormValues);
};
