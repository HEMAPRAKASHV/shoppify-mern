import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import { productReducer } from './product.reducer';
import { orderReducer } from './order.reducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    order: orderReducer
});

export type RootState = ReturnType<typeof rootReducer>;