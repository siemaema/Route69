import {configureStore} from "@reduxjs/toolkit"
import productReducer from "./slices/productSlice"
import filterReducer from "./slices/filterSlice"
import searchReducer from "./slices/serchSlice"
import cartReducer from "./slices/cartSlice"
import userReducer from "./slices/userSlice"
export const store = configureStore({
    reducer:{
        products: productReducer,
        filters: filterReducer,
        search: searchReducer,
        cart: cartReducer,
        user:userReducer,
    }
})