/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'src/utils/auth/states/signInStates';
import { CardType, PaymentMethod } from '../types/payment-method.type';

const initialState = {
  isLoading: false,
  isLoadingDeletePaymentMethod: false,
  isFinishDeleteSuccess: false,
  isFinishSetSuccess: false,
  paymentMethods: [] as PaymentMethod[],
  cardsPaymentMethods: [] as CardType[],
  paymentMethodError: null,
  paymentCardSuccess: {},
  paymentCardError: {},
};

export const PaymentMethodSlice = createSlice({
  name: 'paymentMethod',
  initialState,
  reducers: {
    initialStatePaymentMethod: (state) => {
      state.isLoading = true;
      state.paymentMethods = [];
      state.paymentMethodError = null;
    },
    setLoadingPaymentMethod: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoadingDeletePaymentMethod: (state, action) => {
      state.isLoadingDeletePaymentMethod = action.payload;
    },
    setAllPaymentMethods: (state, action) => {
      state.isLoading = false;
      state.paymentMethods = action.payload;
    },
    setAllCardsPaymentMethods: (state, action) => {
      state.isLoading = false;
      state.cardsPaymentMethods = action.payload;
    },
    setPaymentMethods: (state, action) => {
      state.isLoading = false;
      state.paymentMethods = [action.payload, ...state.paymentMethods];
    },
    setCardsPaymentMethods: (state, action) => {
      state.isLoading = false;
      state.cardsPaymentMethods = [action.payload, ...state.cardsPaymentMethods];
    },
    deletePaymentMethod: (state, action) => {
      state.isLoading = false;
      state.paymentMethods = action.payload;
    },
    deletePaymentMethodFinish: (state, action) => {
      state.isLoading = false;
      state.isFinishDeleteSuccess = action.payload;
    },
    setPaymentMethodError: (state, action) => {
      state.isLoading = false;
      state.paymentMethodError = action.payload;
    },
    setPaymentCardSuccess: (state, action) => {
      state.isLoading = false;
      state.isFinishSetSuccess = action.payload;
    },
    initialPaymentMethodError: (state) => {
      state.paymentMethodError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.type, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const {
  initialStatePaymentMethod,
  setLoadingPaymentMethod,
  setIsLoadingDeletePaymentMethod,
  setPaymentMethods,
  setCardsPaymentMethods,
  setAllPaymentMethods,
  setAllCardsPaymentMethods,
  deletePaymentMethod,
  setPaymentMethodError,
  deletePaymentMethodFinish,
  setPaymentCardSuccess,
  initialPaymentMethodError,
} = PaymentMethodSlice.actions;

export default PaymentMethodSlice.reducer;
