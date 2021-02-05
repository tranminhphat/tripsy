import axios from "./ConfigAxios";
import Cookies from "js-cookie";
import LoginForm from "../@types/forms/LoginForm";
import RegisterForm from "../@types/forms/RegisterForm";

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
