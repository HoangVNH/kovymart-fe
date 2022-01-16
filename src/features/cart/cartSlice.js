/* eslint-disable array-callback-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotifyHelper } from "../../helpers/notify-helper";
import { fee } from "../../constants";
import cartApis from "../../apis/cartApis";

const initialState = {
  finalPrices: fee.shipping,
  totalPrice: 0,
  cartItems: [],
  totalItems: 0,
  isFetching: false,
};

export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await cartApis.getCart();
  return response.data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await cartApis.addToCart(product);
      NotifyHelper.success("", "Sản phẩm đã được thêm vào Giỏ hàng");
      return data;
    } catch (error) {
      NotifyHelper.error("", "Cần đăng nhập để thực hiện thao tác này");
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeQuantity = createAsyncThunk(
  "cart/changeQuantity",
  async (quantity, { rejectWithValue }) => {
    try {
      const { data } = await cartApis.changeQuantity(quantity);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId, { rejectWithValue }) => {
    try {
      const { data } = await cartApis.removeFromCart(itemId);
      NotifyHelper.success("", "Xóa sản phẩm thành công!");
      return data;
    } catch (error) {
      NotifyHelper.error("", "Xóa sản phẩm thất bại!");
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await cartApis.clearCart();
      NotifyHelper.success("", "Xoá giỏ hàng thành công!");
      return data;
    } catch (error) {
      NotifyHelper.error("", "Xóa giỏ hàng thất bại!");
      return rejectWithValue(error.response.data);
    }
  }
);

//----------REDUCERS----------
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const { product } = action.payload;
    //   let isAlreadyExists = false;

    //   state.cartItems.forEach((item) => {
    //     if (item.id === product.id) {
    //       isAlreadyExists = true;
    //       item.count++;
    //     }
    //   });

    //   if (!isAlreadyExists) {
    //     state.cartItems.push({...product, count: 1});
    //   }

    //   NotifyHelper.success("", "Sản phẩm đã được thêm vào giỏ hàng");
    // },
    // removeFromCart: (state, action) => {
    //   const { product } = action.payload;
    //   const newCartItems = state.cartItems.filter((item) => item.id !== product.id);

    //   state.cartItems = newCartItems;

    //   NotifyHelper.success("", "Sản phẩm đã được xóa khỏi giỏ hàng");
    // }
  },
  
  extraReducers: {
    [getCart.pending]: (state) => {
      if (state.isFetching === false) {
        state.isFetching = true;
      }
    },
    [getCart.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.cartItems = payload.items;
      state.totalItems = payload.items?.length;
      state.totalPrice = payload.totalPrice;
    },
    [changeQuantity.pending]: (state) => {
      state.isFetching = true;
    },
    [changeQuantity.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.cartItems = payload.items;
      state.totalItems = payload.items?.length;
      state.totalPrice = payload.totalPrice;
    },
    [clearCart.pending]: (state) => {
      state.isFetching = true;
    },
    [clearCart.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.cartItems = payload.items;
      state.totalItems = payload.items?.length;
      state.totalPrice = payload.totalPrice;
    },
  },
});

export const selectCartItems = (state) => state.cart.cartItems;
export const selectIsCartFetching = (state) => state.cart.isFetching;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
