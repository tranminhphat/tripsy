import Cookies from "js-cookie";
import axios from "./ConfigAxios";
import ILoginForm from "interfaces/forms/LoginForm.interface";
import IRegisterForm from "interfaces/forms/RegisterForm.interface";

export const getCurrentUser = () => {
  return axios.get("/me");
};

export const isLoggedIn = (): boolean => {
  return Cookies.get("jwt") !== undefined;
};

export const login = (loginFormValues: ILoginForm) => {
  return axios.post(`/auth/login`, loginFormValues);
};

export const register = (registerFormValues: IRegisterForm) => {
  return axios.post(`/auth/register`, registerFormValues);
};

export const logout = () => {
  return axios.get(`/auth/logout`);
};

export const resendEmailVerification = (userId, userEmail) => {
  return axios.post(`/auth/resendEmailVerification`, { userId, userEmail });
};
