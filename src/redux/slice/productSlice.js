//rxslice
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    minPrice: null,
    maxPrice: null,
  },

  reducers: {
    STORE_PRODUCTS: (state, action) => {
      //console.log(action.payload)
      state.products = action.payload.products;
    },
    
    GET_PRICE_RANGE: (state, action) => {
      //console.log(action.payload);
      const { products } = action.payload;
      const array = [];
      products.map((product) => {
        const price = product.price;
        return array.push(price);
      });
      //console.log(array);
      const max = Math.max(...array); //get highest value in the array
      const min = Math.min(...array); //get lowest value in the array
      //console.log(max, min);
      //Save max and min price into redux on every page rerender
      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { STORE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
