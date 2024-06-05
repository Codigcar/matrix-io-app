/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'src/utils/auth/states/signInStates';
import { CARD_IS_INACTIVE, CARD_IS_OPEN, CARD_IS_STOLEN } from 'src/utils/constants';

type TCard = {
  account: string;
  id: string;
  isMain: boolean;
  reference: string;
  status: string;
};
type TRestriction = {
  card: string;
  ecommerceEnabled: boolean;
  foreignEnabled: boolean;
};
type TCongifSwitch = {
  physical: boolean;
  virtual: boolean;
  internet: boolean;
  foreign: boolean;
};
interface IState {
  cards: TCard[];
  statusCard: string;
  statusMainCard: string;
  statusPhysicalCard: string;
  restrictions: TRestriction[];
  statusDeliveryPhysicalCard: string;
  loadings: TCongifSwitch;
}

const initialState: IState = {
  cards: [],
  statusCard: CARD_IS_OPEN,
  statusMainCard: '',
  statusPhysicalCard: '',
  restrictions: [],
  statusDeliveryPhysicalCard: '',
  loadings: {
    physical: false,
    virtual: false,
    internet: false,
    foreign: false,
  },
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards = [...action.payload.cards];
      state.statusCard = action.payload.cards[0].status;
      state.statusPhysicalCard =
        action.payload.cards[0].status === CARD_IS_INACTIVE &&
        action.payload.cards[1]?.status !== CARD_IS_STOLEN
          ? CARD_IS_INACTIVE
          : action.payload.cards[1]?.status ?? '';
    },
    setStatusCard: (state, action) => {
      state.statusCard = action.payload.statusCard;
    },
    setRestrictionsCard: (state, action) => {
      state.restrictions = [];
      state.restrictions = action.payload.restrictions;
      state.statusMainCard = action.payload.restrictions[0].ecommerceEnabled
        ? CARD_IS_OPEN
        : CARD_IS_INACTIVE;
    },
    setStatusDeliveryPhysicalCard: (state, action) => {
      state.statusDeliveryPhysicalCard = action.payload.statusDeliveryPhysicalCard;
    },
    setLoadingPhysical: (state, action) => {
      state.loadings.physical = action.payload.physical;
    },
    setLoadingVirtual: (state, action) => {
      state.loadings.virtual = action.payload.virtual;
    },
    setLoadingInternet: (state, action) => {
      state.loadings.internet = action.payload.internet;
    },
    setLoadingForeign: (state, action) => {
      state.loadings.foreign = action.payload.foreign;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.type, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const {
  setCards,
  setStatusCard,
  setRestrictionsCard,
  setStatusDeliveryPhysicalCard,
  setLoadingPhysical,
  setLoadingVirtual,
  setLoadingInternet,
  setLoadingForeign,
} = cardsSlice.actions;

export default cardsSlice.reducer;
