/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: false,
  token: null,
  accountId: null,
  isLoading: false,
  cognitoUserName: '',
  email: '',
  userData: {
    name: '',
    lastName: '',
    documentNumber: '',
    location: {},
    accountId: '',
  },
  cardOffer: null,
  lastDateTouch: new Date(),
};

export const signInSlice = createSlice({
  name: 'signIn',
  initialState: {
    error: false,
    token: null,
    accountId: null,
    isLoading: false,
    cognitoUserName: '',
    email: '',
    cardOffer: null,
    lastDateTouch: new Date(),
  },

  reducers: {
    signInData: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      state.token = action.payload.signInUserSession.accessToken.jwtToken;
      state.accountId = action.payload.attributes?.address;
      state.cognitoUserName = action.payload?.username;
      state.email = action.payload.attributes.email;
      state.isLoading = false;
      state.error = false;
    },
    signInError: (state, action) => {
      state.token = null;
      state.error = action.payload;
      state.isLoading = false;
    },
    resetSignInData: (state) => {
      state.token = null;
      state.error = false;
      state.isLoading = false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
    setCardOffer: (state, action) => {
      state.cardOffer = action.payload;
    },
    setLastDateTouch: (state, action) => {
      state.lastDateTouch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInSlice.actions.logout, () => ({ ...initialState }));
  },
});

export const {
  signInData,
  signInSuccess,
  signInError,
  resetSignInData,
  setToken,
  logout,
  setCardOffer,
  setLastDateTouch,
} = signInSlice.actions;

export default signInSlice.reducer;
