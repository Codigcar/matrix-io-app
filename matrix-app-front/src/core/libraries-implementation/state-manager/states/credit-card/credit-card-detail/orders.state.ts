/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'src/utils/auth/states/signInStates';

const initialState = {
  isLoading: false,
  getReqOrdersSuccess: [],
  getReqOrdersError: null,
};

export const OrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getReqOrders: (state) => {
      state.getReqOrdersError = null;
      state.isLoading = true;
    },
    getOrdersSuccess: (state, action) => {
      state.isLoading = false;
      state.getReqOrdersSuccess = action.payload;
    },
    getOrdersReqError: (state, action) => {
      state.isLoading = false;
      state.getReqOrdersError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.type, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const { getReqOrders, getOrdersSuccess, getOrdersReqError } = OrdersSlice.actions;

export default OrdersSlice.reducer;
