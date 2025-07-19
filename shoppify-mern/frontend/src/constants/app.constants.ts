export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";

export const ORDER_REQUEST = "SUBMIT_ORDER_REQUEST";
export const ORDER_SUCCESS = "SUBMIT_ORDER_SUCCESS";
export const ORDER_FAILURE = "SUBMIT_ORDER_FAILURE";

export const CUSTOM_CODES = {
  FETCH_PRODUCT_SUCCESS: {
    code: "IN3001",
    message: "Product fetched successfully",
  },
  FETCH_PRODUCT_FAILED: {
    code: "IN3002",
    message: "Failed to fetch product",
  },
  FETCH_ORDERS_SUCCESS: {
    code: "IN4001",
    message: "Orders fetched successfully",
  },
  FETCH_ORDERS_FAILED: {
    code: "IN4002",
    message: "Failed to fetch Orders",
  },
};
