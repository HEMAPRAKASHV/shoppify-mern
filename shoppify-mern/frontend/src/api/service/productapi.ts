import api from ".";
import { queries } from "../../types";
import axiosInstance from "../axiosInstance/axiosInstance";

export const getProducts = (query: queries) => {
  return axiosInstance.get(api.getProducts + `search=${query.query}&page=${query.page}&limit=${query.limit}`);
};
