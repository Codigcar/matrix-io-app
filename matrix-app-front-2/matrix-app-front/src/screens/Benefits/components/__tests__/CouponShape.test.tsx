import React from 'react';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import CouponShape from '../CouponShape';

describe('CouponShape SVG Icon', () => {
  it('should render correctly with default props', () => {
    const { toJSON } = render(<CouponShape height={58} width={220} />);
    const svgComponent = toJSON();
    expect(svgComponent).toBeTruthy();
  });
});
