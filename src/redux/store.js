import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
})

const store = configureStore({
    reducer: rootReducer,
    //implement this just to stop error in console
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;

