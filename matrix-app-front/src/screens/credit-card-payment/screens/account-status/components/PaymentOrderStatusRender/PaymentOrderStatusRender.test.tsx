import React from 'react';
import { render } from 'jest/test-utils';
import { rebrandingTheme } from 'src/matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import {
  RenderBeforeBilling,
  RenderDefaultRender,
  RenderNotOutstandingPayments,
  RenderWithoutConsumption,
  paymentInProgressColorRender,
  selectedTitleTextColorHandler,
} from './PaymentOrderStatusRender';

describe('RenderBeforeBilling, RenderWithoutConsumption, RenderNotOutstandingPayments, RenderDefaultRender', () => {
  it('RenderBeforeBilling renders correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <RenderBeforeBilling
          description="Test Description"
          selected={false}
          isSelectedTextColor="primary500"
        />
      </ThemeProvider>,
    );
    expect(getByText('Test Description')).toBeDefined();
  });

  it('RenderWithoutConsumption renders correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <RenderWithoutConsumption selected={false} />
      </ThemeProvider>,
    );
    expect(getByTestId('renderWithoutConsumption')).toBeDefined();
  });

  it('RenderNotOutstandingPayments renders correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <RenderNotOutstandingPayments />
      </ThemeProvider>,
    );
    expect(getByTestId('renderNotOutstandingPayments')).toBeDefined();
  });

  it('RenderDefaultRender renders correctly', () => {
    const props = {
      hasPendingPaymentOrders: true,
      isSelectedTextColor: 'white',
      paymentInProgressColor: 'primary600',
      pendingPaymentCharters: true,
      pendingPaymentAmount: 500,
      moneySymbol: '$',
      minimumPaymentAmount: 100,
      miniumPaymentCharters: true,
    };

    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <RenderDefaultRender
          hasPendingPaymentOrders={props.hasPendingPaymentOrders}
          isSelectedTextColor="white"
          paymentInProgressColor="primary600"
          pendingPaymentCharters={props.pendingPaymentCharters}
          pendingPaymentAmount={props.pendingPaymentAmount}
          moneySymbol={props.moneySymbol}
          minimumPaymentAmount={props.minimumPaymentAmount}
          miniumPaymentCharters={props.miniumPaymentCharters}
        />
      </ThemeProvider>,
    );

    expect(getByText('Pago total del mes')).toBeDefined();
  });
});
describe('paymentInProgressColorRender', () => {
  it('returns white when selected is true', () => {
    expect(paymentInProgressColorRender(true, false)).toBe('white');
  });

  it('returns primary600 when paymentInProgress is true and selected is false', () => {
    expect(paymentInProgressColorRender(false, true)).toBe('primary600');
  });

  it('returns primaryDarkest when both selected and paymentInProgress are false', () => {
    expect(paymentInProgressColorRender(false, false)).toBe('primaryDarkest');
  });
});

describe('selectedTitleTextColorHandler', () => {
  it('returns primaryLigth when selected is true', () => {
    expect(selectedTitleTextColorHandler(true, false)).toBe('primaryLigth');
  });

  it('returns gray200 when paymentInProgress is true and selected is false', () => {
    expect(selectedTitleTextColorHandler(false, true)).toBe('gray200');
  });

  it('returns primary500 when both selected and paymentInProgress are false', () => {
    expect(selectedTitleTextColorHandler(false, false)).toBe('primary500');
  });
});
