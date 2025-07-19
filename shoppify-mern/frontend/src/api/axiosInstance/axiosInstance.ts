//axiosIntsance.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
const BASE_URL = "http://localhost:4000/api";
import { store } from "../../store/store";
import { tokenRefreshRequest } from "../../store/actions/login.action";
import { LOGOUT_REQUEST } from "../../constants/app.constants";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

export let failedQueue: { resolve: (value: string) => void; reject: (reason?: any) => void }[] = [];

export const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token as string);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        console.log("-----------------------");
        console.log("In interceptor request");
        console.log("------------------------");
        
        const token = store.getState().auth.token;

        if (!config.headers) {
            config.headers = {} as AxiosRequestHeaders;
        }

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.Accept = "application/json";
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        console.log("-----------------------");
        console.log("In interceptor response unauthorized");
        console.log("------------------------");
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log("-----------------------");
            console.log("Inside first if block");
            console.log("------------------------");
            originalRequest._retry = true;
            const refreshToken = store.getState().auth.refreshToken;
            const isRefreshing = store.getState().auth.isRefreshing;
            console.log(isRefreshing)
            if (refreshToken) {
                if (!isRefreshing) {
                    store.dispatch(tokenRefreshRequest()); // Dispatch action to trigger saga

                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve: (newToken: string) => {
                            originalRequest.headers!.Authorization = `Bearer ${newToken}`;
                            resolve(axiosInstance(originalRequest)); // Retry the original request
                        }, reject });
                    });
                } else {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve: (newToken: string) => {
                            originalRequest.headers!.Authorization = `Bearer ${newToken}`;
                            resolve(axiosInstance(originalRequest)); // Retry the original request
                        }, reject });
                    });
                }
            } else {
                store.dispatch({ type: LOGOUT_REQUEST, payload: {} });
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;