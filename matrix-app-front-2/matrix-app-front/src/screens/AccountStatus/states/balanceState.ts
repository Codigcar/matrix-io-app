/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'src/utils/auth/states/signInStates';
import { AccountStatusProps } from '../types/types';

const initialState: AccountStatusProps['account']['balance'] = {
  isLoading: false,
  getReqBalanceSuccess: [],
  getReqBalanceError: null,
};

export const Balance = createSlice({
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
      state.getReqBalanceSuccess = [];
      state.getReqBalanceError = message;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.type, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const { getReqBalance, getBalanceSuccess, getBalanceReqError } = Balance.actions;

export default Balance.reducer;
