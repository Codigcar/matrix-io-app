import React from 'react';
import { render } from 'jest/test-utils';
import { CardIndigo } from 'assets/svgs';
import { CardBalance } from './CardBalance';

const component = (
  <CardBalance
    value="availableBalance"
    label="accountStatus.available-balance"
    backgroundColor="complementaryIndigo050"
    isLoading
    icon={CardIndigo}
    testID="availableBalance"
    colorLabel="complementaryIndigo800"
    colorValue="complementaryIndigo900"
  />
);

describe('CardBalance', () => {
  it('renders the loading state correctly', () => {
    const { getByTestId } = render(component);
    expect(getByTestId('balance-container')).toBeDefined();
  });
});
