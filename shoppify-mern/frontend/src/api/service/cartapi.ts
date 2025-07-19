import api from ".";
import axiosInstance from "../axiosInstance/axiosInstance";
import {removeCart, updatecart} from "../../types/index"

export const updateCart = (payload:updatecart) => {
    return axiosInstance.put(api.updateCart, payload)
}

export const removefromCart = (payload:removeCart) => {
    return axiosInstance.put(api.removeCart, payload)
}

export const removesingleProd = (payload:updatecart) => {
    return axiosInstance.put(api.removesingleProd, payload)
}

export const getCarts = (userId:string) => {
    return axiosInstance.get(api.getCarts+`userId=${userId}`)
}