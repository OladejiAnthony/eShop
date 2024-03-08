import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer
});

const store = configureStore({
  reducer: rootReducer,
  //implement this just to stop error in console
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;




