/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'src/utils/auth/states/signInStates';

const initialState = {
  isShowBalance: true,
};

export const showBalanceSlice = createSlice({
  name: 'showBalance',
  initialState,
  reducers: {
    setShowBalance: (state, action) => {
      state.isShowBalance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.type, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const { setShowBalance } = showBalanceSlice.actions;

export default showBalanceSlice.reducer;
