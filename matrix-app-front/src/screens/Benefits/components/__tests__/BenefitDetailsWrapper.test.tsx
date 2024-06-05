import React from 'react';
import { Text } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import { render } from 'jest/test-utils';
import BenefitDetailsWrapper from '../BenefitDetailsWrapper';

jest.mock('src/utils/core/MTXStrings', () => ({
  i18n: {
    t: jest.fn().mockReturnValue('Mocked Title'),
  },
}));

const mockGoBack = jest.fn();
const mockNavigation = {
  goBack: mockGoBack,
};

describe('BenefitDetailsWrapper', () => {
  it('should render correctly with children', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <BenefitDetailsWrapper navigation={mockNavigation}>
          <Text>Test Child</Text>
        </BenefitDetailsWrapper>
      </ThemeProvider>,
    );

    expect(getByText('Test Child')).toBeTruthy();
  });
});
