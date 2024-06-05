import React from 'react';
import { render } from '@testing-library/react-native';
import { Box, rebrandingTheme } from 'matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import SliderItem from '../../components/SliderItem';

describe('<SliderItem />', () => {
  const mockItem = {
    id: '1',
    type: 'type1',
    text: 'Text 1',
    title: 'Title 1',
    iconName: 'icon1',
    image: <Box testID="mock-image">Mock Image</Box>,
  };

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <SliderItem item={mockItem} />
      </ThemeProvider>,
    );

    expect(getByText('Title 1')).toBeTruthy();
    expect(getByText('Text 1')).toBeTruthy();
    expect(getByTestId('mock-image')).toBeTruthy();
  });
});
