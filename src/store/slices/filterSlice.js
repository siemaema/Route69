import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    selected: [],       // ["promo", "available", ...]
    category: null,     // np. "lakiery"
    subcategory: null,  // np. "akrylowe"
    sortOption:null,
  },
  reducers: {
    toggleFilter: (state, action) => {
      const filter = action.payload;
      if (state.selected.includes(filter)) {
        state.selected = state.selected.filter((x) => x !== filter);
      } else {
        state.selected.push(filter);
      }
    },
    clearFilters: (state) => {
      state.selected = [];
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubcategory: (state, action) => {
      state.subcategory = action.payload;
    },
    setSortOption:(state,action)=>{
      state.sortOption = action.payload;
    }
  },
});

export const { toggleFilter, clearFilters, setCategory, setSubcategory, setSortOption } = filterSlice.actions;
export default filterSlice.reducer;