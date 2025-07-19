import { OrderActionTypes, IOrderState } from "../types/orderTypes";

const initialState: IOrderState = {
  orders: [],
  loading: false,
  error: null,
  message: "",
};

export const orderReducer = (
  state = initialState,
  action: any
): IOrderState => {
  switch (action.type) {
    /** Fetch order request */
    case OrderActionTypes.GET_ALL_ORDERS_REQUEST:
      return { ...state, loading: true, error: null };

    case OrderActionTypes.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.data.message,
        error: null,
        orders: action.payload.order.orders,
      };

    case OrderActionTypes.GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload.data.message,
      };

    default:
      return state;
  }
};
