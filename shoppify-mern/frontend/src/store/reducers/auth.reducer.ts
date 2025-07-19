//authReducers.ts
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  TOKEN_REFRESH_REQUEST,
  TOKEN_REFRESH_SUCCESS,
  TOKEN_REFRESH_FAILURE,
} from "../types/loginTypes";
import { AuthState } from "../../types";
import { LOGOUT_REQUEST } from "../../constants/app.constants";

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  loading: false,
  error: null,
  isRefreshing: false,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action: any) => {
  console.log("-------------------------")
  console.log("action type ", action.type);
  console.log("action payload ", action.payload)
  console.log("-------------------------")

  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null, isLoggedIn: false };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.data.token,
        refreshToken: action.payload.data.refreshToken,
        user: action.payload.data.data,
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isLoggedIn: false,
      };
    case TOKEN_REFRESH_REQUEST:
      return {
        ...state,
        isRefreshing: true,
        error: null,
      };
    case TOKEN_REFRESH_SUCCESS:
      return {
        ...state,
        token: action.payload.data.accessToken, // Ensure payload has accessToken directly
        isRefreshing: false,
        error: null,
      };
    case TOKEN_REFRESH_FAILURE:
      return {
        ...state,
        isRefreshing: false,
        error: action.payload,
        token: null, // Optionally clear tokens on refresh failure
        refreshToken: null,
        user: null,
        isLoggedIn: false,
      };
    case LOGOUT_REQUEST:
      return { ...initialState }; // Reset state on logout
    default:
      return state;
  }
};

export default authReducer;