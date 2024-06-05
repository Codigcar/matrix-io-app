import { configureStore } from '@reduxjs/toolkit';
import redemptionReducer, {
  setAccount,
  setAccumulatedCashback,
  setAmountEntered,
  setRules,
  setCardState,
} from '../redemptionState';

describe('Redemption State Slice', () => {
  let store:any;

  beforeEach(() => {
    store = configureStore({ reducer: redemptionReducer });
  });

  it('setAccount action', () => {
    const account = '3e4b9f3b-b448-4d8e-a0cd-07a1bae50ed2';
    store.dispatch(setAccount(account));

    const state = store.getState();
    expect(state.account).toEqual(account);
  });

  it('setAccumulatedCashback action', () => {
    const accumulatedCashback = 100;
    store.dispatch(setAccumulatedCashback(accumulatedCashback));

    const state = store.getState();
    expect(state.accumulatedCashback).toEqual(accumulatedCashback);
  });

  it('setAmountEntered action', () => {
    const amountEntered = 50;
    store.dispatch(setAmountEntered(amountEntered));

    const state = store.getState();
    expect(state.amountEntered).toEqual(amountEntered);
  });

  it('setRules action', () => {
    const rules = {
      minRedemptionPoints: 10,
      maxRedemptionPoints: 100,
      pointsExchangeRate: 0.5,
    };

    store.dispatch(setRules(rules));

    const state = store.getState();
    expect(state.rules).toEqual(rules);
  });

  it('setCardState action', () => {
    const cardState = 'active';
    store.dispatch(setCardState(cardState));

    const state = store.getState();
    expect(state.cardState).toEqual(cardState);
  });
});
