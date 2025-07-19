import { Action } from "redux";
import {
  TOKEN_REFRESH_FAILURE,
  TOKEN_REFRESH_REQUEST,
  TOKEN_REFRESH_SUCCESS,
} from "../types/loginTypes";

interface TokenRefreshRequestAction extends Action {
  type: typeof TOKEN_REFRESH_REQUEST;
}

interface TokenRefreshSuccessAction extends Action {
  type: typeof TOKEN_REFRESH_SUCCESS;
  payload: {
    data: {
      accessToken: string;
    }
  };
}

interface TokenRefreshFailureAction extends Action {
  type: typeof TOKEN_REFRESH_FAILURE;
  payload: string;
}

export type TokenRefreshActionTypes =
  | TokenRefreshRequestAction
  | TokenRefreshSuccessAction
  | TokenRefreshFailureAction;

export const tokenRefreshRequest = (): TokenRefreshRequestAction => ({
  type: TOKEN_REFRESH_REQUEST,
});

export const tokenRefreshSuccess = (
  accessToken: string
): TokenRefreshSuccessAction => ({
  type: TOKEN_REFRESH_SUCCESS,
  payload: { data: { accessToken } },
});

export const tokenRefreshFailure = (
  error?: string
): TokenRefreshFailureAction => ({
  type: TOKEN_REFRESH_FAILURE,
  payload: error || "Token refresh failed",
});
