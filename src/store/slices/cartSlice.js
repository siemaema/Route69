import { createSlice } from "@reduxjs/toolkit";

const calcTotal = (items) =>
  items.reduce((sum, item) => sum + item.quantity * (item.promoPrice || item.price), 0);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
  const item = action.payload;
  const existingItem = state.items.find((i) => i._id === item._id);
  const price = item.promoPrice || item.price;
  const quantityToAdd = item.quantity ?? 1; // ⬅ najważniejsze: domyślnie 1

  if (existingItem) {
    existingItem.quantity += quantityToAdd;
    existingItem.totalItemPrice += price * quantityToAdd;
  } else {
    state.items.push({
      ...item,
      quantity: quantityToAdd,
      totalItemPrice: price * quantityToAdd,
    });
  }

  state.totalPrice = calcTotal(state.items);
},


    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((i) => i._id !== itemId);
      state.totalPrice = calcTotal(state.items);
    },

    increseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((i) => i._id === itemId);
      const price = item?.promoPrice || item?.price;
      if (item) {
        item.quantity += 1;
        item.totalItemPrice += price;
      }
      state.totalPrice = calcTotal(state.items);
    },

    decreseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find((i) => i._id === itemId);
      const price = item?.promoPrice || item?.price;
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.totalItemPrice -= price;
        } else {
          state.items = state.items.filter((i) => i._id !== itemId);
        }
      }
      state.totalPrice = calcTotal(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },

    setCartFromServer: (state, action) => {
      state.items = action.payload;
      state.totalPrice = calcTotal(action.payload);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increseQuantity,
  decreseQuantity,
  clearCart,
  setCartFromServer,
} = cartSlice.actions;

export default cartSlice.reducer;
