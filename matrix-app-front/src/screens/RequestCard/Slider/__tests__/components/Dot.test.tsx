import React from 'react';
import { render } from '@testing-library/react-native';
import { colors } from 'matrix-ui-components';
import Dot from '../../components/Dot';

describe('Dot', () => {
  it('renders with default size and style when isCurrent is false', () => {
    const { getByTestId } = render(<Dot isCurrent={false} />);
    const dot = getByTestId('dot');

    expect(dot).toBeTruthy();

    expect(dot).toHaveStyle({
      backgroundColor: colors.primaryDark,
      width: 10,
      height: undefined,
      aspectRatio: 1,
      marginRight: 8,
      borderRadius: 5,
    });
  });

  it('renders with provided size and style when isCurrent is true', () => {
    const { getByTestId } = render(<Dot isCurrent size={15} />);
    const dot = getByTestId('dot');

    expect(dot).toBeTruthy();

    expect(dot).toHaveStyle({
      backgroundColor: colors.disable,
      width: 15,
      height: undefined,
      aspectRatio: 1,
      marginRight: 8,
      borderRadius: 7.5,
    });
  });
});
