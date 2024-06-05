import React from 'react';
import { render } from 'jest/test-utils';
import { colors } from 'src/matrix-ui-components';
import { BalanceSkeleton } from './BalanceSkeleton';

describe('BalanceSkeleton Component', () => {
  it('renders correctly when visible', () => {
    const props = {
      backgroundColor: colors.primaryLigth,
      isVisible: true,
      speed: 500,
    };

    const { getByTestId } = render(<BalanceSkeleton {...props} />);
    expect(getByTestId('skeleton-element')).toBeDefined();
  });
});
