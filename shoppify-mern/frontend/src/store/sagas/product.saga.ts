import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProductSuccess,
  fetchProductFailure,
} from "../actions/product.action";
import { getProducts } from "../../api/service/productapi";
import { showToast } from "../../components/Toaster";
import { CUSTOM_CODES } from "../../constants/app.constants";
import { ProductActionTypes } from "../types/productTypes";

function* productrequestSaga(action: any): Generator {
  try {
    const response = yield call(getProducts, action.payload);
    console.log(response);
    yield put(fetchProductSuccess(response));
  } catch (error: any) {
    showToast(CUSTOM_CODES.FETCH_PRODUCT_FAILED.message, "error");
    yield put(fetchProductFailure(error || "Fetch Product Failure"));
  }
}

export function* watchProductSaga() {
  yield takeLatest(
    ProductActionTypes.GET_ALL_PRODUCTS_REQUEST,
    productrequestSaga
  );
}
