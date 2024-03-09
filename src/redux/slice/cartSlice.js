//rxslice
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [], //save to local-storage for rerendering purpose
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      //console.log(action.payload);
      //We want to add products to our cart
      //const {product} = action.payload;
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      //console.log(productIndex)
      if (productIndex >= 0) {
        //item already exist in the cart
        //increase the cartQuantity
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} increased by one`, {
          position: "top-left",
        });
      } else {
        //item doest exist in the cart
        //add item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      }
      //save cart to local-storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DECREASE_CART(state, action) {
      //console.log(action.payload);
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1; //if product exist in the cartItem and is greater than 1, reduce quantity
        toast.info(`${action.payload.name} decreased by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        //if we have exactly 1 item of the product in the cart, delete the product from the cart
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} removed from cart`, {
          position: "top-left",
        });
      }
      //update in local-storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART(state, action) {
      //console.log(action.payload);
      //delete or remove Product from cart
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = newCartItem;
      toast.success(`${action.payload.name} removed from cart`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CLEAR_CART(state, action) {
      //console.log(action.payload);
      state.cartItems = []; //set cart to empty array
      toast.info(`Cart cleared`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CALCULATE_SUBTOTAL(state, action) {
      //console.log(action.payload);
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item; //destructuring
        const cartItemAmount = price * cartQuantity;
        //console.log(cartItemAmount);
        return array.push(cartItemAmount); //push cartItemAmount to the created arrray
      });
      //console.log(array);
      const totalAmount = array.reduce((a, b) => {
        return a + b; //add the values inside the array
      }, 0);
      //console.log(totalAmount)
      state.cartTotalAmount = totalAmount;
    },

    //calculate cart item total quantity
    CALCULATE_CART_TOTAL_QUANTITY(state, action) {
      //console.log(action.payload);
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },

    SAVE_URL(state, action) {
      console.log(action.payload);
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_CART_TOTAL_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
