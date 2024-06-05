import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import LocationInDetails from '../LocationInDetails';

jest.mock('src/utils/core/MTXStrings', () => ({
  i18n: {
    t: jest.fn().mockImplementation((key) => key),
  },
}));

jest.mock(
  'src/screens/Benefits/components/BoxLocationInDetails/index.tsx',
  () => 'BoxLocationInDetails',
);

describe('LocationInDetails', () => {
  it('should render text when localDiscounts is a string', () => {
    const localDiscounts = 'Dirección de ejemplo';
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <LocationInDetails localDiscounts={localDiscounts} />
      </ThemeProvider>,
    );
    expect(getByText('benefits:locals')).toBeTruthy();
    expect(getByText(localDiscounts)).toBeTruthy();
  });

  it('should render BoxLocationInDetails when localDiscounts is an array with elements', () => {
    const localDiscounts = [{ local: 'Local 1', location: 'Ubicación 1' }];
    render(
      <ThemeProvider theme={rebrandingTheme}>
        <LocationInDetails localDiscounts={localDiscounts} />
      </ThemeProvider>,
    );
  });

  it('should does not render anything when localDiscounts is an empty array', () => {
    const localDiscounts: any[] = [];
    const { baseElement } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <LocationInDetails localDiscounts={localDiscounts} />
      </ThemeProvider>,
    );
    expect(baseElement).toBeUndefined();
  });
});
