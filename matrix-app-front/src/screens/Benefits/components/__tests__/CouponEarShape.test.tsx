import React from 'react';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import CouponEarShape from '../CouponEarShape';

describe('CouponEarShape SVG Icon', () => {
  it('should render correctly with default props', () => {
    const { toJSON } = render(<CouponEarShape />);
    const svgComponent = toJSON();
    expect(svgComponent).toBeTruthy();
  });
});
