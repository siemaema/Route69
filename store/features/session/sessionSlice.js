import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    sessionCart: [],
    currentUser: null,
  },
  reducers: {
    addToSessionCart: (state, action) => {
      const existingIndex = state.sessionCart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingIndex !== -1) {
        state.sessionCart[existingIndex].quantity += action.payload.quantity;
      } else {
        state.sessionCart.push({ ...action.payload });
      }
    },
    removeFromSessionCart: (state, action) => {
      state.sessionCart = state.sessionCart.filter(
        (item) => item._id !== action.payload
      );
    },
    updateSessionCartItem: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.sessionCart.find((item) => item._id === _id);
      if (item) item.quantity = quantity;
    },
    clearSessionCart: (state) => {
      state.sessionCart = [];
    },
    setUserSession: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUserSession: (state) => {
      state.currentUser = null;
    },
    clearAllSession: (state) => {
      state.currentUser = null;
      state.sessionCart = [];
    },
    setSessionCart: (state, action) => {
      state.sessionCart = action.payload;
    },
  },
});

export const {
  addToSessionCart,
  removeFromSessionCart,
  clearSessionCart,
  updateSessionCartItem,
  setUserSession,
  clearUserSession,
  clearAllSession,
  setSessionCart,
} = sessionSlice.actions;
export default sessionSlice.reducer;
