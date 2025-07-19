import api from ".";
import { queries } from "../../types";
import axiosInstance from "../axiosInstance/axiosInstance";

export const getOrders = (query: queries) => {
  return axiosInstance.get(
    api.getOrders +
      `search=${query.query}&page=${query.page}&limit=${query.limit}`
  );
};

export const orderProduct = (payload: any) => {
  return axiosInstance.post(api.orderProduct, payload);
};
