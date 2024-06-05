import React from 'react';
import { fireEvent, render } from 'jest/test-utils';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import AddCard from './AddCard';

describe('AddCard', () => {
  const btnMock = jest.fn();
  test('should make onPress', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <AddCard onPress={btnMock} />
      </ThemeProvider>,
    );
    const button = getByTestId('addPaymentMethod');
    fireEvent.press(button);
    expect(btnMock).toHaveBeenCalled();
  });

  test('should show text add-credit-card', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <AddCard onPress={btnMock} />
      </ThemeProvider>,
    );
    const text = 'Añade aquí tu método de pago';
    expect(getByText(text)).toBeDefined();
  });
});
