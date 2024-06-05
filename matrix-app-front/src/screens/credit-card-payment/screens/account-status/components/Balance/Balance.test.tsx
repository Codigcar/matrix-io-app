import React from 'react';
import { render } from 'jest/test-utils';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';

import { Balance } from './Balance';

describe('Balance', () => {
  test('should render correctly ', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <Balance loading={false} availableBalance={0} currentConsumption={0} />
      </ThemeProvider>,
    );
    const balanceBox = getByTestId('balance-box');
    expect(balanceBox).toBeDefined();
  });
});
