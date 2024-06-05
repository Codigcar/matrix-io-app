import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { render } from 'jest/test-utils';
import { rebrandingTheme } from 'matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import Transactions from './Transactions';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

const transactionRender = () =>
  render(
    <ThemeProvider theme={rebrandingTheme}>
      <Transactions />
    </ThemeProvider>,
  );

describe('Transactions Component', () => {
  it('should navigate to transactions screen on press', async () => {
    const { getByTestId } = transactionRender();

    await waitFor(async () => {
      const component = getByTestId('transactions-component');
      expect(component.props.accessibilityState.disabled).toBe(false);
      fireEvent.press(component);
    });
  });
});
