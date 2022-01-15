import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/category/categorySlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/order/orderSlice';
import addressReducer from '../features/address/addressSlice';
import locationReducer from '../features/location/locationSlice';


export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    address: addressReducer,
    location: locationReducer
  }
});
