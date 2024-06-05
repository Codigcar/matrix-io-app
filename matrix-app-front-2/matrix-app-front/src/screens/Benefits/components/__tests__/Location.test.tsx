import React from 'react';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import Location from '../Location';

describe('Location SVG Icon', () => {
  it('should render correctly with default props', () => {
    const { toJSON } = render(<Location height={16} width={16} />);
    const svgComponent = toJSON();
    expect(svgComponent).toBeTruthy();
  });
});
