import { IPayload } from "../../types";
import { OrderActionTypes } from "../types/orderTypes";

/**
 * @author Hemaprakash V
 * @description Order action types of order, which include:
 *  - Fetch all the orders
 */

/** Fetch all orders */
export const fetchOrderRequests = (userId: string) => ({
  type: OrderActionTypes.GET_ALL_ORDERS_REQUEST,
  payload: userId,
});

export const fetchOrderSuccess = (payload: IPayload) => ({
  type: OrderActionTypes.GET_ALL_ORDERS_SUCCESS,
  payload: payload,
});

export const fetchOrderFailure = (payload: IPayload) => ({
  type: OrderActionTypes.GET_ALL_ORDERS_FAILURE,
  payload: payload,
});
