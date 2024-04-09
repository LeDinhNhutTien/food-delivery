import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const setItemFunc = (cartItems, totalAmount, totalQuantity) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
          (item) => item.id === newItem.id
      );

      if (existingItemIndex === -1) {
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
        });
      } else {
        state.cartItems[existingItemIndex].quantity++;
      }

      state.totalQuantity++;
      state.totalAmount += newItem.price;

      setItemFunc(state.cartItems, state.totalAmount, state.totalQuantity);
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
          (item) => item.id === id
      );

      if (existingItemIndex !== -1) {
        if (state.cartItems[existingItemIndex].quantity === 1) {
          state.cartItems.splice(existingItemIndex, 1);
        } else {
          state.cartItems[existingItemIndex].quantity--;
        }

        state.totalQuantity--;
        state.totalAmount -= state.cartItems[existingItemIndex].price;

        setItemFunc(state.cartItems, state.totalAmount, state.totalQuantity);
      }
    },
    // Add other reducers as needed
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
