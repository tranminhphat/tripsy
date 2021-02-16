import Cookies from "js-cookie";
import axios from "./configureAxios";
import ILoginForm from "interfaces/forms/login-form.interface";
import IRegisterForm from "interfaces/forms/register-form.interface";

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

export const resendEmailVerification = (userId: string, userEmail: string) => {
  return axios.post(`/auth/resend-email-verification`, { userId, userEmail });
};

export const forgotPassword = (userEmail: string) => {
  return axios.post(`/auth/forgot-password`, { email: userEmail });
};
