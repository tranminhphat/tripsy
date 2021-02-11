import Cookies from "js-cookie";
import axios from "./ConfigAxios";
import LoginForm from "interfaces/forms/LoginForm.interface";
import RegisterForm from "interfaces/forms/RegisterForm.interface";

export const getCurrentUser = () => {
  return axios.get("/me");
};

export const isLoggedIn = (): boolean => {
  return Cookies.get("jwt") !== undefined;
};

export const login = (loginFormValues: LoginForm) => {
  return axios.post(`/auth/login`, loginFormValues);
};

export const register = (registerFormValues: RegisterForm) => {
  return axios.post(`/auth/register`, registerFormValues);
};

export const logout = () => {
  return axios.get(`/auth/logout`);
};
