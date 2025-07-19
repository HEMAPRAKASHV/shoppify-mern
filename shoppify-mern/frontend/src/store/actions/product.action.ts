import { IPayload } from "../../types";
import { ProductActionTypes } from "../types/productTypes";

/**
 * @author Hemaprakash V
 * @description Product action types of product, which inlude:
 *  - Fetch all the products
 */

interface IQuery {
  query: string | undefined;
}

/** Fetch all products */
export const fetchProductsRequest = (payload: IQuery) => ({
  type: ProductActionTypes.GET_ALL_PRODUCTS_REQUEST,
  payload: payload,
});

export const fetchProductSuccess = (payload: IPayload) => ({
  type: ProductActionTypes.GET_ALL_PRODUCTS_SUCCESS,
  payload: payload,
});

export const fetchProductFailure = (payload: IPayload) => ({
  type: ProductActionTypes.GET_ALL_PRODUCTS_FAILURE,
  payload: payload,
});
