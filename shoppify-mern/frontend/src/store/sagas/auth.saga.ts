import { call, put, select, takeLatest } from "redux-saga/effects";
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    TOKEN_REFRESH_REQUEST,
} from "../types/loginTypes";
import { loginApi, refreshTokenApi } from "../../api/service/authapi";
import { RootState } from "../reducers/rootReducer";
import {
    tokenRefreshFailure,
    tokenRefreshSuccess,
} from "../actions/login.action";
import { LOGOUT_REQUEST } from "../../constants/app.constants";
import { processQueue } from "../../api/axiosInstance/axiosInstance";
import { AxiosError } from "axios"; 

interface LoginResponse {
    data: {
        token: string;
        refreshToken: string;
        data: any;
    };
}

interface RefreshTokenResponse {
  data:{
    accessToken: string;
  }
}

interface ErrorResponse {
    response: {
        data: any;
    };
}

export function* loginSaga(action: any) {
    try {
        const response: LoginResponse = yield call(
            loginApi,
            action.payload.credentials
        );
        yield put({ type: LOGIN_SUCCESS, payload: response.data });
        action.payload.callBack(true, null, response.data.token);
    } catch (error: any) {
        const errorResponse: ErrorResponse = error;
        yield put({ type: LOGIN_FAILURE, payload: errorResponse.response.data });
        action.payload.callBack(false, errorResponse.response.data, "");
    }
}

export function* tokenRefreshSaga(): Generator<any, void, any> {

    console.log("-------------------------")
    console.log("Inside token refresh saga")
    console.log("-------------------------")

    try {
        const refreshToken = yield select(
            (state: RootState) => state.auth.refreshToken
        );

        if (!refreshToken) {
            yield put(tokenRefreshFailure("No refresh token available"));
            yield put({ type: LOGOUT_REQUEST });
            const error = new Error("No refresh token available") as AxiosError; // Cast Error to AxiosError
            processQueue(error, null);
            return;
        }

        const response: RefreshTokenResponse = yield call(
            refreshTokenApi,
            refreshToken
        );
        console.log(response)
        yield put(tokenRefreshSuccess(response.data.accessToken));
        processQueue(null, response.data.accessToken);
    } catch (error: any) {
        const errorResponse: ErrorResponse = error;
        yield put(tokenRefreshFailure(errorResponse.response.data));
        yield put({ type: LOGOUT_REQUEST });
        processQueue(errorResponse as AxiosError, null); // Cast errorResponse to AxiosError
    }
}

export function* watchLoginSaga() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
    yield takeLatest(TOKEN_REFRESH_REQUEST, tokenRefreshSaga);
}