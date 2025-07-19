export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: number;
  password: string;
  role?: string;
  cart: {
    product: string;
    quantity: number;
  }[];
  wishlist: string[];
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

export interface IOrder {
  user: IUser;
  products: {
    product: IProduct;
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
  orderedDate: Date;
}

export interface RegisterUserParams {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Others";
  email: string;
  phone: number;
  password: string;
  role?: string;
  wishList?: [];
  cart?: [];
}

export interface LoginUserParams {
  email: string;
  password: string;
}

export interface item {
  product: string;
  quantity: number;
}

export interface order {
  userId: string;
  products: item[];
}

/**
 * Custom response formatter
 */
export interface IResponse<T = undefined> {
  data: T | undefined;
  httpCode: number;
  statusCode: string;
  message: string;
  error?: string | unknown | null;
}

export interface Auth {
  userId: string;
  role: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      auth: Auth;
    }
  }
}
