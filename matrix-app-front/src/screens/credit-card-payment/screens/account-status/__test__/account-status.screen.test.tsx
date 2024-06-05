import React from 'react';
import { render } from 'jest/test-utils';
import { AccountStatusScreen } from '../account-status.screen';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('AccountStatusScreen', () => {
  it('renders the component with necessary elements', () => {
    const { getByTestId } = render(<AccountStatusScreen />);

    expect(getByTestId('account-status')).toBeTruthy();
    expect(getByTestId('solesOrder')).toBeTruthy();
    expect(getByTestId('dollarOrder')).toBeTruthy();
    expect(getByTestId('paymentContinue')).toBeTruthy();
  });
});
