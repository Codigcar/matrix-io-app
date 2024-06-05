import React from 'react';
import { render } from 'jest/test-utils';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';

import { BillingCycle } from './BillingCycle';

describe('Balance', () => {
  test('should render correctly ', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <BillingCycle
          billingCycleStarted
          duePaymentDate=""
          endDate=""
          hasPendingPaymentOrders
          isFirstBillingCycle
          loading={false}
          minimumPaymentAmount={0}
          month=""
          navigate={() => {}}
          splitDate={{
            startDay: '',
            startMonth: '',
            endDay: '',
            endDayMonth: '',
            startYear: '',
            endYear: '',
          }}
          isErrorListMovements
          fetchListMovements={async () => {}}
        />
      </ThemeProvider>,
    );
    const billingCycle = getByTestId('billing-cycle-started');
    expect(billingCycle).toBeDefined();
  });
});
