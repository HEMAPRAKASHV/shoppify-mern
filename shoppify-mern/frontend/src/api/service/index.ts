const BASE_URL = "http://localhost:4000/api/v1"; //import.meta.env.VITE_BASE_URL;

/**
 * @description List of all the routes used in the project
 */
const api = {
  login: BASE_URL + "/auth/login",
  register: BASE_URL + "/auth/register",
  refreshToken: BASE_URL + "/auth/refreshToken",
  getProducts: BASE_URL + "/products/allProducts?",
  updateCart: BASE_URL + "/cart/update-cart",
  removeCart: BASE_URL + "/cart/remove-cart",
  getCarts: BASE_URL + "/cart/getCart?",
  removesingleProd: BASE_URL + "/cart/remove-single-Prod",
  updateWishlist: BASE_URL + "/wishlist/add-to-wishlist",
  getWishlist: BASE_URL + "/wishlist/getWishList?",
  orderProduct: BASE_URL + "/order/order-product",
  getOrders: BASE_URL + "/order/getOrders?",
};

export default api;
