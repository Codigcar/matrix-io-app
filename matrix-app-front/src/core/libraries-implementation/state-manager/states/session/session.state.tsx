/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'src/utils/auth/states/signInStates';
import { INACTIVITY_TIMEOUTS } from 'src/utils/constants';

interface IState {
  token: string | null;
  tokenStartDate: Date | undefined;
  user: {
    alias: string;
    name: string;
    lastName: string;
    fullName: string;
    documentNumber: string;
    phoneNumber: string;
    address: string;
    province: string;
    district: string;
    state: string;
    email: string;
    location: object;
    isEmailVerified: boolean;
    accountId: string;
  };
  isError: boolean;
  isLoading: boolean;
  blockUserAccount: boolean;
  accountState: 'AVAILABLE' | 'PENDING';
  sessionExpired: boolean;
  inactivityTimeoutSeconds: number;
  reCaptchaSessionToken: string | null;
  inAppData: any;
}
const userData = {
  alias: '',
  name: '',
  lastName: '',
  fullName: '',
  documentNumber: '',
  phoneNumber: '',
  address: '',
  province: '',
  district: '',
  state: '',
  email: '',
  location: {},
  isEmailVerified: true,
  accountId: '',
};

const initialState: IState = {
  token: null,
  tokenStartDate: undefined,
  user: userData,
  isError: false,
  isLoading: false,
  blockUserAccount: false,
  accountState: 'AVAILABLE',
  sessionExpired: false,
  inactivityTimeoutSeconds: INACTIVITY_TIMEOUTS.default,
  reCaptchaSessionToken: null,
  inAppData: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUserProfileData: (state, action) => {
      state.user.alias = action.payload.name;
      state.user.name = action.payload.name;
      state.user.lastName = action.payload.lastName;
      state.user.fullName = `${action.payload.name} ${action.payload.lastName}`;
      state.user.documentNumber = action.payload.documentNumber;
      state.user.phoneNumber = action.payload.phone_number;
      state.user.address = action.payload.address;
      state.user.province = action.payload.province;
      state.user.district = action.payload.district;
      state.user.state = action.payload.state;
      state.user.email = action.payload.email;
      state.user.isEmailVerified = action.payload.email_verified;
    },
    setUserData: (state, action) => {
      state.user.name = action.payload.name;
      state.user.lastName = action.payload.lastName;
      state.user.documentNumber = action.payload.documentNumber;
      state.user.location = action.payload.location;
      state.user.accountId = action.payload.accountId;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.tokenStartDate = new Date();
    },
    setVerifyEmail: (state) => {
      state.user.isEmailVerified = true;
    },
    setBlockUserAccount: (state, action) => {
      state.blockUserAccount = action.payload;
    },
    setAccountState: (state, action) => {
      state.accountState = action.payload;
    },
    sessionExpiredTimeout: (state, action) => {
      state.sessionExpired = action.payload;
    },
    setInactivityTimeout: (state, action) => {
      state.inactivityTimeoutSeconds = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setReCaptchaSessionToken: (state, action) => {
      state.reCaptchaSessionToken = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setInAppData: (state, action) => {
      state.inAppData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.type, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const {
  setUserData,
  setUserProfileData,
  setToken,
  setVerifyEmail,
  setAccountState,
  setBlockUserAccount,
  sessionExpiredTimeout,
  setInactivityTimeout,
  setReCaptchaSessionToken,
  setLoading,
  setInAppData,
} = sessionSlice.actions;

export default sessionSlice.reducer;
