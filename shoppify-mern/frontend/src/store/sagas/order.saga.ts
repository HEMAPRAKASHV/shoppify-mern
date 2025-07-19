import { call, put, takeLatest } from "redux-saga/effects";
import { fetchOrderSuccess, fetchOrderFailure } from "../actions/order.action";
import { getOrders } from "../../api/service/orderapi";
import { showToast } from "../../components/Toaster";
import { CUSTOM_CODES } from "../../constants/app.constants";
import { OrderActionTypes } from "../types/orderTypes";

function* orderrequestSaga(action: any): Generator {
  try {
    const response = yield call(getOrders, action.payload);
    showToast(CUSTOM_CODES.FETCH_ORDERS_SUCCESS.message, "success");
    yield put(fetchOrderSuccess(response));
  } catch (error: any) {
    showToast(CUSTOM_CODES.FETCH_ORDERS_FAILED.message, "error");
    yield put(fetchOrderFailure(error || "Fetch Product Failure"));
  }
}

export function* watchOrderSaga() {
  yield takeLatest(OrderActionTypes.GET_ALL_ORDERS_REQUEST, orderrequestSaga);
}
