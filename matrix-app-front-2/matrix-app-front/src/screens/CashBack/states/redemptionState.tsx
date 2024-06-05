/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'src/utils/auth/states/signInStates';

const points = {
  minRedemptionPoints: 0,
  maxRedemptionPoints: 0,
  pointsExchangeRate: 0,
};

const initialState = {
  accumulatedCashback: 0,
  amountEntered: 0,
  account: '',
  rules: points,
  cardState: '',
};

export const redemptionState = createSlice({
  name: 'cashback',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setAccumulatedCashback: (state, action) => {
      state.accumulatedCashback = action.payload;
    },
    setAmountEntered: (state, action) => {
      state.amountEntered = action.payload;
    },
    setRules: (state, action) => {
      state.rules.minRedemptionPoints = action.payload.minRedemptionPoints;
      state.rules.maxRedemptionPoints = action.payload.maxRedemptionPoints;
      state.rules.pointsExchangeRate = action.payload.pointsExchangeRate;
    },
    setCardState: (state, action) => {
      state.cardState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.type, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const {
  setAccount,
  setAccumulatedCashback, setAmountEntered, setRules, setCardState,
} = redemptionState.actions;

export default redemptionState.reducer;
