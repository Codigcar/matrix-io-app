import React from 'react';
import { render } from 'jest/test-utils';
import { colors } from 'src/matrix-ui-components';
import MethodPaymentSkeleton from './MethodPaymentSkeleton';

describe('MethodPaymentSkeleton Component', () => {
  it('renders correctly when visible', () => {
    const props = {
      backgroundColor: colors.primaryLigth,
      isVisible: true,
      speed: 500,
    };

    const { getByTestId } = render(<MethodPaymentSkeleton {...props} />);
    expect(getByTestId('skeleton-element')).toBeDefined();
  });
});
