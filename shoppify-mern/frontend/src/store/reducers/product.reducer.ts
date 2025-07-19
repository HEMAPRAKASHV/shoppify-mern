import { ProductActionTypes, IProductState } from "../types/productTypes";

const initialState: IProductState = {
  products: [],
  loading: false,
  error: null,
  message: "",
  currentPage: undefined,
  totalPages: undefined,
  totalCount: undefined,
};

export const productReducer = (
  state = initialState,
  action: any
): IProductState => {
  switch (action.type) {
    /** Fetch product request */
    case ProductActionTypes.GET_ALL_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };

    case ProductActionTypes.GET_ALL_PRODUCTS_SUCCESS:
      console.log(action.payload.data.data.products);
      return {
        ...state,
        loading: false,
        message: action.payload.data.message,
        error: null,
        products: action.payload.data.data.products,
        currentPage: action.payload.data.data.currentPage,
        totalPages: action.payload.data.data.totalPages,
        totalCount: action.payload.data.data.totalCount,
      };

    case ProductActionTypes.GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload.data.message,
      };

    default:
      return state;
  }
};
