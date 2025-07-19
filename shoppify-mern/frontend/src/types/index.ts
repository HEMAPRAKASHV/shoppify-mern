export interface FormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: number;
  password: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface ErrorResponse {
  status: number;
  response: {
    data: {
      message: string;
    };
  };
}

export interface products {
  _id: string;
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

export interface updatecart {
  email: string;
  userId: string;
  productId: string;
}

export interface removeCart {
  userId: string;
  productId: string;
}

export interface item {
  product: string;
  quantity: number;
}

export interface IOrder {
  userId: string;
  products: item[];
}

export interface IAction {
  type: string;
  payload: IOrder[];
}

export interface IInitState {
  data: Array<IOrder>;
  loading: boolean;
  error: string;
}

export const initialState = {
  data: [],
  loading: false,
  error: "",
};

export interface IProdAction {
  type: string;
  payload: IPayload;
}

export interface IPayload {
  data: any;
  statusCode: string;
  message: string;
  error: string | null;
}

export interface queries {
  query: string;
  page: number;
  limit: number;
}

export interface productItem {
  _id: string;
  name: string;
  quantity: number;
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export interface order {
  _id: string;
  status: string;
  orderedDate: string;
  products: productItem[];
}

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: any;
  loading: boolean;
  error: ErrorResponse | null;
  isRefreshing: boolean;
  isLoggedIn: boolean;
}
