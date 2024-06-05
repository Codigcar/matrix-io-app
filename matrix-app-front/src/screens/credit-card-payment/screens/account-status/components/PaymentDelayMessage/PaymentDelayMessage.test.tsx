import React from 'react';
import { render } from 'jest/test-utils';
import { rebrandingTheme } from 'src/matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import { i18n } from 'src/utils/core/MTXStrings';
import { PaymentDelayMessage } from './PaymentDelayMessage';

const component = (
  <ThemeProvider theme={rebrandingTheme}>
    <PaymentDelayMessage />
  </ThemeProvider>
);

describe('PaymentDelayMessage', () => {
  it('renders the loading state correctly', () => {
    const { getByTestId } = render(component);
    expect(getByTestId('paymentInProgressContainer')).toBeDefined();
  });

  it('displays the correct text content', () => {
    const { getByText } = render(component);
    expect(getByText(i18n.t('paymentSuccess.delay-information-info'))).toBeDefined();
    expect(getByText(i18n.t('paymentSuccess.next-few-minutes'))).toBeDefined();
  });
});
