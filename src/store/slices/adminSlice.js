import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoggedIn: false,
    users: [],
    products: [],
    orders: [],
    comments: [],
    error: null,
    loading: false,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.error = null;
      state.loading = false;
    },

    // Ustawienia całych kolekcji
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },

    // Dynamiczna aktualizacja 1 produktu
    updateProduct: (state, action) => {
      const { id, updates } = action.payload;
      const product = state.products.find((p) => p._id === id);
      if (product) {
        Object.assign(product, updates); // 🔥 zaktualizuje tylko przekazane pola
      }
    },

    // Dodaj/usuń produkt
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
    },

    // Komentarze
    deleteComment: (state, action) => {
      state.comments = state.comments.filter((c) => c._id !== action.payload);
    },
    updateComment: (state, action) => {
      const { id, updates } = action.payload;
      const comment = state.comments.find((c) => c._id === id);
      if (comment) {
        Object.assign(comment, updates);
      }
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  setUsers,
  setProducts,
  setOrders,
  setComments,
  updateProduct,
  addProduct,
  deleteProduct,
  deleteComment,
  updateComment,
} = adminSlice.actions;

export default adminSlice.reducer;
