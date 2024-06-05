import React from 'react';
import { render, fireEvent } from 'jest/test-utils';
import { rebrandingTheme } from 'src/matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import { SeeMovementsButton } from './SeeMovementsButton';

jest.mock('src/utils/core/MTXStrings', () => ({
  i18n: {
    t: jest.fn((key) => key),
  },
}));

describe('SeeMovementsButton Component', () => {
  const mockNavigate = jest.fn();

  it('renders correctly when isFirstBillingCycle is true', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <SeeMovementsButton navigate={mockNavigate} isFirstBillingCycle />
      </ThemeProvider>,
    );
    const button = getByTestId('viewAccountStatusButton');
    expect(button).toBeDefined();
  });

  it('calls navigate function when pressed', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <SeeMovementsButton navigate={mockNavigate} isFirstBillingCycle={false} />
      </ThemeProvider>,
    );
    const button = getByTestId('viewAccountStatusButton');
    fireEvent.press(button);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
