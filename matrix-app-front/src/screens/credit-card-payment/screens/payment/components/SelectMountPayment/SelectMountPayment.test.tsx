import React from 'react';
import { render, fireEvent } from 'jest/test-utils';
import { rebrandingTheme } from 'src/matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import SelectMountPayment from './SelectMountPayment';

describe('SelectMountPayment Component', () => {
  const mockOnPress = jest.fn();

  it('calls onPress when TouchableOpacity is pressed', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <SelectMountPayment
          title="Test Title"
          mountMoney="100"
          onPress={mockOnPress}
          testID="selectMountButton"
          isSelected={false}
          moneySymbol="S/"
        />
      </ThemeProvider>,
    );
    const button = getByTestId('selectMountButton');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('renders the title and amount correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <SelectMountPayment
          title="Test Title"
          mountMoney="100"
          onPress={mockOnPress}
          testID="selectMountButton"
          isSelected={false}
          moneySymbol="S/"
        />
      </ThemeProvider>,
    );
    expect(getByText('Test Title')).toBeDefined();
    expect(getByText('S/100')).toBeDefined();
  });
});
