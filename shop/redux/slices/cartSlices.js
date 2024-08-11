"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlices = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, qty } = action.payload;

      state.cart = [...state.cart, { ...product, qty }];

      console.log(state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((p) => p.id !== action.payload);
    },
    increment: (state, action) => {
      state.cart = state.cart.map((p) =>
        p.id === action.payload ? { ...p, qty: p.qty + 1 } : p
      );
    },
    decrement: (state, action) => {
      state.cart = state.cart.map((p) =>
        p.id === action.payload ? { ...p, qty: p.qty - 1 } : p
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, increment, decrement, clearCart } =
  cartSlices.actions;
export const cartReducer = cartSlices.reducer;

export const totalAmountCart = ({ shoppingCart }) => {
  return shoppingCart.cart.reduce((total, product) => {
    return product.is_sale
      ? total + product.sale_price * product.qty
      : total + product.price * product.qty;
  }, 0);
};
