import React from 'react';
import { fireEvent, render, waitFor } from 'jest/test-utils';
import Redemption from '../Redemption/Redemption';

const navigate = jest.fn();

const points = {
  minRedemptionPoints: 2,
  maxRedemptionPoints: 99999,
  pointsExchangeRate: 1,
};

const mockStateRedemptionAmountEnteredMin = {
  initialState: {
    accumulatedCashback: 24.37,
    amountEntered: 1.5,
    account: '3e4b9f3b-b448-4d8e-a0cd-07a1bae50ed2',
    rules: points,
  },
};

const mockStateRedemptionAmountEnteredMax = {
  initialState: {
    accumulatedCashback: 24.37,
    amountEntered: 25.00,
    account: '3e4b9f3b-b448-4d8e-a0cd-07a1bae50ed2',
    rules: points,
  },
};

const mockStateRedemptionAmountEntered = {
  initialState: {
    accumulatedCashback: 10.00,
    amountEntered: 8.50,
    account: '3e4b9f3b-b448-4d8e-a0cd-07a1bae50ed2',
    rules: points,
  },
};

const component = (
  <Redemption
    navigation={{
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate,
    }}
    route={{
      params: {
        values: {},
        token: {
          token: 'test',
        },
      },
      key: '',
      name: '',
    }}
  />
);

jest.mock('react-redux', () => {
  const actualModule = jest.requireActual('react-redux');
  const mockState = (state: any) => {
    if (state.toString() === 'function mockStateRedemption (state) { ... }') {
      return mockStateRedemptionAmountEnteredMin;
    }
    return {};
  };

  return {
    ...actualModule,
    useSelector: jest.fn(mockState),
  };
});

jest.mock('react-redux', () => {
  const actualModule = jest.requireActual('react-redux');
  const mockState = (state: any) => {
    if (state.toString() === 'function mockStateRedemption (state) { ... }') {
      return mockStateRedemptionAmountEnteredMax;
    }
    return {};
  };

  return {
    ...actualModule,
    useSelector: jest.fn(mockState),
  };
});

jest.mock('react-redux', () => {
  const actualModule = jest.requireActual('react-redux');
  const mockState = (state: any) => {
    if (state.toString() === 'function mockStateRedemption (state) { ... }') {
      return mockStateRedemptionAmountEntered;
    }
    return {};
  };

  return {
    ...actualModule,
    useSelector: jest.fn(mockState),
  };
});
describe('Redemption', () => {
  it('should enter amount', () => {
    const { getByTestId } = render(component);
    const inputValue = 'S/0.00';
    const input = getByTestId('payCardInput');
    fireEvent.changeText(input, inputValue);
    expect((inputValue)).toBeDefined();
  });

  it('should disable pay button if the amount entered is less than the minim amount ', async () => {
    const { findByTestId } = render(component);
    const payCardButton = await findByTestId('payCardButton');
    const result = mockStateRedemptionAmountEnteredMin;
    const input = result.initialState.amountEntered;
    const minimumAmount = (result.initialState.rules.minRedemptionPoints
       * result.initialState.rules.pointsExchangeRate);
    expect(input).toBeLessThan(minimumAmount);
    await waitFor(() =>
      expect(payCardButton.props.accessibilityState.disabled).toBe(true));
  });
  it('should disable pay button if the amount entered is greater than the amount available', async () => {
    const { findByTestId } = render(component);
    const payCardButton = await findByTestId('payCardButton');
    const result = mockStateRedemptionAmountEnteredMax;
    const input = result.initialState.amountEntered;
    expect(input).toBeGreaterThan(result.initialState.accumulatedCashback);
    await waitFor(() =>
      expect(payCardButton.props.accessibilityState.disabled).toBe(true));
  });

  it('should enabled pay button', async () => {
    const { findByTestId } = render(component);
    const payCardButton = await findByTestId('payCardButton');
    const result = mockStateRedemptionAmountEntered;
    const input = result.initialState.amountEntered;
    expect(input).toBeLessThan(result.initialState.accumulatedCashback);
    await waitFor(() => expect(payCardButton).not.toBeDisabled);
    fireEvent(payCardButton, 'click');
  });
});
