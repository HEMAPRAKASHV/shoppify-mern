import api from '.';
import axiosInstance from '../axiosInstance/axiosInstance';
import { removeCart } from '../../types';

export const updateWishlist = (payload:removeCart) => {
    return axiosInstance.put(api.updateWishlist, payload)
}

export const getWishlist = (userId:string) => {
    return axiosInstance.get(api.getWishlist+`userId=${userId}`)
}