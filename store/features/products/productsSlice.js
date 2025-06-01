import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/products");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "błąd pobierania produktów"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "błąd pobierania produktu"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    list: [],
    single: null,
    loading: false,
    error: null,
    filters: {
      category: null,
      manufacturer: null,
      search: "",
    },
    sort: "default",
  },
  reducers: {
    clearSingleProduct: (state) => {
      (state.single = null), (state.error = null);
    },
    setProductFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    setProductSort: (state, action) => {
      state.sort = action.payload;
    },
    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        (state.loading = false), (state.list = action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(fetchProductById.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        (state.loading = false), (state.single = action.payload);
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});

export const {
  clearSingleProduct,
  setProductFilters,
  setProductSort,
  setSearch,
} = productSlice.actions;
export default productSlice.reducer;
