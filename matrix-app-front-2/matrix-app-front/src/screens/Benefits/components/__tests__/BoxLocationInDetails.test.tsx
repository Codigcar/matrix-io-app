import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import BoxLocationInDetails from '../BoxLocationInDetails';

jest.mock('react-native-snap-carousel', () => 'Carousel');
jest.mock('../Location', () => 'LocationComponent');

describe('BoxLocationInDetails', () => {
  const localDiscountsMock = [{ local: 'Local 1', location: 'Ubicación 1' }];

  it('should render correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <BoxLocationInDetails localDiscounts={localDiscountsMock} />
      </ThemeProvider>,
    );

    expect(getByTestId('carousel')).toBeTruthy();
  });
});
