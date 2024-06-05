import React from 'react';
import { render } from 'jest/test-utils';
import { colors } from 'src/matrix-ui-components';
import { MoneyTypeButtonSkeleton } from './MoneyTypeButtonSkeleton';

describe('MoneyTypeButtonSkeleton Component', () => {
  it('renders correctly', () => {
    const backgroundColor = colors.primaryLigth;
    const speed = 500;

    const { getByTestId } = render(
      <MoneyTypeButtonSkeleton backgroundColor={backgroundColor} speed={speed} />,
    );

    expect(getByTestId('skeleton-element')).toBeDefined();
  });
});
