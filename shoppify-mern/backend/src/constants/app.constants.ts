export const CUSTOM_CODES = {
  LOGIN_SUCCESS: {
    code: "IN1001",
    message: "Logged in successfully",
  },
  LOGIN_FAILED: {
    code: "IN4001",
    message: "Failed to login",
  },
  INVALID_CREDENTIALS: {
    code: "IN4004",
    message: "Invalid credentials",
  },
  REGISTER_SUCCESS: {
    code: "IN1002",
    message: "Registered successfully",
  },
  EXISTING_USER: {
    code: "IN4003",
    message: "User already exists, please login",
  },
  REGISTERN_FAILED: {
    code: "IN4002",
    message: "Failed to register",
  },

  UPDATE_CART_SUCCESS: {
    code: "IN5001",
    message: "Cart updated successfully",
  },

  UPDATE_CART_FAILED: {
    code: "IN5002",
    message: "Failed to update cart",
  },
  FETCH_CART_SUCCESS: {
    code: "IN6001",
    message: "Cart itemS fetched successfully",
  },
  FETCH_CART_FAILED: {
    code: "IN6002",
    message: "Failed to fetch cart items",
  },

  FETCH_PRODUCTS_SUCCESS: {
    code: "IN7001",
    message: "Products fetched successfully",
  },

  FETCH_PRODUCTS_FAILED: {
    code: "IN7002",
    message: "Failed to fetch products",
  },

  FETCH_ORDERS_SUCCESS: {
    code: "IN1000",
    message: "Orders fetched successfully"
  },
  FETCH_ORDERS_FAILED: {
    code: "IN1001",
    message: "failed to fetch orders"
  },

  UPDATE_WISHLIST_SUCCESS: {
    code: "IN8001",
    message: "Wishlist updated successfully",
  },

  UPDATE_WISHLIST_FAILED: {
    code: "IN8002",
    message: "Failed to update wishlist",
  },

  FETCH_WISHLIST_SUCCESS: {
    code: "IN9001",
    message: "Wishlist items fetched successfully",
  },
  FETCH_WISHLIST_FAILED: {
    code: "IN9002",
    message: "Failed to fetch wishlist items",
  },
};

export const ERROR_CODES = {
  SERVER_ERROR: {
    code: "IN4400",
    message: "server error, please try again",
  },
  UNAUTHORIZED: {
    code: "IN4401",
    message: "You are not authorized",
  },
  FORBIDDEN: {
    code: "IN4402",
    message: "You do not have permission",
  },
  BAD_REQUEST: {
    code: "IN4403",
    message: "Bad request, please try a different way",
  },
  NOT_FOUND: {
    code: "IN4404",
    message: "Not found",
  },
  INVALID_TOKEN: {
    code: "IN4405",
    message: "Token expired or invalid",
  },
  METHOD_ERROR: {
    code: "IN4405",
    message: "Method not allowed, please check the http method used",
  },
  DATABASE_ERROR: {
    code: "IN4406",
    message: "Something went wrong, please try again after sometime",
  },
  FIELDS_ERROR: {
    code: "IN4407",
    message: "Required fields are missing or incorrect type",
  },
  SUCCESS: {
    code: "IN2200",
    message: "OK",
  },
  EXPIRED_TOKEN: {
    code: "IN4408",
    message: "Token expired",
  },
};

export const HEADERS = {
  JSON: { "Content-Type": "application/json" },
};
