/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface WelcomeState {
  sliderHasBeenSeen: boolean;
  giftHasBeenSeen: boolean;
  emptyGift: boolean;
  isOpenCashbackModal: boolean;
}

const initialState: WelcomeState = {
  sliderHasBeenSeen: false,
  giftHasBeenSeen: false,
  emptyGift: false,
  isOpenCashbackModal: false,
};

export const welcomeState = createSlice({
  name: 'welcome',
  initialState,
  reducers: {
    setSliderVisibility: (state) => {
      state.sliderHasBeenSeen = true;
    },
    setGiftStatus: (state) => {
      state.giftHasBeenSeen = true;
    },
    resetGiftHasBeenSeen: (state) => {
      state.giftHasBeenSeen = false;
    },
    checkEmptyGift: (state) => {
      state.emptyGift = true;
    },
    resetEmptyGift: (state) => {
      state.emptyGift = false;
    },
    turnOnCashbackModal: (state) => {
      state.isOpenCashbackModal = true;
    },
    turnOffCashbackModal: (state) => {
      state.isOpenCashbackModal = false;
    },
  },
});

export const {
  setSliderVisibility,
  setGiftStatus,
  resetGiftHasBeenSeen,
  checkEmptyGift,
  resetEmptyGift,
  turnOffCashbackModal,
  turnOnCashbackModal,
} = welcomeState.actions;

export default welcomeState.reducer;
