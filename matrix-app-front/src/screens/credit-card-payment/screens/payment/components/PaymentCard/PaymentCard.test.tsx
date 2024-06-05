import React from 'react';
import { render } from 'jest/test-utils';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import { LogoMastercard } from 'assets/svgs';
import PaymentCard from './PaymentCard';

describe('PaymentCard', () => {
  test('should render correctly ', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <PaymentCard
          number=""
          type=""
          isSelected={false}
          icon={(props) => <LogoMastercard {...props} />}
          width={10}
          onRemovePress={() => {}}
          isOnlyCard
        />
      </ThemeProvider>,
    );
    const paymentCard = getByTestId('payment-card');
    expect(paymentCard).toBeDefined();
  });
});
