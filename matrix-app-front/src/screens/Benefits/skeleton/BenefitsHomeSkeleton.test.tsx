import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import BenefitsHomeSkeleton from './BenefitsHomeSkeleton';

describe('BenefitsHomeSkeleton', () => {
  it('should renders correctly', () => {
    render(
      <ThemeProvider theme={rebrandingTheme}>
        <BenefitsHomeSkeleton isVisible />
      </ThemeProvider>,
    );
  });
});
