/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'src/utils/auth/states/signInStates';

const initialState = {
  alias: '',
  fullName: '',
  documentNumber: '',
  phoneNumber: '',
  address: '',
  province: '',
  district: '',
  state: '',
  email: '',
  isEmailVerified: false,
  error: false,
  isLoading: false,
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    getUserProfileData: (state) => {
      state.isLoading = true;
    },
    getUserProfileDataSuccess: (state, action) => {
      const {
        name,
        lastName,
        phone_number,
        address,
        email,
        documentNumber,
        email_verified,
        province,
        district,
      } = action.payload;
      state.alias = name;
      state.fullName = `${name} ${lastName}`;
      state.documentNumber = documentNumber || ' ';
      state.phoneNumber = phone_number;
      state.address = address;
      state.email = email;
      state.isEmailVerified = email_verified;
      state.isLoading = false;
      state.province = province;
      state.district = district;
      state.state = action.payload.state;
      state.error = false;
    },
    setAlias: (state, action) => {
      const alias = action.payload;
      state.alias = alias;
    },
    setEmail: (state, action) => {
      const email = action.payload;
      state.email = email;
    },
    setPhone: (state, action) => {
      const phone = action.payload;
      state.phoneNumber = phone;
    },
    setAddress: (state, action) => {
      const address = action.payload;
      state.address = address;
    },
    setEmailVerified: (state) => {
      state.isEmailVerified = true;
    },
    getUserProfileDataError: (state, action) => {
      const { message } = action.payload;
      state.error = message;
      state.isLoading = false;
    },
    cleanUserProfileData: (state) => {
      state.alias = '';
      state.fullName = '';
      state.documentNumber = '';
      state.phoneNumber = '';
      state.address = '';
      state.email = '';
      state.isLoading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.type, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const {
  getUserProfileData,
  getUserProfileDataSuccess,
  getUserProfileDataError,
  cleanUserProfileData,
  setAlias,
  setEmail,
  setPhone,
  setAddress,
  setEmailVerified,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
