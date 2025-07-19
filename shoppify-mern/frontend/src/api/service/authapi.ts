import axios from "axios";
import { FormValues, LoginValues } from "../../types";
import api from ".";

export const refreshTokenApi = (refreshToken: string) => {
  return axios.post(api.refreshToken, { refreshToken });
};

export const loginApi = (credentials: LoginValues) => {
  return axios.post(api.login, credentials);
};

export const registerApi = (Credentials: FormValues) => {
  return axios.post(api.register, Credentials);
};
