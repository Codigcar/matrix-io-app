/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'src/utils/auth/states/signInStates';

const initialState = {
  isLoading: false,
  getReqPaymentSuccess: [],
  getReqPaymentError: null,
  paymentIsLoading: false,
  paymentCardSuccess: {},
  paymentCardError: {},
};

export const Payment = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    getReqPaymentMethod: (state) => {
      state.isLoading = true;
    },
    getPaymentSuccess: (state, action) => {
      state.isLoading = false;
      state.getReqPaymentSuccess = action.payload;
    },
    getPaymentReqError: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.getReqPaymentError = message;
    },
    addNewPaymentMethod: (state, action) => {
      state.isLoading = false;
      state.getReqPaymentSuccess = [action.payload, ...state.getReqPaymentSuccess];
    },
    addNewPaymentMethodErr: (state, action) => {
      state.isLoading = false;
      state.getReqPaymentError = action.payload;
    },
    initialStatePaymentMethod: (state) => {
      state.isLoading = true;
      state.getReqPaymentSuccess = [];
      state.getReqPaymentError = null;
    },
    setPaymentMethod: (state, action) => {
      state.getReqPaymentSuccess = action.payload;
    },
    deletePaymentMethod: (state, action) => {
      state.isLoading = false;
      state.getReqPaymentSuccess = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    reqCardPayment: (state) => {
      state.paymentIsLoading = true;
    },
    postPaymentCardSuccess: (state, action) => {
      state.paymentIsLoading = false;
      state.paymentCardSuccess = action.payload;
    },
    postPaymentCardReqError: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.paymentCardError = message;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.type, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const {
  getReqPaymentMethod,
  getPaymentSuccess,
  getPaymentReqError,
  initialStatePaymentMethod,
  addNewPaymentMethod,
  addNewPaymentMethodErr,
  setPaymentMethod,
  deletePaymentMethod,
  setIsLoading,
  reqCardPayment,
  postPaymentCardSuccess,
  postPaymentCardReqError,
} = Payment.actions;

export default Payment.reducer;
