import React from 'react';
import { render } from 'jest/test-utils';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import { BillingCycleBtnListMovement } from './BillingCycleBtnListMovement';

describe('BillingCycleBtnListMovement', () => {
  test('should show see-movements-button components if isError is false', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <BillingCycleBtnListMovement
          isError={false}
          isFirstBillingCycle={false}
          navigate={() => {}}
          onPress={async () => {}}
        />
      </ThemeProvider>,
    );

    expect(getByTestId('viewAccountStatusButton')).toBeDefined();
  });
});
