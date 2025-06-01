import {configureStore} from '@reduxjs/toolkit';
import productReducer from './features/products/productsSlice';
import sessionReducer from './features/session/sessionSlice';
import orderReducer from './features/orders/orderSlice'

const store = configureStore({
    reducer: {
        product: productReducer,
        session: sessionReducer,
        orders: orderReducer
    }
});

export default store;