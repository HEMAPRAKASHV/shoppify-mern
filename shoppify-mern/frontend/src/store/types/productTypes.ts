/**
 * Product Action Types
 */
export enum ProductActionTypes {
  GET_ALL_PRODUCTS_REQUEST = "GET_ALL_PRODUCTS_REQUEST",
  GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS",
  GET_ALL_PRODUCTS_FAILURE = "GET_ALL_PRODUCTS_FAILURE",
}

export interface Iproduct {
  _id: string;
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

export interface IProductState {
  products: Iproduct[];
  loading: boolean;
  error: string | null;
  message: string;
  currentPage: number | undefined;
  totalPages: number | undefined;
  totalCount: number | undefined;
}
