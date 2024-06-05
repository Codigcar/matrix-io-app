import React from 'react';
import { render } from 'jest/test-utils';
import { rebrandingTheme } from 'src/matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import { MoneyTypeButton } from './MoneyTypeButton';
import { moneyTypes } from '../../../../shared/types/account-status.type';

jest.mock('src/utils/core/MTXStrings', () => ({
  i18n: {
    t: jest.fn((key) => key),
  },
}));

describe('MoneyTypeButton Component', () => {
  const mockOnPress = jest.fn();

  it('renders correctly', () => {
    const props = {
      currentConsumptionAmount: 100,
      description: 'Test Description',
      disabled: false,
      hasPendingPaymentOrders: true,
      loading: false,
      minimumPaymentAmount: 50,
      moneyType: moneyTypes.SOLES,
      onPress: mockOnPress,
      paymentInProgress: false,
      pendingPaymentAmount: 150,
      selected: true,
      testID: 'moneyTypeButtonTest',
      isBillingCycleStarted: true,
    };

    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <MoneyTypeButton {...props} />
      </ThemeProvider>,
    );

    expect(getByTestId('moneyTypeButtonTest')).toBeDefined();
  });
});
