/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'src/utils/auth/states/signInStates';
import { AccountStatusProps } from '../types/balance.type';

const initialState: AccountStatusProps['account']['balance'] = {
  isLoading: false,
  getReqBalanceSuccess: {
    consumed: {
      PEN: {
        amount: 0,
        currency: '',
      },
      USD: {
        amount: 0,
        currency: '',
      },
    },
    available: {
      PEN: {
        amount: 0,
        currency: '',
      },
      USD: {
        amount: 0,
        currency: '',
      },
    },
    creditLimit: {
      PEN: {
        amount: 0,
        currency: '',
      },
      USD: {
        amount: 0,
        currency: '',
      },
    },
    isDelinquent: false,
  },
  getReqBalanceError: null,
  showBalance: true,
};

export const BalanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    getReqBalance: (state) => {
      state.isLoading = true;
    },
    getBalanceSuccess: (state, action) => {
      state.isLoading = false;
      state.getReqBalanceSuccess = action.payload;
      state.getReqBalanceError = null;
    },
    getBalanceReqError: (state, action) => {
      const { message } = action.payload;
      state.isLoading = false;
      state.getReqBalanceSuccess = initialState.getReqBalanceSuccess;
      state.getReqBalanceError = message;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.type, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const {
  getReqBalance, getBalanceSuccess, getBalanceReqError,
} = BalanceSlice.actions;

export default BalanceSlice.reducer;
