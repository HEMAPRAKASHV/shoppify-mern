import { applyMiddleware, legacy_createStore as createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import rootSaga from "./sagas/rootSaga";
// import persistedReducer from "../store/reducers/rootReducer";
import storage from "redux-persist/es/storage";
import { rootReducer } from "./reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// To persist the data
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Created a saga middle ware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
