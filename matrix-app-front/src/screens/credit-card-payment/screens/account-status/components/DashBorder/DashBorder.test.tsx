import React from 'react';
import { render } from 'jest/test-utils';
import { DashBorder } from './DashBorder';

describe('DashBorder', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<DashBorder />);
    const dashBorder = getByTestId('dash-border');
    expect(dashBorder).toBeDefined();
  });
});
