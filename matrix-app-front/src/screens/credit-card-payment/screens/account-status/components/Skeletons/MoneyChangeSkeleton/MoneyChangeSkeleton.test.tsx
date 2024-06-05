import React from 'react';
import { render } from 'jest/test-utils';
import { colors } from 'src/matrix-ui-components';
import { MoneyChangeSkeleton } from './MoneyChangeSkeleton';

describe('MoneyChangeSkeleton Component', () => {
  it('renders correctly when visible', () => {
    const props = {
      backgroundColor: colors.primaryLigth,
      isVisible: true,
      speed: 500,
    };

    const { getByTestId } = render(<MoneyChangeSkeleton {...props} />);
    expect(getByTestId('skeleton-element')).toBeDefined();
  });
});
