import React from 'react';
import { render } from '@testing-library/react-native';
import { i18n } from 'src/utils/core/MTXStrings';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import BenefitsError from '../BenefitsError';

describe('BenefitsError', () => {
  it('should render correctly with error messages', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <BenefitsError />
      </ThemeProvider>,
    );

    expect(getByText(i18n.t('benefits:error.title'))).toBeTruthy();
    expect(getByText(i18n.t('benefits:error.first-message'))).toBeTruthy();
    expect(getByText(i18n.t('benefits:error.second-message'))).toBeTruthy();
  });
});
