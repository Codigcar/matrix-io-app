import React from 'react';
import { render, waitFor } from 'jest/test-utils';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import BenefitDetails from 'src/screens/Benefits/modules/benefit-details/benefit-details.screen';

jest.mock('src/matrix-ui-components/components/slider', () => 'Slider');

describe('BenefitDetails', () => {
  const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
    reset: jest.fn(),
    setOptions: jest.fn(),
    push: jest.fn(),
    addListener: jest.fn(),
  };

  const route = {
    params: {
      id: 5,
    },
    key: '',
    name: '',
  };

  const props = {
    navigation,
    route,
  };

  it('should show the skeleton when loading is true', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <BenefitDetails {...props} />
      </ThemeProvider>,
    );
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('should render the benefit content when it is ready to be viewed', async () => {
    const { getByTestId } = render(<BenefitDetails {...props} />);
    await waitFor(() => {
      expect(getByTestId('slider-benefit-details')).toBeTruthy();
    });
  });
});
