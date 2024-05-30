import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalQuantity: parseInt(localStorage.getItem("totalQuantity")) || 0,
  totalAmount: parseFloat(localStorage.getItem("totalAmount")) || 0,
};

const setItemFunc = (cartItems, totalAmount, totalQuantity) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const calculateTotalAmount = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
        const imageUrl = newItem.imageUrl && newItem.imageUrl[0];
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          imageUrl: imageUrl,
        });
      } else {
        state.cartItems[existingItemIndex].quantity++;
      }

      state.totalQuantity++;
      state.totalAmount = calculateTotalAmount(state.cartItems);

      setItemFunc(state.cartItems, state.totalAmount, state.totalQuantity);
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
          (item) => item.id === id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex];
        if (existingItem.quantity === 1) {
          state.cartItems.splice(existingItemIndex, 1);
        } else {
          existingItem.quantity--;
        }

        state.totalQuantity--;
        state.totalAmount = calculateTotalAmount(state.cartItems);

        setItemFunc(state.cartItems, state.totalAmount, state.totalQuantity);
      }
    },
    // Thêm các reducers khác nếu cần
  },
});

export const  cartActions = cartSlice.actions;
export default cartSlice;
