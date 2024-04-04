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
        //console.log(price)
        return array.push(price);
      });
      //console.log(array);
      const max = Math.max(...array); //get highest value in the array
      const min = Math.min(...array); //get lowest value in the array
      //console.log(max, min);
      //Save max and min price into redux state on every page rerender
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


//JS push () method -
//In JavaScript, the push() method is used to add one or more elements to the 
//end of an array, effectively modifying the original array. 
//It modifies the array in place and returns the new length of the array after the elements have been added.
//The push() method is commonly used when you need to add new elements to 
//the end of an array dynamically, such as when collecting data or appending items to a list. 
//It's a convenient way to modify arrays in JavaScript.

//JS Math Object - 
//In JavaScript, the Math object provides a set of built-in mathematical operations and constants. 
//These methods and properties allow you to perform common mathematical tasks, such as 
//rounding numbers, generating random numbers, and performing trigonometric calculations, among others.
//Here are some commonly used methods and properties of the Math object - 
//Math.round(), Math.floor(), Math.random(), Math.max(), Math.min(), Math.pow() etc