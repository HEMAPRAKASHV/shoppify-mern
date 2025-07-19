/**
 * Order Action Types
 */
export enum OrderActionTypes {
    GET_ALL_ORDERS_REQUEST = "GET_ALL_ORDERS_REQUEST",
    GET_ALL_ORDERS_SUCCESS = "GET_ALL_ORDERS_SUCCESS",
    GET_ALL_ORDERS_FAILURE = "GET_ALL_ORDERS_FAILURE"
}

export interface IOProduct {
    _id: string;
    name: string;
    product: string;
    quantity: number;
}

export interface IOrder {
    _id: string;
    user: string;
    products: IOProduct[];
    totalAmount: number;
    status: string;
}

export interface IOrderState {
    orders: IOrder[];
    loading: boolean;
    error: string | null;
    message: string;
}